import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CubeTop from '@/components/cube/CubeTop';
import { LANGS, langPrefix, type Lang } from '@/lib/i18n/lang';
import { CUBE_ICON, algOf, algsOfStep } from '@/lib/cube/list';
import { caseFacts, diagram } from '@/lib/cube/facts';
import { reverseAlg } from '@/lib/cube/sim';
import { CUBE_UI } from '@/lib/cube/ui';

/** 이웃 여덟 개 — 같은 단계 안에서 앞뒤로 자른다 */
function siblings(slug: string) {
  const item = algOf(slug)!;
  const all = algsOfStep(item.step);
  const i = all.findIndex(a => a.slug === slug);
  const from = Math.max(0, Math.min(i - 4, all.length - 9));
  return all.slice(from, from + 9).filter(a => a.slug !== slug);
}

/**
 * 공식 한 장 — 그림 하나, 공식 한 줄, 역순 한 줄.
 *
 * 큐브를 손에 들고 보는 화면이라 공식이 가장 크고, 나머지는 아래로 내린다.
 */
export default function CubePage({ slug, lang }: { slug: string; lang: Lang }) {
  const item = algOf(slug);
  if (!item) return null;
  const f = caseFacts(item);
  const ui = CUBE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/game/cube`;
  const path = `${hub}/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const faq = ui.caseFaq(f);

  const rows: [string, string][] = [
    [ui.stepTitle, ui.stepLabel[item.step]],
    ...(f.shape ? ([[ui.shapeTitle, `${ui.shapeLabel[f.shape]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
    ...(f.moving ? ([[ui.movingTitle, `${ui.movingLabel[f.moving]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
    ...(f.place ? ([[ui.placeTitle, `${ui.placeLabel[f.place]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: item.label, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-rose-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{item.label}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-500 to-rose-500">
            <ToolIcon emoji={CUBE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{item.label}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 mb-4">
          <CubeTop state={diagram(f)} slot={item.step === 'f2l'} label={item.label} className="w-full max-w-[220px] mx-auto" />
        </div>

        <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-4 py-4 mb-4">
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">{ui.algLabel}</div>
          <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 font-mono leading-snug break-words">{item.alg}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={v} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right">{v}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
            <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{ui.reverseLabel}</dt>
            <dd className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono text-right break-words">{reverseAlg(item.alg)}</dd>
          </div>
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.siblingTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {siblings(slug).map(o => {
              const of_ = caseFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <CubeTop state={diagram(of_)} slot={o.step === 'f2l'} label={o.label} className="w-full max-w-[84px] mx-auto" />
                  <div className="mt-1.5 text-center text-[11px] font-black text-slate-700 dark:text-slate-200">{o.label}</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(x => x.lang !== lang).map(x => (
            <Link key={x.lang} href={`${x.prefix}/game/cube/${slug}`} hrefLang={x.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {x.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
