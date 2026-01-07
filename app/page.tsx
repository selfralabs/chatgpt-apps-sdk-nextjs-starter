"use client"

import { useState } from "react"
import { TaxCalculator } from "@/components/tax-calculator"
import { TaxResults } from "@/components/tax-results"
import { calculateTax } from "@/lib/tax-utils"
import { Calculator, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [salary, setSalary] = useState(200000)
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly")
  const [userType, setUserType] = useState<"employee" | "tech" | "oilgas" | "ritualist" | "business" | "creator">(
    "employee",
  )

  const taxResult = calculateTax(salary, frequency, userType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-primary-foreground">
                <Calculator className="size-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">NGNTax</h1>
                <p className="text-xs text-muted-foreground">Tax Calculator 2026</p>
              </div>
            </div>
            <Link href="/faq">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <HelpCircle className="size-4" />
                <span className="hidden sm:inline">FAQ</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
              </span>
              Nigeria Tax Act 2025
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">Calculate Your Tax in Seconds</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
              Accurate PAYE calculations for employees, contractors, business owners, and service providers. Know
              exactly how much you keep.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <TaxCalculator
              salary={salary}
              setSalary={setSalary}
              frequency={frequency}
              setFrequency={setFrequency}
              userType={userType}
              setUserType={setUserType}
            />
            <TaxResults taxResult={taxResult} frequency={frequency} userType={userType} />
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 lg:p-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-balance">Understanding the Nigeria Tax Act 2025</h3>
                <p className="text-muted-foreground text-pretty">
                  Learn about the new tax brackets, exemptions, and how they affect your take-home pay.
                </p>
              </div>
              <Link href="/faq">
                <Button variant="default" className="gap-2 whitespace-nowrap">
                  Learn More
                  <HelpCircle className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 NGNTax. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
              <span>Based on Nigeria Tax Act 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
