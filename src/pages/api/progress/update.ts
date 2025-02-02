import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/util/supabase/api'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { lessonId, enrollmentId, completed, percentage } = req.body

    if (!lessonId || !enrollmentId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Verify that the enrollment belongs to the user
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id: enrollmentId,
        userId: user.id,
      },
    })

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' })
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId,
          lessonId,
        },
      },
      update: {
        completed: completed ?? false,
        percentage: percentage ?? 0,
        lastActivity: new Date(),
      },
      create: {
        enrollmentId,
        lessonId,
        completed: completed ?? false,
        percentage: percentage ?? 0,
      },
    })

    // Calculate overall course progress
    const allLessons = await prisma.lesson.findMany({
      where: {
        module: {
          courseId: enrollment.courseId,
        },
      },
    })

    const completedLessons = await prisma.progress.count({
      where: {
        enrollment: {
          courseId: enrollment.courseId,
          userId: user.id,
        },
        completed: true,
      },
    })

    const overallProgress = (completedLessons / allLessons.length) * 100

    // Check for achievements
    try {
      await fetch(`${process.env.NEXT_PUBLIC_CO_DEV_ENV}/api/achievements/award`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': req.headers.cookie || '',
        },
      });
    } catch (error) {
      console.error('Error checking achievements:', error);
    }

    return res.status(200).json({
      progress,
      overallProgress,
    })
  } catch (error) {
    console.error('Progress update error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}