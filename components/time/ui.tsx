'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 시간 도구가 함께 쓰는 조각들.
 *
 * 타이머·스톱워치·뽀모도로·알람이 전부 "지금 몇 시인가"를 반복해서 묻는다.
 * setInterval로 카운트를 직접 세면 탭이 백그라운드로 가는 순간 브라우저가
 * 간격을 늘려 시간이 밀린다. 그래서 끝나는 시각을 정해 두고 매번 현재
 * 시각과의 차이를 다시 계산한다 — 밀리지 않는다.
 */
export function useNow(active: boolean, intervalMs = 100) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!active) return;
    // 첫 값도 인터벌 콜백으로 넣는다 — 이펙트 본문에서 바로 setState하면 렌더가 한 번 더 돈다
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, intervalMs);
    const first = window.setTimeout(tick, 0);
    return () => { window.clearInterval(id); window.clearTimeout(first); };
  }, [active, intervalMs]);

  return now;
}

/** 마운트 여부 — 서버에는 '지금'이 없으므로 시계는 마운트 후에만 그린다 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}

/**
 * 알림음. 소리 파일을 받아 오지 않고 WebAudio로 직접 만든다 —
 * 정적 배포라 파일을 얹을 수는 있지만, 몇 십 KB를 받느니 만드는 편이 낫다.
 */
export function useBeep() {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback((times = 3) => {
    const Ctx: typeof AudioContext =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') void ctx.resume();

    for (let i = 0; i < times; i++) {
      const at = ctx.currentTime + i * 0.45;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, at);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(0.25, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.4);
    }
  }, []);
}

export const CARD = 'rounded-lg border chip-off p-5';

export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border chip-off px-3 py-3 text-center">
      <p className={`text-lg font-bold tabular-nums ${accent ?? 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

export function DateField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border chip-off px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-400 transition-colors"
      />
    </label>
  );
}
