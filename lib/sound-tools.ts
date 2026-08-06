/**
 * 소리 도구(/sound) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 소리는 파일을 받아 오지 않고 WebAudio로 직접 만든다. 메트로놈
 * 딸깍 소리도, 백색소음도, 튜너의 기준음도 전부 계산으로 생성된다 — 그래서
 * 오프라인에서도 돌고, 정적 배포에 음원 수 MB를 얹지 않아도 된다.
 *
 * 마이크를 쓰는 도구(튜너·소음 측정·녹음)는 브라우저 안에서만 처리하며
 * 소리를 서버로 보내지 않는다.
 */
// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import { relatedFor } from './related-rotate.ts';

export interface SoundTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  gradient: string;
  og: [string, string];
  long: string;
  metaTitle: string;
  features: string[];
}

export const SOUND_TOOLS: SoundTool[] = [
  {
    slug: 'metronome',
    title: '메트로놈',
    desc: '박자를 정확히 짚어 주는 연습 도구',
    icon: '🎵',
    category: '연주·연습',
    gradient: 'from-indigo-500 to-violet-600',
    og: ['#6366f1', '#7c3aed'],
    metaTitle: '메트로놈 - 온라인 박자기 (BPM 조절)',
    long: 'BPM을 정하면 정확한 간격으로 박자를 내줍니다. 4분의 4박자처럼 박자표를 고르면 첫 박에 강세가 들어가 지금이 몇 박째인지 귀로 알 수 있습니다.',
    features: ['BPM 30~240 조절', '2·3·4·6박자 강세', '박자 시각 표시', '탭으로 BPM 맞추기'],
  },
  {
    slug: 'tuner',
    title: '악기 튜너',
    desc: '마이크로 소리를 듣고 음정을 알려줍니다',
    icon: '🎸',
    category: '연주·연습',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '악기 튜너 - 기타·우쿨렐레 온라인 조율',
    long: '악기 소리를 들려주면 어떤 음인지, 기준음보다 얼마나 높거나 낮은지 센트 단위로 알려줍니다. 기타·우쿨렐레·베이스의 개방현 기준음도 들어 볼 수 있습니다.',
    features: ['실시간 음정·주파수 표시', '기준음 대비 오차(센트)', '기타·우쿨렐레 개방현 기준음', '440Hz 기준 조정'],
  },
  {
    slug: 'pitch',
    title: '음정 듣기 훈련',
    desc: '들려주는 두 음의 관계 맞히기',
    icon: '👂',
    category: '연주·연습',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '음정 듣기 훈련 - 상대음감 연습',
    long: '두 음을 차례로 들려주고 그 사이 간격(장3도·완전5도 등)을 맞히는 연습입니다. 절대음감이 없어도 음 사이의 거리를 익히면 화음과 멜로디가 훨씬 잘 들립니다.',
    features: ['음정 간격 듣고 맞히기', '난이도별 음정 범위', '정답률과 연속 정답 기록', '다시 듣기·기준음 확인'],
  },
  {
    slug: 'bpm-tap',
    title: 'BPM 측정',
    desc: '박자에 맞춰 두드리면 템포를 알려줍니다',
    icon: '👏',
    category: '연주·연습',
    gradient: 'from-amber-500 to-rose-500',
    og: ['#f59e0b', '#f43f5e'],
    metaTitle: 'BPM 측정 - 탭으로 노래 템포 재기',
    long: '음악에 맞춰 아무 키나 두드리면 분당 박자 수(BPM)를 계산합니다. 여덟 번 정도 두드리면 값이 안정되고, 최근 박자만 반영하므로 도중에 템포가 바뀌어도 따라갑니다.',
    features: ['두드린 간격으로 BPM 계산', '최근 박자 위주로 평균', '박자 흔들림 표시', '측정한 BPM으로 메트로놈 열기'],
  },
  {
    slug: 'noise',
    title: '백색소음',
    desc: '집중·수면을 돕는 잡음 만들기',
    icon: '🌊',
    category: '집중·수면',
    gradient: 'from-sky-500 to-cyan-600',
    og: ['#0ea5e9', '#0891b2'],
    metaTitle: '백색소음 - 화이트·핑크·브라운 노이즈 재생',
    long: '화이트·핑크·브라운 세 가지 잡음을 만들어 재생합니다. 주변 소리를 덮어 집중이나 수면을 돕는데, 낮은 대역이 강한 브라운 노이즈가 파도 소리에 가깝고 귀에 덜 피곤합니다.',
    features: ['화이트·핑크·브라운 선택', '볼륨과 저역/고역 조절', '타이머 후 자동 정지', '파일 다운로드 없이 즉시 재생'],
  },
  {
    slug: 'binaural',
    title: '바이노럴 비트',
    desc: '좌우에 다른 주파수를 넣어 만드는 맥놀이',
    icon: '🧘',
    category: '집중·수면',
    gradient: 'from-teal-500 to-indigo-600',
    og: ['#14b8a6', '#4f46e5'],
    metaTitle: '바이노럴 비트 - 좌우 주파수 차이로 만드는 맥놀이',
    long: '왼쪽과 오른쪽 귀에 조금 다른 주파수를 들려주면 그 차이만큼의 느린 맥놀이가 느껴집니다. 반드시 이어폰이 필요하고, 효과에 대한 과학적 근거는 아직 분명하지 않습니다.',
    features: ['기준 주파수와 차이 조절', '델타·세타·알파·베타 프리셋', '좌우 채널 분리 재생', '이어폰 필수 안내'],
  },
  {
    slug: 'decibel',
    title: '소음 측정',
    desc: '주변이 얼마나 시끄러운지 재기',
    icon: '📢',
    category: '측정',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '소음 측정 - 마이크로 주변 소음 확인',
    long: '마이크로 들어오는 소리의 크기를 상대 데시벨로 보여줍니다. 도서관·대화·지하철 같은 기준과 견줘 지금이 어느 정도인지 가늠할 수 있습니다. 기기마다 마이크가 달라 절대값은 아닙니다.',
    features: ['실시간 소음 레벨 표시', '최고·평균값 기록', '생활 소음 기준과 비교', '기기 보정 안내'],
  },
  {
    slug: 'recorder',
    title: '음성 녹음기',
    desc: '녹음해서 듣고 파일로 저장',
    icon: '🎙️',
    category: '측정',
    gradient: 'from-fuchsia-500 to-violet-600',
    og: ['#d946ef', '#7c3aed'],
    metaTitle: '음성 녹음기 - 브라우저에서 바로 녹음·저장',
    long: '설치 없이 녹음해서 바로 들어 보고 파일로 내려받습니다. 녹음은 브라우저 안에서만 처리되며 서버로 전송되지 않으니, 회의 메모나 발음 연습에 안심하고 쓸 수 있습니다.',
    features: ['녹음·일시정지·재생', '녹음 중 파형 표시', '파일로 저장', '마이크 장치 선택'],
  },
  {
    slug: 'tone',
    title: '주파수 생성기',
    desc: '원하는 높이의 소리를 직접 만들기',
    icon: '〰️',
    category: '신호음',
    gradient: 'from-slate-600 to-sky-600',
    og: ['#475569', '#0284c7'],
    metaTitle: '주파수 생성기 - 원하는 Hz 사인파 재생',
    long: '20Hz부터 20kHz까지 원하는 주파수의 소리를 만듭니다. 사인파·사각파·톱니파를 고를 수 있어 스피커 점검이나 악기 기준음, 간단한 실험에 쓸 수 있습니다.',
    features: ['20Hz~20kHz 슬라이더', '사인·사각·삼각·톱니 파형', '좌우 채널 선택', '볼륨 안전 범위 안내'],
  },
  {
    slug: 'mosquito',
    title: '모기 소리',
    desc: '나이가 들면 안 들리는 고주파',
    icon: '🦟',
    category: '신호음',
    gradient: 'from-lime-500 to-emerald-600',
    og: ['#84cc16', '#059669'],
    metaTitle: '모기 소리 - 17kHz 고주파 들어보기',
    long: '17kHz 안팎의 고주파는 나이가 들수록 잘 들리지 않습니다. 청소년에게만 들린다고 해서 모기 소리로 불리는데, 여러 주파수를 들어 보며 어디까지 들리는지 확인할 수 있습니다.',
    features: ['15k~20kHz 단계별 재생', '나이대별 평균 안내', '볼륨 안전 제한', '이어폰 권장 안내'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedSoundTools(slug: string, limit = 4): SoundTool[] {
  const current = SOUND_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  // 갈래 안의 자리부터 돌려 고른다 — 앞 여섯만 뽑으면 목록 뒤쪽은 들어오는 링크가 0이 된다
  return relatedFor(SOUND_TOOLS, current, t => t.category === current.category, limit);
}

export function findSoundTool(slug: string): SoundTool | undefined {
  return SOUND_TOOLS.find(t => t.slug === slug);
}
