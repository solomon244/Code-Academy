import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { createClient } from '@/util/supabase/api'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ message: 'Message is required' })
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful programming tutor for Ethiopian students. Your responses should be encouraging, clear, and culturally relevant to Ethiopia. Keep responses concise and focused on helping students learn programming concepts."
        },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
    })

    const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't process your request at the moment."

    // Save the chat interaction
    await prisma.chat.create({
      data: {
        userId: user.id,
        message,
        response,
      }
    })

    return res.status(200).json({ response })
  } catch (error) {
    console.error('Error processing AI request:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}