'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ANIMALS } from '@/lib/fortune-data';
import FortuneDisplay from '@/components/FortuneDisplay';

export default function AnimalPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && ANIMALS.some(a => a.id === id)) setSelected(id);
  }, []);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const animal = ANIMALS.find(a => a.id === selected);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-rose-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 flex-1 truncate">
            {animal ? animal.name : '사주·띠 운세'}
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900">🐉 사주·띠 운세</h1>
          <p className="text-sm text-slate-500 mt-1">내 띠를 선택하세요</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {ANIMALS.map(a => {
            const recentYear = [...a.years].filter(y => y <= currentYear).at(-1);
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(a.id)}
                className={`rounded-2xl p-3 text-center transition-all border ${
                  selected === a.id
                    ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                    : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
                }`}
              >
                <div className="text-2xl mb-1">{a.emoji}</div>
                <p className={`text-xs font-bold leading-tight ${selected === a.id ? 'text-white' : 'text-slate-700'}`}>{a.name}</p>
                <p className={`text-[10px] mt-0.5 ${selected === a.id ? 'text-rose-200' : 'text-slate-400'}`}>{recentYear}년생~</p>
              </button>
            );
          })}
        </div>

        {animal ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2 flex-wrap">
              <span className="font-semibold text-slate-700">주요 특성: {animal.trait}</span>
              <span className="text-slate-300">·</span>
              <span>해당 연도: {animal.years.filter(y => y <= currentYear).slice(-4).join(', ')}</span>
            </div>
            <FortuneDisplay
              subjectId={`animal-${animal.id}`}
              subjectName={animal.name}
              subjectEmoji={animal.emoji}
              badge={animal.trait}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">내 띠를 선택하면 오늘의 운세를 볼 수 있습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
