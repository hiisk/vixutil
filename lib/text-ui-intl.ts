/**
 * 텍스트 도구 화면 문구의 세 언어 사전.
 *
 * 기호·이모티콘 데이터의 이름표는 lib/text-intl.ts, 정리·치환 계산은
 * lib/text-clean.ts에 있다. 여기에는 라벨·버튼·설명 문단만 둔다.
 */
import type { TextLang } from './text-intl.ts';
export type { TextLang };

/** 여러 도구가 공유하는 입력·복사 조각 */
export const TEXT_COMMON: Record<TextLang, {
  input: string; output: string; empty: string; clear: string;
  copy: string; copied: string; copiedShort: string; copyShort: string;
}> = {
  ko: {
    input: '입력', output: '결과', empty: '위에 글을 입력하면 결과가 나옵니다', clear: '지우기',
    copy: '복사하기', copied: '✅ 복사했습니다', copiedShort: '복사됨', copyShort: '복사',
  },
  en: {
    input: 'Input', output: 'Result', empty: 'Type something above and the result appears here', clear: 'Clear',
    copy: 'Copy', copied: '✅ Copied', copiedShort: 'Copied', copyShort: 'Copy',
  },
};

export const CLEAN_UI: Record<TextLang, {
  labels: string[]; hints: string[];
  inputLabel: string; placeholder: string; whatTitle: string;
  nothing: string; shrunk: (n: number) => string; cleaned: string; outputLabel: string;
}> = {
  ko: {
    labels: ['보이지 않는 문자 제거', '특수 공백을 일반 공백으로', '중복 공백 하나로', '줄 앞뒤 공백 제거', '연속 빈 줄 줄이기', '끊긴 줄 이어 붙이기', '굽은 따옴표를 일반 따옴표로', 'HTML 태그 제거'],
    hints: ['폭 없는 공백·BOM 등 — 글자 수만 늘리고 검색을 망칩니다', '공백처럼 보이지만 다른 문자(NBSP 등)', '두 칸 이상 띄어진 곳을 한 칸으로', '', '세 줄 이상 비어 있으면 한 줄만 남깁니다', 'PDF에서 복사하면 문장 중간에서 줄이 끊깁니다', '“ ” ‘ ’ → " \'', '<p> 같은 태그를 지웁니다'],
    inputLabel: '정리할 글을 붙여 넣으세요',
    placeholder: 'PDF·웹·워드에서 복사한 글을 그대로 붙여 넣으면 됩니다',
    whatTitle: '무엇을 정리할까요',
    nothing: '고칠 것이 없습니다 — 이미 깨끗한 글입니다',
    shrunk: n => `${n}자 줄었습니다`, cleaned: '정리했습니다', outputLabel: '정리된 글',
  },
  en: {
    labels: ['Remove invisible characters', 'Odd spaces to normal spaces', 'Collapse repeated spaces', 'Trim each line', 'Reduce consecutive blank lines', 'Join broken lines', 'Curly quotes to straight quotes', 'Strip HTML tags'],
    hints: ['Zero-width spaces, BOM and the like — they inflate counts and break search', 'Characters that look like a space but are not (NBSP and friends)', 'Two or more spaces become one', '', 'Three or more blank lines become one', 'Copying from a PDF breaks lines mid-sentence', '“ ” ‘ ’ → " \'', 'Removes tags like <p>'],
    inputLabel: 'Paste the text you want cleaned',
    placeholder: 'Paste text copied from a PDF, a web page or Word, exactly as it came',
    whatTitle: 'What to clean',
    nothing: 'Nothing to fix — this text is already clean',
    shrunk: n => `${n} characters removed`, cleaned: 'Cleaned', outputLabel: 'Cleaned text',
  },
};

