/**
 * 음악 이론 섹션의 화면 문구 — 여덟 언어.
 *
 * FAQ와 메타 설명은 135장 × 8언어 = 1080벌이라 손으로 쓸 수 없다. 항목의 사실
 * (이름·구성음·기호·주파수)만 받아 문장을 조립한다 — 숫자가 계산에서 오므로
 * 틀릴 수 없고, 항목을 더해도 문구를 다시 쓰지 않는다.
 */
import { alternates8, type L8, type Lang8 } from '../i18n/lang8.ts';

export interface FaqItem { q: string; a: string }

/** 문구를 만들 때 필요한 항목의 사실 */
export interface ItemFacts {
  title: string;
  /** Cmaj7 같은 만국 공통 기호 */
  symbol: string;
  /** 그 언어 표기의 구성음 */
  notes: string[];
  /** 밑음에서의 반음 거리 */
  steps: number[];
  /** 종류 이름 — "코드"·"음계" */
  kindWord: string;
  /** 어떤 소리인지 한 줄 */
  feel: string;
  /** 가장 낮은 음의 주파수 */
  hz: number;
}

export interface MusicUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 허브의 묶음 머리말 */
  chordGroup: string;
  scaleGroup: string;
  intervalGroup: string;
  notesLabel: string;
  stepsLabel: string;
  symbolLabel: string;
  hzLabel: string;
  degreeLabel: string;
  keyboardLabel: string;
  playLabel: string;
  stopLabel: string;
  relatedLabel: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  countLabel: (n: number) => string;
  semitone: (n: number) => string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ItemFacts) => string;
  metaDesc: (f: ItemFacts) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: ItemFacts) => FaqItem[];
}

const ko: MusicUI = {
  home: '홈',
  section: '음악 이론',
  hubTitle: '코드·음계·음정 사전',
  hubLead: '코드 구성음과 음계, 음정을 건반 그림과 소리로 확인하세요. 밑음 열두 개 × 성질 여덟 가지를 모두 담았습니다',
  chordGroup: '코드',
  scaleGroup: '음계와 선법',
  intervalGroup: '음정',
  notesLabel: '구성음',
  stepsLabel: '반음 간격',
  symbolLabel: '코드 기호',
  hzLabel: '주파수',
  degreeLabel: '계이름',
  keyboardLabel: '건반에서의 자리',
  playLabel: '들어보기',
  stopLabel: '멈추기',
  relatedLabel: '가까운 코드·음계',
  howTitle: '읽는 방법',
  how: [
    '구성음은 밑음에서 몇 반음 떨어졌는지로 정해집니다. 메이저는 0·4·7, 마이너는 0·3·7입니다.',
    '건반 그림에서 색이 든 건반이 그 코드의 음입니다. 낮은 음부터 왼쪽에 놓았습니다.',
    '들어보기를 누르면 실제 주파수로 소리를 냅니다. 소리는 브라우저에서 만들고 아무것도 내려받지 않습니다.',
    '음 이름은 나라마다 다릅니다. 독일에서는 B를 H로 쓰고, 스페인·프랑스에서는 도·레·미로 부릅니다.',
  ],
  faqTitle: '자주 묻는 질문',
  countLabel: n => `${n}개 음`,
  semitone: n => `${n}반음`,
  hubMetaTitle: '코드 구성음·음계·음정 사전 — 건반 그림과 소리로',
  hubMetaDesc: '메이저·마이너·세븐스 등 코드 96가지와 음계 27가지, 음정 12가지의 구성음을 건반 그림으로 보여 주고 실제 주파수로 들려줍니다. 독일식 H 표기와 도레미 표기를 함께 다룹니다.',
  metaTitle: f => `${f.title} 구성음`,
  metaDesc: f =>
    `${f.title}(${f.symbol})의 구성음은 ${f.notes.join(' · ')}입니다. 밑음에서 ${f.steps.join('·')}반음 떨어진 ${f.notes.length}개 음이고, 건반 그림과 소리로 확인할 수 있습니다.`,
  hubFaq: [
    {
      q: '코드 구성음은 어떻게 정해지나요?',
      a: '밑음에서 몇 반음 떨어졌는지로 정해집니다. 메이저 코드는 0·4·7반음, 마이너 코드는 0·3·7반음입니다. 밑음만 바꾸면 같은 간격이 그대로 옮겨 가므로 열두 밑음의 코드를 한 규칙으로 얻습니다.',
    },
    {
      q: '왜 같은 음을 C#으로도 Db으로도 적나요?',
      a: '건반에서는 같은 자리지만 조표가 다릅니다. 이 사전은 그 조의 조표를 따라 적습니다 — Db 장조는 내림표 다섯 개라 Db이라 적고, C# 단조는 올림표 네 개라 C#이라 적습니다. 그래서 D 단음계의 여섯 번째 음은 A#이 아니라 Bb입니다.',
    },
    {
      q: '독일식 H 표기는 무엇인가요?',
      a: '독일어권에서는 B를 H라 쓰고 B♭을 B라 씁니다. 바흐가 자기 이름 BACH를 B♭·A·C·B 네 음으로 적을 수 있었던 것이 이 표기 덕입니다. 이 사전은 독일어 화면에서 그 표기를 씁니다.',
    },
    {
      q: '소리는 어떻게 나나요?',
      a: '평균율 주파수를 브라우저에서 직접 만들어 냅니다. A4를 440Hz로 두고 반음마다 2의 12제곱근을 곱한 값입니다. 음원을 내려받지 않으므로 데이터도 들지 않습니다.',
    },
  ],
  itemFaq: f => [
    {
      q: `${f.title}의 구성음은 무엇인가요?`,
      a: `${f.notes.join(' · ')} ${f.notes.length}개 음입니다. 밑음에서 ${f.steps.join('·')}반음 떨어진 자리이고, 코드표에는 ${f.symbol}로 적습니다.`,
    },
    {
      q: `${f.title}는 어떤 소리인가요?`,
      a: f.feel,
    },
    {
      q: '밑음의 주파수는 얼마인가요?',
      a: `가장 낮은 음을 4옥타브로 잡으면 ${f.hz}Hz입니다. A4를 440Hz로 둔 평균율 기준이고, 한 옥타브 올리면 두 배가 됩니다.`,
    },
    {
      q: '다른 밑음으로 옮기려면 어떻게 하나요?',
      a: `반음 간격(${f.steps.join('·')})을 그대로 두고 밑음만 옮기면 됩니다. 아래 목록에서 같은 성질의 다른 밑음 ${f.kindWord}로 바로 갈 수 있습니다.`,
    },
    {
      q: '건반 그림은 어떻게 보나요?',
      a: '색이 든 건반이 구성음입니다. 왼쪽이 낮은 음이고, 검은 건반은 올림·내림이 붙은 음입니다. 흰 건반만 쓰는 코드는 초보자가 먼저 잡아 보기 좋습니다.',
    },
  ],
};

