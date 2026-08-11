/**
 * 표·운영체제 단축키 170가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+D는 어느 나라에서든
 * Ctrl+D이고 Cmd는 Cmd다. 그래서 여기에는 옮길 것이 없는 것만 둔다 — 열 언어로 쓸
 * 한 문장은 desc-office.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 만든 곳이 지금 문서로 밝혀 둔 기본값만 싣는다. 확인하지 못한 조합은 적지 않는다.
 * 틀린 조합 한 줄이 빠진 조합 열 줄보다 나쁘다. Excel의 창 고정처럼 애초에 기본
 * 조합이 없는 기능은 없다고 적는다 — 지어내지 않는다.
 *
 * 윈도우와 맥이 다른 자리가 이 표의 핵심이다. F4(절대참조)는 맥에서 Cmd+T이고,
 * 시각 입력은 윈도우가 Ctrl+Shift+;인데 맥은 Cmd+;다. 한쪽에만 있는 기능은
 * 반대쪽 칸을 NONE으로 두고 설명에서 그 까닭을 밝힌다.
 *
 * 앱은 넷이다 — excel·sheets·windows·macos.
 */
import type { ScItem, ScApp } from './types.ts';
import { NA } from './types.ts';

/** 그 플랫폼에 기본 조합이 없다는 표시 — 모른다는 뜻이 아니라 없다는 뜻이다 */
const NONE = NA;

/** slug은 앱 열쇠와 꼬리표를 이어 만든다 — ('excel','fill-down') → 'excel-fill-down' */
const s = (
  app: ScApp,
  tail: string,
  action: string,
  group: string,
  win: string,
  mac: string,
  see?: string[],
): ScItem => ({
  slug: `${app}-${tail}`,
  app,
  action,
  win,
  mac,
  group,
  ...(see ? { see } : {}),
});

