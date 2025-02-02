import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/util/supabase/api'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { name, bio, avatarUrl } = req.body

    const updatedProfile = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name,
        bio,
        avatarUrl,
      },
      create: {
        id: user.id,
        email: user.email!,
        name,
        bio,
        avatarUrl,
      },
    })

    return res.status(200).json(updatedProfile)
  } catch (error) {
    console.error('Profile update error:', error)
    return res.status(500).json({ message: 'Error updating profile' })
  }
}