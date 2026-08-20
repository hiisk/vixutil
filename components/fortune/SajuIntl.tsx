'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { analyzeFortuneIntl, DOMAIN_UI } from '@/lib/saju-fortune-intl';
import SajuTopicNav from '@/components/fortune/SajuTopicNav';
import SajuForm, { type SajuFormValue } from '@/components/fortune/SajuForm';
import { topicQuery, TOPIC_DOMAIN, type TopicSlug } from '@/lib/saju-topics';
import {
  STEMS, BRANCHES, type Element, type Pillar,
  buildChart, countElements, getSipseong, getSingang,
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

/**
 * 기둥 카드.
 *
 * ── 컴포넌트 안에서 정의하면 안 되는 자리다 (2026-08-13) ──────
 * 전에는 SajuIntl **안에** 있었다. 그러면 렌더마다 새 함수가 되어 React가 매번
 * 다른 컴포넌트로 보고 **네 기둥을 통째로 리마운트한다** — React Compiler도
 * 그 컴포넌트는 최적화를 포기한다(static-components 오류). 닫아 쓰던 stems·
 * branches(언어 사전)는 prop으로 받는다.
 */
function PillarCard({ label, p, stems, branches }: {
  label: string; p: Pillar | null;
  stems: (typeof STEMS_INTL)[keyof typeof STEMS_INTL];
  branches: (typeof BRANCHES_INTL)[keyof typeof BRANCHES_INTL];
}) {
  if (!p) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-3 text-center">
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-2xl text-slate-500 dark:text-slate-400">—</p>
      </div>
    );
  }
  const stem = STEMS[p.stemIdx];
  const branch = BRANCHES[p.branchIdx];
  return (
    <div className="rounded-xl border chip-off p-3 text-center">
      <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold leading-tight" style={{ color: ELEMENT_COLOR[stem.element] }}>{stem.hanja}</p>
      <p className="text-2xl font-bold leading-tight" style={{ color: ELEMENT_COLOR[branch.element] }}>{branch.hanja}</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
        {stems[stem.hanja]?.kor} {branches[branch.hanja]?.kor}
      </p>
    </div>
  );
}

