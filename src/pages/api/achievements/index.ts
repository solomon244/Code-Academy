import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { createClient } from '@/util/supabase/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const supabase = createClient(req, res);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userAchievements = await prisma.userAchievement.findMany({
      where: {
        userId: user.id,
      },
      include: {
        achievement: true,
      },
    });

    return res.status(200).json(userAchievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}