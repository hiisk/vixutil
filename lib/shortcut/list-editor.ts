/**
 * 편집기·터미널·슬랙 단축키 161가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Shift+P는 어느
 * 나라에서든 Ctrl+Shift+P이고 Cmd는 Cmd다. 그래서 여기에는 옮길 것이 없는 것만
 * 둔다 — 열 언어로 쓸 한 문장은 desc-editor.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 손대지 않은 기본 배치에서 실제로 있는 것만 싣는다. 확인하지 못한 조합은
 * 적지 않는다 — 참고 페이지에서 틀린 키 한 줄은 빠진 키 열 줄보다 나쁘다.
 * vscode는 공식 치트시트(Windows·macOS) 두 장, slack은 공식 도움말 문서,
 * terminal은 GNU readline의 emacs 배치가 근거다. 기본 키가 없는 것 — vscode의
 * git stage와 duplicate selection, slack의 방해 금지·통화·채널 만들기·왼쪽
 * 사이드바 접기 — 은 지어내지 않고 아예 뺐다. tmux는 셸 줄 편집과 섞이면
 * 헷갈리므로(Ctrl+B가 접두어로 먹힌다) 이 파일에 넣지 않았다.
 *
 * 윈도우와 맥이 갈라지는 자리는 그 자리에 두 꼴을 다 적는다 — 맥의 Replace가
 * Cmd+H가 아니고(그건 앱 감추기다) Cmd+Option+F인 것, vscode의 뒤로 가기가
 * 윈도우는 Alt+Left인데 맥은 Ctrl+-인 것, slack의 히스토리가 윈도우는
 * Alt+Left/Right인데 맥은 Cmd+[ 와 Cmd+] 인 것이 실제로 사람을 넘어뜨린다.
 *
 * 조합 표기는 한 줄로 맞춘다 — 사이에 빈칸을 두지 않고 +로 잇고, 차례로 이어
 * 누르는 것(코드)만 빈칸으로 띄운다: 'Ctrl+K Ctrl+S'. 수식 키 순서는
 * Ctrl → Cmd → Shift → Alt(맥은 Option)이다.
 */
import type { ScItem, ScApp } from './types.ts';

/** 앱 이름이 슬러그 앞에 붙는다 — mk('vscode')('find', …) → 'vscode-find' */
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

const v = mk('vscode');
const t = mk('terminal');
const k = mk('slack');

