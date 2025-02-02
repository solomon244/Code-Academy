import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { createClient } from '@/util/supabase/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const supabase = createClient(req, res);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user's progress data
    const userProgress = await prisma.progress.findMany({
      where: {
        enrollment: {
          userId: user.id
        }
      },
      include: {
        enrollment: {
          include: {
            course: true
          }
        }
      }
    });

    // Calculate achievements
    const completedLessons = userProgress.filter(p => p.completed).length;
    const uniqueCourses = new Set(userProgress.map(p => p.enrollment.courseId)).size;
    const achievements = [];

    // Check for first lesson completion
    if (completedLessons >= 1) {
      achievements.push({
        name: "First Steps",
        description: "Completed your first programming lesson",
        badgeUrl: "/images/badges/first-steps.png",
        points: 10,
        criteria: "Complete first lesson"
      });
    }

    // Check for 5 lessons completion
    if (completedLessons >= 5) {
      achievements.push({
        name: "Quick Learner",
        description: "Completed 5 programming lessons",
        badgeUrl: "/images/badges/quick-learner.png",
        points: 25,
        criteria: "Complete 5 lessons"
      });
    }

    // Check for course enrollment
    if (uniqueCourses >= 1) {
      achievements.push({
        name: "Course Explorer",
        description: "Enrolled in your first course",
        badgeUrl: "/images/badges/course-explorer.png",
        points: 15,
        criteria: "Enroll in first course"
      });
    }

    // Award achievements
    for (const achievement of achievements) {
      const existingAchievement = await prisma.achievement.findUnique({
        where: { name: achievement.name }
      });

      let achievementId;

      if (!existingAchievement) {
        // Create new achievement if it doesn't exist
        const newAchievement = await prisma.achievement.create({
          data: achievement
        });
        achievementId = newAchievement.id;
      } else {
        achievementId = existingAchievement.id;
      }

      // Check if user already has this achievement
      const existingUserAchievement = await prisma.userAchievement.findFirst({
        where: {
          userId: user.id,
          achievementId: achievementId
        }
      });

      if (!existingUserAchievement) {
        // Award new achievement to user
        await prisma.userAchievement.create({
          data: {
            userId: user.id,
            achievementId: achievementId
          }
        });
      }
    }

    return res.status(200).json({ message: 'Achievements processed successfully' });
  } catch (error) {
    console.error('Error processing achievements:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}