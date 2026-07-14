import Link from 'next/link';
import type { Metadata } from 'next';
import GlobalSearch from '@/components/GlobalSearch';
import SiteFooter from '@/components/SiteFooter';
import { SEARCH_INDEX } from '@/lib/search-index';

export const metadata: Metadata = {
  title: '통합 검색',
  description: '계산기·심리테스트·퀴즈·생성기·체크리스트를 한 번에 검색합니다. 어느 섹션에 있는지 몰라도 찾을 수 있습니다.',
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="font-black text-indigo-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700">통합 검색</span>
          <span className="ml-auto text-xs text-slate-400">{SEARCH_INDEX.length}개</span>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <GlobalSearch items={SEARCH_INDEX} />
      </div>

      <SiteFooter />
    </div>
  );
}
