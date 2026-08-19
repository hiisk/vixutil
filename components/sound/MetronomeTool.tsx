'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext, click } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';
import { METRONOME_UI, type SoundLang } from '@/lib/sound-ui-intl';

/**
 * 메트로놈 — 박자를 미리 예약해 둔다.
 *
 * setInterval로 그때그때 소리를 내면 자바스크립트가 잠깐 밀릴 때마다 박자가
 * 흔들린다. WebAudio는 미래 시각에 소리를 예약할 수 있으므로, 조금 앞을
 * 내다보며 다음 박들을 미리 걸어 둔다 — 오디오 시계는 밀리지 않는다.
 */
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.15;

const TEMPO_MAX: number[] = [
  60, 76, 108, 120, 168, 999,
];

export default function MetronomeTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = METRONOME_UI[lang];
  const [bpm, setBpm] = useState(120);
  const [beats, setBeats] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [, setTaps] = useState<number[]>([]);

  const nextTimeRef = useRef(0);
  const beatRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const ctx = audioContext();
    nextTimeRef.current = ctx.currentTime + 0.1;
    beatRef.current = 0;

    const id = window.setInterval(() => {
      const interval = 60 / bpm;
      while (nextTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD) {
        const beat = beatRef.current % beats;
        click(ctx, nextTimeRef.current, beat === 0);
        // 화면 표시는 소리보다 늦게 — 예약 시각에 맞춰 따로 알린다
        const delay = (nextTimeRef.current - ctx.currentTime) * 1000;
        window.setTimeout(() => setCurrent(beat), Math.max(0, delay));
        nextTimeRef.current += interval;
        beatRef.current++;
      }
    }, LOOKAHEAD_MS);

    return () => window.clearInterval(id);
  }, [playing, bpm, beats]);

  const tap = () => {
    const now = performance.now();
    setTaps(prev => {
      const kept = [...prev, now].filter(t => now - t < 3000).slice(-6);
      if (kept.length >= 2) {
        const gaps = kept.slice(1).map((t, i) => t - kept[i]);
        const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        setBpm(Math.min(240, Math.max(30, Math.round(60000 / avg))));
      }
      return kept;
    });
  };

  // 문구는 언어별 사전에서 온다 — 경계 BPM만 여기 남긴다
  const tempoIdx = TEMPO_MAX.findIndex(max => bpm <= max);
  const tempoName = tempoIdx < 0 ? '' : ui.tempoNames[tempoIdx];

  return (
    <div>
      <div className="rounded-lg bg-slate-900 px-6 py-10 text-center">
        <p className="text-6xl font-black text-white tabular-nums">{bpm}</p>
        <p className="text-sm text-white/60 mt-1">BPM · {tempoName}</p>

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: beats }, (_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-75 ${
                playing && current === i
                  ? i === 0 ? 'w-6 h-6 bg-indigo-400' : 'w-5 h-5 bg-white'
                  : 'w-3.5 h-3.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Slider label={ui.tempo} value={bpm} min={30} max={240} unit=" BPM" onChange={setBpm} />
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {[2, 3, 4, 6].map(b => (
          <button
            key={b}
            onClick={() => setBeats(b)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              beats === b
                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.beatSuffix(b)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <PlayButton playing={playing} onToggle={() => setPlaying(p => !p)} label={ui.start} lang={lang} />
        <button
          onClick={tap}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          {ui.tapBpm}
        </button>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
