import Link from 'next/link';
import type { Metadata } from 'next';
import { QUIZZES } from '@/lib/quiz-data';

export const metadata: Metadata = {
  title: '지식 퀴즈',
  description: '한국사, IT, K-POP, 건강 상식 등 100가지 퀴즈 모음',
};

const CATEGORIES = ['상식', '역사', '세계지리', '언어', '기술·IT', '스포츠', '과학', '엔터테인먼트', '생활·건강', '환경·경제'];

function QuizCard({ q }: { q: typeof QUIZZES[0] }) {
  return (
    <Link href={`/quiz/${q.slug}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        <img
          src={`/quiz/${q.slug}/opengraph-image`}
          alt={q.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-amber-700 transition-colors mb-1">{q.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{q.desc}</p>
      </div>
    </Link>
  );
}

export default function QuizIndexPage() {
  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: QUIZZES.filter(q => q.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = QUIZZES.filter(q => !CATEGORIES.includes(q.category));

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-amber-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700">지식 퀴즈</span>
          <span className="ml-auto text-xs text-slate-400">{QUIZZES.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Knowledge Quiz</p>
        <h1 className="text-3xl font-black text-slate-900 mb-2">지식 퀴즈</h1>
        <p className="text-slate-500 text-sm mb-10">
          상식부터 전문 지식까지 — <strong className="text-slate-700">{QUIZZES.length}개</strong>
        </p>

        <div className="flex flex-col gap-12">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(q => <QuizCard key={q.slug} q={q} />)}
              </div>
            </section>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-slate-700 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(q => <QuizCard key={q.slug} q={q} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
