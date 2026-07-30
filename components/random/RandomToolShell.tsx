import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { RandomTool } from '@/lib/random-tools';
import PageGlow from '@/components/PageGlow';

type Lang = 'ko' | 'en' | 'zh';

/** 랜덤 뽑기 도구들의 공용 껍데기 — 헤더·상단 바·히어로 타이틀·본문 슬롯. */
export default function RandomToolShell({ tool, children, lang = 'ko' }: { tool: RandomTool; children: ReactNode; lang?: Lang }) {
  const title = lang === 'ko' ? tool.title : lang === 'zh' ? tool.titleZh : tool.titleEn;
  const desc = lang === 'ko' ? tool.desc : lang === 'zh' ? tool.descZh : tool.descEn;
  const hubHref = lang === 'ko' ? '/random' : lang === 'zh' ? '/zh/random' : '/en/random';
  // 언어 전환 링크: 현재 아닌 두 언어로
  const alt: { href: string; label: string; hl: string }[] =
    lang === 'ko'
      ? [{ href: `/en/random/${tool.slug}`, label: 'EN', hl: 'en' }, { href: `/zh/random/${tool.slug}`, label: '中文', hl: 'zh' }]
      : lang === 'en'
        ? [{ href: `/random/${tool.slug}`, label: '한국어', hl: 'ko' }, { href: `/zh/random/${tool.slug}`, label: '中文', hl: 'zh' }]
        : [{ href: `/random/${tool.slug}`, label: '한국어', hl: 'ko' }, { href: `/en/random/${tool.slug}`, label: 'EN', hl: 'en' }];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="font-black text-rose-600 text-lg shrink-0">{lang === 'ko' ? 'vix.' : 'vixutil'}</Link>
          <Link href={hubHref} className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
            <ToolIcon emoji={tool.icon} className="inline-block w-4 h-4 -mt-0.5 mr-1 align-middle" />
            {title}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            {alt.map(a => (
              <Link key={a.hl} href={a.href} className="hover:text-rose-600" hrefLang={a.hl}>{a.label}</Link>
            ))}
          </span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji={tool.icon} className="text-slate-800 dark:text-slate-100 w-14 h-14 mx-auto mb-2" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{desc}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
