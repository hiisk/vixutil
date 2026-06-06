'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ── Calculator data (English) ── */
const CATS = [
  {
    id: 'worker', label: 'Salary', icon: '👔',
    desc: 'Salary, allowances & insurance calculators',
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
    calcs: [
      { href: '/salary',          title: 'Net Salary Calculator',    desc: 'Annual salary → monthly take-home after deductions', hot: true },
      { href: '/weekly-holiday',  title: 'Weekly Holiday Pay',       desc: 'Hourly wage & weekly hours → weekly holiday allowance' },
      { href: '/annual-leave-pay',title: 'Annual Leave Pay',         desc: 'Monthly salary & unused leave → leave pay' },
      { href: '/four-insurance',  title: '4 Social Insurances',      desc: 'Monthly salary → detailed social insurance breakdown' },
      { href: '/minimum-wage',    title: 'Minimum Wage',             desc: 'Monthly salary based on 2026 minimum wage' },
      { href: '/parttime',        title: 'Part-time Pay',            desc: 'Hourly rate & work days → weekly/monthly pay' },
      { href: '/overtime',        title: 'Overtime Pay',             desc: 'Standard hourly rate & overtime hours → overtime pay' },
      { href: '/to-hourly',       title: 'Hourly Rate',              desc: 'Monthly salary → hourly rate conversion' },
      { href: '/to-annual',       title: 'Annual Salary',            desc: 'Monthly salary → annual salary conversion' },
      { href: '/standard-wage',   title: 'Standard Wage',            desc: 'Base pay & fixed allowances → standard wage' },
      { href: '/severance',       title: 'Severance Pay',            desc: 'Average wage + bonus + leave → statutory severance' },
    ],
  },
  {
    id: 'tax', label: 'Tax', icon: '🧾',
    desc: 'Various tax calculators',
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    calcs: [
      { href: '/freelance',         title: 'Freelancer Tax',            desc: 'Income → 3.3% withholding tax', hot: true },
      { href: '/vat',               title: 'VAT',                       desc: 'Supply amount ↔ value-added tax' },
      { href: '/business-income',   title: 'Business Income Tax',       desc: 'Business income → estimated tax' },
      { href: '/comprehensive-tax', title: 'Comprehensive Income Tax',   desc: 'Annual income → estimated comprehensive income tax' },
      { href: '/capital-gains',     title: 'Capital Gains Tax',         desc: 'Acquisition & transfer price → estimated tax' },
      { href: '/gift-tax',          title: 'Gift Tax',                  desc: 'Gift amount & relationship → estimated gift tax' },
      { href: '/inheritance-tax',   title: 'Inheritance Tax',           desc: 'Inherited assets → estimated inheritance tax' },
      { href: '/local-income-tax',  title: 'Local Income Tax',          desc: 'Income tax → local income tax calculation' },
    ],
  },
  {
    id: 'finance', label: 'Finance', icon: '📈',
    desc: 'Investment, savings & loan calculators',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    calcs: [
      { href: '/compound',       title: 'Compound Interest',      desc: 'Monthly/quarterly/annual compounding + yearly table', hot: true },
      { href: '/loan',           title: 'Loan Calculator',         desc: 'Equal payment / equal principal + repayment schedule' },
      { href: '/deposit',        title: 'Deposit Interest',        desc: 'Principal, rate & term → interest' },
      { href: '/savings',        title: 'Savings Calculator',      desc: 'Monthly payment & rate → maturity amount' },
      { href: '/roi',            title: 'ROI Calculator',          desc: 'Buy & sell price → return on investment' },
      { href: '/avg-price',      title: 'Average Cost',            desc: 'Multiple purchases → average cost per unit' },
      { href: '/breakeven',      title: 'Break-even Point',        desc: 'Break-even point including fees' },
      { href: '/compound-goal',  title: 'Compound Goal',           desc: 'Time needed to reach target amount' },
      { href: '/dividend',       title: 'Dividend Calculator',     desc: 'Dividend yield → estimated dividend income' },
      { href: '/max-loan',       title: 'Max Loan Amount',         desc: 'Income-based maximum loan amount' },
      { href: '/dsr',            title: 'DSR Calculator',          desc: 'Debt service ratio calculation' },
      { href: '/ltv',            title: 'LTV Calculator',          desc: 'Loan-to-value ratio calculation' },
      { href: '/exchange',       title: 'Currency Exchange',        desc: 'Live API · major currency conversion' },
      { href: '/simple-interest',title: 'Simple Interest',         desc: 'Principal, rate & term → simple interest' },
      { href: '/inflation',      title: 'Inflation Calculator',    desc: 'Adjust amounts for inflation over time' },
      { href: '/retirement',     title: 'Retirement Calculator',   desc: 'Estimate retirement savings needs' },
    ],
  },
  {
    id: 'realestate', label: 'Real Estate', icon: '🏠',
    desc: 'Real estate transaction & tax calculators',
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
    calcs: [
      { href: '/pyeong',             title: 'Pyeong Converter',       desc: 'Pyeong ↔ square meters conversion' },
      { href: '/broker-fee',         title: 'Agent Fee',              desc: 'Transaction amount → broker commission' },
      { href: '/jeonwolse',          title: 'Jeonse/Wolse Converter', desc: 'Jeonse ↔ monthly rent conversion' },
      { href: '/acquisition-tax',    title: 'Acquisition Tax',        desc: 'Real estate acquisition tax calculation' },
      { href: '/property-tax',       title: 'Property Tax',           desc: 'Estimated property tax calculation' },
      { href: '/holding-tax',        title: 'Holding Tax',            desc: 'Holding tax including comprehensive real estate tax' },
      { href: '/subscription-score', title: 'Subscription Score',     desc: 'Homeless period & dependents → subscription points' },
    ],
  },
  {
    id: 'life', label: 'Daily Life', icon: '🌿',
    desc: 'Everyday convenience calculators',
    accent: 'bg-teal-50 text-teal-700 border-teal-200',
    calcs: [
      { href: '/bmi',            title: 'BMI Calculator',         desc: 'Height & weight → BMI + ideal weight' },
      { href: '/dday',           title: 'D-day Calculator',       desc: 'Target date D-day · date interval' },
      { href: '/percent',        title: 'Percentage Calculator',  desc: 'Increase/decrease rate & ratio calculation' },
      { href: '/age',            title: 'Age Calculator',         desc: 'International age & Korean age calculation' },
      { href: '/birthday',       title: 'Birthday Calculator',    desc: 'Day of week & birth date based calculation' },
      { href: '/calorie',        title: 'Calorie Calculator',     desc: 'Recommended calories by activity level' },
      { href: '/bmr',            title: 'BMR Calculator',         desc: 'Basal metabolic rate (Harris-Benedict)' },
      { href: '/water',          title: 'Water Intake',           desc: 'Recommended daily water intake by weight' },
      { href: '/sleep',          title: 'Sleep Calculator',       desc: 'Wake time → recommended bedtime' },
      { href: '/ovulation',      title: 'Ovulation Calculator',   desc: 'Last period → ovulation & fertile window' },
      { href: '/tip',            title: 'Tip Calculator',         desc: 'Bill amount & tip % → tip and total' },
      { href: '/dutch-pay',      title: 'Dutch Pay / Bill Split', desc: 'Total bill → split evenly among group' },
      { href: '/discount',       title: 'Discount Calculator',    desc: 'Original price & discount % → final price' },
      { href: '/time-diff',      title: 'Time Calculator',        desc: 'Calculate time difference between two times' },
      { href: '/blood-pressure', title: 'Blood Pressure Check',   desc: 'Check your blood pressure category' },
      { href: '/pregnancy',      title: 'Pregnancy Due Date',     desc: 'Last period → estimated due date' },
      { href: '/body-fat',       title: 'Body Fat Calculator',    desc: 'Estimate body fat percentage' },
      { href: '/calories-burn',  title: 'Calories Burned',        desc: 'Activity & duration → calories burned' },
      { href: '/gpa',            title: 'GPA Calculator',         desc: 'Grades & credits → GPA calculation' },
    ],
  },
  {
    id: 'car', label: 'Car', icon: '🚗',
    desc: 'Automobile related calculators',
    accent: 'bg-orange-50 text-orange-700 border-orange-200',
    calcs: [
      { href: '/car-installment', title: 'Car Installment',    desc: 'Car price, rate & term → monthly payment' },
      { href: '/car-tax',         title: 'Car Tax',            desc: 'Automobile tax by engine displacement' },
      { href: '/fuel-efficiency', title: 'Fuel Efficiency',    desc: 'Distance & fuel amount → fuel efficiency' },
      { href: '/gas-cost',        title: 'Gas Cost',           desc: 'Distance, efficiency & fuel price → gas cost' },
      { href: '/ev-charge',       title: 'EV Charging Cost',   desc: 'Battery & charge amount → charging cost' },
    ],
  },
  {
    id: 'utility', label: 'Utilities', icon: '💡',
    desc: 'Electricity, gas & water bill calculators',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href: '/electricity', title: 'Electricity Bill', desc: 'Progressive rate calculation based on kWh' },
      { href: '/gas-bill',    title: 'Gas Bill',         desc: 'City gas bill based on usage' },
      { href: '/water-bill',  title: 'Water Bill',       desc: 'Water bill calculation based on usage' },
    ],
  },
  {
    id: 'dev', label: 'Dev Tools', icon: '💻',
    desc: 'Tools for developers',
    accent: 'bg-slate-100 text-slate-700 border-slate-300',
    calcs: [
      { href: '/dev/json',       title: 'JSON Formatter',         desc: 'JSON sort, validate & copy' },
      { href: '/dev/base64',     title: 'Base64 Converter',       desc: 'Base64 encode & decode' },
      { href: '/dev/url-encode', title: 'URL Encoder',            desc: 'URL encode & decode' },
      { href: '/dev/timestamp',  title: 'Unix Timestamp',         desc: 'Date ↔ timestamp conversion' },
      { href: '/dev/jwt',        title: 'JWT Decoder',            desc: 'JWT payload parse & inspect' },
      { href: '/dev/hash',       title: 'MD5 / SHA256 Generator', desc: 'Hash generation tool' },
      { href: '/dev/regex',      title: 'Regex Tester',           desc: 'Live regular expression testing' },
      { href: '/dev/uuid',       title: 'UUID Generator',         desc: 'v4 UUID generation' },
      { href: '/dev/color',      title: 'Color Converter',        desc: 'HEX ↔ RGB ↔ HSL conversion' },
      { href: '/dev/cron',       title: 'Cron Expression Builder', desc: 'Cron expression create & validate' },
      { href: '/dev/sql',        title: 'SQL Formatter',          desc: 'SQL format & indent' },
      { href: '/dev/salary',     title: 'Dev Salary Calculator',  desc: 'Annual salary ↔ monthly ↔ hourly conversion' },
      { href: '/dev/word-count', title: 'Word Count',             desc: 'Count words, characters & lines' },
      { href: '/dev/diff',       title: 'Text Diff',              desc: 'Compare two texts side by side' },
    ],
  },
  {
    id: 'math', label: 'Math', icon: '🔢',
    desc: 'Unit conversion & math tools',
    accent: 'bg-pink-50 text-pink-700 border-pink-200',
    calcs: [
      { href: '/unit-length', title: 'Length Converter',       desc: 'Convert between length units' },
      { href: '/unit-weight', title: 'Weight Converter',       desc: 'Convert between weight units' },
      { href: '/unit-temp',   title: 'Temperature Converter',  desc: 'Celsius ↔ Fahrenheit ↔ Kelvin' },
      { href: '/binary',      title: 'Number Base Converter',  desc: 'Binary ↔ Octal ↔ Decimal ↔ Hex' },
    ],
  },
];

