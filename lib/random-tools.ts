/**
 * 랜덤 뽑기(결정 도우미) 섹션의 도구 메타데이터.
 *
 * 각 도구는 브라우저에서 난수로 결과를 만드는 인터랙티브 컴포넌트다.
 * 사진·외부 이미지 없이 이모지·SVG·CSS만으로 구현한다(정적 배포와 CSP에 맞음).
 *
 * 여기엔 목록/검색/사이트맵/상세 라우팅에 필요한 메타만 둔다.
 * slug → 실제 컴포넌트 매핑은 app/random/[slug]/page.tsx에서 한다.
 *
 * titleEn/descEn/longEn은 영어판이 처음 생길 때 여기 붙인 것이다. 언어가 여덟이 된
 * 지금은 나머지 문구가 lib/random-ui-intl.ts의 사전에 있다 — 도구마다 필드를 여섯 벌
 * 더 늘리면 이 파일이 데이터가 아니라 번역 사전이 된다.
 */
export interface RandomTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /** 상세 페이지 상단 히어로 그라디언트 */
  gradient: string;
  /** 검색·메타에 쓰는 한 줄 설명(길게) */
  long: string;
  titleEn: string;
  descEn: string;
  longEn: string;
  categoryEn: string;
}

const RANDOM_TOOLS: RandomTool[] = [
  {
    slug: 'roulette',
    title: '룰렛 돌림판', desc: '항목을 넣고 돌려서 하나를 뽑는 룰렛',
    icon: '🎡', category: '뽑기', gradient: 'from-rose-500 to-pink-600',
    long: '점심 메뉴, 벌칙, 당번 등 항목을 자유롭게 넣고 돌림판을 돌려 무작위로 하나를 정하세요. 예/아니오, 메뉴 추천 등 프리셋도 제공합니다.',
    titleEn: 'Spin the Wheel', descEn: 'Add options and spin to pick one at random',
    categoryEn: 'Pick', longEn: 'Add lunch options, penalties or chores and spin the wheel to decide at random. Includes handy presets like yes/no and food picks. Free and instant.',
  },
  {
    slug: 'ladder',
    title: '사다리타기', desc: '참가자와 결과를 잇는 사다리 게임',
    icon: '🪜', category: '뽑기', gradient: 'from-violet-500 to-purple-600',
    long: '참가자와 결과를 입력하면 무작위 사다리가 만들어집니다. 이름을 눌러 어떤 결과로 이어지는지 경로를 따라가 보세요. 당번·선물·순서 정하기에 딱.',
    titleEn: 'Ladder Game (Ghost Leg)', descEn: 'Connect players to outcomes with a random ladder',
    categoryEn: 'Pick', longEn: 'Enter players and outcomes to build a random ladder (amidakuji / ghost leg). Tap a name to trace where it leads. Great for chores, gifts and turn order.',
  },
  {
    slug: 'pick',
    title: '당첨자 뽑기', desc: '명단에서 당첨자를 무작위로 추첨',
    icon: '🎯', category: '추첨', gradient: 'from-amber-400 to-orange-500',
    long: '이름이나 항목 목록을 넣고 원하는 인원만큼 무작위로 뽑습니다. 경품 추첨, 발표자 정하기, 청소 당번 뽑기 등에 사용하세요.',
    titleEn: 'Random Name Picker', descEn: 'Draw winners from a list at random',
    categoryEn: 'Draw', longEn: 'Paste a list of names or items and draw as many random winners as you like. Perfect for giveaways, picking a presenter or choosing who does the chores.',
  },
  {
    slug: 'order',
    title: '순서 정하기', desc: '명단을 무작위 순서로 정렬',
    icon: '🔀', category: '추첨', gradient: 'from-cyan-500 to-sky-600',
    long: '참가자나 항목을 넣으면 무작위 순서로 정렬해 줍니다. 발표 순서, 게임 차례, 줄서기 순서 등을 공정하게 정할 때 쓰세요.',
    titleEn: 'Random Order Generator', descEn: 'Shuffle a list into a random order',
    categoryEn: 'Draw', longEn: 'Enter names or items and get them back in a random order. Great for fairly deciding presentation order, game turns or who goes first.',
  },
  {
    slug: 'secret-santa',
    title: '마니또 뽑기', desc: '자기 자신은 빼고 서로의 마니또를 배정',
    icon: '🎁', category: '추첨', gradient: 'from-rose-500 to-red-600',
    long: '참가자를 넣으면 아무도 자기 자신에게 걸리지 않게 마니또(비밀 친구)를 배정합니다. 폰을 돌려가며 각자 자기 마니또만 몰래 확인할 수 있어요. 연말 모임·마니또 게임에 딱.',
    titleEn: 'Secret Santa Generator', descEn: 'Assign secret gift partners — no one gets themselves',
    categoryEn: 'Draw', longEn: 'Enter everyone and get a Secret Santa assignment where no one draws themselves. Pass the phone around so each person privately checks their own match. Perfect for holiday parties.',
  },
  {
    slug: 'team',
    title: '팀 나누기', desc: '인원을 원하는 팀 수로 랜덤 배분',
    icon: '👥', category: '추첨', gradient: 'from-sky-500 to-blue-600',
    long: '참가자 명단을 넣고 팀 개수를 정하면 인원을 공평하게 무작위로 나눕니다. 조 편성, 게임 팀, 스터디 그룹 짜기에 좋습니다.',
    titleEn: 'Random Team Generator', descEn: 'Split people into balanced random teams',
    categoryEn: 'Draw', longEn: 'Enter a list of names and choose how many teams — everyone is split fairly at random. Great for group projects, game teams and study groups.',
  },
  {
    slug: 'number',
    title: '숫자 뽑기', desc: '범위 안에서 숫자 추첨 · 로또 번호',
    icon: '🔢', category: '숫자', gradient: 'from-emerald-400 to-teal-600',
    long: '원하는 범위에서 숫자를 무작위로 뽑습니다. 중복 없이 여러 개 뽑기, 로또(1~45 중 6개) 프리셋도 지원합니다.',
    titleEn: 'Random Number Generator', descEn: 'Pick random numbers in any range',
    categoryEn: 'Numbers', longEn: 'Generate random numbers within any range. Draw several with no duplicates, or use the lottery preset (6 numbers from 1–45). Free and instant.',
  },
  {
    slug: 'coin-dice',
    title: '동전·주사위', desc: '동전 던지기와 주사위 굴리기',
    icon: '🪙', category: '숫자', gradient: 'from-fuchsia-500 to-rose-500',
    long: '앞/뒤 동전 던지기와 1~6 주사위 굴리기를 한 곳에서. 간단한 결정이나 게임에 빠르게 쓰세요. 주사위는 여러 개도 굴릴 수 있습니다.',
    titleEn: 'Coin Flip & Dice Roller', descEn: 'Flip a coin or roll dice instantly',
    categoryEn: 'Numbers', longEn: 'Flip a heads-or-tails coin and roll 1–6 dice in one place. Quick for simple decisions and games — roll several dice at once too.',
  },
  {
    slug: "card",
    title: "카드 뽑기", desc: "트럼프 한 벌에서 무작위로",
    icon: "🃏", category: "추첨", gradient: "from-rose-500 to-pink-600",
    long: "트럼프 52장 한 벌에서 무작위로 카드를 뽑습니다. 한 벌에서 뽑기 때문에 같은 카드가 두 번 나오지 않아 카드놀이나 벌칙 정하기에 그대로 쓸 수 있습니다.",
    titleEn: "Card Draw", descEn: "Draw at random from a full deck",
    categoryEn: "Draw", longEn: "Draws random cards from a standard 52-card deck. Because they come from one deck no card ever repeats, so you can use the result straight away for card games or forfeits.",
  },
  {
    slug: "rps",
    title: "가위바위보", desc: "혼자서도 가위바위보",
    icon: "✌️", category: "추첨", gradient: "from-orange-500 to-amber-600",
    long: "상대 없이 가위바위보를 합니다. 손을 고르면 컴퓨터가 무작위로 내고 승패를 알려 주며, 전적이 함께 쌓입니다. 세 손이 고르게 나오도록 만들었습니다.",
    titleEn: "Rock Paper Scissors", descEn: "Play against the computer",
    categoryEn: "Pick", longEn: "Play rock paper scissors without an opponent. Pick a hand and the computer throws one at random, then tells you who won and keeps a running record. All three hands come up equally often.",
  },
  {
    slug: "bingo",
    title: "빙고판 만들기", desc: "3×3부터 5×5까지 무작위 빙고판",
    icon: "🎱", category: "숫자", gradient: "from-violet-500 to-purple-600",
    long: "무작위 빙고판을 만듭니다. 같은 수가 두 번 들어가지 않으므로 한 수가 불렸을 때 두 칸이 함께 지워지는 일이 없습니다. 칸을 눌러 지우면 완성한 줄 수를 세어 줍니다.",
    titleEn: "Bingo Card Maker", descEn: "Random bingo cards from 3\u00d73 to 5\u00d75",
    categoryEn: "Numbers", longEn: "Builds a random bingo card. No number appears twice, so one call never clears two squares at once. Tap squares to mark them and it counts your completed lines.",
  },
  {
    slug: "weighted",
    title: "가중치 추첨", desc: "항목마다 확률을 다르게",
    icon: "⚖️", category: "추첨", gradient: "from-emerald-500 to-teal-600",
    long: "항목마다 가중치를 달리 줘서 뽑습니다. 가중치가 클수록 자주 뽑히고 0이면 뽑히지 않으며, 각 항목의 확률을 %로 함께 보여 줍니다. 경품 등급이나 편향된 추첨에 씁니다.",
    titleEn: "Weighted Draw", descEn: "Give each option a different chance",
    categoryEn: "Draw", longEn: "Draws from a list where each item carries its own weight. A bigger weight is picked more often and zero is never picked, and the chance of each item is shown as a percentage. Handy for prize tiers or a deliberately unfair draw.",
  },
  {
    slug: "duty",
    title: "당번표 만들기", desc: "돌아가며 공정하게",
    icon: "📋", category: "추첨", gradient: "from-sky-500 to-blue-600",
    long: "청소·발표·설거지 당번을 돌아가며 정합니다. 한 바퀴를 다 돌기 전에는 같은 사람이 두 번 걸리지 않고, 바퀴가 바뀔 때도 연달아 오지 않습니다. 사람별 횟수를 함께 보여 줍니다.",
    titleEn: "Duty Roster Maker", descEn: "Take turns fairly, round by round",
    categoryEn: "Draw", longEn: "Works out who does the cleaning, the presenting or the washing up. Nobody comes up twice before everyone has had a turn, and nobody lands twice in a row when the rounds change. It shows how many turns each person got.",
  },
  {
    slug: "yes-no",
    title: "예 아니오 결정", desc: "정하기 어려울 때 대신 정해줍니다",
    icon: "🪙", category: "추첨", gradient: "from-fuchsia-500 to-rose-600",
    long: "예인지 아니오인지 대신 정해 줍니다. \"예\"가 나올 확률을 조절할 수 있어서, 답이 나왔을 때의 기분으로 이미 마음이 어느 쪽인지 알아보는 데도 씁니다.",
    titleEn: "Yes or No Decider", descEn: "Let it decide when you cannot",
    categoryEn: "Pick", longEn: "Decides yes or no for you. You can tilt the odds towards yes, which makes it useful for a different purpose too \u2014 watch how you feel about the answer, and if you are disappointed you already knew what you wanted.",
  },
];

export default RANDOM_TOOLS;
export { RANDOM_TOOLS };
export const RANDOM_TOOLS_MAP: Record<string, RandomTool> = Object.fromEntries(
  RANDOM_TOOLS.map(t => [t.slug, t]),
);
