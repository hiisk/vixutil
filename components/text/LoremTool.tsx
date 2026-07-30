'use client';
import { useMemo, useState } from 'react';
import { generateLorem, trimToLength } from '@/lib/lorem-ko';
import { CARD, CopyBox, Stat } from './ui';
import { LOREM_UI, type TextLang } from '@/lib/text-ui-intl';

export default function LoremTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = LOREM_UI[lang];
  /*
    더미 문장의 언어는 화면 언어와 별개다 — 영어 화면에서 CJK 더미를 뽑는 일이 흔하다.
    다만 CJK 쪽을 고르면 그 화면의 언어를 따라야 한다. 중국어 화면에서 한글 더미가
    나오면 그건 고를 수 있는 선택지가 아니라 그냥 잘못 나온 값이다.
  */
  const cjk: 'ko' | 'zh' = lang === 'zh' ? 'zh' : 'ko';
  const [dummy, setDummy] = useState<'ko' | 'en' | 'zh'>(lang === 'en' ? 'en' : cjk);
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(4);
  const [limit, setLimit] = useState(0);
  const [seed, setSeed] = useState(1);

  const text = useMemo(() => {
    const raw = generateLorem({ lang: dummy, paragraphs, sentences, seed });
    return limit > 0 ? trimToLength(raw, limit) : raw;
  }, [dummy, paragraphs, sentences, seed, limit]);

  const slider = (label: string, value: number, min: number, max: number, onChange: (n: number) => void, unit: string) => (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-sm font-black text-indigo-600 tabular-nums">
          {value === 0 ? ui.noLimit : `${value}${unit}`}
        </span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500" aria-label={label}
      />
    </div>
  );

  return (
    <div>
      <div className={CARD}>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {([{ v: cjk }, { v: 'en' as const }] as const).map((b, i) => (
            <button
              key={b.v}
              onClick={() => setDummy(b.v)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                dummy === b.v
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {ui.langs[i]}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {slider(ui.paragraphCount, paragraphs, 1, 10, setParagraphs, ui.paragraphUnit)}
          {slider(ui.sentenceCount, sentences, 1, 10, setSentences, ui.sentenceUnit)}
          {slider(ui.charLimit, limit, 0, 2000, setLimit, ui.charUnit)}
        </div>

        <button
          onClick={() => setSeed(s => s + 1)}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-slate-500 to-sky-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
        >
          {ui.regenerate}
        </button>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          {ui.sameSeed(seed)}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.charCount} value={text.length} accent="text-indigo-600" />
        <Stat label={ui.paragraphs} value={text.split('\n\n').length} />
        <Stat label={ui.words} value={text.trim().split(/\s+/).length} />
      </div>

      <CopyBox value={text} label={ui.outputLabel} rows={10} lang={lang} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
