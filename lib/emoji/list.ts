/**
 * 이모지 사전 — 글자와 코드포인트, 공식 이름, 사람들이 치는 이름만 적는다.
 *
 * 이모지는 그림이라 언어를 가리지 않는다. 🙏는 어디서 보내도 같은 U+1F64F이고,
 * 열 언어로 쓸 것은 "그래서 무슨 뜻으로 보내는가" 한 문장뿐이다 — /cmd가 명령
 * 이름을, /shortcut이 키 조합을 그렇게 둔다.
 *
 * 이 섹션의 값은 공식 이름과 실제 뜻이 어긋나는 자리에 있다. 💀는 skull이지만
 * 죽음이 아니라 웃겨 죽는다는 뜻이고, 💯은 백 점이 아니라 완전 동의다. 그래서
 * unicodeName과 common을 나란히 둔다.
 */
import type { EmojiItem, EmojiGroup } from './types.ts';
import { EM_FACE } from './list-face.ts';
import { EM_THING } from './list-thing.ts';
import { EM_SYMBOL } from './list-symbol.ts';
import { EM_PLACE } from './list-place.ts';

export type { EmojiItem, EmojiGroup, Ten } from './types.ts';

export const EM_ITEMS: EmojiItem[] = [...EM_FACE, ...EM_THING, ...EM_SYMBOL, ...EM_PLACE];

/** 허브의 갈래 순서 — 검색이 많은 것을 앞에 둔다 */
export const EM_GROUPS: EmojiGroup[] = ['face', 'hand', 'symbol', 'people', 'activity', 'nature', 'food', 'object', 'place'];

export const EM_SLUGS = EM_ITEMS.map(x => x.slug);

const BY_SLUG = new Map(EM_ITEMS.map(x => [x.slug, x]));
export const emojiItem = (slug: string): EmojiItem | undefined => BY_SLUG.get(slug);

export const emojisOf = (g: EmojiGroup): EmojiItem[] => EM_ITEMS.filter(x => x.group === g);

/**
 * 이모지 글자가 몇 개의 코드포인트로 되어 있는가 — 👩‍💻는 셋이다.
 * 백스페이스 한 번에 안 지워지는 이유가 이것이고, 낱장에서 그 말을 한다.
 */
export const codePoints = (char: string): number => [...char].length;

/** 변이 선택자가 붙어야 그림으로 나오는 글자 — 없으면 흑백으로 떨어진다 */
export const needsVs16 = (char: string): boolean => char.includes('️');

/** ZWJ로 이어 붙인 글자 — 자판마다 갖고 있는지가 다르다 */
export const isZwj = (char: string): boolean => char.includes('‍');

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const EM_ICON = '😀';
