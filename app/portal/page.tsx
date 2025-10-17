"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserCog, ShieldCheck } from "lucide-react";

export default function PortalPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-20">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Evalify
          </span>{" "}
          Portal
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Choose your role and dive into seamless AI-powered evaluation
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Student Card */}
        <Card className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center mb-4">
              <GraduationCap size={28} />
            </div>
            <CardTitle className="text-xl font-bold">Student</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-sm">
              Attempt tests, view scores, and read detailed AI-generated feedback instantly.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg"
            >
              <Link href="/student/login">Login as Student</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Teacher Card */}
        <Card className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center mb-4">
              <UserCog size={28} />
            </div>
            <CardTitle className="text-xl font-bold">Teacher</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-sm">
              Create tests, auto-evaluate submissions, and track student performance.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-teal-500 hover:to-green-500 shadow-lg"
            >
              <Link href="/teacher/login">Login as Teacher</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Admin Card */}
        <Card className="rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-purple-500/20 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck size={28} />
            </div>
            <CardTitle className="text-xl font-bold">Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-sm">
              Manage roles, view analytics, and ensure system security and transparency.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg"
            >
              <Link href="/admin/login">Login as Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
