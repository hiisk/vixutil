// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { TextTool } from './text-tools.ts';
import { TEXT_TOOLS } from './text-tools.ts';

/**
 * 텍스트 도구(/text) 섹션의 영어·중국어 메타데이터.
 *
 * 열두 개 중 여덟 개만 옮긴다. 한영타 변환·영문 이름 변환·초성 변환·한글 금액은
 * 한글 자판과 자모에 묶여 있어 다른 언어에서는 성립하지 않는다 — 없는 도구를
 * 억지로 만드는 대신 목록에서 빠지게 두고, 한국어 페이지에도 hreflang을 걸지 않는다.
 *
 * 원고지는 en에서 낱말 수 중심으로, zh에서는 稿纸로 옮긴다. 영어권에서 글 분량을
 * 재는 단위는 낱말이고, 중국어권에는 실제로 稿纸가 있기 때문이다.
 */
export type TextIntlLang = 'en';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

/** en/zh에 내보내는 slug — 한글 전용 네 개는 여기 없다 */
export const TEXT_INTL_SLUGS = ['clean', 'dedupe', 'case', 'special-char', 'emoticon', 'replace', 'manuscript', 'lorem'] as const;

const COPY: Record<TextIntlLang, Record<string, ToolCopy>> = {
  en: {
    clean: {
      title: 'Text Cleaner', desc: 'Fix the odd spaces and line breaks in text you pasted', category: 'Clean up',
      metaTitle: 'Text Cleaner — Remove Invisible Characters and Fix Line Breaks',
      long: 'Text copied out of a PDF or a web page carries invisible characters, spaces that look normal but are not, and line breaks in the middle of sentences. This clears all of it in one pass and tells you how many of each it removed.',
      features: ['Remove invisible characters and odd spaces', 'Join line breaks inside sentences', 'Collapse repeated spaces and blank lines', 'Smart quotes to straight quotes'],
    },
    dedupe: {
      title: 'Remove Duplicate Lines', desc: 'Strip repeated lines from a list and sort it', category: 'Clean up',
      metaTitle: 'Remove Duplicate Lines — Dedupe and Sort a List Online',
      long: 'Paste a list and it removes the repeated lines and sorts what is left alphabetically. You can choose whether lines that differ only in surrounding whitespace or letter case count as the same, which is what real lists actually need.',
      features: ['Remove duplicates (and show how many went)', 'Sort A→Z or Z→A', 'Ignore whitespace or case', 'Drop blank lines, add line numbers'],
    },
    case: {
      title: 'Case Converter', desc: 'Convert text to any capitalisation style', category: 'Clean up',
      metaTitle: 'Case Converter — UPPERCASE, lowercase, Title Case, camelCase',
      long: 'Convert to all caps, all lowercase or title case, and to developer conventions like camelCase, snake_case and kebab-case. Each result can be copied on its own.',
      features: ['UPPERCASE, lowercase, Title Case', 'Sentence case', 'camelCase, snake_case, kebab-case', 'Copy each style separately'],
    },
    'special-char': {
      title: 'Special Characters', desc: 'Tap an arrow, shape or symbol to copy it', category: 'Symbols',
      metaTitle: 'Special Characters — Copy Arrows, Shapes and Symbols',
      long: 'Arrows (→ ⇒), shapes (★ ◆ ▶), punctuation (※ 「」), maths and units (㎡ ℃ ±), currency (€ ₩) and enclosed characters (① ㉠) — tap any of them to copy. No more hunting for a symbol your keyboard cannot type.',
      features: ['Symbols grouped by category', 'Tap to copy immediately', 'Search by name', 'Remembers the ones you used'],
    },
    emoticon: {
      title: 'Text Emoticons', desc: 'Copy kaomoji like (╯°□°）╯', category: 'Symbols',
      metaTitle: 'Text Emoticons — Copy Kaomoji and ASCII Faces',
      long: 'Emoticons built purely from characters — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — collected by mood. Because they are text and not images, they paste anywhere without breaking, and work in usernames and status messages.',
      features: ['Grouped by mood: happy, sad, angry and more', 'Kaomoji and ASCII faces', 'Tap to copy immediately', 'Remembers the ones you used'],
    },
    replace: {
      title: 'Find and Replace', desc: 'Swap a word throughout a long text at once', category: 'Clean up',
      metaTitle: 'Find and Replace Text Online — Bulk Replace, Regex Supported',
      long: 'When a name or a term changes, you do not have to fix it one instance at a time. Case sensitivity and regular expressions can both be turned on, and it counts how many places will change before you commit.',
      features: ['Counts the matches before replacing', 'Case-sensitive toggle', 'Regular expressions supported', 'Replace newlines (\\n) and tabs'],
    },
    manuscript: {
      title: 'Word and Character Counter', desc: 'Count words, characters and pages against a limit', category: 'Counting',
      metaTitle: 'Word and Character Counter — With and Without Spaces',
      long: 'Paste your text and get the word count, the character count with and without spaces, and roughly how many pages that is. Set the limit an application or a brief gives you and it shows how much you have left.',
      features: ['Words, characters with and without spaces', 'Estimated pages and reading time', 'Remaining count against your limit', 'Byte count (for upload limits)'],
    },
    lorem: {
      title: 'Lorem Ipsum Generator', desc: 'Placeholder text to fill out a layout', category: 'Counting',
      metaTitle: 'Lorem Ipsum Generator — Placeholder Text, Any Length',
      long: 'Generates the filler text you need while building a design or a screen. Set how many paragraphs and how long each one runs, or cut it to an exact character count so it fits the box you are testing.',
      features: ['Classic Latin lorem ipsum', 'Set paragraph count and length', 'Trim to an exact character count', 'Copy the whole result at once'],
    },
  },
};

/** 언어별 도구 목록 — 한글 전용 네 개는 빠진다 */
export function textToolsIntl(lang: TextIntlLang): TextTool[] {
  return TEXT_TOOLS
    .filter(t => (TEXT_INTL_SLUGS as readonly string[]).includes(t.slug))
    .map(t => ({ ...t, ...COPY[lang][t.slug] }));
}

export function findTextToolIntl(lang: TextIntlLang, slug: string): TextTool | undefined {
  return textToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedTextToolsIntl(lang: TextIntlLang, slug: string, count = 4): TextTool[] {
  const all = textToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const TEXT_SHELL_UI: Record<TextIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Text tools',
    canDo: 'What this tool does', others: 'Other text tools',
    notice: '📝 Your text is processed in the browser. Nothing is uploaded.',
    footNote: 'Nothing you paste here leaves the page, so drafts and personal notes are safe.',
  },
};
