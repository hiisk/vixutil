import { ImageResponse } from 'next/og';
import { createElement } from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactElement } from 'react';
import { OG_SIZE } from './og-template';

/**
 * 공유 카드를 그린다 — 글자에 맞는 폰트를 함께 넘긴다.
 *
 * next/og가 들고 있는 폰트는 Geist(라틴) 하나뿐이다. 한글·가나·한자·데바나가리는
 * 커버되지 않아서, Satori가 글자마다 구글 폰트 API로 **네트워크 요청**을 보낸다
 * (loadDynamicAsset → loadGoogleFont). Vercel 빌드에서 그게 ETIMEDOUT이 났고,
 * 실패하면 그 글자는 두부(□)로 그려진 채 카드가 나간다. 한국어·일본어·중국어·
 * 힌디어 카드가 전부 그 상태였다.
 *
 * 그래서 폰트를 저장소에 심고 여기서 넘긴다. 넘긴 폰트가 글자를 다 덮으면
 * Satori는 바깥으로 나가지 않는다 — 빌드에서 외부 의존이 사라진다.
 *
 * 폰트는 lib/og-fonts/에 있고, 저장소 안 .ts·.tsx에 실제로 나오는 글자만
 * 담은 부분집합이다(전체를 담으면 한자 폰트 하나가 10MB다). 만드는 방법은
 * scripts/build-og-fonts.py에 적어 두었다.
 */

const DIR = join(process.cwd(), 'lib', 'og-fonts');

/** 파일을 한 번만 읽는다 — 워커 하나가 카드 수백 장을 그린다 */
const cache = new Map<string, Buffer>();
const load = (name: string): Buffer => {
  let buf = cache.get(name);
  if (!buf) {
    buf = readFileSync(join(DIR, name));
    cache.set(name, buf);
  }
  return buf;
};

/**
 * 글자 계열 판정.
 *
 * 라틴은 여기 없다 — next/og의 Geist가 이미 덮는다. 덮이지 않는 것만 본다.
 */
const SCRIPTS = [
  { file: 'noto-kr', family: 'Noto Sans KR', re: /[가-힣ᄀ-ᇿ㄰-㆏]/ },
  { file: 'noto-jp', family: 'Noto Sans JP', re: /[぀-ヿ]/ },
  { file: 'noto-deva', family: 'Noto Sans Devanagari', re: /[ऀ-ॿ]/ },
] as const;

/** 수학 기호 — Noto Sans가 못 그리는 자리 */
const MATH = /[\u2200-\u22FF\u27C0-\u27EF\u2A00-\u2AFF]/;

/** 한자는 세 벌이 겹친다 — 가나가 함께 있으면 일본어 자형을 쓴다 */
const HAN = /[一-鿿㐀-䶿豈-﫿]/;

/** 번체를 쓰는 글자가 섞였는지 — 간체·번체 중 하나를 고르는 데만 쓴다 */
const TRADITIONAL = /[臺灣繁體會學實國個來時後們對開關聲點體萬與號說語]/;

/** React 트리에서 글자만 긁어모은다 */
function textOf(node: unknown, out: string[] = [], depth = 0): string[] {
  if (depth > 40 || node == null || node === false || node === true) return out;
  if (typeof node === 'string' || typeof node === 'number') {
    out.push(String(node));
    return out;
  }
  if (Array.isArray(node)) {
    for (const n of node) textOf(n, out, depth + 1);
    return out;
  }
  const props = (node as { props?: { children?: unknown } }).props;
  if (props && 'children' in props) textOf(props.children, out, depth + 1);
  return out;
}

type Font = { name: string; data: Buffer; weight: 400 | 700; style: 'normal' };

/*
 * 이름을 폰트마다 다르게 준다.
 *
 * 처음에 전부 'Noto'로 줬더니 한글이 한 글자도 안 그려졌다 — satori는 같은
 * 이름을 한 벌로 보고 하나만 쓴다. 라틴 폰트가 앞에 있으면 한글은 없는 글자가
 * 되어, 결국 구글 폰트로 나가는 그 길로 되돌아간다. 이름을 갈라 두면 satori가
 * 못 그린 글자를 다음 폰트에서 찾는다.
 */
