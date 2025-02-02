import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import CodeEditor from './CodeEditor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  order: number
  hasExercise?: boolean
  exercisePrompt?: string
  exerciseStarterCode?: string
  exerciseLanguage?: string
}

interface LessonViewerProps {
  moduleId: string
  lessons: Lesson[]
  onComplete: () => void
  initialProgress?: number
}

export default function LessonViewer({ 
  moduleId, 
  lessons, 
  onComplete,
  initialProgress = 0 
}: LessonViewerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [progress, setProgress] = useState(initialProgress)
  const { toast } = useToast()

  const currentLesson = lessons[currentLessonIndex]
  const isFirstLesson = currentLessonIndex === 0
  const isLastLesson = currentLessonIndex === lessons.length - 1

  const updateProgress = async () => {
    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId,
          lessonId: currentLesson.id,
          completed: true,
        }),
      })

      if (!response.ok) throw new Error('Failed to update progress')

      const newProgress = ((currentLessonIndex + 1) / lessons.length) * 100
      setProgress(newProgress)

      if (isLastLesson) {
        onComplete()
        toast({
          title: "Congratulations!",
          description: "You've completed all lessons in this module!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      })
    }
  }

  const handleNext = () => {
    if (!isLastLesson) {
      updateProgress()
      setCurrentLessonIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(prev => prev - 1)
    }
  }

  const [activeTab, setActiveTab] = useState<string>('content')

  useEffect(() => {
    setActiveTab('content')
  }, [currentLessonIndex])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          Lesson {currentLessonIndex + 1}: {currentLesson.title}
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Lesson Content</TabsTrigger>
            {currentLesson.hasExercise && (
              <TabsTrigger value="exercise">Practice Exercise</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="content">
            <div className="prose max-w-none">
              <div className="min-h-[300px] mb-6" 
                   dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
            </div>
          </TabsContent>

          {currentLesson.hasExercise && (
            <TabsContent value="exercise">
              <div className="space-y-4">
                {currentLesson.exercisePrompt && (
                  <div className="prose max-w-none mb-4">
                    <h3>Exercise</h3>
                    <p>{currentLesson.exercisePrompt}</p>
                  </div>
                )}
                <CodeEditor
                  initialCode={currentLesson.exerciseStarterCode || ''}
                  language={currentLesson.exerciseLanguage || 'javascript'}
                />
              </div>
            </TabsContent>
          )}
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            disabled={isFirstLesson}
            variant="outline"
          >
            Previous Lesson
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLastLesson}
          >
            {isLastLesson ? 'Complete Module' : 'Next Lesson'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}