/**
 * 상세 콘텐츠 페이지(심리테스트·퀴즈·생성기·체크리스트)의 자주 묻는 질문.
 *
 * 계산기(CALC_FAQ)나 섹션 허브(SECTION_FAQ)와 달리 여기는 700개가 넘어서
 * 손으로 다 쓸 수 없다. 대신 각 콘텐츠의 실제 데이터 — 문항 수, 결과 유형,
 * 채점 방식, 생성기 타입, 체크리스트 분류 — 를 읽어 문항을 만든다.
 * 페이지마다 숫자와 목록이 달라지므로 답변이 서로 복제되지 않는다.
 *
 * 사이트 공통 안내(무료·회원가입·개인정보)는 허브의 SECTION_FAQ가 이미 다루므로
 * 여기서는 되풀이하지 않는다 — 700페이지에 같은 문답이 깔리면 오히려 감점이다.
 *
 * 템플릿이 어색한 콘텐츠는 CONTENT_FAQ_OVERRIDE에 라우트 경로(선행 슬래시 제외)를
 * 키로 직접 써넣으면 템플릿 대신 그 값이 쓰인다. (예: 'test/mbti-love')
 */
import type { FaqItem } from './calc-faq';
import type { Test, Quiz, Generator, Checklist } from './types';
import { BATCH } from './generate';

/** 템플릿 대신 손으로 쓴 FAQ를 쓰고 싶을 때. 키는 'test/slug' 형태. */
export const CONTENT_FAQ_OVERRIDE: Record<string, FaqItem[]> = {};

/**
 * 목록을 "A, B, C 등"으로 줄여 쓴다. 답변이 길어지면 스니펫에서 잘린다.
 * 개수는 붙이지 않는다 — 부르는 쪽 문장이 이미 개수를 말하고 있어서 겹친다.
 */
function summarize(names: string[], limit = 3): string {
  const head = names.slice(0, limit).join(', ');
  return names.length > limit ? `${head} 등` : head;
}

/** 문항 수로 소요 시간을 어림한다. 한 문항당 7초, 최소 1분. */
function estimateMinutes(questionCount: number): number {
  return Math.max(1, Math.round((questionCount * 7) / 60));
}

/**
 * 문장 끝에 이어 붙일 조각을 다듬는다.
 * 원본 설명이 마침표로 끝나면 우리가 붙이는 마침표와 겹쳐 ".." 가 된다.
 */
function trimTail(text: string): string {
  return text.replace(/[.!?。]+$/, '');
}

/**
 * "즉시 — 확산부터 막는다" 같은 소제목에서 앞머리만 남긴다.
 * 이걸 안 하면 목록을 줄표로 잇는 문장 안에 줄표가 또 끼어 읽기 어려워진다.
 */
function shortLabel(title: string): string {
  return title.split(/\s*[—–:]\s*/)[0];
}

export function testFaq(test: Test): FaqItem[] {
  const n = test.questions.length;
  const isMbti = test.type === 'mbti';
  // "스킨십형 — 닿아 있어야 안심돼요 🤗"처럼 유형명에도 줄표가 있어 앞머리만 쓴다.
  const resultTitles = test.results.map(r => shortLabel(r.title));

  return [
    {
      q: `${test.title}는 몇 문항이고 얼마나 걸리나요?`,
      a: `${n}문항입니다. 한 문항당 5~10초면 충분해서 전체 ${estimateMinutes(n)}분 정도면 끝납니다.`,
    },
    {
      q: `${test.title}의 결과 유형은 몇 가지인가요?`,
      // 유형 이름 끝이 이모지·자모 제각각이라 조사를 붙일 수 없다. 줄표로 잇는다.
      a: `${test.results.length}가지 유형이 있습니다 — ${summarize(resultTitles)}.`,
    },
    {
      q: `${test.title}는 어떤 방식으로 결과가 정해지나요?`,
      a: isMbti
        ? `각 문항이 E/I·S/N·T/F·J/P 네 축 중 하나에 배점되고, 축별 합계로 16가지 중 하나의 유형이 결정됩니다.`
        : `선택지마다 배점이 있고 ${n}문항의 합계 점수가 속한 구간의 유형이 결과가 됩니다. 정답·오답은 없습니다.`,
    },
    {
      q: `${test.title}를 다시 해도 되나요?`,
      a: `네, 횟수 제한 없이 다시 할 수 있습니다. 응답과 채점은 브라우저 안에서만 처리되고 서버로 전송되지 않으므로 이전 결과가 남지도 않습니다.`,
    },
  ];
}

export function quizFaq(quiz: Quiz): FaqItem[] {
  const n = quiz.questions.length;
  const optCount = quiz.questions[0]?.opts.length ?? 4;
  const explained = quiz.questions.filter(q => q.explanation).length;

  const items: FaqItem[] = [
    {
      q: `${quiz.title}는 몇 문제인가요?`,
      a: `${n}문제이며 문제마다 보기 ${optCount}개 중 하나를 고릅니다. 전체 ${estimateMinutes(n)}분 정도 걸립니다.`,
    },
    {
      q: `${quiz.title} 점수는 어떻게 매겨지나요?`,
      a: `맞힌 개수를 ${n}문제 기준으로 환산해 점수와 정답률을 함께 보여줍니다. 문제를 풀 때마다 정답 여부가 바로 표시됩니다.`,
    },
    {
      q: `${quiz.title}는 어떤 분야를 다루나요?`,
      a: `${quiz.category} 분야의 상식 문제로 구성했습니다 — ${trimTail(quiz.desc)}.`,
    },
  ];

  items.push(
    explained === n
      ? {
          q: `틀린 문제의 해설을 볼 수 있나요?`,
          a: `네, ${n}문제 모두 해설이 붙어 있습니다. 보기를 고르면 정답과 함께 왜 그런지 바로 확인할 수 있습니다.`,
        }
      : {
          q: `${quiz.title}를 다시 풀 수 있나요?`,
          a: `네, 횟수 제한 없이 다시 풀 수 있습니다. 문제와 보기 순서는 그대로라 틀린 문제를 복습하기 좋습니다.`,
        },
  );

  return items;
}

