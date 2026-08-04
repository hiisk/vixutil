/**
 * 키 120개 — 규칙에서 나오지 않는 것만 적는다.
 *
 * 글자·숫자·숫자판·F키는 규칙이다. A는 KeyA에 65이고 B는 KeyB에 66이니,
 * 스물여섯 줄을 적는 대신 한 줄로 만들어 낸다. 그렇게 만들 수 없는 것 —
 * Enter가 13이고 Escape가 27이라는 것 — 만 표에 남는다.
 *
 * ── code와 key는 다른 것이다 ────────────────────────────
 * `code`는 자판에서의 **자리**다. 한글 자판에서 ㅁ 자리를 눌러도 KeyA다.
 * `key`는 그 순간 **찍히는 글자**라 언어와 Shift에 따라 바뀐다(a·A·ㅁ).
 * 그래서 여기 싣는 key는 미국 자판 기준이고, code는 어느 자판에서나 같다.
 *
 * `keyCode`는 폐기된 값이지만 옛 코드가 아직 쓴다. 기호 키에서는 브라우저마다
 * 다른 값을 주므로(파이어폭스의 Semicolon은 59) 그런 자리를 따로 표시한다.
 */
export type KeyGroup =
  | 'letter' | 'digit' | 'numpad' | 'function' | 'navigation'
  | 'editing' | 'modifier' | 'lock' | 'system' | 'punctuation' | 'language';

export interface KeyDef {
  /** KeyboardEvent.code — 자판에서의 자리 */
  code: string;
  /** KeyboardEvent.key — 미국 자판에서 찍히는 값 */
  key: string;
  /** Shift와 함께 눌렀을 때(미국 자판). 글자 키는 대문자라 규칙에서 나온다 */
  shift?: string;
  /** 폐기된 KeyboardEvent.keyCode */
  keyCode: number;
  group: KeyGroup;
  /** 브라우저마다 keyCode가 다른 자리 — 파이어폭스가 다른 값을 준다 */
  varies?: number;
}

const k = (code: string, key: string, keyCode: number, group: KeyGroup, extra: { shift?: string; varies?: number } = {}): KeyDef =>
  ({ code, key, keyCode, group, ...extra });

/* ───────── 규칙에서 만들어 내는 키 ───────── */

const LETTERS: KeyDef[] = Array.from({ length: 26 }, (_, i) => {
  const upper = String.fromCharCode(65 + i);
  return k(`Key${upper}`, upper.toLowerCase(), 65 + i, 'letter', { shift: upper });
});

/** 미국 자판에서 숫자 줄에 함께 찍히는 기호 — 자판마다 다르므로 자료로 적는다 */
const DIGIT_SHIFT = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];

const DIGITS: KeyDef[] = Array.from({ length: 10 }, (_, i) =>
  k(`Digit${i}`, String(i), 48 + i, 'digit', { shift: DIGIT_SHIFT[i] }));

const NUMPAD_DIGITS: KeyDef[] = Array.from({ length: 10 }, (_, i) =>
  k(`Numpad${i}`, String(i), 96 + i, 'numpad'));

const FUNCTION: KeyDef[] = Array.from({ length: 20 }, (_, i) =>
  k(`F${i + 1}`, `F${i + 1}`, 112 + i, 'function'));

/* ───────── 규칙이 없어 적어 두는 키 ───────── */

