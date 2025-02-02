import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // First, let's check if we have any courses
    const courseCount = await prisma.course.count()
    
    // If no courses exist, let's create some sample courses
    if (courseCount === 0) {
      const sampleCourses = [
        {
          title: "Introduction to Python Programming",
          description: "Learn the basics of Python programming with practical examples relevant to Ethiopian context.",
          price: 29.99,
          imageUrl: "/images/python.jpg",
          level: "beginner",
          duration: 1200,
          language: "English",
          prerequisites: ["Basic computer skills", "No prior programming experience needed"],
          objectives: [
            "Understand Python fundamentals",
            "Write basic Python programs",
            "Work with data structures",
            "Create simple applications"
          ],
          modules: {
            create: [
              {
                title: "Getting Started with Python",
                description: "Learn the basics of Python programming language",
                order: 1,
                lessons: {
                  create: [
                    {
                      title: "Introduction to Programming",
                      content: "Programming is the process of creating a set of instructions that tell a computer how to perform a task...",
                      order: 1,
                      duration: 30
                    },
                    {
                      title: "Setting Up Python Environment",
                      content: "In this lesson, we'll learn how to install Python and set up our development environment...",
                      order: 2,
                      duration: 45
                    }
                  ]
                }
              },
              {
                title: "Python Basics",
                description: "Understanding variables, data types, and basic operations",
                order: 2,
                lessons: {
                  create: [
                    {
                      title: "Variables and Data Types",
                      content: "Learn about different data types in Python and how to use variables...",
                      order: 1,
                      duration: 60
                    },
                    {
                      title: "Basic Operations",
                      content: "Explore arithmetic operations, string operations, and basic input/output in Python...",
                      order: 2,
                      duration: 45
                    }
                  ]
                }
              }
            ]
          }
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

      await prisma.course.createMany({
        data: sampleCourses,
        skipDuplicates: true,
      })
    }

    // Now fetch all courses with their modules and lessons
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`Found ${courses.length} courses`)
    return res.status(200).json(courses)
  } catch (error) {
    console.error('Error in courses API:', error)
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}