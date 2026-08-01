'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { calcZodiacMatch } from '@/lib/zodiac-match';
import { calcStarMatch, SIGNS } from '@/lib/star-match';
import { calcMbtiMatch, MBTI_TYPES, type MbtiType } from '@/lib/mbti-match';
import { calcBloodMatch, type BloodType } from '@/lib/blood-match';
import { animals, zodiacSigns, bloodTypes, t, type Lang } from '@/lib/fortune-intl';
import {
  ZODIAC_MATCH_TEXT, STAR_MATCH_TEXT, MBTI_MATCH_TEXT, MBTI_AXIS_TEXT, BLOOD_MATCH_TEXT, MATCH_UI,
  type IntlLang,
} from '@/lib/match-intl';

export type MatchKind = 'zodiac' | 'star' | 'mbti' | 'blood';

const TITLES: Record<MatchKind, Record<IntlLang, string>> = {
  zodiac: {
    en: 'Chinese Zodiac Compatibility', es: 'Compatibilidad del horóscopo chino', 'pt-br': 'Compatibilidade do horóscopo chinês',
    ja: '干支の相性', de: 'Chinesische Tierkreis-Kompatibilität', fr: 'Compatibilité de l’horoscope chinois',
    hi: 'चीनी राशि की जोड़ी', 'zh-hans': '生肖配对', 'zh-hant': '生肖配對',
  },
  star: {
    en: 'Star Sign Compatibility', es: 'Compatibilidad de signos', 'pt-br': 'Compatibilidade de signos',
    ja: '星座の相性', de: 'Sternzeichen-Kompatibilität', fr: 'Compatibilité des signes',
    hi: 'राशियों की जोड़ी', 'zh-hans': '星座配对', 'zh-hant': '星座配對',
  },
  mbti: {
    en: 'MBTI Compatibility', es: 'Compatibilidad MBTI', 'pt-br': 'Compatibilidade MBTI',
    ja: 'MBTIの相性', de: 'MBTI-Kompatibilität', fr: 'Compatibilité MBTI',
    hi: 'MBTI जोड़ी', 'zh-hans': 'MBTI 配对', 'zh-hant': 'MBTI 配對',
  },
  blood: {
    en: 'Blood Type Compatibility', es: 'Compatibilidad por grupo sanguíneo', 'pt-br': 'Compatibilidade por tipo sanguíneo',
    ja: '血液型の相性', de: 'Blutgruppen-Kompatibilität', fr: 'Compatibilité des groupes sanguins',
    hi: 'ब्लड ग्रुप जोड़ी', 'zh-hans': '血型配对', 'zh-hant': '血型配對',
  },
};

