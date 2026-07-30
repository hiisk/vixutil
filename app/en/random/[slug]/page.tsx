import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import RandomToolShell from '@/components/random/RandomToolShell';
import RouletteWheel from '@/components/random/RouletteWheel';
import LadderGame from '@/components/random/LadderGame';
import RandomPicker from '@/components/random/RandomPicker';
import TeamMaker from '@/components/random/TeamMaker';
import NumberPicker from '@/components/random/NumberPicker';
import CoinDice from '@/components/random/CoinDice';
import OrderShuffler from '@/components/random/OrderShuffler';
import SecretSanta from '@/components/random/SecretSanta';
import ReferralCards from '@/components/ReferralCards';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return RANDOM_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = RANDOM_TOOLS_MAP[slug];
  if (!t) return {};
  return {
    title: `${t.titleEn} — free & instant`,
    description: t.longEn,
    alternates: {
      canonical: `/en/random/${slug}`,
      languages: { 'en': `/en/random/${slug}`, 'ko': `/random/${slug}`, 'zh': `/zh/random/${slug}`, 'x-default': `/en/random/${slug}` },
    },
  };
}

function Tool({ slug }: { slug: string }) {
  switch (slug) {
    case 'roulette': return <RouletteWheel lang="en" />;
    case 'ladder': return <LadderGame lang="en" />;
    case 'pick': return <RandomPicker lang="en" />;
    case 'order': return <OrderShuffler lang="en" />;
    case 'secret-santa': return <SecretSanta lang="en" />;
    case 'team': return <TeamMaker lang="en" />;
    case 'number': return <NumberPicker lang="en" />;
    case 'coin-dice': return <CoinDice lang="en" />;
    default: return null;
  }
}

export default async function EnRandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = RANDOM_TOOLS_MAP[slug];
  if (!tool) notFound();
  const others = RANDOM_TOOLS.filter(o => o.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/en/random' },
          { name: 'Random Tools', path: '/en/random' },
          { name: tool.titleEn, path: `/en/random/${slug}` },
        ])}
      />
      <RandomToolShell tool={tool} lang="en">
        <Tool slug={slug} />

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          Results are generated live in your browser with real randomness. Nothing you enter is stored or sent.
        </p>

        <section className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">About the {tool.titleEn}</h2>
          <p>{tool.longEn}</p>
        </section>

        <div className="mt-8">
          <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">More tools</h2>
          <div className="grid grid-cols-3 gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/en/random/${o.slug}`} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all">
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.titleEn}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ReferralCards lang="en" placement="result" />
        </div>
      </RandomToolShell>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/en/random" className="text-sm font-black text-rose-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">Free random tools · <Link href={`/random/${slug}`} className="hover:text-rose-600" hrefLang="ko">한국어</Link> · <Link href={`/zh/random/${slug}`} className="hover:text-rose-600" hrefLang="zh">中文</Link></p>
      </footer>
    </>
  );
}
