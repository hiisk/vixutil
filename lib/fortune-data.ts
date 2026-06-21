/* ────────────────────────────────────────────────
   운세 데이터 — vixutil.com
   날짜 시드 기반으로 매일 다른 운세가 제공됩니다
──────────────────────────────────────────────── */

/* ── 별자리 ── */
export const ZODIAC_SIGNS = [
  { id: 'aries',       name: '양자리',     emoji: '♈', period: '3.21~4.19', element: '불',  ruling: '화성' },
  { id: 'taurus',      name: '황소자리',   emoji: '♉', period: '4.20~5.20', element: '흙',  ruling: '금성' },
  { id: 'gemini',      name: '쌍둥이자리', emoji: '♊', period: '5.21~6.21', element: '바람', ruling: '수성' },
  { id: 'cancer',      name: '게자리',     emoji: '♋', period: '6.22~7.22', element: '물',  ruling: '달' },
  { id: 'leo',         name: '사자자리',   emoji: '♌', period: '7.23~8.22', element: '불',  ruling: '태양' },
  { id: 'virgo',       name: '처녀자리',   emoji: '♍', period: '8.23~9.22', element: '흙',  ruling: '수성' },
  { id: 'libra',       name: '천칭자리',   emoji: '♎', period: '9.23~10.23', element: '바람', ruling: '금성' },
  { id: 'scorpio',     name: '전갈자리',   emoji: '♏', period: '10.24~11.22', element: '물', ruling: '명왕성' },
  { id: 'sagittarius', name: '사수자리',   emoji: '♐', period: '11.23~12.21', element: '불', ruling: '목성' },
  { id: 'capricorn',   name: '염소자리',   emoji: '♑', period: '12.22~1.19', element: '흙', ruling: '토성' },
  { id: 'aquarius',    name: '물병자리',   emoji: '♒', period: '1.20~2.18', element: '바람', ruling: '천왕성' },
  { id: 'pisces',      name: '물고기자리', emoji: '♓', period: '2.19~3.20', element: '물',  ruling: '해왕성' },
] as const;
export type ZodiacId = typeof ZODIAC_SIGNS[number]['id'];

/* ── 사주·띠 ── */
export const ANIMALS = [
  { id: 'rat',     name: '쥐띠',  emoji: '🐭', years: [1948,1960,1972,1984,1996,2008,2020], trait: '영리함·적응력' },
  { id: 'ox',      name: '소띠',  emoji: '🐂', years: [1949,1961,1973,1985,1997,2009,2021], trait: '성실함·인내심' },
  { id: 'tiger',   name: '범띠',  emoji: '🐯', years: [1950,1962,1974,1986,1998,2010,2022], trait: '용감함·추진력' },
  { id: 'rabbit',  name: '토끼띠',emoji: '🐰', years: [1951,1963,1975,1987,1999,2011,2023], trait: '온화함·섬세함' },
  { id: 'dragon',  name: '용띠',  emoji: '🐲', years: [1952,1964,1976,1988,2000,2012,2024], trait: '카리스마·야망' },
  { id: 'snake',   name: '뱀띠',  emoji: '🐍', years: [1953,1965,1977,1989,2001,2013,2025], trait: '직관력·신중함' },
  { id: 'horse',   name: '말띠',  emoji: '🐴', years: [1954,1966,1978,1990,2002,2014,2026], trait: '열정·자유로움' },
  { id: 'goat',    name: '양띠',  emoji: '🐑', years: [1955,1967,1979,1991,2003,2015,2027], trait: '예술성·온순함' },
  { id: 'monkey',  name: '원숭이띠',emoji: '🐒', years: [1956,1968,1980,1992,2004,2016,2028], trait: '재치·호기심' },
  { id: 'rooster', name: '닭띠',  emoji: '🐓', years: [1957,1969,1981,1993,2005,2017,2029], trait: '꼼꼼함·성취욕' },
  { id: 'dog',     name: '개띠',  emoji: '🐕', years: [1958,1970,1982,1994,2006,2018,2030], trait: '충실함·정의감' },
  { id: 'pig',     name: '돼지띠',emoji: '🐷', years: [1959,1971,1983,1995,2007,2019,2031], trait: '넉넉함·복' },
] as const;
export type AnimalId = typeof ANIMALS[number]['id'];

