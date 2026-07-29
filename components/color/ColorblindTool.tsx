'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHex, simulateCvd, CVD_LABEL, judgeContrast, type CvdType } from '@/lib/color';
import { CARD, ColorInput } from './ui';

const TYPES: CvdType[] = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];

const SHARE: Record<CvdType, string> = {
  protanopia: '빨강을 어둡게 느껴 빨강과 초록이 비슷해 보입니다',
  deuteranopia: '가장 흔한 유형으로, 빨강과 초록이 거의 같아 보입니다',
  tritanopia: '드문 유형으로, 파랑과 초록을 구분하기 어렵습니다',
  achromatopsia: '색을 전혀 구분하지 못해 명암만 남습니다',
};

export default function ColorblindTool() {
  const [a, setA] = useState('#22c55e');
  const [b, setB] = useState('#ef4444');

  const rows = useMemo(() => {
    const ra = hexToRgb(a), rb = hexToRgb(b);
    if (!ra || !rb) return [];
    return TYPES.map(type => {
      const sa = simulateCvd(ra, type);
      const sb = simulateCvd(rb, type);
      // 시뮬레이션한 두 색이 서로 구분되는지 — 대비가 1.4 아래면 사실상 같은 색이다
      const ratio = judgeContrast(sa, sb).ratio;
      return { type, a: rgbToHex(sa), b: rgbToHex(sb), ratio, ok: ratio >= 1.4 };
    });
  }, [a, b]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <ColorInput value={a} onChange={setA} label="첫 번째 색" />
        <ColorInput value={b} onChange={setB} label="두 번째 색" />
      </div>

      <div className="mt-4 flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-20">
        <div className="flex-1" style={{ background: a }} />
        <div className="flex-1" style={{ background: b }} />
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">일반 색각으로 보이는 모습</p>

      <div className="flex flex-col gap-3 mt-5">
        {rows.map(r => (
          <div key={r.type} className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex h-16">
              <div className="flex-1" style={{ background: r.a }} />
              <div className="flex-1" style={{ background: r.b }} />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{CVD_LABEL[r.type]}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500">{SHARE[r.type]}</span>
              </span>
              <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
                r.ok
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 border-rose-200 dark:border-rose-900/60'
              }`}>
                {r.ok ? '구분됨' : '구분 어려움'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">색만으로 알리지 마세요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          남성 스무 명 중 한 명꼴로 색각 이상이 있습니다. 성공은 초록, 실패는 빨강처럼 색으로만 구분하는
          화면은 그중 상당수에게 같은 색으로 보입니다. 아이콘(✓ ✕)이나 글자를 함께 쓰면 색을 못 봐도
          뜻이 전달됩니다.
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
          시뮬레이션은 근사 변환이라 실제로 그 사람이 보는 색과 정확히 같지는 않습니다. 조합이 위험한지
          가늠하는 용도로 쓰세요.
        </p>
      </div>
    </div>
  );
}
