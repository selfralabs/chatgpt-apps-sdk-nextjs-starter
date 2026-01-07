import { Card } from "@/components/ui/card"
import type { TaxResult } from "@/lib/tax-utils"

interface TaxBreakdownProps {
  taxResult: TaxResult
  frequency: "monthly" | "yearly"
}

export function TaxBreakdown({ taxResult, frequency }: TaxBreakdownProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Tax breakdown ({frequency})</h3>
      <div className="space-y-3">
        {taxResult.breakdown.map((band, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <span className="font-medium">{band.rate === 0 ? "Tax-free" : `${band.rate}%`}</span>
              <span className="text-muted-foreground ml-2">on ₦{band.amount.toLocaleString()}</span>
            </div>
            <span className="font-semibold">₦{band.tax.toLocaleString()}</span>
          </div>
        ))}
        <div className="pt-3 border-t border-border flex justify-between items-center">
          <span className="font-semibold">Total tax</span>
          <span className="font-bold text-lg">₦{taxResult.totalTax.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h4 className="font-medium">Ways to reduce tax</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Contribute up to 20% to pension</li>
          <li>• Claim rent relief (max ₦500k)</li>
          <li>• Review pay structure with HR</li>
        </ul>
      </div>
    </Card>
  )
}
