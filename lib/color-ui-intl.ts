import type { AnyLocale } from './locales.ts';

/**
 * 색상 도구 화면 문구 — 여덟 언어.
 *
 * 문구만 여기 모으고 컴포넌트는 lang으로 골라 쓴다. 색 계산(HSL 변환·대비비·
 * 색각 변환)은 컴포넌트와 lib에 그대로 둔다 — 숫자는 언어와 무관하다.
 */
/**
 * 색상 도구가 쓰는 언어 — AnyLocale에 중국어 둘을 더한다.
 * 공용 IntlLocale을 넓히지 않는 이유는 lib/food-intl.ts에 적어 두었다.
 */
export type ColorLang = AnyLocale | 'zh-hans' | 'zh-hant';

type L<T> = Record<ColorLang, T>;

/* ── 공통 ── */
export const COLOR_COMMON: L<{ copy: string; copied: string }> = {
  ko: { copy: '복사', copied: '복사됨' },
  en: { copy: 'Copy', copied: 'Copied' },
  es: { copy: 'Copiar', copied: 'Copiado' },
  'pt-br': { copy: 'Copiar', copied: 'Copiado' },
  ja: { copy: 'コピー', copied: 'コピーしました' },
  de: { copy: 'Kopieren', copied: 'Kopiert' },
  fr: { copy: 'Copier', copied: 'Copié' },
  hi: { copy: 'कॉपी', copied: 'कॉपी हो गया' },
  'zh-hans': { copy: '复制', copied: '已复制' },
  'zh-hant': { copy: '複製', copied: '已複製' },
};

/* ── 팔레트 생성기 ── */
export const PALETTE_UI: L<{
  baseColor: string; copyCss: string; copiedCss: string; ratioNote: string; ratioBody: string;
  schemes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
  notes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
}> = {
  ko: {
    baseColor: '기준 색', copyCss: 'CSS 변수로 한 번에 복사', copiedCss: '✅ CSS 변수로 복사했습니다',
    ratioNote: '배색 비율 60:30:10',
    ratioBody: '색을 고른 다음이 더 중요합니다. 넓은 배경에 60%, 보조 색에 30%, 강조에 10%로 쓰면 같은 색 조합이라도 훨씬 정돈돼 보입니다. 강조색을 30% 넘게 쓰면 강조가 아니게 됩니다.',
    schemes: { complementary: '보색', analogous: '유사색', triadic: '삼각 배색', tetradic: '사각 배색', monochrome: '단색' },
    notes: {
      complementary: '색상환에서 정반대에 있는 색입니다. 대비가 가장 강해 강조색으로 좋지만, 넓은 면적에 반반 쓰면 눈이 피로합니다.',
      analogous: '색상환에서 이웃한 색입니다. 자연스럽고 편안해 배경과 본문처럼 넓은 면적에 어울립니다.',
      triadic: '색상환을 셋으로 나눈 색입니다. 화사하면서 균형이 잡혀 일러스트나 브랜드 배색에 자주 쓰입니다.',
      tetradic: '색상환을 넷으로 나눈 색입니다. 쓸 수 있는 색이 많지만 그만큼 어수선해지기 쉬워 한 색을 주인공으로 정해야 합니다.',
      monochrome: '색상은 그대로 두고 밝기만 바꾼 것입니다. 실패할 일이 거의 없어 화면 하나를 한 색 계열로 묶을 때 씁니다.',
    },
  },
  en: {
    baseColor: 'Base colour', copyCss: 'Copy all as CSS variables', copiedCss: '✅ Copied as CSS variables',
    ratioNote: 'Use them roughly 60:30:10',
    ratioBody: 'What you do after picking the colours matters more. Give 60% to the broad background, 30% to the secondary and 10% to the accent, and the same set of colours reads as far more composed. Push the accent past 30% and it stops being an accent.',
    schemes: { complementary: 'Complementary', analogous: 'Analogous', triadic: 'Triadic', tetradic: 'Tetradic', monochrome: 'Monochrome' },
    notes: {
      complementary: 'Directly opposite on the colour wheel. The strongest contrast available, which makes it a good accent — but splitting a large area fifty-fifty between them is tiring to look at.',
      analogous: 'Neighbours on the colour wheel. Natural and easy, which suits large areas like a background and its body text.',
      triadic: 'The wheel divided in three. Bright but still balanced, which is why it turns up often in illustration and brand palettes.',
      tetradic: 'The wheel divided in four. Plenty of colours to work with, and correspondingly easy to make a mess — pick one to lead and keep the rest subordinate.',
      monochrome: 'The same hue with only the lightness changed. Almost impossible to get wrong, and the usual choice when you want one screen to read as a single colour family.',
    },
  },
  es: {
    baseColor: 'Color base', copyCss: 'Copiar todo como variables CSS', copiedCss: '✅ Copiado como variables CSS',
    ratioNote: 'Úsalos más o menos 60:30:10',
    ratioBody: 'Lo que haces después de elegir los colores importa más. Da el 60% al fondo amplio, el 30% al secundario y el 10% al acento, y el mismo conjunto de colores se ve mucho más ordenado. Si el acento pasa del 30%, deja de ser acento.',
    schemes: { complementary: 'Complementarios', analogous: 'Análogos', triadic: 'Tríada', tetradic: 'Tétrada', monochrome: 'Monocromo' },
    notes: {
      complementary: 'Justo enfrente en el círculo cromático. El contraste más fuerte que hay, lo que lo hace buen acento, pero repartir una superficie grande al cincuenta por ciento entre ambos cansa la vista.',
      analogous: 'Vecinos en el círculo cromático. Naturales y cómodos, lo que va bien en superficies grandes como un fondo y su texto.',
      triadic: 'El círculo dividido en tres. Vivo pero equilibrado, y por eso aparece a menudo en ilustración y en paletas de marca.',
      tetradic: 'El círculo dividido en cuatro. Muchos colores con los que trabajar y, por lo mismo, fácil de convertir en un lío: elige uno que lleve la voz y deja el resto por debajo.',
      monochrome: 'El mismo tono cambiando solo la luminosidad. Casi imposible de estropear, y la opción habitual cuando quieres que una pantalla se lea como una sola familia de color.',
    },
  },
  'pt-br': {
    baseColor: 'Cor base', copyCss: 'Copiar tudo como variáveis CSS', copiedCss: '✅ Copiado como variáveis CSS',
    ratioNote: 'Use mais ou menos 60:30:10',
    ratioBody: 'O que você faz depois de escolher as cores importa mais. Dê 60% ao fundo amplo, 30% à secundária e 10% ao destaque, e o mesmo conjunto de cores fica muito mais organizado. Se o destaque passar de 30%, ele deixa de ser destaque.',
    schemes: { complementary: 'Complementares', analogous: 'Análogas', triadic: 'Tríade', tetradic: 'Tétrade', monochrome: 'Monocromático' },
    notes: {
      complementary: 'Exatamente opostas no círculo cromático. O contraste mais forte que existe, o que faz delas um bom destaque — mas dividir uma área grande meio a meio entre as duas cansa a vista.',
      analogous: 'Vizinhas no círculo cromático. Naturais e confortáveis, o que combina com áreas grandes como um fundo e o texto dele.',
      triadic: 'O círculo dividido em três. Vivo e ainda equilibrado, e por isso aparece bastante em ilustração e em paletas de marca.',
      tetradic: 'O círculo dividido em quatro. Muitas cores para trabalhar e, na mesma medida, fácil de virar bagunça — escolha uma para liderar e mantenha o resto abaixo dela.',
      monochrome: 'O mesmo matiz mudando só a luminosidade. Quase impossível de errar, e a escolha usual quando você quer que uma tela seja lida como uma única família de cor.',
    },
  },
  ja: {
    baseColor: '基準色', copyCss: 'CSS変数としてまとめてコピー', copiedCss: '✅ CSS変数としてコピーしました',
    ratioNote: '配色比は 60:30:10',
    ratioBody: '色を選んだあとのほうが大事です。広い背景に60%、補助色に30%、強調に10%で使うと、同じ色の組み合わせでもずっと整って見えます。強調色を30%以上使うと、それは強調ではなくなります。',
    schemes: { complementary: '補色', analogous: '類似色', triadic: 'トライアド', tetradic: 'テトラード', monochrome: '同一色相' },
    notes: {
      complementary: '色相環で真向かいにある色です。もっとも対比が強く強調色に向きますが、広い面積を半々で使うと目が疲れます。',
      analogous: '色相環で隣り合う色です。自然で穏やかなので、背景と本文のような広い面積に合います。',
      triadic: '色相環を三等分した色です。華やかでありながら均衡が取れるので、イラストやブランド配色によく使われます。',
      tetradic: '色相環を四等分した色です。使える色は多いぶん散らかりやすいので、主役を一色決める必要があります。',
      monochrome: '色相はそのままで明度だけを変えたものです。失敗しにくく、画面全体を一つの色系統でまとめたいときに使います。',
    },
  },
  de: {
    baseColor: 'Grundfarbe', copyCss: 'Alles als CSS-Variablen kopieren', copiedCss: '✅ Als CSS-Variablen kopiert',
    ratioNote: 'Etwa im Verhältnis 60:30:10 einsetzen',
    ratioBody: 'Was nach der Farbwahl passiert, zählt mehr. Gib 60% der großen Fläche, 30% der Zweitfarbe und 10% dem Akzent — dieselben Farben wirken dann deutlich aufgeräumter. Geht der Akzent über 30%, ist er kein Akzent mehr.',
    schemes: { complementary: 'Komplementär', analogous: 'Analog', triadic: 'Triade', tetradic: 'Tetrade', monochrome: 'Monochrom' },
    notes: {
      complementary: 'Genau gegenüber im Farbkreis. Der stärkste Kontrast überhaupt und damit ein guter Akzent — eine große Fläche halbe-halbe zwischen beiden zu teilen ist aber anstrengend fürs Auge.',
      analogous: 'Nachbarn im Farbkreis. Natürlich und ruhig, was großen Flächen wie Hintergrund und Fließtext gut steht.',
      triadic: 'Der Farbkreis in Drittel geteilt. Lebhaft und trotzdem ausgewogen — deshalb taucht es in Illustration und Markenpaletten häufig auf.',
      tetradic: 'Der Farbkreis in Viertel geteilt. Viele Farben zur Auswahl und entsprechend leicht unruhig — bestimme eine Hauptfarbe und halte die übrigen zurück.',
      monochrome: 'Derselbe Farbton, nur die Helligkeit verändert. Kaum falsch zu machen und die übliche Wahl, wenn ein Screen als eine Farbfamilie gelesen werden soll.',
    },
  },
  fr: {
    baseColor: 'Couleur de base', copyCss: 'Copier le tout en variables CSS', copiedCss: '✅ Copié en variables CSS',
    ratioNote: 'À utiliser environ 60:30:10',
    ratioBody: 'Ce que vous faites après avoir choisi les couleurs compte davantage. Donnez 60% au grand fond, 30% à la secondaire et 10% à l’accent : le même ensemble paraît nettement plus posé. Si l’accent dépasse 30%, ce n’est plus un accent.',
    schemes: { complementary: 'Complémentaires', analogous: 'Analogues', triadic: 'Triade', tetradic: 'Tétrade', monochrome: 'Monochrome' },
    notes: {
      complementary: 'Juste en face sur le cercle chromatique. Le contraste le plus fort qui existe, donc un bon accent — mais partager une grande surface moitié-moitié entre les deux fatigue l’œil.',
      analogous: 'Voisines sur le cercle chromatique. Naturelles et reposantes, ce qui convient aux grandes surfaces comme un fond et son texte.',
      triadic: 'Le cercle divisé en trois. Vif tout en restant équilibré, d’où sa présence fréquente en illustration et dans les palettes de marque.',
      tetradic: 'Le cercle divisé en quatre. Beaucoup de couleurs disponibles et, du coup, facile à rendre confus — désignez-en une pour mener et gardez les autres en retrait.',
      monochrome: 'La même teinte, seule la luminosité change. Presque impossible à rater, et le choix habituel quand un écran doit se lire comme une seule famille de couleur.',
    },
  },
  hi: {
    baseColor: 'बेस रंग', copyCss: 'सब कुछ CSS वेरिएबल में कॉपी करें', copiedCss: '✅ CSS वेरिएबल में कॉपी हो गया',
    ratioNote: 'लगभग 60:30:10 के अनुपात में',
    ratioBody: 'रंग चुनने के बाद जो करते हैं, वह ज़्यादा मायने रखता है। बड़े बैकग्राउंड को 60%, सहायक रंग को 30% और ज़ोर देने वाले रंग को 10% दें — वही रंग बहुत ज़्यादा व्यवस्थित दिखने लगते हैं। ज़ोर देने वाला रंग 30% से ऊपर चला जाए तो वह ज़ोर नहीं रह जाता।',
    schemes: { complementary: 'कॉम्प्लिमेंटरी', analogous: 'एनालॉगस', triadic: 'ट्रायड', tetradic: 'टेट्राड', monochrome: 'मोनोक्रोम' },
    notes: {
      complementary: 'कलर व्हील में ठीक सामने पड़ने वाला रंग। सबसे तेज़ कंट्रास्ट देता है, इसलिए ज़ोर देने के लिए अच्छा है — पर बड़े हिस्से को आधा-आधा बाँट दें तो आँखें थक जाती हैं।',
      analogous: 'कलर व्हील में पड़ोसी रंग। स्वाभाविक और आराम देने वाले, इसलिए बैकग्राउंड और मुख्य टेक्स्ट जैसे बड़े हिस्सों पर जमते हैं।',
      triadic: 'कलर व्हील को तीन में बाँटकर मिले रंग। चटक होते हुए भी संतुलित, इसलिए इलस्ट्रेशन और ब्रांड पैलेट में बहुत दिखता है।',
      tetradic: 'कलर व्हील को चार में बाँटकर मिले रंग। रंग ज़्यादा मिलते हैं, और उतना ही बिखरने का ख़तरा भी — एक रंग को मुख्य तय कर बाक़ी को दबा रखें।',
      monochrome: 'रंग वही रखकर सिर्फ़ चमक बदली गई है। ग़लत होने की गुंजाइश लगभग नहीं, और जब पूरी स्क्रीन को एक ही रंग-परिवार में बाँधना हो तो यही चुना जाता है।',
    },
  },
  'zh-hans': {
    baseColor: '基准色', copyCss: '一次复制成 CSS 变量', copiedCss: '✅ 已复制成 CSS 变量',
    ratioNote: '配色比例 60:30:10',
    ratioBody: '色选完之后的事更要紧。大面积背景占 60%，辅助色 30%，强调色 10% —— 同样一组颜色，这样用起来会整齐得多。强调色一超过 30%，就不再是强调了。',
    schemes: { complementary: '补色', analogous: '邻近色', triadic: '三角配色', tetradic: '四角配色', monochrome: '单色' },
    notes: {
      complementary: '色环上正对面的颜色。对比最强，做强调色很好，但大面积对半用会让眼睛发累。',
      analogous: '色环上挨着的颜色。自然又舒服，适合背景和正文这类大面积的地方。',
      triadic: '把色环三等分取到的颜色。既鲜亮又平衡，插画和品牌配色常用。',
      tetradic: '把色环四等分取到的颜色。能用的色多，也因此容易乱，得先定下一个当主角。',
      monochrome: '色相不动，只改明暗。几乎不会失手，适合把整屏统一到一个色系里。',
    },
  },
  'zh-hant': {
    baseColor: '基準色', copyCss: '一次複製成 CSS 變數', copiedCss: '✅ 已複製成 CSS 變數',
    ratioNote: '配色比例 60:30:10',
    ratioBody: '色選完之後的事更要緊。大面積背景占 60%，輔助色 30%，強調色 10% —— 同樣一組顏色，這樣用起來會整齊得多。強調色一超過 30%，就不再是強調了。',
    schemes: { complementary: '補色', analogous: '鄰近色', triadic: '三角配色', tetradic: '四角配色', monochrome: '單色' },
    notes: {
      complementary: '色環上正對面的顏色。對比最強，做強調色很好，但大面積對半用會讓眼睛發累。',
      analogous: '色環上挨著的顏色。自然又舒服，適合背景和內文這類大面積的地方。',
      triadic: '把色環三等分取到的顏色。既鮮亮又平衡，插畫和品牌配色常用。',
      tetradic: '把色環四等分取到的顏色。能用的色多，也因此容易亂，得先定下一個當主角。',
      monochrome: '色相不動，只改明暗。幾乎不會失手，適合把整屏統一到一個色系裡。',
    },
  },
};

