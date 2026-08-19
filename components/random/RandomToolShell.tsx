import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { RandomTool } from '@/lib/random-tools';
import PageGlow from '@/components/PageGlow';
import { randomL10n, type RandomLang } from '@/lib/random-ui-intl';
import { ALL_LOCALES10, localeHref } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';

/** 랜덤 뽑기 도구들의 공용 껍데기 — 헤더·상단 바·히어로 타이틀·본문 슬롯. */
export default function RandomToolShell({ tool, children, lang = 'ko' }: { tool: RandomTool; children: ReactNode; lang?: RandomLang }) {
  const t = randomL10n(tool.slug, lang);
  const hubHref = localeHref(lang, '/random');

  return (
    <div className="page-wrap">
      <PageGlow accent="rose" />
      <div className={`h-1 topbar`} />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link prefetch={false} href={hubHref} className="font-black text-rose-600 text-lg shrink-0">{lang === 'ko' ? 'vix.' : 'vixutil'}</Link>
          <Link prefetch={false} href={hubHref} className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
            <ToolIcon emoji={tool.icon} className="inline-block w-4 h-4 -mt-0.5 mr-1 align-middle" />
            {t.title}
          </Link>
          {/* 언어 전환 — 열 언어가 같은 slug를 쓰므로 레지스트리에서 만든다 */}
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/random/${tool.slug}`} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji={tool.icon} className="text-slate-800 dark:text-slate-100 w-14 h-14 mx-auto mb-2" />
          <PageHero title={t.title} desc={t.desc} />
        </div>
        {children}
      </div>
    </div>
  );
}
