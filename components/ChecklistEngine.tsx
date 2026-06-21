'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Checklist } from '@/lib/types';

export default function ChecklistEngine({ checklist }: { checklist: Checklist }) {
  const STORAGE_KEY = `checklist-${checklist.slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const allItems = checklist.sections.flatMap(s => s.items);
  const total = allItems.length;
  const done = allItems.filter(i => checked.has(i.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isAllDone = done === total;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(new Set(JSON.parse(saved)));
    } catch {}
  }, [STORAGE_KEY]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  async function handleShare() {
    const url = `https://vixutil.com/checklist/${checklist.slug}`;
    const title = checklist.title;
    const text = done > 0
      ? `${checklist.title} — ${done}/${total}개 완료 중`
      : checklist.desc;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('링크가 복사됐어요!');
    } catch {
      showToast('복사에 실패했어요');
    }
  }

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function toggleSection(ids: string[]) {
    const allChecked = ids.every(id => checked.has(id));
    setChecked(prev => {
      const next = new Set(prev);
      if (allChecked) ids.forEach(id => next.delete(id));
      else ids.forEach(id => next.add(id));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function reset() {
    setChecked(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  if (!mounted) return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-500" />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 진행바 */}
      <div className="h-1.5 bg-sky-100">
        <div
          className={`h-full transition-all duration-500 ${isAllDone ? 'bg-emerald-400' : 'bg-gradient-to-r from-sky-400 to-cyan-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/checklist" className="text-sm text-slate-400 hover:text-sky-600 flex items-center gap-1.5 font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 체크리스트
          </Link>
          <span className="flex-1" />
          <span className={`text-sm font-bold tabular-nums ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>
            {done} / {total}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 border border-slate-200 hover:border-sky-300 rounded-xl px-3 py-1.5 transition-all"
            aria-label="체크리스트 공유"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            공유
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 w-full flex-1">
        {/* 타이틀 */}
        <div className="mb-6">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">{checklist.category}</span>
          <h1 className="text-2xl font-black text-slate-900 mt-3 mb-1">
            {checklist.icon} {checklist.title}
          </h1>
          <p className="text-sm text-slate-500 mb-4">{checklist.desc}</p>

          {/* 진행률 바 */}
          <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isAllDone ? 'bg-emerald-500' : 'bg-sky-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>{done}개 완료</span>
            <span className={`font-bold ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>{pct}%</span>
          </div>
        </div>

        {/* 완료 메시지 */}
        {isAllDone && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center mb-6">
            <p className="text-3xl mb-2">🎉</p>
            <p className="font-black text-emerald-700 text-lg">모든 항목 완료!</p>
            <p className="text-sm text-emerald-600 mt-1">수고하셨습니다. 모든 준비를 마쳤어요.</p>
            <button
              onClick={handleShare}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-5 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              완료 결과 공유하기
            </button>
          </div>
        )}

        {/* 섹션별 체크리스트 */}
        <div className="flex flex-col gap-5">
          {checklist.sections.map(section => {
            const sectionIds = section.items.map(i => i.id);
            const sectionDone = sectionIds.filter(id => checked.has(id)).length;
            const sectionAllDone = sectionDone === sectionIds.length;

            return (
              <div key={section.title} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionIds)}
                  className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-bold text-slate-800 text-sm">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      sectionAllDone ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-sky-600'
                    }`}>
                      {sectionDone}/{sectionIds.length}
                    </span>
                    <span className="text-xs text-slate-400">
                      {sectionAllDone ? '전체 선택 해제' : '전체 선택'}
                    </span>
                  </div>
                </button>

                <div className="divide-y divide-slate-50">
                  {section.items.map(item => {
                    const isChecked = checked.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                          isChecked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 hover:border-sky-400'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-relaxed transition-colors ${
                            isChecked ? 'line-through text-slate-400' : 'text-slate-700'
                          }`}>
                            {item.text}
                          </p>
                          {item.note && (
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.note}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 공유 & 초기화 */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-sky-600 border border-sky-200 hover:bg-sky-50 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            체크리스트 공유
          </button>
          {done > 0 && (
            <button
              onClick={reset}
              className="py-3 px-4 text-sm text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  );
}
