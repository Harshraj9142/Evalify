"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
              Evalify – Smart, Fair & Instant Evaluation
            </h1>
            <p className="text-pretty text-muted-foreground md:text-lg">
              Automated grading, transparent feedback, and data-driven insights.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/student">
                <Button className="rounded-xl px-5 py-5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground shadow-sm hover:opacity-95 transition-opacity">
                  Login as Student
                </Button>
              </Link>
              <Link href="/teacher">
                <Button
                  variant="secondary"
                  className="rounded-xl px-5 py-5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
                >
                  Login as Teacher
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="rounded-xl px-5 py-5 border-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
                >
                  Login as Admin
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="aspect-square w-full rounded-2xl border border-border bg-card/60 p-6">
              {/* Decorative illustration placeholder with alt for SR users */}
              <Image
                src="/education-ai-illustration.jpg"
                width={320}
                height={320}
                alt="Abstract illustration representing AI-powered academic evaluation"
                className="mx-auto h-auto w-3/4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
