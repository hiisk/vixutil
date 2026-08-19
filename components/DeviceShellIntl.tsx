import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { findDeviceToolIntl, relatedDeviceToolsIntl, DEVICE_SHELL_UI, type DeviceIntlLang } from '@/lib/device-tools-intl';

/**
 * 기기 점검 상세 페이지의 en/zh 공용 셸. TimeShellIntl과 같은 구조다.
 *
 * 한국어 DeviceShell은 SECTION_FAQ·CrossLinks처럼 한국어에 묶인 조각을 쓰고 있어
 * 그대로 재사용하기 어렵다. 흐름은 같게 두고 별도 파일로 둔다.
 *
 * h1은 여기서만 그린다. 도구 컴포넌트가 제목을 또 그리면 h1이 둘이 된다.
 */
export default function DeviceShellIntl({
  slug,
  lang,
  children,
}: {
  slug: string;
  lang: DeviceIntlLang;
  children: React.ReactNode;
}) {
  const tool = findDeviceToolIntl(lang, slug);
  if (!tool) throw new Error(`Unknown device test: ${slug}`);

  const ui = DEVICE_SHELL_UI[lang];
  const path = `/${lang}/device/${tool.slug}`;
  const related = relatedDeviceToolsIntl(lang, tool.slug);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.section, path: `/${lang}/device` },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="sky" />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="page-bar">
          <Link href={`/${lang}`} className="page-back hover:text-sky-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`/${lang}/device`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{tool.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/device/${slug}`} />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-2xl mx-auto px-4"><PageHero className="hero-flat" title={tool.title} desc={tool.long} icon={tool.icon} /></div>
      </div>

      <main className="relative max-w-2xl mx-auto px-4 pb-10 tool-lift">


        <div className="mb-5 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 px-4 py-3 text-xs text-sky-800 dark:text-sky-200 leading-relaxed text-center">
          {ui.notice}
        </div>

        {tool.needsPermission && (
          <div className="mb-5 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 px-4 py-3 text-xs text-sky-800 dark:text-sky-200 leading-relaxed">
            {ui.permission}
          </div>
        )}

        {children}

        <section className="mt-8" aria-label={ui.whatItChecks}>
          <h2 className="sec-h2">{ui.whatItChecks}</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.checks.map(f => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl border chip-off px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8" aria-label={ui.others}>
          <h2 className="sec-h2">{ui.others}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/${lang}/device/${r.slug}`}
                className="group hub-card hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <ToolIcon emoji={r.icon} color={r.og[0]} accent={r.og[1]} className="w-5 h-5 shrink-0" />
                <span className="hub-card-body">
                  <span className="hub-card-title group-hover:text-sky-700 transition-colors">
                    {r.title}
                  </span>
                  <span className="hub-card-desc">{r.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">
          {ui.footNote}
        </p>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={`/${lang}`} className="text-sm font-black text-sky-600">vixutil</Link>
      </footer>
    </div>
  );
}
