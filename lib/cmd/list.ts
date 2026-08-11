/**
 * 터미널 명령어 225가지 — 이름과 갈래, 사용 꼴만 적는다.
 *
 * 명령 이름과 옵션은 프로그램이 정한 것이라 언어를 가리지 않는다. ls는 어느
 * 나라에서든 ls이고 -la는 -la다. 열 언어로 쓸 것은 "이것이 무엇을 하고 무엇을
 * 틀리기 쉬운가" 한 문장뿐이다 — /http가 상태 코드를 그렇게 다룬다.
 *
 * 자료는 갈래별 파일에 나눠 둔다. 한 파일에 이백스물다섯을 넣으면 무엇이
 * 어디 있는지 목록으로 안 보인다.
 */
import type { CmdItem, CmdCategory } from './types.ts';
import { CMD_FILES } from './list-files.ts';
import { CMD_RUN } from './list-run.ts';
import { CMD_DEV } from './list-dev.ts';

export type { CmdItem, CmdCategory, Ten } from './types.ts';

export const CMD_ITEMS: CmdItem[] = [...CMD_FILES, ...CMD_RUN, ...CMD_DEV];

/** 허브의 갈래 순서 — 자주 찾는 것을 앞에 둔다 */
export const CMD_CATEGORIES: CmdCategory[] = ['file', 'text', 'git', 'proc', 'net', 'archive', 'perm', 'pkg'];

export const CMD_SLUGS = CMD_ITEMS.map(x => x.slug);

const BY_SLUG = new Map(CMD_ITEMS.map(x => [x.slug, x]));
export const cmdItem = (slug: string): CmdItem | undefined => BY_SLUG.get(slug);

export const cmdsOf = (category: CmdCategory): CmdItem[] => CMD_ITEMS.filter(x => x.category === category);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const CMD_ICON = '⌨️';