/* ── 타로 메이저 아르카나 ── */
export const TAROT_CARDS = [
  { id: 0,  name: '바보',           nameEn: 'The Fool',          emoji: '🃏', upright: '새로운 시작, 순수한 열정, 모험의 기회', reversed: '무모한 결정, 계획 없는 행동 주의', color: '#6366f1' },
  { id: 1,  name: '마법사',         nameEn: 'The Magician',      emoji: '🔮', upright: '의지력·능력 발휘, 창의적 아이디어 실현', reversed: '재능 낭비, 자기 과신 주의', color: '#f59e0b' },
  { id: 2,  name: '여사제',         nameEn: 'The High Priestess',emoji: '🌙', upright: '직관·내면의 지혜, 숨겨진 진실 발견', reversed: '지나친 의심, 정보 과부하 주의', color: '#8b5cf6' },
  { id: 3,  name: '여황제',         nameEn: 'The Empress',       emoji: '🌸', upright: '풍요·창조력, 사랑과 감수성의 시간', reversed: '의존성·창의력 막힘 주의', color: '#ec4899' },
  { id: 4,  name: '황제',           nameEn: 'The Emperor',       emoji: '👑', upright: '안정·질서, 강한 리더십과 책임감', reversed: '권위주의·경직성 주의', color: '#ef4444' },
  { id: 5,  name: '교황',           nameEn: 'The Hierophant',    emoji: '⛪', upright: '전통·신뢰, 멘토의 조언이 빛을 발함', reversed: '틀에 박힌 사고, 변화 거부 주의', color: '#d97706' },
  { id: 6,  name: '연인',           nameEn: 'The Lovers',        emoji: '💑', upright: '조화로운 관계, 중요한 선택의 기로', reversed: '불화·선택 장애 주의', color: '#f43f5e' },
  { id: 7,  name: '전차',           nameEn: 'The Chariot',       emoji: '🏆', upright: '승리·추진력, 강한 의지로 목표 달성', reversed: '방향성 잃음, 통제력 상실 주의', color: '#3b82f6' },
  { id: 8,  name: '힘',             nameEn: 'Strength',          emoji: '🦁', upright: '내면의 힘·용기, 인내로 어려움 극복', reversed: '자기 의심, 에너지 고갈 주의', color: '#f59e0b' },
  { id: 9,  name: '은둔자',         nameEn: 'The Hermit',        emoji: '🏔️', upright: '내면 탐구, 혼자만의 성찰이 답을 줌', reversed: '고립·외로움 주의', color: '#6b7280' },
  { id: 10, name: '운명의 수레바퀴', nameEn: 'Wheel of Fortune',  emoji: '☸️', upright: '행운·전환점, 긍정적 변화가 찾아옴', reversed: '나쁜 운·반복되는 실수 주의', color: '#10b981' },
  { id: 11, name: '정의',           nameEn: 'Justice',           emoji: '⚖️', upright: '공정한 결과, 노력에 걸맞는 보상', reversed: '불공정·책임 회피 주의', color: '#0ea5e9' },
  { id: 12, name: '매달린 사람',     nameEn: 'The Hanged Man',    emoji: '🙃', upright: '관점 전환, 잠시 멈춰 새롭게 바라볼 때', reversed: '시간 낭비·희생 거부 주의', color: '#6366f1' },
  { id: 13, name: '죽음',           nameEn: 'Death',             emoji: '🌑', upright: '끝과 새 시작, 변화를 두려워 말 것', reversed: '변화 거부, 과거에 집착 주의', color: '#374151' },
  { id: 14, name: '절제',           nameEn: 'Temperance',        emoji: '⚗️', upright: '균형·조화, 인내와 중용의 미덕', reversed: '극단적 행동·과잉 주의', color: '#06b6d4' },
  { id: 15, name: '악마',           nameEn: 'The Devil',         emoji: '😈', upright: '속박에서 벗어날 기회, 욕구 직면', reversed: '집착·유혹에 빠짐 주의', color: '#7c3aed' },
  { id: 16, name: '탑',             nameEn: 'The Tower',         emoji: '⚡', upright: '갑작스러운 변화, 낡은 것 무너뜨리고 재건', reversed: '변화 거부, 재난 회피 주의', color: '#dc2626' },
  { id: 17, name: '별',             nameEn: 'The Star',          emoji: '⭐', upright: '희망·치유, 꿈이 이루어지는 길목', reversed: '실망·희망 상실 주의', color: '#0ea5e9' },
  { id: 18, name: '달',             nameEn: 'The Moon',          emoji: '🌕', upright: '무의식·직관, 숨은 진실이 드러날 때', reversed: '불안·환상 주의', color: '#6366f1' },
  { id: 19, name: '태양',           nameEn: 'The Sun',           emoji: '☀️', upright: '기쁨·활력, 최고의 에너지로 빛나는 날', reversed: '과신·일시적 행복 주의', color: '#f59e0b' },
  { id: 20, name: '심판',           nameEn: 'Judgement',         emoji: '🎺', upright: '부활·자각, 새로운 소명을 발견하는 시기', reversed: '자기 의심·판단 미루기 주의', color: '#10b981' },
  { id: 21, name: '세계',           nameEn: 'The World',         emoji: '🌍', upright: '완성·성취, 목표를 이루고 새 단계로', reversed: '미완성·지연 주의', color: '#8b5cf6' },
] as const;

/* ── 마이너 아르카나 56장 ── */
export const SUIT_INFO = {
  wands:     { name: '완드',    nameEn: 'Wands',     emoji: '🪄', theme: '열정·창의력·의지', color: '#f97316' },
  cups:      { name: '컵',      nameEn: 'Cups',      emoji: '🏆', theme: '감정·관계·직관',   color: '#3b82f6' },
  swords:    { name: '소드',    nameEn: 'Swords',    emoji: '⚔️', theme: '생각·갈등·진실',   color: '#6366f1' },
  pentacles: { name: '펜타클', nameEn: 'Pentacles', emoji: '🌟', theme: '물질·현실·안정',   color: '#22c55e' },
} as const;
export type Suit = keyof typeof SUIT_INFO;