const en: MusicUI = {
  home: 'Home',
  section: 'Music theory',
  hubTitle: 'Chord, Scale and Interval Reference',
  hubLead: 'See the notes of any chord, scale or interval on a keyboard diagram and hear them. All twelve roots across eight chord qualities',
  chordGroup: 'Chords',
  scaleGroup: 'Scales and modes',
  intervalGroup: 'Intervals',
  notesLabel: 'Notes',
  stepsLabel: 'Semitones',
  symbolLabel: 'Chord symbol',
  hzLabel: 'Frequency',
  degreeLabel: 'Solfège',
  keyboardLabel: 'On the keyboard',
  playLabel: 'Play',
  stopLabel: 'Stop',
  relatedLabel: 'Nearby chords and scales',
  howTitle: 'How to read this',
  how: [
    'The notes come from how many semitones they sit above the root — major is 0·4·7, minor is 0·3·7.',
    'On the keyboard diagram the filled keys are the notes of the chord, lowest on the left.',
    'Press play and it sounds the real frequencies. The audio is generated in your browser; nothing is downloaded.',
    'Note names differ by country: German writes H for B, while Spanish and French say Do, Re, Mi.',
  ],
  faqTitle: 'Frequently asked questions',
  countLabel: n => `${n} notes`,
  semitone: n => `${n} semitones`,
  hubMetaTitle: 'Chord, Scale and Interval Reference — with keyboard diagrams and sound',
  hubMetaDesc: 'The notes of 96 chords, 27 scales and 12 intervals shown on a keyboard diagram and played at their real frequencies. Covers German H notation and Do-Re-Mi note names.',
  metaTitle: f => `${f.title} notes`,
  metaDesc: f =>
    `The ${f.title} (${f.symbol}) is built from ${f.notes.join(' · ')} — ${f.notes.length} notes sitting ${f.steps.join('·')} semitones above the root. See them on a keyboard and hear them.`,
  hubFaq: [
    {
      q: 'How are the notes of a chord decided?',
      a: 'By how many semitones each note sits above the root. A major chord is 0·4·7 semitones, a minor chord 0·3·7. Move the root and the same spacing moves with it, which is how one rule gives you all twelve roots.',
    },
    {
      q: 'Why is the same key written C# in one place and Db in another?',
      a: 'It is the same key on the piano but a different key signature. This reference follows the signature: Db major has five flats so it is written Db, while C# minor has four sharps so it is written C#. That is also why the sixth note of the D minor scale is Bb, not A#.',
    },
    {
      q: 'What is German H notation?',
      a: 'In German-speaking countries B is called H, and B♭ is called B. That is how Bach could spell his own name BACH as four notes: B♭, A, C, B. The German pages here use that convention.',
    },
    {
      q: 'How does the sound work?',
      a: 'Equal-temperament frequencies are generated in your browser. A4 is 440 Hz and each semitone multiplies by the twelfth root of two. No audio files are fetched, so it costs no data.',
    },
  ],
  itemFaq: f => [
    {
      q: `What notes are in the ${f.title}?`,
      a: `${f.notes.join(' · ')} — ${f.notes.length} notes, sitting ${f.steps.join('·')} semitones above the root. On a chart it is written ${f.symbol}.`,
    },
    {
      q: `What does the ${f.title} sound like?`,
      a: f.feel,
    },
    {
      q: 'What is the frequency of the lowest note?',
      a: `Taking the lowest note in the fourth octave gives ${f.hz} Hz, in equal temperament with A4 at 440 Hz. An octave up doubles it.`,
    },
    {
      q: 'How do I move it to another root?',
      a: `Keep the semitone spacing (${f.steps.join('·')}) and shift the root. The list below jumps straight to the same ${f.kindWord} on the other eleven roots.`,
    },
    {
      q: 'How do I read the keyboard diagram?',
      a: 'The filled keys are the notes. Low notes are on the left, and the black keys carry the sharps and flats. Shapes that use only white keys are the easiest ones to try first.',
    },
  ],
};

