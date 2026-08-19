'use client';
import { useMemo, useState } from 'react';
import { countText } from '@/lib/text-clean';
import { CARD, InputArea, Stat } from './ui';
import { MANUSCRIPT_UI, type TextLang } from '@/lib/text-ui-intl';

/** 자기소개서에서 흔히 요구하는 글자 수 */
const TARGETS = [500, 800, 1000, 1500];

export default function ManuscriptTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = MANUSCRIPT_UI[lang];
  const [text, setText] = useState('');
  const [target, setTarget] = useState(1000);
  const [countSpace, setCountSpace] = useState(true);

  const stats = useMemo(() => countText(text), [text]);
  const used = countSpace ? stats.chars : stats.charsNoSpace;
  const left = target - used;
  const ratio = Math.min(100, Math.round((used / target) * 100));

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={9} label={ui.inputLabel} placeholder={ui.placeholder} lang={lang} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        <Stat label={ui.withSpaces} value={stats.chars} accent="text-indigo-600" />
        <Stat label={ui.withoutSpaces} value={stats.charsNoSpace} accent="text-violet-600" />
        <Stat label={ui.sheets200} value={ui.sheetSuffix(stats.sheets200)} />
        <Stat label={ui.sheets400} value={ui.sheetSuffix(stats.sheets400)} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        <Stat label={ui.words} value={stats.words} />
        <Stat label={ui.lines} value={stats.lines} />
        <Stat label={ui.paragraphs} value={stats.paragraphs} />
        <Stat label={ui.bytes} value={stats.bytes} />
      </div>

      <div className={`${CARD} mt-4`}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.targetTitle}</p>
          <button
            onClick={() => setCountSpace(v => !v)}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            {countSpace ? ui.countingWith : ui.countingWithout}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {TARGETS.map(t => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors tabular-nums ${
                target === t
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {ui.charSuffix(t)}
            </button>
          ))}
        </div>

        <div className="mt-4 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-[width] ${left < 0 ? 'bg-rose-500' : 'bg-sec'}`}
            style={{ width: `${ratio}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-bold text-center">
          {text === '' ? (
            <span className="text-slate-400 dark:text-slate-500">{ui.emptyHint}</span>
          ) : left >= 0 ? (
            <span className="text-slate-600 dark:text-slate-300">
              <span className="text-indigo-600">{ui.used(used, target, left)}</span>
            </span>
          ) : (
            <span className="text-rose-500">{ui.over(used, target, -left)}</span>
          )}
        </p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.notes.map(n => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </div>
  );
}
