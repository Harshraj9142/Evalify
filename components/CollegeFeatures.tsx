"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  FileText,
  UserCheck,
  BarChart,
  ShieldCheck,
} from "lucide-react";

export default function CollegeFeatures() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Evaluation",
      desc: "Automatically grade assignments, tests, and exams accurately and efficiently.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Student Dashboard",
      desc: "Track performance, view feedback, and monitor learning progress in real-time.",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Instant Feedback",
      desc: "Provide students with immediate, actionable insights to improve learning outcomes.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Teacher Control Panel",
      desc: "Review AI evaluations, override scores, and manage assessments with ease.",
    },
    {
      icon: <BarChart className="w-8 h-8 text-blue-600" />,
      title: "Analytics & Reports",
      desc: "Generate detailed performance reports and track class or topic-level insights.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Secure & Transparent",
      desc: "Encrypted submissions, plagiarism detection, and transparent evaluation for all users.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">
          All Your Student Evaluations, Seamlessly Under One Roof
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          From assignments to exams — Evalify automates grading, delivers instant feedback, and provides AI-driven insights to empower students and teachers.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-2xl">{feature.title}</h4>
              <p className="text-gray-600 text-md">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