/* ── 명도 단계 ── */
export const SHADES_UI: L<{
  baseColor: string; whereTitle: string; contrastNote: string;
  whiteOk: string; blackOk: string; bothOk: string; lowContrast: string;
  useLight: string; useMid: string; useDark: string; copyAllCss: string;
}> = {
  ko: {
    baseColor: '기준 색 (브랜드 색)', whereTitle: '어디에 쓰나요',
    contrastNote: '각 줄 오른쪽의 안내는 그 색을 배경으로 썼을 때 흰/검은 글씨가 접근성 기준(4.5:1)을 넘는지입니다.',
    whiteOk: '흰 글씨 OK', blackOk: '검은 글씨 OK', bothOk: '흰·검 모두 OK', lowContrast: '글씨 대비 부족',
    useLight: '배경, 연한 강조, 비활성 상태', useMid: '버튼, 링크 — 브랜드 색의 본체', useDark: '눌린 상태, 어두운 배경 위 글자',
    copyAllCss: 'CSS 변수 전체 복사',
  },
  en: {
    baseColor: 'Base colour (your brand colour)', whereTitle: 'Where each step goes',
    contrastNote: 'The note on the right of each row says whether white or black text clears the accessibility threshold (4.5:1) on that background.',
    whiteOk: 'White text OK', blackOk: 'Black text OK', bothOk: 'Both OK', lowContrast: 'Too little contrast for text',
    useLight: 'Backgrounds, soft highlights, disabled states', useMid: 'Buttons and links — the brand colour proper', useDark: 'Pressed states, and text on dark backgrounds',
    copyAllCss: 'Copy all as CSS variables',
  },
  es: {
    baseColor: 'Color base (el de tu marca)', whereTitle: 'Para qué sirve cada paso',
    contrastNote: 'La nota a la derecha de cada fila indica si el texto blanco o negro supera el umbral de accesibilidad (4,5:1) sobre ese fondo.',
    whiteOk: 'Texto blanco OK', blackOk: 'Texto negro OK', bothOk: 'Ambos OK', lowContrast: 'Contraste insuficiente para texto',
    useLight: 'Fondos, realces suaves, estados desactivados', useMid: 'Botones y enlaces: el color de marca en sí', useDark: 'Estados pulsados y texto sobre fondos oscuros',
    copyAllCss: 'Copiar todo como variables CSS',
  },
  'pt-br': {
    baseColor: 'Cor base (a da sua marca)', whereTitle: 'Onde cada degrau se usa',
    contrastNote: 'A nota à direita de cada linha diz se o texto branco ou preto passa do limite de acessibilidade (4,5:1) sobre aquele fundo.',
    whiteOk: 'Texto branco OK', blackOk: 'Texto preto OK', bothOk: 'Os dois OK', lowContrast: 'Contraste insuficiente para texto',
    useLight: 'Fundos, realces suaves, estados desativados', useMid: 'Botões e links — a cor de marca em si', useDark: 'Estados pressionados e texto sobre fundos escuros',
    copyAllCss: 'Copiar tudo como variáveis CSS',
  },
  ja: {
    baseColor: '基準色（ブランドカラー）', whereTitle: 'どの段階をどこに使うか',
    contrastNote: '各行の右の表示は、その色を背景にしたとき白／黒の文字がアクセシビリティ基準（4.5:1）を超えるかどうかです。',
    whiteOk: '白文字OK', blackOk: '黒文字OK', bothOk: '白・黒どちらもOK', lowContrast: '文字には対比が足りません',
    useLight: '背景、淡い強調、無効状態', useMid: 'ボタン・リンク — ブランドカラーそのもの', useDark: '押された状態、暗い背景上の文字',
    copyAllCss: 'CSS変数をまとめてコピー',
  },
  de: {
    baseColor: 'Grundfarbe (deine Markenfarbe)', whereTitle: 'Wozu welche Stufe dient',
    contrastNote: 'Der Hinweis rechts in jeder Zeile sagt, ob weißer oder schwarzer Text auf diesem Hintergrund die Barrierefreiheitsschwelle (4,5:1) erreicht.',
    whiteOk: 'Weißer Text OK', blackOk: 'Schwarzer Text OK', bothOk: 'Beides OK', lowContrast: 'Zu wenig Kontrast für Text',
    useLight: 'Hintergründe, sanfte Hervorhebungen, inaktive Zustände', useMid: 'Buttons und Links — die Markenfarbe selbst', useDark: 'Gedrückte Zustände und Text auf dunklem Grund',
    copyAllCss: 'Alles als CSS-Variablen kopieren',
  },
  fr: {
    baseColor: 'Couleur de base (celle de votre marque)', whereTitle: 'À quoi sert chaque palier',
    contrastNote: 'La note à droite de chaque ligne indique si le texte blanc ou noir franchit le seuil d’accessibilité (4,5:1) sur ce fond.',
    whiteOk: 'Texte blanc OK', blackOk: 'Texte noir OK', bothOk: 'Les deux OK', lowContrast: 'Contraste insuffisant pour du texte',
    useLight: 'Fonds, rehauts discrets, états désactivés', useMid: 'Boutons et liens — la couleur de marque elle-même', useDark: 'États pressés et texte sur fond sombre',
    copyAllCss: 'Copier le tout en variables CSS',
  },
  hi: {
    baseColor: 'बेस रंग (आपका ब्रांड रंग)', whereTitle: 'कौन-सा चरण कहाँ काम आता है',
    contrastNote: 'हर पंक्ति के दाईं ओर लिखा है कि उस रंग को बैकग्राउंड बनाने पर सफ़ेद या काला टेक्स्ट सुगम्यता की सीमा (4.5:1) पार करता है या नहीं।',
    whiteOk: 'सफ़ेद टेक्स्ट ठीक', blackOk: 'काला टेक्स्ट ठीक', bothOk: 'दोनों ठीक', lowContrast: 'टेक्स्ट के लिए कंट्रास्ट कम',
    useLight: 'बैकग्राउंड, हल्का ज़ोर, निष्क्रिय अवस्था', useMid: 'बटन और लिंक — ब्रांड रंग स्वयं', useDark: 'दबी अवस्था, और गहरे बैकग्राउंड पर टेक्स्ट',
    copyAllCss: 'सारे CSS वेरिएबल कॉपी करें',
  },
  'zh-hans': {
    baseColor: '基准色（品牌色）', whereTitle: '用在哪里',
    contrastNote: '每一行右边的提示，说的是拿那个颜色当背景时，白字或黑字有没有过无障碍标准（4.5:1）。',
    whiteOk: '白字 OK', blackOk: '黑字 OK', bothOk: '白黑都 OK', lowContrast: '文字对比不足',
    useLight: '背景、淡强调、禁用状态', useMid: '按钮、链接 —— 品牌色的主体', useDark: '按下状态、深色背景上的文字',
    copyAllCss: '复制全部 CSS 变量',
  },
  'zh-hant': {
    baseColor: '基準色（品牌色）', whereTitle: '用在哪裡',
    contrastNote: '每一行右邊的提示，說的是拿那個顏色當背景時，白字或黑字有沒有過無障礙標準（4.5:1）。',
    whiteOk: '白字 OK', blackOk: '黑字 OK', bothOk: '白黑都 OK', lowContrast: '文字對比不足',
    useLight: '背景、淡強調、停用狀態', useMid: '按鈕、連結 —— 品牌色的主體', useDark: '按下狀態、深色背景上的文字',
    copyAllCss: '複製全部 CSS 變數',
  },
};

