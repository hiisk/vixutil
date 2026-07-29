'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, hexToHsl, hslToHex, judgeContrast } from '@/lib/color';
import { CARD, ColorInput } from './ui';

/**
 * 대비 검사 — 배경과 글자색이 접근성 기준을 넘는지.
 *
 * "통과할 때까지 밝기 조절"이 이 도구의 핵심이다. 기준에 걸렸다는 말만
 * 들으면 사람은 결국 감으로 색을 흔들게 되는데, 색상은 그대로 두고 명도만
 * 옮기면 브랜드 색을 지키면서 기준을 넘길 수 있다.
 */
const BADGES = [
  { key: 'aaNormal', label: 'AA 본문', need: '4.5:1' },
  { key: 'aaLarge', label: 'AA 큰 글씨', need: '3:1' },
  { key: 'aaaNormal', label: 'AAA 본문', need: '7:1' },
  { key: 'aaaLarge', label: 'AAA 큰 글씨', need: '4.5:1' },
] as const;

export default function ContrastTool() {
  const [bg, setBg] = useState('#3b82f6');
  const [fg, setFg] = useState('#ffffff');

  const verdict = useMemo(() => {
    const a = hexToRgb(bg), b = hexToRgb(fg);
    if (!a || !b) return null;
    return judgeContrast(a, b);
  }, [bg, fg]);

  /** 글자색의 명도만 옮겨 AA를 넘기는 가장 가까운 색을 찾는다 */
  const suggest = () => {
    const hsl = hexToHsl(fg);
    const bgRgb = hexToRgb(bg);
    if (!hsl || !bgRgb) return;
    let bestHex = fg;
    let bestGap = Infinity;
    for (let l = 0; l <= 100; l++) {
      const hex = hslToHex({ ...hsl, l });
      const r = judgeContrast(bgRgb, hexToRgb(hex)!);
      if (r.aaNormal) {
        const gap = Math.abs(l - hsl.l);
        if (gap < bestGap) { bestGap = gap; bestHex = hex; }
      }
    }
    setFg(bestHex);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <ColorInput value={bg} onChange={setBg} label="배경색" />
        <ColorInput value={fg} onChange={setFg} label="글자색" />
      </div>

      <div className="mt-4 rounded-2xl p-6 border border-slate-200 dark:border-slate-700" style={{ background: bg, color: fg }}>
        <p className="text-2xl font-black mb-2">큰 제목은 이렇게 보입니다</p>
        <p className="text-base mb-1">본문 크기 글자는 이 정도로 읽힙니다.</p>
        <p className="text-xs opacity-90">작은 글씨(캡션)는 이만큼 작아집니다 — 대비가 부족하면 여기서 먼저 티가 납니다.</p>
      </div>

      {verdict && (
        <>
          <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">대비비</p>
            <p className={`text-5xl font-black tabular-nums ${verdict.aaNormal ? 'text-emerald-600' : 'text-rose-500'}`}>
              {verdict.ratio}
              <span className="text-2xl text-slate-400 dark:text-slate-500"> : 1</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {verdict.aaaNormal ? '가장 높은 기준(AAA)까지 통과합니다'
                : verdict.aaNormal ? '본문에 쓸 수 있습니다 (AA 통과)'
                : verdict.aaLarge ? '큰 글씨에만 쓸 수 있습니다'
                : '이 조합은 읽기 어렵습니다'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {BADGES.map(b => (
              <div
                key={b.key}
                className={`rounded-xl border px-3 py-3 text-center ${
                  verdict[b.key]
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30'
                }`}
              >
                <p className={`text-lg font-black ${verdict[b.key] ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {verdict[b.key] ? '통과' : '미달'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{b.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{b.need}</p>
              </div>
            ))}
          </div>

          {!verdict.aaNormal && (
            <button
              onClick={suggest}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
            >
              색상은 그대로 두고 밝기만 조절해 AA 통과시키기
            </button>
          )}
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">기준이 뜻하는 것</p>
        <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>· <b className="text-slate-800 dark:text-slate-100">AA 4.5:1</b> — 웹 접근성의 기본선입니다. 본문은 여기를 넘겨야 합니다.</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">큰 글씨 3:1</b> — 18pt(굵으면 14pt) 이상이면 기준이 낮아집니다.</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">AAA 7:1</b> — 더 엄격한 기준으로, 공공 사이트에서 요구하기도 합니다.</li>
          <li className="text-slate-500 dark:text-slate-400">대비는 색이 아니라 밝기 차이로 정해집니다. 그래서 노랑 위 흰 글씨는 색이 달라도 안 읽힙니다.</li>
        </ul>
      </div>
    </div>
  );
}
