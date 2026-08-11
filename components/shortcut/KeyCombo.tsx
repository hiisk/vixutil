/**
 * 키 조합을 자판처럼 그린다 — 'Ctrl+Shift+P'를 칩 세 개로.
 *
 * 서버에서 끝난다. 여기 있는 것은 문자열을 쪼개 그리는 일뿐이라 클라이언트로
 * 내려보낼 이유가 없다.
 *
 * 두 가지를 조심한다. 'Ctrl++'는 더하기 키가 마지막 조각이라 빈 칸으로 쪼개지고,
 * VS Code의 'Ctrl+K Ctrl+S'처럼 이어 누르는 조합은 빈칸으로 갈라진 두 묶음이다.
 */

import { NA } from '@/lib/shortcut/types';

/** 'Ctrl+K Ctrl+S' → [['Ctrl','K'], ['Ctrl','S']] */
export function parseCombo(combo: string): string[][] {
  return combo.split(' ').filter(Boolean).map(chord => {
    const parts = chord.split('+');
    const keys: string[] = [];
    for (let i = 0; i < parts.length; i++) {
      /* 빈 조각은 '+' 자체가 키였다는 뜻이다 — 'Ctrl++'의 끝 */
      if (parts[i] === '') {
        if (i === parts.length - 1 && keys.length) keys.push('+');
        continue;
      }
      keys.push(parts[i]);
    }
    return keys;
  });
}

export default function KeyCombo({ combo, size = 'md', naLabel }: { combo: string; size?: 'sm' | 'md' | 'lg'; naLabel?: string }) {
  /* 그 운영체제에 없는 자리다 — 키캡으로 그리면 '—'를 누르라는 말이 된다 */
  if (combo === NA) {
    return (
      <span className={`text-slate-400 dark:text-slate-500 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
        {naLabel ?? NA}
      </span>
    );
  }
  const chords = parseCombo(combo);
  const chip =
    size === 'lg' ? 'px-3 py-2 text-base min-w-[2.5rem]'
    : size === 'sm' ? 'px-1.5 py-0.5 text-[11px] min-w-[1.4rem]'
    : 'px-2 py-1 text-sm min-w-[1.9rem]';
  const plus = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {chords.map((keys, ci) => (
        <span key={ci} className="inline-flex flex-wrap items-center gap-1">
          {ci > 0 && <span className={`${plus} text-slate-400 dark:text-slate-500 px-1`}>·</span>}
          {keys.map((k, i) => (
            <span key={`${k}-${i}`} className="inline-flex items-center gap-1">
              {i > 0 && <span className={`${plus} font-bold text-slate-400 dark:text-slate-500`}>+</span>}
              <kbd
                className={`${chip} inline-flex items-center justify-center rounded-lg border border-b-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-100 shadow-sm`}
              >
                {k}
              </kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
