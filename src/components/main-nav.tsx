"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Palette } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Palette />
        <span className="hidden font-bold lg:inline-block">
          {"edit theme"}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/random"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/random")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Random
        </Link>
        <Link
          href="/browse"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/browse")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Browse
        </Link>
        <Link
          href="/my-poems"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/my-poems")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          My Poems
        </Link>
      </nav>
    </div>
  )
}