export const SC_OFFICE: ScItem[] = [
  /* ═════════ excel — 60가지 ═════════ */

  /* ───── Editing ───── */
  s('excel', 'fill-down', 'Fill down', 'Editing', 'Ctrl+D', 'Cmd+D', ['excel-fill-right', 'excel-paste-values']),
  s('excel', 'fill-right', 'Fill right', 'Editing', 'Ctrl+R', 'Cmd+R', ['excel-fill-down']),
  s('excel', 'flash-fill', 'Flash Fill', 'Editing', 'Ctrl+E', NONE, ['excel-fill-down']),
  s('excel', 'edit-cell', 'Edit the active cell', 'Editing', 'F2', 'F2', ['excel-new-line-in-cell']),
  s('excel', 'enter-and-fill-selection', 'Fill the selection with what you typed', 'Editing', 'Ctrl+Enter', 'Ctrl+Enter', ['excel-fill-down']),
  s('excel', 'new-line-in-cell', 'New line inside one cell', 'Editing', 'Alt+Enter', 'Ctrl+Option+Enter', ['excel-wrap-text', 'excel-edit-cell']),
  s('excel', 'insert-date', 'Type in today date', 'Editing', 'Ctrl+;', 'Ctrl+;', ['excel-insert-time']),
  s('excel', 'insert-time', 'Type in the current time', 'Editing', 'Ctrl+Shift+;', 'Cmd+;', ['excel-insert-date']),
  s('excel', 'copy-formula-from-above', 'Copy the formula from the cell above', 'Editing', 'Ctrl+Apostrophe', 'Ctrl+Apostrophe', ['excel-fill-down']),
  s('excel', 'repeat-last-action', 'Repeat or redo the last action', 'Editing', 'Ctrl+Y', 'Cmd+Y'),
  s('excel', 'insert-hyperlink', 'Insert a hyperlink', 'Editing', 'Ctrl+K', 'Cmd+K'),

  /* ───── Clipboard ───── */
  s('excel', 'paste-special', 'Open Paste Special', 'Clipboard', 'Ctrl+Alt+V', 'Cmd+Ctrl+V', ['excel-paste-values']),
  s('excel', 'paste-values', 'Paste values only', 'Clipboard', 'Ctrl+Alt+V V Enter', 'Cmd+Ctrl+V', ['excel-paste-special']),

  /* ───── Selection ───── */
  s('excel', 'select-column', 'Select the whole column', 'Selection', 'Ctrl+Space', 'Ctrl+Space', ['excel-select-row', 'excel-insert-cells']),
  s('excel', 'select-row', 'Select the whole row', 'Selection', 'Shift+Space', 'Shift+Space', ['excel-select-column']),
  s('excel', 'select-current-region', 'Select the block of data around the cell', 'Selection', 'Ctrl+A', 'Cmd+A'),
  s('excel', 'select-to-end-of-data', 'Extend the selection to the last filled cell', 'Selection', 'Ctrl+Shift+Down', 'Ctrl+Shift+Down', ['excel-select-to-last-cell']),
  s('excel', 'select-to-last-cell', 'Extend the selection to the last used cell', 'Selection', 'Ctrl+Shift+End', 'Ctrl+Shift+End', ['excel-go-to-last-cell']),

  /* ───── Navigation ───── */
  s('excel', 'go-to-last-cell', 'Jump to the last used cell', 'Navigation', 'Ctrl+End', 'Ctrl+End', ['excel-go-to-first-cell']),
  s('excel', 'go-to-first-cell', 'Jump to A1', 'Navigation', 'Ctrl+Home', 'Ctrl+Home', ['excel-go-to-last-cell']),

  /* ───── Sheets ───── */
  s('excel', 'next-sheet', 'Go to the next sheet', 'Sheets', 'Ctrl+PageDown', 'Option+Right', ['excel-previous-sheet']),
  s('excel', 'previous-sheet', 'Go to the previous sheet', 'Sheets', 'Ctrl+PageUp', 'Option+Left', ['excel-next-sheet']),
  s('excel', 'insert-sheet', 'Insert a new sheet', 'Sheets', 'Shift+F11', 'Shift+F11', ['excel-next-sheet']),

  /* ───── Rows ───── */
  s('excel', 'insert-cells', 'Insert cells, rows or columns', 'Rows', 'Ctrl+Shift+Plus', 'Ctrl+Shift+Plus', ['excel-select-row', 'excel-delete-cells']),
  s('excel', 'delete-cells', 'Delete cells, rows or columns', 'Rows', 'Ctrl+Minus', 'Cmd+Minus', ['excel-insert-cells']),
  s('excel', 'hide-rows', 'Hide the selected rows', 'Rows', 'Ctrl+9', 'Cmd+(', ['excel-hide-columns']),
  s('excel', 'hide-columns', 'Hide the selected columns', 'Rows', 'Ctrl+0', 'Cmd+)', ['excel-unhide-columns']),
  s('excel', 'unhide-columns', 'Unhide the hidden columns', 'Rows', 'Ctrl+Shift+0', 'Cmd+Shift+)', ['excel-hide-columns']),
  s('excel', 'group-rows', 'Group rows or columns', 'Rows', 'Alt+Shift+Right', 'Cmd+Shift+K', ['excel-ungroup-rows']),
  s('excel', 'ungroup-rows', 'Ungroup rows or columns', 'Rows', 'Alt+Shift+Left', 'Cmd+Shift+J', ['excel-group-rows']),

  /* ───── Formatting ───── */
  s('excel', 'format-cells', 'Open the Format Cells dialog', 'Formatting', 'Ctrl+1', 'Cmd+1', ['excel-format-general']),
  s('excel', 'bold', 'Bold', 'Formatting', 'Ctrl+B', 'Cmd+B', ['excel-underline']),
  s('excel', 'underline', 'Underline', 'Formatting', 'Ctrl+U', 'Cmd+U', ['excel-bold']),
  s('excel', 'outline-border', 'Draw a border around the selection', 'Formatting', 'Ctrl+Shift+&', 'Cmd+Option+0', ['excel-remove-borders']),
  s('excel', 'remove-borders', 'Remove every border', 'Formatting', 'Ctrl+Shift+_', 'Cmd+Option+Minus', ['excel-outline-border']),
  s('excel', 'align-center', 'Centre the cell contents', 'Formatting', 'Alt+H A C', 'Cmd+E'),
  s('excel', 'wrap-text', 'Wrap the text in the cell', 'Formatting', NONE, NONE, ['excel-new-line-in-cell']),

  /* ───── Numbers ───── */
  s('excel', 'format-general', 'General number format', 'Numbers', 'Ctrl+Shift+~', 'Ctrl+Shift+~', ['excel-format-cells']),
  s('excel', 'format-currency', 'Currency format', 'Numbers', 'Ctrl+Shift+$', 'Ctrl+Shift+$', ['excel-format-comma']),
  s('excel', 'format-percent', 'Percent format', 'Numbers', 'Ctrl+Shift+%', 'Ctrl+Shift+%'),
  s('excel', 'format-comma', 'Thousands separator format', 'Numbers', 'Ctrl+Shift+!', 'Ctrl+Shift+!', ['excel-format-currency']),
  s('excel', 'format-date', 'Date format', 'Numbers', 'Ctrl+Shift+#', 'Ctrl+Shift+#', ['excel-insert-date']),

  /* ───── Formulas ───── */
  s('excel', 'autosum', 'Insert AutoSum', 'Formulas', 'Alt+=', 'Cmd+Shift+T', ['excel-insert-function']),
  s('excel', 'insert-function', 'Insert a function', 'Formulas', 'Shift+F3', 'Shift+F3', ['excel-autosum']),
  s('excel', 'absolute-reference', 'Toggle absolute and relative references', 'Formulas', 'F4', 'Cmd+T', ['excel-create-table']),
  s('excel', 'show-formulas', 'Show formulas instead of results', 'Formulas', 'Ctrl+`', 'Ctrl+`', ['excel-evaluate-formula-part']),
  s('excel', 'recalculate-all', 'Recalculate every open workbook', 'Formulas', 'F9', 'Cmd+=', ['excel-calculate-sheet']),
  s('excel', 'calculate-sheet', 'Recalculate this sheet only', 'Formulas', 'Shift+F9', 'Shift+F9', ['excel-recalculate-all']),
  s('excel', 'evaluate-formula-part', 'Evaluate one piece of a formula', 'Formulas', 'F9', 'F9', ['excel-show-formulas']),
  s('excel', 'expand-formula-bar', 'Expand or collapse the formula bar', 'Formulas', 'Ctrl+Shift+U', 'Ctrl+Shift+U'),
  s('excel', 'name-manager', 'Open the Name Manager', 'Formulas', 'Ctrl+F3', 'Cmd+F3'),

  /* ───── Data ───── */
  s('excel', 'toggle-filter', 'Turn AutoFilter on or off', 'Data', 'Ctrl+Shift+L', 'Cmd+Shift+L', ['excel-create-table']),
  s('excel', 'create-table', 'Turn the range into a table', 'Data', 'Ctrl+T', 'Cmd+T', ['excel-toggle-filter', 'excel-absolute-reference']),
  s('excel', 'find', 'Find', 'Data', 'Ctrl+F', 'Cmd+F', ['excel-replace']),
  s('excel', 'replace', 'Find and replace', 'Data', 'Ctrl+H', 'Cmd+Shift+H', ['excel-find']),

  /* ───── View · File · Review ───── */
  s('excel', 'freeze-panes', 'Freeze the top rows or first columns', 'View', NONE, NONE),
  s('excel', 'save-as', 'Open Save As', 'File', 'F12', 'Cmd+Shift+S'),
  s('excel', 'print-preview', 'Show the print preview', 'File', 'Ctrl+F2', NONE),
  s('excel', 'insert-comment', 'Insert a threaded comment', 'Review', 'Ctrl+Shift+F2', 'Cmd+Shift+F2'),
  s('excel', 'spell-check', 'Check spelling', 'Review', 'F7', 'F7'),

  /* ═════════ sheets — 40가지 ═════════ */

  /* ───── Menus ───── */
  s('sheets', 'tool-finder', 'Search the menus', 'Menus', 'Alt+/', 'Option+/', ['sheets-shortcut-list']),
  s('sheets', 'shortcut-list', 'Show every shortcut', 'Menus', 'Ctrl+/', 'Cmd+/', ['sheets-tool-finder']),

  /* ───── Rows ───── */
  s('sheets', 'insert-rows-or-columns', 'Insert rows above or columns to the left', 'Rows', 'Ctrl+Alt+=', 'Cmd+Option+=', ['sheets-insert-row-below', 'sheets-delete-rows-or-columns']),
  s('sheets', 'delete-rows-or-columns', 'Delete the selected rows or columns', 'Rows', 'Ctrl+Alt+Minus', 'Cmd+Option+Minus', ['sheets-insert-rows-or-columns']),
  s('sheets', 'insert-row-below', 'Insert a row below', 'Rows', 'Alt+I R B', 'Ctrl+Option+I R B', ['sheets-insert-rows-or-columns']),
  s('sheets', 'insert-column-right', 'Insert a column to the right', 'Rows', 'Alt+I C O', 'Ctrl+Option+I C O', ['sheets-insert-rows-or-columns']),

  /* ───── Selection ───── */
  s('sheets', 'select-column', 'Select the whole column', 'Selection', 'Ctrl+Space', 'Ctrl+Space', ['sheets-select-row']),
  s('sheets', 'select-row', 'Select the whole row', 'Selection', 'Shift+Space', 'Shift+Space', ['sheets-select-column']),

  /* ───── Editing ───── */
  s('sheets', 'fill-down', 'Fill down', 'Editing', 'Ctrl+D', 'Cmd+D', ['sheets-fill-right']),
  s('sheets', 'fill-right', 'Fill right', 'Editing', 'Ctrl+R', 'Cmd+R', ['sheets-fill-down']),
  s('sheets', 'insert-link', 'Insert a link', 'Editing', 'Ctrl+K', 'Cmd+K'),
  s('sheets', 'insert-date', 'Type in today date', 'Editing', 'Ctrl+;', 'Cmd+;', ['sheets-insert-time']),
  s('sheets', 'insert-time', 'Type in the current time', 'Editing', 'Ctrl+Shift+;', 'Cmd+Shift+;', ['sheets-insert-date']),

  /* ───── Clipboard ───── */
  s('sheets', 'paste-values-only', 'Paste values only', 'Clipboard', 'Ctrl+Shift+V', 'Cmd+Shift+V', ['sheets-paste-special']),
  s('sheets', 'paste-special', 'Open Paste special', 'Clipboard', 'Ctrl+Alt+V', 'Cmd+Option+V', ['sheets-paste-values-only']),

  /* ───── Review ───── */
  s('sheets', 'insert-comment', 'Insert a comment', 'Review', 'Ctrl+Alt+M', 'Cmd+Option+M', ['sheets-insert-note']),
  s('sheets', 'insert-note', 'Insert a note', 'Review', 'Shift+F2', 'Shift+F2', ['sheets-insert-comment']),

  /* ───── Formatting ───── */
  s('sheets', 'bold', 'Bold', 'Formatting', 'Ctrl+B', 'Cmd+B', ['sheets-underline']),
  s('sheets', 'underline', 'Underline', 'Formatting', 'Ctrl+U', 'Cmd+U', ['sheets-bold']),
  s('sheets', 'strikethrough', 'Strikethrough', 'Formatting', 'Alt+Shift+5', 'Cmd+Shift+X', ['sheets-bold']),
  s('sheets', 'align-center', 'Centre the contents', 'Formatting', 'Ctrl+Shift+E', 'Cmd+Shift+E', ['sheets-align-left', 'sheets-align-right']),
  s('sheets', 'align-left', 'Align left', 'Formatting', 'Ctrl+Shift+L', 'Cmd+Shift+L', ['sheets-align-center']),
  s('sheets', 'align-right', 'Align right', 'Formatting', 'Ctrl+Shift+R', 'Cmd+Shift+R', ['sheets-align-center']),
  s('sheets', 'clear-formatting', 'Clear the formatting', 'Formatting', 'Ctrl+\\', 'Cmd+\\', ['sheets-format-decimal']),
  s('sheets', 'border-outer', 'Draw an outer border', 'Formatting', 'Alt+Shift+7', 'Option+Shift+7', ['sheets-border-remove']),
  s('sheets', 'border-remove', 'Remove every border', 'Formatting', 'Alt+Shift+6', 'Option+Shift+6', ['sheets-border-outer']),

  /* ───── Numbers ───── */
  s('sheets', 'format-decimal', 'Number format with decimals', 'Numbers', 'Ctrl+Shift+1', 'Ctrl+Shift+1', ['sheets-format-currency']),
  s('sheets', 'format-time', 'Time format', 'Numbers', 'Ctrl+Shift+2', 'Ctrl+Shift+2', ['sheets-insert-time']),
  s('sheets', 'format-date', 'Date format', 'Numbers', 'Ctrl+Shift+3', 'Ctrl+Shift+3', ['sheets-insert-date']),
  s('sheets', 'format-currency', 'Currency format', 'Numbers', 'Ctrl+Shift+4', 'Ctrl+Shift+4', ['sheets-format-decimal']),
  s('sheets', 'format-percent', 'Percent format', 'Numbers', 'Ctrl+Shift+5', 'Ctrl+Shift+5', ['sheets-strikethrough']),
  s('sheets', 'format-exponent', 'Scientific format', 'Numbers', 'Ctrl+Shift+6', 'Ctrl+Shift+6', ['sheets-format-decimal']),

  /* ───── Sheets ───── */
  s('sheets', 'next-sheet', 'Go to the next sheet', 'Sheets', 'Alt+Down', 'Option+Down', ['sheets-previous-sheet', 'sheets-sheet-list']),
  s('sheets', 'previous-sheet', 'Go to the previous sheet', 'Sheets', 'Alt+Up', 'Option+Up', ['sheets-next-sheet']),
  s('sheets', 'sheet-list', 'Show the list of sheets', 'Sheets', 'Alt+Shift+K', 'Option+Shift+K', ['sheets-next-sheet']),
  s('sheets', 'insert-sheet', 'Insert a new sheet', 'Sheets', 'Shift+F11', 'Shift+Fn+F11', ['sheets-sheet-list']),

  /* ───── Formulas · Data · View ───── */
  s('sheets', 'show-formulas', 'Show formulas instead of results', 'Formulas', 'Ctrl+`', 'Ctrl+`'),
  s('sheets', 'open-explore', 'Open Explore', 'Data', 'Ctrl+Alt+Shift+I', 'Cmd+Option+Shift+I'),
  s('sheets', 'find-and-replace', 'Find and replace', 'Data', 'Ctrl+H', 'Cmd+Shift+H'),
  s('sheets', 'freeze-rows', 'Freeze the top rows', 'View', NONE, NONE),

  /* ═════════ windows — 40가지 ═════════ */

  /* ───── Start ───── */
  s('windows', 'start-menu', 'Open or close the Start menu', 'Start', 'Win', NONE, ['windows-search']),
  s('windows', 'search', 'Open search', 'Start', 'Win+S', NONE, ['windows-start-menu']),

  /* ───── System ───── */
  s('windows', 'settings', 'Open Settings', 'System', 'Win+I', NONE),
  s('windows', 'run-dialog', 'Open the Run box', 'System', 'Win+R', NONE, ['windows-run-as-admin']),
  s('windows', 'quick-link-menu', 'Open the Quick Link menu', 'System', 'Win+X', NONE, ['windows-task-manager']),
  s('windows', 'lock', 'Lock the computer', 'System', 'Win+L', NONE),
  s('windows', 'task-manager', 'Open Task Manager', 'System', 'Ctrl+Shift+Esc', NONE, ['windows-security-screen']),
  s('windows', 'security-screen', 'Open the security screen', 'System', 'Ctrl+Alt+Delete', NONE, ['windows-task-manager']),
  s('windows', 'clipboard-history', 'Open clipboard history', 'System', 'Win+V', NONE),
  s('windows', 'emoji-panel', 'Open the emoji panel', 'System', 'Win+Period', NONE),
  s('windows', 'magnifier', 'Zoom in with Magnifier', 'System', 'Win+Plus', NONE),
  s('windows', 'project-display', 'Choose how to use a second screen', 'System', 'Win+P', NONE),
  s('windows', 'action-center', 'Open quick settings', 'System', 'Win+A', NONE, ['windows-notifications']),
  s('windows', 'notifications', 'Open the notification centre', 'System', 'Win+N', NONE, ['windows-action-center']),
  s('windows', 'reset-graphics-driver', 'Restart the graphics driver', 'System', 'Win+Ctrl+Shift+B', NONE),
  s('windows', 'run-as-admin', 'Run as administrator', 'System', 'Ctrl+Shift+Enter', NONE, ['windows-run-dialog']),

  /* ───── Desktop ───── */
  s('windows', 'show-desktop', 'Show or hide the desktop', 'Desktop', 'Win+D', NONE, ['windows-peek-desktop']),
  s('windows', 'peek-desktop', 'Peek at the desktop', 'Desktop', 'Win+Comma', NONE, ['windows-show-desktop']),
  s('windows', 'task-view', 'Open Task View', 'Desktop', 'Win+Tab', NONE, ['windows-switch-window']),
  s('windows', 'new-virtual-desktop', 'Add a virtual desktop', 'Desktop', 'Win+Ctrl+D', NONE, ['windows-switch-virtual-desktop', 'windows-close-virtual-desktop']),
  s('windows', 'switch-virtual-desktop', 'Move to the next virtual desktop', 'Desktop', 'Win+Ctrl+Right', NONE, ['windows-new-virtual-desktop']),
  s('windows', 'close-virtual-desktop', 'Close this virtual desktop', 'Desktop', 'Win+Ctrl+F4', NONE, ['windows-new-virtual-desktop']),

  /* ───── Window ───── */
  s('windows', 'snap-left', 'Snap the window to the left', 'Window', 'Win+Left', NONE, ['windows-snap-right', 'windows-snap-layouts']),
  s('windows', 'snap-right', 'Snap the window to the right', 'Window', 'Win+Right', NONE, ['windows-snap-left']),
  s('windows', 'maximize', 'Maximise the window', 'Window', 'Win+Up', NONE, ['windows-minimize']),
  s('windows', 'minimize', 'Minimise the window', 'Window', 'Win+Down', NONE, ['windows-maximize']),
  s('windows', 'snap-layouts', 'Open the snap layouts', 'Window', 'Win+Z', NONE, ['windows-snap-left']),
  s('windows', 'move-to-next-monitor', 'Move the window to the next monitor', 'Window', 'Win+Shift+Right', NONE, ['windows-snap-right']),
  s('windows', 'switch-window', 'Switch between open windows', 'Window', 'Alt+Tab', NONE, ['windows-task-view']),
  s('windows', 'close-window', 'Close the active window', 'Window', 'Alt+F4', NONE),

  /* ───── Files ───── */
  s('windows', 'file-explorer', 'Open File Explorer', 'Files', 'Win+E', NONE, ['windows-new-folder']),
  s('windows', 'new-folder', 'Create a new folder', 'Files', 'Ctrl+Shift+N', NONE, ['windows-file-explorer']),
  s('windows', 'rename', 'Rename the selected item', 'Files', 'F2', NONE),
  s('windows', 'delete-permanently', 'Delete without the Recycle Bin', 'Files', 'Shift+Delete', NONE),
  s('windows', 'properties', 'Open the properties of the item', 'Files', 'Alt+Enter', NONE),
  s('windows', 'parent-folder', 'Go up one folder', 'Files', 'Alt+Up', NONE, ['windows-file-explorer']),

  /* ───── Screenshot ───── */
  s('windows', 'snip', 'Capture part of the screen', 'Screenshot', 'Win+Shift+S', NONE, ['windows-print-screen', 'windows-screenshot-to-file']),
  s('windows', 'print-screen', 'Copy the whole screen', 'Screenshot', 'PrtSc', NONE, ['windows-snip']),
  s('windows', 'screenshot-to-file', 'Save the whole screen as a file', 'Screenshot', 'Win+PrtSc', NONE, ['windows-print-screen']),
  s('windows', 'active-window-screenshot', 'Copy only the active window', 'Screenshot', 'Alt+PrtSc', NONE, ['windows-print-screen']),

  /* ═════════ macos — 30가지 ═════════ */

  /* ───── System ───── */
  s('macos', 'spotlight', 'Open Spotlight search', 'System', NONE, 'Cmd+Space', ['macos-input-source']),
  s('macos', 'input-source', 'Switch to the other input source', 'System', NONE, 'Ctrl+Space', ['macos-spotlight']),
  s('macos', 'toggle-dock', 'Show or hide the Dock', 'System', NONE, 'Cmd+Option+D'),
  s('macos', 'lock-screen', 'Lock the screen', 'System', NONE, 'Ctrl+Cmd+Q', ['macos-sleep']),
  s('macos', 'sleep', 'Put the Mac to sleep', 'System', NONE, 'Cmd+Option+Power', ['macos-lock-screen']),
  s('macos', 'emoji-picker', 'Open the emoji picker', 'System', NONE, 'Ctrl+Cmd+Space'),
  s('macos', 'function-keys', 'Use the top row as F1 to F12', 'System', NONE, 'Fn+F1'),

  /* ───── Apps ───── */
  s('macos', 'switch-app', 'Switch between apps', 'Apps', NONE, 'Cmd+Tab', ['macos-switch-window']),
  s('macos', 'switch-window', 'Switch between windows of one app', 'Apps', NONE, 'Cmd+`', ['macos-switch-app']),
  s('macos', 'quit-app', 'Quit the app', 'Apps', NONE, 'Cmd+Q', ['macos-close-window']),
  s('macos', 'close-window', 'Close the window', 'Apps', NONE, 'Cmd+W', ['macos-quit-app']),
  s('macos', 'force-quit', 'Open Force Quit', 'Apps', NONE, 'Cmd+Option+Esc', ['macos-quit-app']),
  s('macos', 'preferences', 'Open the settings of the app', 'Apps', NONE, 'Cmd+Comma'),

  /* ───── Window ───── */
  s('macos', 'hide-app', 'Hide the front app', 'Window', NONE, 'Cmd+H', ['macos-hide-others', 'macos-minimize']),
  s('macos', 'hide-others', 'Hide every other app', 'Window', NONE, 'Cmd+Option+H', ['macos-hide-app']),
  s('macos', 'minimize', 'Minimise the window to the Dock', 'Window', NONE, 'Cmd+M', ['macos-hide-app']),
  s('macos', 'fullscreen', 'Enter or leave full screen', 'Window', NONE, 'Ctrl+Cmd+F'),
  s('macos', 'switch-space', 'Move to the next desktop space', 'Window', NONE, 'Ctrl+Right', ['macos-fullscreen']),

  /* ───── Screenshot ───── */
  s('macos', 'screenshot-full', 'Screenshot the whole screen', 'Screenshot', NONE, 'Cmd+Shift+3', ['macos-screenshot-selection']),
  s('macos', 'screenshot-selection', 'Screenshot a part you drag', 'Screenshot', NONE, 'Cmd+Shift+4', ['macos-screenshot-to-clipboard']),
  s('macos', 'screenshot-toolbar', 'Open the screenshot toolbar', 'Screenshot', NONE, 'Cmd+Shift+5', ['macos-screenshot-selection']),
  s('macos', 'screenshot-to-clipboard', 'Screenshot straight to the clipboard', 'Screenshot', NONE, 'Cmd+Ctrl+Shift+4', ['macos-screenshot-selection']),

  /* ───── Finder ───── */
  s('macos', 'go-to-folder', 'Go to a folder by typing its path', 'Finder', NONE, 'Cmd+Shift+G', ['macos-show-hidden-files']),
  s('macos', 'show-hidden-files', 'Show the hidden files', 'Finder', NONE, 'Cmd+Shift+Period', ['macos-go-to-folder']),
  s('macos', 'enclosing-folder', 'Go up one folder', 'Finder', NONE, 'Cmd+Up'),
  s('macos', 'move-to-trash', 'Move the item to the Trash', 'Finder', NONE, 'Cmd+Delete', ['macos-empty-trash']),
  s('macos', 'empty-trash', 'Empty the Trash', 'Finder', NONE, 'Cmd+Shift+Delete', ['macos-move-to-trash']),
  s('macos', 'new-folder', 'Create a new folder', 'Finder', NONE, 'Cmd+Shift+N'),
  s('macos', 'get-info', 'Open Get Info', 'Finder', NONE, 'Cmd+I'),
  s('macos', 'move-file', 'Move a file you copied', 'Finder', NONE, 'Cmd+Option+V', ['macos-get-info']),
];
