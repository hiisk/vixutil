import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GENERATORS_EN } from '@/lib/generator-en';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { GENERATOR_LANGS } from '@/components/GeneratorIntlPage';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(en)/en/generator/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = withCard({
    title: 'Free Name Generators — Fantasy, Sci-Fi & More',
    description: 'Free online name generators: fantasy, sci-fi, dragon, superhero, villain, guild, pirate names and more. Instant, unlimited, no sign-up.',
    alternates: {
      canonical: '/en/generator',
      // 여덟 언어판이 /en/generator를 가리키는데 여기서 되받지 않으면 상호 참조가
      // 끊겨 구글이 이 hreflang 묶음을 무시한다 — 열 언어를 모두 선언한다.
      languages: alternateLanguages10('/generator'),
    },
  });


  function Page() {
    return (
      <div className="page-wrap">
        <PageGlow accent="emerald" />
        <div className="h-1 topbar" />
        <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
            <Link href="/en/generator" className="font-bold text-emerald-600 text-lg shrink-0">vixutil</Link>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Name Generators</span>
            <span className="ml-auto flex items-center gap-2">
              <LangPicker current="en" route="/generator" available={GENERATOR_LANGS} />
            </span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">Free Generators</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Name Generators</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            Instant, unlimited name ideas for games, stories and characters — <strong className="text-slate-700 dark:text-slate-200">free, no sign-up</strong>.
          </p>

          <div className="grid sm:grid-cols-2 gap-2">
            {GENERATORS_EN.map(g => (
              <Link key={g.slug} href={`/en/generator/${g.slug}`} className="hub-card group">
                <span className="bg-sec-soft inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <ToolIcon emoji={g.icon} className="h-5 w-5" />
                </span>
                <span className="hub-card-body">
                  <span className="hub-card-title group-hover:text-sec">{g.title.replace(' Generator', '')}</span>
                  <span className="block truncate text-xs text-slate-400 dark:text-slate-500">{g.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
          <span className="text-sm font-bold text-emerald-600">vixutil</span>
          <p className="text-xs text-slate-400 mt-1">Free online generators</p>
        </footer>
      </div>
    );
  }

  return { metadata, Page };
}
