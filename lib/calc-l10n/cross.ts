import type { CalcLang } from './types.ts';
import { RATE_TOOLS } from '../rate-tools.ts';
import { BODY_TOOLS } from '../body-tools.ts';
import { TOOL_L10N } from '../formula/tool-l10n.ts';

/**
 * 다른 섹션에 이미 있는 계산기들.
 *
 * 이 열 개는 /rate와 /body에 열 언어로 이미 있었다. 계산기 쪽에도 번역해 두었더니
 * 같은 언어 안에서 같은 도구가 두 주소를 갖고 제목까지 같아져, 빌드 후 검사가
 * 65건을 잡아냈다. 도구 하나에 주소 하나여야 하므로 계산기 쪽을 접었다.
 *
 * 대신 허브에서 이리로 넘겨준다 — 목록에서 사라지면 계산기 허브만 보고 온
 * 사람은 그 도구가 없는 줄 안다. 문구는 저쪽 섹션 사전에서 그대로 꺼내 쓴다.
 * 여기 한 번 더 적으면 두 곳이 곧 어긋난다.
 */
export const CALC_CROSS: { slug: string; section: 'rate' | 'body' }[] = [
  { slug: 'discount', section: 'rate' },
  { slug: 'tip', section: 'rate' },
  { slug: 'dutch-pay', section: 'rate' },
  { slug: 'roi', section: 'rate' },
  { slug: 'simple-interest', section: 'rate' },
  { slug: 'compound-interest', section: 'rate' },
  { slug: 'bmi', section: 'body' },
  { slug: 'bmr', section: 'body' },
  { slug: 'sleep-cycles', section: 'body' },
  { slug: 'water-need', section: 'body' },
];

const CATALOG = [...RATE_TOOLS, ...BODY_TOOLS];

/** 그 언어의 제목·설명. 번역이 없으면 영어로 되돌린다 — 그 줄만 영어가 된다. */
export function crossCalcs(lang: CalcLang) {
  return CALC_CROSS.flatMap(({ slug, section }) => {
    const tool = CATALOG.find(t => t.slug === slug);
    if (!tool) return [];
    const text = lang === 'en' ? tool.en : (TOOL_L10N[lang]?.[slug] ?? tool.en);
    return [{ slug, section, title: text.title, desc: text.desc }];
  });
}
