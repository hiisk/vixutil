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
export type SoundIntlLang = 'en' | 'zh';

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
  zh: {
    metronome: {
      title: '节拍器', desc: '为练习稳定地打拍子', category: '演奏与练习',
      metaTitle: '在线节拍器 — 免费，可调 BPM',
      long: '设定 BPM 后，它会按精确的间隔发出节拍声。选好四四拍这类拍号，第一拍会加重音，靠耳朵就能知道现在是第几拍。',
      features: ['BPM 30~240 可调', '2／3／4／6 拍重音', '节拍可视化显示', '敲击测出 BPM'],
    },
    tuner: {
      title: '乐器调音器', desc: '用麦克风听音并报出音名', category: '演奏与练习',
      metaTitle: '在线调音器 — 吉他、尤克里里免费调音',
      long: '对着麦克风弹一下，它会告诉你这是什么音，以及比标准音高了还是低了多少音分。吉他、尤克里里、贝斯的空弦标准音也可以直接听。',
      features: ['实时显示音名与频率', '与标准音的偏差（音分）', '吉他、尤克里里空弦标准音', '可调 A440 基准'],
    },
    pitch: {
      title: '音程听辨训练', desc: '听两个音，说出它们的关系', category: '演奏与练习',
      metaTitle: '音程听辨训练 — 免费练相对音高',
      long: '它会依次播放两个音，你来判断它们之间的音程（大三度、纯五度等）。不需要绝对音感，只要熟悉了音之间的距离，和弦与旋律就好听懂多了。',
      features: ['听音程并作答', '按难度调整音程范围', '记录正确率与连对', '可重听并确认基准音'],
    },
    'bpm-tap': {
      title: 'BPM 测速', desc: '跟着节奏敲，算出速度', category: '演奏与练习',
      metaTitle: 'BPM 测速 — 敲击测出歌曲速度',
      long: '跟着音乐随便敲键盘，它就会算出每分钟拍数（BPM）。大约敲八次数值就稳定了，而且它以最近的几拍为主，所以中途变速也跟得上。',
      features: ['按敲击间隔计算 BPM', '以最近几拍为主取平均', '显示敲击的稳定程度', '用测得的 BPM 打开节拍器'],
    },
    noise: {
      title: '白噪音', desc: '帮助专注与入睡的噪音', category: '专注与睡眠',
      metaTitle: '白噪音 — 免费播放白／粉／褐噪音',
      long: '生成并播放白噪音、粉噪音、褐噪音三种。它靠盖住周围的声音来帮助专注或入睡；低频更强的褐噪音最接近海浪声，听久了也不太累耳。',
      features: ['白／粉／褐噪音可选', '可调音量与高低频', '定时后自动停止', '无需下载文件，即刻播放'],
    },
    binaural: {
      title: '双耳节拍', desc: '左右耳频率略有差异形成的拍频', category: '专注与睡眠',
      metaTitle: '双耳节拍 — Delta、Theta、Alpha、Beta',
      long: '给左右耳送入略有差异的频率，你会感觉到一个等于差值的缓慢拍频。必须戴耳机，而且关于其效果的科学依据目前仍不明确。',
      features: ['可调基准频率与差值', 'Delta／Theta／Alpha／Beta 预设', '左右声道分离播放', '提示必须使用耳机'],
    },
    decibel: {
      title: '噪音测量', desc: '看看周围有多吵', category: '测量',
      metaTitle: '噪音测量 — 用麦克风查看环境噪音',
      long: '把麦克风收到的声音大小以相对分贝显示。可以和图书馆、交谈、地铁这些参照对比，估个大概。各设备麦克风不同，所以这不是绝对值。',
      features: ['实时显示噪音等级', '记录峰值与平均值', '与日常噪音参照对比', '附设备校准说明'],
    },
    recorder: {
      title: '录音机', desc: '录下来听，并保存成文件', category: '测量',
      metaTitle: '在线录音机 — 在浏览器里直接录音并保存',
      long: '无需安装即可录音，马上回放并下载文件。录音只在浏览器内处理，不会传到服务器，所以会议记录或发音练习都可以放心用。',
      features: ['录音、暂停与回放', '录音时显示波形', '保存为文件', '可选择麦克风设备'],
    },
    tone: {
      title: '频率发生器', desc: '生成任意音高的声音', category: '信号音',
      metaTitle: '在线频率发生器 — 播放任意 Hz 正弦波',
      long: '生成 20Hz 到 20kHz 之间任意频率的声音。可以选正弦波、方波、锯齿波，用来检查音箱、给乐器一个基准音，或做些简单实验。',
      features: ['20Hz~20kHz 滑块', '正弦／方／三角／锯齿波', '可选左右声道', '附安全音量说明'],
    },
    mosquito: {
      title: '蚊子音', desc: '年纪越大越听不见的高频', category: '信号音',
      metaTitle: '蚊子音 — 试听 17kHz 高频',
      long: '17kHz 上下的高频，随着年龄增长会越来越听不见。因为据说只有青少年听得到，所以被叫做蚊子音 —— 逐个频率试听，看看自己能听到哪儿。',
      features: ['15k~20kHz 分段播放', '各年龄段的大致范围', '音量做了安全限制', '建议使用耳机'],
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
  zh: {
    home: '首页', section: '声音工具',
    canDo: '这个工具能做什么', others: '其他声音工具',
    notice: '🔊 声音在浏览器内生成，麦克风的声音不会上传。',
    footNote: '请从小音量开始 —— 高频与大音量都可能损伤听力。',
  },
};
