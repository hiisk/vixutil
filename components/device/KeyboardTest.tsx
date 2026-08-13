'use client';
import { KEYBOARD_UI, DEVICE_COMMON, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 키보드 테스트 — 눌린 키를 가상 키보드에 그대로 비춘다.
 *
 * 판정은 KeyboardEvent.code로 한다. key는 한/영과 Shift 조합에 따라 값이
 * 바뀌지만(ㅁ/a/A) code는 물리적 위치라 그대로다 — "이 자리 스위치가 죽었나"를
 * 보는 도구이므로 물리 위치가 맞다.
 *
 * 레이아웃에 없는 키(한/영·한자·미디어 키 등)도 눌리면 아래 로그에 code가
 * 그대로 찍히므로, 이 배열이 세상의 모든 키보드를 담지 않아도 된다.
 */
type Key = { code: string; label: string; w?: number };

const ROWS: Key[][] = [
  [
    { code: 'Escape', label: 'Esc' },
    { code: 'F1', label: 'F1' }, { code: 'F2', label: 'F2' }, { code: 'F3', label: 'F3' }, { code: 'F4', label: 'F4' },
    { code: 'F5', label: 'F5' }, { code: 'F6', label: 'F6' }, { code: 'F7', label: 'F7' }, { code: 'F8', label: 'F8' },
    { code: 'F9', label: 'F9' }, { code: 'F10', label: 'F10' }, { code: 'F11', label: 'F11' }, { code: 'F12', label: 'F12' },
  ],
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' }, { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' }, { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '⌫', w: 2 },
  ],
  [
    { code: 'Tab', label: 'Tab', w: 1.5 },
    { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' }, { code: 'KeyE', label: 'E' }, { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' }, { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', w: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'Caps', w: 1.75 },
    { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' }, { code: 'KeyD', label: 'D' }, { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' }, { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';' }, { code: 'Quote', label: "'" },
    { code: 'Enter', label: 'Enter', w: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', w: 2.25 },
    { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' }, { code: 'KeyC', label: 'C' }, { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' }, { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',' }, { code: 'Period', label: '.' }, { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'Shift', w: 2.75 },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', w: 1.4 },
    { code: 'MetaLeft', label: 'Win', w: 1.2 },
    { code: 'AltLeft', label: 'Alt', w: 1.2 },
    { code: 'Space', label: 'Space', w: 6 },
    { code: 'Lang1', label: '', w: 1.3 },
    { code: 'AltRight', label: 'Alt', w: 1.2 },
    { code: 'ContextMenu', label: '☰', w: 1.2 },
    { code: 'ControlRight', label: 'Ctrl', w: 1.4 },
  ],
];

const NAV: Key[][] = [
  [
    { code: 'Insert', label: 'Ins' }, { code: 'Home', label: 'Home' }, { code: 'PageUp', label: 'PgUp' },
    { code: 'Delete', label: 'Del' }, { code: 'End', label: 'End' }, { code: 'PageDown', label: 'PgDn' },
    { code: 'ArrowUp', label: '↑' }, { code: 'ArrowLeft', label: '←' }, { code: 'ArrowDown', label: '↓' }, { code: 'ArrowRight', label: '→' },
  ],
];

const ALL_CODES = [...ROWS, ...NAV].flat().map(k => k.code);

/** 브라우저 단축키(F5 새로고침, Ctrl+S 등)에 화면을 뺏기지 않게 막는다. */
const ALLOW_DEFAULT = new Set(['F5', 'F11', 'F12']);

export default function KeyboardTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = KEYBOARD_UI[lang];
  const c = DEVICE_COMMON[lang];
  const [down, setDown] = useState<string[]>([]);
  const [ever, setEver] = useState<string[]>([]);
  const [maxSimul, setMaxSimul] = useState(0);
  const [log, setLog] = useState<{ code: string; key: string; at: number }[]>([]);
  const downRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (!ALLOW_DEFAULT.has(e.code)) e.preventDefault();
      if (e.repeat) return; // 길게 누르고 있는 동안의 자동 반복은 새 입력이 아니다

      downRef.current.add(e.code);
      const now = [...downRef.current];
      setDown(now);
      setMaxSimul(m => Math.max(m, now.length));
      setEver(prev => (prev.includes(e.code) ? prev : [...prev, e.code]));
      setLog(prev => [{ code: e.code, key: e.key, at: e.timeStamp }, ...prev].slice(0, 8));
    };
    const onUp = (e: KeyboardEvent) => {
      downRef.current.delete(e.code);
      setDown([...downRef.current]);
    };
    // 알트탭 등으로 창을 벗어나면 keyup을 못 받아 키가 눌린 채로 굳는다
    const onBlur = () => {
      downRef.current.clear();
      setDown([]);
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const reset = useCallback(() => {
    downRef.current.clear();
    setDown([]);
    setEver([]);
    setMaxSimul(0);
    setLog([]);
  }, []);

  const untested = ALL_CODES.filter(c => !ever.includes(c));

  const cell = (k: Key) => {
    const isDown = down.includes(k.code);
    const isEver = ever.includes(k.code);
    return (
      <div
        key={k.code}
        style={{ flexGrow: k.w ?? 1, flexBasis: 0 }}
        className={[
          'min-w-0 h-9 sm:h-10 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-semibold select-none transition-colors duration-75 border',
          isDown
            ? 'bg-sky-500 border-sky-600 text-white shadow-inner scale-95'
            : isEver
              ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900 text-sky-700 dark:text-sky-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400',
        ].join(' ')}
      >
        <span className="truncate px-0.5">{k.code === 'Lang1' ? ui.langKey : k.label}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 sm:p-3.5 overflow-hidden">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex gap-1 sm:gap-1.5">{row.map(cell)}</div>
          ))}
          <div className="h-1" />
          {NAV.map((row, i) => (
            <div key={i} className="flex gap-1 sm:gap-1.5">{row.map(cell)}</div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
        {ui.how}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-5">
        {[
          { label: ui.recognised, val: ui.countSuffix(ever.length), accent: 'text-sky-600' },
          { label: ui.maxSimul, val: ui.countSuffix(maxSimul), accent: 'text-indigo-600' },
          { label: ui.nowDown, val: ui.countSuffix(down.length), accent: 'text-slate-700 dark:text-slate-200' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border chip-off px-3 py-3 text-center">
            <p className={`text-lg font-black ${s.accent}`}>{s.val}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border chip-off px-4 py-3.5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.recentInput}</p>
        {log.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">{ui.noInput}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {log.map((l, i) => (
              <span
                key={`${l.code}-${l.at}-${i}`}
                className={`rounded-lg px-2 py-1 text-[11px] font-mono border ${
                  i === 0
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900 text-sky-700 dark:text-sky-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {l.code}
                <span className="opacity-60"> · {l.key === ' ' ? 'Space' : l.key}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {ever.length > 0 && (
        <div className="mt-4 rounded-xl border chip-off px-4 py-3.5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            {ui.untested(untested.length)}
          </p>
          {untested.length === 0 ? (
            <p className="text-sm font-bold text-emerald-600">{ui.allGood}</p>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono leading-relaxed break-all">
              {untested.join(' · ')}
            </p>
          )}
        </div>
      )}

      <button
        onClick={reset}
        className="mt-4 w-full rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 text-sm hover:opacity-90 transition-opacity"
      >
        {c.reset}
      </button>
    </div>
  );
}
