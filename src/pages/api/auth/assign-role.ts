import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { createClient } from '@/util/supabase/api';

const validRoles = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, role } = req.body;

    if (!userId || !role || !validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid or missing required fields' });
    }

    // Verify the user exists in Supabase and check if requester is an admin
    const supabase = createClient(req, res);
    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the requester is an admin
    const requester = await prisma.user.findUnique({
      where: { id: authUser.user.id }
    });

    if (!requester || requester.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only administrators can assign roles' });
    }

    // Update or create user with role in Prisma
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { 
        role: role as 'STUDENT' | 'INSTRUCTOR' | 'ADMIN',
        updatedAt: new Date()
      },
      create: {
        id: userId,
        email: authUser.user.email!,
        role: role as 'STUDENT' | 'INSTRUCTOR' | 'ADMIN',
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error assigning role:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}