import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'

interface CourseCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
}

export function CourseCard({ id, title, description, image, price }: CourseCardProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleViewDetails = () => {
    router.push(`/courses/${id}`)
  }

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

  return (
    <Card className="w-full max-w-sm">
      <div 
        className="relative w-full h-48 cursor-pointer transition-opacity hover:opacity-90" 
        onClick={handleViewDetails}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          priority
        />
      </div>
      <CardHeader>
        <CardTitle 
          className="text-xl cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleViewDetails}
        >
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          ETB {price.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleEnroll} className="flex-1">
          Enroll Now
        </Button>
        <Button onClick={handleAddToCart} variant="outline" className="flex-1">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}