const es: MusicUI = {
  home: 'Inicio',
  section: 'Teoría musical',
  hubTitle: 'Diccionario de acordes, escalas e intervalos',
  hubLead: 'Mira las notas de cualquier acorde, escala o intervalo en el teclado y escúchalas. Las doce tónicas con ocho tipos de acorde',
  chordGroup: 'Acordes',
  scaleGroup: 'Escalas y modos',
  intervalGroup: 'Intervalos',
  notesLabel: 'Notas',
  stepsLabel: 'Semitonos',
  symbolLabel: 'Cifrado',
  hzLabel: 'Frecuencia',
  degreeLabel: 'Solfeo',
  keyboardLabel: 'En el teclado',
  playLabel: 'Escuchar',
  stopLabel: 'Parar',
  relatedLabel: 'Acordes y escalas cercanas',
  howTitle: 'Cómo se lee',
  how: [
    'Las notas salen de cuántos semitonos están por encima de la tónica: mayor es 0·4·7, menor es 0·3·7.',
    'En el teclado, las teclas marcadas son las notas del acorde; la más grave queda a la izquierda.',
    'Al pulsar escuchar suenan las frecuencias reales. El audio se genera en tu navegador, no se descarga nada.',
    'Los nombres de las notas cambian según el país: en Alemania se escribe H por Si, y aquí decimos Do, Re, Mi.',
  ],
  faqTitle: 'Preguntas frecuentes',
  countLabel: n => `${n} notas`,
  semitone: n => `${n} semitonos`,
  hubMetaTitle: 'Diccionario de acordes, escalas e intervalos — con teclado y sonido',
  hubMetaDesc: 'Las notas de 96 acordes, 27 escalas y 12 intervalos sobre un teclado, con su sonido a la frecuencia real. Incluye la notación alemana con H y los nombres Do-Re-Mi.',
  metaTitle: f => `Notas de ${f.title}`,
  metaDesc: f =>
    `${f.title} (${f.symbol}) se forma con ${f.notes.join(' · ')}: ${f.notes.length} notas a ${f.steps.join('·')} semitonos de la tónica. Míralas en el teclado y escúchalas.`,
  hubFaq: [
    {
      q: '¿Cómo se deciden las notas de un acorde?',
      a: 'Por los semitonos que cada nota está por encima de la tónica. Un acorde mayor es 0·4·7 semitonos; uno menor, 0·3·7. Al cambiar la tónica la misma distancia se traslada con ella, y así una sola regla da las doce tónicas.',
    },
    {
      q: '¿Por qué la misma tecla se escribe Do# en un sitio y Reb en otro?',
      a: 'Es la misma tecla del piano, pero con distinta armadura. Este diccionario sigue la armadura: Reb mayor lleva cinco bemoles, así que se escribe Reb; Do# menor lleva cuatro sostenidos y se escribe Do#. Por eso la sexta nota de la escala de Re menor es Sib y no La#.',
    },
    {
      q: '¿Qué es la notación alemana con H?',
      a: 'En los países germanohablantes el Si se llama H y el Si♭ se llama B. Gracias a eso Bach podía escribir su propio apellido BACH con cuatro notas: Si♭, La, Do, Si. Las páginas en alemán usan esa convención.',
    },
    {
      q: '¿Cómo funciona el sonido?',
      a: 'Las frecuencias del temperamento igual se generan en tu navegador. La4 son 440 Hz y cada semitono multiplica por la raíz doceava de dos. No se descargan audios, así que no gasta datos.',
    },
  ],
  itemFaq: f => [
    {
      q: `¿Qué notas tiene ${f.title}?`,
      a: `${f.notes.join(' · ')}: ${f.notes.length} notas a ${f.steps.join('·')} semitonos de la tónica. En el cifrado se escribe ${f.symbol}.`,
    },
    {
      q: `¿Cómo suena ${f.title}?`,
      a: f.feel,
    },
    {
      q: '¿Cuál es la frecuencia de la nota más grave?',
      a: `Tomando la nota más grave en la cuarta octava son ${f.hz} Hz, en temperamento igual con La4 a 440 Hz. Una octava arriba lo duplica.`,
    },
    {
      q: '¿Cómo lo llevo a otra tónica?',
      a: `Mantén la distancia en semitonos (${f.steps.join('·')}) y mueve la tónica. La lista de abajo salta a la misma ${f.kindWord} sobre las otras once tónicas.`,
    },
    {
      q: '¿Cómo se lee el teclado?',
      a: 'Las teclas marcadas son las notas. Las graves quedan a la izquierda y las negras llevan sostenidos y bemoles. Las formas que solo usan teclas blancas son las más fáciles para empezar.',
    },
  ],
};

