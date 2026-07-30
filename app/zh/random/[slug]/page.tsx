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
    title: `${t.titleZh} — 免费在线`,
    description: t.longZh,
    alternates: {
      canonical: `/zh/random/${slug}`,
      languages: { 'zh': `/zh/random/${slug}`, 'en': `/en/random/${slug}`, 'ko': `/random/${slug}`, 'x-default': `/en/random/${slug}` },
    },
  };
}

function Tool({ slug }: { slug: string }) {
  switch (slug) {
    case 'roulette': return <RouletteWheel lang="zh" />;
    case 'ladder': return <LadderGame lang="zh" />;
    case 'pick': return <RandomPicker lang="zh" />;
    case 'order': return <OrderShuffler lang="zh" />;
    case 'secret-santa': return <SecretSanta lang="zh" />;
    case 'team': return <TeamMaker lang="zh" />;
    case 'number': return <NumberPicker lang="zh" />;
    case 'coin-dice': return <CoinDice lang="zh" />;
    default: return null;
  }
}

export default async function ZhRandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = RANDOM_TOOLS_MAP[slug];
  if (!tool) notFound();
  const others = RANDOM_TOOLS.filter(o => o.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/zh/random' },
          { name: '随机工具', path: '/zh/random' },
          { name: tool.titleZh, path: `/zh/random/${slug}` },
        ])}
      />
      <RandomToolShell tool={tool} lang="zh">
        <Tool slug={slug} />

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          结果由浏览器实时随机生成，你输入的内容不会被保存或上传。
        </p>

        <section className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">关于{tool.titleZh}</h2>
          <p>{tool.longZh}</p>
        </section>

        <div className="mt-8">
          <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">更多工具</h2>
          <div className="grid grid-cols-3 gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/zh/random/${o.slug}`} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all">
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.titleZh}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ReferralCards lang="en" placement="result" />
        </div>
      </RandomToolShell>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh/random" className="text-sm font-black text-rose-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">免费随机工具 · <Link href={`/random/${slug}`} className="hover:text-rose-600" hrefLang="ko">한국어</Link> · <Link href={`/en/random/${slug}`} className="hover:text-rose-600" hrefLang="en">EN</Link></p>
      </footer>
    </>
  );
}
