import { FAQSection } from "@/components/faq-section"
import { Calculator, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQ | NGNTax - Nigerian Tax Calculator",
  description: "Frequently asked questions about Nigerian tax calculations, PAYE, and the Nigeria Tax Act 2025.",
}

export default function FAQPage() {
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
                <h1 className="text-xl font-bold">NGNTax</h1>
                <p className="text-xs text-muted-foreground">Tax Calculator 2026</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back to Calculator</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              Nigeria Tax Act 2025
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to know about Nigerian tax calculations and PAYE.
            </p>
          </div>

          <FAQSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 NGNTax. All rights reserved.</p>
            <Link href="/" className="hover:text-foreground transition-colors">
              Back to Calculator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
