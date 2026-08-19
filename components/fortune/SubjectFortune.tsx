'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import FortuneDisplayIntl from './FortuneDisplayIntl';
import { zodiacSigns, animals, bloodTypes, mbtiTypes, t, type Lang, type Subject } from '@/lib/fortune-intl';

/**
 * 별자리·띠·혈액형 운세의 공용 화면.
 *
 * 세 페이지는 "격자에서 주제를 고르면 그 주제의 오늘 운세를 보여준다"는
 * 구조가 완전히 같아서, 한국어 쪽처럼 페이지마다 복사해 두면 문구를 고칠 때
 * 세 군데를 똑같이 고쳐야 한다. en/zh는 처음부터 하나로 묶는다.
 */
export type SubjectKind = 'zodiac' | 'animal' | 'blood' | 'mbti';

const KIND_META: Record<SubjectKind, { seedPrefix: string; icon: string; cols: string }> = {
  zodiac: { seedPrefix: 'zodiac', icon: '⭐', cols: 'grid-cols-3' },
  animal: { seedPrefix: 'animal', icon: '🐉', cols: 'grid-cols-3' },
  blood:  { seedPrefix: 'blood',  icon: '🩸', cols: 'grid-cols-2' },
  mbti:   { seedPrefix: 'mbti',   icon: '🧠', cols: 'grid-cols-4' },
};

const TITLES: Record<SubjectKind, Record<Lang, string>> = {
  zodiac: {
    ko: '별자리 운세', en: 'Daily Horoscope', es: 'Horóscopo del día', 'pt-br': 'Horóscopo do dia',
    ja: '星座占い', de: 'Tageshoroskop', fr: 'Horoscope du jour', hi: 'राशिफल',
    'zh-hans': '星座运势', 'zh-hant': '星座運勢',
  },
  animal: {
    ko: '띠 운세', en: 'Chinese Zodiac Horoscope', es: 'Horóscopo chino', 'pt-br': 'Horóscopo chinês',
    ja: '干支占い', de: 'Chinesisches Horoskop', fr: 'Horoscope chinois', hi: 'चीनी राशिफल',
    'zh-hans': '生肖运势', 'zh-hant': '生肖運勢',
  },
  blood: {
    ko: '혈액형 운세', en: 'Blood Type Horoscope', es: 'Horóscopo por grupo sanguíneo', 'pt-br': 'Horóscopo por tipo sanguíneo',
    ja: '血液型占い', de: 'Blutgruppen-Horoskop', fr: 'Horoscope par groupe sanguin', hi: 'ब्लड ग्रुप राशिफल',
    'zh-hans': '血型运势', 'zh-hant': '血型運勢',
  },
  mbti: {
    ko: 'MBTI 운세', en: 'MBTI Daily Horoscope', es: 'Horóscopo MBTI', 'pt-br': 'Horóscopo MBTI',
    ja: 'MBTI占い', de: 'MBTI-Tageshoroskop', fr: 'Horoscope MBTI', hi: 'MBTI राशिफल',
    'zh-hans': 'MBTI 运势', 'zh-hant': 'MBTI 運勢',
  },
};

const PROMPTS: Record<SubjectKind, Record<Lang, string>> = {
  zodiac: {
    ko: '내 별자리를 선택하세요', en: 'Choose your star sign', es: 'Elige tu signo', 'pt-br': 'Escolha seu signo',
    ja: '星座を選んでください', de: 'Wähl dein Sternzeichen', fr: 'Choisissez votre signe', hi: 'अपनी राशि चुनें',
    'zh-hans': '选择你的星座', 'zh-hant': '選擇你的星座',
  },
  animal: {
    ko: '내 띠를 선택하세요', en: 'Choose your zodiac animal', es: 'Elige tu animal', 'pt-br': 'Escolha seu animal',
    ja: '干支を選んでください', de: 'Wähl dein Tierkreiszeichen', fr: 'Choisissez votre animal', hi: 'अपना राशि-पशु चुनें',
    'zh-hans': '选择你的生肖', 'zh-hant': '選擇你的生肖',
  },
  blood: {
    ko: '내 혈액형을 선택하세요', en: 'Choose your blood type', es: 'Elige tu grupo sanguíneo', 'pt-br': 'Escolha seu tipo sanguíneo',
    ja: '血液型を選んでください', de: 'Wähl deine Blutgruppe', fr: 'Choisissez votre groupe sanguin', hi: 'अपना ब्लड ग्रुप चुनें',
    'zh-hans': '选择你的血型', 'zh-hant': '選擇你的血型',
  },
  mbti: {
    ko: '내 MBTI를 선택하세요', en: 'Choose your MBTI type', es: 'Elige tu tipo MBTI', 'pt-br': 'Escolha seu tipo MBTI',
    ja: 'MBTIを選んでください', de: 'Wähl deinen MBTI-Typ', fr: 'Choisissez votre type MBTI', hi: 'अपना MBTI टाइप चुनें',
    'zh-hans': '选择你的 MBTI', 'zh-hant': '選擇你的 MBTI',
  },
};

