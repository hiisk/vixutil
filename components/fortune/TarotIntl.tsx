'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { TAROT_CARDS } from '@/lib/fortune-data';
import {
  TAROT_READINGS, TAROT_NAMES, TAROT_UI, dailyTarot, ymdOf,
  type TarotIntlLang, type DailyTarot,
} from '@/lib/tarot-intl';
import { t, formatToday } from '@/lib/fortune-intl';

/**
 * 오늘의 타로 / 타로 예스·노 — 번역판.
 *
 * 카드 선택과 예스·노 판정은 한국어 페이지와 같은 규칙을 쓴다. 오늘의 타로는
 * 날짜 시드라 같은 날이면 세 언어가 같은 카드를 뽑고, 예스·노는 매번 무작위다.
 */
type Mode = 'daily' | 'yesno';
type Verdict = 'yes' | 'no' | 'maybe';

/** 카드 id별 기본 판정 — 한국어 YESNO_BASE와 동일 */
const YESNO_BASE: Verdict[] = [
  'yes', 'yes', 'maybe', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'maybe', 'yes',
  'maybe', 'no', 'no', 'maybe', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'yes',
];

const VERDICT_STYLE: Record<Verdict, { emoji: string; gradient: string }> = {
  yes:   { emoji: '✅', gradient: 'from-emerald-400 to-teal-600' },
  no:    { emoji: '❌', gradient: 'from-rose-400 to-red-600' },
  maybe: { emoji: '🤔', gradient: 'from-amber-400 to-orange-500' },
};

const VERDICT_NOTE: Record<TarotIntlLang, Record<Verdict, string>> = {
  en: {
    yes: 'The current runs in your favour. Trust yourself and push on.',
    no: 'A moment for caution. Take a beat and reconsider before moving.',
    maybe: 'Still evenly balanced. The conditions and the timing need another look.',
  },
  es: {
    yes: 'La corriente va a tu favor. Confía en ti y sigue adelante.',
    no: 'Momento de prudencia. Respira y replantéalo antes de moverte.',
    maybe: 'Todavía está igualado. Hay que volver a mirar las condiciones y el momento.',
  },
  'pt-br': {
    yes: 'A corrente está a seu favor. Confie em você e siga.',
    no: 'Hora de cautela. Respire e repense antes de agir.',
    maybe: 'Ainda está equilibrado. Vale rever as condições e o momento.',
  },
  ja: {
    yes: '流れは味方しています。自分を信じて進んでください。',
    no: '今は慎重にいく場面です。ひと呼吸おいて考え直してから動いてください。',
    maybe: 'まだ拮抗しています。条件とタイミングをもう一度見てください。',
  },
  de: {
    yes: 'Die Strömung läuft für dich. Vertrau dir und mach weiter.',
    no: 'Ein Moment für Vorsicht. Kurz durchatmen und noch mal überlegen, bevor du handelst.',
    maybe: 'Noch ausgeglichen. Bedingungen und Zeitpunkt wollen einen zweiten Blick.',
  },
  fr: {
    yes: 'Le courant va dans votre sens. Faites-vous confiance et avancez.',
    no: 'Un moment de prudence. Reprenez votre souffle et reconsidérez avant d’agir.',
    maybe: 'Encore à égalité. Les conditions et le moment méritent un second regard.',
  },
  hi: {
    yes: 'धारा आपके पक्ष में है। ख़ुद पर भरोसा कीजिए और आगे बढ़िए।',
    no: 'यह सँभलकर चलने का समय है। एक साँस लीजिए और चलने से पहले दोबारा सोचिए।',
    maybe: 'अभी बराबरी पर है। हालात और समय को एक बार और देखना होगा।',
  },
  'zh-hans': {
    yes: '势头站在你这边。相信自己，往前走。',
    no: '现在适合谨慎。缓一口气，重新想过再动。',
    maybe: '还势均力敌。条件和时机都得再看一遍。',
  },
  'zh-hant': {
    yes: '勢頭站在你這邊。相信自己，往前走。',
    no: '現在適合謹慎。緩一口氣，重新想過再動。',
    maybe: '還勢均力敵。條件和時機都得再看一遍。',
  },
};

/** 판정 라벨은 TAROT_UI에 이미 있다 — 같은 말을 두 곳에 두면 곧 어긋난다 */
const VERDICT_LABEL: Record<TarotIntlLang, Record<Verdict, string>> = Object.fromEntries(
  (Object.keys(TAROT_UI) as TarotIntlLang[]).map(l => [
    l, { yes: TAROT_UI[l].yes, no: TAROT_UI[l].no, maybe: TAROT_UI[l].maybe },
  ]),
) as Record<TarotIntlLang, Record<Verdict, string>>;

/* useSyncExternalStore는 스냅샷이 같은 참조여야 한다 — 매번 새 객체를 주면 무한 루프다 */
const emptySubscribe = () => () => {};
const nullSnapshot = () => null;
let cached: { lang: TarotIntlLang; value: DailyTarot & { dateLabel: string } } | null = null;
function clientDaily(lang: TarotIntlLang) {
  if (!cached || cached.lang !== lang) {
    const now = new Date();
    cached = { lang, value: { ...dailyTarot(ymdOf(now), lang), dateLabel: formatToday(lang, now) } };
  }
  return cached.value;
}