/* ── 색 섞기 ── */
export const MIXER_UI: L<{
  first: string; second: string; ratio: string; stepsNote: string; note: (c: string) => string;
}> = {
  ko: {
    first: '첫 번째 색', second: '두 번째 색', ratio: '섞는 비율', stepsNote: '10% 간격 중간 단계',
    note: c => `섞인 색은 흰 배경에서 대비 ${c}:1입니다. 두 색을 반씩 섞으면 채도가 떨어져 탁해지는 경우가 많은데, 이때는 한쪽을 70% 이상으로 기울이면 색이 살아납니다.`,
  },
  en: {
    first: 'First colour', second: 'Second colour', ratio: 'Blend ratio', stepsNote: 'Steps at 10% intervals',
    note: c => `The blend sits at ${c}:1 contrast on white. An even fifty-fifty mix often loses saturation and turns muddy — tipping one side past 70% usually brings the colour back.`,
  },
  es: {
    first: 'Primer color', second: 'Segundo color', ratio: 'Proporción de mezcla', stepsNote: 'Pasos cada 10%',
    note: c => `La mezcla queda en ${c}:1 de contraste sobre blanco. Mezclar mitad y mitad suele perder saturación y volverse turbio; inclinar un lado por encima del 70% normalmente devuelve el color.`,
  },
  'pt-br': {
    first: 'Primeira cor', second: 'Segunda cor', ratio: 'Proporção da mistura', stepsNote: 'Degraus de 10% em 10%',
    note: c => `A mistura fica em ${c}:1 de contraste sobre branco. Misturar meio a meio costuma perder saturação e ficar embaçado — puxar um lado acima de 70% geralmente traz a cor de volta.`,
  },
  ja: {
    first: '一つ目の色', second: '二つ目の色', ratio: '混ぜる比率', stepsNote: '10%刻みの中間段階',
    note: c => `混ざった色は白背景で対比 ${c}:1 です。半々で混ぜると彩度が落ちて濁ることが多く、そのときは片方を70%以上に寄せると色が戻ります。`,
  },
  de: {
    first: 'Erste Farbe', second: 'Zweite Farbe', ratio: 'Mischverhältnis', stepsNote: 'Stufen in 10%-Schritten',
    note: c => `Die Mischung liegt bei ${c}:1 Kontrast auf Weiß. Halbe-halbe zu mischen kostet oft Sättigung und wirkt trüb — eine Seite über 70% zu ziehen holt die Farbe meist zurück.`,
  },
  fr: {
    first: 'Première couleur', second: 'Deuxième couleur', ratio: 'Proportion du mélange', stepsNote: 'Paliers tous les 10%',
    note: c => `Le mélange est à ${c}:1 de contraste sur blanc. Mélanger moitié-moitié fait souvent perdre de la saturation et devient terne ; pencher un côté au-delà de 70% ramène généralement la couleur.`,
  },
  hi: {
    first: 'पहला रंग', second: 'दूसरा रंग', ratio: 'मिलाने का अनुपात', stepsNote: '10% के अंतराल पर बीच के चरण',
    note: c => `मिला हुआ रंग सफ़ेद बैकग्राउंड पर ${c}:1 कंट्रास्ट देता है। आधा-आधा मिलाने पर सैचुरेशन गिरकर रंग मैला हो जाता है; ऐसे में एक तरफ़ को 70% से ऊपर झुका दें तो रंग वापस आ जाता है।`,
  },
  'zh-hans': {
    first: '第一个颜色', second: '第二个颜色', ratio: '混合比例', stepsNote: '每 10% 一档的中间色',
    note: c => `混出来的颜色在白底上的对比度是 ${c}:1。两色各一半地混，往往会掉饱和度、显得发灰；这时把其中一边推到 70% 以上，颜色就活过来了。`,
  },
  'zh-hant': {
    first: '第一個顏色', second: '第二個顏色', ratio: '混合比例', stepsNote: '每 10% 一檔的中間色',
    note: c => `混出來的顏色在白底上的對比度是 ${c}:1。兩色各一半地混，往往會掉飽和度、顯得發灰；這時把其中一邊推到 70% 以上，顏色就活過來了。`,
  },
};

/* ── 랜덤 색 ── */
export const RANDOM_UI: L<{ copyAll: string; copiedAll: string; reroll: string; note: string }> = {
  ko: {
    copyAll: 'HEX 다섯 개 한 번에 복사', copiedAll: '✅ 다섯 색을 복사했습니다',
    reroll: '🎲 다시 뽑기 (스페이스바)',
    note: '마음에 드는 색이 나오면 자물쇠로 잠그고 나머지만 다시 뽑으세요. 완전 무작위 대신 채도 45~85%, 명도 35~70% 범위에서 뽑기 때문에 화면에 바로 쓸 수 있는 색이 나옵니다.',
  },
  en: {
    copyAll: 'Copy all five HEX values', copiedAll: '✅ Copied all five',
    reroll: '🎲 Reroll (spacebar)',
    note: 'When a colour you like comes up, lock it and reroll the rest. Rather than being fully random, colours are drawn from 45–85% saturation and 35–70% lightness, so what comes out is usable on a screen straight away.',
  },
  es: {
    copyAll: 'Copiar los cinco HEX', copiedAll: '✅ Copiados los cinco',
    reroll: '🎲 Volver a tirar (barra espaciadora)',
    note: 'Cuando salga un color que te guste, bloquéalo y vuelve a tirar el resto. En vez de ser del todo aleatorio, los colores salen con saturación del 45–85% y luminosidad del 35–70%, así que lo que aparece se puede usar en pantalla tal cual.',
  },
  'pt-br': {
    copyAll: 'Copiar os cinco HEX', copiedAll: '✅ Copiados os cinco',
    reroll: '🎲 Sortear de novo (barra de espaço)',
    note: 'Quando aparecer uma cor que você gosta, trave ela e sorteie o resto de novo. Em vez de ser totalmente aleatório, as cores saem com saturação de 45–85% e luminosidade de 35–70%, então o que aparece já dá para usar na tela.',
  },
  ja: {
    copyAll: 'HEX五つをまとめてコピー', copiedAll: '✅ 五色をコピーしました',
    reroll: '🎲 引き直す（スペースキー）',
    note: '気に入った色が出たら鍵をかけて、残りだけ引き直してください。完全なランダムではなく彩度45〜85%、明度35〜70%の範囲から引くので、そのまま画面に使える色が出ます。',
  },
  de: {
    copyAll: 'Alle fünf HEX-Werte kopieren', copiedAll: '✅ Alle fünf kopiert',
    reroll: '🎲 Neu würfeln (Leertaste)',
    note: 'Kommt eine Farbe, die dir gefällt, sperre sie und würfle den Rest neu. Statt völlig zufällig werden Farben mit 45–85% Sättigung und 35–70% Helligkeit gezogen — was herauskommt, ist auf einem Screen direkt brauchbar.',
  },
  fr: {
    copyAll: 'Copier les cinq HEX', copiedAll: '✅ Les cinq sont copiés',
    reroll: '🎲 Relancer (barre d’espace)',
    note: 'Quand une couleur vous plaît, verrouillez-la et relancez le reste. Plutôt qu’un tirage totalement aléatoire, les couleurs sortent entre 45 et 85% de saturation et 35 à 70% de luminosité : ce qui apparaît est utilisable tel quel à l’écran.',
  },
  hi: {
    copyAll: 'पाँचों HEX एक साथ कॉपी करें', copiedAll: '✅ पाँचों कॉपी हो गए',
    reroll: '🎲 दोबारा निकालें (स्पेसबार)',
    note: 'पसंद का रंग आ जाए तो उसे लॉक कर दें और बाक़ी ही दोबारा निकालें। पूरी तरह रैंडम की जगह 45–85% सैचुरेशन और 35–70% चमक के दायरे से निकाला जाता है, इसलिए जो आता है वह सीधे स्क्रीन पर काम आ जाता है।',
  },
  'zh-hans': {
    copyAll: '一次复制五个 HEX', copiedAll: '✅ 已复制五个颜色',
    reroll: '🎲 重新抽（空格键）',
    note: '抽到中意的颜色就用锁锁住，只让其余的重抽。这里不是完全随机，而是在饱和度 45~85%、明度 35~70% 的范围里抽，所以抽出来的颜色可以直接拿去用。',
  },
  'zh-hant': {
    copyAll: '一次複製五個 HEX', copiedAll: '✅ 已複製五個顏色',
    reroll: '🎲 重新抽（空白鍵）',
    note: '抽到中意的顏色就用鎖鎖住，只讓其餘的重抽。這裡不是完全隨機，而是在飽和度 45~85%、明度 35~70% 的範圍裡抽，所以抽出來的顏色可以直接拿去用。',
  },
};

