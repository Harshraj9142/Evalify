// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// type MCQ = {
//   question: string
//   options: [string, string, string, string]
//   correctIndex: number
// }
// type ResultRow = {
//   id: string
//   studentName: string
//   email: string
//   mcqMarks: number
//   subjectiveMarks: number
// }

// export default function TeacherDashboardPage() {
//   const router = useRouter()
//   const [tab, setTab] = useState<"create" | "results">("create")

//   // Auth guard
//   useEffect(() => {
//     if (typeof window === "undefined") return
//     const ok = localStorage.getItem("evalify-teacher-authed") === "1"
//     if (!ok) router.replace("/teacher/login")
//   }, [router])

//   // Create Test state
//   const [testName, setTestName] = useState("")
//   const [testDesc, setTestDesc] = useState("")
//   const [subjective, setSubjective] = useState("")
//   const [mcqs, setMcqs] = useState<MCQ[]>(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""] as [string, string, string, string],
//       correctIndex: 0,
//     })),
//   )
//   const canPublish = useMemo(() => {
//     const baseOk = testName.trim().length > 0 && subjective.trim().length > 0
//     const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim().length > 0))
//     return baseOk && allFilled
//   }, [testName, subjective, mcqs])

//   function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
//     setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
//   }

//   function onPublish() {
//     // Simulate publish
//     console.log("[v0] Publish Test", { testName, testDesc, subjective, mcqs })
//     setTab("results")
//     setTestName("")
//     setTestDesc("")
//     setSubjective("")
//     setMcqs(
//       Array.from({ length: 10 }, () => ({
//         question: "",
//         options: ["", "", "", ""] as [string, string, string, string],
//         correctIndex: 0,
//       })),
//     )
//   }

//   // Results state (sample)
//   const [rows, setRows] = useState<ResultRow[]>([
//     { id: "1", studentName: "Ava Johnson", email: "ava@school.edu", mcqMarks: 16, subjectiveMarks: 14 },
//     { id: "2", studentName: "Leo Smith", email: "leo@school.edu", mcqMarks: 18, subjectiveMarks: 15 },
//     { id: "3", studentName: "Noah Chen", email: "noah@school.edu", mcqMarks: 14, subjectiveMarks: 12 },
//   ])
//   const [editing, setEditing] = useState<Record<string, boolean>>({})
//   const [editBuffer, setEditBuffer] = useState<Record<string, { mcqMarks: number; subjectiveMarks: number }>>({})

//   function startEdit(id: string) {
//     const row = rows.find((r) => r.id === id)
//     if (!row) return
//     setEditing((prev) => ({ ...prev, [id]: true }))
//     setEditBuffer((prev) => ({ ...prev, [id]: { mcqMarks: row.mcqMarks, subjectiveMarks: row.subjectiveMarks } }))
//   }
//   function saveEdit(id: string) {
//     const buf = editBuffer[id]
//     if (!buf) return
//     setRows((prev) => prev.map((r) => (r.id === id ? ({ ...r, ...buf } as ResultRow) : r)))
//     setEditing((prev) => ({ ...prev, [id]: false }))
//   }
//   function cancelEdit(id: string) {
//     setEditing((prev) => ({ ...prev, [id]: false }))
//     setEditBuffer((prev) => {
//       const next = { ...prev }
//       delete next[id]
//       return next
//     })
//   }
//   function logout() {
//     if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
//     router.replace("/teacher/login")
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//             Teacher Dashboard
//           </h1>
//           <p className="mt-2 text-muted-foreground">Create tests and review results.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant={tab === "create" ? "default" : "ghost"}
//             onClick={() => setTab("create")}
//             className={
//               tab === "create"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             Create Test
//           </Button>
//           <Button
//             variant={tab === "results" ? "default" : "ghost"}
//             onClick={() => setTab("results")}
//             className={
//               tab === "results"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             View Results
//           </Button>
//           <Button variant="outline" onClick={logout}>
//             Logout
//           </Button>
//         </div>
//       </div>

//       {tab === "create" ? (
//         <section className="mt-8 space-y-6">
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Create Test</CardTitle>
//               <CardDescription>Provide general details and add questions.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Test Name</Label>
//                 <Input
//                   id="name"
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   placeholder="Midterm Assessment"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea
//                   id="desc"
//                   value={testDesc}
//                   onChange={(e) => setTestDesc(e.target.value)}
//                   placeholder="Coverage, instructions, and timing"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Multiple Choice Questions (10)</CardTitle>
//               <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               {mcqs.map((q, i) => (
//                 <div key={i} className="rounded-lg border p-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor={`q-${i}`}>Question {i + 1}</Label>
//                     <Input
//                       id={`q-${i}`}
//                       value={q.question}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
//                       placeholder={`Enter question ${i + 1}`}
//                     />
//                   </div>
//                   <div className="mt-3 grid gap-3 md:grid-cols-2">
//                     {[0, 1, 2, 3].map((opt) => (
//                       <div key={opt} className="grid gap-2">
//                         <Label htmlFor={`q-${i}-opt-${opt}`}>Option {opt + 1}</Label>
//                         <Input
//                           id={`q-${i}-opt-${opt}`}
//                           value={q.options[opt]}
//                           onChange={(e) =>
//                             updateMCQ(i, (m) => {
//                               const next = [...m.options] as [string, string, string, string]
//                               next[opt] = e.target.value
//                               return { ...m, options: next }
//                             })
//                           }
//                           placeholder={`Option ${opt + 1}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 grid gap-2">
//                     <Label htmlFor={`q-${i}-correct`}>Correct Answer</Label>
//                     <select
//                       id={`q-${i}-correct`}
//                       className="h-9 rounded-md border bg-background px-3"
//                       value={q.correctIndex}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
//                     >
//                       <option value={0}>Option 1</option>
//                       <option value={1}>Option 2</option>
//                       <option value={2}>Option 3</option>
//                       <option value={3}>Option 4</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Subjective Question</CardTitle>
//               <CardDescription>Students will answer this in free text.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-2">
//               <Label htmlFor="subjective">Question</Label>
//               <Textarea
//                 id="subjective"
//                 value={subjective}
//                 onChange={(e) => setSubjective(e.target.value)}
//                 placeholder="Explain the principle behind..."
//               />
//             </CardContent>
//           </Card>

