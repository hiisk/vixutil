'use client';
/* 클라이언트 컴포넌트인 까닭은 components/CityTimePage.tsx 머리말과 같다 */
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { timeCountry, type TimeCity } from '@/lib/time/cities8';
import { TIME_UI } from '@/lib/time/ui';
import { PAIR_UI } from '@/lib/time/pair-ui';
import { pairFacts, pairSlug, neighborPairs } from '@/lib/time/pair-grid';

const hh = (h: number, m = 0) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

/**
 * 도시 쌍 시차 한 장 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 시차가 먼저다. 이 화면에 오는 사람은 "서울 뉴욕 시차"를 알고 싶어 들어오고,
 * 서머타임 규칙과 24시간 표는 그 뒤에 읽을 거리다.
 *
 * 현재 시각은 그리지 않는다 — 여는 날마다 달라지면 ISR 캐시가 매번 다시 쓰이고
 * 서버와 브라우저가 어긋난다. 시간대의 성질만 담는 것이 lib/time/facts.ts와 같은
 * 판단이다. 지금 몇 시인지는 도시 낱장으로 건너가면 시계가 있다.
 */
export default function TimePairPage({ a, b, lang }: { a: TimeCity; b: TimeCity; lang: Lang }) {
  const ui = TIME_UI[lang];
  const px = PAIR_UI[lang];
  const f = pairFacts(a, b);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/time`;
  const slug = pairSlug(a, b);
  const path = `${prefix}/time/${slug}`;
  const base = localeOfLang(lang);

  const nameA = a.name[lang], nameB = b.name[lang];
  const dur = (min: number) => px.dur(Math.floor(Math.abs(min) / 60), Math.abs(min) % 60);
  const winter = dur(f.winterMinutes);
  const summer = dur(f.summerMinutes);
  const headline = f.aAhead === null
    ? px.same(nameA, nameB)
    : px.ahead(f.aAhead ? nameA : nameB, f.aAhead ? nameB : nameA, winter);

  const dstWho = f.aDst && f.bDst ? null : f.aDst ? px.dstWho(nameA) : f.bDst ? px.dstWho(nameB) : px.dstNeither;

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: ui.home, path: homeHref },
        { name: ui.section, path: `${prefix}/time` },
        { name: px.title(nameA, nameB), path },
      ])} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-sky-600 shrink-0">{ui.home}</Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/time`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/time/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
          {px.title(nameA, nameB)}
        </h1>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 p-6 text-white">
          <p className="text-4xl font-black leading-none">
            {f.winterMinutes === 0 ? px.noGap : winter}
          </p>
          <p className="mt-2 text-sm text-sky-100">{headline}</p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">{px.dstTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {f.shifts ? px.dstShifts(winter, summer) : px.dstStable}
            {dstWho ? ` ${dstWho}` : ''}
          </p>
          <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {/* hover 색은 .row-pair:hover가 --c-sec으로 이미 그린다 — 두 번 적혀 있었다 */}
            {[a, b].map(c => (
              <Link prefetch={false} key={c.slug} href={`${prefix}/time/${c.slug}`}
                className="row-pair">
                <span className="row-label">
                  {timeCountry(c.country)?.flag} {c.name[lang]}
                </span>
                <span className="val text-sm">{c.zone}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{px.overlapTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {f.overlap.length > 0
              ? px.overlapText(nameA, nameB, f.overlap[0], f.overlap[f.overlap.length - 1] + 1, f.overlap.length)
              : px.overlapNone(nameA, nameB)}
          </p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{px.clockTitle(nameA, nameB)}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* 겹치는 업무시간 — 스물네 줄 가운데 「회의를 잡을 수 있는 줄」이다.
                    bg-sky-50은 줄 사이 구분선보다도 옅어서 표에 파묻혀 있었다 */}
                {f.clock.map(c => (
                  <tr key={c.aHour} className={f.overlap.includes(c.aHour) ? 'row-now' : ''}>
                    <th scope="row" className="text-left px-4 py-2 font-bold text-slate-500 dark:text-slate-400 w-1/2 tabular-nums">
                      {hh(c.aHour)}
                    </th>
                    <td className="px-4 py-2 font-black text-slate-800 dark:text-slate-100 tabular-nums">
                      {hh(c.bHour, c.bMinute)}
                      {c.dayDelta !== 0 && (
                        <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                          {c.dayDelta < 0 ? px.prevDay : px.nextDay}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 note-xs">{px.clockNote}</p>
        </section>

        <Faq
          items={px.faq(nameA, nameB, winter, summer, f.shifts, f.overlap.length)}
          lang={base}
          title={ui.faqTitle}
        />

        <section className="mt-8">
          <h2 className="sec-h2">{px.neighborsTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborPairs(a, b).map(p => (
              <Link prefetch={false} key={pairSlug(p.a, p.b)} href={`${prefix}/time/${pairSlug(p.a, p.b)}`}
                className="chip-v">
                {p.a.name[lang]} · {p.b.name[lang]}
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/time/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
