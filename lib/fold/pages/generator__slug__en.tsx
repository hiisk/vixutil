import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GENERATORS_EN, GENERATORS_EN_MAP } from '@/lib/generator-en';
import { prerender } from '@/lib/prerender';
import EnGeneratorEngine from '@/components/EnGeneratorEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { GENERATOR_LANGS } from '@/components/GeneratorIntlPage';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(en)/en/generator/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const gen = GENERATORS_EN_MAP[slug];
    if (!gen) return {};
    return withCard({
      title: `${gen.title} — free & instant`,
      description: `${gen.desc} Generate unique ideas in one click — free, no sign-up.`,
      // 스무 개는 열 언어가 모두 같은 슬러그를 쓴다 — 여기서 영어·한국어만
      // 선언하면 나머지 여덟이 이쪽을 가리켜도 짝이 맞지 않는다
      alternates: {
        canonical: `/en/generator/${slug}`,
        languages: alternateLanguages10(`/generator/${slug}`),
      },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const gen = GENERATORS_EN_MAP[slug];
    if (!gen) notFound();
    const others = GENERATORS_EN.filter(g => g.slug !== slug).slice(0, 6);
    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/en/generator' },
            { name: 'Generators', path: '/en/generator' },
            { name: gen.title, path: `/en/generator/${slug}` },
          ])}
        />
        <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
          <LangPicker current="en" route={`/generator/${slug}`} available={GENERATOR_LANGS} />
        </div>
        <EnGeneratorEngine gen={gen} />

        <div className="max-w-lg mx-auto px-4 w-full pb-12">
          <div className="mb-8">
            
          </div>

          {/* Simple English SEO copy */}
          <section className="prose-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">About this {gen.title.toLowerCase()}</h2>
            <p>
              This free {gen.title.toLowerCase()} instantly creates unique, ready-to-use ideas.
              Tap <strong>Generate</strong> as many times as you like, reroll any single result,
              and copy your favorites. Great for games, stories, characters, usernames and worldbuilding.
              No sign-up, no limits.
            </p>
          </section>

          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">More generators</h2>
          <div className="grid grid-cols-3 gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/en/generator/${o.slug}`} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all">
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.title.replace(' Generator', '')}</div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
          <Link href="/en/generator" className="text-sm font-bold text-emerald-600">vixutil</Link>
          <p className="text-xs text-slate-400 mt-1">Free online generators · <Link href={`/generator/${slug}`} className="hover:text-emerald-600" hrefLang="ko">한국어</Link></p>
        </footer>
      </>
    );
  }


  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. prerender()가 걸러 지금은 빈 배열이다. */
  const generateStaticParams = () => prerender(GENERATORS_EN.map(g => ({ slug: g.slug })));

  return { generateMetadata, generateStaticParams, Page };
}
