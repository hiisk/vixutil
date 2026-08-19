import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import Board from '@/components/chess/Board';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { OPENINGS } from '@/lib/chess/list';
import { groupCounts, groupOf, openingFacts, type Group } from '@/lib/chess/facts';
import { fullName } from '@/lib/chess/names';
import { chessUi, fill } from '@/lib/chess/ui';
import LangPicker from '@/components/LangPicker';

const GROUP_ORDER: Group[] = ['open', 'semiopen', 'closed', 'indian', 'flank'];

/**
 * 오프닝 목록 — 갈래 다섯으로 나누고 그 안에서는 수순이 짧은 것부터 둔다.
 *
 * 목록에는 판 그림을 싣지 않는다. 174장을 다 그리면 HTML이 몇백 KB로 불어난다.
 * 대신 맨 위에 첫 수 네 개의 자리만 보여 주고, 나머지는 수순 글자로 둔다 —
 * 수순은 어느 언어에서나 같은 글자라 목록을 훑는 데는 그림보다 빠르다.
 */
export default function ChessHubPage({ lang }: { lang: Lang }) {
  const ui = chessUi(lang);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/game/chess`;
  // 바닥글과 FAQ 제목은 그 언어 그대로 — 중국어 페이지에 영어 바닥글이 붙지 않게 한다
  const base = localeOfLang(lang);
  const counts = groupCounts();
  const n = OPENINGS.length;

  const openers = ['e4', 'd4', 'c4', 'Nf3'].map(move => {
    const sample = OPENINGS.find(x => x.moves[0] === move && x.moves.length === 1)
      ?? OPENINGS.find(x => x.moves[0] === move)!;
    const f = openingFacts(sample);
    return { move, board: f.frames[1], count: OPENINGS.filter(x => x.moves[0] === move).length, slug: sample.slug };
  });

  const faq = [
    { q: ui.hq1, a: fill(ui.ha1, { n, ...counts }) },
    { q: ui.hq2, a: ui.ha2 },
    { q: ui.hq3, a: ui.ha3 },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          fill(ui.hubTitle, { n }),
          path,
          OPENINGS.map(x => ({ name: fullName(x.family, x.line, lang), path: `${path}/${x.slug}` })),
        )}
      />

      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/game/chess`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <h1 className="page-h1">
            {fill(ui.hubTitle, { n })}
          </h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {/* 첫 수 네 개 — 판이 어떻게 시작하는지만 보여 준다 */}
        <section className="mb-8">
          <h2 className="sec-h2">{ui.byFirstMove}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {openers.map(o => (
              <Link prefetch={false} key={o.move} href={`${path}/${o.slug}`} className="group flex flex-col items-center gap-1.5">
                <Board board={o.board} size={140} label={`1.${o.move}`} />
                <span className="font-mono text-sm font-black text-slate-700 dark:text-slate-200 group-hover:text-sec transition-colors">
                  1.{o.move}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{fill(ui.countLabel, { n: o.count })}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="sec-h2">{ui.byGroup}</h2>
          {GROUP_ORDER.map(group => {
            const rows = OPENINGS.filter(x => groupOf(x.moves) === group)
              .sort((a, b) => a.moves.length - b.moves.length || a.slug.localeCompare(b.slug));
            return (
              <div key={group} className="mb-7">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-black text-violet-700 dark:text-violet-400">{ui.group[group]}</h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">{fill(ui.countLabel, { n: counts[group] })}</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 leading-relaxed">{ui.groupNote[group]}</p>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                  {rows.map(x => (
                    <Link prefetch={false}
                      key={x.slug}
                      href={`${path}/${x.slug}`}
                      className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{fullName(x.family, x.line, lang)}</span>
                      <span className="ml-auto shrink-0 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                        {x.moves.slice(0, 5).join(' ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <Faq items={faq} lang={base} title={ui.faq} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/game/chess`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
