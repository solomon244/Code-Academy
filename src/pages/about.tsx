import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Head>
        <title>About - Ethio Code</title>
        <meta name="description" content="Learn about Ethio Code's mission to empower Ethiopian students with programming skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Mission Section */}
          <section className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              Our Mission
            </h1>
            <Card className="max-w-3xl mx-auto mb-12">
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ethio Code is dedicated to empowering Ethiopian secondary school students with essential 
                  programming skills. We believe in building a strong technological foundation for Ethiopia's 
                  future by providing accessible, high-quality programming education.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Vision and Values */}
          <section className="container mx-auto px-4 py-16 bg-secondary/10">
            <h2 className="text-3xl font-bold text-center mb-12">Our Vision & Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Local Impact</CardTitle>
                  <CardDescription>
                    Creating educational content that resonates with Ethiopian context and culture
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quality Education</CardTitle>
                  <CardDescription>
                    Delivering world-class programming education adapted for Ethiopian students
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Digital Future</CardTitle>
                  <CardDescription>
                    Building the foundation for Ethiopia's next generation of tech leaders
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Educators</CardTitle>
                  <CardDescription>
                    Experienced programming instructors passionate about teaching
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Developers</CardTitle>
                  <CardDescription>
                    Tech professionals creating engaging learning experiences
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mentors</CardTitle>
                  <CardDescription>
                    Industry experts guiding students on their learning journey
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}