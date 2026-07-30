'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import {
  getBiorhythm, getChartSeries,
  type BiorhythmResult, type ChartPoint, type Phase,
} from '@/lib/biorhythm';
import { CYCLES_EN, PHASE_LABEL_EN, BIORHYTHM_COMMENT_EN } from '@/lib/fortune-en';
import { t, type Lang } from '@/lib/fortune-intl';

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

type IntlLang = Exclude<Lang, 'ko'>;

const COPY = {
  en: {
    title: 'Biorhythm Calculator',
    lead: 'See your physical, emotional and intellectual rhythms from your date of birth',
    birthLabel: 'Date of birth',
    yearPh: 'e.g. 1995', monthPh: 'Month', dayPh: 'Day',
    submit: 'Show my rhythms',
    empty: 'Enter your date of birth to see today’s rhythms',
    todayRhythm: 'Today’s rhythms',
    daysOld: (n: string) => `${n} days since birth`,
    chartNote: 'Dashed line is today · a critical day is where a curve crosses the centre line',
    cycleOf: (d: string, p: number) => `${d} · ${p}-day cycle`,
    criticalToday: 'Today is a critical day',
    nextCritical: (n: number) => `${n} days to the next critical day`,
    chartAlt: 'Biorhythm chart',
    scienceQ: 'Is biorhythm science?',
    scienceA: 'No. The 23-day physical, 28-day emotional and 33-day intellectual cycles were proposed in the early twentieth century and have simply stuck; there is no confirmed evidence that they predict how you actually feel or think. The calculation itself is fully deterministic — the same birth date produces the same chart anywhere. A number being precise and a number being right are two different things. Your body will tell you how today is going more accurately than this graph will.',
    errAll: 'Please fill in the full date of birth.',
    errMonth: 'Month must be between 1 and 12.',
    errDay: 'Day must be between 1 and 31.',
    errInvalid: 'That date does not exist.',
    errFuture: 'Your date of birth is in the future.',
  },
} as const;

function cyclesFor(lang: IntlLang) {
  return CYCLES_EN;
}

function phaseLabel(lang: IntlLang, phase: Phase): string {
  return (PHASE_LABEL_EN)[phase];
}

/** 세 리듬 평균으로 한 줄 총평 — 한국어 overallComment의 언어별 대응 */
function comment(result: BiorhythmResult, lang: IntlLang): string {
  const cycles = cyclesFor(lang);
  const co = BIORHYTHM_COMMENT_EN;
  const criticals = result.cycles.filter(c => c.phase === 'critical');

  if (criticals.length >= 2) {
    const sep = ' and ';
    return co.multiCritical(criticals.map(c => cycles.find(x => x.key === c.key)!.label).join(sep));
  }
  if (criticals.length === 1) {
    return co.oneCritical(cycles.find(x => x.key === criticals[0].key)!.label);
  }
  if (result.average >= 60) return co.veryHigh;
  if (result.average >= 20) return co.high;
  if (result.average >= -20) return co.mid;
  if (result.average >= -60) return co.low;
  return co.veryLow;
}

function Chart({ points, lang }: { points: ChartPoint[]; lang: IntlLang }) {
  const n = points.length;
  const x = (i: number) => PAD + (i / (n - 1)) * (W - PAD * 2);
  const y = (v: number) => H / 2 - v * (H / 2 - PAD);

  const path = (key: 'physical' | 'emotional' | 'intellectual') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');

  const todayX = x(points.findIndex(p => p.offset === 0));
  const today = points.find(pt => pt.offset === 0)!;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={COPY[lang].chartAlt}>
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="currentColor" strokeWidth={1} className="text-slate-200 dark:text-slate-700" />
      <line x1={todayX} y1={PAD} x2={todayX} y2={H - PAD} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-slate-400 dark:text-slate-500" />
      {cyclesFor(lang).map(c => (
        <path key={c.key} d={path(c.key)} fill="none" stroke={CYCLE_COLOR[c.key]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {cyclesFor(lang).map(c => (
        <circle key={c.key} cx={todayX} cy={y(today[c.key])} r={4} fill={CYCLE_COLOR[c.key]} stroke="white" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

function Result({ result, points, lang }: { result: BiorhythmResult; points: ChartPoint[]; lang: IntlLang }) {
  const c = COPY[lang];
  const cycles = cyclesFor(lang);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">{c.todayRhythm}</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">{c.daysOld(result.days.toLocaleString())}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{comment(result, lang)}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
        <Chart points={points} lang={lang} />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
          {cycles.map(cy => (
            <span key={cy.key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: CYCLE_COLOR[cy.key] }} />
              {cy.label}
            </span>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">{c.chartNote}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {result.cycles.map(state => {
          const meta = cycles.find(cy => cy.key === state.key)!;
          return (
            <div key={state.key} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{meta.emoji}</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{meta.label}</span>
                <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full border ${PHASE_STYLE[state.phase]}`}>
                  {phaseLabel(lang, state.phase)}
                </span>
              </div>
              <p className="text-3xl font-black leading-none" style={{ color: CYCLE_COLOR[state.key] }}>
                {state.percent > 0 ? '+' : ''}{state.percent}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{c.cycleOf(meta.desc, meta.period)}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {state.daysToCritical === 0 ? c.criticalToday : c.nextCritical(state.daysToCritical)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Biorhythm({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];

  const points = useMemo(() => (birth ? getChartSeries(birth) : []), [birth]);
  const result = useMemo(() => (birth ? getBiorhythm(birth) : null), [birth]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);

    if (!y || !m || !d) { setError(c.errAll); return; }
    if (m < 1 || m > 12) { setError(c.errMonth); return; }
    if (d < 1 || d > 31) { setError(c.errDay); return; }

    const date = new Date(y, m - 1, d);
    // 2월 30일처럼 없는 날짜는 Date가 조용히 다음 달로 넘긴다. 되돌려 확인한다.
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(c.errInvalid);
      return;
    }
    if (date > new Date()) { setError(c.errFuture); return; }

    setError('');
    setBirth(date);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">📈 {c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black py-3 transition-colors">
            {c.submit}
          </button>
        </form>

        {result && points.length > 0 ? (
          <Result result={result} points={points} lang={lang} />
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        {/*
          한국어 페이지와 같은 이유로 이 문단은 반드시 유지한다. 바이오리듬은 계산이
          결정론적이라 오히려 과학처럼 보이기 쉬운데, 주기값 자체에 근거가 없다는
          점은 분명히 적어야 한다.
        */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">{c.scienceQ}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.scienceA}</p>
        </div>

        {result && <div className="mt-4"><ReferralCards lang="en" placement="result" /></div>}
      </div>
    </div>
  );
}
