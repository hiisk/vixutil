/**
 * Word·PowerPoint 단축키 85가지 — 키 조합과 갈래만 적는다.
 *
 * 키 조합은 프로그램이 정한 것이라 언어를 가리지 않는다. Ctrl+Enter는 어느 나라
 * Word에서든 Ctrl+Enter다. 그래서 여기에는 옮길 것이 없는 것만 두고, 열 언어로
 * 쓸 한 문장은 desc-office2.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 만든 곳이 지금 문서로 밝혀 둔 기본값만 싣는다. 확인하지 못한 조합은 적지
 * 않는다 — 맞는 70줄이 열다섯 줄이 틀린 85줄보다 낫다. 그래서 구역 나누기,
 * 수정 적용·거부, 표 자동 맞춤, 제목 행 반복, 상호 참조, 같은 서식 모두 선택,
 * PowerPoint의 도형 서식 창과 예상 시간 기록은 아예 빼 두었다. Word에도
 * PowerPoint에도 그 기능에 붙은 기본 조합이 문서에 없다.
 *
 * 한쪽에만 있는 자리가 이 표의 핵심이다. Word의 스타일 창은 윈도우에만 있고,
 * 맥 Office에는 리본 키 팁(Alt 차례 누르기)이 아예 없어서 Alt+N X 같은 것이
 * 맥 칸에서 모두 없다로 남는다. 반대로 취소선은 맥에만 조합이 있다.
 *
 * 이어 누르는 것은 빈칸으로 가른다 — 'Alt+N X'는 Alt+N을 누르고 손을 뗀 다음
 * X다. 함께 누르는 것은 붙여 쓴다 — 'Ctrl+Shift+E'.
 *
 * 앱은 둘이다 — word·powerpoint.
 */
import type { ScItem, ScApp } from './types.ts';
import { NA } from './types.ts';

/** 그 플랫폼에 기본 조합이 없다는 표시 — 모른다는 뜻이 아니라 없다는 뜻이다 */
const NONE = NA;

/** slug은 앱 열쇠와 꼬리표를 이어 만든다 — ('word','page-break') → 'word-page-break' */
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

