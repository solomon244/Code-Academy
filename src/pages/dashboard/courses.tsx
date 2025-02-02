import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch("/api/courses/enrolled");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Learning Journey</h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-pulse">Loading your courses...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Completed Lessons</span>
                      <span>{course.completedLessons} / {course.totalLessons}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/courses/${course.id}`} className="w-full">
                    <Button className="w-full">
                      {course.progress === 100 ? "Review Course" : "Continue Learning"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            {courses.length === 0 && (
              <div className="col-span-full text-center p-8">
                <h3 className="text-lg font-semibold mb-2">No Enrolled Courses</h3>
                <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet.</p>
                <Link href="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}