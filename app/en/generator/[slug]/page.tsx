import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GENERATORS_EN, GENERATORS_EN_MAP } from '@/lib/generator-en';
import EnGeneratorEngine from '@/components/EnGeneratorEngine';
import ReferralCards from '@/components/ReferralCards';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return GENERATORS_EN.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATORS_EN_MAP[slug];
  if (!gen) return {};
  return {
    title: `${gen.title} — free & instant`,
    description: `${gen.desc} Generate unique ideas in one click — free, no sign-up.`,
    alternates: {
      canonical: `/en/generator/${slug}`,
      languages: {
        'en': `/en/generator/${slug}`,
        'ko': `/generator/${slug}`,
        'x-default': `/en/generator/${slug}`,
      },
    },
  };
}

export default async function EnGeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
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
      <EnGeneratorEngine gen={gen} />

      <div className="max-w-lg mx-auto px-4 w-full pb-12">
        <div className="mb-8">
          <ReferralCards lang="en" placement="result" />
        </div>

        {/* Simple English SEO copy */}
        <section className="prose-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">About this {gen.title.toLowerCase()}</h2>
          <p>
            This free {gen.title.toLowerCase()} instantly creates unique, ready-to-use ideas.
            Tap <strong>Generate</strong> as many times as you like, reroll any single result,
            and copy your favorites. Great for games, stories, characters, usernames and worldbuilding.
            No sign-up, no limits.
          </p>
        </section>

        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">More generators</h2>
        <div className="grid grid-cols-3 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/en/generator/${o.slug}`} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all">
              <div className="text-2xl mb-1">{o.icon}</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.title.replace(' Generator', '')}</div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/en/generator" className="text-sm font-black text-emerald-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">Free online generators · <Link href={`/generator/${slug}`} className="hover:text-emerald-600" hrefLang="ko">한국어</Link></p>
      </footer>
    </>
  );
}
