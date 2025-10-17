"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI Grading",
    description: "Consistent, rubric-aligned scoring that scales with your classroom.",
  },
  {
    title: "Instant Feedback",
    description: "Actionable comments to help students improve faster.",
  },
  {
    title: "Performance Analytics",
    description: "Track trends, identify gaps, and inform instruction with data.",
  },
]

export function Features() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
            Built for better evaluation
          </h2>
          <p className="mt-2 text-muted-foreground">
            Simple, fair, and transparent—so every submission gets the feedback it deserves.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl border-border bg-card/80 transition hover:shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
