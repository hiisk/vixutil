/**
 * 앱별 키보드 단축키 — 키 조합과 앱, 갈래만 적는다.
 *
 * 키 이름은 프로그램과 자판이 정한 것이라 언어를 가리지 않는다. Ctrl+S는
 * 어디서든 Ctrl+S다. 열 언어로 쓸 것은 "무엇을 하고 무엇을 틀리기 쉬운가"
 * 한 문장뿐이다 — /cmd와 /http가 같은 방식이다.
 *
 * 윈도우와 맥을 한 항목에 나란히 둔다. 페이지를 갈라 두면 같은 기능이 주소
 * 둘을 갖고, 찾아온 사람은 자기 자판 쪽을 못 고른다.
 */
import { NA, type ScItem, type ScApp } from './types.ts';
import { SC_EDITOR } from './list-editor.ts';
import { SC_OFFICE } from './list-office.ts';
import { SC_DESIGN } from './list-design.ts';

export type { ScItem, ScApp, Ten } from './types.ts';

export const SC_ITEMS: ScItem[] = [...SC_EDITOR, ...SC_OFFICE, ...SC_DESIGN];

/** 허브의 앱 순서 — 검색이 많은 것을 앞에 둔다 */
export const SC_APPS: ScApp[] = ['excel', 'vscode', 'chrome', 'sheets', 'windows', 'macos', 'terminal', 'figma', 'photoshop', 'slack'];

export const SC_SLUGS = SC_ITEMS.map(x => x.slug);

const BY_SLUG = new Map(SC_ITEMS.map(x => [x.slug, x]));
export const scItem = (slug: string): ScItem | undefined => BY_SLUG.get(slug);

export const scOf = (app: ScApp): ScItem[] => SC_ITEMS.filter(x => x.app === app);

/** 윈도우와 맥이 다른가 — 화면에서 두 줄로 보일지 정한다 */
export const scDiffers = (x: ScItem): boolean => x.win !== x.mac;

/**
 * 좁은 목록에 한 줄만 넣을 때 보여 줄 조합.
 *
 * 기본은 윈도우 쪽이지만, 그 운영체제에 없는 기능이면 맥 쪽을 보여 준다 —
 * 관련 목록에 '—'만 놓이면 무슨 단축키인지 알 수 없다.
 */
export const primaryCombo = (x: ScItem): string => (x.win === NA ? x.mac : x.win);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const SC_ICON = '⌨️';