export const DEDUPE_UI: Record<TextLang, {
  inputLabel: string; placeholder: string;
  dedupe: string; ignoreSpace: string; ignoreSpaceHint: string;
  ignoreCase: string; ignoreCaseHint: string; removeBlank: string;
  numbered: string; numberedHint: string;
  sortTitle: string; sortModes: string[];
  totalLines: string; keptLines: string; removedLines: string; outputLabel: string;
}> = {
  ko: {
    inputLabel: '목록을 붙여 넣으세요 (한 줄에 하나)', placeholder: '김철수\n이영희\n김철수\n박민수',
    dedupe: '중복 줄 제거',
    ignoreSpace: '앞뒤·중간 공백 차이는 같은 줄로', ignoreSpaceHint: "'김철수'와 '김철수 '를 하나로 봅니다",
    ignoreCase: '대소문자 차이는 같은 줄로', ignoreCaseHint: 'Apple과 apple을 하나로 봅니다',
    removeBlank: '빈 줄 제거', numbered: '번호 매기기', numberedHint: '1. 2. 3. 을 앞에 붙입니다',
    sortTitle: '정렬', sortModes: ['원래 순서', '가나다순', '역순'],
    totalLines: '원래 줄', keptLines: '남은 줄', removedLines: '지운 줄', outputLabel: '정리된 목록',
  },
  en: {
    inputLabel: 'Paste your list (one per line)', placeholder: 'Alice\nBob\nAlice\nCarol',
    dedupe: 'Remove duplicate lines',
    ignoreSpace: 'Whitespace differences count as the same line', ignoreSpaceHint: "'Alice' and 'Alice ' are treated as one",
    ignoreCase: 'Case differences count as the same line', ignoreCaseHint: 'Apple and apple are treated as one',
    removeBlank: 'Remove blank lines', numbered: 'Number the lines', numberedHint: 'Prefixes 1. 2. 3.',
    sortTitle: 'Sort', sortModes: ['Original order', 'A → Z', 'Z → A'],
    totalLines: 'Lines in', keptLines: 'Lines kept', removedLines: 'Lines removed', outputLabel: 'Tidied list',
  },
};

