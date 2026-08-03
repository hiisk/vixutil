import type { BandColor } from '@/lib/resistor/facts';

/**
 * 저항 몸통에 색띠를 그린다.
 *
 * 오차 띠만 오른쪽 끝에 떨어뜨려 놓는다. 실물이 그렇게 생겼기 때문이고, 그
 * 간격이 "어느 쪽부터 읽나"의 답이기 때문이다. 이 그림에서 그 간격을 없애면
 * 읽는 법을 설명하는 문장이 허공에 뜬다.
 */
export const BAND_HEX: Record<BandColor, string> = {
  black: '#1c1917',
  brown: '#78350f',
  red: '#dc2626',
  orange: '#ea580c',
  yellow: '#facc15',
  green: '#16a34a',
  blue: '#2563eb',
  violet: '#7c3aed',
  grey: '#9ca3af',
  white: '#f8fafc',
  gold: '#d4af37',
  silver: '#c0c0c0',
  none: 'transparent',
};

export default function ResistorBands({ bands }: { bands: BandColor[] }) {
  const digits = bands.slice(0, -1);
  const tolerance = bands[bands.length - 1];
  return (
    <div className="flex items-center" aria-hidden>
      <div className="h-[3px] w-6 bg-slate-300 dark:bg-slate-600" />
      <div className="relative flex h-14 flex-1 items-center gap-2 rounded-[18px] border border-amber-200 bg-amber-50 px-3 dark:border-amber-900/60 dark:bg-amber-100/10">
        {digits.map((c, i) => (
          <span
            key={i}
            className="h-full w-3.5 rounded-[2px] border border-black/10"
            style={{ backgroundColor: BAND_HEX[c] }}
          />
        ))}
        <span
          className="ml-auto h-full w-3.5 rounded-[2px] border border-black/10"
          style={{ backgroundColor: BAND_HEX[tolerance] }}
        />
      </div>
      <div className="h-[3px] w-6 bg-slate-300 dark:bg-slate-600" />
    </div>
  );
}
