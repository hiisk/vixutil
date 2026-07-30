/**
 * 특수문자 한 장에 들어가는 값 — 글자 하나에서 계산한다.
 *
 * 코드 포인트만 있으면 HTML 엔티티도, UTF-8 바이트도, CSS·JS 이스케이프도 전부
 * 나온다. 표를 손으로 적을 이유가 없고, 손으로 적으면 복사해 붙여 보기 전까지
 * 틀린 줄도 모른다.
 */
import { GLYPHS, type Glyph } from './list.ts';

export interface GlyphFacts {
  char: string;
  slug: string;
  /** 유니코드 코드 포인트 */
  code: number;
  /** U+2764 꼴 */
  unicode: string;
  /** &#10084; — 이름이 없어도 어디서나 통한다 */
  entity: string;
  /** &hearts; — 있는 글자만 */
  namedEntity?: string;
  /** CSS content: "\2764" */
  cssEscape: string;
  /** 자바스크립트 문자열에 넣을 때 */
  jsEscape: string;
  /** 주소에 넣을 때 — %E2%9D%A4 */
  urlEncoded: string;
  /** UTF-8로 몇 바이트인가 */
  utf8Bytes: number;
  /** 서로게이트 쌍이 필요한가 — 자바스크립트에서 length가 2가 된다 */
  surrogate: boolean;
}

/**
 * 이름이 붙은 HTML 엔티티.
 *
 * 숫자 엔티티는 코드 포인트에서 그대로 나오지만, 이름은 규칙이 없어 표가 필요하다.
 * 널리 쓰이는 것만 적는다 — 없으면 숫자 쪽을 쓰면 되고, 그편이 더 안전하다.
 */
const NAMED: Record<string, string> = {
  '→': '&rarr;', '←': '&larr;', '↑': '&uarr;', '↓': '&darr;', '↔': '&harr;',
  '⇒': '&rArr;', '⇐': '&lArr;', '⇔': '&hArr;',
  '±': '&plusmn;', '×': '&times;', '÷': '&divide;', '≠': '&ne;', '≈': '&asymp;',
  '≤': '&le;', '≥': '&ge;', '∞': '&infin;', '√': '&radic;', '∑': '&sum;',
  '∏': '&prod;', '∫': '&int;', 'π': '&pi;', '°': '&deg;', '′': '&prime;',
  '″': '&Prime;', '∂': '&part;', '∈': '&isin;', '∅': '&empty;', '∴': '&there4;',
  '⊥': '&perp;', '∠': '&ang;', '‰': '&permil;',
  '€': '&euro;', '¥': '&yen;', '£': '&pound;', '¢': '&cent;',
  '…': '&hellip;', '·': '&middot;', '•': '&bull;', '—': '&mdash;', '–': '&ndash;',
  '§': '&sect;', '¶': '&para;', '†': '&dagger;', '‡': '&Dagger;',
  '“': '&ldquo;', '”': '&rdquo;', '‘': '&lsquo;', '’': '&rsquo;',
  '«': '&laquo;', '»': '&raquo;', '¿': '&iquest;', '¡': '&iexcl;',
  '★': '&starf;', '☆': '&star;', '♥': '&hearts;', '♠': '&spades;',
  '♣': '&clubs;', '♦': '&diams;', '♪': '&sung;',
  '©': '&copy;', '®': '&reg;', '™': '&trade;',
  'α': '&alpha;', 'β': '&beta;', 'γ': '&gamma;', 'θ': '&theta;', 'λ': '&lambda;',
  'μ': '&mu;', 'σ': '&sigma;', 'Ω': '&Omega;', 'Φ': '&Phi;',
  '½': '&frac12;', '¼': '&frac14;', '¾': '&frac34;', '²': '&sup2;', '³': '&sup3;',
  '∆': '&#8710;',
};

const hex = (n: number) => n.toString(16).toUpperCase().padStart(4, '0');

export function glyphFacts(g: Glyph): GlyphFacts {
  const code = g.char.codePointAt(0)!;
  const named = NAMED[g.char];
  return {
    char: g.char,
    slug: g.slug,
    code,
    unicode: `U+${hex(code)}`,
    entity: `&#${code};`,
    // 이름 표에 넣어 둔 것 중 숫자 꼴로 적힌 것은 이름이 없는 것과 같다
    namedEntity: named && !named.startsWith('&#') ? named : undefined,
    cssEscape: `\\${hex(code)}`,
    jsEscape: code > 0xffff ? `\\u{${code.toString(16).toUpperCase()}}` : `\\u${hex(code)}`,
    urlEncoded: encodeURIComponent(g.char),
    utf8Bytes: new TextEncoder().encode(g.char).length,
    // 0xFFFF를 넘으면 자바스크립트에서 두 칸을 차지한다
    surrogate: code > 0xffff,
  };
}

/** 같은 갈래의 다른 글자 — 하나를 찾으러 왔다가 옆 것을 함께 가져간다 */
export function relatedGlyphs(slug: string, limit = 12): Glyph[] {
  const me = GLYPHS.find(g => g.slug === slug);
  if (!me) return [];
  return GLYPHS.filter(g => g.kind === me.kind && g.slug !== slug).slice(0, limit);
}
