'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/**
 * 숫자 목록 하나만 받고 나머지 통계값은 모두 계산한다.
 *
 * 표준편차는 표본(n-1)과 모집단(n) 둘을 함께 보여 준다. 어느 쪽을 쓸지는
 * 자료가 전부인지 일부인지에 달렸는데, 하나만 보여 주면 그 구분이 사라진다.
 */
function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .filter(s => s !== '')
    .map(Number)
    .filter(n => Number.isFinite(n));
}

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** 가장 많이 나온 값들 — 모두 한 번씩이면 최빈값은 없다 */
function modes(nums: number[]): number[] {
  const count = new Map<number, number>();
  for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);
  const max = Math.max(...count.values());
  if (max === 1) return [];
  return [...count.entries()].filter(([, c]) => c === max).map(([n]) => n).sort((a, b) => a - b);
}

const fmt = (n: number) => {
  const r = Math.round(n * 10000) / 10000;
  return r.toLocaleString('ko-KR', { maximumFractionDigits: 4 });
};

export default function AveragePage() {
  const [text, setText] = useState('');

  const nums = parseNumbers(text);
  const stats = (() => {
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sqDiff = nums.reduce((a, b) => a + (b - mean) ** 2, 0);
    return {
      n: nums.length,
      sum,
      mean,
      median: median(sorted),
      modes: modes(nums),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: sorted[sorted.length - 1] - sorted[0],
      // 표본은 n-1로 나눈다(베셀 보정). 자료가 하나뿐이면 정의되지 않는다
      sampleSd: nums.length > 1 ? Math.sqrt(sqDiff / (nums.length - 1)) : null,
      popSd: Math.sqrt(sqDiff / nums.length),
    };
  })();

  return (
    <CalcShell
      path="/calculator/average"
      title="평균 계산기"
      description="숫자를 넣으면 평균·중앙값·최빈값·표준편차를 계산합니다"
      intro={
        <>
          <h2>평균 하나로는 부족합니다</h2>
          <p>
            0, 0, 0, 0, 100의 평균은 20입니다. 그런데 스무 언저리인 값은 하나도 없습니다. 값이 한쪽에
            몰려 있거나 아주 큰 값이 하나 섞여 있으면 평균이 자료를 대표하지 못합니다. 그래서
            <strong> 중앙값</strong>을 함께 봐야 합니다 — 위 자료의 중앙값은 0입니다.
          </p>
          <h2>중앙값과 최빈값</h2>
          <p>
            중앙값은 크기순으로 줄 세웠을 때 한가운데 있는 값입니다. 개수가 짝수면 가운데 두 값의
            평균을 씁니다. 아주 큰 값 하나에 흔들리지 않아 소득이나 집값처럼 한쪽으로 긴 자료에
            자주 씁니다. 최빈값은 가장 자주 나온 값이고, 모두 한 번씩만 나오면 최빈값은 없습니다.
          </p>
          <h2>표본 표준편차와 모집단 표준편차</h2>
          <p>
            표준편차는 값들이 평균에서 얼마나 흩어져 있는지 나타냅니다. 가진 자료가 <strong>전부</strong>면
            개수 n으로 나누고(모집단), 더 큰 무리에서 뽑아 온 <strong>일부</strong>면 n−1로 나눕니다(표본).
            n−1로 나누는 것을 베셀 보정이라 하는데, 표본은 평균 자체도 표본에서 뽑은 값이라 흩어짐을
            실제보다 작게 잡기 때문입니다. 개수가 적을수록 두 값의 차이가 큽니다.
          </p>
          <h2>넣는 방법</h2>
          <p>
            쉼표, 띄어쓰기, 줄바꿈 어느 것으로 나누어도 됩니다. 표에서 그대로 붙여 넣어도 숫자만
            골라 읽습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/average" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">숫자 입력</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={'85, 92, 78, 95, 88\n또는 줄바꿈으로 나눠 넣으세요'}
            rows={6}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-400 dark:text-slate-500">쉼표·띄어쓰기·줄바꿈 모두 됩니다</p>
            <button
              onClick={() => setText('')}
              className="text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              지우기
            </button>
          </div>
        </Card>

        {stats && (
          <>
            <div className="stat-pri text-center">
              <p className="stat-sub mb-2">평균</p>
              <p className="text-slate-900 dark:text-slate-50 text-5xl font-bold">{fmt(stats.mean)}</p>
              <p className="stat-sub mt-3 opacity-90">
                {stats.n}개 · 합계 {fmt(stats.sum)}
              </p>
            </div>

            <Card>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">중앙값</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(stats.median)}</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">최빈값</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {stats.modes.length ? stats.modes.map(fmt).join(', ') : '없음 (모두 한 번씩)'}
                  </span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">최솟값 · 최댓값</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {fmt(stats.min)} · {fmt(stats.max)}
                  </span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">범위</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(stats.range)}</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">표본 표준편차 (n−1)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {stats.sampleSd === null ? '값이 2개 이상 필요' : fmt(stats.sampleSd)}
                  </span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">모집단 표준편차 (n)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(stats.popSd)}</span>
                </div>
              </div>
            </Card>

            {Math.abs(stats.mean - stats.median) > (stats.range || 1) * 0.15 && (
              <Card className="p-5 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  평균({fmt(stats.mean)})과 중앙값({fmt(stats.median)})이 꽤 벌어져 있습니다. 한쪽으로 치우친
                  값이 섞여 있다는 뜻이니, 이 자료는 평균보다 중앙값으로 말하는 편이 정확합니다.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
