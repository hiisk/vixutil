/**
 * 새 스냅테스트의 도구별 문구 — 제목·설명·안내와 항목 이름.
 *
 * 결과 문장은 여기 없다. 그건 측정값에서 만든다(lib/snap/copy.ts의 VOCAB).
 * 여기 적는 것은 **측정으로 만들 수 없는 것**뿐이다.
 *
 * 항목 이름(METRIC)은 도구를 가로질러 함께 쓴다 — '기울기'는 증명사진과
 * 고개 각도가 같이 쓰고, '눈 뜬 정도'는 증명사진과 눈 검사가 같이 쓴다.
 */
import type { L10 } from './copy.ts';

export const NEW_SNAP_SLUGS = [
  'id-photo', 'head-pose', 'real-smile', 'eye-open', 'framing',
] as const;
export type NewSnapSlug = typeof NEW_SNAP_SLUGS[number];

export interface ToolText {
  title: string;
  desc: string;
  lead: string;
  privacy: string;
}

/** 항목 이름 — 도구가 공유한다 */
export type MetricKey =
  | 'faceSize' | 'centered' | 'eyeLine' | 'level' | 'eyesOpen'
  | 'roll' | 'yaw' | 'pitch'
  | 'mouth' | 'eyeSmile'
  | 'leftEye' | 'rightEye' | 'evenness'
  | 'headroom' | 'thirds' | 'size';

export interface SnapTextPack {
  tools: Record<NewSnapSlug, ToolText>;
  metric: Record<MetricKey, string>;
}

