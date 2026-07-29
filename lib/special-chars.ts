/**
 * 특수문자 모음 데이터.
 *
 * 자판에 없는 기호를 쓰려면 보통 "특수문자"를 검색해 아무 블로그에서 복사해
 * 온다. 그 목록들은 대개 분류가 없고 이름도 없어서 원하는 걸 눈으로 찾아야 한다.
 * 여기서는 분류와 이름을 붙여 검색으로 찾을 수 있게 한다 — 이름이 있어야
 * "화살표"나 "제곱미터"로 찾을 수 있다.
 */
export interface CharItem {
  ch: string;
  /** 검색어. 여러 개면 공백으로 잇는다. */
  name: string;
}

export interface CharGroup {
  id: string;
  label: string;
  icon: string;
  items: CharItem[];
}

export const CHAR_GROUPS: CharGroup[] = [
  {
    id: 'arrow',
    label: '화살표',
    icon: '➜',
    items: [
      { ch: '→', name: '오른쪽 화살표' }, { ch: '←', name: '왼쪽 화살표' },
      { ch: '↑', name: '위쪽 화살표' }, { ch: '↓', name: '아래쪽 화살표' },
      { ch: '↔', name: '좌우 화살표' }, { ch: '↕', name: '상하 화살표' },
      { ch: '⇒', name: '두 줄 오른쪽' }, { ch: '⇐', name: '두 줄 왼쪽' },
      { ch: '⇑', name: '두 줄 위' }, { ch: '⇓', name: '두 줄 아래' },
      { ch: '⇔', name: '두 줄 좌우' }, { ch: '➜', name: '굵은 화살표' },
      { ch: '➔', name: '가는 화살표' }, { ch: '➤', name: '삼각 화살표' },
      { ch: '↳', name: '꺾인 화살표 답글' }, { ch: '↰', name: '왼쪽 꺾임' },
      { ch: '⤴', name: '위로 꺾임' }, { ch: '⤵', name: '아래로 꺾임' },
      { ch: '↺', name: '반시계 회전' }, { ch: '↻', name: '시계 회전' },
      { ch: '▶', name: '재생 오른쪽 삼각' }, { ch: '◀', name: '왼쪽 삼각' },
      { ch: '▲', name: '위 삼각' }, { ch: '▼', name: '아래 삼각' },
    ],
  },
  {
    id: 'shape',
    label: '도형·별',
    icon: '★',
    items: [
      { ch: '★', name: '검은 별' }, { ch: '☆', name: '흰 별' },
      { ch: '♥', name: '하트 채움' }, { ch: '♡', name: '하트 빈' },
      { ch: '■', name: '검은 사각형' }, { ch: '□', name: '흰 사각형' },
      { ch: '▣', name: '겹 사각형' }, { ch: '▩', name: '무늬 사각형' },
      { ch: '●', name: '검은 원' }, { ch: '○', name: '흰 원' },
      { ch: '◎', name: '겹 원' }, { ch: '◉', name: '과녁' },
      { ch: '◆', name: '검은 마름모' }, { ch: '◇', name: '흰 마름모' },
      { ch: '△', name: '흰 삼각형' }, { ch: '▽', name: '역삼각형' },
      { ch: '♠', name: '스페이드' }, { ch: '♣', name: '클로버' },
      { ch: '♦', name: '다이아' }, { ch: '♧', name: '빈 클로버' },
      { ch: '▪', name: '작은 검은 사각' }, { ch: '▫', name: '작은 흰 사각' },
      { ch: '◈', name: '겹 마름모' }, { ch: '✦', name: '반짝임' },
    ],
  },
  {
    id: 'punct',
    label: '문장부호·괄호',
    icon: '「」',
    items: [
      { ch: '·', name: '가운뎃점' }, { ch: '…', name: '말줄임표' },
      { ch: '‥', name: '두 점 줄임' }, { ch: '―', name: '줄표 대시' },
      { ch: '–', name: '엔 대시' }, { ch: '—', name: '엠 대시' },
      { ch: '~', name: '물결표' }, { ch: '※', name: '참고 표시 쌀미' },
      { ch: '「', name: '홑낫표 열기' }, { ch: '」', name: '홑낫표 닫기' },
      { ch: '『', name: '겹낫표 열기' }, { ch: '』', name: '겹낫표 닫기' },
      { ch: '〈', name: '홑화살괄호 열기' }, { ch: '〉', name: '홑화살괄호 닫기' },
      { ch: '《', name: '겹화살괄호 열기' }, { ch: '》', name: '겹화살괄호 닫기' },
      { ch: '【', name: '검은 대괄호 열기' }, { ch: '】', name: '검은 대괄호 닫기' },
      { ch: '〔', name: '거북 괄호 열기' }, { ch: '〕', name: '거북 괄호 닫기' },
      { ch: '“', name: '큰따옴표 열기' }, { ch: '”', name: '큰따옴표 닫기' },
      { ch: '‘', name: '작은따옴표 열기' }, { ch: '’', name: '작은따옴표 닫기' },
      { ch: '§', name: '섹션 절' }, { ch: '¶', name: '문단' },
      { ch: '†', name: '단검표' }, { ch: '‡', name: '겹단검표' },
    ],
  },
  {
    id: 'math',
    label: '수학·단위',
    icon: '±',
    items: [
      { ch: '±', name: '플러스마이너스' }, { ch: '×', name: '곱하기' },
      { ch: '÷', name: '나누기' }, { ch: '≠', name: '같지 않음' },
      { ch: '≤', name: '작거나 같음' }, { ch: '≥', name: '크거나 같음' },
      { ch: '≒', name: '근사값 거의 같음' }, { ch: '∞', name: '무한대' },
      { ch: '√', name: '루트 제곱근' }, { ch: '∑', name: '시그마 합' },
      { ch: '∫', name: '적분' }, { ch: '∏', name: '파이 곱' },
      { ch: '∴', name: '그러므로' }, { ch: '∵', name: '왜냐하면' },
      { ch: '∠', name: '각' }, { ch: '⊥', name: '수직' },
      { ch: '∥', name: '평행' }, { ch: '∈', name: '원소' },
      { ch: '°', name: '도 각도' }, { ch: '‰', name: '퍼밀 천분율' },
      { ch: '℃', name: '섭씨 도' }, { ch: '℉', name: '화씨 도' },
      { ch: '㎡', name: '제곱미터' }, { ch: '㎥', name: '세제곱미터' },
      { ch: '㎏', name: '킬로그램' }, { ch: '㎝', name: '센티미터' },
      { ch: '㎞', name: '킬로미터' }, { ch: '㎖', name: '밀리리터' },
    ],
  },
  {
    id: 'money',
    label: '화폐',
    icon: '₩',
    items: [
      { ch: '₩', name: '원 대한민국' }, { ch: '$', name: '달러' },
      { ch: '€', name: '유로' }, { ch: '¥', name: '엔 위안' },
      { ch: '£', name: '파운드' }, { ch: '¢', name: '센트' },
      { ch: '₽', name: '루블' }, { ch: '₹', name: '루피' },
      { ch: '฿', name: '바트' }, { ch: '₫', name: '동 베트남' },
      { ch: '₱', name: '페소' }, { ch: '₿', name: '비트코인' },
    ],
  },
  {
    id: 'circle',
    label: '번호·원문자',
    icon: '①',
    items: [
      { ch: '①', name: '원 숫자 1' }, { ch: '②', name: '원 숫자 2' },
      { ch: '③', name: '원 숫자 3' }, { ch: '④', name: '원 숫자 4' },
      { ch: '⑤', name: '원 숫자 5' }, { ch: '⑥', name: '원 숫자 6' },
      { ch: '⑦', name: '원 숫자 7' }, { ch: '⑧', name: '원 숫자 8' },
      { ch: '⑨', name: '원 숫자 9' }, { ch: '⑩', name: '원 숫자 10' },
      { ch: '㉠', name: '원 기역' }, { ch: '㉡', name: '원 니은' },
      { ch: '㉢', name: '원 디귿' }, { ch: '㉣', name: '원 리을' },
      { ch: '⑴', name: '괄호 1' }, { ch: '⑵', name: '괄호 2' },
      { ch: '⑶', name: '괄호 3' }, { ch: '㈜', name: '주식회사' },
      { ch: 'Ⅰ', name: '로마 숫자 1' }, { ch: 'Ⅱ', name: '로마 숫자 2' },
      { ch: 'Ⅲ', name: '로마 숫자 3' }, { ch: 'Ⅳ', name: '로마 숫자 4' },
      { ch: 'Ⅴ', name: '로마 숫자 5' }, { ch: 'Ⅹ', name: '로마 숫자 10' },
    ],
  },
  {
    id: 'greek',
    label: '그리스 문자',
    icon: 'π',
    items: [
      { ch: 'α', name: '알파' }, { ch: 'β', name: '베타' }, { ch: 'γ', name: '감마' },
      { ch: 'δ', name: '델타' }, { ch: 'ε', name: '엡실론' }, { ch: 'θ', name: '세타' },
      { ch: 'λ', name: '람다' }, { ch: 'μ', name: '뮤 마이크로' }, { ch: 'π', name: '파이' },
      { ch: 'σ', name: '시그마' }, { ch: 'τ', name: '타우' }, { ch: 'φ', name: '피' },
      { ch: 'ω', name: '오메가' }, { ch: 'Δ', name: '대문자 델타' },
      { ch: 'Σ', name: '대문자 시그마' }, { ch: 'Ω', name: '대문자 오메가' },
      { ch: 'Φ', name: '대문자 피' }, { ch: 'Ψ', name: '프사이' },
    ],
  },
  {
    id: 'misc',
    label: '기타 기호',
    icon: '✔',
    items: [
      { ch: '✔', name: '체크 표시' }, { ch: '✓', name: '가는 체크' },
      { ch: '✗', name: '엑스 표시' }, { ch: '✘', name: '굵은 엑스' },
      { ch: '☎', name: '전화' }, { ch: '✆', name: '수화기' },
      { ch: '✉', name: '편지 메일' }, { ch: '✂', name: '가위' },
      { ch: '✈', name: '비행기' }, { ch: '☜', name: '왼쪽 손가락' },
      { ch: '☞', name: '오른쪽 손가락' }, { ch: '♪', name: '음표' },
      { ch: '♬', name: '두 음표' }, { ch: '♭', name: '플랫' },
      { ch: '♯', name: '샵' }, { ch: '☀', name: '해 맑음' },
      { ch: '☁', name: '구름 흐림' }, { ch: '☂', name: '우산 비' },
      { ch: '☃', name: '눈사람' }, { ch: '⚠', name: '경고' },
      { ch: '♻', name: '재활용' }, { ch: '✿', name: '꽃' },
      { ch: '❀', name: '꽃 무늬' }, { ch: '☯', name: '태극' },
    ],
  },
];

/** 이름이나 기호 자체로 찾는다. */
export function searchChars(query: string): CharItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CHAR_GROUPS.flatMap(g => g.items).filter(
    item => item.ch === q || item.name.toLowerCase().includes(q),
  );
}

export const TOTAL_CHARS = CHAR_GROUPS.reduce((n, g) => n + g.items.length, 0);
