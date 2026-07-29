'use client';
import { useMemo, useState } from 'react';
import { replaceAll } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Toggle } from './ui';

export default function ReplaceTool() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [to, setTo] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [regex, setRegex] = useState(false);

  const result = useMemo(
    () => replaceAll(text, find, to, { caseSensitive, regex }),
    [text, find, to, caseSensitive, regex],
  );

  const field = 'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 transition-colors font-mono';

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={7} label="원본 글" placeholder="바꿀 내용이 들어 있는 글을 붙여 넣으세요" />

      <div className={`${CARD} mt-4`}>
        <div className="grid sm:grid-cols-2 gap-3">
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">찾을 내용</span>
            <input value={find} onChange={e => setFind(e.target.value)} placeholder="바꿀 단어" className={field} />
          </label>
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">바꿀 내용</span>
            <input value={to} onChange={e => setTo(e.target.value)} placeholder="새 단어 (비우면 삭제)" className={field} />
          </label>
        </div>

        <div className="mt-3">
          <Toggle checked={caseSensitive} onChange={setCaseSensitive} label="대소문자 구분" hint="끄면 Apple과 apple을 모두 찾습니다" />
          <Toggle checked={regex} onChange={setRegex} label="정규식으로 찾기" hint="\\d+ 처럼 패턴으로 찾습니다" />
        </div>

        {!regex && (
          <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
            찾을 내용에 <code className="font-mono">\n</code>을 넣으면 줄바꿈을, <code className="font-mono">\t</code>는 탭을 찾습니다.
          </p>
        )}

        {result.error && (
          <p className="mt-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 px-4 py-2.5 text-xs text-rose-700 dark:text-rose-300">
            정규식 오류: {result.error}
          </p>
        )}

        {find && !result.error && (
          <p className={`mt-3 text-sm font-bold ${result.count > 0 ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
            {result.count > 0 ? `${result.count}곳이 바뀝니다` : '찾는 내용이 없습니다'}
          </p>
        )}
      </div>

      <CopyBox value={result.text} label="바꾼 결과" rows={7} />
    </div>
  );
}