export const MINOR_ARCANA: {
  suit: Suit; rank: number; name: string; nameEn: string; emoji: string;
  upright: string; reversed: string;
}[] = [
  /* ── 완드 (Wands) ── */
  { suit:'wands', rank:1,  name:'완드 에이스',  nameEn:'Ace of Wands',      emoji:'🕯️', upright:'새로운 시작·창의적 불꽃, 열정적 도전의 기회',    reversed:'창의력 막힘, 계획만 세우고 실행 못함 주의' },
  { suit:'wands', rank:2,  name:'완드 2',        nameEn:'Two of Wands',      emoji:'🌍', upright:'장기 계획과 비전, 더 넓은 세계를 향한 탐색',       reversed:'두려움으로 인한 지연, 편안함에 안주 주의' },
  { suit:'wands', rank:3,  name:'완드 3',        nameEn:'Three of Wands',    emoji:'⛵', upright:'기회 확장, 결실이 눈앞에 가까워짐',                 reversed:'예상치 못한 지연, 걸림돌 주의' },
  { suit:'wands', rank:4,  name:'완드 4',        nameEn:'Four of Wands',     emoji:'🎊', upright:'축하·안정·화목, 성취 후 즐거운 쉬어가는 시간',    reversed:'불안정한 기반, 지연과 변동 주의' },
  { suit:'wands', rank:5,  name:'완드 5',        nameEn:'Five of Wands',     emoji:'⚡', upright:'건전한 경쟁과 도전, 창의적 마찰에서 성장',          reversed:'갈등 회피, 억눌린 에너지 주의' },
  { suit:'wands', rank:6,  name:'완드 6',        nameEn:'Six of Wands',      emoji:'🏆', upright:'승리·인정·자신감, 노력이 빛을 발하는 순간',        reversed:'자기 의심, 타인의 인정에 지나치게 의존 주의' },
  { suit:'wands', rank:7,  name:'완드 7',        nameEn:'Seven of Wands',    emoji:'🛡️', upright:'끝까지 방어하는 용기, 경쟁 속 우위 유지',          reversed:'과도한 방어, 지쳐서 포기할 위험 주의' },
  { suit:'wands', rank:8,  name:'완드 8',        nameEn:'Eight of Wands',    emoji:'🚀', upright:'빠른 진전·소식·행동, 일이 속도를 내기 시작',       reversed:'지연·혼선, 서두르다 실수할 위험 주의' },
  { suit:'wands', rank:9,  name:'완드 9',        nameEn:'Nine of Wands',     emoji:'💪', upright:'회복력·인내, 마지막 관문을 넘을 힘이 있음',         reversed:'과도한 방어심, 지쳐서 의심하는 상태 주의' },
  { suit:'wands', rank:10, name:'완드 10',       nameEn:'Ten of Wands',      emoji:'📦', upright:'책임감과 성취, 무거운 짐이지만 결승점이 가까움',   reversed:'과부하·번아웃, 짐을 내려놓을 용기 필요' },
  { suit:'wands', rank:11, name:'완드 시종',     nameEn:'Page of Wands',     emoji:'🌱', upright:'열정적 학습자, 새로운 아이디어와 모험심',           reversed:'성급함·충동, 계획 없는 출발 주의' },
  { suit:'wands', rank:12, name:'완드 기사',     nameEn:'Knight of Wands',   emoji:'🐎', upright:'열정적 행동가, 용기 있는 도전과 카리스마',          reversed:'경솔함, 에너지 분산과 무모한 위험 주의' },
  { suit:'wands', rank:13, name:'완드 여왕',     nameEn:'Queen of Wands',    emoji:'🌻', upright:'자신감·독립심·카리스마, 목표를 향한 강렬한 에너지', reversed:'독선적 태도, 지배욕과 에너지 소진 주의' },
  { suit:'wands', rank:14, name:'완드 왕',       nameEn:'King of Wands',     emoji:'🦁', upright:'리더십·비전·카리스마, 사람들을 이끄는 강한 힘',    reversed:'권위주의·충동적 결정, 과신 주의' },

  /* ── 컵 (Cups) ── */
  { suit:'cups', rank:1,  name:'컵 에이스',    nameEn:'Ace of Cups',       emoji:'💧', upright:'새로운 감정의 시작, 사랑·직관·치유의 씨앗',         reversed:'감정 억압, 내면의 공허함 주의' },
  { suit:'cups', rank:2,  name:'컵 2',          nameEn:'Two of Cups',       emoji:'💑', upright:'파트너십·상호 사랑, 깊은 인연의 연결',              reversed:'불균형한 관계, 오해와 불화 주의' },
  { suit:'cups', rank:3,  name:'컵 3',          nameEn:'Three of Cups',     emoji:'🥂', upright:'축하·우정·공동체, 함께하는 기쁨',                   reversed:'과도한 쾌락, 삼각관계나 험담 주의' },
  { suit:'cups', rank:4,  name:'컵 4',          nameEn:'Four of Cups',      emoji:'🌀', upright:'사색·무관심, 내면을 들여다볼 시간',                 reversed:'새로운 기회를 놓침, 무기력 주의' },
  { suit:'cups', rank:5,  name:'컵 5',          nameEn:'Five of Cups',      emoji:'😢', upright:'상실·슬픔·후회, 남은 것에도 가치가 있음을 기억',    reversed:'회복·수용, 과거를 놓아줄 준비' },
  { suit:'cups', rank:6,  name:'컵 6',          nameEn:'Six of Cups',       emoji:'🌈', upright:'향수·순수함·좋은 추억, 어린 시절의 기쁨',           reversed:'과거에 집착, 순진한 기대 주의' },
  { suit:'cups', rank:7,  name:'컵 7',          nameEn:'Seven of Cups',     emoji:'🌙', upright:'다양한 선택지·환상, 꿈을 현실로 만들 기회',         reversed:'환상에서 벗어나 현실 직시 필요' },
  { suit:'cups', rank:8,  name:'컵 8',          nameEn:'Eight of Cups',     emoji:'🚶', upright:'더 높은 것을 향해 떠남, 용기 있는 포기',             reversed:'집착·방황, 두려움으로 미루는 결정 주의' },
  { suit:'cups', rank:9,  name:'컵 9',          nameEn:'Nine of Cups',      emoji:'🌟', upright:'소원 성취·만족감, 원하던 것이 이루어지는 시간',     reversed:'탐욕·물질주의, 만족 모르는 욕구 주의' },
  { suit:'cups', rank:10, name:'컵 10',         nameEn:'Ten of Cups',       emoji:'🏡', upright:'행복한 가정·완성·충만함, 감정적 완전체',            reversed:'깨진 관계, 표면적 행복의 균열 주의' },
  { suit:'cups', rank:11, name:'컵 시종',       nameEn:'Page of Cups',      emoji:'🐠', upright:'직관적·감성적·꿈꾸는 자, 창의적 영감',              reversed:'감정 기복, 미성숙한 감정 표현 주의' },
  { suit:'cups', rank:12, name:'컵 기사',       nameEn:'Knight of Cups',    emoji:'🐬', upright:'낭만적 이상주의, 감성으로 움직이는 열정',            reversed:'변덕·감정 조종, 공상에 빠짐 주의' },
  { suit:'cups', rank:13, name:'컵 여왕',       nameEn:'Queen of Cups',     emoji:'🧘', upright:'공감능력·직관·치유의 힘, 감성적 지혜',              reversed:'감정 의존·과도한 자기 희생 주의' },
  { suit:'cups', rank:14, name:'컵 왕',         nameEn:'King of Cups',      emoji:'🌊', upright:'감정적 성숙·균형, 지혜롭게 감정을 이끄는 힘',      reversed:'감정 조종·불안정한 감정 기복 주의' },

  /* ── 소드 (Swords) ── */
  { suit:'swords', rank:1,  name:'소드 에이스',  nameEn:'Ace of Swords',     emoji:'⚡', upright:'진실·명확성·새로운 통찰, 지적 돌파구',              reversed:'혼란·거짓, 진실을 외면하는 상황 주의' },
  { suit:'swords', rank:2,  name:'소드 2',        nameEn:'Two of Swords',     emoji:'⚖️', upright:'교착상태, 결정을 미루는 순간 내면을 들여다봄',      reversed:'결단의 시기, 더 이상 회피할 수 없음' },
  { suit:'swords', rank:3,  name:'소드 3',        nameEn:'Three of Swords',   emoji:'💔', upright:'슬픔·배신·마음의 상처, 고통이 치유의 시작',         reversed:'회복·용서, 상처를 놓아줄 준비' },
  { suit:'swords', rank:4,  name:'소드 4',        nameEn:'Four of Swords',    emoji:'😴', upright:'휴식·명상·회복, 충전 후 더 강해지는 시간',          reversed:'지나친 고립, 활동으로 돌아갈 때' },
  { suit:'swords', rank:5,  name:'소드 5',        nameEn:'Five of Swords',    emoji:'🗡️', upright:'갈등 후 승리, 승패보다 중요한 것이 있음을 기억',     reversed:'화해·반성, 갈등의 결말이 다가옴' },
  { suit:'swords', rank:6,  name:'소드 6',        nameEn:'Six of Swords',     emoji:'⛵', upright:'전환·회복, 어려운 상황에서 더 나은 곳으로 이동',     reversed:'정체·저항, 변화를 거부하는 마음 주의' },
  { suit:'swords', rank:7,  name:'소드 7',        nameEn:'Seven of Swords',   emoji:'🦊', upright:'전략·독립적 사고, 영리한 접근이 필요한 상황',       reversed:'자백·솔직함, 숨겨왔던 것을 드러낼 때' },
  { suit:'swords', rank:8,  name:'소드 8',        nameEn:'Eight of Swords',   emoji:'🎭', upright:'구속·갇힌 느낌, 실은 스스로 만든 한계일 수 있음',   reversed:'자유·해방, 스스로의 힘으로 제약을 넘음' },
  { suit:'swords', rank:9,  name:'소드 9',        nameEn:'Nine of Swords',    emoji:'😰', upright:'불안·악몽, 두려움이 현실보다 크게 느껴지는 시기',    reversed:'회복의 빛, 최악은 지나가고 있음' },
  { suit:'swords', rank:10, name:'소드 10',       nameEn:'Ten of Swords',     emoji:'🌅', upright:'고통스러운 끝, 그러나 여명이 밝아오고 있음',         reversed:'재생·회복, 바닥을 찍고 올라오는 시작' },
  { suit:'swords', rank:11, name:'소드 시종',     nameEn:'Page of Swords',    emoji:'📖', upright:'분석적 사고·호기심·새로운 정보 습득',               reversed:'계획 없는 말, 비판적 태도 주의' },
  { suit:'swords', rank:12, name:'소드 기사',     nameEn:'Knight of Swords',  emoji:'🦅', upright:'빠른 사고·야망·직접적 행동, 목표를 향한 돌진',      reversed:'경솔·공격적 태도, 속도를 줄일 필요' },
  { suit:'swords', rank:13, name:'소드 여왕',     nameEn:'Queen of Swords',   emoji:'🌬️', upright:'독립·명확한 사고·날카로운 통찰력',                  reversed:'냉담·비판, 감정을 잃은 판단 주의' },
  { suit:'swords', rank:14, name:'소드 왕',       nameEn:'King of Swords',    emoji:'👁️', upright:'권위·분석력·공정한 판단, 이성으로 이끄는 힘',        reversed:'독재·냉혹함, 감정 무시 주의' },

  /* ── 펜타클 (Pentacles) ── */
  { suit:'pentacles', rank:1,  name:'펜타클 에이스', nameEn:'Ace of Pentacles',    emoji:'🌱', upright:'물질적 기회·번영의 씨앗, 현실적 시작의 신호',        reversed:'낭비·탐욕, 기회를 놓치는 상황 주의' },
  { suit:'pentacles', rank:2,  name:'펜타클 2',       nameEn:'Two of Pentacles',    emoji:'🔄', upright:'유연한 균형, 바쁜 일상에서 우선순위 조율',            reversed:'불균형·혼란, 너무 많은 것을 동시에 주의' },
  { suit:'pentacles', rank:3,  name:'펜타클 3',       nameEn:'Three of Pentacles',  emoji:'🏗️', upright:'팀워크·장인정신, 협력으로 만들어내는 높은 성취',      reversed:'갈등·낮은 퀄리티, 혼자 하려는 고집 주의' },
  { suit:'pentacles', rank:4,  name:'펜타클 4',       nameEn:'Four of Pentacles',   emoji:'🔒', upright:'안정·보안, 현명하게 지키는 자산과 에너지',            reversed:'집착·인색함, 변화를 두려워한 나머지 가로막힘' },
  { suit:'pentacles', rank:5,  name:'펜타클 5',       nameEn:'Five of Pentacles',   emoji:'❄️', upright:'재정적 어려움·고난, 그러나 도움의 손길이 가까이',      reversed:'회복·구원, 어려운 시기가 끝나가고 있음' },
  { suit:'pentacles', rank:6,  name:'펜타클 6',       nameEn:'Six of Pentacles',    emoji:'🤝', upright:'관대함·나눔, 주고받음의 균형이 이루어지는 시간',       reversed:'빚·불공정한 나눔, 의존 관계 주의' },
  { suit:'pentacles', rank:7,  name:'펜타클 7',       nameEn:'Seven of Pentacles',  emoji:'⏳', upright:'인내·장기 투자, 씨앗이 자라는 것을 기다리는 시간',    reversed:'성급함, 보상 없는 노력에 대한 좌절 주의' },
  { suit:'pentacles', rank:8,  name:'펜타클 8',       nameEn:'Eight of Pentacles',  emoji:'🔨', upright:'근면·기술 연마, 묵묵히 실력을 쌓아가는 장인',         reversed:'완벽주의·미루기, 지나친 반복에 빠짐 주의' },
  { suit:'pentacles', rank:9,  name:'펜타클 9',       nameEn:'Nine of Pentacles',   emoji:'🌺', upright:'풍요·독립·자기충족, 노력의 달콤한 결실',              reversed:'허영·과시, 외적 성공 뒤 공허함 주의' },
  { suit:'pentacles', rank:10, name:'펜타클 10',      nameEn:'Ten of Pentacles',    emoji:'🏰', upright:'부와 안정·유산, 세대를 이어갈 풍요로운 기반',          reversed:'가족 갈등·재정 손실, 기반의 균열 주의' },
  { suit:'pentacles', rank:11, name:'펜타클 시종',    nameEn:'Page of Pentacles',   emoji:'📚', upright:'현실적 목표·꾸준한 학습, 성실한 첫 발자국',           reversed:'나태·신중함 부족, 계획 없는 시작 주의' },
  { suit:'pentacles', rank:12, name:'펜타클 기사',    nameEn:'Knight of Pentacles', emoji:'🐢', upright:'신중함·꾸준함, 느리지만 확실하게 목표 달성',          reversed:'지나친 신중·고집, 변화를 거부하는 경직성 주의' },
  { suit:'pentacles', rank:13, name:'펜타클 여왕',    nameEn:'Queen of Pentacles',  emoji:'🌿', upright:'현실적 풍요·따뜻한 보살핌, 물질과 정서의 균형',       reversed:'물질주의·불안, 지나친 안전 추구 주의' },
  { suit:'pentacles', rank:14, name:'펜타클 왕',      nameEn:'King of Pentacles',   emoji:'💰', upright:'재정적 성공·안정적 리더십, 현실을 지배하는 힘',        reversed:'부패·낭비, 돈에 의한 오만함 주의' },
];

