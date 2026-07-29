import Link from 'next/link';
import type { ReactNode } from 'react';
import type { RandomTool } from '@/lib/random-tools';
import PageGlow from '@/components/PageGlow';

/** 랜덤 뽑기 도구들의 공용 껍데기 — 헤더·상단 바·히어로 타이틀·본문 슬롯. */
export default function RandomToolShell({ tool, children, lang = 'ko' }: { tool: RandomTool; children: ReactNode; lang?: 'ko' | 'en' }) {
  const ko = lang === 'ko';
  const title = ko ? tool.title : tool.titleEn;
  const desc = ko ? tool.desc : tool.descEn;
  const hubHref = ko ? '/random' : '/en/random';
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={ko ? '/' : '/en/random'} className="font-black text-rose-600 text-lg shrink-0">{ko ? 'vix.' : 'vixutil'}</Link>
          <Link href={hubHref} className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
            {tool.icon} {title}
          </Link>
          <Link href={ko ? `/en/random/${tool.slug}` : `/random/${tool.slug}`} className="ml-auto text-xs font-bold text-slate-400 hover:text-rose-600" hrefLang={ko ? 'en' : 'ko'}>
            {ko ? 'English' : '한국어'}
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{tool.icon}</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{desc}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
