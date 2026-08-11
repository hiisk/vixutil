/**
 * 일러스트레이터·프리미어 프로 단축키 89가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Shift+O는 어느
 * 나라에서든 Ctrl+Shift+O이고 V는 V다. 그래서 여기에는 옮길 것이 없는 것만 둔다 —
 * 열 언어로 쓸 한 문장은 desc-adobe.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 만든 곳이 기본값으로 밝혀 둔 조합만 싣는다. 확인하지 못한 조합은 적지 않았다.
 * 틀린 키 한 줄이 빠진 키 열 줄보다 나쁘다. 그래서 뺀 것을 남겨 둔다.
 *
 *   일러스트레이터 Expand·Expand Appearance — 메뉴에만 있고 기본 키가 없다.
 *     사람들이 손으로 붙여 쓰는 자리라 조합이 사람마다 다르다.
 *   일러스트레이터 Offset Path·Outline Stroke — 같은 까닭으로 기본 키가 없다.
 *   일러스트레이터 Recolor Artwork — 기본 키가 없다. 대신 사람이 같은 일을 하러
 *     들어가는 문인 Pathfinder 패널을 실었다.
 *   일러스트레이터 Pathfinder Unite — 패널의 단추에는 기본 키가 걸려 있지 않다.
 *     패널을 여닫는 조합만 싣는다.
 *   프리미어 Nest — 기본 키가 없다. 오른쪽 단추 메뉴에만 있다.
 *   프리미어 Render In to Out — 판마다 갈려 확인하지 못해 뺐다.
 *   프리미어 Toggle Track Targeting — 명령은 있으나 기본 조합이 걸려 있지 않다.
 *     트랙 지정에 딸린 함정은 add-edit 설명에 적어 두었다.
 *   프리미어 전체 화면 — ` 하나냐 Ctrl+` 냐가 자료마다 갈려, 확인이 되는
 *     maximize-frame(포인터가 놓인 칸을 키우는 것)만 실었다.
 *
 * 두 앱은 윈도우와 맥에 기본 조합이 모두 있다 — NA를 쓸 자리가 없었다.
 *
 * ── 갈래 ────────────────────────────────────────────
 * 갈래는 앱 안에서만 뜻이 있다. 낱장이 같은 갈래의 이웃을 보여 주므로 앱마다
 * 그 앱에서 쓰는 이름을 그대로 쓴다 — 일러스트레이터는 Tools·View·Object·
 * Arrange·Path·Type·Edit·Panels, 프리미어는 Playback·Navigation·Marking·
 * Editing·Trim·Tools·View·Panels·Export.
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

const ai = mk('illustrator');
const pr = mk('premiere');

export const SC_ADOBE: ScItem[] = [
  /* ═════════ illustrator — 46가지 ═════════ */

  /* ───────── Tools — 도구 하나에 글자 하나, 맥도 같다 ───────── */
  ai('selection-tool', 'Selection tool', 'V', 'V', 'Tools', ['direct-selection-tool', 'group', 'free-transform-tool']),
  ai('direct-selection-tool', 'Direct Selection tool', 'A', 'A', 'Tools', ['selection-tool', 'join', 'average']),
  ai('magic-wand-tool', 'Magic Wand tool', 'Y', 'Y', 'Tools', ['selection-tool', 'lasso-tool']),
  ai('lasso-tool', 'Lasso tool', 'Q', 'Q', 'Tools', ['direct-selection-tool', 'magic-wand-tool']),
  ai('pen-tool', 'Pen tool', 'P', 'P', 'Tools', ['curvature-tool', 'direct-selection-tool', 'join']),
  ai('curvature-tool', 'Curvature tool', 'Shift+`', 'Shift+`', 'Tools', ['pen-tool', 'direct-selection-tool']),
  ai('type-tool', 'Type tool', 'T', 'T', 'Tools', ['create-outlines', 'selection-tool']),
  ai('rectangle-tool', 'Rectangle tool', 'M', 'M', 'Tools', ['ellipse-tool', 'pathfinder-panel']),
  ai('ellipse-tool', 'Ellipse tool', 'L', 'L', 'Tools', ['rectangle-tool', 'pathfinder-panel']),
  ai('paintbrush-tool', 'Paintbrush tool', 'B', 'B', 'Tools', ['pen-tool', 'paste-in-back']),
  ai('rotate-tool', 'Rotate tool', 'R', 'R', 'Tools', ['scale-tool', 'transform-again']),
  ai('scale-tool', 'Scale tool', 'S', 'S', 'Tools', ['rotate-tool', 'free-transform-tool']),
  ai('free-transform-tool', 'Free Transform tool', 'E', 'E', 'Tools', ['scale-tool', 'rotate-tool']),
  ai('gradient-tool', 'Gradient tool', 'G', 'G', 'Tools', ['eyedropper-tool', 'selection-tool']),
  ai('eyedropper-tool', 'Eyedropper tool', 'I', 'I', 'Tools', ['gradient-tool', 'selection-tool']),
  ai('artboard-tool', 'Artboard tool', 'Shift+O', 'Shift+O', 'Tools', ['fit-artboard', 'fit-all-artboards', 'paste-in-place']),
  ai('zoom-tool', 'Zoom tool', 'Z', 'Z', 'Tools', ['hand-tool', 'fit-artboard']),
  ai('hand-tool', 'Hand tool', 'H', 'H', 'Tools', ['zoom-tool', 'fit-artboard']),

  /* ───────── View ───────── */
  ai('outline-mode', 'Outline mode', 'Ctrl+Y', 'Cmd+Y', 'View', ['hide-edges', 'smart-guides']),
  ai('smart-guides', 'Smart Guides', 'Ctrl+U', 'Cmd+U', 'View', ['snap-to-point', 'rulers']),
  ai('rulers', 'Rulers', 'Ctrl+R', 'Cmd+R', 'View', ['smart-guides', 'snap-to-point']),
  ai('snap-to-point', 'Snap to Point', 'Ctrl+Alt+"', 'Cmd+Option+"', 'View', ['smart-guides', 'average']),
  ai('hide-edges', 'Hide edges', 'Ctrl+H', 'Cmd+H', 'View', ['outline-mode', 'smart-guides']),
  ai('fit-artboard', 'Fit artboard in window', 'Ctrl+0', 'Cmd+0', 'View', ['fit-all-artboards', 'zoom-tool']),
  ai('fit-all-artboards', 'Fit all artboards in window', 'Ctrl+Alt+0', 'Cmd+Option+0', 'View', ['fit-artboard', 'artboard-tool']),

  /* ───────── Object ───────── */
  ai('group', 'Group', 'Ctrl+G', 'Cmd+G', 'Object', ['ungroup', 'clipping-mask', 'selection-tool']),
  ai('ungroup', 'Ungroup', 'Ctrl+Shift+G', 'Cmd+Shift+G', 'Object', ['group', 'clipping-mask']),
  ai('clipping-mask', 'Make clipping mask', 'Ctrl+7', 'Cmd+7', 'Object', ['release-clipping-mask', 'group']),
  ai('release-clipping-mask', 'Release clipping mask', 'Ctrl+Alt+7', 'Cmd+Option+7', 'Object', ['clipping-mask', 'ungroup']),
  ai('lock-selection', 'Lock selection', 'Ctrl+2', 'Cmd+2', 'Object', ['unlock-all', 'hide-selection']),
  ai('unlock-all', 'Unlock all', 'Ctrl+Alt+2', 'Cmd+Option+2', 'Object', ['lock-selection', 'show-all']),
  ai('hide-selection', 'Hide selection', 'Ctrl+3', 'Cmd+3', 'Object', ['show-all', 'lock-selection']),
  ai('show-all', 'Show all', 'Ctrl+Alt+3', 'Cmd+Option+3', 'Object', ['hide-selection', 'unlock-all']),
  ai('transform-again', 'Transform again', 'Ctrl+D', 'Cmd+D', 'Object', ['rotate-tool', 'scale-tool']),

  /* ───────── Arrange ───────── */
  ai('bring-to-front', 'Bring to front', 'Ctrl+Shift+]', 'Cmd+Shift+]', 'Arrange', ['send-to-back', 'bring-forward']),
  ai('bring-forward', 'Bring forward', 'Ctrl+]', 'Cmd+]', 'Arrange', ['bring-to-front', 'send-backward']),
  ai('send-backward', 'Send backward', 'Ctrl+[', 'Cmd+[', 'Arrange', ['send-to-back', 'bring-forward']),
  ai('send-to-back', 'Send to back', 'Ctrl+Shift+[', 'Cmd+Shift+[', 'Arrange', ['bring-to-front', 'send-backward']),

  /* ───────── Path ───────── */
  ai('join', 'Join paths', 'Ctrl+J', 'Cmd+J', 'Path', ['average', 'direct-selection-tool']),
  ai('average', 'Average points', 'Ctrl+Alt+J', 'Cmd+Option+J', 'Path', ['join', 'snap-to-point']),

  /* ───────── Type ───────── */
  ai('create-outlines', 'Create outlines', 'Ctrl+Shift+O', 'Cmd+Shift+O', 'Type', ['type-tool', 'group']),

  /* ───────── Edit ───────── */
  ai('paste-in-front', 'Paste in front', 'Ctrl+F', 'Cmd+F', 'Edit', ['paste-in-back', 'paste-in-place']),
  ai('paste-in-back', 'Paste in back', 'Ctrl+B', 'Cmd+B', 'Edit', ['paste-in-front', 'paste-in-place']),
  ai('paste-in-place', 'Paste in place', 'Ctrl+Shift+V', 'Cmd+Shift+V', 'Edit', ['paste-in-front', 'artboard-tool']),

  /* ───────── Panels ───────── */
  ai('align-panel', 'Align panel', 'Shift+F7', 'Shift+F7', 'Panels', ['pathfinder-panel', 'smart-guides']),
  ai('pathfinder-panel', 'Pathfinder panel', 'Ctrl+Shift+F9', 'Cmd+Shift+F9', 'Panels', ['align-panel', 'group']),

  /* ═════════ premiere — 43가지 ═════════ */

  /* ───────── Playback — JKL은 편집자가 하루에 가장 많이 누르는 세 글자다 ───────── */
  pr('play-stop', 'Play or stop', 'Space', 'Space', 'Playback', ['play-forward', 'play-around']),
  pr('play-forward', 'Play forward', 'L', 'L', 'Playback', ['play-backward', 'stop-playback']),
  pr('play-backward', 'Play backward', 'J', 'J', 'Playback', ['play-forward', 'stop-playback']),
  pr('stop-playback', 'Stop playback', 'K', 'K', 'Playback', ['play-forward', 'play-backward']),
  pr('play-around', 'Play around playhead', 'Shift+K', 'Shift+K', 'Playback', ['play-stop', 'mark-in']),

  /* ───────── Navigation ───────── */
  pr('step-forward-frame', 'Step forward one frame', 'Right', 'Right', 'Navigation', ['step-back-frame', 'nudge-clip-right']),
  pr('step-back-frame', 'Step back one frame', 'Left', 'Left', 'Navigation', ['step-forward-frame', 'nudge-clip-left']),
  pr('next-edit-point', 'Go to next edit point', 'Down', 'Down', 'Navigation', ['previous-edit-point', 'ripple-trim-next']),
  pr('previous-edit-point', 'Go to previous edit point', 'Up', 'Up', 'Navigation', ['next-edit-point', 'ripple-trim-previous']),
  pr('sequence-start', 'Go to sequence start', 'Home', 'Home', 'Navigation', ['sequence-end', 'zoom-to-sequence']),
  pr('sequence-end', 'Go to sequence end', 'End', 'End', 'Navigation', ['sequence-start', 'zoom-to-sequence']),

  /* ───────── Marking ───────── */
  pr('mark-in', 'Mark in', 'I', 'I', 'Marking', ['mark-out', 'clear-in-out', 'extract']),
  pr('mark-out', 'Mark out', 'O', 'O', 'Marking', ['mark-in', 'clear-in-out', 'extract']),
  pr('mark-clip', 'Mark clip', 'X', 'X', 'Marking', ['mark-in', 'extract', 'lift']),
  pr('clear-in-out', 'Clear in and out', 'Ctrl+Shift+X', 'Option+X', 'Marking', ['mark-in', 'mark-out']),
  pr('add-marker', 'Add marker', 'M', 'M', 'Marking', ['mark-in', 'mark-clip']),

  /* ───────── Editing ───────── */
  pr('add-edit', 'Add edit', 'Ctrl+K', 'Cmd+K', 'Editing', ['add-edit-all-tracks', 'razor-tool', 'ripple-delete']),
  pr('add-edit-all-tracks', 'Add edit to all tracks', 'Ctrl+Shift+K', 'Cmd+Shift+K', 'Editing', ['add-edit', 'razor-tool']),
  pr('ripple-delete', 'Ripple delete', 'Shift+Delete', 'Shift+Delete', 'Editing', ['extract', 'lift', 'add-edit']),
  pr('lift', 'Lift', ';', ';', 'Editing', ['extract', 'ripple-delete', 'mark-in']),
  pr('extract', 'Extract', "'", "'", 'Editing', ['lift', 'ripple-delete', 'mark-out']),
  pr('insert', 'Insert', ',', ',', 'Editing', ['overwrite', 'paste-insert']),
  pr('overwrite', 'Overwrite', '.', '.', 'Editing', ['insert', 'paste-insert']),
  pr('paste-insert', 'Paste insert', 'Ctrl+Shift+V', 'Cmd+Shift+V', 'Editing', ['insert', 'overwrite']),
  pr('link-unlink', 'Link or unlink', 'Ctrl+L', 'Cmd+L', 'Editing', ['add-edit', 'nudge-clip-right']),
  pr('speed-duration', 'Speed or duration', 'Ctrl+R', 'Cmd+R', 'Editing', ['link-unlink', 'add-edit']),
  pr('toggle-clip-enable', 'Enable or disable clip', 'Shift+E', 'Shift+E', 'Editing', ['ripple-delete', 'lift']),
  pr('nudge-clip-left', 'Nudge clip one frame left', 'Alt+Left', 'Cmd+Left', 'Editing', ['nudge-clip-right', 'step-back-frame']),
  pr('nudge-clip-right', 'Nudge clip one frame right', 'Alt+Right', 'Cmd+Right', 'Editing', ['nudge-clip-left', 'step-forward-frame']),

  /* ───────── Trim ───────── */
  pr('ripple-trim-previous', 'Ripple trim previous edit to playhead', 'Q', 'Q', 'Trim', ['ripple-trim-next', 'ripple-delete']),
  pr('ripple-trim-next', 'Ripple trim next edit to playhead', 'W', 'W', 'Trim', ['ripple-trim-previous', 'ripple-delete']),
  pr('match-frame', 'Match frame', 'F', 'F', 'Trim', ['add-edit', 'focus-timeline']),

  /* ───────── Tools ───────── */
  pr('selection-tool', 'Selection tool', 'V', 'V', 'Tools', ['razor-tool', 'track-select-forward-tool']),
  pr('razor-tool', 'Razor tool', 'C', 'C', 'Tools', ['add-edit', 'selection-tool']),
  pr('track-select-forward-tool', 'Track Select Forward tool', 'A', 'A', 'Tools', ['selection-tool', 'ripple-edit-tool']),
  pr('ripple-edit-tool', 'Ripple Edit tool', 'B', 'B', 'Tools', ['ripple-trim-next', 'selection-tool']),

  /* ───────── View ───────── */
  pr('snap', 'Snap', 'S', 'S', 'View', ['nudge-clip-right', 'add-edit']),
  pr('zoom-to-sequence', 'Zoom to sequence', '\\', '\\', 'View', ['sequence-start', 'focus-timeline']),
  pr('maximize-frame', 'Maximize frame under pointer', '`', '`', 'View', ['focus-timeline', 'focus-program-monitor']),

  /* ───────── Panels — 어느 칸이 초점을 가졌는지가 프리미어의 절반이다 ───────── */
  pr('focus-timeline', 'Focus timeline panel', 'Shift+3', 'Shift+3', 'Panels', ['focus-program-monitor', 'maximize-frame']),
  pr('focus-program-monitor', 'Focus Program Monitor', 'Shift+4', 'Shift+4', 'Panels', ['focus-timeline', 'export-frame']),

  /* ───────── Export ───────── */
  pr('export-frame', 'Export frame', 'Ctrl+Shift+E', 'Cmd+Shift+E', 'Export', ['export-media', 'focus-program-monitor']),
  pr('export-media', 'Export media', 'Ctrl+M', 'Cmd+M', 'Export', ['export-frame', 'mark-in']),
];
