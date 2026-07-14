import Link from 'next/link';
import type { Metadata } from 'next';
import { GENERATORS } from '@/lib/generator-data';
import GeneratorSearch from '@/components/GeneratorSearch';
import { toCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

export const metadata: Metadata = {
  title: '생성기',
  description: '닉네임, 비밀번호, 명언, 메뉴 등 100가지 랜덤 생성기 모음',
};

export default function GeneratorIndexPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-emerald-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">생성기</span>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{GENERATORS.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">Generator</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">생성기</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          아이디어가 필요할 때, 결정을 못 내릴 때 — <strong className="text-slate-700 dark:text-slate-200">{GENERATORS.length}개</strong>
        </p>

        <GeneratorSearch generators={GENERATORS.map(toCard)} />

        <Faq items={SECTION_FAQ.generator} />
      </div>
      <SiteFooter />
    </div>
  );
}
