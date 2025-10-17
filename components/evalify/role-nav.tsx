"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function RoleNav() {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              aria-hidden
              className={cn(
                "size-7 rounded-md",
                "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]",
              )}
            />
            <span className="text-sm font-medium tracking-wide text-foreground">Evalify</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/student/login">
              <Button variant="ghost" className="rounded-xl text-foreground hover:text-foreground/90">
                Student
              </Button>
            </Link>
            <Link href="/teacher/login">
              <Button variant="ghost" className="rounded-xl text-foreground hover:text-foreground/90">
                Teacher
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="ghost" className="rounded-xl text-foreground hover:text-foreground/90">
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
