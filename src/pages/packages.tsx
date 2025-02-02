import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Packages() {
  return (
    <>
      <Head>
        <title>Learning Packages - Ethio Code</title>
        <meta name="description" content="Choose the perfect programming learning package for your needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              Learning Packages
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Choose the perfect package to start your programming journey
            </p>
          </section>

          {/* Pricing Plans */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Package */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for beginners</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Basic programming concepts
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Access to Scratch tutorials
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Community forum access
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Basic exercises
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Standard Package */}
              <Card className="relative border-primary">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <CardDescription>Comprehensive learning path</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">499 ETB</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      All Starter features
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Python & Web Development
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Weekly live sessions
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Project assignments
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Basic mentoring
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full" variant="default">Subscribe Now</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Premium Package */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Advanced learning & support</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">999 ETB</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      All Standard features
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      1-on-1 mentoring
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Advanced projects
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Career guidance
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">✓</Badge>
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Get Premium</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 py-16 bg-secondary/10">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Can I switch packages?</CardTitle>
                  <CardDescription>
                    Yes, you can upgrade or downgrade your package at any time. Changes will take effect in the next billing cycle.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>What payment methods are accepted?</CardTitle>
                  <CardDescription>
                    We accept various payment methods including mobile money, bank transfer, and credit cards.
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