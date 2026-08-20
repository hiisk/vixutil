'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext, createNoiseBuffer } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';
import { NOISE_UI, SOUND_COMMON, type SoundLang } from '@/lib/sound-ui-intl';

const KINDS = [
  { id: 'white' as const },
  { id: 'pink' as const },
  { id: 'brown' as const },
] as const;
type Kind = (typeof KINDS)[number]['id'];

const TIMERS = [0, 15, 30, 60];

export default function NoiseTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = NOISE_UI[lang];
  const c = SOUND_COMMON[lang];
  const [kind, setKind] = useState<Kind>('brown');
  const [volume, setVolume] = useState(25);
  const [tone, setTone] = useState(6000);
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [left, setLeft] = useState(0);

  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const stop = () => {
    sourceRef.current?.stop();
    sourceRef.current = null;
    setPlaying(false);
    setLeft(0);
  };

  useEffect(() => () => sourceRef.current?.stop(), []);

  useEffect(() => {
    if (!playing) return;
    const ctx = audioContext();
    const src = ctx.createBufferSource();
    src.buffer = createNoiseBuffer(ctx, kind, 3);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = tone;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    // 갑자기 켜면 놀란다 — 0.4초에 걸쳐 올린다
    gain.gain.linearRampToValueAtTime(volume / 100 * 0.5, ctx.currentTime + 0.4);

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    sourceRef.current = src;
    gainRef.current = gain;
    filterRef.current = filter;

    return () => { src.stop(); };
  }, [playing, kind]); // eslint-disable-line react-hooks/exhaustive-deps

  // 볼륨·음색은 재생 중에도 바로 반영한다 (다시 만들지 않는다)
  useEffect(() => {
    const ctx = gainRef.current?.context;
    if (gainRef.current && ctx) gainRef.current.gain.setTargetAtTime(volume / 100 * 0.5, ctx.currentTime, 0.05);
  }, [volume]);
  useEffect(() => {
    const ctx = filterRef.current?.context;
    if (filterRef.current && ctx) filterRef.current.frequency.setTargetAtTime(tone, ctx.currentTime, 0.05);
  }, [tone]);

  // 타이머
  useEffect(() => {
    if (!playing || timer === 0) return;
    const endAt = Date.now() + timer * 60000;
    const id = window.setInterval(() => {
      const remain = endAt - Date.now();
      if (remain <= 0) { stop(); return; }
      setLeft(Math.ceil(remain / 60000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, timer]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {KINDS.map((k, i) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={`rounded-xl border px-3 py-3 text-center transition-colors ${
              kind === k.id
                ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span className="block text-sm font-bold">{ui.kinds[i]}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 text-center">
        {ui.kindHints[KINDS.findIndex(k => k.id === kind)]}
      </p>

      <div className={`${CARD} mt-4 flex flex-col gap-4`}>
        <Slider label={c.volume} value={volume} min={0} max={100} unit="%" onChange={setVolume} accent="accent-sky-500" color="text-sky-600" />
        <Slider label={ui.smooth} value={tone} min={500} max={16000} step={100} unit="Hz" onChange={setTone} accent="accent-sky-500" color="text-sky-600" />
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.autoStop}</p>
          <div className="grid grid-cols-4 gap-2">
            {TIMERS.map(t => (
              <button
                key={t}
                onClick={() => setTimer(t)}
                className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                  timer === t
                    ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t === 0 ? ui.off : ui.minSuffix(t)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <PlayButton playing={playing} onToggle={() => (playing ? stop() : setPlaying(true))} label={c.play} lang={lang} />
      </div>
      {playing && timer > 0 && (
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">{ui.stopsIn(left || timer)}</p>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}<b className="text-slate-800 dark:text-slate-100">{ui.noteBold}</b>{ui.noteAfter}
        </p>
      </div>
    </div>
  );
}
