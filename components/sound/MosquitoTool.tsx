'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { CARD } from './ui';

const STEPS = [
  { hz: 15000, age: '거의 모든 연령대가 들립니다' },
  { hz: 16000, age: '30대까지는 대체로 들립니다' },
  { hz: 17000, age: '20대 중반까지 들리는 편입니다' },
  { hz: 18000, age: '20대 초반까지 들립니다' },
  { hz: 19000, age: '10대 후반까지 들립니다' },
  { hz: 20000, age: '들린다면 아주 드문 경우입니다' },
];

export default function MosquitoTool() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [heard, setHeard] = useState<number[]>([]);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => () => oscRef.current?.stop(), []);

  const play = (hz: number) => {
    oscRef.current?.stop();
    if (playing === hz) { setPlaying(null); oscRef.current = null; return; }

    const ctx = audioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    // 고주파는 귀에 부담이 커서 볼륨을 낮게 고정한다
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    setPlaying(hz);
  };

  const toggleHeard = (hz: number) =>
    setHeard(prev => (prev.includes(hz) ? prev.filter(h => h !== hz) : [...prev, hz]));

  const top = heard.length ? Math.max(...heard) : null;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {STEPS.map(s => (
          <div
            key={s.hz}
            className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 transition-colors ${
              playing === s.hz
                ? 'border-lime-300 bg-lime-50 dark:bg-lime-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
            }`}
          >
            <button
              onClick={() => play(s.hz)}
              className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 text-white font-bold text-lg"
            >
              {playing === s.hz ? '■' : '▶'}
            </button>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{(s.hz / 1000).toFixed(0)}kHz</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{s.age}</span>
            </span>
            <button
              onClick={() => toggleHeard(s.hz)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold border transition-colors ${
                heard.includes(s.hz)
                  ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              {heard.includes(s.hz) ? '들림' : '체크'}
            </button>
          </div>
        ))}
      </div>

      {top && (
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 text-white px-6 py-6 text-center">
          <p className="text-sm text-white/70 mb-1">들린다고 체크한 가장 높은 소리</p>
          <p className="text-4xl font-black">{(top / 1000).toFixed(0)}kHz</p>
          <p className="text-sm text-white/80 mt-2">{STEPS.find(s => s.hz === top)?.age}</p>
        </div>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          안 들린다고 해서 문제가 있는 것은 아닙니다. 높은 소리를 감지하는 세포부터 손상되기 때문에
          가청 상한이 내려가는 것은 자연스러운 일입니다. 스피커가 그 대역을 못 내는 경우도 많으니
          이어폰으로 들어 보세요. 볼륨은 이미 낮게 제한돼 있습니다.
        </p>
      </div>
    </div>
  );
}
