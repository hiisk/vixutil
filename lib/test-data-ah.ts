import type { Test } from './types.ts';

/**
 * 심리테스트 열두 가지 — 서른네째 묶음.
 *
 * 앞 묶음(test-data-ag)의 이어지는 자리다. 명절·경조사·회식처럼 한국에서만
 * 검색되는 주제와, 구독료·연말정산·보험처럼 돈이 새는 자리를 넣었다.
 * 금융·재테크가 가장 얇은 갈래여서 그쪽을 먼저 채웠다. *
 * 문항 열 개에 보기마다 1~4점이므로 총점은 10~40이다. 결과 구간 넷이 그
 * 범위를 빈틈없이 덮어야 어떤 점수에서도 결과가 나온다(10~17·18~25·26~33·34~40).
 */
export const TESTS_AH: Test[] = [
  {
    slug: 'coffee-tea',
    title: '커피파 차파 테스트',
    desc: '나는 카페인을 어떻게 마시는 사람? ☕',
    icon: '☕',
    category: '취미·라이프스타일',
    questions: [
      {
        q: '아침에 처음 마시는 건?',
        opts: [
          { text: '진한 커피', score: 1 },
          { text: '연한 커피', score: 2 },
          { text: '차', score: 3 },
          { text: '물', score: 4 },
        ],
      },
      {
        q: '마시는 이유는?',
        opts: [
          { text: '깨려고', score: 1 },
          { text: '습관처럼', score: 2 },
          { text: '맛이 좋아서', score: 3 },
          { text: '분위기 때문에', score: 4 },
        ],
      },
      {
        q: '카페에서 고르는 건?',
        opts: [
          { text: '에스프레소나 아메리카노', score: 1 },
          { text: '라떼 종류', score: 2 },
          { text: '차나 에이드', score: 3 },
          { text: '그날 기분대로', score: 4 },
        ],
      },
      {
        q: '마시는 속도는?',
        opts: [
          { text: '빨리 마신다', score: 1 },
          { text: '적당히', score: 2 },
          { text: '천천히 오래', score: 3 },
          { text: '식을 때까지 둔다', score: 4 },
        ],
      },
      {
        q: '하루에 몇 잔?',
        opts: [
          { text: '세 잔 이상', score: 1 },
          { text: '두 잔', score: 2 },
          { text: '한 잔', score: 3 },
          { text: '거의 안 마신다', score: 4 },
        ],
      },
      {
        q: '오후 늦게 마시면?',
        opts: [
          { text: '아무렇지 않다', score: 1 },
          { text: '조금 영향 있다', score: 2 },
          { text: '잠들기 어렵다', score: 3 },
          { text: '아예 안 마신다', score: 4 },
        ],
      },
      {
        q: '맛의 차이를 느끼나?',
        opts: [
          { text: '원산지까지 구분한다', score: 1 },
          { text: '진하기는 안다', score: 2 },
          { text: '비슷하게 느낀다', score: 3 },
          { text: '잘 모르겠다', score: 4 },
        ],
      },
      {
        q: '집에서 내려 마시나?',
        opts: [
          { text: '도구를 갖췄다', score: 1 },
          { text: '가끔 내린다', score: 2 },
          { text: '인스턴트를 쓴다', score: 3 },
          { text: '밖에서만 마신다', score: 4 },
        ],
      },
      {
        q: '마시는 시간은?',
        opts: [
          { text: '짧게 끊어서', score: 1 },
          { text: '일하면서', score: 2 },
          { text: '쉬면서 천천히', score: 3 },
          { text: '누군가와 함께', score: 4 },
        ],
      },
      {
        q: '안 마시면?',
        opts: [
          { text: '머리가 아프다', score: 1 },
          { text: '조금 아쉽다', score: 2 },
          { text: '별 차이 없다', score: 3 },
          { text: '아무렇지 않다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '진한 커피파 ☕',
        desc: '커피를 각성의 수단으로 쓰는 타입이야. 진하게 빨리 마시고 바로 일로 돌아가지. 효율은 좋지만 하루 세 잔을 넘기면 잠에 영향을 주기 시작해. 마지막 잔을 오후 두 시 전으로 당기는 것만으로 밤이 달라져.',
        emoji: '☕', color: 'from-amber-700 to-yellow-800',
        traits: ['집중', '효율', '뚜렷함', '루틴'] },
      { min: 18, max: 25, title: '부드러운 라떼파 🥛',
        desc: '맛과 기분을 함께 챙기는 타입이야. 각성보다는 한 잔의 시간을 즐기는 쪽이지. 우유가 들어가면 열량이 꽤 되니, 하루 두 잔을 넘긴다면 한 잔은 아메리카노나 차로 바꿔보는 것도 방법이야.',
        emoji: '🥛', color: 'from-orange-300 to-amber-400',
        traits: ['균형', '온화함', '여유', '취향'] },
      { min: 26, max: 33, title: '차분한 차파 🍵',
        desc: '천천히 마시며 시간을 보내는 걸 좋아하는 타입이야. 카페인에 예민한 편이라 자연스럽게 차를 고르게 됐을 수도 있어. 차도 종류에 따라 카페인이 꽤 있으니, 저녁에는 허브차 쪽으로 옮겨두면 더 편해.',
        emoji: '🍵', color: 'from-emerald-400 to-teal-500',
        traits: ['차분함', '섬세함', '건강', '음미'] },
      { min: 34, max: 40, title: '카페인 프리 청정러 💧',
        desc: '카페인 없이도 하루가 잘 굴러가는 타입이야. 남들이 오후에 무너질 때 흔들림이 없다는 게 큰 장점이지. 카페에서 마실 게 없어 곤란할 때가 있다면, 디카페인이나 곡물차 하나만 정해두면 편해져.',
        emoji: '💧', color: 'from-sky-300 to-blue-500',
        traits: ['자립', '건강', '무던함', '자기조절'] },
    ],
  },
  {
    slug: 'company-dinner',
    title: '회식 유형 테스트',
    desc: '회식 자리에서 나는 어떤 사람? 🍻',
    icon: '🍻',
    category: '직장·커리어',
    questions: [
      {
        q: '회식 공지가 뜨면?',
        opts: [
          { text: '좋다', score: 1 },
          { text: '괜찮다', score: 2 },
          { text: '피곤하다', score: 3 },
          { text: '핑계를 찾는다', score: 4 },
        ],
      },
      {
        q: '자리 배치는?',
        opts: [
          { text: '어디든 상관없다', score: 1 },
          { text: '아는 사람 옆', score: 2 },
          { text: '끝자리', score: 3 },
          { text: '문 가까이', score: 4 },
        ],
      },
      {
        q: '대화를 이끄는 편인가?',
        opts: [
          { text: '자주 그런다', score: 1 },
          { text: '가끔', score: 2 },
          { text: '듣는 쪽', score: 3 },
          { text: '거의 말이 없다', score: 4 },
        ],
      },
      {
        q: '술을 권하면?',
        opts: [
          { text: '잘 받는다', score: 1 },
          { text: '적당히 받는다', score: 2 },
          { text: '거절한다', score: 3 },
          { text: '아예 안 마신다', score: 4 },
        ],
      },
      {
        q: '1차가 끝나면?',
        opts: [
          { text: '2차로 간다', score: 1 },
          { text: '분위기 보고 간다', score: 2 },
          { text: '집에 간다', score: 3 },
          { text: '먼저 일어난다', score: 4 },
        ],
      },
      {
        q: '상사의 이야기가 길어지면?',
        opts: [
          { text: '재밌게 듣는다', score: 1 },
          { text: '적당히 반응한다', score: 2 },
          { text: '지루하다', score: 3 },
          { text: '시계를 본다', score: 4 },
        ],
      },
      {
        q: '회식에서 나오는 이야기는?',
        opts: [
          { text: '일 이야기도 좋다', score: 1 },
          { text: '사는 이야기가 좋다', score: 2 },
          { text: '별 관심 없다', score: 3 },
          { text: '듣기 불편하다', score: 4 },
        ],
      },
      {
        q: '회식 다음 날은?',
        opts: [
          { text: '멀쩡하다', score: 1 },
          { text: '조금 피곤', score: 2 },
          { text: '하루 종일 힘들다', score: 3 },
          { text: '휴가를 쓴다', score: 4 },
        ],
      },
      {
        q: '점심 회식이라면?',
        opts: [
          { text: '똑같이 좋다', score: 1 },
          { text: '오히려 낫다', score: 2 },
          { text: '훨씬 낫다', score: 3 },
          { text: '그것도 부담이다', score: 4 },
        ],
      },
      {
        q: '회식이 없어진다면?',
        opts: [
          { text: '아쉽다', score: 1 },
          { text: '조금 아쉽다', score: 2 },
          { text: '반갑다', score: 3 },
          { text: '가장 반가운 소식이다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '회식을 즐기는 분위기 메이커 🎤',
        desc: '사람이 모이는 자리에서 힘을 얻는 타입이야. 대화가 끊기면 자연스럽게 이어주고 어색한 사람도 챙기지. 그 덕에 자리가 산다는 걸 다들 알 거야. 다만 모두가 그 온도는 아니니, 조용한 사람에게 억지로 마이크를 넘기지 않는 배려가 있으면 완벽해.',
        emoji: '🎤', color: 'from-amber-400 to-orange-500',
        traits: ['사교성', '활력', '유머', '친화력'] },
      { min: 18, max: 25, title: '무난하게 어울리는 타입 🍽️',
        desc: '분위기에 맞춰 적당히 어울리는 타입이야. 튀지도 빠지지도 않아 어느 자리에서든 편하지. 다만 매번 끝까지 남는다면 체력이 먼저 지치니, 언제 일어날지 미리 정해두는 것도 방법이야.',
        emoji: '🍽️', color: 'from-sky-400 to-blue-500',
        traits: ['적응', '균형', '무던함', '조율'] },
      { min: 26, max: 33, title: '빨리 집에 가고 싶은 타입 🏠',
        desc: '회식이 일의 연장으로 느껴지는 타입이야. 1차까지는 성실히 채우고 그 뒤가 힘들지. 사실 1차만 함께해도 충분한 경우가 대부분이야. 미리 웃으며 알려두면 매번 핑계를 찾는 부담이 사라져.',
        emoji: '🏠', color: 'from-slate-400 to-slate-600',
        traits: ['독립성', '효율', '경계', '솔직함'] },
      { min: 34, max: 40, title: '회식이 곤혹스러운 타입 🌧️',
        desc: '공지만 떠도 부담이 시작되는 타입이야. 억지로 맞추다 보면 회식 자체가 아니라 회사가 싫어질 수 있어. 술 대신 음료로 자리만 지키거나 점심 회식을 제안해보는 것처럼, 참여의 방식을 바꿔보는 게 안 가는 것보다 오래 가.',
        emoji: '🌧️', color: 'from-rose-400 to-pink-500',
        traits: ['섬세함', '자기보호', '신중', '진솔함'] },
    ],
  },
  {
    slug: 'home-workout',
    title: '홈트 vs 헬스장 테스트',
    desc: '나는 어디서 운동해야 오래 갈까? 🏋️',
    icon: '🏋️',
    category: '건강·생활',
    questions: [
      {
        q: '운동을 시작하는 가장 큰 이유는?',
        opts: [
          { text: '기록을 늘리고 싶어서', score: 1 },
          { text: '몸을 만들고 싶어서', score: 2 },
          { text: '건강 때문에', score: 3 },
          { text: '누가 하자고 해서', score: 4 },
        ],
      },
      {
        q: '혼자 운동할 때 나는?',
        opts: [
          { text: '끝까지 한다', score: 1 },
          { text: '대체로 한다', score: 2 },
          { text: '자주 빠진다', score: 3 },
          { text: '금방 그만둔다', score: 4 },
        ],
      },
      {
        q: '운동에 쓸 수 있는 시간은?',
        opts: [
          { text: '한 시간 이상', score: 1 },
          { text: '한 시간쯤', score: 2 },
          { text: '삼십 분', score: 3 },
          { text: '십오 분', score: 4 },
        ],
      },
      {
        q: '집에서 운동해본 적은?',
        opts: [
          { text: '꾸준히 했다', score: 1 },
          { text: '해봤다', score: 2 },
          { text: '며칠 하다 말았다', score: 3 },
          { text: '아예 없다', score: 4 },
        ],
      },
      {
        q: '남이 보는 데서 운동하는 건?',
        opts: [
          { text: '자극이 된다', score: 1 },
          { text: '괜찮다', score: 2 },
          { text: '조금 신경 쓰인다', score: 3 },
          { text: '못 하겠다', score: 4 },
        ],
      },
      {
        q: '기구 사용은?',
        opts: [
          { text: '다룰 줄 안다', score: 1 },
          { text: '기본은 안다', score: 2 },
          { text: '헷갈린다', score: 3 },
          { text: '무섭다', score: 4 },
        ],
      },
      {
        q: '운동 강도는?',
        opts: [
          { text: '힘들수록 좋다', score: 1 },
          { text: '땀은 나야 한다', score: 2 },
          { text: '가볍게', score: 3 },
          { text: '움직이는 정도', score: 4 },
        ],
      },
      {
        q: '운동 장소까지 이동 시간은?',
        opts: [
          { text: '멀어도 간다', score: 1 },
          { text: '십 분 이내면 간다', score: 2 },
          { text: '가까워야 간다', score: 3 },
          { text: '나가는 것 자체가 벽이다', score: 4 },
        ],
      },
      {
        q: '한 달에 쓸 수 있는 돈은?',
        opts: [
          { text: '제한 없다', score: 1 },
          { text: '적당히 쓴다', score: 2 },
          { text: '최소한만', score: 3 },
          { text: '안 쓰고 싶다', score: 4 },
        ],
      },
      {
        q: '운동을 빠뜨렸을 때?',
        opts: [
          { text: '다음 날 만회한다', score: 1 },
          { text: '아쉽다', score: 2 },
          { text: '그냥 넘긴다', score: 3 },
          { text: '그대로 그만둔다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '헬스장이 맞는 타입 🏋️',
        desc: '강도 높은 운동과 기구가 필요한 타입이야. 사람이 있는 환경이 오히려 자극이 되니 헬스장이 잘 맞아. 다만 처음 한 달의 이탈률이 가장 높으니, 가는 요일과 시간을 미리 정해두는 것이 프로그램보다 중요해.',
        emoji: '🏋️', color: 'from-red-500 to-orange-600',
        traits: ['목표지향', '자극', '지속력', '체계'] },
      { min: 18, max: 25, title: '둘 다 되는 균형형 🤸',
        desc: '환경을 가리지 않는 타입이야. 시간이 나면 헬스장, 없으면 집에서 하면 되니 오히려 꾸준하기 좋은 조건이지. 두 곳에서 각각 할 운동을 미리 정해두면 그날 뭘 할지 고민하는 시간이 사라져.',
        emoji: '🤸', color: 'from-sky-400 to-blue-500',
        traits: ['유연함', '적응', '실용', '균형'] },
      { min: 26, max: 33, title: '홈트가 맞는 타입 🏠',
        desc: '나가는 것 자체가 벽인 타입이야. 그렇다면 문턱을 없애는 쪽이 맞아. 매트 하나와 십오 분이면 충분한 루틴을 정해두고, 같은 시간에 반복하는 것부터 시작해봐. 강도보다 빈도가 먼저야.',
        emoji: '🏠', color: 'from-emerald-400 to-teal-500',
        traits: ['자율', '실속', '꾸준함', '독립성'] },
      { min: 34, max: 40, title: '일단 움직이는 것부터 🌱',
        desc: '운동을 여러 번 시작했다가 멈춘 타입이야. 문제는 의지가 아니라 목표가 너무 컸을 가능성이 커. 하루 십 분 걷기처럼 실패할 수 없는 크기로 줄여서 2주만 지켜봐. 몸보다 습관이 먼저 붙어야 그다음이 있어.',
        emoji: '🌱', color: 'from-amber-400 to-orange-500',
        traits: ['시작', '가능성', '솔직함', '회복'] },
    ],
  },
  {
    slug: 'delivery-habit',
    title: '배달음식 습관 테스트',
    desc: '이번 달 배달앱 얼마 썼어? 습관 점검 🛵',
    icon: '🛵',
    category: '건강·생활',
    questions: [
      {
        q: '일주일에 배달 시키는 횟수는?',
        opts: [
          { text: '거의 없다', score: 1 },
          { text: '한두 번', score: 2 },
          { text: '서너 번', score: 3 },
          { text: '거의 매일', score: 4 },
        ],
      },
      {
        q: '배달앱을 켜는 순간은?',
        opts: [
          { text: '미리 정하고 켠다', score: 1 },
          { text: '배고플 때', score: 2 },
          { text: '심심할 때도', score: 3 },
          { text: '습관처럼 수시로', score: 4 },
        ],
      },
      {
        q: '메뉴를 고르는 시간은?',
        opts: [
          { text: '금방 정한다', score: 1 },
          { text: '몇 분', score: 2 },
          { text: '한참 본다', score: 3 },
          { text: '보다가 지쳐 늘 먹던 걸', score: 4 },
        ],
      },
      {
        q: '최소 주문 금액을 맞추려고?',
        opts: [
          { text: '안 시킨다', score: 1 },
          { text: '다음에 시킨다', score: 2 },
          { text: '뭘 더 담는다', score: 3 },
          { text: '자주 그런다', score: 4 },
        ],
      },
      {
        q: '배달비가 비싸면?',
        opts: [
          { text: '포장하러 간다', score: 1 },
          { text: '다른 데를 본다', score: 2 },
          { text: '그냥 시킨다', score: 3 },
          { text: '신경 안 쓴다', score: 4 },
        ],
      },
      {
        q: '시켜 먹고 남으면?',
        opts: [
          { text: '다음 끼니로 먹는다', score: 1 },
          { text: '가끔 남긴다', score: 2 },
          { text: '자주 버린다', score: 3 },
          { text: '다 먹는다', score: 4 },
        ],
      },
      {
        q: '한 달 배달비 지출을 아나?',
        opts: [
          { text: '정확히 안다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '모른다', score: 3 },
          { text: '보기 무섭다', score: 4 },
        ],
      },
      {
        q: '요리를 할 수 있는데도 시키는 이유는?',
        opts: [
          { text: '거의 그런 적 없다', score: 1 },
          { text: '피곤해서', score: 2 },
          { text: '치우기 싫어서', score: 3 },
          { text: '그냥 편해서', score: 4 },
        ],
      },
      {
        q: '배달 음식이 오면 기분은?',
        opts: [
          { text: '만족스럽다', score: 1 },
          { text: '괜찮다', score: 2 },
          { text: '먹고 나면 후회', score: 3 },
          { text: '늘 후회한다', score: 4 },
        ],
      },
      {
        q: '배달을 줄이려 해본 적은?',
        opts: [
          { text: '줄일 필요가 없다', score: 1 },
          { text: '해봤고 됐다', score: 2 },
          { text: '해봤지만 실패', score: 3 },
          { text: '생각만 했다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '배달과 거리를 둔 타입 🥗',
        desc: '끼니를 스스로 챙기는 타입이야. 돈도 건강도 자연스럽게 관리되고 있지. 다만 너무 엄격하면 지치니, 가끔은 시켜 먹는 걸 보상으로 써도 괜찮아. 규칙에 여유가 있어야 오래 가.',
        emoji: '🥗', color: 'from-emerald-400 to-green-600',
        traits: ['자기관리', '계획성', '절약', '건강'] },
      { min: 18, max: 25, title: '적당히 쓰는 타입 🍱',
        desc: '필요할 때만 쓰는 타입이야. 지출도 크지 않고 죄책감도 없는 딱 좋은 선이지. 한 달 지출만 한 번 확인해두면 이 선을 계속 유지하기 쉬워져.',
        emoji: '🍱', color: 'from-sky-400 to-blue-500',
        traits: ['균형', '실용', '조절', '무던함'] },
      { min: 26, max: 33, title: '습관이 되어가는 타입 ⚠️',
        desc: '피곤할 때마다 앱을 켜게 되는 타입이야. 문제는 음식보다 그 앞의 피로일 가능성이 커. 앱을 홈 화면 첫 페이지에서 빼고, 시킬 요일을 정해두는 것만으로도 횟수가 눈에 띄게 줄어.',
        emoji: '⚠️', color: 'from-amber-400 to-orange-500',
        traits: ['편의추구', '즉흥', '피로', '위안'] },
      { min: 34, max: 40, title: '점검이 필요한 타입 🚨',
        desc: '거의 매일 시키고 지출도 파악이 안 되는 상태야. 먼저 겁먹지 말고 지난달 결제 내역만 한 번 열어봐. 숫자를 보는 것만으로 바뀌는 경우가 많아. 그다음은 일주일에 두 끼만 직접 차리는 것부터 시작하면 돼.',
        emoji: '🚨', color: 'from-rose-500 to-red-600',
        traits: ['즉흥', '편의', '솔직함', '변화가능성'] },
    ],
  },
  {
    slug: 'subscription-habit',
    title: '구독 관리 테스트',
    desc: '매달 빠져나가는 돈 다 알고 있어? 📺',
    icon: '📺',
    category: '금융·재테크',
    questions: [
      {
        q: '구독 중인 서비스가 몇 개?',
        opts: [
          { text: '한두 개', score: 1 },
          { text: '세넷', score: 2 },
          { text: '다섯 이상', score: 3 },
          { text: '몇 개인지 모른다', score: 4 },
        ],
      },
      {
        q: '매달 구독료 총액은?',
        opts: [
          { text: '정확히 안다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '모른다', score: 3 },
          { text: '생각해본 적 없다', score: 4 },
        ],
      },
      {
        q: '무료 체험을 신청하면?',
        opts: [
          { text: '날짜를 알람에 넣는다', score: 1 },
          { text: '기억은 한다', score: 2 },
          { text: '자주 잊는다', score: 3 },
          { text: '결제되고 나서 안다', score: 4 },
        ],
      },
      {
        q: '안 쓰는 구독을 발견하면?',
        opts: [
          { text: '바로 해지한다', score: 1 },
          { text: '곧 해지한다', score: 2 },
          { text: '나중에 하려고 둔다', score: 3 },
          { text: '그대로 둔다', score: 4 },
        ],
      },
      {
        q: '해지 방법이 복잡하면?',
        opts: [
          { text: '찾아서 해지한다', score: 1 },
          { text: '시간 내서 한다', score: 2 },
          { text: '미룬다', score: 3 },
          { text: '포기한다', score: 4 },
        ],
      },
      {
        q: '같은 서비스를 가족과?',
        opts: [
          { text: '공유해서 쓴다', score: 1 },
          { text: '가끔 공유', score: 2 },
          { text: '각자 쓴다', score: 3 },
          { text: '중복 결제 중일 수도', score: 4 },
        ],
      },
      {
        q: '결제일을 아나?',
        opts: [
          { text: '다 안다', score: 1 },
          { text: '주요한 건 안다', score: 2 },
          { text: '모른다', score: 3 },
          { text: '알림으로 안다', score: 4 },
        ],
      },
      {
        q: '한 달에 실제로 쓰는 건?',
        opts: [
          { text: '구독한 걸 다 쓴다', score: 1 },
          { text: '대부분 쓴다', score: 2 },
          { text: '절반쯤', score: 3 },
          { text: '거의 안 쓴다', score: 4 },
        ],
      },
      {
        q: '가격이 올랐다는 공지를 보면?',
        opts: [
          { text: '필요한지 다시 본다', score: 1 },
          { text: '그대로 쓴다', score: 2 },
          { text: '못 보고 지나간다', score: 3 },
          { text: '오른 줄도 몰랐다', score: 4 },
        ],
      },
      {
        q: '카드 명세서를 확인하나?',
        opts: [
          { text: '매달 본다', score: 1 },
          { text: '가끔 본다', score: 2 },
          { text: '거의 안 본다', score: 3 },
          { text: '본 적 없다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '구독을 다스리는 사람 🧾',
        desc: '무엇에 얼마가 나가는지 알고 쓰는 타입이야. 안 쓰는 건 바로 정리하고 체험 기간도 놓치지 않지. 이미 잘하고 있으니, 반년에 한 번만 전체를 다시 훑으면 새는 곳이 거의 없어져.',
        emoji: '🧾', color: 'from-emerald-400 to-green-600',
        traits: ['관리력', '계획성', '절약', '점검'] },
      { min: 18, max: 25, title: '무난하게 관리하는 타입 📋',
        desc: '큰 문제는 없지만 몇 개는 흐릿한 타입이야. 카드 명세서에서 매달 반복되는 결제만 뽑아 목록을 한 번 만들어봐. 대개 두어 개는 기억에 없는 게 나오고, 그것만 정리해도 체감이 커.',
        emoji: '📋', color: 'from-sky-400 to-blue-500',
        traits: ['균형', '실용', '주의', '무던함'] },
      { min: 26, max: 33, title: '새고 있는 타입 💧',
        desc: '쓰지도 않는데 계속 나가는 게 있는 상태야. 금액이 작아서 눈에 안 띄는 게 함정이지 — 월 5천 원짜리 넷이면 일 년에 24만 원이야. 오늘 명세서를 열어 안 쓰는 것 하나만 해지해봐.',
        emoji: '💧', color: 'from-amber-400 to-orange-500',
        traits: ['편의추구', '느긋함', '관대함', '무던함'] },
      { min: 34, max: 40, title: '전면 점검이 필요한 타입 🚨',
        desc: '몇 개를 쓰는지도 모르는 상태야. 무료 체험이 유료로 넘어간 것까지 있을 수 있어. 순서는 이래. 카드 명세서에서 매달 같은 금액이 나가는 것을 전부 적기 → 지난달에 안 쓴 것 표시 → 그것부터 해지. 한 시간이면 끝나고 매달 돌아오는 돈이 생겨.',
        emoji: '🚨', color: 'from-rose-500 to-red-600',
        traits: ['개방성', '즉흥', '느긋함', '변화가능성'] },
    ],
  },
  {
    slug: 'eco-habit',
    title: '제로웨이스트 실천도 테스트',
    desc: '나는 얼마나 덜 버리고 있을까? ♻️',
    icon: '♻️',
    category: '건강·생활',
    questions: [
      {
        q: '장 보러 갈 때 장바구니는?',
        opts: [
          { text: '늘 챙긴다', score: 1 },
          { text: '대체로 챙긴다', score: 2 },
          { text: '가끔 잊는다', score: 3 },
          { text: '늘 새로 산다', score: 4 },
        ],
      },
      {
        q: '일회용 컵은?',
        opts: [
          { text: '텀블러를 쓴다', score: 1 },
          { text: '가끔 텀블러', score: 2 },
          { text: '주로 일회용', score: 3 },
          { text: '늘 일회용', score: 4 },
        ],
      },
      {
        q: '분리배출은?',
        opts: [
          { text: '꼼꼼히 한다', score: 1 },
          { text: '기본은 한다', score: 2 },
          { text: '헷갈리면 그냥 버린다', score: 3 },
          { text: '잘 모른다', score: 4 },
        ],
      },
      {
        q: '물건을 살 때 포장은?',
        opts: [
          { text: '적은 걸 고른다', score: 1 },
          { text: '가끔 본다', score: 2 },
          { text: '신경 안 쓴다', score: 3 },
          { text: '생각해본 적 없다', score: 4 },
        ],
      },
      {
        q: '음식물 남기는 정도는?',
        opts: [
          { text: '거의 없다', score: 1 },
          { text: '가끔 남는다', score: 2 },
          { text: '자주 남는다', score: 3 },
          { text: '늘 버린다', score: 4 },
        ],
      },
      {
        q: '안 쓰는 물건은?',
        opts: [
          { text: '나눔이나 중고로', score: 1 },
          { text: '가끔 판다', score: 2 },
          { text: '쌓아둔다', score: 3 },
          { text: '버린다', score: 4 },
        ],
      },
      {
        q: '고장 난 물건은?',
        opts: [
          { text: '고쳐 쓴다', score: 1 },
          { text: '고칠 수 있으면 고친다', score: 2 },
          { text: '대개 새로 산다', score: 3 },
          { text: '바로 새로 산다', score: 4 },
        ],
      },
      {
        q: '배달 시킬 때 수저는?',
        opts: [
          { text: '안 받는다', score: 1 },
          { text: '가끔 뺀다', score: 2 },
          { text: '그냥 받는다', score: 3 },
          { text: '생각 안 해봤다', score: 4 },
        ],
      },
      {
        q: '옷을 살 때?',
        opts: [
          { text: '오래 입을 걸 고른다', score: 1 },
          { text: '가끔 그런다', score: 2 },
          { text: '유행을 따른다', score: 3 },
          { text: '싸면 산다', score: 4 },
        ],
      },
      {
        q: '환경 이야기를 들으면?',
        opts: [
          { text: '실천으로 옮긴다', score: 1 },
          { text: '관심은 간다', score: 2 },
          { text: '멀게 느껴진다', score: 3 },
          { text: '별 관심 없다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '생활에 밴 실천가 🌿',
        desc: '의식하지 않아도 몸에 밴 타입이야. 장바구니와 텀블러가 이미 짐의 일부이고 버리기 전에 한 번 더 생각하지. 다만 완벽하려다 지치면 오래 못 가니, 못 지킨 날을 자책하지 않는 것도 실천의 일부야.',
        emoji: '🌿', color: 'from-emerald-500 to-green-700',
        traits: ['일관성', '책임감', '절약', '실천'] },
      { min: 18, max: 25, title: '꾸준히 노력하는 타입 🍃',
        desc: '알고는 있고 대체로 지키는 타입이야. 가끔 잊는 정도라면 충분히 잘하고 있어. 텀블러를 현관에 두거나 장바구니를 가방에 상시로 넣어두는 것처럼, 잊을 수 없게 만드는 장치 하나면 빈틈이 메워져.',
        emoji: '🍃', color: 'from-sky-400 to-blue-500',
        traits: ['성실', '균형', '학습', '의지'] },
      { min: 26, max: 33, title: '관심은 있는 타입 🌱',
        desc: '마음은 있는데 습관까지는 안 온 타입이야. 한꺼번에 다 바꾸려 하면 실패하니 하나만 골라봐. 배달 시킬 때 수저 안 받기처럼 한 번의 클릭으로 끝나는 것부터가 좋아. 한 달이면 그건 자동이 돼.',
        emoji: '🌱', color: 'from-amber-400 to-orange-500',
        traits: ['개방성', '가능성', '솔직함', '유연함'] },
      { min: 34, max: 40, title: '아직 먼 이야기인 타입 🏙️',
        desc: '지금은 편의가 먼저인 타입이야. 그게 나쁜 건 아니고 여유가 없을 때는 자연스러운 선택이야. 다만 분리배출 하나만은 알아두면 좋아 — 그건 손이 거의 안 들면서 효과가 가장 큰 쪽이거든.',
        emoji: '🏙️', color: 'from-slate-400 to-slate-600',
        traits: ['실용', '편의', '솔직함', '현실감'] },
    ],
  },
  {
    slug: 'gacha-spending',
    title: '게임 과금 성향 테스트',
    desc: '나는 어떤 지갑을 가진 유저? 🎮',
    icon: '🎮',
    category: '금융·재테크',
    questions: [
      {
        q: '새 게임을 시작하면?',
        opts: [
          { text: '무과금으로 간다', score: 1 },
          { text: '입문 상품만 산다', score: 2 },
          { text: '적당히 쓴다', score: 3 },
          { text: '초반에 크게 쓴다', score: 4 },
        ],
      },
      {
        q: '원하는 캐릭터가 나오면?',
        opts: [
          { text: '참는다', score: 1 },
          { text: '조금 시도한다', score: 2 },
          { text: '나올 때까지 한다', score: 3 },
          { text: '한도까지 간다', score: 4 },
        ],
      },
      {
        q: '한 달 게임 지출은?',
        opts: [
          { text: '0원', score: 1 },
          { text: '만 원 이하', score: 2 },
          { text: '오만 원쯤', score: 3 },
          { text: '십만 원 이상', score: 4 },
        ],
      },
      {
        q: '과금하고 난 뒤 기분은?',
        opts: [
          { text: '안 해서 편하다', score: 1 },
          { text: '만족스럽다', score: 2 },
          { text: '가끔 후회', score: 3 },
          { text: '자주 후회', score: 4 },
        ],
      },
      {
        q: '한정 상품 알림을 보면?',
        opts: [
          { text: '무시한다', score: 1 },
          { text: '한번 본다', score: 2 },
          { text: '고민한다', score: 3 },
          { text: '거의 산다', score: 4 },
        ],
      },
      {
        q: '친구가 좋은 걸 뽑으면?',
        opts: [
          { text: '축하해준다', score: 1 },
          { text: '부럽다', score: 2 },
          { text: '나도 하고 싶다', score: 3 },
          { text: '바로 결제한다', score: 4 },
        ],
      },
      {
        q: '게임을 접을 때 쓴 돈은?',
        opts: [
          { text: '없어서 미련 없다', score: 1 },
          { text: '아깝지 않다', score: 2 },
          { text: '조금 아깝다', score: 3 },
          { text: '많이 아깝다', score: 4 },
        ],
      },
      {
        q: '지출 한도를 정해뒀나?',
        opts: [
          { text: '아예 안 쓴다', score: 1 },
          { text: '정해두고 지킨다', score: 2 },
          { text: '정했지만 넘긴다', score: 3 },
          { text: '정한 적 없다', score: 4 },
        ],
      },
      {
        q: '확률 표기를 보나?',
        opts: [
          { text: '보고 판단한다', score: 1 },
          { text: '가끔 본다', score: 2 },
          { text: '안 본다', score: 3 },
          { text: '봐도 모르겠다', score: 4 },
        ],
      },
      {
        q: '결제 내역을 확인하나?',
        opts: [
          { text: '쓸 일이 없다', score: 1 },
          { text: '매달 본다', score: 2 },
          { text: '가끔 본다', score: 3 },
          { text: '보기 무섭다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '무과금 장인 🌿',
        desc: '돈을 안 쓰고도 게임을 즐길 줄 아는 타입이야. 제약 안에서 방법을 찾는 걸 오히려 재미로 여기지. 다만 시간을 그만큼 더 쓰게 되니, 시간도 자원이라는 걸 가끔 떠올려보면 좋아.',
        emoji: '🌿', color: 'from-emerald-400 to-green-600',
        traits: ['자제력', '전략', '인내', '실속'] },
      { min: 18, max: 25, title: '계획적인 소과금러 💳',
        desc: '쓸 만큼만 쓰고 만족하는 타입이야. 한도를 정해두고 지킨다는 게 가장 큰 강점이지. 이 습관은 게임 밖에서도 그대로 힘을 발휘하니, 다른 지출에도 같은 방식을 써봐.',
        emoji: '💳', color: 'from-sky-400 to-blue-500',
        traits: ['계획성', '균형', '절제', '만족'] },
      { min: 26, max: 33, title: '가끔 흔들리는 타입 🎰',
        desc: '평소엔 괜찮다가 원하는 게 나오면 선을 넘는 타입이야. 후회가 남는다면 그건 스스로 정한 선을 넘었다는 신호야. 결제 비밀번호를 매번 입력하게 바꾸거나 한도를 걸어두면 그 순간에 한 박자를 벌 수 있어.',
        emoji: '🎰', color: 'from-amber-400 to-orange-500',
        traits: ['몰입', '열정', '충동', '즐거움'] },
      { min: 34, max: 40, title: '점검이 필요한 타입 🚨',
        desc: '지출이 파악되지 않고 후회가 반복되는 상태야. 뽑기는 확률로 설계되어 있어서 의지만으로는 버티기 어렵게 되어 있어. 결제 내역을 한 번 열어 총액을 확인하고, 앱스토어의 결제 한도를 직접 걸어두는 것부터 해보자.',
        emoji: '🚨', color: 'from-rose-500 to-red-600',
        traits: ['열정', '몰입', '솔직함', '변화가능성'] },
    ],
  },
  {
    slug: 'sibling-order',
    title: '형제 서열 성격 테스트',
    desc: '첫째 같아 막내 같아? 성향으로 알아보기 👨‍👩‍👧‍👦',
    icon: '👨‍👩‍👧‍👦',
    category: '성격',
    questions: [
      {
        q: '모임에서 자연스럽게 맡는 역할은?',
        opts: [
          { text: '총무나 진행', score: 1 },
          { text: '조율하는 쪽', score: 2 },
          { text: '분위기 담당', score: 3 },
          { text: '따라가는 쪽', score: 4 },
        ],
      },
      {
        q: '책임을 져야 하는 상황에서?',
        opts: [
          { text: '내가 맡는다', score: 1 },
          { text: '필요하면 맡는다', score: 2 },
          { text: '남이 맡길 바란다', score: 3 },
          { text: '피한다', score: 4 },
        ],
      },
      {
        q: '부탁을 받으면?',
        opts: [
          { text: '웬만하면 들어준다', score: 1 },
          { text: '가능하면 들어준다', score: 2 },
          { text: '상황을 본다', score: 3 },
          { text: '잘 거절한다', score: 4 },
        ],
      },
      {
        q: '규칙에 대해서는?',
        opts: [
          { text: '지키는 편', score: 1 },
          { text: '대체로 지킨다', score: 2 },
          { text: '융통성 있게', score: 3 },
          { text: '답답하면 어긴다', score: 4 },
        ],
      },
      {
        q: '갈등이 생기면?',
        opts: [
          { text: '먼저 나서 정리한다', score: 1 },
          { text: '중간에서 조율한다', score: 2 },
          { text: '한발 물러선다', score: 3 },
          { text: '누가 해결해주길 기다린다', score: 4 },
        ],
      },
      {
        q: '칭찬을 받으면?',
        opts: [
          { text: '당연한 걸 했다고 본다', score: 1 },
          { text: '기분 좋다', score: 2 },
          { text: '더 잘하고 싶어진다', score: 3 },
          { text: '쑥스럽다', score: 4 },
        ],
      },
      {
        q: '새로운 일을 시작할 때?',
        opts: [
          { text: '계획부터 세운다', score: 1 },
          { text: '알아보고 시작', score: 2 },
          { text: '일단 해본다', score: 3 },
          { text: '누가 알려주길 기다린다', score: 4 },
        ],
      },
      {
        q: '애교를 부리는 편인가?',
        opts: [
          { text: '거의 없다', score: 1 },
          { text: '가끔', score: 2 },
          { text: '자주', score: 3 },
          { text: '자연스럽게 나온다', score: 4 },
        ],
      },
      {
        q: '혼자 결정해야 할 때?',
        opts: [
          { text: '별문제 없다', score: 1 },
          { text: '조금 부담', score: 2 },
          { text: '누구에게 물어본다', score: 3 },
          { text: '결정을 미룬다', score: 4 },
        ],
      },
      {
        q: '주목받는 자리는?',
        opts: [
          { text: '필요하면 선다', score: 1 },
          { text: '괜찮다', score: 2 },
          { text: '즐기는 편', score: 3 },
          { text: '부담스럽다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '타고난 첫째 스타일 🎓',
        desc: '누가 시키지 않아도 자리를 챙기는 타입이야. 모임의 총무나 팀의 중심을 맡게 되는 일이 많을 거야. 다만 다 짊어지려다 지치기 쉬우니, 맡기는 것도 능력이라는 걸 기억해줘. 남에게 넘긴 일은 그 사람의 방식대로 되게 두는 것까지가 맡기기야.',
        emoji: '🎓', color: 'from-indigo-400 to-blue-600',
        traits: ['책임감', '주도성', '계획성', '신뢰'] },
      { min: 18, max: 25, title: '중간에서 조율하는 스타일 🤝',
        desc: '양쪽을 보고 균형을 맞추는 타입이야. 갈등을 줄이는 데 능하고 어느 무리에서든 잘 섞이지. 다만 남을 맞추다 내 의견이 흐려질 수 있으니, 정말 원하는 게 있을 때는 먼저 말해도 괜찮아.',
        emoji: '🤝', color: 'from-emerald-400 to-teal-500',
        traits: ['조율', '눈치', '유연함', '공감'] },
      { min: 26, max: 33, title: '사랑받는 막내 스타일 🎈',
        desc: '주변이 자연스럽게 챙겨주게 만드는 타입이야. 표현이 솔직하고 분위기를 밝게 만들지. 다만 결정을 남에게 넘기는 게 습관이 되면 아쉬우니, 작은 것부터 스스로 정하는 연습을 해보면 좋아.',
        emoji: '🎈', color: 'from-amber-400 to-orange-500',
        traits: ['친화력', '표현력', '유연함', '솔직함'] },
      { min: 34, max: 40, title: '혼자가 익숙한 외동 스타일 🌙',
        desc: '자기 세계가 뚜렷하고 혼자서도 잘 지내는 타입이야. 남의 속도에 휘둘리지 않는다는 게 강점이지. 다만 도움을 청하는 걸 어려워하는 편이라, 필요할 때 먼저 말하는 것만 익혀두면 훨씬 수월해져.',
        emoji: '🌙', color: 'from-violet-400 to-purple-600',
        traits: ['독립성', '자기충족', '집중', '마이페이스'] },
    ],
  },
  {
    slug: 'voice-tone',
    title: '말투 유형 테스트',
    desc: '내 말투는 어떻게 들릴까? 🗣️',
    icon: '🗣️',
    category: '성격',
    questions: [
      {
        q: '말하는 속도는?',
        opts: [
          { text: '빠른 편', score: 1 },
          { text: '보통', score: 2 },
          { text: '느린 편', score: 3 },
          { text: '아주 천천히', score: 4 },
        ],
      },
      {
        q: '목소리 크기는?',
        opts: [
          { text: '큰 편', score: 1 },
          { text: '보통', score: 2 },
          { text: '작은 편', score: 3 },
          { text: '자주 되묻는 소리를 듣는다', score: 4 },
        ],
      },
      {
        q: '말을 시작할 때?',
        opts: [
          { text: '바로 본론', score: 1 },
          { text: '짧은 인사 뒤 본론', score: 2 },
          { text: '뜸을 들인다', score: 3 },
          { text: '한참 망설인다', score: 4 },
        ],
      },
      {
        q: '설명할 때 나는?',
        opts: [
          { text: '결론부터 말한다', score: 1 },
          { text: '순서대로 말한다', score: 2 },
          { text: '이야기하듯 돌아간다', score: 3 },
          { text: '말이 길어진다', score: 4 },
        ],
      },
      {
        q: '상대의 말이 끝나기 전에?',
        opts: [
          { text: '가끔 끼어든다', score: 1 },
          { text: '거의 안 끼어든다', score: 2 },
          { text: '끝까지 듣는다', score: 3 },
          { text: '침묵이 생겨도 기다린다', score: 4 },
        ],
      },
      {
        q: '부탁할 때?',
        opts: [
          { text: '용건을 바로 말한다', score: 1 },
          { text: '이유를 붙인다', score: 2 },
          { text: '한참 돌려 말한다', score: 3 },
          { text: '결국 말을 못 꺼낸다', score: 4 },
        ],
      },
      {
        q: '거절할 때?',
        opts: [
          { text: '분명히 말한다', score: 1 },
          { text: '이유를 대며 거절', score: 2 },
          { text: '애매하게 넘긴다', score: 3 },
          { text: '거절을 못 한다', score: 4 },
        ],
      },
      {
        q: '화가 났을 때 말투는?',
        opts: [
          { text: '그대로 드러난다', score: 1 },
          { text: '조금 차가워진다', score: 2 },
          { text: '말수가 준다', score: 3 },
          { text: '아무 말도 안 한다', score: 4 },
        ],
      },
      {
        q: '농담을 하는 편인가?',
        opts: [
          { text: '자주 한다', score: 1 },
          { text: '가끔', score: 2 },
          { text: '거의 안 한다', score: 3 },
          { text: '진지하다는 말을 듣는다', score: 4 },
        ],
      },
      {
        q: '내 말투에 대해 들은 말은?',
        opts: [
          { text: '시원하다', score: 1 },
          { text: '편하다', score: 2 },
          { text: '차분하다', score: 3 },
          { text: '무슨 생각인지 모르겠다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '시원한 직진 화법 🎯',
        desc: '결론부터 말하고 군더더기가 적은 타입이야. 회의나 업무에서 특히 힘을 발휘하지. 다만 빠르고 분명한 만큼 상대가 밀린다고 느낄 수 있어. 중요한 이야기 앞에서는 한 박자 쉬고 상대의 말을 먼저 받아주면 훨씬 잘 전달돼.',
        emoji: '🎯', color: 'from-red-400 to-orange-500',
        traits: ['명확성', '속도', '자신감', '효율'] },
      { min: 18, max: 25, title: '편안한 대화형 🍵',
        desc: '듣는 사람이 편하게 느끼는 말투를 가진 타입이야. 속도와 크기가 적당하고 끼어들지 않아서 상대가 말을 다 꺼내게 되지. 이건 훈련해도 잘 안 되는 강점이야. 다만 부탁이나 거절에서는 조금 더 분명해도 괜찮아.',
        emoji: '🍵', color: 'from-emerald-400 to-teal-500',
        traits: ['친근함', '균형', '경청', '온도'] },
      { min: 26, max: 33, title: '차분한 관찰형 🌙',
        desc: '천천히 말하고 먼저 듣는 타입이야. 말수가 적어도 한마디에 무게가 실리지. 다만 침묵이 길면 상대가 뜻을 넘겨짚기도 해. 결론을 먼저 한 줄로 말하고 설명을 붙이면 그 오해가 크게 줄어.',
        emoji: '🌙', color: 'from-sky-400 to-indigo-500',
        traits: ['신중', '경청', '차분함', '깊이'] },
      { min: 34, max: 40, title: '속을 잘 안 드러내는 타입 🫥',
        desc: '말로 꺼내는 것보다 안에서 정리하는 편인 타입이야. 그래서 무슨 생각인지 모르겠다는 말을 듣기도 하지. 감정을 다 말할 필요는 없지만, 좋다·불편하다 정도의 한 단어만 붙여도 상대가 훨씬 덜 헤매.',
        emoji: '🫥', color: 'from-slate-400 to-slate-600',
        traits: ['신중함', '절제', '내향', '관찰'] },
    ],
  },
  {
    slug: 'insurance-literacy',
    title: '보험 이해도 테스트',
    desc: '내 보험 뭐가 들어 있는지 알아? 📄',
    icon: '📄',
    category: '금융·재테크',
    questions: [
      {
        q: '가입한 보험이 몇 개인지 아나?',
        opts: [
          { text: '정확히 안다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '모른다', score: 3 },
          { text: '가입한 것도 잘 모른다', score: 4 },
        ],
      },
      {
        q: '매달 내는 보험료 총액은?',
        opts: [
          { text: '정확히 안다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '모른다', score: 3 },
          { text: '자동이체라 신경 안 쓴다', score: 4 },
        ],
      },
      {
        q: '보장 내용을 읽어본 적은?',
        opts: [
          { text: '꼼꼼히 읽었다', score: 1 },
          { text: '한 번 봤다', score: 2 },
          { text: '설명만 들었다', score: 3 },
          { text: '읽은 적 없다', score: 4 },
        ],
      },
      {
        q: '실손과 정액의 차이는?',
        opts: [
          { text: '설명할 수 있다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '들어본 적 있다', score: 3 },
          { text: '모른다', score: 4 },
        ],
      },
      {
        q: '보험을 든 계기는?',
        opts: [
          { text: '필요를 따져 골랐다', score: 1 },
          { text: '비교하고 골랐다', score: 2 },
          { text: '아는 사람 권유', score: 3 },
          { text: '누가 알아서 넣어줬다', score: 4 },
        ],
      },
      {
        q: '갱신형과 비갱신형은?',
        opts: [
          { text: '차이를 안다', score: 1 },
          { text: '들어봤다', score: 2 },
          { text: '헷갈린다', score: 3 },
          { text: '모른다', score: 4 },
        ],
      },
      {
        q: '보험금을 청구해본 적은?',
        opts: [
          { text: '직접 해봤다', score: 1 },
          { text: '해봤다', score: 2 },
          { text: '어려워서 포기', score: 3 },
          { text: '방법을 모른다', score: 4 },
        ],
      },
      {
        q: '중복 보장이 있는지 아나?',
        opts: [
          { text: '확인했다', score: 1 },
          { text: '아마 없을 것', score: 2 },
          { text: '모른다', score: 3 },
          { text: '생각해본 적 없다', score: 4 },
        ],
      },
      {
        q: '약관을 볼 일이 생기면?',
        opts: [
          { text: '찾아서 읽는다', score: 1 },
          { text: '요약을 본다', score: 2 },
          { text: '설계사에게 묻는다', score: 3 },
          { text: '포기한다', score: 4 },
        ],
      },
      {
        q: '보험을 점검한 게 언제?',
        opts: [
          { text: '최근에 했다', score: 1 },
          { text: '몇 년 전', score: 2 },
          { text: '가입 후 없다', score: 3 },
          { text: '기억 없다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '보험을 아는 사람 📄',
        desc: '무엇에 얼마를 내고 무엇을 보장받는지 아는 타입이야. 청구도 직접 해봤다면 대부분의 사람보다 훨씬 앞서 있어. 남은 건 주기적인 점검이야. 가족 구성이나 직업이 바뀌면 필요한 보장도 바뀌니 그때마다 한 번씩 보면 돼.',
        emoji: '📄', color: 'from-emerald-400 to-green-600',
        traits: ['이해력', '관리', '점검', '주체성'] },
      { min: 18, max: 25, title: '기본은 아는 타입 📋',
        desc: '큰 틀은 알고 있는 타입이야. 다만 중복 보장은 확인해볼 만해 — 실손을 두 개 들어도 두 배로 받는 게 아니라서 그냥 새는 돈이 되거든. 보험협회 조회로 가입 목록을 한 번 뽑아보면 금방 확인돼.',
        emoji: '📋', color: 'from-sky-400 to-blue-500',
        traits: ['균형', '실용', '학습', '관심'] },
      { min: 26, max: 33, title: '맡겨두고 있는 타입 🤝',
        desc: '누가 권해준 대로 유지하고 있는 타입이야. 문제는 정작 필요할 때 무엇을 청구할 수 있는지 모른다는 거야. 증권 하나만 열어서 무슨 병·사고에 얼마가 나오는지 그 한 장만 봐도 크게 달라져.',
        emoji: '🤝', color: 'from-amber-400 to-orange-500',
        traits: ['신뢰', '위임', '무던함', '솔직함'] },
      { min: 34, max: 40, title: '내용을 모르는 상태 ❓',
        desc: '내는 줄은 알지만 뭘 받는지는 모르는 상태야. 이건 흔한 일이고 부끄러운 게 아니야. 순서는 이래. 보험협회에서 내 가입 목록 조회 → 매달 총액 확인 → 보장 내용 한 장 요약본 받기. 한 시간이면 되고, 안 쓰는 특약 하나만 정리해도 그 값을 해.',
        emoji: '❓', color: 'from-rose-400 to-pink-500',
        traits: ['가능성', '솔직함', '변화가능성', '실행대기'] },
    ],
  },
  {
    slug: 'tax-literacy',
    title: '연말정산 이해도 테스트',
    desc: '13월의 월급 챙기고 있어? 💸',
    icon: '💸',
    category: '금융·재테크',
    questions: [
      {
        q: '연말정산 시즌에 나는?',
        opts: [
          { text: '미리 준비한다', score: 1 },
          { text: '기간에 맞춰 한다', score: 2 },
          { text: '닥쳐서 한다', score: 3 },
          { text: '회사가 알아서 해준다', score: 4 },
        ],
      },
      {
        q: '소득공제와 세액공제의 차이는?',
        opts: [
          { text: '설명할 수 있다', score: 1 },
          { text: '대충 안다', score: 2 },
          { text: '들어봤다', score: 3 },
          { text: '모른다', score: 4 },
        ],
      },
      {
        q: '신용카드와 체크카드 공제율은?',
        opts: [
          { text: '다르다는 걸 알고 쓴다', score: 1 },
          { text: '다른 건 안다', score: 2 },
          { text: '들어봤다', score: 3 },
          { text: '몰랐다', score: 4 },
        ],
      },
      {
        q: '연금저축이나 IRP는?',
        opts: [
          { text: '한도까지 넣는다', score: 1 },
          { text: '조금 넣는다', score: 2 },
          { text: '알지만 안 한다', score: 3 },
          { text: '뭔지 모른다', score: 4 },
        ],
      },
      {
        q: '월세 세액공제는?',
        opts: [
          { text: '챙겨봤다', score: 1 },
          { text: '해당되면 챙긴다', score: 2 },
          { text: '들어봤다', score: 3 },
          { text: '모른다', score: 4 },
        ],
      },
      {
        q: '의료비·교육비 자료는?',
        opts: [
          { text: '빠짐없이 챙긴다', score: 1 },
          { text: '대체로 챙긴다', score: 2 },
          { text: '나오는 대로 낸다', score: 3 },
          { text: '신경 안 쓴다', score: 4 },
        ],
      },
      {
        q: '부양가족 등록은?',
        opts: [
          { text: '조건을 알고 넣는다', score: 1 },
          { text: '해당되면 넣는다', score: 2 },
          { text: '헷갈린다', score: 3 },
          { text: '해본 적 없다', score: 4 },
        ],
      },
      {
        q: '작년에 더 냈는지 돌려받았는지?',
        opts: [
          { text: '금액까지 안다', score: 1 },
          { text: '어느 쪽인지 안다', score: 2 },
          { text: '기억 안 난다', score: 3 },
          { text: '확인 안 했다', score: 4 },
        ],
      },
      {
        q: '간소화 자료는?',
        opts: [
          { text: '직접 확인한다', score: 1 },
          { text: '받아서 낸다', score: 2 },
          { text: '회사가 한다', score: 3 },
          { text: '뭔지 모른다', score: 4 },
        ],
      },
      {
        q: '공제를 놓친 걸 알게 되면?',
        opts: [
          { text: '경정청구를 한다', score: 1 },
          { text: '방법을 찾아본다', score: 2 },
          { text: '아쉬워하고 만다', score: 3 },
          { text: '그런 게 되는 줄 몰랐다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '연말정산 고수 🧾',
        desc: '미리 준비하고 빠뜨리는 게 거의 없는 타입이야. 카드 사용 비율까지 조절한다면 상당히 앞서 있는 거야. 놓친 게 있다면 5년 안에는 경정청구로 돌려받을 수 있으니 지난 것도 한 번 확인해봐.',
        emoji: '🧾', color: 'from-emerald-400 to-green-600',
        traits: ['계획성', '이해력', '실행', '절세'] },
      { min: 18, max: 25, title: '기본은 챙기는 타입 📊',
        desc: '해당되는 건 챙기는 타입이야. 한 가지만 더하면 효과가 큰데, 연금저축과 IRP야. 세액공제라 소득에 관계없이 돌려받는 금액이 정해져 있어서, 여유가 되면 한도까지 채우는 게 가장 확실한 절세야.',
        emoji: '📊', color: 'from-sky-400 to-blue-500',
        traits: ['성실', '균형', '학습', '실속'] },
      { min: 26, max: 33, title: '닥쳐서 하는 타입 ⏰',
        desc: '기간이 되면 회사에서 하라는 대로 하는 타입이야. 크게 손해는 아니지만 놓치는 게 생기지. 특히 월세와 의료비는 자동으로 안 잡히는 경우가 많으니 그 둘만 챙겨도 돌려받는 금액이 달라져.',
        emoji: '⏰', color: 'from-amber-400 to-orange-500',
        traits: ['무던함', '적응', '실용', '솔직함'] },
      { min: 34, max: 40, title: '아직 낯선 타입 🌱',
        desc: '연말정산이 아직 남의 일처럼 느껴지는 타입이야. 딱 하나만 알아두자 — 세액공제는 소득이 얼마든 돌려받는 금액이 같아. 연금저축에 넣은 돈의 일부가 그대로 돌아온다는 뜻이야. 올해는 간소화 자료를 직접 한 번 열어보는 것부터 시작해봐.',
        emoji: '🌱', color: 'from-violet-400 to-purple-500',
        traits: ['가능성', '솔직함', '학습대기', '성장'] },
    ],
  },
  {
    slug: 'hiking-style',
    title: '등산 유형 테스트',
    desc: '정상이 목표야 과정이 목표야? ⛰️',
    icon: '⛰️',
    category: '취미·라이프스타일',
    questions: [
      {
        q: '산에 가는 가장 큰 이유는?',
        opts: [
          { text: '정상을 밟으려고', score: 1 },
          { text: '몸을 쓰려고', score: 2 },
          { text: '경치를 보려고', score: 3 },
          { text: '사람들과 어울리려고', score: 4 },
        ],
      },
      {
        q: '오르는 속도는?',
        opts: [
          { text: '빠르게 치고 올라간다', score: 1 },
          { text: '일정하게', score: 2 },
          { text: '천천히', score: 3 },
          { text: '자주 쉰다', score: 4 },
        ],
      },
      {
        q: '중간에 좋은 경치를 만나면?',
        opts: [
          { text: '사진만 찍고 간다', score: 1 },
          { text: '잠깐 본다', score: 2 },
          { text: '한참 머문다', score: 3 },
          { text: '거기서 쉬어간다', score: 4 },
        ],
      },
      {
        q: '장비는?',
        opts: [
          { text: '제대로 갖춘다', score: 1 },
          { text: '기본은 갖춘다', score: 2 },
          { text: '운동화면 충분', score: 3 },
          { text: '있는 대로 간다', score: 4 },
        ],
      },
      {
        q: '산에서 먹는 것은?',
        opts: [
          { text: '간단히 행동식', score: 1 },
          { text: '김밥 정도', score: 2 },
          { text: '제대로 챙겨간다', score: 3 },
          { text: '내려와서 먹는다', score: 4 },
        ],
      },
      {
        q: '코스를 정할 때?',
        opts: [
          { text: '난이도를 보고 고른다', score: 1 },
          { text: '거리를 본다', score: 2 },
          { text: '경치를 본다', score: 3 },
          { text: '남이 정한 대로', score: 4 },
        ],
      },
      {
        q: '정상에 도착하면?',
        opts: [
          { text: '바로 내려간다', score: 1 },
          { text: '잠깐 쉬고 내려간다', score: 2 },
          { text: '한참 머문다', score: 3 },
          { text: '오래 쉰다', score: 4 },
        ],
      },
      {
        q: '힘든 구간에서?',
        opts: [
          { text: '속도를 유지한다', score: 1 },
          { text: '천천히 간다', score: 2 },
          { text: '자주 쉰다', score: 3 },
          { text: '포기를 생각한다', score: 4 },
        ],
      },
      {
        q: '내려올 때는?',
        opts: [
          { text: '빠르게 내려온다', score: 1 },
          { text: '조심히 내려온다', score: 2 },
          { text: '무릎이 아프다', score: 3 },
          { text: '올라갈 때보다 힘들다', score: 4 },
        ],
      },
      {
        q: '다녀온 뒤 기록은?',
        opts: [
          { text: '시간과 거리를 남긴다', score: 1 },
          { text: '사진을 남긴다', score: 2 },
          { text: '기억만 한다', score: 3 },
          { text: '남기지 않는다', score: 4 },
        ],
      },
    ],
    results: [
      { min: 10, max: 17, title: '정상을 향하는 등반가 ⛰️',
        desc: '오르는 것 자체가 목적인 타입이야. 속도와 기록을 챙기고 힘든 구간에서도 흔들리지 않지. 다만 내려올 때 무릎에 실리는 힘이 올라갈 때의 몇 배야. 하산에서 속도를 줄이고 스틱을 쓰는 것만으로 오래 다닐 수 있어.',
        emoji: '⛰️', color: 'from-slate-500 to-slate-700',
        traits: ['목표지향', '체력', '집중', '도전'] },
      { min: 18, max: 25, title: '꾸준한 산행러 🥾',
        desc: '무리하지 않고 자기 속도로 꾸준히 가는 타입이야. 이게 가장 오래 다니는 방식이지. 코스를 조금씩 늘려가면 체력이 따라오니, 같은 산의 다른 코스부터 도전해보면 재미가 붙어.',
        emoji: '🥾', color: 'from-emerald-400 to-green-600',
        traits: ['지속력', '균형', '체력', '실속'] },
      { min: 26, max: 33, title: '경치를 즐기는 산책러 🌄',
        desc: '오르는 것보다 산에 있는 시간이 좋은 타입이야. 좋은 자리에서 오래 머물고 사진도 많이 남기지. 다만 해가 지는 시각은 꼭 확인해줘. 산에서는 생각보다 훨씬 빨리 어두워지고, 그게 가장 흔한 사고 원인이야.',
        emoji: '🌄', color: 'from-sky-400 to-blue-500',
        traits: ['감상', '여유', '관찰', '휴식'] },
      { min: 34, max: 40, title: '산이 아직 낯선 타입 🌱',
        desc: '아직 산이 힘든 쪽에 가까운 타입이야. 처음부터 높은 산에 가면 등산 자체가 싫어지기 쉬워. 왕복 두 시간짜리 낮은 산부터 시작하고, 등산화와 물만은 제대로 챙겨봐. 이 둘이 힘든 정도를 절반으로 줄여줘.',
        emoji: '🌱', color: 'from-amber-400 to-orange-500',
        traits: ['시작', '솔직함', '가능성', '조심성'] },
    ],
  },
];