const pt: MusicUI = {
  home: 'Início',
  section: 'Teoria musical',
  hubTitle: 'Dicionário de acordes, escalas e intervalos',
  hubLead: 'Veja as notas de qualquer acorde, escala ou intervalo no teclado e ouça-as. As doze tônicas com oito tipos de acorde',
  chordGroup: 'Acordes',
  scaleGroup: 'Escalas e modos',
  intervalGroup: 'Intervalos',
  notesLabel: 'Notas',
  stepsLabel: 'Semitons',
  symbolLabel: 'Cifra',
  hzLabel: 'Frequência',
  degreeLabel: 'Solfejo',
  keyboardLabel: 'No teclado',
  playLabel: 'Ouvir',
  stopLabel: 'Parar',
  relatedLabel: 'Acordes e escalas próximos',
  howTitle: 'Como ler',
  how: [
    'As notas saem de quantos semitons ficam acima da tônica: maior é 0·4·7, menor é 0·3·7.',
    'No teclado, as teclas marcadas são as notas do acorde; a mais grave fica à esquerda.',
    'Ao tocar, soam as frequências reais. O áudio é gerado no seu navegador e nada é baixado.',
    'Os nomes das notas mudam por país: a Alemanha escreve H no lugar de Si, e aqui dizemos Dó, Ré, Mi.',
  ],
  faqTitle: 'Perguntas frequentes',
  countLabel: n => `${n} notas`,
  semitone: n => `${n} semitons`,
  hubMetaTitle: 'Dicionário de acordes, escalas e intervalos — com teclado e som',
  hubMetaDesc: 'As notas de 96 acordes, 27 escalas e 12 intervalos num teclado, tocadas na frequência real. Inclui a notação alemã com H e os nomes Dó-Ré-Mi.',
  metaTitle: f => `Notas de ${f.title}`,
  metaDesc: f =>
    `${f.title} (${f.symbol}) é formado por ${f.notes.join(' · ')}: ${f.notes.length} notas a ${f.steps.join('·')} semitons da tônica. Veja no teclado e ouça.`,
  hubFaq: [
    {
      q: 'Como se decidem as notas de um acorde?',
      a: 'Pelos semitons que cada nota fica acima da tônica. Um acorde maior é 0·4·7 semitons; um menor, 0·3·7. Ao mudar a tônica a mesma distância vai com ela, e assim uma regra dá as doze tônicas.',
    },
    {
      q: 'Por que a mesma tecla se escreve Dó# aqui e Réb ali?',
      a: 'É a mesma tecla do piano, mas com armadura diferente. Este dicionário segue a armadura: Réb maior tem cinco bemóis, então se escreve Réb; Dó# menor tem quatro sustenidos e se escreve Dó#. Por isso a sexta nota da escala de Ré menor é Sib, não Lá#.',
    },
    {
      q: 'O que é a notação alemã com H?',
      a: 'Nos países de língua alemã o Si se chama H e o Si♭ se chama B. Foi assim que Bach pôde escrever o próprio sobrenome BACH em quatro notas: Si♭, Lá, Dó, Si. As páginas em alemão usam essa convenção.',
    },
    {
      q: 'Como funciona o som?',
      a: 'As frequências do temperamento igual são geradas no seu navegador. Lá4 são 440 Hz e cada semitom multiplica pela raiz duodécima de dois. Nenhum áudio é baixado, então não gasta dados.',
    },
  ],
  itemFaq: f => [
    {
      q: `Quais notas tem ${f.title}?`,
      a: `${f.notes.join(' · ')}: ${f.notes.length} notas a ${f.steps.join('·')} semitons da tônica. Na cifra escreve-se ${f.symbol}.`,
    },
    {
      q: `Como soa ${f.title}?`,
      a: f.feel,
    },
    {
      q: 'Qual é a frequência da nota mais grave?',
      a: `Tomando a nota mais grave na quarta oitava dá ${f.hz} Hz, em temperamento igual com Lá4 a 440 Hz. Uma oitava acima dobra esse valor.`,
    },
    {
      q: 'Como levo para outra tônica?',
      a: `Mantenha a distância em semitons (${f.steps.join('·')}) e mova a tônica. A lista abaixo pula para a mesma ${f.kindWord} nas outras onze tônicas.`,
    },
    {
      q: 'Como se lê o teclado?',
      a: 'As teclas marcadas são as notas. As graves ficam à esquerda e as pretas levam sustenidos e bemóis. As formas que usam só teclas brancas são as mais fáceis para começar.',
    },
  ],
};

