/**
 * CSS 픽셀 120가지 — 1px부터 120px까지, 자료는 한 줄도 적지 않는다.
 *
 * rem·pt·pc·인치·밀리미터는 전부 그 픽셀 수에서 계산된다(facts.ts). CSS가
 * 1인치를 96px로, 1pt를 1/72인치로 못 박아 두었기 때문에 환산이 하나로 정해진다.
 *
 * 주소를 /rem으로 둔 이유는 따로 있다. app/ 아래의 두 글자 폴더는 언어 코드로
 * 읽히기 때문에(/de, /fr…) /px는 언어 폴더로 오인된다 — 검사가 그것을 잡는다.
 *
 * 120에서 끊은 것은 그 위가 폰트나 여백으로 잘 쓰이지 않기 때문이다. 사람이
 * 찾는 값은 대개 12·14·16·24처럼 두 자리다.
 */
export const MAX_PX = 120;

export const PIXELS: number[] = Array.from({ length: MAX_PX }, (_, i) => i + 1);

export const PX_SLUGS = PIXELS.map(String);

export const pxOf = (slug: string): number | undefined => PIXELS.find(p => String(p) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const PX_ICON = '📏';

/** 브라우저가 기본으로 쓰는 글자 크기 — rem이 이 값을 기준으로 잰다 */
export const ROOT_PX = 16;
