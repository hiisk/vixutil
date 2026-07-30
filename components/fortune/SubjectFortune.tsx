'use client';
import ToolIcon from '@/components/ToolIcon';
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
  zodiac: { ko: '별자리 운세', en: 'Daily Horoscope' },
  animal: { ko: '띠 운세',     en: 'Chinese Zodiac Horoscope' },
  blood:  { ko: '혈액형 운세', en: 'Blood Type Horoscope' },
  mbti:   { ko: 'MBTI 운세',   en: 'MBTI Daily Horoscope' },
};

const PROMPTS: Record<SubjectKind, Record<Lang, string>> = {
  zodiac: { ko: '내 별자리를 선택하세요', en: 'Choose your star sign' },
  animal: { ko: '내 띠를 선택하세요',     en: 'Choose your zodiac animal' },
  blood:  { ko: '내 혈액형을 선택하세요', en: 'Choose your blood type' },
  mbti:   { ko: '내 MBTI를 선택하세요',   en: 'Choose your MBTI type' },
};

const EMPTY: Record<Lang, string> = {
  ko: '선택하면 오늘의 운세를 볼 수 있습니다',
  en: 'Pick one above to see today’s reading',
};

function subjectsFor(kind: SubjectKind, lang: Lang): readonly Subject[] {
  if (kind === 'zodiac') return zodiacSigns(lang);
  if (kind === 'animal') return animals(lang);
  if (kind === 'mbti') return mbtiTypes(lang);
  return bloodTypes(lang);
}

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
      <div className="h-1 bg-gradient-to-r from-violet-600 to-purple-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {subject ? subject.name : title}
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{meta.icon} {title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{PROMPTS[kind][lang]}</p>
        </div>

        <div className={`grid ${meta.cols} gap-2 mb-6`}>
          {subjects.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={`rounded-2xl p-3 text-center transition-all border ${
                selected === s.id
                  ? 'bg-violet-600 border-violet-600 text-white shadow-md'
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
