import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/util/supabase/api'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { id } = req.query

  if (id !== user.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
      },
    })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    return res.status(200).json(profile)
  } catch (error) {
    console.error('Profile fetch error:', error)
    return res.status(500).json({ message: 'Error fetching profile' })
  }
}