export const SC_OFFICE2: ScItem[] = [
  /* ═════════ word — 45가지 ═════════ */

  /* ───── Styles ───── */
  s('word', 'heading-1', 'Apply the Heading 1 style', 'Styles', 'Ctrl+Alt+1', 'Cmd+Option+1', ['word-heading-2', 'word-normal-style', 'word-find']),
  s('word', 'heading-2', 'Apply the Heading 2 style', 'Styles', 'Ctrl+Alt+2', 'Cmd+Option+2', ['word-heading-1', 'word-heading-3']),
  s('word', 'heading-3', 'Apply the Heading 3 style', 'Styles', 'Ctrl+Alt+3', 'Cmd+Option+3', ['word-heading-2', 'word-apply-styles']),
  s('word', 'normal-style', 'Apply the Normal style', 'Styles', 'Ctrl+Shift+N', 'Cmd+Shift+N', ['word-clear-formatting', 'word-heading-1']),
  s('word', 'apply-styles', 'Open the Apply Styles box', 'Styles', 'Ctrl+Shift+S', NONE, ['word-styles-pane', 'word-normal-style']),
  s('word', 'styles-pane', 'Open the Styles pane', 'Styles', 'Ctrl+Shift+Alt+S', NONE, ['word-apply-styles', 'word-heading-1']),

  /* ───── Search ───── */
  s('word', 'find', 'Search the document', 'Search', 'Ctrl+F', 'Cmd+F', ['word-replace', 'word-go-to', 'word-heading-1']),
  s('word', 'replace', 'Find and replace', 'Search', 'Ctrl+H', 'Ctrl+H', ['word-find']),
  s('word', 'go-to', 'Go to a page or a bookmark', 'Search', 'Ctrl+G', 'Cmd+Option+G', ['word-find']),

  /* ───── Review ───── */
  s('word', 'track-changes', 'Turn Track Changes on or off', 'Review', 'Ctrl+Shift+E', 'Cmd+Shift+E', ['word-insert-comment']),
  s('word', 'insert-comment', 'Insert a comment', 'Review', 'Ctrl+Alt+M', 'Cmd+Option+A', ['word-track-changes']),

  /* ───── Breaks ───── */
  s('word', 'page-break', 'Insert a page break', 'Breaks', 'Ctrl+Enter', 'Cmd+Return', ['word-column-break', 'word-formatting-marks']),
  s('word', 'column-break', 'Insert a column break', 'Breaks', 'Ctrl+Shift+Enter', 'Cmd+Shift+Return', ['word-page-break']),

  /* ───── Paragraph ───── */
  s('word', 'single-spacing', 'Single line spacing', 'Paragraph', 'Ctrl+1', 'Cmd+1', ['word-double-spacing', 'word-one-and-half-spacing']),
  s('word', 'one-and-half-spacing', '1.5 line spacing', 'Paragraph', 'Ctrl+5', 'Cmd+5', ['word-single-spacing']),
  s('word', 'double-spacing', 'Double line spacing', 'Paragraph', 'Ctrl+2', 'Cmd+2', ['word-single-spacing']),
  s('word', 'align-left', 'Align the paragraph left', 'Paragraph', 'Ctrl+L', 'Cmd+L', ['word-align-center', 'word-justify']),
  s('word', 'align-center', 'Centre the paragraph', 'Paragraph', 'Ctrl+E', 'Cmd+E', ['word-align-left']),
  s('word', 'align-right', 'Align the paragraph right', 'Paragraph', 'Ctrl+R', 'Cmd+R', ['word-align-left']),
  s('word', 'justify', 'Justify the paragraph', 'Paragraph', 'Ctrl+J', 'Cmd+J', ['word-align-left']),
  s('word', 'hanging-indent', 'Create a hanging indent', 'Paragraph', 'Ctrl+T', 'Cmd+T', ['word-remove-hanging-indent']),
  s('word', 'remove-hanging-indent', 'Remove a hanging indent', 'Paragraph', 'Ctrl+Shift+T', 'Cmd+Shift+T', ['word-hanging-indent']),
  s('word', 'change-case', 'Cycle the case of the selection', 'Paragraph', 'Shift+F3', 'Shift+F3', ['word-all-caps']),

  /* ───── Formatting ───── */
  s('word', 'copy-formatting', 'Copy the formatting of the selection', 'Formatting', 'Ctrl+Alt+C', 'Cmd+Option+C', ['word-paste-formatting', 'word-clear-formatting']),
  s('word', 'paste-formatting', 'Paste the copied formatting', 'Formatting', 'Ctrl+Alt+V', 'Cmd+Option+V', ['word-copy-formatting']),
  s('word', 'clear-formatting', 'Remove manual character formatting', 'Formatting', 'Ctrl+Space', 'Ctrl+Space', ['word-normal-style', 'word-copy-formatting']),
  s('word', 'superscript', 'Superscript', 'Formatting', 'Ctrl+Shift+Plus', 'Cmd+Shift+Plus', ['word-subscript']),
  s('word', 'subscript', 'Subscript', 'Formatting', 'Ctrl+Shift+Minus', 'Cmd+Shift+Minus', ['word-superscript']),
  s('word', 'strikethrough', 'Strikethrough', 'Formatting', NONE, 'Cmd+Shift+X', ['word-clear-formatting']),
  s('word', 'small-caps', 'Small caps', 'Formatting', 'Ctrl+Shift+K', 'Cmd+Shift+K', ['word-all-caps']),
  s('word', 'all-caps', 'All capitals', 'Formatting', 'Ctrl+Shift+A', 'Cmd+Shift+A', ['word-small-caps', 'word-change-case']),
  s('word', 'underline-words', 'Underline the words but not the spaces', 'Formatting', 'Ctrl+Shift+W', 'Cmd+Shift+W', ['word-double-underline']),
  s('word', 'double-underline', 'Double underline', 'Formatting', 'Ctrl+Shift+D', 'Cmd+Shift+D', ['word-underline-words']),

  /* ───── Characters ───── */
  s('word', 'nonbreaking-space', 'Insert a non-breaking space', 'Characters', 'Ctrl+Shift+Space', 'Option+Space', ['word-nonbreaking-hyphen', 'word-formatting-marks']),
  s('word', 'nonbreaking-hyphen', 'Insert a non-breaking hyphen', 'Characters', 'Shift+Alt+Minus', 'Shift+Option+Minus', ['word-nonbreaking-space']),

  /* ───── View ───── */
  s('word', 'formatting-marks', 'Show or hide formatting marks', 'View', 'Ctrl+Shift+8', 'Cmd+Shift+8', ['word-page-break', 'word-nonbreaking-space']),
  s('word', 'word-count', 'Open the Word Count box', 'View', 'Ctrl+Shift+G', NONE),

  /* ───── References ───── */
  s('word', 'footnote', 'Insert a footnote', 'References', 'Ctrl+Alt+F', 'Cmd+Option+F', ['word-endnote']),
  s('word', 'endnote', 'Insert an endnote', 'References', 'Ctrl+Alt+D', 'Cmd+Option+E', ['word-footnote']),

  /* ───── File ───── */
  s('word', 'save', 'Save', 'File', 'Ctrl+S', 'Cmd+S', ['word-save-as']),
  s('word', 'save-as', 'Open Save As', 'File', 'F12', 'Cmd+Shift+S', ['word-save', 'word-print']),
  s('word', 'print', 'Print', 'File', 'Ctrl+P', 'Cmd+P', ['word-save-as']),
  s('word', 'hyperlink', 'Insert a hyperlink', 'File', 'Ctrl+K', 'Cmd+K'),

  /* ───── Selection · Ribbon ───── */
  s('word', 'extend-selection', 'Turn on extend selection', 'Selection', 'F8', 'F8'),
  s('word', 'ribbon-search', 'Jump to the Search box on the ribbon', 'Ribbon', 'Alt+Q', NONE),

  /* ═════════ powerpoint — 40가지 ═════════ */

  /* ───── Slideshow ───── */
  s('powerpoint', 'start-show', 'Start the slide show from the first slide', 'Slideshow', 'F5', 'Cmd+Shift+Return', ['powerpoint-start-from-current', 'powerpoint-presenter-view']),
  s('powerpoint', 'start-from-current', 'Start the show from the current slide', 'Slideshow', 'Shift+F5', 'Cmd+Return', ['powerpoint-start-show']),
  s('powerpoint', 'presenter-view', 'Start Presenter View', 'Slideshow', 'Alt+F5', 'Option+Return', ['powerpoint-start-show', 'powerpoint-notes-pane']),
  s('powerpoint', 'next-slide', 'Go to the next slide', 'Slideshow', 'N', 'N', ['powerpoint-previous-slide', 'powerpoint-go-to-slide']),
  s('powerpoint', 'previous-slide', 'Go back to the previous slide', 'Slideshow', 'P', 'P', ['powerpoint-next-slide']),
  s('powerpoint', 'go-to-slide', 'Jump to a slide by its number', 'Slideshow', 'Number Enter', 'Number Return', ['powerpoint-next-slide']),
  s('powerpoint', 'black-screen', 'Black out the screen', 'Slideshow', 'B', 'B', ['powerpoint-white-screen']),
  s('powerpoint', 'white-screen', 'White out the screen', 'Slideshow', 'W', 'W', ['powerpoint-black-screen']),
  s('powerpoint', 'laser-pointer', 'Turn the pointer into a laser', 'Slideshow', 'Ctrl+L', 'Cmd+L', ['powerpoint-pen', 'powerpoint-arrow-pointer']),
  s('powerpoint', 'pen', 'Turn the pointer into a pen', 'Slideshow', 'Ctrl+P', 'Cmd+P', ['powerpoint-eraser', 'powerpoint-laser-pointer']),
  s('powerpoint', 'eraser', 'Pick up the eraser', 'Slideshow', 'Ctrl+E', 'Shift+E', ['powerpoint-pen']),
  s('powerpoint', 'arrow-pointer', 'Bring the arrow pointer back', 'Slideshow', 'Ctrl+A', 'Cmd+A', ['powerpoint-laser-pointer']),
  s('powerpoint', 'end-show', 'End the slide show', 'Slideshow', 'Esc', 'Esc', ['powerpoint-start-show']),

  /* ───── Slides ───── */
  s('powerpoint', 'new-slide', 'Insert a new slide', 'Slides', 'Ctrl+M', 'Cmd+Shift+N', ['powerpoint-duplicate-slide']),
  s('powerpoint', 'duplicate-slide', 'Duplicate the selected slide', 'Slides', 'Ctrl+Shift+D', 'Cmd+Shift+D', ['powerpoint-new-slide', 'powerpoint-duplicate-object']),
  s('powerpoint', 'move-slide-up', 'Move the slide up in the order', 'Slides', 'Ctrl+Up', 'Cmd+Up', ['powerpoint-move-slide-down']),
  s('powerpoint', 'move-slide-down', 'Move the slide down in the order', 'Slides', 'Ctrl+Down', 'Cmd+Down', ['powerpoint-move-slide-up']),
  s('powerpoint', 'outline-pane-toggle', 'Switch between the outline and the thumbnails', 'Slides', 'Ctrl+Shift+Tab', 'Ctrl+Shift+Tab', ['powerpoint-promote-bullet']),

  /* ───── Outline ───── */
  s('powerpoint', 'promote-bullet', 'Promote the bullet one level', 'Outline', 'Shift+Alt+Left', 'Cmd+[', ['powerpoint-demote-bullet']),
  s('powerpoint', 'demote-bullet', 'Demote the bullet one level', 'Outline', 'Shift+Alt+Right', 'Cmd+]', ['powerpoint-promote-bullet']),

  /* ───── Objects ───── */
  s('powerpoint', 'group', 'Group the selected objects', 'Objects', 'Ctrl+G', 'Cmd+Option+G', ['powerpoint-ungroup']),
  s('powerpoint', 'ungroup', 'Ungroup the selected group', 'Objects', 'Ctrl+Shift+G', 'Cmd+Shift+Option+G', ['powerpoint-group']),
  s('powerpoint', 'send-backward', 'Send the object back one position', 'Objects', 'Ctrl+Shift+[', 'Cmd+Shift+Option+B', ['powerpoint-bring-forward']),
  s('powerpoint', 'bring-forward', 'Bring the object forward one position', 'Objects', 'Ctrl+Shift+]', 'Cmd+Shift+Option+F', ['powerpoint-send-backward']),
  s('powerpoint', 'duplicate-object', 'Duplicate the selected object', 'Objects', 'Ctrl+D', 'Cmd+D', ['powerpoint-duplicate-slide']),
  s('powerpoint', 'select-next-object', 'Select the next object on the slide', 'Objects', 'Tab', 'Tab', ['powerpoint-group']),
  s('powerpoint', 'paste-special', 'Open Paste Special', 'Objects', 'Ctrl+Alt+V', 'Ctrl+Cmd+V', ['powerpoint-paste-animation']),

  /* ───── Animation ───── */
  s('powerpoint', 'copy-animation', 'Copy the animation of an object', 'Animation', 'Shift+Alt+C', 'Cmd+Shift+Option+C', ['powerpoint-paste-animation']),
  s('powerpoint', 'paste-animation', 'Paste the copied animation', 'Animation', 'Shift+Alt+V', 'Cmd+Shift+Option+V', ['powerpoint-copy-animation']),
  s('powerpoint', 'animations-tab', 'Open the Animations tab', 'Animation', 'Alt+A', NONE, ['powerpoint-copy-animation']),

  /* ───── Insert ───── */
  s('powerpoint', 'text-box', 'Insert a text box', 'Insert', 'Alt+N X', NONE, ['powerpoint-shape', 'powerpoint-picture']),
  s('powerpoint', 'shape', 'Insert a shape', 'Insert', 'Alt+N S H', NONE, ['powerpoint-text-box']),
  s('powerpoint', 'picture', 'Insert a picture from this device', 'Insert', 'Alt+N P D', NONE, ['powerpoint-text-box']),
  s('powerpoint', 'clipboard-pane', 'Open the Clipboard pane', 'Insert', 'Alt+H F O', NONE, ['powerpoint-paste-special']),

  /* ───── View ───── */
  s('powerpoint', 'notes-pane', 'Show or hide the Notes pane', 'View', 'Alt+W P N', NONE, ['powerpoint-presenter-view']),
  s('powerpoint', 'guides', 'Show or hide the guides', 'View', 'Alt+F9', 'Ctrl+Cmd+Option+G', ['powerpoint-gridlines']),
  s('powerpoint', 'gridlines', 'Show or hide the grid', 'View', 'Shift+F9', 'Shift+F9', ['powerpoint-guides']),
  s('powerpoint', 'zoom-in', 'Zoom in', 'View', 'Ctrl+Plus', 'Cmd+Plus', ['powerpoint-zoom-out', 'powerpoint-zoom-to-fit']),
  s('powerpoint', 'zoom-out', 'Zoom out', 'View', 'Ctrl+Minus', 'Cmd+Minus', ['powerpoint-zoom-in']),
  s('powerpoint', 'zoom-to-fit', 'Fit the slide to the window', 'View', 'Ctrl+Alt+O', 'Cmd+Option+O', ['powerpoint-zoom-in']),
];