const ja: MusicUI = {
  home: 'ホーム',
  section: '音楽理論',
  hubTitle: 'コード・スケール・音程の辞典',
  hubLead: 'コードの構成音、スケール、音程を鍵盤図と音で確かめられます。12の根音 × 8種類のコードを収めました',
  chordGroup: 'コード',
  scaleGroup: 'スケールと旋法',
  intervalGroup: '音程',
  notesLabel: '構成音',
  stepsLabel: '半音の間隔',
  symbolLabel: 'コードネーム',
  hzLabel: '周波数',
  degreeLabel: '階名',
  keyboardLabel: '鍵盤の位置',
  playLabel: '聴く',
  stopLabel: '止める',
  relatedLabel: '近いコード・スケール',
  howTitle: '読み方',
  how: [
    '構成音は根音から何半音上かで決まります。メジャーは0・4・7、マイナーは0・3・7です。',
    '鍵盤図で色のついた鍵がそのコードの音です。低い音が左側になります。',
    '「聴く」を押すと実際の周波数で音が鳴ります。音はブラウザで作るので何も読み込みません。',
    '音名は国によって違います。ドイツではBをHと書き、スペイン・フランスではド・レ・ミと呼びます。',
  ],
  faqTitle: 'よくある質問',
  countLabel: n => `${n}音`,
  semitone: n => `${n}半音`,
  hubMetaTitle: 'コード構成音・スケール・音程の辞典 — 鍵盤図と音つき',
  hubMetaDesc: 'メジャー・マイナー・セブンスなどコード96種、スケール27種、音程12種の構成音を鍵盤図で示し、実際の周波数で鳴らします。ドイツ式のH表記とドレミ表記も扱います。',
  metaTitle: f => `${f.title}の構成音`,
  metaDesc: f =>
    `${f.title}（${f.symbol}）の構成音は ${f.notes.join(' · ')} です。根音から${f.steps.join('・')}半音上の${f.notes.length}音で、鍵盤図と音で確かめられます。`,
  hubFaq: [
    {
      q: 'コードの構成音はどう決まりますか。',
      a: '根音から何半音上かで決まります。メジャーコードは0・4・7半音、マイナーコードは0・3・7半音です。根音を変えても同じ間隔がそのまま移るので、一つの規則で12の根音すべてが得られます。',
    },
    {
      q: '同じ鍵をC#と書いたりDbと書いたりするのはなぜですか。',
      a: 'ピアノでは同じ鍵ですが調号が違います。この辞典は調号に従います — D♭長調は♭が五つなのでDb、C♯短調は♯が四つなのでC#と書きます。だからD自然短音階の第6音はA#ではなくBbです。',
    },
    {
      q: 'ドイツ式のH表記とは何ですか。',
      a: 'ドイツ語圏ではBをH、B♭をBと書きます。バッハが自分の姓BACHをB♭・A・C・Bの四音で書けたのはこの表記のおかげです。ドイツ語の画面ではその表記を使います。',
    },
    {
      q: '音はどう鳴っていますか。',
      a: '平均律の周波数をブラウザで直接作っています。A4を440Hzとし、半音ごとに2の12乗根を掛けた値です。音源を読み込まないので通信量もかかりません。',
    },
  ],
  itemFaq: f => [
    {
      q: `${f.title}の構成音は何ですか。`,
      a: `${f.notes.join(' · ')} の${f.notes.length}音です。根音から${f.steps.join('・')}半音上の位置で、コードネームは ${f.symbol} と書きます。`,
    },
    {
      q: `${f.title}はどんな響きですか。`,
      a: f.feel,
    },
    {
      q: '一番低い音の周波数はいくつですか。',
      a: `一番低い音を第4オクターブに取ると ${f.hz}Hz です。A4を440Hzとした平均律で、1オクターブ上げると倍になります。`,
    },
    {
      q: '別の根音に移すにはどうしますか。',
      a: `半音の間隔（${f.steps.join('・')}）をそのままにして根音だけ動かします。下の一覧から同じ${f.kindWord}の他の根音へすぐ行けます。`,
    },
    {
      q: '鍵盤図はどう見ますか。',
      a: '色のついた鍵が構成音です。左が低い音で、黒鍵がシャープ・フラットのついた音です。白鍵だけで押さえられる形は最初に試すのに向いています。',
    },
  ],
};