/* ── 대비 검사 ── */
export const CONTRAST_UI: L<{
  textColor: string; bgColor: string;
  aaBody: string; aaLarge: string; aaaBody: string; aaaLarge: string;
  pass: string; fail: string;
  verdictBest: string; verdictBody: string; verdictLarge: string; verdictFail: string;
  aaNote: string; aaaNote: string; largeNote: string;
  ratio: string; autoFix: string; meaningTitle: string; brightnessNote: string;
  previewH: string; previewBody: string; previewSmall: string;
}> = {
  ko: {
    textColor: '글자색', bgColor: '배경색',
    aaBody: 'AA 본문', aaLarge: 'AA 큰 글씨', aaaBody: 'AAA 본문', aaaLarge: 'AAA 큰 글씨',
    pass: '통과', fail: '미달',
    verdictBest: '가장 높은 기준(AAA)까지 통과합니다',
    verdictBody: '본문에 쓸 수 있습니다 (AA 통과)',
    verdictLarge: '큰 글씨에만 쓸 수 있습니다',
    verdictFail: '이 조합은 읽기 어렵습니다',
    aaNote: ' — 웹 접근성의 기본선입니다. 본문은 여기를 넘겨야 합니다.',
    aaaNote: ' — 더 엄격한 기준으로, 공공 사이트에서 요구하기도 합니다.',
    largeNote: ' — 18pt(굵으면 14pt) 이상이면 기준이 낮아집니다.',
    ratio: '대비비', autoFix: '색상은 그대로 두고 밝기만 조절해 AA 통과시키기',
    meaningTitle: '기준이 뜻하는 것',
    brightnessNote: '대비는 색이 아니라 밝기 차이로 정해집니다. 그래서 노랑 위 흰 글씨는 색이 달라도 안 읽힙니다.',
    previewH: '큰 제목은 이렇게 보입니다', previewBody: '본문 크기 글자는 이 정도로 읽힙니다.',
    previewSmall: '작은 글씨(캡션)는 이만큼 작아집니다 — 대비가 부족하면 여기서 먼저 티가 납니다.',
  },
  en: {
    textColor: 'Text colour', bgColor: 'Background colour',
    aaBody: 'AA body', aaLarge: 'AA large', aaaBody: 'AAA body', aaaLarge: 'AAA large',
    pass: 'Pass', fail: 'Fail',
    verdictBest: 'Clears the strictest level (AAA)',
    verdictBody: 'Usable for body text (passes AA)',
    verdictLarge: 'Only usable at large sizes',
    verdictFail: 'This combination is hard to read',
    aaNote: ' — the baseline for web accessibility. Body text has to clear this.',
    aaaNote: ' — the stricter level, sometimes required for public-sector sites.',
    largeNote: ' — from 18pt (or 14pt bold) the threshold drops.',
    ratio: 'Contrast ratio', autoFix: 'Keep the hue, adjust lightness until it passes AA',
    meaningTitle: 'What the levels mean',
    brightnessNote: 'Contrast is decided by difference in lightness, not by hue. That is why white text on yellow is unreadable even though the colours are different.',
    previewH: 'A heading looks like this', previewBody: 'Body text reads at about this weight.',
    previewSmall: 'Small text like a caption gets this small — insufficient contrast shows up here first.',
  },
  es: {
    textColor: 'Color del texto', bgColor: 'Color de fondo',
    aaBody: 'AA texto', aaLarge: 'AA grande', aaaBody: 'AAA texto', aaaLarge: 'AAA grande',
    pass: 'Pasa', fail: 'No pasa',
    verdictBest: 'Supera el nivel más estricto (AAA)',
    verdictBody: 'Se puede usar en texto corrido (pasa AA)',
    verdictLarge: 'Solo se puede usar en tamaños grandes',
    verdictFail: 'Esta combinación cuesta leerla',
    aaNote: ' — la base de la accesibilidad web. El texto corrido tiene que superarlo.',
    aaaNote: ' — el nivel más estricto, exigido a veces en sitios del sector público.',
    largeNote: ' — desde 18pt (o 14pt en negrita) el umbral baja.',
    ratio: 'Relación de contraste', autoFix: 'Mantener el tono y ajustar la luminosidad hasta pasar AA',
    meaningTitle: 'Qué significan los niveles',
    brightnessNote: 'El contraste lo decide la diferencia de luminosidad, no el tono. Por eso el texto blanco sobre amarillo no se lee aunque los colores sean distintos.',
    previewH: 'Un titular se ve así', previewBody: 'El texto corrido se lee más o menos con este peso.',
    previewSmall: 'El texto pequeño, como un pie de foto, queda así de pequeño: la falta de contraste se nota aquí primero.',
  },
  'pt-br': {
    textColor: 'Cor do texto', bgColor: 'Cor de fundo',
    aaBody: 'AA texto', aaLarge: 'AA grande', aaaBody: 'AAA texto', aaaLarge: 'AAA grande',
    pass: 'Passa', fail: 'Não passa',
    verdictBest: 'Passa até o nível mais rígido (AAA)',
    verdictBody: 'Dá para usar em texto corrido (passa AA)',
    verdictLarge: 'Só dá para usar em tamanhos grandes',
    verdictFail: 'Essa combinação é difícil de ler',
    aaNote: ' — a base da acessibilidade web. Texto corrido precisa passar disso.',
    aaaNote: ' — o nível mais rígido, às vezes exigido em sites do setor público.',
    largeNote: ' — a partir de 18pt (ou 14pt em negrito) o limite cai.',
    ratio: 'Razão de contraste', autoFix: 'Manter o matiz e ajustar a luminosidade até passar no AA',
    meaningTitle: 'O que os níveis significam',
    brightnessNote: 'O contraste é decidido pela diferença de luminosidade, não pelo matiz. É por isso que texto branco sobre amarelo não se lê, mesmo sendo cores diferentes.',
    previewH: 'Um título aparece assim', previewBody: 'Texto corrido se lê mais ou menos com este peso.',
    previewSmall: 'Texto pequeno, como uma legenda, fica deste tamanho — a falta de contraste aparece aqui primeiro.',
  },
  ja: {
    textColor: '文字色', bgColor: '背景色',
    aaBody: 'AA 本文', aaLarge: 'AA 大きい文字', aaaBody: 'AAA 本文', aaaLarge: 'AAA 大きい文字',
    pass: '合格', fail: '不足',
    verdictBest: 'もっとも厳しい基準（AAA）まで満たします',
    verdictBody: '本文に使えます（AA合格）',
    verdictLarge: '大きい文字にだけ使えます',
    verdictFail: 'この組み合わせは読みにくいです',
    aaNote: ' — ウェブアクセシビリティの基本線です。本文はここを超える必要があります。',
    aaaNote: ' — より厳しい基準で、公共サイトで求められることもあります。',
    largeNote: ' — 18pt（太字なら14pt）以上では基準が下がります。',
    ratio: 'コントラスト比', autoFix: '色相はそのままで明度だけ調整してAAを満たす',
    meaningTitle: '基準が意味すること',
    brightnessNote: 'コントラストは色ではなく明るさの差で決まります。だから黄色の上の白い文字は、色が違っても読めません。',
    previewH: '大きな見出しはこう見えます', previewBody: '本文サイズの文字はこのくらいの読みやすさです。',
    previewSmall: 'キャプションのような小さな文字はここまで小さくなります — 対比が足りないと、まずここで分かります。',
  },
  de: {
    textColor: 'Textfarbe', bgColor: 'Hintergrundfarbe',
    aaBody: 'AA Fließtext', aaLarge: 'AA groß', aaaBody: 'AAA Fließtext', aaaLarge: 'AAA groß',
    pass: 'Bestanden', fail: 'Nicht bestanden',
    verdictBest: 'Erreicht die strengste Stufe (AAA)',
    verdictBody: 'Für Fließtext brauchbar (AA bestanden)',
    verdictLarge: 'Nur in großen Größen brauchbar',
    verdictFail: 'Diese Kombination ist schwer zu lesen',
    aaNote: ' — die Grundlinie der Web-Barrierefreiheit. Fließtext muss das erreichen.',
    aaaNote: ' — die strengere Stufe, teils für Seiten der öffentlichen Hand gefordert.',
    largeNote: ' — ab 18pt (oder 14pt fett) sinkt die Schwelle.',
    ratio: 'Kontrastverhältnis', autoFix: 'Farbton behalten, Helligkeit anpassen bis AA erreicht ist',
    meaningTitle: 'Was die Stufen bedeuten',
    brightnessNote: 'Kontrast entscheidet sich am Helligkeitsunterschied, nicht am Farbton. Deshalb ist weißer Text auf Gelb unlesbar, obwohl die Farben verschieden sind.',
    previewH: 'Eine Überschrift sieht so aus', previewBody: 'Fließtext liest sich etwa in dieser Stärke.',
    previewSmall: 'Kleiner Text wie eine Bildunterschrift wird so klein — zu wenig Kontrast fällt hier zuerst auf.',
  },
  fr: {
    textColor: 'Couleur du texte', bgColor: 'Couleur de fond',
    aaBody: 'AA texte', aaLarge: 'AA grand', aaaBody: 'AAA texte', aaaLarge: 'AAA grand',
    pass: 'Réussi', fail: 'Échec',
    verdictBest: 'Franchit le niveau le plus strict (AAA)',
    verdictBody: 'Utilisable en texte courant (AA réussi)',
    verdictLarge: 'Utilisable seulement en grandes tailles',
    verdictFail: 'Cette combinaison est difficile à lire',
    aaNote: ' — la base de l’accessibilité web. Le texte courant doit la franchir.',
    aaaNote: ' — le niveau plus strict, parfois exigé pour les sites du secteur public.',
    largeNote: ' — à partir de 18pt (ou 14pt en gras) le seuil baisse.',
    ratio: 'Rapport de contraste', autoFix: 'Garder la teinte et ajuster la luminosité jusqu’à réussir AA',
    meaningTitle: 'Ce que signifient les niveaux',
    brightnessNote: 'Le contraste se joue sur l’écart de luminosité, pas sur la teinte. C’est pourquoi du texte blanc sur jaune ne se lit pas, même si les couleurs diffèrent.',
    previewH: 'Un titre ressemble à ceci', previewBody: 'Le texte courant se lit à peu près avec ce poids.',
    previewSmall: 'Un petit texte comme une légende devient aussi petit — un contraste insuffisant se voit ici d’abord.',
  },
  hi: {
    textColor: 'टेक्स्ट का रंग', bgColor: 'बैकग्राउंड का रंग',
    aaBody: 'AA मुख्य टेक्स्ट', aaLarge: 'AA बड़ा', aaaBody: 'AAA मुख्य टेक्स्ट', aaaLarge: 'AAA बड़ा',
    pass: 'पास', fail: 'फ़ेल',
    verdictBest: 'सबसे कड़ी सीमा (AAA) भी पार करता है',
    verdictBody: 'मुख्य टेक्स्ट में काम आएगा (AA पास)',
    verdictLarge: 'सिर्फ़ बड़े आकार में काम आएगा',
    verdictFail: 'यह संयोजन पढ़ने में मुश्किल है',
    aaNote: ' — वेब सुगम्यता की बुनियादी रेखा। मुख्य टेक्स्ट को यह पार करना ही चाहिए।',
    aaaNote: ' — ज़्यादा कड़ी सीमा, कभी-कभी सरकारी साइटों पर ज़रूरी होती है।',
    largeNote: ' — 18pt (बोल्ड हो तो 14pt) से ऊपर सीमा घट जाती है।',
    ratio: 'कंट्रास्ट अनुपात', autoFix: 'रंग वही रखकर चमक बदलें, जब तक AA पास न हो',
    meaningTitle: 'इन स्तरों का मतलब',
    brightnessNote: 'कंट्रास्ट रंग से नहीं, चमक के अंतर से तय होता है। इसीलिए पीले पर सफ़ेद टेक्स्ट रंग अलग होने पर भी पढ़ा नहीं जाता।',
    previewH: 'बड़ा शीर्षक ऐसा दिखता है', previewBody: 'मुख्य टेक्स्ट लगभग इसी वज़न में पढ़ा जाता है।',
    previewSmall: 'कैप्शन जैसा छोटा टेक्स्ट इतना छोटा हो जाता है — कंट्रास्ट कम हो तो सबसे पहले यहीं पता चलता है।',
  },
  'zh-hans': {
    textColor: '文字色', bgColor: '背景色',
    aaBody: 'AA 正文', aaLarge: 'AA 大字', aaaBody: 'AAA 正文', aaaLarge: 'AAA 大字',
    pass: '通过', fail: '未达',
    verdictBest: '连最高标准（AAA）也过了',
    verdictBody: '可以用在正文上（AA 通过）',
    verdictLarge: '只能用在大字上',
    verdictFail: '这个组合读起来太吃力',
    aaNote: ' —— 这是网页无障碍的底线。正文必须过这一关。',
    aaaNote: ' —— 更严的标准，公共网站有时会要求。',
    largeNote: ' —— 18pt（粗体 14pt）以上时标准会放宽。',
    ratio: '对比度', autoFix: '色相不动，只调明度，让它过 AA',
    meaningTitle: '这些标准是什么意思',
    brightnessNote: '对比度取决于明暗差，不是色差。所以黄底上放白字，颜色明明不同，还是读不出来。',
    previewH: '大标题看起来是这样', previewBody: '正文大小的字，读起来是这个程度。',
    previewSmall: '小字（图说）会缩到这么小 —— 对比不够的话，最先露馅的就是这里。',
  },
  'zh-hant': {
    textColor: '文字色', bgColor: '背景色',
    aaBody: 'AA 內文', aaLarge: 'AA 大字', aaaBody: 'AAA 內文', aaaLarge: 'AAA 大字',
    pass: '通過', fail: '未達',
    verdictBest: '連最高標準（AAA）也過了',
    verdictBody: '可以用在內文上（AA 通過）',
    verdictLarge: '只能用在大字上',
    verdictFail: '這個組合讀起來太吃力',
    aaNote: ' —— 這是網頁無障礙的底線。內文必須過這一關。',
    aaaNote: ' —— 更嚴的標準，公共網站有時會要求。',
    largeNote: ' —— 18pt（粗體 14pt）以上時標準會放寬。',
    ratio: '對比度', autoFix: '色相不動，只調明度，讓它過 AA',
    meaningTitle: '這些標準是什麼意思',
    brightnessNote: '對比度取決於明暗差，不是色差。所以黃底上放白字，顏色明明不同，還是讀不出來。',
    previewH: '大標題看起來是這樣', previewBody: '內文大小的字，讀起來是這個程度。',
    previewSmall: '小字（圖說）會縮到這麼小 —— 對比不夠的話，最先露餡的就是這裡。',
  },
};