/** 전체 78장 덱 조합 */
export function getFullDeck() {
  const minor = MINOR_ARCANA.map((c, i) => ({
    id: 22 + i,
    name: c.name,
    nameEn: c.nameEn,
    emoji: c.emoji,
    upright: c.upright,
    reversed: c.reversed,
    color: SUIT_INFO[c.suit].color,
    suit: c.suit,
    rank: c.rank,
  }));
  const major = TAROT_CARDS.map(c => ({ ...c, suit: undefined as undefined, rank: undefined as undefined }));
  return [...major, ...minor];
}

export type AnyTarotCard = ReturnType<typeof getFullDeck>[number];

/** 여러 장 뽑기 (중복 없음) */
export function drawCards(count: number, fullDeck = false): { card: AnyTarotCard; reversed: boolean }[] {
  const deck = fullDeck ? getFullDeck() : [...TAROT_CARDS].map(c => ({ ...c, suit: undefined as undefined, rank: undefined as undefined }));
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => ({
    card,
    reversed: Math.random() < 0.35,
  }));
}

/* ── MBTI 유형 ── */
export const MBTI_TYPES = [
  { id: 'ISTJ', name: 'ISTJ', nickname: '세상의 소금형', emoji: '🏛️', trait: '책임감·꼼꼼함' },
  { id: 'ISFJ', name: 'ISFJ', nickname: '임금 뒤편의 권력형', emoji: '🛡️', trait: '헌신·배려' },
  { id: 'INFJ', name: 'INFJ', nickname: '예언자형', emoji: '🔭', trait: '통찰력·공감' },
  { id: 'INTJ', name: 'INTJ', nickname: '과학자형', emoji: '🧠', trait: '전략적·독립적' },
  { id: 'ISTP', name: 'ISTP', nickname: '백과사전형', emoji: '🔧', trait: '분석적·실용적' },
  { id: 'ISFP', name: 'ISFP', nickname: '성인군자형', emoji: '🎨', trait: '온화·감성적' },
  { id: 'INFP', name: 'INFP', nickname: '잔다르크형', emoji: '🌿', trait: '이상적·창의적' },
  { id: 'INTP', name: 'INTP', nickname: '아이디어 뱅크형', emoji: '💡', trait: '논리적·탐구적' },
  { id: 'ESTP', name: 'ESTP', nickname: '수완가형', emoji: '⚡', trait: '행동력·현실적' },
  { id: 'ESFP', name: 'ESFP', nickname: '사교형', emoji: '🎉', trait: '활기·즉흥적' },
  { id: 'ENFP', name: 'ENFP', nickname: '스파크형', emoji: '✨', trait: '열정·창의성' },
  { id: 'ENTP', name: 'ENTP', nickname: '발명가형', emoji: '🚀', trait: '도전·혁신' },
  { id: 'ESTJ', name: 'ESTJ', nickname: '사업가형', emoji: '📊', trait: '리더십·조직력' },
  { id: 'ESFJ', name: 'ESFJ', nickname: '친선도모형', emoji: '🤝', trait: '조화·사교성' },
  { id: 'ENFJ', name: 'ENFJ', nickname: '언변능숙형', emoji: '🎤', trait: '영향력·공감' },
  { id: 'ENTJ', name: 'ENTJ', nickname: '지도자형', emoji: '🦅', trait: '결단력·목표지향' },
] as const;
export type MbtiId = typeof MBTI_TYPES[number]['id'];