//           <div className="flex justify-end">
//             <Button
//               disabled={!canPublish}
//               onClick={onPublish}
//               className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
//             >
//               Publish Test
//             </Button>
//           </div>
//         </section>
//       ) : null}

//       {tab === "results" ? (
//         <section className="mt-8">
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Results</CardTitle>
//               <CardDescription>Review and adjust marks as needed.</CardDescription>
//             </CardHeader>
//             <CardContent className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-left border-b">
//                     <th className="py-3 pr-3">Student Name</th>
//                     <th className="py-3 pr-3">Email</th>
//                     <th className="py-3 pr-3">MCQ</th>
//                     <th className="py-3 pr-3">Subjective</th>
//                     <th className="py-3 pr-3">Total</th>
//                     <th className="py-3 pr-3">Override</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rows.map((r, idx) => {
//                     const isEditing = !!editing[r.id]
//                     const buf = editBuffer[r.id] || { mcqMarks: r.mcqMarks, subjectiveMarks: r.subjectiveMarks }
//                     const total =
//                       (isEditing ? buf.mcqMarks : r.mcqMarks) + (isEditing ? buf.subjectiveMarks : r.subjectiveMarks)
//                     return (
//                       <tr key={r.id} className="border-b odd:bg-background even:bg-[var(--info-bg)]">
//                         <td className="py-3 pr-3">{r.studentName}</td>
//                         <td className="py-3 pr-3">{r.email}</td>
//                         <td className="py-3 pr-3">
//                           {isEditing ? (
//                             <Input
//                               className="h-8 w-20"
//                               type="number"
//                               value={buf.mcqMarks}
//                               onChange={(e) =>
//                                 setEditBuffer((prev) => ({
//                                   ...prev,
//                                   [r.id]: { ...buf, mcqMarks: Number(e.target.value || 0) },
//                                 }))
//                               }
//                             />
//                           ) : (
//                             r.mcqMarks
//                           )}
//                         </td>
//                         <td className="py-3 pr-3">
//                           {isEditing ? (
//                             <Input
//                               className="h-8 w-24"
//                               type="number"
//                               value={buf.subjectiveMarks}
//                               onChange={(e) =>
//                                 setEditBuffer((prev) => ({
//                                   ...prev,
//                                   [r.id]: { ...buf, subjectiveMarks: Number(e.target.value || 0) },
//                                 }))
//                               }
//                             />
//                           ) : (
//                             r.subjectiveMarks
//                           )}
//                         </td>
//                         <td className="py-3 pr-3">{total}</td>
//                         <td className="py-3 pr-3">
//                           {!isEditing ? (
//                             <Button variant="ghost" onClick={() => startEdit(r.id)}>
//                               Override Marks
//                             </Button>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 size="sm"
//                                 className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
//                                 onClick={() => saveEdit(r.id)}
//                               >
//                                 Save
//                               </Button>
//                               <Button size="sm" variant="outline" onClick={() => cancelEdit(r.id)}>
//                                 Cancel
//                               </Button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </section>
//       ) : null}
//     </main>
//   )
// }




























// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// // Types
// type MCQ = {
//   question: string
//   options: [string, string, string, string]
//   correctIndex: number
// }

// type ResultRow = {
//   id: string
//   studentName: string
//   email: string
//   mcqMarks: number
//   subjectiveMarks: number
// }

// type Assignment = {
//   id: string
//   name: string
//   desc: string
//   subjective: string
//   mcqs: MCQ[]
//   submissions: ResultRow[]
// }

// export default function TeacherDashboardPage() {
//   const router = useRouter()
//   const [tab, setTab] = useState<"create" | "results">("create")

//   // Auth guard
//   useEffect(() => {
//     if (typeof window === "undefined") return
//     const ok = localStorage.getItem("evalify-teacher-authed") === "1"
//     if (!ok) router.replace("/teacher/login")
//   }, [router])

//   // Create Test state
//   const [testName, setTestName] = useState("")
//   const [testDesc, setTestDesc] = useState("")
//   const [subjective, setSubjective] = useState("")
//   const [mcqs, setMcqs] = useState<MCQ[]>(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""] as [string, string, string, string],
//       correctIndex: 0,
//     })),
//   )

//   // Centralized assignments (simulating backend)
//   const [assignments, setAssignments] = useState<Assignment[]>([])

//   const canPublish = useMemo(() => {
//     const baseOk = testName.trim().length > 0 && subjective.trim().length > 0
//     const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim().length > 0))
//     return baseOk && allFilled
//   }, [testName, subjective, mcqs])

//   function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
//     setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
//   }

//   function onPublish() {
//     const newAssignment: Assignment = {
//       id: Date.now().toString(),
//       name: testName,
//       desc: testDesc,
//       subjective,
//       mcqs,
//       submissions: [],
//     }

//     setAssignments((prev) => [...prev, newAssignment])

//     // Reset form
//     setTestName("")
//     setTestDesc("")
//     setSubjective("")
//     setMcqs(
//       Array.from({ length: 10 }, () => ({
//         question: "",
//         options: ["", "", "", ""] as [string, string, string, string],
//         correctIndex: 0,
//       })),
//     )
//     setTab("results")
//   }

//   // Results editing
//   const [editing, setEditing] = useState<Record<string, boolean>>({})
//   const [editBuffer, setEditBuffer] = useState<Record<string, { mcqMarks: number; subjectiveMarks: number }>>({})

