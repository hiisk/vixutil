'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';

/**
 * 바이노럴 비트 — 좌우에 조금 다른 주파수를 넣는다.
 *
 * 두 소리가 공기 중에서 섞이면 안 되므로 이어폰이 반드시 필요하다. 스피커로
 * 들으면 그냥 두 음이 겹쳐 들릴 뿐 맥놀이가 생기지 않는다.
 */
const PRESETS = [
  { beat: 2, label: '델타 2Hz', note: '깊은 수면 대역' },
  { beat: 6, label: '세타 6Hz', note: '졸림·명상 대역' },
  { beat: 10, label: '알파 10Hz', note: '편안한 각성 대역' },
  { beat: 18, label: '베타 18Hz', note: '집중 대역' },
];

export default function BinauralTool() {
  const [base, setBase] = useState(200);
  const [beat, setBeat] = useState(10);
  const [volume, setVolume] = useState(25);
  const [playing, setPlaying] = useState(false);

  const nodesRef = useRef<{ left: OscillatorNode; right: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => () => { nodesRef.current?.left.stop(); nodesRef.current?.right.stop(); }, []);

  useEffect(() => {
    if (!playing) return;
    const ctx = audioContext();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume / 100 * 0.3, ctx.currentTime + 0.3);
    gain.connect(ctx.destination);

    const make = (freq: number, pan: number) => {
      const osc = ctx.createOscillator();
      const panner = ctx.createStereoPanner();
      osc.type = 'sine';
      osc.frequency.value = freq;
      panner.pan.value = pan;
      osc.connect(panner).connect(gain);
      osc.start();
      return osc;
    };

    const left = make(base, -1);
    const right = make(base + beat, 1);
    nodesRef.current = { left, right, gain };

    return () => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      left.stop(ctx.currentTime + 0.25);
      right.stop(ctx.currentTime + 0.25);
    };
  }, [playing, base, beat]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const nodes = nodesRef.current;
    const ctx = nodes?.gain.context;
    if (nodes && ctx) nodes.gain.gain.setTargetAtTime(volume / 100 * 0.3, ctx.currentTime, 0.05);
  }, [volume]);

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 px-6 py-10 text-center text-white">
        <p className="text-6xl font-black tabular-nums">{beat}<span className="text-2xl ml-1">Hz</span></p>
        <p className="text-sm text-white/70 mt-2">
          왼쪽 {base}Hz · 오른쪽 {base + beat}Hz
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 mt-3 text-xs text-amber-800 dark:text-amber-200 text-center">
        🎧 이어폰이 꼭 필요합니다. 스피커로는 두 소리가 공기 중에서 섞여 맥놀이가 생기지 않습니다.
      </div>

      <div className={`${CARD} mt-4 flex flex-col gap-4`}>
        <Slider label="맥놀이 주파수" value={beat} min={1} max={30} unit="Hz" onChange={setBeat} accent="accent-teal-500" color="text-teal-600" />
        <Slider label="기준 주파수" value={base} min={100} max={500} step={10} unit="Hz" onChange={setBase} accent="accent-teal-500" color="text-teal-600" />
        <Slider label="볼륨" value={volume} min={0} max={60} unit="%" onChange={setVolume} accent="accent-teal-500" color="text-teal-600" />

        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.beat}
              onClick={() => setBeat(p.beat)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                beat === p.beat
                  ? 'border-teal-300 bg-teal-50 dark:bg-teal-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{p.label}</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <PlayButton playing={playing} onToggle={() => setPlaying(p => !p)} gradient="from-teal-500 to-indigo-600" label="재생" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">효과는 아직 분명하지 않습니다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          뇌파가 맥놀이 주파수를 따라간다는 주장이 있지만, 연구 결과는 엇갈리고 효과가 있더라도 크지
          않다는 쪽이 많습니다. 집중이나 수면에 도움이 된다면 대개는 조용한 소리를 오래 듣는 것 자체의
          효과일 수 있습니다. 치료 목적으로 쓰지 마세요.
        </p>
      </div>
    </div>
  );
}
