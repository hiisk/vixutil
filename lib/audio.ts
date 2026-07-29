/**
 * WebAudio 공통 유틸 — 소리를 파일 없이 만든다.
 *
 * 음원 파일을 얹지 않는 이유는 두 가지다. 정적 배포에 수 MB가 붙는 것도 있지만,
 * 메트로놈이나 기준음처럼 "정확한 값"이 필요한 소리는 계산으로 만드는 편이
 * 오차가 없다. 440Hz는 정말로 440Hz여야 튜너가 의미를 갖는다.
 */

let shared: AudioContext | null = null;

/** 브라우저는 사용자가 화면을 한 번 눌러야 소리를 허용한다 — 그래서 지연 생성한다 */
export function audioContext(): AudioContext {
  const Ctx: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!shared || shared.state === 'closed') shared = new Ctx();
  if (shared.state === 'suspended') void shared.resume();
  return shared;
}

/** 12평균율 음이름 */
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** 주파수를 음이름·옥타브·오차(센트)로 바꾼다 */
export function frequencyToNote(freq: number, a4 = 440): { note: string; octave: number; cents: number; exact: number } {
  // A4를 기준으로 반음 몇 개 떨어졌는지 — 반음은 2의 12제곱근 배다
  const semitones = 12 * Math.log2(freq / a4);
  const rounded = Math.round(semitones);
  const cents = Math.round((semitones - rounded) * 100);

  // A4는 MIDI 69번
  const midi = rounded + 69;
  return {
    note: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    cents,
    exact: a4 * Math.pow(2, rounded / 12),
  };
}

export function noteToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

/**
 * 자기상관으로 기본 주파수를 찾는다.
 *
 * FFT로 가장 센 주파수를 고르면 배음에 속는다 — 기타 6번 줄(82Hz)을 치면
 * 164Hz 쪽이 더 셀 때가 많아 한 옥타브 높게 잡힌다. 파형이 자기 자신과 가장
 * 잘 겹치는 주기를 찾으면 그 함정을 피할 수 있다.
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): number | null {
  const size = buffer.length;

  // 소리가 너무 작으면 잡음에서 아무 주기나 찾아낸다 — 아예 포기한다
  let energy = 0;
  for (const v of buffer) energy += v * v;
  const rms = Math.sqrt(energy / size);
  if (rms < 0.01) return null;

  // 사람 목소리·악기 범위(약 60Hz~1500Hz)만 본다
  const minLag = Math.floor(sampleRate / 1500);
  const maxLag = Math.min(Math.floor(sampleRate / 60), Math.floor(size / 2));

  /*
    정규화한 상관값을 구한 뒤, 최대값의 90% 이상이 되는 "가장 짧은" 주기를 고른다.

    그냥 최대값을 고르면 한 옥타브 아래로 잡힌다 — 주기 T에서 잘 겹치는 파형은
    2T·3T에서도 똑같이 잘 겹치고, 표본이 줄어드는 만큼 값이 조금 더 커지기도
    한다. 기본 주파수는 그중 가장 짧은 주기이므로 앞쪽을 우선한다.
  */
  const scores = new Float32Array(maxLag + 1);
  let best = 0;
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < size - lag; i++) {
      sum += buffer[i] * buffer[i + lag];
      normA += buffer[i] * buffer[i];
      normB += buffer[i + lag] * buffer[i + lag];
    }
    const denom = Math.sqrt(normA * normB);
    const score = denom > 0 ? sum / denom : 0;
    scores[lag] = score;
    if (score > best) best = score;
  }

  if (best < 0.5) return null;

  const threshold = best * 0.9;
  for (let lag = minLag; lag <= maxLag; lag++) {
    // 봉우리의 꼭대기여야 한다 — 오르막 중간을 잡으면 주기가 조금씩 어긋난다
    if (scores[lag] >= threshold && scores[lag] >= scores[lag - 1] && scores[lag] >= scores[lag + 1]) {
      return sampleRate / lag;
    }
  }
  return null;
}

/** 잡음 한 덩어리를 만들어 반복 재생한다 (화이트·핑크·브라운) */
export function createNoiseBuffer(ctx: AudioContext, kind: 'white' | 'pink' | 'brown', seconds = 2): AudioBuffer {
  const length = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (kind === 'white') {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  if (kind === 'brown') {
    // 앞 값에 조금씩 더해 나가면 낮은 대역이 강해진다 — 파도 소리에 가깝다
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    return buffer;
  }

  // 핑크: 여러 개의 느린 성분을 겹쳐 1/f에 가깝게 만든다 (Paul Kellet 근사)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }
  return buffer;
}

/** 짧은 딸깍 소리 — 메트로놈용 */
export function click(ctx: AudioContext, at: number, accent = false) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = accent ? 1600 : 1000;
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.6 : 0.35, at + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + 0.08);
}

/** 소음 레벨을 상대 데시벨로 — 0dBFS가 최대이므로 값은 음수다 */
export function rmsToDb(rms: number): number {
  return 20 * Math.log10(Math.max(rms, 1e-8));
}
