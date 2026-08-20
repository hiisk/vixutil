import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { imageToolsIntl, IMAGE_CATEGORY_ORDER, IMAGE_SHELL_UI, type ImageIntlLang } from '@/lib/image-tools-intl';
import { langOfLocale } from '@/lib/i18n/lang';
import { IMG_SIZE_UI } from '@/lib/imgsize/ui';
import { IMG_SIZE_ICON } from '@/lib/imgsize/list';

/**
 * 이미지 도구 허브의 번역 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 색상 허브(ColorHubIntl)와 같은 이유로 한 곳에 모았다. 언어마다 page.tsx를
 * 복제하면 문구 하나를 고칠 때 일곱 곳을 손대야 하고, 그중 한 곳을 빼먹은 것은
 * 화면을 열어 보기 전까지 드러나지 않는다.
 */
export default function ImageHubIntl({ lang }: { lang: ImageIntlLang }) {
  // 크기 목록은 도구가 아니라 자료라서 갈래 바깥에 따로 세운다
  const sizeUi = IMG_SIZE_UI[langOfLocale(lang)];
  const tools = imageToolsIntl(lang);
  const ui = IMAGE_SHELL_UI[lang];
  const grouped = IMAGE_CATEGORY_ORDER[lang]
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}`} className="font-bold text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/image" />
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
                  href={`/${lang}/image/${t.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <span className="bg-sec-soft inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <ToolIcon emoji={t.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hub-tool-title block text-base font-bold leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium opacity-80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <Link
          href={`/${lang}/image/size`}
          className="group flex items-center gap-4 rounded-lg border chip-off px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={IMG_SIZE_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{sizeUi.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{sizeUi.hubLead}</span>
          </span>
        </Link>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-bold text-violet-600">vixutil</span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </div>
  );
}
