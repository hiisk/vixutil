/**
 * 랜덤 뽑기(결정 도우미) 섹션의 도구 메타데이터.
 *
 * 각 도구는 브라우저에서 난수로 결과를 만드는 인터랙티브 컴포넌트다.
 * 사진·외부 이미지 없이 이모지·SVG·CSS만으로 구현한다(정적 배포와 CSP에 맞음).
 *
 * 여기엔 목록/검색/사이트맵/상세 라우팅에 필요한 메타만 둔다.
 * slug → 실제 컴포넌트 매핑은 app/random/[slug]/page.tsx에서 한다.
 *
 * titleEn/descEn/longEn은 영어판(/en/random)에서 쓴다. 계산기·코인 외 전 섹션을
 * 영어로도 제공하기 위한 것이며, 도구는 문화색이 없어 그대로 번역된다.
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
  titleZh: string;
  descZh: string;
  longZh: string;
}

const RANDOM_TOOLS: RandomTool[] = [
  {
    slug: 'roulette',
    title: '룰렛 돌림판', desc: '항목을 넣고 돌려서 하나를 뽑는 룰렛',
    icon: '🎡', category: '뽑기', gradient: 'from-rose-500 to-pink-600',
    long: '점심 메뉴, 벌칙, 당번 등 항목을 자유롭게 넣고 돌림판을 돌려 무작위로 하나를 정하세요. 예/아니오, 메뉴 추천 등 프리셋도 제공합니다.',
    titleEn: 'Spin the Wheel', descEn: 'Add options and spin to pick one at random',
    categoryEn: 'Pick', longEn: 'Add lunch options, penalties or chores and spin the wheel to decide at random. Includes handy presets like yes/no and food picks. Free and instant.',
    titleZh: '幸运转盘', descZh: '输入选项，转动转盘随机抽一个',
    longZh: '把午餐、惩罚、值日等选项自由填入，转动转盘随机决定一个。还提供是/否、菜单推荐等预设。免费、即时。',
  },
  {
    slug: 'ladder',
    title: '사다리타기', desc: '참가자와 결과를 잇는 사다리 게임',
    icon: '🪜', category: '뽑기', gradient: 'from-violet-500 to-purple-600',
    long: '참가자와 결과를 입력하면 무작위 사다리가 만들어집니다. 이름을 눌러 어떤 결과로 이어지는지 경로를 따라가 보세요. 당번·선물·순서 정하기에 딱.',
    titleEn: 'Ladder Game (Ghost Leg)', descEn: 'Connect players to outcomes with a random ladder',
    categoryEn: 'Pick', longEn: 'Enter players and outcomes to build a random ladder (amidakuji / ghost leg). Tap a name to trace where it leads. Great for chores, gifts and turn order.',
    titleZh: '鬼脚图（画鬼脚）', descZh: '用随机阶梯把参与者与结果相连',
    longZh: '输入参与者和结果，自动生成随机阶梯（鬼脚图）。点击名字即可查看连到哪个结果。分配值日、礼物、顺序都好用。',
  },
  {
    slug: 'pick',
    title: '당첨자 뽑기', desc: '명단에서 당첨자를 무작위로 추첨',
    icon: '🎯', category: '추첨', gradient: 'from-amber-400 to-orange-500',
    long: '이름이나 항목 목록을 넣고 원하는 인원만큼 무작위로 뽑습니다. 경품 추첨, 발표자 정하기, 청소 당번 뽑기 등에 사용하세요.',
    titleEn: 'Random Name Picker', descEn: 'Draw winners from a list at random',
    categoryEn: 'Draw', longEn: 'Paste a list of names or items and draw as many random winners as you like. Perfect for giveaways, picking a presenter or choosing who does the chores.',
    titleZh: '随机点名器', descZh: '从名单中随机抽取中奖者',
    longZh: '粘贴名单或项目，随机抽取任意人数的中奖者。抽奖、选发言人、选值日都合适。',
  },
  {
    slug: 'order',
    title: '순서 정하기', desc: '명단을 무작위 순서로 정렬',
    icon: '🔀', category: '추첨', gradient: 'from-cyan-500 to-sky-600',
    long: '참가자나 항목을 넣으면 무작위 순서로 정렬해 줍니다. 발표 순서, 게임 차례, 줄서기 순서 등을 공정하게 정할 때 쓰세요.',
    titleEn: 'Random Order Generator', descEn: 'Shuffle a list into a random order',
    categoryEn: 'Draw', longEn: 'Enter names or items and get them back in a random order. Great for fairly deciding presentation order, game turns or who goes first.',
    titleZh: '随机排序', descZh: '把名单打乱成随机顺序',
    longZh: '输入名字或项目，返回随机排列的顺序。公平决定发言顺序、游戏轮次、排队先后。',
  },
  {
    slug: 'secret-santa',
    title: '마니또 뽑기', desc: '자기 자신은 빼고 서로의 마니또를 배정',
    icon: '🎁', category: '추첨', gradient: 'from-rose-500 to-red-600',
    long: '참가자를 넣으면 아무도 자기 자신에게 걸리지 않게 마니또(비밀 친구)를 배정합니다. 폰을 돌려가며 각자 자기 마니또만 몰래 확인할 수 있어요. 연말 모임·마니또 게임에 딱.',
    titleEn: 'Secret Santa Generator', descEn: 'Assign secret gift partners — no one gets themselves',
    categoryEn: 'Draw', longEn: 'Enter everyone and get a Secret Santa assignment where no one draws themselves. Pass the phone around so each person privately checks their own match. Perfect for holiday parties.',
    titleZh: '神秘圣诞人抽取', descZh: '互赠对象分配，谁都不会抽到自己',
    longZh: '输入所有人，自动分配神秘圣诞人（互赠对象），且没有人会抽到自己。传阅手机，每人只查看自己的对象。年终聚会必备。',
  },
  {
    slug: 'team',
    title: '팀 나누기', desc: '인원을 원하는 팀 수로 랜덤 배분',
    icon: '👥', category: '추첨', gradient: 'from-sky-500 to-blue-600',
    long: '참가자 명단을 넣고 팀 개수를 정하면 인원을 공평하게 무작위로 나눕니다. 조 편성, 게임 팀, 스터디 그룹 짜기에 좋습니다.',
    titleEn: 'Random Team Generator', descEn: 'Split people into balanced random teams',
    categoryEn: 'Draw', longEn: 'Enter a list of names and choose how many teams — everyone is split fairly at random. Great for group projects, game teams and study groups.',
    titleZh: '随机分组', descZh: '把人随机分成均衡的小队',
    longZh: '输入名单并设定队伍数量，系统会把人公平地随机分组。适合分组作业、游戏组队、学习小组。',
  },
  {
    slug: 'number',
    title: '숫자 뽑기', desc: '범위 안에서 숫자 추첨 · 로또 번호',
    icon: '🔢', category: '숫자', gradient: 'from-emerald-400 to-teal-600',
    long: '원하는 범위에서 숫자를 무작위로 뽑습니다. 중복 없이 여러 개 뽑기, 로또(1~45 중 6개) 프리셋도 지원합니다.',
    titleEn: 'Random Number Generator', descEn: 'Pick random numbers in any range',
    categoryEn: 'Numbers', longEn: 'Generate random numbers within any range. Draw several with no duplicates, or use the lottery preset (6 numbers from 1–45). Free and instant.',
    titleZh: '随机数生成器', descZh: '在任意范围内抽取随机数',
    longZh: '在任意范围内生成随机数。可不重复地抽取多个，也可使用彩票预设（1~45 选 6）。免费、即时。',
  },
  {
    slug: 'coin-dice',
    title: '동전·주사위', desc: '동전 던지기와 주사위 굴리기',
    icon: '🪙', category: '숫자', gradient: 'from-fuchsia-500 to-rose-500',
    long: '앞/뒤 동전 던지기와 1~6 주사위 굴리기를 한 곳에서. 간단한 결정이나 게임에 빠르게 쓰세요. 주사위는 여러 개도 굴릴 수 있습니다.',
    titleEn: 'Coin Flip & Dice Roller', descEn: 'Flip a coin or roll dice instantly',
    categoryEn: 'Numbers', longEn: 'Flip a heads-or-tails coin and roll 1–6 dice in one place. Quick for simple decisions and games — roll several dice at once too.',
    titleZh: '抛硬币和掷骰子', descZh: '立即抛硬币或掷骰子',
    longZh: '正反面抛硬币，加上 1~6 骰子，一处搞定。简单决定和游戏都能用，还能同时掷多颗骰子。',
  },
];

export default RANDOM_TOOLS;
export { RANDOM_TOOLS };
export const RANDOM_TOOLS_MAP: Record<string, RandomTool> = Object.fromEntries(
  RANDOM_TOOLS.map(t => [t.slug, t]),
);
