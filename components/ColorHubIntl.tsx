import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { colorToolsIntl, COLOR_CATEGORY_ORDER, COLOR_SHELL_UI, type ColorIntlLang } from '@/lib/color-tools-intl';
import { langOfLocale } from '@/lib/i18n/lang';
import { COLOR_FAMILIES, colorsOfFamily } from '@/lib/color/named8';
import { COLOR_UI } from '@/lib/color/ui';

/**
 * 색상 도구 허브의 번역 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 언어마다 page.tsx를 복제하면 문구를 하나 고칠 때 일곱 곳을 손대야 하고, 그중
 * 한 곳을 빼먹은 것은 화면을 열어 보기 전까지 드러나지 않는다. 그래서 라우트는
 * 얇게 두고 화면은 여기 한 곳에 모은다.
 *
 * 도구 아래에 색 이름 110가지를 함께 싣는다. 도구가 "색을 만드는" 쪽이라면 이름은
 * "색을 찾는" 쪽이고, hex 코드 하나가 필요해 들어온 사람은 팔레트를 만들 생각이
 * 없다. 두 쪽이 한 허브에 있어야 어느 쪽으로 들어와도 다음 걸음이 보인다.
 */
export default function ColorHubIntl({ lang }: { lang: ColorIntlLang }) {
  const tools = colorToolsIntl(lang);
  const ui = COLOR_SHELL_UI[lang];
  // 색 이름 쪽 문구는 짧은 열쇠를 쓴다 — 'pt-br'과 'pt'가 만나는 자리다
  const key = langOfLocale(lang);
  const names = COLOR_UI[key];
  const grouped = COLOR_CATEGORY_ORDER[lang]
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}`} className="font-bold text-fuchsia-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/color" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title={ui.section} desc={ui.hubLead} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="sec-h2">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link
                  key={t.slug}
                  href={`/${lang}/color/${t.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <span className="bg-sec-soft inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <ToolIcon emoji={t.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hub-tool-title block text-base font-bold leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mb-8" aria-label={names.section}>
          <h2 className="sec-h2-tight">{names.hubTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{names.hubLead}</p>
          {COLOR_FAMILIES.map(family => (
            <div key={family} className="mb-4">
              <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">
                {names.familyLabel[family]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                {colorsOfFamily(family).map(c => (
                  <Link
                    key={c.slug}
                    href={`/${lang}/color/${c.slug}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-sm hover:border-fuchsia-200 transition-all"
                  >
                    <span className="block h-11" style={{ background: c.hex }} />
                    <span className="block px-2 py-1.5 bg-white dark:bg-slate-900">
                      <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                        {c.name[key]}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">
                        {c.hex.toUpperCase()}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-bold text-fuchsia-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </div>
  );
}
