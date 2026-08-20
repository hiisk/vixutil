/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import ToolIcon from '@/components/ToolIcon';
import CoupangAd from '@/components/CoupangAd';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import Link from 'next/link';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import RandomToolShell from '@/components/random/RandomToolShell';
import RouletteWheel from '@/components/random/RouletteWheel';
import LadderGame from '@/components/random/LadderGame';
import RandomPicker from '@/components/random/RandomPicker';
import TeamMaker from '@/components/random/TeamMaker';
import NumberPicker from '@/components/random/NumberPicker';
import CoinDice from '@/components/random/CoinDice';
import CardDraw from '@/components/random/CardDraw';
import RockPaperScissors from '@/components/random/RockPaperScissors';
import BingoBoard from '@/components/random/BingoBoard';
import WeightedDraw from '@/components/random/WeightedDraw';
import DutyRoster from '@/components/random/DutyRoster';
import YesNo from '@/components/random/YesNo';
import OrderShuffler from '@/components/random/OrderShuffler';
import SecretSanta from '@/components/random/SecretSanta';
import ShareButton from '@/components/ShareButton';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';


export function generateStaticParams() {
  return prerender(RANDOM_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = RANDOM_TOOLS_MAP[slug];
  if (!t) return {};
  return withCard({
    title: t.title,
    description: t.long,
    alternates: {
      canonical: `/random/${slug}`,
      languages: alternateLanguages10(`/random/${slug}`),
    },
  });
}

function Tool({ slug }: { slug: string }) {
  switch (slug) {
    case 'roulette': return <RouletteWheel />;
    case 'ladder': return <LadderGame />;
    case 'pick': return <RandomPicker />;
    case 'order': return <OrderShuffler />;
    case 'secret-santa': return <SecretSanta />;
    case 'team': return <TeamMaker />;
    case 'number': return <NumberPicker />;
    case 'coin-dice': return <CoinDice />;
    case 'card': return <CardDraw />;
    case 'rps': return <RockPaperScissors />;
    case 'bingo': return <BingoBoard />;
    case 'weighted': return <WeightedDraw />;
    case 'duty': return <DutyRoster />;
    case 'yes-no': return <YesNo />;
    default: return null;
  }
}

export default async function RandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = RANDOM_TOOLS_MAP[slug];
  if (!tool) notFound();
  const others = RANDOM_TOOLS.filter(o => o.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '랜덤 뽑기', path: '/random' },
          { name: tool.title, path: `/random/${slug}` },
        ])}
      />
      <RandomToolShell tool={tool}>
        <Tool slug={slug} />

        <div className="mt-8">
          <ShareButton title={`${tool.title} — vixutil`} description={tool.desc} type="quiz" />
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          결과는 브라우저에서 실시간 난수로 계산됩니다. 입력한 내용은 저장·전송되지 않습니다.
        </p>

        <Faq items={SECTION_FAQ[`random/${slug}`]} />

        <div className="mt-8">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">다른 도구</h2>
          <div className="grid grid-cols-3 gap-2">
            {others.map(o => (
              <Link
                key={o.slug}
                href={`/random/${o.slug}`}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all"
              >
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.title}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <CoupangAd />
        </div>
      </RandomToolShell>
      <SiteFooter referral={false} />
    </>
  );
}