const de: MusicUI = {
  home: 'Start',
  section: 'Musiktheorie',
  hubTitle: 'Akkord-, Tonleiter- und Intervall-Lexikon',
  hubLead: 'Die Töne jedes Akkords, jeder Tonleiter und jedes Intervalls auf der Klaviatur sehen und hören — zwölf Grundtöne in acht Akkordarten',
  chordGroup: 'Akkorde',
  scaleGroup: 'Tonleitern und Modi',
  intervalGroup: 'Intervalle',
  notesLabel: 'Töne',
  stepsLabel: 'Halbtöne',
  symbolLabel: 'Akkordsymbol',
  hzLabel: 'Frequenz',
  degreeLabel: 'Solmisation',
  keyboardLabel: 'Auf der Klaviatur',
  playLabel: 'Anhören',
  stopLabel: 'Stopp',
  relatedLabel: 'Verwandte Akkorde und Tonleitern',
  howTitle: 'So liest man das',
  how: [
    'Die Töne ergeben sich daraus, wie viele Halbtöne sie über dem Grundton liegen: Dur ist 0·4·7, Moll ist 0·3·7.',
    'Auf der Klaviatur sind die gefüllten Tasten die Töne des Akkords, der tiefste links.',
    'Ein Klick auf Anhören spielt die echten Frequenzen. Der Klang entsteht im Browser, nichts wird geladen.',
    'Tonnamen unterscheiden sich je nach Land: im Deutschen steht H für B, im Spanischen und Französischen sagt man Do, Re, Mi.',
  ],
  faqTitle: 'Häufige Fragen',
  countLabel: n => `${n} Töne`,
  semitone: n => `${n} Halbtöne`,
  hubMetaTitle: 'Akkord-, Tonleiter- und Intervall-Lexikon — mit Klaviatur und Klang',
  hubMetaDesc: 'Die Töne von 96 Akkorden, 27 Tonleitern und 12 Intervallen auf der Klaviatur, gespielt in echten Frequenzen. Mit deutscher H-Notation und den Do-Re-Mi-Namen.',
  metaTitle: f => `Töne des ${f.title}`,
  metaDesc: f =>
    `${f.title} (${f.symbol}) besteht aus ${f.notes.join(' · ')} — ${f.notes.length} Töne, ${f.steps.join('·')} Halbtöne über dem Grundton. Auf der Klaviatur ansehen und anhören.`,
  hubFaq: [
    {
      q: 'Wie ergeben sich die Töne eines Akkords?',
      a: 'Daraus, wie viele Halbtöne jeder Ton über dem Grundton liegt. Ein Durakkord ist 0·4·7 Halbtöne, ein Mollakkord 0·3·7. Verschiebt man den Grundton, wandert der gleiche Abstand mit — eine Regel liefert alle zwölf Grundtöne.',
    },
    {
      q: 'Warum wird dieselbe Taste einmal Cis und einmal Des geschrieben?',
      a: 'Es ist dieselbe Taste, aber eine andere Vorzeichnung. Dieses Lexikon folgt der Vorzeichnung: Des-Dur hat fünf b, also Des; cis-Moll hat vier Kreuze, also Cis. Genau darum ist der sechste Ton der d-Moll-Tonleiter B und nicht Ais.',
    },
    {
      q: 'Was ist die H-Notation?',
      a: 'Im deutschen Sprachraum heißt B H, und B♭ heißt B. Nur deshalb konnte Bach seinen Namen BACH als vier Töne schreiben: B, A, C, H. Die deutschen Seiten hier nutzen diese Schreibweise.',
    },
    {
      q: 'Wie entsteht der Klang?',
      a: 'Die Frequenzen der gleichstufigen Stimmung werden im Browser erzeugt. A4 ist 440 Hz, jeder Halbton multipliziert mit der zwölften Wurzel aus zwei. Es werden keine Audiodateien geladen.',
    },
  ],
  itemFaq: f => [
    {
      q: `Welche Töne hat der ${f.title}?`,
      a: `${f.notes.join(' · ')} — ${f.notes.length} Töne, ${f.steps.join('·')} Halbtöne über dem Grundton. Im Leadsheet steht ${f.symbol}.`,
    },
    {
      q: `Wie klingt der ${f.title}?`,
      a: f.feel,
    },
    {
      q: 'Welche Frequenz hat der tiefste Ton?',
      a: `Nimmt man den tiefsten Ton in der vierten Oktave, sind es ${f.hz} Hz — gleichstufig, mit A4 bei 440 Hz. Eine Oktave höher verdoppelt den Wert.`,
    },
    {
      q: 'Wie übertrage ich das auf einen anderen Grundton?',
      a: `Den Halbtonabstand (${f.steps.join('·')}) beibehalten und den Grundton verschieben. Die Liste unten führt direkt zur gleichen ${f.kindWord} auf den anderen elf Grundtönen.`,
    },
    {
      q: 'Wie liest man die Klaviatur?',
      a: 'Die gefüllten Tasten sind die Töne. Links liegen die tiefen, die schwarzen Tasten tragen Kreuze und b. Griffe, die nur weiße Tasten brauchen, sind für den Anfang die leichtesten.',
    },
  ],
};

