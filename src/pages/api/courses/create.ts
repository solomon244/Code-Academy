import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const sampleCourses = [
      {
        title: "Introduction to Python Programming",
        description: "Learn the basics of Python programming with practical examples relevant to Ethiopian context.",
        price: 29.99,
        imageUrl: "/images/rect.png"
      },
      {
        title: "Web Development Fundamentals",
        description: "Master HTML, CSS, and JavaScript basics with hands-on projects focused on local business cases.",
        price: 39.99,
        imageUrl: "/images/rect.png"
      },
      {
        title: "Mobile App Development",
        description: "Create mobile applications using React Native with examples from Ethiopian mobile services.",
        price: 49.99,
        imageUrl: "/images/rect.png"
      },
      {
        title: "Data Science Essentials",
        description: "Learn data analysis and visualization using Python with datasets from Ethiopian sectors.",
        price: 44.99,
        imageUrl: "/images/rect.png"
      },
      {
        title: "Database Design and SQL",
        description: "Master database concepts and SQL queries with practical examples from local businesses.",
        price: 34.99,
        imageUrl: "/images/rect.png"
      },
      {
        title: "Advanced JavaScript",
        description: "Deep dive into modern JavaScript features and frameworks with Ethiopian tech industry focus.",
        price: 54.99,
        imageUrl: "/images/rect.png"
      }
    ]

    // Create all courses
    const createdCourses = await prisma.course.createMany({
      data: sampleCourses,
      skipDuplicates: true,
    })

    return res.status(200).json({ message: 'Sample courses created successfully', count: createdCourses.count })
  } catch (error) {
    console.error('Error creating sample courses:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}