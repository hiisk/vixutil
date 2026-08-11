/**
 * 크롬·피그마·포토샵 단축키 145가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Shift+R은 어느
 * 나라에서든 Ctrl+Shift+R이고 V는 V다. 그래서 여기에는 옮길 것이 없는 것만 둔다 —
 * 열 언어로 쓸 한 문장은 desc-design.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 만든 곳이 지금 문서로 밝혀 둔 기본값만 싣는다. 확인하지 못한 조합은 적지 않았다.
 * 틀린 키 한 줄이 빠진 키 열 줄보다 나쁘다. 그래서 뺀 것을 남겨 둔다.
 *
 *   포토샵 blur·sharpen·smudge — 도구 상자에서 유일하게 기본 글자가 없는 묶음이다.
 *   포토샵 layer mask, flatten image — 메뉴에만 있고 기본 키가 없다. 대신 사람이
 *     같은 자리에서 쓰는 stamp visible(Ctrl+Shift+Alt+E)을 실었다.
 *   피그마 swap instance, constraints — 기본 키가 문서에 없다.
 *   피그마 distribute spacing — 자료마다 Alt+Shift+H와 Ctrl+Alt+H로 갈려 뺐다.
 *   크롬 focus next pane(F6) — 윈도우 쪽은 있으나 맥 쪽을 확인하지 못해 뺐다.
 *
 * 맥에 기본 키가 아예 없는 자리는 mac을 'None'으로 둔다 — 크롬 작업 관리자가
 * 그렇다. 같은 키를 쓰는 자리는 win과 mac에 같은 값을 적는다.
 *
 * ── 갈래 ────────────────────────────────────────────
 * 갈래는 앱 안에서만 뜻이 있다. 낱장이 같은 갈래의 이웃을 보여 주므로, 앱마다
 * 쓰던 이름을 그대로 다시 쓴다 — 크롬은 Tabs·Window·Navigation·Page·Find·
 * Bookmarks·History·View·DevTools, 피그마는 Tools·Zoom·View·Components·Layout·
 * Arrange·Path·Edit, 포토샵은 Tools·Edit·Select·Layers·Paint·Adjust·View·Export.
 */
import type { ScItem, ScApp } from './types.ts';

/** 앱마다 하나씩 — slug와 see에 앱 이름을 앞에 붙여 준다 */
const mk = (app: ScApp) => (
  slug: string,
  action: string,
  win: string,
  mac: string,
  group: string,
  see?: string[],
): ScItem => ({
  slug: `${app}-${slug}`,
  app,
  action,
  win,
  mac,
  group,
  ...(see ? { see: see.map(s => `${app}-${s}`) } : {}),
});

const ch = mk('chrome');
const fg = mk('figma');
const ps = mk('photoshop');

