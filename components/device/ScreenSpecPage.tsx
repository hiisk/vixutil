import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import ScreenShape from '@/components/device/ScreenShape';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { screen } from '@/lib/device/screens';
import { screenFacts, similarScreens } from '@/lib/device/facts';
import { DEVICE_UI } from '@/lib/device/ui';
import { SCREEN_ICON, screenView } from '@/lib/device/route';
import LangPicker from '@/components/LangPicker';

/**
 * 화면 규격 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위에 실제 비율로 그린 화면과 세 숫자(해상도·인치·밀도)를 놓는다. 이 화면에
 * 오는 사람은 "아이폰 16 Pro 해상도"를 알고 싶어 들어오고, 픽셀 크기나 화면 넓이는
 * 그 뒤에 읽을 거리다.
 */
export default function ScreenSpecPage({ slug, lang }: { slug: string; lang: Lang }) {
  const sc = screen(slug);
  const v = screenView(slug);
  if (!sc || !v) return null;

  const ui = DEVICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/device/screen`;
  const path = `${prefix}/device/screen/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const similar = similarScreens(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.resolution, value: `${v.w} × ${v.h}` },
    { label: ui.klass, value: v.className },
    { label: ui.diagonal, value: ui.inchUnit(v.inch) },
    { label: ui.density, value: `${v.ppi} ppi` },
    { label: ui.ratio, value: v.ratioLabel === v.ratio ? v.ratioLabel : `${v.ratioLabel} (${v.ratio})` },
    { label: ui.pixels, value: `${v.pixels.toLocaleString(base)} · ${ui.mpUnit(v.megapixels)}` },
    { label: ui.physical, value: `${v.widthMm} × ${v.heightMm} mm` },
    { label: ui.area, value: `${v.areaIn2} in²` },
    { label: ui.pitch, value: `${v.pixelUm} µm` },
    { label: ui.retina, value: ui.cmUnit(v.retinaCm) },
    { label: ui.orientation, value: v.portrait ? ui.portrait : ui.landscape },
    ...(sc.year ? [{ label: ui.released, value: String(sc.year) }] : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/device/screen` },
          { name: sc.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(sc.name, ui.metaDesc(v), path)} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-indigo-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/device/screen`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/device/screen/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-sky-400 to-indigo-500">
            <ToolIcon emoji={SCREEN_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{sc.name}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {ui.kindLabel[sc.kind]} · {v.className}
            {sc.year ? ` · ${sc.year}` : ''}
          </p>
        </div>

        {/* 세 숫자가 이 화면의 전부다 — 나머지는 여기서 파생된다 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { k: ui.resolution, val: `${v.w}×${v.h}` },
            { k: ui.diagonal, val: ui.inchUnit(v.inch) },
            { k: ui.density, val: `${v.ppi}` , unit: 'ppi' },
          ].map(x => (
            <div key={x.k} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-3 text-center">
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 truncate">{x.k}</p>
              <p className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 tabular-nums mt-1 break-all">
                {x.val}
                {x.unit ? <span className="text-[11px] font-bold text-slate-400 ml-0.5">{x.unit}</span> : null}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-5 mb-6 flex justify-center">
          <ScreenShape
            ratio={v.ratioValue}
            portrait={v.portrait}
            diagonal={ui.inchUnit(v.inch)}
            widthLabel={`${v.widthMm} mm`}
            heightLabel={`${v.heightMm} mm`}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.screenFaq(v)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.compareTitle}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.compareTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.compareNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/40 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                <tr>
                  {ui.compareCols.map(c => (
                    <th key={c} scope="col" className="text-left px-3 py-2 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {similar.map(o => {
                  const of_ = screenFacts(o);
                  return (
                    <tr key={o.slug}>
                      <td className="px-3 py-2.5">
                        <Link href={`${prefix}/device/screen/${o.slug}`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-sky-600 transition-colors">
                          {o.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">{o.w}×{o.h}</td>
                      <td className="px-3 py-2.5 tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">{ui.inchUnit(o.inch)}</td>
                      <td className="px-3 py-2.5 tabular-nums font-black text-slate-700 dark:text-slate-200 whitespace-nowrap">{of_.ppi} ppi</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/device/screen/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