const fr: MusicUI = {
  home: 'Accueil',
  section: 'Théorie musicale',
  hubTitle: 'Dictionnaire des accords, gammes et intervalles',
  hubLead: 'Voyez les notes de n’importe quel accord, gamme ou intervalle sur le clavier et écoutez-les — douze fondamentales et huit types d’accord',
  chordGroup: 'Accords',
  scaleGroup: 'Gammes et modes',
  intervalGroup: 'Intervalles',
  notesLabel: 'Notes',
  stepsLabel: 'Demi-tons',
  symbolLabel: 'Chiffrage',
  hzLabel: 'Fréquence',
  degreeLabel: 'Solfège',
  keyboardLabel: 'Sur le clavier',
  playLabel: 'Écouter',
  stopLabel: 'Arrêter',
  relatedLabel: 'Accords et gammes voisins',
  howTitle: 'Comment lire',
  how: [
    'Les notes viennent du nombre de demi-tons au-dessus de la fondamentale : majeur, c’est 0·4·7 ; mineur, 0·3·7.',
    'Sur le clavier, les touches colorées sont les notes de l’accord, la plus grave à gauche.',
    'Le bouton Écouter joue les fréquences réelles. Le son est produit dans le navigateur, rien n’est téléchargé.',
    'Les noms de notes changent selon le pays : l’allemand écrit H pour Si, et ici on dit Do, Ré, Mi.',
  ],
  faqTitle: 'Questions fréquentes',
  countLabel: n => `${n} notes`,
  semitone: n => `${n} demi-tons`,
  hubMetaTitle: 'Dictionnaire des accords, gammes et intervalles — clavier et son',
  hubMetaDesc: 'Les notes de 96 accords, 27 gammes et 12 intervalles sur un clavier, jouées à leur fréquence réelle. Avec la notation allemande en H et les noms Do-Ré-Mi.',
  metaTitle: f => `Notes de ${f.title}`,
  metaDesc: f =>
    `${f.title} (${f.symbol}) se compose de ${f.notes.join(' · ')} : ${f.notes.length} notes à ${f.steps.join('·')} demi-tons de la fondamentale. À voir sur le clavier et à écouter.`,
  hubFaq: [
    {
      q: 'Comment détermine-t-on les notes d’un accord ?',
      a: 'Par le nombre de demi-tons au-dessus de la fondamentale. Un accord majeur, c’est 0·4·7 demi-tons ; un mineur, 0·3·7. Déplacez la fondamentale et le même écart la suit : une seule règle donne les douze fondamentales.',
    },
    {
      q: 'Pourquoi la même touche s’écrit-elle Do# ici et Réb ailleurs ?',
      a: 'C’est la même touche au piano, mais une autre armure. Ce dictionnaire suit l’armure : Réb majeur a cinq bémols, donc Réb ; Do# mineur a quatre dièses, donc Do#. C’est aussi pourquoi la sixte de la gamme de Ré mineur est Sib et non La#.',
    },
    {
      q: 'Qu’est-ce que la notation allemande en H ?',
      a: 'Dans les pays germanophones, Si s’appelle H et Si♭ s’appelle B. C’est ainsi que Bach pouvait écrire son nom BACH en quatre notes : Si♭, La, Do, Si. Les pages en allemand utilisent cette convention.',
    },
    {
      q: 'Comment le son est-il produit ?',
      a: 'Les fréquences du tempérament égal sont générées dans le navigateur. La4 vaut 440 Hz et chaque demi-ton multiplie par la racine douzième de deux. Aucun fichier audio n’est chargé.',
    },
  ],
  itemFaq: f => [
    {
      q: `Quelles notes composent ${f.title} ?`,
      a: `${f.notes.join(' · ')} : ${f.notes.length} notes, à ${f.steps.join('·')} demi-tons de la fondamentale. Sur une grille on écrit ${f.symbol}.`,
    },
    {
      q: `Quel est le son de ${f.title} ?`,
      a: f.feel,
    },
    {
      q: 'Quelle est la fréquence de la note la plus grave ?',
      a: `En prenant la note la plus grave à la quatrième octave, on obtient ${f.hz} Hz, en tempérament égal avec La4 à 440 Hz. Une octave au-dessus double la valeur.`,
    },
    {
      q: 'Comment le transposer sur une autre fondamentale ?',
      a: `Gardez l’écart en demi-tons (${f.steps.join('·')}) et déplacez la fondamentale. La liste ci-dessous mène à la même ${f.kindWord} sur les onze autres fondamentales.`,
    },
    {
      q: 'Comment lire le clavier ?',
      a: 'Les touches colorées sont les notes. Les graves sont à gauche et les touches noires portent dièses et bémols. Les positions qui n’utilisent que des touches blanches sont les plus faciles pour commencer.',
    },
  ],
};