export const SC_DESIGN: ScItem[] = [
  /* ═════════ chrome — 45가지 ═════════ */

  /* ───────── Tabs ───────── */
  ch('new-tab', 'New tab', 'Ctrl+T', 'Cmd+T', 'Tabs', ['close-tab', 'reopen-closed-tab', 'new-window']),
  ch('reopen-closed-tab', 'Reopen closed tab', 'Ctrl+Shift+T', 'Cmd+Shift+T', 'Tabs', ['close-tab', 'history']),
  ch('next-tab', 'Next tab', 'Ctrl+Tab', 'Cmd+Option+Right', 'Tabs', ['previous-tab', 'jump-to-tab-1']),
  ch('previous-tab', 'Previous tab', 'Ctrl+Shift+Tab', 'Cmd+Option+Left', 'Tabs', ['next-tab']),
  ch('jump-to-tab-1', 'Jump to tab 1', 'Ctrl+1', 'Cmd+1', 'Tabs', ['jump-to-last-tab', 'next-tab']),
  ch('jump-to-last-tab', 'Jump to last tab', 'Ctrl+9', 'Cmd+9', 'Tabs', ['jump-to-tab-1']),
  ch('close-tab', 'Close tab', 'Ctrl+W', 'Cmd+W', 'Tabs', ['reopen-closed-tab', 'close-window']),

  /* ───────── Window ───────── */
  ch('new-window', 'New window', 'Ctrl+N', 'Cmd+N', 'Window', ['new-tab', 'new-incognito-window']),
  ch('new-incognito-window', 'New incognito window', 'Ctrl+Shift+N', 'Cmd+Shift+N', 'Window', ['new-window', 'clear-browsing-data']),
  ch('close-window', 'Close window', 'Ctrl+Shift+W', 'Cmd+Shift+W', 'Window', ['close-tab', 'reopen-closed-tab']),
  ch('task-manager', 'Task manager', 'Shift+Esc', 'None', 'Window', ['devtools']),

  /* ───────── Navigation ───────── */
  ch('focus-address-bar', 'Focus address bar', 'Ctrl+L', 'Cmd+L', 'Navigation', ['search-the-web', 'find']),
  ch('search-the-web', 'Search from address bar', 'Ctrl+K', 'Cmd+Option+F', 'Navigation', ['focus-address-bar']),
  ch('back', 'Back', 'Alt+Left', 'Cmd+Left', 'Navigation', ['forward', 'home']),
  ch('forward', 'Forward', 'Alt+Right', 'Cmd+Right', 'Navigation', ['back']),
  ch('home', 'Open homepage', 'Alt+Home', 'Cmd+Shift+H', 'Navigation', ['back', 'new-tab']),
  ch('scroll-one-screen', 'Scroll one screen', 'Space', 'Space', 'Navigation', ['scroll-to-top', 'scroll-to-bottom']),
  ch('scroll-to-top', 'Jump to top', 'Home', 'Cmd+Up', 'Navigation', ['scroll-to-bottom', 'scroll-one-screen']),
  ch('scroll-to-bottom', 'Jump to bottom', 'End', 'Cmd+Down', 'Navigation', ['scroll-to-top']),
  ch('caret-browsing', 'Caret browsing', 'F7', 'F7', 'Navigation', ['find', 'focus-address-bar']),

  /* ───────── Page ───────── */
  ch('reload', 'Reload', 'Ctrl+R', 'Cmd+R', 'Page', ['hard-reload']),
  ch('hard-reload', 'Hard reload', 'Ctrl+Shift+R', 'Cmd+Shift+R', 'Page', ['reload', 'devtools', 'clear-browsing-data']),
  ch('print', 'Print', 'Ctrl+P', 'Cmd+P', 'Page', ['save-page']),
  ch('save-page', 'Save page', 'Ctrl+S', 'Cmd+S', 'Page', ['print', 'open-file', 'view-source']),
  ch('open-file', 'Open file', 'Ctrl+O', 'Cmd+O', 'Page', ['save-page']),
  ch('view-source', 'View source', 'Ctrl+U', 'Cmd+Option+U', 'Page', ['devtools', 'devtools-inspect-element']),

  /* ───────── Find ───────── */
  ch('find', 'Find in page', 'Ctrl+F', 'Cmd+F', 'Find', ['find-next', 'find-previous', 'devtools-search-files']),
  ch('find-next', 'Find next', 'Ctrl+G', 'Cmd+G', 'Find', ['find', 'find-previous']),
  ch('find-previous', 'Find previous', 'Ctrl+Shift+G', 'Cmd+Shift+G', 'Find', ['find', 'find-next']),

  /* ───────── Bookmarks ───────── */
  ch('bookmark-page', 'Bookmark page', 'Ctrl+D', 'Cmd+D', 'Bookmarks', ['bookmark-manager', 'bookmarks-bar']),
  ch('bookmarks-bar', 'Show bookmarks bar', 'Ctrl+Shift+B', 'Cmd+Shift+B', 'Bookmarks', ['bookmark-page', 'bookmark-manager']),
  ch('bookmark-manager', 'Bookmark manager', 'Ctrl+Shift+O', 'Cmd+Option+B', 'Bookmarks', ['bookmark-page', 'bookmarks-bar']),

  /* ───────── History ───────── */
  ch('history', 'History', 'Ctrl+H', 'Cmd+Y', 'History', ['reopen-closed-tab', 'clear-browsing-data']),
  ch('downloads', 'Downloads', 'Ctrl+J', 'Cmd+Shift+J', 'History', ['history', 'save-page']),
  ch('clear-browsing-data', 'Clear browsing data', 'Ctrl+Shift+Delete', 'Cmd+Shift+Delete', 'History', ['history', 'hard-reload']),

  /* ───────── View ───────── */
  ch('zoom-in', 'Zoom in', 'Ctrl+Plus', 'Cmd+Plus', 'View', ['zoom-out', 'zoom-reset']),
  ch('zoom-out', 'Zoom out', 'Ctrl+Minus', 'Cmd+Minus', 'View', ['zoom-in', 'zoom-reset']),
  ch('zoom-reset', 'Reset zoom', 'Ctrl+0', 'Cmd+0', 'View', ['zoom-in', 'zoom-out']),
  ch('full-screen', 'Full screen', 'F11', 'Ctrl+Cmd+F', 'View', ['zoom-reset']),

  /* ───────── DevTools ───────── */
  ch('devtools', 'Open DevTools', 'F12', 'Cmd+Option+I', 'DevTools', ['devtools-console', 'devtools-inspect-element', 'view-source']),
  ch('devtools-console', 'Open Console', 'Ctrl+Shift+J', 'Cmd+Option+J', 'DevTools', ['devtools', 'devtools-command-menu']),
  ch('devtools-inspect-element', 'Inspect element', 'Ctrl+Shift+C', 'Cmd+Option+C', 'DevTools', ['devtools', 'view-source']),
  ch('devtools-command-menu', 'Command menu', 'Ctrl+Shift+P', 'Cmd+Shift+P', 'DevTools', ['devtools', 'devtools-console']),
  ch('devtools-device-toolbar', 'Device toolbar', 'Ctrl+Shift+M', 'Cmd+Shift+M', 'DevTools', ['devtools', 'devtools-inspect-element']),
  ch('devtools-search-files', 'Search across files', 'Ctrl+Shift+F', 'Cmd+Option+F', 'DevTools', ['devtools', 'find', 'search-the-web']),

  /* ═════════ figma — 52가지 ═════════ */

  /* ───────── Tools — 글자 하나가 도구 하나다 ───────── */
  fg('move-tool', 'Move tool', 'V', 'V', 'Tools', ['scale-tool', 'hand-tool', 'frame-tool']),
  fg('frame-tool', 'Frame tool', 'F', 'F', 'Tools', ['move-tool', 'frame-selection', 'slice-tool']),
  fg('rectangle-tool', 'Rectangle tool', 'R', 'R', 'Tools', ['ellipse-tool', 'line-tool']),
  fg('ellipse-tool', 'Ellipse tool', 'O', 'O', 'Tools', ['rectangle-tool', 'line-tool']),
  fg('line-tool', 'Line tool', 'L', 'L', 'Tools', ['arrow-tool', 'pen-tool']),
  fg('arrow-tool', 'Arrow tool', 'Shift+L', 'Shift+L', 'Tools', ['line-tool']),
  fg('pen-tool', 'Pen tool', 'P', 'P', 'Tools', ['pencil-tool', 'outline-stroke', 'flatten']),
  fg('pencil-tool', 'Pencil tool', 'Shift+P', 'Shift+P', 'Tools', ['pen-tool']),
  fg('text-tool', 'Text tool', 'T', 'T', 'Tools', ['move-tool', 'comment-tool']),
  fg('comment-tool', 'Comment tool', 'C', 'C', 'Tools', ['multiplayer-cursors', 'move-tool']),
  fg('slice-tool', 'Slice tool', 'S', 'S', 'Tools', ['frame-tool']),
  fg('scale-tool', 'Scale tool', 'K', 'K', 'Tools', ['move-tool']),
  fg('hand-tool', 'Hand tool', 'H', 'H', 'Tools', ['move-tool', 'zoom-to-fit']),

  /* ───────── Zoom ───────── */
  fg('zoom-to-fit', 'Zoom to fit', 'Shift+1', 'Shift+1', 'Zoom', ['zoom-to-selection', 'zoom-to-100']),
  fg('zoom-to-selection', 'Zoom to selection', 'Shift+2', 'Shift+2', 'Zoom', ['zoom-to-fit', 'zoom-to-100']),
  fg('zoom-to-100', 'Zoom to 100%', 'Shift+0', 'Shift+0', 'Zoom', ['zoom-to-fit', 'pixel-grid']),

  /* ───────── View — 맥과 윈도우가 가장 많이 갈리는 자리 ───────── */
  fg('pixel-grid', 'Pixel grid', "Ctrl+'", "Cmd+'", 'View', ['zoom-to-100', 'layout-grids', 'pixel-preview']),
  fg('layout-grids', 'Layout grids', 'Ctrl+Shift+4', 'Ctrl+G', 'View', ['pixel-grid', 'rulers', 'group']),
  fg('rulers', 'Rulers', 'Shift+R', 'Shift+R', 'View', ['layout-grids', 'pixel-grid']),
  fg('outlines', 'Outline mode', 'Ctrl+Shift+O', 'Cmd+Shift+O', 'View', ['outline-stroke', 'toggle-ui']),
  fg('pixel-preview', 'Pixel preview', 'Ctrl+Alt+P', 'Ctrl+P', 'View', ['pixel-grid', 'zoom-to-100']),
  fg('multiplayer-cursors', 'Multiplayer cursors', 'Ctrl+Alt+\\', 'Option+Cmd+\\', 'View', ['toggle-ui', 'comment-tool']),
  fg('toggle-ui', 'Show or hide UI', 'Ctrl+\\', 'Cmd+\\', 'View', ['multiplayer-cursors', 'outlines']),

  /* ───────── Components ───────── */
  fg('create-component', 'Create component', 'Ctrl+Alt+K', 'Cmd+Option+K', 'Components', ['detach-instance', 'group']),
  fg('detach-instance', 'Detach instance', 'Ctrl+Alt+B', 'Cmd+Option+B', 'Components', ['create-component']),

  /* ───────── Layout ───────── */
  fg('add-auto-layout', 'Add auto layout', 'Shift+A', 'Shift+A', 'Layout', ['remove-auto-layout', 'frame-selection', 'tidy-up']),
  fg('remove-auto-layout', 'Remove auto layout', 'Alt+Shift+A', 'Option+Shift+A', 'Layout', ['add-auto-layout']),
  fg('tidy-up', 'Tidy up', 'Ctrl+Alt+T', 'Ctrl+Option+T', 'Layout', ['add-auto-layout', 'align-left']),

  /* ───────── Arrange ───────── */
  fg('group', 'Group selection', 'Ctrl+G', 'Cmd+G', 'Arrange', ['ungroup', 'frame-selection', 'layout-grids']),
  fg('ungroup', 'Ungroup', 'Ctrl+Shift+G', 'Cmd+Shift+G', 'Arrange', ['group']),
  fg('frame-selection', 'Frame selection', 'Ctrl+Alt+G', 'Cmd+Option+G', 'Arrange', ['group', 'frame-tool']),
  fg('bring-to-front', 'Bring to front', ']', ']', 'Arrange', ['send-to-back', 'bring-forward']),
  fg('send-to-back', 'Send to back', '[', '[', 'Arrange', ['bring-to-front', 'send-backward']),
  fg('bring-forward', 'Bring forward', 'Ctrl+]', 'Cmd+]', 'Arrange', ['bring-to-front', 'send-backward']),
  fg('send-backward', 'Send backward', 'Ctrl+[', 'Cmd+[', 'Arrange', ['send-to-back', 'bring-forward']),
  fg('align-left', 'Align left', 'Alt+A', 'Option+A', 'Arrange', ['align-right', 'align-horizontal-centers']),
  fg('align-horizontal-centers', 'Align horizontal centers', 'Alt+H', 'Option+H', 'Arrange', ['align-left', 'align-right']),
  fg('align-right', 'Align right', 'Alt+D', 'Option+D', 'Arrange', ['align-left', 'align-horizontal-centers']),
  fg('align-top', 'Align top', 'Alt+W', 'Option+W', 'Arrange', ['align-bottom', 'align-vertical-centers']),
  fg('align-vertical-centers', 'Align vertical centers', 'Alt+V', 'Option+V', 'Arrange', ['align-top', 'align-bottom']),
  fg('align-bottom', 'Align bottom', 'Alt+S', 'Option+S', 'Arrange', ['align-top', 'align-vertical-centers']),

  /* ───────── Path ───────── */
  fg('union', 'Union selection', 'Alt+Shift+U', 'Option+Shift+U', 'Path', ['subtract', 'intersect', 'exclude']),
  fg('subtract', 'Subtract selection', 'Alt+Shift+S', 'Option+Shift+S', 'Path', ['union', 'use-as-mask']),
  fg('intersect', 'Intersect selection', 'Alt+Shift+I', 'Option+Shift+I', 'Path', ['union', 'exclude']),
  fg('exclude', 'Exclude selection', 'Alt+Shift+E', 'Option+Shift+E', 'Path', ['union', 'intersect']),
  fg('flatten', 'Flatten selection', 'Ctrl+E', 'Cmd+E', 'Path', ['union', 'outline-stroke']),
  fg('outline-stroke', 'Outline stroke', 'Ctrl+Alt+O', 'Cmd+Option+O', 'Path', ['outlines', 'flatten', 'pen-tool']),
  fg('use-as-mask', 'Use as mask', 'Ctrl+Alt+M', 'Ctrl+Cmd+M', 'Path', ['group', 'subtract']),

  /* ───────── Edit ───────── */
  fg('duplicate', 'Duplicate', 'Ctrl+D', 'Cmd+D', 'Edit', ['copy-properties', 'paste-properties']),
  fg('copy-properties', 'Copy properties', 'Ctrl+Alt+C', 'Cmd+Option+C', 'Edit', ['paste-properties', 'duplicate']),
  fg('paste-properties', 'Paste properties', 'Ctrl+Alt+V', 'Cmd+Option+V', 'Edit', ['copy-properties']),
  fg('place-image', 'Place image', 'Ctrl+Shift+K', 'Cmd+Shift+K', 'Edit', ['create-component', 'frame-tool']),
  fg('actions-menu', 'Actions menu', 'Ctrl+K', 'Cmd+K', 'Edit', ['toggle-ui', 'duplicate']),

  /* ═════════ photoshop — 48가지 ═════════ */

  /* ───────── Tools — 도구 하나에 글자 하나, 맥도 같다 ───────── */
  ps('move-tool', 'Move tool', 'V', 'V', 'Tools', ['marquee-tool', 'path-selection-tool', 'free-transform']),
  ps('marquee-tool', 'Marquee tool', 'M', 'M', 'Tools', ['lasso-tool', 'quick-selection-tool', 'select-all']),
  ps('lasso-tool', 'Lasso tool', 'L', 'L', 'Tools', ['marquee-tool', 'quick-selection-tool']),
  ps('quick-selection-tool', 'Quick selection tool', 'W', 'W', 'Tools', ['lasso-tool', 'inverse-selection']),
  ps('crop-tool', 'Crop tool', 'C', 'C', 'Tools', ['move-tool', 'fit-on-screen']),
  ps('eyedropper-tool', 'Eyedropper tool', 'I', 'I', 'Tools', ['brush-tool', 'fill-with-foreground']),
  ps('brush-tool', 'Brush tool', 'B', 'B', 'Tools', ['eraser-tool', 'increase-brush-size', 'tool-opacity']),
  ps('clone-stamp-tool', 'Clone stamp tool', 'S', 'S', 'Tools', ['brush-tool', 'eraser-tool']),
  ps('eraser-tool', 'Eraser tool', 'E', 'E', 'Tools', ['brush-tool', 'decrease-brush-size']),
  ps('gradient-tool', 'Gradient tool', 'G', 'G', 'Tools', ['fill-with-foreground', 'brush-tool']),
  ps('dodge-tool', 'Dodge tool', 'O', 'O', 'Tools', ['brush-tool', 'levels']),
  ps('type-tool', 'Type tool', 'T', 'T', 'Tools', ['move-tool', 'free-transform']),
  ps('pen-tool', 'Pen tool', 'P', 'P', 'Tools', ['path-selection-tool', 'shape-tool']),
  ps('path-selection-tool', 'Path selection tool', 'A', 'A', 'Tools', ['pen-tool', 'move-tool']),
  ps('shape-tool', 'Shape tool', 'U', 'U', 'Tools', ['pen-tool', 'path-selection-tool']),
  ps('hand-tool', 'Hand tool', 'H', 'H', 'Tools', ['zoom-tool', 'fit-on-screen']),
  ps('zoom-tool', 'Zoom tool', 'Z', 'Z', 'Tools', ['hand-tool', 'actual-pixels', 'fit-on-screen']),

  /* ───────── Edit ───────── */
  ps('free-transform', 'Free transform', 'Ctrl+T', 'Cmd+T', 'Edit', ['transform-again', 'move-tool']),
  ps('transform-again', 'Transform again', 'Ctrl+Shift+T', 'Cmd+Shift+T', 'Edit', ['free-transform']),
  ps('undo', 'Undo', 'Ctrl+Z', 'Cmd+Z', 'Edit', ['step-backward']),
  ps('step-backward', 'Step backward', 'Ctrl+Alt+Z', 'Cmd+Option+Z', 'Edit', ['undo']),

  /* ───────── Select ───────── */
  ps('select-all', 'Select all', 'Ctrl+A', 'Cmd+A', 'Select', ['deselect', 'inverse-selection']),
  ps('deselect', 'Deselect', 'Ctrl+D', 'Cmd+D', 'Select', ['reselect', 'select-all']),
  ps('reselect', 'Reselect', 'Ctrl+Shift+D', 'Cmd+Shift+D', 'Select', ['deselect']),
  ps('inverse-selection', 'Inverse selection', 'Ctrl+Shift+I', 'Cmd+Shift+I', 'Select', ['select-all', 'quick-selection-tool']),
  ps('feather-selection', 'Feather selection', 'Shift+F6', 'Shift+F6', 'Select', ['lasso-tool', 'inverse-selection']),

  /* ───────── Layers ───────── */
  ps('new-layer', 'New layer', 'Ctrl+Shift+N', 'Cmd+Shift+N', 'Layers', ['layer-via-copy', 'group-layers']),
  ps('layer-via-copy', 'Layer via copy', 'Ctrl+J', 'Cmd+J', 'Layers', ['new-layer', 'stamp-visible']),
  ps('merge-down', 'Merge down', 'Ctrl+E', 'Cmd+E', 'Layers', ['merge-visible', 'stamp-visible']),
  ps('merge-visible', 'Merge visible', 'Ctrl+Shift+E', 'Cmd+Shift+E', 'Layers', ['merge-down', 'stamp-visible']),
  ps('stamp-visible', 'Stamp visible', 'Ctrl+Shift+Alt+E', 'Cmd+Shift+Option+E', 'Layers', ['merge-visible', 'layer-via-copy']),
  ps('group-layers', 'Group layers', 'Ctrl+G', 'Cmd+G', 'Layers', ['clipping-mask', 'new-layer']),
  ps('clipping-mask', 'Create clipping mask', 'Ctrl+Alt+G', 'Cmd+Option+G', 'Layers', ['group-layers', 'layer-via-copy']),

  /* ───────── Paint ───────── */
  ps('fill-with-foreground', 'Fill with foreground color', 'Alt+Backspace', 'Option+Delete', 'Paint', ['fill-with-background', 'eyedropper-tool']),
  ps('fill-with-background', 'Fill with background color', 'Ctrl+Backspace', 'Cmd+Delete', 'Paint', ['fill-with-foreground']),
  ps('decrease-brush-size', 'Decrease brush size', '[', '[', 'Paint', ['increase-brush-size', 'brush-hardness']),
  ps('increase-brush-size', 'Increase brush size', ']', ']', 'Paint', ['decrease-brush-size', 'brush-hardness']),
  ps('brush-hardness', 'Soften brush edge', 'Shift+[', 'Shift+[', 'Paint', ['increase-brush-size', 'brush-tool']),
  ps('tool-opacity', 'Set tool opacity', '1', '1', 'Paint', ['brush-tool', 'fill-with-foreground']),

  /* ───────── Adjust ───────── */
  ps('levels', 'Levels', 'Ctrl+L', 'Cmd+L', 'Adjust', ['curves', 'invert']),
  ps('curves', 'Curves', 'Ctrl+M', 'Cmd+M', 'Adjust', ['levels', 'hue-saturation']),
  ps('hue-saturation', 'Hue/Saturation', 'Ctrl+U', 'Cmd+U', 'Adjust', ['desaturate', 'curves']),
  ps('desaturate', 'Desaturate', 'Ctrl+Shift+U', 'Cmd+Shift+U', 'Adjust', ['hue-saturation']),
  ps('invert', 'Invert', 'Ctrl+I', 'Cmd+I', 'Adjust', ['levels', 'inverse-selection']),

  /* ───────── View ───────── */
  ps('actual-pixels', 'Actual pixels', 'Ctrl+1', 'Cmd+1', 'View', ['fit-on-screen', 'zoom-tool']),
  ps('fit-on-screen', 'Fit on screen', 'Ctrl+0', 'Cmd+0', 'View', ['actual-pixels', 'hand-tool']),
  ps('hide-extras', 'Hide extras', 'Ctrl+H', 'Cmd+H', 'View', ['deselect', 'fit-on-screen']),

  /* ───────── Export ───────── */
  ps('export-as', 'Export As', 'Ctrl+Shift+Alt+W', 'Cmd+Shift+Option+W', 'Export', ['stamp-visible', 'actual-pixels']),
];