export const SC_EDITOR: ScItem[] = [
  /* ═════════ vscode ═════════ */

  /* ───────── Navigation ───────── */
  v('command-palette', 'Command palette', 'Ctrl+Shift+P', 'Cmd+Shift+P', 'Navigation',
    ['vscode-quick-open', 'vscode-keyboard-shortcuts']),
  v('quick-open', 'Go to file', 'Ctrl+P', 'Cmd+P', 'Navigation',
    ['vscode-command-palette', 'vscode-go-to-line', 'vscode-go-to-symbol-in-workspace']),
  v('go-to-line', 'Go to line', 'Ctrl+G', 'Ctrl+G', 'Navigation', ['vscode-quick-open']),
  v('go-to-symbol-in-file', 'Go to symbol in file', 'Ctrl+Shift+O', 'Cmd+Shift+O', 'Navigation',
    ['vscode-go-to-symbol-in-workspace', 'vscode-go-to-definition']),
  v('go-to-symbol-in-workspace', 'Go to symbol in workspace', 'Ctrl+T', 'Cmd+T', 'Navigation',
    ['vscode-go-to-symbol-in-file']),
  v('go-to-definition', 'Go to definition', 'F12', 'F12', 'Navigation',
    ['vscode-peek-definition', 'vscode-go-back', 'vscode-rename-symbol']),
  v('peek-definition', 'Peek definition', 'Alt+F12', 'Option+F12', 'Navigation',
    ['vscode-go-to-definition']),
  v('go-back', 'Go back', 'Alt+Left', 'Ctrl+-', 'Navigation', ['vscode-go-forward']),
  v('go-forward', 'Go forward', 'Alt+Right', 'Ctrl+Shift+-', 'Navigation', ['vscode-go-back']),
  v('jump-to-matching-bracket', 'Jump to matching bracket', 'Ctrl+Shift+\\', 'Cmd+Shift+\\', 'Navigation',
    ['vscode-expand-selection']),
  v('next-problem', 'Next problem', 'F8', 'F8', 'Navigation',
    ['vscode-previous-problem', 'vscode-show-problems', 'vscode-quick-fix']),
  v('previous-problem', 'Previous problem', 'Shift+F8', 'Shift+F8', 'Navigation',
    ['vscode-next-problem']),

  /* ───────── Search ───────── */
  v('find', 'Find in this file', 'Ctrl+F', 'Cmd+F', 'Search',
    ['vscode-find-next', 'vscode-replace', 'vscode-find-in-files']),
  v('find-next', 'Find next', 'F3', 'Cmd+G', 'Search', ['vscode-find', 'vscode-find-previous']),
  v('find-previous', 'Find previous', 'Shift+F3', 'Cmd+Shift+G', 'Search', ['vscode-find-next']),
  v('replace', 'Replace in this file', 'Ctrl+H', 'Cmd+Option+F', 'Search',
    ['vscode-find', 'vscode-replace-in-files', 'vscode-select-all-matches']),
  v('find-in-files', 'Find in all files', 'Ctrl+Shift+F', 'Cmd+Shift+F', 'Search',
    ['vscode-replace-in-files', 'vscode-find']),
  v('replace-in-files', 'Replace in all files', 'Ctrl+Shift+H', 'Cmd+Shift+H', 'Search',
    ['vscode-find-in-files', 'vscode-replace']),

  /* ───────── Selection ───────── */
  v('add-cursor-with-click', 'Add a cursor with the mouse', 'Alt+Click', 'Option+Click', 'Selection',
    ['vscode-add-cursor-below', 'vscode-add-cursor-next-match']),
  v('add-cursor-above', 'Add cursor above', 'Ctrl+Alt+Up', 'Cmd+Option+Up', 'Selection',
    ['vscode-add-cursor-below', 'vscode-add-cursor-with-click']),
  v('add-cursor-below', 'Add cursor below', 'Ctrl+Alt+Down', 'Cmd+Option+Down', 'Selection',
    ['vscode-add-cursor-above', 'vscode-cursor-at-line-ends']),
  v('add-cursor-next-match', 'Add cursor at next occurrence', 'Ctrl+D', 'Cmd+D', 'Selection',
    ['vscode-select-all-matches', 'vscode-select-all-of-word']),
  v('select-all-matches', 'Select every occurrence of the selection', 'Ctrl+Shift+L', 'Cmd+Shift+L', 'Selection',
    ['vscode-add-cursor-next-match', 'vscode-select-all-of-word', 'vscode-rename-symbol']),
  v('select-all-of-word', 'Select every occurrence of the word', 'Ctrl+F2', 'Cmd+F2', 'Selection',
    ['vscode-select-all-matches', 'vscode-rename-symbol']),
  v('cursor-at-line-ends', 'Cursor at the end of every selected line', 'Shift+Alt+I', 'Shift+Option+I', 'Selection',
    ['vscode-add-cursor-below', 'vscode-column-selection']),
  v('column-selection', 'Column selection', 'Ctrl+Shift+Alt+Down', 'Cmd+Shift+Option+Down', 'Selection',
    ['vscode-cursor-at-line-ends', 'vscode-add-cursor-with-click']),
  v('select-line', 'Select the current line', 'Ctrl+L', 'Cmd+L', 'Selection',
    ['vscode-delete-line', 'vscode-expand-selection']),
  v('expand-selection', 'Expand selection', 'Shift+Alt+Right', 'Ctrl+Cmd+Shift+Right', 'Selection',
    ['vscode-shrink-selection', 'vscode-jump-to-matching-bracket']),
  v('shrink-selection', 'Shrink selection', 'Shift+Alt+Left', 'Ctrl+Cmd+Shift+Left', 'Selection',
    ['vscode-expand-selection']),

  /* ───────── Editing ───────── */
  v('move-line-up', 'Move line up', 'Alt+Up', 'Option+Up', 'Editing',
    ['vscode-move-line-down', 'vscode-copy-line-up']),
  v('move-line-down', 'Move line down', 'Alt+Down', 'Option+Down', 'Editing',
    ['vscode-move-line-up', 'vscode-copy-line-down']),
  v('copy-line-up', 'Copy line up', 'Shift+Alt+Up', 'Shift+Option+Up', 'Editing',
    ['vscode-copy-line-down', 'vscode-move-line-up']),
  v('copy-line-down', 'Copy line down', 'Shift+Alt+Down', 'Shift+Option+Down', 'Editing',
    ['vscode-copy-line-up', 'vscode-move-line-down']),
  v('delete-line', 'Delete line', 'Ctrl+Shift+K', 'Cmd+Shift+K', 'Editing',
    ['vscode-select-line', 'vscode-insert-line-below']),
  v('insert-line-below', 'Insert line below', 'Ctrl+Enter', 'Cmd+Enter', 'Editing',
    ['vscode-insert-line-above']),
  v('insert-line-above', 'Insert line above', 'Ctrl+Shift+Enter', 'Cmd+Shift+Enter', 'Editing',
    ['vscode-insert-line-below']),
  v('indent-line', 'Indent line', 'Ctrl+]', 'Cmd+]', 'Editing',
    ['vscode-outdent-line', 'vscode-format-document']),
  v('outdent-line', 'Outdent line', 'Ctrl+[', 'Cmd+[', 'Editing', ['vscode-indent-line']),
  v('toggle-line-comment', 'Toggle line comment', 'Ctrl+/', 'Cmd+/', 'Editing',
    ['vscode-toggle-block-comment', 'vscode-change-language-mode']),
  v('toggle-block-comment', 'Toggle block comment', 'Shift+Alt+A', 'Shift+Option+A', 'Editing',
    ['vscode-toggle-line-comment']),
  v('trim-trailing-whitespace', 'Trim trailing whitespace', 'Ctrl+K Ctrl+X', 'Cmd+K Cmd+X', 'Editing',
    ['vscode-format-document']),

  /* ───────── Code ───────── */
  v('format-document', 'Format document', 'Shift+Alt+F', 'Shift+Option+F', 'Code',
    ['vscode-format-selection', 'vscode-trim-trailing-whitespace']),
  v('format-selection', 'Format selection', 'Ctrl+K Ctrl+F', 'Cmd+K Cmd+F', 'Code',
    ['vscode-format-document']),
  v('rename-symbol', 'Rename symbol', 'F2', 'F2', 'Code',
    ['vscode-select-all-matches', 'vscode-go-to-definition']),
  v('quick-fix', 'Quick fix', 'Ctrl+.', 'Cmd+.', 'Code',
    ['vscode-next-problem', 'vscode-trigger-suggest']),
  v('trigger-suggest', 'Trigger suggestions', 'Ctrl+Space', 'Ctrl+Space', 'Code',
    ['vscode-parameter-hints', 'vscode-quick-fix']),
  v('parameter-hints', 'Parameter hints', 'Ctrl+Shift+Space', 'Cmd+Shift+Space', 'Code',
    ['vscode-trigger-suggest']),

  /* ───────── Folding ───────── */
  v('fold', 'Fold region', 'Ctrl+Shift+[', 'Cmd+Option+[', 'Folding',
    ['vscode-unfold', 'vscode-fold-all']),
  v('unfold', 'Unfold region', 'Ctrl+Shift+]', 'Cmd+Option+]', 'Folding',
    ['vscode-fold', 'vscode-unfold-all']),
  v('fold-all', 'Fold all regions', 'Ctrl+K Ctrl+0', 'Cmd+K Cmd+0', 'Folding',
    ['vscode-unfold-all', 'vscode-fold']),
  v('unfold-all', 'Unfold all regions', 'Ctrl+K Ctrl+J', 'Cmd+K Cmd+J', 'Folding',
    ['vscode-fold-all', 'vscode-unfold']),

  /* ───────── Editors ───────── */
  v('split-editor', 'Split editor', 'Ctrl+\\', 'Cmd+\\', 'Editors',
    ['vscode-close-editor', 'vscode-next-editor']),
  v('close-editor', 'Close editor', 'Ctrl+W', 'Cmd+W', 'Editors',
    ['vscode-reopen-closed-editor', 'vscode-split-editor']),
  v('reopen-closed-editor', 'Reopen closed editor', 'Ctrl+Shift+T', 'Cmd+Shift+T', 'Editors',
    ['vscode-close-editor']),
  v('next-editor', 'Switch to another open editor', 'Ctrl+Tab', 'Ctrl+Tab', 'Editors',
    ['vscode-quick-open', 'vscode-split-editor']),

  /* ───────── View ───────── */
  v('toggle-sidebar', 'Toggle the sidebar', 'Ctrl+B', 'Cmd+B', 'View',
    ['vscode-toggle-panel', 'vscode-zen-mode']),
  v('toggle-panel', 'Toggle the bottom panel', 'Ctrl+J', 'Cmd+J', 'View',
    ['vscode-toggle-terminal', 'vscode-toggle-sidebar']),
  v('zen-mode', 'Zen mode', 'Ctrl+K Z', 'Cmd+K Z', 'View', ['vscode-toggle-sidebar']),
  v('toggle-word-wrap', 'Toggle word wrap', 'Alt+Z', 'Option+Z', 'View', ['vscode-settings']),
  v('show-problems', 'Show the problems panel', 'Ctrl+Shift+M', 'Cmd+Shift+M', 'View',
    ['vscode-next-problem', 'vscode-toggle-panel']),
  v('source-control', 'Source control view', 'Ctrl+Shift+G', 'Ctrl+Shift+G', 'View',
    ['vscode-extensions', 'vscode-toggle-sidebar']),
  v('extensions', 'Extensions view', 'Ctrl+Shift+X', 'Cmd+Shift+X', 'View',
    ['vscode-source-control', 'vscode-settings']),
  v('settings', 'Open settings', 'Ctrl+,', 'Cmd+,', 'View',
    ['vscode-keyboard-shortcuts', 'vscode-command-palette']),
  v('keyboard-shortcuts', 'Keyboard shortcuts editor', 'Ctrl+K Ctrl+S', 'Cmd+K Cmd+S', 'View',
    ['vscode-settings', 'vscode-command-palette']),
  v('change-language-mode', 'Change the file language', 'Ctrl+K M', 'Cmd+K M', 'View',
    ['vscode-toggle-line-comment', 'vscode-markdown-preview']),
  v('markdown-preview', 'Markdown preview', 'Ctrl+Shift+V', 'Cmd+Shift+V', 'View',
    ['vscode-change-language-mode', 'vscode-split-editor']),

  /* ───────── Terminal ───────── */
  v('toggle-terminal', 'Toggle the integrated terminal', 'Ctrl+`', 'Ctrl+`', 'Terminal',
    ['vscode-new-terminal', 'vscode-toggle-panel']),
  v('new-terminal', 'New terminal', 'Ctrl+Shift+`', 'Ctrl+Shift+`', 'Terminal',
    ['vscode-toggle-terminal']),

  /* ═════════ terminal — bash·zsh 줄 편집(readline emacs 배치) ═════════ */

  /* ───────── Cursor ───────── */
  t('line-start', 'Move to the start of the line', 'Ctrl+A', 'Ctrl+A', 'Cursor',
    ['terminal-line-end', 'terminal-kill-to-start']),
  t('line-end', 'Move to the end of the line', 'Ctrl+E', 'Ctrl+E', 'Cursor',
    ['terminal-line-start', 'terminal-kill-to-end']),
  t('char-back', 'Move back one character', 'Ctrl+B', 'Ctrl+B', 'Cursor',
    ['terminal-char-forward', 'terminal-word-back']),
  t('char-forward', 'Move forward one character', 'Ctrl+F', 'Ctrl+F', 'Cursor',
    ['terminal-char-back', 'terminal-word-forward']),
  t('word-back', 'Move back one word', 'Alt+B', 'Option+B', 'Cursor',
    ['terminal-word-forward', 'terminal-meta-with-esc']),
  t('word-forward', 'Move forward one word', 'Alt+F', 'Option+F', 'Cursor',
    ['terminal-word-back', 'terminal-kill-word-forward']),
  t('set-mark', 'Set the mark', 'Ctrl+Space', 'Ctrl+Space', 'Cursor', ['terminal-swap-mark']),
  t('swap-mark', 'Jump between the mark and the cursor', 'Ctrl+X Ctrl+X', 'Ctrl+X Ctrl+X', 'Cursor',
    ['terminal-set-mark', 'terminal-line-start']),

  /* ───────── Killing ───────── */
  t('kill-to-start', 'Cut back to the start of the line', 'Ctrl+U', 'Ctrl+U', 'Killing',
    ['terminal-kill-to-end', 'terminal-yank']),
  t('kill-to-end', 'Cut to the end of the line', 'Ctrl+K', 'Ctrl+K', 'Killing',
    ['terminal-kill-to-start', 'terminal-yank']),
  t('kill-word-back', 'Cut the word before the cursor', 'Ctrl+W', 'Ctrl+W', 'Killing',
    ['terminal-kill-word-back-readline', 'terminal-kill-word-forward']),
  t('kill-word-back-readline', 'Cut the word before the cursor, by word characters', 'Alt+Backspace', 'Option+Backspace', 'Killing',
    ['terminal-kill-word-back']),
  t('kill-word-forward', 'Cut the word after the cursor', 'Alt+D', 'Option+D', 'Killing',
    ['terminal-kill-word-back', 'terminal-word-forward']),
  t('yank', 'Paste what you last cut', 'Ctrl+Y', 'Ctrl+Y', 'Killing',
    ['terminal-yank-pop', 'terminal-kill-to-start']),
  t('yank-pop', 'Cycle to an earlier cut', 'Alt+Y', 'Option+Y', 'Killing', ['terminal-yank']),

  /* ───────── Editing ───────── */
  t('transpose-chars', 'Swap two characters', 'Ctrl+T', 'Ctrl+T', 'Editing',
    ['terminal-transpose-words', 'terminal-undo']),
  t('transpose-words', 'Swap two words', 'Alt+T', 'Option+T', 'Editing',
    ['terminal-transpose-chars']),
  t('undo', 'Undo the last edit to the line', 'Ctrl+_', 'Ctrl+_', 'Editing',
    ['terminal-transpose-chars', 'terminal-kill-to-start']),
  t('literal-next', 'Insert the next key literally', 'Ctrl+V', 'Ctrl+V', 'Editing',
    ['terminal-complete']),
  t('accept-line', 'Run the line', 'Ctrl+J', 'Ctrl+J', 'Editing',
    ['terminal-operate-and-get-next']),
  t('backspace', 'Delete the character before the cursor', 'Ctrl+H', 'Ctrl+H', 'Editing',
    ['terminal-eof', 'terminal-kill-word-back']),
  t('uppercase-word', 'Upper-case the word', 'Alt+U', 'Option+U', 'Editing',
    ['terminal-lowercase-word', 'terminal-capitalize-word']),
  t('lowercase-word', 'Lower-case the word', 'Alt+L', 'Option+L', 'Editing',
    ['terminal-uppercase-word']),
  t('capitalize-word', 'Capitalize the word', 'Alt+C', 'Option+C', 'Editing',
    ['terminal-uppercase-word']),
  t('edit-in-editor', 'Open the line in your editor', 'Ctrl+X Ctrl+E', 'Ctrl+X Ctrl+E', 'Editing',
    ['terminal-undo', 'terminal-accept-line']),
  t('meta-with-esc', 'Use Esc when Alt is not the Meta key', 'Esc B', 'Esc B', 'Editing',
    ['terminal-word-back', 'terminal-kill-word-forward']),

  /* ───────── History ───────── */
  t('reverse-search', 'Search backwards through history', 'Ctrl+R', 'Ctrl+R', 'History',
    ['terminal-abort-search', 'terminal-history-previous']),
  t('abort-search', 'Abandon the search and restore the line', 'Ctrl+G', 'Ctrl+G', 'History',
    ['terminal-reverse-search']),
  t('history-previous', 'Previous command', 'Ctrl+P', 'Ctrl+P', 'History',
    ['terminal-history-next', 'terminal-reverse-search']),
  t('history-next', 'Next command', 'Ctrl+N', 'Ctrl+N', 'History',
    ['terminal-history-previous']),
  t('last-command', 'Repeat the last command', '!!', '!!', 'History',
    ['terminal-last-argument', 'terminal-history-previous']),
  t('last-argument', 'Reuse the last argument', '!$', '!$', 'History',
    ['terminal-yank-last-arg', 'terminal-last-command']),
  t('yank-last-arg', 'Insert the last argument now', 'Alt+.', 'Option+.', 'History',
    ['terminal-last-argument']),
  t('operate-and-get-next', 'Run the line and bring up the next one', 'Ctrl+O', 'Ctrl+O', 'History',
    ['terminal-history-previous', 'terminal-accept-line']),

  /* ───────── Completion ───────── */
  t('complete', 'Complete the word', 'Tab', 'Tab', 'Completion',
    ['terminal-list-completions', 'terminal-insert-completions']),
  t('list-completions', 'List every completion', 'Alt+?', 'Option+?', 'Completion',
    ['terminal-complete']),
  t('insert-completions', 'Insert every completion', 'Alt+*', 'Option+*', 'Completion',
    ['terminal-complete', 'terminal-list-completions']),

  /* ───────── Signals ───────── */
  t('interrupt', 'Interrupt the running command', 'Ctrl+C', 'Ctrl+C', 'Signals',
    ['terminal-suspend', 'terminal-eof']),
  t('eof', 'Send end of file', 'Ctrl+D', 'Ctrl+D', 'Signals',
    ['terminal-interrupt', 'terminal-backspace']),
  t('suspend', 'Suspend the running command', 'Ctrl+Z', 'Ctrl+Z', 'Signals',
    ['terminal-interrupt']),

  /* ───────── Screen ───────── */
  t('clear-screen', 'Clear the screen', 'Ctrl+L', 'Ctrl+L', 'Screen', ['terminal-stop-output']),
  t('stop-output', 'Freeze the output', 'Ctrl+S', 'Ctrl+S', 'Screen',
    ['terminal-resume-output', 'terminal-reverse-search']),
  t('resume-output', 'Unfreeze the output', 'Ctrl+Q', 'Ctrl+Q', 'Screen',
    ['terminal-stop-output']),

  /* ═════════ slack ═════════ */

  /* ───────── Basics ───────── */
  k('all-shortcuts', 'Show every shortcut', 'Ctrl+/', 'Cmd+/', 'Basics',
    ['slack-quick-switcher', 'slack-preferences']),
  k('preferences', 'Open preferences', 'Ctrl+,', 'Cmd+,', 'Basics',
    ['slack-set-status', 'slack-all-shortcuts']),
  k('set-status', 'Set your status', 'Ctrl+Shift+Y', 'Cmd+Shift+Y', 'Basics',
    ['slack-preferences']),
  k('compose-message', 'Compose a new message', 'Ctrl+N', 'Cmd+N', 'Basics',
    ['slack-quick-switcher', 'slack-new-line']),
  k('upload-file', 'Upload a file', 'Ctrl+O', 'Cmd+O', 'Basics', ['slack-compose-message']),

  /* ───────── Navigation ───────── */
  k('quick-switcher', 'Jump to a channel or person', 'Ctrl+K', 'Cmd+K', 'Navigation',
    ['slack-search', 'slack-browse-channels', 'slack-all-shortcuts']),
  k('search', 'Search all of Slack', 'Ctrl+G', 'Cmd+G', 'Navigation',
    ['slack-search-conversation', 'slack-quick-switcher']),
  k('search-conversation', 'Search this conversation', 'Ctrl+F', 'Cmd+F', 'Navigation',
    ['slack-search']),
  k('previous-channel', 'Previous channel in the sidebar', 'Alt+Up', 'Option+Up', 'Navigation',
    ['slack-next-channel', 'slack-previous-unread']),
  k('next-channel', 'Next channel in the sidebar', 'Alt+Down', 'Option+Down', 'Navigation',
    ['slack-previous-channel', 'slack-next-unread']),
  k('history-back', 'Go back', 'Alt+Left', 'Cmd+[', 'Navigation', ['slack-history-forward']),
  k('history-forward', 'Go forward', 'Alt+Right', 'Cmd+]', 'Navigation', ['slack-history-back']),

  /* ───────── Unreads ───────── */
  k('jump-to-unread', 'Jump to the first unread message', 'Ctrl+J', 'Cmd+J', 'Unreads',
    ['slack-mark-read', 'slack-all-unreads-view']),
  k('previous-unread', 'Previous unread channel', 'Shift+Alt+Up', 'Shift+Option+Up', 'Unreads',
    ['slack-next-unread', 'slack-previous-channel']),
  k('next-unread', 'Next unread channel', 'Shift+Alt+Down', 'Shift+Option+Down', 'Unreads',
    ['slack-previous-unread', 'slack-next-channel']),
  k('mark-read', 'Mark this conversation read', 'Esc', 'Esc', 'Unreads',
    ['slack-mark-all-read', 'slack-mark-above-unread']),
  k('mark-all-read', 'Mark everything read', 'Shift+Esc', 'Shift+Esc', 'Unreads',
    ['slack-mark-read']),
  k('all-unreads-view', 'Open the unreads view', 'Ctrl+Shift+A', 'Cmd+Shift+A', 'Unreads',
    ['slack-jump-to-unread', 'slack-threads-view']),

  /* ───────── Views ───────── */
  k('home-view', 'Open the home view', 'Ctrl+Shift+1', 'Ctrl+1', 'Views',
    ['slack-dms-view', 'slack-activity-view']),
  k('dms-view', 'Open direct messages', 'Ctrl+Shift+K', 'Cmd+Shift+K', 'Views',
    ['slack-home-view', 'slack-quick-switcher']),
  k('activity-view', 'Open activity', 'Ctrl+Shift+M', 'Cmd+Shift+M', 'Views',
    ['slack-threads-view', 'slack-home-view']),
  k('threads-view', 'Open threads', 'Ctrl+Shift+T', 'Cmd+Shift+T', 'Views',
    ['slack-reply-in-thread', 'slack-activity-view']),
  k('browse-channels', 'Browse channels', 'Ctrl+Shift+L', 'Cmd+Shift+L', 'Views',
    ['slack-quick-switcher', 'slack-conversation-details']),
  k('hide-right-sidebar', 'Hide the right pane', 'Ctrl+.', 'Cmd+.', 'Views',
    ['slack-conversation-details']),
  k('conversation-details', 'Open conversation details', 'Ctrl+Shift+I', 'Cmd+Shift+I', 'Views',
    ['slack-hide-right-sidebar', 'slack-browse-channels']),

  /* ───────── Workspaces ───────── */
  k('workspace-switcher', 'Show the workspace switcher', 'Ctrl+Shift+S', 'Cmd+Shift+S', 'Workspaces',
    ['slack-next-workspace']),
  k('next-workspace', 'Next workspace', 'Ctrl+Tab', 'Ctrl+Tab', 'Workspaces',
    ['slack-previous-workspace', 'slack-workspace-switcher']),
  k('previous-workspace', 'Previous workspace', 'Ctrl+Shift+Tab', 'Ctrl+Shift+Tab', 'Workspaces',
    ['slack-next-workspace']),

  /* ───────── Huddles ───────── */
  k('huddle', 'Start or leave a huddle', 'Ctrl+Shift+H', 'Cmd+Shift+H', 'Huddles',
    ['slack-huddle-mute']),
  k('huddle-mute', 'Mute or unmute in a huddle', 'Ctrl+Shift+Space', 'Cmd+Shift+Space', 'Huddles',
    ['slack-huddle']),

  /* ───────── Message actions ───────── */
  k('edit-message', 'Edit your message', 'E', 'E', 'Message actions',
    ['slack-delete-message', 'slack-new-line']),
  k('delete-message', 'Delete your message', 'Delete', 'Delete', 'Message actions',
    ['slack-edit-message', 'slack-undo']),
  k('reply-in-thread', 'Reply in a thread', 'T', 'T', 'Message actions',
    ['slack-threads-view', 'slack-react']),
  k('forward-message', 'Forward the message', 'F', 'F', 'Message actions',
    ['slack-save-message']),
  k('pin-message', 'Pin or unpin the message', 'P', 'P', 'Message actions',
    ['slack-save-message', 'slack-remind-me']),
  k('save-message', 'Save the message for later', 'A', 'A', 'Message actions',
    ['slack-pin-message', 'slack-remind-me']),
  k('mark-above-unread', 'Mark everything above unread', 'U', 'U', 'Message actions',
    ['slack-mark-read', 'slack-jump-to-unread']),
  k('remind-me', 'Get a reminder about the message', 'M', 'M', 'Message actions',
    ['slack-save-message']),
  k('react', 'React with an emoji', 'R', 'R', 'Message actions',
    ['slack-reply-in-thread', 'slack-edit-message']),

  /* ───────── Formatting ───────── */
  k('new-line', 'Start a new line without sending', 'Shift+Enter', 'Shift+Enter', 'Formatting',
    ['slack-compose-message', 'slack-code-block']),
  k('bold', 'Bold', 'Ctrl+B', 'Cmd+B', 'Formatting', ['slack-italic', 'slack-strikethrough']),
  k('italic', 'Italic', 'Ctrl+I', 'Cmd+I', 'Formatting', ['slack-bold']),
  k('strikethrough', 'Strikethrough', 'Ctrl+Shift+X', 'Cmd+Shift+X', 'Formatting',
    ['slack-bold', 'slack-italic']),
  k('code', 'Inline code', 'Ctrl+Shift+C', 'Cmd+Shift+C', 'Formatting', ['slack-code-block']),
  k('code-block', 'Code block', 'Ctrl+Shift+Alt+C', 'Cmd+Shift+Option+C', 'Formatting',
    ['slack-code', 'slack-new-line']),
  k('quote', 'Quote', 'Ctrl+Shift+9', 'Cmd+Shift+9', 'Formatting', ['slack-code-block']),
  k('link', 'Turn the selection into a link', 'Ctrl+Shift+U', 'Cmd+Shift+U', 'Formatting',
    ['slack-bold']),
  k('bulleted-list', 'Bulleted list', 'Ctrl+Shift+8', 'Cmd+Shift+8', 'Formatting',
    ['slack-numbered-list']),
  k('numbered-list', 'Numbered list', 'Ctrl+Shift+7', 'Cmd+Shift+7', 'Formatting',
    ['slack-bulleted-list']),
  k('undo', 'Undo in the message box', 'Ctrl+Z', 'Cmd+Z', 'Formatting',
    ['slack-edit-message', 'slack-delete-message']),
];
