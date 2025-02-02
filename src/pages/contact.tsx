import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic to be implemented
  };

  return (
    <>
      <Head>
        <title>Contact Us - Ethio Code</title>
        <meta name="description" content="Get in touch with Ethio Code - Your programming education partner in Ethiopia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Have questions? We're here to help you on your programming journey
            </p>
          </section>

          {/* Contact Form Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Other ways to reach us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground">info@ethiocode.edu.et</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-muted-foreground">+251 11 234 5678</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Office Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM EAT</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                    <CardDescription>
                      Quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">How do I start learning?</h3>
                      <p className="text-muted-foreground">
                        Sign up for a free account and start with our basic courses.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Do you offer school partnerships?</h3>
                      <p className="text-muted-foreground">
                        Yes, we work with schools across Ethiopia. Contact us for details.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}