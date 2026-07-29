/**
 * 소리 도구 화면 문구의 세 언어 사전.
 *
 * WebAudio 생성·분석 코드는 한국어 구현을 그대로 쓴다. 주파수·BPM·데시벨은
 * 언어와 무관하므로 프리셋 배열에서는 숫자만 남기고 이름은 여기서 인덱스로 참조한다.
 */
export type SoundLang = 'ko' | 'en' | 'zh';

/** 열 도구가 공유하는 조각 — 재생 버튼, 마이크 게이트, 흔한 라벨 */
export const SOUND_COMMON: Record<SoundLang, {
  play: string; stop: string; volume: string;
  micStart: string; micDenied: string; micFailed: string;
  reset: string; freq: string;
}> = {
  ko: {
    play: '재생', stop: '■ 정지', volume: '볼륨',
    micStart: '마이크 켜기',
    micDenied: '마이크 권한이 거부됐습니다. 주소창의 자물쇠 아이콘에서 허용으로 바꿔 주세요.',
    micFailed: '마이크를 열 수 없습니다. 다른 앱이 쓰고 있는지 확인해 주세요.',
    reset: '기록 초기화', freq: '주파수',
  },
  en: {
    play: 'Play', stop: '■ Stop', volume: 'Volume',
    micStart: 'Turn on the mic',
    micDenied: 'Microphone access was denied. Allow it from the lock icon in the address bar.',
    micFailed: 'Could not open the microphone. Check whether another app is using it.',
    reset: 'Reset the record', freq: 'Frequency',
  },
  zh: {
    play: '播放', stop: '■ 停止', volume: '音量',
    micStart: '开启麦克风',
    micDenied: '麦克风权限被拒绝。请在地址栏的锁形图标里改为允许。',
    micFailed: '无法打开麦克风。请检查是否有其他应用正在使用。',
    reset: '清空记录', freq: '频率',
  },
};

export const METRONOME_UI: Record<SoundLang, {
  tempo: string; tempoNames: string[]; beatSuffix: (n: number) => string;
  start: string; tapBpm: string; note: string;
}> = {
  ko: {
    tempo: '빠르기',
    tempoNames: ['라르고 — 아주 느리게', '아다지오 — 느리게', '안단테 — 걷는 속도로', '모데라토 — 보통 빠르기', '알레그로 — 빠르게', '프레스토 — 아주 빠르게'],
    beatSuffix: n => `${n}박자`, start: '시작', tapBpm: '👆 두드려서 BPM 맞추기',
    note: '박자는 오디오 시계에 미리 예약해 둡니다. 화면이 잠깐 버벅여도 소리 간격은 흔들리지 않습니다. 첫 박은 높은 소리로 나므로 눈을 감고도 몇 박째인지 알 수 있습니다.',
  },
  en: {
    tempo: 'Tempo',
    tempoNames: ['Largo — very slow', 'Adagio — slow', 'Andante — walking pace', 'Moderato — moderate', 'Allegro — fast', 'Presto — very fast'],
    beatSuffix: n => `${n}/4`, start: 'Start', tapBpm: '👆 Tap to find the BPM',
    note: 'Beats are scheduled ahead on the audio clock, so a brief stutter on screen does not shift the timing. The first beat is pitched higher, which means you can follow the count with your eyes closed.',
  },
  zh: {
    tempo: '速度',
    tempoNames: ['Largo — 极慢', 'Adagio — 慢', 'Andante — 行板', 'Moderato — 中速', 'Allegro — 快', 'Presto — 极快'],
    beatSuffix: n => `${n} 拍`, start: '开始', tapBpm: '👆 敲击测出 BPM',
    note: '节拍会提前预约在音频时钟上，画面偶尔卡一下也不会让声音的间隔跑掉。第一拍音更高，所以闭着眼也能数得清是第几拍。',
  },
};

