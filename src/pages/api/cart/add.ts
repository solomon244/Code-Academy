import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { createClient } from '@/util/supabase/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabase = createClient(req, res)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { courseId } = req.body

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' })
  }

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        }
      })
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        courseId,
      },
      include: {
        course: true
      }
    })

    return res.status(200).json(cartItem)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}