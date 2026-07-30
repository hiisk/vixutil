/**
 * 특수문자 132가지 — 글자 하나와 갈래만 적는다.
 *
 * 코드 포인트, HTML 엔티티, UTF-8 바이트, CSS 이스케이프는 전부 글자에서 계산된다.
 * 표를 손으로 적으면 132 × 다섯 칸이고, 한 칸이 틀려도 복사해 붙일 때까지 모른다.
 *
 * 글자 자체는 만국 공통이라 옮길 것이 없다. 어느 나라에서든 ♥는 ♥다.
 */
export type GlyphKind =
  | 'arrow' | 'math' | 'currency' | 'punct' | 'shape' | 'star'
  | 'check' | 'bracket' | 'greek' | 'number' | 'music' | 'weather'
  | 'zodiac' | 'game' | 'key' | 'misc';

export interface Glyph {
  /** 글자 하나 — 이 섹션의 데이터 전부 */
  char: string;
  /** 주소에 쓰는 이름 */
  slug: string;
  kind: GlyphKind;
}

const g = (char: string, slug: string, kind: GlyphKind): Glyph => ({ char, slug, kind });

export const GLYPHS: Glyph[] = [
  /* ───────── 화살표 ───────── */
  g('→', 'arrow-right', 'arrow'), g('←', 'arrow-left', 'arrow'), g('↑', 'arrow-up', 'arrow'),
  g('↓', 'arrow-down', 'arrow'), g('↔', 'arrow-left-right', 'arrow'), g('↕', 'arrow-up-down', 'arrow'),
  g('⇒', 'double-arrow-right', 'arrow'), g('⇐', 'double-arrow-left', 'arrow'), g('⇔', 'double-arrow-both', 'arrow'),
  g('➜', 'thick-arrow-right', 'arrow'), g('➡', 'black-arrow-right', 'arrow'), g('⤴', 'arrow-curve-up', 'arrow'),
  g('↩', 'arrow-hook-left', 'arrow'), g('↪', 'arrow-hook-right', 'arrow'), g('⟶', 'long-arrow-right', 'arrow'),
  g('↗', 'arrow-north-east', 'arrow'), g('↘', 'arrow-south-east', 'arrow'), g('↖', 'arrow-north-west', 'arrow'),

  /* ───────── 수학 ───────── */
  g('±', 'plus-minus', 'math'), g('×', 'multiply', 'math'), g('÷', 'divide', 'math'),
  g('≠', 'not-equal', 'math'), g('≈', 'almost-equal', 'math'), g('≤', 'less-equal', 'math'),
  g('≥', 'greater-equal', 'math'), g('∞', 'infinity', 'math'), g('√', 'square-root', 'math'),
  g('∑', 'sum', 'math'), g('∏', 'product', 'math'), g('∫', 'integral', 'math'),
  g('π', 'pi', 'math'), g('°', 'degree', 'math'), g('′', 'prime', 'math'),
  g('″', 'double-prime', 'math'), g('∆', 'delta', 'math'), g('∂', 'partial', 'math'),
  g('∈', 'element-of', 'math'), g('∅', 'empty-set', 'math'), g('∴', 'therefore', 'math'),
  g('∵', 'because', 'math'), g('⊥', 'perpendicular', 'math'), g('∠', 'angle', 'math'),
  g('％', 'fullwidth-percent', 'math'), g('‰', 'per-mille', 'math'),

  /* ───────── 화폐 ───────── */
  g('₩', 'won', 'currency'), g('$', 'dollar', 'currency'), g('€', 'euro', 'currency'),
  g('¥', 'yen', 'currency'), g('£', 'pound', 'currency'), g('₹', 'rupee', 'currency'),
  g('₽', 'ruble', 'currency'), g('₺', 'lira', 'currency'), g('₿', 'bitcoin', 'currency'),
  g('¢', 'cent', 'currency'), g('₫', 'dong', 'currency'), g('₱', 'peso', 'currency'),

  /* ───────── 문장부호 ───────── */
  g('…', 'ellipsis', 'punct'), g('·', 'middle-dot', 'punct'), g('•', 'bullet', 'punct'),
  g('—', 'em-dash', 'punct'), g('–', 'en-dash', 'punct'), g('※', 'reference-mark', 'punct'),
  g('§', 'section-sign', 'punct'), g('¶', 'pilcrow', 'punct'), g('†', 'dagger', 'punct'),
  g('‡', 'double-dagger', 'punct'), g('“', 'left-double-quote', 'punct'), g('”', 'right-double-quote', 'punct'),
  g('‘', 'left-single-quote', 'punct'), g('’', 'right-single-quote', 'punct'), g('«', 'left-guillemet', 'punct'),
  g('»', 'right-guillemet', 'punct'), g('¿', 'inverted-question', 'punct'), g('¡', 'inverted-exclamation', 'punct'),

  /* ───────── 도형 ───────── */
  g('■', 'black-square', 'shape'), g('□', 'white-square', 'shape'), g('▲', 'black-triangle-up', 'shape'),
  g('△', 'white-triangle-up', 'shape'), g('▼', 'black-triangle-down', 'shape'), g('●', 'black-circle', 'shape'),
  g('○', 'white-circle', 'shape'), g('◆', 'black-diamond', 'shape'), g('◇', 'white-diamond', 'shape'),
  g('▶', 'play-triangle', 'shape'), g('◀', 'reverse-triangle', 'shape'), g('▪', 'small-black-square', 'shape'),

  /* ───────── 별·하트 ───────── */
  g('★', 'black-star', 'star'), g('☆', 'white-star', 'star'), g('✦', 'four-point-star', 'star'),
  g('✧', 'white-four-point-star', 'star'), g('✩', 'lined-star', 'star'), g('❤', 'heavy-heart', 'star'),
  g('♥', 'black-heart-suit', 'star'), g('♡', 'white-heart-suit', 'star'), g('❥', 'rotated-heart', 'star'),
  g('✿', 'flower', 'star'), g('❀', 'white-flower', 'star'), g('✮', 'star-outline', 'star'),

  /* ───────── 체크·기호 ───────── */
  g('✓', 'check', 'check'), g('✔', 'heavy-check', 'check'), g('✗', 'ballot-x', 'check'),
  g('✘', 'heavy-ballot-x', 'check'), g('☑', 'ballot-box-check', 'check'), g('☒', 'ballot-box-x', 'check'),
  g('⭕', 'heavy-circle', 'check'), g('❌', 'cross-mark', 'check'), g('⚠', 'warning-sign', 'check'),

  /* ───────── 괄호 ───────── */
  g('「', 'corner-bracket-left', 'bracket'), g('」', 'corner-bracket-right', 'bracket'),
  g('『', 'white-corner-bracket-left', 'bracket'), g('』', 'white-corner-bracket-right', 'bracket'),
  g('【', 'lenticular-bracket-left', 'bracket'), g('】', 'lenticular-bracket-right', 'bracket'),
  g('〈', 'angle-bracket-left', 'bracket'), g('〉', 'angle-bracket-right', 'bracket'),
  g('《', 'double-angle-bracket-left', 'bracket'), g('》', 'double-angle-bracket-right', 'bracket'),

  /* ───────── 그리스 문자 ───────── */
  g('α', 'alpha', 'greek'), g('β', 'beta', 'greek'), g('γ', 'gamma', 'greek'),
  g('θ', 'theta', 'greek'), g('λ', 'lambda', 'greek'), g('μ', 'mu', 'greek'),
  g('σ', 'sigma', 'greek'), g('Ω', 'omega', 'greek'), g('Φ', 'phi', 'greek'),

  /* ───────── 숫자·분수 ───────── */
  g('①', 'circled-one', 'number'), g('②', 'circled-two', 'number'), g('③', 'circled-three', 'number'),
  g('½', 'one-half', 'number'), g('¼', 'one-quarter', 'number'), g('¾', 'three-quarters', 'number'),
  g('²', 'superscript-two', 'number'), g('³', 'superscript-three', 'number'), g('Ⅷ', 'roman-eight', 'number'),

  /* ───────── 음악·날씨 ───────── */
  g('♪', 'eighth-note', 'music'), g('♫', 'beamed-notes', 'music'), g('♭', 'flat-sign', 'music'),
  g('♯', 'sharp-sign', 'music'), g('☀', 'sun-symbol', 'weather'), g('☁', 'cloud-symbol', 'weather'),
  g('☂', 'umbrella-symbol', 'weather'), g('☃', 'snowman-symbol', 'weather'), g('❄', 'snowflake-symbol', 'weather'),

  /* ───────── 별자리·놀이 ───────── */
  g('♈', 'aries-sign', 'zodiac'), g('♌', 'leo-sign', 'zodiac'), g('♓', 'pisces-sign', 'zodiac'),
  g('♠', 'spade-suit', 'game'), g('♣', 'club-suit', 'game'), g('♦', 'diamond-suit', 'game'),
  g('♞', 'chess-knight', 'game'), g('⚀', 'die-one', 'game'), g('⚅', 'die-six', 'game'),

  /* ───────── 자판·기타 ───────── */
  g('⌘', 'command-key', 'key'), g('⌥', 'option-key', 'key'), g('⇧', 'shift-key', 'key'),
  g('⌫', 'delete-key', 'key'), g('⏎', 'return-key', 'key'), g('␣', 'space-symbol', 'key'),
  g('©', 'copyright', 'misc'), g('®', 'registered', 'misc'), g('™', 'trademark', 'misc'),
  g('℃', 'celsius', 'misc'), g('℉', 'fahrenheit', 'misc'), g('☎', 'telephone-symbol', 'misc'),
  g('✉', 'envelope-symbol', 'misc'), g('☯', 'yin-yang', 'misc'), g('☮', 'peace-symbol', 'misc'),
];

export const GLYPH_KINDS: GlyphKind[] = [
  'arrow', 'math', 'currency', 'punct', 'shape', 'star', 'check', 'bracket',
  'greek', 'number', 'music', 'weather', 'zodiac', 'game', 'key', 'misc',
];

export const GLYPH_SLUGS = GLYPHS.map(x => x.slug);

export const glyphOf = (slug: string): Glyph | undefined => GLYPHS.find(x => x.slug === slug);

export const glyphsOfKind = (kind: GlyphKind): Glyph[] => GLYPHS.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 글자 아이콘으로 그려진다 */
export const GLYPH_ICON = '🔣';
