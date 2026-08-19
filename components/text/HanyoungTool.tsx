'use client';
import { useMemo, useState } from 'react';
import { koToEn, enToKo, guessDirection } from '@/lib/hangul';
import { CARD, CopyBox, InputArea } from './ui';

const SAMPLES = [
  { label: '영타로 친 한글', text: 'dkssudgktpdy' },
  { label: '한글로 친 영문', text: 'ㅅㄷㄴㅅ' },
  { label: '섞여 있는 문장', text: 'godlfdmf(qorPtu)' },
];

/*
 * 첫 값 (2026-08-19). 열면 입력이 비어 있고 결과가 전부 «—»라 도구가 죽어
 * 보였다 — 무엇을 하는 도구인지 손으로 쳐 보기 전에는 모른다. 저자가 적어 둔
 * 예시를 첫 값으로 올리면 열자마자 한 벌이 돌아간다.
 */
export default function HanyoungTool() {
  const [text, setText] = useState('dkssudgktpdy');
  const [manual, setManual] = useState<'auto' | 'ko-to-en' | 'en-to-ko'>('auto');

  const direction = manual === 'auto' ? guessDirection(text) : manual;
  const result = useMemo(() => {
    if (!text) return '';
    return direction === 'ko-to-en' ? koToEn(text) : enToKo(text);
  }, [text, direction]);

  const dirLabel = direction === 'ko-to-en' ? '한글 → 영타' : '영타 → 한글';

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={4}
        label="잘못 친 글자를 붙여 넣으세요"
        placeholder="예) dkssudgktpdy 또는 ㅅㄷㄴㅅ"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {([
          { v: 'auto', label: '자동 감지' },
          { v: 'en-to-ko', label: '영타 → 한글' },
          { v: 'ko-to-en', label: '한글 → 영타' },
        ] as const).map(b => (
          <button
            key={b.v}
            onClick={() => setManual(b.v)}
            className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${
              manual === b.v
                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
            }`}
          >
            {b.label}
          </button>
        ))}
        {text && (
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
            지금 {dirLabel}로 바꾸는 중
          </span>
        )}
      </div>

      <CopyBox value={result} label={`결과 (${dirLabel})`} rows={4} />

      {result && (
        <button
          onClick={() => { setText(result); setManual('auto'); }}
          className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-300 transition-colors"
        >
          ⇅ 결과를 다시 입력칸으로
        </button>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5">이렇게 써보세요</p>
        <div className="flex flex-col gap-2">
          {SAMPLES.map(s => (
            <button
              key={s.text}
              onClick={() => { setText(s.text); setManual('auto'); }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 text-left hover:border-indigo-300 transition-colors"
            >
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 w-24 shrink-0">{s.label}</span>
              <span className="text-sm font-mono text-slate-700 dark:text-slate-200 truncate">{s.text}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          두벌식 표준 자판 기준입니다. 세벌식이나 다른 배열로 친 글자는 다르게 나옵니다.
        </p>
      </div>
    </div>
  );
}
