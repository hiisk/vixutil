/**
 * 이름이 있는 색 110가지 — 열 언어.
 *
 * 색 한 장에 들어가는 것(RGB·HSL·CMYK·밝기·대비·보색·명도 단계·색약 시뮬레이션)은
 * 전부 hex 하나에서 계산된다. 그래서 여기 적을 것은 hex와 이름뿐이고, 백열 장이
 * lib/color.ts의 함수로 채워진다.
 *
 * 이름은 언어마다 다르다. 색 이름은 그 나라 사람이 실제로 검색하는 단어라
 * 옮기지 않으면 페이지가 있어도 찾아오지 못한다 — 산호색을 스페인에서는 coral,
 * 일본에서는 コーラル, 인도에서는 मूंगा라고 찾는다. 기본색은 그 나라 고유어를
 * 쓰고(赤·लाल), 디자인에서 외래어로 굳은 색은 그 표기를 쓴다.
 */
import type { L } from '../i18n/lang.ts';

export type ColorFamily =
  | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'brown' | 'neutral' | 'metal';

export interface NamedColor {
  slug: string;
  hex: string;
  family: ColorFamily;
  name: L<string>;
}

/** 순서는 ko · en · es · pt · ja · de · fr · hi · zh · tw */
const c = (
  slug: string, hex: string, family: ColorFamily,
  ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string,
  zh: string, tw: string,
): NamedColor => ({ slug, hex, family, name: { ko, en, es, pt, ja, de, fr, hi, zh, tw } });

