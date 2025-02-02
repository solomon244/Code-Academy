import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/Logo';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ShoppingCart, MessageSquare, Sun, Moon, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { user, initializing, signOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(router.pathname);

  const NavigationItems = () => (
    <>
      {user ? (
        <>
          <Button 
            onClick={() => router.push("/chat")}
            variant="ghost"
            size="icon"
            className="relative"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button 
            onClick={() => router.push("/courses")}
            variant="ghost"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button 
            onClick={() => router.push("/dashboard")}
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            Dashboard
          </Button>
          <Button 
            onClick={handleSignOut}
            variant="default"
            className="hidden sm:inline-flex"
          >
            Log out
          </Button>
        </>
      ) : !isAuthPage ? (
        <>
          <Link href="/signup" className="hidden sm:inline-flex">
            <Button variant="default">
              Sign Up
            </Button>
          </Link>
          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="secondary">
              Log In
            </Button>
          </Link>
        </>
      ) : null}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hidden sm:inline-flex"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4 mt-8">
          {user ? (
            <>
              <Button onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button onClick={() => router.push("/courses")}>
                Courses
              </Button>
              <Button onClick={() => router.push("/chat")}>
                Chat
              </Button>
              <Button onClick={handleSignOut} variant="destructive">
                Log out
              </Button>
            </>
          ) : !isAuthPage ? (
            <>
              <Link href="/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button className="w-full" variant="secondary">Log In</Button>
              </Link>
            </>
          ) : null}
          <Button
            variant="outline"
            className="w-full"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <><Sun className="h-5 w-5 mr-2" /> Light Mode</>
            ) : (
              <><Moon className="h-5 w-5 mr-2" /> Dark Mode</>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        {!initializing && (
          <div className="flex items-center gap-4">
            <NavigationItems />
            <MobileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;