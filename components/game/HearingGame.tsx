'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Stat } from './ui';

/**
 * 가청 주파수 — 어디까지 들리는지 올려가며 확인한다.
 *
 * 볼륨을 낮게 고정한다. 고주파를 크게 틀면 귀에 무리가 갈 뿐 아니라, 스피커가
 * 못 내는 대역에서 나는 왜곡음을 "들린다"고 착각하게 된다.
 *
 * 나이대 기준은 대략적인 값이다 — 같은 나이라도 편차가 크고, 스피커가 그
 * 주파수를 못 내면 귀와 무관하게 안 들린다.
 */
const STEPS = [1000, 4000, 8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];

const AGE_HINT: [number, string][] = [
  [17000, '10대 후반~20대 초반 수준으로 들립니다'],
  [15000, '20대 중반 수준입니다'],
  [14000, '30대 수준입니다'],
  [12000, '40대 수준입니다'],
  [10000, '50대 수준입니다'],
  [0, '8kHz 이하만 들린다면 조용한 곳에서 이어폰으로 다시 해보세요'],
];

export default function HearingGame() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [limit, setLimit] = useState<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    const osc = oscRef.current;
    if (ctx && gain && osc) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.02);
      osc.stop(ctx.currentTime + 0.05);
    }
    oscRef.current = null;
    gainRef.current = null;
    setPlaying(false);
  }, []);

  useEffect(() => () => { oscRef.current?.stop(); ctxRef.current?.close(); }, []);

  const play = useCallback((hz: number) => {
    oscRef.current?.stop();
    const Ctx: typeof AudioContext =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') void ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
  }, []);

  const hz = STEPS[index];

  const heard = () => {
    stop();
    if (index + 1 < STEPS.length) {
      setIndex(i => i + 1);
      setLimit(null);
    } else {
      setLimit(hz);
    }
  };

  const notHeard = () => {
    stop();
    setLimit(index === 0 ? 0 : STEPS[index - 1]);
  };

  const restart = () => { stop(); setIndex(0); setLimit(null); };
  const hint = AGE_HINT.find(([min]) => (limit ?? 0) >= min)?.[1] ?? '';

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-6 py-10 text-center">
        <p className="text-sm text-white/70 mb-1">지금 재생 중인 주파수</p>
        <p className="text-5xl font-black tabular-nums">
          {hz >= 1000 ? `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)}k` : hz}
          <span className="text-2xl ml-1">Hz</span>
        </p>
        <p className="text-xs text-white/60 mt-3">{index + 1} / {STEPS.length}단계</p>
      </div>

      {limit === null ? (
        <>
          <button
            onClick={() => (playing ? stop() : play(hz))}
            className="mt-4 w-full rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3.5 text-sm hover:opacity-90 transition-opacity"
          >
            {playing ? '■ 소리 멈추기' : '▶ 이 주파수 들어보기'}
          </button>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={heard}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 text-sm shadow hover:opacity-90 transition-opacity"
            >
              들려요 → 더 높게
            </button>
            <button
              onClick={notHeard}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-cyan-300 transition-colors"
            >
              안 들려요
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">들리는 한계</p>
            <p className="text-3xl font-black text-cyan-600 tabular-nums">
              {limit === 0 ? '1kHz 미만' : `${(limit / 1000).toFixed(limit % 1000 === 0 ? 0 : 1)}kHz`}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{hint}</p>
          </div>
          <button
            onClick={restart}
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-cyan-300 transition-colors"
          >
            처음부터 다시
          </button>
        </>
      )}

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="현재 단계" value={`${index + 1}/${STEPS.length}`} />
        <Stat label="현재 주파수" value={`${hz}Hz`} accent="text-cyan-600" />
        <Stat label="들리는 한계" value={limit === null ? '측정 중' : limit === 0 ? '—' : `${limit}Hz`} accent="text-blue-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">정확히 재려면</p>
        <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>· 이어폰을 쓰세요. 노트북 스피커는 15kHz 위를 거의 못 냅니다 — 귀가 아니라 스피커의 한계입니다.</li>
          <li>· 조용한 곳에서 하세요. 주변 소음이 있으면 높은 소리가 묻힙니다.</li>
          <li>· 볼륨은 낮게 두세요. 크게 들어도 한계는 안 올라가고 귀만 상합니다.</li>
          <li>· 이 결과는 재미로 보는 값이며 청력 검사가 아닙니다. 한쪽만 안 들린다면 이비인후과에 가세요.</li>
        </ul>
      </div>
    </div>
  );
}
