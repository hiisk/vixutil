/**
 * JetBrains IDE 계열 단축키 60가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Shift 두 번은 어느
 * 나라에서든 Shift 두 번이고 Cmd는 Cmd다. 그래서 여기에는 옮길 것이 없는 것만
 * 둔다 — 열 언어로 쓸 한 문장은 desc-dev2.ts에 있다.
 *
 * ── 한 장이 여섯 제품을 받는다 ─────────────────────────────
 * IntelliJ IDEA의 기본 키맵은 PyCharm·WebStorm·GoLand·Android Studio·RubyMine이
 * 그대로 쓴다. 제품마다 페이지를 두면 같은 표를 여섯 벌 두고 여섯 벌을 따로
 * 고쳐야 하므로, 여기 한 장이 그 사람들을 다 받는다.
 *
 * ── 이 앱의 가장 큰 함정: 키맵이 운영체제마다 다르다 ────────
 * JetBrains는 기본 키맵을 운영체제별로 따로 낸다. 게다가 맥에는 둘이 있다 —
 * 'macOS'와 'macOS System Shortcuts'. 그래서 윈도우 칸과 맥 칸이 다른 앱보다
 * 훨씬 많이 갈라진다. Cmd만 바꿔 끼우면 되는 자리가 오히려 적다:
 * Go to Class가 윈도우는 Ctrl+N인데 맥은 Cmd+O이고, Quick Documentation이
 * 윈도우는 Ctrl+Q인데 맥은 Ctrl+J이며(그 Ctrl+J는 윈도우에서 Live Template을
 * 넣는 키다), Expand Selection은 윈도우 Ctrl+W와 맥 Option+Up이 글자 하나도
 * 겹치지 않는다. Optimize Imports는 맥이 Ctrl+Option+O다 — Cmd+Option+O로
 * 누르면 Go to Symbol이 열린다. 이 자리들은 desc에서 따로 짚었다.
 *
 * 맥 키맵이 둘인 이유도 여기 있다. Ctrl+Space(Basic Completion)는 macOS가
 * 입력기 전환으로 먼저 가져가고, F3·F11·F12는 Mission Control과 볼륨이
 * 가져간다. IDE에 닿기 전에 삼켜지는 것이다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 손대지 않은 기본 키맵(Windows/Linux의 'Default', 맥의 'macOS')에 실제로 있는
 * 것만 싣는다. 기본 키가 없는 것 — Local History 보기, 편집기 나누기(Split
 * Vertically/Horizontally) — 는 지어내지 않고 아예 뺐다. 두 손가락으로 Ctrl을
 * 두 번 눌러 쥐고 방향키를 누르는 캐럿 복제도 표기가 흐려서 넣지 않았다.
 *
 * 조합 표기는 한 줄로 맞춘다 — 사이에 빈칸을 두지 않고 +로 잇고, 차례로 이어
 * 누르는 것만 빈칸으로 띄운다: Shift를 두 번 두드리는 Search Everywhere는
 * 'Shift Shift'다. 수식 키 순서는 Ctrl → Cmd → Shift → Alt(맥은 Option)이다.
 */
import type { ScItem, ScApp } from './types.ts';

/** 앱 이름이 슬러그 앞에 붙는다 — mk('intellij')('run', …) → 'intellij-run' */
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
  ...(see ? { see } : {}),
});

const j = mk('intellij');

