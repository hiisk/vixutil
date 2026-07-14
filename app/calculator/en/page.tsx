'use client';

import Link from 'next/link';
import { useState } from 'react';
import PageGlow from '@/components/PageGlow';

/* ── Calculator data (English) ── */
const CATS = [
  {
    id: 'worker', label: 'Salary', icon: '👔',
    desc: 'Salary, allowances & insurance calculators',
    accent: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    calcs: [
      { href: '/calculator/salary',          title: 'Net Salary Calculator',    desc: 'Annual salary → monthly take-home after deductions', hot: true },
      { href: '/calculator/weekly-holiday',  title: 'Weekly Holiday Pay',       desc: 'Hourly wage & weekly hours → weekly holiday allowance' },
      { href: '/calculator/annual-leave-pay',title: 'Annual Leave Pay',         desc: 'Monthly salary & unused leave → leave pay' },
      { href: '/calculator/four-insurance',  title: '4 Social Insurances',      desc: 'Monthly salary → detailed social insurance breakdown' },
      { href: '/calculator/minimum-wage',    title: 'Minimum Wage',             desc: 'Monthly salary based on 2026 minimum wage' },
      { href: '/calculator/parttime',        title: 'Part-time Pay',            desc: 'Hourly rate & work days → weekly/monthly pay' },
      { href: '/calculator/overtime',        title: 'Overtime Pay',             desc: 'Standard hourly rate & overtime hours → overtime pay' },
      { href: '/calculator/to-hourly',       title: 'Hourly Rate',              desc: 'Monthly salary → hourly rate conversion' },
      { href: '/calculator/to-annual',       title: 'Annual Salary',            desc: 'Monthly salary → annual salary conversion' },
      { href: '/calculator/standard-wage',   title: 'Standard Wage',            desc: 'Base pay & fixed allowances → standard wage' },
      { href: '/calculator/severance',       title: 'Severance Pay',            desc: 'Average wage + bonus + leave → statutory severance' },
    ],
  },
  {
    id: 'tax', label: 'Tax', icon: '🧾',
    desc: 'Various tax calculators',
    accent: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
    calcs: [
      { href: '/calculator/freelance',         title: 'Freelancer Tax',            desc: 'Income → 3.3% withholding tax', hot: true },
      { href: '/calculator/vat',               title: 'VAT',                       desc: 'Supply amount ↔ value-added tax' },
      { href: '/calculator/business-income',   title: 'Business Income Tax',       desc: 'Business income → estimated tax' },
      { href: '/calculator/comprehensive-tax', title: 'Comprehensive Income Tax',   desc: 'Annual income → estimated comprehensive income tax' },
      { href: '/calculator/capital-gains',     title: 'Capital Gains Tax',         desc: 'Acquisition & transfer price → estimated tax' },
      { href: '/calculator/gift-tax',          title: 'Gift Tax',                  desc: 'Gift amount & relationship → estimated gift tax' },
      { href: '/calculator/inheritance-tax',   title: 'Inheritance Tax',           desc: 'Inherited assets → estimated inheritance tax' },
      { href: '/calculator/local-income-tax',  title: 'Local Income Tax',          desc: 'Income tax → local income tax calculation' },
    ],
  },
  {
    id: 'finance', label: 'Finance', icon: '📈',
    desc: 'Investment, savings & loan calculators',
    accent: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
    calcs: [
      { href: '/calculator/compound',       title: 'Compound Interest',      desc: 'Monthly/quarterly/annual compounding + yearly table', hot: true },
      { href: '/calculator/loan',           title: 'Loan Calculator',         desc: 'Equal payment / equal principal + repayment schedule' },
      { href: '/calculator/deposit',        title: 'Deposit Interest',        desc: 'Principal, rate & term → interest' },
      { href: '/calculator/savings',        title: 'Savings Calculator',      desc: 'Monthly payment & rate → maturity amount' },
      { href: '/calculator/roi',            title: 'ROI Calculator',          desc: 'Buy & sell price → return on investment' },
      { href: '/calculator/avg-price',      title: 'Average Cost',            desc: 'Multiple purchases → average cost per unit' },
      { href: '/calculator/breakeven',      title: 'Break-even Point',        desc: 'Break-even point including fees' },
      { href: '/calculator/compound-goal',  title: 'Compound Goal',           desc: 'Time needed to reach target amount' },
      { href: '/calculator/dividend',       title: 'Dividend Calculator',     desc: 'Dividend yield → estimated dividend income' },
      { href: '/calculator/max-loan',       title: 'Max Loan Amount',         desc: 'Income-based maximum loan amount' },
      { href: '/calculator/dsr',            title: 'DSR Calculator',          desc: 'Debt service ratio calculation' },
      { href: '/calculator/ltv',            title: 'LTV Calculator',          desc: 'Loan-to-value ratio calculation' },
      { href: '/calculator/exchange',       title: 'Currency Exchange',        desc: 'Live API · major currency conversion' },
      { href: '/calculator/simple-interest',title: 'Simple Interest',         desc: 'Principal, rate & term → simple interest' },
      { href: '/calculator/inflation',      title: 'Inflation Calculator',    desc: 'Adjust amounts for inflation over time' },
      { href: '/calculator/retirement',     title: 'Retirement Calculator',   desc: 'Estimate retirement savings needs' },
    ],
  },
  {
    id: 'realestate', label: 'Real Estate', icon: '🏠',
    desc: 'Real estate transaction & tax calculators',
    accent: 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/50',
    calcs: [
      { href: '/calculator/pyeong',             title: 'Pyeong Converter',       desc: 'Pyeong ↔ square meters conversion' },
      { href: '/calculator/broker-fee',         title: 'Agent Fee',              desc: 'Transaction amount → broker commission' },
      { href: '/calculator/jeonwolse',          title: 'Jeonse/Wolse Converter', desc: 'Jeonse ↔ monthly rent conversion' },
      { href: '/calculator/acquisition-tax',    title: 'Acquisition Tax',        desc: 'Real estate acquisition tax calculation' },
      { href: '/calculator/property-tax',       title: 'Property Tax',           desc: 'Estimated property tax calculation' },
      { href: '/calculator/holding-tax',        title: 'Holding Tax',            desc: 'Holding tax including comprehensive real estate tax' },
      { href: '/calculator/subscription-score', title: 'Subscription Score',     desc: 'Homeless period & dependents → subscription points' },
    ],
  },
  {
    id: 'life', label: 'Daily Life', icon: '🌿',
    desc: 'Everyday convenience calculators',
    accent: 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/50',
    calcs: [
      { href: '/calculator/bmi',            title: 'BMI Calculator',         desc: 'Height & weight → BMI + ideal weight' },
      { href: '/calculator/dday',           title: 'D-day Calculator',       desc: 'Target date D-day · date interval' },
      { href: '/calculator/percent',        title: 'Percentage Calculator',  desc: 'Increase/decrease rate & ratio calculation' },
      { href: '/calculator/age',            title: 'Age Calculator',         desc: 'International age & Korean age calculation' },
      { href: '/calculator/birthday',       title: 'Birthday Calculator',    desc: 'Day of week & birth date based calculation' },
      { href: '/calculator/calorie',        title: 'Calorie Calculator',     desc: 'Recommended calories by activity level' },
      { href: '/calculator/bmr',            title: 'BMR Calculator',         desc: 'Basal metabolic rate (Harris-Benedict)' },
      { href: '/calculator/water',          title: 'Water Intake',           desc: 'Recommended daily water intake by weight' },
      { href: '/calculator/sleep',          title: 'Sleep Calculator',       desc: 'Wake time → recommended bedtime' },
      { href: '/calculator/ovulation',      title: 'Ovulation Calculator',   desc: 'Last period → ovulation & fertile window' },
      { href: '/calculator/tip',            title: 'Tip Calculator',         desc: 'Bill amount & tip % → tip and total' },
      { href: '/calculator/dutch-pay',      title: 'Dutch Pay / Bill Split', desc: 'Total bill → split evenly among group' },
      { href: '/calculator/discount',       title: 'Discount Calculator',    desc: 'Original price & discount % → final price' },
      { href: '/calculator/time-diff',      title: 'Time Calculator',        desc: 'Calculate time difference between two times' },
      { href: '/calculator/blood-pressure', title: 'Blood Pressure Check',   desc: 'Check your blood pressure category' },
      { href: '/calculator/pregnancy',      title: 'Pregnancy Due Date',     desc: 'Last period → estimated due date' },
      { href: '/calculator/body-fat',       title: 'Body Fat Calculator',    desc: 'Estimate body fat percentage' },
      { href: '/calculator/calories-burn',  title: 'Calories Burned',        desc: 'Activity & duration → calories burned' },
      { href: '/calculator/gpa',            title: 'GPA Calculator',         desc: 'Grades & credits → GPA calculation' },
    ],
  },
  {
    id: 'car', label: 'Car', icon: '🚗',
    desc: 'Automobile related calculators',
    accent: 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
    calcs: [
      { href: '/calculator/car-installment', title: 'Car Installment',    desc: 'Car price, rate & term → monthly payment' },
      { href: '/calculator/car-tax',         title: 'Car Tax',            desc: 'Automobile tax by engine displacement' },
      { href: '/calculator/fuel-efficiency', title: 'Fuel Efficiency',    desc: 'Distance & fuel amount → fuel efficiency' },
      { href: '/calculator/gas-cost',        title: 'Gas Cost',           desc: 'Distance, efficiency & fuel price → gas cost' },
      { href: '/calculator/ev-charge',       title: 'EV Charging Cost',   desc: 'Battery & charge amount → charging cost' },
    ],
  },
  {
    id: 'utility', label: 'Utilities', icon: '💡',
    desc: 'Electricity, gas & water bill calculators',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href: '/calculator/electricity', title: 'Electricity Bill', desc: 'Progressive rate calculation based on kWh' },
      { href: '/calculator/gas-bill',    title: 'Gas Bill',         desc: 'City gas bill based on usage' },
      { href: '/calculator/water-bill',  title: 'Water Bill',       desc: 'Water bill calculation based on usage' },
    ],
  },
  {
    id: 'dev', label: 'Dev Tools', icon: '💻',
    desc: 'Tools for developers',
    accent: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300',
    calcs: [
      { href: '/calculator/dev/json',       title: 'JSON Formatter',         desc: 'JSON sort, validate & copy' },
      { href: '/calculator/dev/base64',     title: 'Base64 Converter',       desc: 'Base64 encode & decode' },
      { href: '/calculator/dev/url-encode', title: 'URL Encoder',            desc: 'URL encode & decode' },
      { href: '/calculator/dev/timestamp',  title: 'Unix Timestamp',         desc: 'Date ↔ timestamp conversion' },
      { href: '/calculator/dev/jwt',        title: 'JWT Decoder',            desc: 'JWT payload parse & inspect' },
      { href: '/calculator/dev/hash',       title: 'MD5 / SHA256 Generator', desc: 'Hash generation tool' },
      { href: '/calculator/dev/regex',      title: 'Regex Tester',           desc: 'Live regular expression testing' },
      { href: '/calculator/dev/uuid',       title: 'UUID Generator',         desc: 'v4 UUID generation' },
      { href: '/calculator/dev/color',      title: 'Color Converter',        desc: 'HEX ↔ RGB ↔ HSL conversion' },
      { href: '/calculator/dev/cron',       title: 'Cron Expression Builder', desc: 'Cron expression create & validate' },
      { href: '/calculator/dev/sql',        title: 'SQL Formatter',          desc: 'SQL format & indent' },
      { href: '/calculator/dev/salary',     title: 'Dev Salary Calculator',  desc: 'Annual salary ↔ monthly ↔ hourly conversion' },
      { href: '/calculator/dev/word-count', title: 'Word Count',             desc: 'Count words, characters & lines' },
      { href: '/calculator/dev/diff',       title: 'Text Diff',              desc: 'Compare two texts side by side' },
    ],
  },
  {
    id: 'math', label: 'Math', icon: '🔢',
    desc: 'Unit conversion & math tools',
    accent: 'bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900/50',
    calcs: [
      { href: '/calculator/unit-length', title: 'Length Converter',       desc: 'Convert between length units' },
      { href: '/calculator/unit-weight', title: 'Weight Converter',       desc: 'Convert between weight units' },
      { href: '/calculator/unit-temp',   title: 'Temperature Converter',  desc: 'Celsius ↔ Fahrenheit ↔ Kelvin' },
      { href: '/calculator/binary',      title: 'Number Base Converter',  desc: 'Binary ↔ Octal ↔ Decimal ↔ Hex' },
    ],
  },
];