export const NAMED_COLORS_8: NamedColor[] = [
  /* ───────── 빨강 계열 ───────── */
  c('red', '#ff0000', 'red', '빨강', 'Red', 'Rojo', 'Vermelho', '赤', 'Rot', 'Rouge', 'लाल', '红', '紅'),
  c('crimson', '#dc143c', 'red', '크림슨', 'Crimson', 'Carmesí', 'Carmesim', 'クリムゾン', 'Karmesinrot', 'Cramoisi', 'क्रिमसन', '绯红', '緋紅'),
  c('scarlet', '#ff2400', 'red', '스칼릿', 'Scarlet', 'Escarlata', 'Escarlate', 'スカーレット', 'Scharlachrot', 'Écarlate', 'सिंदूरी', '猩红', '猩紅'),
  c('ruby', '#9b111e', 'red', '루비색', 'Ruby', 'Rubí', 'Rubi', 'ルビー', 'Rubinrot', 'Rubis', 'माणिक', '宝石红', '寶石紅'),
  c('cherry', '#d2042d', 'red', '체리색', 'Cherry', 'Cereza', 'Cereja', 'チェリー', 'Kirschrot', 'Cerise', 'चेरी', '樱桃红', '櫻桃紅'),
  c('rose', '#ff007f', 'red', '장미색', 'Rose', 'Rosa fuerte', 'Rosa forte', 'ローズ', 'Rosenrot', 'Rose magenta', 'गुलाबी लाल', '玫瑰红', '玫瑰紅'),
  c('maroon', '#800000', 'red', '적갈색', 'Maroon', 'Granate', 'Grená', 'マルーン', 'Kastanienbraun', 'Marron', 'मैरून', '栗色', '栗色'),
  c('burgundy', '#800020', 'red', '버건디', 'Burgundy', 'Burdeos', 'Bordô', 'バーガンディ', 'Bordeauxrot', 'Bordeaux', 'बरगंडी', '勃艮第红', '勃艮第紅'),
  c('brick', '#cb4154', 'red', '벽돌색', 'Brick red', 'Rojo ladrillo', 'Vermelho tijolo', 'レンガ色', 'Ziegelrot', 'Rouge brique', 'ईंटी लाल', '砖红', '磚紅'),
  c('vermilion', '#e34234', 'red', '주홍', 'Vermilion', 'Bermellón', 'Vermelhão', '朱色', 'Zinnoberrot', 'Vermillon', 'सिंदूर', '朱红', '朱紅'),
  c('coral', '#ff7f50', 'red', '산호색', 'Coral', 'Coral', 'Coral', 'コーラル', 'Korallenrot', 'Corail', 'मूंगा', '珊瑚色', '珊瑚色'),
  c('salmon', '#fa8072', 'red', '연어색', 'Salmon', 'Salmón', 'Salmão', 'サーモン', 'Lachsrosa', 'Saumon', 'सामन', '鲑鱼色', '鮭魚色'),

  /* ───────── 주황 계열 ───────── */
  c('orange', '#ffa500', 'orange', '주황', 'Orange', 'Naranja', 'Laranja', 'オレンジ', 'Orange', 'Orange', 'नारंगी', '橙色', '橙色'),
  c('tangerine', '#f28500', 'orange', '감귤색', 'Tangerine', 'Mandarina', 'Tangerina', 'タンジェリン', 'Mandarinenorange', 'Mandarine', 'संतरा', '橘色', '橘色'),
  c('apricot', '#fbceb1', 'orange', '살구색', 'Apricot', 'Albaricoque', 'Damasco', 'アプリコット', 'Aprikose', 'Abricot', 'खुबानी', '杏色', '杏色'),
  c('amber', '#ffbf00', 'orange', '호박색', 'Amber', 'Ámbar', 'Âmbar', 'アンバー', 'Bernstein', 'Ambre', 'अंबर', '琥珀色', '琥珀色'),
  c('peach', '#ffdab9', 'orange', '복숭아색', 'Peach', 'Melocotón', 'Pêssego', 'ピーチ', 'Pfirsich', 'Pêche', 'आड़ू', '蜜桃色', '蜜桃色'),
  c('carrot', '#ed9121', 'orange', '당근색', 'Carrot orange', 'Zanahoria', 'Cenoura', 'キャロット', 'Karottenorange', 'Carotte', 'गाजरी', '胡萝卜橙', '胡蘿蔔橙'),
  c('pumpkin', '#ff7518', 'orange', '호박주황', 'Pumpkin', 'Calabaza', 'Abóbora', 'パンプキン', 'Kürbisorange', 'Citrouille', 'कद्दू', '南瓜色', '南瓜色'),
  c('rust', '#b7410e', 'orange', '녹슨색', 'Rust', 'Óxido', 'Ferrugem', 'ラスト', 'Rostbraun', 'Rouille', 'जंग', '铁锈色', '鐵鏽色'),
  c('terracotta', '#e2725b', 'orange', '테라코타', 'Terracotta', 'Terracota', 'Terracota', 'テラコッタ', 'Terrakotta', 'Terre cuite', 'टेराकोटा', '陶土色', '陶土色'),

  /* ───────── 노랑 계열 ───────── */
  c('yellow', '#ffff00', 'yellow', '노랑', 'Yellow', 'Amarillo', 'Amarelo', '黄', 'Gelb', 'Jaune', 'पीला', '黄', '黃'),
  c('gold', '#ffd700', 'yellow', '금색', 'Gold', 'Dorado', 'Dourado', 'ゴールド', 'Goldgelb', 'Or', 'सुनहरा', '金色', '金色'),
  c('lemon', '#fff700', 'yellow', '레몬색', 'Lemon', 'Limón', 'Limão', 'レモン', 'Zitronengelb', 'Citron', 'नीबू', '柠檬黄', '檸檬黃'),
  c('mustard', '#ffdb58', 'yellow', '머스터드', 'Mustard', 'Mostaza', 'Mostarda', 'マスタード', 'Senfgelb', 'Moutarde', 'सरसों', '芥末黄', '芥末黃'),
  c('cream', '#fffdd0', 'yellow', '크림색', 'Cream', 'Crema', 'Creme', 'クリーム', 'Cremeweiß', 'Crème', 'क्रीम', '奶油色', '奶油色'),
  c('ivory', '#fffff0', 'yellow', '아이보리', 'Ivory', 'Marfil', 'Marfim', 'アイボリー', 'Elfenbein', 'Ivoire', 'हाथीदांत', '象牙白', '象牙白'),
  c('khaki', '#f0e68c', 'yellow', '카키', 'Khaki', 'Caqui', 'Cáqui', 'カーキ', 'Khaki', 'Kaki', 'खाकी', '卡其色', '卡其色'),
  c('honey', '#eb9605', 'yellow', '벌꿀색', 'Honey', 'Miel', 'Mel', 'ハニー', 'Honiggelb', 'Miel', 'शहदी', '蜂蜜色', '蜂蜜色'),
  c('corn', '#fbec5d', 'yellow', '옥수수색', 'Corn yellow', 'Maíz', 'Milho', 'コーン', 'Maisgelb', 'Maïs', 'मक्का', '玉米黄', '玉米黃'),
  c('canary', '#ffff99', 'yellow', '카나리아색', 'Canary', 'Canario', 'Canário', 'カナリア', 'Kanariengelb', 'Canari', 'कैनरी', '鹅黄', '鵝黃'),

  /* ───────── 초록 계열 ───────── */
  c('green', '#008000', 'green', '초록', 'Green', 'Verde', 'Verde', '緑', 'Grün', 'Vert', 'हरा', '绿', '綠'),
  c('lime', '#00ff00', 'green', '라임', 'Lime', 'Lima', 'Lima', 'ライム', 'Limettengrün', 'Vert lime', 'नीबू हरा', '青柠绿', '青檸綠'),
  c('olive', '#808000', 'green', '올리브', 'Olive', 'Oliva', 'Oliva', 'オリーブ', 'Olivgrün', 'Olive', 'जैतूनी', '橄榄绿', '橄欖綠'),
  c('emerald', '#50c878', 'green', '에메랄드', 'Emerald', 'Esmeralda', 'Esmeralda', 'エメラルド', 'Smaragdgrün', 'Émeraude', 'पन्ना', '祖母绿', '祖母綠'),
  c('mint', '#98ff98', 'green', '민트', 'Mint', 'Menta', 'Menta', 'ミント', 'Mintgrün', 'Menthe', 'पुदीना', '薄荷绿', '薄荷綠'),
  c('jade', '#00a86b', 'green', '옥색', 'Jade', 'Jade', 'Jade', 'ジェイド', 'Jadegrün', 'Jade', 'जेड', '翡翠绿', '翡翠綠'),
  c('forest-green', '#228b22', 'green', '숲녹색', 'Forest green', 'Verde bosque', 'Verde floresta', 'フォレストグリーン', 'Waldgrün', 'Vert forêt', 'वन हरा', '森林绿', '森林綠'),
  c('sage', '#9caf88', 'green', '세이지', 'Sage', 'Salvia', 'Sálvia', 'セージ', 'Salbeigrün', 'Sauge', 'सेज', '鼠尾草绿', '鼠尾草綠'),
  c('moss', '#8a9a5b', 'green', '이끼색', 'Moss green', 'Verde musgo', 'Verde musgo', 'モスグリーン', 'Moosgrün', 'Vert mousse', 'काई हरा', '苔藓绿', '苔蘚綠'),
  c('teal', '#008080', 'green', '청록', 'Teal', 'Verde azulado', 'Verde-azulado', 'ティール', 'Blaugrün', 'Sarcelle', 'टील', '鸭绿', '鴨綠'),
  c('turquoise', '#40e0d0', 'green', '터콰이즈', 'Turquoise', 'Turquesa', 'Turquesa', 'ターコイズ', 'Türkis', 'Turquoise', 'फ़िरोज़ा', '绿松石色', '綠松石色'),
  c('pistachio', '#93c572', 'green', '피스타치오', 'Pistachio', 'Pistacho', 'Pistache', 'ピスタチオ', 'Pistaziengrün', 'Pistache', 'पिस्ता', '开心果绿', '開心果綠'),
  c('avocado', '#568203', 'green', '아보카도', 'Avocado', 'Aguacate', 'Abacate', 'アボカド', 'Avocadogrün', 'Avocat', 'एवोकाडो', '牛油果绿', '酪梨綠'),
  c('spring-green', '#00ff7f', 'green', '봄녹색', 'Spring green', 'Verde primavera', 'Verde primavera', 'スプリンググリーン', 'Frühlingsgrün', 'Vert printemps', 'वसंत हरा', '春绿', '春綠'),

  /* ───────── 파랑 계열 ───────── */
  c('blue', '#0000ff', 'blue', '파랑', 'Blue', 'Azul', 'Azul', '青', 'Blau', 'Bleu', 'नीला', '蓝', '藍'),
  c('navy', '#000080', 'blue', '남색', 'Navy', 'Azul marino', 'Azul-marinho', 'ネイビー', 'Marineblau', 'Bleu marine', 'गहरा नीला', '藏青', '藏青'),
  c('sky-blue', '#87ceeb', 'blue', '하늘색', 'Sky blue', 'Azul cielo', 'Azul-céu', 'スカイブルー', 'Himmelblau', 'Bleu ciel', 'आसमानी', '天蓝', '天藍'),
  c('azure', '#007fff', 'blue', '애저', 'Azure', 'Azur', 'Azuro', 'アジュール', 'Azurblau', 'Azur', 'नीलम', '蔚蓝', '蔚藍'),
  c('cobalt', '#0047ab', 'blue', '코발트', 'Cobalt blue', 'Azul cobalto', 'Azul cobalto', 'コバルトブルー', 'Kobaltblau', 'Bleu cobalt', 'कोबाल्ट', '钴蓝', '鈷藍'),
  c('sapphire', '#0f52ba', 'blue', '사파이어', 'Sapphire', 'Zafiro', 'Safira', 'サファイア', 'Saphirblau', 'Saphir', 'नीलमणि', '宝蓝', '寶藍'),
  c('cerulean', '#007ba7', 'blue', '세룰리안', 'Cerulean', 'Cerúleo', 'Cerúleo', 'セルリアン', 'Cölinblau', 'Céruléen', 'सेरुलियन', '蔚蓝天青', '蔚藍天青'),
  c('indigo', '#4b0082', 'blue', '인디고', 'Indigo', 'Índigo', 'Índigo', 'インディゴ', 'Indigo', 'Indigo', 'जामुनी नील', '靛蓝', '靛藍'),
  c('denim', '#1560bd', 'blue', '데님', 'Denim', 'Vaquero', 'Jeans', 'デニム', 'Jeansblau', 'Denim', 'डेनिम', '牛仔蓝', '牛仔藍'),
  c('steel-blue', '#4682b4', 'blue', '스틸블루', 'Steel blue', 'Azul acero', 'Azul aço', 'スチールブルー', 'Stahlblau', 'Bleu acier', 'स्टील नीला', '钢蓝', '鋼藍'),
  c('powder-blue', '#b0e0e6', 'blue', '파우더블루', 'Powder blue', 'Azul pólvora', 'Azul pó', 'パウダーブルー', 'Pastellblau', 'Bleu poudre', 'हल्का नीला', '粉蓝', '粉藍'),
  c('royal-blue', '#4169e1', 'blue', '로열블루', 'Royal blue', 'Azul real', 'Azul royal', 'ロイヤルブルー', 'Königsblau', 'Bleu roi', 'रॉयल नीला', '宝蓝（皇家）', '寶藍（皇家）'),
  c('midnight-blue', '#191970', 'blue', '한밤색', 'Midnight blue', 'Azul medianoche', 'Azul meia-noite', 'ミッドナイトブルー', 'Mitternachtsblau', 'Bleu nuit', 'मध्यरात्रि नीला', '午夜蓝', '午夜藍'),
  c('aquamarine', '#7fffd4', 'blue', '아쿠아마린', 'Aquamarine', 'Aguamarina', 'Água-marinha', 'アクアマリン', 'Aquamarin', 'Aigue-marine', 'एक्वामरीन', '海蓝宝色', '海藍寶色'),
  c('cyan', '#00ffff', 'blue', '시안', 'Cyan', 'Cian', 'Ciano', 'シアン', 'Cyan', 'Cyan', 'सियान', '青色', '青色'),
  c('periwinkle', '#ccccff', 'blue', '페리윙클', 'Periwinkle', 'Vincapervinca', 'Pervinca', 'ペリウィンクル', 'Immergrünblau', 'Pervenche', 'पेरिविंकल', '长春花蓝', '長春花藍'),

  /* ───────── 보라 계열 ───────── */
  c('purple', '#800080', 'purple', '보라', 'Purple', 'Púrpura', 'Púrpura', '紫', 'Violett', 'Pourpre', 'बैंगनी', '紫', '紫'),
  c('violet', '#ee82ee', 'purple', '바이올렛', 'Violet', 'Violeta', 'Violeta', 'バイオレット', 'Veilchenlila', 'Violet', 'वायलेट', '紫罗兰色', '紫羅蘭色'),
  c('lavender', '#e6e6fa', 'purple', '라벤더', 'Lavender', 'Lavanda', 'Lavanda', 'ラベンダー', 'Lavendel', 'Lavande', 'लैवेंडर', '薰衣草紫', '薰衣草紫'),
  c('lilac', '#c8a2c8', 'purple', '라일락', 'Lilac', 'Lila', 'Lilás', 'ライラック', 'Lila', 'Lilas', 'लाइलैक', '丁香紫', '丁香紫'),
  c('plum', '#8e4585', 'purple', '자두색', 'Plum', 'Ciruela', 'Ameixa', 'プラム', 'Pflaumenlila', 'Prune', 'आलूबुखारा', '梅子紫', '梅子紫'),
  c('orchid', '#da70d6', 'purple', '오키드', 'Orchid', 'Orquídea', 'Orquídea', 'オーキッド', 'Orchideenlila', 'Orchidée', 'ऑर्किड', '兰花紫', '蘭花紫'),
  c('amethyst', '#9966cc', 'purple', '자수정색', 'Amethyst', 'Amatista', 'Ametista', 'アメジスト', 'Amethyst', 'Amétyste', 'नीलम बैंगनी', '紫水晶色', '紫水晶色'),
  c('mauve', '#e0b0ff', 'purple', '모브', 'Mauve', 'Malva', 'Malva', 'モーヴ', 'Malvenfarben', 'Mauve', 'मॉव', '木槿紫', '木槿紫'),
  c('eggplant', '#614051', 'purple', '가지색', 'Eggplant', 'Berenjena', 'Berinjela', 'エッグプラント', 'Auberginenviolett', 'Aubergine', 'बैंगन', '茄紫', '茄紫'),
  c('grape', '#6f2da8', 'purple', '포도색', 'Grape', 'Uva', 'Uva', 'グレープ', 'Traubenviolett', 'Raisin', 'अंगूरी', '葡萄紫', '葡萄紫'),
  c('wisteria', '#c9a0dc', 'purple', '등나무색', 'Wisteria', 'Glicina', 'Glicínia', '藤色', 'Glyzinienviolett', 'Glycine', 'विस्टेरिया', '紫藤色', '紫藤色'),
  c('byzantium', '#702963', 'purple', '비잔티움', 'Byzantium', 'Bizancio', 'Bizâncio', 'ビザンチウム', 'Byzanz', 'Byzantin', 'बीज़ैन्टियम', '拜占庭紫', '拜占庭紫'),

  /* ───────── 분홍 계열 ───────── */
  c('pink', '#ffc0cb', 'pink', '분홍', 'Pink', 'Rosa', 'Rosa', 'ピンク', 'Rosa', 'Rose', 'गुलाबी', '粉红', '粉紅'),
  c('hot-pink', '#ff69b4', 'pink', '핫핑크', 'Hot pink', 'Rosa intenso', 'Rosa-choque', 'ホットピンク', 'Knallrosa', 'Rose vif', 'चटख गुलाबी', '艳粉', '豔粉'),
  c('blush', '#de5d83', 'pink', '블러시', 'Blush', 'Rubor', 'Blush', 'ブラッシュ', 'Blassrosa', 'Rose blush', 'ब्लश', '腮红色', '腮紅色'),
  c('magenta', '#ff00ff', 'pink', '마젠타', 'Magenta', 'Magenta', 'Magenta', 'マゼンタ', 'Magenta', 'Magenta', 'मैजेंटा', '洋红', '洋紅'),
  c('peony', '#ed5b84', 'pink', '작약색', 'Peony', 'Peonía', 'Peônia', 'ピオニー', 'Pfingstrosenrosa', 'Pivoine', 'पेओनी', '牡丹粉', '牡丹粉'),
  c('bubblegum', '#ffc1cc', 'pink', '풍선껌색', 'Bubblegum', 'Chicle', 'Chiclete', 'バブルガム', 'Kaugummirosa', 'Bubble-gum', 'बबलगम', '泡泡糖粉', '泡泡糖粉'),
  c('cherry-blossom', '#ffb7c5', 'pink', '연분홍', 'Cherry blossom', 'Flor de cerezo', 'Flor de cerejeira', '桜色', 'Kirschblütenrosa', 'Fleur de cerisier', 'चेरी ब्लॉसम', '樱花粉', '櫻花粉'),
  c('watermelon', '#fc6c85', 'pink', '수박색', 'Watermelon', 'Sandía', 'Melancia', 'ウォーターメロン', 'Wassermelonenrosa', 'Pastèque', 'तरबूज़ी', '西瓜红', '西瓜紅'),
  c('raspberry', '#e30b5c', 'pink', '라즈베리', 'Raspberry', 'Frambuesa', 'Framboesa', 'ラズベリー', 'Himbeerrot', 'Framboise', 'रसभरी', '覆盆子红', '覆盆子紅'),

  /* ───────── 갈색 계열 ───────── */
  c('brown', '#a52a2a', 'brown', '갈색', 'Brown', 'Marrón', 'Marrom', '茶色', 'Braun', 'Brun', 'भूरा', '棕色', '棕色'),
  c('chocolate', '#7b3f00', 'brown', '초콜릿색', 'Chocolate', 'Chocolate', 'Chocolate', 'チョコレート', 'Schokoladenbraun', 'Chocolat', 'चॉकलेट', '巧克力色', '巧克力色'),
  c('coffee', '#6f4e37', 'brown', '커피색', 'Coffee', 'Café', 'Café', 'コーヒー', 'Kaffeebraun', 'Café', 'कॉफ़ी', '咖啡色', '咖啡色'),
  c('caramel', '#c68e17', 'brown', '캐러멜', 'Caramel', 'Caramelo', 'Caramelo', 'キャラメル', 'Karamell', 'Caramel', 'कैरामेल', '焦糖色', '焦糖色'),
  c('tan', '#d2b48c', 'brown', '황갈색', 'Tan', 'Habano', 'Bege escuro', 'タン', 'Hellbraun', 'Tan', 'हल्का भूरा', '浅褐色', '淺褐色'),
  c('beige', '#f5f5dc', 'brown', '베이지', 'Beige', 'Beige', 'Bege', 'ベージュ', 'Beige', 'Beige', 'बेज', '米色', '米色'),
  c('camel', '#c19a6b', 'brown', '카멜', 'Camel', 'Camello', 'Camelo', 'キャメル', 'Kamelbraun', 'Camel', 'कैमल', '驼色', '駝色'),
  c('walnut', '#773f1a', 'brown', '호두색', 'Walnut', 'Nogal', 'Nogueira', 'ウォルナット', 'Walnussbraun', 'Noyer', 'अखरोटी', '胡桃木色', '胡桃木色'),
  c('sepia', '#704214', 'brown', '세피아', 'Sepia', 'Sepia', 'Sépia', 'セピア', 'Sepiabraun', 'Sépia', 'सीपिया', '乌贼墨色', '烏賊墨色'),
  c('sand', '#c2b280', 'brown', '모래색', 'Sand', 'Arena', 'Areia', 'サンド', 'Sandbraun', 'Sable', 'रेतीला', '沙色', '沙色'),

  /* ───────── 무채색 ───────── */
  c('black', '#000000', 'neutral', '검정', 'Black', 'Negro', 'Preto', '黒', 'Schwarz', 'Noir', 'काला', '黑', '黑'),
  c('white', '#ffffff', 'neutral', '흰색', 'White', 'Blanco', 'Branco', '白', 'Weiß', 'Blanc', 'सफ़ेद', '白', '白'),
  c('gray', '#808080', 'neutral', '회색', 'Gray', 'Gris', 'Cinza', '灰色', 'Grau', 'Gris', 'स्लेटी', '灰', '灰'),
  c('silver', '#c0c0c0', 'neutral', '은색', 'Silver', 'Plateado', 'Prateado', 'シルバー', 'Silber', 'Argent', 'चांदी', '银色', '銀色'),
  c('charcoal', '#36454f', 'neutral', '숯색', 'Charcoal', 'Carbón', 'Carvão', 'チャコール', 'Anthrazit', 'Anthracite', 'कोयला', '炭灰', '炭灰'),
  c('slate', '#708090', 'neutral', '슬레이트', 'Slate gray', 'Gris pizarra', 'Cinza-ardósia', 'スレートグレー', 'Schiefergrau', 'Gris ardoise', 'स्लेट', '石板灰', '石板灰'),
  c('ash', '#b2beb5', 'neutral', '재색', 'Ash gray', 'Gris ceniza', 'Cinza-claro', 'アッシュグレー', 'Aschgrau', 'Gris cendre', 'राख', '灰烬色', '灰燼色'),
  c('smoke', '#f5f5f5', 'neutral', '연무색', 'White smoke', 'Blanco humo', 'Branco fumaça', 'スモークホワイト', 'Rauchweiß', 'Blanc fumée', 'धुआँ सफ़ेद', '烟白', '煙白'),
  c('pearl', '#eae0c8', 'neutral', '진주색', 'Pearl', 'Perla', 'Pérola', 'パール', 'Perlweiß', 'Perle', 'मोती', '珍珠白', '珍珠白'),
  c('snow', '#fffafa', 'neutral', '눈색', 'Snow', 'Nieve', 'Neve', 'スノーホワイト', 'Schneeweiß', 'Neige', 'बर्फ़', '雪白', '雪白'),
  c('graphite', '#41424c', 'neutral', '흑연색', 'Graphite', 'Grafito', 'Grafite', 'グラファイト', 'Graphitgrau', 'Graphite', 'ग्रेफ़ाइट', '石墨灰', '石墨灰'),
  c('taupe', '#483c32', 'neutral', '토프', 'Taupe', 'Topo', 'Toupeira', 'トープ', 'Taupe', 'Taupe', 'टॉप', '灰褐色', '灰褐色'),

  /* ───────── 금속색 ───────── */
  c('bronze', '#cd7f32', 'metal', '청동색', 'Bronze', 'Bronce', 'Bronze', 'ブロンズ', 'Bronze', 'Bronze', 'कांस्य', '青铜色', '青銅色'),
  c('copper', '#b87333', 'metal', '구리색', 'Copper', 'Cobre', 'Cobre', 'カッパー', 'Kupfer', 'Cuivre', 'तांबा', '铜色', '銅色'),
  c('brass', '#b5a642', 'metal', '황동색', 'Brass', 'Latón', 'Latão', 'ブラス', 'Messing', 'Laiton', 'पीतल', '黄铜色', '黃銅色'),
  c('platinum', '#e5e4e2', 'metal', '백금색', 'Platinum', 'Platino', 'Platina', 'プラチナ', 'Platin', 'Platine', 'प्लैटिनम', '铂金色', '鉑金色'),
  c('rose-gold', '#b76e79', 'metal', '로즈골드', 'Rose gold', 'Oro rosa', 'Ouro rosa', 'ローズゴールド', 'Roségold', 'Or rose', 'रोज़ गोल्ड', '玫瑰金', '玫瑰金'),
  c('gunmetal', '#2a3439', 'metal', '건메탈', 'Gunmetal', 'Gris metálico', 'Cinza-metálico', 'ガンメタル', 'Kanonenmetall', 'Gris canon', 'गनमेटल', '枪灰色', '槍灰色'),
];

export const COLOR_SLUGS = NAMED_COLORS_8.map(c => c.slug);

export const namedColor = (slug: string): NamedColor | undefined =>
  NAMED_COLORS_8.find(c => c.slug === slug);

export const COLOR_FAMILIES: ColorFamily[] =
  ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'neutral', 'metal'];

export const colorsOfFamily = (family: ColorFamily): NamedColor[] =>
  NAMED_COLORS_8.filter(c => c.family === family);