function cardName(id: number, lang: TarotIntlLang) {
  // 예전에는 nameEn을 그대로 찍어서 아홉 언어 전부 카드 이름만 영어였다
  return TAROT_NAMES[lang][id] ?? TAROT_CARDS[id].nameEn;
}

export default function TarotIntl({ mode, lang }: { mode: Mode; lang: TarotIntlLang }) {
  const ui = TAROT_UI[lang];

  // 오늘의 타로 — 날짜 시드라 하루 종일 같은 카드가 나온다.
  //
  // 이 아홉 언어는 dynamicParams=false로 빌드에서 통째로 구워진다. 렌더 중에
  // new Date()를 부르면 **배포한 날의 카드**가 HTML에 박혀서 다음 배포까지
  // 그대로 나가고, 붙는 순간 오늘 카드로 갈아치워지며 하이드레이션이 깨진다.
  // 한국어 /fortune/daily-tarot이 이미 같은 이유로 useSyncExternalStore를 쓴다 —
  // 서버는 null(스켈레톤), 브라우저는 오늘 값.
  const daily = useSyncExternalStore(
    emptySubscribe,
    mode === 'daily' ? () => clientDaily(lang) : nullSnapshot,
    nullSnapshot,
  );

  const [drawn, setDrawn] = useState<{ id: number; reversed: boolean } | null>(null);

  function draw() {
    setDrawn({
      id: Math.floor(Math.random() * TAROT_CARDS.length),
      reversed: Math.random() < 0.4,
    });
  }

  const shown = mode === 'daily' ? daily : drawn;
  const reading = shown ? TAROT_READINGS[lang][shown.id] : null;
  const card = shown ? TAROT_CARDS[shown.id] : null;

  let verdict: Verdict | null = null;
  if (mode === 'yesno' && drawn) {
    const base = YESNO_BASE[drawn.id] ?? 'maybe';
    verdict = drawn.reversed && base !== 'maybe' ? (base === 'yes' ? 'no' : 'yes') : base;
  }

  const title = mode === 'daily' ? ui.dailyTitle : ui.yesnoTitle;
  const lead = mode === 'daily' ? ui.dailyLead : ui.yesnoLead;
  const privacy = mode === 'daily' ? ui.dailyPrivacy : ui.yesnoPrivacy;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="page-back hover:text-amber-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={mode === 'daily' ? "/fortune/daily-tarot" : "/fortune/tarot-yesno"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🃏" className="h-6 w-6" /></span>
          <div className="hero-band">
            <PageHero title={title} desc={lead} />
          </div>
          {daily && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{daily.dateLabel}</p>
          )}
        </div>

        {mode === 'yesno' && !drawn && (
          <div className="text-center py-10">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{ui.question}</p>
            <button type="button" onClick={draw}
              className="w-full max-w-xs mx-auto block rounded-lg bg-sec font-bold py-4 text-base hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              {ui.draw}
            </button>
          </div>
        )}

        {/* 서버는 오늘이 언제인지 모른다 — 붙기 전까지는 자리만 잡아 둔다 */}
        {mode === 'daily' && !daily && (
          <div className="animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800 h-80" />
        )}

        {card && shown && reading && (
          <div className="space-y-4">
            {verdict && (
              <div className={`rounded-lg bg-gradient-to-br ${VERDICT_STYLE[verdict].gradient} p-6 text-white text-center`}>
                <div className="text-5xl mb-2">{VERDICT_STYLE[verdict].emoji}</div>
                <p className="text-2xl font-bold mb-2">{VERDICT_LABEL[lang][verdict]}</p>
                <p className="text-sm">{VERDICT_NOTE[lang][verdict]}</p>
              </div>
            )}

            <div className="rounded-lg p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}bb)` }}>
              <p className="text-xs font-bold text-white/80 mb-2">{ui.drawn}</p>
              <div className={`text-6xl mb-3 ${shown.reversed ? 'rotate-180' : ''} inline-block transition-transform`}>{card.emoji}</div>
              <p className="text-2xl font-bold mb-1">{cardName(shown.id, lang)}</p>
              <span className="inline-block text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">
                {shown.reversed ? ui.reversed : ui.upright}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {shown.reversed ? reading.reversed : reading.upright}
              </p>
            </div>

            {mode === 'daily' && daily && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-white shadow-sm" style={{ background: daily.color[1] }} />
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyColor', lang)}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{daily.color[0]}</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-1">
                    <span className="text-lg font-bold text-amber-600">{daily.number}</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyNumber', lang)}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{daily.number}</p>
                </div>
              </div>
            )}

            {mode === 'yesno' && (
              <button type="button" onClick={draw}
                className="w-full py-3.5 rounded-lg font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-amber-600 transition-colors">
                {ui.again}
              </button>
            )}

            <ReferralCards lang="en" placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{privacy}</p>
        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-3">{ui.disclaimer}</p>
      </div>
    </div>
  );
}
