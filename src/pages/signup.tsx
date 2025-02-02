import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleButton from '@/components/GoogleButton';
import Logo from '@/components/Logo';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignUpPage = () => {
  const router = useRouter();
  const { initializing, signUp } = useContext(AuthContext);
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const { email, password, role } = formik.values;
      const result = await signUp(email, password);
      
      if (result?.data?.user) {
        // Assign role to the user
        const response = await fetch('/api/auth/assign-role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: result.data.user.id,
            role: role,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to assign role');
        }

        // Sign in the user immediately after signup
        await signIn(email, password);
        router.push('/dashboard');
        toast({
          title: "Account created successfully",
          description: "Welcome to Ethio Code!",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    fatherName: Yup.string().required("Father Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Must be at least 4 characters")
      .max(40, "Must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref('password')], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      fatherName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
    validationSchema,
    onSubmit: handleSignUp,
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSignUp(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-background to-yellow-50 dark:from-green-950/30 dark:via-background dark:to-yellow-950/30">
      <div className="w-full max-w-[440px] space-y-6">
        <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push("/")}>
          <Logo />
        </div>

        <Card className="border-2 shadow-lg backdrop-blur-sm bg-background/95" onKeyDown={handleKeyPress}>
          <CardHeader>
            <CardTitle className="text-center">Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <GoogleButton />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/magic-link-login');
                    }}
                    variant="outline"
                  >
                    Continue with Magic Link
                  </Button>
                </div>

                <div className="flex items-center w-full">
                  <Separator className="flex-1" />
                  <span className="mx-4 text-muted-foreground text-sm font-semibold whitespace-nowrap">or</span>
                  <Separator className="flex-1" />
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-center text-sm text-muted-foreground">Enter your details</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-destructive text-xs">{formik.errors.name}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="fatherName">Father Name</Label>
                      <Input
                        id="fatherName"
                        name="fatherName"
                        type="text"
                        placeholder="Enter your father's name"
                        value={formik.values.fatherName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fatherName && formik.errors.fatherName && (
                        <p className="text-destructive text-xs">{formik.errors.fatherName}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-destructive text-xs">{formik.errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPw ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPw(!showPw)}
                        >
                          {showPw
                            ? <FaEye className="text-muted-foreground" />
                            : <FaEyeSlash className="text-muted-foreground" />
                          }
                        </Button>
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-destructive text-xs">{formik.errors.password}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPw ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPw(!showPw)}
                        >
                          {showPw
                            ? <FaEye className="text-muted-foreground" />
                            : <FaEyeSlash className="text-muted-foreground" />
                          }
                        </Button>
                      </div>
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="text-destructive text-xs">{formik.errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        name="role"
                        value={formik.values.role}
                        onValueChange={(value) => formik.setFieldValue('role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end mt-2 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span>Already have an account?</span>
                        <Button
                          type="button"
                          variant="link"
                          className="p-0"
                          onClick={() => router.push('/login')}
                        >
                          Log in
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || initializing || !formik.values.email || !formik.values.password || !formik.isValid}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
