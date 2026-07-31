/**
 * 문구를 만들 때 쓰는 사실만 뽑아낸다.
 *
 * FAQ·메타 설명이 135장 × 8언어라 문장 틀은 ui.ts에 한 벌만 두고, 항목마다
 * 다른 숫자와 이름을 여기서 계산해 넘긴다. 숫자가 계산에서 오므로 틀릴 수 없다.
 */
import type { Lang } from '../i18n/lang.ts';
import {
  KIND_WORD, accidentalOf, feelOf, noteListOf, notesOf, stepsOf, symbolOf, titleOf,
  type MusicItem,
} from './catalog.ts';
import { freq } from './notes.ts';
import type { ItemFacts } from './ui.ts';

export function itemFacts(item: MusicItem, lang: Lang): ItemFacts {
  return {
    title: titleOf(item, lang),
    symbol: symbolOf(item),
    notes: noteListOf(item, lang),
    steps: stepsOf(item),
    kindWord: KIND_WORD[lang][item.kind],
    feel: feelOf(item, lang),
    hz: freq(notesOf(item)[0] ?? 0, 4),
  };
}

/** 화면에서 소리를 낼 때 쓸 주파수 — 옥타브를 넘어가면 위로 이어 붙인다 */
export function frequencies(item: MusicItem): number[] {
  const base = item.root;
  return stepsOf(item).map(s => freq(base + s, 4 + Math.floor((base + s) / 12)));
}

export { accidentalOf };