const LEADS: Record<MatchKind, Record<IntlLang, string>> = {
  zodiac: {
    en: 'Pick two animals to see how the traditional harmonies read them',
    es: 'Elige dos animales y mira cómo los leen las armonías tradicionales',
    'pt-br': 'Escolha dois animais e veja como as harmonias tradicionais os leem',
    ja: '干支を二つ選ぶと、伝統的な相性の見方でどう読まれるかが出ます',
    de: 'Wähl zwei Tiere und sieh, wie die überlieferten Harmonien sie lesen',
    fr: 'Choisissez deux animaux et voyez ce qu’en disent les harmonies traditionnelles',
    hi: 'दो राशि-पशु चुनिए और देखिए कि परंपरागत मेल उन्हें कैसे पढ़ते हैं',
    'zh-hans': '选两个生肖，看看传统的合冲怎么说',
    'zh-hant': '選兩個生肖，看看傳統的合沖怎麼說',
  },
  star: {
    en: 'Pick two signs to see how their elements match up',
    es: 'Elige dos signos y mira cómo encajan sus elementos',
    'pt-br': 'Escolha dois signos e veja como os elementos combinam',
    ja: '星座を二つ選ぶと、エレメントの噛み合い方が出ます',
    de: 'Wähl zwei Sternzeichen und sieh, wie ihre Elemente zusammenpassen',
    fr: 'Choisissez deux signes et voyez comment leurs éléments s’accordent',
    hi: 'दो राशियाँ चुनिए और देखिए उनके तत्व कैसे मिलते हैं',
    'zh-hans': '选两个星座，看看两者的元素合不合',
    'zh-hant': '選兩個星座，看看兩者的元素合不合',
  },
  mbti: {
    en: 'Pick two types to see how the four axes line up',
    es: 'Elige dos tipos y mira cómo se alinean los cuatro ejes',
    'pt-br': 'Escolha dois tipos e veja como os quatro eixos se alinham',
    ja: 'タイプを二つ選ぶと、四つの指標の並び方が出ます',
    de: 'Wähl zwei Typen und sieh, wie die vier Achsen zusammenlaufen',
    fr: 'Choisissez deux types et voyez comment les quatre axes s’alignent',
    hi: 'दो टाइप चुनिए और देखिए चारों अक्ष कैसे मिलते हैं',
    'zh-hans': '选两个类型，看看四个维度怎么对上',
    'zh-hant': '選兩個類型，看看四個維度怎麼對上',
  },
  blood: {
    en: 'Pick two blood types to see how the pairing reads',
    es: 'Elige dos grupos sanguíneos y mira cómo se lee la pareja',
    'pt-br': 'Escolha dois tipos sanguíneos e veja como a dupla é lida',
    ja: '血液型を二つ選ぶと、その組み合わせの読みが出ます',
    de: 'Wähl zwei Blutgruppen und sieh, wie das Paar gelesen wird',
    fr: 'Choisissez deux groupes sanguins et voyez ce que donne la paire',
    hi: 'दो ब्लड ग्रुप चुनिए और देखिए यह जोड़ी कैसी पढ़ी जाती है',
    'zh-hans': '选两个血型，看看这组配对怎么读',
    'zh-hant': '選兩個血型，看看這組配對怎麼讀',
  },
};

const ICONS: Record<MatchKind, string> = { zodiac: '🐲', star: '⭐', mbti: '🧠', blood: '🩸' };

interface Option { id: string; name: string; emoji: string }

function optionsFor(kind: MatchKind, lang: IntlLang): Option[] {
  if (kind === 'zodiac') return animals(lang).map(a => ({ id: a.id, name: a.name, emoji: a.emoji }));
  if (kind === 'star') return zodiacSigns(lang).map(s => ({ id: s.id, name: s.name, emoji: s.emoji }));
  if (kind === 'blood') return bloodTypes(lang).map(b => ({ id: b.id, name: b.name, emoji: b.emoji }));
  return MBTI_TYPES.map(m => ({ id: m, name: m, emoji: '🧩' }));
}

/** blood-match.ts의 key()와 같은 규칙 — 문자열 정렬은 'AB'를 'B' 앞에 놓아 어긋난다 */
const BLOOD_ORDER: Record<string, number> = { A: 0, B: 1, O: 2, AB: 3 };
function bloodKey(a: string, b: string): string {
  return BLOOD_ORDER[a] <= BLOOD_ORDER[b] ? `${a}-${b}` : `${b}-${a}`;
}

interface Outcome { score: number; emoji: string; label: string; headline: string; reason: string; love: string; advice: string }

/** 판정은 한국어 lib의 순수 함수를 그대로 쓰고, 문구만 언어별로 바꿔 끼운다 */
function evaluate(kind: MatchKind, lang: IntlLang, aIdx: number, bIdx: number): Outcome {
  if (kind === 'zodiac') {
    const r = calcZodiacMatch(aIdx, bIdx);
    const txt = ZODIAC_MATCH_TEXT[lang][r.type];
    return { score: r.score, emoji: r.info.emoji, ...txt };
  }
  if (kind === 'star') {
    const r = calcStarMatch(aIdx, bIdx);
    const txt = STAR_MATCH_TEXT[lang][r.type];
    return { score: r.score, emoji: r.info.emoji, ...txt };
  }
  if (kind === 'blood') {
    const ids = ['A', 'B', 'O', 'AB'] as const;
    const r = calcBloodMatch(ids[aIdx] as BloodType, ids[bIdx] as BloodType);
    const txt = BLOOD_MATCH_TEXT[lang][bloodKey(ids[aIdx], ids[bIdx])];
    return { score: r.score, emoji: r.emoji, ...txt };
  }
  const a = MBTI_TYPES[aIdx] as MbtiType;
  const b = MBTI_TYPES[bIdx] as MbtiType;
  const r = calcMbtiMatch(a, b);
  const txt = MBTI_MATCH_TEXT[lang][r.info.band];
  return { score: r.score, emoji: r.info.emoji, ...txt, reason: mbtiReason(a, b, lang) };
}

