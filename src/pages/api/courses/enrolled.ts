import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/util/supabase/api";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const supabase = createClient(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
        progress: true,
      },
    });

    const formattedCourses = await Promise.all(
      enrolledCourses.map(async (enrollment) => {
        // Count total lessons in the course
        const totalLessons = enrollment.course.modules.reduce(
          (acc, module) => acc + module.lessons.length,
          0
        );

        // Count completed lessons
        const completedLessons = await prisma.progress.count({
          where: {
            enrollmentId: enrollment.id,
            completed: true,
          },
        });

        const progress = totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

        return {
          id: enrollment.courseId,
          title: enrollment.course.title,
          description: enrollment.course.description,
          progress,
          totalLessons,
          completedLessons,
        };
      })
    );

    return res.status(200).json(formattedCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}