import Link from 'next/link';
import type { Metadata } from 'next';
import { TESTS } from '@/lib/test-data';

export const metadata: Metadata = {
  title: '심리 테스트',
  description: 'MBTI, 연애 성향, 번아웃 등 다양한 심리 테스트 모음',
};

const CATEGORIES = ['성격', '연애·결혼', '직장·커리어', '금융·재테크', '건강·생활', '자기계발', '취미·라이프스타일'];

export default function TestIndexPage() {
  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: TESTS.filter(t => t.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = TESTS.filter(t => !CATEGORIES.includes(t.category));

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
        <p className="text-slate-500 text-sm mb-10">
          나를 알아가는 다양한 테스트 — <strong className="text-slate-700">{TESTS.length}개</strong>
        </p>

        <div className="flex flex-col gap-12">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-violet-500 bg-violet-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(t => (
                  <Link key={t.slug} href={`/test/${t.slug}`}
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-sm transition-all">
                    <div className="text-2xl mb-2">{t.icon}</div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-violet-700 transition-colors mb-1">{t.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-slate-700 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(t => (
                  <Link key={t.slug} href={`/test/${t.slug}`}
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-sm transition-all">
                    <div className="text-2xl mb-2">{t.icon}</div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-violet-700 mb-1">{t.title}</h3>
                    <p className="text-xs text-slate-400">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