/* ── 색맹 시뮬레이터 ── */
export const COLORBLIND_UI: L<{
  first: string; second: string; normal: string;
  distinguishable: string; hardToTell: string; adviceTitle: string; advice: string;
  types: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
  descs: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
  approxNote: string;
}> = {
  ko: {
    first: '첫 번째 색', second: '두 번째 색', normal: '일반 색각으로 보이는 모습',
    distinguishable: '구분됨', hardToTell: '구분 어려움', adviceTitle: '색만으로 알리지 마세요',
    advice: '남성 스무 명 중 한 명꼴로 색각 이상이 있습니다. 성공은 초록, 실패는 빨강처럼 색으로만 구분하는 화면은 그중 상당수에게 같은 색으로 보입니다. 아이콘(✓ ✕)이나 글자를 함께 쓰면 색을 못 봐도 뜻이 전달됩니다.',
    types: { protanopia: '적색맹', deuteranopia: '녹색맹', tritanopia: '청색맹', achromatopsia: '전색맹' },
    descs: {
      protanopia: '빨강을 어둡게 느껴 빨강과 초록이 비슷해 보입니다',
      deuteranopia: '가장 흔한 유형으로, 빨강과 초록이 거의 같아 보입니다',
      tritanopia: '드문 유형으로, 파랑과 초록을 구분하기 어렵습니다',
      achromatopsia: '색을 전혀 구분하지 못해 명암만 남습니다',
    },
    approxNote: '시뮬레이션은 근사 변환이라 실제로 그 사람이 보는 색과 정확히 같지는 않습니다. 조합이 위험한지 가늠하는 용도로 쓰세요.',
  },
  en: {
    first: 'First colour', second: 'Second colour', normal: 'As seen with normal colour vision',
    distinguishable: 'Distinguishable', hardToTell: 'Hard to tell apart', adviceTitle: 'Never signal with colour alone',
    advice: 'Roughly one man in twenty has some colour vision deficiency. A screen that marks success in green and failure in red looks like the same colour to a good number of them. Pair the colour with an icon (✓ ✕) or a word and the meaning survives without it.',
    types: { protanopia: 'Protanopia', deuteranopia: 'Deuteranopia', tritanopia: 'Tritanopia', achromatopsia: 'Achromatopsia' },
    descs: {
      protanopia: 'Reds appear darker, making red and green look similar',
      deuteranopia: 'The most common type — red and green look almost identical',
      tritanopia: 'A rare type, where blue and green are hard to separate',
      achromatopsia: 'No colour at all, only lightness remains',
    },
    approxNote: 'The simulation is an approximation, so it is not exactly what someone actually sees. Use it to judge whether a combination is risky, not as a precise rendering.',
  },
  es: {
    first: 'Primer color', second: 'Segundo color', normal: 'Como se ve con visión cromática normal',
    distinguishable: 'Se distinguen', hardToTell: 'Cuesta distinguirlos', adviceTitle: 'No indiques nada solo con el color',
    advice: 'Alrededor de uno de cada veinte hombres tiene alguna deficiencia de visión cromática. Una pantalla que marca el éxito en verde y el fallo en rojo se ve del mismo color para buena parte de ellos. Acompaña el color con un icono (✓ ✕) o una palabra y el significado sobrevive sin él.',
    types: { protanopia: 'Protanopía', deuteranopia: 'Deuteranopía', tritanopia: 'Tritanopía', achromatopsia: 'Acromatopsia' },
    descs: {
      protanopia: 'Los rojos se ven más oscuros, así que rojo y verde se parecen',
      deuteranopia: 'El tipo más común: rojo y verde se ven casi iguales',
      tritanopia: 'Un tipo poco frecuente, donde azul y verde cuestan separarse',
      achromatopsia: 'Sin color alguno, solo queda la luminosidad',
    },
    approxNote: 'La simulación es una aproximación, así que no es exactamente lo que alguien ve. Úsala para juzgar si una combinación es arriesgada, no como reproducción exacta.',
  },
  'pt-br': {
    first: 'Primeira cor', second: 'Segunda cor', normal: 'Como se vê com visão de cores normal',
    distinguishable: 'Dá para distinguir', hardToTell: 'Difícil de distinguir', adviceTitle: 'Nunca sinalize só pela cor',
    advice: 'Mais ou menos um em cada vinte homens tem alguma deficiência de visão de cores. Uma tela que marca sucesso em verde e falha em vermelho parece a mesma cor para boa parte deles. Junte à cor um ícone (✓ ✕) ou uma palavra e o significado sobrevive sem ela.',
    types: { protanopia: 'Protanopia', deuteranopia: 'Deuteranopia', tritanopia: 'Tritanopia', achromatopsia: 'Acromatopsia' },
    descs: {
      protanopia: 'Os vermelhos aparecem mais escuros, então vermelho e verde ficam parecidos',
      deuteranopia: 'O tipo mais comum — vermelho e verde ficam quase iguais',
      tritanopia: 'Um tipo raro, em que azul e verde são difíceis de separar',
      achromatopsia: 'Nenhuma cor, só a luminosidade permanece',
    },
    approxNote: 'A simulação é uma aproximação, então não é exatamente o que alguém vê. Use para julgar se uma combinação é arriscada, não como reprodução exata.',
  },
  ja: {
    first: '一つ目の色', second: '二つ目の色', normal: '一般色覚での見え方',
    distinguishable: '区別できる', hardToTell: '区別しにくい', adviceTitle: '色だけで伝えないこと',
    advice: '男性の二十人に一人ほどに色覚特性があります。成功は緑、失敗は赤のように色だけで区別する画面は、その多くの人には同じ色に見えます。アイコン（✓ ✕）や文字を添えれば、色が見えなくても意味は伝わります。',
    types: { protanopia: '1型（P型）色覚', deuteranopia: '2型（D型）色覚', tritanopia: '3型（T型）色覚', achromatopsia: '全色盲' },
    descs: {
      protanopia: '赤が暗く感じられ、赤と緑が似て見えます',
      deuteranopia: 'もっとも多い型で、赤と緑がほぼ同じに見えます',
      tritanopia: 'まれな型で、青と緑の区別が難しくなります',
      achromatopsia: '色をまったく区別できず、明暗だけが残ります',
    },
    approxNote: 'シミュレーションは近似変換なので、実際にその人が見ている色と完全に同じではありません。組み合わせが危ないかを見極める用途に使ってください。',
  },
  de: {
    first: 'Erste Farbe', second: 'Zweite Farbe', normal: 'So sieht es mit normalem Farbsehen aus',
    distinguishable: 'Unterscheidbar', hardToTell: 'Kaum zu unterscheiden', adviceTitle: 'Niemals nur über Farbe informieren',
    advice: 'Etwa einer von zwanzig Männern hat eine Farbsehschwäche. Ein Screen, der Erfolg in Grün und Fehler in Rot markiert, sieht für viele davon gleich aus. Kombiniere die Farbe mit einem Symbol (✓ ✕) oder einem Wort, dann bleibt die Bedeutung auch ohne sie erhalten.',
    types: { protanopia: 'Protanopie', deuteranopia: 'Deuteranopie', tritanopia: 'Tritanopie', achromatopsia: 'Achromatopsie' },
    descs: {
      protanopia: 'Rottöne erscheinen dunkler, dadurch wirken Rot und Grün ähnlich',
      deuteranopia: 'Die häufigste Form — Rot und Grün sehen fast gleich aus',
      tritanopia: 'Eine seltene Form, bei der Blau und Grün schwer zu trennen sind',
      achromatopsia: 'Überhaupt keine Farbe, nur Helligkeit bleibt',
    },
    approxNote: 'Die Simulation ist eine Annäherung und damit nicht genau das, was jemand wirklich sieht. Nutze sie, um einzuschätzen, ob eine Kombination riskant ist — nicht als exakte Wiedergabe.',
  },
  fr: {
    first: 'Première couleur', second: 'Deuxième couleur', normal: 'Tel que le voit une vision des couleurs normale',
    distinguishable: 'Se distinguent', hardToTell: 'Difficiles à distinguer', adviceTitle: 'Ne jamais signaler par la couleur seule',
    advice: 'Environ un homme sur vingt a une déficience de la vision des couleurs. Un écran qui marque la réussite en vert et l’échec en rouge apparaît de la même couleur pour bon nombre d’entre eux. Associez à la couleur une icône (✓ ✕) ou un mot, et le sens survit sans elle.',
    types: { protanopia: 'Protanopie', deuteranopia: 'Deutéranopie', tritanopia: 'Tritanopie', achromatopsia: 'Achromatopsie' },
    descs: {
      protanopia: 'Les rouges paraissent plus sombres, si bien que rouge et vert se ressemblent',
      deuteranopia: 'Le type le plus courant — rouge et vert paraissent presque identiques',
      tritanopia: 'Un type rare, où bleu et vert sont difficiles à séparer',
      achromatopsia: 'Aucune couleur, seule la luminosité subsiste',
    },
    approxNote: 'La simulation est une approximation : ce n’est pas exactement ce que quelqu’un voit. Servez-vous-en pour juger si une combinaison est risquée, pas comme rendu exact.',
  },
  hi: {
    first: 'पहला रंग', second: 'दूसरा रंग', normal: 'सामान्य रंग-दृष्टि में ऐसा दिखता है',
    distinguishable: 'अलग दिखते हैं', hardToTell: 'अलग करना मुश्किल', adviceTitle: 'सिर्फ़ रंग से कुछ न बताएँ',
    advice: 'लगभग बीस में से एक पुरुष को रंग-दृष्टि की कोई कमी होती है। सफलता को हरे और विफलता को लाल से बताने वाली स्क्रीन उनमें से कई को एक ही रंग की दिखती है। रंग के साथ आइकन (✓ ✕) या शब्द भी रखें, तो रंग न दिखने पर भी अर्थ पहुँच जाता है।',
    types: { protanopia: 'प्रोटानोपिया', deuteranopia: 'ड्यूटेरानोपिया', tritanopia: 'ट्राइटानोपिया', achromatopsia: 'पूर्ण वर्णांधता' },
    descs: {
      protanopia: 'लाल गहरा लगता है, इसलिए लाल और हरा एक जैसे दिखते हैं',
      deuteranopia: 'सबसे आम प्रकार — लाल और हरा लगभग एक जैसे दिखते हैं',
      tritanopia: 'दुर्लभ प्रकार, जिसमें नीला और हरा अलग करना मुश्किल होता है',
      achromatopsia: 'रंग बिल्कुल नहीं, सिर्फ़ चमक बचती है',
    },
    approxNote: 'यह सिम्युलेशन अनुमानित रूपांतरण है, इसलिए वह ठीक वैसा नहीं है जैसा कोई असल में देखता है। किसी संयोजन का जोखिम आँकने के लिए इसका इस्तेमाल करें, सटीक चित्रण के लिए नहीं।',
  },
  'zh-hans': {
    first: '第一个颜色', second: '第二个颜色', normal: '一般色觉看到的样子',
    distinguishable: '分得出', hardToTell: '难以分辨', adviceTitle: '别只靠颜色传达信息',
    advice: '大约每二十个男性里就有一个色觉异常。成功用绿、失败用红这样只靠颜色区分的界面，在他们中相当一部分人眼里是同一个颜色。配上图标（✓ ✕）或文字，看不出颜色也能明白意思。',
    types: { protanopia: '红色盲', deuteranopia: '绿色盲', tritanopia: '蓝色盲', achromatopsia: '全色盲' },
    descs: {
      protanopia: '把红色感觉得偏暗，所以红和绿看起来相近',
      deuteranopia: '最常见的一种，红和绿几乎一模一样',
      tritanopia: '较少见，蓝和绿难以分辨',
      achromatopsia: '完全分不出颜色，只剩明暗',
    },
    approxNote: '模拟用的是近似转换，和当事人真正看到的颜色并不完全一样。请把它当成判断「这个组合危不危险」的工具。',
  },
  'zh-hant': {
    first: '第一個顏色', second: '第二個顏色', normal: '一般色覺看到的樣子',
    distinguishable: '分得出', hardToTell: '難以分辨', adviceTitle: '別只靠顏色傳達資訊',
    advice: '大約每二十個男性裡就有一個色覺異常。成功用綠、失敗用紅這樣只靠顏色區分的介面，在他們中相當一部分人眼裡是同一個顏色。配上圖示（✓ ✕）或文字，看不出顏色也能明白意思。',
    types: { protanopia: '紅色盲', deuteranopia: '綠色盲', tritanopia: '藍色盲', achromatopsia: '全色盲' },
    descs: {
      protanopia: '把紅色感覺得偏暗，所以紅和綠看起來相近',
      deuteranopia: '最常見的一種，紅和綠幾乎一模一樣',
      tritanopia: '較少見，藍和綠難以分辨',
      achromatopsia: '完全分不出顏色，只剩明暗',
    },
    approxNote: '模擬用的是近似轉換，和當事人真正看到的顏色並不完全一樣。請把它當成判斷「這個組合危不危險」的工具。',
  },
};

