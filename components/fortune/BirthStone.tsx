'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { t, birthInfo, type Lang } from '@/lib/fortune-intl';
import type { BirthInfo } from '@/lib/fortune-l10n/index';
import { MONTHS, MONTHS_SHORT } from '@/lib/fortune-form-intl';


type IntlLang = Exclude<Lang, 'ko'>;

const COPY: Record<IntlLang, {
  title: string; lead: string;
  stoneOf: (m: number) => string;
  flowerOf: (m: number) => string;
  meaning: string;
  bornIn: (m: number) => string;
  monthLabel: (m: number) => string;
  note: string;
}> = {
  en: {
    title: 'Birthstone & Birth Flower',
    lead: 'Find the gem and flower of your birth month, and what they stand for',
    stoneOf: m => `Birthstone for ${MONTHS.en[m - 1]}`,
    flowerOf: m => `Birth flower for ${MONTHS.en[m - 1]}`,
    meaning: 'Meaning',
    bornIn: m => `If you were born in ${MONTHS.en[m - 1]}`,
    monthLabel: m => MONTHS_SHORT.en[m - 1],
    note: 'Birthstones and birth flowers are widely known traditions; the personality notes are just for fun.',
  },
  es: {
    title: 'Piedra y flor de nacimiento',
    lead: 'Descubre la gema y la flor de tu mes de nacimiento, y qué representan',
    stoneOf: m => `Piedra de ${MONTHS.es[m - 1]}`,
    flowerOf: m => `Flor de ${MONTHS.es[m - 1]}`,
    meaning: 'Significado',
    bornIn: m => `Si naciste en ${MONTHS.es[m - 1]}`,
    monthLabel: m => MONTHS_SHORT.es[m - 1],
    note: 'Las piedras y flores de nacimiento son tradiciones muy conocidas; las notas de personalidad son solo para divertirse.',
  },
  'pt-br': {
    title: 'Pedra e flor de nascimento',
    lead: 'Descubra a gema e a flor do seu mês de nascimento, e o que elas representam',
    stoneOf: m => `Pedra de ${MONTHS['pt-br'][m - 1]}`,
    flowerOf: m => `Flor de ${MONTHS['pt-br'][m - 1]}`,
    meaning: 'Significado',
    bornIn: m => `Se você nasceu em ${MONTHS['pt-br'][m - 1]}`,
    monthLabel: m => MONTHS_SHORT['pt-br'][m - 1],
    note: 'Pedras e flores de nascimento são tradições bem conhecidas; as notas de personalidade são só por diversão.',
  },
  ja: {
    title: '誕生石と誕生花',
    lead: '生まれ月の宝石と花、そしてその意味を見ます',
    stoneOf: m => `${MONTHS.ja[m - 1]}の誕生石`,
    flowerOf: m => `${MONTHS.ja[m - 1]}の誕生花`,
    meaning: '意味',
    bornIn: m => `${MONTHS.ja[m - 1]}生まれの人は`,
    monthLabel: m => MONTHS_SHORT.ja[m - 1],
    note: '誕生石と誕生花は広く知られた慣習です。性格の話は遊びとして読んでください。',
  },
  de: {
    title: 'Geburtsstein und Geburtsblume',
    lead: 'Finde Edelstein und Blume deines Geburtsmonats — und wofür sie stehen',
    stoneOf: m => `Geburtsstein für ${MONTHS.de[m - 1]}`,
    flowerOf: m => `Geburtsblume für ${MONTHS.de[m - 1]}`,
    meaning: 'Bedeutung',
    bornIn: m => `Wenn du im ${MONTHS.de[m - 1]} geboren bist`,
    monthLabel: m => MONTHS_SHORT.de[m - 1],
    note: 'Geburtssteine und Geburtsblumen sind weithin bekannte Überlieferungen; die Bemerkungen zur Persönlichkeit sind reiner Spaß.',
  },
  fr: {
    title: 'Pierre et fleur de naissance',
    lead: 'Trouvez la gemme et la fleur de votre mois de naissance, et ce qu’elles représentent',
    stoneOf: m => `Pierre de ${MONTHS.fr[m - 1]}`,
    flowerOf: m => `Fleur de ${MONTHS.fr[m - 1]}`,
    meaning: 'Signification',
    bornIn: m => `Si vous êtes né en ${MONTHS.fr[m - 1]}`,
    monthLabel: m => MONTHS_SHORT.fr[m - 1],
    note: 'Les pierres et fleurs de naissance sont des traditions largement connues ; les notes de personnalité sont purement ludiques.',
  },
  hi: {
    title: 'जन्म रत्न और जन्म पुष्प',
    lead: 'अपने जन्म महीने का रत्न और फूल जानिए, और वे किसका प्रतीक हैं',
    stoneOf: m => `${MONTHS.hi[m - 1]} का जन्म रत्न`,
    flowerOf: m => `${MONTHS.hi[m - 1]} का जन्म पुष्प`,
    meaning: 'अर्थ',
    bornIn: m => `अगर आप ${MONTHS.hi[m - 1]} में जन्मे हैं`,
    monthLabel: m => MONTHS_SHORT.hi[m - 1],
    note: 'जन्म रत्न और जन्म पुष्प जानी-मानी परंपराएँ हैं; व्यक्तित्व वाली बातें सिर्फ़ मज़े के लिए हैं।',
  },
  'zh-hans': {
    title: '诞生石与诞生花',
    lead: '看看你出生月份的宝石和花，以及它们代表什么',
    stoneOf: m => `${MONTHS['zh-hans'][m - 1]}的诞生石`,
    flowerOf: m => `${MONTHS['zh-hans'][m - 1]}的诞生花`,
    meaning: '含义',
    bornIn: m => `${MONTHS['zh-hans'][m - 1]}出生的人`,
    monthLabel: m => MONTHS_SHORT['zh-hans'][m - 1],
    note: '诞生石和诞生花是流传很广的说法；性格部分只是图个乐。',
  },
  'zh-hant': {
    title: '誕生石與誕生花',
    lead: '看看你出生月份的寶石和花，以及它們代表什麼',
    stoneOf: m => `${MONTHS['zh-hant'][m - 1]}的誕生石`,
    flowerOf: m => `${MONTHS['zh-hant'][m - 1]}的誕生花`,
    meaning: '含義',
    bornIn: m => `${MONTHS['zh-hant'][m - 1]}出生的人`,
    monthLabel: m => MONTHS_SHORT['zh-hant'][m - 1],
    note: '誕生石和誕生花是流傳很廣的說法；性格部分只是圖個樂。',
  },
};

