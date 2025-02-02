import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Library,
  Menu,
  Settings,
  Trophy,
  X,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Learning Path",
    href: "/dashboard/learning-path",
    icon: GraduationCap,
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    icon: Library,
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Trophy,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardNavProps {
  isCollapsed?: boolean
}

export function DashboardNav({ isCollapsed }: DashboardNavProps) {
  const router = useRouter()
  const path = router.pathname
  const [isOpen, setIsOpen] = useState(false)

  const NavItems = () => (
    <>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                path === item.href ? "bg-accent" : "transparent",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>{item.title}</span>}
            </span>
          </Link>
        )
      })}
    </>
  )

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-4 py-4">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <div className="grid items-start gap-2">
          <NavItems />
        </div>
      </nav>
    </>
  )
}