/* ── 그라디언트 ── */
export const GRADIENT_UI: L<{
  startColor: string; midColor: string; endColor: string; angle: string;
  addMid: string; radial: string; presets: string; copyCss: string; copiedCss: string;
  presetNames: [string, string, string, string]; note: string;
}> = {
  ko: {
    startColor: '시작 색', midColor: '중간 색', endColor: '끝 색', angle: '각도',
    addMid: '중간 색 넣기', radial: '가운데서 퍼지는 방사형으로', presets: '프리셋',
    copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presetNames: ['노을', '바다', '숲', '밤'],
    note: '그라디언트 위에 글자를 얹을 때는 가장 밝은 지점과 가장 어두운 지점 양쪽에서 대비를 확인해야 합니다. 한쪽에서만 맞추면 반대쪽에서 글자가 사라집니다.',
  },
  en: {
    startColor: 'Start colour', midColor: 'Middle colour', endColor: 'End colour', angle: 'Angle',
    addMid: 'Add a middle colour', radial: 'Radial, spreading from the centre', presets: 'Presets',
    copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presetNames: ['Sunset', 'Ocean', 'Forest', 'Night'],
    note: 'When you put text over a gradient, check the contrast at both the lightest and the darkest point. Tune it for one end only and the text disappears at the other.',
  },
  es: {
    startColor: 'Color inicial', midColor: 'Color intermedio', endColor: 'Color final', angle: 'Ángulo',
    addMid: 'Añadir un color intermedio', radial: 'Radial, desde el centro hacia fuera', presets: 'Ajustes',
    copyCss: 'Copiar el CSS', copiedCss: '✅ CSS copiado',
    presetNames: ['Atardecer', 'Océano', 'Bosque', 'Noche'],
    note: 'Si pones texto sobre un degradado, comprueba el contraste tanto en el punto más claro como en el más oscuro. Si lo ajustas solo para un extremo, el texto desaparece en el otro.',
  },
  'pt-br': {
    startColor: 'Cor inicial', midColor: 'Cor do meio', endColor: 'Cor final', angle: 'Ângulo',
    addMid: 'Adicionar uma cor no meio', radial: 'Radial, se espalhando do centro', presets: 'Presets',
    copyCss: 'Copiar o CSS', copiedCss: '✅ CSS copiado',
    presetNames: ['Pôr do sol', 'Oceano', 'Floresta', 'Noite'],
    note: 'Ao colocar texto sobre um gradiente, verifique o contraste tanto no ponto mais claro quanto no mais escuro. Se ajustar só para um lado, o texto desaparece no outro.',
  },
  ja: {
    startColor: '開始色', midColor: '中間色', endColor: '終了色', angle: '角度',
    addMid: '中間色を入れる', radial: '中央から広がる放射状に', presets: 'プリセット',
    copyCss: 'CSSをコピー', copiedCss: '✅ CSSをコピーしました',
    presetNames: ['夕焼け', '海', '森', '夜'],
    note: 'グラデーションの上に文字を載せるときは、もっとも明るい点ともっとも暗い点の両方で対比を確認してください。片方だけで合わせると、反対側で文字が消えます。',
  },
  de: {
    startColor: 'Startfarbe', midColor: 'Mittelfarbe', endColor: 'Endfarbe', angle: 'Winkel',
    addMid: 'Mittelfarbe hinzufügen', radial: 'Radial, aus der Mitte heraus', presets: 'Vorlagen',
    copyCss: 'CSS kopieren', copiedCss: '✅ CSS kopiert',
    presetNames: ['Sonnenuntergang', 'Ozean', 'Wald', 'Nacht'],
    note: 'Wenn Text über einem Verlauf liegt, prüfe den Kontrast an der hellsten und an der dunkelsten Stelle. Stimmst du ihn nur für ein Ende ab, verschwindet der Text am anderen.',
  },
  fr: {
    startColor: 'Couleur de départ', midColor: 'Couleur intermédiaire', endColor: 'Couleur de fin', angle: 'Angle',
    addMid: 'Ajouter une couleur intermédiaire', radial: 'Radial, depuis le centre', presets: 'Préréglages',
    copyCss: 'Copier le CSS', copiedCss: '✅ CSS copié',
    presetNames: ['Coucher de soleil', 'Océan', 'Forêt', 'Nuit'],
    note: 'Quand vous posez du texte sur un dégradé, vérifiez le contraste au point le plus clair et au plus sombre. Réglé pour un seul bout, le texte disparaît à l’autre.',
  },
  hi: {
    startColor: 'शुरुआती रंग', midColor: 'बीच का रंग', endColor: 'अंतिम रंग', angle: 'कोण',
    addMid: 'बीच का रंग जोड़ें', radial: 'बीच से फैलने वाला radial', presets: 'प्रीसेट',
    copyCss: 'CSS कॉपी करें', copiedCss: '✅ CSS कॉपी हो गया',
    presetNames: ['सूर्यास्त', 'समुद्र', 'जंगल', 'रात'],
    note: 'ग्रेडिएंट पर टेक्स्ट रखते समय सबसे हल्के और सबसे गहरे — दोनों बिंदुओं पर कंट्रास्ट जाँचें। सिर्फ़ एक सिरे के हिसाब से सेट करेंगे तो दूसरे सिरे पर टेक्स्ट ग़ायब हो जाएगा।',
  },
  'zh-hans': {
    startColor: '起始色', midColor: '中间色', endColor: '结束色', angle: '角度',
    addMid: '加一个中间色', radial: '改成从中心散开的径向渐变', presets: '预设',
    copyCss: '复制 CSS', copiedCss: '✅ 已复制 CSS',
    presetNames: ['晚霞', '海', '森林', '夜'],
    note: '要在渐变上放文字，最亮的那一端和最暗的那一端都得量一遍对比度。只按一边调，字到了另一边就消失了。',
  },
  'zh-hant': {
    startColor: '起始色', midColor: '中間色', endColor: '結束色', angle: '角度',
    addMid: '加一個中間色', radial: '改成從中心散開的放射狀漸層', presets: '預設',
    copyCss: '複製 CSS', copiedCss: '✅ 已複製 CSS',
    presetNames: ['晚霞', '海', '森林', '夜'],
    note: '要在漸層上放文字，最亮的那一端和最暗的那一端都得量一遍對比度。只按一邊調，字到了另一邊就消失了。',
  },
};

/* ── 그림자 ── */
export const SHADOW_UI: L<{
  shadowColor: string; opacity: string; offsetX: string; offsetY: string; blur: string; spread: string;
  inset: string; copyCss: string; copiedCss: string;
  presets: [string, string, string, string]; note: string;
}> = {
  ko: {
    shadowColor: '그림자 색', opacity: '투명도', offsetX: '가로 위치', offsetY: '세로 위치', blur: '흐림', spread: '번짐',
    inset: '안쪽 그림자(inset) — 눌린 느낌', copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presets: ['얕게', '보통', '떠 있게', '깊게'],
    note: '자연스러운 그림자는 대개 아래로만 살짝 내려가고(가로 0), 색은 검정 대신 배경보다 조금 어두운 남색 계열을 옅게 씁니다. 순수한 검정 그림자는 탁해 보입니다.',
  },
  en: {
    shadowColor: 'Shadow colour', opacity: 'Opacity', offsetX: 'Offset X', offsetY: 'Offset Y', blur: 'Blur', spread: 'Spread',
    inset: 'Inset shadow — a pressed-in look', copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presets: ['Subtle', 'Medium', 'Floating', 'Deep'],
    note: 'A natural shadow usually falls straight down (offset X of 0), and uses a faint navy rather than black — slightly darker than the background. Pure black shadows look muddy.',
  },
  es: {
    shadowColor: 'Color de la sombra', opacity: 'Opacidad', offsetX: 'Desplazamiento X', offsetY: 'Desplazamiento Y', blur: 'Desenfoque', spread: 'Extensión',
    inset: 'Sombra interior (inset): aspecto hundido', copyCss: 'Copiar el CSS', copiedCss: '✅ CSS copiado',
    presets: ['Sutil', 'Media', 'Flotante', 'Profunda'],
    note: 'Una sombra natural suele caer recta hacia abajo (desplazamiento X de 0) y usa un azul marino tenue en vez de negro, algo más oscuro que el fondo. Las sombras negras puras se ven turbias.',
  },
  'pt-br': {
    shadowColor: 'Cor da sombra', opacity: 'Opacidade', offsetX: 'Deslocamento X', offsetY: 'Deslocamento Y', blur: 'Desfoque', spread: 'Espalhamento',
    inset: 'Sombra interna (inset) — aspecto afundado', copyCss: 'Copiar o CSS', copiedCss: '✅ CSS copiado',
    presets: ['Suave', 'Média', 'Flutuante', 'Profunda'],
    note: 'Uma sombra natural normalmente cai reta para baixo (deslocamento X de 0) e usa um azul-marinho fraco em vez de preto, um pouco mais escuro que o fundo. Sombras preto puro ficam embaçadas.',
  },
  ja: {
    shadowColor: '影の色', opacity: '不透明度', offsetX: '横位置', offsetY: '縦位置', blur: 'ぼかし', spread: '広がり',
    inset: '内側の影（inset）— 押し込まれた感じ', copyCss: 'CSSをコピー', copiedCss: '✅ CSSをコピーしました',
    presets: ['浅く', '標準', '浮かせる', '深く'],
    note: '自然な影はたいてい真下にわずかに落ち（横位置0）、色は黒ではなく背景より少し暗い紺系を薄く使います。純粋な黒の影は濁って見えます。',
  },
  de: {
    shadowColor: 'Schattenfarbe', opacity: 'Deckkraft', offsetX: 'Versatz X', offsetY: 'Versatz Y', blur: 'Weichzeichnung', spread: 'Ausbreitung',
    inset: 'Innenschatten (inset) — wirkt eingedrückt', copyCss: 'CSS kopieren', copiedCss: '✅ CSS kopiert',
    presets: ['Zart', 'Mittel', 'Schwebend', 'Tief'],
    note: 'Ein natürlicher Schatten fällt meist gerade nach unten (Versatz X von 0) und nutzt ein blasses Marineblau statt Schwarz — etwas dunkler als der Hintergrund. Rein schwarze Schatten wirken trüb.',
  },
  fr: {
    shadowColor: 'Couleur de l’ombre', opacity: 'Opacité', offsetX: 'Décalage X', offsetY: 'Décalage Y', blur: 'Flou', spread: 'Étalement',
    inset: 'Ombre intérieure (inset) — un effet enfoncé', copyCss: 'Copier le CSS', copiedCss: '✅ CSS copié',
    presets: ['Discrète', 'Moyenne', 'Flottante', 'Profonde'],
    note: 'Une ombre naturelle tombe généralement droit vers le bas (décalage X de 0) et utilise un bleu marine léger plutôt que du noir, un peu plus sombre que le fond. Les ombres noir pur paraissent ternes.',
  },
  hi: {
    shadowColor: 'छाया का रंग', opacity: 'अपारदर्शिता', offsetX: 'क्षैतिज ऑफ़सेट', offsetY: 'लंबवत ऑफ़सेट', blur: 'ब्लर', spread: 'फैलाव',
    inset: 'अंदर की छाया (inset) — दबा हुआ लगता है', copyCss: 'CSS कॉपी करें', copiedCss: '✅ CSS कॉपी हो गया',
    presets: ['हल्की', 'सामान्य', 'तैरती', 'गहरी'],
    note: 'स्वाभाविक छाया अक्सर सीधे नीचे गिरती है (क्षैतिज ऑफ़सेट 0) और काले की जगह बैकग्राउंड से थोड़ा गहरा हल्का नेवी रंग लेती है। पूरी काली छाया मैली दिखती है।',
  },
  'zh-hans': {
    shadowColor: '阴影颜色', opacity: '不透明度', offsetX: '横向偏移', offsetY: '纵向偏移', blur: '模糊', spread: '扩散',
    inset: '内阴影（inset）—— 按下去的感觉', copyCss: '复制 CSS', copiedCss: '✅ 已复制 CSS',
    presets: ['浅', '普通', '浮起', '深'],
    note: '自然的阴影一般只往下稍微落一点（横向为 0），颜色也不用纯黑，而是比背景略暗的藏青系淡淡铺一层。纯黑的阴影看着发脏。',
  },
  'zh-hant': {
    shadowColor: '陰影顏色', opacity: '不透明度', offsetX: '橫向偏移', offsetY: '縱向偏移', blur: '模糊', spread: '擴散',
    inset: '內陰影（inset）—— 按下去的感覺', copyCss: '複製 CSS', copiedCss: '✅ 已複製 CSS',
    presets: ['淺', '普通', '浮起', '深'],
    note: '自然的陰影一般只往下稍微落一點（橫向為 0），顏色也不用純黑，而是比背景略暗的藏青系淡淡鋪一層。純黑的陰影看著發髒。',
  },
};

