import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Course ID is required' })
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                duration: true,
                order: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    return res.status(200).json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}