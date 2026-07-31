import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { HTTP_ICON, httpItemOf } from '@/lib/http/list';
import { httpFacts, relatedHttp } from '@/lib/http/facts';
import { httpDesc } from '@/lib/http/desc';
import { HTTP_UI } from '@/lib/http/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 상태 코드나 헤더 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 뜻이 맨 위다. "404 무슨 뜻"으로 들어온 사람에게 그 답을 첫 화면에서 준다.
 */
export default function HttpPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = httpItemOf(slug);
  if (!x) return null;

  const ui = HTTP_UI[lang];
  const f = httpFacts(x);
  const desc = httpDesc(slug, lang);
  const kind = f.kind === 'status' ? ui.classLabel[f.klass!] : ui.sideLabel[f.side!];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/http`;
  const path = `${prefix}/http/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const related = relatedHttp(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.writeLabel, value: f.example },
    ...(f.code ? [{ label: ui.codeLabel, value: String(f.code) }] : []),
    ...(f.kind === 'status' ? [{ label: ui.errorLabel, value: f.isError ? ui.errorYes : ui.errorNo }] : []),
    { label: ui.kindTitle, value: kind },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/http` },
          { name: x.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(x.name, ui.metaDesc(x.name, desc), path)} />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/http`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/http/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-teal-600 to-emerald-500">
            <ToolIcon emoji={HTTP_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 font-mono break-all">{x.name}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">{kind}</p>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-4 mb-6">
          {desc}
        </p>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-2/5 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 break-all font-mono text-[13px]">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
          {f.kind === 'status' ? ui.classNote[f.klass!] : ui.sideNote[f.side!]}
        </p>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.itemFaq(f, desc, kind)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.relatedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map(n => (
              <Link
                key={n}
                href={`${prefix}/http/${n}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 font-mono hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                {httpItemOf(n)?.name ?? n}
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-6 text-center">
          <a href={f.docUrl} rel="nofollow noopener" target="_blank" className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-teal-600 transition-colors">
            {ui.docLabel} ↗
          </a>
        </p>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/http/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
