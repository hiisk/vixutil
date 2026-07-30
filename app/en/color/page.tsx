import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { colorToolsIntl, COLOR_SHELL_UI } from '@/lib/color-tools-intl';
import { COLOR_FAMILIES, colorsOfFamily } from '@/lib/color/named8';
import { COLOR_UI, colorAlternates } from '@/lib/color/ui';

export const metadata: Metadata = {
  title: 'Colour Tools — Palette, Contrast, CSS Gradient',
  description: 'Free colour tools: palette generator, shade scale, contrast checker, colour blindness simulator, CSS gradient and box-shadow. Runs in your browser, no install.',
  alternates: {
    canonical: '/en/color',
    languages: colorAlternates(),
  },
};

const CATEGORY_ORDER = ['Palette', 'Accessibility', 'CSS', 'Convert'];

export default function EnColorHub() {
  const tools = colorToolsIntl('en');
  const ui = COLOR_SHELL_UI['en'];
  const grouped = CATEGORY_ORDER
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-rose-500" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en" className="font-black text-fuchsia-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/color" className="hover:text-fuchsia-600" hrefLang="ko">한국어</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-fuchsia-600 tracking-widest uppercase mb-2">Colour</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Colour Tools</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Palettes, contrast and CSS code — all running in your browser.</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link key={t.slug} href={`/en/color/${t.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
                  <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                  <span>
                    <span className="block text-base font-black drop-shadow leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/*
          110 named colours. The tools above are for making colours; this is for
          looking one up — someone who needs a hex code is not building a palette.
        */}
        <section className="mb-8" aria-label={COLOR_UI.en.section}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{COLOR_UI.en.hubTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{COLOR_UI.en.hubLead}</p>
          {COLOR_FAMILIES.map(family => (
            <div key={family} className="mb-4">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-1.5">
                {COLOR_UI.en.familyLabel[family]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                {colorsOfFamily(family).map(c => (
                  <Link
                    key={c.slug}
                    href={`/en/color/${c.slug}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-sm hover:border-fuchsia-200 transition-all"
                  >
                    <span className="block h-11" style={{ background: c.hex }} />
                    <span className="block px-2 py-1.5 bg-white dark:bg-slate-900">
                      <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">{c.name.en}</span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">{c.hex.toUpperCase()}</span>
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
        <span className="text-sm font-black text-fuchsia-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free colour tools</p>
      </footer>
    </div>
  );
}
