'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';
import { TONE_UI, SOUND_COMMON, type SoundLang } from '@/lib/sound-ui-intl';

const WAVES: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth'];
const WAVE_LABEL: Record<string, string> = {
  // 문구는 lib/sound-ui-intl.ts에서 온다
};

const PRESETS = [
  { hz: 100, label: '100Hz' }, { hz: 440, label: '440Hz (A4)' },
  { hz: 1000, label: '1kHz' }, { hz: 8000, label: '8kHz' },
];

export default function ToneTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = TONE_UI[lang];
  const c = SOUND_COMMON[lang];
  const [freq, setFreq] = useState(440);
  const [wave, setWave] = useState<OscillatorType>('sine');
  const [volume, setVolume] = useState(20);
  const [channel, setChannel] = useState<'both' | 'left' | 'right'>('both');
  const [playing, setPlaying] = useState(false);

  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const panRef = useRef<StereoPannerNode | null>(null);

  useEffect(() => () => oscRef.current?.stop(), []);

  useEffect(() => {
    if (!playing) return;
    const ctx = audioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const pan = ctx.createStereoPanner();

    osc.type = wave;
    osc.frequency.value = freq;
    pan.pan.value = channel === 'left' ? -1 : channel === 'right' ? 1 : 0;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    // 정현파를 갑자기 끊으면 "딱" 소리가 난다 — 15ms에 걸쳐 올리고 내린다
    gain.gain.linearRampToValueAtTime(volume / 100 * 0.4, ctx.currentTime + 0.015);

    osc.connect(gain).connect(pan).connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    panRef.current = pan;

    return () => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.015);
      osc.stop(ctx.currentTime + 0.03);
    };
  }, [playing, wave]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const ctx = oscRef.current?.context;
    if (oscRef.current && ctx) oscRef.current.frequency.setTargetAtTime(freq, ctx.currentTime, 0.01);
  }, [freq]);
  useEffect(() => {
    const ctx = gainRef.current?.context;
    if (gainRef.current && ctx) gainRef.current.gain.setTargetAtTime(volume / 100 * 0.4, ctx.currentTime, 0.02);
  }, [volume]);
  useEffect(() => {
    if (panRef.current) panRef.current.pan.value = channel === 'left' ? -1 : channel === 'right' ? 1 : 0;
  }, [channel]);

  return (
    <div>
      <div className="rounded-lg bg-slate-900 px-6 py-10 text-center">
        <p className="text-6xl font-black text-white tabular-nums">
          {freq >= 1000 ? (freq / 1000).toFixed(freq % 1000 === 0 ? 0 : 1) : freq}
          <span className="text-2xl text-white/50 ml-1">{freq >= 1000 ? 'kHz' : 'Hz'}</span>
        </p>
        <p className="text-sm text-white/60 mt-2">{WAVE_LABEL[wave]}</p>
      </div>

      <div className={`${CARD} mt-4 flex flex-col gap-4`}>
        <Slider label={c.freq} value={freq} min={20} max={20000} step={10} unit="Hz" onChange={setFreq} accent="accent-sky-500" color="text-sky-600" />
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.hz}
              onClick={() => setFreq(p.hz)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.waveform}</p>
          <div className="grid grid-cols-4 gap-2">
            {WAVES.map(w => (
              <button
                key={w}
                onClick={() => setWave(w)}
                className={`rounded-xl border py-2.5 text-xs font-bold transition-colors ${
                  wave === w
                    ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {ui.waveNames[w]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.channel}</p>
          <div className="grid grid-cols-3 gap-2">
            {(['both', 'left', 'right'] as const).map((v, i) => (
              <button
                key={v}
                onClick={() => setChannel(v)}
                className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                  channel === v
                    ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {ui.channels[i]}
              </button>
            ))}
          </div>
        </div>

        <Slider label={c.volume} value={volume} min={0} max={60} unit="%" onChange={setVolume} accent="accent-sky-500" color="text-sky-600" />
      </div>

      <div className="mt-4">
        <PlayButton playing={playing} onToggle={() => setPlaying(p => !p)} gradient="from-slate-600 to-sky-600" label={ui.playLabel} lang={lang} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
