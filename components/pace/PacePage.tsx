import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PaceTable from '@/components/pace/PaceTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { paceOf } from '@/lib/pace/list';
import { GOALS, goalsMet, neighbours, paceFacts } from '@/lib/pace/facts';
import { PACE_UI } from '@/lib/pace/ui';

/**
 * 페이스 한 장 — 완주 시간이 맨 앞이다.
 *
 * 이 페이지를 여는 사람은 손목에 그 숫자를 띄워 놓고 있다. 궁금한 것은 "그래서
 * 몇 시간에 들어오느냐"다.
 */
export default function PacePage({ slug, lang }: { slug: string; lang: Lang }) {
  const sec = paceOf(slug);
  if (sec === undefined) return null;
  const f = paceFacts(sec);
  const ui = PACE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/pace`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const met = new Set(goalsMet(sec).map(g => g.key));

  const rows: [string, string][] = [
    [ui.speedLabel, `${f.kmh} km/h`],
    [ui.msLabel, `${f.ms} m/s`],
    [ui.mileLabel, f.mileText],
    [ui.lapLabel, f.lapText],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.label} /km`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-700 to-emerald-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.label} /km</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/pace/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-teal-400 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.label}</div>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">/km · {f.kmh} km/h</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.finishTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.finishNote}</p>
          <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.finishes.map(r => (
              <div key={r.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{ui.raceName(r.key)}</dt>
                <dd className="text-base font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.goalTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.goalNote}</p>
          <div className="flex flex-wrap gap-1.5">
            {GOALS.map(g => (
              <span
                key={g.key}
                className={[
                  'rounded-lg px-2.5 py-1 text-xs font-bold',
                  met.has(g.key)
                    ? 'border border-teal-300 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500',
                ].join(' ')}
              >
                {ui.goalName(g.key)} · {met.has(g.key) ? ui.metTag : ui.missTag}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <PaceTable path={hub} paces={[...neighbours(sec), sec].sort((a, b) => a - b)} current={sec} head={[ui.paceLabel, ui.raceName('half'), ui.raceName('full')]} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.distanceTitle}</h2>
          <p className="note-xs">{ui.distanceNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.paceFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/pace/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