const EMPTY: Record<Lang, string> = {
  ko: '선택하면 오늘의 운세를 볼 수 있습니다',
  en: 'Pick one above to see today’s reading',
  es: 'Elige uno arriba para ver la lectura de hoy',
  'pt-br': 'Escolha um acima para ver a leitura de hoje',
  ja: '上から選ぶと今日の運勢が出ます',
  de: 'Wähl oben eines aus, um das Tageshoroskop zu sehen',
  fr: 'Choisissez ci-dessus pour voir la lecture du jour',
  hi: 'ऊपर से एक चुनिए और आज का हाल देखिए',
  'zh-hans': '在上面选一个，看今天的运势',
  'zh-hant': '在上面選一個，看今天的運勢',
};

function subjectsFor(kind: SubjectKind, lang: Lang): readonly Subject[] {
  if (kind === 'zodiac') return zodiacSigns(lang);
  if (kind === 'animal') return animals(lang);
  if (kind === 'mbti') return mbtiTypes(lang);
  return bloodTypes(lang);
}

const SLUG_OF: Record<SubjectKind, string> = {
  zodiac: '/fortune/zodiac', animal: '/fortune/animal',
  blood: '/fortune/blood-type', mbti: '/fortune/mbti',
};

export default function SubjectFortune({ kind, lang }: { kind: SubjectKind; lang: Lang }) {
  const [selected, setSelected] = useState<string | null>(null);
  const meta = KIND_META[kind];
  const subjects = subjectsFor(kind, lang);
  const hubHref = lang === 'ko' ? '/fortune' : `/${lang}/fortune`;

  // 공유 링크(?id=)로 들어온 경우 선택 상태를 복원한다.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id && subjects.some(s => s.id === id)) setSelected(id);
  }, [subjects]);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const subject = subjects.find(s => s.id === selected);
  const title = TITLES[kind][lang];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="page-back hover:text-violet-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {subject ? subject.name : title}
          </span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={SLUG_OF[kind]} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="hero-band">
            <PageHero icon={meta.icon} title={title} desc={PROMPTS[kind][lang]} />
          </div>
        </div>

        <div className={`grid ${meta.cols} gap-2 mb-6`}>
          {subjects.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={`rounded-lg p-3 text-center transition-all border ${
                selected === s.id
                  ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <p className={`text-xs font-bold leading-tight ${selected === s.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{s.name}</p>
              {(s.period || s.nickname) && (
                <p className={`text-[10px] mt-0.5 ${selected === s.id ? 'text-violet-200' : 'text-slate-400 dark:text-slate-500'}`}>
                  {s.period ?? s.nickname}
                </p>
              )}
            </button>
          ))}
        </div>

        {subject ? (
          <div>
            {(subject.element || subject.trait) && (
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                {subject.element && <span>{subject.element}</span>}
                {subject.ruling && <><span className="text-slate-300 dark:text-slate-600">·</span><span>{subject.ruling}</span></>}
                {subject.trait && <span>{subject.trait}</span>}
                {subject.period && <><span className="text-slate-300 dark:text-slate-600">·</span><span>{subject.period}</span></>}
              </div>
            )}
            <FortuneDisplayIntl
              subjectId={`${meta.seedPrefix}-${subject.id}`}
              subjectName={subject.name}
              subjectEmoji={subject.emoji}
              badge={subject.period ?? subject.trait}
              lang={lang}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{EMPTY[lang]}</p>
          </div>
        )}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-10">{t('disclaimer', lang)}</p>
      </div>
    </div>
  );
}
