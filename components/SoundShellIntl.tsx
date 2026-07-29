import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { findSoundToolIntl, relatedSoundToolsIntl, SOUND_SHELL_UI, type SoundIntlLang } from '@/lib/sound-tools-intl';

/**
 * 소리 도구 상세 페이지의 en/zh 공용 셸. TimeShellIntl과 같은 구조다.
 *
 * 한국어 SoundShell은 SECTION_FAQ·CrossLinks처럼 한국어에 묶인 조각을 쓰고 있어
 * 그대로 재사용하기 어렵다. 흐름은 같게 두고 별도 파일로 둔다.
 *
 * h1은 여기서만 그린다. 도구 컴포넌트가 제목을 또 그리면 h1이 둘이 된다.
 */
export default function SoundShellIntl({
  slug,
  lang,
  children,
}: {
  slug: string;
  lang: SoundIntlLang;
  children: React.ReactNode;
}) {
  const tool = findSoundToolIntl(lang, slug);
  if (!tool) throw new Error(`Unknown sound tool: ${slug}`);

  const ui = SOUND_SHELL_UI[lang];
  const path = `/${lang}/sound/${tool.slug}`;
  const related = relatedSoundToolsIntl(lang, tool.slug);
  const other = lang === 'en' ? 'zh' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.section, path: `/${lang}/sound` },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="indigo" />
      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={`/${lang}`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`/${lang}/sound`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{tool.title}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
            <span>{tool.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{tool.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{tool.long}</p>
        </div>

        <div className="mb-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/70 dark:bg-indigo-950/30 px-4 py-3 text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed text-center">
          {ui.notice}
        </div>

        {children}

        <section className="mt-8" aria-label={ui.canDo}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.canDo}</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.features.map(f => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8" aria-label={ui.others}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.others}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/${lang}/sound/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <span className="text-xl shrink-0">{r.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 transition-colors">
                    {r.title}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r.desc}</span>
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
        <Link href={`/${lang}`} className="text-sm font-black text-indigo-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          <Link href={`/sound/${slug}`} className="hover:text-indigo-600" hrefLang="ko">한국어</Link>
          {' · '}
          <Link href={`/${other}/time/${slug}`} className="hover:text-indigo-600" hrefLang={other}>
            {other === 'zh' ? '中文' : 'EN'}
          </Link>
        </p>
      </footer>
    </div>
  );
}
