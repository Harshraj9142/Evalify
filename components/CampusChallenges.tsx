"use client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function CampusChallenges() {
  const problems = [
    {
      title: "Time-Consuming Grading",
      desc: "Manual evaluation of assignments and exams takes hours, delaying feedback.",
    },
    {
      title: "Inconsistent Scoring",
      desc: "Human errors and subjective grading lead to unfair and varying results.",
    },
    {
      title: "Limited Insights",
      desc: "Difficult to track student performance trends and identify strengths or weaknesses.",
    },
    {
      title: "Delayed Feedback",
      desc: "Students wait days or weeks to receive assessment results and guidance.",
    },
  ];

  const solutions = [
    {
      title: "AI-Powered Evaluation",
      desc: "Automated grading of objective and descriptive answers for faster results.",
    },
    {
      title: "Consistent & Fair Scoring",
      desc: "AI ensures uniform and unbiased evaluation across all submissions.",
    },
    {
      title: "Instant Performance Insights",
      desc: "Real-time analytics highlight strengths, weaknesses, and improvement areas.",
    },
    {
      title: "Immediate Feedback",
      desc: "Students receive evaluated results instantly, enabling continuous learning.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
        Simplifying Student Evaluations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Problems */}
        <div>
          <h3 className="text-3xl font-semibold text-red-600 mb-6 -ml-32">
            The Problem
          </h3>
          <ul className="space-y-6">
            {problems.map((item, i) => (
              <li key={i} className="flex items-start space-x-4">
                <XCircle className="w-6 h-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-600 mb-6 -ml-32">
            The Solution
          </h3>
          <ul className="space-y-6">
            {solutions.map((item, i) => (
              <li key={i} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