//   function startEdit(id: string) {
//     const row = assignments.flatMap(a => a.submissions).find((r) => r.id === id)
//     if (!row) return
//     setEditing((prev) => ({ ...prev, [id]: true }))
//     setEditBuffer((prev) => ({ ...prev, [id]: { mcqMarks: row.mcqMarks, subjectiveMarks: row.subjectiveMarks } }))
//   }
//   function saveEdit(id: string) {
//     const buf = editBuffer[id]
//     if (!buf) return
//     setAssignments((prev) =>
//       prev.map((a) => ({
//         ...a,
//         submissions: a.submissions.map((r) => (r.id === id ? { ...r, ...buf } : r)),
//       })),
//     )
//     setEditing((prev) => ({ ...prev, [id]: false }))
//   }
//   function cancelEdit(id: string) {
//     setEditing((prev) => ({ ...prev, [id]: false }))
//     setEditBuffer((prev) => {
//       const next = { ...prev }
//       delete next[id]
//       return next
//     })
//   }

//   function logout() {
//     if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
//     router.replace("/teacher/login")
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//             Teacher Dashboard
//           </h1>
//           <p className="mt-2 text-muted-foreground">Create tests and review results.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant={tab === "create" ? "default" : "ghost"}
//             onClick={() => setTab("create")}
//             className={
//               tab === "create"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             Create Test
//           </Button>
//           <Button
//             variant={tab === "results" ? "default" : "ghost"}
//             onClick={() => setTab("results")}
//             className={
//               tab === "results"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             View Results
//           </Button>
//           <Button variant="outline" onClick={logout}>
//             Logout
//           </Button>
//         </div>
//       </div>

//       {tab === "create" && (
//         <section className="mt-8 space-y-6">
//           {/* Test Details */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Create Test</CardTitle>
//               <CardDescription>Provide general details and add questions.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Test Name</Label>
//                 <Input
//                   id="name"
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   placeholder="Midterm Assessment"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea
//                   id="desc"
//                   value={testDesc}
//                   onChange={(e) => setTestDesc(e.target.value)}
//                   placeholder="Coverage, instructions, and timing"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* MCQs */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Multiple Choice Questions (10)</CardTitle>
//               <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               {mcqs.map((q, i) => (
//                 <div key={i} className="rounded-lg border p-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor={`q-${i}`}>Question {i + 1}</Label>
//                     <Input
//                       id={`q-${i}`}
//                       value={q.question}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
//                       placeholder={`Enter question ${i + 1}`}
//                     />
//                   </div>
//                   <div className="mt-3 grid gap-3 md:grid-cols-2">
//                     {[0, 1, 2, 3].map((opt) => (
//                       <div key={opt} className="grid gap-2">
//                         <Label htmlFor={`q-${i}-opt-${opt}`}>Option {opt + 1}</Label>
//                         <Input
//                           id={`q-${i}-opt-${opt}`}
//                           value={q.options[opt]}
//                           onChange={(e) =>
//                             updateMCQ(i, (m) => {
//                               const next = [...m.options] as [string, string, string, string]
//                               next[opt] = e.target.value
//                               return { ...m, options: next }
//                             })
//                           }
//                           placeholder={`Option ${opt + 1}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 grid gap-2">
//                     <Label htmlFor={`q-${i}-correct`}>Correct Answer</Label>
//                     <select
//                       id={`q-${i}-correct`}
//                       className="h-9 rounded-md border bg-background px-3"
//                       value={q.correctIndex}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
//                     >
//                       <option value={0}>Option 1</option>
//                       <option value={1}>Option 2</option>
//                       <option value={2}>Option 3</option>
//                       <option value={3}>Option 4</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Subjective */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Subjective Question</CardTitle>
//               <CardDescription>Students will answer this in free text.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-2">
//               <Label htmlFor="subjective">Question</Label>
//               <Textarea
//                 id="subjective"
//                 value={subjective}
//                 onChange={(e) => setSubjective(e.target.value)}
//                 placeholder="Explain the principle behind..."
//               />
//             </CardContent>
//           </Card>

//           {/* Publish */}
//           <div className="flex justify-end">
//             <Button
//               disabled={!canPublish}
//               onClick={onPublish}
//               className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
//             >
//               Publish Test
//             </Button>
//           </div>
//         </section>
//       )}