export const TUNER_UI: Record<SoundLang, {
  gate: string; gateNote: string; instruments: string[];
  waiting: string; inTune: string;
  sharpBy: (c: number) => string; flatBy: (c: number) => string;
  note: string; freqLabel: string; errorLabel: string; centsSuffix: (c: number) => string;
  openStrings: string; refA4: string; refA4Note: string; footNote: string;
}> = {
  ko: {
    gate: '악기 소리를 마이크로 들려주면 어떤 음인지, 얼마나 높거나 낮은지 알려줍니다.',
    gateNote: '소리는 브라우저 안에서만 분석되고 어디로도 전송되지 않습니다.',
    instruments: ['기타', '우쿨렐레', '베이스'],
    waiting: '악기 소리를 들려주세요', inTune: '✓ 맞았습니다',
    sharpBy: c => `${c}센트 높습니다 — 줄을 풀어주세요`,
    flatBy: c => `${c}센트 낮습니다 — 줄을 조여주세요`,
    note: '음정', freqLabel: '주파수', errorLabel: '오차', centsSuffix: c => `${c}센트`,
    openStrings: '기준음 듣기 (개방현)', refA4: '기준 A4', refA4Note: 'Hz — 합주 상대와 맞추세요',
    footNote: '센트는 반음을 100으로 나눈 단위입니다. ±5센트 안이면 사람 귀에는 맞은 소리로 들립니다. 줄을 튕긴 직후에는 음이 흔들리므로, 소리가 잦아든 뒤의 값을 보세요.',
  },
  en: {
    gate: 'Play your instrument into the mic and it tells you the note, and how sharp or flat you are.',
    gateNote: 'Audio is analysed inside the browser and is never sent anywhere.',
    instruments: ['Guitar', 'Ukulele', 'Bass'],
    waiting: 'Play a note', inTune: '✓ In tune',
    sharpBy: c => `${c} cents sharp — loosen the string`,
    flatBy: c => `${c} cents flat — tighten the string`,
    note: 'Note', freqLabel: 'Frequency', errorLabel: 'Off by', centsSuffix: c => `${c} cents`,
    openStrings: 'Reference notes (open strings)', refA4: 'A4 reference', refA4Note: 'Hz — match whoever you are playing with',
    footNote: 'A cent is one hundredth of a semitone. Within ±5 cents sounds in tune to the human ear. A string wavers right after you pluck it, so read the value once the note has settled.',
  },
  zh: {
    gate: '把乐器的声音对着麦克风弹一下，它会告诉你这是什么音、高了还是低了多少。',
    gateNote: '声音只在浏览器内分析，不会发送到任何地方。',
    instruments: ['吉他', '尤克里里', '贝斯'],
    waiting: '请弹一个音', inTune: '✓ 准了',
    sharpBy: c => `高了 ${c} 音分 —— 请放松琴弦`,
    flatBy: c => `低了 ${c} 音分 —— 请拧紧琴弦`,
    note: '音名', freqLabel: '频率', errorLabel: '偏差', centsSuffix: c => `${c} 音分`,
    openStrings: '试听标准音（空弦）', refA4: 'A4 基准', refA4Note: 'Hz —— 和合奏的人对齐',
    footNote: '音分是把半音分成 100 份的单位。在 ±5 音分之内，人耳听起来就是准的。拨弦刚开始时音会晃，所以要看声音稳定之后的数值。',
  },
};

