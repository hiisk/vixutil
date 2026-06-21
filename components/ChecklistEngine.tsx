'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Checklist } from '@/lib/types';

export default function ChecklistEngine({ checklist }: { checklist: Checklist }) {
  const STORAGE_KEY = `checklist-${checklist.slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

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
      <div className="h-1.5 bg-sky-100">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-cyan-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <Link href="/checklist" className="text-sm text-slate-400 hover:text-sky-600 flex items-center gap-1.5 font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 체크리스트
          </Link>
          <span className="text-sm font-bold text-sky-600 tabular-nums">
            {done} / {total}
          </span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 w-full flex-1">
        {/* 타이틀 + 진행률 */}
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
                {/* 섹션 헤더 */}
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
                      sectionAllDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-50 text-sky-600'
                    }`}>
                      {sectionDone}/{sectionIds.length}
                    </span>
                    <span className="text-xs text-slate-400">
                      {sectionAllDone ? '전체 선택 해제' : '전체 선택'}
                    </span>
                  </div>
                </button>

                {/* 아이템 목록 */}
                <div className="divide-y divide-slate-50">
                  {section.items.map(item => {
                    const isChecked = checked.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
                      >
                        {/* 체크박스 */}
                        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-sky-500 border-sky-500'
                            : 'border-slate-300 hover:border-sky-400'
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

        {/* 초기화 버튼 */}
        {done > 0 && (
          <button
            onClick={reset}
            className="mt-6 w-full py-3 text-sm text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition-colors"
          >
            진행 상황 초기화
          </button>
        )}
      </div>
    </div>
  );
}
