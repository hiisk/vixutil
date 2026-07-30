/**
 * 코드·음계·음정의 정의 — 전부 "밑음에서 몇 반음"으로 적는다.
 *
 * 구성음을 손으로 적지 않는다. 코드 96개(12 밑음 × 8 성질)와 음계 27개, 음정
 * 12개가 이 표에서 계산으로 나오고, 여덟 언어의 이름도 성질 이름 한 벌에서
 * 붙는다. 손으로 적으면 135 × 8 = 1080벌이고, 하나가 틀려도 음악을 아는
 * 사람만 알아챈다.
 */
import type { L8 } from '../i18n/lang8.ts';

export interface ChordQuality {
  id: string;
  /** 코드표에 붙는 꼬리 — C, Cm, C7 처럼 */
  suffix: string;
  /** 밑음에서의 반음 거리 */
  steps: number[];
  name: L8<string>;
  /** 어떤 소리로 들리는지 한 줄 */
  feel: L8<string>;
}

export const CHORD_QUALITIES: ChordQuality[] = [
  {
    id: 'major', suffix: '', steps: [0, 4, 7],
    name: { ko: '메이저', en: 'major', es: 'mayor', pt: 'maior', ja: 'メジャー', de: 'Dur', fr: 'majeur', hi: 'मेजर' },
    feel: {
      ko: '밝고 안정된 소리로 대중가요의 뼈대가 되는 세 음짜리 코드입니다.',
      en: 'The bright, settled three-note chord that most popular songs are built on.',
      es: 'El acorde de tres notas, brillante y estable, sobre el que se construye casi toda la música popular.',
      pt: 'O acorde de três notas, brilhante e estável, sobre o qual quase toda a música popular é construída.',
      ja: '明るく落ち着いた響きの三和音で、ポピュラー音楽の骨組みになります。',
      de: 'Der helle, in sich ruhende Dreiklang, auf dem die meiste populäre Musik aufbaut.',
      fr: 'L’accord de trois notes, lumineux et stable, sur lequel repose l’essentiel de la musique populaire.',
      hi: 'चमकीली और स्थिर आवाज़ वाला तीन-स्वर का कॉर्ड, जिस पर ज़्यादातर लोकप्रिय संगीत खड़ा है।',
    },
  },
  {
    id: 'minor', suffix: 'm', steps: [0, 3, 7],
    name: { ko: '마이너', en: 'minor', es: 'menor', pt: 'menor', ja: 'マイナー', de: 'Moll', fr: 'mineur', hi: 'माइनर' },
    feel: {
      ko: '가운데 음이 반음 낮아 어둡고 잠긴 소리가 납니다. 메이저와 한 음만 다릅니다.',
      en: 'Lowering the middle note a semitone darkens it. One note apart from the major.',
      es: 'Bajar medio tono la nota central lo oscurece. Se diferencia del mayor en una sola nota.',
      pt: 'Baixar meio tom a nota do meio o escurece. Difere do maior por uma única nota.',
      ja: '真ん中の音が半音下がるだけで暗く沈んだ響きになります。メジャーとは一音違いです。',
      de: 'Die mittlere Note einen Halbton tiefer — schon klingt er dunkel. Nur ein Ton trennt ihn von Dur.',
      fr: 'La note du milieu baissée d’un demi-ton l’assombrit. Une seule note le sépare du majeur.',
      hi: 'बीच का स्वर आधा सुर नीचे आते ही आवाज़ गहरी और उदास हो जाती है — मेजर से बस एक स्वर का फ़र्क़।',
    },
  },
  {
    id: 'dom7', suffix: '7', steps: [0, 4, 7, 10],
    name: { ko: '세븐스', en: 'dominant 7th', es: 'séptima dominante', pt: 'sétima dominante', ja: 'セブンス', de: 'Dominantseptakkord', fr: 'septième de dominante', hi: 'डॉमिनेंट सेवंथ' },
    feel: {
      ko: '어딘가로 가야 할 것 같은 긴장을 만들어 블루스와 재즈에서 끊임없이 쓰입니다.',
      en: 'It creates a pull towards somewhere else, which is why blues and jazz lean on it constantly.',
      es: 'Crea una tensión que pide resolver, y por eso el blues y el jazz lo usan sin parar.',
      pt: 'Cria uma tensão que pede resolução, e por isso o blues e o jazz o usam sem parar.',
      ja: 'どこかへ進みたくなる緊張を作るため、ブルースとジャズで絶えず使われます。',
      de: 'Er erzeugt einen Zug nach vorn — deshalb stützen sich Blues und Jazz ständig darauf.',
      fr: 'Il crée une tension qui appelle une suite : blues et jazz s’y appuient sans cesse.',
      hi: 'यह आगे बढ़ने की खिंचाव भरी तनाव पैदा करता है, इसीलिए ब्लूज़ और जैज़ इसे लगातार बरतते हैं।',
    },
  },
  {
    id: 'maj7', suffix: 'maj7', steps: [0, 4, 7, 11],
    name: { ko: '메이저 세븐스', en: 'major 7th', es: 'séptima mayor', pt: 'sétima maior', ja: 'メジャーセブンス', de: 'großer Septakkord', fr: 'septième majeure', hi: 'मेजर सेवंथ' },
    feel: {
      ko: '메이저에 반음 아래 음을 얹어 부드럽고 나른한 소리가 됩니다. 시티팝과 발라드의 색입니다.',
      en: 'A note a semitone below the octave makes it soft and languid — the colour of city pop and ballads.',
      es: 'Una nota a medio tono de la octava lo vuelve suave y lánguido: el color del city pop y las baladas.',
      pt: 'Uma nota a meio tom da oitava o deixa suave e lânguido — a cor do city pop e das baladas.',
      ja: 'オクターブの半音下の音が加わり、柔らかく気だるい響きになります。シティポップとバラードの色です。',
      de: 'Eine Note einen Halbton unter der Oktave macht ihn weich und träge — die Farbe von City Pop und Balladen.',
      fr: 'Une note à un demi-ton de l’octave le rend doux et languide : la couleur de la city pop et des ballades.',
      hi: 'ऑक्टेव से आधा सुर नीचे का स्वर इसे मुलायम और सुस्त बना देता है — सिटी पॉप और बैलड का रंग।',
    },
  },
  {
    id: 'min7', suffix: 'm7', steps: [0, 3, 7, 10],
    name: { ko: '마이너 세븐스', en: 'minor 7th', es: 'séptima menor', pt: 'sétima menor', ja: 'マイナーセブンス', de: 'Mollseptakkord', fr: 'septième mineure', hi: 'माइनर सेवंथ' },
    feel: {
      ko: '마이너의 어두움을 덜어 낸 소리로 재즈에서 ii-V-I의 첫 자리를 맡습니다.',
      en: 'It takes the edge off the minor and opens the ii–V–I turn that jazz runs on.',
      es: 'Suaviza la aspereza del menor y abre el giro ii–V–I sobre el que corre el jazz.',
      pt: 'Suaviza a aspereza do menor e abre o giro ii–V–I sobre o qual o jazz corre.',
      ja: 'マイナーの暗さを和らげ、ジャズの ii–V–I の先頭を務めます。',
      de: 'Er nimmt Moll die Härte und eröffnet die ii–V–I-Wendung, von der Jazz lebt.',
      fr: 'Il adoucit la dureté du mineur et ouvre la cadence ii–V–I dont vit le jazz.',
      hi: 'यह माइनर की कठोरता कम करता है और जैज़ की ii–V–I चाल की शुरुआत बनता है।',
    },
  },
  {
    id: 'dim', suffix: 'dim', steps: [0, 3, 6],
    name: { ko: '디미니시드', en: 'diminished', es: 'disminuido', pt: 'diminuto', ja: 'ディミニッシュ', de: 'verminderter Akkord', fr: 'diminué', hi: 'डिमिनिश्ड' },
    feel: {
      ko: '두 음 사이가 모두 세 반음이라 어디에도 기대지 못하는 불안한 소리가 납니다.',
      en: 'Every gap is three semitones, so it leans on nothing — an unsettled, suspenseful sound.',
      es: 'Todos los intervalos son de tres semitonos: no se apoya en nada y suena inquietante.',
      pt: 'Todos os intervalos têm três semitons: não se apoia em nada e soa inquietante.',
      ja: '音の間隔がすべて三半音で、どこにも寄りかかれない不安な響きになります。',
      de: 'Jeder Abstand misst drei Halbtöne — er lehnt sich an nichts und klingt spannungsvoll.',
      fr: 'Tous les intervalles font trois demi-tons : il ne s’appuie sur rien et sonne inquiétant.',
      hi: 'हर अंतराल तीन आधे सुर का है, इसलिए यह किसी पर टिकता नहीं — बेचैन और रहस्यमय आवाज़।',
    },
  },
  {
    id: 'aug', suffix: 'aug', steps: [0, 4, 8],
    name: { ko: '오그멘티드', en: 'augmented', es: 'aumentado', pt: 'aumentado', ja: 'オーグメント', de: 'übermäßiger Akkord', fr: 'augmenté', hi: 'ऑगमेंटेड' },
    feel: {
      ko: '가장 위 음을 반음 올려 붕 떠 있는 소리가 납니다. 장면이 바뀌는 자리에 씁니다.',
      en: 'Raising the top note a semitone leaves it floating — useful where a scene changes.',
      es: 'Subir medio tono la nota superior lo deja flotando: sirve donde cambia la escena.',
      pt: 'Subir meio tom a nota de cima o deixa flutuando: serve onde a cena muda.',
      ja: '一番上の音を半音上げると浮遊した響きになります。場面が変わる箇所で使われます。',
      de: 'Die oberste Note einen Halbton höher — er schwebt. Gut dort, wo die Szene wechselt.',
      fr: 'La note du haut montée d’un demi-ton le laisse en suspension : utile là où la scène change.',
      hi: 'सबसे ऊपर का स्वर आधा सुर ऊपर करने से आवाज़ हवा में तैरती है — दृश्य बदलने की जगह पर काम आता है।',
    },
  },
  {
    id: 'sus4', suffix: 'sus4', steps: [0, 5, 7],
    name: { ko: '서스포', en: 'suspended 4th', es: 'cuarta suspendida', pt: 'quarta suspensa', ja: 'サスフォー', de: 'Sus4-Akkord', fr: 'quarte suspendue', hi: 'सस्पेंडेड फोर्थ' },
    feel: {
      ko: '가운데 음을 한 음 올려 메이저도 마이너도 아닌, 풀리기를 기다리는 소리가 됩니다.',
      en: 'The middle note steps up, leaving it neither major nor minor but waiting to resolve.',
      es: 'La nota central sube un tono: no es mayor ni menor, sino que espera resolverse.',
      pt: 'A nota do meio sobe um tom: não é maior nem menor, e fica esperando resolver.',
      ja: '真ん中の音が一つ上がり、メジャーでもマイナーでもない、解決を待つ響きになります。',
      de: 'Die mittlere Note rückt hoch: weder Dur noch Moll, sondern auf Auflösung wartend.',
      fr: 'La note du milieu monte : ni majeur ni mineur, mais en attente de résolution.',
      hi: 'बीच का स्वर एक सुर ऊपर जाता है — न मेजर न माइनर, बस हल होने की प्रतीक्षा।',
    },
  },
];