/** 한국어 reasonText와 같은 규칙으로 축별 문장을 조립한다 */
function mbtiReason(a: MbtiType, b: MbtiType, lang: IntlLang): string {
  const x = MBTI_AXIS_TEXT[lang];
  const parts: string[] = [];
  parts.push(a[1] === b[1] ? x.nsSame : x.nsDiff);
  parts.push(a[2] === b[2] ? x.tfSame : x.tfDiff);
  if (a[0] !== b[0]) parts.push(x.eiDiff);
  if (a[3] !== b[3]) parts.push(x.jpDiff);
  return parts.join(x.join) + x.end;
}

function scoreColor(score: number): string {
  if (score >= 85) return 'from-rose-500 to-pink-600';
  if (score >= 75) return 'from-amber-400 to-orange-500';
  if (score >= 60) return 'from-sky-500 to-blue-600';
  return 'from-slate-500 to-slate-600';
}

export default function MatchFortune({ kind, lang }: { kind: MatchKind; lang: IntlLang }) {
  const [a, setA] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);
  const ui = MATCH_UI[lang];
  const options = optionsFor(kind, lang);
  const cols = kind === 'mbti' ? 'grid-cols-4' : kind === 'blood' ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-6';

  const result = a !== null && b !== null ? evaluate(kind, lang, a, b) : null;
  // star-match의 SIGNS 순서가 fortune-intl의 zodiacSigns와 같은지는 테스트로 고정한다.
  void SIGNS;

  function Picker({ value, onPick, label }: { value: number | null; onPick: (i: number) => void; label: string }) {
    return (
      <div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
        <div className={`grid ${cols} gap-1.5`}>
          {options.map((o, i) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onPick(i)}
              className={`rounded-xl py-2 px-1 text-center border transition-all ${
                value === i
                  ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              {kind !== 'mbti' && <div className="text-lg leading-none mb-0.5">{o.emoji}</div>}
              <div className="text-[11px] font-bold leading-tight truncate">{o.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{TITLES[kind][lang]}</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{ICONS[kind]}</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{TITLES[kind][lang]}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{LEADS[kind][lang]}</p>
        </div>

        <div className="space-y-4 mb-6">
          <Picker value={a} onPick={setA} label={ui.you} />
          <Picker value={b} onPick={setB} label={ui.partner} />
        </div>

        {result ? (
          <div className="space-y-4">
            <div className={`rounded-3xl bg-gradient-to-br ${scoreColor(result.score)} text-white p-8 text-center`}>
              <div className="text-5xl mb-2">{result.emoji}</div>
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/85 mb-2">
                <span>{options[a!].emoji} {options[a!].name}</span>
                <span>×</span>
                <span>{options[b!].emoji} {options[b!].name}</span>
              </div>
              <div className="text-5xl font-black drop-shadow">{result.score}</div>
              <div className="text-xs font-bold text-white/85 mb-3">{ui.score}</div>
              <div className="inline-block text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">{result.label}</div>
              <p className="text-sm text-white/90 mt-3">{result.headline}</p>
            </div>

            {[
              { label: ui.why, body: result.reason, accent: 'text-violet-600' },
              { label: ui.love, body: result.love, accent: 'text-rose-600' },
              { label: ui.advice, body: result.advice, accent: 'text-amber-600' },
            ].map(sec => (
              <div key={sec.label} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
                <div className={`text-xs font-black ${sec.accent} mb-2`}>{sec.label}</div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{sec.body}</p>
              </div>
            ))}

            <button
              type="button"
              onClick={() => { setA(null); setB(null); }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-600 dark:text-slate-300 py-3 hover:border-violet-300 transition-colors"
            >
              {ui.reset}
            </button>

            <ReferralCards lang="en" placement="result" />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{ui.pickBoth}</p>
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{ui.disclaimer}</p>
      </div>
    </div>
  );
}
