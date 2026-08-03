/**
 * 재료 147가지의 밀도 — 열 언어.
 *
 * "밀가루 1컵은 몇 g인가"는 재료마다 답이 다르다. 같은 1컵에 밀가루는 120g,
 * 설탕은 200g, 꿀은 340g이 들어간다. 부피가 아니라 무게로 재야 과자가 실패하지
 * 않는 이유가 여기 있다.
 *
 * 그래서 적는 것은 밀도 하나(1L에 몇 g)뿐이다. 미국 컵(240ml)·한국 컵(200ml)·
 * 큰술(15ml)·작은술(5ml)·1g당 부피가 전부 이 하나에서 계산된다 — 재료마다 표를
 * 손으로 적으면 147 × 다섯 칸을 적어야 하고, 하나가 틀려도 반죽을 망쳐 본 사람만
 * 알아챈다.
 *
 * 밀도는 "퍼서 담고 위를 깎은" 상태(spoon and level) 기준이다. 밀가루를 컵으로
 * 꾹 눌러 담으면 같은 컵에 30g이 더 들어가는데, 그것이 제과에서 무게를 쓰라고
 * 하는 이유다. 그 차이는 페이지에서 문장으로 알려 준다.
 */
import type { L } from '../i18n/lang.ts';

export type FoodCategory =
  | 'flour' | 'sugar' | 'grain' | 'dairy' | 'fat' | 'nut' | 'legume'
  | 'spice' | 'liquid' | 'vegetable' | 'other';

export interface Ingredient {
  slug: string;
  /** 1L에 몇 g — 이 하나에서 컵·큰술·작은술이 계산된다 */
  gPerL: number;
  category: FoodCategory;
  name: L<string>;
}

/** 순서는 ko · en · es · pt · ja · de · fr · hi · zh · tw */
const g = (
  slug: string, gPerL: number, category: FoodCategory,
  ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string,
  zh: string, tw: string,
): Ingredient => ({ slug, gPerL, category, name: { ko, en, es, pt, ja, de, fr, hi, zh, tw } });