export const TOOL_TEXT: L10<SnapTextPack> = {
  ko: {
    tools: {
      'id-photo': { title: '증명사진 규격 검사', desc: '여권·증명사진 규격에 맞는지 다섯 가지로 확인', lead: '얼굴 크기·위치·눈높이·수평·눈 뜸을 실제로 재서 규격과 견줍니다', privacy: '여권 사진 규격 중 숫자로 확인할 수 있는 다섯 가지만 봅니다. 배경·표정·그림자 규정은 숫자로 잴 수 없어 여기서 다루지 않으므로, 이 검사를 통과해도 접수처에서 반려될 수 있습니다.' },
      'head-pose': { title: '고개 각도 측정', desc: '사진 속 고개가 얼마나 기울고 돌아갔는지', lead: '두 눈과 코·턱의 자리로 기울기·좌우 돌림·끄덕임을 잽니다', privacy: '기울기는 두 눈을 잇는 선의 각도라 도(°)로 정확히 나옵니다. 좌우 돌림과 끄덕임은 사진 한 장에 깊이 정보가 없어 각도가 아니라 치우침으로만 냅니다.' },
      'real-smile': { title: '진짜 웃음 지수', desc: '입만 웃는지, 눈까지 웃는지', lead: '입꼬리와 눈이 함께 움직였는지를 재서 뒤센 미소인지 봅니다', privacy: '진짜 즐거울 때는 눈둘레근이 함께 움직여 눈이 좁아진다고 알려져 있습니다(뒤센 미소). 여기서는 입이 웃을 때 눈이 얼마나 좁아졌는지만 재며, 감정을 판정하지 않습니다.' },
      'eye-open': { title: '눈 뜬 정도 측정', desc: '눈 감긴 사진인지, 좌우가 고른지', lead: '눈의 세로·가로 비(EAR)로 얼마나 떴는지 잽니다', privacy: '감은 눈과 뜬 눈을 가르는 흔한 방법인 EAR로 잽니다. 눈 크기가 작은 것과 눈을 감은 것은 다르며, 이 값은 눈 모양이 아니라 여는 정도를 봅니다.' },
      framing: { title: '인물 구도 분석', desc: '삼분할·머리 위 여백으로 보는 구도', lead: '얼굴이 화면 어디에 얼마나 크게 놓였는지를 잽니다', privacy: '삼분할선과 정중앙을 모두 정석으로 칩니다. 인물 사진에서 가운데 구도는 흔하고 틀린 것이 아니므로, 삼분할만 옳다고 말하지 않습니다.' },
    },
    metric: {
      faceSize: '얼굴 크기', centered: '좌우 가운데', eyeLine: '눈높이', level: '수평', eyesOpen: '눈 뜸',
      roll: '기울기', yaw: '좌우 돌림', pitch: '끄덕임',
      mouth: '입이 웃는 정도', eyeSmile: '눈이 웃는 정도',
      leftEye: '왼쪽 눈', rightEye: '오른쪽 눈', evenness: '좌우 고름',
      headroom: '머리 위 여백', thirds: '삼분할', size: '얼굴이 차지하는 몫',
    },
  },
  en: {
    tools: {
      'id-photo': { title: 'ID Photo Check', desc: 'Five checks against passport photo rules', lead: 'Face size, position, eye line, tilt and open eyes, measured and compared to the spec', privacy: 'Only the five parts of the passport spec that can be measured as numbers. Background, expression and shadow rules cannot be measured, so passing here does not guarantee acceptance.' },
      'head-pose': { title: 'Head Angle', desc: 'How much the head is tilted and turned', lead: 'Tilt, turn and nod measured from the eyes, nose and chin', privacy: 'Tilt comes from the angle of the line between the eyes, so it is exact in degrees. Turn and nod have no depth information in a single photo, so they are given as a lean, not an angle.' },
      'real-smile': { title: 'Real Smile Score', desc: 'Is it only the mouth, or the eyes too?', lead: 'Measures whether the corners of the mouth and the eyes moved together', privacy: 'A genuine smile is widely described as also narrowing the eyes (a Duchenne smile). This measures only how much the eyes narrow while the mouth smiles — it does not judge how you feel.' },
      'eye-open': { title: 'Eye Openness', desc: 'Blinked photo, and are both eyes even?', lead: 'Measured with the eye aspect ratio (EAR)', privacy: 'EAR is a common way to tell a shut eye from an open one. Small eyes and closed eyes are not the same thing — this reads how far the eyes are opened, not their shape.' },
      framing: { title: 'Portrait Framing', desc: 'Thirds and headroom', lead: 'Where the face sits in the frame, and how much of it fills', privacy: 'Both the thirds lines and dead centre count as correct. Centred portraits are common and not a mistake, so this does not treat the rule of thirds as the only right answer.' },
    },
    metric: {
      faceSize: 'Face size', centered: 'Centred', eyeLine: 'Eye line', level: 'Level', eyesOpen: 'Eyes open',
      roll: 'Tilt', yaw: 'Turn', pitch: 'Nod',
      mouth: 'Mouth smiling', eyeSmile: 'Eyes smiling',
      leftEye: 'Left eye', rightEye: 'Right eye', evenness: 'Both even',
      headroom: 'Headroom', thirds: 'Thirds', size: 'Face fills',
    },
  },
  es: {
    tools: {
      'id-photo': { title: 'Foto de carnet', desc: 'Cinco comprobaciones frente a las normas de pasaporte', lead: 'Tamaño, posición, línea de ojos, inclinación y ojos abiertos, medidos y comparados con la norma', privacy: 'Solo las cinco partes de la norma que pueden medirse como números. El fondo, la expresión y las sombras no se pueden medir, así que pasar aquí no garantiza la aceptación.' },
      'head-pose': { title: 'Ángulo de la cabeza', desc: 'Cuánto está inclinada y girada', lead: 'Inclinación, giro y cabeceo medidos desde ojos, nariz y mentón', privacy: 'La inclinación sale del ángulo de la línea entre los ojos, así que es exacta en grados. El giro y el cabeceo no tienen profundidad en una sola foto, por eso se dan como desviación y no como ángulo.' },
      'real-smile': { title: 'Sonrisa real', desc: '¿Solo la boca, o también los ojos?', lead: 'Mide si las comisuras y los ojos se movieron juntos', privacy: 'Se suele decir que la sonrisa genuina también estrecha los ojos (sonrisa de Duchenne). Aquí solo se mide cuánto se estrechan mientras la boca sonríe; no se juzga lo que sientes.' },
      'eye-open': { title: 'Apertura de ojos', desc: '¿Salió con los ojos cerrados? ¿Están parejos?', lead: 'Medido con la relación de aspecto del ojo (EAR)', privacy: 'El EAR es una forma habitual de distinguir un ojo cerrado de uno abierto. Ojos pequeños y ojos cerrados no son lo mismo: esto lee cuánto se abren, no su forma.' },
      framing: { title: 'Encuadre del retrato', desc: 'Tercios y aire sobre la cabeza', lead: 'Dónde queda la cara en el encuadre y cuánto ocupa', privacy: 'Tanto las líneas de tercios como el centro exacto cuentan como correctos. El retrato centrado es común y no es un error.' },
    },
    metric: {
      faceSize: 'Tamaño de la cara', centered: 'Centrado', eyeLine: 'Línea de ojos', level: 'Nivelado', eyesOpen: 'Ojos abiertos',
      roll: 'Inclinación', yaw: 'Giro', pitch: 'Cabeceo',
      mouth: 'Boca sonriendo', eyeSmile: 'Ojos sonriendo',
      leftEye: 'Ojo izquierdo', rightEye: 'Ojo derecho', evenness: 'Ambos parejos',
      headroom: 'Aire arriba', thirds: 'Tercios', size: 'La cara ocupa',
    },
  },
  'pt-br': {
    tools: {
      'id-photo': { title: 'Foto 3x4', desc: 'Cinco conferências frente às regras de passaporte', lead: 'Tamanho, posição, linha dos olhos, inclinação e olhos abertos, medidos e comparados à norma', privacy: 'Só as cinco partes da norma que dá para medir como número. Fundo, expressão e sombra não são mensuráveis, então passar aqui não garante aceitação.' },
      'head-pose': { title: 'Ângulo da cabeça', desc: 'O quanto está inclinada e virada', lead: 'Inclinação, giro e aceno medidos pelos olhos, nariz e queixo', privacy: 'A inclinação vem do ângulo da linha entre os olhos, então é exata em graus. Giro e aceno não têm profundidade numa foto só, por isso saem como desvio, não como ângulo.' },
      'real-smile': { title: 'Sorriso de verdade', desc: 'Só a boca, ou os olhos também?', lead: 'Mede se os cantos da boca e os olhos se moveram juntos', privacy: 'Costuma-se dizer que o sorriso genuíno também estreita os olhos (sorriso de Duchenne). Aqui se mede apenas o quanto eles estreitam enquanto a boca sorri; não se julga o que você sente.' },
      'eye-open': { title: 'Abertura dos olhos', desc: 'Saiu de olho fechado? Os dois estão iguais?', lead: 'Medido pela razão de aspecto do olho (EAR)', privacy: 'O EAR é um jeito comum de separar olho fechado de olho aberto. Olho pequeno e olho fechado não são a mesma coisa: isto lê o quanto abrem, não o formato.' },
      framing: { title: 'Enquadramento', desc: 'Terços e espaço acima da cabeça', lead: 'Onde o rosto fica no quadro e o quanto ele ocupa', privacy: 'Tanto as linhas dos terços quanto o centro exato contam como certos. Retrato centralizado é comum e não é erro.' },
    },
    metric: {
      faceSize: 'Tamanho do rosto', centered: 'Centralizado', eyeLine: 'Linha dos olhos', level: 'Nivelado', eyesOpen: 'Olhos abertos',
      roll: 'Inclinação', yaw: 'Giro', pitch: 'Aceno',
      mouth: 'Boca sorrindo', eyeSmile: 'Olhos sorrindo',
      leftEye: 'Olho esquerdo', rightEye: 'Olho direito', evenness: 'Os dois iguais',
      headroom: 'Espaço acima', thirds: 'Terços', size: 'O rosto ocupa',
    },
  },
  ja: {
    tools: {
      'id-photo': { title: '証明写真チェック', desc: 'パスポート写真の規格を5項目で確認', lead: '顔の大きさ・位置・目の高さ・傾き・目の開きを実測して規格と比べます', privacy: 'パスポート規格のうち数値で測れる5項目だけを見ます。背景・表情・影の規定は数値化できないため扱っておらず、ここを通っても窓口で差し戻されることがあります。' },
      'head-pose': { title: '顔の角度測定', desc: '写真の顔がどれだけ傾き、向いているか', lead: '両目と鼻・あごの位置から傾き・左右の向き・うなずきを測ります', privacy: '傾きは両目を結ぶ線の角度なので度で正確に出ます。左右の向きとうなずきは一枚の写真に奥行きがないため、角度ではなく偏りとして出します。' },
      'real-smile': { title: '本物の笑顔指数', desc: '口だけか、目まで笑っているか', lead: '口角と目が一緒に動いたかを測り、デュシェンヌ・スマイルかを見ます', privacy: '心からの笑いでは眼輪筋も動いて目が細くなるとされます（デュシェンヌ・スマイル）。ここでは口が笑うときに目がどれだけ細くなったかだけを測り、感情の判定はしません。' },
      'eye-open': { title: '目の開き測定', desc: '目つむり写真か、左右はそろっているか', lead: '目の縦横比（EAR）でどれだけ開いているかを測ります', privacy: '閉じた目と開いた目を見分けるのに広く使われるEARで測ります。目が小さいことと目を閉じていることは別で、この値は形ではなく開き具合を見ます。' },
      framing: { title: '人物の構図分析', desc: '三分割と頭上の余白で見る構図', lead: '顔が画面のどこに、どれくらいの大きさで置かれているかを測ります', privacy: '三分割線と中央のどちらも正解として扱います。人物写真で中央構図はよくあるもので、間違いではありません。' },
    },
    metric: {
      faceSize: '顔の大きさ', centered: '左右の中央', eyeLine: '目の高さ', level: '水平', eyesOpen: '目の開き',
      roll: '傾き', yaw: '左右の向き', pitch: 'うなずき',
      mouth: '口の笑い', eyeSmile: '目の笑い',
      leftEye: '左目', rightEye: '右目', evenness: '左右のそろい',
      headroom: '頭上の余白', thirds: '三分割', size: '顔の占める割合',
    },
  },
  de: {
    tools: {
      'id-photo': { title: 'Passbild-Check', desc: 'Fünf Prüfungen gegen die Passbild-Vorgaben', lead: 'Größe, Position, Augenlinie, Neigung und offene Augen — gemessen und mit der Vorgabe verglichen', privacy: 'Nur die fünf Punkte der Vorgabe, die sich als Zahl messen lassen. Hintergrund, Mimik und Schatten sind nicht messbar, ein Bestehen hier ist also keine Zusage der Behörde.' },
      'head-pose': { title: 'Kopfwinkel', desc: 'Wie stark der Kopf geneigt und gedreht ist', lead: 'Neigung, Drehung und Nicken, gemessen an Augen, Nase und Kinn', privacy: 'Die Neigung ergibt sich aus dem Winkel der Linie zwischen den Augen und ist daher in Grad exakt. Drehung und Nicken haben in einem einzelnen Foto keine Tiefe und werden deshalb als Abweichung angegeben, nicht als Winkel.' },
      'real-smile': { title: 'Echtes Lächeln', desc: 'Nur der Mund oder auch die Augen?', lead: 'Misst, ob Mundwinkel und Augen sich zusammen bewegt haben', privacy: 'Einem echten Lächeln wird nachgesagt, dass sich dabei auch die Augen verengen (Duchenne-Lächeln). Gemessen wird nur, wie stark sich die Augen verengen, während der Mund lächelt — dein Gefühl wird nicht beurteilt.' },
      'eye-open': { title: 'Augenöffnung', desc: 'Augen zu erwischt? Sind beide gleich?', lead: 'Gemessen über das Seitenverhältnis des Auges (EAR)', privacy: 'EAR ist ein gängiges Maß, um geschlossene von offenen Augen zu unterscheiden. Kleine Augen und geschlossene Augen sind nicht dasselbe — gemessen wird die Öffnung, nicht die Form.' },
      framing: { title: 'Bildaufbau', desc: 'Drittel und Kopffreiheit', lead: 'Wo das Gesicht im Bild sitzt und wie viel es füllt', privacy: 'Sowohl die Drittellinien als auch die genaue Mitte gelten als richtig. Mittige Porträts sind üblich und kein Fehler.' },
    },
    metric: {
      faceSize: 'Gesichtsgröße', centered: 'Mittig', eyeLine: 'Augenlinie', level: 'Waagerecht', eyesOpen: 'Augen offen',
      roll: 'Neigung', yaw: 'Drehung', pitch: 'Nicken',
      mouth: 'Mund lächelt', eyeSmile: 'Augen lächeln',
      leftEye: 'Linkes Auge', rightEye: 'Rechtes Auge', evenness: 'Beide gleich',
      headroom: 'Kopffreiheit', thirds: 'Drittel', size: 'Gesicht füllt',
    },
  },
  fr: {
    tools: {
      'id-photo': { title: "Photo d'identité", desc: 'Cinq contrôles face aux règles du passeport', lead: "Taille, position, ligne des yeux, inclinaison et yeux ouverts, mesurés et comparés à la norme", privacy: "Seuls les cinq points de la norme qui se mesurent en chiffres. Le fond, l'expression et les ombres ne sont pas mesurables : réussir ici ne garantit pas l'acceptation au guichet." },
      'head-pose': { title: 'Angle de la tête', desc: "À quel point la tête penche et tourne", lead: 'Inclinaison, rotation et hochement mesurés sur les yeux, le nez et le menton', privacy: "L'inclinaison vient de l'angle de la ligne entre les yeux : elle est exacte en degrés. La rotation et le hochement n'ont pas de profondeur sur une seule photo, ils sont donc donnés comme un écart et non comme un angle." },
      'real-smile': { title: 'Vrai sourire', desc: 'La bouche seule, ou aussi les yeux ?', lead: 'Mesure si les coins de la bouche et les yeux ont bougé ensemble', privacy: "On dit d'un sourire sincère qu'il plisse aussi les yeux (sourire de Duchenne). Ici on mesure seulement de combien les yeux se plissent pendant que la bouche sourit ; votre ressenti n'est pas jugé." },
      'eye-open': { title: 'Ouverture des yeux', desc: 'Photo les yeux fermés ? Les deux sont-ils égaux ?', lead: "Mesuré par le rapport d'aspect de l'œil (EAR)", privacy: "L'EAR est une façon courante de distinguer un œil fermé d'un œil ouvert. Petits yeux et yeux fermés ne sont pas la même chose : on lit l'ouverture, pas la forme." },
      framing: { title: 'Cadrage du portrait', desc: 'Tiers et espace au-dessus de la tête', lead: 'Où se place le visage dans le cadre et quelle place il occupe', privacy: "Les lignes de tiers et le centre exact comptent tous deux comme justes. Le portrait centré est courant et n'est pas une erreur." },
    },
    metric: {
      faceSize: 'Taille du visage', centered: 'Centré', eyeLine: 'Ligne des yeux', level: 'Horizontal', eyesOpen: 'Yeux ouverts',
      roll: 'Inclinaison', yaw: 'Rotation', pitch: 'Hochement',
      mouth: 'Bouche qui sourit', eyeSmile: 'Yeux qui sourient',
      leftEye: 'Œil gauche', rightEye: 'Œil droit', evenness: 'Les deux égaux',
      headroom: 'Espace au-dessus', thirds: 'Tiers', size: 'Le visage occupe',
    },
  },
  hi: {
    tools: {
      'id-photo': { title: 'पासपोर्ट फ़ोटो जाँच', desc: 'पासपोर्ट फ़ोटो नियमों के विरुद्ध पाँच जाँच', lead: 'चेहरे का आकार, स्थिति, आँख की रेखा, झुकाव और खुली आँखें नापकर मानक से मिलाई जाती हैं', privacy: 'मानक के केवल वे पाँच हिस्से देखे जाते हैं जो संख्या में नापे जा सकते हैं। पृष्ठभूमि, भाव और छाया के नियम नापे नहीं जा सकते, इसलिए यहाँ पास होना स्वीकृति की गारंटी नहीं है।' },
      'head-pose': { title: 'सिर का कोण', desc: 'सिर कितना झुका और घूमा हुआ है', lead: 'आँखों, नाक और ठुड्डी से झुकाव, घुमाव और सिर हिलाव नापा जाता है', privacy: 'झुकाव दोनों आँखों को जोड़ने वाली रेखा के कोण से आता है, इसलिए वह डिग्री में सटीक है। एक तस्वीर में गहराई नहीं होती, इसलिए घुमाव और हिलाव कोण नहीं बल्कि झुकाव के रूप में दिए जाते हैं।' },
      'real-smile': { title: 'असली मुस्कान', desc: 'सिर्फ़ होंठ, या आँखें भी?', lead: 'नापता है कि होंठों के कोने और आँखें साथ हिलीं या नहीं', privacy: 'कहा जाता है कि सच्ची मुस्कान में आँखें भी सिकुड़ती हैं (डचेन मुस्कान)। यहाँ केवल यह नापा जाता है कि होंठ मुस्कुराते समय आँखें कितनी सिकुड़ीं — आपकी भावना का आकलन नहीं होता।' },
      'eye-open': { title: 'आँख खुलने की माप', desc: 'आँख बंद वाली तस्वीर? दोनों बराबर हैं?', lead: 'आँख के अनुपात (EAR) से नापा जाता है', privacy: 'बंद और खुली आँख में फ़र्क़ करने का आम तरीक़ा EAR है। छोटी आँखें और बंद आँखें एक बात नहीं — यह खुलने की मात्रा पढ़ता है, आकार नहीं।' },
      framing: { title: 'फ़्रेमिंग विश्लेषण', desc: 'तिहाई और सिर के ऊपर की जगह', lead: 'चेहरा फ़्रेम में कहाँ और कितना बड़ा है', privacy: 'तिहाई रेखाएँ और ठीक बीच — दोनों सही माने जाते हैं। बीच में रखा पोर्ट्रेट आम है और ग़लत नहीं।' },
    },
    metric: {
      faceSize: 'चेहरे का आकार', centered: 'बीच में', eyeLine: 'आँख की रेखा', level: 'समतल', eyesOpen: 'आँखें खुली',
      roll: 'झुकाव', yaw: 'घुमाव', pitch: 'सिर हिलाव',
      mouth: 'होंठ मुस्कुराते', eyeSmile: 'आँखें मुस्कुरातीं',
      leftEye: 'बाईं आँख', rightEye: 'दाईं आँख', evenness: 'दोनों बराबर',
      headroom: 'ऊपर की जगह', thirds: 'तिहाई', size: 'चेहरा घेरता है',
    },
  },
  'zh-hans': {
    tools: {
      'id-photo': { title: '证件照规格检查', desc: '按护照照片规定做五项核对', lead: '实测脸部大小、位置、眼睛高度、倾斜和睁眼程度，再和规格比对', privacy: '只看护照规格中能用数字量的五项。背景、表情和阴影的规定无法量化，因此这里通过并不代表窗口一定受理。' },
      'head-pose': { title: '头部角度测量', desc: '照片里头歪了多少、转了多少', lead: '用双眼与鼻、下巴的位置量出倾斜、左右转动和点头', privacy: '倾斜由两眼连线的角度得出，所以能精确到度。单张照片没有深度信息，左右转动和点头只能给出偏移量而不是角度。' },
      'real-smile': { title: '真笑指数', desc: '只是嘴在笑，还是眼睛也在笑？', lead: '测量嘴角和眼睛是否一起动了，看是不是杜氏微笑', privacy: '一般认为发自内心的笑会让眼轮匝肌一起动、眼睛变窄（杜氏微笑）。这里只测量嘴笑时眼睛收窄了多少，不判断你的情绪。' },
      'eye-open': { title: '睁眼程度测量', desc: '是不是闭眼照？两边是否一致？', lead: '用眼睛长宽比（EAR）量出睁开的程度', privacy: '用来区分闭眼和睁眼的常用方法是 EAR。眼睛小和闭着眼不是一回事，这个数值看的是睁开程度而不是形状。' },
      framing: { title: '人像构图分析', desc: '三分法和头顶留白', lead: '测量脸在画面中的位置和占比', privacy: '三分线和正中都算标准。人像照片里居中构图很常见，并不是错的。' },
    },
    metric: {
      faceSize: '脸部大小', centered: '左右居中', eyeLine: '眼睛高度', level: '水平', eyesOpen: '睁眼',
      roll: '倾斜', yaw: '左右转动', pitch: '点头',
      mouth: '嘴在笑', eyeSmile: '眼在笑',
      leftEye: '左眼', rightEye: '右眼', evenness: '左右一致',
      headroom: '头顶留白', thirds: '三分法', size: '脸部占比',
    },
  },
  'zh-hant': {
    tools: {
      'id-photo': { title: '證件照規格檢查', desc: '依護照照片規定做五項核對', lead: '實測臉部大小、位置、眼睛高度、傾斜與睜眼程度，再與規格比對', privacy: '只看護照規格中能用數字量的五項。背景、表情與陰影的規定無法量化，因此這裡通過並不代表櫃檯一定受理。' },
      'head-pose': { title: '頭部角度測量', desc: '照片裡頭歪了多少、轉了多少', lead: '用雙眼與鼻、下巴的位置量出傾斜、左右轉動與點頭', privacy: '傾斜由兩眼連線的角度得出，所以能精確到度。單張照片沒有深度資訊，左右轉動與點頭只能給出偏移量而不是角度。' },
      'real-smile': { title: '真笑指數', desc: '只是嘴在笑，還是眼睛也在笑？', lead: '量測嘴角與眼睛是否一起動了，看是不是杜氏微笑', privacy: '一般認為發自內心的笑會讓眼輪匝肌一起動、眼睛變窄（杜氏微笑）。這裡只量測嘴笑時眼睛收窄了多少，不判斷你的情緒。' },
      'eye-open': { title: '睜眼程度測量', desc: '是不是閉眼照？兩邊是否一致？', lead: '用眼睛長寬比（EAR）量出睜開的程度', privacy: '用來分辨閉眼與睜眼的常用方法是 EAR。眼睛小和閉著眼不是一回事，這個數值看的是睜開程度而不是形狀。' },
      framing: { title: '人像構圖分析', desc: '三分法與頭頂留白', lead: '量測臉在畫面中的位置與占比', privacy: '三分線與正中都算標準。人像照片裡置中構圖很常見，並不是錯的。' },
    },
    metric: {
      faceSize: '臉部大小', centered: '左右置中', eyeLine: '眼睛高度', level: '水平', eyesOpen: '睜眼',
      roll: '傾斜', yaw: '左右轉動', pitch: '點頭',
      mouth: '嘴在笑', eyeSmile: '眼在笑',
      leftEye: '左眼', rightEye: '右眼', evenness: '左右一致',
      headroom: '頭頂留白', thirds: '三分法', size: '臉部占比',
    },
  },
};
