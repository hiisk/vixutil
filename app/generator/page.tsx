import Link from 'next/link';
import type { Metadata } from 'next';
import { GENERATORS } from '@/lib/generator-data';

export const metadata: Metadata = {
  title: '생성기',
  description: '닉네임, 비밀번호, 명언, 메뉴 등 100가지 랜덤 생성기 모음',
};

const CATEGORIES = ['이름·브랜드', '추천', '문구·아이디어', '랜덤', '계획'];

function GenCard({ g }: { g: typeof GENERATORS[0] }) {
  return (
    <Link href={`/generator/${g.slug}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
        <img
          src={`/generator/${g.slug}/opengraph-image`}
          alt={g.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors mb-1">{g.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{g.desc}</p>
      </div>
    </Link>
  );
}

export default function GeneratorIndexPage() {
  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: GENERATORS.filter(g => g.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = GENERATORS.filter(g => !CATEGORIES.includes(g.category));

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-emerald-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700">생성기</span>
          <span className="ml-auto text-xs text-slate-400">{GENERATORS.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">Generator</p>
        <h1 className="text-3xl font-black text-slate-900 mb-2">생성기</h1>
        <p className="text-slate-500 text-sm mb-10">
          아이디어가 필요할 때, 결정을 못 내릴 때 — <strong className="text-slate-700">{GENERATORS.length}개</strong>
        </p>

        <div className="flex flex-col gap-12">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(g => <GenCard key={g.slug} g={g} />)}
              </div>
            </section>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-slate-700 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(g => <GenCard key={g.slug} g={g} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
