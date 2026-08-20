import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SECTION_COUNTS } from '@/lib/search-index';
import { LENSES } from '@/lib/lens/list';
import { ALGS } from '@/lib/cube/list';
import { ROLLS } from '@/lib/dice/list';
import { CARDS } from '@/lib/tarot/deck';
import { PATTERNS } from '@/lib/regex/list';
import { NUMBERS } from '@/lib/number/list';
import { CODES } from '@/lib/ascii/list';
import { PORTS } from '@/lib/port/list';
import { MODES as CHMOD_MODES } from '@/lib/chmod/list';
import { FRACTIONS } from '@/lib/fraction/list';
import { KEYS } from '@/lib/keycode/list';
import { PREFIXES } from '@/lib/cidr/list';
import { CHARS as CODE_CHARS, CELLS as CODE_CELLS } from '@/lib/code/list';
import { PRODUCTS as TIMES_PRODUCTS } from '@/lib/times/list';
import { PERCENT_COUNT } from '@/lib/percent/list';
import { NUMBERS as SQRT_NUMBERS } from '@/lib/sqrt/list';
import { YEARS as ROMAN_YEARS } from '@/lib/roman/list';
import { YEARS as CAL_YEARS } from '@/lib/year/list';
import { PIXELS } from '@/lib/rem/list';
import { CELLS as PW_CELLS } from '@/lib/password/list';
import { OPENINGS } from '@/lib/chess/list';
import { HANDS } from '@/lib/poker/list';
import PageGlow from '@/components/PageGlow';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard, thumbUrl } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'vixutil — 실용 도구 모음',
  description: '계산기·운세·생성기·심리테스트·퀴즈 등 일상에 필요한 실용 유틸 모음 — vixutil.com',
  alternates: {
    canonical: '/',
    // 여덟 언어 전부를 적는다. 한쪽만 가리키는 짝은 구글이 무시한다
    languages: alternateLanguages10('/'),
  },
});

