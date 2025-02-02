import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  order: number
}

interface Module {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  level: string
  duration: number
  language: string
  prerequisites: string[]
  objectives: string[]
  modules: Module[]
}

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id || !user) return

      try {
        const response = await fetch(`/api/courses/${id}`)
        if (!response.ok) throw new Error('Failed to fetch course')
        const data = await response.json()
        setCourse(data)

        // Check enrollment status
        const enrollmentResponse = await fetch(`/api/courses/enrolled?courseId=${id}`)
        if (enrollmentResponse.ok) {
          const enrollmentData = await enrollmentResponse.json()
          setIsEnrolled(true)
          
          // Calculate progress
          if (enrollmentData.progress) {
            const totalLessons = data.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)
            const completedLessons = enrollmentData.progress.filter((p: any) => p.completed).length
            setProgress((completedLessons / totalLessons) * 100)
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load course details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id, user, toast])

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to enroll in courses",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/courses/enrolled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: id }),
      })

      if (!response.ok) throw new Error('Failed to enroll')

      toast({
        title: "Success!",
        description: "You have successfully enrolled in the course",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enroll in the course",
        variant: "destructive",
      })
    }
  }

  const handleGenerateCertificate = async () => {
    if (!user || !course) {
      return;
    }

    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate certificate');
      }

      const certificate = await response.json();
      toast({
        title: "Certificate Generated!",
        description: "Your certificate has been generated successfully. You can view it in your certificates dashboard.",
      });
      router.push('/dashboard/certificates');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate certificate",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to cart",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: id }),
      })

      if (!response.ok) throw new Error('Failed to add to cart')

      toast({
        title: "Success!",
        description: "Course added to cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add course to cart",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (!course) {
    return <div className="container mx-auto p-6">Course not found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Course Overview */}
        <div className="md:col-span-2">
          <Card>
            <div className="relative w-full h-64">
              <Image
                src={course.imageUrl || '/images/rect.png'}
                alt={course.title}
                fill
                className="object-cover rounded-t-lg"
                priority
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <div className="text-xl font-bold">${course.price.toFixed(2)}</div>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge>{course.level}</Badge>
                <Badge variant="outline">{course.language}</Badge>
                <Badge variant="outline">{course.duration} minutes</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>

                {course.prerequisites.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Prerequisites</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.objectives.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Learning Objectives</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {course.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {isEnrolled ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {progress === 100 && (
                        <Button
                          onClick={handleGenerateCertificate}
                          className="w-full"
                          variant="secondary"
                        >
                          Get Certificate
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Button onClick={handleEnroll} className="w-full">
                      Enroll Now
                    </Button>
                    <Button onClick={handleAddToCart} variant="outline" className="w-full">
                      Add to Cart
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {course.modules.map((module) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full">
                    <span>{module.title}</span>
                    <span className="text-sm text-gray-500">
                      {module.lessons.length} lessons
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    {module.lessons.map((lesson) => (
                      <Button
                        key={lesson.id}
                        variant="ghost"
                        className="w-full flex justify-between items-center py-2 border-b last:border-0"
                        onClick={() => router.push(`/courses/lessons/${lesson.id}`)}
                      >
                        <span>{lesson.title}</span>
                        <span className="text-sm text-gray-500">
                          {lesson.duration} min
                        </span>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}