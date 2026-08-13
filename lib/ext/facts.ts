/**
 * 확장자 한 장에 들어가는 값 — 확장자·MIME·갈래에서 계산한다.
 *
 * MIME 타입은 "image/webp"처럼 두 토막이라 앞 토막만 떼면 큰 갈래가 나오고,
 * 같은 MIME을 쓰는 확장자를 모으면 "사실상 같은 파일"이 드러난다. jpg와 jpeg,
 * sqlite와 db가 그렇다.
 */
import { EXTS, type Ext } from './list.ts';
import { relatedWindow } from '../related-window.ts';

/**
 * 브라우저가 플러그인 없이 여는 형식.
 *
 * 이 목록만은 계산으로 안 나온다. MIME이 image/*라고 다 열리는 것도 아니고
 * (tiff·psd는 안 열린다), application/*라고 다 못 여는 것도 아니다(pdf는 열린다).
 * 그래서 실제로 열리는 것만 손으로 적는다.
 */
const WEB_NATIVE = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'bmp', 'ico',
  'mp4', 'webm', 'ogv',
  'mp3', 'wav', 'ogg', 'opus', 'flac', 'aac', 'm4a',
  'pdf', 'txt', 'html', 'css', 'js', 'json', 'xml', 'vtt', 'woff', 'woff2',
]);

export interface ExtFacts {
  ext: string;
  mime: string;
  /** MIME의 앞 토막 — image·video·application 처럼 */
  mimeType: string;
  /** MIME의 뒤 토막 */
  mimeSubtype: string;
  /** 표준으로 등록된 타입인가 — x- 로 시작하면 비공식이다 */
  official: boolean;
  /** 글자 파일인가 */
  text: boolean;
  /** 브라우저가 그냥 여는가 */
  web: boolean;
  /** 같은 MIME을 쓰는 다른 확장자 — jpg와 jpeg처럼 사실상 같은 파일 */
  twins: string[];
  /** 같은 갈래의 다른 확장자 */
  siblings: string[];
  apps: string[];
}

export function extFacts(x: Ext): ExtFacts {
  const [mimeType, mimeSubtype = ''] = x.mime.split('/');
  return {
    ext: x.ext,
    mime: x.mime,
    mimeType,
    mimeSubtype,
    // x- 접두사는 "아직 등록 안 된 것"이라는 뜻으로 붙던 관행이다
    official: !mimeSubtype.startsWith('x-') && !mimeSubtype.startsWith('vnd.x'),
    text: x.text === true,
    web: WEB_NATIVE.has(x.ext),
    twins: EXTS.filter(o => o.ext !== x.ext && o.mime === x.mime).map(o => o.ext),
    siblings: EXTS.filter(o => o.ext !== x.ext && o.kind === x.kind).map(o => o.ext),
    apps: x.apps,
  };
}

/**
 * 견줄 확장자 — 쌍둥이(같은 MIME)를 먼저, 그다음 같은 갈래를 한 바퀴 돌며 채운다.
 *
 * ── 앞에서 자르던 것을 원형으로 바꿨다 (2026-08-13) ──────────
 * `.slice(0, limit)`이라 목록 앞쪽만 서로 가리키고 뒤에 붙인 것은 들어오는 링크가
 * 0이었다(266개 중 130개). relatedWindow는 자기 다음부터 한 바퀴 감아 모두가 고르게 남의
 * 목록에 든다 — 까닭은 lib/related-window.ts 머리말.
 */
export function relatedExts(ext: string, limit = 8): string[] {
  const me = EXTS.find(x => x.ext === ext);
  if (!me) return [];
  /* 쌍둥이는 몇 개 안 되고 정말로 같은 것이라 앞에 그대로 둔다 */
  const twins = extFacts(me).twins.slice(0, limit);
  const rest = relatedWindow(EXTS, me, limit, (a, b) => a.kind === b.kind)
    .map(x => x.ext)
    .filter(e => !twins.includes(e));
  return [...twins, ...rest].slice(0, limit);
}

/** 갈래별로 몇 개인지 — 목록 화면이 쓴다 */
export const extCount = (): number => EXTS.length;
