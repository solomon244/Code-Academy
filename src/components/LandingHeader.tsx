import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingHeader() {
  const { user } = useAuth();

  return (
    <header className="fixed w-full z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-white hover:text-primary transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-white hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}