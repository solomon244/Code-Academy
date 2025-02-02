import { ChatInterface } from '@/components/ChatInterface'

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">AI Programming Tutor</h1>
          <p className="text-gray-500">
            Get personalized help with your programming questions from our AI tutor,
            designed specifically for Ethiopian students.
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  )
}