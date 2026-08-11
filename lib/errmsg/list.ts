/**
 * 오류 문구 사전 — 사람이 붙여 넣는 그 한 줄만 적는다.
 *
 * 빌드가 깨지면 사람들은 오류를 복사해 검색한다. 그 문구는 언어를 가리지 않는다
 * — `fatal: refusing to merge unrelated histories`는 어느 나라에서도 그 문자열
 * 그대로다. 그래서 열 언어로 쓰는 것은 "무슨 뜻이고, 왜 났고, 어떻게 하나"뿐이다.
 * /cmd가 명령 이름을, /shortcut이 키 조합을, /emoji가 글자를 그렇게 둔다.
 *
 * 고치는 명령(fix)에는 값이 따른다. `git reset --hard`는 커밋하지 않은 일을
 * 버리고, 강제 푸시는 남의 커밋을 지운다. 설명은 그 값을 숨기지 않는다 —
 * 제 조언의 대가를 숨기는 사전은 없는 것보다 나쁘다.
 */
import type { ErrItem, ErrCategory } from './types.ts';
import { ERR_VCS } from './list-vcs.ts';
import { ERR_RUNTIME } from './list-runtime.ts';

export type { ErrItem, ErrCategory, Ten } from './types.ts';

export const ERR_ITEMS: ErrItem[] = [...ERR_VCS, ...ERR_RUNTIME];

/** 허브의 갈래 순서 — 검색이 많은 것을 앞에 둔다 */
export const ERR_CATEGORIES: ErrCategory[] = ['git', 'npm', 'js', 'python', 'build', 'docker'];

const BY_SLUG = new Map(ERR_ITEMS.map(x => [x.slug, x]));
export const errItem = (slug: string): ErrItem | undefined => BY_SLUG.get(slug);

export const errsOf = (c: ErrCategory): ErrItem[] => ERR_ITEMS.filter(x => x.category === c);

/** 고치는 명령이 있는가 — 없으면 화면에서 그 칸을 그리지 않는다 */
export const hasFix = (x: ErrItem): boolean => x.fix.trim().length > 0;

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const ERR_ICON = '⚠️';