export const INGREDIENTS: Ingredient[] = [
  /* ───────── 가루 ───────── */
  g('all-purpose-flour', 521, 'flour', '중력분(밀가루)', 'All-purpose flour', 'Harina de trigo', 'Farinha de trigo', '中力粉', 'Weizenmehl Type 550', 'Farine tout usage', 'मैदा', '中筋面粉', '中筋麵粉'),
  g('bread-flour', 533, 'flour', '강력분', 'Bread flour', 'Harina de fuerza', 'Farinha de pão', '強力粉', 'Brotmehl', 'Farine à pain', 'ब्रेड आटा', '高筋面粉', '高筋麵粉'),
  g('cake-flour', 458, 'flour', '박력분', 'Cake flour', 'Harina de repostería', 'Farinha para bolo', '薄力粉', 'Kuchenmehl', 'Farine à gâteau', 'केक आटा', '低筋面粉', '低筋麵粉'),
  g('whole-wheat-flour', 500, 'flour', '통밀가루', 'Whole wheat flour', 'Harina integral', 'Farinha integral', '全粒粉', 'Vollkornmehl', 'Farine complète', 'गेहूं का आटा', '全麦面粉', '全麥麵粉'),
  g('rice-flour', 654, 'flour', '쌀가루', 'Rice flour', 'Harina de arroz', 'Farinha de arroz', '米粉', 'Reismehl', 'Farine de riz', 'चावल का आटा', '米粉（粘米粉）', '在來米粉'),
  g('glutinous-rice-flour', 621, 'flour', '찹쌀가루', 'Glutinous rice flour', 'Harina de arroz glutinoso', 'Farinha de arroz glutinoso', '白玉粉', 'Klebreismehl', 'Farine de riz gluant', 'चिपचिपा चावल आटा', '糯米粉', '糯米粉'),
  g('almond-flour', 400, 'flour', '아몬드 가루', 'Almond flour', 'Harina de almendra', 'Farinha de amêndoa', 'アーモンドプードル', 'Mandelmehl', 'Farine d’amande', 'बादाम का आटा', '杏仁粉', '杏仁粉'),
  g('cornstarch', 500, 'flour', '전분(옥수수)', 'Cornstarch', 'Maicena', 'Amido de milho', 'コーンスターチ', 'Speisestärke', 'Fécule de maïs', 'कॉर्न स्टार्च', '玉米淀粉', '玉米澱粉'),
  g('cornmeal', 683, 'flour', '옥수숫가루', 'Cornmeal', 'Harina de maíz', 'Farinha de milho', 'コーンミール', 'Maisgrieß', 'Semoule de maïs', 'मक्के का आटा', '玉米粉（粗）', '玉米粗粉'),
  g('cocoa-powder', 350, 'flour', '코코아 가루', 'Cocoa powder', 'Cacao en polvo', 'Cacau em pó', 'ココアパウダー', 'Kakaopulver', 'Cacao en poudre', 'कोको पाउडर', '可可粉', '可可粉'),
  g('breadcrumbs', 458, 'flour', '빵가루', 'Breadcrumbs', 'Pan rallado', 'Farinha de rosca', 'パン粉', 'Semmelbrösel', 'Chapelure', 'ब्रेड क्रम्ब्स', '面包糠', '麵包粉'),
  g('chickpea-flour', 383, 'flour', '병아리콩 가루', 'Chickpea flour', 'Harina de garbanzo', 'Farinha de grão-de-bico', 'ひよこ豆粉', 'Kichererbsenmehl', 'Farine de pois chiches', 'बेसन', '鹰嘴豆粉', '鷹嘴豆粉'),
  g('buckwheat-flour', 500, 'flour', '메밀가루', 'Buckwheat flour', 'Harina de alforfón', 'Farinha de trigo-sarraceno', 'そば粉', 'Buchweizenmehl', 'Farine de sarrasin', 'कुट्टू का आटा', '荞麦粉', '蕎麥粉'),
  g('tapioca-starch', 500, 'flour', '타피오카 전분', 'Tapioca starch', 'Almidón de tapioca', 'Polvilho de tapioca', 'タピオカ粉', 'Tapiokastärke', 'Fécule de tapioca', 'टैपिओका स्टार्च', '木薯淀粉', '樹薯澱粉'),
  g('potato-starch', 667, 'flour', '감자 전분', 'Potato starch', 'Almidón de patata', 'Amido de batata', '片栗粉', 'Kartoffelstärke', 'Fécule de pomme de terre', 'आलू स्टार्च', '马铃薯淀粉', '太白粉'),

  /* ───────── 당류 ───────── */
  g('granulated-sugar', 833, 'sugar', '설탕', 'Granulated sugar', 'Azúcar blanca', 'Açúcar refinado', '上白糖', 'Kristallzucker', 'Sucre blanc', 'चीनी', '白砂糖', '白砂糖'),
  g('brown-sugar', 875, 'sugar', '흑설탕', 'Brown sugar', 'Azúcar moreno', 'Açúcar mascavo', 'ブラウンシュガー', 'Brauner Zucker', 'Sucre roux', 'ब्राउन शुगर', '红糖', '黑糖'),
  g('powdered-sugar', 500, 'sugar', '분당(가루설탕)', 'Powdered sugar', 'Azúcar glas', 'Açúcar de confeiteiro', '粉糖', 'Puderzucker', 'Sucre glace', 'पिसी चीनी', '糖粉', '糖粉'),
  g('honey', 1417, 'sugar', '꿀', 'Honey', 'Miel', 'Mel', 'はちみつ', 'Honig', 'Miel', 'शहद', '蜂蜜', '蜂蜜'),
  g('maple-syrup', 1333, 'sugar', '메이플 시럽', 'Maple syrup', 'Sirope de arce', 'Xarope de bordo', 'メープルシロップ', 'Ahornsirup', 'Sirop d’érable', 'मेपल सिरप', '枫糖浆', '楓糖漿'),
  g('corn-syrup', 1375, 'sugar', '물엿', 'Corn syrup', 'Jarabe de maíz', 'Glucose de milho', '水あめ', 'Glukosesirup', 'Sirop de glucose', 'कॉर्न सिरप', '玉米糖浆', '玉米糖漿'),
  g('molasses', 1417, 'sugar', '당밀', 'Molasses', 'Melaza', 'Melaço', 'モラセス', 'Melasse', 'Mélasse', 'शीरा', '糖蜜', '糖蜜'),
  g('agave-syrup', 1333, 'sugar', '아가베 시럽', 'Agave syrup', 'Sirope de agave', 'Xarope de agave', 'アガベシロップ', 'Agavensirup', 'Sirop d’agave', 'एगेव सिरप', '龙舌兰糖浆', '龍舌蘭糖漿'),
  g('coconut-sugar', 833, 'sugar', '코코넛 설탕', 'Coconut sugar', 'Azúcar de coco', 'Açúcar de coco', 'ココナッツシュガー', 'Kokosblütenzucker', 'Sucre de coco', 'नारियल चीनी', '椰子糖', '椰糖'),
  g('rice-syrup', 1333, 'sugar', '조청', 'Rice syrup', 'Sirope de arroz', 'Xarope de arroz', '米飴', 'Reissirup', 'Sirop de riz', 'चावल सिरप', '米糖浆', '米糖漿'),

  /* ───────── 곡물 ───────── */
  g('white-rice', 771, 'grain', '백미(생쌀)', 'White rice', 'Arroz blanco', 'Arroz branco', '白米', 'Weißer Reis', 'Riz blanc', 'सफ़ेद चावल', '白米', '白米'),
  g('brown-rice', 750, 'grain', '현미', 'Brown rice', 'Arroz integral', 'Arroz integral', '玄米', 'Naturreis', 'Riz complet', 'ब्राउन राइस', '糙米', '糙米'),
  g('glutinous-rice', 792, 'grain', '찹쌀', 'Glutinous rice', 'Arroz glutinoso', 'Arroz glutinoso', 'もち米', 'Klebreis', 'Riz gluant', 'चिपचिपा चावल', '糯米', '糯米'),
  g('rolled-oats', 375, 'grain', '오트밀(압착)', 'Rolled oats', 'Copos de avena', 'Aveia em flocos', 'オートミール', 'Haferflocken', 'Flocons d’avoine', 'ओट्स', '燕麦片', '燕麥片'),
  g('quinoa', 708, 'grain', '퀴노아', 'Quinoa', 'Quinoa', 'Quinoa', 'キヌア', 'Quinoa', 'Quinoa', 'क्विनोआ', '藜麦', '藜麥'),
  g('barley', 800, 'grain', '보리', 'Pearl barley', 'Cebada perlada', 'Cevada em grão', '押し麦', 'Perlgraupen', 'Orge perlé', 'जौ', '珍珠麦', '珍珠麥'),
  g('couscous', 708, 'grain', '쿠스쿠스', 'Couscous', 'Cuscús', 'Cuscuz', 'クスクス', 'Couscous', 'Couscous', 'कूसकूस', '库斯库斯', '庫斯庫斯'),
  g('bulgur', 583, 'grain', '불구르', 'Bulgur', 'Bulgur', 'Bulgur', 'ブルグル', 'Bulgur', 'Boulgour', 'दलिया', '碎小麦', '布格麥'),
  g('millet', 833, 'grain', '조', 'Millet', 'Mijo', 'Milhete', 'キビ', 'Rispenhirse', 'Millet', 'बाजरा', '小米', '小米'),
  g('buckwheat-groats', 708, 'grain', '메밀쌀', 'Buckwheat groats', 'Alforfón en grano', 'Trigo-sarraceno em grão', 'そば米', 'Buchweizengrütze', 'Kasha', 'कुट्टू दाना', '荞麦米', '蕎麥粒'),
  g('popcorn-kernels', 833, 'grain', '팝콘용 옥수수', 'Popcorn kernels', 'Maíz para palomitas', 'Milho de pipoca', 'ポップコーン用コーン', 'Popcornmais', 'Maïs à popcorn', 'पॉपकॉर्न दाने', '爆米花玉米粒', '爆米花玉米粒'),
  g('pasta-macaroni', 458, 'grain', '마카로니', 'Elbow macaroni', 'Macarrones', 'Macarrão', 'マカロニ', 'Makkaroni', 'Macaronis', 'मैकरोनी', '通心粉', '通心麵'),
  g('rolled-barley', 417, 'grain', '납작보리', 'Rolled barley', 'Cebada en copos', 'Cevada em flocos', '押し麦フレーク', 'Gerstenflocken', 'Flocons d’orge', 'जौ फ्लेक्स', '压片大麦', '壓片大麥'),
  g('cooked-rice', 800, 'grain', '밥(지은 쌀)', 'Cooked rice', 'Arroz cocido', 'Arroz cozido', 'ご飯', 'Gekochter Reis', 'Riz cuit', 'पका चावल', '米饭', '白飯'),

  /* ───────── 유제품 ───────── */
  g('milk', 1033, 'dairy', '우유', 'Milk', 'Leche', 'Leite', '牛乳', 'Milch', 'Lait', 'दूध', '牛奶', '牛奶'),
  g('heavy-cream', 1004, 'dairy', '생크림', 'Heavy cream', 'Nata para montar', 'Creme de leite', '生クリーム', 'Schlagsahne', 'Crème entière', 'क्रीम', '淡奶油', '鮮奶油'),
  g('yogurt', 1042, 'dairy', '플레인 요거트', 'Plain yogurt', 'Yogur natural', 'Iogurte natural', 'プレーンヨーグルト', 'Naturjoghurt', 'Yaourt nature', 'दही', '原味酸奶', '原味優格'),
  g('sour-cream', 1000, 'dairy', '사워크림', 'Sour cream', 'Crema agria', 'Creme ácido', 'サワークリーム', 'Schmand', 'Crème aigre', 'खट्टी क्रीम', '酸奶油', '酸奶油'),
  g('cream-cheese', 967, 'dairy', '크림치즈', 'Cream cheese', 'Queso crema', 'Cream cheese', 'クリームチーズ', 'Frischkäse', 'Fromage frais', 'क्रीम चीज़', '奶油奶酪', '奶油乳酪'),
  g('grated-parmesan', 417, 'dairy', '파르메산(간 것)', 'Grated parmesan', 'Parmesano rallado', 'Parmesão ralado', 'パルメザン（削り）', 'Geriebener Parmesan', 'Parmesan râpé', 'कसा पार्मेज़ान', '帕玛森芝士碎', '帕瑪森起司粉'),
  g('shredded-cheese', 471, 'dairy', '슈레드 치즈', 'Shredded cheese', 'Queso rallado', 'Queijo ralado', 'シュレッドチーズ', 'Geriebener Käse', 'Fromage râpé', 'कसा चीज़', '芝士碎', '起司絲'),
  g('condensed-milk', 1300, 'dairy', '연유', 'Condensed milk', 'Leche condensada', 'Leite condensado', 'コンデンスミルク', 'Kondensmilch', 'Lait concentré sucré', 'कंडेंस्ड मिल्क', '炼乳', '煉乳'),
  g('milk-powder', 458, 'dairy', '분유', 'Milk powder', 'Leche en polvo', 'Leite em pó', '粉乳', 'Milchpulver', 'Lait en poudre', 'मिल्क पाउडर', '奶粉', '奶粉'),
  g('ricotta', 1033, 'dairy', '리코타', 'Ricotta', 'Ricotta', 'Ricota', 'リコッタ', 'Ricotta', 'Ricotta', 'रिकोटा', '里科塔芝士', '瑞可達起司'),
  g('mascarpone', 1000, 'dairy', '마스카르포네', 'Mascarpone', 'Mascarpone', 'Mascarpone', 'マスカルポーネ', 'Mascarpone', 'Mascarpone', 'मस्कारपोने', '马斯卡彭', '馬斯卡彭'),
  g('buttermilk', 1033, 'dairy', '버터밀크', 'Buttermilk', 'Suero de leche', 'Leitelho', 'バターミルク', 'Buttermilch', 'Babeurre', 'छाछ', '白脱牛奶', '白脫牛奶'),

  /* ───────── 지방 ───────── */
  g('butter', 958, 'fat', '버터', 'Butter', 'Mantequilla', 'Manteiga', 'バター', 'Butter', 'Beurre', 'मक्खन', '黄油', '奶油'),
  g('olive-oil', 900, 'fat', '올리브유', 'Olive oil', 'Aceite de oliva', 'Azeite', 'オリーブオイル', 'Olivenöl', 'Huile d’olive', 'जैतून का तेल', '橄榄油', '橄欖油'),
  g('vegetable-oil', 917, 'fat', '식용유', 'Vegetable oil', 'Aceite vegetal', 'Óleo vegetal', 'サラダ油', 'Pflanzenöl', 'Huile végétale', 'वनस्पति तेल', '植物油', '沙拉油'),
  g('coconut-oil', 900, 'fat', '코코넛 오일', 'Coconut oil', 'Aceite de coco', 'Óleo de coco', 'ココナッツオイル', 'Kokosöl', 'Huile de coco', 'नारियल तेल', '椰子油', '椰子油'),
  g('sesame-oil', 917, 'fat', '참기름', 'Sesame oil', 'Aceite de sésamo', 'Óleo de gergelim', 'ごま油', 'Sesamöl', 'Huile de sésame', 'तिल का तेल', '香油（芝麻油）', '香油'),
  g('lard', 917, 'fat', '라드', 'Lard', 'Manteca de cerdo', 'Banha', 'ラード', 'Schweineschmalz', 'Saindoux', 'चरबी', '猪油', '豬油'),
  g('shortening', 792, 'fat', '쇼트닝', 'Shortening', 'Manteca vegetal', 'Gordura vegetal', 'ショートニング', 'Backfett', 'Shortening', 'शॉर्टनिंग', '起酥油', '酥油'),
  g('ghee', 912, 'fat', '기(정제 버터)', 'Ghee', 'Ghee', 'Ghee', 'ギー', 'Ghee', 'Ghee', 'घी', '酥油（印度）', '印度酥油'),
  g('mayonnaise', 940, 'fat', '마요네즈', 'Mayonnaise', 'Mayonesa', 'Maionese', 'マヨネーズ', 'Mayonnaise', 'Mayonnaise', 'मेयोनेज़', '蛋黄酱', '美乃滋'),
  g('peanut-butter', 1083, 'fat', '땅콩버터', 'Peanut butter', 'Mantequilla de cacahuete', 'Pasta de amendoim', 'ピーナッツバター', 'Erdnussbutter', 'Beurre de cacahuète', 'पीनट बटर', '花生酱', '花生醬'),

  /* ───────── 견과·씨앗 ───────── */
  g('almonds', 583, 'nut', '아몬드', 'Almonds', 'Almendras', 'Amêndoas', 'アーモンド', 'Mandeln', 'Amandes', 'बादाम', '杏仁', '杏仁'),
  g('walnuts', 500, 'nut', '호두', 'Walnuts', 'Nueces', 'Nozes', 'くるみ', 'Walnüsse', 'Noix', 'अखरोट', '核桃', '核桃'),
  g('peanuts', 604, 'nut', '땅콩', 'Peanuts', 'Cacahuetes', 'Amendoins', 'ピーナッツ', 'Erdnüsse', 'Cacahuètes', 'मूंगफली', '花生', '花生'),
  g('cashews', 542, 'nut', '캐슈너트', 'Cashews', 'Anacardos', 'Castanhas de caju', 'カシューナッツ', 'Cashewkerne', 'Noix de cajou', 'काजू', '腰果', '腰果'),
  g('pecans', 417, 'nut', '피칸', 'Pecans', 'Pacanas', 'Nozes-pecã', 'ピーカンナッツ', 'Pekannüsse', 'Noix de pécan', 'पीकन', '碧根果', '胡桃'),
  g('pistachios', 500, 'nut', '피스타치오', 'Pistachios', 'Pistachos', 'Pistaches', 'ピスタチオ', 'Pistazien', 'Pistaches', 'पिस्ता', '开心果', '開心果'),
  g('sesame-seeds', 617, 'nut', '참깨', 'Sesame seeds', 'Semillas de sésamo', 'Sementes de gergelim', 'ごま', 'Sesamsamen', 'Graines de sésame', 'तिल', '芝麻', '芝麻'),
  g('sunflower-seeds', 583, 'nut', '해바라기씨', 'Sunflower seeds', 'Pipas de girasol', 'Sementes de girassol', 'ひまわりの種', 'Sonnenblumenkerne', 'Graines de tournesol', 'सूरजमुखी बीज', '葵花籽', '葵花籽'),
  g('pumpkin-seeds', 542, 'nut', '호박씨', 'Pumpkin seeds', 'Pipas de calabaza', 'Sementes de abóbora', 'かぼちゃの種', 'Kürbiskerne', 'Graines de courge', 'कद्दू के बीज', '南瓜籽', '南瓜籽'),
  g('chia-seeds', 708, 'nut', '치아씨드', 'Chia seeds', 'Semillas de chía', 'Sementes de chia', 'チアシード', 'Chiasamen', 'Graines de chia', 'चिया बीज', '奇亚籽', '奇亞籽'),
  g('flaxseed', 604, 'nut', '아마씨', 'Flaxseed', 'Semillas de lino', 'Sementes de linhaça', '亜麻仁', 'Leinsamen', 'Graines de lin', 'अलसी', '亚麻籽', '亞麻籽'),
  g('shredded-coconut', 333, 'nut', '코코넛 슬라이스', 'Shredded coconut', 'Coco rallado', 'Coco ralado', 'ココナッツファイン', 'Kokosraspeln', 'Noix de coco râpée', 'कसा नारियल', '椰蓉', '椰子絲'),

  /* ───────── 콩류 ───────── */
  g('dried-soybeans', 800, 'legume', '메주콩(대두)', 'Dried soybeans', 'Soja seca', 'Soja em grão', '大豆', 'Trockene Sojabohnen', 'Soja sec', 'सोयाबीन', '黄豆（干）', '黃豆（乾）'),
  g('red-beans', 833, 'legume', '팥', 'Adzuki beans', 'Frijol azuki', 'Feijão azuki', '小豆', 'Adzukibohnen', 'Haricots azuki', 'अडुकी बीन्स', '红豆', '紅豆'),
  g('black-beans', 792, 'legume', '검은콩', 'Black beans', 'Frijol negro', 'Feijão preto', '黒豆', 'Schwarze Bohnen', 'Haricots noirs', 'काली बीन्स', '黑豆', '黑豆'),
  g('chickpeas', 800, 'legume', '병아리콩', 'Dried chickpeas', 'Garbanzos secos', 'Grão-de-bico', 'ひよこ豆', 'Kichererbsen', 'Pois chiches secs', 'चना', '鹰嘴豆（干）', '鷹嘴豆（乾）'),
  g('lentils', 813, 'legume', '렌틸콩', 'Dried lentils', 'Lentejas', 'Lentilhas', 'レンズ豆', 'Linsen', 'Lentilles', 'मसूर दाल', '小扁豆（干）', '扁豆（乾）'),
  g('split-peas', 833, 'legume', '완두콩(마른)', 'Split peas', 'Guisantes partidos', 'Ervilha partida', '割りエンドウ', 'Schälerbsen', 'Pois cassés', 'मटर दाल', '去皮豌豆瓣', '去皮豌豆瓣'),
  g('kidney-beans', 771, 'legume', '강낭콩', 'Kidney beans', 'Frijol rojo', 'Feijão vermelho', '金時豆', 'Kidneybohnen', 'Haricots rouges', 'राजमा', '芸豆', '腰豆'),
  g('mung-beans', 833, 'legume', '녹두', 'Mung beans', 'Frijol mungo', 'Feijão-mungo', '緑豆', 'Mungbohnen', 'Haricots mungo', 'मूंग दाल', '绿豆', '綠豆'),

  /* ───────── 양념·향신료 ───────── */
  g('table-salt', 1217, 'spice', '고운 소금', 'Table salt', 'Sal fina', 'Sal refinado', '食塩', 'Speisesalz', 'Sel fin', 'नमक', '精盐', '精鹽'),
  g('coarse-salt', 1000, 'spice', '굵은 소금', 'Coarse salt', 'Sal gruesa', 'Sal grosso', '粗塩', 'Grobes Salz', 'Gros sel', 'मोटा नमक', '粗盐', '粗鹽'),
  g('baking-powder', 917, 'spice', '베이킹파우더', 'Baking powder', 'Polvo de hornear', 'Fermento em pó', 'ベーキングパウダー', 'Backpulver', 'Levure chimique', 'बेकिंग पाउडर', '泡打粉', '泡打粉'),
  g('baking-soda', 958, 'spice', '베이킹소다', 'Baking soda', 'Bicarbonato de sodio', 'Bicarbonato de sódio', '重曹', 'Natron', 'Bicarbonate de soude', 'बेकिंग सोडा', '小苏打', '小蘇打'),
  g('dry-yeast', 625, 'spice', '드라이 이스트', 'Active dry yeast', 'Levadura seca', 'Levedura seca', 'ドライイースト', 'Trockenhefe', 'Levure sèche', 'सूखा यीस्ट', '干酵母', '乾酵母'),
  g('black-pepper', 500, 'spice', '후춧가루', 'Ground black pepper', 'Pimienta negra molida', 'Pimenta-do-reino moída', '黒こしょう', 'Gemahlener Pfeffer', 'Poivre noir moulu', 'काली मिर्च', '黑胡椒粉', '黑胡椒粉'),
  g('red-pepper-powder', 400, 'spice', '고춧가루', 'Korean chilli powder', 'Chile en polvo coreano', 'Pimenta coreana em pó', '粉唐辛子', 'Koreanisches Chilipulver', 'Piment coréen en poudre', 'कोरियाई मिर्च पाउडर', '韩式辣椒粉', '韓式辣椒粉'),
  g('paprika', 458, 'spice', '파프리카 파우더', 'Paprika', 'Pimentón', 'Páprica', 'パプリカパウダー', 'Paprikapulver', 'Paprika', 'पेपरिका', '甜椒粉', '紅椒粉'),
  g('cinnamon', 542, 'spice', '계핏가루', 'Ground cinnamon', 'Canela molida', 'Canela em pó', 'シナモンパウダー', 'Gemahlener Zimt', 'Cannelle moulue', 'दालचीनी पाउडर', '肉桂粉', '肉桂粉'),
  g('curry-powder', 500, 'spice', '카레 가루', 'Curry powder', 'Curry en polvo', 'Curry em pó', 'カレー粉', 'Currypulver', 'Curry en poudre', 'करी पाउडर', '咖喱粉', '咖哩粉'),
  g('turmeric', 583, 'spice', '강황 가루', 'Ground turmeric', 'Cúrcuma molida', 'Cúrcuma em pó', 'ターメリック', 'Kurkumapulver', 'Curcuma moulu', 'हल्दी', '姜黄粉', '薑黃粉'),
  g('cumin', 458, 'spice', '커민 가루', 'Ground cumin', 'Comino molido', 'Cominho em pó', 'クミンパウダー', 'Gemahlener Kreuzkümmel', 'Cumin moulu', 'जीरा पाउडर', '孜然粉', '孜然粉'),
  g('garlic-powder', 625, 'spice', '마늘 가루', 'Garlic powder', 'Ajo en polvo', 'Alho em pó', 'ガーリックパウダー', 'Knoblauchpulver', 'Ail en poudre', 'लहसुन पाउडर', '蒜粉', '蒜粉'),
  g('msg', 917, 'spice', '미원(글루탐산)', 'MSG', 'Glutamato monosódico', 'Glutamato monossódico', '味の素', 'Glutamat', 'Glutamate', 'अजीनोमोटो', '味精', '味精'),
  g('gochujang', 1250, 'spice', '고추장', 'Gochujang', 'Gochujang', 'Gochujang', 'コチュジャン', 'Gochujang', 'Gochujang', 'गोचुजांग', '韩式辣椒酱', '韓式辣椒醬'),
  g('doenjang', 1250, 'spice', '된장', 'Doenjang', 'Doenjang', 'Doenjang', 'テンジャン', 'Doenjang', 'Doenjang', 'देनजांग', '韩式大酱', '韓式大醬'),
  g('miso', 1208, 'spice', '미소', 'Miso', 'Miso', 'Missô', '味噌', 'Miso', 'Miso', 'मिसो', '味噌', '味噌'),
  g('ketchup', 1104, 'spice', '케첩', 'Ketchup', 'Kétchup', 'Ketchup', 'ケチャップ', 'Ketchup', 'Ketchup', 'केचप', '番茄酱', '番茄醬'),

  /* ───────── 액체 ───────── */
  g('water', 1000, 'liquid', '물', 'Water', 'Agua', 'Água', '水', 'Wasser', 'Eau', 'पानी', '水', '水'),
  g('soy-sauce', 1150, 'liquid', '간장', 'Soy sauce', 'Salsa de soja', 'Shoyu', '醤油', 'Sojasauce', 'Sauce soja', 'सोया सॉस', '酱油', '醬油'),
  g('vinegar', 1010, 'liquid', '식초', 'Vinegar', 'Vinagre', 'Vinagre', '酢', 'Essig', 'Vinaigre', 'सिरका', '醋', '醋'),
  g('rice-wine', 990, 'liquid', '맛술(미림)', 'Mirin', 'Mirin', 'Mirim', 'みりん', 'Mirin', 'Mirin', 'मिरिन', '味醂', '味醂'),
  g('lemon-juice', 1025, 'liquid', '레몬즙', 'Lemon juice', 'Zumo de limón', 'Suco de limão', 'レモン汁', 'Zitronensaft', 'Jus de citron', 'नीबू का रस', '柠檬汁', '檸檬汁'),
  g('coconut-milk', 1017, 'liquid', '코코넛 밀크', 'Coconut milk', 'Leche de coco', 'Leite de coco', 'ココナッツミルク', 'Kokosmilch', 'Lait de coco', 'नारियल दूध', '椰奶', '椰漿'),
  g('stock', 1004, 'liquid', '육수', 'Stock', 'Caldo', 'Caldo', 'だし', 'Brühe', 'Bouillon', 'शोरबा', '高汤', '高湯'),
  g('beer', 1008, 'liquid', '맥주', 'Beer', 'Cerveza', 'Cerveja', 'ビール', 'Bier', 'Bière', 'बीयर', '啤酒', '啤酒'),
  g('red-wine', 988, 'liquid', '레드와인', 'Red wine', 'Vino tinto', 'Vinho tinto', '赤ワイン', 'Rotwein', 'Vin rouge', 'रेड वाइन', '红葡萄酒', '紅酒'),
  g('tomato-sauce', 1063, 'liquid', '토마토 소스', 'Tomato sauce', 'Salsa de tomate', 'Molho de tomate', 'トマトソース', 'Tomatensauce', 'Sauce tomate', 'टमाटर सॉस', '番茄沙司', '番茄糊醬'),

  /* ───────── 채소·기타 ───────── */
  g('chopped-onion', 667, 'vegetable', '양파(다진 것)', 'Chopped onion', 'Cebolla picada', 'Cebola picada', '玉ねぎ（みじん切り）', 'Gehackte Zwiebel', 'Oignon haché', 'कटा प्याज़', '洋葱碎', '洋蔥丁'),
  g('minced-garlic', 567, 'vegetable', '마늘(다진 것)', 'Minced garlic', 'Ajo picado', 'Alho picado', 'にんにく（みじん切り）', 'Gehackter Knoblauch', 'Ail haché', 'कटा लहसुन', '蒜末', '蒜末'),
  g('diced-carrot', 542, 'vegetable', '당근(깍둑)', 'Diced carrot', 'Zanahoria en dados', 'Cenoura em cubos', 'にんじん（角切り）', 'Gewürfelte Karotte', 'Carotte en dés', 'कटी गाजर', '胡萝卜丁', '紅蘿蔔丁'),
  g('diced-potato', 625, 'vegetable', '감자(깍둑)', 'Diced potato', 'Patata en dados', 'Batata em cubos', 'じゃがいも（角切り）', 'Gewürfelte Kartoffel', 'Pomme de terre en dés', 'कटा आलू', '土豆丁', '馬鈴薯丁'),
  g('chopped-spinach', 250, 'vegetable', '시금치(썬 것)', 'Chopped spinach', 'Espinaca picada', 'Espinafre picado', 'ほうれん草（ざく切り）', 'Gehackter Spinat', 'Épinards hachés', 'कटी पालक', '菠菜碎', '菠菜末'),
  g('shredded-cabbage', 292, 'vegetable', '양배추(채)', 'Shredded cabbage', 'Col rallada', 'Repolho ralado', 'キャベツ（千切り）', 'Weißkohlstreifen', 'Chou émincé', 'कसी पत्तागोभी', '卷心菜丝', '高麗菜絲'),
  g('green-peas', 604, 'vegetable', '완두콩(냉동)', 'Green peas', 'Guisantes', 'Ervilhas', 'グリーンピース', 'Erbsen', 'Petits pois', 'हरी मटर', '青豌豆', '青豌豆'),
  g('corn-kernels', 675, 'vegetable', '옥수수 알', 'Corn kernels', 'Granos de maíz', 'Milho em grão', 'コーン', 'Maiskörner', 'Grains de maïs', 'मक्के के दाने', '玉米粒', '玉米粒'),
  g('raisins', 667, 'other', '건포도', 'Raisins', 'Pasas', 'Uvas-passas', 'レーズン', 'Rosinen', 'Raisins secs', 'किशमिश', '葡萄干', '葡萄乾'),
  g('chocolate-chips', 708, 'other', '초콜릿 칩', 'Chocolate chips', 'Pepitas de chocolate', 'Gotas de chocolate', 'チョコチップ', 'Schokotropfen', 'Pépites de chocolat', 'चॉकलेट चिप्स', '巧克力豆', '巧克力豆'),
  g('marshmallows', 208, 'other', '마시멜로', 'Mini marshmallows', 'Nubes de azúcar', 'Marshmallows', 'マシュマロ', 'Mini-Marshmallows', 'Mini-guimauves', 'मार्शमैलो', '迷你棉花糖', '迷你棉花糖'),
  g('dried-cranberries', 542, 'other', '건크랜베리', 'Dried cranberries', 'Arándanos secos', 'Cranberries secas', 'ドライクランベリー', 'Getrocknete Cranberrys', 'Cranberries séchées', 'सूखे क्रैनबेरी', '蔓越莓干', '蔓越莓乾'),
  g('gelatin-powder', 625, 'other', '젤라틴 가루', 'Gelatin powder', 'Gelatina en polvo', 'Gelatina em pó', 'ゼラチン', 'Gelatinepulver', 'Gélatine en poudre', 'जेलेटिन पाउडर', '吉利丁粉', '吉利丁粉'),
  g('instant-coffee', 250, 'other', '인스턴트 커피', 'Instant coffee', 'Café instantáneo', 'Café instantâneo', 'インスタントコーヒー', 'Instantkaffee', 'Café instantané', 'इंस्टेंट कॉफ़ी', '速溶咖啡粉', '即溶咖啡粉'),
  g('matcha-powder', 417, 'other', '말차 가루', 'Matcha powder', 'Matcha en polvo', 'Matchá em pó', '抹茶', 'Matcha-Pulver', 'Thé matcha en poudre', 'माचा पाउडर', '抹茶粉', '抹茶粉'),
  g('protein-powder', 458, 'other', '단백질 파우더', 'Protein powder', 'Proteína en polvo', 'Proteína em pó', 'プロテインパウダー', 'Proteinpulver', 'Protéine en poudre', 'प्रोटीन पाउडर', '蛋白粉', '蛋白粉'),

  /* ───────── 뒤에 더한 것들 ───────── */
  g('semolina', 705, 'flour', '세몰리나', 'Semolina', 'Sémola', 'Semolina', 'セモリナ粉', 'Hartweizengrieß', 'Semoule', 'सूजी', '粗粒小麦粉', '粗粒小麥粉'),
  g('oat-flour', 480, 'flour', '귀리가루', 'Oat flour', 'Harina de avena', 'Farinha de aveia', 'オート麦粉', 'Hafermehl', 'Farine d\'avoine', 'जई का आटा', '燕麦粉', '燕麥粉'),
  g('demerara-sugar', 850, 'sugar', '데메라라 설탕', 'Demerara sugar', 'Azúcar demerara', 'Açúcar demerara', 'デメララシュガー', 'Demerara-Zucker', 'Sucre demerara', 'डेमेरारा चीनी', '德梅拉拉糖', '德梅拉拉糖'),
  g('date-syrup', 1330, 'sugar', '대추야자 시럽', 'Date syrup', 'Sirope de dátil', 'Xarope de tâmara', 'デーツシロップ', 'Dattelsirup', 'Sirop de datte', 'खजूर सिरप', '椰枣糖浆', '椰棗糖漿'),
  g('farro', 800, 'grain', '파로', 'Farro', 'Farro', 'Farro', 'ファッロ', 'Emmer', 'Épeautre farro', 'फ़ारो', '法罗麦', '法羅麥'),
  g('wild-rice', 720, 'grain', '야생쌀', 'Wild rice', 'Arroz salvaje', 'Arroz selvagem', 'ワイルドライス', 'Wildreis', 'Riz sauvage', 'जंगली चावल', '菰米', '菰米'),
  g('evaporated-milk', 1060, 'dairy', '무당연유', 'Evaporated milk', 'Leche evaporada', 'Leite evaporado', '無糖練乳', 'Ungezuckerte Kondensmilch', 'Lait évaporé', 'वाष्पित दूध', '淡奶', '淡奶'),
  g('cottage-cheese', 960, 'dairy', '코티지치즈', 'Cottage cheese', 'Requesón', 'Queijo cottage', 'カッテージチーズ', 'Hüttenkäse', 'Cottage cheese', 'पनीर दही', '农家干酪', '農家乾酪'),
  g('duck-fat', 900, 'fat', '오리기름', 'Duck fat', 'Grasa de pato', 'Gordura de pato', '鴨脂', 'Entenfett', 'Graisse de canard', 'बतख की चर्बी', '鸭油', '鴨油'),
  g('tahini', 1050, 'fat', '타히니', 'Tahini', 'Tahini', 'Tahine', 'タヒニ', 'Tahini', 'Tahini', 'ताहिनी', '芝麻酱', '芝麻醬'),
  g('hazelnuts', 590, 'nut', '헤이즐넛', 'Hazelnuts', 'Avellanas', 'Avelãs', 'ヘーゼルナッツ', 'Haselnüsse', 'Noisettes', 'हेज़लनट', '榛子', '榛子'),
  g('macadamia-nuts', 570, 'nut', '마카다미아', 'Macadamia nuts', 'Nueces de macadamia', 'Nozes-macadâmia', 'マカダミアナッツ', 'Macadamianüsse', 'Noix de macadamia', 'मैकाडेमिया', '夏威夷果', '夏威夷果'),
  g('pinto-beans', 800, 'legume', '핀토빈', 'Pinto beans', 'Frijoles pintos', 'Feijão carioca', 'ピントビーンズ', 'Pintobohnen', 'Haricots pinto', 'पिंटो बीन्स', '斑豆', '斑豆'),
  g('black-eyed-peas', 780, 'legume', '동부콩', 'Black-eyed peas', 'Frijoles carita', 'Feijão-fradinho', 'ブラックアイピー', 'Augenbohnen', 'Doliques à œil noir', 'लोबिया', '豇豆', '豇豆'),
  g('ground-ginger', 460, 'spice', '생강가루', 'Ground ginger', 'Jengibre molido', 'Gengibre em pó', 'ジンジャーパウダー', 'Ingwerpulver', 'Gingembre moulu', 'सोंठ', '姜粉', '薑粉'),
  g('nutmeg-ground', 470, 'spice', '육두구가루', 'Ground nutmeg', 'Nuez moscada molida', 'Noz-moscada moída', 'ナツメグパウダー', 'Muskatnusspulver', 'Noix de muscade moulue', 'जायफल चूर्ण', '肉豆蔻粉', '肉豆蔻粉'),
  g('orange-juice', 1045, 'liquid', '오렌지주스', 'Orange juice', 'Zumo de naranja', 'Suco de laranja', 'オレンジジュース', 'Orangensaft', 'Jus d\'orange', 'संतरे का रस', '橙汁', '橙汁'),
  g('fish-sauce', 1200, 'liquid', '액젓', 'Fish sauce', 'Salsa de pescado', 'Molho de peixe', 'ナンプラー', 'Fischsauce', 'Sauce de poisson', 'मछली सॉस', '鱼露', '魚露'),
  g('chopped-celery', 400, 'vegetable', '다진 셀러리', 'Chopped celery', 'Apio picado', 'Aipo picado', '刻んだセロリ', 'Gehackter Sellerie', 'Céleri haché', 'कटी हुई अजवाइन', '芹菜丁', '芹菜丁'),
  g('sliced-mushrooms', 290, 'vegetable', '저민 버섯', 'Sliced mushrooms', 'Champiñones en láminas', 'Cogumelos fatiados', 'スライスマッシュルーム', 'Geschnittene Champignons', 'Champignons émincés', 'कटे मशरूम', '蘑菇片', '蘑菇片'),
  g('rolled-cornflakes', 160, 'other', '콘플레이크', 'Cornflakes', 'Copos de maíz', 'Flocos de milho', 'コーンフレーク', 'Cornflakes', 'Pétales de maïs', 'कॉर्नफ्लेक्स', '玉米片', '玉米片'),
  g('dried-apricots', 640, 'other', '말린 살구', 'Dried apricots', 'Orejones', 'Damascos secos', 'ドライアプリコット', 'Getrocknete Aprikosen', 'Abricots secs', 'सूखी खुबानी', '杏干', '杏乾'),
];

export const INGREDIENT_SLUGS = INGREDIENTS.map(i => i.slug);

export const ingredient = (slug: string): Ingredient | undefined =>
  INGREDIENTS.find(i => i.slug === slug);

export const FOOD_CATEGORIES: FoodCategory[] =
  ['flour', 'sugar', 'grain', 'dairy', 'fat', 'nut', 'legume', 'spice', 'liquid', 'vegetable', 'other'];

export const ingredientsOfCategory = (category: FoodCategory): Ingredient[] =>
  INGREDIENTS.filter(i => i.category === category);
