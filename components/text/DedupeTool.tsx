'use client';
import { useMemo, useState } from 'react';
import { dedupeLines, type DedupeOptions } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Stat, Toggle } from './ui';

export default function DedupeTool() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState<DedupeOptions>({
    dedupe: true, ignoreCase: false, ignoreSpace: true, removeBlank: true, sort: 'none', numbered: false,
  });

  const result = useMemo(() => dedupeLines(text, options), [text, options]);
  const set = (patch: Partial<DedupeOptions>) => setOptions(prev => ({ ...prev, ...patch }));

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={7}
        label="목록을 붙여 넣으세요 (한 줄에 하나)"
        placeholder={'김철수\n이영희\n김철수\n박민수'}
      />

      <div className={`${CARD} mt-4`}>
        <Toggle checked={!!options.dedupe} onChange={v => set({ dedupe: v })} label="중복 줄 제거" />
        <Toggle checked={!!options.ignoreSpace} onChange={v => set({ ignoreSpace: v })} label="앞뒤·중간 공백 차이는 같은 줄로" hint="'김철수'와 '김철수 '를 하나로 봅니다" />
        <Toggle checked={!!options.ignoreCase} onChange={v => set({ ignoreCase: v })} label="대소문자 차이는 같은 줄로" hint="Apple과 apple을 하나로 봅니다" />
        <Toggle checked={!!options.removeBlank} onChange={v => set({ removeBlank: v })} label="빈 줄 제거" />
        <Toggle checked={!!options.numbered} onChange={v => set({ numbered: v })} label="번호 매기기" hint="1. 2. 3. 을 앞에 붙입니다" />

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">정렬</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { v: 'none', label: '원래 순서' },
            { v: 'asc', label: '가나다순' },
            { v: 'desc', label: '역순' },
          ] as const).map(s => (
            <button
              key={s.v}
              onClick={() => set({ sort: s.v })}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                options.sort === s.v
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {text && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="원래 줄" value={result.total} />
          <Stat label="남은 줄" value={result.kept} accent="text-indigo-600" />
          <Stat label="지운 줄" value={result.removed} accent={result.removed > 0 ? 'text-rose-500' : undefined} />
        </div>
      )}

      <CopyBox value={result.text} label="정리된 목록" rows={7} />
    </div>
  );
}
