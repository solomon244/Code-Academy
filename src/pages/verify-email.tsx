import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function VerifyEmail() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('Please check your email for the verification link.')

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (user?.email_confirmed_at) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      setError('Failed to sign out')
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you an email verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => router.push('/login')} variant="outline">
              Back to Login
            </Button>
            <Button onClick={handleSignOut} variant="ghost">
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}