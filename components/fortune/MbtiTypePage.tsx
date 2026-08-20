import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import PageGlow from '@/components/PageGlow';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { MBTI_TYPES, type MbtiType } from '@/lib/mbti-match';
import { LETTER, matchesOf, oppositeOf, slugOf, stackOf, temperamentOf } from '@/lib/mbti/facts';
import { PROFILES } from '@/lib/mbti/profiles';
import { MBTI_TYPES as MBTI_META } from '@/lib/fortune-data';

/**
 * MBTI 한 유형.
 *
 * ── 다른 데와 무엇이 다른가 ────────────────────────────────
 * 「INFP 특징」으로 만나는 글은 대개 별명과 형용사 몇 줄이다. 여기서는
 * 계산으로 나오는 것을 앞세운다 — 인지기능 넷의 순서와 자리, 열여섯과의
 * 궁합, 글자별로 무엇이 갈리는지, 기능이 하나도 안 겹치는 정반대 유형.
 * 전부 네 글자에서 나오므로 열여섯 장이 저절로 서로 다르다.
 *
 * 손으로 적은 글은 lib/mbti/profiles.ts에만 있다. 여기서 또 적으면 두 곳이
 * 갈리고 한쪽만 고쳐진 채 남는다.
 */
export default function MbtiTypePage({ type }: { type: MbtiType }) {
  const p = PROFILES[type];
  const meta = MBTI_META.find(m => m.id === type)!;
  const stack = stackOf(type);
  const temp = temperamentOf(type);
  const opp = oppositeOf(type);
  const matches = matchesOf(type);
  const best = matches.filter(m => m.b !== type).slice(0, 3);
  const hard = matches.filter(m => m.b !== type).slice(-3).reverse();
  const siblings = MBTI_TYPES.filter(t => t !== type && temperamentOf(t).key === temp.key);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: 'MBTI', path: '/fortune/mbti' },
        { name: type, path: `/fortune/mbti/${slugOf(type)}` },
      ])} />
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune/mbti" className="page-back hover:text-sec">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            MBTI
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{type}</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="label-caps">{temp.label}</p>
          <h1 className="page-h1">{type} — {p.line}</h1>
          <p className="page-lede">{meta.nickname} · {meta.trait}</p>
        </div>

        {/* 네 글자가 각각 무엇을 가르는가 — 계산으로 나온다 */}
        <div className="grid grid-cols-4 gap-2">
          {type.split('').map((c, i) => (
            <div key={i} className="rounded-xl border chip-off px-2.5 py-3 text-center">
              <span className="block text-xl font-bold text-slate-900 dark:text-white">{c}</span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{LETTER[c].label}</span>
            </div>
          ))}
        </div>
        <div className="kv-table mt-2">
          {type.split('').map((c, i) => (
            <div key={i} className="kv-row">
              <span>{LETTER[c].axis}</span>
              <span>{LETTER[c].what}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">어떤 사람인가</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{p.summary}</p>
        </div>

        <Ad />

        {/* 유형을 가르는 뼈대 — 다른 데서는 잘 안 나오고, 나와도 손으로 적어 틀린다 */}
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">인지기능 {stack.map(s => s.code).join(' · ')}</h2>
          <p className="note-xs mb-3">
            네 글자는 이 순서를 가리키는 이름표입니다. 같은 기능이라도 몇 번째 자리에 있느냐로 다르게 읽습니다.
          </p>
          <div className="flex flex-col gap-3">
            {stack.map(s => (
              <div key={s.code} className="border-l-2 border-[var(--c-sec)] pl-3">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {s.slot} <span className="text-sec">{s.code}</span> <span className="font-medium text-slate-500 dark:text-slate-400">{s.name}</span>
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{s.what}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{s.looks}</p>
                <p className="note-xs mt-0.5">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">잘하는 것</h2>
            <ul className="flex flex-col gap-2">
              {p.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">걸리는 것</h2>
            <ul className="flex flex-col gap-2">
              {p.pitfalls.map((s, i) => (
                <li key={i} className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            지칠 때 — 열등기능 {stack[3].code}
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{p.stress}</p>
        </div>

        <div className="mt-4 kv-table">
          <div className="kv-row"><span>일</span><span>{p.work}</span></div>
          <div className="kv-row"><span>가까운 사이</span><span>{p.love}</span></div>
        </div>

        <section className="mt-8">
          <p className="label-caps mb-3">잘 맞는 유형</p>
          <div className="grid grid-cols-1 gap-2">
            {best.map(m => (
              <Link key={m.b} prefetch={false} href={`/fortune/mbti/${slugOf(m.b)}`}
                className="group rounded-xl border chip-off px-4 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">{m.b}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{m.info.label}</span>
                  <span className="ml-auto text-sm font-bold text-sec tabular-nums">{m.score}</span>
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{PROFILES[m.b].line}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="label-caps mb-3">맞춰 가야 하는 유형</p>
          <div className="grid grid-cols-1 gap-2">
            {hard.map(m => (
              <Link key={m.b} prefetch={false} href={`/fortune/mbti/${slugOf(m.b)}`}
                className="group rounded-xl border chip-off px-4 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">{m.b}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{m.info.label}</span>
                  <span className="ml-auto text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums">{m.score}</span>
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{PROFILES[m.b].line}</span>
              </Link>
            ))}
          </div>
          <p className="note-xs mt-2">
            열여섯 전부와의 궁합은 <Link href="/fortune/mbti-match" className="text-sec font-bold">MBTI 궁합</Link>에서 봅니다.
          </p>
        </section>

        <section className="mt-6">
          <p className="label-caps mb-3">같은 {temp.label} — {temp.note}</p>
          <div className="grid grid-cols-3 gap-2">
            {siblings.map(t => (
              <Link key={t} prefetch={false} href={`/fortune/mbti/${slugOf(t)}`}
                className="group rounded-xl border chip-off px-3 py-3 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">{t}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">정반대 유형 {opp}</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            네 글자가 모두 반대라 인지기능이 하나도 겹치지 않습니다({stackOf(opp).map(s => s.code).join(' · ')}).
            그래서 이해하기 가장 어렵고, 그만큼 내가 안 쓰는 자리를 보여 주는 유형이기도 합니다.
          </p>
          <Link prefetch={false} href={`/fortune/mbti/${slugOf(opp)}`} className="mt-3 inline-block text-sm font-bold text-sec">
            {opp} 보기 →
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="bg-sec-soft mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md align-middle">
              <ToolIcon emoji="🧭" className="h-3.5 w-3.5" />
            </span>{' '}
            내 유형을 모르면 <Link href="/test/mbti" className="text-sec font-bold">MBTI 검사</Link>로 확인하고,{' '}
            <Link href="/fortune/mbti" className="text-sec font-bold">오늘의 MBTI 운세</Link>도 볼 수 있습니다.
            MBTI는 사람을 열여섯으로 나누는 <strong className="text-slate-800 dark:text-slate-100">참고 틀</strong>이지 진단이 아닙니다.
          </p>
        </div>
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
