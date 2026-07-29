'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { TAROT_CARDS, seededInt, LUCKY_COLORS } from '@/lib/fortune-data';
import { TAROT_NAMES_ZH, TAROT_READINGS, TAROT_UI, type TarotIntlLang } from '@/lib/tarot-intl';
import { t, formatToday } from '@/lib/fortune-intl';

/**
 * 오늘의 타로 / 타로 예스·노 — en/zh판.
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
  zh: {
    yes: '走势是正面的。相信自己，可以往前推。',
    no: '此刻宜谨慎。先缓一拍，重新想一想再动。',
    maybe: '目前还是各半。条件和时机都需要再看看。',
  },
};

const VERDICT_LABEL: Record<TarotIntlLang, Record<Verdict, string>> = {
  en: { yes: 'Yes', no: 'No', maybe: 'Not yet clear' },
  zh: { yes: '是', no: '否', maybe: '尚未明朗' },
};

function ymd(d: Date) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

function cardName(id: number, lang: TarotIntlLang) {
  const card = TAROT_CARDS[id];
  return lang === 'zh' ? (TAROT_NAMES_ZH[id] ?? card.nameEn) : card.nameEn;
}

export default function TarotIntl({ mode, lang }: { mode: Mode; lang: TarotIntlLang }) {
  const ui = TAROT_UI[lang];

  // 오늘의 타로 — 날짜 시드라 하루 종일 같은 카드가 나온다
  const daily = useMemo(() => {
    if (mode !== 'daily') return null;
    const key = ymd(new Date());
    const idx = seededInt(`daily-tarot-${key}`) % TAROT_CARDS.length;
    return {
      id: idx,
      reversed: seededInt(`daily-tarot-rev-${key}`) % 100 < 35,
      color: LUCKY_COLORS[seededInt(`daily-tarot-color-${key}`) % LUCKY_COLORS.length],
      number: (seededInt(`daily-tarot-num-${key}`) % 45) + 1,
    };
  }, [mode]);

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
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🃏</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{lead}</p>
          {mode === 'daily' && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{formatToday(lang)}</p>
          )}
        </div>

        {mode === 'yesno' && !drawn && (
          <div className="text-center py-10">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{ui.question}</p>
            <button type="button" onClick={draw}
              className="w-full max-w-xs mx-auto block rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black py-4 text-base hover:-translate-y-0.5 hover:shadow-xl transition-all">
              {ui.draw}
            </button>
          </div>
        )}

        {card && shown && reading && (
          <div className="space-y-4">
            {verdict && (
              <div className={`rounded-2xl bg-gradient-to-br ${VERDICT_STYLE[verdict].gradient} p-6 text-white text-center`}>
                <div className="text-5xl mb-2">{VERDICT_STYLE[verdict].emoji}</div>
                <p className="text-2xl font-black mb-2">{VERDICT_LABEL[lang][verdict]}</p>
                <p className="text-sm">{VERDICT_NOTE[lang][verdict]}</p>
              </div>
            )}

            <div className="rounded-2xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}bb)` }}>
              <p className="text-xs font-bold text-white/80 mb-2">{ui.drawn}</p>
              <div className={`text-6xl mb-3 ${shown.reversed ? 'rotate-180' : ''} inline-block transition-transform`}>{card.emoji}</div>
              <p className="text-2xl font-black mb-1">{cardName(shown.id, lang)}</p>
              <span className="inline-block text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">
                {shown.reversed ? ui.reversed : ui.upright}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {shown.reversed ? reading.reversed : reading.upright}
              </p>
            </div>

            {mode === 'daily' && daily && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-white shadow-sm" style={{ background: daily.color[1] }} />
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyColor', lang)}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{daily.color[0]}</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-1">
                    <span className="text-lg font-black text-amber-600">{daily.number}</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyNumber', lang)}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{daily.number}</p>
                </div>
              </div>
            )}

            {mode === 'yesno' && (
              <button type="button" onClick={draw}
                className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300 hover:text-amber-600 transition-colors">
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
