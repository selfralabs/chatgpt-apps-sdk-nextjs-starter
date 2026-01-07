import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    question: "What is the Nigeria Tax Act 2025?",
    answer:
      "The Nigeria Tax Act 2025 is a consolidated tax law that came into effect on January 1, 2026. It simplifies and modernizes the Nigerian tax system, combining multiple tax laws into one comprehensive framework for easier understanding and compliance.",
    category: "Basics",
  },
  {
    question: "What is PAYE?",
    answer:
      "PAYE (Pay As You Earn) is a system where income tax is deducted directly from your salary by your employer before you receive it. This makes tax collection more efficient and ensures compliance with tax obligations.",
    category: "Basics",
  },
  {
    question: "Who doesn't have to pay tax?",
    answer:
      "Individuals earning below the tax-free threshold (first ₦800,000 per year or ₦66,667 per month) don't pay income tax. This is designed to protect low-income earners and ensure tax fairness.",
    category: "Exemptions",
  },
  {
    question: "Will the government automatically debit my account?",
    answer:
      "No. If you're employed, your employer deducts tax from your salary using PAYE. The government doesn't have direct access to your personal bank account for tax collection. Self-employed individuals must file and pay taxes directly.",
    category: "Payment",
  },
  {
    question: "Are gifts and transfers I receive taxed?",
    answer:
      "Generally, gifts from family and friends are not taxable. However, large transfers that appear to be business income may be subject to scrutiny by tax authorities. Always keep proper documentation.",
    category: "Income",
  },
  {
    question: "What's rent relief and how do I claim it?",
    answer:
      "Rent relief allows you to deduct the lower of 20% of your annual rent or ₦500,000 from your taxable income, reducing your overall tax burden. You need to provide proof of rent payment such as receipts or bank statements to your employer or tax authority.",
    category: "Deductions",
  },
  {
    question: "How do pension contributions affect my tax?",
    answer:
      "Your 8% pension contribution (calculated on Basic Salary + Housing + Transport allowances) is deductible from your taxable income. This reduces your current tax bill while helping you save for retirement. Your employer's contribution is not tax-deductible for you.",
    category: "Deductions",
  },
  {
    question: "What if I'm a contractor or freelancer?",
    answer:
      "Contractors and freelancers are responsible for calculating and paying their own taxes. You should register with FIRS, keep detailed income records, and file annual tax returns. The same progressive tax rates apply to your net income.",
    category: "Self-Employed",
  },
  {
    question: "What about business owners?",
    answer:
      "Business owners pay company income tax on business profits (separate from personal income tax). The corporate tax rate is typically 30% for large companies and 20% for small businesses. You also pay personal income tax on salaries or dividends you receive.",
    category: "Self-Employed",
  },
  {
    question: "What if I sell stocks or cryptocurrency?",
    answer:
      "Capital gains from the sale of assets like stocks and cryptocurrency are subject to capital gains tax at 10%. However, specific regulations for cryptocurrency are still evolving. Keep detailed records of all transactions for tax purposes.",
    category: "Investments",
  },
  {
    question: "When do I need to file my taxes?",
    answer:
      "If you're employed and your employer handles PAYE, you typically don't need to file separately unless you have other income sources. Self-employed individuals, contractors, and business owners must file annual tax returns within 6 months after the end of the tax year (typically by June 30).",
    category: "Filing",
  },
  {
    question: "What's the difference between income tax and VAT?",
    answer:
      "Income tax is charged on earnings (salary, business profit) using progressive rates from 0% to 25%. VAT (Value Added Tax) at 7.5% is a consumption tax charged on goods and services you purchase. They're separate taxes serving different purposes in the tax system.",
    category: "Basics",
  },
  {
    question: "Why do we even pay taxes?",
    answer:
      "Taxes fund essential public services including healthcare, education, infrastructure, security, and social programs. They're the primary way governments generate revenue to serve citizens and develop the nation.",
    category: "Basics",
  },
  {
    question: "Can I reduce my tax legally?",
    answer:
      "Yes! Legal tax reduction strategies include: maximizing pension contributions (8% of pensionable emoluments), claiming rent relief (up to ₦500k), other allowable deductions like NHF, NHIS, and life insurance premiums, and structuring your income efficiently with professional advice.",
    category: "Planning",
  },
]

export function FAQSection() {
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)))

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Card key={category} className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{category}</Badge>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs
                .filter((faq) => faq.category === category)
                .map((faq, index) => (
                  <AccordionItem key={index} value={`${category}-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
