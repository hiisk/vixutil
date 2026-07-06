'use client';
import { usePathname } from 'next/navigation';
import { CALC_FAQ, type FaqItem } from '@/lib/calc-faq';
import JsonLd, { faqJsonLd } from './JsonLd';

/**
 * 계산기 FAQ — 표시 UI + FAQPage 구조화 데이터.
 * items를 넘기면 그대로 사용하고, 없으면 현재 경로(slug)로 CALC_FAQ에서 자동 조회한다.
 * 따라서 lib/calc-faq.ts 에 slug만 추가하면 해당 페이지에 FAQ가 자동 노출된다.
 */
export default function CalcFaq({ items }: { items?: FaqItem[] }) {
  const pathname = usePathname();
  const slug = pathname?.split('/').filter(Boolean).slice(1).join('/') ?? '';
  const faq = items ?? CALC_FAQ[slug];
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-8" aria-label="자주 묻는 질문">
      <JsonLd data={faqJsonLd(faq)} />
      <h2 className="text-base font-black text-slate-800 mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-2.5">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group bg-white border border-slate-200 rounded-xl px-4 py-3 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-slate-700 list-none">
              <span className="flex-1 pr-2">Q. {item.q}</span>
              <svg className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