/* ── 색 이름 찾기 ── */
export const NAME_UI: L<{
  colorCode: string; nearest: string;
  almostSame: (d: number) => string; differs: (d: number) => string; cmykNote: string;
}> = {
  ko: {
    colorCode: '색 코드', nearest: '가장 가까운 이름',
    almostSame: d => `거의 같은 색입니다 (차이 ${d})`,
    differs: d => `이름 색과는 차이가 있습니다 (차이 ${d}) — 비슷한 계열로만 보세요`,
    cmykNote: 'CMYK 값은 단순 변환입니다. 실제 인쇄 색은 잉크·용지·인쇄기에 따라 달라지므로, 정확한 색이 필요한 인쇄물이라면 팬톤 같은 별색 지정이나 인쇄소 교정을 거쳐야 합니다.',
  },
  en: {
    colorCode: 'Colour code', nearest: 'Nearest named colour',
    almostSame: d => `Practically the same colour (difference ${d})`,
    differs: d => `Noticeably different from the named colour (difference ${d}) — treat it as the same family only`,
    cmykNote: 'The CMYK value is a straight conversion. Printed colour depends on the ink, the paper and the press, so for print work where the colour has to be right, specify a spot colour like Pantone or get a proof from the printer.',
  },
  es: {
    colorCode: 'Código de color', nearest: 'Color con nombre más cercano',
    almostSame: d => `Prácticamente el mismo color (diferencia ${d})`,
    differs: d => `Se nota distinto de ese color con nombre (diferencia ${d}): tómalo solo como la misma familia`,
    cmykNote: 'El valor CMYK es una conversión directa. El color impreso depende de la tinta, el papel y la máquina, así que para trabajos de imprenta donde el color tiene que salir bien, especifica un color directo tipo Pantone o pide una prueba a la imprenta.',
  },
  'pt-br': {
    colorCode: 'Código de cor', nearest: 'Cor com nome mais próxima',
    almostSame: d => `Praticamente a mesma cor (diferença ${d})`,
    differs: d => `Visivelmente diferente dessa cor com nome (diferença ${d}) — considere apenas a mesma família`,
    cmykNote: 'O valor CMYK é uma conversão direta. A cor impressa depende da tinta, do papel e da máquina, então para trabalhos de impressão em que a cor precisa sair certa, especifique uma cor especial tipo Pantone ou peça uma prova à gráfica.',
  },
  ja: {
    colorCode: 'カラーコード', nearest: 'いちばん近い色名',
    almostSame: d => `ほぼ同じ色です（差 ${d}）`,
    differs: d => `その色名とは差があります（差 ${d}）— 同じ系統として見てください`,
    cmykNote: 'CMYK値は単純変換です。実際の印刷色はインク・用紙・印刷機によって変わるので、色が重要な印刷物ではPANTONEのような特色指定や印刷所での校正を通してください。',
  },
  de: {
    colorCode: 'Farbcode', nearest: 'Nächstgelegener Farbname',
    almostSame: d => `Praktisch dieselbe Farbe (Abweichung ${d})`,
    differs: d => `Merklich anders als dieser Farbname (Abweichung ${d}) — nur als dieselbe Farbfamilie verstehen`,
    cmykNote: 'Der CMYK-Wert ist eine reine Umrechnung. Die gedruckte Farbe hängt von Tinte, Papier und Maschine ab — bei Druckarbeiten, wo die Farbe stimmen muss, gib eine Sonderfarbe wie Pantone an oder lass einen Proof von der Druckerei machen.',
  },
  fr: {
    colorCode: 'Code couleur', nearest: 'Couleur nommée la plus proche',
    almostSame: d => `Pratiquement la même couleur (écart ${d})`,
    differs: d => `Nettement différente de cette couleur nommée (écart ${d}) — à considérer comme la même famille seulement`,
    cmykNote: 'La valeur CMJN est une conversion directe. La couleur imprimée dépend de l’encre, du papier et de la presse : pour un travail d’impression où la couleur doit être juste, spécifiez un ton direct type Pantone ou demandez une épreuve à l’imprimeur.',
  },
  hi: {
    colorCode: 'रंग कोड', nearest: 'सबसे नज़दीक का नाम',
    almostSame: d => `लगभग वही रंग है (अंतर ${d})`,
    differs: d => `उस नामित रंग से साफ़ अंतर है (अंतर ${d}) — इसे सिर्फ़ एक ही परिवार का मानें`,
    cmykNote: 'CMYK मान सीधा रूपांतरण है। छपा हुआ रंग स्याही, काग़ज़ और मशीन पर निर्भर करता है, इसलिए जहाँ रंग सही आना ज़रूरी हो, वहाँ Pantone जैसा स्पॉट कलर तय करें या प्रेस से प्रूफ़ लें।',
  },
  'zh-hans': {
    colorCode: '颜色代码', nearest: '最接近的名字',
    almostSame: d => `几乎就是同一个颜色（差 ${d}）`,
    differs: d => `和这个名字的颜色有出入（差 ${d}）—— 只当同一色系看就好`,
    cmykNote: 'CMYK 是简单换算出来的。实际印出来的颜色会随油墨、纸张和印刷机变化，颜色要紧的印刷品，得指定潘通这类特别色，或者走印刷厂打样。',
  },
  'zh-hant': {
    colorCode: '顏色代碼', nearest: '最接近的名字',
    almostSame: d => `幾乎就是同一個顏色（差 ${d}）`,
    differs: d => `和這個名字的顏色有出入（差 ${d}）—— 只當同一色系看就好`,
    cmykNote: 'CMYK 是簡單換算出來的。實際印出來的顏色會隨油墨、紙張和印刷機變化，顏色要緊的印刷品，得指定 Pantone 這類特別色，或者走印刷廠打樣。',
  },
};

