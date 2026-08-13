import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SECTION_COUNTS } from '@/lib/search-index';
import { LENSES } from '@/lib/lens/list';
import { ALGS } from '@/lib/cube/list';
import { ROLLS } from '@/lib/dice/list';
import { CARDS } from '@/lib/tarot/deck';
import { PATTERNS } from '@/lib/regex/list';
import { ELEMENTS } from '@/lib/element/list';
import { NUMBERS } from '@/lib/number/list';
import { CODES } from '@/lib/ascii/list';
import { PORTS } from '@/lib/port/list';
import { MODES as CHMOD_MODES } from '@/lib/chmod/list';
import { VALUES as RESISTOR_VALUES } from '@/lib/resistor/list';
import { FRACTIONS } from '@/lib/fraction/list';
import { KEYS } from '@/lib/keycode/list';
import { PREFIXES } from '@/lib/cidr/list';
import { CHARS as CODE_CHARS, CELLS as CODE_CELLS } from '@/lib/code/list';
import { SCORES as DARTS_SCORES } from '@/lib/darts/list';
import { PRODUCTS as TIMES_PRODUCTS } from '@/lib/times/list';
import { NUMBERS as SQRT_NUMBERS } from '@/lib/sqrt/list';
import { YEARS as ROMAN_YEARS } from '@/lib/roman/list';
import { TIRES } from '@/lib/tire/list';
import { SCREWS } from '@/lib/screw/list';
import { YEARS as CAL_YEARS } from '@/lib/year/list';
import { PACES } from '@/lib/pace/list';
import { PIXELS } from '@/lib/rem/list';
import { SPEEDS } from '@/lib/stop/list';
import { ALTITUDES } from '@/lib/altitude/list';
import { CHANNELS } from '@/lib/wifi/list';
import { SPOTS } from '@/lib/fret/list';
import { WEIGHTS } from '@/lib/gravity/list';
import { MUSIC_ITEMS } from '@/lib/music/catalog';
import { CELLS as WC_CELLS } from '@/lib/windchill/list';
import { CELLS as DEW_CELLS } from '@/lib/dew/list';
import { BITS } from '@/lib/drill/list';
import { CELLS as BW_CELLS } from '@/lib/bandwidth/list';
import { CELLS as BATT_CELLS } from '@/lib/battery/list';
import { CELLS as WIRE_CELLS } from '@/lib/wire/list';
import { CELLS as PAPER_CELLS } from '@/lib/paper/list';
import { CELLS as TORQUE_CELLS } from '@/lib/torque/list';
import { CELLS as LUMEN_CELLS } from '@/lib/lumen/list';
import { CELLS as AMP_CELLS } from '@/lib/ampere/list';
import { CELLS as BPM_CELLS } from '@/lib/bpm/list';
import { CELLS as GEAR_CELLS } from '@/lib/gear/list';
import { CELLS as FILAMENT_CELLS } from '@/lib/filament/list';
import { CELLS as RING_CELLS } from '@/lib/ring/list';
import { CELLS as REBAR_CELLS } from '@/lib/rebar/list';
import { CELLS as MOTOR_CELLS } from '@/lib/motor/list';
import { CELLS as STEEL_CELLS } from '@/lib/steel/list';
import { CELLS as HARDNESS_CELLS } from '@/lib/hardness/list';
import { CELLS as SUN_CELLS } from '@/lib/sun/list';
import { CELLS as DPI_CELLS } from '@/lib/dpi/list';
import { CELLS as LAUNDRY_CELLS } from '@/lib/laundry/list';
import { CELLS as FERTILIZER_CELLS } from '@/lib/fertilizer/list';
import { CELLS as DOF_CELLS } from '@/lib/dof/list';
import { CELLS as UV_CELLS } from '@/lib/uv/list';
import { CELLS as HIKE_CELLS } from '@/lib/hike/list';
import { CELLS as INSUL_CELLS } from '@/lib/insul/list';
import { CELLS as AIR_CELLS } from '@/lib/air/list';
import { CELLS as SIZE_CELLS } from '@/lib/size/list';
import { CELLS as BRA_CELLS } from '@/lib/bra/list';
import { CELLS as PET_CELLS } from '@/lib/petfood/list';
import { CELLS as PW_CELLS } from '@/lib/password/list';
import { CELLS as VIEW_CELLS } from '@/lib/viewing/list';
import { CELLS as BIG_CELLS } from '@/lib/bignum/list';
import { CELLS as GENGO_CELLS } from '@/lib/gengo/list';
import { CELLS as CABLE_CELLS } from '@/lib/cable/list';
import { CELLS as TATAMI_CELLS } from '@/lib/tatami/list';
import { CELLS as LUMBER_CELLS } from '@/lib/lumber/list';
import { CELLS as PB_CELLS } from '@/lib/powerbank/list';
import { CELLS as GOLF_CELLS } from '@/lib/golf/list';
import { CELLS as MW_CELLS } from '@/lib/microwave/list';
import { MAGNITUDES as QUAKE_MAGS } from '@/lib/quake/list';
import { CELLS as BED_CELLS } from '@/lib/bed/list';
import { CELLS as WINE_CELLS } from '@/lib/wine/list';
import { CELLS as BLOOD_CELLS } from '@/lib/blood/list';
import { CELLS as EXPOSURE_CELLS } from '@/lib/exposure/list';
import { CELLS as HEREDITY_CELLS } from '@/lib/heredity/list';
import { CELLS as RAID_CELLS } from '@/lib/raid/list';
import { CELLS as FLIGHT_CELLS } from '@/lib/flight/list';
import { CELLS as PURIFIER_CELLS } from '@/lib/purifier/list';
import { CELLS as DRINK_CELLS } from '@/lib/drink/list';
import { OPENINGS } from '@/lib/chess/list';
import { HANDS } from '@/lib/poker/list';
import PageGlow from '@/components/PageGlow';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

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
    href: '/fret',
    icon: '🎸',
    title: '기타 지판표',
    desc: '12프렛이 줄의 한가운데인 이유 — 자리마다 음·주파수·프렛 거리',
    badge: `${SPOTS.length}자리`,
    color: 'from-yellow-700 to-amber-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-800 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/dof',
    icon: '📷',
    title: '피사계 심도표',
    desc: '50mm f/8은 5.2m부터 무한대까지 — 초점거리와 조리개로 읽는 과초점거리',
    badge: `${DOF_CELLS.length}칸`,
    color: 'from-indigo-500 to-violet-400',
    bgLight: 'bg-indigo-50 dark:bg-indigo-900/40',
    textAccent: 'text-indigo-700 dark:text-indigo-200',
    borderAccent: 'border-indigo-200 dark:border-indigo-800',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/bpm',
    icon: '🎚️',
    title: '딜레이 타임표',
    desc: '120BPM 점8분음표는 375ms — 딜레이·리버브·LFO를 박에 맞추는 표',
    badge: `${BPM_CELLS.length}칸`,
    color: 'from-rose-500 to-pink-400',
    bgLight: 'bg-rose-50 dark:bg-rose-900/40',
    textAccent: 'text-rose-700 dark:text-rose-200',
    borderAccent: 'border-rose-200 dark:border-rose-800',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/gear',
    icon: '🚲',
    title: '자전거 기어비표',
    desc: '53×19와 39×14는 같은 기어 — 앞뒤 잇수로 읽는 발전거리',
    badge: `${GEAR_CELLS.length}칸`,
    color: 'from-emerald-500 to-teal-400',
    bgLight: 'bg-emerald-50 dark:bg-emerald-900/40',
    textAccent: 'text-emerald-700 dark:text-emerald-200',
    borderAccent: 'border-emerald-200 dark:border-emerald-800',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/ring',
    icon: '💍',
    title: '반지 사이즈 대조표',
    desc: '내주 52mm면 미국 6, 일본 12호 — 표 없이 산식으로 나오는 나라별 표기',
    badge: `${RING_CELLS.length}칸`,
    color: 'from-rose-500 to-pink-400',
    bgLight: 'bg-rose-50 dark:bg-rose-900/40',
    textAccent: 'text-rose-700 dark:text-rose-200',
    borderAccent: 'border-rose-200 dark:border-rose-800',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/laundry',
    icon: '🧺',
    title: '세탁 기호 뜻',
    desc: '점은 온도, 밑줄은 세기, ×는 금지 — 옷 라벨 그림 86가지',
    badge: `${LAUNDRY_CELLS.length}가지`,
    color: 'from-sky-600 to-cyan-400',
    bgLight: 'bg-sky-50 dark:bg-sky-900/40',
    textAccent: 'text-sky-700 dark:text-sky-200',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/dpi',
    icon: '🖱️',
    title: '마우스 감도와 DPI',
    desc: '소스 계열 eDPI 800은 51.95cm/360° — 게임 사이 감도를 옮기는 곱수와 DPI별 감도표',
    badge: `${DPI_CELLS.length}칸`,
    color: 'from-violet-500 to-fuchsia-400',
    bgLight: 'bg-violet-50 dark:bg-violet-900/40',
    textAccent: 'text-violet-700 dark:text-violet-200',
    borderAccent: 'border-violet-200 dark:border-violet-800',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/sun',
    icon: '🌅',
    title: '태양 고도와 낮 길이',
    desc: '북위 40° 하지의 낮은 14시간 51분 — 위도와 날짜로 읽는 정오 고도와 그림자',
    badge: `${SUN_CELLS.length}칸`,
    color: 'from-sky-500 to-amber-300',
    bgLight: 'bg-sky-50 dark:bg-sky-900/40',
    textAccent: 'text-sky-700 dark:text-sky-200',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/hardness',
    icon: '🚰',
    title: '물 경도 단위 환산',
    desc: '150ppm은 독일 8.4°dH, 미국 8.8gpg — 같은 물을 나라마다 다른 숫자로 적는다',
    badge: `${HARDNESS_CELLS.length}칸`,
    color: 'from-sky-700 to-cyan-400',
    bgLight: 'bg-sky-50 dark:bg-sky-900/40',
    textAccent: 'text-sky-700 dark:text-sky-200',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/steel',
    icon: '🔲',
    title: '강재 단위중량표',
    desc: '두께 6mm 강판 1m²는 47.1kg — 형상별 단면적 식과 강의 밀도로 읽는 물량',
    badge: `${STEEL_CELLS.length}칸`,
    color: 'from-slate-600 to-sky-400',
    bgLight: 'bg-sky-50 dark:bg-sky-900/40',
    textAccent: 'text-sky-700 dark:text-sky-200',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/motor',
    icon: '🔃',
    title: '모터 토크 계산표',
    desc: '2.2kW 1800rpm은 11.7N·m — 9550 계수와 50Hz·60Hz의 차이',
    badge: `${MOTOR_CELLS.length}칸`,
    color: 'from-indigo-600 to-sky-400',
    bgLight: 'bg-indigo-50 dark:bg-indigo-900/40',
    textAccent: 'text-indigo-700 dark:text-indigo-200',
    borderAccent: 'border-indigo-200 dark:border-indigo-800',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/rebar',
    icon: '🏗️',
    title: '철근 단위중량표',
    desc: 'D13 6m 한 가닥은 5.97kg — 공칭지름과 강의 밀도로 읽는 물량',
    badge: `${REBAR_CELLS.length}칸`,
    color: 'from-amber-600 to-yellow-400',
    bgLight: 'bg-amber-50 dark:bg-amber-900/40',
    textAccent: 'text-amber-700 dark:text-amber-200',
    borderAccent: 'border-amber-200 dark:border-amber-800',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/fertilizer',
    icon: '🌱',
    title: '비료 시비량표',
    desc: '질소 10g/m²에 요소는 21.74g — 봉지의 N-P-K로 나눠 읽는 뿌릴 양',
    badge: `${FERTILIZER_CELLS.length}칸`,
    color: 'from-lime-500 to-emerald-400',
    bgLight: 'bg-lime-50 dark:bg-lime-900/40',
    textAccent: 'text-lime-700 dark:text-lime-200',
    borderAccent: 'border-lime-200 dark:border-lime-800',
    shadow: 'shadow-lime-100',
  },
  {
    href: '/filament',
    icon: '🧵',
    title: '필라멘트 길이표',
    desc: 'PLA 1kg은 1.75mm로 335m — 재료 밀도와 스풀 무게로 읽는 감긴 길이',
    badge: `${FILAMENT_CELLS.length}칸`,
    color: 'from-violet-500 to-fuchsia-400',
    bgLight: 'bg-violet-50 dark:bg-violet-900/40',
    textAccent: 'text-violet-700 dark:text-violet-200',
    borderAccent: 'border-violet-200 dark:border-violet-800',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/uv',
    icon: '☀️',
    title: '자외선 화상 시간',
    desc: '지수 8이면 스무 분 — 같은 햇빛도 피부 타입에 따라 다섯 배',
    badge: `${UV_CELLS.length}칸`,
    color: 'from-orange-500 to-yellow-400',
    bgLight: 'bg-orange-50 dark:bg-orange-900/40',
    textAccent: 'text-orange-700 dark:text-orange-200',
    borderAccent: 'border-orange-200 dark:border-orange-800',
    shadow: 'shadow-orange-100',
  },
  {
    href: '/hike',
    icon: '⛰️',
    title: '등산 시간 계산',
    desc: '10km에 500m를 올리면 2시간 50분 — 시간을 가르는 건 오름입니다',
    badge: `${HIKE_CELLS.length}칸`,
    color: 'from-green-700 to-lime-500',
    bgLight: 'bg-green-50 dark:bg-green-900/40',
    textAccent: 'text-green-700 dark:text-green-200',
    borderAccent: 'border-green-200 dark:border-green-800',
    shadow: 'shadow-green-100',
  },
  {
    href: '/insul',
    icon: '🧱',
    title: '단열재 열저항 계산',
    desc: '압출법 100mm는 콘크리트 5.7미터 — 재료와 두께로 R값·U값',
    badge: `${INSUL_CELLS.length}칸`,
    color: 'from-stone-600 to-stone-400',
    bgLight: 'bg-stone-50 dark:bg-stone-800/60',
    textAccent: 'text-stone-700 dark:text-stone-200',
    borderAccent: 'border-stone-200 dark:border-stone-700',
    shadow: 'shadow-stone-100',
  },
  {
    href: '/air',
    icon: '🌫️',
    title: '미세먼지와 대기질 지수',
    desc: '초미세먼지 35는 보통인데 AQI로는 99 — 한국 등급과 미국 지수를 나란히',
    badge: `${AIR_CELLS.length}칸`,
    color: 'from-slate-600 to-slate-400',
    bgLight: 'bg-slate-50 dark:bg-slate-800/60',
    textAccent: 'text-slate-700 dark:text-slate-200',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
  {
    href: '/paper',
    icon: '📄',
    title: '종이 규격표',
    desc: 'A4 300dpi는 2480×3508 — 접어서 나오는 규격과 장당 무게',
    badge: `${PAPER_CELLS.length}칸`,
    color: 'from-slate-600 to-slate-400',
    bgLight: 'bg-slate-50 dark:bg-slate-800/60',
    textAccent: 'text-slate-700 dark:text-slate-200',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
  {
    href: '/torque',
    icon: '🔧',
    title: '볼트 조임 토크표',
    desc: 'M8 8.8은 26N·m — 기름 한 방울에 25% 달라집니다',
    badge: `${TORQUE_CELLS.length}칸`,
    color: 'from-orange-700 to-amber-500',
    bgLight: 'bg-orange-50 dark:bg-orange-900/40',
    textAccent: 'text-orange-700 dark:text-orange-200',
    borderAccent: 'border-orange-200 dark:border-orange-800',
    shadow: 'shadow-orange-100',
  },
  {
    href: '/lumen',
    icon: '💡',
    title: '방 밝기 계산',
    desc: '20㎡ 거실은 3000루멘 — 와트가 아니라 루멘으로 고릅니다',
    badge: `${LUMEN_CELLS.length}칸`,
    color: 'from-yellow-500 to-amber-400',
    bgLight: 'bg-yellow-50 dark:bg-yellow-900/40',
    textAccent: 'text-yellow-700 dark:text-yellow-200',
    borderAccent: 'border-yellow-200 dark:border-yellow-800',
    shadow: 'shadow-yellow-100',
  },
  {
    href: '/ampere',
    icon: '⚡',
    title: '가전 전류 계산',
    desc: '전기포트는 220V에서 9.1A — 한 회로에 몇 대까지 꽂아도 되는지',
    badge: `${AMP_CELLS.length}칸`,
    color: 'from-yellow-600 to-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-900/40',
    textAccent: 'text-amber-700 dark:text-amber-200',
    borderAccent: 'border-amber-200 dark:border-amber-800',
    shadow: 'shadow-amber-100',
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
    href: '/stop',
    icon: '🚗',
    title: '정지거리표',
    desc: '속도가 두 배면 제동거리는 네 배 — 노면 네 가지로 시속별 계산',
    badge: `${SPEEDS.length}가지`,
    color: 'from-red-700 to-orange-500',
    bgLight: 'bg-red-50 dark:bg-red-950/30',
    textAccent: 'text-red-700 dark:text-red-300',
    borderAccent: 'border-red-200 dark:border-red-900/50',
    shadow: 'shadow-red-100',
  },
  {
    href: '/altitude',
    icon: '⛰️',
    title: '고도별 기압표',
    desc: '2250m에서는 물이 92도에 끓습니다 — 기압·끓는점·산소를 높이별로',
    badge: `${ALTITUDES.length}가지`,
    color: 'from-cyan-700 to-sky-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-900/50',
    shadow: 'shadow-cyan-100',
  },
  {
    href: '/wifi',
    icon: '📶',
    title: '와이파이 채널표',
    desc: '왜 1·6·11인가 — 채널마다 주파수와 겹치는 채널을 계산해서',
    badge: `${CHANNELS.length}가지`,
    color: 'from-blue-700 to-sky-500',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
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
    href: '/tire',
    icon: '🛞',
    title: '타이어 규격표',
    desc: '205/55R16의 외경은 632mm — 바꿔 낄 수 있는 치수와 속도계 차이까지',
    badge: `${TIRES.length}가지`,
    color: 'from-slate-700 to-slate-500',
    bgLight: 'bg-slate-50 dark:bg-slate-800/50',
    textAccent: 'text-slate-700 dark:text-slate-200',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
  {
    href: '/screw',
    icon: '🔩',
    title: '미터 나사 규격표',
    desc: 'M8×1.25 탭은 6.8mm 드릴 — 골지름과 응력단면적까지 계산해서',
    badge: `${SCREWS.length}가지`,
    color: 'from-slate-600 to-slate-400',
    bgLight: 'bg-zinc-50 dark:bg-zinc-900/40',
    textAccent: 'text-zinc-700 dark:text-zinc-200',
    borderAccent: 'border-zinc-200 dark:border-zinc-800',
    shadow: 'shadow-zinc-100',
  },
  {
    href: '/drill',
    icon: '🔩',
    title: '드릴 비트 규격표',
    desc: '#7이 5.1mm — 미터·인치·번호·문자 네 계열을 한 표에',
    badge: `${BITS.length}가지`,
    color: 'from-neutral-600 to-slate-400',
    bgLight: 'bg-neutral-50 dark:bg-neutral-900/40',
    textAccent: 'text-neutral-700 dark:text-neutral-200',
    borderAccent: 'border-neutral-200 dark:border-neutral-800',
    shadow: 'shadow-neutral-100',
  },
  {
    href: '/bandwidth',
    icon: '🔽',
    title: '다운로드 시간 계산',
    desc: '100Mbps로 1GB는 85초 — 광고 속도와 실제 속도가 다른 이유',
    badge: `${BW_CELLS.length}칸`,
    color: 'from-sky-600 to-indigo-500',
    bgLight: 'bg-sky-50 dark:bg-sky-900/40',
    textAccent: 'text-sky-700 dark:text-sky-200',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/battery',
    icon: '🔋',
    title: '배터리 충전 시간',
    desc: '65W를 꽂아도 안 빨라지는 이유 — 전압·케이블·기내 반입까지',
    badge: `${BATT_CELLS.length}칸`,
    color: 'from-green-600 to-lime-400',
    bgLight: 'bg-green-50 dark:bg-green-900/40',
    textAccent: 'text-green-700 dark:text-green-200',
    borderAccent: 'border-green-200 dark:border-green-800',
    shadow: 'shadow-green-100',
  },
  {
    href: '/wire',
    icon: '🔌',
    title: '전선 굵기 계산',
    desc: 'AWG 12로 15A를 몇 미터까지 — 전압 강하는 왕복으로 셉니다',
    badge: `${WIRE_CELLS.length}칸`,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50 dark:bg-amber-900/40',
    textAccent: 'text-amber-700 dark:text-amber-200',
    borderAccent: 'border-amber-200 dark:border-amber-800',
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
    href: '/pace',
    icon: '🏃',
    title: '러닝 페이스표',
    desc: '서브4는 5분 41초 — 페이스마다 5K·10K·하프·풀코스 완주 시간',
    badge: `${PACES.length}가지`,
    color: 'from-teal-700 to-emerald-500',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
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
    href: '/windchill',
    icon: '❄️',
    title: '체감온도표',
    desc: '영하 10도에 바람 30km면 체감 영하 20도 — 기온×풍속 210칸',
    badge: `${WC_CELLS.length}칸`,
    color: 'from-sky-700 to-cyan-500',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/dew',
    icon: '💧',
    title: '이슬점표',
    desc: '30도의 60%는 10도의 60%보다 물을 세 배 품습니다 — 기온×습도 189칸',
    badge: `${DEW_CELLS.length}칸`,
    color: 'from-cyan-700 to-sky-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-900/50',
    shadow: 'shadow-cyan-100',
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
    href: '/country',
    icon: '🧭',
    title: '나라 정보',
    desc: '시차·전압·플러그·국가번호·입국 조건을 나라별로 한 장에',
    badge: `${SECTION_COUNTS.country}개`,
    color: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/metro',
    icon: '🚇',
    title: '지하철 역 맞추기',
    desc: '서울·도쿄·런던·뉴욕 노선의 역 이름을 노선도 힌트로 맞추기',
    badge: `${SECTION_COUNTS.metro}개`,
    color: 'from-slate-600 to-slate-800',
    bgLight: 'bg-slate-50 dark:bg-slate-900/40',
    textAccent: 'text-slate-700 dark:text-slate-300',
    borderAccent: 'border-slate-200 dark:border-slate-700',
    shadow: 'shadow-slate-100',
  },
  {
    href: '/error',
    icon: '⚠️',
    title: '오류 문구 사전',
    desc: 'git·npm·Python·Docker 오류가 무슨 뜻이고 그 명령이 무엇을 버리는지',
    badge: `${SECTION_COUNTS.error}개`,
    color: 'from-rose-800 to-rose-400',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
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
    href: '/css',
    icon: '🎨',
    title: 'CSS 속성 사전',
    desc: '속성 154개의 쓰임과 자주 쓰는 값, 상속 여부를 한 장에',
    badge: `${SECTION_COUNTS.css}개`,
    color: 'from-blue-600 to-sky-500',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/html',
    icon: '🪟',
    title: 'HTML 태그 사전',
    desc: '태그 126개가 무엇을 하는지, 닫는 태그와 속성까지 한 장에',
    badge: `${SECTION_COUNTS.html}개`,
    color: 'from-orange-500 to-amber-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    textAccent: 'text-orange-700 dark:text-orange-300',
    borderAccent: 'border-orange-200 dark:border-orange-900/50',
    shadow: 'shadow-orange-100',
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
    href: '/element',
    icon: '⚛️',
    title: '주기율표',
    desc: '원소 118가지 — 기호와 원자량, 주기와 족, 전자 배치까지',
    badge: `${ELEMENTS.length}종`,
    color: 'from-cyan-600 to-sky-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-900/50',
    shadow: 'shadow-cyan-100',
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
    href: '/darts',
    icon: '🎯',
    title: '다트 마무리표',
    desc: '2점부터 170점까지 — 몇 다트에 끝나는지와 던질 순서',
    badge: `${DARTS_SCORES.length}가지`,
    color: 'from-red-600 to-rose-500',
    bgLight: 'bg-red-50 dark:bg-red-950/30',
    textAccent: 'text-red-700 dark:text-red-300',
    borderAccent: 'border-red-200 dark:border-red-900/50',
    shadow: 'shadow-red-100',
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
    href: '/resistor',
    icon: '⚡',
    title: '저항 색띠표',
    desc: '10Ω부터 9.1MΩ까지 — 네 띠·다섯 띠와 오차, 4k7 표기까지',
    badge: `${RESISTOR_VALUES.length}가지`,
    color: 'from-amber-500 to-yellow-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
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
  // ── newsection에서 온 열셋 (2026-08-07) ──
  // 머지할 때 목록 import만 들어오고 카드는 안 쓰여 있었다. tsc는 안 쓰이는
  // import를 안 잡으므로 홈에서 열셋이 통째로 빠진 채 검사가 다 초록이었다.
  {
    href: '/gengo',
    icon: '🗾',
    title: '일본 연호 변환표',
    desc: '1989년은 쇼와 64년이면서 헤이세이 원년 — 연호가 둘 앉는 해가 넷',
    badge: `${GENGO_CELLS.length}칸`,
    color: 'from-rose-600 to-rose-400',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-800',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/cable',
    icon: '🔌',
    title: '케이블 대역폭표',
    desc: '4K 120Hz는 HDMI 2.0으로 안 됩니다 — 규격 여섯 개와 나란히',
    badge: `${CABLE_CELLS.length}칸`,
    color: 'from-sky-600 to-sky-400',
    bgLight: 'bg-sky-50 dark:bg-sky-950/40',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/tatami',
    icon: '🏯',
    title: '다다미 방 넓이표',
    desc: '같은 6첩이 10.94㎡이기도 8.67㎡이기도 합니다 — 규격 다섯',
    badge: `${TATAMI_CELLS.length}칸`,
    color: 'from-amber-600 to-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-800',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/lumber',
    icon: '🪵',
    title: '목재 실측 치수표',
    desc: '투바이포는 2인치도 4인치도 아닙니다 — 말리고 깎여 38×89mm',
    badge: `${LUMBER_CELLS.length}칸`,
    color: 'from-orange-700 to-orange-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/40',
    textAccent: 'text-orange-700 dark:text-orange-300',
    borderAccent: 'border-orange-200 dark:border-orange-800',
    shadow: 'shadow-orange-100',
  },
  {
    href: '/powerbank',
    icon: '🔋',
    title: '보조배터리 기내 반입표',
    desc: '규정은 mAh가 아니라 Wh를 봅니다 — 같은 20,000mAh도 전압 따라',
    badge: `${PB_CELLS.length}칸`,
    color: 'from-lime-600 to-lime-400',
    bgLight: 'bg-lime-50 dark:bg-lime-950/40',
    textAccent: 'text-lime-700 dark:text-lime-300',
    borderAccent: 'border-lime-200 dark:border-lime-800',
    shadow: 'shadow-lime-100',
  },
  {
    href: '/golf',
    icon: '⛳',
    title: '골프 핸디캡 환산표',
    desc: '같은 90타가 코스마다 다른 실력 — 슬로프 레이팅으로 환산',
    badge: `${GOLF_CELLS.length}칸`,
    color: 'from-green-600 to-green-400',
    bgLight: 'bg-green-50 dark:bg-green-950/40',
    textAccent: 'text-green-700 dark:text-green-300',
    borderAccent: 'border-green-200 dark:border-green-800',
    shadow: 'shadow-green-100',
  },
  {
    href: '/microwave',
    icon: '🍲',
    title: '전자레인지 와트 환산',
    desc: '700W 3분은 1000W에서 2분 6초 — 포장지 출력이 다를 때',
    badge: `${MW_CELLS.length}칸`,
    color: 'from-red-600 to-red-400',
    bgLight: 'bg-red-50 dark:bg-red-950/40',
    textAccent: 'text-red-700 dark:text-red-300',
    borderAccent: 'border-red-200 dark:border-red-800',
    shadow: 'shadow-red-100',
  },
  {
    href: '/quake',
    icon: '🌋',
    title: '지진 규모와 에너지',
    desc: '규모 7은 6의 두 배가 아니라 32배 — 로그 눈금이라 곱셈입니다',
    badge: `${QUAKE_MAGS.length}칸`,
    color: 'from-stone-600 to-stone-400',
    bgLight: 'bg-stone-50 dark:bg-stone-800/60',
    textAccent: 'text-stone-700 dark:text-stone-200',
    borderAccent: 'border-stone-200 dark:border-stone-700',
    shadow: 'shadow-stone-100',
  },
  {
    href: '/bed',
    icon: '🛏️',
    title: '침대 규격과 방 크기',
    desc: '한국 킹과 미국 King은 33cm 다릅니다 — 방에 남는 통로까지',
    badge: `${BED_CELLS.length}칸`,
    color: 'from-indigo-600 to-indigo-400',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-800',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/drink',
    icon: '🍺',
    title: '술 순수 알코올량',
    desc: '"한 잔"이 영국 8g, WHO 10g, 미국 14g — 도수와 용량으로 견줍니다',
    badge: `${DRINK_CELLS.length}칸`,
    color: 'from-amber-900 to-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    textAccent: 'text-amber-800 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-800',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/purifier',
    icon: '🌬️',
    title: '공기청정기 평수',
    desc: '광고의 평형에는 자연 환기가 얹혀 있습니다 — 닫힌 방에는 그만큼 여유가 없습니다',
    badge: `${PURIFIER_CELLS.length}칸`,
    color: 'from-cyan-800 to-sky-400',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/40',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-800',
    shadow: 'shadow-cyan-100',
  },
  {
    href: '/flight',
    icon: '✈️',
    title: '도시 사이 거리와 비행시간',
    desc: '서울에서 뉴욕은 동쪽이 아니라 북쪽으로 떠납니다 — 거리·방위·시차·도착 시각',
    badge: `${FLIGHT_CELLS.length}칸`,
    color: 'from-blue-900 to-sky-400',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-800',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/raid',
    icon: '💽',
    title: 'RAID 용량표',
    desc: '4TB 넉 장으로 RAID 5를 만들면 12TB인데 화면에는 10.91TiB로 보입니다',
    badge: `${RAID_CELLS.length}칸`,
    color: 'from-teal-800 to-emerald-400',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-800',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/heredity',
    icon: '🧬',
    title: '혈액형 유전표',
    desc: 'AB형과 O형 부모에게서는 AB형도 O형도 나오지 않습니다 — 부모 조합 전부',
    badge: `${HEREDITY_CELLS.length}칸`,
    color: 'from-violet-900 to-fuchsia-400',
    bgLight: 'bg-violet-50 dark:bg-violet-950/40',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-800',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/exposure',
    icon: '📷',
    title: '노출값(EV) 표',
    desc: 'f/11은 사실 11.314, 1/60초는 사실 1/64초 — 조리개와 셔터가 만나는 자리',
    badge: `${EXPOSURE_CELLS.length}칸`,
    color: 'from-slate-800 to-sky-400',
    bgLight: 'bg-sky-50 dark:bg-sky-950/40',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-800',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/blood',
    icon: '🩸',
    title: '수혈 적합표',
    desc: 'O형은 적혈구의 만능 공혈자, AB형은 혈장의 만능 공혈자 — 규칙이 반대입니다',
    badge: `${BLOOD_CELLS.length}칸`,
    color: 'from-red-900 to-rose-400',
    bgLight: 'bg-red-50 dark:bg-red-950/40',
    textAccent: 'text-red-700 dark:text-red-300',
    borderAccent: 'border-red-200 dark:border-red-800',
    shadow: 'shadow-red-100',
  },
  {
    href: '/wine',
    icon: '🍷',
    title: '와인 병 크기표',
    desc: '제로보암이 보르도에서 5리터, 부르고뉴에서 3리터 — 잔 수까지',
    badge: `${WINE_CELLS.length}칸`,
    color: 'from-purple-700 to-purple-500',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    textAccent: 'text-purple-700 dark:text-purple-300',
    borderAccent: 'border-purple-200 dark:border-purple-800',
    shadow: 'shadow-purple-100',
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
  {
    href: '/viewing',
    icon: '📺',
    title: 'TV 시청거리표',
    desc: '4K가 값을 하려면 얼마나 가까이 — 화소가 보이기 시작하는 거리',
    badge: `${VIEW_CELLS.length}칸`,
    color: 'from-cyan-600 to-cyan-400',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/40',
    textAccent: 'text-cyan-700 dark:text-cyan-300',
    borderAccent: 'border-cyan-200 dark:border-cyan-800',
    shadow: 'shadow-cyan-100',
  },
  {
    href: '/bignum',
    icon: '🔢',
    title: '큰 수 단위 환산',
    desc: '1 crore가 몇 억인지 — 셋·둘·넷으로 끊는 세 체계',
    badge: `${BIG_CELLS.length}칸`,
    color: 'from-teal-600 to-teal-400',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-800',
    shadow: 'shadow-teal-100',
  },
  // 아홉 언어 홈(lib/locale-home.ts)에는 있는데 한국어 홈에만 빠져 있던 다섯
  {
    href: '/size',
    icon: '👕',
    title: '옷 사이즈 환산표',
    desc: '55는 키 155cm·가슴 85cm — 1981년 표준이 정한 규칙',
    badge: `${SIZE_CELLS.length}칸`,
    color: 'from-pink-600 to-pink-400',
    bgLight: 'bg-pink-50 dark:bg-pink-950/40',
    textAccent: 'text-pink-700 dark:text-pink-300',
    borderAccent: 'border-pink-200 dark:border-pink-800',
    shadow: 'shadow-pink-100',
  },
  {
    href: '/bra',
    icon: '📏',
    title: '브래지어 사이즈표',
    desc: '차이 12.5cm가 B컵 — 밑가슴둘레와 차이로 표기를 계산',
    badge: `${BRA_CELLS.length}칸`,
    color: 'from-rose-500 to-rose-300',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-800',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/petfood',
    icon: '🐕',
    title: '반려동물 사료량표',
    desc: '열량은 체중에 비례하지 않습니다 — 체중의 0.75제곱',
    badge: `${PET_CELLS.length}칸`,
    color: 'from-amber-500 to-amber-300',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-800',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/gravity',
    icon: '🪐',
    title: '천체별 몸무게',
    desc: '달에서는 6분의 1, 목성에서는 두 배 — 질량은 그대로입니다',
    badge: `${WEIGHTS.length}가지`,
    color: 'from-violet-600 to-violet-400',
    bgLight: 'bg-violet-50 dark:bg-violet-950/40',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-800',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/music',
    icon: '🎹',
    title: '코드·음계·음정 사전',
    desc: '밑음 열둘 × 성질 여덟 — 건반 그림과 소리로 확인',
    badge: `${MUSIC_ITEMS.length}가지`,
    color: 'from-fuchsia-600 to-fuchsia-400',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-800',
    shadow: 'shadow-fuchsia-100',
  },
];

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 via-amber-400 via-emerald-500 to-sky-400" />

      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Brand */}
        <div className="mb-14 text-center">
          {/*
            홈에 h1이 없었다. 브랜드가 span 두 개로만 그려져 있어서, 사이트에서
            권위가 가장 높은 페이지가 주제를 알리는 제목 없이 색인되고 있었다.
            보이는 모습은 그대로 두고 태그만 h1으로 바꾼다. 다만 "vixutil"만으로는
            무슨 사이트인지 설명이 안 되므로 설명을 sr-only로 h1 안에 넣는다.
          */}
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only"> — 계산기·심리테스트·퀴즈·생성기·체크리스트·운세 모음</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-base">일상에 필요한 실용 도구 모음</p>
        </div>

        {/*
          통합 검색 진입점. 지금까지 검색은 섹션별 허브에만 있어서, 어느 섹션에
          있는지 모르면 찾을 수 없었다. 인덱스 자체는 /search에만 싣는다 —
          랜딩 페이지에 600여 개 항목을 직렬화하면 무거워진다.
        */}
        <Link
          href="/search"
          className="group flex items-center gap-3 mb-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-white/70 dark:border-slate-700/70 rounded-2xl px-4 py-3.5 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)] hover:border-indigo-300 hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">
            실업급여, 전세, MBTI, 로또…
          </span>
          <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0">
            전체 검색
          </span>
        </Link>

        {/* Section grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border ${s.borderAccent} ${s.bgLight} dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg ${s.shadow} hover:-translate-y-0.5 transition-all duration-200`}
            >
              {/* Background gradient decoration */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <ToolIcon emoji={s.icon} className="text-slate-800 dark:text-slate-100 w-8 h-8" />
                  {s.badge && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 ${s.textAccent} border ${s.borderAccent} dark:border-slate-700`}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <h2 className={`text-lg font-black ${s.textAccent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{s.desc}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.textAccent}`}>
                  바로가기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
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
              <p className="text-xl font-black text-slate-900 dark:text-slate-100">{item.val}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com — 2026</p>
      </footer>
    </div>
  );
}
