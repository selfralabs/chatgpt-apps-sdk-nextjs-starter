"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Code, Droplet, Skull, Building2, Video } from "lucide-react"

interface TaxCalculatorProps {
  salary: number
  setSalary: (salary: number) => void
  frequency: "monthly" | "yearly"
  setFrequency: (frequency: "monthly" | "yearly") => void
  userType: "employee" | "tech" | "oilgas" | "ritualist" | "business" | "creator"
  setUserType: (userType: "employee" | "tech" | "oilgas" | "ritualist" | "business" | "creator") => void
}

const userTypes = [
  {
    value: "employee",
    label: "Employee",
    icon: Briefcase,
    description: "Salaried worker",
    presets: {
      minWage: 70000,
      entry: 200000,
      mid: 450000,
      senior: 800000,
      executive: 2000000,
    },
  },
  {
    value: "tech",
    label: "Tech Bro",
    icon: Code,
    description: "Software/IT Professional",
    presets: {
      minWage: 70000,
      entry: 600000,
      mid: 1200000,
      senior: 2500000,
      executive: 5000000,
    },
  },
  {
    value: "oilgas",
    label: "Oil & Gas Bro",
    icon: Droplet,
    description: "Petroleum Industry",
    presets: {
      minWage: 70000,
      entry: 3000000,
      mid: 5500000,
      senior: 10000000,
      executive: 20000000,
    },
  },
  {
    value: "ritualist",
    label: "Ritualist",
    icon: Skull,
    description: "High-Net-Worth Individual",
    presets: {
      minWage: 70000,
      entry: 10000000,
      mid: 25000000,
      senior: 50000000,
      executive: 100000000,
    },
  },
  {
    value: "business",
    label: "Business Owner",
    icon: Building2,
    description: "Entrepreneur/MSME",
    presets: {
      minWage: 70000,
      entry: 1500000,
      mid: 3500000,
      senior: 7000000,
      executive: 15000000,
    },
  },
  {
    value: "creator",
    label: "Content Creator",
    icon: Video,
    description: "Influencer/Digital Creator",
    presets: {
      minWage: 70000,
      entry: 400000,
      mid: 1800000,
      senior: 6000000,
      executive: 18000000,
    },
  },
]

export function TaxCalculator({
  salary,
  setSalary,
  frequency,
  setFrequency,
  userType,
  setUserType,
}: TaxCalculatorProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(0)}k`
    }
    return `₦${amount.toFixed(0)}`
  }

  const handleFrequencyChange = (newFrequency: "monthly" | "yearly") => {
    if (frequency === "monthly" && newFrequency === "yearly") {
      setSalary(salary * 12)
    } else if (frequency === "yearly" && newFrequency === "monthly") {
      setSalary(Math.round(salary / 12))
    }
    setFrequency(newFrequency)
  }

  const getCurrentPresets = () => {
    const currentUser = userTypes.find((t) => t.value === userType)
    if (!currentUser) return []

    return [
      { label: "Min. Wage", value: currentUser.presets.minWage },
      { label: "Entry Level", value: currentUser.presets.entry },
      { label: "Mid-Level", value: currentUser.presets.mid },
      { label: "Senior", value: currentUser.presets.senior },
      { label: "Executive", value: currentUser.presets.executive },
    ]
  }

  const getPresetValue = (monthlyValue: number) => {
    return frequency === "yearly" ? monthlyValue * 12 : monthlyValue
  }

  const handleUserTypeChange = (newType: string) => {
    const newUserType = userTypes.find((t) => t.value === newType)
    if (newUserType) {
      const entryValue = frequency === "yearly" ? newUserType.presets.entry * 12 : newUserType.presets.entry
      setSalary(entryValue)
    }
    setUserType(newType as any)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Calculate Your Tax</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">I am a...</label>
          <div className="grid grid-cols-2 gap-3">
            {userTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.value}
                  onClick={() => handleUserTypeChange(type.value)}
                  className={`flex flex-col items-start gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary/50 ${
                    userType === type.value ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <Icon className={`size-5 ${userType === type.value ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Quick Select</label>
          <div className="flex gap-2 flex-wrap">
            {getCurrentPresets().map((preset) => (
              <Button
                key={preset.label}
                variant={salary === getPresetValue(preset.value) ? "default" : "outline"}
                size="sm"
                onClick={() => setSalary(getPresetValue(preset.value))}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Income Frequency</label>
          <Tabs value={frequency} onValueChange={(v) => handleFrequencyChange(v as any)}>
            <TabsList className="w-full">
              <TabsTrigger value="monthly" className="flex-1">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="flex-1">
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Your Income</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
              <span className="text-3xl font-bold text-primary">₦</span>
              <input
                type="text"
                value={salary.toLocaleString()}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value.replace(/,/g, "")) || 0
                  setSalary(Math.min(value, frequency === "monthly" ? 100000000 : 1200000000))
                }}
                className="text-3xl font-bold bg-transparent outline-none w-full text-foreground"
              />
            </div>
            <Slider
              value={[salary]}
              onValueChange={(values) => setSalary(values[0])}
              max={frequency === "monthly" ? 100000000 : 1200000000}
              step={frequency === "monthly" ? 10000 : 100000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₦0</span>
              <span>{formatCurrency(frequency === "monthly" ? 100000000 : 1200000000)}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Calculating for:</span>
            <Badge variant="secondary" className="font-medium">
              {userTypes.find((t) => t.value === userType)?.label}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