export interface ScaleMode {
  id: string;
  steps: number[];
  name: L8<string>;
  feel: L8<string>;
  /** 밑음마다 페이지를 만드는가 — 교회 선법은 C에서만 만든다 */
  everyRoot: boolean;
}

export const SCALE_MODES: ScaleMode[] = [
  {
    id: 'major', everyRoot: true, steps: [0, 2, 4, 5, 7, 9, 11],
    name: { ko: '장음계', en: 'major scale', es: 'escala mayor', pt: 'escala maior', ja: '長音階', de: 'Dur-Tonleiter', fr: 'gamme majeure', hi: 'मेजर स्केल' },
    feel: {
      ko: '도에서 도까지 흰 건반만 밟는 그 음계입니다. 온음·온음·반음의 배열이 밝은 느낌을 만듭니다.',
      en: 'The one you get playing only white keys from Do to Do. Its tone–tone–semitone pattern is what sounds bright.',
      es: 'La que sale tocando solo teclas blancas de Do a Do. Su patrón tono–tono–semitono es lo que suena brillante.',
      pt: 'A que sai tocando só teclas brancas de Dó a Dó. O padrão tom–tom–semitom é o que soa brilhante.',
      ja: 'ドからドまで白鍵だけを踏むあの音階です。全音・全音・半音の並びが明るさを作ります。',
      de: 'Die Leiter, die entsteht, wenn man nur weiße Tasten von Do zu Do spielt. Ganzton–Ganzton–Halbton klingt hell.',
      fr: 'Celle qu’on obtient en ne jouant que les touches blanches de Do à Do. Ton–ton–demi-ton, d’où la clarté.',
      hi: 'वही स्केल जो Do से Do तक सिर्फ़ सफ़ेद कुंजियाँ बजाने पर बनता है। पूर्ण–पूर्ण–आधा का क्रम ही चमक देता है।',
    },
  },
  {
    id: 'minor', everyRoot: true, steps: [0, 2, 3, 5, 7, 8, 10],
    name: { ko: '단음계', en: 'natural minor scale', es: 'escala menor natural', pt: 'escala menor natural', ja: '自然短音階', de: 'natürliche Moll-Tonleiter', fr: 'gamme mineure naturelle', hi: 'नैचुरल माइनर स्केल' },
    feel: {
      ko: '세 번째·여섯 번째·일곱 번째 음이 반음 낮아 어둡게 들립니다. 같은 조표를 쓰는 장조가 짝으로 있습니다.',
      en: 'Its third, sixth and seventh sit a semitone lower, which is what darkens it. Every one pairs with a major key sharing its key signature.',
      es: 'Su tercera, sexta y séptima bajan medio tono, y eso la oscurece. Cada una tiene una tonalidad mayor con la misma armadura.',
      pt: 'Sua terça, sexta e sétima descem meio tom, e isso a escurece. Cada uma tem uma tonalidade maior com a mesma armadura.',
      ja: '第3・第6・第7音が半音低く、それが暗さを作ります。同じ調号を持つ長調が対になります。',
      de: 'Terz, Sexte und Septime liegen einen Halbton tiefer — das macht sie dunkel. Zu jeder gehört eine Durtonart mit gleicher Vorzeichnung.',
      fr: 'Tierce, sixte et septième descendent d’un demi-ton, d’où sa noirceur. Chacune a une tonalité majeure de même armure.',
      hi: 'इसका तीसरा, छठा और सातवाँ स्वर आधा सुर नीचे रहता है, इसी से गहराई आती है। हर एक का एक मेजर जोड़ा होता है जिसकी की-सिग्नेचर वही है।',
    },
  },
  {
    id: 'dorian', everyRoot: false, steps: [0, 2, 3, 5, 7, 9, 10],
    name: { ko: '도리안 선법', en: 'Dorian mode', es: 'modo dórico', pt: 'modo dórico', ja: 'ドリアン旋法', de: 'dorischer Modus', fr: 'mode dorien', hi: 'डोरियन मोड' },
    feel: {
      ko: '단음계에서 여섯 번째 음만 올린 선법으로, 어둡지만 눌리지 않는 소리가 납니다.',
      en: 'A minor scale with the sixth raised — dark but not heavy.',
      es: 'Una escala menor con la sexta subida: oscura pero sin peso.',
      pt: 'Uma escala menor com a sexta elevada: escura, mas sem peso.',
      ja: '短音階の第6音だけを上げた旋法で、暗いのに重たくない響きです。',
      de: 'Eine Moll-Leiter mit erhöhter Sexte — dunkel, aber nicht schwer.',
      fr: 'Une gamme mineure à sixte haussée : sombre sans être lourde.',
      hi: 'माइनर स्केल जिसमें छठा स्वर ऊपर उठा है — गहरा, पर भारी नहीं।',
    },
  },
  {
    id: 'mixolydian', everyRoot: false, steps: [0, 2, 4, 5, 7, 9, 10],
    name: { ko: '믹솔리디안 선법', en: 'Mixolydian mode', es: 'modo mixolidio', pt: 'modo mixolídio', ja: 'ミクソリディアン旋法', de: 'mixolydischer Modus', fr: 'mode mixolydien', hi: 'मिक्सोलिडियन मोड' },
    feel: {
      ko: '장음계에서 일곱 번째 음만 내린 선법입니다. 록과 블루스의 솔로가 여기서 나옵니다.',
      en: 'A major scale with the seventh lowered. Rock and blues solos live here.',
      es: 'Una escala mayor con la séptima bajada. Aquí viven los solos de rock y blues.',
      pt: 'Uma escala maior com a sétima abaixada. Os solos de rock e blues vivem aqui.',
      ja: '長音階の第7音だけを下げた旋法です。ロックとブルースのソロはここから出ます。',
      de: 'Eine Dur-Leiter mit erniedrigter Septime. Hier wohnen Rock- und Bluessoli.',
      fr: 'Une gamme majeure à septième abaissée. C’est là que vivent les solos de rock et de blues.',
      hi: 'मेजर स्केल जिसमें सातवाँ स्वर नीचे है। रॉक और ब्लूज़ के सोलो यहीं से आते हैं।',
    },
  },
  {
    id: 'pentatonic', everyRoot: false, steps: [0, 2, 4, 7, 9],
    name: { ko: '5음 음계', en: 'major pentatonic scale', es: 'escala pentatónica mayor', pt: 'escala pentatônica maior', ja: '五音音階', de: 'Dur-Pentatonik', fr: 'gamme pentatonique majeure', hi: 'मेजर पेंटाटॉनिक स्केल' },
    feel: {
      ko: '반음이 없는 다섯 음이라 아무 순서로 눌러도 어긋나지 않습니다. 민요와 기타 솔로의 바탕입니다.',
      en: 'Five notes with no semitones, so any order sounds right. The basis of folk tunes and guitar solos.',
      es: 'Cinco notas sin semitonos: cualquier orden suena bien. Base de las melodías populares y los solos de guitarra.',
      pt: 'Cinco notas sem semitons: qualquer ordem soa bem. Base das melodias populares e dos solos de guitarra.',
      ja: '半音のない五音なので、どんな順で押しても外れません。民謡とギターソロの土台です。',
      de: 'Fünf Töne ohne Halbtonschritte — jede Reihenfolge klingt richtig. Grundlage von Volksliedern und Gitarrensoli.',
      fr: 'Cinq notes sans demi-tons : n’importe quel ordre sonne juste. La base des airs populaires et des solos de guitare.',
      hi: 'पाँच स्वर, कोई आधा सुर नहीं — किसी भी क्रम में बजाइए, बेसुरा नहीं होता। लोकधुनों और गिटार सोलो की बुनियाद।',
    },
  },
];

