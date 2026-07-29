'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext, click } from '@/lib/audio';
import { CARD, PlayButton, Slider } from './ui';

/**
 * 메트로놈 — 박자를 미리 예약해 둔다.
 *
 * setInterval로 그때그때 소리를 내면 자바스크립트가 잠깐 밀릴 때마다 박자가
 * 흔들린다. WebAudio는 미래 시각에 소리를 예약할 수 있으므로, 조금 앞을
 * 내다보며 다음 박들을 미리 걸어 둔다 — 오디오 시계는 밀리지 않는다.
 */
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.15;

const TEMPO_NAMES: [number, string][] = [
  [60, '라르고 — 아주 느리게'],
  [76, '아다지오 — 느리게'],
  [108, '안단테 — 걷는 속도로'],
  [120, '모데라토 — 보통 빠르기'],
  [168, '알레그로 — 빠르게'],
  [999, '프레스토 — 아주 빠르게'],
];

export default function MetronomeTool() {
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

  const tempoName = TEMPO_NAMES.find(([max]) => bpm <= max)?.[1] ?? '';

  return (
    <div>
      <div className="rounded-2xl bg-slate-900 px-6 py-10 text-center">
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
        <Slider label="빠르기" value={bpm} min={30} max={240} unit=" BPM" onChange={setBpm} />
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
            {b}박자
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <PlayButton playing={playing} onToggle={() => setPlaying(p => !p)} label="시작" />
        <button
          onClick={tap}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-indigo-300 transition-colors"
        >
          👆 두드려서 BPM 맞추기
        </button>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          박자는 오디오 시계에 미리 예약해 둡니다. 화면이 잠깐 버벅여도 소리 간격은 흔들리지 않습니다.
          첫 박은 높은 소리로 나므로 눈을 감고도 몇 박째인지 알 수 있습니다.
        </p>
      </div>
    </div>
  );
}
