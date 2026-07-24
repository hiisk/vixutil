import type { Quiz } from './types';

/**
 * 정답 위치와 보기 길이를 의도적으로 섞어 두었다.
 * tests/quiz-quality.test.ts가 정답 쏠림과 "정답만 유독 긴" 패턴을 막는다.
 */
export const QUIZZES_O: Quiz[] = [
  {
    slug: 'excel', title: '엑셀 상식 퀴즈', desc: '함수와 단축키로 보는 실무 엑셀 10문항', icon: '📊', category: '기술·IT',
    questions: [
      { q: '여러 셀의 합계를 구하는 함수는?', opts: ['AVERAGE', 'SUM', 'COUNT', 'MAX'], correct: 1, explanation: 'SUM은 지정한 범위의 숫자를 모두 더합니다. AVERAGE는 평균, COUNT는 개수, MAX는 최댓값을 구합니다.' },
      { q: '조건에 맞는 셀의 개수를 세는 함수는?', opts: ['COUNTIF', 'SUMIF', 'VLOOKUP', 'INDEX'], correct: 0, explanation: 'COUNTIF는 조건을 만족하는 셀의 개수를 셉니다. SUMIF는 조건에 맞는 값의 합을, VLOOKUP은 값 찾기를 합니다.' },
      { q: '수식에서 셀을 절대 참조로 고정할 때 붙이는 기호는?', opts: ['& 기호', '# 기호', '$ 기호', '% 기호'], correct: 2, explanation: '$A$1처럼 행과 열 앞에 $를 붙이면 수식을 복사해도 참조가 바뀌지 않습니다. F4 키로 빠르게 넣을 수 있습니다.' },
      { q: '표에서 값을 세로 방향으로 찾아오는 함수는?', opts: ['HLOOKUP', 'VLOOKUP', 'LOOKUP', 'CHOOSE'], correct: 1, explanation: 'VLOOKUP은 첫 열에서 값을 찾아 같은 행의 다른 값을 가져옵니다. 가로 방향으로 찾을 때는 HLOOKUP을 씁니다.' },
      { q: '선택한 영역을 자동으로 합계하는 단축키는?', opts: ['Alt + =', 'Ctrl + S', 'Ctrl + P', 'Ctrl + Z'], correct: 0, explanation: 'Alt와 =를 함께 누르면 SUM 함수가 자동으로 입력됩니다. Ctrl+S는 저장, Ctrl+P는 인쇄, Ctrl+Z는 실행 취소입니다.' },
      { q: '한 셀 안에서 줄을 바꾸는 단축키는?', opts: ['Enter', 'Alt + Enter', 'Ctrl + Enter', 'Shift + Tab'], correct: 1, explanation: '셀 안에서 Alt+Enter를 누르면 같은 셀에서 다음 줄로 넘어갑니다. 그냥 Enter를 누르면 아래 셀로 이동합니다.' },
      { q: '숫자를 지정한 자리에서 반올림하는 함수는?', opts: ['ROUND', 'TRIM', 'LEFT', 'LEN'], correct: 0, explanation: 'ROUND는 지정한 자릿수에서 반올림합니다. TRIM은 공백 제거, LEFT는 왼쪽 글자 추출, LEN은 글자 수를 셉니다.' },
      { q: 'IF 함수에서 가장 먼저 넣는 인수는?', opts: ['참일 때 값', '거짓일 때 값', '조건식', '셀 범위'], correct: 2, explanation: 'IF(조건식, 참일 때 값, 거짓일 때 값) 순서입니다. 조건식을 먼저 쓰고 결과를 뒤에 지정합니다.' },
      { q: '여러 조건을 모두 만족하는지 판단하는 함수는?', opts: ['OR', 'AND', 'NOT', 'IFS'], correct: 1, explanation: 'AND는 모든 조건이 참이어야 참을 반환합니다. OR는 하나만 참이어도 참, NOT은 참·거짓을 뒤집습니다.' },
      { q: '셀에 입력한 날짜에서 오늘 날짜를 반환하는 함수는?', opts: ['NOW', 'TODAY', 'DATE', 'TIME'], correct: 1, explanation: 'TODAY는 오늘 날짜를 반환합니다. NOW는 날짜와 시각을 함께, DATE는 연·월·일로 날짜를 만들 때 씁니다.' },
    ],
  },
];
