'use client';
import { useMemo, useState } from 'react';
import { hexToHsl, hslToHex, hexToRgb, judgeContrast, scale } from '@/lib/color';
import { CARD, ColorInput, useCopy } from './ui';

export default function ShadesTool() {
  const [base, setBase] = useState('#3b82f6');
  const { copied, copy } = useCopy();

  const steps = useMemo(() => {
    const hsl = hexToHsl(base);
    if (!hsl) return [];
    return scale(hsl).map(s => {
      const hex = hslToHex(s.hsl);
      const rgb = hexToRgb(hex)!;
      return {
        step: s.step,
        hex,
        hsl: s.hsl,
        // 이 단계 위에 흰 글씨를 얹어도 읽히는지 — 버튼 배경으로 쓸 수 있는지가 여기서 갈린다
        whiteOk: judgeContrast(rgb, { r: 255, g: 255, b: 255 }).aaNormal,
        blackOk: judgeContrast(rgb, { r: 0, g: 0, b: 0 }).aaNormal,
      };
    });
  }, [base]);

  const css = steps.map(s => `  --brand-${s.step}: ${s.hex.toUpperCase()};`).join('\n');

  return (
    <div>
      <ColorInput value={base} onChange={setBase} label="기준 색 (브랜드 색)" />

      <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {steps.map(s => (
          <button
            key={s.step}
            onClick={() => copy(s.hex.toUpperCase())}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-opacity hover:opacity-95"
            style={{ background: s.hex, color: s.whiteOk ? '#ffffff' : '#0f172a' }}
          >
            <span className="w-12 text-xs font-black tabular-nums">{s.step}</span>
            <span className="flex-1 text-sm font-mono font-bold uppercase">{s.hex}</span>
            <span className="text-[10px] opacity-80">
              {s.whiteOk && s.blackOk ? '흰·검 모두 OK' : s.whiteOk ? '흰 글씨 OK' : s.blackOk ? '검은 글씨 OK' : '글씨 대비 부족'}
            </span>
            <span className="text-[10px] font-bold opacity-70 w-10 text-right">
              {copied === s.hex.toUpperCase() ? '복사됨' : '복사'}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => copy(`:root {\n${css}\n}`)}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        CSS 변수 전체 복사
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">어디에 쓰나요</p>
        <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>· <b className="text-slate-800 dark:text-slate-100">50~200</b> 배경, 연한 강조, 비활성 상태</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">400~600</b> 버튼, 링크 — 브랜드 색의 본체</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">700~900</b> 눌린 상태, 어두운 배경 위 글자</li>
          <li className="text-slate-500 dark:text-slate-400">각 줄 오른쪽의 안내는 그 색을 배경으로 썼을 때 흰/검은 글씨가 접근성 기준(4.5:1)을 넘는지입니다.</li>
        </ul>
      </div>
    </div>
  );
}
