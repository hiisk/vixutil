'use client';
import ToolIcon from '@/components/ToolIcon';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { analyzeFortuneIntl, DOMAIN_UI } from '@/lib/saju-fortune-intl';
import {
  STEMS, BRANCHES, type Element, type Pillar,
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  countElements, getSipseong, getSingang,
  getDaewoonDirection, getDaewoonStartAge, getDaewoons,
} from '@/lib/saju-data';
import {
  ELEMENT_INTL, STEMS_INTL, BRANCHES_INTL, SIPSEONG_INTL, SAJU_UI,
  type SajuIntlLang,
} from '@/lib/saju-intl';
import { t } from '@/lib/fortune-intl';

/**
 * 사주(八字) — en/zh판.
 *
 * 간지 산출·십성 판정·대운은 saju-data.ts의 순수 함수를 그대로 쓴다. 같은
 * 생년월일시면 세 언어가 같은 명식을 낸다 — 명식이 언어별로 달라지면
 * 계산이 틀렸다는 뜻이므로, 여기서는 문구만 갈아 끼운다.
 *
 * 한자(甲子·乙丑…)는 세 언어가 공유하므로 표기의 축으로 삼는다.
 */
const ELEMENT_COLOR: Record<Element, string> = {
  목: '#15803d', 화: '#dc2626', 토: '#ca8a04', 금: '#475569', 수: '#2563eb',
};
const ELEMENT_BG: Record<Element, string> = {
  목: 'bg-emerald-50 dark:bg-emerald-950/30', 화: 'bg-red-50 dark:bg-red-950/30',
  토: 'bg-amber-50 dark:bg-amber-950/30', 금: 'bg-slate-100 dark:bg-slate-800',
  수: 'bg-blue-50 dark:bg-blue-950/30',
};
const ELEMENTS: Element[] = ['목', '화', '토', '금', '수'];

interface Chart {
  year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null;
  counts: Record<Element, number>;
  strong: boolean;
  daewoons: { age: number; pillar: Pillar }[];
}

