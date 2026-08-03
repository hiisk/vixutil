/**
 * CSS 속성 194가지 — 이름과 갈래, 상속 여부, 자주 쓰는 값만 적는다.
 *
 * 속성 이름과 값은 표준이 정한 영어라 옮기지 않는다. 어느 나라에서든
 * display: flex는 display: flex다. 여덟 언어로 쓸 것은 설명 한 줄뿐이다.
 */
export type PropKind =
  | 'layout'      // 배치
  | 'flexgrid'    // 플렉스와 그리드
  | 'box'         // 상자 크기와 여백
  | 'text'        // 글자
  | 'color'       // 색과 배경
  | 'border'      // 테두리와 모서리
  | 'effect'      // 그림자·투명도·필터
  | 'transform'   // 변형과 움직임
  | 'position'    // 위치
  | 'table'       // 표
  | 'list'        // 목록
  | 'interaction' // 조작
  | 'print';      // 인쇄와 기타

export interface CssProp {
  /** 속성 이름 — 주소와 화면에 그대로 쓴다 */
  name: string;
  kind: PropKind;
  /** 자식에게 물려주는가 */
  inherited?: boolean;
  /** 자주 쓰는 값 — 표준이 정한 낱말이라 옮기지 않는다 */
  values?: string[];
  /** 이 속성이 한꺼번에 정하는 다른 속성들 */
  shorthandFor?: string[];
}

const p = (name: string, kind: PropKind, values?: string[], inherited?: boolean, shorthandFor?: string[]): CssProp =>
  ({ name, kind, ...(values ? { values } : {}), ...(inherited ? { inherited: true } : {}), ...(shorthandFor ? { shorthandFor } : {}) });

