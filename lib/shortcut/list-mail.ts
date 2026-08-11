/**
 * 메일·메모 단축키 112가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Shift+R은 어느
 * 나라에서든 Ctrl+Shift+R이고 Cmd는 Cmd다. 그래서 여기에는 옮길 것이 없는 것만
 * 둔다 — 열 언어로 쓸 한 문장은 desc-mail.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 만든 곳이 지금 문서로 밝혀 둔 기본값만 싣는다. 확인하지 못한 조합은 적지
 * 않는다 — 틀린 조합 한 줄이 빠진 조합 열 줄보다 나쁘다. 셋 다 단축키를 자주
 * 바꾸는 제품이라 근거를 좁게 잡았다: gmail은 구글 공식 단축키 문서, outlook은
 * 마이크로소프트의 윈도우용·맥용 두 문서, notion은 노션 공식 도움말이다.
 *
 * 지어내지 않고 아예 뺀 것들 —
 *   · gmail의 "보내고 보관"(Send & Archive): 단추는 있지만 공식 문서에 키가 없다.
 *   · outlook의 "다음 읽지 않은 메일": 윈도우 문서가 Ctrl+.(다음 열린 항목)와
 *     따로 두지 않고, 판마다 Ctrl+> 라는 말도 있어 한 조합으로 못 적는다.
 *   · outlook의 부재중 자동 회신(Out of Office): 설정 화면이라 단축키가 없다.
 *   · notion의 콜아웃: 마크다운 방아쇠가 없고 슬래시 메뉴로만 만든다 —
 *     그래서 그 줄의 조합은 '/callout Enter'로 적었다.
 *
 * 윈도우와 맥이 갈라지는 자리가 이 표의 핵심이다. outlook의 전달은 윈도우가
 * Ctrl+F인데 맥은 Cmd+J이고(웹은 또 Ctrl+Shift+F다), 읽음 표시는 윈도우가
 * Ctrl+Q인데 맥은 Cmd+T다. notion의 블록 바꾸기는 윈도우가 Ctrl+Shift+숫자,
 * 맥이 Cmd+Option+숫자다. 한쪽에만 있는 기능은 반대쪽 칸을 NONE으로 두고
 * 설명에서 그 까닭을 밝힌다.
 *
 * 조합 표기는 한 줄로 맞춘다 — 사이에 빈칸을 두지 않고 +로 잇고, 차례로 이어
 * 누르는 것만 빈칸으로 띄운다: gmail의 받은편지함 이동은 'g i'다. 수식 키
 * 순서는 Ctrl → Cmd → Shift → Alt(맥은 Option)이다. gmail의 낱자 단축키는
 * 공식 문서대로 소문자로 적는다 — 대문자로 적으면 Shift를 누르는 것처럼 보이고
 * 실제로 Shift+R은 다른 기능이다.
 *
 * 앱은 셋이다 — gmail·outlook·notion.
 */
import type { ScItem, ScApp } from './types.ts';
import { NA } from './types.ts';

/** 그 플랫폼에 기본 조합이 없다는 표시 — 모른다는 뜻이 아니라 없다는 뜻이다 */
const NONE = NA;

/** slug은 앱 열쇠와 꼬리표를 이어 만든다 — ('gmail','archive') → 'gmail-archive' */
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

