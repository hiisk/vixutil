/**
 * Discord·Zoom 단축키 59가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Shift+M은 어느
 * 나라에서든 Ctrl+Shift+M이고 Cmd는 Cmd다. 열 언어로 쓸 한 문장은
 * desc-chat.ts에 있다 — list-editor.ts와 같은 방식이다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 손대지 않은 기본 배치에서 확인한 것만 싣는다. 두 앱 모두 사용자가 키를 바꿀
 * 수 있고, Zoom은 기본 키가 운영체제마다 다르고 Discord는 앱과 브라우저가
 * 다르다. 그래서 확인하지 못한 조합은 아예 뺐다 — 참고 페이지에서 틀린 키 한
 * 줄은 빠진 키 열 줄보다 나쁘다. Zoom은 공식 hot keys 문서(Windows·macOS 두
 * 목록), Discord는 공식 단축키 안내와 그것을 옮긴 목록 두 곳이 근거다.
 *
 * 뺀 것: Discord의 화면 공유 — 기본 키가 없고 설정의 Keybinds에서 직접 만들어야
 * 한다. Discord의 "모두 읽음으로 표시" — 채널(Esc)과 서버(Shift+Esc)까지만
 * 기본 키가 있고 전체를 한꺼번에 지우는 키는 없다. 스티커 창, 글 칸으로 초점
 * 옮기기, 페이지 앞뒤로 가기는 근거끼리 어긋나 싣지 않았다.
 *
 * NA를 둔 자리는 "모른다"가 아니라 "그 운영체제에 기본 키가 없다"는 뜻이다 —
 * Zoom의 발표자·격자 보기는 윈도우만 따로 있고 맥은 배치를 돌려 가는 조합
 * 하나뿐이며, 모두 음소거 해제는 맥에만 따로 있다.
 *
 * 조합 표기는 한 줄로 맞춘다 — 사이에 빈칸을 두지 않고 +로 잇고, 차례로 이어
 * 누르는 것만 빈칸으로 띄운다. 수식 키 순서는 Ctrl → Cmd → Shift → Alt(맥은
 * Option)이다. 그래서 공식 문서의 Alt+Shift+S는 여기서 Shift+Alt+S로 적는다.
 */
import { NA, type ScItem, type ScApp } from './types.ts';

/** 앱 이름이 슬러그 앞에 붙는다 — mk('zoom')('raise-hand', …) → 'zoom-raise-hand' */
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

const d = mk('discord');
const z = mk('zoom');

