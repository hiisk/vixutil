'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { ZODIAC_SIGNS } from '@/lib/fortune-data';
import FortuneDisplay from '@/components/FortuneDisplay';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

export default function ZodiacPage() {
  const [selected, setSelected] = useState<string | null>(null);

  // URL 파라미터에서 초기값 읽기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // 공유 링크(?id=)로 들어온 경우 선택 상태를 복원한다. URL은 프리렌더 시점에
    // 알 수 없으므로 마운트 후에 읽을 수밖에 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id && ZODIAC_SIGNS.some(s => s.id === id)) setSelected(id);
  }, []);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const sign = ZODIAC_SIGNS.find(s => s.id === selected);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 to-purple-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {sign ? sign.name : '별자리 운세'}
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">⭐ 별자리 운세</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">내 별자리를 선택하세요</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {ZODIAC_SIGNS.map(s => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className={`rounded-2xl p-3 text-center transition-all border ${
                selected === s.id
                  ? 'bg-violet-600 border-violet-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <p className={`text-xs font-bold leading-tight ${selected === s.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{s.name}</p>
              <p className={`text-[10px] mt-0.5 ${selected === s.id ? 'text-violet-200' : 'text-slate-400 dark:text-slate-500'}`}>{s.period}</p>
            </button>
          ))}
        </div>

        {sign ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span>{sign.element}의 기운</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>수호행성 {sign.ruling}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>{sign.period}</span>
            </div>
            <FortuneDisplay
              subjectId={`zodiac-${sign.id}`}
              subjectName={sign.name}
              subjectEmoji={sign.emoji}
              badge={sign.period}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">별자리를 선택하면 오늘의 운세를 볼 수 있습니다</p>
          </div>
        )}

        <Faq items={SECTION_FAQ['fortune/zodiac']} />
      </div>
      <SiteFooter />
    </div>
  );
}