export const PITCH_UI: Record<SoundLang, {
  intervals: string[]; levels: string[];
  askInterval: string; replay: string; correct: string; wrongPrefix: string;
  introTitle: string; introNote: string; next: string; start: string;
  scoreLabel: string; rateLabel: string; streakLabel: string;
  note: string;
}> = {
  ko: {
    intervals: ['단2도', '장2도', '단3도', '장3도', '완전4도', '완전5도', '단6도', '장6도', '단7도', '장7도', '옥타브'],
    levels: ['쉬움', '보통', '어려움'],
    askInterval: '두 음의 간격은?', replay: '🔊 다시 듣기', correct: '정답!', wrongPrefix: '아쉽네요 — 정답은 ',
    introTitle: '두 음을 듣고 간격 맞히기', introNote: '기준음은 매번 바뀝니다 — 절대음감이 없어도 됩니다',
    next: '다음 문제', start: '시작하기',
    scoreLabel: '맞힌 문제', rateLabel: '정답률', streakLabel: '연속 정답',
    note: '아는 노래의 첫 두 음으로 외우면 훨씬 빨리 늡니다 — 완전5도는 ‘반짝반짝 작은별’의 처음 두 음, 옥타브는 ‘Somewhere over the rainbow’의 처음 두 음입니다.',
  },
  en: {
    intervals: ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
    levels: ['Easy', 'Normal', 'Hard'],
    askInterval: 'What is the interval?', replay: '🔊 Play again', correct: 'Correct!', wrongPrefix: 'Not quite — it was ',
    introTitle: 'Hear two notes, name the interval', introNote: 'The starting note changes every time — no perfect pitch needed',
    next: 'Next question', start: 'Start',
    scoreLabel: 'Correct', rateLabel: 'Accuracy', streakLabel: 'Streak',
    note: 'Anchoring each interval to the first two notes of a song you know speeds this up a lot — a perfect fifth opens ‘Twinkle, Twinkle, Little Star’, and an octave opens ‘Somewhere Over the Rainbow’.',
  },
  zh: {
    intervals: ['小二度', '大二度', '小三度', '大三度', '纯四度', '纯五度', '小六度', '大六度', '小七度', '大七度', '八度'],
    levels: ['简单', '普通', '困难'],
    askInterval: '这两个音是什么音程？', replay: '🔊 再听一次', correct: '答对了！', wrongPrefix: '差一点 —— 正确答案是 ',
    introTitle: '听两个音，判断音程', introNote: '基准音每次都变 —— 不需要绝对音感',
    next: '下一题', start: '开始',
    scoreLabel: '答对', rateLabel: '正确率', streakLabel: '连对',
    note: '用熟悉歌曲的头两个音来记，进步会快得多 —— 纯五度是《小星星》的头两个音，八度是《Somewhere Over the Rainbow》的头两个音。',
  },
};

export const BPM_TAP_UI: Record<SoundLang, {
  prompt: string; tapCount: string; interval: string; jitter: string;
  again: string; note: string;
}> = {
  ko: {
    prompt: '박자에 맞춰 두드리세요', tapCount: '두드린 횟수', interval: '박자 간격', jitter: '흔들림',
    again: '다시 재기',
    note: '여덟 번쯤 두드리면 값이 안정됩니다. 흔들림이 ±60ms를 넘으면 박자를 놓치고 있다는 뜻이니 한 박씩 크게 세면서 다시 해보세요. 3초 넘게 쉬면 자동으로 새로 셉니다.',
  },
  en: {
    prompt: 'Tap along with the beat', tapCount: 'Taps', interval: 'Beat interval', jitter: 'Jitter',
    again: 'Start over',
    note: 'About eight taps is enough to settle. Jitter over ±60ms means you are drifting off the beat — count out loud and try again. Pause for more than three seconds and it starts a fresh count.',
  },
  zh: {
    prompt: '跟着节奏敲', tapCount: '敲击次数', interval: '节拍间隔', jitter: '抖动',
    again: '重新测',
    note: '敲八次左右数值就稳定了。抖动超过 ±60ms 说明你偏离了节拍，可以大声数着拍子重来。停顿超过 3 秒会自动重新计数。',
  },
};

export const NOISE_UI: Record<SoundLang, {
  kinds: string[]; kindHints: string[];
  smooth: string; autoStop: string; off: string; minSuffix: (n: number) => string;
  stopsIn: (n: number | string) => string; note: string; noteBold: string; noteAfter: string;
}> = {
  ko: {
    kinds: ['화이트', '핑크', '브라운'],
    kindHints: ['모든 대역이 고르게 — 가장 날카롭습니다', '낮은 대역이 조금 강해 자연에 가깝습니다', '저역이 가장 강해 파도 소리 같습니다'],
    smooth: '부드러움 (고역 차단)', autoStop: '자동 정지', off: '끄기', minSuffix: n => `${n}분`,
    stopsIn: n => `${n}분 뒤 자동으로 멈춥니다`,
    note: '주변 소리를 없애는 게 아니라 ', noteBold: '덮어서',
    noteAfter: ' 덜 거슬리게 만드는 방식입니다. 그래서 볼륨을 크게 할 필요가 없고, 대화가 겨우 안 들릴 정도면 충분합니다. 잘 때 오래 크게 틀면 귀에 부담이 되니 자동 정지를 함께 쓰세요.',
  },
  en: {
    kinds: ['White', 'Pink', 'Brown'],
    kindHints: ['Even across all bands — the harshest', 'Slightly stronger lows, closer to nature', 'Strongest lows — like ocean waves'],
    smooth: 'Smoothness (high cut)', autoStop: 'Auto stop', off: 'Off', minSuffix: n => `${n} min`,
    stopsIn: n => `Stops automatically in ${n} minutes`,
    note: 'This does not remove the sounds around you — it ', noteBold: 'covers',
    noteAfter: ' them so they bother you less. That means you do not need it loud; just enough that conversation fades out is plenty. Playing it loud all night is hard on your ears, so use the auto stop.',
  },
  zh: {
    kinds: ['白噪音', '粉噪音', '褐噪音'],
    kindHints: ['各频段均匀 —— 最尖锐', '低频略强，更接近自然', '低频最强，像海浪声'],
    smooth: '柔和度（切高频）', autoStop: '自动停止', off: '关闭', minSuffix: n => `${n} 分钟`,
    stopsIn: n => `${n} 分钟后自动停止`,
    note: '它不是消除周围的声音，而是把它们 ', noteBold: '盖住',
    noteAfter: '，让人不那么在意。所以音量不用开大，刚好听不清说话声就够了。睡觉时长时间大声播放会让耳朵吃力，请配合自动停止使用。',
  },
};

