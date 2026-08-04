/**
 * 점자 한 칸 — 여섯 자리를 그대로 그린다.
 *
 * 왼쪽 위부터 아래로 1·2·3, 오른쪽이 4·5·6이다. 번호를 외우지 않아도 이 그림을
 * 보면 "125"가 어느 점인지 바로 읽힌다.
 */
export default function BrailleCell({ mask, size = 'md' }: { mask: number; size?: 'sm' | 'md' }) {
  const dot = size === 'sm' ? 'h-2 w-2' : 'h-3.5 w-3.5';
  return (
    <div className={`grid grid-cols-2 ${size === 'sm' ? 'gap-1' : 'gap-1.5'}`} aria-hidden>
      {[1, 4, 2, 5, 3, 6].map(d => (
        <span
          key={d}
          className={`${dot} rounded-full ${
            (mask >> (d - 1)) & 1
              ? 'bg-violet-600 dark:bg-violet-400'
              : 'border border-slate-300 bg-transparent dark:border-slate-600'
          }`}
        />
      ))}
    </div>
  );
}