const pair = (file: string, name: string): Font[] => [
  { name, data: load(`${file}-regular.ttf`), weight: 400, style: 'normal' },
  { name, data: load(`${file}-bold.ttf`), weight: 700, style: 'normal' },
];

/**
 * 이 카드에 필요한 폰트만 고른다.
 *
 * 전부 넘기면 한 장 그릴 때마다 8MB를 파싱한다. 카드 하나에 섞이는 계열은
 * 보통 하나뿐이라, 나온 계열만 얹는 편이 훨씬 가볍다.
 */
export function ogFonts(el: ReactElement): Font[] {
  const text = textOf(el).join('');
  /*
   * 라틴 확장·문장부호는 늘 얹는다. Geist는 기본 라틴만 덮어서, em 대시 하나에도
   * Satori가 밖으로 나간다 — 실제로 한국어 카드가 "—" 때문에 요청을 두 번 보냈다.
   * 38KB짜리라 얹는 값이 싸다.
   */
  const fonts: Font[] = pair('noto-base', 'Noto Sans');
  /*
   * 수학 기호(√ ∑ ∫ …)는 Noto Sans에 없다. 구글 폰트 API도 그 글자를 400으로
   * 거부해서, 카드에 두부가 찍히고 요청만 매번 나갔다 — 빌드 로그의
   * "Failed to load dynamic font for √"가 그것이다. 30KB짜리라 필요할 때만 얹는다.
   */
  if (MATH.test(text)) fonts.push(...pair('noto-math', 'Noto Sans Math'));
  for (const s of SCRIPTS) if (s.re.test(text)) fonts.push(...pair(s.file, s.family));
  if (HAN.test(text) && !SCRIPTS[1].re.test(text)) {
    // 가나가 함께 있으면 일본어 폰트가 이미 한자를 덮는다
    const tw = TRADITIONAL.test(text);
    fonts.push(...pair(tw ? 'noto-tc' : 'noto-sc', tw ? 'Noto Sans TC' : 'Noto Sans SC'));
  }
  return fonts;
}

/** 카드 한 장 — 크기와 폰트를 함께 건다 */
export function ogImage(el: ReactElement): ImageResponse {
  return new ImageResponse(el, { ...OG_SIZE, fonts: ogFonts(el) });
}

/**
 * 사이트 안 썸네일 — 같은 카드를 절반 크기로 그린다 (2026-08-18).
 *
 * 홈 격자가 카드 그림을 그대로 쓰면서 생긴 자리다. 1200×630 원본은 한 장 90KB라
 * 마흔 장이면 3.6MB다 — 이 저장소가 Origin Transfer 한도의 348%에서 한 번 멈춘
 * 적이 있는 만큼(lib/prerender.ts) 첫 화면에 그대로 붓지 않는다.
 *
 * Satori는 넘겨받은 크기로 **다시 레이아웃할 뿐 축소하지 않는다** — 카드 JSX는
 * 좌표가 1200 기준으로 박혀 있어(og-template.tsx의 ART_X·GLYPH) 작은 화폭을 주면
 * 그림이 화폭 밖으로 나간다. 그래서 원본 크기 그대로 그린 뒤 transform으로 줄인다.
 *
 * 이 주소는 allCardParams에 넣지 않는다 — 빌드에서 한 장도 더 굽지 않고,
 * 실제로 불린 것만 요청 때 만들어져 캐시에 남는다(dynamicParams).
 */
const THUMB = 0.5;

export function ogThumb(el: ReactElement): ImageResponse {
  const w = Math.round(OG_SIZE.width * THUMB);
  const h = Math.round(OG_SIZE.height * THUMB);
  /* .ts 파일이라 JSX를 못 쓴다 — 이 파일이 검사 사슬에 들어와 있다(og-size.ts 머리말) */
  const scaled = createElement(
    'div',
    {
      style: {
        display: 'flex',
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        transform: `scale(${THUMB})`,
        transformOrigin: 'top left',
      },
    },
    el,
  );
  const root = createElement(
    'div',
    { style: { display: 'flex', overflow: 'hidden', width: w, height: h } },
    scaled,
  );
  return new ImageResponse(root, { width: w, height: h, fonts: ogFonts(el) });
}
