// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { SoundTool } from './sound-tools.ts';
import { SOUND_TOOLS } from './sound-tools.ts';

/**
 * 소리 도구(/sound) 섹션의 영어·중국어 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 바이노럴 비트처럼 효과가 입증되지 않은 것은 세 언어 모두에서 그대로 밝힌다.
 * 영어권 검색어가 훨씬 과장돼 있어서 오히려 여기서 물러설 이유가 없다.
 */
export type SoundIntlLang = 'en';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<SoundIntlLang, Record<string, ToolCopy>> = {
  en: {
    metronome: {
      title: 'Metronome', desc: 'Keeps a steady beat for practice', category: 'Practice',
      metaTitle: 'Online Metronome — Free, Adjustable BPM',
      long: 'Set a BPM and it clicks at exact intervals. Choose a time signature like 4/4 and the first beat gets an accent, so you can hear which beat you are on.',
      features: ['BPM from 30 to 240', 'Accents for 2, 3, 4 and 6 beats', 'Beat shown visually', 'Tap to find the BPM'],
    },
    tuner: {
      title: 'Instrument Tuner', desc: 'Listens through the mic and names the note', category: 'Practice',
      metaTitle: 'Online Guitar Tuner — Free Tuner for Guitar and Ukulele',
      long: 'Play into the mic and it tells you which note it is and how far above or below pitch you are, in cents. You can also listen to the open-string reference notes for guitar, ukulele and bass.',
      features: ['Live note and frequency', 'Error from the reference in cents', 'Open-string references for guitar and ukulele', 'Adjustable A440 reference'],
    },
    pitch: {
      title: 'Interval Ear Training', desc: 'Name the interval between two notes', category: 'Practice',
      metaTitle: 'Interval Ear Training — Practise Relative Pitch Free',
      long: 'It plays two notes in turn and you name the interval between them — a major third, a perfect fifth. You do not need perfect pitch; once you know the distances, chords and melodies get much easier to follow.',
      features: ['Hear an interval and name it', 'Interval range by difficulty', 'Accuracy and streak tracked', 'Replay and check the reference note'],
    },
    'bpm-tap': {
      title: 'BPM Tap Counter', desc: 'Tap along and it works out the tempo', category: 'Practice',
      metaTitle: 'BPM Tap Counter — Find a Song’s Tempo by Tapping',
      long: 'Tap any key along with the music and it calculates beats per minute. About eight taps is enough to settle, and because it weights recent taps it follows a tempo that changes mid-way.',
      features: ['BPM from the gaps between your taps', 'Averaged toward your recent taps', 'Shows how steady your tapping is', 'Open the metronome at the measured BPM'],
    },
    noise: {
      title: 'White Noise Generator', desc: 'Noise to help you focus or sleep', category: 'Focus and sleep',
      metaTitle: 'White Noise Generator — White, Pink and Brown Noise Free',
      long: 'Generates and plays white, pink and brown noise. It masks the sounds around you to help with focus or sleep; brown noise, with its stronger low end, is closest to ocean waves and easiest on the ears.',
      features: ['White, pink or brown', 'Volume plus low and high adjustment', 'Stops itself after a timer', 'Plays instantly — no file to download'],
    },
    binaural: {
      title: 'Binaural Beats', desc: 'A beat made from two slightly different tones', category: 'Focus and sleep',
      metaTitle: 'Binaural Beats Generator — Delta, Theta, Alpha and Beta',
      long: 'Play slightly different frequencies into your left and right ear and you perceive a slow beat at the difference between them. Headphones are essential, and the scientific evidence for any effect is still unclear.',
      features: ['Adjustable base frequency and difference', 'Delta, theta, alpha and beta presets', 'Separate left and right channels', 'Tells you headphones are required'],
    },
    decibel: {
      title: 'Sound Level Meter', desc: 'See how loud it is around you', category: 'Measure',
      metaTitle: 'Sound Level Meter — Check Noise With Your Mic',
      long: 'Shows the level of what comes through your mic in relative decibels. Compare against references like a library, conversation or a subway to gauge where you are. Mics differ by device, so this is not an absolute measurement.',
      features: ['Live noise level', 'Peak and average recorded', 'Compared against everyday noise', 'Notes on device calibration'],
    },
    recorder: {
      title: 'Voice Recorder', desc: 'Record, listen back and save a file', category: 'Measure',
      metaTitle: 'Online Voice Recorder — Record and Save in the Browser',
      long: 'Record with nothing installed, listen back straight away and download the file. Recording happens inside the browser and is never sent to a server, so meeting notes or pronunciation practice are safe here.',
      features: ['Record, pause and play back', 'Waveform while recording', 'Save as a file', 'Choose the mic device'],
    },
    tone: {
      title: 'Tone Generator', desc: 'Make a sound at any pitch you want', category: 'Signals',
      metaTitle: 'Online Tone Generator — Play Any Hz Sine Wave',
      long: 'Generates any frequency from 20Hz to 20kHz. Sine, square and sawtooth waves are all available, which makes it useful for checking speakers, giving an instrument a reference note, or simple experiments.',
      features: ['20Hz to 20kHz slider', 'Sine, square, triangle and sawtooth', 'Choose left or right channel', 'Guidance on safe volume'],
    },
    mosquito: {
      title: 'Mosquito Tone', desc: 'High frequencies you stop hearing with age', category: 'Signals',
      metaTitle: 'Mosquito Tone — Listen to a 17kHz High Frequency',
      long: 'Frequencies around 17kHz become harder to hear as you get older. It is called a mosquito tone because supposedly only teenagers hear it — play through the frequencies and find where yours stops.',
      features: ['15k to 20kHz in steps', 'Typical range by age', 'Volume limited for safety', 'Headphones recommended'],
    },
  },
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function soundToolsIntl(lang: SoundIntlLang): SoundTool[] {
  return SOUND_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findSoundToolIntl(lang: SoundIntlLang, slug: string): SoundTool | undefined {
  return soundToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedSoundToolsIntl(lang: SoundIntlLang, slug: string, count = 4): SoundTool[] {
  const all = soundToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const SOUND_SHELL_UI: Record<SoundIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Sound tools',
    canDo: 'What this tool does', others: 'Other sound tools',
    notice: '🔊 Sound is generated in the browser. Mic audio is never uploaded.',
    footNote: 'Start at a low volume — high frequencies and loud tones can damage your hearing.',
  },
};
