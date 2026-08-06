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
  // 랜드마크만 보는 다섯
  'id-photo', 'head-pose', 'real-smile', 'eye-open', 'framing',
  // 픽셀까지 보는 다섯
  'lighting', 'sharpness', 'white-balance', 'distance', 'mirror',
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
  | 'headroom' | 'thirds' | 'size'
  | 'sideLight' | 'topLight' | 'backlit' | 'exposure'
  | 'focus' | 'temp' | 'tint'
  | 'shotDistance' | 'faceFill' | 'perspective'
  | 'axisBalance';

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
      'lighting': { title: '조명 방향 분석', desc: '빛이 어디서 오는지, 역광인지', lead: '얼굴의 좌우·위아래 밝기와 배경 밝기를 재서 빛의 방향을 짚습니다', privacy: '밝기는 사진에서 실제로 잰 값입니다. 다만 얼굴에 드리운 그림자와 원래 피부색을 구분하지는 못하므로, 한쪽이 어둡게 나와도 조명 탓이 아닐 수 있습니다.' },
      'sharpness': { title: '사진 선명도 검사', desc: '흔들렸는지, 초점이 맞았는지', lead: '얼굴 영역의 이웃 픽셀 차이로 또렷함을 잽니다', privacy: '얼굴 안쪽만 잽니다. 배경을 흐리게 찍은 인물 사진에서 전체를 재면 흔들렸다고 나오는데, 정작 얼굴은 또렷한 좋은 사진이기 때문입니다.' },
      'white-balance': { title: '화이트밸런스 검사', desc: '사진 색이 어느 쪽으로 치우쳤는지', lead: '화면 전체 색 평균으로 색온도와 색조의 치우침을 잽니다', privacy: '화면 평균이 회색이어야 한다고 보고 잽니다(회색세계 가정). 노을이나 단풍처럼 한 색이 실제로 많은 사진은 치우쳤다고 나오는데, 그건 이 가정의 한계이지 사진이 잘못된 것이 아닙니다.' },
      'distance': { title: '촬영 거리 어림', desc: '얼마나 가까이서 찍었고 얼굴이 얼마나 왜곡됐는지', lead: '얼굴 너비가 화면에서 차지하는 몫과 렌즈 화각으로 거리를 어림합니다', privacy: '사진에 렌즈 화각이 적혀 있지 않고 머리 너비도 사람마다 달라, 이것은 측정이 아니라 어림입니다. 스마트폰 주카메라(약 70도)와 성인 머리 너비 145mm를 가정합니다.' },
      'mirror': { title: '좌우 합성 얼굴', desc: '왼쪽만·오른쪽만으로 만든 두 얼굴', lead: '콧대를 축으로 왼쪽 반쪽과 오른쪽 반쪽을 각각 거울처럼 붙여 봅니다', privacy: '재는 것이 아니라 실제로 이미지를 뒤집어 붙인 것입니다. 정면이 아닌 사진에서는 두 얼굴이 크게 달라지는데, 그건 얼굴이 비대칭이어서가 아니라 고개가 돌아가 있어서입니다.' },
    },
    metric: {
      sideLight: '좌우 밝기 차', topLight: '위아래 밝기 차', backlit: '역광', exposure: '노출', focus: '초점', temp: '색온도', tint: '색조', shotDistance: '어림 거리', faceFill: '얼굴이 차지하는 몫', perspective: '원근 왜곡', axisBalance: '좌우 폭 균형',
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
      'lighting': { title: 'Lighting Direction', desc: 'Where the light comes from, and is it backlit?', lead: 'Reads the light direction from the brightness across the face and behind it', privacy: 'The brightness is measured from your photo. It cannot separate a shadow from your natural skin tone, so a darker side is not always the light.' },
      'sharpness': { title: 'Photo Sharpness', desc: 'Shaken, or in focus?', lead: 'Measures crispness from neighbouring-pixel differences inside the face', privacy: 'Only the face is measured. On a portrait with a deliberately blurred background, measuring the whole frame would call a perfectly sharp face blurry.' },
      'white-balance': { title: 'White Balance', desc: 'Which way the colour leans', lead: 'Reads colour temperature and tint from the average colour of the frame', privacy: 'This assumes the average of a frame should be grey (the grey-world assumption). A sunset or autumn leaves will read as leaning — that is the limit of the assumption, not a fault in the photo.' },
      'distance': { title: 'Shooting Distance', desc: 'How close the camera was, and how much the face is stretched', lead: 'Estimates the distance from how much of the frame the face fills and the lens angle', privacy: 'The lens angle is not stored in the photo and head width varies, so this is an estimate, not a measurement. It assumes a phone main camera (about 70 degrees) and a 145 mm head.' },
      'mirror': { title: 'Mirror Faces', desc: 'Two faces: left half doubled, right half doubled', lead: 'Mirrors each half of your face across the bridge of the nose', privacy: 'Nothing is scored here — the image really is flipped and joined. In a photo taken off-centre the two faces differ a lot, and that is the head being turned, not an asymmetric face.' },
    },
    metric: {
      sideLight: 'Side difference', topLight: 'Top–bottom difference', backlit: 'Backlight', exposure: 'Exposure', focus: 'Focus', temp: 'Temperature', tint: 'Tint', shotDistance: 'Estimated distance', faceFill: 'Face fills', perspective: 'Perspective stretch', axisBalance: 'Half-width balance',
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
      'lighting': { title: 'Dirección de la luz', desc: 'De dónde viene la luz, ¿hay contraluz?', lead: 'Lee la dirección de la luz por el brillo de la cara y del fondo', privacy: 'El brillo se mide en tu foto. No puede separar una sombra de tu tono de piel, así que un lado oscuro no siempre es la luz.' },
      'sharpness': { title: 'Nitidez de la foto', desc: '¿Movida o enfocada?', lead: 'Mide la nitidez por la diferencia entre píxeles vecinos dentro de la cara', privacy: 'Solo se mide la cara. En un retrato con fondo desenfocado a propósito, medir todo el cuadro llamaría movida a una cara perfectamente nítida.' },
      'white-balance': { title: 'Balance de blancos', desc: 'Hacia dónde se inclina el color', lead: 'Lee la temperatura y el matiz desde el color medio del cuadro', privacy: 'Supone que la media del cuadro debería ser gris (hipótesis del mundo gris). Un atardecer saldrá inclinado: es el límite de la hipótesis, no un fallo de la foto.' },
      'distance': { title: 'Distancia de disparo', desc: 'Qué tan cerca estaba la cámara y cuánto se estira la cara', lead: 'Estima la distancia por lo que ocupa la cara y el ángulo del objetivo', privacy: 'El ángulo del objetivo no está en la foto y el ancho de cabeza varía, así que es una estimación. Supone cámara principal de móvil (unos 70 grados) y cabeza de 145 mm.' },
      'mirror': { title: 'Caras espejo', desc: 'Dos caras: mitad izquierda y mitad derecha duplicadas', lead: 'Refleja cada mitad de la cara sobre el puente de la nariz', privacy: 'Aquí no se puntúa nada: la imagen se voltea y se une de verdad. En una foto de perfil las dos caras difieren mucho, y eso es la cabeza girada, no una cara asimétrica.' },
    },
    metric: {
      sideLight: 'Diferencia lateral', topLight: 'Diferencia arriba-abajo', backlit: 'Contraluz', exposure: 'Exposición', focus: 'Enfoque', temp: 'Temperatura', tint: 'Matiz', shotDistance: 'Distancia estimada', faceFill: 'La cara ocupa', perspective: 'Estiramiento', axisBalance: 'Equilibrio de mitades',
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
      'lighting': { title: 'Direção da luz', desc: 'De onde vem a luz, tem contraluz?', lead: 'Lê a direção da luz pelo brilho do rosto e do fundo', privacy: 'O brilho é medido na sua foto. Não dá para separar uma sombra do seu tom de pele, então um lado escuro nem sempre é a luz.' },
      'sharpness': { title: 'Nitidez da foto', desc: 'Tremida ou em foco?', lead: 'Mede a nitidez pela diferença entre pixels vizinhos dentro do rosto', privacy: 'Só o rosto é medido. Num retrato com fundo desfocado de propósito, medir o quadro inteiro chamaria de tremido um rosto perfeitamente nítido.' },
      'white-balance': { title: 'Balanço de branco', desc: 'Para que lado a cor pende', lead: 'Lê a temperatura e o matiz pela cor média do quadro', privacy: 'Supõe que a média do quadro deveria ser cinza (hipótese do mundo cinza). Um pôr do sol vai sair pendendo: é o limite da hipótese, não um defeito da foto.' },
      'distance': { title: 'Distância do clique', desc: 'O quão perto a câmera estava e o quanto o rosto estica', lead: 'Estima a distância pelo quanto o rosto ocupa e pelo ângulo da lente', privacy: 'O ângulo da lente não está na foto e a largura da cabeça varia, então isto é uma estimativa. Supõe câmera principal de celular (uns 70 graus) e cabeça de 145 mm.' },
      'mirror': { title: 'Rostos espelhados', desc: 'Dois rostos: metade esquerda e metade direita duplicadas', lead: 'Espelha cada metade do rosto sobre o dorso do nariz', privacy: 'Aqui nada é pontuado: a imagem é realmente virada e unida. Numa foto de lado os dois rostos ficam bem diferentes, e isso é a cabeça virada, não um rosto assimétrico.' },
    },
    metric: {
      sideLight: 'Diferença lateral', topLight: 'Diferença cima-baixo', backlit: 'Contraluz', exposure: 'Exposição', focus: 'Foco', temp: 'Temperatura', tint: 'Matiz', shotDistance: 'Distância estimada', faceFill: 'O rosto ocupa', perspective: 'Esticamento', axisBalance: 'Equilíbrio das metades',
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
      'lighting': { title: '照明の向き分析', desc: '光がどこから来ているか、逆光か', lead: '顔の左右・上下の明るさと背景の明るさから光の向きを読みます', privacy: '明るさは写真から実際に測った値です。ただし影と地肌の色は区別できないので、片側が暗く出ても照明のせいとは限りません。' },
      'sharpness': { title: '写真のシャープさ検査', desc: 'ぶれているか、ピントは合っているか', lead: '顔の範囲で隣り合う画素の差から鮮明さを測ります', privacy: '顔の内側だけを測ります。背景をぼかした人物写真で全体を測ると、顔は鮮明なのに「ぶれている」と出てしまうからです。' },
      'white-balance': { title: 'ホワイトバランス検査', desc: '写真の色がどちらに寄っているか', lead: '画面全体の平均色から色温度と色かぶりの偏りを測ります', privacy: '画面の平均は灰色になるはず、という前提で測ります。夕焼けのように実際に一色が多い写真は偏りと出ますが、それは前提の限界であって写真の欠点ではありません。' },
      'distance': { title: '撮影距離の目安', desc: 'どれくらい近くで撮ったか、顔がどれだけ歪んでいるか', lead: '顔の幅が画面に占める割合とレンズの画角から距離を見積もります', privacy: '画角は写真に記録されておらず頭幅にも個人差があるため、これは測定ではなく目安です。スマホの主カメラ（約70度）と成人の頭幅145mmを仮定しています。' },
      'mirror': { title: '左右合成の顔', desc: '左半分だけ・右半分だけで作った二つの顔', lead: '鼻すじを軸に、左右それぞれの半分を鏡のように合わせます', privacy: 'ここでは点数をつけません。実際に画像を反転して貼り合わせています。正面でない写真では二つの顔が大きく違いますが、それは顔が非対称なのではなく顔が向いているからです。' },
    },
    metric: {
      sideLight: '左右の明るさ差', topLight: '上下の明るさ差', backlit: '逆光', exposure: '露出', focus: 'ピント', temp: '色温度', tint: '色かぶり', shotDistance: '推定距離', faceFill: '顔の占める割合', perspective: '遠近の歪み', axisBalance: '左右の幅バランス',
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
      'lighting': { title: 'Lichtrichtung', desc: 'Woher das Licht kommt, und ist es Gegenlicht?', lead: 'Liest die Lichtrichtung aus der Helligkeit im Gesicht und dahinter', privacy: 'Die Helligkeit ist an deinem Foto gemessen. Ein Schatten lässt sich nicht von deinem Hautton trennen, eine dunklere Seite ist also nicht immer das Licht.' },
      'sharpness': { title: 'Bildschärfe', desc: 'Verwackelt oder scharf?', lead: 'Misst die Schärfe aus den Unterschieden benachbarter Pixel im Gesicht', privacy: 'Gemessen wird nur das Gesicht. Bei einem Porträt mit absichtlich unscharfem Hintergrund würde die Messung über das ganze Bild ein gestochen scharfes Gesicht als verwackelt melden.' },
      'white-balance': { title: 'Weißabgleich', desc: 'Wohin die Farbe kippt', lead: 'Liest Farbtemperatur und Farbstich aus der Durchschnittsfarbe des Bildes', privacy: 'Es wird angenommen, dass der Bilddurchschnitt grau sein sollte. Ein Sonnenuntergang gilt dann als gekippt — das ist die Grenze der Annahme, kein Fehler im Foto.' },
      'distance': { title: 'Aufnahmeabstand', desc: 'Wie nah die Kamera war und wie stark das Gesicht verzerrt ist', lead: 'Schätzt den Abstand daraus, wie viel Bildbreite das Gesicht füllt, und aus dem Bildwinkel', privacy: 'Der Bildwinkel steht nicht im Foto und die Kopfbreite ist verschieden — das ist eine Schätzung, keine Messung. Angenommen werden Handy-Hauptkamera (etwa 70 Grad) und 145 mm Kopfbreite.' },
      'mirror': { title: 'Spiegelgesichter', desc: 'Zwei Gesichter: linke und rechte Hälfte verdoppelt', lead: 'Spiegelt jede Gesichtshälfte am Nasenrücken', privacy: 'Hier wird nichts bewertet — das Bild wird wirklich gespiegelt und zusammengesetzt. Bei einem schrägen Foto unterscheiden sich die beiden stark, und das ist der gedrehte Kopf, kein unsymmetrisches Gesicht.' },
    },
    metric: {
      sideLight: 'Seitenunterschied', topLight: 'Oben-unten-Unterschied', backlit: 'Gegenlicht', exposure: 'Belichtung', focus: 'Schärfe', temp: 'Temperatur', tint: 'Farbstich', shotDistance: 'Geschätzter Abstand', faceFill: 'Gesicht füllt', perspective: 'Perspektivische Dehnung', axisBalance: 'Hälften im Gleichgewicht',
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
      'lighting': { title: 'Direction de la lumière', desc: 'D’où vient la lumière, y a-t-il un contre-jour ?', lead: 'Lit la direction de la lumière d’après la luminosité du visage et du fond', privacy: 'La luminosité est mesurée sur votre photo. Une ombre ne se distingue pas de votre carnation : un côté sombre n’est pas toujours la lumière.' },
      'sharpness': { title: 'Netteté de la photo', desc: 'Bougée ou nette ?', lead: 'Mesure la netteté par la différence entre pixels voisins dans le visage', privacy: 'Seul le visage est mesuré. Sur un portrait au fond volontairement flou, mesurer toute l’image déclarerait bougé un visage parfaitement net.' },
      'white-balance': { title: 'Balance des blancs', desc: 'De quel côté penche la couleur', lead: 'Lit la température et la teinte à partir de la couleur moyenne de l’image', privacy: 'On suppose que la moyenne de l’image devrait être grise. Un coucher de soleil ressortira penché : c’est la limite de l’hypothèse, pas un défaut de la photo.' },
      'distance': { title: 'Distance de prise de vue', desc: 'À quelle distance et combien le visage est étiré', lead: 'Estime la distance d’après la place du visage dans le cadre et l’angle de l’objectif', privacy: 'L’angle n’est pas enregistré dans la photo et la largeur de tête varie : c’est une estimation, pas une mesure. On suppose un appareil principal de téléphone (environ 70 degrés) et une tête de 145 mm.' },
      'mirror': { title: 'Visages miroir', desc: 'Deux visages : moitié gauche et moitié droite doublées', lead: 'Reflète chaque moitié du visage sur l’arête du nez', privacy: 'Rien n’est noté ici — l’image est vraiment retournée et recollée. Sur une photo de trois quarts les deux visages diffèrent beaucoup : c’est la tête tournée, pas un visage asymétrique.' },
    },
    metric: {
      sideLight: 'Écart gauche-droite', topLight: 'Écart haut-bas', backlit: 'Contre-jour', exposure: 'Exposition', focus: 'Mise au point', temp: 'Température', tint: 'Teinte', shotDistance: 'Distance estimée', faceFill: 'Le visage occupe', perspective: 'Étirement', axisBalance: 'Équilibre des moitiés',
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
      'lighting': { title: 'रोशनी की दिशा', desc: 'रोशनी कहाँ से आ रही है, बैकलाइट है क्या?', lead: 'चेहरे और पृष्ठभूमि की चमक से रोशनी की दिशा पढ़ी जाती है', privacy: 'चमक आपकी तस्वीर से नापी गई है। छाया और आपकी त्वचा के रंग में फ़र्क़ नहीं किया जा सकता, इसलिए एक तरफ़ अँधेरा हमेशा रोशनी की वजह से नहीं होता।' },
      'sharpness': { title: 'तस्वीर की तीक्ष्णता', desc: 'हिली हुई है या फ़ोकस में?', lead: 'चेहरे के भीतर पड़ोसी पिक्सल के अंतर से तीक्ष्णता नापी जाती है', privacy: 'सिर्फ़ चेहरा नापा जाता है। जान-बूझकर धुँधली पृष्ठभूमि वाले पोर्ट्रेट में पूरा फ़्रेम नापने पर बिलकुल साफ़ चेहरा भी हिला हुआ बताया जाता।' },
      'white-balance': { title: 'व्हाइट बैलेंस जाँच', desc: 'रंग किस ओर झुका है', lead: 'पूरे फ़्रेम के औसत रंग से रंग-ताप और रंगत का झुकाव नापा जाता है', privacy: 'मान लिया जाता है कि फ़्रेम का औसत धूसर होना चाहिए। सूर्यास्त झुका हुआ दिखेगा — यह धारणा की सीमा है, तस्वीर की ख़ामी नहीं।' },
      'distance': { title: 'खींचने की दूरी का अनुमान', desc: 'कैमरा कितना पास था और चेहरा कितना खिंचा है', lead: 'चेहरा फ़्रेम में कितना भरता है और लेंस के कोण से दूरी का अनुमान', privacy: 'लेंस का कोण तस्वीर में दर्ज नहीं होता और सिर की चौड़ाई अलग-अलग होती है, इसलिए यह नाप नहीं अनुमान है। फ़ोन का मुख्य कैमरा (क़रीब 70 डिग्री) और 145 मिमी सिर मान लिया गया है।' },
      'mirror': { title: 'दर्पण चेहरे', desc: 'दो चेहरे: बायाँ आधा और दायाँ आधा दुगुना', lead: 'नाक की हड्डी को धुरी मानकर चेहरे के हर आधे हिस्से को दर्पण की तरह जोड़ा जाता है', privacy: 'यहाँ कुछ आँका नहीं जाता — तस्वीर सचमुच पलटकर जोड़ी जाती है। तिरछी तस्वीर में दोनों चेहरे बहुत अलग दिखेंगे, वह सिर के मुड़े होने से है, चेहरे के असमान होने से नहीं।' },
    },
    metric: {
      sideLight: 'बाएँ-दाएँ अंतर', topLight: 'ऊपर-नीचे अंतर', backlit: 'बैकलाइट', exposure: 'एक्सपोज़र', focus: 'फ़ोकस', temp: 'रंग-ताप', tint: 'रंगत', shotDistance: 'अनुमानित दूरी', faceFill: 'चेहरा घेरता है', perspective: 'परिप्रेक्ष्य खिंचाव', axisBalance: 'आधे हिस्सों का संतुलन',
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
      'lighting': { title: '光线方向分析', desc: '光从哪边来，是不是逆光', lead: '用脸部左右、上下的亮度和背景亮度判断光的方向', privacy: '亮度是从照片上实际测得的。不过阴影和肤色本身无法区分，所以一侧偏暗不一定是光造成的。' },
      'sharpness': { title: '照片清晰度检查', desc: '是糊了还是对上焦了', lead: '用脸部范围内相邻像素的差异衡量清晰度', privacy: '只测脸部。人像照片常故意虚化背景，如果整幅一起测，脸明明很清晰也会被判成糊了。' },
      'white-balance': { title: '白平衡检查', desc: '照片颜色偏向哪一边', lead: '用整幅画面的平均颜色测色温和色调的偏移', privacy: '这里假定整幅画面的平均应当是灰色。晚霞或红叶这类本来就偏色的照片会被判为偏色，那是假设的局限，不是照片的问题。' },
      'distance': { title: '拍摄距离估算', desc: '拍得多近，脸被拉伸了多少', lead: '用脸部占画面的比例和镜头视角估算距离', privacy: '照片里没有记录视角，头宽也因人而异，所以这是估算而不是测量。假定手机主摄（约 70 度）和成人头宽 145 毫米。' },
      'mirror': { title: '左右合成脸', desc: '两张脸：只用左半边、只用右半边', lead: '以鼻梁为轴，把左右各半张脸像照镜子一样拼起来', privacy: '这里不打分——图片是真的翻转拼接的。不是正面的照片里两张脸差别会很大，那是头转过去了，不是脸不对称。' },
    },
    metric: {
      sideLight: '左右亮度差', topLight: '上下亮度差', backlit: '逆光', exposure: '曝光', focus: '对焦', temp: '色温', tint: '色调', shotDistance: '估算距离', faceFill: '脸部占比', perspective: '透视拉伸', axisBalance: '左右宽度平衡',
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
      'lighting': { title: '光線方向分析', desc: '光從哪邊來，是不是逆光', lead: '用臉部左右、上下的亮度與背景亮度判斷光的方向', privacy: '亮度是從照片上實際量得的。不過陰影與膚色本身無法區分，所以一側偏暗不一定是光造成的。' },
      'sharpness': { title: '照片清晰度檢查', desc: '是糊了還是對到焦了', lead: '用臉部範圍內相鄰像素的差異衡量清晰度', privacy: '只量臉部。人像照片常刻意虛化背景，若整幅一起量，臉明明很清晰也會被判成糊了。' },
      'white-balance': { title: '白平衡檢查', desc: '照片顏色偏向哪一邊', lead: '用整幅畫面的平均顏色量色溫與色調的偏移', privacy: '這裡假定整幅畫面的平均應該是灰色。晚霞或紅葉這類本來就偏色的照片會被判為偏色，那是假設的侷限，不是照片的問題。' },
      'distance': { title: '拍攝距離估算', desc: '拍得多近，臉被拉伸了多少', lead: '用臉部占畫面的比例與鏡頭視角估算距離', privacy: '照片裡沒有記錄視角，頭寬也因人而異，所以這是估算而不是量測。假定手機主鏡頭（約 70 度）與成人頭寬 145 公釐。' },
      'mirror': { title: '左右合成臉', desc: '兩張臉：只用左半邊、只用右半邊', lead: '以鼻樑為軸，把左右各半張臉像照鏡子一樣拼起來', privacy: '這裡不打分——圖片是真的翻轉拼接的。不是正面的照片裡兩張臉差別會很大，那是頭轉過去了，不是臉不對稱。' },
    },
    metric: {
      sideLight: '左右亮度差', topLight: '上下亮度差', backlit: '逆光', exposure: '曝光', focus: '對焦', temp: '色溫', tint: '色調', shotDistance: '估算距離', faceFill: '臉部占比', perspective: '透視拉伸', axisBalance: '左右寬度平衡',
      faceSize: '臉部大小', centered: '左右置中', eyeLine: '眼睛高度', level: '水平', eyesOpen: '睜眼',
      roll: '傾斜', yaw: '左右轉動', pitch: '點頭',
      mouth: '嘴在笑', eyeSmile: '眼在笑',
      leftEye: '左眼', rightEye: '右眼', evenness: '左右一致',
      headroom: '頭頂留白', thirds: '三分法', size: '臉部占比',
    },
  },
};
