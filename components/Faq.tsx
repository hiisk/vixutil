import type { FaqItem } from '@/lib/calc-faq';
import JsonLd, { faqJsonLd } from './JsonLd';

/**
 * 범용 FAQ 섹션 — 표시 UI + FAQPage 구조화 데이터.
 * 계산기는 경로 기반 자동 조회를 쓰는 CalcFaq를, 그 외 페이지는 이 컴포넌트를 직접 쓴다.
 * tone='dark'는 크립토처럼 어두운 배경의 페이지용이다.
 */
const TONE = {
  light: {
    heading: 'text-slate-800',
    card: 'bg-white border-slate-200',
    question: 'text-slate-700',
    chevron: 'text-slate-400',
    answer: 'text-slate-600',
  },
  dark: {
    heading: 'text-slate-100',
    card: 'bg-slate-900/50 border-slate-800',
    question: 'text-slate-200',
    chevron: 'text-slate-500',
    answer: 'text-slate-400',
  },
} as const;

export default function Faq({
  items,
  tone = 'light',
  className = 'mt-8',
}: {
  items?: FaqItem[];
  tone?: keyof typeof TONE;
  className?: string;
}) {
  if (!items || items.length === 0) return null;
  const c = TONE[tone];

  return (
    <section className={className} aria-label="FAQ">
      <JsonLd data={faqJsonLd(items)} />
      <h2 className={`text-base font-black mb-3 ${c.heading}`}>
        {tone === 'dark' ? 'FAQ' : '자주 묻는 질문'}
      </h2>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <details
            key={i}
            className={`group border rounded-xl px-4 py-3 [&_summary::-webkit-details-marker]:hidden ${c.card}`}
          >
            <summary className={`flex items-center justify-between cursor-pointer text-sm font-bold list-none ${c.question}`}>
              <span className="flex-1 pr-2">Q. {item.q}</span>
              <svg className={`w-4 h-4 shrink-0 transition-transform group-open:rotate-180 ${c.chevron}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <p className={`mt-2.5 text-sm leading-relaxed ${c.answer}`}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
