/**
 * 속성 한 장에 들어가는 값 — 이름과 갈래에서 계산한다.
 *
 * 쓰는 꼴과 문서 주소는 이름 하나에서 나온다. 단축 속성이 무엇을 한꺼번에
 * 정하는지, 거꾸로 어떤 단축에 속하는지도 데이터를 훑으면 나온다 —
 * 양쪽을 손으로 적으면 한쪽만 고쳐 놓고 넘어가게 된다.
 */
import { CSS_PROPS, type CssProp } from './props.ts';
import { relatedWindow } from '../related-window.ts';

export interface PropFacts {
  name: string;
  /** display: flex 처럼 한 줄로 쓴 보기 */
  example: string;
  /** 자식에게 물려주는가 */
  inherited: boolean;
  values: string[];
  /** 이 속성이 한꺼번에 정하는 것들 */
  shorthandFor: string[];
  /** 이 속성을 한꺼번에 정하는 단축 속성 */
  partOf: string[];
  /** 같은 갈래의 다른 속성 */
  siblings: string[];
  docUrl: string;
}

export function propFacts(p: CssProp): PropFacts {
  const first = p.values?.[0] ?? 'initial';
  return {
    name: p.name,
    example: `${p.name}: ${first};`,
    inherited: p.inherited === true,
    values: p.values ?? [],
    shorthandFor: p.shorthandFor ?? [],
    // 거꾸로 찾는다 — margin-top 쪽에서 "margin이 나를 정한다"를 알 수 있어야 한다
    partOf: CSS_PROPS.filter(o => o.shorthandFor?.includes(p.name)).map(o => o.name),
    siblings: CSS_PROPS.filter(o => o.kind === p.kind && o.name !== p.name).map(o => o.name),
    docUrl: `https://developer.mozilla.org/docs/Web/CSS/${p.name}`,
  };
}

/**
 * 견줄 속성 — 단축 관계가 있으면 먼저, 없으면 같은 갈래에서.
 *
 * ── 앞에서 자르던 것을 원형으로 바꿨다 (2026-08-13) ──────────
 * `.slice(0, limit)`이라 목록 앞쪽만 서로 가리키고 뒤에 붙인 것은 아무도
 * 가리키지 않았다(237개 중 78개가 그랬다). relatedWindow는 자기 다음부터 한 바퀴 감아
 * 모두가 고르게 남의 목록에 든다 — 까닭은 lib/related-window.ts 머리말.
 *
 * 가까운 것(같은 갈래)을 앞에 두는 성질은 sameGroup으로 그대로 지킨다.
 */
export function relatedProps(name: string, limit = 10): string[] {
  const me = CSS_PROPS.find(p => p.name === name);
  if (!me) return [];
  /* 단축 관계는 몇 개 안 되고 진짜로 가까우므로 앞에 그대로 둔다 */
  const f = propFacts(me);
  const near = [...f.shorthandFor, ...f.partOf].slice(0, limit);
  const rest = relatedWindow(CSS_PROPS, me, limit, (a, b) => a.kind === b.kind)
    .map(o => o.name)
    .filter(n => !near.includes(n));
  return [...near, ...rest].slice(0, limit);
}