const SPECIAL: KeyDef[] = [
  k('NumpadAdd', '+', 107, 'numpad'),
  k('NumpadSubtract', '-', 109, 'numpad'),
  k('NumpadMultiply', '*', 106, 'numpad'),
  k('NumpadDivide', '/', 111, 'numpad'),
  k('NumpadDecimal', '.', 110, 'numpad'),
  k('NumpadEnter', 'Enter', 13, 'numpad'),

  k('ArrowUp', 'ArrowUp', 38, 'navigation'),
  k('ArrowDown', 'ArrowDown', 40, 'navigation'),
  k('ArrowLeft', 'ArrowLeft', 37, 'navigation'),
  k('ArrowRight', 'ArrowRight', 39, 'navigation'),
  k('Home', 'Home', 36, 'navigation'),
  k('End', 'End', 35, 'navigation'),
  k('PageUp', 'PageUp', 33, 'navigation'),
  k('PageDown', 'PageDown', 34, 'navigation'),

  k('Enter', 'Enter', 13, 'editing'),
  k('Tab', 'Tab', 9, 'editing'),
  k('Space', ' ', 32, 'editing'),
  k('Backspace', 'Backspace', 8, 'editing'),
  k('Delete', 'Delete', 46, 'editing'),
  k('Insert', 'Insert', 45, 'editing'),

  k('ShiftLeft', 'Shift', 16, 'modifier'),
  k('ShiftRight', 'Shift', 16, 'modifier'),
  k('ControlLeft', 'Control', 17, 'modifier'),
  k('ControlRight', 'Control', 17, 'modifier'),
  k('AltLeft', 'Alt', 18, 'modifier'),
  k('AltRight', 'Alt', 18, 'modifier'),
  k('MetaLeft', 'Meta', 91, 'modifier'),
  k('MetaRight', 'Meta', 92, 'modifier'),

  k('CapsLock', 'CapsLock', 20, 'lock'),
  k('NumLock', 'NumLock', 144, 'lock'),
  k('ScrollLock', 'ScrollLock', 145, 'lock'),

  k('Escape', 'Escape', 27, 'system'),
  k('PrintScreen', 'PrintScreen', 44, 'system'),
  k('Pause', 'Pause', 19, 'system'),
  k('ContextMenu', 'ContextMenu', 93, 'system'),

  // 기호 키의 keyCode는 브라우저가 갈린다 — 파이어폭스가 다른 값을 준다
  k('Semicolon', ';', 186, 'punctuation', { shift: ':', varies: 59 }),
  k('Equal', '=', 187, 'punctuation', { shift: '+', varies: 61 }),
  k('Comma', ',', 188, 'punctuation', { shift: '<' }),
  k('Minus', '-', 189, 'punctuation', { shift: '_', varies: 173 }),
  k('Period', '.', 190, 'punctuation', { shift: '>' }),
  k('Slash', '/', 191, 'punctuation', { shift: '?' }),
  k('Backquote', '`', 192, 'punctuation', { shift: '~' }),
  k('BracketLeft', '[', 219, 'punctuation', { shift: '{' }),
  k('Backslash', '\\', 220, 'punctuation', { shift: '|' }),
  k('BracketRight', ']', 221, 'punctuation', { shift: '}' }),
  k('Quote', "'", 222, 'punctuation', { shift: '"' }),
  k('IntlBackslash', '\\', 226, 'punctuation'),

  k('Lang1', 'HangulMode', 21, 'language'),
  k('Lang2', 'HanjaMode', 25, 'language'),
  k('Convert', 'Convert', 28, 'language'),
  k('NonConvert', 'NonConvert', 29, 'language'),
  k('KanaMode', 'KanaMode', 21, 'language'),
  k('IntlRo', '\\', 193, 'language'),
  k('IntlYen', '\\', 255, 'language'),
];

export const KEYS: KeyDef[] = [
  ...LETTERS, ...DIGITS, ...NUMPAD_DIGITS, ...FUNCTION, ...SPECIAL,
];

/** 주소는 code를 소문자로 — KeyA는 keya가 아니라 key-a로 끊어 읽기 쉽게 둔다 */
export const slugOf = (x: KeyDef): string =>
  x.code.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const KEY_SLUGS = KEYS.map(slugOf);

export const keyOf = (slug: string): KeyDef | undefined => KEYS.find(x => slugOf(x) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const KEYCODE_ICON = '🔑';