const hi: MusicUI = {
  home: 'होम',
  section: 'संगीत सिद्धांत',
  hubTitle: 'कॉर्ड, स्केल और अंतराल का शब्दकोश',
  hubLead: 'किसी भी कॉर्ड, स्केल या अंतराल के स्वर कीबोर्ड पर देखें और सुनें — बारह मूल स्वर और आठ तरह के कॉर्ड',
  chordGroup: 'कॉर्ड',
  scaleGroup: 'स्केल और मोड',
  intervalGroup: 'अंतराल',
  notesLabel: 'स्वर',
  stepsLabel: 'आधे सुर',
  symbolLabel: 'कॉर्ड चिह्न',
  hzLabel: 'आवृत्ति',
  degreeLabel: 'सरगम',
  keyboardLabel: 'कीबोर्ड पर',
  playLabel: 'सुनें',
  stopLabel: 'रोकें',
  relatedLabel: 'नज़दीकी कॉर्ड और स्केल',
  howTitle: 'कैसे पढ़ें',
  how: [
    'स्वर इस बात से तय होते हैं कि वे मूल स्वर से कितने आधे सुर ऊपर हैं — मेजर 0·4·7 है, माइनर 0·3·7।',
    'कीबोर्ड चित्र में रंगी हुई कुंजियाँ उस कॉर्ड के स्वर हैं; सबसे नीचा स्वर बाईं ओर रहता है।',
    '“सुनें” दबाने पर असली आवृत्तियों पर आवाज़ बनती है। ध्वनि ब्राउज़र में बनती है, कुछ डाउनलोड नहीं होता।',
    'स्वरों के नाम देश के हिसाब से बदलते हैं: जर्मनी में B को H लिखते हैं, स्पेन-फ़्रांस में Do, Re, Mi कहते हैं।',
  ],
  faqTitle: 'आम सवाल',
  countLabel: n => `${n} स्वर`,
  semitone: n => `${n} आधे सुर`,
  hubMetaTitle: 'कॉर्ड, स्केल और अंतराल का शब्दकोश — कीबोर्ड चित्र और ध्वनि के साथ',
  hubMetaDesc: '96 कॉर्ड, 27 स्केल और 12 अंतरालों के स्वर कीबोर्ड चित्र पर दिखाए जाते हैं और असली आवृत्ति पर बजाए जाते हैं। जर्मन H लेखन और Do-Re-Mi नाम भी शामिल।',
  metaTitle: f => `${f.title} के स्वर`,
  metaDesc: f =>
    `${f.title} (${f.symbol}) में ${f.notes.join(' · ')} — कुल ${f.notes.length} स्वर, जो मूल स्वर से ${f.steps.join('·')} आधे सुर ऊपर हैं। कीबोर्ड पर देखें और सुनें।`,
  hubFaq: [
    {
      q: 'कॉर्ड के स्वर कैसे तय होते हैं?',
      a: 'इससे कि हर स्वर मूल स्वर से कितने आधे सुर ऊपर है। मेजर कॉर्ड 0·4·7 आधे सुर है, माइनर 0·3·7। मूल स्वर बदलने पर वही दूरी साथ चली जाती है, इसलिए एक नियम से बारहों मूल स्वर मिल जाते हैं।',
    },
    {
      q: 'वही कुंजी कहीं C# और कहीं Db क्यों लिखी जाती है?',
      a: 'पियानो पर कुंजी एक ही है, पर की-सिग्नेचर अलग है। यह शब्दकोश की-सिग्नेचर के अनुसार लिखता है — Db मेजर में पाँच फ़्लैट हैं इसलिए Db, और C# माइनर में चार शार्प हैं इसलिए C#। इसी वजह से D माइनर स्केल का छठा स्वर A# नहीं, Bb है।',
    },
    {
      q: 'जर्मन H लेखन क्या है?',
      a: 'जर्मन भाषी देशों में B को H और B♭ को B लिखा जाता है। इसी कारण बाख अपना नाम BACH चार स्वरों में लिख सके: B♭, A, C, B। यहाँ जर्मन पन्नों पर वही परंपरा है।',
    },
    {
      q: 'आवाज़ कैसे बनती है?',
      a: 'समान स्वरमान (equal temperament) की आवृत्तियाँ ब्राउज़र में ही बनती हैं। A4 = 440 Hz और हर आधे सुर पर दो का बारहवाँ मूल गुणा होता है। कोई ऑडियो फ़ाइल नहीं आती, इसलिए डेटा भी नहीं लगता।',
    },
  ],
  itemFaq: f => [
    {
      q: `${f.title} में कौन-कौन स्वर हैं?`,
      a: `${f.notes.join(' · ')} — कुल ${f.notes.length} स्वर, मूल स्वर से ${f.steps.join('·')} आधे सुर ऊपर। चार्ट पर इसे ${f.symbol} लिखा जाता है।`,
    },
    {
      q: `${f.title} कैसा सुनाई देता है?`,
      a: f.feel,
    },
    {
      q: 'सबसे नीचे वाले स्वर की आवृत्ति क्या है?',
      a: `सबसे नीचा स्वर चौथे ऑक्टेव में लें तो ${f.hz} Hz बनता है — A4 = 440 Hz वाले समान स्वरमान में। एक ऑक्टेव ऊपर जाने पर यह दुगना हो जाता है।`,
    },
    {
      q: 'दूसरे मूल स्वर पर कैसे ले जाएँ?',
      a: `आधे सुरों की दूरी (${f.steps.join('·')}) वही रखें और मूल स्वर बदल दें। नीचे की सूची से उसी ${f.kindWord} के बाक़ी ग्यारह मूल स्वरों पर सीधे जा सकते हैं।`,
    },
    {
      q: 'कीबोर्ड चित्र कैसे पढ़ें?',
      a: 'रंगी हुई कुंजियाँ स्वर हैं। नीचे के स्वर बाईं ओर हैं और काली कुंजियों पर शार्प-फ़्लैट पड़ते हैं। जो आकार सिर्फ़ सफ़ेद कुंजियों से बनते हैं, वे शुरुआत के लिए सबसे आसान हैं।',
    },
  ],
};

export const MUSIC_UI: L8<MusicUI> = { ko, en, es, pt, ja, de, fr, hi };

export const musicUi = (lang: Lang8): MusicUI => MUSIC_UI[lang];

/** hreflang 묶음 — 항목 slug만 넣으면 아홉 줄이 나온다 */
export const musicAlternates = (slug?: string): Record<string, string> =>
  alternates8(slug ? `/music/${slug}` : '/music');