/* ── 운세 텍스트 풀 ── */
export const FORTUNE_POOL = {
  overall: [
    '오늘은 당신의 에너지가 최고조에 달하는 날입니다. 오랫동안 미뤄왔던 일을 시작하기에 딱 좋은 타이밍이니 과감하게 첫발을 내딛어보세요.',
    '주변 사람들과의 관계에서 특별한 행운이 찾아옵니다. 연락이 닿지 않았던 사람에게 먼저 손을 내밀면 뜻밖의 좋은 소식을 들을 수 있습니다.',
    '차분히 현재 상황을 돌아보는 하루가 될 것입니다. 급하게 결정을 내리기보다 충분히 생각한 후 움직이면 실수를 크게 줄일 수 있습니다.',
    '새로운 기회의 문이 살짝 열려있는 날입니다. 평소라면 그냥 지나쳤을 작은 신호에 귀를 기울여보세요. 그 안에 당신이 찾던 답이 있을 수 있습니다.',
    '창의적인 아이디어가 샘솟는 날입니다. 떠오르는 생각을 바로 적어두세요. 오늘의 영감이 앞으로의 중요한 전환점이 될 수 있습니다.',
    '오늘은 작은 일에서 큰 만족을 얻을 수 있는 날입니다. 주변의 소소한 것들에 감사하는 마음을 가지면 하루가 더욱 풍요로워집니다.',
    '계획했던 일이 순조롭게 진행되는 날입니다. 꼼꼼히 준비해왔다면 오늘 그 성과가 나타날 것입니다. 자신감을 갖고 임하세요.',
    '예상치 못한 도움이나 정보를 얻게 되는 날입니다. 열린 마음으로 주변의 말을 들으면 문제 해결의 실마리를 찾을 수 있습니다.',
    '인내심이 필요한 날입니다. 원하는 결과가 바로 나타나지 않더라도 포기하지 말고 한 걸음씩 나아가다 보면 좋은 결실을 맺게 됩니다.',
    '오늘은 자신을 돌보는 시간을 갖는 것이 중요합니다. 바쁜 일상 속에서도 잠깐의 휴식이 앞으로의 에너지를 충전해줄 것입니다.',
    '소통이 모든 문제의 열쇠가 되는 날입니다. 오해가 생겼다면 직접 마주하고 솔직하게 이야기하세요. 명쾌한 해결책이 보일 것입니다.',
    '변화를 두려워하지 않는 용기가 필요한 날입니다. 익숙한 것에서 벗어나 새로운 방향을 모색하면 더 나은 결과가 기다리고 있습니다.',
    '오늘의 노력은 반드시 미래의 성과로 돌아옵니다. 눈앞의 어려움에 집중하기보다 목표를 향해 묵묵히 걸어가는 자세가 필요합니다.',
    '협력과 팀워크가 빛을 발하는 날입니다. 혼자 해결하려 하기보다 주변의 도움을 기꺼이 받아들이면 훨씬 더 좋은 결과를 얻을 수 있습니다.',
    '직관을 믿어야 하는 날입니다. 논리적으로 설명하기 어렵더라도 내면의 목소리가 이끄는 방향을 따라가 보세요.',
    '오늘은 계획보다 유연하게 상황에 대처하는 것이 중요합니다. 예상치 못한 변수가 오히려 더 나은 방향으로 이끌 수 있습니다.',
    '집중력이 높아지는 날입니다. 방해 요소를 최소화하고 중요한 작업에 몰입하면 평소보다 훨씬 높은 성과를 낼 수 있습니다.',
    '작은 친절이 큰 변화를 만드는 날입니다. 주변 사람들에게 따뜻한 한마디를 건네보세요. 그 선의가 결국 자신에게 돌아올 것입니다.',
    '오늘은 과거를 정리하고 미래를 준비하기 좋은 날입니다. 오래된 감정이나 관계를 정리하면 새로운 에너지가 유입될 것입니다.',
    '겸손함이 더 큰 성장을 이끄는 날입니다. 모든 것을 알려고 하기보다 배우는 자세로 임하면 뜻밖의 가르침을 얻게 됩니다.',
  ],

  love: [
    '연애 중이라면 파트너와의 솔직한 대화가 관계를 한 단계 발전시킵니다. 하지 못했던 말을 꺼내기에 좋은 날입니다.',
    '새로운 인연이 찾아올 조짐이 있습니다. 일상 속 낯선 만남을 열린 마음으로 맞이하세요.',
    '혼자만의 시간이 오히려 자신의 마음을 더 잘 이해하게 해줍니다. 스스로를 충분히 사랑하는 것이 먼저입니다.',
    '오해나 갈등이 있었다면 오늘이 화해의 적기입니다. 먼저 손 내밀면 상대도 마음을 열 것입니다.',
    '함께하는 시간보다 각자의 공간을 존중하는 것이 관계를 더 오래, 더 깊게 유지하게 합니다.',
    '오랫동안 마음에 두었던 사람에게 용기 내어 다가가기 좋은 날입니다. 진심은 반드시 통합니다.',
    '좋아하는 사람과 함께 새로운 경험을 공유하면 관계가 자연스럽게 깊어집니다.',
    '연인과의 사소한 다툼도 서로를 더 이해하는 과정입니다. 이기려 하기보다 이해하려 노력하세요.',
    '관계에서 너무 많은 것을 기대하면 실망도 큽니다. 있는 그대로를 사랑하는 연습이 필요한 때입니다.',
    '예전에 소홀히 했던 소중한 사람에게 연락을 취해보세요. 그리움은 나눌수록 감동이 됩니다.',
    '감정 표현을 아끼지 마세요. 솔직한 애정 표현 한마디가 상대의 하루를 밝게 만들 수 있습니다.',
    '인연은 서두른다고 빨리 오지 않습니다. 자신을 가꾸고 내실을 다지다 보면 자연스럽게 찾아옵니다.',
    '상대방의 입장에서 생각해보는 것이 지금 관계의 해법입니다. 공감이 사랑을 키웁니다.',
    '데이트 계획보다 상대가 원하는 것에 귀 기울이는 하루가 되세요. 작은 배려가 큰 감동이 됩니다.',
    '마음이 이끄는 대로 솔직하게 행동하는 것이 가장 매력적입니다. 꾸밈없는 모습이 진짜 인연을 부릅니다.',
  ],

  money: [
    '예상치 못한 곳에서 수익 기회가 나타날 수 있습니다. 단, 검증되지 않은 투자는 신중하게 접근하세요.',
    '지출을 한 번 더 점검해볼 필요가 있는 날입니다. 작은 새는 돈이 쌓이면 큰 금액이 됩니다.',
    '재정적인 결정을 내려야 한다면 오늘은 신중히, 내일은 과감히 움직이는 전략이 좋습니다.',
    '오래된 부채나 미결산 항목을 정리하기 좋은 날입니다. 깔끔한 마무리가 새 기회를 불러옵니다.',
    '수익보다 지출 관리에 집중하는 것이 재산을 늘리는 지름길입니다.',
    '투자보다 저축이 먼저인 날입니다. 안전한 기반을 쌓은 뒤 다음 단계를 고려하세요.',
    '협업이나 파트너십을 통한 수익 기회가 보입니다. 신뢰할 수 있는 사람과 힘을 합치면 시너지가 납니다.',
    '오늘 아낀 돈이 내일의 기회비용이 됩니다. 소소한 절약 습관을 다시 점검해보세요.',
    '욕심보다 필요에 집중하는 소비 습관이 장기적 재정 건강의 핵심입니다.',
    '계획에 없던 지출이 생길 수 있습니다. 비상금이 충분한지 미리 확인해두면 마음이 편합니다.',
    '금전적 스트레스가 있다면 전문가의 조언을 구해보세요. 혼자 안고 가는 것보다 훨씬 빠른 해결책을 찾을 수 있습니다.',
    '작은 사이드 수입이라도 꾸준히 쌓아가면 놀라운 결과를 만들어냅니다. 시작이 중요합니다.',
    '충동구매를 자제하고 정말 가치 있는 것에만 돈을 쓰는 하루가 되세요.',
    '돈을 버는 것 못지않게 올바르게 쓰는 법을 배우는 것이 진정한 부의 첫 걸음입니다.',
    '수입의 일부를 자기계발에 투자하는 것을 고려해보세요. 지식은 가장 확실한 자산입니다.',
  ],

  health: [
    '몸이 보내는 신호를 무시하지 마세요. 작은 이상 증세도 초기에 챙기면 큰 건강 문제를 예방할 수 있습니다.',
    '규칙적인 수면이 오늘의 핵심입니다. 취침 시간을 일정하게 유지하면 컨디션이 눈에 띄게 좋아집니다.',
    '스트레칭이나 가벼운 산책이 몸과 마음에 활력을 불어넣는 날입니다. 10분만 투자해보세요.',
    '수분 섭취가 부족하지 않은지 확인해보세요. 물 한 잔이 생각보다 큰 에너지 변화를 만듭니다.',
    '과로나 스트레스가 쌓여있다면 오늘은 충분한 휴식을 취하는 것이 최선입니다.',
    '규칙적인 식사 시간이 소화기 건강을 지킵니다. 끼니를 거르지 말고 제때 챙겨드세요.',
    '야외 활동이 기분을 환기시키기 좋은 날입니다. 햇빛을 쬐는 것만으로도 세로토닌이 분비됩니다.',
    '무리한 운동보다 꾸준한 저강도 운동이 장기적으로 더 건강한 몸을 만듭니다.',
    '정신 건강도 체크가 필요한 날입니다. 감정을 억누르지 말고 신뢰할 수 있는 사람과 나눠보세요.',
    '눈과 허리 건강에 특히 신경 써야 하는 날입니다. 장시간 화면 작업 후 적절히 쉬어주세요.',
    '따뜻한 물로 족욕을 하거나 반신욕을 해보세요. 피로 회복에 효과적입니다.',
    '건강한 식단을 선택하는 작은 실천이 몸에 큰 변화를 만들어냅니다. 채소와 과일을 챙겨드세요.',
    '스트레스 관리가 면역력의 기본입니다. 명상이나 깊은 호흡을 5분만 해보세요.',
    '잠들기 전 스마트폰 사용을 줄이면 수면의 질이 크게 개선됩니다.',
    '건강 검진 결과가 있다면 오늘 다시 살펴보는 것이 좋겠습니다. 놓친 관리 항목이 없는지 확인하세요.',
  ],

  work: [
    '업무 집중력이 높아지는 날입니다. 가장 중요한 과제를 오전에 배치하면 최고의 효율을 낼 수 있습니다.',
    '새로운 아이디어가 인정받는 날입니다. 평소 말하기 망설였던 의견을 자신 있게 제안해보세요.',
    '꼼꼼한 마무리가 중요한 날입니다. 급하게 끝내기보다 세부 사항을 한 번 더 확인하면 완성도가 높아집니다.',
    '협업이 성과를 배가시키는 날입니다. 혼자 끌어안기보다 팀과 함께 문제를 해결해보세요.',
    '상사나 동료의 피드백을 열린 마음으로 받아들이면 성장의 기회가 됩니다.',
    '업무 중 우선순위를 정하는 것이 생산성의 핵심입니다. 중요한 것과 급한 것을 구분해보세요.',
    '학습에 투자하기 좋은 날입니다. 새로운 기술이나 지식을 익히면 경쟁력이 높아집니다.',
    '어려운 과제일수록 작게 쪼개어 접근하면 해결책이 보입니다. 첫 단계만 실행해보세요.',
    '오늘은 네트워킹에 신경 써보세요. 예상치 못한 연결고리가 새로운 기회를 가져옵니다.',
    '멀티태스킹보다 한 가지에 집중하는 것이 오늘은 더 나은 결과를 만들어냅니다.',
    '준비가 충분히 되었다면 이제 실행할 차례입니다. 완벽함을 기다리기보다 시작하는 용기가 필요합니다.',
    '업무 환경을 정리하는 것만으로도 집중력이 높아집니다. 책상을 깔끔하게 정돈해보세요.',
    '창의적인 발상이 빛을 발하는 날입니다. 틀을 벗어난 사고가 문제의 돌파구를 열어줍니다.',
    '성과를 서두르지 마세요. 꾸준히 쌓아온 노력이 오늘내일 사이에 반드시 결실을 맺습니다.',
    '오늘 한 작은 약속도 반드시 지키세요. 신뢰는 사소한 것에서 시작됩니다.',
  ],
};