export const SC_MAIL: ScItem[] = [
  /* ═════════ gmail — 38가지 ═════════ */

  /* ───── Compose ───── */
  s('gmail', 'compose', 'Compose a new message', 'Compose', 'c', 'c', ['gmail-compose-new-tab', 'gmail-send', 'gmail-shortcut-help']),
  s('gmail', 'compose-new-tab', 'Compose in a new tab', 'Compose', 'd', 'd', ['gmail-compose']),
  s('gmail', 'send', 'Send the message', 'Compose', 'Ctrl+Enter', 'Cmd+Enter', ['gmail-compose', 'gmail-undo']),
  s('gmail', 'add-cc', 'Add Cc recipients', 'Compose', 'Ctrl+Shift+C', 'Cmd+Shift+C', ['gmail-add-bcc']),
  s('gmail', 'add-bcc', 'Add Bcc recipients', 'Compose', 'Ctrl+Shift+B', 'Cmd+Shift+B', ['gmail-add-cc']),
  s('gmail', 'insert-link', 'Insert a link', 'Compose', 'Ctrl+K', 'Cmd+K', ['gmail-compose']),

  /* ───── Actions ───── */
  s('gmail', 'archive', 'Archive the conversation', 'Actions', 'e', 'e', ['gmail-delete', 'gmail-mute', 'gmail-undo']),
  s('gmail', 'delete', 'Move the conversation to Trash', 'Actions', '#', '#', ['gmail-archive', 'gmail-undo']),
  s('gmail', 'mute', 'Mute the conversation', 'Actions', 'm', 'm', ['gmail-archive', 'gmail-snooze']),
  s('gmail', 'snooze', 'Snooze the conversation', 'Actions', 'b', 'b', ['gmail-archive', 'gmail-mute']),
  s('gmail', 'mark-read', 'Mark as read', 'Actions', 'Shift+I', 'Shift+I', ['gmail-mark-unread']),
  s('gmail', 'mark-unread', 'Mark as unread', 'Actions', 'Shift+U', 'Shift+U', ['gmail-mark-read']),
  s('gmail', 'star', 'Star the conversation', 'Actions', 's', 's', ['gmail-go-to-starred', 'gmail-select-conversation']),
  s('gmail', 'report-spam', 'Report as spam', 'Actions', '!', '!', ['gmail-delete', 'gmail-undo']),
  s('gmail', 'undo', 'Undo the last action', 'Actions', 'z', 'z', ['gmail-archive', 'gmail-delete']),

  /* ───── Respond ───── */
  s('gmail', 'reply', 'Reply', 'Respond', 'r', 'r', ['gmail-reply-all', 'gmail-forward', 'gmail-reply-new-window']),
  s('gmail', 'reply-all', 'Reply to everyone', 'Respond', 'a', 'a', ['gmail-reply', 'gmail-reply-all-new-window']),
  s('gmail', 'forward', 'Forward', 'Respond', 'f', 'f', ['gmail-reply', 'gmail-forward-new-window']),
  s('gmail', 'reply-new-window', 'Reply in a new window', 'Respond', 'Shift+R', 'Shift+R', ['gmail-reply']),
  s('gmail', 'reply-all-new-window', 'Reply to everyone in a new window', 'Respond', 'Shift+A', 'Shift+A', ['gmail-reply-all']),
  s('gmail', 'forward-new-window', 'Forward in a new window', 'Respond', 'Shift+F', 'Shift+F', ['gmail-forward']),

  /* ───── Reading ───── */
  s('gmail', 'next-message', 'Next message in the thread', 'Reading', 'n', 'n', ['gmail-previous-message', 'gmail-older-conversation']),
  s('gmail', 'previous-message', 'Previous message in the thread', 'Reading', 'p', 'p', ['gmail-next-message']),
  s('gmail', 'open-conversation', 'Open the conversation', 'Reading', 'o', 'o', ['gmail-back-to-list']),
  s('gmail', 'back-to-list', 'Back to the conversation list', 'Reading', 'u', 'u', ['gmail-open-conversation']),
  s('gmail', 'newer-conversation', 'Move to the newer conversation', 'Reading', 'k', 'k', ['gmail-older-conversation']),
  s('gmail', 'older-conversation', 'Move to the older conversation', 'Reading', 'j', 'j', ['gmail-newer-conversation']),

  /* ───── Navigation ───── */
  s('gmail', 'search-mail', 'Search mail', 'Navigation', '/', '/', ['gmail-go-to-inbox', 'gmail-shortcut-help']),
  s('gmail', 'go-to-inbox', 'Go to Inbox', 'Navigation', 'g i', 'g i', ['gmail-go-to-starred', 'gmail-go-to-sent', 'gmail-back-to-list']),
  s('gmail', 'go-to-starred', 'Go to Starred', 'Navigation', 'g s', 'g s', ['gmail-go-to-inbox', 'gmail-star']),
  s('gmail', 'go-to-sent', 'Go to Sent', 'Navigation', 'g t', 'g t', ['gmail-go-to-inbox', 'gmail-go-to-drafts']),
  s('gmail', 'go-to-drafts', 'Go to Drafts', 'Navigation', 'g d', 'g d', ['gmail-go-to-sent', 'gmail-compose']),
  s('gmail', 'go-to-label', 'Jump to a label', 'Navigation', 'g l', 'g l', ['gmail-label-as', 'gmail-go-to-inbox']),

  /* ───── Labels ───── */
  s('gmail', 'label-as', 'Open the label menu', 'Labels', 'l', 'l', ['gmail-go-to-label', 'gmail-move-to']),
  s('gmail', 'move-to', 'Open the move-to menu', 'Labels', 'v', 'v', ['gmail-label-as', 'gmail-archive']),
  s('gmail', 'select-conversation', 'Select the conversation', 'Labels', 'x', 'x', ['gmail-select-all', 'gmail-archive']),
  s('gmail', 'select-all', 'Select every conversation on the page', 'Labels', '* a', '* a', ['gmail-select-conversation']),
  s('gmail', 'shortcut-help', 'Show the shortcut list', 'Labels', '?', '?', ['gmail-compose', 'gmail-search-mail']),

  /* ═════════ outlook — 35가지 ═════════ */

  /* ───── Create ───── */
  s('outlook', 'new-message', 'New mail message', 'Create', 'Ctrl+Shift+M', 'Cmd+N', ['outlook-new-item', 'outlook-send', 'outlook-reply']),
  s('outlook', 'new-item', 'New item of the current type', 'Create', 'Ctrl+N', 'Cmd+N', ['outlook-new-message', 'outlook-new-appointment']),
  s('outlook', 'new-appointment', 'New calendar appointment', 'Create', 'Ctrl+Shift+A', 'Cmd+N', ['outlook-switch-to-calendar', 'outlook-new-item']),
  s('outlook', 'new-task', 'New task', 'Create', 'Ctrl+Shift+K', NONE, ['outlook-switch-to-tasks']),

  /* ───── Compose ───── */
  s('outlook', 'send', 'Send the message', 'Compose', 'Alt+S', 'Cmd+Enter', ['outlook-save-draft', 'outlook-new-message']),
  s('outlook', 'save-draft', 'Save the draft', 'Compose', 'Ctrl+S', 'Cmd+S', ['outlook-send']),
  s('outlook', 'insert-hyperlink', 'Insert a hyperlink', 'Compose', 'Ctrl+K', 'Cmd+K', ['outlook-address-book']),
  s('outlook', 'address-book', 'Open the Address Book', 'Compose', 'Ctrl+Shift+B', NONE, ['outlook-insert-hyperlink', 'outlook-switch-to-people']),

  /* ───── Respond ───── */
  s('outlook', 'reply', 'Reply', 'Respond', 'Ctrl+R', 'Cmd+R', ['outlook-reply-all', 'outlook-forward']),
  s('outlook', 'reply-all', 'Reply to everyone', 'Respond', 'Ctrl+Shift+R', 'Cmd+Shift+R', ['outlook-reply', 'outlook-forward']),
  s('outlook', 'forward', 'Forward', 'Respond', 'Ctrl+F', 'Cmd+J', ['outlook-reply', 'outlook-advanced-find']),
  s('outlook', 'reply-with-meeting', 'Reply with a meeting invitation', 'Respond', 'Ctrl+Alt+R', NONE, ['outlook-new-appointment', 'outlook-reply-all']),

  /* ───── Organize ───── */
  s('outlook', 'mark-read', 'Mark as read', 'Organize', 'Ctrl+Q', 'Cmd+T', ['outlook-mark-unread']),
  s('outlook', 'mark-unread', 'Mark as unread', 'Organize', 'Ctrl+U', 'Cmd+Shift+T', ['outlook-mark-read']),
  s('outlook', 'flag', 'Flag for follow up', 'Organize', 'Insert', 'Ctrl+1', ['outlook-mark-unread', 'outlook-move-to-folder']),
  s('outlook', 'delete', 'Delete the item', 'Organize', 'Delete', 'Delete', ['outlook-delete-permanently', 'outlook-move-to-folder']),
  s('outlook', 'delete-permanently', 'Delete without using Deleted Items', 'Organize', 'Shift+Delete', 'Shift+Delete', ['outlook-delete']),
  s('outlook', 'move-to-folder', 'Move to a folder', 'Organize', 'Ctrl+Shift+V', 'Cmd+Shift+M', ['outlook-copy-to-folder', 'outlook-go-to-folder']),
  s('outlook', 'copy-to-folder', 'Copy to a folder', 'Organize', 'Ctrl+Shift+Y', NONE, ['outlook-move-to-folder']),

  /* ───── Search ───── */
  s('outlook', 'search', 'Search the current folder', 'Search', 'Ctrl+E', 'Cmd+Option+F', ['outlook-advanced-find', 'outlook-find-in-message']),
  s('outlook', 'advanced-find', 'Open Advanced Find', 'Search', 'Ctrl+Shift+F', 'Cmd+Shift+F', ['outlook-search', 'outlook-forward']),
  s('outlook', 'find-in-message', 'Find text inside the open message', 'Search', 'F4', 'Cmd+F', ['outlook-search']),

  /* ───── Views ───── */
  s('outlook', 'switch-to-mail', 'Switch to Mail', 'Views', 'Ctrl+1', 'Cmd+1', ['outlook-switch-to-calendar', 'outlook-switch-to-inbox']),
  s('outlook', 'switch-to-calendar', 'Switch to Calendar', 'Views', 'Ctrl+2', 'Cmd+2', ['outlook-switch-to-mail', 'outlook-new-appointment']),
  s('outlook', 'switch-to-people', 'Switch to People', 'Views', 'Ctrl+3', 'Cmd+3', ['outlook-switch-to-mail', 'outlook-address-book']),
  s('outlook', 'switch-to-tasks', 'Switch to Tasks', 'Views', 'Ctrl+4', NONE, ['outlook-new-task', 'outlook-switch-to-mail']),
  s('outlook', 'switch-to-notes', 'Switch to Notes', 'Views', 'Ctrl+5', NONE, ['outlook-switch-to-tasks']),
  s('outlook', 'switch-to-inbox', 'Switch to the Inbox', 'Views', 'Ctrl+Shift+I', NONE, ['outlook-switch-to-mail', 'outlook-go-to-folder']),
  s('outlook', 'go-to-folder', 'Go to a folder by name', 'Views', 'Ctrl+Y', NONE, ['outlook-switch-to-inbox', 'outlook-move-to-folder']),

  /* ───── Items ───── */
  s('outlook', 'open-message', 'Open the selected item', 'Items', 'Ctrl+O', 'Cmd+O', ['outlook-close-item', 'outlook-next-open-item']),
  s('outlook', 'close-item', 'Close the open item', 'Items', 'Esc', 'Esc', ['outlook-open-message']),
  s('outlook', 'next-open-item', 'Go to the next open item', 'Items', 'Ctrl+.', NONE, ['outlook-previous-open-item', 'outlook-open-message']),
  s('outlook', 'previous-open-item', 'Go to the previous open item', 'Items', 'Ctrl+,', NONE, ['outlook-next-open-item']),
  s('outlook', 'print', 'Print', 'Items', 'Ctrl+P', 'Cmd+P', ['outlook-open-message']),
  s('outlook', 'undo', 'Undo the last action', 'Items', 'Ctrl+Z', 'Cmd+Z', ['outlook-delete']),

  /* ═════════ notion — 39가지 ═════════ */

  /* ───── Navigation ───── */
  s('notion', 'quick-find', 'Open Quick Find', 'Navigation', 'Ctrl+P', 'Cmd+P', ['notion-search-in-page', 'notion-create-link', 'notion-slash-menu']),
  s('notion', 'search-in-page', 'Search inside the page', 'Navigation', 'Ctrl+F', 'Cmd+F', ['notion-quick-find']),
  s('notion', 'new-page', 'Create a new page', 'Navigation', 'Ctrl+N', 'Cmd+N', ['notion-new-window', 'notion-quick-find']),
  s('notion', 'new-window', 'Open a new Notion window', 'Navigation', 'Ctrl+Shift+N', 'Cmd+Shift+N', ['notion-new-page']),
  s('notion', 'toggle-sidebar', 'Show or hide the sidebar', 'Navigation', 'Ctrl+\\', 'Cmd+\\', ['notion-quick-find', 'notion-dark-mode']),
  s('notion', 'dark-mode', 'Switch between dark and light mode', 'Navigation', 'Ctrl+Shift+L', 'Cmd+Shift+L', ['notion-toggle-sidebar']),
  s('notion', 'go-back', 'Go back a page', 'Navigation', 'Ctrl+[', 'Cmd+[', ['notion-go-to-parent']),
  s('notion', 'go-to-parent', 'Jump to the parent page', 'Navigation', 'Ctrl+Shift+U', 'Cmd+Shift+U', ['notion-go-back', 'notion-quick-find']),
  s('notion', 'copy-page-url', 'Copy the page link', 'Navigation', 'Ctrl+L', 'Cmd+L', ['notion-create-link']),

  /* ───── Blocks ───── */
  s('notion', 'select-block', 'Select the block you are in', 'Blocks', 'Esc', 'Esc', ['notion-select-all-blocks', 'notion-multi-select']),
  s('notion', 'select-all-blocks', 'Select every block on the page', 'Blocks', 'Ctrl+A', 'Cmd+A', ['notion-select-block']),
  s('notion', 'multi-select', 'Extend the selection to more blocks', 'Blocks', 'Shift+Down', 'Shift+Down', ['notion-select-block', 'notion-move-block-down']),
  s('notion', 'duplicate-block', 'Duplicate the selected blocks', 'Blocks', 'Ctrl+D', 'Cmd+D', ['notion-select-block', 'notion-block-menu']),
  s('notion', 'move-block-up', 'Move the block up', 'Blocks', 'Ctrl+Shift+Up', 'Cmd+Shift+Up', ['notion-move-block-down', 'notion-select-block']),
  s('notion', 'move-block-down', 'Move the block down', 'Blocks', 'Ctrl+Shift+Down', 'Cmd+Shift+Down', ['notion-move-block-up']),
  s('notion', 'indent', 'Nest the block under the one above', 'Blocks', 'Tab', 'Tab', ['notion-outdent', 'notion-markdown-toggle']),
  s('notion', 'outdent', 'Move the block out one level', 'Blocks', 'Shift+Tab', 'Shift+Tab', ['notion-indent']),
  s('notion', 'block-menu', 'Open the block menu', 'Blocks', 'Ctrl+/', 'Cmd+/', ['notion-slash-menu', 'notion-turn-into-h1']),

  /* ───── Convert ───── */
  s('notion', 'turn-into-text', 'Turn the block into plain text', 'Convert', 'Ctrl+Shift+0', 'Cmd+Option+0', ['notion-turn-into-h1', 'notion-block-menu']),
  s('notion', 'turn-into-h1', 'Turn the block into Heading 1', 'Convert', 'Ctrl+Shift+1', 'Cmd+Option+1', ['notion-turn-into-h2', 'notion-markdown-h1']),
  s('notion', 'turn-into-h2', 'Turn the block into Heading 2', 'Convert', 'Ctrl+Shift+2', 'Cmd+Option+2', ['notion-turn-into-h1', 'notion-markdown-h2']),
  s('notion', 'turn-into-h3', 'Turn the block into Heading 3', 'Convert', 'Ctrl+Shift+3', 'Cmd+Option+3', ['notion-turn-into-h2', 'notion-markdown-h3']),
  s('notion', 'turn-into-todo', 'Turn the block into a to-do', 'Convert', 'Ctrl+Shift+4', 'Cmd+Option+4', ['notion-turn-into-text']),
  s('notion', 'turn-into-toggle', 'Turn the block into a toggle', 'Convert', 'Ctrl+Shift+7', 'Cmd+Option+7', ['notion-markdown-toggle', 'notion-indent']),
  s('notion', 'turn-into-code', 'Turn the block into a code block', 'Convert', 'Ctrl+Shift+8', 'Cmd+Option+8', ['notion-markdown-code-block', 'notion-inline-code']),

  /* ───── Formatting ───── */
  s('notion', 'bold', 'Bold', 'Formatting', 'Ctrl+B', 'Cmd+B', ['notion-underline', 'notion-strikethrough']),
  s('notion', 'underline', 'Underline', 'Formatting', 'Ctrl+U', 'Cmd+U', ['notion-bold']),
  s('notion', 'strikethrough', 'Strikethrough', 'Formatting', 'Ctrl+Shift+S', 'Cmd+Shift+S', ['notion-bold']),
  s('notion', 'inline-code', 'Inline code', 'Formatting', 'Ctrl+E', 'Cmd+E', ['notion-turn-into-code']),
  s('notion', 'create-link', 'Turn the selected text into a link', 'Formatting', 'Ctrl+K', 'Cmd+K', ['notion-copy-page-url', 'notion-quick-find']),

  /* ───── Markdown ───── */
  s('notion', 'markdown-h1', 'Heading 1 while typing', 'Markdown', '# Space', '# Space', ['notion-markdown-h2', 'notion-turn-into-h1']),
  s('notion', 'markdown-h2', 'Heading 2 while typing', 'Markdown', '## Space', '## Space', ['notion-markdown-h1', 'notion-turn-into-h2']),
  s('notion', 'markdown-h3', 'Heading 3 while typing', 'Markdown', '### Space', '### Space', ['notion-markdown-h2', 'notion-turn-into-h3']),
  s('notion', 'markdown-toggle', 'Toggle list while typing', 'Markdown', '> Space', '> Space', ['notion-turn-into-toggle', 'notion-indent']),
  s('notion', 'markdown-code-block', 'Code block while typing', 'Markdown', '```', '```', ['notion-turn-into-code']),
  s('notion', 'markdown-divider', 'Divider while typing', 'Markdown', '---', '---', ['notion-markdown-h1']),

  /* ───── Menus ───── */
  s('notion', 'slash-menu', 'Open the slash command menu', 'Menus', '/', '/', ['notion-callout', 'notion-block-menu']),
  s('notion', 'callout', 'Insert a callout', 'Menus', '/callout Enter', '/callout Enter', ['notion-slash-menu']),
  s('notion', 'add-comment', 'Add a comment', 'Menus', 'Ctrl+Shift+M', 'Cmd+Shift+M', ['notion-select-block']),
];