export const BINAURAL_UI: Record<SoundLang, {
  presets: string[]; presetNotes: string[];
  channels: (l: number, r: number) => string; headphones: string;
  beatFreq: string; baseFreq: string;
  disclaimerTitle: string; disclaimer: string;
}> = {
  ko: {
    presets: ['델타 2Hz', '세타 6Hz', '알파 10Hz', '베타 18Hz'],
    presetNotes: ['깊은 수면 대역', '졸림·명상 대역', '편안한 각성 대역', '집중 대역'],
    channels: (l, r) => `왼쪽 ${l}Hz · 오른쪽 ${r}Hz`,
    headphones: '🎧 이어폰이 꼭 필요합니다. 스피커로는 두 소리가 공기 중에서 섞여 맥놀이가 생기지 않습니다.',
    beatFreq: '맥놀이 주파수', baseFreq: '기준 주파수',
    disclaimerTitle: '효과는 아직 분명하지 않습니다',
    disclaimer: '뇌파가 맥놀이 주파수를 따라간다는 주장이 있지만, 연구 결과는 엇갈리고 효과가 있더라도 크지 않다는 쪽이 많습니다. 집중이나 수면에 도움이 된다면 대개는 조용한 소리를 오래 듣는 것 자체의 효과일 수 있습니다. 치료 목적으로 쓰지 마세요.',
  },
  en: {
    presets: ['Delta 2Hz', 'Theta 6Hz', 'Alpha 10Hz', 'Beta 18Hz'],
    presetNotes: ['Deep sleep band', 'Drowsy and meditative', 'Relaxed but awake', 'Focus band'],
    channels: (l, r) => `Left ${l}Hz · right ${r}Hz`,
    headphones: '🎧 Headphones are essential. Through speakers the two tones mix in the air and no beat appears.',
    beatFreq: 'Beat frequency', baseFreq: 'Base frequency',
    disclaimerTitle: 'The effect is still unclear',
    disclaimer: 'There is a claim that brainwaves follow the beat frequency, but the research is mixed and most of it points to a small effect at best. If it does help you focus or sleep, that may simply be the effect of listening to something quiet for a long time. Do not use it as a treatment.',
  },
  zh: {
    presets: ['Delta 2Hz', 'Theta 6Hz', 'Alpha 10Hz', 'Beta 18Hz'],
    presetNotes: ['深睡频段', '困倦与冥想频段', '放松清醒频段', '专注频段'],
    channels: (l, r) => `左 ${l}Hz · 右 ${r}Hz`,
    headphones: '🎧 必须使用耳机。用音箱播放时两个声音会在空气中混在一起，不会产生拍频。',
    beatFreq: '拍频频率', baseFreq: '基准频率',
    disclaimerTitle: '效果目前仍不明确',
    disclaimer: '有说法认为脑波会跟随拍频，但研究结论不一致，多数倾向于即便有效果也很小。如果它确实帮到了专注或睡眠，很可能只是长时间听安静声音本身带来的效果。请勿当作治疗手段。',
  },
};

