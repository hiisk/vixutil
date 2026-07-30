/**
 * 노선에서 문구를 만들 때 쓰는 사실만 뽑아낸다.
 *
 * FAQ와 메타 설명은 여덟 언어에 노선 서른 개 = 이백사십 벌이라 손으로 못 쓴다.
 * ui.ts의 문장 틀이 노선 이름·역 수·양 끝 역만 받으면 되도록 여기서 한 번
 * 계산해 넘긴다. 역 이름은 현지 표기 그대로 쓴다 — 그것이 정답이기 때문이다.
 */
import type { MetroLang } from './lang.ts';
import type { LineFacts } from './ui.ts';
import { cityName, countryName, lineTitle, type MetroLine } from './types.ts';

export function lineFacts(line: MetroLine, lang: MetroLang): LineFacts {
  const st = line.stations;
  return {
    title: lineTitle(line, lang),
    city: cityName(line.city, lang),
    country: countryName(line.city, lang),
    count: st.length,
    first: st[0]?.name ?? '',
    last: st[st.length - 1]?.name ?? '',
    loop: Boolean(line.loop),
  };
}