/* ── 행운 색·숫자 ── */
export const LUCKY_COLORS: [string, string][] = [
  ['빨강',   '#ef4444'],
  ['주황',   '#f97316'],
  ['노랑',   '#eab308'],
  ['초록',   '#22c55e'],
  ['파랑',   '#3b82f6'],
  ['남색',   '#6366f1'],
  ['보라',   '#a855f7'],
  ['분홍',   '#ec4899'],
  ['하얀',   '#f1f5f9'],
  ['금색',   '#f59e0b'],
  ['은색',   '#94a3b8'],
  ['민트',   '#14b8a6'],
];

export const LUCKY_DIRECTIONS = ['동쪽', '서쪽', '남쪽', '북쪽', '동남쪽', '서남쪽'];

/* ── 날짜 시드 기반 결정론적 랜덤 ── */
export function seededInt(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export function todaySeed(subjectId: string, domain: string): string {
  const today = new Date();
  const ymd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  return `${subjectId}-${domain}-${ymd}`;
}

export function pick<T>(arr: T[], seed: string): T {
  return arr[seededInt(seed) % arr.length];
}

export function pickIdx(arr: unknown[], seed: string): number {
  return seededInt(seed) % arr.length;
}

/** 1~5 별점 — seed에 따라 결정 */
export function starRating(subjectId: string, domain: string): number {
  const n = seededInt(todaySeed(subjectId, domain));
  // 1: 5%, 2: 15%, 3: 35%, 4: 30%, 5: 15%
  const r = n % 100;
  if (r < 5)  return 1;
  if (r < 20) return 2;
  if (r < 55) return 3;
  if (r < 85) return 4;
  return 5;
}

/** 오늘의 운세 조회 */
export function getTodayFortune(subjectId: string) {
  const overall  = pick(FORTUNE_POOL.overall,  todaySeed(subjectId, 'overall'));
  const love     = pick(FORTUNE_POOL.love,     todaySeed(subjectId, 'love'));
  const money    = pick(FORTUNE_POOL.money,    todaySeed(subjectId, 'money'));
  const health   = pick(FORTUNE_POOL.health,   todaySeed(subjectId, 'health'));
  const work     = pick(FORTUNE_POOL.work,     todaySeed(subjectId, 'work'));

  const [colorName, colorHex] = pick(LUCKY_COLORS, todaySeed(subjectId, 'color'));
  const luckyNumber    = (seededInt(todaySeed(subjectId, 'number')) % 30) + 1;
  const luckyDirection = pick(LUCKY_DIRECTIONS, todaySeed(subjectId, 'direction'));

  return {
    overall, love, money, health, work,
    luckyColor: colorName, luckyColorHex: colorHex,
    luckyNumber, luckyDirection,
    stars: {
      overall: starRating(subjectId, 'star-overall'),
      love:    starRating(subjectId, 'star-love'),
      money:   starRating(subjectId, 'star-money'),
      health:  starRating(subjectId, 'star-health'),
      work:    starRating(subjectId, 'star-work'),
    },
  };
}

/** 오늘의 타로 카드 뽑기 (완전 랜덤, 정방향/역방향) */
export function drawTarotCard(): { card: typeof TAROT_CARDS[number]; reversed: boolean } {
  const idx = Math.floor(Math.random() * TAROT_CARDS.length);
  const reversed = Math.random() < 0.4;
  return { card: TAROT_CARDS[idx], reversed };
}
