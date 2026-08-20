'use client';
import { useState, useMemo } from 'react';
import CoupangAd from '@/components/CoupangAd';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ShareButton from '@/components/ShareButton';
import ToolIcon from '@/components/ToolIcon';
import { matchSaju, matchGrade, type MatchAxis } from '@/lib/saju-match';
import { ELEMENT_INFO, STEMS, BRANCHES, type Pillar } from '@/lib/saju-data';

/**
 * 사주 궁합 — 궁합 갈래에서 비어 있던 자리.
 *
 * 이 섹션에 궁합 도구가 다섯(띠·별자리·혈액형·이름·MBTI)인데 정작 사람이 제일
 * 많이 치는 「사주 궁합」이 없었다. 계산은 lib/saju-match.ts에 있고 규칙은
 * tests/saju-match.test.ts가 붙들고 있다 — 육합인지 충인지는 화면으로 확인이
 * 안 되는 종류라 검사 쪽이 본체다.
 *
 * 한국어만 낸다. 십성 이름(정관·편재…)과 그 뜻풀이가 통째로 한국어 명리 어휘라,
 * 아홉 언어는 문장을 새로 써야 하는 별개의 일이다. /fortune/name-match도 같은
 * 이유로 한국어 하나뿐이다.
 */

const AXIS_META: Record<MatchAxis, { title: string; sub: string }> = {
  ilgan: { title: '일간 관계', sub: '두 사람의 «자기 자신»이 서로를 돕는가' },
  ilji: { title: '배우자궁', sub: '가장 가까운 자리의 합과 충' },
  ohaeng: { title: '오행 보완', sub: '내게 없는 것을 상대가 갖고 있는가' },
  sipseong: { title: '십성 관계', sub: '상대가 내 사주에서 무엇이 되는가' },
};