const LANG_LINKS = [
  { href: '/',    label: '🇰🇷 KO' },
  { href: '/en',  label: '🇺🇸 EN' },
  { href: '/ja',  label: '🇯🇵 JA' },
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
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-black text-blue-600 text-lg shrink-0">calc.</span>
            {/* Category tabs — horizontal scroll */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="shrink-0 text-xs font-semibold text-slate-500 hover:text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
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
                      : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
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
        <section className="py-10 sm:py-14 border-b border-slate-100">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Korean Calculators</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-3">
            All-in-one daily life calculators
          </h1>
          <p className="text-slate-500 text-sm mb-5">
            Salary · Tax · Finance · Real Estate · Daily Life · Car · Utilities · Dev Tools —{' '}
            <strong className="text-slate-700">{total}</strong> calculators
          </p>
          {/* Search */}
          <input
            type="search"
            placeholder="Search calculators..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-md border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
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
                  <h2 className="font-black text-slate-900 text-lg leading-tight">{cat.label}</h2>
                  <p className="text-xs text-slate-400">{cat.desc}</p>
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
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                        {c.title}
                      </h3>
                      {(c as { hot?: boolean }).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-slate-100 py-8 text-center">
          <p className="text-xs text-slate-300">Reference calculator · Based on 2026 Korean standards</p>
        </footer>
      </div>
    </div>
  );
}
