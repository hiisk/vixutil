import type { ReactElement } from 'react';

/**
 * 카드 두 장 그림.
 *
 * 유니코드 카드 글자(🂡)나 무늬 글자(♠)를 쓰지 않고 직접 그린다. 무늬 글자는
 * 기기에 따라 컬러 이모지로 바뀌어 검은 카드가 갑자기 알록달록해지고, 카드
 * 글자는 아예 없는 글꼴이 많아 네모가 뜬다.
 *
 * 무늬는 뜻이 없다 — 수티드면 같은 무늬 두 장, 오프수트면 다른 무늬 두 장을
 * 그려서 "같다/다르다"만 보이면 된다.
 */

const SPADE = 'M50 12 C40 30 22 40 22 55 C22 65 30 72 39 72 C44 72 48 70 50 66 C52 70 56 72 61 72 C70 72 78 65 78 55 C78 40 60 30 50 12 Z M46 70 C46 78 44 84 40 88 H60 C56 84 54 78 54 70 Z';
const HEART = 'M50 86 C24 66 16 52 16 40 C16 30 24 22 34 22 C41 22 47 26 50 32 C53 26 59 22 66 22 C76 22 84 30 84 40 C84 52 76 66 50 86 Z';
const CLUB = 'M50 14 C42 14 36 20 36 28 C36 31 37 34 39 36 C37 35 34 34 31 34 C23 34 17 40 17 48 C17 56 23 62 31 62 C37 62 42 59 45 54 C45 62 43 72 39 80 H61 C57 72 55 62 55 54 C58 59 63 62 69 62 C77 62 83 56 83 48 C83 40 77 34 69 34 C66 34 63 35 61 36 C63 34 64 31 64 28 C64 20 58 14 50 14 Z';
const DIAMOND = 'M50 10 L82 50 L50 90 L18 50 Z';

const SUITS: Record<string, { path: string; red: boolean }> = {
  spade: { path: SPADE, red: false },
  heart: { path: HEART, red: true },
  club: { path: CLUB, red: false },
  diamond: { path: DIAMOND, red: true },
};

function Pip({ suit, size = 18 }: { suit: string; size?: number }): ReactElement {
  const s = SUITS[suit];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d={s.path} fill={s.red ? '#dc2626' : '#1e293b'} />
    </svg>
  );
}

function Card({ rank, suit }: { rank: string; suit: string }): ReactElement {
  const red = SUITS[suit].red;
  return (
    <div className="flex w-16 flex-col items-center gap-1 rounded-xl border border-slate-300 bg-white px-2 py-3 shadow-sm dark:border-slate-600">
      <span className={`text-2xl font-black leading-none ${red ? 'text-red-600' : 'text-slate-800'}`}>{rank}</span>
      <Pip suit={suit} size={22} />
    </div>
  );
}

/** 수티드면 같은 무늬, 오프수트면 다른 무늬. 페어는 무늬가 다를 수밖에 없다 */
export default function Cards({ cards, kind }: { cards: [string, string]; kind: 'pair' | 'suited' | 'offsuit' }) {
  const [a, b] = cards;
  const second = kind === 'suited' ? 'spade' : 'heart';
  return (
    <div className="flex items-center justify-center gap-2">
      <Card rank={a} suit="spade" />
      <Card rank={b} suit={second} />
    </div>
  );
}