export interface IntervalDef {
  semitones: number;
  slug: string;
  name: L8<string>;
  /** 이 음정으로 시작하는 널리 알려진 노래 — 귀로 익히는 가장 빠른 길 */
  ear: L8<string>;
}

export const INTERVALS: IntervalDef[] = [
  {
    semitones: 1, slug: 'minor-second',
    name: { ko: '단2도', en: 'minor 2nd', es: 'segunda menor', pt: 'segunda menor', ja: '短2度', de: 'kleine Sekunde', fr: 'seconde mineure', hi: 'माइनर सेकंड' },
    ear: { ko: '영화 「조스」의 두 음', en: 'the two notes from Jaws', es: 'las dos notas de Tiburón', pt: 'as duas notas de Tubarão', ja: '映画『ジョーズ』の二音', de: 'die zwei Töne aus „Der weiße Hai“', fr: 'les deux notes des Dents de la mer', hi: 'फ़िल्म Jaws के दो स्वर' },
  },
  {
    semitones: 2, slug: 'major-second',
    name: { ko: '장2도', en: 'major 2nd', es: 'segunda mayor', pt: 'segunda maior', ja: '長2度', de: 'große Sekunde', fr: 'seconde majeure', hi: 'मेजर सेकंड' },
    ear: { ko: '「생일 축하합니다」의 첫 두 음', en: 'the first two notes of Happy Birthday', es: 'las dos primeras notas de Cumpleaños feliz', pt: 'as duas primeiras notas de Parabéns a Você', ja: '「ハッピーバースデー」の最初の二音', de: 'die ersten zwei Töne von „Happy Birthday“', fr: 'les deux premières notes de Joyeux anniversaire', hi: 'Happy Birthday के पहले दो स्वर' },
  },
  {
    semitones: 3, slug: 'minor-third',
    name: { ko: '단3도', en: 'minor 3rd', es: 'tercera menor', pt: 'terça menor', ja: '短3度', de: 'kleine Terz', fr: 'tierce mineure', hi: 'माइनर थर्ड' },
    ear: { ko: '마이너 코드의 밑에서 두 번째 음', en: 'the second note up in a minor chord', es: 'la segunda nota de un acorde menor', pt: 'a segunda nota de um acorde menor', ja: 'マイナーコードの下から二番目の音', de: 'der zweite Ton im Mollakkord', fr: 'la deuxième note d’un accord mineur', hi: 'माइनर कॉर्ड का नीचे से दूसरा स्वर' },
  },
  {
    semitones: 4, slug: 'major-third',
    name: { ko: '장3도', en: 'major 3rd', es: 'tercera mayor', pt: 'terça maior', ja: '長3度', de: 'große Terz', fr: 'tierce majeure', hi: 'मेजर थर्ड' },
    ear: { ko: '메이저 코드를 밝게 만드는 그 음', en: 'the note that makes a major chord bright', es: 'la nota que da brillo al acorde mayor', pt: 'a nota que dá brilho ao acorde maior', ja: 'メジャーコードを明るくするあの音', de: 'der Ton, der den Durakkord hell macht', fr: 'la note qui éclaire l’accord majeur', hi: 'वही स्वर जो मेजर कॉर्ड को चमकीला बनाता है' },
  },
  {
    semitones: 5, slug: 'perfect-fourth',
    name: { ko: '완전4도', en: 'perfect 4th', es: 'cuarta justa', pt: 'quarta justa', ja: '完全4度', de: 'Quarte', fr: 'quarte juste', hi: 'परफेक्ट फोर्थ' },
    ear: { ko: '「위 아 더 챔피언」의 시작', en: 'the start of We Are the Champions', es: 'el comienzo de We Are the Champions', pt: 'o início de We Are the Champions', ja: '「We Are the Champions」の始まり', de: 'der Anfang von „We Are the Champions“', fr: 'le début de We Are the Champions', hi: 'We Are the Champions की शुरुआत' },
  },
  {
    semitones: 6, slug: 'tritone',
    name: { ko: '증4도(트라이톤)', en: 'tritone', es: 'tritono', pt: 'trítono', ja: '三全音', de: 'Tritonus', fr: 'triton', hi: 'ट्राइटोन' },
    ear: { ko: '「심슨 가족」 주제가의 도입', en: 'the opening of The Simpsons theme', es: 'la entrada del tema de Los Simpson', pt: 'a entrada do tema dos Simpsons', ja: '『ザ・シンプソンズ』のテーマの入り', de: 'der Beginn der Simpsons-Titelmusik', fr: 'l’entrée du thème des Simpson', hi: 'The Simpsons थीम की शुरुआत' },
  },
  {
    semitones: 7, slug: 'perfect-fifth',
    name: { ko: '완전5도', en: 'perfect 5th', es: 'quinta justa', pt: 'quinta justa', ja: '完全5度', de: 'Quinte', fr: 'quinte juste', hi: 'परफेक्ट फिफ्थ' },
    ear: { ko: '「스타워즈」 주제가의 첫 도약', en: 'the first leap in the Star Wars theme', es: 'el primer salto del tema de Star Wars', pt: 'o primeiro salto do tema de Star Wars', ja: '『スター・ウォーズ』のテーマ最初の跳躍', de: 'der erste Sprung im Star-Wars-Thema', fr: 'le premier saut du thème de Star Wars', hi: 'Star Wars थीम की पहली छलांग' },
  },
  {
    semitones: 8, slug: 'minor-sixth',
    name: { ko: '단6도', en: 'minor 6th', es: 'sexta menor', pt: 'sexta menor', ja: '短6度', de: 'kleine Sexte', fr: 'sixte mineure', hi: 'माइनर सिक्स्थ' },
    ear: { ko: '「사랑의 테마」류의 애틋한 도약', en: 'the wistful leap of a love theme', es: 'el salto melancólico de un tema de amor', pt: 'o salto melancólico de um tema de amor', ja: 'ラブテーマ風の切ない跳躍', de: 'der wehmütige Sprung eines Liebesthemas', fr: 'le saut nostalgique d’un thème d’amour', hi: 'किसी प्रेम-धुन की उदास छलांग' },
  },
  {
    semitones: 9, slug: 'major-sixth',
    name: { ko: '장6도', en: 'major 6th', es: 'sexta mayor', pt: 'sexta maior', ja: '長6度', de: 'große Sexte', fr: 'sixte majeure', hi: 'मेजर सिक्स्थ' },
    ear: { ko: 'NBC 방송 시그널의 세 음', en: 'the three-note NBC chime', es: 'las tres notas del logo sonoro de NBC', pt: 'as três notas do sinal da NBC', ja: 'NBCのサウンドロゴの三音', de: 'die drei Töne des NBC-Jingles', fr: 'les trois notes du logo sonore de NBC', hi: 'NBC की तीन-स्वर वाली धुन' },
  },
  {
    semitones: 10, slug: 'minor-seventh',
    name: { ko: '단7도', en: 'minor 7th', es: 'séptima menor', pt: 'sétima menor', ja: '短7度', de: 'kleine Septime', fr: 'septième mineure', hi: 'माइनर सेवंथ' },
    ear: { ko: '「웨스트 사이드 스토리」의 “There’s a place…”', en: 'Somewhere from West Side Story', es: 'Somewhere de West Side Story', pt: 'Somewhere de West Side Story', ja: '『ウエスト・サイド物語』の Somewhere', de: '„Somewhere“ aus der West Side Story', fr: 'Somewhere de West Side Story', hi: 'West Side Story का Somewhere' },
  },
  {
    semitones: 11, slug: 'major-seventh',
    name: { ko: '장7도', en: 'major 7th', es: 'séptima mayor', pt: 'sétima maior', ja: '長7度', de: 'große Septime', fr: 'septième majeure', hi: 'मेजर सेवंथ' },
    ear: { ko: '옥타브에 반음 못 미치는 아릿한 거리', en: 'a semitone short of the octave — that ache', es: 'a medio tono de la octava: ese punzada', pt: 'a meio tom da oitava: aquela pontada', ja: 'オクターブに半音届かない、あの切なさ', de: 'einen Halbton unter der Oktave — dieses Ziehen', fr: 'à un demi-ton de l’octave : ce pincement', hi: 'ऑक्टेव से आधा सुर कम — वही टीस' },
  },
  {
    semitones: 12, slug: 'octave',
    name: { ko: '완전8도(옥타브)', en: 'octave', es: 'octava', pt: 'oitava', ja: 'オクターブ', de: 'Oktave', fr: 'octave', hi: 'ऑक्टेव' },
    ear: { ko: '「Somewhere over the rainbow」의 첫 도약', en: 'the first leap of Over the Rainbow', es: 'el primer salto de Over the Rainbow', pt: 'o primeiro salto de Over the Rainbow', ja: '「Over the Rainbow」の最初の跳躍', de: 'der erste Sprung von „Over the Rainbow“', fr: 'le premier saut d’Over the Rainbow', hi: 'Over the Rainbow की पहली छलांग' },
  },
];
