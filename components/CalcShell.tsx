import type { Metadata } from 'next';
import Link from 'next/link';
import CalcShareBtn from './CalcShareBtn';
import SiteFooter from './SiteFooter';
import RelatedCalcs from './RelatedCalcs';
import CrossLinks from './CrossLinks';
import CalcFaq from './CalcFaq';
import JsonLd, { breadcrumbJsonLd } from './JsonLd';
import type { FaqItem } from '@/lib/calc-faq';

// 각 페이지에서 export const metadata 설정을 위한 헬퍼
export function makeMetadata(title: string, description: string): Metadata {
  return { title, description };
}

export default function CalcShell({
  title,
  description,
  wide,
  faq,
  intro,
  children,
}: {
  title: string;
  description: string;
  wide?: boolean;
  /** 페이지 하단 자주 묻는 질문 — 표시 + FAQPage 구조화 데이터로 함께 출력 */
  faq?: FaqItem[];
  /** 결과 아래 노출할 설명 문단 (SEO용 본문 콘텐츠) */
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '계산기', path: '/calculator' },
          { name: title, path: '/calculator' },
        ])}
      />
      {/* 상단 바 */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* 네비 헤더 */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/calculator"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 계산기
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 flex-1 truncate">{title}</span>
          <CalcShareBtn />
        </div>
      </header>

      {/* 페이지 타이틀 */}
      <div className="bg-white border-b border-slate-100">
        <div className={`${wide ? 'max-w-3xl' : 'max-w-xl'} mx-auto px-4 py-6`}>
          <h1 className="text-xl font-black text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>

      {/* 본문 */}
      <main className={`${wide ? 'max-w-3xl' : 'max-w-xl'} mx-auto px-4 py-6 pb-8`}>
        {children}

        {intro && (
          <div className="mt-8 text-sm leading-relaxed text-slate-600 space-y-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-800 [&_strong]:text-slate-800">
            {intro}
          </div>
        )}

        {/* 다른 섹션에 이어지는 다음 행동이 있으면 먼저 보여준다 (예: 실업급여 계산 → 신청 체크리스트) */}
        <CrossLinks />

        <RelatedCalcs />

        <CalcFaq items={faq} />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ── 공통 UI 컴포넌트 ── */

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <p className="font-bold text-slate-800 text-sm">{title}</p>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
      {children}
    </label>
  );
}

export const inputCls =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

export const selectCls =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

export function PrimaryBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-3.5 font-bold text-sm transition-colors"
    >
      {children}
    </button>
  );
}

export function TabBar<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; sub?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors leading-tight ${
            value === opt.value
              ? 'bg-blue-600 text-white'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          {opt.label}
          {opt.sub && <span className={`block text-xs font-normal ${value === opt.value ? 'text-blue-200' : 'text-slate-400'}`}>{opt.sub}</span>}
        </button>
      ))}
    </div>
  );
}

export function SummaryGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{children}</div>;
}

export function SummaryCard({
  label, value, sub, variant = 'default',
}: {
  label: string; value: string; sub?: string;
  variant?: 'default' | 'primary' | 'green' | 'red';
}) {
  const styles = {
    default: 'bg-white border-slate-200 text-slate-800',
    primary: 'bg-blue-600 border-blue-600 text-white',
    green: 'bg-white border-slate-200 text-emerald-600',
    red: 'bg-white border-slate-200 text-red-500',
  };
  const labelStyles = {
    default: 'text-slate-400',
    primary: 'text-blue-200',
    green: 'text-slate-400',
    red: 'text-slate-400',
  };
  return (
    <div className={`rounded-2xl border p-4 ${styles[variant]}`}>
      <p className={`text-xs mb-1 ${labelStyles[variant]}`}>{label}</p>
      <p className="font-black text-base leading-tight">{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${labelStyles[variant]}`}>{sub}</p>}
    </div>
  );
}

export function RatioBar({ a, b, labelA, labelB }: { a: number; b: number; labelA: string; labelB: string }) {
  const total = a + b;
  const pctA = total > 0 ? (a / total) * 100 : 50;
  return (
    <div>
      <div className="flex h-6 rounded-lg overflow-hidden text-xs font-bold">
        <div className="bg-blue-600 flex items-center justify-center text-white transition-all" style={{ width: `${pctA}%` }}>
          {pctA > 20 && `${pctA.toFixed(0)}%`}
        </div>
        <div className="bg-rose-400 flex items-center justify-center text-white flex-1">
          {(100 - pctA) > 20 && `${(100 - pctA).toFixed(0)}%`}
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1.5">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />{labelA}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />{labelB}</span>
      </div>
    </div>
  );
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-0">
      {children}
    </div>
  );
}

export function ShowMoreBtn({ total, showing, onClick }: { total: number; showing: number; onClick: () => void }) {
  if (total <= showing) return null;
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-2.5 text-sm text-blue-600 font-semibold border border-blue-200 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
    >
      전체 {total}개 보기 (현재 {showing}개 표시)
    </button>
  );
}
