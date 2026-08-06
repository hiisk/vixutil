/**
 * HTML 태그 114가지 — 이름과 갈래, 닫는 태그가 있는지만 적는다.
 *
 * 태그 이름은 만국 공통이다. 어느 나라에서든 <div>는 <div>이고, 속성 이름도
 * 표준이 정한 영어 낱말이라 옮기지 않는다. 여덟 언어로 쓸 것은 설명뿐이다.
 *
 * 여는 꼴·닫는 꼴·MDN 주소는 이름에서 계산된다.
 */
export type TagKind =
  | 'structure'   // 문서의 뼈대
  | 'section'     // 구획
  | 'text'        // 글
  | 'inline'      // 문장 안 표시
  | 'list'        // 목록
  | 'table'       // 표
  | 'form'        // 입력
  | 'media'       // 그림·소리·영상
  | 'embed'       // 다른 문서 끼워넣기
  | 'script'      // 스크립트와 스타일
  | 'meta'        // 문서 정보
  | 'interactive' // 눌러서 여닫는 것
  | 'deprecated'; // 더 쓰지 않는 것

export interface Tag {
  /** 꺾쇠 없이 소문자로 — 주소와 화면에 그대로 쓴다 */
  name: string;
  kind: TagKind;
  /** 닫는 태그가 없는가 — <img>, <br> 처럼 */
  void?: boolean;
  /** 자주 함께 쓰는 속성 — 표준이 정한 영어 이름이라 옮기지 않는다 */
  attrs?: string[];
}

const t = (name: string, kind: TagKind, attrs?: string[], isVoid?: boolean): Tag =>
  ({ name, kind, ...(attrs ? { attrs } : {}), ...(isVoid ? { void: true } : {}) });