export const DECIBEL_UI: Record<SoundLang, {
  gate: string; gateNote: string; refs: string[];
  aboutLevel: (label: string) => string;
  now: string; peak: string; avg: string; refsTitle: string; note: string;
}> = {
  ko: {
    gate: '마이크로 주변 소리의 크기를 재서 생활 소음 기준과 견줘 보여줍니다.',
    gateNote: '소리는 브라우저 안에서만 분석되고 저장되지 않습니다.',
    refs: ['아주 조용한 방', '도서관', '조용한 사무실', '보통 대화', '번화가·지하철', '아주 시끄러움'],
    aboutLevel: label => `${label} 정도`,
    now: '현재', peak: '최고', avg: '평균', refsTitle: '기준',
    note: '기기마다 마이크 감도가 달라 절대 소음도(dB SPL)는 잴 수 없습니다. 여기 값은 디지털 최대치를 0으로 둔 상대값이라, 같은 기기에서 소리의 크기를 비교하는 용도로만 쓰세요.',
  },
  en: {
    gate: 'Measures the sound around you through the mic and compares it against everyday noise levels.',
    gateNote: 'Audio is analysed inside the browser and nothing is stored.',
    refs: ['A very quiet room', 'Library', 'Quiet office', 'Normal conversation', 'Busy street or subway', 'Very loud'],
    aboutLevel: label => `about ${label}`,
    now: 'Now', peak: 'Peak', avg: 'Average', refsTitle: 'Reference',
    note: 'Mic sensitivity differs by device, so absolute sound pressure (dB SPL) cannot be measured here. These values are relative, with digital maximum set to 0 — use them only to compare loudness on the same device.',
  },
  zh: {
    gate: '用麦克风测量周围声音的大小，并与日常噪音参照对比。',
    gateNote: '声音只在浏览器内分析，不会保存。',
    refs: ['非常安静的房间', '图书馆', '安静的办公室', '普通交谈', '闹市或地铁', '非常吵'],
    aboutLevel: label => `大约相当于${label}`,
    now: '当前', peak: '峰值', avg: '平均', refsTitle: '参照',
    note: '各设备麦克风灵敏度不同，所以这里测不出绝对声压级（dB SPL）。这些数值以数字满量程为 0 的相对值，只适合在同一台设备上比较声音大小。',
  },
};

export const RECORDER_UI: Record<SoundLang, {
  micDenied: string; micFailed: string;
  recording: string; done: string; idle: string;
  stopRec: string; again: string; startRec: string;
  saveFile: string; nothingToSave: string; listen: string; note: string;
}> = {
  ko: {
    micDenied: '마이크 권한이 거부됐습니다. 주소창의 자물쇠 아이콘에서 허용해 주세요.',
    micFailed: '마이크를 열 수 없습니다.',
    recording: '● 녹음 중', done: '녹음이 끝났습니다', idle: '녹음 버튼을 누르세요',
    stopRec: '■ 녹음 정지', again: '다시 녹음', startRec: '● 녹음 시작',
    saveFile: '⬇ 파일로 저장', nothingToSave: '저장할 녹음 없음', listen: '들어보기',
    note: '녹음은 이 브라우저 안에서만 만들어지고 저장 버튼을 눌러야 기기에 내려받습니다. 서버로 전송되지 않으니 회의 메모나 발음 연습에 써도 됩니다. 탭을 닫으면 녹음도 사라집니다.',
  },
  en: {
    micDenied: 'Microphone access was denied. Allow it from the lock icon in the address bar.',
    micFailed: 'Could not open the microphone.',
    recording: '● Recording', done: 'Recording finished', idle: 'Press record to start',
    stopRec: '■ Stop recording', again: 'Record again', startRec: '● Start recording',
    saveFile: '⬇ Save as a file', nothingToSave: 'Nothing to save', listen: 'Listen back',
    note: 'The recording is created inside this browser and only reaches your device when you press save. Nothing is sent to a server, so meeting notes and pronunciation practice are fine here. Close the tab and the recording is gone.',
  },
  zh: {
    micDenied: '麦克风权限被拒绝。请在地址栏的锁形图标里允许。',
    micFailed: '无法打开麦克风。',
    recording: '● 录音中', done: '录音已结束', idle: '请按录音键',
    stopRec: '■ 停止录音', again: '重新录音', startRec: '● 开始录音',
    saveFile: '⬇ 保存为文件', nothingToSave: '没有可保存的录音', listen: '回放',
    note: '录音只在这个浏览器内生成，只有按下保存才会下载到设备上。它不会发送到服务器，所以会议记录、发音练习都可以用。关掉标签页，录音也就消失了。',
  },
};

