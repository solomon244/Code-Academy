import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

const learningPaths = [
  {
    id: "beginner",
    title: "Beginner Path",
    description: "Start your programming journey",
    courses: [
      "Introduction to Programming",
      "Basic Web Development",
      "JavaScript Fundamentals",
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate Path",
    description: "Advance your skills",
    courses: [
      "Advanced JavaScript",
      "React Fundamentals",
      "Backend Development",
    ],
  },
  {
    id: "advanced",
    title: "Advanced Path",
    description: "Master complex concepts",
    courses: [
      "Full Stack Development",
      "System Design",
      "Cloud Computing",
    ],
  },
];

export default function LearningPath() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Learning Paths</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {path.courses.map((course, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}