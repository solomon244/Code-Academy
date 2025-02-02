import React from "react";
import Head from "next/head";
import LandingHeader from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Code, Book, Users, Trophy, Laptop, Brain, Rocket, Shield, Mobile, Database, CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-green-500" />,
      title: "Personalized Learning",
      description: "Adaptive paths tailored to your skill level and goals"
    },
    {
      icon: <Code className="w-6 h-6 text-yellow-500" />,
      title: "Interactive Coding",
      description: "Practice with real-time feedback and guidance"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Community Support",
      description: "Learn alongside fellow Ethiopian students"
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-500" />,
      title: "Achievement System",
      description: "Track progress and earn certificates"
    }
  ];

  const reviews = [
    {
      name: "Abebe Kebede",
      role: "Student",
      content: "Ethio Code helped me understand programming concepts in a way that relates to our local context. The platform is amazing!",
      avatar: "AK",
      rating: 5
    },
    {
      name: "Sara Tesfaye",
      role: "High School Student",
      content: "The interactive lessons and practical projects made learning to code fun and engaging. I've already built my first website!",
      avatar: "ST",
      rating: 5
    },
    {
      name: "Dawit Haile",
      role: "Student",
      content: "As a beginner, I found the step-by-step approach very helpful. The community support is also great!",
      avatar: "DH",
      rating: 4
    }
  ];

  const learningPath = [
    {
      icon: <Brain className="w-6 h-6 text-yellow-500" />,
      name: "Scratch",
      desc: "Visual programming for beginners",
      color: "hover:bg-yellow-50 dark:hover:bg-yellow-950/30"
    },
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      name: "Python",
      desc: "The perfect first text-based language",
      color: "hover:bg-blue-50 dark:hover:bg-blue-950/30"
    },
    {
      icon: <Laptop className="w-6 h-6 text-green-500" />,
      name: "Web Basics",
      desc: "HTML, CSS & JavaScript fundamentals",
      color: "hover:bg-green-50 dark:hover:bg-green-950/30"
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-500" />,
      name: "Advanced Topics",
      desc: "Databases, APIs & more",
      color: "hover:bg-purple-50 dark:hover:bg-purple-950/30"
    }
  ];

  return (
    <>
      <Head>
        <title>Ethio Code - Programming Education for Ethiopian Students</title>
        <meta name="description" content="Learn programming in a fun and interactive way, tailored for Ethiopian secondary school students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <LandingHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] dark:bg-grid-slate-400/[0.05] -z-10" />
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                  className="flex-1 space-y-6 text-center lg:text-left"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-green-600 to-yellow-600 dark:from-green-400 dark:to-yellow-400 text-transparent bg-clip-text">
                      Shape Ethiopia's
                    </span>
                    <br />
                    Digital Future
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                    Join Ethiopia's premier programming education platform designed specifically for secondary school students.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <Link href="/signup">
                      <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white w-full sm:w-auto">
                        Start Learning Now <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/courses">
                      <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                  <div className="pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Interactive Learning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Ethiopian Context</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Community Support</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1"
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg blur opacity-30 dark:opacity-40" />
                    <div className="relative bg-background rounded-lg overflow-hidden shadow-xl">
                      <img
                        src="https://assets.co.dev/b47922b8-14b1-4d2f-aebf-f7cc8fdbf724/photo_2025-01-11_17-36-36-77660d8.jpg"
                        alt="Students learning to code"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Why Choose Ethio Code?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our platform is designed to make learning programming accessible, engaging, and relevant for Ethiopian students.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="h-full bg-gradient-to-br from-background to-secondary/20 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mb-4">{feature.icon}</div>
                        <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Learning Path Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-center mb-12">Your Learning Journey</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningPath.map((path, index) => (
                    <motion.div
                      key={path.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className={`h-full transition-all duration-300 ${path.color} hover:scale-105`}>
                        <CardHeader>
                          <div className="flex justify-center mb-4">{path.icon}</div>
                          <CardTitle>{path.name}</CardTitle>
                          <CardDescription>{path.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Courses Section */}
          <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <CourseCard
                    id="mern-stack"
                    title="Full-Stack Web Development with MERN"
                    description="Master MongoDB, Express.js, React, and Node.js. Build complete web applications from scratch."
                    image="/images/mern-stack.jpg"
                    price={199.99}
                  />
                  <CourseCard
                    id="python-beginners"
                    title="Python for Beginners"
                    description="Start your programming journey with Python. Learn fundamentals and build practical applications."
                    image="/images/python.jpg"
                    price={149.99}
                  />
                  <CourseCard
                    id="cyber-security"
                    title="Cyber Security Fundamentals"
                    description="Learn essential cybersecurity concepts and protect systems from cyber threats."
                    image="/images/cyber-security.jpg"
                    price={249.99}
                  />
                </div>
                <div className="text-center mt-12">
                  <Link href="/courses">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      View All Courses <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="h-full bg-gradient-to-br from-green-50/50 to-yellow-50/50 dark:from-green-950/30 dark:to-yellow-950/30">
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 flex items-center justify-center text-white font-semibold">
                              {review.avatar}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{review.name}</CardTitle>
                              <CardDescription>{review.role}</CardDescription>
                            </div>
                          </div>
                          <div className="flex mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <CardDescription className="text-base italic">"{review.content}"</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-950/50 dark:to-yellow-950/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl mb-4">Be Part of Ethiopia's Tech Revolution</CardTitle>
                    <CardDescription className="text-lg mb-6">
                      Join our growing community of young Ethiopian programmers and shape the future of technology
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link href="/signup">
                        <Button size="lg" className="text-lg px-8 w-full sm:w-auto bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700">
                          Create Account <Users className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/courses">
                        <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                          Browse Courses <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}