/** 생성기 타입별로 "어떻게 만들어지나" 답이 완전히 다르다. */
function generatorMechanics(gen: Generator): string {
  switch (gen.type) {
    case 'combine': {
      const pools = gen.pools ?? [];
      const combos = pools.reduce((acc, p) => acc * p.length, 1);
      return `단어 묶음 ${pools.length}개에서 하나씩 뽑아 이어 붙입니다. 나올 수 있는 조합은 약 ${combos.toLocaleString('ko-KR')}가지입니다.`;
    }
    case 'pick':
      return `미리 준비한 후보 ${(gen.items?.length ?? 0).toLocaleString('ko-KR')}개 중에서 무작위로 하나를 고릅니다.`;
    case 'password':
      return `대문자·소문자·숫자·기호를 섞어 ${gen.count ?? 16}자로 만듭니다. 대문자·숫자·기호가 각각 최소 한 개씩 들어가고, 눈으로 헷갈리는 I·l·1·O·0은 빼서 옮겨 적기 편합니다.`;
    case 'number':
      return `${(gen.min ?? 1).toLocaleString('ko-KR')}부터 ${(gen.max ?? 100).toLocaleString('ko-KR')}까지 중에서 무작위로 하나를 뽑습니다. 모든 숫자가 같은 확률입니다.`;
    case 'sample':
      return `${(gen.min ?? 1).toLocaleString('ko-KR')}~${(gen.max ?? 45).toLocaleString('ko-KR')} 범위에서 중복 없이 ${gen.count ?? 6}개를 뽑아 오름차순으로 보여줍니다.`;
    default:
      return `무작위로 결과를 생성합니다.`;
  }
}

export function generatorFaq(gen: Generator): FaqItem[] {
  const isPassword = gen.type === 'password';

  return [
    {
      q: `${gen.title}는 어떻게 만들어지나요?`,
      a: generatorMechanics(gen),
    },
    {
      q: `${gen.title}로 한 번에 몇 개를 뽑을 수 있나요?`,
      a: `버튼을 누를 때마다 ${BATCH}개씩 나옵니다. 마음에 드는 결과가 없으면 횟수 제한 없이 다시 뽑을 수 있습니다.`,
    },
    isPassword
      ? {
          q: `생성된 비밀번호가 서버로 전송되나요?`,
          a: `아닙니다. 비밀번호는 브라우저 안에서만 만들어지며 서버로 전송되거나 저장되지 않습니다. 다만 공용 PC에서는 사용 후 화면을 지우시는 편이 안전합니다.`,
        }
      : {
          q: `${gen.title} 결과를 자유롭게 써도 되나요?`,
          a: `네. 게임 닉네임, 콘텐츠 소재, 상업적 용도 모두 제한 없이 쓰셔도 됩니다. 다만 실존하는 상표나 인명과 우연히 겹칠 수 있으니 상표 등록 전에는 따로 확인하세요.`,
        },
    {
      q: `${gen.title} 결과를 저장하거나 공유할 수 있나요?`,
      a: `결과 옆의 복사 버튼으로 클립보드에 담거나, 공유 버튼으로 링크를 보낼 수 있습니다. 결과는 무작위라 링크를 받은 사람에게는 새 결과가 나옵니다.`,
    },
  ];
}

export function checklistFaq(checklist: Checklist): FaqItem[] {
  const sectionTitles = checklist.sections.map(s => shortLabel(s.title));
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);

  return [
    {
      q: `${checklist.title}는 몇 개 항목인가요?`,
      a: `${checklist.sections.length}개 분류에 걸쳐 총 ${total}개 항목입니다 — ${summarize(sectionTitles)}.`,
    },
    {
      q: `체크한 내용이 저장되나요?`,
      a: `네. 체크 상태는 사용 중인 브라우저에 저장되어 나중에 다시 들어와도 이어서 진행할 수 있습니다. 서버로 전송되지는 않으므로 다른 기기에서는 공유되지 않습니다.`,
    },
    {
      q: `${checklist.title}를 처음부터 다시 시작할 수 있나요?`,
      a: `네, 초기화 버튼을 누르면 ${total}개 항목의 체크가 모두 해제됩니다.`,
    },
    {
      // desc는 "…막아야 피해가 안 번진다" 같은 서술형이라 문장 중간에 끼우면 비문이 된다.
      q: `${checklist.title} 항목을 전부 지켜야 하나요?`,
      a: `아닙니다. 보통 이 상황에서 놓치기 쉬운 것들을 ${total}개로 모아둔 참고용 목록이라, 자신에게 해당하지 않는 항목은 건너뛰셔도 됩니다.`,
    },
  ];
}

/** 오버라이드가 있으면 그걸, 없으면 템플릿 결과를 준다. */
export function contentFaq(
  kind: 'test' | 'quiz' | 'generator' | 'checklist',
  slug: string,
  data: Test | Quiz | Generator | Checklist,
): FaqItem[] {
  const override = CONTENT_FAQ_OVERRIDE[`${kind}/${slug}`];
  if (override) return override;

  switch (kind) {
    case 'test': return testFaq(data as Test);
    case 'quiz': return quizFaq(data as Quiz);
    case 'generator': return generatorFaq(data as Generator);
    case 'checklist': return checklistFaq(data as Checklist);
  }
}
