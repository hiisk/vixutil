import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PeriodicTable from '@/components/element/PeriodicTable';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { elementOf } from '@/lib/element/list';
import { elementFacts, neighbours, sameGroup } from '@/lib/element/facts';
import { nameOf } from '@/lib/element/names';
import { ELEMENT_UI } from '@/lib/element/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 원소 한 장 — 카드 한 장과 표에서의 자리.
 *
 * 주기율표 칸을 크게 그려 두면 기호와 번호와 원자량이 한눈에 들어온다.
 * 표 전체도 함께 두어, 이 원소가 어디에 앉아 있는지 보이게 한다.
 */
export default function ElementPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = elementOf(slug);
  if (!x) return null;
  const f = elementFacts(x);
  const ui = ELEMENT_UI[lang];
  const name = nameOf(x.z, lang);
  const category = ui.categoryLabel[f.category];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/element`;
  const path = `${hub}/${x.z}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const faq = ui.elementFaq(f, name, category);

  const rows: [string, string][] = [
    [ui.numberLabel, String(f.z)],
    [ui.massLabel, ui.fmt(f.mass)],
    [ui.periodLabel, ui.periodValue(f.period)],
    [ui.groupLabel, f.group ? ui.groupValue(f.group) : ui.groupNone],
    [ui.blockTitle, ui.blockLabel[f.block]],
    [ui.configLabel, f.shortConfig],
    ...(f.valence !== null ? ([[ui.valenceLabel, String(f.valence)]] as [string, string][]) : []),
    [ui.neutronLabel, String(f.neutrons)],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: name, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-600 to-sky-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{name}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/element/${x.z}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 주기율표 칸을 그대로 키운 카드 */}
        <div className="mx-auto mb-5 w-40 rounded-2xl border-2 border-cyan-400 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">{f.z}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight my-1">{x.symbol}</div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{name}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums mt-0.5">{ui.fmt(f.mass)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{name}</h1>
          <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-2">{category}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f, name)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.categoryNote[f.category]}
        </p>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <PeriodicTable path={hub} current={x.z} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.sameGroupTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {sameGroup(x.z).map(o => (
              <Link
                key={o.z}
                href={`${hub}/${o.z}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {o.symbol} · {nameOf(o.z, lang)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(x.z).map(o => (
              <Link
                key={o.z}
                href={`${hub}/${o.z}`}
                className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[26px] text-right">{o.z}</span>
                <span className="text-sm font-black text-cyan-700 dark:text-cyan-400 font-mono shrink-0 w-[34px]">{o.symbol}</span>
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{nameOf(o.z, lang)}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/element/${x.z}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