export const SC_DEV2: ScItem[] = [
  /* ═════════ intellij — IDEA·PyCharm·WebStorm·GoLand·Android Studio ═════════ */

  /* ───────── Navigation ───────── */
  j('search-everywhere', 'Search everywhere', 'Shift Shift', 'Shift Shift', 'Navigation',
    ['intellij-find-action', 'intellij-go-to-class', 'intellij-go-to-file']),
  j('find-action', 'Find action', 'Ctrl+Shift+A', 'Cmd+Shift+A', 'Navigation',
    ['intellij-search-everywhere', 'intellij-quick-fix']),
  j('recent-files', 'Recent files popup', 'Ctrl+E', 'Cmd+E', 'Navigation',
    ['intellij-search-everywhere', 'intellij-next-tab']),
  j('go-to-class', 'Go to class', 'Ctrl+N', 'Cmd+O', 'Navigation',
    ['intellij-go-to-file', 'intellij-go-to-symbol', 'intellij-search-everywhere']),
  j('go-to-file', 'Go to file', 'Ctrl+Shift+N', 'Cmd+Shift+O', 'Navigation',
    ['intellij-go-to-class', 'intellij-go-to-symbol']),
  j('go-to-symbol', 'Go to symbol', 'Ctrl+Shift+Alt+N', 'Cmd+Option+O', 'Navigation',
    ['intellij-go-to-class', 'intellij-optimize-imports']),
  j('go-to-line', 'Go to line', 'Ctrl+G', 'Cmd+L', 'Navigation',
    ['intellij-select-next-occurrence', 'intellij-go-to-file']),
  j('go-to-declaration', 'Go to declaration', 'Ctrl+B', 'Cmd+B', 'Navigation',
    ['intellij-go-to-implementation', 'intellij-find-usages', 'intellij-back']),
  j('go-to-implementation', 'Go to implementation', 'Ctrl+Alt+B', 'Cmd+Option+B', 'Navigation',
    ['intellij-go-to-declaration', 'intellij-find-usages']),
  j('find-usages', 'Find usages', 'Alt+F7', 'Option+F7', 'Navigation',
    ['intellij-go-to-declaration', 'intellij-rename']),
  j('back', 'Go back', 'Ctrl+Alt+Left', 'Cmd+Option+Left', 'Navigation',
    ['intellij-forward', 'intellij-go-to-declaration']),
  j('forward', 'Go forward', 'Ctrl+Alt+Right', 'Cmd+Option+Right', 'Navigation',
    ['intellij-back']),
  j('file-structure', 'File structure popup', 'Ctrl+F12', 'Cmd+F12', 'Navigation',
    ['intellij-structure-window', 'intellij-go-to-symbol']),

  /* ───────── Tool windows ───────── */
  j('project-window', 'Project tool window', 'Alt+1', 'Cmd+1', 'Tool windows',
    ['intellij-structure-window', 'intellij-terminal']),
  j('structure-window', 'Structure tool window', 'Alt+7', 'Cmd+7', 'Tool windows',
    ['intellij-file-structure', 'intellij-project-window']),
  j('terminal', 'Toggle the built-in terminal', 'Alt+F12', 'Option+F12', 'Tool windows',
    ['intellij-project-window', 'intellij-run']),

  /* ───────── Code ───────── */
  j('basic-completion', 'Basic code completion', 'Ctrl+Space', 'Ctrl+Space', 'Code',
    ['intellij-smart-completion', 'intellij-complete-statement', 'intellij-parameter-info']),
  j('smart-completion', 'Smart code completion', 'Ctrl+Shift+Space', 'Ctrl+Shift+Space', 'Code',
    ['intellij-basic-completion']),
  j('complete-statement', 'Complete the statement', 'Ctrl+Shift+Enter', 'Cmd+Shift+Enter', 'Code',
    ['intellij-basic-completion', 'intellij-reformat-code']),
  j('parameter-info', 'Parameter info', 'Ctrl+P', 'Cmd+P', 'Code',
    ['intellij-basic-completion', 'intellij-quick-documentation']),
  j('quick-documentation', 'Quick documentation', 'Ctrl+Q', 'Ctrl+J', 'Code',
    ['intellij-parameter-info', 'intellij-live-template']),
  j('quick-fix', 'Quick-fixes and intention actions', 'Alt+Enter', 'Option+Enter', 'Code',
    ['intellij-find-action', 'intellij-optimize-imports', 'intellij-surround-with']),
  j('generate', 'Generate code', 'Alt+Insert', 'Cmd+N', 'Code',
    ['intellij-quick-fix', 'intellij-surround-with']),
  j('surround-with', 'Surround with', 'Ctrl+Alt+T', 'Cmd+Option+T', 'Code',
    ['intellij-generate', 'intellij-live-template', 'intellij-expand-selection']),
  j('live-template', 'Insert a live template', 'Ctrl+J', 'Cmd+J', 'Code',
    ['intellij-quick-documentation', 'intellij-surround-with']),
  j('reformat-code', 'Reformat code', 'Ctrl+Alt+L', 'Cmd+Option+L', 'Code',
    ['intellij-optimize-imports', 'intellij-complete-statement']),
  j('optimize-imports', 'Optimize imports', 'Ctrl+Alt+O', 'Ctrl+Option+O', 'Code',
    ['intellij-reformat-code', 'intellij-go-to-symbol']),

  /* ───────── Editing ───────── */
  j('move-line-up', 'Move the line up', 'Shift+Alt+Up', 'Shift+Option+Up', 'Editing',
    ['intellij-move-line-down', 'intellij-duplicate-line']),
  j('move-line-down', 'Move the line down', 'Shift+Alt+Down', 'Shift+Option+Down', 'Editing',
    ['intellij-move-line-up', 'intellij-duplicate-line']),
  j('duplicate-line', 'Duplicate the line or selection', 'Ctrl+D', 'Cmd+D', 'Editing',
    ['intellij-show-diff', 'intellij-select-next-occurrence', 'intellij-move-line-down']),
  j('comment-line', 'Comment out the line', 'Ctrl+/', 'Cmd+/', 'Editing',
    ['intellij-comment-block', 'intellij-reformat-code']),
  j('comment-block', 'Comment out a block', 'Ctrl+Shift+/', 'Cmd+Option+/', 'Editing',
    ['intellij-comment-line', 'intellij-expand-selection']),
  j('column-selection', 'Column selection mode', 'Shift+Alt+Insert', 'Cmd+Shift+8', 'Editing',
    ['intellij-add-caret', 'intellij-select-all-occurrences']),

  /* ───────── Selection ───────── */
  j('expand-selection', 'Expand the selection', 'Ctrl+W', 'Option+Up', 'Selection',
    ['intellij-shrink-selection', 'intellij-surround-with', 'intellij-extract-variable']),
  j('shrink-selection', 'Shrink the selection', 'Ctrl+Shift+W', 'Option+Down', 'Selection',
    ['intellij-expand-selection']),
  j('add-caret', 'Add or remove a caret with the mouse', 'Alt+Click', 'Option+Click', 'Selection',
    ['intellij-select-next-occurrence', 'intellij-column-selection']),
  j('select-next-occurrence', 'Add the next occurrence to the selection', 'Alt+J', 'Ctrl+G', 'Selection',
    ['intellij-select-all-occurrences', 'intellij-go-to-line', 'intellij-add-caret']),
  j('select-all-occurrences', 'Select every occurrence', 'Ctrl+Shift+Alt+J', 'Ctrl+Cmd+G', 'Selection',
    ['intellij-select-next-occurrence', 'intellij-rename']),

  /* ───────── Refactoring ───────── */
  j('rename', 'Rename', 'Shift+F6', 'Shift+F6', 'Refactoring',
    ['intellij-change-signature', 'intellij-find-usages', 'intellij-select-all-occurrences']),
  j('change-signature', 'Change the signature', 'Ctrl+F6', 'Cmd+F6', 'Refactoring',
    ['intellij-rename', 'intellij-extract-method']),
  j('extract-method', 'Extract a method', 'Ctrl+Alt+M', 'Cmd+Option+M', 'Refactoring',
    ['intellij-extract-variable', 'intellij-inline', 'intellij-expand-selection']),
  j('extract-variable', 'Extract a variable', 'Ctrl+Alt+V', 'Cmd+Option+V', 'Refactoring',
    ['intellij-extract-method', 'intellij-inline']),
  j('inline', 'Inline', 'Ctrl+Alt+N', 'Cmd+Option+N', 'Refactoring',
    ['intellij-extract-method', 'intellij-extract-variable']),

  /* ───────── Run ───────── */
  j('run', 'Run', 'Shift+F10', 'Ctrl+R', 'Run',
    ['intellij-debug', 'intellij-terminal']),
  j('debug', 'Debug', 'Shift+F9', 'Ctrl+D', 'Run',
    ['intellij-run', 'intellij-toggle-breakpoint', 'intellij-duplicate-line']),

  /* ───────── Debug ───────── */
  j('toggle-breakpoint', 'Toggle a breakpoint', 'Ctrl+F8', 'Cmd+F8', 'Debug',
    ['intellij-debug', 'intellij-run-to-cursor']),
  j('step-over', 'Step over', 'F8', 'F8', 'Debug',
    ['intellij-step-into', 'intellij-step-out', 'intellij-resume']),
  j('step-into', 'Step into', 'F7', 'F7', 'Debug',
    ['intellij-step-over', 'intellij-step-out']),
  j('step-out', 'Step out', 'Shift+F8', 'Shift+F8', 'Debug',
    ['intellij-step-into', 'intellij-step-over']),
  j('resume', 'Resume the program', 'F9', 'Cmd+Option+R', 'Debug',
    ['intellij-step-over', 'intellij-toggle-breakpoint']),
  j('run-to-cursor', 'Run to the cursor', 'Alt+F9', 'Option+F9', 'Debug',
    ['intellij-toggle-breakpoint', 'intellij-step-over']),
  j('evaluate-expression', 'Evaluate an expression', 'Alt+F8', 'Option+F8', 'Debug',
    ['intellij-debug', 'intellij-step-over']),

  /* ───────── Version control ───────── */
  j('commit', 'Commit', 'Ctrl+K', 'Cmd+K', 'Version control',
    ['intellij-update-project', 'intellij-show-diff']),
  j('update-project', 'Update the project', 'Ctrl+T', 'Cmd+T', 'Version control',
    ['intellij-commit', 'intellij-show-diff']),
  j('show-diff', 'Show the diff', 'Ctrl+D', 'Cmd+D', 'Version control',
    ['intellij-commit', 'intellij-duplicate-line']),

  /* ───────── Editors ───────── */
  j('next-tab', 'Next editor tab', 'Alt+Right', 'Ctrl+Right', 'Editors',
    ['intellij-previous-tab', 'intellij-close-tab', 'intellij-recent-files']),
  j('previous-tab', 'Previous editor tab', 'Alt+Left', 'Ctrl+Left', 'Editors',
    ['intellij-next-tab', 'intellij-back']),
  j('close-tab', 'Close the editor tab', 'Ctrl+F4', 'Cmd+W', 'Editors',
    ['intellij-next-tab', 'intellij-recent-files']),

  /* ───────── Bookmarks ───────── */
  j('toggle-bookmark', 'Toggle a bookmark', 'F11', 'F3', 'Bookmarks',
    ['intellij-show-bookmarks', 'intellij-back']),
  j('show-bookmarks', 'Show the bookmark list', 'Shift+F11', 'Cmd+F3', 'Bookmarks',
    ['intellij-toggle-bookmark']),
];
