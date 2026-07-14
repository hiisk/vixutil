'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { MBTI_TYPES } from '@/lib/fortune-data';
import FortuneDisplay from '@/components/FortuneDisplay';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

const GROUPS = [
  { label: '분석가형', color: 'bg-violet-50 text-violet-700 border-violet-200', types: ['INTJ','INTP','ENTJ','ENTP'] },
  { label: '외교관형', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', types: ['INFJ','INFP','ENFJ','ENFP'] },
  { label: '수호자형', color: 'bg-sky-50 text-sky-700 border-sky-200', types: ['ISTJ','ISFJ','ESTJ','ESFJ'] },
  { label: '탐험가형', color: 'bg-amber-50 text-amber-700 border-amber-200', types: ['ISTP','ISFP','ESTP','ESFP'] },
];

export default function MbtiPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // 공유 링크(?id=)로 들어온 경우 선택 상태를 복원한다. URL은 프리렌더 시점에
    // 알 수 없으므로 마운트 후에 읽을 수밖에 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id && MBTI_TYPES.some(t => t.id === id)) setSelected(id);
  }, []);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const type = MBTI_TYPES.find(t => t.id === selected);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-1 bg-gradient-to-r from-sky-500 to-blue-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {type ? `${type.id} 운세` : 'MBTI 운세'}
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🧠 MBTI 오늘의 운세</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">내 MBTI 유형을 선택하세요</p>
        </div>

        <div className="space-y-3 mb-6">
          {GROUPS.map(g => (
            <div key={g.label}>
              <p className={`text-xs font-bold mb-2 px-2.5 py-1 rounded-full border inline-block ${g.color}`}>{g.label}</p>
              <div className="grid grid-cols-4 gap-2">
                {g.types.map(id => {
                  const t = MBTI_TYPES.find(x => x.id === id)!;
                  return (
                    <button
                      key={id}
                      onClick={() => handleSelect(id)}
                      className={`rounded-xl p-2.5 text-center transition-all border ${
                        selected === id
                          ? 'bg-sky-600 border-sky-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-sky-300 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="text-lg mb-0.5">{t.emoji}</div>
                      <p className={`text-xs font-black ${selected === id ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{id}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {type ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{type.nickname}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>{type.trait}</span>
            </div>
            <FortuneDisplay
              subjectId={`mbti-${type.id}`}
              subjectName={type.name}
              subjectEmoji={type.emoji}
              badge={type.nickname}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">MBTI 유형을 선택하면 오늘의 운세를 볼 수 있습니다</p>
          </div>
        )}

        <Faq items={SECTION_FAQ['fortune/mbti']} />
      </div>
      <SiteFooter />
    </div>
  );
}
