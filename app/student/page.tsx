"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type MCQ = {
  id: string
  q: string
  options: { key: string; label: string }[]
  answer: string
}

type TestMeta = {
  id: string
  name: string
  duration: string
  mcqs: MCQ[]
}

type ResultRow = {
  id: string
  testId: string
  studentName: string
  studentEmail: string
  testName: string
  date: string
  mcqScore: number
  subjectiveScore: number
  total: number
}

export default function StudentDashboardPage() {
  const router = useRouter()

  const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
  const [tests, setTests] = useState<TestMeta[]>([])
  const [history, setHistory] = useState<ResultRow[]>([])
  const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [upload, setUpload] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<ResultRow | null>(null)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  // Check login
  useEffect(() => {
    const flag = localStorage.getItem("evalify_student_logged_in") === "true"
    setLoggedIn(flag)
  }, [])

  // Load tests
  useEffect(() => {
    const raw = localStorage.getItem("teacher_tests")
    if (raw) {
      try {
        const posted = JSON.parse(raw) as any[]
        const normalized: TestMeta[] = posted.map((t, idx) => ({
          id: t.id ?? `test-${idx}`,
          name: t.name,
          duration: t.duration ?? "30m",
          mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
            id: q.id ?? `q${i}`,
            q: q.question ?? q.q ?? "Untitled Question",
            options: (q.options ?? []).map((opt: string, oi: number) => ({
              key: `opt${oi}`,
              label: typeof opt === "string" ? opt : opt.label,
            })),
            answer: typeof q.correctIndex === "number" ? `opt${q.correctIndex}` : q.answer ?? "opt0",
          })),
        }))
        setTests(normalized)
      } catch {
        setTests([])
      }
    }
  }, [])

  // Load previous results
  useEffect(() => {
    const raw = localStorage.getItem("evalify_results")
    if (raw) {
      try {
        setHistory(JSON.parse(raw))
      } catch {}
    }
  }, [])

  // Persist results
  useEffect(() => {
    localStorage.setItem("evalify_results", JSON.stringify(history))
  }, [history])

  // MCQ score calculation
  const mcqScore = useMemo(() => {
    if (!submitted || !selectedTest) return 0
    return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
  }, [answers, submitted, selectedTest])

  // Attempt a test
  const handleAttempt = (test: TestMeta) => {
    setSelectedTest(test)
    setActive("give-test")
    setAnswers({})
    setStudentName("")
    setStudentEmail("")
    setUpload(null)
    setSubmitted(false)
    setResult(null)
  }

  // Submit test
  const submitTest = () => {
    if (!selectedTest || !studentName.trim() || !studentEmail.trim()) return
    const subjective = 14 // placeholder
    const total = mcqScore + subjective
    const row: ResultRow = {
      id: `${selectedTest.id}-${Date.now()}`,
      testId: selectedTest.id,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      testName: selectedTest.name,
      date: new Date().toLocaleString(),
      mcqScore,
      subjectiveScore: subjective,
      total,
    }
    setResult(row)
    setHistory((prev) => [row, ...prev])
    setSubmitted(true)
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("evalify_student_logged_in")
    router.push("/student/login")
  }

  if (loggedIn === false) {
    return (
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
              Student Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/login">
              <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
            <Button variant={active === "dashboard" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
              Dashboard
            </Button>
            <Button variant={active === "give-test" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
              Give Test
            </Button>
            <Button variant={active === "results" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("results")}>
              My Results
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main Panel */}
        <section>
          {/* Dashboard */}
          {active === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
                Welcome back
              </h1>
              <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tests.length === 0 ? (
                  <p className="text-muted-foreground">No tests available yet.</p>
                ) : (
                  tests.map((t) => (
                    <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-base">{t.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
                          Attempt Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Give Test */}
          {active === "give-test" && selectedTest && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
              <p className="text-muted-foreground">Enter your details and answer the MCQs below.</p>

              {/* Name & Email */}
              <Card className="rounded-2xl border-border bg-card/80">
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Your Full Name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                </CardContent>
              </Card>

              {/* MCQs */}
              {selectedTest.mcqs.map((q) => (
                <Card key={q.id} className="rounded-2xl border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-base">{q.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={answers[q.id] ?? ""} onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))} className="grid gap-3">
                      {q.options.map((op) => (
                        <div key={op.key} className="flex items-center gap-3">
                          <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
                          <Label htmlFor={`${q.id}-${op.key}`}>{op.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              {/* Upload */}
              <Card className="rounded-2xl border-border bg-card/80">
                <CardHeader>
                  <CardTitle className="text-base">Upload handwritten answer</CardTitle>
                  <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
                  {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
                  Submit
                </Button>
              </div>

              {submitted && result && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Evaluation Result</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>MCQ Score</CardTitle>
                        <CardDescription>{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>AI Evaluated Subjective</CardTitle>
                        <CardDescription>{result.subjectiveScore} / 20</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>Total Marks</CardTitle>
                        <CardDescription>{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {active === "results" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">My Results</h1>
              {history.length === 0 ? (
                <p className="text-muted-foreground">No attempts yet.</p>
              ) : (
                <div className="grid gap-3">
                  {history.map((r) => (
                    <Card key={r.id} className="rounded-2xl border-border bg-card/80">
                      <CardHeader>
                        <CardTitle>{r.testName}</CardTitle>
                        <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Name: {r.studentName} • Email: {r.studentEmail} <br />
                        MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
