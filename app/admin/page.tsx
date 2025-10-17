"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

type ReportRow = {
  student: string
  test: string
  mcq: number
  subjective: number
}

const reports: ReportRow[] = [
  { student: "Aanya Kapoor", test: "Math Unit 1", mcq: 18, subjective: 16 },
  { student: "Rohan Mehta", test: "Math Unit 1", mcq: 15, subjective: 14 },
  { student: "Sara Iqbal", test: "Math Unit 1", mcq: 20, subjective: 19 },
  { student: "Kabir Shah", test: "Math Unit 1", mcq: 12, subjective: 10 },
  { student: "Meera Rao", test: "Math Unit 1", mcq: 16, subjective: 17 },
]

function toTotals(rows: ReportRow[]) {
  return rows.map((r) => ({ ...r, total: r.mcq + r.subjective }))
}

const totals = toTotals(reports)
const classAverage = Math.round((totals.reduce((acc, r) => acc + r.total, 0) / Math.max(1, totals.length)) * 100) / 100

const passes = totals.filter((r) => r.total >= 30).length
const fails = totals.length - passes
const passPercentage = Math.round((passes / Math.max(1, totals.length)) * 100)

const chartData = [
  { name: "Pass", value: passes, color: "var(--brand-primary)" },
  { name: "Fail", value: fails, color: "var(--brand-primary-2)" },
]

const topScorer = totals.reduce((a, b) => (a.total > b.total ? a : b))

function exportCSV(rows: ReturnType<typeof toTotals>) {
  const header = ["Student Name", "Test Name", "MCQ Marks", "Subjective Marks", "Total", "Result"]
  const body = rows.map((r) => [
    r.student,
    r.test,
    String(r.mcq),
    String(r.subjective),
    String(r.total),
    r.total >= 30 ? "Pass" : "Fail",
  ])
  const csv = [header, ...body].map((arr) => arr.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "evalify-student-reports.csv"
  link.click()
  URL.revokeObjectURL(url)
}

export default function AdminDashboardPage() {
  const router = useRouter()

  // Redirect to login if not authed (demo)
  useEffect(() => {
    const ok = typeof window !== "undefined" && localStorage.getItem("evalify_admin_authed") === "true"
    if (!ok) router.replace("/admin/login")
  }, [router])

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">Overview, student reports, and quick insights.</p>
      </div>

      {/* Overview Cards */}
      <section aria-labelledby="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Tests Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">124</p>
          </CardContent>
        </Card>

        <Card className="border bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pass Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{passPercentage}%</p>
          </CardContent>
        </Card>

        <Card className="border bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{classAverage}</p>
          </CardContent>
        </Card>

        <Card className="border bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Top Scorer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-foreground">
              {topScorer.student} • {topScorer.total}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Pass/Fail Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="border">
          <CardHeader>
            <CardTitle>Pass/Fail Ratio</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Button
              onClick={() => exportCSV(totals)}
              className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white"
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("evalify_admin_authed")
                // Simple logout pattern for demo
                router.replace("/admin/login")
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Student Reports */}
      <section aria-labelledby="student-reports">
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Reports</CardTitle>
            <Button variant="ghost" onClick={() => exportCSV(totals)} className="text-primary hover:text-primary/90">
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Summary of results for the selected test.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead className="text-right">MCQ Marks</TableHead>
                  <TableHead className="text-right">Subjective Marks</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totals.map((r, i) => (
                  <TableRow key={r.student} className={i % 2 === 0 ? "bg-primary/5" : ""}>
                    <TableCell className="font-medium">{r.student}</TableCell>
                    <TableCell>{r.test}</TableCell>
                    <TableCell className="text-right">{r.mcq}</TableCell>
                    <TableCell className="text-right">{r.subjective}</TableCell>
                    <TableCell className="text-right">{r.total}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          r.total >= 30 ? "bg-primary/10" : "bg-primary/5"
                        } text-foreground`}
                      >
                        {r.total >= 30 ? "Pass" : "Fail"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    Class Average
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground" colSpan={2}>
                    {classAverage}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{passPercentage}% Pass</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
