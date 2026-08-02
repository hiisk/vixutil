import Link from 'next/link';
import type { Metadata } from 'next';
import { hubAlternates } from '@/lib/locale-alternates';
import { CHECKLISTS } from '@/lib/checklist-data';
import ChecklistSearch from '@/components/ChecklistSearch';
import { toChecklistCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';

export const metadata: Metadata = {
  title: '체크리스트',
  description: '이사·취업·여행·건강 등 상황별 체크리스트 모음 — 진행 상황을 저장하며 빠짐없이 준비하세요',
  alternates: {
    canonical: '/checklist',
    // 번역 아홉 언어가 이 페이지를 대안으로 선언하므로 이쪽도 돌려줘야 한다 —
    // 한쪽만 걸린 hreflang은 구글이 짝으로 인정하지 않는다.
    languages: hubAlternates('checklist'),
  },
};

export default function ChecklistIndexPage() {
  const totalItems = CHECKLISTS.reduce(
    (s, c) => s + c.sections.reduce((ss, sec) => ss + sec.items.length, 0), 0
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '체크리스트', path: '/checklist' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '체크리스트',
          '/checklist',
          CHECKLISTS.map(c => ({ name: c.title, path: `/checklist/${c.slug}` })),
        )}
      />
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-sky-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">체크리스트</span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 dark:text-slate-500">{CHECKLISTS.length}개 · {totalItems}항목</span>
            <LangPicker current="ko" route="/checklist" />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">Checklist</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">체크리스트</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          중요한 순간, 빠짐없이 준비하도록 — <strong className="text-slate-700 dark:text-slate-200">{CHECKLISTS.length}개</strong> 상황별 체크리스트
        </p>

        <ChecklistSearch checklists={CHECKLISTS.map(toChecklistCard)} />

        <Faq items={SECTION_FAQ.checklist} />
      </div>
      <SiteFooter />
    </div>
  );
}
