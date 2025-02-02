import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/Footer"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
  Clock,
  Target,
  ChevronRight,
  Star,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user } = useAuth()

  const stats = [
    {
      title: "Courses in Progress",
      value: "3",
      icon: BookOpen,
      change: "+1 this week",
      color: "text-blue-500",
    },
    {
      title: "Completed Courses",
      value: "2",
      icon: GraduationCap,
      change: "Last completed 2 days ago",
      color: "text-green-500",
    },
    {
      title: "Achievements",
      value: "5",
      icon: Trophy,
      change: "2 new unlocked",
      color: "text-yellow-500",
    },
    {
      title: "Study Hours",
      value: "24",
      icon: Clock,
      change: "8 hours this week",
      color: "text-purple-500",
    },
  ]

  const currentCourses = [
    {
      title: "Python for Beginners",
      progress: 75,
      nextLesson: "Functions and Methods",
      timeEstimate: "2 hours remaining",
      image: "/images/python.jpg"
    },
    {
      title: "Web Development Basics",
      progress: 45,
      nextLesson: "CSS Layouts",
      timeEstimate: "4 hours remaining",
      image: "/images/mern-stack.jpg"
    },
    {
      title: "Cyber Security Fundamentals",
      progress: 30,
      nextLesson: "Network Security",
      timeEstimate: "6 hours remaining",
      image: "/images/cyber-security.jpg"
    }
  ]

  const achievements = [
    {
      title: "Quick Learner",
      description: "Completed first course module in record time",
      icon: Star,
      date: "2 days ago"
    },
    {
      title: "Code Streak",
      description: "Coded for 7 days in a row",
      icon: Target,
      date: "1 week ago"
    },
    {
      title: "Team Player",
      description: "Helped 5 other students in the community",
      icon: Users,
      date: "2 weeks ago"
    }
  ]

  const upcomingEvents = [
    {
      title: "Live Coding Session",
      description: "Interactive Python programming workshop",
      date: "Tomorrow, 2:00 PM",
      type: "Workshop"
    },
    {
      title: "Project Submission",
      description: "Web Development milestone project due",
      date: "In 3 days",
      type: "Deadline"
    },
    {
      title: "Study Group Meeting",
      description: "Algorithm practice with peers",
      date: "Saturday, 10:00 AM",
      type: "Group"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader onMenuClick={() => setIsCollapsed(!isCollapsed)} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className={cn(
          "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block",
          isCollapsed && "md:w-[80px]"
        )}>
          <div className="py-6 pr-6">
            <DashboardNav isCollapsed={isCollapsed} />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">
          <div className="flex-1 space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Welcome back{user?.email ? ", " + user.email.split("@")[0] : ""}!
                </h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your learning journey
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/courses">
                  <Button>
                    Browse Courses <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={cn("h-4 w-4", stat.color)} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Current Courses */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                  <CardDescription>Your active learning progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Next: {course.nextLesson}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.timeEstimate}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-right text-muted-foreground">
                          {course.progress}% complete
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/courses" className="w-full">
                    <Button variant="outline" className="w-full">
                      View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Right Column */}
              <div className="col-span-3 space-y-6">
                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="rounded-full bg-secondary p-2">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Your scheduled activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="rounded-full bg-secondary p-2">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                              {event.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {event.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}