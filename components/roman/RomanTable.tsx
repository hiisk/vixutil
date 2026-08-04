import { NUMERALS } from '@/lib/roman/facts';

/**
 * 글자 일곱 개와 뺄셈 꼴 여섯 개 — 열세 줄이 규칙의 전부다.
 *
 * 뺄셈 꼴을 따로 떼어 두면 "네 번 반복하지 않는다"는 규칙을 외워야 하지만,
 * 한 표에 섞어 두면 큰 값부터 빼는 것만으로 저절로 맞는다. 그래서 표도
 * 섞인 채로 보인다.
 */
export default function RomanTable() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {NUMERALS.map(({ value, letters }) => (
        <div
          key={letters}
          className={[
            'rounded-lg border px-2.5 py-1.5 text-center',
            letters.length === 2
              ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900',
          ].join(' ')}
        >
          <div className="text-sm font-black text-slate-800 dark:text-slate-100">{letters}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{value}</div>
        </div>
      ))}
    </div>
  );
}
