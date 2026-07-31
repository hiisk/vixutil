// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { AnyLocale10 } from './locales.ts';

/**
 * 소리 도구 화면 문구의 여덟 언어 사전.
 *
 * WebAudio 생성·분석 코드는 한국어 구현을 그대로 쓴다. 주파수·BPM·데시벨은
 * 언어와 무관하므로 프리셋 배열에서는 숫자만 남기고 이름은 여기서 인덱스로 참조한다.
 *
 * 배열은 언어마다 길이와 순서가 같아야 한다 — 인덱스로 짝지으므로 하나를 빼면
 * 그 뒤가 전부 한 칸씩 밀린다.
 */
export type SoundLang = AnyLocale10;

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
  es: {
    play: 'Reproducir', stop: '■ Parar', volume: 'Volumen',
    micStart: 'Encender el micro',
    micDenied: 'Se denegó el acceso al micrófono. Permítelo desde el icono del candado en la barra de direcciones.',
    micFailed: 'No se pudo abrir el micrófono. Comprueba si otra aplicación lo está usando.',
    reset: 'Reiniciar el registro', freq: 'Frecuencia',
  },
  'pt-br': {
    play: 'Tocar', stop: '■ Parar', volume: 'Volume',
    micStart: 'Ligar o microfone',
    micDenied: 'O acesso ao microfone foi negado. Libere pelo ícone do cadeado na barra de endereços.',
    micFailed: 'Não foi possível abrir o microfone. Veja se outro aplicativo está usando.',
    reset: 'Zerar o registro', freq: 'Frequência',
  },
  ja: {
    play: '再生', stop: '■ 停止', volume: '音量',
    micStart: 'マイクをオンにする',
    micDenied: 'マイクの使用が拒否されました。アドレスバーの鍵アイコンから許可してください。',
    micFailed: 'マイクを開けませんでした。ほかのアプリが使っていないか確認してください。',
    reset: '記録をリセット', freq: '周波数',
  },
  de: {
    play: 'Abspielen', stop: '■ Stopp', volume: 'Lautstärke',
    micStart: 'Mikrofon einschalten',
    micDenied: 'Der Zugriff aufs Mikrofon wurde verweigert. Erlaube ihn über das Schloss-Symbol in der Adressleiste.',
    micFailed: 'Das Mikrofon konnte nicht geöffnet werden. Prüfe, ob eine andere App es benutzt.',
    reset: 'Aufzeichnung zurücksetzen', freq: 'Frequenz',
  },
  fr: {
    play: 'Lecture', stop: '■ Arrêt', volume: 'Volume',
    micStart: 'Activer le micro',
    micDenied: 'L’accès au micro a été refusé. Autorise-le depuis l’icône de cadenas dans la barre d’adresse.',
    micFailed: 'Impossible d’ouvrir le micro. Vérifie si une autre application l’utilise.',
    reset: 'Réinitialiser le relevé', freq: 'Fréquence',
  },
  hi: {
    play: 'चलाएँ', stop: '■ रोकें', volume: 'आवाज़',
    micStart: 'माइक चालू करें',
    micDenied: 'माइक की अनुमति नहीं मिली। पता-पट्टी के ताले के चिह्न से अनुमति दें।',
    micFailed: 'माइक खुल नहीं सका। देखें कि कोई दूसरा ऐप उसे इस्तेमाल नहीं कर रहा।',
    reset: 'रिकॉर्ड मिटाएँ', freq: 'आवृत्ति',
  },
  'zh-hans': {
    play: '播放',
    stop: '■ 停止',
    volume: '音量',
    micStart: '打开麦克风',
    micDenied: '麦克风权限被拒了。从地址栏的锁图标里允许。',
    micFailed: '打不开麦克风。看看是不是别的程序正在用。',
    reset: '清除记录',
    freq: '频率',
  },
  'zh-hant': {
    play: '播放',
    stop: '■ 停止',
    volume: '音量',
    micStart: '打開麥克風',
    micDenied: '麥克風權限被拒了。從網址列的鎖圖示裡允許。',
    micFailed: '打不開麥克風。看看是不是別的程式正在用。',
    reset: '清除記錄',
    freq: '頻率',
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
  es: {
    tempo: 'Tempo',
    tempoNames: ['Largo — muy lento', 'Adagio — lento', 'Andante — a paso de marcha', 'Moderato — moderado', 'Allegro — rápido', 'Presto — muy rápido'],
    beatSuffix: n => `${n}/4`, start: 'Empezar', tapBpm: '👆 Toca para hallar los BPM',
    note: 'Los pulsos se programan por adelantado en el reloj de audio, así que un tirón momentáneo en pantalla no desplaza el tiempo. El primer pulso suena más agudo, o sea que puedes seguir la cuenta con los ojos cerrados.',
  },
  'pt-br': {
    tempo: 'Tempo',
    tempoNames: ['Largo — bem lento', 'Adagio — lento', 'Andante — ritmo de caminhada', 'Moderato — moderado', 'Allegro — rápido', 'Presto — bem rápido'],
    beatSuffix: n => `${n}/4`, start: 'Começar', tapBpm: '👆 Bata para descobrir o BPM',
    note: 'Os tempos são agendados de antemão no relógio de áudio, então um engasgo momentâneo na tela não desloca a marcação. O primeiro tempo soa mais agudo, o que deixa você acompanhar a contagem de olhos fechados.',
  },
  ja: {
    tempo: 'テンポ',
    tempoNames: ['ラルゴ — とても遅く', 'アダージョ — 遅く', 'アンダンテ — 歩く速さで', 'モデラート — ふつうの速さ', 'アレグロ — 速く', 'プレスト — とても速く'],
    beatSuffix: n => `${n}拍子`, start: '開始', tapBpm: '👆 叩いてBPMを合わせる',
    note: '拍はオーディオ時計に前もって予約されるので、画面が一瞬つまっても音の間隔はずれません。1拍目は高い音で鳴るため、目を閉じていても何拍目か分かります。',
  },
  de: {
    tempo: 'Tempo',
    tempoNames: ['Largo — sehr langsam', 'Adagio — langsam', 'Andante — Schritttempo', 'Moderato — gemäßigt', 'Allegro — schnell', 'Presto — sehr schnell'],
    beatSuffix: n => `${n}/4`, start: 'Starten', tapBpm: '👆 Antippen, um die BPM zu finden',
    note: 'Die Schläge werden auf der Audio-Uhr vorausgeplant, ein kurzes Stocken auf dem Bildschirm verschiebt das Timing also nicht. Die Eins klingt höher — so folgst du der Zählung auch mit geschlossenen Augen.',
  },
  fr: {
    tempo: 'Tempo',
    tempoNames: ['Largo — très lent', 'Adagio — lent', 'Andante — allure de marche', 'Moderato — modéré', 'Allegro — rapide', 'Presto — très rapide'],
    beatSuffix: n => `${n}/4`, start: 'Démarrer', tapBpm: '👆 Tape pour trouver le BPM',
    note: 'Les temps sont programmés à l’avance sur l’horloge audio : un bref à-coup à l’écran ne décale pas la mesure. Le premier temps est plus aigu, donc tu peux suivre le compte les yeux fermés.',
  },
  hi: {
    tempo: 'गति',
    tempoNames: ['लार्गो — बहुत धीमा', 'अदाजियो — धीमा', 'आंदांते — चलने की चाल', 'मोदेरातो — सामान्य', 'अलेग्रो — तेज़', 'प्रेस्तो — बहुत तेज़'],
    beatSuffix: n => `${n} मात्रा`, start: 'शुरू करें', tapBpm: '👆 थपकी देकर BPM मिलाएँ',
    note: 'मात्राएँ ऑडियो घड़ी पर पहले से तय कर दी जाती हैं, इसलिए स्क्रीन एक पल अटके तो भी आवाज़ का अंतराल नहीं डोलता। पहली मात्रा ऊँचे सुर में बजती है, तो आँख बंद रखकर भी पता चलता है कि कौन-सी मात्रा है।',
  },
  'zh-hans': {
    tempo: '速度',
    tempoNames: ['Largo — 很慢', 'Adagio — 慢', 'Andante — 行板', 'Moderato — 中速', 'Allegro — 快', 'Presto — 很快'],
    beatSuffix: n => `${n}/4拍`,
    start: '开始',
    tapBpm: '👆 敲一敲测BPM',
    note: '节拍是按音频时钟提前排好的，所以画面偶尔卡一下也不会让节奏走位。第一拍音高一些，闭着眼也跟得上拍数。',
  },
  'zh-hant': {
    tempo: '速度',
    tempoNames: ['Largo — 很慢', 'Adagio — 慢', 'Andante — 行板', 'Moderato — 中速', 'Allegro — 快', 'Presto — 很快'],
    beatSuffix: n => `${n}/4拍`,
    start: '開始',
    tapBpm: '👆 敲一敲測BPM',
    note: '節拍是按音訊時鐘提前排好的，所以畫面偶爾卡一下也不會讓節奏走位。第一拍音高一些，閉著眼也跟得上拍數。',
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
  es: {
    gate: 'Toca tu instrumento hacia el micrófono y te dirá la nota, y cuánto estás por encima o por debajo.',
    gateNote: 'El audio se analiza dentro del navegador y no se envía a ningún sitio.',
    instruments: ['Guitarra', 'Ukelele', 'Bajo'],
    waiting: 'Toca una nota', inTune: '✓ Afinado',
    sharpBy: c => `${c} centésimos alto — afloja la cuerda`,
    flatBy: c => `${c} centésimos bajo — tensa la cuerda`,
    note: 'Nota', freqLabel: 'Frecuencia', errorLabel: 'Desviación', centsSuffix: c => `${c} centésimos`,
    openStrings: 'Notas de referencia (cuerdas al aire)', refA4: 'Referencia A4', refA4Note: 'Hz — igualá con quien toques',
    footNote: 'Un centésimo es la centésima parte de un semitono. Dentro de ±5 centésimos el oído humano lo escucha afinado. La cuerda oscila justo después de pulsarla, así que lee el valor cuando la nota se haya asentado.',
  },
  'pt-br': {
    gate: 'Toque seu instrumento no microfone e ele diz a nota, e o quanto você está acima ou abaixo.',
    gateNote: 'O áudio é analisado dentro do navegador e não é enviado a lugar nenhum.',
    instruments: ['Violão', 'Ukulele', 'Baixo'],
    waiting: 'Toque uma nota', inTune: '✓ Afinado',
    sharpBy: c => `${c} cents acima — solte a corda`,
    flatBy: c => `${c} cents abaixo — aperte a corda`,
    note: 'Nota', freqLabel: 'Frequência', errorLabel: 'Desvio', centsSuffix: c => `${c} cents`,
    openStrings: 'Notas de referência (cordas soltas)', refA4: 'Referência A4', refA4Note: 'Hz — iguale com quem estiver tocando',
    footNote: 'Um cent é a centésima parte de um semitom. Dentro de ±5 cents o ouvido humano já escuta afinado. A corda oscila logo depois que você toca, então leia o valor quando a nota assentar.',
  },
  ja: {
    gate: '楽器の音をマイクに聴かせると、どの音か、どれだけ高いか低いかを教えます。',
    gateNote: '音はブラウザの中だけで分析され、どこにも送られません。',
    instruments: ['ギター', 'ウクレレ', 'ベース'],
    waiting: '音を出してください', inTune: '✓ 合っています',
    sharpBy: c => `${c}セント高いです — 弦をゆるめてください`,
    flatBy: c => `${c}セント低いです — 弦を締めてください`,
    note: '音名', freqLabel: '周波数', errorLabel: '誤差', centsSuffix: c => `${c}セント`,
    openStrings: '基準音を聴く（開放弦）', refA4: '基準 A4', refA4Note: 'Hz — 合奏相手と合わせてください',
    footNote: 'セントは半音を100に分けた単位です。±5セント以内なら人の耳には合った音に聞こえます。弦を弾いた直後は音が揺れるので、落ち着いてからの値を見てください。',
  },
  de: {
    gate: 'Spiel dein Instrument ins Mikrofon, und es nennt dir den Ton und wie viel du darüber oder darunter liegst.',
    gateNote: 'Das Audio wird im Browser analysiert und nirgendwohin gesendet.',
    instruments: ['Gitarre', 'Ukulele', 'Bass'],
    waiting: 'Spiel einen Ton', inTune: '✓ Gestimmt',
    sharpBy: c => `${c} Cent zu hoch — Saite lockern`,
    flatBy: c => `${c} Cent zu tief — Saite spannen`,
    note: 'Ton', freqLabel: 'Frequenz', errorLabel: 'Abweichung', centsSuffix: c => `${c} Cent`,
    openStrings: 'Referenztöne (leere Saiten)', refA4: 'A4-Referenz', refA4Note: 'Hz — auf deine Mitspielenden abstimmen',
    footNote: 'Ein Cent ist ein Hundertstel Halbton. Innerhalb von ±5 Cent klingt es fürs menschliche Ohr gestimmt. Direkt nach dem Anschlag schwankt die Saite — lies den Wert, wenn der Ton sich beruhigt hat.',
  },
  fr: {
    gate: 'Joue ton instrument dans le micro et il te dit la note, et de combien tu es trop haut ou trop bas.',
    gateNote: 'L’audio est analysé dans le navigateur et n’est envoyé nulle part.',
    instruments: ['Guitare', 'Ukulélé', 'Basse'],
    waiting: 'Joue une note', inTune: '✓ Juste',
    sharpBy: c => `${c} cents trop haut — détends la corde`,
    flatBy: c => `${c} cents trop bas — tends la corde`,
    note: 'Note', freqLabel: 'Fréquence', errorLabel: 'Écart', centsSuffix: c => `${c} cents`,
    openStrings: 'Notes de référence (cordes à vide)', refA4: 'Référence A4', refA4Note: 'Hz — accorde-toi sur tes partenaires',
    footNote: 'Un cent vaut un centième de demi-ton. À ±5 cents près, l’oreille humaine entend juste. La corde oscille juste après avoir été pincée : lis la valeur une fois la note stabilisée.',
  },
  hi: {
    gate: 'वाद्य की आवाज़ माइक को सुनाइए और यह बताएगा कि कौन-सा सुर है और आप कितने ऊपर या नीचे हैं।',
    gateNote: 'आवाज़ ब्राउज़र के अंदर ही जाँची जाती है और कहीं नहीं भेजी जाती।',
    instruments: ['गिटार', 'युकुलेली', 'बेस'],
    waiting: 'कोई सुर बजाएँ', inTune: '✓ सही है',
    sharpBy: c => `${c} सेंट ऊँचा है — तार ढीला करें`,
    flatBy: c => `${c} सेंट नीचा है — तार कसें`,
    note: 'सुर', freqLabel: 'आवृत्ति', errorLabel: 'अंतर', centsSuffix: c => `${c} सेंट`,
    openStrings: 'आधार सुर सुनें (खुली तारें)', refA4: 'आधार A4', refA4Note: 'Hz — साथ बजाने वालों से मिलाएँ',
    footNote: 'सेंट आधे सुर को सौ भागों में बाँटने की इकाई है। ±5 सेंट के भीतर मनुष्य के कान को सही सुनाई देता है। तार छेड़ने के तुरंत बाद सुर डोलता है, इसलिए आवाज़ ठहरने के बाद का मान देखें।',
  },
  'zh-hans': {
    gate: '对着麦克风弹你的乐器，它会告诉你是哪个音、偏高还是偏低。',
    gateNote: '音频在浏览器里分析，绝不会送到任何地方。',
    instruments: ['吉他', '尤克里里', '贝斯'],
    waiting: '弹一个音',
    inTune: '✓ 准了',
    sharpBy: c => `高了${c}音分 — 把弦放松一点`,
    flatBy: c => `低了${c}音分 — 把弦拧紧一点`,
    note: '音名',
    freqLabel: '频率',
    errorLabel: '偏差',
    centsSuffix: c => `${c}音分`,
    openStrings: '参考音（空弦）',
    refA4: 'A4基准',
    refA4Note: 'Hz — 和同台的人对齐',
    footNote: '一音分是半音的百分之一。在±5音分以内，人耳听着就是准的。刚拨完弦音会晃，等音稳下来再读数。',
  },
  'zh-hant': {
    gate: '對著麥克風彈你的樂器，它會告訴你是哪個音、偏高還是偏低。',
    gateNote: '音訊在瀏覽器裡分析，絕不會送到任何地方。',
    instruments: ['吉他', '烏克麗麗', '貝斯'],
    waiting: '彈一個音',
    inTune: '✓ 準了',
    sharpBy: c => `高了${c}音分 — 把弦放鬆一點`,
    flatBy: c => `低了${c}音分 — 把弦轉緊一點`,
    note: '音名',
    freqLabel: '頻率',
    errorLabel: '偏差',
    centsSuffix: c => `${c}音分`,
    openStrings: '參考音（空弦）',
    refA4: 'A4基準',
    refA4Note: 'Hz — 和同台的人對齊',
    footNote: '一音分是半音的百分之一。在±5音分以內，人耳聽著就是準的。剛撥完弦音會晃，等音穩下來再讀數。',
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
  es: {
    intervals: ['2ª menor', '2ª mayor', '3ª menor', '3ª mayor', '4ª justa', '5ª justa', '6ª menor', '6ª mayor', '7ª menor', '7ª mayor', 'Octava'],
    levels: ['Fácil', 'Normal', 'Difícil'],
    askInterval: '¿Qué intervalo es?', replay: '🔊 Volver a oír', correct: '¡Correcto!', wrongPrefix: 'Casi — era ',
    introTitle: 'Escucha dos notas y di el intervalo', introNote: 'La nota de partida cambia cada vez — no hace falta oído absoluto',
    next: 'Siguiente', start: 'Empezar',
    scoreLabel: 'Aciertos', rateLabel: 'Precisión', streakLabel: 'Racha',
    note: 'Anclar cada intervalo a las dos primeras notas de una canción que conozcas acelera mucho el proceso — una quinta justa abre ‘Twinkle, Twinkle, Little Star’, y una octava abre ‘Somewhere Over the Rainbow’.',
  },
  'pt-br': {
    intervals: ['2ª menor', '2ª maior', '3ª menor', '3ª maior', '4ª justa', '5ª justa', '6ª menor', '6ª maior', '7ª menor', '7ª maior', 'Oitava'],
    levels: ['Fácil', 'Normal', 'Difícil'],
    askInterval: 'Qual é o intervalo?', replay: '🔊 Ouvir de novo', correct: 'Correto!', wrongPrefix: 'Quase — era ',
    introTitle: 'Ouça duas notas e diga o intervalo', introNote: 'A nota de partida muda a cada vez — não precisa de ouvido absoluto',
    next: 'Próxima', start: 'Começar',
    scoreLabel: 'Acertos', rateLabel: 'Precisão', streakLabel: 'Sequência',
    note: 'Ancorar cada intervalo nas duas primeiras notas de uma música que você conhece acelera muito — uma quinta justa abre ‘Twinkle, Twinkle, Little Star’, e uma oitava abre ‘Somewhere Over the Rainbow’.',
  },
  ja: {
    intervals: ['短2度', '長2度', '短3度', '長3度', '完全4度', '完全5度', '短6度', '長6度', '短7度', '長7度', 'オクターブ'],
    levels: ['やさしい', 'ふつう', 'むずかしい'],
    askInterval: '二つの音の間隔は？', replay: '🔊 もう一度聴く', correct: '正解！', wrongPrefix: '残念 — 正解は ',
    introTitle: '二つの音を聴いて間隔を当てる', introNote: '基準音は毎回変わります — 絶対音感は必要ありません',
    next: '次の問題', start: 'はじめる',
    scoreLabel: '正解数', rateLabel: '正答率', streakLabel: '連続正解',
    note: '知っている曲の最初の二音で覚えると上達がずっと早くなります — 完全5度は『きらきら星』の最初の二音、オクターブは『Somewhere over the rainbow』の最初の二音です。',
  },
  de: {
    intervals: ['Kleine Sekunde', 'Große Sekunde', 'Kleine Terz', 'Große Terz', 'Quarte', 'Quinte', 'Kleine Sexte', 'Große Sexte', 'Kleine Septime', 'Große Septime', 'Oktave'],
    levels: ['Leicht', 'Normal', 'Schwer'],
    askInterval: 'Welches Intervall ist das?', replay: '🔊 Nochmal hören', correct: 'Richtig!', wrongPrefix: 'Knapp daneben — es war ',
    introTitle: 'Zwei Töne hören, das Intervall benennen', introNote: 'Der Startton wechselt jedes Mal — absolutes Gehör ist nicht nötig',
    next: 'Nächste Aufgabe', start: 'Los',
    scoreLabel: 'Richtig', rateLabel: 'Treffer', streakLabel: 'Serie',
    note: 'Jedes Intervall an die ersten zwei Töne eines Liedes zu binden, das du kennst, beschleunigt das enorm — eine Quinte eröffnet ‘Twinkle, Twinkle, Little Star’, eine Oktave ‘Somewhere Over the Rainbow’.',
  },
  fr: {
    intervals: ['Seconde mineure', 'Seconde majeure', 'Tierce mineure', 'Tierce majeure', 'Quarte juste', 'Quinte juste', 'Sixte mineure', 'Sixte majeure', 'Septième mineure', 'Septième majeure', 'Octave'],
    levels: ['Facile', 'Normal', 'Difficile'],
    askInterval: 'Quel est l’intervalle ?', replay: '🔊 Réécouter', correct: 'Juste !', wrongPrefix: 'Presque — c’était ',
    introTitle: 'Écoute deux notes, nomme l’intervalle', introNote: 'La note de départ change à chaque fois — pas besoin d’oreille absolue',
    next: 'Question suivante', start: 'Commencer',
    scoreLabel: 'Bonnes réponses', rateLabel: 'Précision', streakLabel: 'Série',
    note: 'Rattacher chaque intervalle aux deux premières notes d’une chanson que tu connais fait gagner beaucoup de temps — une quinte juste ouvre ‘Twinkle, Twinkle, Little Star’, et une octave ouvre ‘Somewhere Over the Rainbow’.',
  },
  hi: {
    intervals: ['लघु द्वितीय', 'शुद्ध द्वितीय', 'लघु तृतीय', 'शुद्ध तृतीय', 'पूर्ण चतुर्थ', 'पूर्ण पंचम', 'लघु षष्ठ', 'शुद्ध षष्ठ', 'लघु सप्तम', 'शुद्ध सप्तम', 'अष्टक'],
    levels: ['आसान', 'सामान्य', 'कठिन'],
    askInterval: 'दो सुरों के बीच कितना अंतर है?', replay: '🔊 फिर सुनें', correct: 'सही!', wrongPrefix: 'नहीं — सही जवाब ',
    introTitle: 'दो सुर सुनकर अंतर बताइए', introNote: 'आधार सुर हर बार बदलता है — पूर्ण श्रवण की ज़रूरत नहीं',
    next: 'अगला सवाल', start: 'शुरू करें',
    scoreLabel: 'सही जवाब', rateLabel: 'सटीकता', streakLabel: 'लगातार सही',
    note: 'हर अंतराल को किसी जानी-पहचानी धुन के पहले दो सुरों से जोड़ लें तो अभ्यास बहुत तेज़ बढ़ता है — पूर्ण पंचम ‘Twinkle, Twinkle, Little Star’ के पहले दो सुर हैं, और अष्टक ‘Somewhere Over the Rainbow’ के।',
  },
  'zh-hans': {
    intervals: ['小二度', '大二度', '小三度', '大三度', '纯四度', '纯五度', '小六度', '大六度', '小七度', '大七度', '八度'],
    levels: ['简单', '普通', '困难'],
    askInterval: '这是什么音程？',
    replay: '🔊 再放一次',
    correct: '对了！',
    wrongPrefix: '差一点 — 答案是',
    introTitle: '听两个音，说出音程',
    introNote: '起始音每次都变 — 不需要绝对音感',
    next: '下一题',
    start: '开始',
    scoreLabel: '答对',
    rateLabel: '正确率',
    streakLabel: '连对',
    note: '把每个音程挂到一首熟歌的开头两个音上，进步会快很多 — 纯五度是《小星星》的开头，八度是《Over the Rainbow》的开头。',
  },
  'zh-hant': {
    intervals: ['小二度', '大二度', '小三度', '大三度', '純四度', '純五度', '小六度', '大六度', '小七度', '大七度', '八度'],
    levels: ['簡單', '普通', '困難'],
    askInterval: '這是什麼音程？',
    replay: '🔊 再放一次',
    correct: '對了！',
    wrongPrefix: '差一點 — 答案是',
    introTitle: '聽兩個音，說出音程',
    introNote: '起始音每次都變 — 不需要絕對音感',
    next: '下一題',
    start: '開始',
    scoreLabel: '答對',
    rateLabel: '正確率',
    streakLabel: '連對',
    note: '把每個音程掛到一首熟歌的開頭兩個音上，進步會快很多 — 純五度是《小星星》的開頭，八度是《Over the Rainbow》的開頭。',
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
  es: {
    prompt: 'Toca al ritmo', tapCount: 'Pulsaciones', interval: 'Intervalo del pulso', jitter: 'Irregularidad',
    again: 'Empezar de nuevo',
    note: 'Con unas ocho pulsaciones el valor se estabiliza. Una irregularidad por encima de ±60ms significa que te estás saliendo del ritmo — cuenta en voz alta y vuelve a intentarlo. Si te detienes más de tres segundos, empieza una cuenta nueva.',
  },
  'pt-br': {
    prompt: 'Bata no ritmo', tapCount: 'Batidas', interval: 'Intervalo do tempo', jitter: 'Irregularidade',
    again: 'Começar de novo',
    note: 'Umas oito batidas já estabilizam o valor. Irregularidade acima de ±60ms quer dizer que você está saindo do ritmo — conte em voz alta e tente de novo. Se parar por mais de três segundos, ele começa uma contagem nova.',
  },
  ja: {
    prompt: '拍に合わせて叩いてください', tapCount: '叩いた回数', interval: '拍の間隔', jitter: 'ばらつき',
    again: '測り直す',
    note: '8回ほど叩くと値が安定します。ばらつきが±60msを超えるのは拍から外れているということなので、1拍ずつ大きく数えながらやり直してみてください。3秒以上休むと自動で数え直します。',
  },
  de: {
    prompt: 'Tippe im Takt mit', tapCount: 'Anschläge', interval: 'Schlagabstand', jitter: 'Schwankung',
    again: 'Neu messen',
    note: 'Etwa acht Anschläge reichen, bis sich der Wert einpendelt. Eine Schwankung über ±60ms heißt, dass du aus dem Takt driftest — zähl laut mit und versuch es nochmal. Nach mehr als drei Sekunden Pause beginnt eine neue Zählung.',
  },
  fr: {
    prompt: 'Tape en suivant le rythme', tapCount: 'Frappes', interval: 'Écart entre les temps', jitter: 'Irrégularité',
    again: 'Recommencer',
    note: 'Une huitaine de frappes suffit à stabiliser la valeur. Une irrégularité au-delà de ±60ms veut dire que tu dérives du rythme — compte à voix haute et reprends. Après plus de trois secondes de pause, un nouveau comptage démarre.',
  },
  hi: {
    prompt: 'लय के साथ थपकी दें', tapCount: 'थपकियाँ', interval: 'मात्रा का अंतराल', jitter: 'डोलाव',
    again: 'दोबारा मापें',
    note: 'आठ-दस थपकी में मान ठहर जाता है। डोलाव ±60ms से ज़्यादा हो तो समझिए आप लय से हट रहे हैं — ज़ोर से गिनते हुए फिर कीजिए। तीन सेकंड से ज़्यादा रुकें तो गिनती नए सिरे से शुरू हो जाती है।',
  },
  'zh-hans': {
    prompt: '跟着拍子敲',
    tapCount: '敲击数',
    interval: '拍间隔',
    jitter: '抖动',
    again: '重新开始',
    note: '大概敲八下就稳住了。抖动超过±60毫秒说明你在偏离拍子 — 出声数着再试一次。停超过三秒就会重新开始计数。',
  },
  'zh-hant': {
    prompt: '跟著拍子敲',
    tapCount: '敲擊數',
    interval: '拍間隔',
    jitter: '抖動',
    again: '重新開始',
    note: '大概敲八下就穩住了。抖動超過±60毫秒說明你在偏離拍子 — 出聲數著再試一次。停超過三秒就會重新開始計數。',
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
  es: {
    kinds: ['Blanco', 'Rosa', 'Marrón'],
    kindHints: ['Parejo en todas las bandas — el más seco', 'Graves algo más fuertes, más cerca de la naturaleza', 'Los graves más fuertes — como las olas'],
    smooth: 'Suavidad (corte de agudos)', autoStop: 'Parada automática', off: 'Apagado', minSuffix: n => `${n} min`,
    stopsIn: n => `Se para solo en ${n} minutos`,
    note: 'Esto no elimina los sonidos de alrededor — los ', noteBold: 'tapa',
    noteAfter: ' para que te molesten menos. Por eso no hace falta ponerlo alto; que la conversación se difumine ya es suficiente. Dejarlo fuerte toda la noche cansa el oído, así que usa la parada automática.',
  },
  'pt-br': {
    kinds: ['Branco', 'Rosa', 'Marrom'],
    kindHints: ['Parelho em todas as faixas — o mais seco', 'Graves um pouco mais fortes, mais perto da natureza', 'Graves mais fortes — como ondas do mar'],
    smooth: 'Suavidade (corte de agudos)', autoStop: 'Parada automática', off: 'Desligado', minSuffix: n => `${n} min`,
    stopsIn: n => `Para sozinho em ${n} minutos`,
    note: 'Isto não elimina os sons ao redor — ele os ', noteBold: 'cobre',
    noteAfter: ' para incomodarem menos. Por isso não precisa ficar alto; basta que a conversa se dilua. Deixar forte a noite toda cansa o ouvido, então use a parada automática.',
  },
  ja: {
    kinds: ['ホワイト', 'ピンク', 'ブラウン'],
    kindHints: ['すべての帯域が均等 — もっとも硬い音', '低域が少し強く、自然の音に近い', '低域がもっとも強く、波の音のよう'],
    smooth: 'なめらかさ（高域カット）', autoStop: '自動停止', off: 'オフ', minSuffix: n => `${n}分`,
    stopsIn: n => `${n}分後に自動で止まります`,
    note: '周りの音を消すのではなく、', noteBold: '覆って',
    noteAfter: '気にならなくする仕組みです。だから大きくする必要はなく、会話がぎりぎり聞こえないくらいで十分です。寝るときに大音量で長時間流すと耳に負担がかかるので、自動停止も一緒に使ってください。',
  },
  de: {
    kinds: ['Weiß', 'Rosa', 'Braun'],
    kindHints: ['Über alle Bänder gleich — am härtesten', 'Etwas kräftigere Tiefen, näher an der Natur', 'Die kräftigsten Tiefen — wie Meereswellen'],
    smooth: 'Weichheit (Höhen absenken)', autoStop: 'Automatisch stoppen', off: 'Aus', minSuffix: n => `${n} Min.`,
    stopsIn: n => `Stoppt automatisch in ${n} Minuten`,
    note: 'Das entfernt die Geräusche um dich herum nicht — es ', noteBold: 'überdeckt',
    noteAfter: ' sie, damit sie weniger stören. Du brauchst es also nicht laut; gerade so, dass Gespräche verschwimmen, reicht. Die ganze Nacht laut zu hören belastet die Ohren — nimm die automatische Abschaltung dazu.',
  },
  fr: {
    kinds: ['Blanc', 'Rose', 'Brun'],
    kindHints: ['Égal sur toutes les bandes — le plus sec', 'Graves un peu plus présents, plus proche de la nature', 'Graves les plus présents — comme les vagues'],
    smooth: 'Douceur (coupe des aigus)', autoStop: 'Arrêt automatique', off: 'Désactivé', minSuffix: n => `${n} min`,
    stopsIn: n => `S’arrête tout seul dans ${n} minutes`,
    note: 'Cela n’enlève pas les sons autour de toi — cela les ', noteBold: 'recouvre',
    noteAfter: ' pour qu’ils dérangent moins. Pas besoin de monter le volume : juste assez pour que les conversations s’estompent suffit. Écouter fort toute la nuit fatigue les oreilles, donc utilise l’arrêt automatique.',
  },
  hi: {
    kinds: ['व्हाइट', 'पिंक', 'ब्राउन'],
    kindHints: ['सभी बैंड में बराबर — सबसे तीखा', 'निचली आवृत्तियाँ ज़रा तेज़, प्रकृति के करीब', 'निचली आवृत्तियाँ सबसे तेज़ — लहरों जैसा'],
    smooth: 'नरमी (ऊँची आवृत्ति कम)', autoStop: 'अपने आप बंद', off: 'बंद', minSuffix: n => `${n} मिनट`,
    stopsIn: n => `${n} मिनट बाद अपने आप रुक जाएगा`,
    note: 'यह आस-पास की आवाज़ें मिटाता नहीं — उन्हें ', noteBold: 'ढककर',
    noteAfter: ' कम खलने वाली बना देता है। इसलिए तेज़ करने की ज़रूरत नहीं; इतना कि बातचीत बस सुनाई न दे, काफ़ी है। सोते समय देर तक तेज़ चलाना कानों पर भारी पड़ता है, इसलिए साथ में अपने आप बंद होने की सेटिंग रखें।',
  },
  'zh-hans': {
    kinds: ['白噪音', '粉噪音', '褐噪音'],
    kindHints: ['各频段一样强 — 最刺耳', '低频稍强，更接近自然', '低频最强 — 像海浪'],
    smooth: '柔和度（切高频）',
    autoStop: '自动停止',
    off: '关',
    minSuffix: n => `${n}分钟`,
    stopsIn: n => `${n}分钟后自动停止`,
    note: '它不是消掉周围的声音，而是把它们',
    noteBold: '盖住',
    noteAfter: '，让它们不那么烦人。所以不用开大声，能把说话声盖过去就够了。整夜开大声对耳朵不好，请用自动停止。',
  },
  'zh-hant': {
    kinds: ['白噪音', '粉紅噪音', '褐色噪音'],
    kindHints: ['各頻段一樣強 — 最刺耳', '低頻稍強，更接近自然', '低頻最強 — 像海浪'],
    smooth: '柔和度（切高頻）',
    autoStop: '自動停止',
    off: '關',
    minSuffix: n => `${n}分鐘`,
    stopsIn: n => `${n}分鐘後自動停止`,
    note: '它不是消掉周圍的聲音，而是把它們',
    noteBold: '蓋住',
    noteAfter: '，讓它們不那麼煩人。所以不用開大聲，能把說話聲蓋過去就夠了。整夜開大聲對耳朵不好，請用自動停止。',
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
  es: {
    presets: ['Delta 2Hz', 'Theta 6Hz', 'Alfa 10Hz', 'Beta 18Hz'],
    presetNotes: ['Banda del sueño profundo', 'Somnolencia y meditación', 'Relajado pero despierto', 'Banda de concentración'],
    channels: (l, r) => `Izquierda ${l}Hz · derecha ${r}Hz`,
    headphones: '🎧 Los auriculares son imprescindibles. Por altavoz los dos tonos se mezclan en el aire y no aparece ningún pulso.',
    beatFreq: 'Frecuencia del pulso', baseFreq: 'Frecuencia base',
    disclaimerTitle: 'El efecto sigue sin estar claro',
    disclaimer: 'Se dice que las ondas cerebrales siguen la frecuencia del pulso, pero los estudios se contradicen y la mayoría apunta a un efecto pequeño como mucho. Si te ayuda a concentrarte o a dormir, puede ser simplemente el efecto de escuchar algo tranquilo durante mucho tiempo. No lo uses como tratamiento.',
  },
  'pt-br': {
    presets: ['Delta 2Hz', 'Theta 6Hz', 'Alfa 10Hz', 'Beta 18Hz'],
    presetNotes: ['Faixa do sono profundo', 'Sonolência e meditação', 'Relaxado mas acordado', 'Faixa de concentração'],
    channels: (l, r) => `Esquerda ${l}Hz · direita ${r}Hz`,
    headphones: '🎧 Fones são indispensáveis. Na caixa de som os dois tons se misturam no ar e nenhum pulso aparece.',
    beatFreq: 'Frequência do pulso', baseFreq: 'Frequência base',
    disclaimerTitle: 'O efeito continua incerto',
    disclaimer: 'Dizem que as ondas cerebrais acompanham a frequência do pulso, mas os estudos se contradizem e a maioria aponta para um efeito pequeno, no máximo. Se ajudar você a focar ou dormir, pode ser simplesmente o efeito de ouvir algo calmo por muito tempo. Não use como tratamento.',
  },
  ja: {
    presets: ['デルタ 2Hz', 'シータ 6Hz', 'アルファ 10Hz', 'ベータ 18Hz'],
    presetNotes: ['深い睡眠の帯域', '眠気・瞑想の帯域', 'リラックスした覚醒', '集中の帯域'],
    channels: (l, r) => `左 ${l}Hz · 右 ${r}Hz`,
    headphones: '🎧 イヤホンが必須です。スピーカーでは二つの音が空気中で混ざってしまい、うなりが生まれません。',
    beatFreq: 'うなりの周波数', baseFreq: '基準周波数',
    disclaimerTitle: '効果はまだはっきりしていません',
    disclaimer: '脳波がうなりの周波数に同調するという主張がありますが、研究結果は分かれており、効果があってもわずかだという見方が多いです。集中や睡眠に役立つと感じるなら、静かな音を長く聴くこと自体の効果かもしれません。治療目的には使わないでください。',
  },
  de: {
    presets: ['Delta 2Hz', 'Theta 6Hz', 'Alpha 10Hz', 'Beta 18Hz'],
    presetNotes: ['Bereich des Tiefschlafs', 'Schläfrig und meditativ', 'Entspannt, aber wach', 'Konzentrationsbereich'],
    channels: (l, r) => `Links ${l}Hz · rechts ${r}Hz`,
    headphones: '🎧 Kopfhörer sind zwingend. Über Lautsprecher mischen sich die beiden Töne in der Luft und es entsteht kein Schweben.',
    beatFreq: 'Schwebungsfrequenz', baseFreq: 'Grundfrequenz',
    disclaimerTitle: 'Die Wirkung ist weiterhin unklar',
    disclaimer: 'Es gibt die Behauptung, Hirnwellen folgten der Schwebungsfrequenz, doch die Forschung ist widersprüchlich und deutet überwiegend auf höchstens einen kleinen Effekt hin. Wenn es dir beim Konzentrieren oder Einschlafen hilft, kann das schlicht daran liegen, dass du lange etwas Ruhiges hörst. Nutze es nicht als Behandlung.',
  },
  fr: {
    presets: ['Delta 2Hz', 'Thêta 6Hz', 'Alpha 10Hz', 'Bêta 18Hz'],
    presetNotes: ['Bande du sommeil profond', 'Somnolence et méditation', 'Détendu mais éveillé', 'Bande de concentration'],
    channels: (l, r) => `Gauche ${l}Hz · droite ${r}Hz`,
    headphones: '🎧 Le casque est indispensable. Sur haut-parleur, les deux tons se mélangent dans l’air et aucun battement n’apparaît.',
    beatFreq: 'Fréquence du battement', baseFreq: 'Fréquence de base',
    disclaimerTitle: 'L’effet reste flou',
    disclaimer: 'On avance que les ondes cérébrales suivent la fréquence du battement, mais la recherche se contredit et pointe surtout un effet faible au mieux. Si cela t’aide à te concentrer ou à dormir, ce peut être simplement l’effet d’écouter quelque chose de calme longtemps. Ne l’utilise pas comme traitement.',
  },
  hi: {
    presets: ['डेल्टा 2Hz', 'थीटा 6Hz', 'अल्फ़ा 10Hz', 'बीटा 18Hz'],
    presetNotes: ['गहरी नींद का दायरा', 'नींद और ध्यान का दायरा', 'शांत पर जागा हुआ', 'एकाग्रता का दायरा'],
    channels: (l, r) => `बाएँ ${l}Hz · दाएँ ${r}Hz`,
    headphones: '🎧 हेडफ़ोन ज़रूरी हैं। स्पीकर पर दोनों आवाज़ें हवा में मिल जाती हैं और कोई धड़कन नहीं बनती।',
    beatFreq: 'धड़कन की आवृत्ति', baseFreq: 'आधार आवृत्ति',
    disclaimerTitle: 'असर अब भी साफ़ नहीं है',
    disclaimer: 'कहा जाता है कि मस्तिष्क तरंगें धड़कन की आवृत्ति के साथ चलने लगती हैं, पर शोध के नतीजे आपस में उलझे हैं और ज़्यादातर यही कहते हैं कि असर हो भी तो बहुत कम है। ध्यान लगाने या सोने में मदद मिलती लगे तो वह शायद देर तक कोई शांत आवाज़ सुनने का ही असर हो। इसे इलाज के तौर पर मत इस्तेमाल कीजिए।',
  },
  'zh-hans': {
    presets: ['δ波 2Hz', 'θ波 6Hz', 'α波 10Hz', 'β波 18Hz'],
    presetNotes: ['深睡频段', '昏沉与冥想', '放松但清醒', '专注频段'],
    channels: (l, r) => `左 ${l}Hz · 右 ${r}Hz`,
    headphones: '🎧 必须戴耳机。用音箱的话两个音在空气里就混了，节拍出不来。',
    beatFreq: '节拍频率',
    baseFreq: '基础频率',
    disclaimerTitle: '有没有效，还不清楚',
    disclaimer: '有说法称脑波会跟着节拍频率走，但研究结果不一致，多数指向的效果都很小。如果它确实帮你专注或入睡，那也可能只是长时间听着安静声音的作用。别拿它当治疗。',
  },
  'zh-hant': {
    presets: ['δ波 2Hz', 'θ波 6Hz', 'α波 10Hz', 'β波 18Hz'],
    presetNotes: ['深睡頻段', '昏沉與冥想', '放鬆但清醒', '專注頻段'],
    channels: (l, r) => `左 ${l}Hz · 右 ${r}Hz`,
    headphones: '🎧 必須戴耳機。用喇叭的話兩個音在空氣裡就混了，節拍出不來。',
    beatFreq: '節拍頻率',
    baseFreq: '基礎頻率',
    disclaimerTitle: '有沒有效，還不清楚',
    disclaimer: '有說法稱腦波會跟著節拍頻率走，但研究結果不一致，多數指向的效果都很小。如果它確實幫你專注或入睡，那也可能只是長時間聽著安靜聲音的作用。別拿它當治療。',
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
  es: {
    gate: 'Mide el sonido de tu alrededor por el micrófono y lo compara con niveles de ruido cotidianos.',
    gateNote: 'El audio se analiza dentro del navegador y no se guarda nada.',
    refs: ['Una habitación muy silenciosa', 'Biblioteca', 'Oficina tranquila', 'Conversación normal', 'Calle concurrida o metro', 'Muy ruidoso'],
    aboutLevel: label => `como ${label}`,
    now: 'Ahora', peak: 'Máximo', avg: 'Media', refsTitle: 'Referencia',
    note: 'La sensibilidad del micrófono cambia según el aparato, así que aquí no se puede medir la presión sonora absoluta (dB SPL). Estos valores son relativos, con el máximo digital puesto en 0 — úsalos solo para comparar volúmenes en el mismo aparato.',
  },
  'pt-br': {
    gate: 'Mede o som ao seu redor pelo microfone e compara com níveis de ruído do dia a dia.',
    gateNote: 'O áudio é analisado dentro do navegador e nada é guardado.',
    refs: ['Um quarto bem silencioso', 'Biblioteca', 'Escritório calmo', 'Conversa normal', 'Rua movimentada ou metrô', 'Muito barulhento'],
    aboutLevel: label => `mais ou menos ${label}`,
    now: 'Agora', peak: 'Pico', avg: 'Média', refsTitle: 'Referência',
    note: 'A sensibilidade do microfone muda de aparelho para aparelho, então aqui não é possível medir a pressão sonora absoluta (dB SPL). Estes valores são relativos, com o máximo digital em 0 — use apenas para comparar volumes no mesmo aparelho.',
  },
  ja: {
    gate: 'マイクで周りの音の大きさを測り、生活騒音の目安と比べて見せます。',
    gateNote: '音はブラウザの中だけで分析され、保存されません。',
    refs: ['とても静かな部屋', '図書館', '静かなオフィス', 'ふつうの会話', '繁華街・地下鉄', 'とてもうるさい'],
    aboutLevel: label => `${label}くらい`,
    now: '現在', peak: '最大', avg: '平均', refsTitle: '目安',
    note: '機種によってマイクの感度が違うため、絶対的な騒音レベル（dB SPL）は測れません。ここの値はデジタル上の最大を0とした相対値なので、同じ端末で音の大きさを比べる用途にだけ使ってください。',
  },
  de: {
    gate: 'Misst über das Mikrofon den Klang um dich herum und vergleicht ihn mit Alltagsgeräuschen.',
    gateNote: 'Das Audio wird im Browser analysiert und nichts wird gespeichert.',
    refs: ['Ein sehr stiller Raum', 'Bibliothek', 'Ruhiges Büro', 'Normales Gespräch', 'Belebte Straße oder U-Bahn', 'Sehr laut'],
    aboutLevel: label => `etwa ${label}`,
    now: 'Jetzt', peak: 'Spitze', avg: 'Mittel', refsTitle: 'Anhaltspunkt',
    note: 'Die Mikrofonempfindlichkeit unterscheidet sich je Gerät, absoluter Schalldruck (dB SPL) lässt sich hier also nicht messen. Diese Werte sind relativ, mit dem digitalen Maximum bei 0 — nutze sie nur, um Lautstärken auf demselben Gerät zu vergleichen.',
  },
  fr: {
    gate: 'Mesure le son autour de toi par le micro et le compare à des niveaux de bruit du quotidien.',
    gateNote: 'L’audio est analysé dans le navigateur et rien n’est conservé.',
    refs: ['Une pièce très calme', 'Bibliothèque', 'Bureau silencieux', 'Conversation normale', 'Rue passante ou métro', 'Très bruyant'],
    aboutLevel: label => `environ ${label}`,
    now: 'Maintenant', peak: 'Crête', avg: 'Moyenne', refsTitle: 'Repère',
    note: 'La sensibilité du micro varie selon l’appareil : la pression acoustique absolue (dB SPL) ne peut pas être mesurée ici. Ces valeurs sont relatives, le maximum numérique valant 0 — sers-t’en seulement pour comparer des volumes sur le même appareil.',
  },
  hi: {
    gate: 'माइक से आस-पास की आवाज़ का स्तर मापकर रोज़ के शोर से तुलना करके दिखाता है।',
    gateNote: 'आवाज़ ब्राउज़र के अंदर ही जाँची जाती है और कुछ सहेजा नहीं जाता।',
    refs: ['बहुत शांत कमरा', 'पुस्तकालय', 'शांत दफ़्तर', 'सामान्य बातचीत', 'भीड़-भाड़ वाली सड़क या मेट्रो', 'बहुत शोर'],
    aboutLevel: label => `${label} जितना`,
    now: 'अभी', peak: 'सर्वोच्च', avg: 'औसत', refsTitle: 'संदर्भ',
    note: 'हर उपकरण में माइक की संवेदनशीलता अलग होती है, इसलिए यहाँ पूर्ण ध्वनि दबाव (dB SPL) नहीं मापा जा सकता। ये मान सापेक्ष हैं, जिनमें डिजिटल अधिकतम को 0 माना गया है — इन्हें सिर्फ़ एक ही उपकरण पर आवाज़ की तुलना के लिए इस्तेमाल कीजिए।',
  },
  'zh-hans': {
    gate: '用麦克风量周围的声音，再和日常噪音等级对照。',
    gateNote: '音频在浏览器里分析，什么都不保存。',
    refs: ['很安静的房间', '图书馆', '安静的办公室', '正常说话', '热闹街道或地铁', '非常吵'],
    aboutLevel: label => `大约是${label}`,
    now: '当前',
    peak: '峰值',
    avg: '平均',
    refsTitle: '参照',
    note: '各设备的麦克风灵敏度不同，所以这里量不出绝对声压（dB SPL）。这些是把数字最大值定为0的相对值 — 只能拿来在同一台设备上比响度。',
  },
  'zh-hant': {
    gate: '用麥克風量周圍的聲音，再和日常噪音等級對照。',
    gateNote: '音訊在瀏覽器裡分析，什麼都不儲存。',
    refs: ['很安靜的房間', '圖書館', '安靜的辦公室', '正常說話', '熱鬧街道或捷運', '非常吵'],
    aboutLevel: label => `大約是${label}`,
    now: '目前',
    peak: '峰值',
    avg: '平均',
    refsTitle: '參照',
    note: '各裝置的麥克風靈敏度不同，所以這裡量不出絕對聲壓（dB SPL）。這些是把數位最大值定為0的相對值 — 只能拿來在同一台裝置上比響度。',
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
  es: {
    micDenied: 'Se denegó el acceso al micrófono. Permítelo desde el icono del candado en la barra de direcciones.',
    micFailed: 'No se pudo abrir el micrófono.',
    recording: '● Grabando', done: 'Grabación terminada', idle: 'Pulsa grabar para empezar',
    stopRec: '■ Parar la grabación', again: 'Grabar otra vez', startRec: '● Empezar a grabar',
    saveFile: '⬇ Guardar como archivo', nothingToSave: 'Nada que guardar', listen: 'Escucharlo',
    note: 'La grabación se crea dentro de este navegador y solo llega a tu aparato cuando pulsas guardar. No se envía nada a un servidor, así que las notas de una reunión o practicar pronunciación están bien aquí. Si cierras la pestaña, la grabación desaparece.',
  },
  'pt-br': {
    micDenied: 'O acesso ao microfone foi negado. Libere pelo ícone do cadeado na barra de endereços.',
    micFailed: 'Não foi possível abrir o microfone.',
    recording: '● Gravando', done: 'Gravação concluída', idle: 'Aperte gravar para começar',
    stopRec: '■ Parar a gravação', again: 'Gravar de novo', startRec: '● Começar a gravar',
    saveFile: '⬇ Salvar como arquivo', nothingToSave: 'Nada para salvar', listen: 'Ouvir',
    note: 'A gravação é criada dentro deste navegador e só chega ao seu aparelho quando você aperta salvar. Nada é enviado a um servidor, então anotações de reunião e treino de pronúncia ficam bem aqui. Se fechar a aba, a gravação desaparece.',
  },
  ja: {
    micDenied: 'マイクの使用が拒否されました。アドレスバーの鍵アイコンから許可してください。',
    micFailed: 'マイクを開けませんでした。',
    recording: '● 録音中', done: '録音が終わりました', idle: '録音ボタンを押してください',
    stopRec: '■ 録音を止める', again: 'もう一度録音', startRec: '● 録音を始める',
    saveFile: '⬇ ファイルとして保存', nothingToSave: '保存する録音がありません', listen: '聴いてみる',
    note: '録音はこのブラウザの中だけで作られ、保存ボタンを押したときに端末へ降ります。サーバーには送られないので、会議メモや発音練習に使っても大丈夫です。タブを閉じると録音も消えます。',
  },
  de: {
    micDenied: 'Der Zugriff aufs Mikrofon wurde verweigert. Erlaube ihn über das Schloss-Symbol in der Adressleiste.',
    micFailed: 'Das Mikrofon konnte nicht geöffnet werden.',
    recording: '● Aufnahme läuft', done: 'Aufnahme beendet', idle: 'Drücke Aufnahme, um zu starten',
    stopRec: '■ Aufnahme stoppen', again: 'Neu aufnehmen', startRec: '● Aufnahme starten',
    saveFile: '⬇ Als Datei speichern', nothingToSave: 'Nichts zu speichern', listen: 'Anhören',
    note: 'Die Aufnahme entsteht nur in diesem Browser und landet erst auf deinem Gerät, wenn du auf Speichern drückst. Nichts geht an einen Server — Besprechungsnotizen und Aussprachetraining sind hier also in Ordnung. Schließt du den Tab, ist die Aufnahme weg.',
  },
  fr: {
    micDenied: 'L’accès au micro a été refusé. Autorise-le depuis l’icône de cadenas dans la barre d’adresse.',
    micFailed: 'Impossible d’ouvrir le micro.',
    recording: '● Enregistrement', done: 'Enregistrement terminé', idle: 'Appuie sur enregistrer pour commencer',
    stopRec: '■ Arrêter l’enregistrement', again: 'Réenregistrer', startRec: '● Lancer l’enregistrement',
    saveFile: '⬇ Sauvegarder en fichier', nothingToSave: 'Rien à sauvegarder', listen: 'Réécouter',
    note: 'L’enregistrement est créé dans ce navigateur et n’arrive sur ton appareil que si tu appuies sur sauvegarder. Rien ne part vers un serveur : notes de réunion et travail de prononciation sont ici sans souci. Ferme l’onglet et l’enregistrement disparaît.',
  },
  hi: {
    micDenied: 'माइक की अनुमति नहीं मिली। पता-पट्टी के ताले के चिह्न से अनुमति दें।',
    micFailed: 'माइक खुल नहीं सका।',
    recording: '● रिकॉर्डिंग चल रही है', done: 'रिकॉर्डिंग पूरी हुई', idle: 'रिकॉर्ड का बटन दबाएँ',
    stopRec: '■ रिकॉर्डिंग रोकें', again: 'फिर रिकॉर्ड करें', startRec: '● रिकॉर्डिंग शुरू करें',
    saveFile: '⬇ फ़ाइल के रूप में सेव करें', nothingToSave: 'सेव करने के लिए कुछ नहीं', listen: 'सुनें',
    note: 'रिकॉर्डिंग इसी ब्राउज़र के अंदर बनती है और सेव दबाने पर ही आपके उपकरण में उतरती है। कुछ भी सर्वर पर नहीं जाता, इसलिए बैठक के नोट या उच्चारण का अभ्यास यहाँ ठीक है। टैब बंद करने पर रिकॉर्डिंग भी चली जाती है।',
  },
  'zh-hans': {
    micDenied: '麦克风权限被拒了。从地址栏的锁图标里允许。',
    micFailed: '打不开麦克风。',
    recording: '● 录音中',
    done: '录音结束',
    idle: '按录音开始',
    stopRec: '■ 停止录音',
    again: '重新录',
    startRec: '● 开始录音',
    saveFile: '⬇ 存成文件',
    nothingToSave: '没有可保存的',
    listen: '放来听',
    note: '录音是在这个浏览器里生成的，只有你按保存时才会落到你的设备上。什么都不送到服务器，所以会议记录和发音练习放这里没问题。关掉标签页，录音就没了。',
  },
  'zh-hant': {
    micDenied: '麥克風權限被拒了。從網址列的鎖圖示裡允許。',
    micFailed: '打不開麥克風。',
    recording: '● 錄音中',
    done: '錄音結束',
    idle: '按錄音開始',
    stopRec: '■ 停止錄音',
    again: '重新錄',
    startRec: '● 開始錄音',
    saveFile: '⬇ 存成檔案',
    nothingToSave: '沒有可儲存的',
    listen: '放來聽',
    note: '錄音是在這個瀏覽器裡產生的，只有你按儲存時才會落到你的裝置上。什麼都不送到伺服器，所以會議記錄和發音練習放這裡沒問題。關掉分頁，錄音就沒了。',
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
  es: {
    waveNotes: { sine: 'Senoidal — la más suave', square: 'Cuadrada — con filo electrónico', triangle: 'Triangular — entre senoidal y cuadrada', sawtooth: 'Diente de sierra — la más áspera' },
    waveNames: { sine: 'Senoidal', square: 'Cuadrada', triangle: 'Triangular', sawtooth: 'Sierra' },
    waveform: 'Forma de onda', channel: 'Canal de salida', channels: ['Ambos', 'Solo izquierdo', 'Solo derecho'],
    playLabel: 'Emitir el tono',
    note: 'El volumen está limitado al 60%. Un tono senoidal puro cansa mucho más el oído que la música, y las frecuencias altas fuertes durante un rato largo pueden dañar tu audición. Súbelo solo hasta que lo oigas.',
  },
  'pt-br': {
    waveNotes: { sine: 'Senoidal — a mais suave', square: 'Quadrada — com um toque eletrônico', triangle: 'Triangular — entre senoidal e quadrada', sawtooth: 'Dente de serra — a mais áspera' },
    waveNames: { sine: 'Senoidal', square: 'Quadrada', triangle: 'Triangular', sawtooth: 'Serra' },
    waveform: 'Forma de onda', channel: 'Canal de saída', channels: ['Ambos', 'Só esquerdo', 'Só direito'],
    playLabel: 'Emitir o tom',
    note: 'O volume está limitado a 60%. Um tom senoidal puro cansa muito mais o ouvido do que música, e frequências altas fortes por um bom tempo podem danificar sua audição. Aumente só até conseguir ouvir.',
  },
  ja: {
    waveNotes: { sine: 'サイン波 — もっともなめらか', square: '矩形波 — 電子音のような響き', triangle: '三角波 — サインと矩形の中間', sawtooth: 'のこぎり波 — もっとも粗い' },
    waveNames: { sine: 'サイン', square: '矩形', triangle: '三角', sawtooth: 'のこぎり' },
    waveform: '波形', channel: '出力チャンネル', channels: ['両方', '左だけ', '右だけ'],
    playLabel: '音を出す',
    note: '音量の上限を60%に制限しています。純粋なサイン波は音楽よりも耳への負担がずっと大きく、とくに高い周波数を大きな音で長く聴くと聴力を損なうことがあります。聞こえる分だけ上げてください。',
  },
  de: {
    waveNotes: { sine: 'Sinus — am weichsten', square: 'Rechteck — mit elektronischer Kante', triangle: 'Dreieck — zwischen Sinus und Rechteck', sawtooth: 'Sägezahn — am schärfsten' },
    waveNames: { sine: 'Sinus', square: 'Rechteck', triangle: 'Dreieck', sawtooth: 'Sägezahn' },
    waveform: 'Wellenform', channel: 'Ausgabekanal', channels: ['Beide', 'Nur links', 'Nur rechts'],
    playLabel: 'Ton abspielen',
    note: 'Die Lautstärke ist auf 60% begrenzt. Ein reiner Sinuston belastet die Ohren deutlich stärker als Musik, und laute hohe Frequenzen über längere Zeit können das Gehör schädigen. Dreh nur so weit auf, bis du ihn hörst.',
  },
  fr: {
    waveNotes: { sine: 'Sinus — la plus douce', square: 'Carré — un côté électronique', triangle: 'Triangle — entre sinus et carré', sawtooth: 'Dent de scie — la plus rugueuse' },
    waveNames: { sine: 'Sinus', square: 'Carré', triangle: 'Triangle', sawtooth: 'Scie' },
    waveform: 'Forme d’onde', channel: 'Canal de sortie', channels: ['Les deux', 'Gauche seulement', 'Droite seulement'],
    playLabel: 'Émettre le son',
    note: 'Le volume est plafonné à 60%. Un son sinusoïdal pur fatigue bien plus l’oreille que la musique, et des aigus forts sur une longue durée peuvent abîmer l’audition. Monte seulement jusqu’à l’entendre.',
  },
  hi: {
    waveNotes: { sine: 'साइन — सबसे नरम', square: 'स्क्वेयर — इलेक्ट्रॉनिक धार', triangle: 'ट्रायंगल — साइन और स्क्वेयर के बीच', sawtooth: 'सॉटूथ — सबसे खुरदुरी' },
    waveNames: { sine: 'साइन', square: 'स्क्वेयर', triangle: 'ट्रायंगल', sawtooth: 'सॉटूथ' },
    waveform: 'तरंग', channel: 'आउटपुट चैनल', channels: ['दोनों', 'सिर्फ़ बायाँ', 'सिर्फ़ दायाँ'],
    playLabel: 'आवाज़ निकालें',
    note: 'आवाज़ की सीमा 60% रखी गई है। शुद्ध साइन तरंग संगीत से कहीं ज़्यादा कानों पर भारी पड़ती है, और ऊँची आवृत्तियाँ तेज़ आवाज़ में देर तक सुनने से सुनने की क्षमता को नुकसान हो सकता है। जितना सुनाई दे उतना ही बढ़ाएँ।',
  },
  'zh-hans': {
    waveNotes: { sine: '正弦 — 最平滑', square: '方波 — 电子感的棱角', triangle: '三角 — 介于正弦和方波之间', sawtooth: '锯齿 — 最刺耳' },
    waveNames: { sine: '正弦', square: '方波', triangle: '三角', sawtooth: '锯齿' },
    waveform: '波形',
    channel: '输出声道',
    channels: ['两边', '只有左', '只有右'],
    playLabel: '播放信号音',
    note: '音量上限压在60%。纯正弦音比音乐伤耳朵得多，长时间大声听高频会损伤听力。开到刚好听得见就够了。',
  },
  'zh-hant': {
    waveNotes: { sine: '正弦 — 最平滑', square: '方波 — 電子感的稜角', triangle: '三角 — 介於正弦和方波之間', sawtooth: '鋸齒 — 最刺耳' },
    waveNames: { sine: '正弦', square: '方波', triangle: '三角', sawtooth: '鋸齒' },
    waveform: '波形',
    channel: '輸出聲道',
    channels: ['兩邊', '只有左', '只有右'],
    playLabel: '播放訊號音',
    note: '音量上限壓在60%。純正弦音比音樂傷耳朵得多，長時間大聲聽高頻會損傷聽力。開到剛好聽得見就夠了。',
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
  es: {
    ages: ['Casi todo el mundo lo oye', 'La mayoría hasta los treinta y tantos', 'Normalmente hasta mediados de los veinte', 'Hasta los primeros veinte', 'Hasta el final de la adolescencia', 'Oír esto es bastante raro'],
    heard: 'Se oye', check: 'Marcar', highestHeard: 'El tono más alto que marcaste como oído',
    note: 'No oír uno no significa que algo vaya mal. Las células que captan las frecuencias altas son las primeras en desgastarse, así que es normal que el límite superior baje. Muchos altavoces no llegan a producir este rango, así que prueba con auriculares. El volumen ya está limitado.',
  },
  'pt-br': {
    ages: ['Quase todo mundo ouve', 'A maioria até os trinta e poucos', 'Normalmente até meados dos vinte', 'Até o começo dos vinte', 'Até o fim da adolescência', 'Ouvir isto é bem raro'],
    heard: 'Ouvi', check: 'Marcar', highestHeard: 'O tom mais alto que você marcou como ouvido',
    note: 'Não ouvir um deles não quer dizer que algo esteja errado. As células que captam frequências altas são as primeiras a desgastar, então é normal o limite superior cair. Muitas caixas de som nem chegam a produzir essa faixa, então tente com fones. O volume já está limitado.',
  },
  ja: {
    ages: ['ほとんどの年齢で聞こえます', '30代まではおおむね聞こえます', '20代半ばまで聞こえることが多いです', '20代前半まで聞こえます', '10代後半まで聞こえます', '聞こえたらかなり稀です'],
    heard: '聞こえた', check: 'チェック', highestHeard: '聞こえたとチェックしたいちばん高い音',
    note: '聞こえないからといって問題があるわけではありません。高い音を拾う細胞から先に傷むので、可聴上限が下がるのは自然なことです。スピーカーがその帯域を出せない場合も多いので、イヤホンで試してみてください。音量はすでに低く制限されています。',
  },
  de: {
    ages: ['Fast alle hören das', 'Die meisten bis Anfang dreißig', 'Meist bis Mitte zwanzig', 'Bis Anfang zwanzig', 'Bis in die späten Teenagerjahre', 'Das noch zu hören ist selten'],
    heard: 'Gehört', check: 'Markieren', highestHeard: 'Der höchste Ton, den du als gehört markiert hast',
    note: 'Einen davon nicht zu hören heißt nicht, dass etwas nicht stimmt. Die Zellen für hohe Frequenzen nutzen sich zuerst ab, ein sinkendes obere Ende ist also einfach normal. Viele Lautsprecher geben diesen Bereich gar nicht her — probiere Kopfhörer. Die Lautstärke ist bereits begrenzt.',
  },
  fr: {
    ages: ['Presque tout le monde l’entend', 'La plupart jusqu’à la trentaine', 'Généralement jusqu’au milieu de la vingtaine', 'Jusqu’au début de la vingtaine', 'Jusqu’à la fin de l’adolescence', 'L’entendre encore est assez rare'],
    heard: 'Entendu', check: 'Cocher', highestHeard: 'Le son le plus aigu que tu as marqué comme entendu',
    note: 'Ne pas en entendre un ne veut pas dire qu’il y a un problème. Les cellules qui captent les aigus s’usent les premières : voir la limite haute descendre est simplement normal. Beaucoup d’enceintes ne produisent même pas cette plage, essaie donc un casque. Le volume est déjà limité.',
  },
  hi: {
    ages: ['लगभग हर उम्र में सुनाई देता है', 'तीस के दशक तक आम तौर पर सुनाई देता है', 'बीस के मध्य तक आम तौर पर', 'बीस की शुरुआत तक', 'किशोरावस्था के अंत तक', 'यह सुनाई देना काफ़ी दुर्लभ है'],
    heard: 'सुनाई दिया', check: 'चिह्नित करें', highestHeard: 'सबसे ऊँची आवाज़ जिसे आपने सुना बताया',
    note: 'कोई एक न सुनाई दे तो इसका मतलब नहीं कि कुछ गड़बड़ है। ऊँची आवाज़ पकड़ने वाली कोशिकाएँ पहले घिसती हैं, इसलिए सुनने की ऊपरी सीमा घटना स्वाभाविक है। कई स्पीकर यह दायरा बजा ही नहीं पाते, इसलिए हेडफ़ोन से आज़माइए। आवाज़ पहले से ही सीमित रखी गई है।',
  },
  'zh-hans': {
    ages: ['几乎所有人都听得到', '三十几岁以下多半听得到', '一般到二十五岁上下', '到二十出头', '到十几岁末', '听得到相当少见'],
    heard: '听到了',
    check: '确认',
    highestHeard: '你标记为听到的最高音',
    note: '听不到某一档并不代表哪里有问题。收高频的细胞最先磨损，上限往下掉本来就是正常的。很多音箱根本发不出这个频段，所以试试耳机。音量已经做了限制。',
  },
  'zh-hant': {
    ages: ['幾乎所有人都聽得到', '三十幾歲以下多半聽得到', '一般到二十五歲上下', '到二十出頭', '到十幾歲末', '聽得到相當少見'],
    heard: '聽到了',
    check: '確認',
    highestHeard: '你標記為聽到的最高音',
    note: '聽不到某一檔並不代表哪裡有問題。收高頻的細胞最先磨損，上限往下掉本來就是正常的。很多喇叭根本發不出這個頻段，所以試試耳機。音量已經做了限制。',
  },
};