const SECTIONS = [
  {
    href: '/calculator',
    icon: '📊',
    title: '계산기',
    desc: '세금·금융·건강·부동산 등 실생활 계산기',
    badge: `${SECTION_COUNTS.calculator}개`,
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/test',
    icon: '🧭',
    title: '심리 테스트',
    desc: 'MBTI·연애·직장·성향 등 심리 테스트',
    badge: `${SECTION_COUNTS.test}개`,
    color: 'from-violet-500 to-pink-600',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/quiz',
    icon: '🏆',
    title: '지식 퀴즈',
    desc: '한국사·IT·상식·K-POP 등 퀴즈',
    badge: `${SECTION_COUNTS.quiz}개`,
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/year',
    icon: '📅',
    title: '연도 사전',
    desc: '2100년은 윤년이 아닙니다 — 요일·주 수·간지까지 한 해씩',
    badge: `${CAL_YEARS.length}해`,
    color: 'from-rose-700 to-orange-500',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/generator',
    icon: '⚙️',
    title: '생성기',
    desc: '닉네임·명언·추천·비밀번호 등 생성',
    badge: `${SECTION_COUNTS.generator}개`,
    color: 'from-emerald-400 to-teal-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/checklist',
    icon: '✅',
    title: '체크리스트',
    desc: '이사·취업·여행·건강·디지털 등 상황별 체크리스트',
    badge: `${SECTION_COUNTS.checklist}개`,
    color: 'from-sky-400 to-cyan-600',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/fortune',
    icon: '🔮',
    title: '오늘의 운세',
    desc: '별자리·띠·타로·사주·궁합 등 매일 업데이트',
    badge: '19종',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/random',
    icon: '🎲',
    title: '랜덤 뽑기',
    desc: '룰렛·사다리타기·팀 나누기·숫자 뽑기 등 결정 도우미',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/snap',
    icon: '📸',
    title: '스냅테스트',
    desc: '사진 한 장으로 즐기는 관상·퍼스널컬러 등 참여형 테스트',
    badge: '10종',
    color: 'from-fuchsia-500 to-sky-500',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-900/50',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/device',
    icon: '🧰',
    title: '기기 점검',
    desc: '키보드·마우스·마이크·웹캠·모니터를 브라우저에서 바로 테스트',
    badge: `${SECTION_COUNTS.device}개`,
    color: 'from-sky-500 to-teal-600',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/rem',
    icon: '📏',
    title: 'CSS 단위표',
    desc: '16px은 1rem이자 12pt — px를 rem·pt·인치로 한 줄에',
    badge: `${PIXELS.length}가지`,
    color: 'from-violet-700 to-fuchsia-500',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/percent',
    icon: '％',
    title: '퍼센트 계산',
    desc: '200의 15%는 30, 15% 깎으면 170 — 값·할인·세금·비율을 한 장에',
    badge: `${PERCENT_COUNT.toLocaleString()}칸`,
    color: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/sqrt',
    icon: '📐',
    title: '제곱근표',
    desc: '√50은 7.07이면서 5√2 — 반올림한 소수와 정확한 근호 꼴을 함께',
    badge: `${SQRT_NUMBERS.length}개`,
    color: 'from-indigo-600 to-violet-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/roman',
    icon: '🏛️',
    title: '로마 숫자 연도표',
    desc: '1994년은 MCMXCIV — 글자를 조각내어 왜 그렇게 적히는지까지',
    badge: `${ROMAN_YEARS.length}해`,
    color: 'from-amber-700 to-yellow-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-800 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/image',
    icon: '🖼️',
    title: '이미지 도구',
    desc: '사진 용량 줄이기·크기 조절·자르기·모자이크를 올리지 않고',
    badge: `${SECTION_COUNTS.image}개`,
    color: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/text',
    icon: '✍️',
    title: '텍스트 도구',
    desc: '한영타 변환·영문 이름·특수문자·글자수를 한 곳에서',
    badge: `${SECTION_COUNTS.text}개`,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/game',
    icon: '🕹️',
    title: '두뇌 게임',
    desc: '반응속도·클릭속도·기억력·타자를 1분 만에 측정',
    badge: `${SECTION_COUNTS.game}개`,
    color: 'from-emerald-500 to-indigo-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/color',
    icon: '🎨',
    title: '색상 도구',
    desc: '팔레트·명도 대비·그라디언트·색맹 시뮬레이션',
    badge: `${SECTION_COUNTS.color}개`,
    color: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-900/50',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/time',
    icon: '⏰',
    title: '시간 도구',
    desc: '타이머·스톱워치·뽀모도로·세계시계·근무일 계산',
    badge: `${SECTION_COUNTS.time}개`,
    color: 'from-sky-500 to-rose-500',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/sound',
    icon: '🔊',
    title: '소리 도구',
    desc: '메트로놈·악기 튜너·백색소음·소음 측정·녹음',
    badge: `${SECTION_COUNTS.sound}개`,
    color: 'from-indigo-500 to-sky-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/food',
    icon: '🍳',
    title: '계량·요리',
    desc: '컵→그램 계량, 레시피 배율, 오븐 온도, 식품 보관',
    badge: `${SECTION_COUNTS.food}개`,
    color: 'from-amber-500 to-red-600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/convert',
    icon: '🔄',
    title: '단위 변환',
    desc: '평·근·돈부터 인치·파운드까지 50가지 단위 변환',
    badge: `${SECTION_COUNTS.convert}개`,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/rate',
    icon: '📐',
    title: '비율 계산',
    desc: '할인율·부가세·이자·농도까지 공식 하나로 끝나는 계산 50가지',
    badge: `${SECTION_COUNTS.rate}개`,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/body',
    icon: '🩺',
    title: '몸 수치',
    desc: 'BMI·기초대사량·심박수·혈압 지표까지 몸으로 재는 수치 50가지',
    badge: `${SECTION_COUNTS.body}개`,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
  },
  // 잘못 지웠던 것을 되살림 — craft는 공식 계산기 40종이다
  {
    href: '/craft',
    icon: '🧶',
    title: '공예',
    desc: '실 소요량·원단 길이·왁스 무게·가성소다까지',
    badge: `${SECTION_COUNTS.craft}개`,
    color: 'from-amber-500 to-rose-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/geometry',
    icon: '📐',
    title: '도형·수학',
    desc: '면적·부피·삼각비부터 타일 수·페인트 양까지 50가지',
    badge: `${SECTION_COUNTS.geometry}개`,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/shortcut',
    icon: '⌨️',
    title: '키보드 단축키',
    desc: '엑셀·VS Code·크롬·피그마의 조합을 윈도우와 맥 나란히',
    badge: `${SECTION_COUNTS.shortcut}개`,
    color: 'from-slate-900 to-sky-500',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/emoji',
    icon: '😀',
    title: '이모지 뜻',
    desc: '💀·🙏·😤를 사람들이 실제로 어떤 뜻으로 보내는지',
    badge: `${SECTION_COUNTS.emoji}개`,
    color: 'from-amber-700 to-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/cmd',
    icon: '⌨️',
    title: '터미널 명령어',
    desc: 'ls·grep·tar·chmod부터 git reset까지 옵션과 예시',
    badge: `${SECTION_COUNTS.cmd}개`,
    color: 'from-slate-700 to-indigo-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/http',
    icon: '🗄️',
    title: 'HTTP 코드 사전',
    desc: '404·500이 무슨 뜻인지, 헤더가 무엇을 하는지 132가지',
    badge: `${SECTION_COUNTS.http}개`,
    color: 'from-teal-600 to-emerald-500',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/ext',
    icon: '📄',
    title: '파일 확장자',
    desc: '이 파일 뭘로 열지 — 확장자 140가지의 여는 프로그램과 MIME 타입',
    badge: `${SECTION_COUNTS.ext}개`,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/game/poker',
    icon: '🃏',
    title: '홀덤 시작 핸드',
    desc: '시작 핸드 169가지 — 조합과 확률, 플롭에서 무엇이 나오는지까지',
    badge: `${HANDS.length}종`,
    color: 'from-emerald-600 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/game/chess',
    icon: '♟️',
    title: '체스 오프닝',
    desc: '오프닝 174가지 — 수순과 판 그림, 자리(FEN)까지',
    badge: `${OPENINGS.length}종`,
    color: 'from-violet-600 to-indigo-500',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/times',
    icon: '🔢',
    title: '곱셈표',
    desc: '구구단부터 20단까지 — 7×8과 8×7이 한 자리에, 나누기까지',
    badge: `${TIMES_PRODUCTS.length}칸`,
    color: 'from-teal-600 to-emerald-500',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/code',
    icon: '📶',
    title: '모스 부호표',
    desc: '모스·NATO 음성 문자·점자 — 글자 쉰둘과 점자 셀 예순넷',
    badge: `${CODE_CHARS.length + CODE_CELLS.length}가지`,
    color: 'from-violet-600 to-purple-500',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/cidr',
    icon: '🌐',
    title: 'CIDR 서브넷 표',
    desc: '/24는 몇 개인가 — 마스크·와일드카드·쓸 수 있는 호스트 수까지',
    badge: `${PREFIXES.length}개`,
    color: 'from-cyan-600 to-blue-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-900/50',
    shadow: 'shadow-cyan-100',
  },
  {
    href: '/keycode',
    icon: '🔑',
    title: '키 코드 사전',
    desc: 'code·key·keyCode — 자판이 바뀌어도 같은 자리를 잡는 값은 무엇인지',
    badge: `${KEYS.length}개`,
    color: 'from-slate-600 to-zinc-500',
    bgLight: 'bg-slate-50 dark:bg-slate-800/40',
    textAccent: 'text-slate-700 dark:text-slate-300',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
  {
    href: '/fraction',
    icon: '➗',
    title: '분수를 소수로',
    desc: '0.375는 8분의 3 — 순환마디까지 정확한 소수와 퍼센트',
    badge: `${FRACTIONS.length}가지`,
    color: 'from-lime-600 to-emerald-500',
    bgLight: 'bg-lime-50 dark:bg-lime-950/30',
    textAccent: 'text-lime-700 dark:text-lime-300',
    borderAccent: 'border-lime-200 dark:border-lime-900/50',
    shadow: 'shadow-lime-100',
  },
  {
    href: '/chmod',
    icon: '🔒',
    title: 'chmod 권한표',
    desc: '755·644가 정확히 무엇을 여는지 — rwx와 ls -l, umask까지',
    badge: `${CHMOD_MODES.length}가지`,
    color: 'from-orange-600 to-amber-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    textAccent: 'text-orange-700 dark:text-orange-300',
    borderAccent: 'border-orange-200 dark:border-orange-900/50',
    shadow: 'shadow-orange-100',
  },
  {
    href: '/port',
    icon: '🔌',
    title: '포트 번호 사전',
    desc: '22·80·443·3306 — 어느 서비스가 몇 번을 쓰고 권한이 필요한지까지',
    badge: `${PORTS.length}개`,
    color: 'from-fuchsia-600 to-purple-500',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-900/50',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/ascii',
    icon: '⌨️',
    title: 'ASCII 코드표',
    desc: '128자 — 십진수·16진수·2진수부터 HTML 엔티티와 Ctrl 조합까지',
    badge: `${CODES.length}자`,
    color: 'from-teal-600 to-emerald-500',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/number',
    icon: '🔢',
    title: '수 사전',
    desc: '1부터 200까지 — 소인수분해와 약수, 진법과 로마 숫자, 콜라츠까지',
    badge: `${NUMBERS.length}개`,
    color: 'from-indigo-600 to-violet-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/text/regex',
    icon: '🔤',
    title: '정규식 모음',
    desc: '이메일·날짜·IP 검사부터 표기법까지 — 맞는 보기와 맞지 않는 보기를 함께',
    badge: `${PATTERNS.length}가지`,
    color: 'from-sky-500 to-indigo-500',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/random/dice',
    icon: '🎲',
    title: '주사위 확률',
    desc: '한 개부터 여섯 개까지, 합마다의 경우의 수와 확률을 계산했습니다',
    badge: `${ROLLS.length}가지`,
    color: 'from-rose-600 to-orange-500',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
  },
  {
    /*
     * 타로 카드 뜻 — 아홉 언어 홈에는 있는데 **한국어 홈에만 빠져 있었다**
     * (2026-08-13에 반대 방향으로 세어 보고 찾았다). lib/locale-home.ts:171에
     * 아홉 언어 카드가 있고 낱장이 79장인데, 한국어에서는 /fortune 부모 허브를
     * 거쳐야만 닿았다. tests/home-covers-sections.test.ts가 「한국어 홈 ⊆ 아홉 언어
     * 홈」만 보고 그 반대를 안 봐서 통과했다 — 그 검사도 함께 세웠다.
     */
    href: '/fortune/card',
    icon: '🃏',
    title: '타로 카드 뜻',
    desc: '78장 전부의 정방향·역방향 의미 — 메이저와 마이너 아르카나',
    badge: `${CARDS.length}장`,
    color: 'from-violet-500 to-fuchsia-500',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/game/cube',
    icon: '🧩',
    title: '큐브 공식',
    desc: 'F2L·OLL·PLL 119가지 — 경우 그림은 공식을 실제로 돌려서 그렸습니다',
    badge: `${ALGS.length}가지`,
    color: 'from-amber-500 to-rose-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/snap/lens',
    icon: '📷',
    title: '렌즈 화각',
    desc: '초점거리와 센서로 보는 화각 104가지 — 35mm 환산과 2m 앞 가로 폭까지',
    badge: `${LENSES.length}가지`,
    color: 'from-indigo-600 to-violet-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/hanja',
    icon: '📖',
    title: '사자성어',
    desc: '뜻과 유래, 글자별 새김과 쓰는 예까지 사자성어 100개',
    badge: `${SECTION_COUNTS.hanja}개`,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/crypto',
    icon: '🪙',
    title: 'Crypto Trading Tools',
    desc: '바이낸스 전체 코인 멀티전략 타점(진입·TP·SL)·수익률 실시간',
    color: 'from-amber-400 to-orange-600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/password',
    icon: '🔑',
    title: '비밀번호 세기표',
    desc: '길이보다 저장 방식이 답을 더 바꿉니다 — RTX 4090 실측 속도',
    badge: `${PW_CELLS.length}칸`,
    color: 'from-slate-700 to-slate-500',
    bgLight: 'bg-slate-50 dark:bg-slate-800/60',
    textAccent: 'text-slate-700 dark:text-slate-200',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
];

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-14">
        {/* Brand */}
        <div className="mb-6 sm:mb-8 text-center">
          {/*
            홈에 h1이 없었다. 브랜드가 span 두 개로만 그려져 있어서, 사이트에서
            권위가 가장 높은 페이지가 주제를 알리는 제목 없이 색인되고 있었다.
            보이는 모습은 그대로 두고 태그만 h1으로 바꾼다. 다만 "vixutil"만으로는
            무슨 사이트인지 설명이 안 되므로 설명을 sr-only로 h1 안에 넣는다.
          */}
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-bold text-blue-600 tracking-tighter">util</span>
            <span className="sr-only"> — 계산기·심리테스트·퀴즈·생성기·체크리스트·운세 모음</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">일상에 필요한 실용 도구 모음</p>
        </div>

        {/*
          통합 검색 진입점. 지금까지 검색은 섹션별 허브에만 있어서, 어느 섹션에
          있는지 모르면 찾을 수 없었다. 인덱스 자체는 /search에만 싣는다 —
          랜딩 페이지에 600여 개 항목을 직렬화하면 무거워진다.
        */}
        {/*
          prefetch를 끈다 (2026-08-20). 바로 위 주석대로 «인덱스는 /search에만
          싣는다»고 해 놓고, 이 링크의 기본 프리페치가 그 인덱스를 홈으로 도로
          끌고 오고 있었다. 홈에서 /search?_rsc= 294KB를 받고 2.3MB짜리 검색
          청크까지 물려 왔다 — 검색을 안 하는 사람도 전부.
        */}
        <Link
          prefetch={false}
          href="/search"
          /*
            검색은 카드가 아니라 «치는 자리»다. 떠 있는 흰 판으로 두면 아래
            격자와 같은 재료라 무엇을 하는 것인지 생김새가 말해 주지 않는다.
            들어간 재료(.fld)로 바꾼다 — globals.css의 «재료를 둘로 가른다».
          */
          className="fld group flex items-center gap-3 mb-8 rounded-xl px-4 py-3.5 transition-all"
        >
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-sec transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-base text-slate-500 dark:text-slate-400 group-hover:text-slate-500 transition-colors">
            실업급여, 전세, MBTI, 로또…
          </span>
          <span className="ml-auto text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-sec transition-colors shrink-0">
            전체 검색
          </span>
        </Link>

        {/*
          Section grid — 칸의 그림이 곧 공유 카드다(globals.css의 .home-card 머리말).
          주소는 thumbUrl이 만들고, 그 안은 cardUrl과 한 글자만 다르다.

          그림에 alt를 안 준다. 바로 아래 h2가 같은 말을 하고 있어서, alt를 채우면
          스크린리더가 섹션 이름을 두 번 읽는다 — 장식이 아니라 **중복**이다.

          loading="lazy"라 첫 화면에 든 서너 장만 받는다. 폭·높이를 박아 두어
          그림이 늦게 와도 격자가 안 밀린다.
        */}
        {/*
          광고는 격자 앞이다. 저작권 줄 위에 두었더니 스크롤 깊이 97%(17화면)로
          아무도 못 보는 자리였다. 홈은 누르는 버튼이 없는 목록이라 «결과 직후»가
          없으므로, 무엇이 있는 사이트인지 알린 다음·목록 앞에 둔다.
        */}
        <Ad className="mb-8" />

        <div className="home-grid">
          {SECTIONS.map((s) => {
            const thumb = thumbUrl(s.href);
            return (
              <Link key={s.href} href={s.href} className="group home-card">
                {thumb ? (
                  /*
                    next/image를 쓴다. 그림은 공유 카드 **그대로**이고 바이트만 준다 —
                    Satori는 PNG밖에 못 내는데, 어두운 그라디언트 PNG는 절반 크기로
                    그려도 한 장 48KB다. 첫 화면에서 실제로 받는 양을 재 보니

                      <img> 그대로   모바일 26장 1,228KB · PC 35장 1,789KB
                      next/image     모바일 26장    73KB · PC 35장   148KB

                    이다(같은 그림, WebP·AVIF로 폭에 맞춰 다시 인코딩). loading="lazy"는
                    거의 안 먹었다 — 크롬이 화면 아래 것도 미리 받는다.

                    변환 횟수는 갈래 마흔 × 열 언어 = 원본 400장이라 한도 안이다.
                    원본이 늘지 않는 자리라서 쓴다.
                  */
                  <Image src={thumb} alt="" width={600} height={315} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw" className="home-thumb" />
                ) : (
                  <span className="home-thumb flex items-center justify-center">
                    <ToolIcon emoji={s.icon} className="w-7 h-7 text-slate-500 dark:text-slate-400" />
                  </span>
                )}
                <div className="home-card-body">
                  <div className="flex items-baseline justify-between gap-1.5">
                    <h2 className="home-card-title">{s.title}</h2>
                    {s.badge && (
                      <span className="shrink-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="home-card-desc">{s.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats bar — 숫자는 데이터에서 뽑는다. 손으로 적으면 콘텐츠가 늘 때마다 낡는다 */}
        <div className="mt-10 flex items-center justify-center gap-5 text-center flex-wrap">
          {[
            { label: '계산기', val: String(SECTION_COUNTS.calculator) },
            { label: '테스트', val: String(SECTION_COUNTS.test) },
            { label: '퀴즈', val: String(SECTION_COUNTS.quiz) },
            { label: '생성기', val: String(SECTION_COUNTS.generator) },
            { label: '체크리스트', val: String(SECTION_COUNTS.checklist) },
            { label: '운세', val: '6종' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.val}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center pb-8 pt-8">
        <p className="text-xs text-slate-500 dark:text-slate-400">vixutil.com — 2026</p>
      </footer>
    </div>
  );
}
