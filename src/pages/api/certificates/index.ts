import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { createClient } from '@/util/supabase/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const supabase = createClient(req, res);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { courseId } = req.body;

      if (!courseId) {
        return res.status(400).json({ error: 'Course ID is required' });
      }

      // Check if the user has completed all lessons in the course
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: true,
                },
              },
            },
          },
          progress: true,
        },
      });

      if (!enrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      // Calculate total lessons and completed lessons
      const totalLessons = enrollment.course.modules.reduce(
        (acc, module) => acc + module.lessons.length,
        0
      );

      const completedLessons = enrollment.progress.filter(
        (p) => p.completed
      ).length;

      if (completedLessons < totalLessons) {
        return res.status(400).json({
          error: 'Course not completed yet',
          progress: (completedLessons / totalLessons) * 100,
        });
      }

      // Check if certificate already exists
      const existingCertificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
      });

      if (existingCertificate) {
        return res.status(200).json(existingCertificate);
      }

      // Generate unique certificate number
      const certificateNumber = `EC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create new certificate
      const certificate = await prisma.certificate.create({
        data: {
          userId: user.id,
          courseId,
          certificateNumber,
          completionDate: new Date(),
        },
      });

      return res.status(201).json(certificate);
    } catch (error) {
      console.error('Certificate generation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const supabase = createClient(req, res);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const certificates = await prisma.certificate.findMany({
        where: {
          userId: user.id,
        },
        include: {
          course: {
            select: {
              title: true,
              description: true,
            },
          },
        },
      });

      return res.status(200).json(certificates);
    } catch (error) {
      console.error('Certificate retrieval error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}