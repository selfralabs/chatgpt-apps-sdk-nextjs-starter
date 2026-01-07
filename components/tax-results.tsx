"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, TrendingUp, Wallet, Receipt, Percent } from "lucide-react"
import { useState } from "react"
import type { TaxResult } from "@/lib/tax-utils"

interface TaxResultsProps {
  taxResult: TaxResult
  frequency: "monthly" | "yearly"
  userType: "employee" | "contractor" | "business" | "service"
}

export function TaxResults({ taxResult, frequency, userType }: TaxResultsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const CopyButton = ({ value, field }: { value: string; field: string }) => (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCopy(value, field)}>
      {copiedField === field ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
    </Button>
  )

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Your Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="space-y-3 p-6 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="size-4" />
              <span>Take-Home Pay</span>
            </div>
            <Badge variant="default" className="gap-1">
              <TrendingUp className="size-3" />
              Net Income
            </Badge>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-primary">₦{taxResult.netSalary.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">per {frequency === "monthly" ? "month" : "year"}</p>
            </div>
            <CopyButton value={taxResult.netSalary.toLocaleString()} field="net" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Receipt className="size-3.5" />
                <span>Tax Paid</span>
              </div>
              <CopyButton value={taxResult.totalTax.toLocaleString()} field="tax" />
            </div>
            <p className="text-2xl font-bold">₦{taxResult.totalTax.toLocaleString()}</p>
          </div>

          <div className="p-4 rounded-lg border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Percent className="size-3.5" />
                <span>Effective Rate</span>
              </div>
              <CopyButton value={`${taxResult.effectiveRate.toFixed(2)}%`} field="rate" />
            </div>
            <p className="text-2xl font-bold">{taxResult.effectiveRate.toFixed(2)}%</p>
          </div>
        </div>

        <Separator />

        {/* Tax Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Receipt className="size-4" />
            Tax Breakdown
          </h3>
          <div className="space-y-2">
            {taxResult.breakdown
              .filter((band) => band.amount > 0)
              .map((band, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={band.rate === 0 ? "secondary" : "outline"}
                      className="min-w-[3.5rem] justify-center"
                    >
                      {band.rate === 0 ? "Free" : `${band.rate}%`}
                    </Badge>
                    <span className="text-sm text-muted-foreground">on ₦{band.amount.toLocaleString()}</span>
                  </div>
                  <span className="font-semibold">₦{band.tax.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>

        <Separator />

        {/* Summary */}
        <div className="space-y-3 p-4 rounded-lg bg-muted/30">
          <h4 className="font-medium text-sm">Per ₦1,000 earned</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">You Keep</p>
              <p className="text-lg font-bold text-primary">
                ₦{(1000 - (taxResult.effectiveRate / 100) * 1000).toFixed(0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tax Paid</p>
              <p className="text-lg font-bold">₦{((taxResult.effectiveRate / 100) * 1000).toFixed(0)}</p>
            </div>
          </div>
        </div>

        {/* Copy All Button */}
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent"
          onClick={() =>
            handleCopy(
              `Income: ₦${taxResult.grossSalary.toLocaleString()} ${frequency}\nTax: ₦${taxResult.totalTax.toLocaleString()} (${taxResult.effectiveRate.toFixed(2)}%)\nTake-Home: ₦${taxResult.netSalary.toLocaleString()}`,
              "all",
            )
          }
        >
          {copiedField === "all" ? (
            <>
              <Check className="size-4" />
              Copied All Results!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy All Results
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
