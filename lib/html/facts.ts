/**
 * 태그 한 장에 들어가는 값 — 이름과 갈래에서 계산한다.
 *
 * 여는 꼴과 닫는 꼴, 문서 주소는 이름 하나에서 나온다. 표를 손으로 적으면
 * <br></br>처럼 존재하지 않는 꼴이 섞여 들어가는데, 화면에서는 그럴듯해 보인다.
 */
import { TAGS, type Tag } from './tags.ts';

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

/** 견줄 태그 — 같은 갈래에서 가까운 순서대로 */
export function relatedTags(name: string, limit = 10): string[] {
  const me = TAGS.find(t => t.name === name);
  if (!me) return [];
  return tagFacts(me).siblings.slice(0, limit);
}