/* ── 색온도 ── */
export const TEMPERATURE_UI: L<{
  left: string; right: string;
  presets: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
  descs: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
  rightCompare: string; commonTitle: string; colderTitle: string; colderBody: string;
}> = {
  ko: {
    left: '왼쪽 색온도', right: '오른쪽 색온도',
    presets: { candle: '촛불', incandescent: '전구색', warmWhite: '주백색', daylight: '주광색', overcast: '흐린 하늘', blue: '차가운 파랑' },
    descs: {
      candle: '아주 붉고 따뜻함', incandescent: '집 안 조명, 아늑함', warmWhite: '사무실·주방',
      daylight: '한낮 햇빛', overcast: '푸르스름한 흰빛', blue: '사진의 기준광',
    },
    rightCompare: '오른쪽 색온도 (비교용)', commonTitle: '자주 쓰는 값', colderTitle: '숫자가 클수록 차갑다',
    colderBody: '말과 반대로, 켈빈 값이 낮을수록 붉고 따뜻한 빛이고 높을수록 푸르고 차가운 빛입니다. 쇠를 달굴 때 처음엔 붉게, 더 뜨거워지면 희고 푸르게 빛나는 것을 기준으로 삼았기 때문입니다. 집 안 조명은 2700~3000K, 작업 공간은 4000~5000K가 무난합니다.',
  },
  en: {
    left: 'Left temperature', right: 'Right temperature',
    presets: { candle: 'Candlelight', incandescent: 'Incandescent', warmWhite: 'Warm white', daylight: 'Daylight', overcast: 'Overcast sky', blue: 'Cool blue' },
    descs: {
      candle: 'Very red and warm', incandescent: 'Home lighting, cosy', warmWhite: 'Offices and kitchens',
      daylight: 'Midday sun', overcast: 'A bluish white', blue: 'The reference light in photography',
    },
    rightCompare: 'Right temperature (for comparison)', commonTitle: 'Common values', colderTitle: 'Higher numbers are colder',
    colderBody: 'Counter to how it sounds, a lower Kelvin value is redder and warmer, and a higher one is bluer and colder. The scale comes from heating metal — first red, then white and bluish as it gets hotter. Home lighting sits around 2700–3000K, and a workspace around 4000–5000K.',
  },
  es: {
    left: 'Temperatura izquierda', right: 'Temperatura derecha',
    presets: { candle: 'Luz de vela', incandescent: 'Incandescente', warmWhite: 'Blanco cálido', daylight: 'Luz de día', overcast: 'Cielo nublado', blue: 'Azul frío' },
    descs: {
      candle: 'Muy rojiza y cálida', incandescent: 'Iluminación de casa, acogedora', warmWhite: 'Oficinas y cocinas',
      daylight: 'Sol de mediodía', overcast: 'Un blanco azulado', blue: 'La luz de referencia en fotografía',
    },
    rightCompare: 'Temperatura derecha (para comparar)', commonTitle: 'Valores habituales', colderTitle: 'Cuanto más alto el número, más frío',
    colderBody: 'Al contrario de lo que suena, un valor bajo en kelvin es más rojo y cálido, y uno alto es más azul y frío. La escala viene de calentar metal: primero rojo, luego blanco y azulado a medida que se calienta. La iluminación de casa ronda los 2700–3000 K y un espacio de trabajo los 4000–5000 K.',
  },
  'pt-br': {
    left: 'Temperatura da esquerda', right: 'Temperatura da direita',
    presets: { candle: 'Luz de vela', incandescent: 'Incandescente', warmWhite: 'Branco quente', daylight: 'Luz do dia', overcast: 'Céu nublado', blue: 'Azul frio' },
    descs: {
      candle: 'Bem avermelhada e quente', incandescent: 'Iluminação de casa, acolhedora', warmWhite: 'Escritórios e cozinhas',
      daylight: 'Sol do meio-dia', overcast: 'Um branco azulado', blue: 'A luz de referência na fotografia',
    },
    rightCompare: 'Temperatura da direita (para comparar)', commonTitle: 'Valores comuns', colderTitle: 'Número maior é mais frio',
    colderBody: 'Ao contrário do que parece, um valor menor em kelvin é mais vermelho e quente, e um maior é mais azul e frio. A escala vem de aquecer metal: primeiro vermelho, depois branco e azulado conforme esquenta. Iluminação de casa fica em torno de 2700–3000 K e um espaço de trabalho em 4000–5000 K.',
  },
  ja: {
    left: '左の色温度', right: '右の色温度',
    presets: { candle: 'ろうそく', incandescent: '電球色', warmWhite: '温白色', daylight: '昼光色', overcast: '曇り空', blue: '冷たい青' },
    descs: {
      candle: 'とても赤く暖かい', incandescent: '家の照明、落ち着く', warmWhite: 'オフィス・台所',
      daylight: '真昼の日光', overcast: '青みがかった白', blue: '写真の基準光',
    },
    rightCompare: '右の色温度（比較用）', commonTitle: 'よく使う値', colderTitle: '数字が大きいほど冷たい',
    colderBody: '言葉の印象とは逆で、ケルビン値が低いほど赤く暖かい光、高いほど青く冷たい光です。鉄を熱すると最初は赤く、さらに熱くなると白く青く光ることを基準にしたためです。家の照明は2700〜3000K、作業空間は4000〜5000Kが無理のない範囲です。',
  },
  de: {
    left: 'Temperatur links', right: 'Temperatur rechts',
    presets: { candle: 'Kerzenlicht', incandescent: 'Glühlampe', warmWhite: 'Warmweiß', daylight: 'Tageslicht', overcast: 'Bedeckter Himmel', blue: 'Kühles Blau' },
    descs: {
      candle: 'Sehr rot und warm', incandescent: 'Wohnraumlicht, gemütlich', warmWhite: 'Büros und Küchen',
      daylight: 'Mittagssonne', overcast: 'Ein bläuliches Weiß', blue: 'Das Referenzlicht in der Fotografie',
    },
    rightCompare: 'Temperatur rechts (zum Vergleich)', commonTitle: 'Gängige Werte', colderTitle: 'Höhere Zahlen sind kälter',
    colderBody: 'Anders als es klingt, ist ein niedrigerer Kelvin-Wert röter und wärmer, ein höherer blauer und kälter. Die Skala kommt vom Erhitzen von Metall — erst rot, dann weiß und bläulich, je heißer es wird. Wohnraumlicht liegt bei etwa 2700–3000 K, ein Arbeitsplatz bei 4000–5000 K.',
  },
  fr: {
    left: 'Température de gauche', right: 'Température de droite',
    presets: { candle: 'Bougie', incandescent: 'Incandescent', warmWhite: 'Blanc chaud', daylight: 'Lumière du jour', overcast: 'Ciel couvert', blue: 'Bleu froid' },
    descs: {
      candle: 'Très rouge et chaude', incandescent: 'Éclairage domestique, chaleureux', warmWhite: 'Bureaux et cuisines',
      daylight: 'Soleil de midi', overcast: 'Un blanc bleuté', blue: 'La lumière de référence en photo',
    },
    rightCompare: 'Température de droite (pour comparer)', commonTitle: 'Valeurs courantes', colderTitle: 'Plus le nombre est haut, plus c’est froid',
    colderBody: 'À l’inverse de ce que le mot suggère, une valeur en kelvins plus basse est plus rouge et plus chaude, et une plus haute est plus bleue et plus froide. L’échelle vient du chauffage du métal : d’abord rouge, puis blanc et bleuté à mesure qu’il chauffe. L’éclairage domestique tourne autour de 2700–3000 K, un espace de travail autour de 4000–5000 K.',
  },
  hi: {
    left: 'बाईं ओर का रंग तापमान', right: 'दाईं ओर का रंग तापमान',
    presets: { candle: 'मोमबत्ती', incandescent: 'बल्ब जैसा', warmWhite: 'वॉर्म व्हाइट', daylight: 'डेलाइट', overcast: 'बादल भरा आकाश', blue: 'ठंडा नीला' },
    descs: {
      candle: 'बहुत लाल और गर्म', incandescent: 'घर की रोशनी, आरामदेह', warmWhite: 'दफ़्तर और रसोई',
      daylight: 'दोपहर की धूप', overcast: 'नीलापन लिए सफ़ेद', blue: 'फ़ोटोग्राफ़ी की मानक रोशनी',
    },
    rightCompare: 'दाईं ओर का रंग तापमान (तुलना के लिए)', commonTitle: 'आम मान', colderTitle: 'अंक जितना बड़ा, उतना ठंडा',
    colderBody: 'नाम से उलट, केल्विन मान जितना कम हो रोशनी उतनी लाल और गर्म होती है, और जितना ज़्यादा हो उतनी नीली और ठंडी। यह पैमाना धातु को गर्म करने से आया है — पहले लाल, और ज़्यादा गर्म होने पर सफ़ेद और नीली। घर की रोशनी 2700–3000K के आसपास और काम की जगह 4000–5000K के आसपास ठीक रहती है।',
  },
  'zh-hans': {
    left: '左侧色温', right: '右侧色温',
    presets: { candle: '烛光', incandescent: '白炽灯色', warmWhite: '暖白', daylight: '日光色', overcast: '阴天', blue: '冷蓝' },
    descs: {
      candle: '非常红、非常暖', incandescent: '家里的照明，温馨', warmWhite: '办公室与厨房',
      daylight: '正午的阳光', overcast: '泛蓝的白光', blue: '摄影的基准光',
    },
    rightCompare: '右侧色温（用来对照）', commonTitle: '常用的值', colderTitle: '数字越大越冷',
    colderBody: '和直觉相反：开尔文值越低，光越红越暖；越高，光越蓝越冷。这是因为它以铁块加热为准 —— 起初烧红，越热就越白、越蓝。家里的照明用 2700~3000K，工作区域用 4000~5000K 都比较稳妥。',
  },
  'zh-hant': {
    left: '左側色溫', right: '右側色溫',
    presets: { candle: '燭光', incandescent: '白熾燈色', warmWhite: '暖白', daylight: '日光色', overcast: '陰天', blue: '冷藍' },
    descs: {
      candle: '非常紅、非常暖', incandescent: '家裡的照明，溫馨', warmWhite: '辦公室與廚房',
      daylight: '正午的陽光', overcast: '泛藍的白光', blue: '攝影的基準光',
    },
    rightCompare: '右側色溫（用來對照）', commonTitle: '常用的值', colderTitle: '數字越大越冷',
    colderBody: '和直覺相反：克耳文值越低，光越紅越暖；越高，光越藍越冷。這是因為它以鐵塊加熱為準 —— 起初燒紅，越熱就越白、越藍。家裡的照明用 2700~3000K，工作區域用 4000~5000K 都比較穩妥。',
  },
};

/**
 * 색 이름의 언어별 표기 — NAMED_COLORS의 name을 열쇠로 쓴다.
 *
 * hex와 배열 순서는 그대로 두고 이름만 갈아 끼운다. 영어는 name을 그대로 쓰면
 * 되므로 여기 없다 — 'skyblue'는 영어권에서 그 자체가 색 이름이다.
 */
export const NAMED_COLOR_INTL: Record<Exclude<ColorLang, 'ko' | 'en'>, Record<string, string>> = {
  es: {
    black: 'negro', white: 'blanco', gray: 'gris', silver: 'plata', red: 'rojo', maroon: 'granate',
    crimson: 'carmesí', tomato: 'tomate', coral: 'coral', orange: 'naranja', gold: 'oro', yellow: 'amarillo',
    olive: 'oliva', lime: 'lima', green: 'verde', seagreen: 'verde mar', teal: 'verde azulado', cyan: 'cian',
    skyblue: 'azul cielo', blue: 'azul', navy: 'azul marino', indigo: 'índigo', purple: 'púrpura',
    violet: 'violeta', magenta: 'magenta', pink: 'rosa', brown: 'marrón', chocolate: 'chocolate',
    tan: 'canela', beige: 'beige',
  },
  'pt-br': {
    black: 'preto', white: 'branco', gray: 'cinza', silver: 'prata', red: 'vermelho', maroon: 'grená',
    crimson: 'carmim', tomato: 'tomate', coral: 'coral', orange: 'laranja', gold: 'ouro', yellow: 'amarelo',
    olive: 'oliva', lime: 'verde-limão', green: 'verde', seagreen: 'verde-mar', teal: 'verde-azulado', cyan: 'ciano',
    skyblue: 'azul-céu', blue: 'azul', navy: 'azul-marinho', indigo: 'índigo', purple: 'roxo',
    violet: 'violeta', magenta: 'magenta', pink: 'rosa', brown: 'marrom', chocolate: 'chocolate',
    tan: 'castanho-claro', beige: 'bege',
  },
  ja: {
    black: '黒', white: '白', gray: '灰色', silver: '銀', red: '赤', maroon: '栗色',
    crimson: '深紅', tomato: 'トマト色', coral: '珊瑚色', orange: 'オレンジ', gold: '金', yellow: '黄',
    olive: 'オリーブ', lime: '黄緑', green: '緑', seagreen: '海緑色', teal: '青緑', cyan: 'シアン',
    skyblue: '空色', blue: '青', navy: '紺', indigo: '藍', purple: '紫',
    violet: '菫色', magenta: 'マゼンタ', pink: '桃色', brown: '茶色', chocolate: 'チョコレート色',
    tan: '黄褐色', beige: 'ベージュ',
  },
  de: {
    black: 'Schwarz', white: 'Weiß', gray: 'Grau', silver: 'Silber', red: 'Rot', maroon: 'Kastanienbraun',
    crimson: 'Karmesinrot', tomato: 'Tomatenrot', coral: 'Korallenrot', orange: 'Orange', gold: 'Gold', yellow: 'Gelb',
    olive: 'Olivgrün', lime: 'Hellgrün', green: 'Grün', seagreen: 'Meergrün', teal: 'Petrol', cyan: 'Cyan',
    skyblue: 'Himmelblau', blue: 'Blau', navy: 'Marineblau', indigo: 'Indigo', purple: 'Purpur',
    violet: 'Violett', magenta: 'Magenta', pink: 'Pink', brown: 'Braun', chocolate: 'Schokoladenbraun',
    tan: 'Hellbraun', beige: 'Beige',
  },
  fr: {
    black: 'noir', white: 'blanc', gray: 'gris', silver: 'argent', red: 'rouge', maroon: 'bordeaux',
    crimson: 'cramoisi', tomato: 'tomate', coral: 'corail', orange: 'orange', gold: 'or', yellow: 'jaune',
    olive: 'olive', lime: 'vert citron', green: 'vert', seagreen: 'vert d’eau', teal: 'sarcelle', cyan: 'cyan',
    skyblue: 'bleu ciel', blue: 'bleu', navy: 'bleu marine', indigo: 'indigo', purple: 'pourpre',
    violet: 'violet', magenta: 'magenta', pink: 'rose', brown: 'brun', chocolate: 'chocolat',
    tan: 'fauve', beige: 'beige',
  },
  hi: {
    black: 'काला', white: 'सफ़ेद', gray: 'स्लेटी', silver: 'चाँदी', red: 'लाल', maroon: 'मैरून',
    crimson: 'क्रिमसन', tomato: 'टमाटरी', coral: 'मूँगा', orange: 'नारंगी', gold: 'सुनहरा', yellow: 'पीला',
    olive: 'जैतूनी', lime: 'नीबूई हरा', green: 'हरा', seagreen: 'समुद्री हरा', teal: 'हरा-नीला', cyan: 'सायन',
    skyblue: 'आसमानी', blue: 'नीला', navy: 'गहरा नीला', indigo: 'जामुनी नील', purple: 'बैंजनी',
    violet: 'वायलेट', magenta: 'मैजेंटा', pink: 'गुलाबी', brown: 'भूरा', chocolate: 'चॉकलेटी',
    tan: 'हल्का भूरा', beige: 'बेज',
  },
  'zh-hans': {
    black: '黑', white: '白', gray: '灰', silver: '银', red: '红', maroon: '栗',
    crimson: '绯红', tomato: '番茄红', coral: '珊瑚', orange: '橙', gold: '金', yellow: '黄',
    olive: '橄榄', lime: '青柠绿', green: '绿', seagreen: '海绿', teal: '鸭绿', cyan: '青',
    skyblue: '天蓝', blue: '蓝', navy: '藏青', indigo: '靛', purple: '紫',
    violet: '紫罗兰', magenta: '洋红', pink: '粉红', brown: '棕', chocolate: '巧克力色',
    tan: '浅褐', beige: '米色',
  },
  'zh-hant': {
    black: '黑', white: '白', gray: '灰', silver: '銀', red: '紅', maroon: '栗',
    crimson: '緋紅', tomato: '番茄紅', coral: '珊瑚', orange: '橙', gold: '金', yellow: '黃',
    olive: '橄欖', lime: '青檸綠', green: '綠', seagreen: '海綠', teal: '鴨綠', cyan: '青',
    skyblue: '天藍', blue: '藍', navy: '藏青', indigo: '靛', purple: '紫',
    violet: '紫羅蘭', magenta: '洋紅', pink: '粉紅', brown: '棕', chocolate: '巧克力色',
    tan: '淺褐', beige: '米色',
  },
};