export default function SajuIntl({ lang, initialTopic, formExtra, topicHead, topicTail }: {
  lang: SajuIntlLang;
  /** 주제 낱장에서 왔으면 그 영역을 펼치고 표시한다 */
  initialTopic?: TopicSlug;
  /** 이름 칸처럼 그 화면만의 입력 */
  formExtra?: ReactNode;
  /** 폼 위 — 주제 낱장의 제목·소개 */
  topicHead?: ReactNode;
  /** 맨 아래 — 주제 낱장의 배경 설명과 자주 묻는 질문 */
  topicTail?: ReactNode;
}) {
  const ui = SAJU_UI[lang];
  const stems = STEMS_INTL[lang];
  const branches = BRANCHES_INTL[lang];
  const elements = ELEMENT_INTL[lang];

  const [form, setForm] = useState<SajuFormValue>({ year: '', month: '', day: '', hour: '', gender: 'male' });
  const [allDomains, setAllDomains] = useState(false);
  /* 주제로 들어왔으면 그 영역이 넷 밖에 있을 수 있다 — 접힌 채로 두면 안 보인다 */
  const openTopic = initialTopic ? TOPIC_DOMAIN[initialTopic] : null;
  const showAllDomains = allDomains || openTopic !== null;
  const gender = form.gender;
  const [chart, setChart] = useState<Chart | null>(null);
  const [error, setError] = useState('');

  /* 값을 밖에서 받는다 — 폼 제출과 공유 링크 복원이 같은 길을 쓴다 */
  const run = useCallback((f: { year: string; month: string; day: string; hour: string }, g: 'male' | 'female') => {
    const y = Number(f.year), m = Number(f.month), d = Number(f.day);
    if (!y || !m || !d) { setError(ui.errAll); return; }
    if (m < 1 || m > 12) { setError(ui.errMonth); return; }
    if (d < 1 || d > 31) { setError(ui.errDay); return; }
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(ui.errInvalid); return;
    }
    if (date > new Date()) { setError(ui.errFuture); return; }
    setError('');

    // 시각은 "HH:MM" — 비워 두면 시주를 생략한다
    const [hh, mm] = f.hour.split(':');
    const c = buildChart({
      year: y, month: m, day: d,
      hour: f.hour === '' ? null : Number(hh),
      minute: Number(mm) || 0,
    }, g);

    const pillars = [c.year, c.month, c.day, c.hour];
    const counts = countElements(pillars);
    const { strong } = getSingang(c.day.stemIdx, pillars);

    setChart({
      year: c.year, month: c.month, day: c.day, hour: c.hour, counts, strong,
      daewoons: c.daewoons.map(w => ({ age: w.startAge, pillar: w.pillar })),
    });
    setTimeout(() => document.getElementById('saju-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [ui]);

  /* 주제 낱장에서 값을 달고 돌아오면(?y=&m=&d=&h=&g=) 다시 안 넣어도 되게 푼다 */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const y = p.get('y') ?? '', m = p.get('m') ?? '', d = p.get('d') ?? '';
    const h = p.get('h') ?? '', g = (p.get('g') ?? 'male') as 'male' | 'female';
    if (!y || !m || !d) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    setForm({ year: y, month: m, day: d, hour: h, gender: g });
    /* eslint-enable react-hooks/set-state-in-effect */
    run({ year: y, month: m, day: d, hour: h }, g);
  }, [run]);

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
      <div className="h-1 topbar" />
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
        {topicHead}
        {/* 주제 낱장은 제 이름표를 위에서 이미 세웠다 — h1이 둘이면 안 된다 */}
        {!initialTopic && (
          <div className="mb-6">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🔯" className="h-6 w-6" /></span>
            <div className="hero-band">
              <PageHero title={ui.title} desc={ui.lead} />
            </div>
          </div>
        )}

        {/* 폼은 components/fortune/SajuForm.tsx 하나뿐이다 */}
        <SajuForm
          lang={lang} value={form} onChange={setForm}
          onSubmit={() => run(form, form.gender)}
          error={error} submitLabel={ui.submit}
        >
          {formExtra}
        </SajuForm>

        {chart && dayStem && dayStemIntl ? (
          <div id="saju-result" className="space-y-4">
            <div className="rounded-lg border chip-off p-5">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3">{ui.chart}</p>
              <div className="grid grid-cols-4 gap-2">
                <PillarCard label={ui.hourPillar} p={chart.hour} stems={stems} branches={branches} />
                <PillarCard label={ui.dayPillar} p={chart.day} stems={stems} branches={branches} />
                <PillarCard label={ui.monthPillar} p={chart.month} stems={stems} branches={branches} />
                <PillarCard label={ui.yearPillar} p={chart.year} stems={stems} branches={branches} />
              </div>
            </div>

            <div className="rounded-lg bg-sec p-6 ">
              <p className="text-xs font-semibold text-white/80 mb-1">{ui.dayMaster}</p>
              <p className="text-3xl font-bold mb-1">{dayStem.hanja} · {dayStemIntl.kor}</p>
              <p className="text-xs text-white/80 mb-3">{dayStemIntl.nature} · {elements[dayStem.element].label}</p>
              <p className="text-sm leading-relaxed">{dayStemIntl.personality}</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {[
                  [ui.inCareer, dayStemIntl.aptitude],
                  [t('luckyColor', lang), dayStemIntl.luckyColor],
                  [t('luckyDirection', lang), dayStemIntl.luckyDirection],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white dark:bg-slate-900/15 rounded-xl px-2 py-2">
                    <p className="text-[10px] text-white/70">{k}</p>
                    <p className="text-[11px] font-bold leading-tight mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border chip-off p-5">
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
              <div className="rounded-lg border chip-off p-5">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">{ui.missing}</p>
                <div className="space-y-3">
                  {missing.map(el => (
                    <div key={el} className={`rounded-xl p-3 ${ELEMENT_BG[el]}`}>
                      <p className="text-xs font-bold mb-1" style={{ color: ELEMENT_COLOR[el] }}>{elements[el].label}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{elements[el].shortage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border chip-off p-5">
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
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{label}</span>
                          <span className="text-xs font-bold text-indigo-600">{info.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{info.summary}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {gender === 'male' ? info.male : info.female}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rounded-lg border chip-off p-5">
              <p className="label-caps mb-3">{ui.luckPillars}</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {chart.daewoons.slice(0, 8).map(w => {
                  const s = STEMS[w.pillar.stemIdx];
                  const b = BRANCHES[w.pillar.branchIdx];
                  return (
                    <div key={w.age} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2 text-center">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{w.age}{''}</p>
                      <p className="text-base font-bold leading-tight" style={{ color: ELEMENT_COLOR[s.element] }}>{s.hanja}</p>
                      <p className="text-base font-bold leading-tight" style={{ color: ELEMENT_COLOR[b.element] }}>{b.hanja}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*
              영역별 운세 — 점수는 lib/saju-fortune-facts.ts가 계산하므로 한국어 화면과
              같은 값이 나온다. 열 개를 한 번에 펼치면 화면이 너무 길어져 넷만 먼저 보인다.
            */}
            <div className="rounded-lg border chip-off p-5">
              <p className="label-caps mb-1">{du.title}</p>
              <p className="note-xs mb-4">{du.lead}</p>
              <div className="flex flex-col gap-3">
                {domains.slice(0, showAllDomains ? domains.length : 4).map(d => (
                  <div key={d.id} className={`rounded-xl border px-4 py-3.5 ${d.id === openTopic
                    ? 'border-indigo-400 dark:border-indigo-500 ring-1 ring-indigo-200 dark:ring-indigo-900'
                    : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{d.emoji}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{d.title}</span>
                      <span className="ml-auto flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">{du.scoreOf(d.score)}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          d.score >= 4
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : d.score === 3
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                        }`}>
                          {d.grade}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{d.summary}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">{d.intro}</p>
                    <ul className="flex flex-col gap-1.5 mb-2">
                      {d.points.map(pt => (
                        <li key={pt} className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-3 relative">
                          <span className="absolute left-0 text-slate-500 dark:text-slate-400">·</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-violet-600 dark:text-violet-300 leading-relaxed">{d.advice}</p>
                  </div>
                ))}
              </div>
              {/* 주제로 들어오면 이미 다 펼쳐져 있어 이 단추가 할 일이 없다 */}
              {openTopic === null && <button
                onClick={() => setAllDomains(v => !v)}
                className="w-full mt-3 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {allDomains ? du.collapse : du.showAll}
              </button>}
            </div>

            <div className="rounded-lg border chip-off p-5">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.originNote}</p>
            </div>

            <Ad lang="en" placement="result" />
            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-2">{ui.disclaimer}</p>
          </div>
        ) : (
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="☝️" className="h-6 w-6" /></span>
            <p className="text-sm">{ui.empty}</p>
          </div>
        )}

        {/*
          주제 낱장으로 가는 줄. 명식을 뽑기 전에도 보여야 한다 — 결과 안에 두면
          첫 HTML에 링크가 없어서 크롤러에게는 일곱 장이 안 보인다.
        */}
        {topicTail}

        <div className="mt-8">
          <SajuTopicNav lang={lang} current={initialTopic} query={topicQuery({ ...form, gender })} />
        </div>
      </div>
    </div>
  );
}
