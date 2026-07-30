/**
 * 단위 변환 상세 페이지의 FAQ를 데이터에서 만든다.
 *
 * 쉰 개 × 세 문항을 손으로 쓰면 백오십 개가 되고, 그중 상당수는 서로 베낀 문장이
 * 된다. 여기서는 계수에서 실제 값을 계산해 답에 넣기 때문에 문항마다 다른 숫자가
 * 들어간다 — "1cm는 몇 인치인가요"의 답이 진짜 계산 결과다.
 */
import type { FaqItem } from './calc-faq.ts';
import { convert, convertBack, format, type ConvertTool } from './convert-tools.ts';
import { CONVERT_UI, type ConvertLang } from './convert-ui-intl.ts';
import { CONVERT_EN } from './convert-i18n.ts';

export function convertFaq(tool: ConvertTool, lang: ConvertLang = 'ko'): FaqItem[] {
  const ui = CONVERT_UI[lang];
  const one = format(convert(1, tool), Math.max(tool.digits, 2));
  const oneBack = format(convertBack(1, tool), Math.max(tool.digits, 2));
  const ten = format(convert(10, tool), tool.digits);

  // 주의사항과 단위 기호도 그 언어의 것을 쓴다
  const l = lang === 'en' ? CONVERT_EN[tool.slug] : undefined;
  const note = l?.note ?? tool.note;
  const from = l?.from ?? tool.from;
  const to = l?.to ?? tool.to;

  return [
    { q: ui.faq1(from, to), a: ui.faq1a(from, to, one, ten) },
    { q: ui.faq2(from, to), a: ui.faq2a(from, to, oneBack) },
    { q: ui.faq3, a: note },
  ];
}
