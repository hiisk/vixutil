'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import ShareButton from '@/components/ShareButton';
import PageGlow from '@/components/PageGlow';
import { SECTION_FAQ } from '@/lib/section-faq';
import { getLuckyLotto, ballColor, ymdOf, type LuckyLotto } from '@/lib/lucky-lotto';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

function Ball({ n, bonus }: { n: number; bonus?: boolean }) {
  return (
    <span
      className="relative inline-flex items-center justify-center w-11 h-11 rounded-full text-white font-black text-lg shadow"
      style={{ background: ballColor(n) }}
    >
      {n}
      {bonus && <span className="absolute -top-1.5 -right-1.5 text-[9px] font-black bg-white text-slate-700 rounded-full px-1 border border-slate-200">B</span>}
    </span>
  );
}

export default function LuckyLottoPage() {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [result, setResult] = useState<LuckyLotto | null>(null);
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
    setResult(getLuckyLotto(y, m, d, ymdOf(new Date())));
    setTimeout(() => document.getElementById('lotto-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-emerald-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">행운의 로또 번호</span>
          {/* 한국어만 주소가 다르다 — 한국 로또 전용으로 만들어 lucky-lotto다 */}
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/lucky-numbers"
              overrides={{ ko: '/fortune/lucky-lotto' }} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🍀" className="h-6 w-6" /></span>
          <h1 className="page-h1">행운의 로또 번호</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">생년월일로 보는 오늘의 행운 번호 — 매일 자정 새로 바뀝니다</p>
        </div>

        <form onSubmit={submit} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder="예) 1995" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="fld focus:border-emerald-400" />
            <input type="number" inputMode="numeric" placeholder="월" min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="fld focus:border-emerald-400" />
            <input type="number" inputMode="numeric" placeholder="일" min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="fld focus:border-emerald-400" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-sec text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-sm shadow-emerald-200 dark:shadow-none">
            행운 번호 뽑기 🍀
          </button>
        </form>

        {result && (
          <div id="lotto-result">
            <div className="ll-pop rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 mb-4">
              <div className="text-center text-xs font-black text-emerald-600 mb-4">오늘의 행운 번호 🍀</div>
              <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                {result.numbers.map(n => <Ball key={n} n={n} />)}
                <span className="text-2xl font-black text-slate-300 dark:text-slate-600 mx-1">+</span>
                <Ball n={result.bonus} bonus />
              </div>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">6개 번호 + 보너스(B)</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 mb-1">판매점 방향</div>
                <ToolIcon emoji="🧭" className="w-7 h-7 mb-0.5 text-slate-800 dark:text-slate-100" />
                <div className="text-xs font-black text-slate-700 dark:text-slate-200">{result.direction}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 mb-1">행운의 요일</div>
                <ToolIcon emoji="📅" className="w-7 h-7 mb-0.5 text-slate-800 dark:text-slate-100" />
                <div className="text-xs font-black text-slate-700 dark:text-slate-200">{result.weekday}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 mb-1">추천 시간대</div>
                <ToolIcon emoji="⏰" className="w-7 h-7 mb-0.5 text-slate-800 dark:text-slate-100" />
                <div className="text-[11px] font-black text-slate-700 dark:text-slate-200 leading-tight">{result.timeSlot}</div>
              </div>
            </div>

            <div className="mb-6">
              <ShareButton
                title={`오늘의 행운 로또 번호: ${result.numbers.join(', ')} + ${result.bonus}`}
                description="생년월일로 보는 오늘의 행운 번호 — 당신의 번호는?"
                type="fortune"
              />
            </div>

            <ReferralCards placement="result" />
          </div>
        )}

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 mt-6">
          <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
            ⚠️ 이 번호는 재미와 참고를 위한 것으로, <strong>당첨을 보장하지 않습니다.</strong> 복권은 확률 게임이며 지나친 구매는 삼가세요. 로또 구매는 만 19세 이상만 가능합니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/lucky-lotto']} />
      </div>
      <SiteFooter referral={false} />

      <style jsx>{`
        @keyframes llPop { 0% { opacity: 0; transform: scale(0.92) translateY(8px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        .ll-pop { animation: llPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