//       {/* Results */}
//       {tab === "results" && (
//         <section className="mt-8 space-y-6">
//           {assignments.length === 0 ? (
//             <p className="text-gray-600 text-center">No tests published yet.</p>
//           ) : (
//             assignments.map((assignment) => (
//               <Card key={assignment.id} className="border shadow-sm">
//                 <CardHeader>
//                   <CardTitle>{assignment.name}</CardTitle>
//                   <CardDescription>{assignment.desc}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="text-left border-b">
//                         <th className="py-3 pr-3">Student Name</th>
//                         <th className="py-3 pr-3">Email</th>
//                         <th className="py-3 pr-3">MCQ</th>
//                         <th className="py-3 pr-3">Subjective</th>
//                         <th className="py-3 pr-3">Total</th>
//                         <th className="py-3 pr-3">Override</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignment.submissions.length === 0 ? (
//                         <tr>
//                           <td colSpan={6} className="text-center text-gray-500 py-6">
//                             No submissions yet.
//                           </td>
//                         </tr>
//                       ) : (
//                         assignment.submissions.map((r) => {
//                           const isEditing = !!editing[r.id]
//                           const buf = editBuffer[r.id] || { mcqMarks: r.mcqMarks, subjectiveMarks: r.subjectiveMarks }
//                           const total =
//                             (isEditing ? buf.mcqMarks : r.mcqMarks) + (isEditing ? buf.subjectiveMarks : r.subjectiveMarks)
//                           return (
//                             <tr key={r.id} className="border-b odd:bg-background even:bg-[var(--info-bg)]">
//                               <td className="py-3 pr-3">{r.studentName}</td>
//                               <td className="py-3 pr-3">{r.email}</td>
//                               <td className="py-3 pr-3">
//                                 {isEditing ? (
//                                   <Input
//                                     className="h-8 w-20"
//                                     type="number"
//                                     value={buf.mcqMarks}
//                                     onChange={(e) =>
//                                       setEditBuffer((prev) => ({
//                                         ...prev,
//                                         [r.id]: { ...buf, mcqMarks: Number(e.target.value || 0) },
//                                       }))
//                                     }
//                                   />
//                                 ) : (
//                                   r.mcqMarks
//                                 )}
//                               </td>
//                               <td className="py-3 pr-3">
//                                 {isEditing ? (
//                                   <Input
//                                     className="h-8 w-24"
//                                     type="number"
//                                     value={buf.subjectiveMarks}
//                                     onChange={(e) =>
//                                       setEditBuffer((prev) => ({
//                                         ...prev,
//                                         [r.id]: { ...buf, subjectiveMarks: Number(e.target.value || 0) },
//                                       }))
//                                     }
//                                   />
//                                 ) : (
//                                   r.subjectiveMarks
//                                 )}
//                               </td>
//                               <td className="py-3 pr-3">{total}</td>
//                               <td className="py-3 pr-3">
//                                 {!isEditing ? (
//                                   <Button variant="ghost" onClick={() => startEdit(r.id)}>
//                                     Override Marks
//                                   </Button>
//                                 ) : (
//                                   <div className="flex items-center gap-2">
//                                     <Button
//                                       size="sm"
//                                       className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
//                                       onClick={() => saveEdit(r.id)}
//                                     >
//                                       Save
//                                     </Button>
//                                     <Button size="sm" variant="outline" onClick={() => cancelEdit(r.id)}>
//                                       Cancel
//                                     </Button>
//                                   </div>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })
//                       )}
//                     </tbody>
//                   </table>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </section>
//       )}
//     </main>
//   )
// }


// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// // Types
// type MCQ = {
//   question: string
//   options: [string, string, string, string]
//   correctIndex: number
// }

// type Assignment = {
//   id: string
//   name: string
//   desc: string
//   subjective: string
//   mcqs: MCQ[]
// }

// export default function TeacherDashboardPage() {
//   const router = useRouter()
//   const [tab, setTab] = useState<"create" | "results">("create")

//   // Auth guard
//   useEffect(() => {
//     if (typeof window === "undefined") return
//     const ok = localStorage.getItem("evalify-teacher-authed") === "1"
//     if (!ok) router.replace("/teacher/login")
//   }, [router])

//   // Create Test state
//   const [testName, setTestName] = useState("")
//   const [testDesc, setTestDesc] = useState("")
//   const [subjective, setSubjective] = useState("")
//   const [mcqs, setMcqs] = useState<MCQ[]>(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""] as [string, string, string, string],
//       correctIndex: 0,
//     })),
//   )

//   // Centralized assignments in localStorage
//   const [assignments, setAssignments] = useState<Assignment[]>([])

//   // Load existing assignments from localStorage
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         setAssignments(JSON.parse(raw))
//       } catch {
//         setAssignments([])
//       }
//     }
//   }, [])

//   // Persist assignments to localStorage
//   useEffect(() => {
//     localStorage.setItem("teacher_tests", JSON.stringify(assignments))
//   }, [assignments])

//   const canPublish = useMemo(() => {
//     const baseOk = testName.trim().length > 0 && subjective.trim().length > 0
//     const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim().length > 0))
//     return baseOk && allFilled
//   }, [testName, subjective, mcqs])

//   function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
//     setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
//   }

//   function onPublish() {
//     const newAssignment: Assignment = {
//       id: Date.now().toString(),
//       name: testName,
//       desc: testDesc,
//       subjective,
//       mcqs,
//     }

//     setAssignments((prev) => [...prev, newAssignment])

//     // Reset form
//     setTestName("")
//     setTestDesc("")
//     setSubjective("")
//     setMcqs(
//       Array.from({ length: 10 }, () => ({
//         question: "",
//         options: ["", "", "", ""],
//         correctIndex: 0,
//       })),
//     )
//     setTab("results")
//   }

//   function logout() {
//     if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
//     router.replace("/teacher/login")
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//             Teacher Dashboard
//           </h1>
//           <p className="mt-2 text-muted-foreground">Create tests and they will automatically appear on the student dashboard.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant={tab === "create" ? "default" : "ghost"}
//             onClick={() => setTab("create")}
//             className={
//               tab === "create"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             Create Test
//           </Button>
//           <Button
//             variant={tab === "results" ? "default" : "ghost"}
//             onClick={() => setTab("results")}
//             className={
//               tab === "results"
//                 ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                 : ""
//             }
//           >
//             View Published Tests
//           </Button>
//           <Button variant="outline" onClick={logout}>
//             Logout
//           </Button>
//         </div>
//       </div>

