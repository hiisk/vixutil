/**
 * 태그 한 장에 들어가는 값 — 이름과 갈래에서 계산한다.
 *
 * 여는 꼴과 닫는 꼴, 문서 주소는 이름 하나에서 나온다. 표를 손으로 적으면
 * <br></br>처럼 존재하지 않는 꼴이 섞여 들어가는데, 화면에서는 그럴듯해 보인다.
 */
import { TAGS, type Tag } from './tags.ts';
import { relatedWindow } from '../related-window.ts';

export interface TagFacts {
  name: string;
  /** <div> */
  open: string;
  /** </div> — 닫는 태그가 없으면 빈 문자열 */
  close: string;
  /** <div></div> 또는 <br> */
  example: string;
  /** 닫는 태그가 없는가 */
  isVoid: boolean;
  /** 더 쓰지 않는 태그인가 */
  deprecated: boolean;
  attrs: string[];
  /** 표준 문서 주소 */
  docUrl: string;
  /** 같은 갈래의 다른 태그 */
  siblings: string[];
}

export function tagFacts(t: Tag): TagFacts {
  const isVoid = t.void === true;
  return {
    name: t.name,
    open: `<${t.name}>`,
    close: isVoid ? '' : `</${t.name}>`,
    // 닫는 태그가 없는 것에 </br>을 붙이면 브라우저가 무시하거나 빈 줄을 하나 더 만든다
    example: isVoid ? `<${t.name}>` : `<${t.name}></${t.name}>`,
    isVoid,
    deprecated: t.kind === 'deprecated',
    attrs: t.attrs ?? [],
    docUrl: `https://developer.mozilla.org/docs/Web/HTML/Element/${t.name}`,
    siblings: TAGS.filter(o => o.kind === t.kind && o.name !== t.name).map(o => o.name),
  };
}

/**
 * 견줄 태그 — 같은 갈래에서 한 바퀴 돌며 고른다.
 *
 * ── 앞에서 자르던 것을 원형으로 바꿨다 (2026-08-13) ──────────
 * `.slice(0, limit)`이라 목록 앞쪽만 서로 가리키고 뒤에 붙인 것은 아무도
 * 가리키지 않았다(151개 중 52개가 그랬다). relatedWindow는 자기 다음부터 한 바퀴 감아
 * 모두가 고르게 남의 목록에 든다 — 까닭은 lib/related-window.ts 머리말.
 *
 * 가까운 것(같은 갈래)을 앞에 두는 성질은 sameGroup으로 그대로 지킨다.
 */
export function relatedTags(name: string, limit = 10): string[] {
  const me = TAGS.find(t => t.name === name);
  if (!me) return [];
  /*
   * 같은 갈래로 **먼저 걸러 낸 뒤** 한 바퀴 돈다. relatedWindow에 sameGroup을
   * 넘기면 마지막 한 칸을 다른 갈래에 남기는데(갈래에 혼자인 항목을 위한 장치),
   * 이 섹션은 갈래마다 항목이 둘 이상이라 그 장치가 필요 없고 "관련 항목은 전부
   * 같은 갈래"라는 기존 검사와도 어긋난다.
   */
  return relatedWindow(TAGS.filter(t => t.kind === me.kind), me, limit).map(t => t.name);
}
