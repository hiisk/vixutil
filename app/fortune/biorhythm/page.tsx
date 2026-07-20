'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import {
  CYCLES, PHASE_LABEL, getBiorhythm, getChartSeries, overallComment,
  type BiorhythmResult, type ChartPoint,
} from '@/lib/biorhythm';

const CYCLE_COLOR: Record<string, string> = {
  physical: '#ef4444',
  emotional: '#22c55e',
  intellectual: '#3b82f6',
};

const PHASE_STYLE: Record<string, string> = {
  high: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
  low: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  critical: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
};

const W = 640;
const H = 200;
const PAD = 8;

/**
 * 세 리듬 곡선. 값(-1~1)을 세로로, 오늘 기준 ±15일을 가로로 그린다.
 * 좌표 계산이 SVG viewBox 안에서 끝나므로 반응형에서 다시 계산할 필요가 없다.
 */
function Chart({ points }: { points: ChartPoint[] }) {
  const n = points.length;
  const x = (i: number) => PAD + (i / (n - 1)) * (W - PAD * 2);
  const y = (v: number) => H / 2 - v * (H / 2 - PAD);

  const path = (key: 'physical' | 'emotional' | 'intellectual') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');

  const todayX = x(points.findIndex(p => p.offset === 0));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="바이오리듬 그래프">
      {/* 0선 — 위험일이 지나는 기준선 */}
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="currentColor" strokeWidth={1} className="text-slate-200 dark:text-slate-700" />
      {/* 오늘 */}
      <line x1={todayX} y1={PAD} x2={todayX} y2={H - PAD} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-slate-400 dark:text-slate-500" />
      {CYCLES.map(c => (
        <path key={c.key} d={path(c.key)} fill="none" stroke={CYCLE_COLOR[c.key]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {CYCLES.map(c => {
        const p = points.find(pt => pt.offset === 0)!;
        return <circle key={c.key} cx={todayX} cy={y(p[c.key])} r={4} fill={CYCLE_COLOR[c.key]} stroke="white" strokeWidth={1.5} />;
      })}
    </svg>
  );
}

function Result({ result, points }: { result: BiorhythmResult; points: ChartPoint[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">오늘의 리듬</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">태어난 지 {result.days.toLocaleString()}일째</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{overallComment(result)}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
        <Chart points={points} />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
          {CYCLES.map(c => (
            <span key={c.key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: CYCLE_COLOR[c.key] }} />
              {c.label}
            </span>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">점선이 오늘 · 가운데 가로선을 지나는 날이 위험일</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {result.cycles.map(state => {
          const meta = CYCLES.find(c => c.key === state.key)!;
          return (
            <div key={state.key} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{meta.emoji}</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{meta.label}</span>
                <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full border ${PHASE_STYLE[state.phase]}`}>
                  {PHASE_LABEL[state.phase]}
                </span>
              </div>
              <p className="text-3xl font-black leading-none" style={{ color: CYCLE_COLOR[state.key] }}>
                {state.percent > 0 ? '+' : ''}{state.percent}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{meta.desc} · {meta.period}일 주기</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {state.daysToCritical === 0 ? '오늘이 위험일입니다' : `다음 위험일까지 ${state.daysToCritical}일`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BiorhythmPage() {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const points = useMemo(() => (birth ? getChartSeries(birth) : []), [birth]);
  const result = useMemo(() => (birth ? getBiorhythm(birth) : null), [birth]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);

    if (!y || !m || !d) { setError('생년월일을 모두 입력해주세요.'); return; }
    if (m < 1 || m > 12) { setError('월은 1~12 사이로 입력해주세요.'); return; }
    if (d < 1 || d > 31) { setError('일은 1~31 사이로 입력해주세요.'); return; }

    const date = new Date(y, m - 1, d);
    // 2월 30일처럼 없는 날짜는 Date가 조용히 다음 달로 넘겨버린다. 되돌려 확인한다.
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError('존재하지 않는 날짜입니다.');
      return;
    }
    if (date > new Date()) { setError('생년월일이 오늘보다 미래입니다.'); return; }

    setError('');
    setBirth(date);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">바이오리듬</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">📈 바이오리듬 계산기</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">생년월일로 신체·감성·지성 리듬 보기</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder="예) 1995" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder="월" min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder="일" min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black py-3 transition-colors">
            리듬 보기
          </button>
        </form>

        {result && points.length > 0 ? (
          <Result result={result} points={points} />
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">생년월일을 입력하면 오늘의 리듬을 볼 수 있습니다</p>
          </div>
        )}

        {/*
          바이오리듬은 계산이 결정론적이라 "매일 다른 문장을 뽑는" 다른 운세와 성격이
          다르다. 그래서 오히려 과학처럼 보이기 쉬운데, 주기값 자체에 근거가 없다는
          점은 분명히 적어둔다. 계산이 정확한 것과 예측이 맞는 것은 다른 얘기다.
        */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">바이오리듬은 과학인가요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            아닙니다. 신체 23일·감성 28일·지성 33일이라는 주기는 20세기 초에 제안된 뒤 그대로 굳어진 값이고,
            이 주기가 실제 컨디션이나 사고를 예측한다는 근거는 확인되지 않았습니다.
            다만 계산 자체는 <strong className="text-slate-800 dark:text-slate-100">완전히 결정론적</strong>이라,
            같은 생년월일이면 어디서 계산해도 같은 그래프가 나옵니다.
            숫자가 정확하게 나온다는 것과 그 숫자가 무언가를 맞힌다는 것은 다른 이야기입니다.
            오늘 컨디션이 어떤지는 그래프보다 몸이 더 정확하게 알려줍니다.
          </p>
        </div>

        {result && <ReferralCards placement="result" />}

        <Faq items={SECTION_FAQ['fortune/biorhythm']} />
      </div>
      <SiteFooter />
    </div>
  );
}