/** 한 사람의 생년월일시 — 두 벌이 필요해 SajuForm(한 벌 + 제출단추)을 못 쓴다 */
function PersonInput({
  id, label, value, onChange,
}: {
  id: string;
  label: string;
  value: { year: string; month: string; day: string; hour: string; gender: 'male' | 'female' };
  onChange: (v: PersonInputValue) => void;
}) {
  const set = (patch: Partial<PersonInputValue>) => onChange({ ...value, ...patch });
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
      <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">{label}</p>

      <span className="fld-lbl">성별</span>
      <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label={`${label} 성별`}>
        {(['male', 'female'] as const).map(g => (
          <button
            key={g} type="button" onClick={() => set({ gender: g })} aria-pressed={value.gender === g}
            className={`rounded-xl py-2.5 text-sm font-bold border transition-colors ${
              value.gender === g
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {g === 'male' ? '♂ 남자' : '♀ 여자'}
          </button>
        ))}
      </div>

      <label htmlFor={`${id}-year`} className="fld-lbl">생년월일</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['year', 'month', 'day'] as const).map(k => {
          const ph = k === 'year' ? '년' : k === 'month' ? '월' : '일';
          return (
            <input
              key={k} id={`${id}-${k}`} type="number" inputMode="numeric" value={value[k]}
              placeholder={ph} aria-label={`${label} ${ph}`}
              min={k === 'year' ? 1900 : 1} max={k === 'year' ? 2100 : k === 'month' ? 12 : 31}
              onChange={e => set({ [k]: e.target.value } as Partial<PersonInputValue>)}
              className="fld text-center font-bold tabular-nums"
            />
          );
        })}
      </div>

      <label htmlFor={`${id}-hour`} className="fld-lbl">태어난 시각</label>
      <select
        id={`${id}-hour`} className="fld fld-sel w-full" value={value.hour}
        onChange={e => set({ hour: e.target.value })}
      >
        <option value="">모름</option>
        {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => (
          <option key={h} value={h}>{h}시</option>
        ))}
      </select>
      <p className="fld-note">몰라도 됩니다 — 궁합은 일주(생일)가 중심이라 시각 없이도 나옵니다.</p>
    </div>
  );
}

interface PersonInputValue {
  year: string; month: string; day: string; hour: string; gender: 'male' | 'female';
}

const EMPTY: PersonInputValue = { year: '', month: '', day: '', hour: '', gender: 'male' };

/** 일주 한 칸 — 명식 전체가 아니라 궁합이 실제로 보는 자리만 낸다 */
function DayPillar({ name, p }: { name: string; p: Pillar }) {
  const stem = STEMS[p.stemIdx];
  const branch = BRANCHES[p.branchIdx];
  return (
    <div className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-4 text-center">
      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 truncate">{name}</p>
      <p className="ms-han">{stem.hanja}{branch.hanja}</p>
      <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">{stem.kor}{branch.kor}일주</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="ms-sub">
          <i className="ms-dot" style={{ background: ELEMENT_INFO[stem.element].color }} />
          {stem.kor} {stem.element}
        </span>
        <span className="ms-sub">
          <i className="ms-dot" style={{ background: ELEMENT_INFO[branch.element].color }} />
          {branch.kor} {branch.element}
        </span>
      </div>
    </div>
  );
}

export default function SajuMatchPage() {
  const [a, setA] = useState<PersonInputValue>(EMPTY);
  const [b, setB] = useState<PersonInputValue>(EMPTY);
  const [submitted, setSubmitted] = useState<[PersonInputValue, PersonInputValue] | null>(null);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    if (!submitted) return null;
    const toBirth = (p: PersonInputValue) => ({
      year: Number(p.year), month: Number(p.month), day: Number(p.day),
      hour: p.hour === '' ? null : Number(p.hour),
    });
    return matchSaju(toBirth(submitted[0]), submitted[0].gender, toBirth(submitted[1]), submitted[1].gender);
  }, [submitted]);

  function calculate() {
    for (const [p, who] of [[a, '첫 번째 사람'], [b, '두 번째 사람']] as const) {
      const y = Number(p.year), m = Number(p.month), d = Number(p.day);
      if (!y || !m || !d) { setError(`${who}의 생년월일을 모두 채워주세요.`); return; }
      if (y < 1900 || y > 2100) { setError(`${who}의 연도는 1900~2100 사이여야 합니다.`); return; }
      if (m < 1 || m > 12 || d < 1 || d > 31) { setError(`${who}의 월·일을 다시 확인해주세요.`); return; }
    }
    setError('');
    setSubmitted([a, b]);
    setTimeout(() => document.getElementById('match-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  const v = result ? matchGrade(result.total) : null;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-indigo-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">사주 궁합</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">사주 궁합</h1>
          <p className="page-lede">두 사람의 명식을 세워 일간·배우자궁·오행·십성 네 자리를 각각 봅니다.</p>
        </div>

        <form onSubmit={e => { e.preventDefault(); calculate(); }} className="flex flex-col gap-3 mb-4">
          <PersonInput id="p1" label="첫 번째 사람" value={a} onChange={setA} />
          <PersonInput id="p2" label="두 번째 사람" value={b} onChange={setB} />
          {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-sec text-white text-sm font-bold py-3.5 transition-all active:scale-[0.99]"
          >
            궁합 보기
          </button>
        </form>

        {result && v && (
          <div id="match-result" className="flex flex-col gap-4">
            <div className="result-card" style={{ '--grade': v.color } as React.CSSProperties}>
              <div className="flex items-stretch gap-2 mb-5">
                <DayPillar name="첫 번째 사람" p={result.a.day} />
                <DayPillar name="두 번째 사람" p={result.b.day} />
              </div>
              <p className="label-caps">궁합 점수</p>
              <p className="text-6xl font-bold leading-none tracking-tight mt-1" style={{ color: v.color }}>
                {result.total}<span className="text-2xl">점</span>
              </p>
              <p className="text-base font-bold mt-3">{v.label}</p>
            </div>

            {/* 네 자리를 각각 — 어디서 깎였는지 보이게 한다 */}
            <div className="flex flex-col gap-3">
              {result.axes.map(ax => {
                const meta = AXIS_META[ax.id];
                return (
                  <div key={ax.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">{meta.title}</h2>
                      <span className="text-xs font-bold tabular-nums text-sec shrink-0">{ax.score} / 5</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{meta.sub}</p>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-sec transition-all duration-700"
                        style={{ width: `${(ax.score / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{ax.note}</p>
                  </div>
                );
              })}
            </div>

            {result.bothMissing.length > 0 && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">둘 다 비어 있는 오행</p>
                <div className="flex flex-wrap gap-2">
                  {result.bothMissing.map(e => (
                    <span key={e} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                      <i className="ms-dot" style={{ background: ELEMENT_INFO[e].color }} />
                      {ELEMENT_INFO[e].label}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  두 사람 모두 이 기운이 없습니다. 서로 메워 줄 수 없는 자리라, 이쪽은 관계 밖에서 —
                  일이나 사는 곳, 함께 만나는 사람에서 — 채워지는 편입니다.
                </p>
              </div>
            )}

            <ShareButton
              title={`사주 궁합 ${result.total}점 — ${v.label}`}
              description="일간·배우자궁·오행·십성 네 자리로 본 두 사람의 궁합"
              type="fortune"
            />

            <CoupangAd />
          </div>
        )}

        {!result && (
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg">
              <ToolIcon emoji="☝️" className="h-6 w-6" />
            </span>
            <p className="text-sm">두 사람의 생년월일을 넣으면 궁합이 나옵니다</p>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">사주 궁합은 무엇을 보나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            명리에서 두 사람을 견줄 때 실제로 짚는 자리는 넷입니다.
            태어난 날의 천간인 <strong className="text-slate-800 dark:text-slate-100">일간</strong>은 그 사람 자신을 뜻해서,
            두 일간이 서로를 낳으면(상생) 흐름이 순하고 서로를 치면(상극) 부딪히되 다듬어 줍니다.
            태어난 날의 지지인 <strong className="text-slate-800 dark:text-slate-100">일지</strong>는 배우자궁이라 부르는 가장 가까운 자리로,
            여기가 <strong className="text-slate-800 dark:text-slate-100">육합</strong>이면 서로 끌리고 <strong className="text-slate-800 dark:text-slate-100">충</strong>이면 자주 어긋납니다.
            여덟 글자에 담긴 <strong className="text-slate-800 dark:text-slate-100">오행</strong>은 한쪽에 없는 기운을 다른 쪽이 갖고 있을 때 «맞는다»고 하고,
            <strong className="text-slate-800 dark:text-slate-100">십성</strong>은 상대의 일간이 내 사주에서 무엇이 되는지를 봅니다.
            이 계산기는 그 넷을 각각 점수로 내고 총점은 가중합입니다 — 어디서 깎였는지 보이게 하려는 것입니다.
            물론 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>이에요.
            점수가 낮게 나와도 두 사람을 정하는 건 태어난 날이 아니라 서로를 대하는 태도입니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/saju-match']} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
