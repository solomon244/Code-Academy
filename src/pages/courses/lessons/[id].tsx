import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import LessonViewer from '@/components/LessonViewer'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  order: number
  moduleId: string
}

export default function LessonPage() {
  const router = useRouter()
  const { id } = router.query
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id || !user) return

      try {
        const response = await fetch(`/api/courses/lessons/${id}`)
        if (!response.ok) throw new Error('Failed to fetch lesson')
        const data = await response.json()
        setLesson(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load lesson content",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [id, user, toast])

  const handleModuleComplete = () => {
    router.push(`/courses/${lesson?.module?.courseId}`)
  }

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (!lesson) {
    return <div className="container mx-auto p-6">Lesson not found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <LessonViewer
        moduleId={lesson.moduleId}
        lessons={[lesson]} // For now, we're just showing one lesson
        onComplete={handleModuleComplete}
      />
    </div>
  )
}