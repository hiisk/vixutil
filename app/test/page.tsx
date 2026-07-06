import Link from 'next/link';
import type { Metadata } from 'next';
import { TESTS } from '@/lib/test-data';
import TestSearch from '@/components/TestSearch';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: '심리 테스트',
  description: 'MBTI, 연애 성향, 번아웃 등 다양한 심리 테스트 모음',
};

export default function TestIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-violet-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700">심리 테스트</span>
          <span className="ml-auto text-xs text-slate-400">{TESTS.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-2">Personality Test</p>
        <h1 className="text-3xl font-black text-slate-900 mb-2">심리 테스트</h1>
        <p className="text-slate-500 text-sm mb-8">
          나를 알아가는 다양한 테스트 — <strong className="text-slate-700">{TESTS.length}개</strong>
        </p>

        <TestSearch tests={TESTS} />
      </div>
      <SiteFooter />
    </div>
  );
}