export const TONE_UI: Record<SoundLang, {
  waveNotes: Record<string, string>; waveNames: Record<string, string>;
  waveform: string; channel: string; channels: string[];
  playLabel: string; note: string;
}> = {
  ko: {
    waveNotes: { sine: '사인파 — 가장 부드러움', square: '사각파 — 전자음 느낌', triangle: '삼각파 — 사인과 사각의 중간', sawtooth: '톱니파 — 가장 거침' },
    waveNames: { sine: '사인', square: '사각', triangle: '삼각', sawtooth: '톱니' },
    waveform: '파형', channel: '출력 채널', channels: ['양쪽', '왼쪽만', '오른쪽만'],
    playLabel: '소리 내기',
    note: '볼륨 상한을 60%로 제한했습니다. 순수한 사인파는 음악보다 귀에 훨씬 부담이 크고, 특히 높은 주파수를 크게 오래 들으면 청력이 상할 수 있습니다. 들리는 만큼만 키우세요.',
  },
  en: {
    waveNotes: { sine: 'Sine — the smoothest', square: 'Square — an electronic edge', triangle: 'Triangle — between sine and square', sawtooth: 'Sawtooth — the harshest' },
    waveNames: { sine: 'Sine', square: 'Square', triangle: 'Triangle', sawtooth: 'Saw' },
    waveform: 'Waveform', channel: 'Output channel', channels: ['Both', 'Left only', 'Right only'],
    playLabel: 'Play the tone',
    note: 'Volume is capped at 60%. A pure sine tone is far harder on the ears than music, and loud high frequencies over a long stretch can damage your hearing. Turn it up only until you can hear it.',
  },
  zh: {
    waveNotes: { sine: '正弦波 —— 最柔和', square: '方波 —— 电子味', triangle: '三角波 —— 介于正弦与方波之间', sawtooth: '锯齿波 —— 最粗糙' },
    waveNames: { sine: '正弦', square: '方波', triangle: '三角', sawtooth: '锯齿' },
    waveform: '波形', channel: '输出声道', channels: ['两边', '只有左', '只有右'],
    playLabel: '发声',
    note: '音量上限限制在 60%。纯正弦波比音乐更吃耳，尤其是高频长时间大声听可能损伤听力。只调到能听见为止就好。',
  },
};

export const MOSQUITO_UI: Record<SoundLang, {
  ages: string[]; heard: string; check: string; highestHeard: string; note: string;
}> = {
  ko: {
    ages: ['거의 모든 연령대가 들립니다', '30대까지는 대체로 들립니다', '20대 중반까지 들리는 편입니다', '20대 초반까지 들립니다', '10대 후반까지 들립니다', '들린다면 아주 드문 경우입니다'],
    heard: '들림', check: '체크', highestHeard: '들린다고 체크한 가장 높은 소리',
    note: '안 들린다고 해서 문제가 있는 것은 아닙니다. 높은 소리를 감지하는 세포부터 손상되기 때문에 가청 상한이 내려가는 것은 자연스러운 일입니다. 스피커가 그 대역을 못 내는 경우도 많으니 이어폰으로 들어 보세요. 볼륨은 이미 낮게 제한돼 있습니다.',
  },
  en: {
    ages: ['Almost everyone hears this', 'Most people up to their thirties', 'Usually up to the mid-twenties', 'Up to the early twenties', 'Up to the late teens', 'Hearing this is quite rare'],
    heard: 'Heard', check: 'Check', highestHeard: 'Highest tone you marked as heard',
    note: 'Not hearing one does not mean anything is wrong. The cells that pick up high frequencies are the first to wear, so the upper limit dropping is simply normal. Many speakers cannot produce this range at all, so try headphones. The volume is already limited.',
  },
  zh: {
    ages: ['几乎所有年龄都听得到', '三十多岁以内大多听得到', '一般到二十五岁左右', '到二十出头', '到十几岁后期', '能听到的话相当少见'],
    heard: '听到了', check: '勾选', highestHeard: '你标记为听得到的最高频率',
    note: '听不到并不代表有问题。感知高频的细胞最先老化，所以可听上限下降是很自然的事。很多音箱本来就发不出这个频段，建议用耳机试。音量已经做了限制。',
  },
};