export const CSS_PROPS: CssProp[] = [
  /* ───────── 배치 ───────── */
  p('display', 'layout', ['block', 'inline', 'flex', 'grid', 'inline-block', 'none', 'contents']),
  p('visibility', 'layout', ['visible', 'hidden', 'collapse'], true),
  p('float', 'layout', ['left', 'right', 'none']),
  p('clear', 'layout', ['left', 'right', 'both', 'none']),
  p('overflow', 'layout', ['visible', 'hidden', 'scroll', 'auto', 'clip'], false, ['overflow-x', 'overflow-y']),
  p('overflow-x', 'layout', ['visible', 'hidden', 'scroll', 'auto']),
  p('overflow-y', 'layout', ['visible', 'hidden', 'scroll', 'auto']),
  p('box-sizing', 'layout', ['content-box', 'border-box']),
  p('aspect-ratio', 'layout', ['auto', '1 / 1', '16 / 9']),
  p('container-type', 'layout', ['normal', 'inline-size', 'size']),
  p('isolation', 'layout', ['auto', 'isolate']),

  p('column-count', 'layout', ['auto', '2', '3']),
  p('column-width', 'layout', ['auto', '200px', '20em']),
  p('columns', 'layout', ['auto', '200px 3'], false, ['column-width', 'column-count']),
  p('content-visibility', 'layout', ['visible', 'auto', 'hidden']),
  p('contain', 'layout', ['none', 'strict', 'content', 'layout', 'paint', 'size']),

  /* ───────── 플렉스와 그리드 ───────── */
  p('flex-direction', 'flexgrid', ['row', 'column', 'row-reverse', 'column-reverse']),
  p('flex-wrap', 'flexgrid', ['nowrap', 'wrap', 'wrap-reverse']),
  p('flex', 'flexgrid', ['1', 'none', '0 1 auto'], false, ['flex-grow', 'flex-shrink', 'flex-basis']),
  p('flex-grow', 'flexgrid', ['0', '1']),
  p('flex-shrink', 'flexgrid', ['1', '0']),
  p('flex-basis', 'flexgrid', ['auto', '0', '50%']),
  p('justify-content', 'flexgrid', ['flex-start', 'center', 'space-between', 'space-around', 'space-evenly']),
  p('align-items', 'flexgrid', ['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  p('align-self', 'flexgrid', ['auto', 'center', 'stretch', 'flex-start']),
  p('align-content', 'flexgrid', ['stretch', 'center', 'space-between']),
  p('gap', 'flexgrid', ['0', '1rem', '8px 16px'], false, ['row-gap', 'column-gap']),
  p('row-gap', 'flexgrid', ['0', '1rem']),
  p('column-gap', 'flexgrid', ['0', '1rem']),
  p('order', 'flexgrid', ['0', '1', '-1']),
  p('grid-template-columns', 'flexgrid', ['1fr 1fr', 'repeat(3, 1fr)', 'auto', 'minmax(0, 1fr)']),
  p('grid-template-rows', 'flexgrid', ['auto', '1fr', 'repeat(2, 100px)']),
  p('grid-template-areas', 'flexgrid', ['"header header" "side main"']),
  p('grid-column', 'flexgrid', ['auto', 'span 2', '1 / 3']),
  p('grid-row', 'flexgrid', ['auto', 'span 2', '1 / 3']),
  p('grid-auto-flow', 'flexgrid', ['row', 'column', 'dense']),
  p('grid-auto-rows', 'flexgrid', ['auto', 'minmax(100px, auto)']),
  p('place-items', 'flexgrid', ['center', 'start', 'stretch'], false, ['align-items', 'justify-items']),
  p('place-content', 'flexgrid', ['center', 'space-between'], false, ['align-content', 'justify-content']),
  p('justify-items', 'flexgrid', ['stretch', 'center', 'start']),

  p('grid-area', 'flexgrid', ['auto', 'header', '1 / 1 / 2 / 2']),
  p('justify-self', 'flexgrid', ['auto', 'start', 'center', 'end', 'stretch']),
  p('place-self', 'flexgrid', ['auto', 'center', 'start end'], false, ['align-self', 'justify-self']),
  p('grid-auto-columns', 'flexgrid', ['auto', 'min-content', 'max-content', '1fr']),

  /* ───────── 상자 ───────── */
  p('width', 'box', ['auto', '100%', '320px', 'fit-content']),
  p('height', 'box', ['auto', '100%', '100vh']),
  p('min-width', 'box', ['0', 'auto', '320px']),
  p('max-width', 'box', ['none', '100%', '640px']),
  p('min-height', 'box', ['0', '100vh']),
  p('max-height', 'box', ['none', '100%']),
  p('margin', 'box', ['0', 'auto', '1rem', '0 auto'], false, ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']),
  p('margin-top', 'box', ['0', '1rem', 'auto']),
  p('margin-right', 'box', ['0', 'auto']),
  p('margin-bottom', 'box', ['0', '1rem']),
  p('margin-left', 'box', ['0', 'auto']),
  p('padding', 'box', ['0', '1rem', '8px 16px'], false, ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']),
  p('padding-top', 'box', ['0', '1rem']),
  p('padding-right', 'box', ['0', '1rem']),
  p('padding-bottom', 'box', ['0', '1rem']),
  p('padding-left', 'box', ['0', '1rem']),

  p('inline-size', 'box', ['auto', '100%', '300px']),
  p('block-size', 'box', ['auto', '100%', '200px']),
  p('margin-inline', 'box', ['auto', '0', '1rem']),
  p('padding-block', 'box', ['0', '1rem', '8px 16px']),

  /* ───────── 글자 ───────── */
  p('font-size', 'text', ['16px', '1rem', 'clamp(1rem, 2vw, 1.5rem)'], true),
  p('font-family', 'text', ['sans-serif', 'serif', 'monospace', 'system-ui'], true),
  p('font-weight', 'text', ['400', '700', 'bold', 'normal'], true),
  p('font-style', 'text', ['normal', 'italic', 'oblique'], true),
  p('font', 'text', ['1rem/1.5 sans-serif'], true, ['font-style', 'font-weight', 'font-size', 'line-height', 'font-family']),
  p('line-height', 'text', ['1.5', 'normal', '24px'], true),
  p('letter-spacing', 'text', ['normal', '0.02em', '-0.5px'], true),
  p('word-spacing', 'text', ['normal', '0.1em'], true),
  p('text-align', 'text', ['left', 'center', 'right', 'justify'], true),
  p('text-decoration', 'text', ['none', 'underline', 'line-through'], false, ['text-decoration-line', 'text-decoration-color', 'text-decoration-style']),
  p('text-decoration-line', 'text', ['none', 'underline', 'line-through', 'overline']),
  p('text-decoration-color', 'text', ['currentColor', '#0ea5e9']),
  p('text-decoration-style', 'text', ['solid', 'wavy', 'dotted', 'dashed']),
  p('text-transform', 'text', ['none', 'uppercase', 'lowercase', 'capitalize'], true),
  p('text-indent', 'text', ['0', '2em'], true),
  p('text-overflow', 'text', ['clip', 'ellipsis']),
  p('text-shadow', 'text', ['none', '0 1px 2px rgba(0,0,0,.3)'], true),
  p('white-space', 'text', ['normal', 'nowrap', 'pre', 'pre-wrap'], true),
  p('word-break', 'text', ['normal', 'break-all', 'keep-all'], true),
  p('overflow-wrap', 'text', ['normal', 'break-word', 'anywhere'], true),
  p('writing-mode', 'text', ['horizontal-tb', 'vertical-rl'], true),
  p('vertical-align', 'text', ['baseline', 'middle', 'top', 'bottom']),
  p('font-variant-numeric', 'text', ['normal', 'tabular-nums'], true),
  p('hyphens', 'text', ['none', 'auto', 'manual'], true),
  p('text-wrap', 'text', ['wrap', 'balance', 'pretty'], true),

  p('direction', 'text', ['ltr', 'rtl'], true),
  p('tab-size', 'text', ['8', '4', '2'], true),
  p('text-align-last', 'text', ['auto', 'left', 'center', 'right', 'justify'], true),
  p('text-underline-offset', 'text', ['auto', '2px', '0.1em'], true),
  p('font-stretch', 'text', ['normal', 'condensed', 'expanded', '75%'], true),

  /* ───────── 색과 배경 ───────── */
  p('color', 'color', ['#111', 'currentColor', 'rgb(0 0 0 / 50%)'], true),
  p('background-color', 'color', ['transparent', '#fff', 'rgb(0 0 0 / 10%)']),
  p('background-image', 'color', ['none', 'url(bg.png)', 'linear-gradient(to right, #fff, #000)']),
  p('background-size', 'color', ['auto', 'cover', 'contain', '100% 100%']),
  p('background-position', 'color', ['center', 'top left', '50% 50%']),
  p('background-repeat', 'color', ['repeat', 'no-repeat', 'repeat-x']),
  p('background-attachment', 'color', ['scroll', 'fixed', 'local']),
  p('background', 'color', ['none', '#fff url(bg.png) center/cover no-repeat'], false, ['background-color', 'background-image', 'background-position', 'background-size', 'background-repeat']),
  p('background-clip', 'color', ['border-box', 'padding-box', 'text']),
  p('opacity', 'color', ['1', '0', '0.5']),
  p('mix-blend-mode', 'color', ['normal', 'multiply', 'screen', 'overlay']),
  p('accent-color', 'color', ['auto', '#0ea5e9'], true),
  p('color-scheme', 'color', ['normal', 'light', 'dark', 'light dark'], true),

  p('background-origin', 'color', ['padding-box', 'border-box', 'content-box']),
  p('background-blend-mode', 'color', ['normal', 'multiply', 'screen', 'overlay']),

  /* ───────── 테두리 ───────── */
  p('border', 'border', ['none', '1px solid #ddd'], false, ['border-width', 'border-style', 'border-color']),
  p('border-width', 'border', ['0', '1px', 'thin']),
  p('border-style', 'border', ['none', 'solid', 'dashed', 'dotted']),
  p('border-color', 'border', ['currentColor', '#ddd']),
  p('border-top', 'border', ['none', '1px solid #ddd']),
  p('border-bottom', 'border', ['none', '1px solid #ddd']),
  p('border-radius', 'border', ['0', '8px', '50%', '9999px']),
  p('outline', 'border', ['none', '2px solid #0ea5e9'], false, ['outline-width', 'outline-style', 'outline-color']),
  p('outline-width', 'border', ['medium', '1px', '2px']),
  p('outline-style', 'border', ['none', 'solid', 'dashed', 'auto']),
  p('outline-color', 'border', ['currentColor', 'invert', '#0ea5e9']),
  p('outline-offset', 'border', ['0', '2px']),
  p('box-shadow', 'border', ['none', '0 1px 3px rgba(0,0,0,.2)', 'inset 0 0 0 1px #ddd']),

  p('border-left', 'border', ['1px solid #000', 'none']),
  p('border-right', 'border', ['1px solid #000', 'none']),
  p('border-image', 'border', ['none', 'url(frame.png) 30 round']),

  /* ───────── 효과 ───────── */
  p('filter', 'effect', ['none', 'blur(4px)', 'grayscale(1)', 'brightness(1.2)']),
  p('backdrop-filter', 'effect', ['none', 'blur(8px)', 'saturate(1.5)']),
  p('clip-path', 'effect', ['none', 'circle(50%)', 'inset(0 0 0 0)']),
  p('mask-image', 'effect', ['none', 'linear-gradient(black, transparent)']),
  p('object-fit', 'effect', ['fill', 'cover', 'contain', 'none', 'scale-down']),
  p('object-position', 'effect', ['center', 'top', '50% 50%']),
  p('image-rendering', 'effect', ['auto', 'pixelated', 'crisp-edges']),

  p('backface-visibility', 'effect', ['visible', 'hidden']),
  p('mask', 'effect', ['none', 'url(shape.svg)']),

  /* ───────── 변형과 움직임 ───────── */
  p('transform', 'transform', ['none', 'translateX(10px)', 'rotate(45deg)', 'scale(1.05)']),
  p('transform-origin', 'transform', ['center', 'top left', '50% 50%']),
  p('transition', 'transform', ['none', 'all .2s ease', 'opacity .3s'], false, ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay']),
  p('transition-property', 'transform', ['all', 'none', 'opacity', 'transform']),
  p('transition-delay', 'transform', ['0s', '.1s']),
  p('transition-duration', 'transform', ['0s', '.2s', '300ms']),
  p('transition-timing-function', 'transform', ['ease', 'linear', 'cubic-bezier(.4,0,.2,1)']),
  p('animation', 'transform', ['none', 'spin 1s linear infinite'], false, ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-iteration-count']),
  p('animation-name', 'transform', ['none', 'spin', 'fade-in']),
  p('animation-timing-function', 'transform', ['ease', 'linear', 'steps(4, end)']),
  p('animation-duration', 'transform', ['0s', '1s']),
  p('animation-iteration-count', 'transform', ['1', 'infinite']),
  p('will-change', 'transform', ['auto', 'transform', 'opacity']),
  p('perspective', 'transform', ['none', '800px']),

  p('rotate', 'transform', ['none', '45deg', 'x 30deg']),
  p('scale', 'transform', ['none', '1.5', '2 0.5']),
  p('translate', 'transform', ['none', '10px', '50% 20px']),
  p('animation-delay', 'transform', ['0s', '1s', '-500ms']),
  p('animation-direction', 'transform', ['normal', 'reverse', 'alternate']),
  p('animation-fill-mode', 'transform', ['none', 'forwards', 'backwards', 'both']),

  /* ───────── 위치 ───────── */
  p('position', 'position', ['static', 'relative', 'absolute', 'fixed', 'sticky']),
  p('top', 'position', ['auto', '0', '50%']),
  p('right', 'position', ['auto', '0']),
  p('bottom', 'position', ['auto', '0']),
  p('left', 'position', ['auto', '0', '50%']),
  p('inset', 'position', ['auto', '0'], false, ['top', 'right', 'bottom', 'left']),
  p('z-index', 'position', ['auto', '0', '10', '-1']),

  p('inset-inline', 'position', ['auto', '0', '10px 20px']),
  p('inset-block', 'position', ['auto', '0', '10px 20px']),

  /* ───────── 표·목록 ───────── */
  p('border-collapse', 'table', ['separate', 'collapse'], true),
  p('border-spacing', 'table', ['0', '2px'], true),
  p('table-layout', 'table', ['auto', 'fixed']),
  p('caption-side', 'table', ['top', 'bottom'], true),
  p('list-style', 'list', ['none', 'disc', 'decimal inside'], true, ['list-style-type', 'list-style-position', 'list-style-image']),
  p('list-style-type', 'list', ['disc', 'decimal', 'none', 'circle'], true),
  p('list-style-image', 'list', ['none', 'url(dot.svg)'], true),
  p('list-style-position', 'list', ['outside', 'inside'], true),

  p('empty-cells', 'table', ['show', 'hide'], true),
  p('counter-set', 'list', ['none', 'section 0']),

  /* ───────── 조작 ───────── */
  p('cursor', 'interaction', ['auto', 'pointer', 'not-allowed', 'grab'], true),
  p('pointer-events', 'interaction', ['auto', 'none']),
  p('user-select', 'interaction', ['auto', 'none', 'text']),
  p('touch-action', 'interaction', ['auto', 'none', 'manipulation']),
  p('scroll-behavior', 'interaction', ['auto', 'smooth']),
  p('scroll-snap-type', 'interaction', ['none', 'x mandatory', 'y proximity']),
  p('overscroll-behavior', 'interaction', ['auto', 'contain', 'none']),
  p('resize', 'interaction', ['none', 'both', 'vertical']),
  p('caret-color', 'interaction', ['auto', 'transparent', '#0ea5e9'], true),

  p('appearance', 'interaction', ['none', 'auto']),
  p('scroll-snap-align', 'interaction', ['none', 'start', 'center', 'end']),

  /* ───────── 인쇄와 기타 ───────── */
  p('page-break-after', 'print', ['auto', 'always', 'avoid']),
  p('break-inside', 'print', ['auto', 'avoid']),
  p('content', 'print', ['none', '""', 'attr(data-label)']),
  p('counter-reset', 'print', ['none', 'section 0']),
  p('counter-increment', 'print', ['none', 'section']),
  p('quotes', 'print', ['auto', 'none'], true),
  p('all', 'print', ['initial', 'unset', 'revert']),
  p('break-after', 'print', ['auto', 'avoid', 'page', 'column']),
  p('orphans', 'print', ['2', '3'], true),
  p('widows', 'print', ['2', '3'], true),
];

export const PROP_KINDS: PropKind[] = [
  'layout', 'flexgrid', 'box', 'text', 'color', 'border',
  'effect', 'transform', 'position', 'table', 'list', 'interaction', 'print',
];

export const CSS_PROP_NAMES = CSS_PROPS.map(x => x.name);

export const cssPropOf = (slug: string): CssProp | undefined => CSS_PROPS.find(x => x.name === slug);

export const propsOfKind = (kind: PropKind): CssProp[] => CSS_PROPS.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 팔레트 아이콘으로 그려진다 */
export const CSS_ICON = '🎨';
