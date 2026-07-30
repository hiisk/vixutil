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
export type TextIntlLang = 'en' | 'zh';

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
  zh: {
    clean: {
      title: '文本清理', desc: '整理复制来的文字里奇怪的空格与换行', category: '整理与编辑',
      metaTitle: '文本清理 — 去除不可见字符、修正换行',
      long: '从 PDF 或网页复制的文字里，会混进看不见的字符、看起来像普通空格但其实不是的空格，以及句子中间断掉的换行。这里一次全部清理干净，并告诉你各清掉了多少个。',
      features: ['去除不可见字符与特殊空格', '合并句中断掉的换行', '整理重复空格与空行', '把智能引号换成普通引号'],
    },
    dedupe: {
      title: '去重与排序', desc: '删掉列表里重复的行并排序', category: '整理与编辑',
      metaTitle: '去除重复行 — 在线列表去重与排序',
      long: '把名单或列表贴进来，它会删掉重复的行并按字母顺序排好。只有首尾空格不同、或只有大小写不同的行，是否算同一行也可以自己选，正好是整理真实名单需要的。',
      features: ['去除重复行（并显示删了几行）', '正序／倒序排序', '可忽略空格或大小写', '删空行、加行号'],
    },
    case: {
      title: '大小写转换', desc: '把英文换成想要的大小写写法', category: '整理与编辑',
      metaTitle: '大小写转换 — 全大写、全小写、首字母大写、camelCase',
      long: '转成全大写、全小写、每个单词首字母大写，也能转成 camelCase、snake_case、kebab-case 这些开发常用写法。每种结果都能单独复制。',
      features: ['全大写、全小写、首字母大写', '仅句首字母大写', 'camelCase、snake_case、kebab-case', '按写法分别复制'],
    },
    'special-char': {
      title: '特殊符号', desc: '点一下就复制箭头、图形与符号', category: '符号与输入',
      metaTitle: '特殊符号 — 复制箭头、图形与各种符号',
      long: '箭头（→ ⇒）、图形（★ ◆ ▶）、标点（※ 「」）、数学与单位（㎡ ℃ ±）、货币（€ ¥）、带圈字符（① ㉠），点一下就复制。不用再到处找键盘打不出来的符号。',
      features: ['按分类整理的符号集', '点一下立即复制', '按名称搜索', '记住最近用过的符号'],
    },
    emoticon: {
      title: '颜文字', desc: '复制 (╯°□°）╯ 这类字符表情', category: '符号与输入',
      metaTitle: '颜文字大全 — 复制颜文字与字符表情',
      long: '¯\\_(ツ)_/¯、(╯°□°）╯、ಠ_ಠ 这类纯用字符拼出来的表情，按心情分好类。因为是文字不是图片，贴到哪里都不会坏，用在昵称和签名里也可以。',
      features: ['按开心、难过、生气等心情分类', '颜文字与字符表情', '点一下立即复制', '记住最近用过的'],
    },
    replace: {
      title: '查找替换', desc: '在长文里一次替换指定的词', category: '整理与编辑',
      metaTitle: '在线查找替换 — 批量替换，支持正则',
      long: '名字或术语整个改了的时候，不必在长文里一处一处改。可以打开区分大小写和正则表达式，替换前还会先数出有多少处会被改。',
      features: ['替换前先显示匹配数', '可开关区分大小写', '支持正则表达式', '可替换换行（\\n）与制表符'],
    },
    manuscript: {
      title: '字数统计', desc: '统计字数、稿纸张数与剩余额度', category: '统计与写作',
      metaTitle: '字数统计 — 含空格与不含空格、稿纸张数',
      long: '把文字贴进来，它会告出含空格和不含空格各多少字、相当于 200 字稿纸几张。设好投稿或作业给的字数上限，还会显示还差多少字。',
      features: ['200 字／400 字稿纸张数', '含空格与不含空格的字数', '距目标字数还剩多少', '字节数（用于附件限制）'],
    },
    lorem: {
      title: '占位文本生成', desc: '用来填充版面的示例文字', category: '统计与写作',
      metaTitle: '占位文本生成 — Lorem Ipsum 与中文假字',
      long: '做设计稿或界面时用来填空的示例文字。可以设定段数和每段长度，也能按确定的字数裁切，正好塞进你要测的那个框里。',
      features: ['中文假字与英文 lorem ipsum', '指定段数与段落长度', '按字数裁切', '结果一次复制'],
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
  zh: {
    home: '首页', section: '文本工具',
    canDo: '这个工具能做什么', others: '其他文本工具',
    notice: '📝 文字在浏览器内处理，不会上传。',
    footNote: '贴进来的内容不会离开这个页面，草稿和私人笔记也可以放心处理。',
  },
};
