/**
 * 상태 코드와 헤더 한 장에 들어가는 값 — 번호와 이름에서 계산한다.
 *
 * 상태 코드는 첫 자리가 곧 뜻이라 갈래를 셀 필요가 없고, 헤더는 이름을 소문자로
 * 내리면 실제로 보내는 꼴이 된다. 손으로 적을 것이 없다.
 */
import { HTTP_ITEMS, statusClass, type HttpItem, type StatusClass } from './list.ts';

export interface HttpFacts {
  slug: string;
  name: string;
  kind: 'status' | 'header';
  /** 상태 코드의 숫자 */
  code?: number;
  klass?: StatusClass;
  /** 오류로 다루는 코드인가 — 4xx와 5xx */
  isError: boolean;
  /** 넘김 코드인가 — 3xx */
  isRedirect: boolean;
  side?: 'request' | 'response' | 'both';
  /** 실제로 줄에 적히는 꼴 */
  example: string;
  /** 같은 갈래의 다른 항목 */
  siblings: string[];
  docUrl: string;
}

export function httpFacts(x: HttpItem): HttpFacts {
  if (x.kind === 'status') {
    const klass = statusClass(x.code!);
    return {
      slug: x.slug,
      name: x.name,
      kind: 'status',
      code: x.code,
      klass,
      isError: klass === '4xx' || klass === '5xx',
      isRedirect: klass === '3xx',
      // 응답 첫 줄은 이렇게 생겼다
      example: `HTTP/1.1 ${x.name}`,
      siblings: HTTP_ITEMS.filter(o => o.kind === 'status' && statusClass(o.code!) === klass && o.slug !== x.slug).map(o => o.slug),
      docUrl: `https://developer.mozilla.org/docs/Web/HTTP/Status/${x.code}`,
    };
  }
  return {
    slug: x.slug,
    name: x.name,
    kind: 'header',
    isError: false,
    isRedirect: false,
    side: x.side,
    // 헤더 줄은 이름과 값을 콜론으로 잇는다
    example: `${x.name}: …`,
    siblings: HTTP_ITEMS.filter(o => o.kind === 'header' && o.side === x.side && o.slug !== x.slug).map(o => o.slug),
    docUrl: `https://developer.mozilla.org/docs/Web/HTTP/Headers/${x.name}`,
  };
}

/** 견줄 항목 — 같은 갈래에서 앞에서부터 */
export function relatedHttp(slug: string, limit = 10): string[] {
  const me = HTTP_ITEMS.find(x => x.slug === slug);
  if (!me) return [];
  return httpFacts(me).siblings.slice(0, limit);
}
