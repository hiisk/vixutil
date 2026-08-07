import ToolIcon from '@/components/ToolIcon';
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
import ReferralCards from '@/components/ReferralCards';
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

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">{ui.privacyNote}</p>

        <section className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">{ui.aboutTitle(t.title)}</h2>
          <p>{t.long}</p>
        </section>

        <div className="mt-8">
          <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.moreTools}</h2>
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
        {/* 제휴 카드는 아직 영어 문구만 있다. 다른 언어에 영어 카드를 끼우면
            그 페이지에서 유일하게 못 읽는 부분이 되므로 영어에서만 낸다. */}
        {lang === 'en' && (
          <div className="mt-8">
            <ReferralCards lang="en" placement="result" />
          </div>
        )}
      </RandomToolShell>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={hub} className="text-sm font-black text-rose-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </>
  );
}
