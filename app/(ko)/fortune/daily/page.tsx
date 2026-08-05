'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import FortuneDisplay from '@/components/FortuneDisplay';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/** 생년월일로 오늘의 종합운세를 본다. FortuneDisplay가 날짜+생일 시드로 운세를 뽑는다. */
export default function DailyFortunePage() {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<{ y: number; m: number; d: number } | null>(null);
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);
    if (!y || !m || !d) { setError('생년월일을 모두 입력해주세요.'); return; }
    if (m < 1 || m > 12) { setError('월은 1~12 사이로 입력해주세요.'); return; }
    if (d < 1 || d > 31) { setError('일은 1~31 사이로 입력해주세요.'); return; }
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError('존재하지 않는 날짜입니다.'); return;
    }
    if (date > new Date()) { setError('생년월일이 오늘보다 미래입니다.'); return; }
    setError('');
    setBirth({ y, m, d });
    setTimeout(() => document.getElementById('daily-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">오늘의 종합운세</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/daily" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🔮 오늘의 종합운세</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">생년월일로 보는 오늘의 총운·연애·금전·직업·건강운</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder="예) 1995" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder="월" min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder="일" min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-violet-200">
            오늘의 운세 보기
          </button>
        </form>

        {birth ? (
          <div id="daily-result">
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{birth.y}년 {birth.m}월 {birth.d}일생</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>오늘 기준 운세</span>
            </div>
            <FortuneDisplay
              subjectId={`daily-${birth.y}-${birth.m}-${birth.d}`}
              subjectName={`${birth.y}년 ${birth.m}월 ${birth.d}일생`}
              subjectEmoji="🔮"
              badge="오늘의 종합운세"
            />
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">생년월일을 입력하면 오늘의 종합운세를 볼 수 있어요</p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">운세는 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            생년월일과 오늘 날짜를 섞은 값으로 준비된 운세 문장 중 하나를 고르는 방식이에요.
            그래서 <strong className="text-slate-800 dark:text-slate-100">같은 날, 같은 생일이면 몇 번을 새로고침해도 같은 결과</strong>가
            나오고, 날짜가 바뀌면 새 운세가 나옵니다. 입력한 생년월일은 브라우저에서 계산에만 쓰이고
            서버로 전송되지 않아요. 운세는 <strong className="text-slate-800 dark:text-slate-100">오락·자기 성찰</strong>을 위한
            것이니, 중요한 결정은 충분한 정보와 스스로의 판단으로 내리세요.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/daily']} />
      </div>
      <SiteFooter />
    </div>
  );
}
