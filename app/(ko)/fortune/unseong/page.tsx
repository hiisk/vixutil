'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import RelatedContent from '@/components/RelatedContent';
import { FORTUNE_RELATED } from '@/lib/fortune-related';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ShareButton from '@/components/ShareButton';
import ToolIcon from '@/components/ToolIcon';
import SajuForm, { type SajuFormValue } from '@/components/fortune/SajuForm';
import { buildChart, BRANCHES, STEMS } from '@/lib/saju-data';
import {
  UNSEONGS, branchName, readUnseong, stemName, unseongPower, unseongRow,
} from '@/lib/unseong';

/**
 * 십이운성 — 십이신살과 짝이 되는 표.
 *
 * 「제왕」·「장생」은 사주를 조금 아는 사람이면 듣는 말인데, 내 일간이 어느
 * 자리에서 힘이 센지는 명식을 뽑아야 알 수 있었다. 규칙은 lib/unseong.ts에
 * 있고 tests/unseong.test.ts가 붙든다 — 건록·제왕이 알려진 값과 맞는지 잰다.
 */

export default function UnseongPage() {
  const [form, setForm] = useState<SajuFormValue>({ year: '', month: '', day: '', hour: '12:00', gender: 'male' });
  const [submitted, setSubmitted] = useState<SajuFormValue | null>(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const chart = useMemo(() => {
    if (!submitted) return null;
    const [hh] = submitted.hour ? submitted.hour.split(':') : [''];
    return buildChart({
      year: Number(submitted.year), month: Number(submitted.month), day: Number(submitted.day),
      hour: submitted.hour === '' ? null : Number(hh),
    }, submitted.gender);
  }, [submitted]);

  const hits = chart ? readUnseong(chart) : null;
  const power = hits ? unseongPower(hits) : null;
  const dayStem = chart ? chart.day.stemIdx : null;

  function calculate() {
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);
    if (!y || !m || !d) { setError('생년월일을 모두 채워주세요.'); return; }
    if (y < 1900 || y > 2100) { setError('연도는 1900~2100 사이여야 합니다.'); return; }
    if (m < 1 || m > 12 || d < 1 || d > 31) { setError('월·일을 다시 확인해주세요.'); return; }
    setError('');
    setSubmitted(form);
    setTimeout(() => document.getElementById('unseong-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
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
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">십이운성</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">십이운성</h1>
          <p className="page-lede">내 일간이 네 기둥에서 각각 어느 세기인지 — 장생부터 양까지 열두 자리로 봅니다.</p>
        </div>

        <SajuForm
          lang="ko" value={form} onChange={setForm} onSubmit={calculate}
          submitLabel="운성 보기" error={error}
        />

        <Ad />

        {chart && hits && power && dayStem !== null && (
          <div id="unseong-result" className="flex flex-col gap-4">
            <div className="result-card">
              <p className="label-caps">내 일간</p>
              <p className="text-4xl font-bold mt-1 tracking-tight">
                {STEMS[dayStem].hanja} <span className="text-2xl">{stemName(dayStem)}</span>
              </p>
              <p className="mt-3 text-sm">
                네 기둥 세기 <strong className="text-slate-900 dark:text-white">{power.total} / {power.max}</strong>
                {' — '}{power.label}
              </p>
              <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden max-w-[220px] mx-auto">
                <div className="h-full rounded-full bg-sec transition-all duration-700"
                     style={{ width: `${Math.round((power.total / power.max) * 100)}%` }} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-3">기둥별 운성</p>
              <div className="kv-table">
                {hits.map(h => (
                  <div key={h.pillar} className="kv-row">
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-slate-900 dark:text-white">{h.pillar}</span>
                      <span className="text-slate-500 dark:text-slate-400">{branchName(h.branchIdx)}</span>
                    </span>
                    <span className="shrink-0 flex items-center gap-2">
                      <span className="inline-flex gap-0.5" aria-hidden>
                        {[1, 2, 3, 4, 5].map(n => (
                          <i key={n} className={`inline-block h-1.5 w-1.5 rounded-full ${
                            n <= h.unseong.power ? 'bg-sec' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        ))}
                      </span>
                      {h.unseong.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 내 일간이 열두 지지에서 각각 어떤지 — 한 줄로 다 보인다 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-1">{stemName(dayStem)} 일간의 열두 자리</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                {dayStem % 2 === 0 ? '양간이라 순행합니다' : '음간이라 역행합니다'} — 같은 오행이어도 음양에 따라 방향이 반대입니다.
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {unseongRow(dayStem).map((u, b) => {
                  const mine = hits.some(h => h.branchIdx === b);
                  return (
                    <div key={b} className={`rounded-lg px-1 py-2 text-center ${mine ? 'pick-on' : 'pick-off'}`}>
                      <p className={`text-[11px] font-bold ${mine ? 'text-sec' : 'text-slate-700 dark:text-slate-200'}`}>
                        {BRANCHES[b].kor}
                      </p>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">{u.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="label-caps">내 기둥의 운성 풀이</p>
              {[...new Map(hits.map(h => [h.unseong.name, h])).values()].map(h => (
                <div key={h.unseong.name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      {h.unseong.name} <span className="text-slate-500 dark:text-slate-400 font-medium">{h.unseong.hanja}</span>
                    </h2>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">{h.pillar}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{h.unseong.gist}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{h.unseong.body}</p>
                </div>
              ))}
            </div>

            <ShareButton
              title={`내 일간 ${stemName(dayStem)} — 네 기둥 세기 ${power.total}/${power.max}`}
              description={hits.map(h => h.unseong.name).join(' · ')}
              type="fortune"
            />
          </div>
        )}

        {!chart && (
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg">
              <ToolIcon emoji="☝️" className="h-6 w-6" />
            </span>
            <p className="text-sm">생년월일을 넣으면 네 기둥의 운성이 나옵니다</p>
          </div>
        )}

        {/* 열두 이름 사전 — 내 사주를 안 넣어도 읽을 것이 있어야 한다 */}
        <div className="mt-8">
          <p className="label-caps mb-3">십이운성 열두 자리</p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            {UNSEONGS.map(u => {
              const on = open === u.name;
              return (
                <div key={u.name} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <button
                    type="button" onClick={() => setOpen(on ? null : u.name)} aria-expanded={on}
                    className="w-full flex items-baseline justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="min-w-0">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400"> {u.hanja}</span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">{u.gist}</span>
                    </span>
                    <span className="inline-flex gap-0.5 shrink-0" aria-label={`세기 ${u.power}`}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <i key={n} className={`inline-block h-1.5 w-1.5 rounded-full ${
                          n <= u.power ? 'bg-sec' : 'bg-slate-200 dark:bg-slate-700'}`} />
                      ))}
                    </span>
                  </button>
                  {on && (
                    <p className="px-4 pb-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{u.body}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">십이운성은 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            일간마다 <strong className="text-slate-800 dark:text-slate-100">장생지</strong>가 정해져 있고 거기서부터 열두 자리를 돕니다.
            중요한 것은 <strong className="text-slate-800 dark:text-slate-100">양간은 순행, 음간은 역행</strong>이라는 점입니다 —
            갑과 을은 같은 목(木)인데도 힘이 세는 자리가 정반대입니다.
            확인하기 쉬운 자리는 <strong className="text-slate-800 dark:text-slate-100">건록</strong>으로,
            그 일간이 스스로 앉는 지지입니다(갑은 인, 병은 사, 경은 신, 임은 해).
            그다음 왕지가 <strong className="text-slate-800 dark:text-slate-100">제왕</strong>입니다.
            「사」나 「절」이 무섭게 들리지만 명리에서는 «바깥일이 줄고 안이 깊어진다»로 읽습니다 —
            좋고 나쁨이 아니라 기운의 모양입니다.
            이 계산기는 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>입니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/unseong']} />
      </div>
      <RelatedContent items={FORTUNE_RELATED} currentSlug="unseong" basePath="/fortune" accent="violet" bg="" />
      <SiteFooter referral={false} />
    </div>
  );
}
