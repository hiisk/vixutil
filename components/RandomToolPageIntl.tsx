'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
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
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { RANDOM_UI, randomL10n, type RandomLang } from '@/lib/random-ui-intl';
import { localeHref } from '@/lib/locales';

/**
 * 랜덤 뽑기 도구 페이지 — 번역 일곱 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 도구 아홉 종의 실제 화면은 각자 컴포넌트가 그리고, 여기는 그 둘레(설명·다른
 * 도구·푸터)만 맡는다. 둘레를 언어마다 복사해 두면 그중 하나에서 "다른 도구"
 * 링크가 영어를 가리킨 채 남기 쉽다.
 */
function Tool({ slug, lang }: { slug: string; lang: RandomLang }) {
  switch (slug) {
    case 'roulette': return <RouletteWheel lang={lang} />;
    case 'ladder': return <LadderGame lang={lang} />;
    case 'pick': return <RandomPicker lang={lang} />;
    case 'order': return <OrderShuffler lang={lang} />;
    case 'secret-santa': return <SecretSanta lang={lang} />;
    case 'team': return <TeamMaker lang={lang} />;
    case 'number': return <NumberPicker lang={lang} />;
    case 'coin-dice': return <CoinDice lang={lang} />;
    case 'card': return <CardDraw lang={lang} />;
    case 'rps': return <RockPaperScissors lang={lang} />;
    case 'bingo': return <BingoBoard lang={lang} />;
    case 'weighted': return <WeightedDraw lang={lang} />;
    case 'duty': return <DutyRoster lang={lang} />;
    case 'yes-no': return <YesNo lang={lang} />;
    default: return null;
  }
}

export default function RandomToolPageIntl({ slug, lang }: { slug: string; lang: RandomLang }) {
  const tool = RANDOM_TOOLS_MAP[slug];
  const ui = RANDOM_UI[lang];
  const t = randomL10n(slug, lang);
  const hub = localeHref(lang, '/random');
  const others = RANDOM_TOOLS.filter(o => o.slug !== slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.hubTitle, path: hub },
          { name: t.title, path: localeHref(lang, `/random/${slug}`) },
        ])}
      />
      <RandomToolShell tool={tool} lang={lang}>
        <Tool slug={slug} lang={lang} />

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">{ui.privacyNote}</p>

        <section className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-8">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">{ui.aboutTitle(t.title)}</h2>
          <p>{t.long}</p>
        </section>

        <div className="mt-8">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">{ui.moreTools}</h2>
          <div className="grid grid-cols-3 gap-2">
            {others.map(o => (
              <Link
                key={o.slug}
                href={localeHref(lang, `/random/${o.slug}`)}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all"
              >
                <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{randomL10n(o.slug, lang).title}</div>
              </Link>
            ))}
          </div>
        </div>
        {/* 쿠팡은 한국에서만 산다 — CoupangAd가 lang을 보고 한국어에서만 그린다 */}
        <div className="mt-8">
          <Ad lang={lang} />
        </div>
      </RandomToolShell>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={hub} className="text-sm font-bold text-rose-600">vixutil</Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </>
  );
}
