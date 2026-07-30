'use client';

import { useMemo, useState } from 'react';

/**
 * 식을 직접 넣어 보는 칸.
 *
 * 식은 화면마다 고정이고 사용자가 넣는 것은 대상 글뿐이다. 그래서 사용자가
 * 적은 것이 식으로 해석될 일이 없다. 잡힌 자리는 표시해서 보여 준다.
 *
 * 빈 문자열에 맞는 식(경계, 전후 탐색)은 자리를 넘겨 가며 세지 않으면
 * 제자리에서 맴돈다. 그래서 한 칸씩 밀어 주고, 잡은 수도 끊는다.
 */
const LIMIT = 200;

interface Piece { text: string; hit: boolean }

function split(re: RegExp, input: string): { pieces: Piece[]; count: number } {
  const pieces: Piece[] = [];
  let last = 0;
  let count = 0;
  re.lastIndex = 0;
  for (let m = re.exec(input); m && count < LIMIT; m = re.exec(input)) {
    if (m.index > last) pieces.push({ text: input.slice(last, m.index), hit: false });
    if (m[0].length > 0) {
      pieces.push({ text: m[0], hit: true });
      last = m.index + m[0].length;
      count++;
    } else {
      // 길이 0으로 맞은 자리 — 한 칸 밀어 다음을 찾는다
      re.lastIndex = m.index + 1;
      count++;
      if (re.lastIndex > input.length) break;
      continue;
    }
  }
  if (last < input.length) pieces.push({ text: input.slice(last), hit: false });
  return { pieces, count };
}

export default function RegexTry({
  re,
  flags,
  initial,
  placeholder,
  hitOne,
  hitMany,
  missLabel,
}: {
  re: string;
  flags: string;
  initial: string;
  placeholder: string;
  hitOne: string;
  hitMany: string;
  missLabel: string;
}) {
  const [text, setText] = useState(initial);
  const result = useMemo(() => {
    try {
      const rx = new RegExp(re, flags.includes('g') ? flags : `${flags}g`);
      return split(rx, text);
    } catch {
      return { pieces: [{ text, hit: false }], count: 0 };
    }
  }, [re, flags, text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        rows={3}
        spellCheck={false}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-400 resize-y"
      />
      <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 px-3 py-2.5 min-h-[2.75rem] text-sm font-mono whitespace-pre-wrap break-words text-slate-700 dark:text-slate-200">
        {result.pieces.map((piece, i) =>
          piece.hit ? (
            <mark key={i} className="rounded bg-sky-200 dark:bg-sky-700/70 text-slate-900 dark:text-white px-0.5">
              {piece.text}
            </mark>
          ) : (
            <span key={i}>{piece.text}</span>
          ),
        )}
      </div>
      <p className={`mt-2 text-xs font-bold ${result.count ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}`}>
        {result.count === 0 ? missLabel : result.count === 1 ? hitOne : hitMany.replace('{n}', String(result.count))}
      </p>
    </div>
  );
}