const LANG_LINKS = [
  { href: '/calculator/',    label: '🇰🇷 KO' },
  { href: '/calculator/en',  label: '🇺🇸 EN' },
  { href: '/calculator/ja',  label: '🇯🇵 JA' },
];

export default function EnHome() {
  const total = CATS.reduce((s, c) => s + c.calcs.length, 0);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? CATS.map(cat => ({
        ...cat,
        calcs: cat.calcs.filter(
          c =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.desc.toLowerCase().includes(query.toLowerCase()),
        ),
      })).filter(cat => cat.calcs.length > 0)
    : CATS;

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-black text-blue-600 text-lg shrink-0">calc.</span>
            {/* Category tabs — horizontal scroll */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors whitespace-nowrap"
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </nav>
            {/* Language switcher */}
            <div className="flex items-center gap-1 shrink-0">
              {LANG_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
                    l.href === '/en'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">
        {/* Hero */}
        <section className="py-10 sm:py-14 border-b border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Korean Calculators</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-3">
            All-in-one daily life calculators
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            Salary · Tax · Finance · Real Estate · Daily Life · Car · Utilities · Dev Tools —{' '}
            <strong className="text-slate-700 dark:text-slate-200">{total}</strong> calculators
          </p>
          {/* Search */}
          <input
            type="search"
            placeholder="Search calculators..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-md border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
        </section>

        {/* Category sections */}
        <div className="py-8 flex flex-col gap-14">
          {filtered.map(cat => (
            <section key={cat.id} id={cat.id}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="font-black text-slate-900 dark:text-slate-100 text-lg leading-tight">{cat.label}</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{cat.desc}</p>
                </div>
                <span className={`ml-auto shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${cat.accent}`}>
                  {cat.calcs.length}
                </span>
              </div>

              {/* Calculator card grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {cat.calcs.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-700 transition-colors">
                        {c.title}
                      </h3>
                      {(c as { hot?: boolean }).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
          <p className="text-xs text-slate-300 dark:text-slate-600">Reference calculator · Based on 2026 Korean standards</p>
        </footer>
      </div>
    </div>
  );
}
