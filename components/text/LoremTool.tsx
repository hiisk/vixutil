'use client';
import { useMemo, useState } from 'react';
import { generateLorem, trimToLength } from '@/lib/lorem-ko';
import { CARD, CopyBox, Stat } from './ui';

export default function LoremTool() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(4);
  const [limit, setLimit] = useState(0);
  const [seed, setSeed] = useState(1);

  const text = useMemo(() => {
    const raw = generateLorem({ lang, paragraphs, sentences, seed });
    return limit > 0 ? trimToLength(raw, limit) : raw;
  }, [lang, paragraphs, sentences, seed, limit]);

  const slider = (label: string, value: number, min: number, max: number, onChange: (n: number) => void, unit: string) => (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-sm font-black text-indigo-600 tabular-nums">
          {value === 0 ? '제한 없음' : `${value}${unit}`}
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
          {([
            { v: 'ko', label: '한글 문장' },
            { v: 'en', label: '영문 (Lorem ipsum)' },
          ] as const).map(b => (
            <button
              key={b.v}
              onClick={() => setLang(b.v)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                lang === b.v
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {slider('문단 수', paragraphs, 1, 10, setParagraphs, '개')}
          {slider('문단당 문장 수', sentences, 1, 10, setSentences, '문장')}
          {slider('글자수 제한', limit, 0, 2000, setLimit, '자')}
        </div>

        <button
          onClick={() => setSeed(s => s + 1)}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-slate-500 to-sky-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
        >
          🔄 다른 문장으로 다시 만들기
        </button>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          같은 설정이면 같은 결과가 나옵니다 (현재 {seed}번째)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="글자수" value={text.length} accent="text-indigo-600" />
        <Stat label="문단" value={text.split('\n\n').length} />
        <Stat label="단어" value={text.trim().split(/\s+/).length} />
      </div>

      <CopyBox value={text} label="생성된 텍스트" rows={10} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">왜 한글 더미가 필요한가요?</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          영문 로렘입숨은 한글보다 글자 폭이 좁고 띄어쓰기가 잦아서, 같은 자리에 실제 한글을 넣으면
          줄 수가 늘고 레이아웃이 무너집니다. 한글 화면을 만들 때는 한글 더미로 확인하세요.
        </p>
      </div>
    </div>
  );
}
