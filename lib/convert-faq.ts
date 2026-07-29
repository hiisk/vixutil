/**
 * 단위 변환 상세 페이지의 FAQ를 데이터에서 만든다.
 *
 * 쉰 개 × 세 문항을 손으로 쓰면 백오십 개가 되고, 그중 상당수는 서로 베낀 문장이
 * 된다. 여기서는 계수에서 실제 값을 계산해 답에 넣기 때문에 문항마다 다른 숫자가
 * 들어간다 — "1cm는 몇 인치인가요"의 답이 진짜 계산 결과다.
 */
import type { FaqItem } from './calc-faq.ts';
import { convert, convertBack, format, type ConvertTool } from './convert-tools.ts';

export function convertFaq(tool: ConvertTool): FaqItem[] {
  const one = format(convert(1, tool), Math.max(tool.digits, 2));
  const oneBack = format(convertBack(1, tool), Math.max(tool.digits, 2));
  const ten = format(convert(10, tool), tool.digits);

  return [
    {
      q: `1${tool.from}는 몇 ${tool.to}인가요?`,
      a: `1${tool.from}는 ${one}${tool.to}입니다. 10${tool.from}는 ${ten}${tool.to}이고, 위 입력칸에 원하는 값을 넣으면 바로 계산됩니다.`,
    },
    {
      q: `반대로 1${tool.to}는 몇 ${tool.from}인가요?`,
      a: `1${tool.to}는 ${oneBack}${tool.from}입니다. 이 페이지는 양방향이라 오른쪽 칸에 값을 넣으면 왼쪽이 자동으로 바뀝니다.`,
    },
    {
      q: `이 단위는 어디에 쓰나요?`,
      a: tool.note,
    },
  ];
}
