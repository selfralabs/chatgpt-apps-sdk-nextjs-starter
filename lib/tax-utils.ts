export interface TaxBand {
  rate: number
  amount: number
  tax: number
}

export interface TaxResult {
  grossSalary: number
  totalTax: number
  netSalary: number
  effectiveRate: number
  breakdown: TaxBand[]
}

export type UserType = "employee" | "contractor" | "business" | "service"

// Nigeria Tax Act 2025 - PAYE Tax Bands
const MONTHLY_TAX_BANDS = [
  { threshold: 66667, rate: 0 }, // First ₦800k annually (₦0 - ₦66,667) - Tax Free
  { threshold: 250000, rate: 15 }, // Next ₦2.2M annually (₦66,668 - ₦250,000)
  { threshold: 1000000, rate: 18 }, // Next ₦9M annually (₦250,001 - ₦1,000,000)
  { threshold: 2083333, rate: 21 }, // Next ₦13M annually (₦1,000,001 - ₦2,083,333)
  { threshold: 4166667, rate: 23 }, // Next ₦25M annually (₦2,083,334 - ₦4,166,667)
  { threshold: Number.POSITIVE_INFINITY, rate: 25 }, // Above ₦50M annually
]

const ANNUAL_TAX_BANDS = [
  { threshold: 800000, rate: 0 }, // First ₦800k - Tax Free
  { threshold: 3000000, rate: 15 }, // ₦800k - ₦3M
  { threshold: 12000000, rate: 18 }, // ₦3M - ₦12M
  { threshold: 25000000, rate: 21 }, // ₦12M - ₦25M
  { threshold: 50000000, rate: 23 }, // ₦25M - ₦50M
  { threshold: Number.POSITIVE_INFINITY, rate: 25 }, // Above ₦50M
]

export function calculateTax(
  salary: number,
  frequency: "monthly" | "yearly",
  userType: UserType = "employee",
): TaxResult {
  const bands = frequency === "monthly" ? MONTHLY_TAX_BANDS : ANNUAL_TAX_BANDS

  let totalTax = 0
  const breakdown: TaxBand[] = []
  let previousThreshold = 0

  for (const band of bands) {
    if (salary <= previousThreshold) break

    const taxableAmount = Math.min(salary, band.threshold) - previousThreshold

    if (taxableAmount > 0) {
      const tax = (taxableAmount * band.rate) / 100

      breakdown.push({
        rate: band.rate,
        amount: taxableAmount,
        tax: Math.round(tax),
      })

      totalTax += tax
    }

    previousThreshold = band.threshold

    if (salary <= band.threshold) break
  }

  const roundedTax = Math.round(totalTax)
  const netSalary = salary - roundedTax
  const effectiveRate = salary > 0 ? (roundedTax / salary) * 100 : 0

  return {
    grossSalary: salary,
    totalTax: roundedTax,
    netSalary,
    effectiveRate,
    breakdown,
  }
}