export default function SajuIntl({ lang }: { lang: SajuIntlLang }) {
  const ui = SAJU_UI[lang];
  const stems = STEMS_INTL[lang];
  const branches = BRANCHES_INTL[lang];
  const elements = ELEMENT_INTL[lang];

  const [form, setForm] = useState({ year: '', month: '', day: '', hour: '' });
  const [allDomains, setAllDomains] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [chart, setChart] = useState<Chart | null>(null);
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);
    if (!y || !m || !d) { setError(ui.errAll); return; }
    if (m < 1 || m > 12) { setError(ui.errMonth); return; }
    if (d < 1 || d > 31) { setError(ui.errDay); return; }
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(ui.errInvalid); return;
    }
    if (date > new Date()) { setError(ui.errFuture); return; }
    setError('');

    const year = getYearPillar(y, m, d);
    const month = getMonthPillar(m, d, year.stemIdx);
    const day = getDayPillar(y, m, d);
    const hour = form.hour === '' ? null : getHourPillar(Number(form.hour), day.stemIdx);

    const pillars = [year, month, day, hour];
    const counts = countElements(pillars);
    const { strong } = getSingang(day.stemIdx, pillars);
    const direction = getDaewoonDirection(gender, year.stemIdx);
    const startAge = getDaewoonStartAge(y, m, d, direction);
    const daewoons = getDaewoons(month, direction, startAge).map(w => ({ age: w.startAge, pillar: w.pillar }));

    setChart({ year, month, day, hour, counts, strong, daewoons });
    setTimeout(() => document.getElementById('saju-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  function PillarCard({ label, p }: { label: string; p: Pillar | null }) {
    if (!p) {
      return (
        <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-3 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">{label}</p>
          <p className="text-2xl text-slate-300 dark:text-slate-600">—</p>
        </div>
      );
    }
    const stem = STEMS[p.stemIdx];
    const branch = BRANCHES[p.branchIdx];
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-center">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-black leading-tight" style={{ color: ELEMENT_COLOR[stem.element] }}>{stem.hanja}</p>
        <p className="text-2xl font-black leading-tight" style={{ color: ELEMENT_COLOR[branch.element] }}>{branch.hanja}</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
          {stems[stem.hanja]?.kor} {branches[branch.hanja]?.kor}
        </p>
      </div>
    );
  }

  const dayStem = chart ? STEMS[chart.day.stemIdx] : null;
  const dayStemIntl = dayStem ? stems[dayStem.hanja] : null;
  const total = chart ? ELEMENTS.reduce((s, el) => s + chart.counts[el], 0) : 0;
  const missing = chart ? ELEMENTS.filter(el => chart.counts[el] === 0) : [];
  const du = DOMAIN_UI[lang];
  // 점수 계산은 한국어와 같은 한 벌을 쓴다 — 같은 사주면 세 언어가 같은 등급을 낸다
  const domains = chart
    ? analyzeFortuneIntl(chart.day, chart.year, chart.month, chart.hour, gender, chart.strong, chart.counts, lang)
    : [];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-700" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="page-back hover:text-indigo-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{ui.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={"/fortune/saju"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🔯" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{ui.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{ui.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {(['year', 'month', 'day'] as const).map(k => (
              <input key={k} type="number" inputMode="numeric"
                placeholder={k === 'year' ? ui.yearPh : k === 'month' ? ui.monthPh : ui.dayPh}
                value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none" />
            ))}
          </div>

          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.hourLabel}</label>
          <select value={form.hour} onChange={e => setForm({ ...form, hour: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none mb-1">
            <option value="">{ui.hourUnknown}</option>
            {Array.from({ length: 24 }, (_, h) => (
              <option key={h} value={h}>{String(h).padStart(2, '0')}:00 – {String(h).padStart(2, '0')}:59</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{ui.hourNote}</p>

          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.genderLabel}</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {(['male', 'female'] as const).map(g => (
              <button key={g} type="button" onClick={() => setGender(g)}
                className={`rounded-xl py-2.5 text-sm font-bold border transition-colors ${gender === g
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                {g === 'male' ? ui.male : ui.female}
              </button>
            ))}
          </div>

          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mb-2">{error}</p>}
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-black py-3.5 hover:-translate-y-0.5 hover:shadow-lg transition-all">
            {ui.submit}
          </button>
        </form>

        {chart && dayStem && dayStemIntl ? (
          <div id="saju-result" className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3">{ui.chart}</p>
              <div className="grid grid-cols-4 gap-2">
                <PillarCard label={ui.hourPillar} p={chart.hour} />
                <PillarCard label={ui.dayPillar} p={chart.day} />
                <PillarCard label={ui.monthPillar} p={chart.month} />
                <PillarCard label={ui.yearPillar} p={chart.year} />
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 p-6 text-white">
              <p className="text-xs font-semibold text-white/80 mb-1">{ui.dayMaster}</p>
              <p className="text-3xl font-black mb-1">{dayStem.hanja} · {dayStemIntl.kor}</p>
              <p className="text-xs text-white/80 mb-3">{dayStemIntl.nature} · {elements[dayStem.element].label}</p>
              <p className="text-sm leading-relaxed">{dayStemIntl.personality}</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {[
                  [ui.inCareer, dayStemIntl.aptitude],
                  [t('luckyColor', lang), dayStemIntl.luckyColor],
                  [t('luckyDirection', lang), dayStemIntl.luckyDirection],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white/15 rounded-xl px-2 py-2">
                    <p className="text-[10px] text-white/70">{k}</p>
                    <p className="text-[11px] font-bold leading-tight mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-baseline justify-between mb-3">
                <p className="label-caps">{ui.elements}</p>
                <span className="text-[11px] font-bold text-indigo-600">
                  {chart.strong ? ui.strong : ui.weak}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {ELEMENTS.map(el => {
                  const pct = total > 0 ? Math.round((chart.counts[el] / total) * 100) : 0;
                  return (
                    <div key={el}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{elements[el].label}</span>
                        <span className="text-xs font-bold" style={{ color: ELEMENT_COLOR[el] }}>{chart.counts[el]}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ELEMENT_COLOR[el] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                {chart.strong ? ui.strongNote : ui.weakNote}
              </p>
            </div>

            {missing.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">{ui.missing}</p>
                <div className="space-y-3">
                  {missing.map(el => (
                    <div key={el} className={`rounded-xl p-3 ${ELEMENT_BG[el]}`}>
                      <p className="text-xs font-black mb-1" style={{ color: ELEMENT_COLOR[el] }}>{elements[el].label}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{elements[el].shortage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-3">{ui.tenGods}</p>
              <div className="space-y-3">
                {([[ui.yearPillar, chart.year], [ui.monthPillar, chart.month], [ui.hourPillar, chart.hour]] as const)
                  .filter((x): x is [string, Pillar] => x[1] !== null)
                  .map(([label, p]) => {
                    const ss = getSipseong(chart.day.stemIdx, p.stemIdx);
                    const info = SIPSEONG_INTL[lang][ss];
                    if (!info) return null;
                    return (
                      <div key={label} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{label}</span>
                          <span className="text-xs font-black text-indigo-600">{info.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{info.summary}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {gender === 'male' ? info.male : info.female}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-3">{ui.luckPillars}</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {chart.daewoons.slice(0, 8).map(w => {
                  const s = STEMS[w.pillar.stemIdx];
                  const b = BRANCHES[w.pillar.branchIdx];
                  return (
                    <div key={w.age} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2 text-center">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{w.age}{''}</p>
                      <p className="text-base font-black leading-tight" style={{ color: ELEMENT_COLOR[s.element] }}>{s.hanja}</p>
                      <p className="text-base font-black leading-tight" style={{ color: ELEMENT_COLOR[b.element] }}>{b.hanja}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*
              영역별 운세 — 점수는 lib/saju-fortune-facts.ts가 계산하므로 한국어 화면과
              같은 값이 나온다. 열 개를 한 번에 펼치면 화면이 너무 길어져 넷만 먼저 보인다.
            */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-1">{du.title}</p>
              <p className="note-xs mb-4">{du.lead}</p>
              <div className="flex flex-col gap-3">
                {domains.slice(0, allDomains ? domains.length : 4).map(d => (
                  <div key={d.id} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{d.emoji}</span>
                      <span className="text-sm font-black text-slate-800 dark:text-slate-100">{d.title}</span>
                      <span className="ml-auto flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">{du.scoreOf(d.score)}</span>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                          d.score >= 4
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : d.score === 3
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                        }`}>
                          {d.grade}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{d.summary}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mb-2">{d.intro}</p>
                    <ul className="flex flex-col gap-1.5 mb-2">
                      {d.points.map(pt => (
                        <li key={pt} className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-3 relative">
                          <span className="absolute left-0 text-slate-300 dark:text-slate-600">·</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-violet-600 dark:text-violet-300 leading-relaxed">{d.advice}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAllDomains(v => !v)}
                className="w-full mt-3 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:border-violet-300 transition-colors"
              >
                {allDomains ? du.collapse : du.showAll}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.originNote}</p>
            </div>

            <ReferralCards lang="en" placement="result" />
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed pt-2">{ui.disclaimer}</p>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{ui.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
