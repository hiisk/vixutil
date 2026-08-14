/**
 * hex 낱장이 ColorNamePage에 넘길 것 — 한 곳에서 만든다.
 *
 * 라우트가 둘이다(국제어 lib/fold/pages/color__slug.tsx · 한국어
 * lib/ko/pages/color__slug.tsx). 두 곳에서 각각 조립하면 언젠가 갈라지므로
 * 조립은 여기 하나로 둔다. JSX가 닿지 않아 node --test가 그대로 부를 수 있다.
 */
import type { Lang } from '../i18n/lang.ts';
import { colorFacts } from './facts.ts';
import { COLOR_UI } from './ui.ts';
import { HEX_UI } from './hex-ui.ts';
import { expandHex, familyOfHex, hexSlug, nearestNamedColors, neighborHexShorts } from './hex-grid.ts';
import type { NamedColor } from './named8.ts';

export interface HexLeafProps {
  color: NamedColor;
  lead: string;
  nearby: NamedColor[];
  faq: { q: string; a: string }[];
  nearbyTitle: string;
}

/**
 * 이웃 hex를 이름 있는 색인 척 만든다.
 *
 * ColorNamePage의 "가까운 색" 칸은 NamedColor를 받는다. 이웃 hex에는 이름이 없으니
 * 이름 자리에 hex를 그대로 넣는다 — 화면에는 색 견본과 코드가 나오므로 사람이
 * 읽기에 모자라지 않고, 링크는 `/color/hex-xxx`로 간다.
 */
const asNamed = (short: string): NamedColor => {
  const hex = expandHex(short);
  const label = hex.toUpperCase();
  return {
    slug: hexSlug(short),
    hex,
    family: familyOfHex(hex),
    name: { ko: label, en: label, es: label, pt: label, ja: label, de: label, fr: label, hi: label, zh: label, tw: label },
  };
};

export function hexLeafProps(short: string, lang: Lang): HexLeafProps {
  const hex = expandHex(short);
  const full = hex.toUpperCase();
  const f = colorFacts(hex);
  const hx = HEX_UI[lang];
  const family = COLOR_UI[lang].familyLabel[familyOfHex(hex)];
  const named = nearestNamedColors(short, 4);

  return {
    color: asNamed(short),
    /* 계열 이름을 첫 줄에 둔다 — hex만 보고는 무슨 색인지 모른다 */
    lead: `${family} · ${hx.shorthand(short, full)}`,
    /*
     * 이름 있는 색 넷과 이웃 hex 여섯 — 사전 쪽으로도, 격자 안으로도 이어진다.
     *
     * 여섯을 다 낸다. 빨강·초록만 잇고 파랑을 빼면 4,096칸이 파랑 값에 따라
     * 열여섯 덩어리로 끊겨 크롤러가 한 덩어리만 보고 만다.
     */
    nearby: [...named, ...neighborHexShorts(short).map(asNamed)],
    faq: hx.faq(full, short, f, named[0]?.name[lang] ?? full),
    nearbyTitle: hx.nearestTitle,
  };
}
