/**
 * 검색 결과의 섹션 꼬리표가 그 언어로 나오는지 본다.
 *
 * `labels[sec] ?? sec`로 떨어지기 때문에 이름표가 없어도 화면은 멀쩡히 그려진다.
 * 대신 영어 슬러그가 그대로 뜬다 — 스페인어 사용자가 'fortune'과 'snap'을,
 * 일본어 사용자가 'test'를 그렇게 보고 있었다. 표가 tsx 안에 있어서 node로
 * 불러올 수 없었고, 그래서 아무 검사에도 걸리지 않았다.
 *
 * 색인을 실제로 만들어 거기 나온 섹션만 요구한다. 섹션이 늘어나면 이 검사가
 * 먼저 깨지므로 이름표를 빠뜨린 채 배포되지 않는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchIndexIntl, type SearchIntlLang } from '../lib/search-index-intl.ts';
import { SECTION_LABEL, SECTION_ORDER } from '../lib/search-section-labels.ts';

const LANGS = Object.keys(SECTION_LABEL) as SearchIntlLang[];

test('색인에 나오는 섹션은 그 언어의 이름표를 가진다', () => {
  const bad: string[] = [];
  for (const lang of LANGS) {
    const used = new Set(searchIndexIntl(lang).map(i => i.section));
    const missing = [...used].filter(s => !SECTION_LABEL[lang][s]);
    if (missing.length) bad.push(`${lang}: ${missing.join(', ')}`);
  }
  assert.deepEqual(bad, [], `이름표가 없어 영어 슬러그가 그대로 뜬다:\n  ${bad.join('\n  ')}`);
});

test('필터 단추 순서에 없는 섹션이 색인에 있지 않다', () => {
  // SECTION_ORDER에 빠지면 그 섹션만 필터로 좁힐 수 없다.
  const bad: string[] = [];
  for (const lang of LANGS) {
    const used = new Set(searchIndexIntl(lang).map(i => i.section));
    const missing = [...used].filter(s => !SECTION_ORDER.includes(s));
    if (missing.length) bad.push(`${lang}: ${missing.join(', ')}`);
  }
  assert.deepEqual(bad, [], `필터에서 빠진 섹션:\n  ${bad.join('\n  ')}`);
});
