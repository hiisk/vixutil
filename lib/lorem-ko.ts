/**
 * 더미 텍스트 생성.
 *
 * 영문 로렘입숨을 한글 화면에 넣으면 글자 폭과 줄 길이가 실제와 달라서
 * 레이아웃이 완성된 뒤에 무너진다 — 한글은 글자 하나가 넓고 띄어쓰기가 적다.
 * 그래서 한글 문장 재료를 따로 둔다.
 *
 * 문장은 뜻이 통하지 않아도 되지만 읽을 때 거슬리지 않아야 해서, 실제 문장의
 * 리듬(주어·서술어·조사)을 흉내 낸 조각들을 조합한다.
 */
const KO_SUBJECT = [
  '이 문서는', '화면 구성은', '사용자는', '기본 설정은', '아래 내용은', '해당 기능은',
  '전체 목록은', '선택한 항목은', '표시된 값은', '연결된 정보는', '이번 변경은', '준비된 예시는',
];
const KO_MIDDLE = [
  '실제 데이터가 들어오기 전까지', '레이아웃을 확인하기 위해', '길이를 가늠할 목적으로',
  '디자인 검토 과정에서', '화면 밀도를 보기 위해', '줄바꿈이 어떻게 되는지 보려고',
  '글자 크기를 정하기 전에', '여백을 조정하는 동안',
];
const KO_END = [
  '임시로 채워 넣은 문장입니다.', '보여주는 예시 문구입니다.', '자리를 대신 채우고 있습니다.',
  '넣어 둔 내용이며 곧 교체됩니다.', '쓰이는 견본 문장입니다.', '표시되는 임시 텍스트입니다.',
  '사용하는 대체 문장입니다.', '들어가 있는 예시입니다.',
];

/*
  중국어 재료. 한글과 같은 이유로 필요하다 — 한자는 글자 하나가 넓고 띄어쓰기가
  아예 없어서, 라틴 문자 로렘입숨으로 짠 版面에 실제 중국어를 넣으면 줄 수가 달라진다.
*/
const ZH_SUBJECT = [
  '这份文档', '界面结构', '用户', '默认设置', '下面的内容', '该功能',
  '整个列表', '选中的项目', '显示的数值', '相关的信息', '本次改动', '准备好的示例',
];
const ZH_MIDDLE = [
  '在真实数据进来之前', '为了确认版面', '用来估计长度',
  '在设计评审的过程中', '为了看清画面密度', '为了看换行会怎样',
  '在定下字号之前', '在调整留白的时候',
];
const ZH_END = [
  '暂时填进来的句子。', '用来展示的示例文字。', '正在代为占位。',
  '放在这里的内容，稍后会替换。', '使用的样例句子。', '显示出来的临时文本。',
  '所用的替代句子。', '放进去的示例。',
];

const EN_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
];

/**
 * 씨앗값으로 도는 난수. Math.random을 쓰면 같은 설정에서 누를 때마다 결과가
 * 달라져 "방금 그게 더 나았는데"를 되돌릴 수 없다. 씨앗을 보여주고 고정한다.
 */
function rng(seed: number) {
  let state = seed >>> 0 || 1;
  return () => {
    state ^= state << 13; state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5; state >>>= 0;
    return state / 0xffffffff;
  };
}

export interface LoremOptions {
  lang?: 'ko' | 'en';
  /** 문단 수 */
  paragraphs?: number;
  /** 문단당 문장 수 */
  sentences?: number;
  seed?: number;
}

export function generateLorem({ lang = 'ko', paragraphs = 3, sentences = 4, seed = 1 }: LoremOptions = {}): string {
  const rand = rng(seed);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length) % arr.length];

  const out: string[] = [];
  for (let p = 0; p < Math.max(1, paragraphs); p++) {
    const lines: string[] = [];
    for (let s = 0; s < Math.max(1, sentences); s++) {
      if (lang === 'ko') {
        lines.push(`${pick(KO_SUBJECT)} ${pick(KO_MIDDLE)} ${pick(KO_END)}`);
      } else if (false) {
        // 중국어는 낱말 사이를 띄우지 않는다
        lines.push(`${pick(ZH_SUBJECT)}${pick(ZH_MIDDLE)}${pick(ZH_END)}`);
      } else {
        const len = 8 + Math.floor(rand() * 8);
        const words = Array.from({ length: len }, () => pick(EN_WORDS));
        const sentence = words.join(' ');
        lines.push(sentence[0].toUpperCase() + sentence.slice(1) + '.');
      }
    }
    out.push(lines.join(' '));
  }
  return out.join('\n\n');
}

/** 글자수에 맞춰 자른다. 문장 중간에서 끊기지 않게 마지막 문장 경계까지만 남긴다. */
export function trimToLength(text: string, limit: number): string {
  if (limit <= 0 || text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastStop = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('다.'), cut.lastIndexOf('。'));
  return lastStop > limit * 0.5 ? cut.slice(0, lastStop + 1) : cut;
}
