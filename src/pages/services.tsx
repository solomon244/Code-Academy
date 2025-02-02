import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - Ethio Code</title>
        <meta name="description" content="Discover our programming education services for Ethiopian students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Comprehensive programming education services designed specifically for Ethiopian secondary school students
            </p>
          </section>

          {/* Core Services */}
          <section className="container mx-auto px-4 py-16 bg-secondary/10">
            <h2 className="text-3xl font-bold text-center mb-12">Core Learning Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Courses</CardTitle>
                  <CardDescription>
                    Self-paced programming courses with hands-on exercises
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Step-by-step tutorials</li>
                    <li>Practice exercises</li>
                    <li>Instant feedback</li>
                    <li>Progress tracking</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/packages" className="w-full">
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live Sessions</CardTitle>
                  <CardDescription>
                    Real-time learning with experienced instructors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Group classes</li>
                    <li>Q&A sessions</li>
                    <li>Code reviews</li>
                    <li>Peer learning</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/packages" className="w-full">
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project-Based Learning</CardTitle>
                  <CardDescription>
                    Build real projects with guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Practical projects</li>
                    <li>Portfolio building</li>
                    <li>Mentor support</li>
                    <li>Code reviews</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/packages" className="w-full">
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Additional Services */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Support</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>1-on-1 Mentoring</CardTitle>
                  <CardDescription>
                    Personal guidance from industry professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Career guidance</li>
                    <li>Technical advice</li>
                    <li>Project feedback</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>
                    Learn and grow with fellow students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Discussion forums</li>
                    <li>Study groups</li>
                    <li>Code sharing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}