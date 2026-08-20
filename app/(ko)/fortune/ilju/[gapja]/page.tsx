import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import PageGlow from '@/components/PageGlow';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
import { GAPJA, ILJU_BY_SLUG, iljuInfo } from '@/lib/ilju';
import { ELEMENT_INFO } from '@/lib/saju-data';

/**
 * 일주 한 장.
 *
 * 해석 글(ILJU_READINGS)만 얹으면 다른 사이트와 다를 게 없다. 이미 있는
 * 계산으로 붙일 수 있는 것을 함께 낸다 — 일간의 오행·성격, 일지의 동물·계절,
 * 그 짝의 십이운성, 공망, 그리고 같은 일간의 다른 다섯 일주.
 * 전부 데이터에서 나오므로 예순 장이 저절로 서로 다르다.
 */

export function generateStaticParams() {
  return prerender(GAPJA.map(g => ({ gapja: g.slug })));
}

export const dynamicParams = true;
export const revalidate = false;

export async function generateMetadata(
  { params }: { params: Promise<{ gapja: string }> },
): Promise<Metadata> {
  const { gapja } = await params;
  const g = ILJU_BY_SLUG.get(gapja);
  if (!g) return {};
  const i = iljuInfo(g.key)!;
  return withCard({
    title: `${i.key}일주 - ${i.hanja} 성격과 특징`,
    description: `${i.key}일주(${i.hanja})의 성격, 일간 ${i.stem.kor}(${i.stem.element})과 일지 ${i.branch.kor}(${i.branch.element})의 관계, 십이운성 ${i.unseong}, 공망까지 풀이합니다.`,
    alternates: { canonical: `/fortune/ilju/${gapja}` },
  });
}

export default async function IljuPage({ params }: { params: Promise<{ gapja: string }> }) {
  const { gapja } = await params;
  const g = ILJU_BY_SLUG.get(gapja);
  if (!g) notFound();
  const i = iljuInfo(g.key)!;

  /* 같은 일간의 다른 다섯 — 「갑자일주」를 본 사람은 대개 다른 갑도 궁금해한다 */
  const siblings = GAPJA.filter(x => x.stemIdx === i.stemIdx && x.slug !== i.slug).map(x => iljuInfo(x.key)!);
  /* 같은 일지의 다른 넷 — 앉은 자리가 같은 사람들 */
  const sameSeat = GAPJA.filter(x => x.branchIdx === i.branchIdx && x.slug !== i.slug).map(x => iljuInfo(x.key)!);

  const stemEl = ELEMENT_INFO[i.stem.element];
  const branchEl = ELEMENT_INFO[i.branch.element];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '일주 60가지', path: '/fortune/ilju' },
        { name: `${i.key}일주`, path: `/fortune/ilju/${i.slug}` },
      ])} />
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune/ilju" className="page-back hover:text-indigo-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            일주 60가지
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{i.key}일주</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">{i.key}일주</h1>
          <p className="page-lede">
            {i.hanja} — 일간 {i.stem.kor}({i.stem.element})이 일지 {i.branch.kor}({i.branch.element}) 위에 앉은 자리입니다.
          </p>
        </div>

        <div className="result-card">
          <p className="text-5xl font-bold tracking-tight leading-none">{i.hanja}</p>
          <p className="mt-3 flex items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <i className="ms-dot" style={{ background: stemEl.color }} />
              {i.stem.kor} {i.stem.element}
            </span>
            <span className="text-slate-500 dark:text-slate-400">·</span>
            <span className="inline-flex items-center gap-1.5">
              <i className="ms-dot" style={{ background: branchEl.color }} />
              {i.branch.kor} {i.branch.element} {i.branch.animal}
            </span>
          </p>
          <p className="mt-3 text-sm">
            십이운성 <strong className="text-slate-900 dark:text-white">{i.unseong}</strong>
            <span className="inline-flex gap-0.5 ml-2 align-middle" aria-label={`세기 ${i.unseongPower}`}>
              {[1, 2, 3, 4, 5].map(n => (
                <i key={n} className={`inline-block h-1.5 w-1.5 rounded-full ${
                  n <= i.unseongPower ? 'bg-sec' : 'bg-slate-200 dark:bg-slate-700'}`} />
              ))}
            </span>
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{i.key}일주의 성격</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{i.reading}</p>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">앉은 자리와의 관계</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{i.relation}</p>
          <p className="mt-3 note-xs">
            일지는 배우자궁이기도 합니다 — 일간과 일지의 관계를 «나와 가장 가까운 사람과의 결»로도 읽습니다.
          </p>
        </div>

        <Ad />

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">일간 {i.stem.kor}({i.stem.hanja})</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{i.stem.personality}</p>
          <div className="kv-table mt-3">
            <div className="kv-row"><span>성질</span><span>{i.stem.nature}</span></div>
            <div className="kv-row"><span>맞는 일</span><span>{i.stem.aptitude}</span></div>
            <div className="kv-row"><span>행운 색</span><span>{i.stem.luckyColor}</span></div>
            <div className="kv-row"><span>행운 방향</span><span>{i.stem.luckyDirection}</span></div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">공망 {i.gongmang[0]}·{i.gongmang[1]}</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {i.key}일주가 속한 순(旬)에서 비는 지지는 <strong className="text-slate-900 dark:text-white">{i.gongmang[0]}·{i.gongmang[1]}</strong>입니다.
            육십갑자를 열씩 끊으면 지지는 열둘이라 순마다 둘이 남는데, 그 둘을 공망이라 하고 «있어도 없는 것처럼» 봅니다.
            사주에 이 자리가 있으면 그 자리가 뜻하는 것(재물·관계·자리)이 손에 잡히지 않는다고 읽습니다.
          </p>
        </div>

        <div className="mt-8">
          <p className="label-caps mb-3">같은 일간의 다른 일주</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {siblings.map(s => (
              <Link key={s.slug} prefetch={false} href={`/fortune/ilju/${s.slug}`}
                className="group rounded-xl border chip-off px-3.5 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">{s.key}일주</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{s.hanja} · {s.unseong}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="label-caps mb-3">앉은 자리가 같은 일주</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sameSeat.map(s => (
              <Link key={s.slug} prefetch={false} href={`/fortune/ilju/${s.slug}`}
                className="group rounded-xl border chip-off px-3.5 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">{s.key}일주</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{s.hanja} · {s.unseong}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="bg-sec-soft mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md align-middle">
              <ToolIcon emoji="🔯" className="h-3.5 w-3.5" />
            </span>{' '}
            내 일주를 모르면{' '}
            <Link href="/fortune/saju" className="text-sec font-bold">사주 분석</Link>에 생년월일을 넣으면 나옵니다.
            일주만으로 보는 것은 여덟 글자 가운데 둘이라, 나머지 여섯을 함께 봐야 전체가 잡힙니다.
            이 풀이는 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>입니다.
          </p>
        </div>
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
