import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const resources = [
  {
    id: "1",
    title: "Programming Fundamentals PDF",
    description: "Comprehensive guide to basic programming concepts",
    type: "PDF",
    link: "#",
  },
  {
    id: "2",
    title: "Web Development Cheat Sheet",
    description: "Quick reference for HTML, CSS, and JavaScript",
    type: "Document",
    link: "#",
  },
  {
    id: "3",
    title: "Git Basics Tutorial",
    description: "Learn version control with Git",
    type: "Video",
    link: "#",
  },
  {
    id: "4",
    title: "Coding Practice Exercises",
    description: "Collection of programming exercises",
    type: "Interactive",
    link: "#",
  },
];

export default function Resources() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Type: {resource.type}
                  </span>
                  <Button variant="outline" size="sm">
                    {resource.type === "PDF" ? (
                      <Download className="h-4 w-4 mr-2" />
                    ) : (
                      <ExternalLink className="h-4 w-4 mr-2" />
                    )}
                    Access Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}