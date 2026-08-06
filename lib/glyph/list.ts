/**
 * 특수문자 324가지 — 글자 하나와 갈래만 적는다.
 *
 * 코드 포인트, HTML 엔티티, UTF-8 바이트, CSS 이스케이프는 전부 글자에서 계산된다.
 * 표를 손으로 적으면 324 × 다섯 칸이고, 한 칸이 틀려도 복사해 붙일 때까지 모른다.
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
  g('↙', 'arrow-south-west', 'arrow'), g('⇑', 'double-arrow-up', 'arrow'), g('⇓', 'double-arrow-down', 'arrow'),
  g('⟵', 'long-arrow-left', 'arrow'), g('⤵', 'arrow-curve-down', 'arrow'), g('⇄', 'arrow-right-over-left', 'arrow'),
  g('↻', 'clockwise-arrow', 'arrow'), g('↺', 'anticlockwise-arrow', 'arrow'),
  g('⇢', 'dashed-arrow-right', 'arrow'), g('⇠', 'dashed-arrow-left', 'arrow'), g('⟹', 'long-double-arrow-right', 'arrow'),
  g('↯', 'zigzag-arrow-down', 'arrow'),

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
  g('∪', 'union', 'math'), g('∩', 'intersection', 'math'), g('⊂', 'subset', 'math'),
  g('⊃', 'superset', 'math'), g('∀', 'for-all', 'math'), g('∃', 'there-exists', 'math'),
  g('∝', 'proportional-to', 'math'), g('≡', 'identical-to', 'math'), g('∇', 'nabla', 'math'),
  g('∮', 'contour-integral', 'math'),
  g('⊕', 'circled-plus', 'math'), g('⊗', 'circled-times', 'math'), g('≅', 'congruent', 'math'),
  g('∧', 'logical-and', 'math'), g('∨', 'logical-or', 'math'), g('¬', 'logical-not', 'math'),

  /* ───────── 화폐 ───────── */
  g('₩', 'won', 'currency'), g('$', 'dollar', 'currency'), g('€', 'euro', 'currency'),
  g('¥', 'yen', 'currency'), g('£', 'pound', 'currency'), g('₹', 'rupee', 'currency'),
  g('₽', 'ruble', 'currency'), g('₺', 'lira', 'currency'), g('₿', 'bitcoin', 'currency'),
  g('¢', 'cent', 'currency'), g('₫', 'dong', 'currency'), g('₱', 'peso', 'currency'),
  g('₴', 'hryvnia', 'currency'), g('₦', 'naira', 'currency'), g('฿', 'baht', 'currency'),
  g('₪', 'shekel', 'currency'), g('₮', 'tugrik', 'currency'), g('₡', 'colon-currency', 'currency'),
  g('₸', 'tenge', 'currency'), g('₾', 'lari', 'currency'), g('₭', 'kip', 'currency'),
  g('₲', 'guarani', 'currency'),

  /* ───────── 문장부호 ───────── */
  g('…', 'ellipsis', 'punct'), g('·', 'middle-dot', 'punct'), g('•', 'bullet', 'punct'),
  g('—', 'em-dash', 'punct'), g('–', 'en-dash', 'punct'), g('※', 'reference-mark', 'punct'),
  g('§', 'section-sign', 'punct'), g('¶', 'pilcrow', 'punct'), g('†', 'dagger', 'punct'),
  g('‡', 'double-dagger', 'punct'), g('“', 'left-double-quote', 'punct'), g('”', 'right-double-quote', 'punct'),
  g('‘', 'left-single-quote', 'punct'), g('’', 'right-single-quote', 'punct'), g('«', 'left-guillemet', 'punct'),
  g('»', 'right-guillemet', 'punct'), g('¿', 'inverted-question', 'punct'), g('¡', 'inverted-exclamation', 'punct'),
  g('‹', 'left-single-guillemet', 'punct'), g('›', 'right-single-guillemet', 'punct'), g('‾', 'overline', 'punct'),
  g('⁂', 'asterism', 'punct'), g('‖', 'double-vertical-line', 'punct'), g('¦', 'broken-bar', 'punct'),
  g('‽', 'interrobang', 'punct'), g('⁉', 'exclamation-question', 'punct'), g('⁇', 'double-question', 'punct'),
  g('⁃', 'hyphen-bullet', 'punct'),

  /* ───────── 도형 ───────── */
  g('■', 'black-square', 'shape'), g('□', 'white-square', 'shape'), g('▲', 'black-triangle-up', 'shape'),
  g('△', 'white-triangle-up', 'shape'), g('▼', 'black-triangle-down', 'shape'), g('●', 'black-circle', 'shape'),
  g('○', 'white-circle', 'shape'), g('◆', 'black-diamond', 'shape'), g('◇', 'white-diamond', 'shape'),
  g('▶', 'play-triangle', 'shape'), g('◀', 'reverse-triangle', 'shape'), g('▪', 'small-black-square', 'shape'),
  g('▣', 'square-in-square', 'shape'), g('◎', 'bullseye', 'shape'), g('◐', 'half-circle-left', 'shape'),
  g('▩', 'shaded-square', 'shape'), g('⬟', 'black-pentagon', 'shape'), g('⬢', 'black-hexagon', 'shape'),
  g('⬛', 'black-large-square', 'shape'), g('⬜', 'white-large-square', 'shape'), g('⬡', 'white-hexagon', 'shape'),
  g('▬', 'black-rectangle', 'shape'),

  /* ───────── 별·하트 ───────── */
  g('★', 'black-star', 'star'), g('☆', 'white-star', 'star'), g('✦', 'four-point-star', 'star'),
  g('✧', 'white-four-point-star', 'star'), g('✩', 'lined-star', 'star'), g('❤', 'heavy-heart', 'star'),
  g('♥', 'black-heart-suit', 'star'), g('♡', 'white-heart-suit', 'star'), g('❥', 'rotated-heart', 'star'),
  g('✿', 'flower', 'star'), g('❀', 'white-flower', 'star'), g('✮', 'star-outline', 'star'),
  g('✪', 'circled-star', 'star'), g('✵', 'eight-point-star', 'star'), g('❣', 'heart-exclamation', 'star'),
  g('✤', 'four-balloon-petal', 'star'),
  g('✰', 'shadowed-star', 'star'), g('✴', 'eight-pointed-star', 'star'), g('✶', 'six-pointed-star', 'star'),

  /* ───────── 체크·기호 ───────── */
  g('✓', 'check', 'check'), g('✔', 'heavy-check', 'check'), g('✗', 'ballot-x', 'check'),
  g('✘', 'heavy-ballot-x', 'check'), g('☑', 'ballot-box-check', 'check'), g('☒', 'ballot-box-x', 'check'),
  g('⭕', 'heavy-circle', 'check'), g('❌', 'cross-mark', 'check'), g('⚠', 'warning-sign', 'check'),
  g('☓', 'saltire', 'check'), g('✅', 'check-mark-button', 'check'), g('❎', 'cross-mark-button', 'check'),
  g('✕', 'multiplication-x', 'check'), g('✖', 'heavy-multiplication-x', 'check'), g('⊘', 'circled-division-slash', 'check'),

  /* ───────── 괄호 ───────── */
  g('「', 'corner-bracket-left', 'bracket'), g('」', 'corner-bracket-right', 'bracket'),
  g('『', 'white-corner-bracket-left', 'bracket'), g('』', 'white-corner-bracket-right', 'bracket'),
  g('【', 'lenticular-bracket-left', 'bracket'), g('】', 'lenticular-bracket-right', 'bracket'),
  g('〈', 'angle-bracket-left', 'bracket'), g('〉', 'angle-bracket-right', 'bracket'),
  g('《', 'double-angle-bracket-left', 'bracket'), g('》', 'double-angle-bracket-right', 'bracket'),
  g('〔', 'tortoise-bracket-left', 'bracket'), g('〕', 'tortoise-bracket-right', 'bracket'),
  g('〖', 'white-lenticular-bracket-left', 'bracket'), g('〗', 'white-lenticular-bracket-right', 'bracket'),
  g('〘', 'left-white-tortoise-bracket', 'bracket'), g('〙', 'right-white-tortoise-bracket', 'bracket'), g('⦅', 'left-white-paren', 'bracket'),
  g('⦆', 'right-white-paren', 'bracket'),

  /* ───────── 그리스 문자 ───────── */
  g('α', 'alpha', 'greek'), g('β', 'beta', 'greek'), g('γ', 'gamma', 'greek'),
  g('θ', 'theta', 'greek'), g('λ', 'lambda', 'greek'), g('μ', 'mu', 'greek'),
  g('σ', 'sigma', 'greek'), g('Ω', 'omega', 'greek'), g('Φ', 'phi', 'greek'),
  g('δ', 'delta-small', 'greek'), g('ε', 'epsilon', 'greek'), g('ρ', 'rho', 'greek'),
  g('τ', 'tau', 'greek'), g('ψ', 'psi', 'greek'), g('Σ', 'sigma-capital', 'greek'),
  g('Δ', 'delta-capital', 'greek'),
  g('ω', 'omega-small', 'greek'), g('χ', 'chi', 'greek'), g('ξ', 'xi', 'greek'),
  g('Γ', 'gamma-capital', 'greek'), g('Λ', 'lambda-capital', 'greek'), g('Π', 'pi-capital', 'greek'),

  /* ───────── 숫자·분수 ───────── */
  g('①', 'circled-one', 'number'), g('②', 'circled-two', 'number'), g('③', 'circled-three', 'number'),
  g('½', 'one-half', 'number'), g('¼', 'one-quarter', 'number'), g('¾', 'three-quarters', 'number'),
  g('²', 'superscript-two', 'number'), g('³', 'superscript-three', 'number'), g('Ⅷ', 'roman-eight', 'number'),
  g('④', 'circled-four', 'number'), g('⑤', 'circled-five', 'number'), g('⑥', 'circled-six', 'number'),
  g('⅓', 'one-third', 'number'), g('⅔', 'two-thirds', 'number'), g('⅛', 'one-eighth', 'number'),
  g('Ⅰ', 'roman-one', 'number'), g('Ⅹ', 'roman-ten', 'number'),
  g('⑦', 'circled-seven', 'number'), g('⑧', 'circled-eight', 'number'), g('⑨', 'circled-nine', 'number'),
  g('⑩', 'circled-ten', 'number'), g('⅜', 'three-eighths', 'number'), g('Ⅴ', 'roman-five', 'number'),

  /* ───────── 음악·날씨 ───────── */
  g('♪', 'eighth-note', 'music'), g('♫', 'beamed-notes', 'music'), g('♭', 'flat-sign', 'music'),
  g('♯', 'sharp-sign', 'music'), g('☀', 'sun-symbol', 'weather'), g('☁', 'cloud-symbol', 'weather'),
  g('☂', 'umbrella-symbol', 'weather'), g('☃', 'snowman-symbol', 'weather'), g('❄', 'snowflake-symbol', 'weather'),
  g('♩', 'quarter-note', 'music'), g('♬', 'beamed-sixteenth-notes', 'music'), g('♮', 'natural-sign', 'music'),
  g('☄', 'comet-symbol', 'weather'), g('☾', 'last-quarter-moon', 'weather'), g('☼', 'sun-with-rays', 'weather'),
  g('⚡', 'high-voltage', 'weather'),
  g('𝄞', 'treble-clef', 'music'), g('𝄢', 'bass-clef', 'music'), g('☔', 'umbrella-rain', 'weather'),
  g('⛅', 'sun-behind-cloud', 'weather'), g('❅', 'snowflake-outline', 'weather'), g('☇', 'lightning', 'weather'),

  /* ───────── 별자리·놀이 ───────── */
  g('♈', 'aries-sign', 'zodiac'), g('♌', 'leo-sign', 'zodiac'), g('♓', 'pisces-sign', 'zodiac'),
  g('♠', 'spade-suit', 'game'), g('♣', 'club-suit', 'game'), g('♦', 'diamond-suit', 'game'),
  g('♞', 'chess-knight', 'game'), g('⚀', 'die-one', 'game'), g('⚅', 'die-six', 'game'),
  g('♉', 'taurus-sign', 'zodiac'), g('♊', 'gemini-sign', 'zodiac'), g('♋', 'cancer-sign', 'zodiac'),
  g('♍', 'virgo-sign', 'zodiac'), g('♎', 'libra-sign', 'zodiac'), g('♏', 'scorpio-sign', 'zodiac'),
  g('♐', 'sagittarius-sign', 'zodiac'), g('♑', 'capricorn-sign', 'zodiac'), g('♒', 'aquarius-sign', 'zodiac'),
  g('♟', 'chess-pawn', 'game'), g('♜', 'chess-rook', 'game'), g('♛', 'chess-queen', 'game'),
  g('⚁', 'die-two', 'game'), g('⚂', 'die-three', 'game'),
  g('⚃', 'die-four', 'game'), g('⚄', 'die-five', 'game'), g('♝', 'black-bishop', 'game'),
  g('♚', 'black-king', 'game'), g('♔', 'white-king', 'game'),

  /* ───────── 자판·기타 ───────── */
  g('⌘', 'command-key', 'key'), g('⌥', 'option-key', 'key'), g('⇧', 'shift-key', 'key'),
  g('⌫', 'delete-key', 'key'), g('⏎', 'return-key', 'key'), g('␣', 'space-symbol', 'key'),
  g('⌃', 'control-key', 'key'), g('⇪', 'caps-lock-key', 'key'), g('⎋', 'escape-key', 'key'),
  g('⇥', 'tab-key', 'key'),
  g('©', 'copyright', 'misc'), g('®', 'registered', 'misc'), g('™', 'trademark', 'misc'),
  g('℃', 'celsius', 'misc'), g('℉', 'fahrenheit', 'misc'), g('☎', 'telephone-symbol', 'misc'),
  g('✉', 'envelope-symbol', 'misc'), g('☯', 'yin-yang', 'misc'), g('☮', 'peace-symbol', 'misc'),
  g('№', 'numero-sign', 'misc'), g('℠', 'service-mark', 'misc'), g('♻', 'recycling-symbol', 'misc'),
  g('⚖', 'balance-scale', 'misc'), g('☘', 'shamrock', 'misc'),
  g('⌦', 'delete-forward', 'key'), g('⏏', 'eject', 'key'), g('⇞', 'page-up', 'key'),
  g('⇟', 'page-down', 'key'), g('⚙', 'gear', 'misc'), g('✂', 'scissors', 'misc'),
  g('✈', 'airplane', 'misc'), g('☕', 'hot-beverage', 'misc'), g('⚓', 'anchor', 'misc'),

  /* ───────── 늘린 것 — 위에 없는 글자만, 이모지로 그려지는 것은 뺐다 ───────── */
  g('➤', 'solid-arrow-right', 'arrow'), g('➢', 'outline-arrow-right', 'arrow'),
  g('⇜', 'squiggle-arrow-left', 'arrow'), g('⇝', 'squiggle-arrow-right', 'arrow'),
  g('⤒', 'arrow-to-bar-up', 'arrow'), g('⤓', 'arrow-to-bar-down', 'arrow'),
  g('∛', 'cube-root', 'math'), g('∜', 'fourth-root', 'math'),
  g('∬', 'double-integral', 'math'), g('∭', 'triple-integral', 'math'),
  g('≪', 'much-less-than', 'math'), g('≫', 'much-greater-than', 'math'),
  g('⌈', 'ceiling-left', 'math'), g('⌉', 'ceiling-right', 'math'),
  g('⌊', 'floor-left', 'math'), g('⌋', 'floor-right', 'math'),
  g('∓', 'minus-plus', 'math'), g('⋅', 'dot-operator', 'math'),
  g('∖', 'set-minus', 'math'), g('∎', 'end-of-proof', 'math'),
  g('ℵ', 'aleph', 'math'), g('⊆', 'subset-or-equal', 'math'), g('⊇', 'superset-or-equal', 'math'),
  g('¤', 'currency-sign', 'currency'), g('₨', 'rupee-old', 'currency'),
  g('₣', 'french-franc', 'currency'), g('₼', 'manat', 'currency'),
  g('₵', 'cedi', 'currency'), g('₳', 'austral', 'currency'),
  g('‱', 'per-ten-thousand', 'punct'), g('‥', 'two-dot-leader', 'punct'),
  g('⁕', 'flower-punctuation', 'punct'), g('❝', 'heavy-quote-open', 'punct'),
  g('❞', 'heavy-quote-close', 'punct'), g('⸺', 'two-em-dash', 'punct'),
  g('▰', 'filled-parallelogram', 'shape'), g('▱', 'outline-parallelogram', 'shape'),
  g('◈', 'diamond-in-diamond', 'shape'), g('◉', 'fisheye', 'shape'),
  g('◌', 'dotted-circle', 'shape'), g('▦', 'square-grid', 'shape'),
  g('✱', 'heavy-asterisk', 'star'), g('✳', 'eight-spoked-asterisk', 'star'),
  g('✷', 'six-pointed-black-star', 'star'), g('✯', 'pinwheel-star', 'star'),
  g('☐', 'empty-checkbox', 'check'), g('⍻', 'not-check-mark', 'check'),
  g('⟦', 'white-bracket-left', 'bracket'), g('⟧', 'white-bracket-right', 'bracket'),
  g('⟪', 'double-angle-left', 'bracket'), g('⟫', 'double-angle-right', 'bracket'),
  g('⌜', 'corner-upper-left', 'bracket'), g('⌟', 'corner-lower-right', 'bracket'),
  g('ζ', 'zeta', 'greek'), g('η', 'eta', 'greek'), g('ι', 'iota', 'greek'),
  g('κ', 'kappa', 'greek'), g('ν', 'nu', 'greek'), g('υ', 'upsilon', 'greek'),
  g('φ', 'phi-small', 'greek'), g('Θ', 'theta-capital', 'greek'), g('Ξ', 'xi-capital', 'greek'),
  g('Ψ', 'psi-capital', 'greek'),
  g('⑪', 'circled-11', 'number'), g('⑫', 'circled-12', 'number'),
  g('⑬', 'circled-13', 'number'), g('⑭', 'circled-14', 'number'), g('⑮', 'circled-15', 'number'),
  g('⅕', 'one-fifth', 'number'), g('⅖', 'two-fifths', 'number'),
  g('⅙', 'one-sixth', 'number'), g('⅐', 'one-seventh', 'number'), g('⅑', 'one-ninth', 'number'),
  g('Ⅱ', 'roman-2', 'number'), g('Ⅲ', 'roman-3', 'number'), g('Ⅳ', 'roman-4', 'number'),
  g('Ⅵ', 'roman-6', 'number'), g('Ⅸ', 'roman-9', 'number'),
  g('𝄪', 'double-sharp', 'music'), g('𝄫', 'double-flat', 'music'),
  g('☈', 'thunderstorm-sign', 'weather'), g('☽', 'first-quarter-moon-sign', 'weather'),
  g('♤', 'white-spade', 'game'), g('♧', 'white-club', 'game'), g('♢', 'white-diamond-suit', 'game'),
  g('♖', 'white-rook', 'game'), g('♗', 'white-bishop', 'game'), g('♘', 'white-knight', 'game'),
  g('⌤', 'enter-key-sign', 'key'), g('⇤', 'tab-to-bar-left', 'key'), g('⌧', 'cancel-key', 'key'),
  g('⚛', 'atom-sign', 'misc'), g('⚕', 'staff-of-aesculapius', 'misc'),
  g('⚔', 'crossed-swords-sign', 'misc'), g('⚑', 'black-flag', 'misc'),
  g('⚐', 'white-flag-sign', 'misc'), g('☠', 'skull-and-crossbones', 'misc'),
  g('♿', 'wheelchair-sign', 'misc'), g('⚗', 'alembic-sign', 'misc'),
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
