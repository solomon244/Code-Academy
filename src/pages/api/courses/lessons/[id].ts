import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { createClient } from '@/util/supabase/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { user } = await supabase.auth.getUser()

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { id } = req.query

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: String(id),
      },
      include: {
        module: {
          include: {
            course: {
              include: {
                enrollments: {
                  where: {
                    userId: user.id,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    // Check if user is enrolled in the course
    if (lesson.module.course.enrollments.length === 0) {
      return res.status(403).json({ message: 'Not enrolled in this course' })
    }

    return res.status(200).json(lesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}