//       {/* Create Test Tab */}
//       {tab === "create" && (
//         <section className="mt-8 space-y-6">
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Create Test</CardTitle>
//               <CardDescription>Provide details and questions.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Test Name</Label>
//                 <Input
//                   id="name"
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   placeholder="Midterm Assessment"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea
//                   id="desc"
//                   value={testDesc}
//                   onChange={(e) => setTestDesc(e.target.value)}
//                   placeholder="Coverage, instructions, and timing"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* MCQs */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Multiple Choice Questions (10)</CardTitle>
//               <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               {mcqs.map((q, i) => (
//                 <div key={i} className="rounded-lg border p-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor={`q-${i}`}>Question {i + 1}</Label>
//                     <Input
//                       id={`q-${i}`}
//                       value={q.question}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
//                       placeholder={`Enter question ${i + 1}`}
//                     />
//                   </div>
//                   <div className="mt-3 grid gap-3 md:grid-cols-2">
//                     {[0, 1, 2, 3].map((opt) => (
//                       <div key={opt} className="grid gap-2">
//                         <Label htmlFor={`q-${i}-opt-${opt}`}>Option {opt + 1}</Label>
//                         <Input
//                           id={`q-${i}-opt-${opt}`}
//                           value={q.options[opt]}
//                           onChange={(e) =>
//                             updateMCQ(i, (m) => {
//                               const next = [...m.options] as [string, string, string, string]
//                               next[opt] = e.target.value
//                               return { ...m, options: next }
//                             })
//                           }
//                           placeholder={`Option ${opt + 1}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 grid gap-2">
//                     <Label htmlFor={`q-${i}-correct`}>Correct Answer</Label>
//                     <select
//                       id={`q-${i}-correct`}
//                       className="h-9 rounded-md border bg-background px-3"
//                       value={q.correctIndex}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
//                     >
//                       <option value={0}>Option 1</option>
//                       <option value={1}>Option 2</option>
//                       <option value={2}>Option 3</option>
//                       <option value={3}>Option 4</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Subjective */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Subjective Question</CardTitle>
//               <CardDescription>Students will answer this in free text.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-2">
//               <Label htmlFor="subjective">Question</Label>
//               <Textarea
//                 id="subjective"
//                 value={subjective}
//                 onChange={(e) => setSubjective(e.target.value)}
//                 placeholder="Explain the principle behind..."
//               />
//             </CardContent>
//           </Card>

//           <div className="flex justify-end">
//             <Button
//               disabled={!canPublish}
//               onClick={onPublish}
//               className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
//             >
//               Publish Test
//             </Button>
//           </div>
//         </section>
//       )}

//       {/* Results / Published Tests Tab */}
//       {tab === "results" && (
//         <section className="mt-8 space-y-6">
//           {assignments.length === 0 ? (
//             <p className="text-gray-600 text-center">No tests published yet.</p>
//           ) : (
//             assignments.map((assignment) => (
//               <Card key={assignment.id} className="border shadow-sm">
//                 <CardHeader>
//                   <CardTitle>{assignment.name}</CardTitle>
//                   <CardDescription>{assignment.desc}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">
//                     Students will see this test dynamically on their dashboard.
//                   </p>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </section>
//       )}
//     </main>
//   )
// }

















// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// // Types
// type MCQ = {
//   question: string
//   options: [string, string, string, string]
//   correctIndex: number
// }

// type Assignment = {
//   id: string
//   name: string
//   desc: string
//   subjective: string
//   mcqs: MCQ[]
// }

// type StudentResult = {
//   id: string
//   testId: string
//   name: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function TeacherDashboardPage() {
//   const router = useRouter()
//   const [tab, setTab] = useState<"create" | "published" | "results">("create")

//   // Auth guard
//   useEffect(() => {
//     if (typeof window === "undefined") return
//     const ok = localStorage.getItem("evalify-teacher-authed") === "1"
//     if (!ok) router.replace("/teacher/login")
//   }, [router])

//   // Test creation
//   const [testName, setTestName] = useState("")
//   const [testDesc, setTestDesc] = useState("")
//   const [subjective, setSubjective] = useState("")
//   const [mcqs, setMcqs] = useState<MCQ[]>(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""] as [string, string, string, string],
//       correctIndex: 0,
//     })),
//   )

//   // Persisted data
//   const [assignments, setAssignments] = useState<Assignment[]>([])
//   const [results, setResults] = useState<StudentResult[]>([])