export const TAGS: Tag[] = [
  /* ───────── 문서 뼈대 ───────── */
  t('html', 'structure', ['lang']),
  t('head', 'structure'),
  t('body', 'structure'),
  t('title', 'structure'),
  t('base', 'structure', ['href', 'target'], true),

  /* ───────── 구획 ───────── */
  t('header', 'section'),
  t('nav', 'section'),
  t('main', 'section'),
  t('section', 'section'),
  t('article', 'section'),
  t('aside', 'section'),
  t('footer', 'section'),
  t('div', 'section', ['class', 'id']),
  t('h1', 'section'),
  t('h2', 'section'),
  t('h3', 'section'),
  t('h4', 'section'),
  t('h5', 'section'),
  t('h6', 'section'),
  t('hgroup', 'section'),
  t('address', 'section'),
  t('search', 'section'),

  /* ───────── 글 ───────── */
  t('p', 'text'),
  t('br', 'text', undefined, true),
  t('hr', 'text', undefined, true),
  t('pre', 'text'),
  t('blockquote', 'text', ['cite']),
  t('figure', 'text'),
  t('figcaption', 'text'),

  /* ───────── 문장 안 표시 ───────── */
  t('a', 'inline', ['href', 'target', 'rel']),
  t('span', 'inline', ['class']),
  t('strong', 'inline'),
  t('em', 'inline'),
  t('b', 'inline'),
  t('i', 'inline'),
  t('u', 'inline'),
  t('s', 'inline'),
  t('mark', 'inline'),
  t('small', 'inline'),
  t('sub', 'inline'),
  t('sup', 'inline'),
  t('code', 'inline'),
  t('kbd', 'inline'),
  t('samp', 'inline'),
  t('var', 'inline'),
  t('q', 'inline', ['cite']),
  t('cite', 'inline'),
  t('abbr', 'inline', ['title']),
  t('time', 'inline', ['datetime']),
  t('data', 'inline', ['value']),
  t('dfn', 'inline'),
  t('bdi', 'inline'),
  t('bdo', 'inline', ['dir']),
  t('ruby', 'inline'),
  t('rt', 'inline'),
  t('rp', 'inline'),
  t('wbr', 'inline', undefined, true),
  t('ins', 'inline', ['cite', 'datetime']),
  t('del', 'inline', ['cite', 'datetime']),

  /* ───────── 목록 ───────── */
  t('ul', 'list'),
  t('ol', 'list', ['start', 'reversed', 'type']),
  t('li', 'list', ['value']),
  t('dl', 'list'),
  t('dt', 'list'),
  t('dd', 'list'),
  t('menu', 'list'),

  /* ───────── 표 ───────── */
  t('table', 'table'),
  t('thead', 'table'),
  t('tbody', 'table'),
  t('tfoot', 'table'),
  t('tr', 'table'),
  t('th', 'table', ['scope', 'colspan', 'rowspan']),
  t('td', 'table', ['colspan', 'rowspan']),
  t('caption', 'table'),
  t('colgroup', 'table', ['span']),
  t('col', 'table', ['span'], true),

  /* ───────── 입력 ───────── */
  t('form', 'form', ['action', 'method']),
  t('input', 'form', ['type', 'name', 'value', 'placeholder', 'required'], true),
  t('textarea', 'form', ['name', 'rows', 'cols']),
  t('button', 'form', ['type', 'disabled']),
  t('select', 'form', ['name', 'multiple']),
  t('option', 'form', ['value', 'selected']),
  t('optgroup', 'form', ['label']),
  t('label', 'form', ['for']),
  t('fieldset', 'form', ['disabled']),
  t('legend', 'form'),
  t('datalist', 'form'),
  t('output', 'form', ['for']),
  t('progress', 'form', ['value', 'max']),
  t('meter', 'form', ['value', 'min', 'max']),

  /* ───────── 그림·소리·영상 ───────── */
  t('img', 'media', ['src', 'alt', 'width', 'height', 'loading'], true),
  t('picture', 'media'),
  t('source', 'media', ['src', 'srcset', 'type', 'media'], true),
  t('video', 'media', ['src', 'controls', 'autoplay', 'muted', 'poster']),
  t('audio', 'media', ['src', 'controls', 'loop']),
  t('track', 'media', ['src', 'kind', 'srclang', 'label'], true),
  t('canvas', 'media', ['width', 'height']),
  t('svg', 'media', ['viewBox', 'width', 'height']),
  t('map', 'media', ['name']),
  t('area', 'media', ['shape', 'coords', 'href', 'alt'], true),

  /* ───────── 끼워넣기 ───────── */
  t('iframe', 'embed', ['src', 'title', 'loading', 'allow']),
  t('embed', 'embed', ['src', 'type'], true),
  t('object', 'embed', ['data', 'type']),
  t('portal', 'embed', ['src']),

  t('math', 'embed', ['display']),

  /* ───────── 스크립트·스타일 ───────── */
  t('script', 'script', ['src', 'type', 'async', 'defer']),
  t('noscript', 'script'),
  t('style', 'script', ['media']),
  t('template', 'script'),
  t('slot', 'script', ['name']),

  /* ───────── 문서 정보 ───────── */
  t('meta', 'meta', ['charset', 'name', 'content'], true),
  t('link', 'meta', ['rel', 'href', 'as', 'type'], true),

  /* ───────── 눌러서 여닫기 ───────── */
  t('details', 'interactive', ['open', 'name']),
  t('summary', 'interactive'),
  t('dialog', 'interactive', ['open']),

  /* ───────── 더 쓰지 않는 것 ───────── */
  t('center', 'deprecated'),
  t('font', 'deprecated', ['size', 'color']),
  t('marquee', 'deprecated', ['direction', 'scrollamount']),
  t('blink', 'deprecated'),
  t('big', 'deprecated'),
  t('strike', 'deprecated'),
  t('tt', 'deprecated'),
  t('frame', 'deprecated', ['src'], true),
  t('frameset', 'deprecated', ['rows', 'cols']),
  t('acronym', 'deprecated'),
  t('applet', 'deprecated', ['code']),
  t('dir', 'deprecated'),
  t('nobr', 'deprecated'),
  t('noframes', 'deprecated'),
  t('noembed', 'deprecated'),
  t('plaintext', 'deprecated'),
  t('xmp', 'deprecated'),
  t('listing', 'deprecated'),
  t('basefont', 'deprecated', ['size', 'color'], true),
  t('keygen', 'deprecated', ['name', 'challenge'], true),
  t('spacer', 'deprecated', ['type', 'size'], true),
  t('isindex', 'deprecated', ['prompt'], true),
  t('param', 'deprecated', ['name', 'value'], true),
  t('rb', 'deprecated'),
  t('rtc', 'deprecated'),

  /* ───────── 늘린 것 ───────── */
  /* 표준에 있었다가 빠진 것들 — 옛 문서를 열면 실제로 나온다 */
  t('menuitem', 'deprecated'),
  t('bgsound', 'deprecated'),
  t('command', 'deprecated'),
  t('content', 'deprecated'),
  t('shadow', 'deprecated'),
  t('element', 'deprecated'),
  t('image', 'deprecated'),
  t('multicol', 'deprecated'),
  t('nextid', 'deprecated'),
  /* 새로 들어온 것들 */
  t('fencedframe', 'embed', ['width', 'height']),
  t('selectedcontent', 'form'),
];

export const TAG_KINDS: TagKind[] = [
  'structure', 'section', 'text', 'inline', 'list', 'table',
  'form', 'media', 'embed', 'script', 'meta', 'interactive', 'deprecated',
];

export const TAG_NAMES = TAGS.map(x => x.name);

export const tagOf = (slug: string): Tag | undefined => TAGS.find(x => x.name === slug);

export const tagsOfKind = (kind: TagKind): Tag[] => TAGS.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 창 아이콘으로 그려진다 */
export const TAG_ICON = '🪟';
