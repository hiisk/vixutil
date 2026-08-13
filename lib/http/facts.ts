/**
 * 상태 코드와 헤더 한 장에 들어가는 값 — 번호와 이름에서 계산한다.
 *
 * 상태 코드는 첫 자리가 곧 뜻이라 갈래를 셀 필요가 없고, 헤더는 이름을 소문자로
 * 내리면 실제로 보내는 꼴이 된다. 손으로 적을 것이 없다.
 */
import { HTTP_ITEMS, statusClass, type HttpItem, type StatusClass } from './list.ts';
import { relatedWindow } from '../related-window.ts';

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

/**
 * 견줄 항목 — 같은 갈래(상태코드/헤더)에서 한 바퀴 돌며 고른다.
 *
 * ── 앞에서 자르던 것을 원형으로 바꿨다 (2026-08-13) ──────────
 * `.slice(0, limit)`이라 목록 앞쪽만 서로 가리키고 뒤에 붙인 것은 들어오는 링크가
 * 0이었다(195개 중 118개). relatedWindow는 자기 다음부터 한 바퀴 감아 모두가 고르게 남의
 * 목록에 든다 — 까닭은 lib/related-window.ts 머리말.
 */
export function relatedHttp(slug: string, limit = 10): string[] {
  const me = HTTP_ITEMS.find(x => x.slug === slug);
  if (!me) return [];
  /*
   * 같은 갈래로 **먼저 걸러 낸 뒤** 한 바퀴 돈다. relatedWindow에 sameGroup을
   * 넘기면 마지막 한 칸을 다른 갈래에 남기는데(갈래에 혼자인 항목을 위한 장치),
   * 이 섹션은 갈래마다 항목이 둘 이상이라 그 장치가 필요 없고 "관련 항목은 전부
   * 같은 갈래"라는 기존 검사와도 어긋난다.
   */
  /*
   * 갈래를 나누는 기준이 둘이다 — 상태코드는 **번호대**(1xx·2xx…), 헤더는
   * **방향**(요청/응답)이다. httpFacts의 siblings가 쓰던 기준 그대로이고,
   * tests/http-codes.test.ts가 그 둘을 다 본다.
   */
  const same = HTTP_ITEMS.filter(x =>
    x.kind === me.kind && (
      me.kind === 'status'
        ? statusClass(x.code!) === statusClass(me.code!)
        : x.side === me.side
    ));
  return relatedWindow(same, me, limit).map(x => x.slug);
}
