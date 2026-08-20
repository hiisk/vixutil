'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ShareButton from '@/components/ShareButton';
import ReferralCards from '@/components/ReferralCards';
import ToolIcon from '@/components/ToolIcon';
import SajuForm, { type SajuFormValue } from '@/components/fortune/SajuForm';
import { buildChart, BRANCHES, STEMS } from '@/lib/saju-data';
import {
  SINSALS, branchName, branchesFor, readSinsal,
  type Sinsal, type SinsalReading,
} from '@/lib/sinsal';

/**
 * 십이신살 — 「도화살 있나」를 만세력 없이 확인하는 자리.
 *
 * 규칙은 lib/sinsal.ts에, 검사는 tests/sinsal.test.ts에 있다. 화면으로는
 * «그럴듯해 보인다»밖에 확인이 안 되는 종류라 그쪽이 본체다.
 *
 * 입력 폼은 components/fortune/SajuForm.tsx 하나를 쓴다 — 사주 화면 셋이
 * 이미 그것을 쓰고 있고, 여기서 따로 그리면 넷째 갈래가 생긴다.
 */

/**
 * 살마다 성격이 다르다 — 좋은 것을 나쁜 것처럼 칠하지 않는다.
 *
 * 색을 인라인 style로 한 벌만 두었더니 11px 글자가 다크에서 3.0~3.6이었다
 * (본문 기준 4.5 미달). 작은 글자는 한 색으로 두 바탕을 못 덮는다. 유틸리티
 * 짝으로 바꾸면 tests/dark-pairs.test.ts가 뒤집힌 짝까지 지켜 준다.
 */
const TONE: Record<Sinsal['tone'], { label: string; text: string; ring: string }> = {
  good: { label: '순한 자리', text: 'text-teal-700 dark:text-teal-300', ring: 'ring-teal-600/30 dark:ring-teal-400/30' },
  mixed: { label: '양면이 있는 자리', text: 'text-sky-700 dark:text-sky-300', ring: 'ring-sky-600/30 dark:ring-sky-400/30' },
  caution: { label: '조심하는 자리', text: 'text-amber-700 dark:text-amber-300', ring: 'ring-amber-600/30 dark:ring-amber-400/30' },
};

