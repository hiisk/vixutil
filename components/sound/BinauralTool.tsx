'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';
import { BINAURAL_UI, SOUND_COMMON, type SoundLang } from '@/lib/sound-ui-intl';

/**
 * 바이노럴 비트 — 좌우에 조금 다른 주파수를 넣는다.
 *
 * 두 소리가 공기 중에서 섞이면 안 되므로 이어폰이 반드시 필요하다. 스피커로
 * 들으면 그냥 두 음이 겹쳐 들릴 뿐 맥놀이가 생기지 않는다.
 */
const PRESETS = [
  { beat: 2 },
  { beat: 6 },
  { beat: 10 },
  { beat: 18 },
];

export default function BinauralTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = BINAURAL_UI[lang];
  const c = SOUND_COMMON[lang];
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
      <div className="rounded-lg bg-sec px-6 py-10 text-center ">
        <p className="text-6xl font-bold tabular-nums">{beat}<span className="text-2xl ml-1">Hz</span></p>
        <p className="text-sm text-white/70 mt-2">
          {ui.channels(base, base + beat)}
        </p>
      </div>

      <div className="note mt-3 ">
        {ui.headphones}
      </div>

      <div className={`${CARD} mt-4 flex flex-col gap-4`}>
        <Slider label={ui.beatFreq} value={beat} min={1} max={30} unit="Hz" onChange={setBeat} accent="accent-teal-500" color="text-teal-600" />
        <Slider label={ui.baseFreq} value={base} min={100} max={500} step={10} unit="Hz" onChange={setBase} accent="accent-teal-500" color="text-teal-600" />
        <Slider label={c.volume} value={volume} min={0} max={60} unit="%" onChange={setVolume} accent="accent-teal-500" color="text-teal-600" />

        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.beat}
              onClick={() => setBeat(p.beat)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                beat === p.beat
                  ? 'border-teal-300 bg-teal-50 dark:bg-teal-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{ui.presets[i]}</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.presetNotes[i]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <PlayButton playing={playing} onToggle={() => setPlaying(p => !p)} label={c.play} lang={lang} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.disclaimerTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.disclaimer}
        </p>
      </div>
    </div>
  );
}