export const CASE_UI: Record<TextLang, {
  labels: string[]; hints: string[];
  inputLabel: string; placeholder: string;
  noteTitle: string; note: string;
}> = {
  ko: {
    labels: ['전부 대문자 (UPPERCASE)', '전부 소문자 (lowercase)', '단어 첫 글자만 대문자 (Title Case)', '문장 첫 글자만 대문자 (Sentence case)', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', '대소문자 뒤집기'],
    hints: ['', '', '제목·이름에 씁니다', '', '변수 이름', '클래스·컴포넌트 이름', 'DB 컬럼·파이썬', 'URL·CSS 클래스', '환경변수·상수', ''],
    inputLabel: '영문 텍스트를 입력하세요', placeholder: '예) hello world example',
    noteTitle: '한글은 어떻게 되나요?',
    note: '한글에는 대문자와 소문자가 없어서 그대로 남습니다. 영문과 한글이 섞인 문장을 넣으면 영문 부분만 바뀝니다.',
  },
  en: {
    labels: ['UPPERCASE', 'lowercase', 'Title Case', 'Sentence case', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'tOGGLE cASE'],
    hints: ['', '', 'For headings and names', '', 'Variable names', 'Class and component names', 'DB columns, Python', 'URLs, CSS classes', 'Environment variables, constants', ''],
    inputLabel: 'Enter your text', placeholder: 'e.g. hello world example',
    noteTitle: 'What about scripts without case?',
    note: 'Scripts like Hangul, Chinese and Japanese have no upper or lower case, so those characters pass through unchanged. In mixed text only the Latin letters change.',
  },
};

export const REPLACE_UI: Record<TextLang, {
  sourceLabel: string; sourcePlaceholder: string;
  findLabel: string; findPlaceholder: string; toLabel: string; toPlaceholder: string;
  caseSensitive: string; caseSensitiveHint: string; regex: string; regexHint: string;
  escapeNoteBefore: string; escapeNoteMid: string; escapeNoteAfter: string;
  regexError: (msg: string) => string;
  willChange: (n: number) => string; noMatch: string; outputLabel: string;
}> = {
  ko: {
    sourceLabel: '원본 글', sourcePlaceholder: '바꿀 내용이 들어 있는 글을 붙여 넣으세요',
    findLabel: '찾을 내용', findPlaceholder: '바꿀 단어', toLabel: '바꿀 내용', toPlaceholder: '새 단어 (비우면 삭제)',
    caseSensitive: '대소문자 구분', caseSensitiveHint: '끄면 Apple과 apple을 모두 찾습니다',
    regex: '정규식으로 찾기', regexHint: '\\d+ 처럼 패턴으로 찾습니다',
    escapeNoteBefore: '찾을 내용에 ', escapeNoteMid: '을 넣으면 줄바꿈을, ', escapeNoteAfter: '는 탭을 찾습니다.',
    regexError: msg => `정규식 오류: ${msg}`,
    willChange: n => `${n}곳이 바뀝니다`, noMatch: '찾는 내용이 없습니다', outputLabel: '바꾼 결과',
  },
  en: {
    sourceLabel: 'Source text', sourcePlaceholder: 'Paste the text containing what you want to change',
    findLabel: 'Find', findPlaceholder: 'word to replace', toLabel: 'Replace with', toPlaceholder: 'new word (leave empty to delete)',
    caseSensitive: 'Match case', caseSensitiveHint: 'Off means Apple and apple both match',
    regex: 'Use a regular expression', regexHint: 'Match patterns like \\d+',
    escapeNoteBefore: 'Put ', escapeNoteMid: ' in the find field to match a newline, and ', escapeNoteAfter: ' for a tab.',
    regexError: msg => `Regex error: ${msg}`,
    willChange: n => `${n} matches will change`, noMatch: 'No matches found', outputLabel: 'Result',
  },
};

export const MANUSCRIPT_UI: Record<TextLang, {
  inputLabel: string; placeholder: string;
  withSpaces: string; withoutSpaces: string; sheets200: string; sheets400: string;
  sheetSuffix: (n: number) => string;
  words: string; lines: string; paragraphs: string; bytes: string;
  targetTitle: string; countingWith: string; countingWithout: string;
  charSuffix: (n: number) => string; emptyHint: string;
  used: (used: number, target: number, left: number) => string;
  over: (used: number, target: number, over: number) => string;
  noteTitle: string; notes: string[];
}> = {
  ko: {
    inputLabel: '글을 붙여 넣으세요', placeholder: '자기소개서나 원고를 그대로 붙여 넣으면 됩니다',
    withSpaces: '공백 포함', withoutSpaces: '공백 제외', sheets200: '200자 원고지', sheets400: '400자 원고지',
    sheetSuffix: n => `${n}매`,
    words: '단어', lines: '줄', paragraphs: '문단', bytes: '바이트(UTF-8)',
    targetTitle: '목표 글자수', countingWith: '공백 포함으로 세는 중', countingWithout: '공백 제외로 세는 중',
    charSuffix: n => `${n}자`, emptyHint: '글을 넣으면 남은 글자수를 세어 드립니다',
    used: (used, target, left) => `${used}자 / ${target}자 · ${left}자 더 쓸 수 있습니다`,
    over: (used, target, over) => `${used}자 / ${target}자 · ${over}자 초과했습니다`,
    noteTitle: '기준이 헷갈릴 때',
    notes: [
      '· 자기소개서는 대개 공백 포함으로 셉니다. 채용 공고에 명시가 없으면 공백 포함으로 맞추는 편이 안전합니다.',
      '· 원고지는 칸을 세므로 띄어쓰기도 한 칸을 차지합니다. 그래서 원고지 매수는 공백 포함 글자수로 계산합니다.',
      '· 입력창에 글자수 제한이 걸린 사이트는 대부분 공백을 포함해 셉니다.',
    ],
  },
  en: {
    inputLabel: 'Paste your text', placeholder: 'Paste an essay, an application or a draft exactly as it is',
    withSpaces: 'With spaces', withoutSpaces: 'Without spaces', sheets200: 'Pages (200 chars)', sheets400: 'Pages (400 chars)',
    sheetSuffix: n => `${n}`,
    words: 'Words', lines: 'Lines', paragraphs: 'Paragraphs', bytes: 'Bytes (UTF-8)',
    targetTitle: 'Your limit', countingWith: 'counting with spaces', countingWithout: 'counting without spaces',
    charSuffix: n => `${n}`, emptyHint: 'Add some text and it counts what you have left',
    used: (used, target, left) => `${used} / ${target} · ${left} left`,
    over: (used, target, over) => `${used} / ${target} · ${over} over`,
    noteTitle: 'Which count do you need',
    notes: [
      '· Application forms almost always count characters including spaces. When the brief does not say, assume spaces count.',
      '· Word count is the usual measure for essays and articles; character count is what forms and input fields enforce.',
      '· Sites with a character limit on the input field nearly always include spaces in it.',
    ],
  },
};

export const LOREM_UI: Record<TextLang, {
  noLimit: string; langs: string[];
  paragraphCount: string; paragraphUnit: string;
  sentenceCount: string; sentenceUnit: string;
  charLimit: string; charUnit: string;
  regenerate: string; sameSeed: (seed: number) => string;
  charCount: string; paragraphs: string; words: string; outputLabel: string;
  noteTitle: string; note: string;
}> = {
  ko: {
    noLimit: '제한 없음', langs: ['한글 문장', '영문 (Lorem ipsum)'],
    paragraphCount: '문단 수', paragraphUnit: '개',
    sentenceCount: '문단당 문장 수', sentenceUnit: '문장',
    charLimit: '글자수 제한', charUnit: '자',
    regenerate: '🔄 다른 문장으로 다시 만들기', sameSeed: seed => `같은 설정이면 같은 결과가 나옵니다 (현재 ${seed}번째)`,
    charCount: '글자수', paragraphs: '문단', words: '단어', outputLabel: '생성된 텍스트',
    noteTitle: '왜 한글 더미가 필요한가요?',
    note: '영문 로렘입숨은 한글보다 글자 폭이 좁고 띄어쓰기가 잦아서, 같은 자리에 실제 한글을 넣으면 줄 수가 늘고 레이아웃이 무너집니다. 한글 화면을 만들 때는 한글 더미로 확인하세요.',
  },
  en: {
    noLimit: 'No limit', langs: ['CJK filler', 'Latin (Lorem ipsum)'],
    paragraphCount: 'Paragraphs', paragraphUnit: '',
    sentenceCount: 'Sentences per paragraph', sentenceUnit: '',
    charLimit: 'Character limit', charUnit: '',
    regenerate: '🔄 Generate different text', sameSeed: seed => `The same settings give the same output (currently #${seed})`,
    charCount: 'Characters', paragraphs: 'Paragraphs', words: 'Words', outputLabel: 'Generated text',
    noteTitle: 'Why the CJK option',
    note: 'Latin lorem ipsum has narrower glyphs and far more spaces than Chinese, Japanese or Korean text. Design a layout against Latin filler and real CJK content will run to more lines and break it. If the screen ships in a CJK language, test it with CJK filler.',
  },
};

export const COPY_PICKER_UI: Record<TextLang, {
  copied: string; searchPlaceholder: string; recentTitle: string;
  foundCount: (n: number) => string; notFound: string;
}> = {
  ko: {
    copied: '복사됨', searchPlaceholder: '이름으로 찾기 — 화살표, 제곱미터, 하트…',
    recentTitle: '최근에 쓴 것',
    foundCount: n => `검색 결과 ${n}개`, notFound: '찾는 기호가 없습니다. 다른 이름으로 검색해 보세요.',
  },
  en: {
    copied: 'Copied', searchPlaceholder: 'Search by name — arrow, square metre, heart…',
    recentTitle: 'Recently used',
    foundCount: n => `${n} results`, notFound: 'No symbol matches that. Try another name.',
  },
};

export const SYMBOL_TOOL_UI: Record<TextLang, { specialHint: string; emoticonHint: string }> = {
  ko: {
    specialHint: '누르면 클립보드에 복사됩니다. 붙여 넣을 곳의 글꼴이 그 기호를 갖고 있지 않으면 네모(□)로 보일 수 있는데, 이때는 다른 기호를 쓰거나 글꼴을 바꿔야 합니다.',
    emoticonHint: '문자로 만든 이모티콘이라 이미지가 아닙니다. 닉네임·상태 메시지처럼 그림 이모지를 못 쓰는 곳에도 들어가고, 어떤 기기에서 봐도 같은 모양으로 보입니다.',
  },
  en: {
    specialHint: 'Tap to copy to your clipboard. If the font where you paste it does not have that glyph you will see a box (□) instead — use a different symbol or change the font.',
    emoticonHint: 'These are built from characters, not images. They work in places that reject emoji, like usernames and status messages, and they look the same on every device.',
  },
};