function ReadingCard({ reading, note }: { reading: SinsalReading; note: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">{reading.base} 기준</h2>
        <span className="text-xs font-bold text-sec shrink-0">{branchName(reading.baseBranch)}</span>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{note}</p>
      <div className="kv-table">
        {reading.hits.map(h => (
          <div key={h.pillar} className="kv-row">
            <span className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-slate-900 dark:text-white">{h.pillar}</span>
              <span className="text-slate-500 dark:text-slate-400">{branchName(h.branchIdx)}</span>
            </span>
            <span className="shrink-0">
              {h.sinsal.name}
              {h.sinsal.alias && <span className="text-slate-500 dark:text-slate-400"> · {h.sinsal.alias}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SinsalPage() {
  const [form, setForm] = useState<SajuFormValue>({ year: '', month: '', day: '', hour: '', gender: 'male' });
  const [submitted, setSubmitted] = useState<SajuFormValue | null>(null);
  const [error, setError] = useState('');
  /* 열두 이름 가운데 펼쳐 본 것 — 한 번에 하나만 */
  const [open, setOpen] = useState<string | null>(null);

  const chart = useMemo(() => {
    if (!submitted) return null;
    const [hh] = submitted.hour ? submitted.hour.split(':') : [''];
    return buildChart({
      year: Number(submitted.year), month: Number(submitted.month), day: Number(submitted.day),
      hour: submitted.hour === '' ? null : Number(hh),
    }, submitted.gender);
  }, [submitted]);

  const byYear = chart ? readSinsal(chart, '연지') : null;
  const byDay = chart ? readSinsal(chart, '일지') : null;

  /* 두 기준을 합쳐 «내가 가진 살» 목록 — 사람들이 알고 싶은 것은 이쪽이다 */
  const mine = useMemo(() => {
    if (!byYear || !byDay) return [];
    const names = new Set([...byYear.hits, ...byDay.hits].map(h => h.sinsal.name));
    return SINSALS.filter(s => names.has(s.name));
  }, [byYear, byDay]);

  function calculate() {
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);
    if (!y || !m || !d) { setError('생년월일을 모두 채워주세요.'); return; }
    if (y < 1900 || y > 2100) { setError('연도는 1900~2100 사이여야 합니다.'); return; }
    if (m < 1 || m > 12 || d < 1 || d > 31) { setError('월·일을 다시 확인해주세요.'); return; }
    setError('');
    setSubmitted(form);
    setTimeout(() => document.getElementById('sinsal-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-violet-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">십이신살</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">십이신살</h1>
          <p className="page-lede">도화살·역마살·화개살이 내 사주에 있는지, 네 기둥에서 각각 확인합니다.</p>
        </div>

        <SajuForm
          lang="ko" value={form} onChange={setForm} onSubmit={calculate}
          submitLabel="신살 보기" error={error}
        />

        {chart && byYear && byDay && (
          <div id="sinsal-result" className="flex flex-col gap-4">
            <div className="result-card">
              <p className="label-caps">내 명식</p>
              <p className="text-2xl font-bold mt-1 tracking-tight">
                {[chart.year, chart.month, chart.day, chart.hour].map((p, i) =>
                  p ? <span key={i} className="inline-block mx-1">{STEMS[p.stemIdx].hanja}{BRANCHES[p.branchIdx].hanja}</span> : null,
                )}
              </p>
              <p className="mt-3 text-sm">
                가진 살 <strong className="text-slate-900 dark:text-white">{mine.length}가지</strong>
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {mine.map(s => (
                  <span
                    key={s.name}
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${TONE[s.tone].text} ${TONE[s.tone].ring}`}
                  >
                    {s.alias ?? s.name}
                  </span>
                ))}
              </div>
            </div>

            {/*
              책마다 기준이 갈린다. 하나만 내면 다른 표와 안 맞아 «틀렸다»는
              말을 듣는 자리라, 둘 다 내고 왜 다른지도 적는다.
            */}
            <ReadingCard reading={byYear} note="옛 책이 주로 쓰는 기준입니다." />
            <ReadingCard reading={byDay} note="요즘 실무에서 더 많이 쓰는 기준입니다." />

            <div className="note note-warn">
              두 기준의 결과가 다른 것은 오류가 아닙니다. 연지로 보느냐 일지로 보느냐는
              책과 유파에 따라 갈리고, 둘 다 오래 쓰여 온 방식입니다.
            </div>

            {mine.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="label-caps">내가 가진 살 풀이</p>
                {mine.map(s => (
                  <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {s.name} <span className="text-slate-500 dark:text-slate-400 font-medium">{s.hanja}</span>
                        {s.alias && <span className="text-sec"> · {s.alias}</span>}
                      </h3>
                      <span className={`text-[11px] font-bold shrink-0 ${TONE[s.tone].text}`}>
                        {TONE[s.tone].label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                      {s.gist} · 늘 {branchesFor(s.name).map(branchName).join('·')} 가운데 놓입니다
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            )}

            <ShareButton
              title={`내 사주의 십이신살 ${mine.length}가지`}
              description={mine.map(s => s.alias ?? s.name).join(' · ')}
              type="fortune"
            />

            <ReferralCards placement="result" />
          </div>
        )}

        {!chart && (
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg">
              <ToolIcon emoji="☝️" className="h-6 w-6" />
            </span>
            <p className="text-sm">생년월일을 넣으면 네 기둥의 신살이 나옵니다</p>
          </div>
        )}

        {/* 열두 이름 사전 — 내 사주를 안 넣어도 읽을 것이 있어야 한다 */}
        <div className="mt-8">
          <p className="label-caps mb-3">십이신살 열두 가지</p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            {SINSALS.map(s => {
              const on = open === s.name;
              return (
                <div key={s.name} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <button
                    type="button" onClick={() => setOpen(on ? null : s.name)} aria-expanded={on}
                    className="w-full flex items-baseline justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="min-w-0">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</span>
                      {s.alias && <span className="text-sm text-sec font-bold"> · {s.alias}</span>}
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">{s.gist}</span>
                    </span>
                    <span className={`text-[11px] font-bold shrink-0 ${TONE[s.tone].text}`}>
                      {TONE[s.tone].label}
                    </span>
                  </button>
                  {on && (
                    <div className="px-4 pb-4">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                        {s.hanja} · 늘 {branchesFor(s.name).map(branchName).join('·')} 가운데 놓입니다
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{s.body}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">십이신살은 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            기준 지지가 속한 <strong className="text-slate-800 dark:text-slate-100">삼합</strong> 무리가 자리를 정합니다.
            무리의 첫 자리(생지)가 <strong className="text-slate-800 dark:text-slate-100">지살</strong>,
            가운데(왕지)가 <strong className="text-slate-800 dark:text-slate-100">장성살</strong>,
            마지막(묘지)이 <strong className="text-slate-800 dark:text-slate-100">화개살</strong>이고,
            이 셋을 못으로 박으면 나머지 아홉이 순서대로 채워집니다.
            그래서 도화살은 어느 사주에서든 자·오·묘·유 넷 가운데,
            역마살은 인·신·사·해 넷 가운데, 화개살은 진·술·축·미 넷 가운데 놓입니다.
            «살»이라는 말이 무섭게 들리지만 본디 뜻은 기운의 성격이지 나쁜 일이 정해졌다는 뜻이 아닙니다 —
            도화살은 사람 눈을 끄는 매력이고 역마살은 움직임입니다.
            이 계산기는 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>입니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/sinsal']} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
