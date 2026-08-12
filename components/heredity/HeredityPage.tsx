import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import HeredityList from '@/components/heredity/HeredityList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, labelOf, typeOf } from '@/lib/heredity/list';
import { atParents, heredityFacts } from '@/lib/heredity/facts';
import { HEREDITY_UI } from '@/lib/heredity/ui';

export default function HeredityPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = heredityFacts(c);
  const ui = HEREDITY_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/heredity`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const trio = `${labelOf(f.father)} × ${labelOf(f.mother)} → ${labelOf(f.child)}`;

  const names = (keys: string[]) =>
    keys.length ? keys.map(k => labelOf(typeOf(k)!)).join(' · ') : ui.noneLabel;

  const rows: [string, string][] = [
    [ui.fatherLabel, labelOf(f.father)],
    [ui.motherLabel, labelOf(f.mother)],
    [ui.childLabel, labelOf(f.child)],
    [ui.chanceLabel, f.chanceText],
    [ui.possibleLabel, names(f.possibleChildren)],
    [ui.impossibleLabel, names(f.impossibleChildren)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: trio, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-900 to-fuchsia-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{trio}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/heredity/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div
          className={`mx-auto mb-5 w-72 rounded-2xl border-2 px-4 py-5 text-center shadow-lg ${
            f.possible
              ? 'border-violet-400 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/40'
              : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60'
          }`}
        >
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate">
            {labelOf(f.father)} × {labelOf(f.mother)}
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">
            {labelOf(f.child)}
          </div>
          <div className={`mt-1 text-sm font-bold ${f.possible ? 'text-violet-700 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}>
            {f.possible ? ui.verdictYes : ui.verdictNo}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {/*
          ── 칸마다 갈리는 설명 (2026-08-12) ──────────────────────
          전에는 낱장 512장이 형제끼리 낱말 95.9%가 같았다. 고유 낱말 357개 중
          다른 것이 여섯 개뿐이었고 그 여섯이 전부 숫자였다 — 글이 짧아서가
          아니라 문장이 틀에서 나와 같았다.

          여기 오는 문장은 facts.ts의 reasonKeys가 이 칸의 구조에서 뽑은 갈래에
          따라 달라진다(512칸 → 열넷의 조합). 유전 규칙에서 나오는 것만 말하므로
          지어낸 문장이 아니다.
        */}
        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.reasonsTitle}</h2>
          <ul className="flex flex-col gap-2">
            {ui.reasons(f).map((line, i) => (
              <li
                key={i}
                className="rounded-xl border border-violet-200/70 dark:border-violet-900/50 bg-violet-50/50 dark:bg-violet-950/25 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.routesTitle}</h2>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.routesNote(f)}</p>
          {f.routes.length > 0 && (
            <ul className="list-card">
              {f.routes.map(r => (
                <li key={`${r.father}|${r.mother}`} className="flex items-baseline justify-between gap-3 px-4 py-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                    {ui.fatherLabel} {r.father} · {ui.motherLabel} {r.mother}
                  </span>
                  <span className="cell-num shrink-0">{r.numerator}/{r.denominator}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.parentsTitle}</h2>
          <HeredityList
            cells={atParents(c.father, c.mother)}
            path={hub}
            yes={ui.verdictYes}
            no={ui.verdictNo}
            current={slug}
          />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.swapTitle}</h2>
          <p className="mb-3 note-xs">{ui.swapNote}</p>
          <HeredityList
            cells={[{ father: c.mother, mother: c.father, child: c.child }]}
            path={hub}
            yes={ui.verdictYes}
            no={ui.verdictNo}
          />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.punnettTitle}</h2>
          <p className="note-xs">{ui.punnettNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rhTitle}</h2>
          <p className="note-xs">{ui.rhNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.exceptionTitle}</h2>
          <p className="note-xs">{ui.exceptionNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.proofTitle}</h2>
          <p className="note-xs">{ui.proofNote}</p>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/heredity/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
