/**
 * 단위 변환 상세 페이지의 FAQ를 데이터에서 만든다.
 *
 * 백 개 × 세 문항을 손으로 쓰면 삼백 개가 되고, 여덟 언어면 이천사백 개다. 그중
 * 상당수는 서로 베낀 문장이 된다. 여기서는 계수에서 실제 값을 계산해 답에 넣기
 * 때문에 문항마다 다른 숫자가 들어간다 — "1cm는 몇 인치인가요"의 답이 진짜 계산
 * 결과다. 문장 틀만 언어별로 두면 되고, 숫자는 어느 언어에서도 같은 함수가 만든다.
 */
import type { FaqItem } from './calc-faq.ts';
import { convert, convertBack, format, type ConvertTool } from './convert-tools.ts';
import { CONVERT_UI, type ConvertLang } from './convert-ui-intl.ts';
import { convertL10n } from './convert-i18n.ts';

export function convertFaq(tool: ConvertTool, lang: ConvertLang = 'ko'): FaqItem[] {
  const ui = CONVERT_UI[lang];
  const one = format(convert(1, tool), Math.max(tool.digits, 2));
  const oneBack = format(convertBack(1, tool), Math.max(tool.digits, 2));
  const ten = format(convert(10, tool), tool.digits);

  // 주의사항과 단위 기호도 그 언어의 것을 쓴다
  const l = convertL10n(tool.slug, lang);
  const note = l?.note ?? tool.note;
  const from = l?.from ?? tool.from;
  const to = l?.to ?? tool.to;

  return [
    { q: ui.faq1(from, to), a: ui.faq1a(from, to, one, ten) },
    { q: ui.faq2(from, to), a: ui.faq2a(from, to, oneBack) },
    { q: ui.faq3, a: note },
  ];
}