/** 탄생석 데이터의 모양 — 원래 fortune-zh.ts에서 가져오던 타입을 여기 둔다 */
type Info = BirthInfo;


export default function BirthStone({ lang }: { lang: Exclude<Lang, 'ko'> }) {
  const [result, setResult] = useState<Info | null>(null);
  const data: readonly Info[] = birthInfo(lang);
  const c = COPY[lang];
  const hubHref = `/${lang}/fortune`;

  function pick(month: number) {
    setResult(data.find(b => b.month === month) ?? null);
    setTimeout(() => document.getElementById('bs-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="page-back hover:text-fuchsia-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={"/fortune/birth-stone"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <ToolIcon emoji="💎" className="w-12 h-12 mx-auto mb-2 text-slate-800 dark:text-slate-100" />
          <PageHero title={c.title} desc={c.lead} />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
          {data.map(b => (
            <button
              key={b.month}
              type="button"
              onClick={() => pick(b.month)}
              className={`rounded-xl py-2.5 text-sm font-bold border transition-all ${result?.month === b.month
                ? 'bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white border-transparent'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-fuchsia-300'}`}
            >
              {c.monthLabel(b.month)}
            </button>
          ))}
        </div>

        {result && (
          <div id="bs-result" className="bs-pop">
            <div
              className="relative rounded-3xl text-white p-8 mb-4 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}bb)` }}
            >
              <div className="text-7xl mb-2 drop-shadow-lg">{result.emoji}</div>
              <div className="text-xs font-bold text-white/85">{c.stoneOf(result.month)}</div>
              <div className="text-3xl font-black drop-shadow">{result.stone}</div>
              <div className="inline-block mt-3 text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">
                {result.stoneMeaning}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 mb-4">
              <div className="flex items-center gap-3">
                <ToolIcon emoji="🌸" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
                <div>
                  <div className="text-xs font-bold text-slate-400">{c.flowerOf(result.month)}</div>
                  <div className="text-lg font-black text-slate-800 dark:text-slate-100">{result.flower}</div>
                  <div className="text-sm text-fuchsia-600 dark:text-fuchsia-300 font-medium">{c.meaning} · {result.flowerMeaning}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 mb-6">
              <div className="text-xs font-black text-fuchsia-600 mb-2">{c.bornIn(result.month)}</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.blurb}</p>
            </div>

            <ReferralCards lang="en" placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">{c.note}</p>
      </div>

      <style jsx>{`
        @keyframes bsPop { 0% { opacity: 0; transform: translateY(10px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .bs-pop { animation: bsPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
