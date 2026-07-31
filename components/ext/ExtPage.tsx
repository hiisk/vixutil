import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { EXT_ICON, extOf } from '@/lib/ext/list';
import { extFacts, relatedExts } from '@/lib/ext/facts';
import { EXT_UI } from '@/lib/ext/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 확장자 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * "이거 뭘로 열지"가 이 화면에 오는 이유다. 그래서 여는 프로그램을 맨 위에 놓고,
 * MIME 타입과 갈래 설명은 그 뒤에 둔다.
 */
export default function ExtPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = extOf(slug);
  if (!x) return null;

  const ui = EXT_UI[lang];
  const f = extFacts(x);
  const kind = ui.kindLabel[x.kind];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/ext`;
  const path = `${prefix}/ext/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const related = relatedExts(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.mimeLabel, value: f.mime },
    { label: ui.kindTitle, value: kind },
    { label: ui.webLabel, value: f.web ? ui.webYes : ui.webNo },
    { label: ui.textLabel, value: f.text ? ui.textYes : ui.textNo },
    { label: ui.officialLabel, value: f.official ? ui.officialYes : ui.officialNo },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/ext` },
          { name: `.${x.ext}`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`.${x.ext}`, ui.metaDesc(f, kind), path)} />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-400 to-violet-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/ext`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/ext/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-400 to-violet-500">
            <ToolIcon emoji={EXT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-1">.{x.ext}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">{kind} · {f.mime}</p>
        </div>

        {/* 이 화면에 오는 이유가 이것이다 — 무엇으로 여는가 */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-4 mb-6">
          <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 mb-2">{ui.openWith}</p>
          <div className="flex flex-wrap gap-1.5">
            {f.apps.map(a => (
              <span key={a} className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                {a}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.kindNote[x.kind]}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 break-all">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {f.twins.length > 0 && (
          <section className="mt-6">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.twinsTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.twinsNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.twins.map(t => (
                <Link
                  key={t}
                  href={`${prefix}/ext/${t}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-black text-slate-800 dark:text-slate-100 hover:shadow-sm transition-all"
                >
                  .{t}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.extFaq(f, kind)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.relatedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map(r => (
              <Link
                key={r}
                href={`${prefix}/ext/${r}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                .{r}
              </Link>
            ))}
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/ext/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