//   // Load assignments
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         setAssignments(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Load student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setResults(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Save assignments whenever updated
//   useEffect(() => {
//     localStorage.setItem("teacher_tests", JSON.stringify(assignments))
//   }, [assignments])

//   // Save results whenever updated
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(results))
//   }, [results])

//   const canPublish = useMemo(() => {
//     const baseOk = testName.trim() && subjective.trim()
//     const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim()))
//     return baseOk && allFilled
//   }, [testName, subjective, mcqs])

//   function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
//     setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
//   }

//   function onPublish() {
//     const newAssignment: Assignment = {
//       id: Date.now().toString(),
//       name: testName,
//       desc: testDesc,
//       subjective,
//       mcqs,
//     }
//     setAssignments((prev) => [...prev, newAssignment])

//     // Reset form
//     setTestName("")
//     setTestDesc("")
//     setSubjective("")
//     setMcqs(Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""],
//       correctIndex: 0,
//     })))
//     setTab("published")
//   }

//   function logout() {
//     if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
//     router.replace("/teacher/login")
//   }

//   function overrideResult(resId: string, field: "mcqScore" | "subjectiveScore" | "total", value: number) {
//     setResults((prev) =>
//       prev.map((r) => (r.id === resId ? { ...r, [field]: value, total: field === "total" ? value : r.total } : r))
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-6">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//           Teacher Dashboard
//         </h1>
//         <div className="flex items-center gap-2">
//           <Button variant={tab === "create" ? "default" : "ghost"} onClick={() => setTab("create")}>
//             Create Test
//           </Button>
//           <Button variant={tab === "published" ? "default" : "ghost"} onClick={() => setTab("published")}>
//             Published Tests
//           </Button>
//           <Button variant={tab === "results" ? "default" : "ghost"} onClick={() => setTab("results")}>
//             Student Results
//           </Button>
//           <Button variant="outline" onClick={logout}>
//             Logout
//           </Button>
//         </div>
//       </div>

//       {/* Create Test Tab */}
//       {tab === "create" && (
//         <section className="space-y-6">
//           {/* Test Info */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Create Test</CardTitle>
//               <CardDescription>Provide test details and questions.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Test Name</Label>
//                 <Input id="name" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Midterm Assessment" />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea id="desc" value={testDesc} onChange={(e) => setTestDesc(e.target.value)} placeholder="Coverage, instructions, and timing" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* MCQs */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Multiple Choice Questions (10)</CardTitle>
//               <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               {mcqs.map((q, i) => (
//                 <div key={i} className="rounded-lg border p-4">
//                   <Input
//                     value={q.question}
//                     onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
//                     placeholder={`Question ${i + 1}`}
//                   />
//                   <div className="grid gap-3 md:grid-cols-2 mt-2">
//                     {q.options.map((opt, idx) => (
//                       <Input
//                         key={idx}
//                         value={opt}
//                         onChange={(e) =>
//                           updateMCQ(i, (m) => {
//                             const newOpts = [...m.options] as [string, string, string, string]
//                             newOpts[idx] = e.target.value
//                             return { ...m, options: newOpts }
//                           })
//                         }
//                         placeholder={`Option ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                   <div className="mt-2">
//                     <Label>Correct Answer</Label>
//                     <select
//                       className="h-9 rounded-md border bg-background px-3"
//                       value={q.correctIndex}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
//                     >
//                       <option value={0}>Option 1</option>
//                       <option value={1}>Option 2</option>
//                       <option value={2}>Option 3</option>
//                       <option value={3}>Option 4</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Subjective */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Subjective Question</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Textarea value={subjective} onChange={(e) => setSubjective(e.target.value)} placeholder="Explain..." />
//             </CardContent>
//           </Card>

//           <div className="flex justify-end">
//             <Button disabled={!canPublish} onClick={onPublish} className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Publish Test
//             </Button>
//           </div>
//         </section>
//       )}

//       {/* Published Tests */}
//       {tab === "published" && (
//         <section className="space-y-4">
//           {assignments.length === 0 ? (
//             <p className="text-muted-foreground text-center">No tests published yet.</p>
//           ) : (
//             assignments.map((a) => (
//               <Card key={a.id} className="border shadow-sm">
//                 <CardHeader>
//                   <CardTitle>{a.name}</CardTitle>
//                   <CardDescription>{a.desc}</CardDescription>
//                 </CardHeader>
//               </Card>
//             ))
//           )}
//         </section>
//       )}

//       {/* Student Results */}
//       {tab === "results" && (
//         <section className="space-y-4">
//           {results.length === 0 ? (
//             <p className="text-muted-foreground text-center">No student results yet.</p>
//           ) : (
//             results.map((r) => (
//               <Card key={r.id} className="border shadow-sm">
//                 <CardHeader>
//                   <CardTitle>{r.name}</CardTitle>
//                   <CardDescription>{r.date}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-2">
//                   <div className="grid grid-cols-3 gap-3">
//                     <div>
//                       <Label>MCQ Score</Label>
//                       <Input
//                         type="number"
//                         value={r.mcqScore}
//                         onChange={(e) => overrideResult(r.id, "mcqScore", Number(e.target.value))}
//                       />
//                     </div>
//                     <div>
//                       <Label>Subjective Score</Label>
//                       <Input
//                         type="number"
//                         value={r.subjectiveScore}
//                         onChange={(e) => overrideResult(r.id, "subjectiveScore", Number(e.target.value))}
//                       />
//                     </div>
//                     <div>
//                       <Label>Total</Label>
//                       <Input
//                         type="number"
//                         value={r.total}
//                         onChange={(e) => overrideResult(r.id, "total", Number(e.target.value))}
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </section>
//       )}
//     </main>
//   )
// }





// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// // Types
// type MCQ = {
//   question: string
//   options: [string, string, string, string]
//   correctIndex: number
// }

// type Assignment = {
//   id: string
//   name: string
//   desc: string
//   subjective: string
//   mcqs: MCQ[]
// }

// type StudentResult = {
//   id: string
//   testId: string
//   name: string
//   email: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function TeacherDashboardPage() {
//   const router = useRouter()
//   const [tab, setTab] = useState<"create" | "published" | "results">("create")

//   // Auth guard
//   useEffect(() => {
//     if (typeof window === "undefined") return
//     const ok = localStorage.getItem("evalify-teacher-authed") === "1"
//     if (!ok) router.replace("/teacher/login")
//   }, [router])

//   // Test creation
//   const [testName, setTestName] = useState("")
//   const [testDesc, setTestDesc] = useState("")
//   const [subjective, setSubjective] = useState("")
//   const [mcqs, setMcqs] = useState<MCQ[]>(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""] as [string, string, string, string],
//       correctIndex: 0,
//     })),
//   )

//   // Persisted data
//   const [assignments, setAssignments] = useState<Assignment[]>([])
//   const [results, setResults] = useState<StudentResult[]>([])

//   // Load assignments
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         setAssignments(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Load student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setResults(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Save assignments whenever updated
//   useEffect(() => {
//     localStorage.setItem("teacher_tests", JSON.stringify(assignments))
//   }, [assignments])

//   // Save results whenever updated
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(results))
//   }, [results])

//   const canPublish = useMemo(() => {
//     const baseOk = testName.trim() && subjective.trim()
//     const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim()))
//     return baseOk && allFilled
//   }, [testName, subjective, mcqs])

//   function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
//     setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
//   }

//   function onPublish() {
//     const newAssignment: Assignment = {
//       id: Date.now().toString(),
//       name: testName,
//       desc: testDesc,
//       subjective,
//       mcqs,
//     }
//     setAssignments((prev) => [...prev, newAssignment])

//     // Reset form
//     setTestName("")
//     setTestDesc("")
//     setSubjective("")
//     setMcqs(Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""],
//       correctIndex: 0,
//     })))
//     setTab("published")
//   }

//   function logout() {
//     if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
//     router.replace("/teacher/login")
//   }

//   function overrideResult(resId: string, field: "mcqScore" | "subjectiveScore" | "total", value: number) {
//     setResults((prev) =>
//       prev.map((r) => {
//         if (r.id === resId) {
//           const updated = { ...r, [field]: value }
//           // Always recalc total if not directly editing total
//           if (field !== "total") updated.total = updated.mcqScore + updated.subjectiveScore
//           return updated
//         }
//         return r
//       })
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-6">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//           Teacher Dashboard
//         </h1>
//         <div className="flex items-center gap-2">
//           <Button variant={tab === "create" ? "default" : "ghost"} onClick={() => setTab("create")}>
//             Create Test
//           </Button>
//           <Button variant={tab === "published" ? "default" : "ghost"} onClick={() => setTab("published")}>
//             Published Tests
//           </Button>
//           <Button variant={tab === "results" ? "default" : "ghost"} onClick={() => setTab("results")}>
//             Student Results
//           </Button>
//           <Button variant="outline" onClick={logout}>
//             Logout
//           </Button>
//         </div>
//       </div>

//       {/* Create Test Tab */}
//       {tab === "create" && (
//         <section className="space-y-6">
//           {/* Test Info */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Create Test</CardTitle>
//               <CardDescription>Provide test details and questions.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Test Name</Label>
//                 <Input id="name" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Midterm Assessment" />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea id="desc" value={testDesc} onChange={(e) => setTestDesc(e.target.value)} placeholder="Coverage, instructions, and timing" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* MCQs */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Multiple Choice Questions (10)</CardTitle>
//               <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               {mcqs.map((q, i) => (
//                 <div key={i} className="rounded-lg border p-4">
//                   <Input
//                     value={q.question}
//                     onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
//                     placeholder={`Question ${i + 1}`}
//                   />
//                   <div className="grid gap-3 md:grid-cols-2 mt-2">
//                     {q.options.map((opt, idx) => (
//                       <Input
//                         key={idx}
//                         value={opt}
//                         onChange={(e) =>
//                           updateMCQ(i, (m) => {
//                             const newOpts = [...m.options] as [string, string, string, string]
//                             newOpts[idx] = e.target.value
//                             return { ...m, options: newOpts }
//                           })
//                         }
//                         placeholder={`Option ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                   <div className="mt-2">
//                     <Label>Correct Answer</Label>
//                     <select
//                       className="h-9 rounded-md border bg-background px-3"
//                       value={q.correctIndex}
//                       onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
//                     >
//                       <option value={0}>Option 1</option>
//                       <option value={1}>Option 2</option>
//                       <option value={2}>Option 3</option>
//                       <option value={3}>Option 4</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Subjective */}
//           <Card className="border shadow-sm">
//             <CardHeader>
//               <CardTitle>Subjective Question</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Textarea value={subjective} onChange={(e) => setSubjective(e.target.value)} placeholder="Explain..." />
//             </CardContent>
//           </Card>

//           <div className="flex justify-end">
//             <Button disabled={!canPublish} onClick={onPublish} className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Publish Test
//             </Button>
//           </div>
//         </section>
//       )}

//       {/* Published Tests */}
//       {tab === "published" && (
//         <section className="space-y-4">
//           {assignments.length === 0 ? (
//             <p className="text-muted-foreground text-center">No tests published yet.</p>
//           ) : (
//             assignments.map((a) => (
//               <Card key={a.id} className="border shadow-sm">
//                 <CardHeader>
//                   <CardTitle>{a.name}</CardTitle>
//                   <CardDescription>{a.desc}</CardDescription>
//                 </CardHeader>
//               </Card>
//             ))
//           )}
//         </section>
//       )}

//       {/* Student Results */}
//       {tab === "results" && (
//         <section className="space-y-4">
//           {results.length === 0 ? (
//             <p className="text-muted-foreground text-center">No student results yet.</p>
//           ) : (
//             <Card className="border shadow-sm overflow-x-auto">
//               <CardHeader>
//                 <CardTitle>Student Results</CardTitle>
//                 <CardDescription>Override scores if necessary.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Email</th>
//                       <th className="px-4 py-2">MCQ</th>
//                       <th className="px-4 py-2">Essay</th>
//                       <th className="px-4 py-2">Overall</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {results.map((r) => (
//                       <tr key={r.id} className="border-b">
//                         <td className="px-4 py-2">{r.name}</td>
//                         <td className="px-4 py-2">{r.email}</td>
//                         <td className="px-4 py-2">
//                           <Input
//                             type="number"
//                             value={r.mcqScore}
//                             onChange={(e) => overrideResult(r.id, "mcqScore", Number(e.target.value))}
//                           />
//                         </td>
//                         <td className="px-4 py-2">
//                           <Input
//                             type="number"
//                             value={r.subjectiveScore}
//                             onChange={(e) => overrideResult(r.id, "subjectiveScore", Number(e.target.value))}
//                           />
//                         </td>
//                         <td className="px-4 py-2">
//                           <Input
//                             type="number"
//                             value={r.total}
//                             onChange={(e) => overrideResult(r.id, "total", Number(e.target.value))}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           )}
//         </section>
//       )}
//     </main>
//   )
// }



"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Types
type MCQ = {
  question: string
  options: [string, string, string, string]
  correctIndex: number
}

type Assignment = {
  id: string
  name: string
  desc: string
  subjective: string
  mcqs: MCQ[]
}

type StudentResult = {
  id: string
  testId: string
  studentName: string
  studentEmail: string
  date: string
  mcqScore: number
  subjectiveScore: number
  total: number
}

export default function TeacherDashboardPage() {
  const router = useRouter()
  const [tab, setTab] = useState<"create" | "published" | "results">("create")

  // Auth guard
  useEffect(() => {
    if (typeof window === "undefined") return
    const ok = localStorage.getItem("evalify-teacher-authed") === "1"
    if (!ok) router.replace("/teacher/login")
  }, [router])

  // Test creation
  const [testName, setTestName] = useState("")
  const [testDesc, setTestDesc] = useState("")
  const [subjective, setSubjective] = useState("")
  const [mcqs, setMcqs] = useState<MCQ[]>(
    Array.from({ length: 10 }, () => ({
      question: "",
      options: ["", "", "", ""] as [string, string, string, string],
      correctIndex: 0,
    })),
  )

  // Persisted data
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [results, setResults] = useState<StudentResult[]>([])

  // Load assignments
  useEffect(() => {
    const raw = localStorage.getItem("teacher_tests")
    if (raw) {
      try {
        setAssignments(JSON.parse(raw))
      } catch {}
    }
  }, [])

  // Load student results
  useEffect(() => {
    const raw = localStorage.getItem("evalify_results")
    if (raw) {
      try {
        setResults(JSON.parse(raw))
      } catch {}
    }
  }, [])

  // Save assignments whenever updated
  useEffect(() => {
    localStorage.setItem("teacher_tests", JSON.stringify(assignments))
  }, [assignments])

  // Save results whenever updated
  useEffect(() => {
    localStorage.setItem("evalify_results", JSON.stringify(results))
  }, [results])

  const canPublish = useMemo(() => {
    const baseOk = testName.trim() && subjective.trim()
    const allFilled = mcqs.every((m) => m.question.trim() && m.options.every((o) => o.trim()))
    return baseOk && allFilled
  }, [testName, subjective, mcqs])

  function updateMCQ(idx: number, updater: (m: MCQ) => MCQ) {
    setMcqs((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)))
  }

  function onPublish() {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      name: testName,
      desc: testDesc,
      subjective,
      mcqs,
    }
    setAssignments((prev) => [...prev, newAssignment])

    // Reset form
    setTestName("")
    setTestDesc("")
    setSubjective("")
    setMcqs(Array.from({ length: 10 }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    })))
    setTab("published")
  }

  function logout() {
    if (typeof window !== "undefined") localStorage.removeItem("evalify-teacher-authed")
    router.replace("/teacher/login")
  }

  function overrideResult(resId: string, field: "mcqScore" | "subjectiveScore" | "total", value: number) {
    setResults((prev) =>
      prev.map((r) => {
        if (r.id === resId) {
          const updated = { ...r, [field]: value }
          if (field !== "total") updated.total = updated.mcqScore + updated.subjectiveScore
          return updated
        }
        return r
      })
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
          Teacher Dashboard
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant={tab === "create" ? "default" : "ghost"} onClick={() => setTab("create")}>
            Create Test
          </Button>
          <Button variant={tab === "published" ? "default" : "ghost"} onClick={() => setTab("published")}>
            Published Tests
          </Button>
          <Button variant={tab === "results" ? "default" : "ghost"} onClick={() => setTab("results")}>
            Student Results
          </Button>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Create Test Tab */}
      {tab === "create" && (
        <section className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Create Test</CardTitle>
              <CardDescription>Provide test details and questions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Test Name</Label>
                <Input id="name" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Midterm Assessment" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" value={testDesc} onChange={(e) => setTestDesc(e.target.value)} placeholder="Coverage, instructions, and timing" />
              </div>
            </CardContent>
          </Card>

          {/* MCQs */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Multiple Choice Questions (10)</CardTitle>
              <CardDescription>Each question has 4 options and one correct answer.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {mcqs.map((q, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <Input
                    value={q.question}
                    onChange={(e) => updateMCQ(i, (m) => ({ ...m, question: e.target.value }))}
                    placeholder={`Question ${i + 1}`}
                  />
                  <div className="grid gap-3 md:grid-cols-2 mt-2">
                    {q.options.map((opt, idx) => (
                      <Input
                        key={idx}
                        value={opt}
                        onChange={(e) =>
                          updateMCQ(i, (m) => {
                            const newOpts = [...m.options] as [string, string, string, string]
                            newOpts[idx] = e.target.value
                            return { ...m, options: newOpts }
                          })
                        }
                        placeholder={`Option ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Label>Correct Answer</Label>
                    <select
                      className="h-9 rounded-md border bg-background px-3"
                      value={q.correctIndex}
                      onChange={(e) => updateMCQ(i, (m) => ({ ...m, correctIndex: Number(e.target.value) }))}
                    >
                      <option value={0}>Option 1</option>
                      <option value={1}>Option 2</option>
                      <option value={2}>Option 3</option>
                      <option value={3}>Option 4</option>
                    </select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Subjective */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Subjective Question</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={subjective} onChange={(e) => setSubjective(e.target.value)} placeholder="Explain..." />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              disabled={!canPublish}
              onClick={onPublish}
              className="text-primary-foreground bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]"
            >
              Publish Test
            </Button>
          </div>
        </section>
      )}

      {/* Published Tests */}
      {tab === "published" && (
        <section className="space-y-4">
          {assignments.length === 0 ? (
            <p className="text-muted-foreground text-center">No tests published yet.</p>
          ) : (
            assignments.map((a) => (
              <Card key={a.id} className="border shadow-sm">
                <CardHeader>
                  <CardTitle>{a.name}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </section>
      )}

      {/* Student Results */}
      {tab === "results" && (
        <section className="space-y-4">
          {results.length === 0 ? (
            <p className="text-muted-foreground text-center">No student results yet.</p>
          ) : (
            <Card className="border shadow-sm overflow-x-auto">
              <CardHeader>
                <CardTitle>Student Results</CardTitle>
                <CardDescription>Override scores if necessary.</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">MCQ</th>
                      <th className="px-4 py-2">Essay</th>
                      <th className="px-4 py-2">Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-muted/10">
                        <td className="px-4 py-2">{r.studentName}</td>
                        <td className="px-4 py-2">{r.studentEmail}</td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={r.mcqScore}
                            onChange={(e) => overrideResult(r.id, "mcqScore", Number(e.target.value))}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={r.subjectiveScore}
                            onChange={(e) => overrideResult(r.id, "subjectiveScore", Number(e.target.value))}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={r.total}
                            onChange={(e) => overrideResult(r.id, "total", Number(e.target.value))}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </main>
  )
}