export const SC_CHAT: ScItem[] = [
  /* ═════════ discord ═════════ */

  /* ───────── Voice ───────── */
  d('mute', 'Toggle mute', 'Ctrl+Shift+M', 'Cmd+Shift+M', 'Voice',
    ['discord-deafen', 'discord-start-call']),
  d('deafen', 'Toggle deafen', 'Ctrl+Shift+D', 'Cmd+Shift+D', 'Voice',
    ['discord-mute']),
  d('answer-call', 'Answer an incoming call', 'Ctrl+Enter', 'Cmd+Enter', 'Voice',
    ['discord-decline-call', 'discord-mute']),
  d('decline-call', 'Decline an incoming call', 'Esc', 'Esc', 'Voice',
    ['discord-answer-call', 'discord-mark-channel-read']),
  d('start-call', 'Call this DM or group', "Ctrl+'", "Cmd+'", 'Voice',
    ['discord-mute', 'discord-answer-call']),

  /* ───────── Navigation ───────── */
  d('quick-switcher', 'Jump to a server, channel or person', 'Ctrl+K', 'Cmd+K', 'Navigation',
    ['discord-search', 'discord-inbox', 'discord-shortcuts-overlay']),
  d('search', 'Search messages', 'Ctrl+F', 'Cmd+F', 'Navigation',
    ['discord-quick-switcher', 'discord-jump-to-oldest-unread']),
  d('next-server', 'Next server', 'Ctrl+Alt+Down', 'Cmd+Option+Down', 'Navigation',
    ['discord-previous-server', 'discord-next-channel']),
  d('previous-server', 'Previous server', 'Ctrl+Alt+Up', 'Cmd+Option+Up', 'Navigation',
    ['discord-next-server', 'discord-create-server']),
  d('next-channel', 'Next channel', 'Alt+Down', 'Option+Down', 'Navigation',
    ['discord-previous-channel', 'discord-next-unread-channel']),
  d('previous-channel', 'Previous channel', 'Alt+Up', 'Option+Up', 'Navigation',
    ['discord-next-channel']),
  d('next-unread-channel', 'Next unread channel', 'Shift+Alt+Down', 'Shift+Option+Down', 'Navigation',
    ['discord-previous-unread-channel', 'discord-jump-to-oldest-unread']),
  d('previous-unread-channel', 'Previous unread channel', 'Shift+Alt+Up', 'Shift+Option+Up', 'Navigation',
    ['discord-next-unread-channel', 'discord-mark-server-read']),
  d('create-server', 'Create or join a server', 'Ctrl+Shift+N', 'Cmd+Shift+N', 'Navigation',
    ['discord-quick-switcher']),

  /* ───────── Unreads ───────── */
  d('jump-to-oldest-unread', 'Jump to the oldest unread message', 'Shift+PageUp', 'Shift+PageUp', 'Unreads',
    ['discord-mark-channel-read', 'discord-scroll-up']),
  d('mark-channel-read', 'Mark this channel read', 'Esc', 'Esc', 'Unreads',
    ['discord-mark-server-read', 'discord-decline-call']),
  d('mark-server-read', 'Mark the whole server read', 'Shift+Esc', 'Shift+Esc', 'Unreads',
    ['discord-mark-channel-read', 'discord-next-unread-channel']),
  d('scroll-up', 'Scroll the chat up a screen', 'PageUp', 'PageUp', 'Unreads',
    ['discord-scroll-down', 'discord-jump-to-oldest-unread']),
  d('scroll-down', 'Scroll the chat down a screen', 'PageDown', 'PageDown', 'Unreads',
    ['discord-scroll-up']),

  /* ───────── Panels ───────── */
  d('members-list', 'Toggle the members list', 'Ctrl+U', 'Cmd+U', 'Panels',
    ['discord-pins', 'discord-inbox']),
  d('pins', 'Toggle the pinned messages', 'Ctrl+P', 'Cmd+P', 'Panels',
    ['discord-members-list', 'discord-search']),
  d('inbox', 'Toggle the inbox', 'Ctrl+I', 'Cmd+I', 'Panels',
    ['discord-members-list', 'discord-mark-server-read']),

  /* ───────── Messages ───────── */
  d('upload-file', 'Upload a file', 'Ctrl+Shift+U', 'Cmd+Shift+U', 'Messages',
    ['discord-new-line', 'discord-emoji-picker']),
  d('emoji-picker', 'Open the emoji picker', 'Ctrl+E', 'Cmd+E', 'Messages',
    ['discord-gif-picker', 'discord-upload-file']),
  d('gif-picker', 'Open the GIF picker', 'Ctrl+G', 'Cmd+G', 'Messages',
    ['discord-emoji-picker']),
  d('new-line', 'Start a new line without sending', 'Shift+Enter', 'Shift+Enter', 'Messages',
    ['discord-edit-last-message', 'discord-upload-file']),
  d('edit-last-message', 'Edit your last message', 'Up', 'Up', 'Messages',
    ['discord-new-line']),

  /* ───────── Basics ───────── */
  d('shortcuts-overlay', 'Show every shortcut', 'Ctrl+/', 'Cmd+/', 'Basics',
    ['discord-get-help', 'discord-quick-switcher']),
  d('get-help', 'Open the help center', 'Ctrl+Shift+H', 'Cmd+Shift+H', 'Basics',
    ['discord-shortcuts-overlay']),

  /* ═════════ zoom ═════════ */

  /* ───────── Audio ───────── */
  z('mute-toggle', 'Mute or unmute yourself', 'Alt+A', 'Cmd+Shift+A', 'Audio',
    ['zoom-push-to-talk', 'zoom-mute-everyone']),
  z('push-to-talk', 'Talk while you hold the key', 'Space', 'Space', 'Audio',
    ['zoom-mute-toggle', 'zoom-chat-panel']),
  z('mute-everyone', 'Mute everyone but the host', 'Alt+M', 'Ctrl+Cmd+M', 'Audio',
    ['zoom-unmute-everyone', 'zoom-mute-toggle']),
  z('unmute-everyone', 'Ask everyone to unmute', NA, 'Ctrl+Cmd+U', 'Audio',
    ['zoom-mute-everyone']),

  /* ───────── Video ───────── */
  z('video-toggle', 'Start or stop your video', 'Alt+V', 'Cmd+Shift+V', 'Video',
    ['zoom-switch-camera', 'zoom-mute-toggle']),
  z('switch-camera', 'Switch camera', 'Alt+N', 'Cmd+Shift+N', 'Video',
    ['zoom-video-toggle']),

  /* ───────── Panels ───────── */
  z('invite', 'Open the invite window', 'Alt+I', 'Cmd+I', 'Panels',
    ['zoom-copy-invite-link', 'zoom-participants']),
  z('copy-invite-link', 'Copy the invite link', 'Shift+Alt+I', 'Cmd+Shift+I', 'Panels',
    ['zoom-invite']),
  z('participants', 'Toggle the participants panel', 'Alt+U', 'Cmd+U', 'Panels',
    ['zoom-chat-panel', 'zoom-raise-hand']),
  z('chat-panel', 'Toggle the chat panel', 'Alt+H', 'Cmd+Shift+H', 'Panels',
    ['zoom-participants', 'zoom-push-to-talk']),

  /* ───────── Sharing ───────── */
  z('share-screen', 'Start or stop screen share', 'Alt+S', 'Cmd+Shift+S', 'Sharing',
    ['zoom-pause-share', 'zoom-share-window-list']),
  z('share-window-list', 'Show what you can share', 'Shift+Alt+S', NA, 'Sharing',
    ['zoom-share-screen']),
  z('pause-share', 'Pause or resume the share', 'Alt+T', 'Cmd+Shift+T', 'Sharing',
    ['zoom-share-screen', 'zoom-floating-controls']),
  z('remote-control', 'Begin remote control', 'Shift+Alt+R', 'Ctrl+Shift+R', 'Sharing',
    ['zoom-revoke-remote-control', 'zoom-share-screen']),
  z('revoke-remote-control', 'Revoke or drop remote control', 'Shift+Alt+G', 'Ctrl+Shift+G', 'Sharing',
    ['zoom-remote-control']),

  /* ───────── Recording ───────── */
  z('local-recording', 'Start or stop recording on this computer', 'Alt+R', 'Cmd+Shift+R', 'Recording',
    ['zoom-cloud-recording', 'zoom-pause-recording']),
  z('cloud-recording', 'Start or stop cloud recording', 'Alt+C', 'Cmd+Shift+C', 'Recording',
    ['zoom-local-recording', 'zoom-end-meeting']),
  z('pause-recording', 'Pause or resume the recording', 'Alt+P', 'Cmd+Shift+P', 'Recording',
    ['zoom-local-recording']),

  /* ───────── Reactions ───────── */
  z('raise-hand', 'Raise or lower your hand', 'Alt+Y', 'Option+Y', 'Reactions',
    ['zoom-reactions-panel', 'zoom-participants']),
  z('reactions-panel', 'Open the reactions panel', 'Ctrl+Shift+Y', 'Cmd+Shift+Y', 'Reactions',
    ['zoom-raise-hand']),

  /* ───────── View ───────── */
  z('full-screen', 'Enter or exit full screen', 'Alt+F', 'Cmd+Shift+F', 'View',
    ['zoom-gallery-view', 'zoom-always-show-controls']),
  z('speaker-view', 'Switch to speaker view', 'Alt+F1', NA, 'View',
    ['zoom-gallery-view', 'zoom-switch-view']),
  z('gallery-view', 'Switch to gallery view', 'Alt+F2', NA, 'View',
    ['zoom-speaker-view', 'zoom-gallery-next-page']),
  z('switch-view', 'Cycle through the layouts', NA, 'Cmd+Shift+W', 'View',
    ['zoom-speaker-view', 'zoom-full-screen']),
  z('gallery-next-page', 'Next page of participants', 'PageDown', 'Ctrl+N', 'View',
    ['zoom-gallery-previous-page', 'zoom-gallery-view']),
  z('gallery-previous-page', 'Previous page of participants', 'PageUp', 'Ctrl+P', 'View',
    ['zoom-gallery-next-page']),

  /* ───────── Meeting ───────── */
  z('floating-controls', 'Show or hide the floating controls', 'Ctrl+Shift+Alt+H', 'Ctrl+Cmd+Option+H', 'Meeting',
    ['zoom-always-show-controls', 'zoom-focus-meeting-controls']),
  z('always-show-controls', 'Keep the meeting controls showing', 'Alt', 'Ctrl+\\', 'Meeting',
    ['zoom-floating-controls']),
  z('focus-meeting-controls', 'Move focus to the meeting controls', 'Ctrl+Shift+Alt', NA, 'Meeting',
    ['zoom-floating-controls', 'zoom-share-screen']),
  z('end-meeting', 'End or leave the meeting', 'Alt+Q', 'Cmd+W', 'Meeting',
    ['zoom-mute-toggle', 'zoom-local-recording']),
];
