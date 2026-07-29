'use client';
import { useMemo, useState } from 'react';
import { cleanText, DEFAULT_CLEAN, type CleanOptions } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Toggle } from './ui';

const OPTIONS: { key: keyof CleanOptions; label: string; hint: string }[] = [
  { key: 'invisible', label: '보이지 않는 문자 제거', hint: '폭 없는 공백·BOM 등 — 글자 수만 늘리고 검색을 망칩니다' },
  { key: 'oddSpace', label: '특수 공백을 일반 공백으로', hint: '공백처럼 보이지만 다른 문자(NBSP 등)' },
  { key: 'collapseSpaces', label: '중복 공백 하나로', hint: '두 칸 이상 띄어진 곳을 한 칸으로' },
  { key: 'trimLines', label: '줄 앞뒤 공백 제거', hint: '' },
  { key: 'blankLines', label: '연속 빈 줄 줄이기', hint: '세 줄 이상 비어 있으면 한 줄만 남깁니다' },
  { key: 'joinLines', label: '끊긴 줄 이어 붙이기', hint: 'PDF에서 복사하면 문장 중간에서 줄이 끊깁니다' },
  { key: 'smartQuotes', label: '굽은 따옴표를 일반 따옴표로', hint: '“ ” ‘ ’ → " \'' },
  { key: 'stripHtml', label: 'HTML 태그 제거', hint: '<p> 같은 태그를 지웁니다' },
];

export default function CleanTool() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState<CleanOptions>(DEFAULT_CLEAN);

  const result = useMemo(() => cleanText(text, options), [text, options]);
  const entries = Object.entries(result.counts);
  const shrunk = text.length - result.text.length;

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={7}
        label="정리할 글을 붙여 넣으세요"
        placeholder="PDF·웹·워드에서 복사한 글을 그대로 붙여 넣으면 됩니다"
      />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">무엇을 정리할까요</p>
        <div className="grid sm:grid-cols-2 gap-x-4">
          {OPTIONS.map(o => (
            <Toggle
              key={o.key}
              checked={!!options[o.key]}
              onChange={v => setOptions(prev => ({ ...prev, [o.key]: v }))}
              label={o.label}
              hint={o.hint}
            />
          ))}
        </div>
      </div>

      {text && (
        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            {entries.length === 0 ? '고칠 것이 없습니다 — 이미 깨끗한 글입니다' : `${shrunk > 0 ? `${shrunk}자 줄었습니다` : '정리했습니다'}`}
          </p>
          {entries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entries.map(([label, n]) => (
                <span
                  key={label}
                  className="rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-300"
                >
                  {label} {n}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <CopyBox value={result.text} label="정리된 글" rows={7} />
    </div>
  );
}
