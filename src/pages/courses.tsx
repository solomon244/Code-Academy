import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CartComponent } from '@/components/CartComponent'
import { useToast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Lesson {
  id: string
  title: string
  content: string
  order: number
  duration: number
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
  price: number
  imageUrl?: string
  level: string
  duration: number
  language: string
  prerequisites: string[]
  objectives: string[]
  modules: Module[]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/courses')
      if (!response.ok) {
        throw new Error('Failed to fetch courses')
      }
      const data = await response.json()
      console.log('Fetched courses:', data)
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to load courses. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add courses to your cart",
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
        body: JSON.stringify({ courseId }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Course added to cart",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add course to cart",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add course to cart",
        variant: "destructive",
      })
    }
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Available Courses</h1>
              <p className="text-muted-foreground mt-2">
                Discover programming courses tailored for Ethiopian students
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    {course.imageUrl && (
                      <div className="aspect-video relative">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">{course.title}</h2>
                        <Badge variant="secondary">
                          ${course.price.toFixed(2)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{Math.floor(course.duration / 60)}h {course.duration % 60}m</Badge>
                        </div>
                      </div>

                      {course.modules && course.modules.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold mb-2">Course Content:</h3>
                          <ul className="text-sm text-muted-foreground">
                            {course.modules.slice(0, 2).map((module) => (
                              <li key={module.id} className="mb-1">
                                • {module.title} ({module.lessons.length} lessons)
                              </li>
                            ))}
                            {course.modules.length > 2 && (
                              <li className="text-xs italic">
                                + {course.modules.length - 2} more modules
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <Button 
                        onClick={() => addToCart(course.id)}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No courses found matching your search.' : 'No courses available.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="lg:col-span-1 sticky top-4">
          <CartComponent />
        </div>
      </div>
    </div>
  )
}