"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudentLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate login (no backend). Persist simple session flag.
    localStorage.setItem("evalify_student_logged_in", "true")
    setTimeout(() => {
      setLoading(false)
      router.push("/student")
    }, 500)
  }

  return (
    <main className="mx-auto max-w-md px-4 md:px-6 py-14">
      <Card className="rounded-2xl border-border bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
            Student Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your dashboard to attempt tests and view results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Prefer to explore first?{" "}
              <Link
                href="/student"
                className="text-foreground underline underline-offset-4 hover:text-foreground/90"
                onClick={() => localStorage.setItem("evalify_student_logged_in", "true")}
              >
                Continue as guest
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
