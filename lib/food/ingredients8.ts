/**
 * 재료 110가지의 밀도 — 여덟 언어.
 *
 * "밀가루 1컵은 몇 g인가"는 재료마다 답이 다르다. 같은 1컵에 밀가루는 120g,
 * 설탕은 200g, 꿀은 340g이 들어간다. 부피가 아니라 무게로 재야 과자가 실패하지
 * 않는 이유가 여기 있다.
 *
 * 그래서 적는 것은 밀도 하나(1L에 몇 g)뿐이다. 미국 컵(240ml)·한국 컵(200ml)·
 * 큰술(15ml)·작은술(5ml)·1g당 부피가 전부 이 하나에서 계산된다 — 재료마다 표를
 * 손으로 적으면 110 × 다섯 칸을 적어야 하고, 하나가 틀려도 반죽을 망쳐 본 사람만
 * 알아챈다.
 *
 * 밀도는 "퍼서 담고 위를 깎은" 상태(spoon and level) 기준이다. 밀가루를 컵으로
 * 꾹 눌러 담으면 같은 컵에 30g이 더 들어가는데, 그것이 제과에서 무게를 쓰라고
 * 하는 이유다. 그 차이는 페이지에서 문장으로 알려 준다.
 */
import type { L8 } from '../i18n/lang.ts';

export type FoodCategory =
  | 'flour' | 'sugar' | 'grain' | 'dairy' | 'fat' | 'nut' | 'legume'
  | 'spice' | 'liquid' | 'vegetable' | 'other';

export interface Ingredient {
  slug: string;
  /** 1L에 몇 g — 이 하나에서 컵·큰술·작은술이 계산된다 */
  gPerL: number;
  category: FoodCategory;
  name: L8<string>;
}

/** 순서는 ko · en · es · pt · ja · de · fr · hi */
const g = (
  slug: string, gPerL: number, category: FoodCategory,
  ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string,
): Ingredient => ({ slug, gPerL, category, name: { ko, en, es, pt, ja, de, fr, hi } });

export const INGREDIENTS: Ingredient[] = [
  /* ───────── 가루 ───────── */
  g('all-purpose-flour', 521, 'flour', '중력분(밀가루)', 'All-purpose flour', 'Harina de trigo', 'Farinha de trigo', '中力粉', 'Weizenmehl Type 550', 'Farine tout usage', 'मैदा'),
  g('bread-flour', 533, 'flour', '강력분', 'Bread flour', 'Harina de fuerza', 'Farinha de pão', '強力粉', 'Brotmehl', 'Farine à pain', 'ब्रेड आटा'),
  g('cake-flour', 458, 'flour', '박력분', 'Cake flour', 'Harina de repostería', 'Farinha para bolo', '薄力粉', 'Kuchenmehl', 'Farine à gâteau', 'केक आटा'),
  g('whole-wheat-flour', 500, 'flour', '통밀가루', 'Whole wheat flour', 'Harina integral', 'Farinha integral', '全粒粉', 'Vollkornmehl', 'Farine complète', 'गेहूं का आटा'),
  g('rice-flour', 654, 'flour', '쌀가루', 'Rice flour', 'Harina de arroz', 'Farinha de arroz', '米粉', 'Reismehl', 'Farine de riz', 'चावल का आटा'),
  g('glutinous-rice-flour', 621, 'flour', '찹쌀가루', 'Glutinous rice flour', 'Harina de arroz glutinoso', 'Farinha de arroz glutinoso', '白玉粉', 'Klebreismehl', 'Farine de riz gluant', 'चिपचिपा चावल आटा'),
  g('almond-flour', 400, 'flour', '아몬드 가루', 'Almond flour', 'Harina de almendra', 'Farinha de amêndoa', 'アーモンドプードル', 'Mandelmehl', 'Farine d’amande', 'बादाम का आटा'),
  g('cornstarch', 500, 'flour', '전분(옥수수)', 'Cornstarch', 'Maicena', 'Amido de milho', 'コーンスターチ', 'Speisestärke', 'Fécule de maïs', 'कॉर्न स्टार्च'),
  g('cornmeal', 683, 'flour', '옥수숫가루', 'Cornmeal', 'Harina de maíz', 'Farinha de milho', 'コーンミール', 'Maisgrieß', 'Semoule de maïs', 'मक्के का आटा'),
  g('cocoa-powder', 350, 'flour', '코코아 가루', 'Cocoa powder', 'Cacao en polvo', 'Cacau em pó', 'ココアパウダー', 'Kakaopulver', 'Cacao en poudre', 'कोको पाउडर'),
  g('breadcrumbs', 458, 'flour', '빵가루', 'Breadcrumbs', 'Pan rallado', 'Farinha de rosca', 'パン粉', 'Semmelbrösel', 'Chapelure', 'ब्रेड क्रम्ब्स'),
  g('chickpea-flour', 383, 'flour', '병아리콩 가루', 'Chickpea flour', 'Harina de garbanzo', 'Farinha de grão-de-bico', 'ひよこ豆粉', 'Kichererbsenmehl', 'Farine de pois chiches', 'बेसन'),
  g('buckwheat-flour', 500, 'flour', '메밀가루', 'Buckwheat flour', 'Harina de alforfón', 'Farinha de trigo-sarraceno', 'そば粉', 'Buchweizenmehl', 'Farine de sarrasin', 'कुट्टू का आटा'),
  g('tapioca-starch', 500, 'flour', '타피오카 전분', 'Tapioca starch', 'Almidón de tapioca', 'Polvilho de tapioca', 'タピオカ粉', 'Tapiokastärke', 'Fécule de tapioca', 'टैपिओका स्टार्च'),
  g('potato-starch', 667, 'flour', '감자 전분', 'Potato starch', 'Almidón de patata', 'Amido de batata', '片栗粉', 'Kartoffelstärke', 'Fécule de pomme de terre', 'आलू स्टार्च'),

  /* ───────── 당류 ───────── */
  g('granulated-sugar', 833, 'sugar', '설탕', 'Granulated sugar', 'Azúcar blanca', 'Açúcar refinado', '上白糖', 'Kristallzucker', 'Sucre blanc', 'चीनी'),
  g('brown-sugar', 875, 'sugar', '흑설탕', 'Brown sugar', 'Azúcar moreno', 'Açúcar mascavo', 'ブラウンシュガー', 'Brauner Zucker', 'Sucre roux', 'ब्राउन शुगर'),
  g('powdered-sugar', 500, 'sugar', '분당(가루설탕)', 'Powdered sugar', 'Azúcar glas', 'Açúcar de confeiteiro', '粉糖', 'Puderzucker', 'Sucre glace', 'पिसी चीनी'),
  g('honey', 1417, 'sugar', '꿀', 'Honey', 'Miel', 'Mel', 'はちみつ', 'Honig', 'Miel', 'शहद'),
  g('maple-syrup', 1333, 'sugar', '메이플 시럽', 'Maple syrup', 'Sirope de arce', 'Xarope de bordo', 'メープルシロップ', 'Ahornsirup', 'Sirop d’érable', 'मेपल सिरप'),
  g('corn-syrup', 1375, 'sugar', '물엿', 'Corn syrup', 'Jarabe de maíz', 'Glucose de milho', '水あめ', 'Glukosesirup', 'Sirop de glucose', 'कॉर्न सिरप'),
  g('molasses', 1417, 'sugar', '당밀', 'Molasses', 'Melaza', 'Melaço', 'モラセス', 'Melasse', 'Mélasse', 'शीरा'),
  g('agave-syrup', 1333, 'sugar', '아가베 시럽', 'Agave syrup', 'Sirope de agave', 'Xarope de agave', 'アガベシロップ', 'Agavensirup', 'Sirop d’agave', 'एगेव सिरप'),
  g('coconut-sugar', 833, 'sugar', '코코넛 설탕', 'Coconut sugar', 'Azúcar de coco', 'Açúcar de coco', 'ココナッツシュガー', 'Kokosblütenzucker', 'Sucre de coco', 'नारियल चीनी'),
  g('rice-syrup', 1333, 'sugar', '조청', 'Rice syrup', 'Sirope de arroz', 'Xarope de arroz', '米飴', 'Reissirup', 'Sirop de riz', 'चावल सिरप'),

  /* ───────── 곡물 ───────── */
  g('white-rice', 771, 'grain', '백미(생쌀)', 'White rice', 'Arroz blanco', 'Arroz branco', '白米', 'Weißer Reis', 'Riz blanc', 'सफ़ेद चावल'),
  g('brown-rice', 750, 'grain', '현미', 'Brown rice', 'Arroz integral', 'Arroz integral', '玄米', 'Naturreis', 'Riz complet', 'ब्राउन राइस'),
  g('glutinous-rice', 792, 'grain', '찹쌀', 'Glutinous rice', 'Arroz glutinoso', 'Arroz glutinoso', 'もち米', 'Klebreis', 'Riz gluant', 'चिपचिपा चावल'),
  g('rolled-oats', 375, 'grain', '오트밀(압착)', 'Rolled oats', 'Copos de avena', 'Aveia em flocos', 'オートミール', 'Haferflocken', 'Flocons d’avoine', 'ओट्स'),
  g('quinoa', 708, 'grain', '퀴노아', 'Quinoa', 'Quinoa', 'Quinoa', 'キヌア', 'Quinoa', 'Quinoa', 'क्विनोआ'),
  g('barley', 800, 'grain', '보리', 'Pearl barley', 'Cebada perlada', 'Cevada em grão', '押し麦', 'Perlgraupen', 'Orge perlé', 'जौ'),
  g('couscous', 708, 'grain', '쿠스쿠스', 'Couscous', 'Cuscús', 'Cuscuz', 'クスクス', 'Couscous', 'Couscous', 'कूसकूस'),
  g('bulgur', 583, 'grain', '불구르', 'Bulgur', 'Bulgur', 'Bulgur', 'ブルグル', 'Bulgur', 'Boulgour', 'दलिया'),
  g('millet', 833, 'grain', '조', 'Millet', 'Mijo', 'Milhete', 'キビ', 'Rispenhirse', 'Millet', 'बाजरा'),
  g('buckwheat-groats', 708, 'grain', '메밀쌀', 'Buckwheat groats', 'Alforfón en grano', 'Trigo-sarraceno em grão', 'そば米', 'Buchweizengrütze', 'Kasha', 'कुट्टू दाना'),
  g('popcorn-kernels', 833, 'grain', '팝콘용 옥수수', 'Popcorn kernels', 'Maíz para palomitas', 'Milho de pipoca', 'ポップコーン用コーン', 'Popcornmais', 'Maïs à popcorn', 'पॉपकॉर्न दाने'),
  g('pasta-macaroni', 458, 'grain', '마카로니', 'Elbow macaroni', 'Macarrones', 'Macarrão', 'マカロニ', 'Makkaroni', 'Macaronis', 'मैकरोनी'),
  g('rolled-barley', 417, 'grain', '납작보리', 'Rolled barley', 'Cebada en copos', 'Cevada em flocos', '押し麦フレーク', 'Gerstenflocken', 'Flocons d’orge', 'जौ फ्लेक्स'),
  g('cooked-rice', 800, 'grain', '밥(지은 쌀)', 'Cooked rice', 'Arroz cocido', 'Arroz cozido', 'ご飯', 'Gekochter Reis', 'Riz cuit', 'पका चावल'),

  /* ───────── 유제품 ───────── */
  g('milk', 1033, 'dairy', '우유', 'Milk', 'Leche', 'Leite', '牛乳', 'Milch', 'Lait', 'दूध'),
  g('heavy-cream', 1004, 'dairy', '생크림', 'Heavy cream', 'Nata para montar', 'Creme de leite', '生クリーム', 'Schlagsahne', 'Crème entière', 'क्रीम'),
  g('yogurt', 1042, 'dairy', '플레인 요거트', 'Plain yogurt', 'Yogur natural', 'Iogurte natural', 'プレーンヨーグルト', 'Naturjoghurt', 'Yaourt nature', 'दही'),
  g('sour-cream', 1000, 'dairy', '사워크림', 'Sour cream', 'Crema agria', 'Creme ácido', 'サワークリーム', 'Schmand', 'Crème aigre', 'खट्टी क्रीम'),
  g('cream-cheese', 967, 'dairy', '크림치즈', 'Cream cheese', 'Queso crema', 'Cream cheese', 'クリームチーズ', 'Frischkäse', 'Fromage frais', 'क्रीम चीज़'),
  g('grated-parmesan', 417, 'dairy', '파르메산(간 것)', 'Grated parmesan', 'Parmesano rallado', 'Parmesão ralado', 'パルメザン（削り）', 'Geriebener Parmesan', 'Parmesan râpé', 'कसा पार्मेज़ान'),
  g('shredded-cheese', 471, 'dairy', '슈레드 치즈', 'Shredded cheese', 'Queso rallado', 'Queijo ralado', 'シュレッドチーズ', 'Geriebener Käse', 'Fromage râpé', 'कसा चीज़'),
  g('condensed-milk', 1300, 'dairy', '연유', 'Condensed milk', 'Leche condensada', 'Leite condensado', 'コンデンスミルク', 'Kondensmilch', 'Lait concentré sucré', 'कंडेंस्ड मिल्क'),
  g('milk-powder', 458, 'dairy', '분유', 'Milk powder', 'Leche en polvo', 'Leite em pó', '粉乳', 'Milchpulver', 'Lait en poudre', 'मिल्क पाउडर'),
  g('ricotta', 1033, 'dairy', '리코타', 'Ricotta', 'Ricotta', 'Ricota', 'リコッタ', 'Ricotta', 'Ricotta', 'रिकोटा'),
  g('mascarpone', 1000, 'dairy', '마스카르포네', 'Mascarpone', 'Mascarpone', 'Mascarpone', 'マスカルポーネ', 'Mascarpone', 'Mascarpone', 'मस्कारपोने'),
  g('buttermilk', 1033, 'dairy', '버터밀크', 'Buttermilk', 'Suero de leche', 'Leitelho', 'バターミルク', 'Buttermilch', 'Babeurre', 'छाछ'),

  /* ───────── 지방 ───────── */
  g('butter', 958, 'fat', '버터', 'Butter', 'Mantequilla', 'Manteiga', 'バター', 'Butter', 'Beurre', 'मक्खन'),
  g('olive-oil', 900, 'fat', '올리브유', 'Olive oil', 'Aceite de oliva', 'Azeite', 'オリーブオイル', 'Olivenöl', 'Huile d’olive', 'जैतून का तेल'),
  g('vegetable-oil', 917, 'fat', '식용유', 'Vegetable oil', 'Aceite vegetal', 'Óleo vegetal', 'サラダ油', 'Pflanzenöl', 'Huile végétale', 'वनस्पति तेल'),
  g('coconut-oil', 900, 'fat', '코코넛 오일', 'Coconut oil', 'Aceite de coco', 'Óleo de coco', 'ココナッツオイル', 'Kokosöl', 'Huile de coco', 'नारियल तेल'),
  g('sesame-oil', 917, 'fat', '참기름', 'Sesame oil', 'Aceite de sésamo', 'Óleo de gergelim', 'ごま油', 'Sesamöl', 'Huile de sésame', 'तिल का तेल'),
  g('lard', 917, 'fat', '라드', 'Lard', 'Manteca de cerdo', 'Banha', 'ラード', 'Schweineschmalz', 'Saindoux', 'चरबी'),
  g('shortening', 792, 'fat', '쇼트닝', 'Shortening', 'Manteca vegetal', 'Gordura vegetal', 'ショートニング', 'Backfett', 'Shortening', 'शॉर्टनिंग'),
  g('ghee', 912, 'fat', '기(정제 버터)', 'Ghee', 'Ghee', 'Ghee', 'ギー', 'Ghee', 'Ghee', 'घी'),
  g('mayonnaise', 940, 'fat', '마요네즈', 'Mayonnaise', 'Mayonesa', 'Maionese', 'マヨネーズ', 'Mayonnaise', 'Mayonnaise', 'मेयोनेज़'),
  g('peanut-butter', 1083, 'fat', '땅콩버터', 'Peanut butter', 'Mantequilla de cacahuete', 'Pasta de amendoim', 'ピーナッツバター', 'Erdnussbutter', 'Beurre de cacahuète', 'पीनट बटर'),

  /* ───────── 견과·씨앗 ───────── */
  g('almonds', 583, 'nut', '아몬드', 'Almonds', 'Almendras', 'Amêndoas', 'アーモンド', 'Mandeln', 'Amandes', 'बादाम'),
  g('walnuts', 500, 'nut', '호두', 'Walnuts', 'Nueces', 'Nozes', 'くるみ', 'Walnüsse', 'Noix', 'अखरोट'),
  g('peanuts', 604, 'nut', '땅콩', 'Peanuts', 'Cacahuetes', 'Amendoins', 'ピーナッツ', 'Erdnüsse', 'Cacahuètes', 'मूंगफली'),
  g('cashews', 542, 'nut', '캐슈너트', 'Cashews', 'Anacardos', 'Castanhas de caju', 'カシューナッツ', 'Cashewkerne', 'Noix de cajou', 'काजू'),
  g('pecans', 417, 'nut', '피칸', 'Pecans', 'Pacanas', 'Nozes-pecã', 'ピーカンナッツ', 'Pekannüsse', 'Noix de pécan', 'पीकन'),
  g('pistachios', 500, 'nut', '피스타치오', 'Pistachios', 'Pistachos', 'Pistaches', 'ピスタチオ', 'Pistazien', 'Pistaches', 'पिस्ता'),
  g('sesame-seeds', 617, 'nut', '참깨', 'Sesame seeds', 'Semillas de sésamo', 'Sementes de gergelim', 'ごま', 'Sesamsamen', 'Graines de sésame', 'तिल'),
  g('sunflower-seeds', 583, 'nut', '해바라기씨', 'Sunflower seeds', 'Pipas de girasol', 'Sementes de girassol', 'ひまわりの種', 'Sonnenblumenkerne', 'Graines de tournesol', 'सूरजमुखी बीज'),
  g('pumpkin-seeds', 542, 'nut', '호박씨', 'Pumpkin seeds', 'Pipas de calabaza', 'Sementes de abóbora', 'かぼちゃの種', 'Kürbiskerne', 'Graines de courge', 'कद्दू के बीज'),
  g('chia-seeds', 708, 'nut', '치아씨드', 'Chia seeds', 'Semillas de chía', 'Sementes de chia', 'チアシード', 'Chiasamen', 'Graines de chia', 'चिया बीज'),
  g('flaxseed', 604, 'nut', '아마씨', 'Flaxseed', 'Semillas de lino', 'Sementes de linhaça', '亜麻仁', 'Leinsamen', 'Graines de lin', 'अलसी'),
  g('shredded-coconut', 333, 'nut', '코코넛 슬라이스', 'Shredded coconut', 'Coco rallado', 'Coco ralado', 'ココナッツファイン', 'Kokosraspeln', 'Noix de coco râpée', 'कसा नारियल'),

  /* ───────── 콩류 ───────── */
  g('dried-soybeans', 800, 'legume', '메주콩(대두)', 'Dried soybeans', 'Soja seca', 'Soja em grão', '大豆', 'Trockene Sojabohnen', 'Soja sec', 'सोयाबीन'),
  g('red-beans', 833, 'legume', '팥', 'Adzuki beans', 'Frijol azuki', 'Feijão azuki', '小豆', 'Adzukibohnen', 'Haricots azuki', 'अडुकी बीन्स'),
  g('black-beans', 792, 'legume', '검은콩', 'Black beans', 'Frijol negro', 'Feijão preto', '黒豆', 'Schwarze Bohnen', 'Haricots noirs', 'काली बीन्स'),
  g('chickpeas', 800, 'legume', '병아리콩', 'Dried chickpeas', 'Garbanzos secos', 'Grão-de-bico', 'ひよこ豆', 'Kichererbsen', 'Pois chiches secs', 'चना'),
  g('lentils', 813, 'legume', '렌틸콩', 'Dried lentils', 'Lentejas', 'Lentilhas', 'レンズ豆', 'Linsen', 'Lentilles', 'मसूर दाल'),
  g('split-peas', 833, 'legume', '완두콩(마른)', 'Split peas', 'Guisantes partidos', 'Ervilha partida', '割りエンドウ', 'Schälerbsen', 'Pois cassés', 'मटर दाल'),
  g('kidney-beans', 771, 'legume', '강낭콩', 'Kidney beans', 'Frijol rojo', 'Feijão vermelho', '金時豆', 'Kidneybohnen', 'Haricots rouges', 'राजमा'),
  g('mung-beans', 833, 'legume', '녹두', 'Mung beans', 'Frijol mungo', 'Feijão-mungo', '緑豆', 'Mungbohnen', 'Haricots mungo', 'मूंग दाल'),

  /* ───────── 양념·향신료 ───────── */
  g('table-salt', 1217, 'spice', '고운 소금', 'Table salt', 'Sal fina', 'Sal refinado', '食塩', 'Speisesalz', 'Sel fin', 'नमक'),
  g('coarse-salt', 1000, 'spice', '굵은 소금', 'Coarse salt', 'Sal gruesa', 'Sal grosso', '粗塩', 'Grobes Salz', 'Gros sel', 'मोटा नमक'),
  g('baking-powder', 917, 'spice', '베이킹파우더', 'Baking powder', 'Polvo de hornear', 'Fermento em pó', 'ベーキングパウダー', 'Backpulver', 'Levure chimique', 'बेकिंग पाउडर'),
  g('baking-soda', 958, 'spice', '베이킹소다', 'Baking soda', 'Bicarbonato de sodio', 'Bicarbonato de sódio', '重曹', 'Natron', 'Bicarbonate de soude', 'बेकिंग सोडा'),
  g('dry-yeast', 625, 'spice', '드라이 이스트', 'Active dry yeast', 'Levadura seca', 'Levedura seca', 'ドライイースト', 'Trockenhefe', 'Levure sèche', 'सूखा यीस्ट'),
  g('black-pepper', 500, 'spice', '후춧가루', 'Ground black pepper', 'Pimienta negra molida', 'Pimenta-do-reino moída', '黒こしょう', 'Gemahlener Pfeffer', 'Poivre noir moulu', 'काली मिर्च'),
  g('red-pepper-powder', 400, 'spice', '고춧가루', 'Korean chilli powder', 'Chile en polvo coreano', 'Pimenta coreana em pó', '粉唐辛子', 'Koreanisches Chilipulver', 'Piment coréen en poudre', 'कोरियाई मिर्च पाउडर'),
  g('paprika', 458, 'spice', '파프리카 파우더', 'Paprika', 'Pimentón', 'Páprica', 'パプリカパウダー', 'Paprikapulver', 'Paprika', 'पेपरिका'),
  g('cinnamon', 542, 'spice', '계핏가루', 'Ground cinnamon', 'Canela molida', 'Canela em pó', 'シナモンパウダー', 'Gemahlener Zimt', 'Cannelle moulue', 'दालचीनी पाउडर'),
  g('curry-powder', 500, 'spice', '카레 가루', 'Curry powder', 'Curry en polvo', 'Curry em pó', 'カレー粉', 'Currypulver', 'Curry en poudre', 'करी पाउडर'),
  g('turmeric', 583, 'spice', '강황 가루', 'Ground turmeric', 'Cúrcuma molida', 'Cúrcuma em pó', 'ターメリック', 'Kurkumapulver', 'Curcuma moulu', 'हल्दी'),
  g('cumin', 458, 'spice', '커민 가루', 'Ground cumin', 'Comino molido', 'Cominho em pó', 'クミンパウダー', 'Gemahlener Kreuzkümmel', 'Cumin moulu', 'जीरा पाउडर'),
  g('garlic-powder', 625, 'spice', '마늘 가루', 'Garlic powder', 'Ajo en polvo', 'Alho em pó', 'ガーリックパウダー', 'Knoblauchpulver', 'Ail en poudre', 'लहसुन पाउडर'),
  g('msg', 917, 'spice', '미원(글루탐산)', 'MSG', 'Glutamato monosódico', 'Glutamato monossódico', '味の素', 'Glutamat', 'Glutamate', 'अजीनोमोटो'),
  g('gochujang', 1250, 'spice', '고추장', 'Gochujang', 'Gochujang', 'Gochujang', 'コチュジャン', 'Gochujang', 'Gochujang', 'गोचुजांग'),
  g('doenjang', 1250, 'spice', '된장', 'Doenjang', 'Doenjang', 'Doenjang', 'テンジャン', 'Doenjang', 'Doenjang', 'देनजांग'),
  g('miso', 1208, 'spice', '미소', 'Miso', 'Miso', 'Missô', '味噌', 'Miso', 'Miso', 'मिसो'),
  g('ketchup', 1104, 'spice', '케첩', 'Ketchup', 'Kétchup', 'Ketchup', 'ケチャップ', 'Ketchup', 'Ketchup', 'केचप'),

  /* ───────── 액체 ───────── */
  g('water', 1000, 'liquid', '물', 'Water', 'Agua', 'Água', '水', 'Wasser', 'Eau', 'पानी'),
  g('soy-sauce', 1150, 'liquid', '간장', 'Soy sauce', 'Salsa de soja', 'Shoyu', '醤油', 'Sojasauce', 'Sauce soja', 'सोया सॉस'),
  g('vinegar', 1010, 'liquid', '식초', 'Vinegar', 'Vinagre', 'Vinagre', '酢', 'Essig', 'Vinaigre', 'सिरका'),
  g('rice-wine', 990, 'liquid', '맛술(미림)', 'Mirin', 'Mirin', 'Mirim', 'みりん', 'Mirin', 'Mirin', 'मिरिन'),
  g('lemon-juice', 1025, 'liquid', '레몬즙', 'Lemon juice', 'Zumo de limón', 'Suco de limão', 'レモン汁', 'Zitronensaft', 'Jus de citron', 'नीबू का रस'),
  g('coconut-milk', 1017, 'liquid', '코코넛 밀크', 'Coconut milk', 'Leche de coco', 'Leite de coco', 'ココナッツミルク', 'Kokosmilch', 'Lait de coco', 'नारियल दूध'),
  g('stock', 1004, 'liquid', '육수', 'Stock', 'Caldo', 'Caldo', 'だし', 'Brühe', 'Bouillon', 'शोरबा'),
  g('beer', 1008, 'liquid', '맥주', 'Beer', 'Cerveza', 'Cerveja', 'ビール', 'Bier', 'Bière', 'बीयर'),
  g('red-wine', 988, 'liquid', '레드와인', 'Red wine', 'Vino tinto', 'Vinho tinto', '赤ワイン', 'Rotwein', 'Vin rouge', 'रेड वाइन'),
  g('tomato-sauce', 1063, 'liquid', '토마토 소스', 'Tomato sauce', 'Salsa de tomate', 'Molho de tomate', 'トマトソース', 'Tomatensauce', 'Sauce tomate', 'टमाटर सॉस'),

  /* ───────── 채소·기타 ───────── */
  g('chopped-onion', 667, 'vegetable', '양파(다진 것)', 'Chopped onion', 'Cebolla picada', 'Cebola picada', '玉ねぎ（みじん切り）', 'Gehackte Zwiebel', 'Oignon haché', 'कटा प्याज़'),
  g('minced-garlic', 567, 'vegetable', '마늘(다진 것)', 'Minced garlic', 'Ajo picado', 'Alho picado', 'にんにく（みじん切り）', 'Gehackter Knoblauch', 'Ail haché', 'कटा लहसुन'),
  g('diced-carrot', 542, 'vegetable', '당근(깍둑)', 'Diced carrot', 'Zanahoria en dados', 'Cenoura em cubos', 'にんじん（角切り）', 'Gewürfelte Karotte', 'Carotte en dés', 'कटी गाजर'),
  g('diced-potato', 625, 'vegetable', '감자(깍둑)', 'Diced potato', 'Patata en dados', 'Batata em cubos', 'じゃがいも（角切り）', 'Gewürfelte Kartoffel', 'Pomme de terre en dés', 'कटा आलू'),
  g('chopped-spinach', 250, 'vegetable', '시금치(썬 것)', 'Chopped spinach', 'Espinaca picada', 'Espinafre picado', 'ほうれん草（ざく切り）', 'Gehackter Spinat', 'Épinards hachés', 'कटी पालक'),
  g('shredded-cabbage', 292, 'vegetable', '양배추(채)', 'Shredded cabbage', 'Col rallada', 'Repolho ralado', 'キャベツ（千切り）', 'Weißkohlstreifen', 'Chou émincé', 'कसी पत्तागोभी'),
  g('green-peas', 604, 'vegetable', '완두콩(냉동)', 'Green peas', 'Guisantes', 'Ervilhas', 'グリーンピース', 'Erbsen', 'Petits pois', 'हरी मटर'),
  g('corn-kernels', 675, 'vegetable', '옥수수 알', 'Corn kernels', 'Granos de maíz', 'Milho em grão', 'コーン', 'Maiskörner', 'Grains de maïs', 'मक्के के दाने'),
  g('raisins', 667, 'other', '건포도', 'Raisins', 'Pasas', 'Uvas-passas', 'レーズン', 'Rosinen', 'Raisins secs', 'किशमिश'),
  g('chocolate-chips', 708, 'other', '초콜릿 칩', 'Chocolate chips', 'Pepitas de chocolate', 'Gotas de chocolate', 'チョコチップ', 'Schokotropfen', 'Pépites de chocolat', 'चॉकलेट चिप्स'),
  g('marshmallows', 208, 'other', '마시멜로', 'Mini marshmallows', 'Nubes de azúcar', 'Marshmallows', 'マシュマロ', 'Mini-Marshmallows', 'Mini-guimauves', 'मार्शमैलो'),
  g('dried-cranberries', 542, 'other', '건크랜베리', 'Dried cranberries', 'Arándanos secos', 'Cranberries secas', 'ドライクランベリー', 'Getrocknete Cranberrys', 'Cranberries séchées', 'सूखे क्रैनबेरी'),
  g('gelatin-powder', 625, 'other', '젤라틴 가루', 'Gelatin powder', 'Gelatina en polvo', 'Gelatina em pó', 'ゼラチン', 'Gelatinepulver', 'Gélatine en poudre', 'जेलेटिन पाउडर'),
  g('instant-coffee', 250, 'other', '인스턴트 커피', 'Instant coffee', 'Café instantáneo', 'Café instantâneo', 'インスタントコーヒー', 'Instantkaffee', 'Café instantané', 'इंस्टेंट कॉफ़ी'),
  g('matcha-powder', 417, 'other', '말차 가루', 'Matcha powder', 'Matcha en polvo', 'Matchá em pó', '抹茶', 'Matcha-Pulver', 'Thé matcha en poudre', 'माचा पाउडर'),
  g('protein-powder', 458, 'other', '단백질 파우더', 'Protein powder', 'Proteína en polvo', 'Proteína em pó', 'プロテインパウダー', 'Proteinpulver', 'Protéine en poudre', 'प्रोटीन पाउडर'),
];

export const INGREDIENT_SLUGS = INGREDIENTS.map(i => i.slug);

export const ingredient = (slug: string): Ingredient | undefined =>
  INGREDIENTS.find(i => i.slug === slug);

export const FOOD_CATEGORIES: FoodCategory[] =
  ['flour', 'sugar', 'grain', 'dairy', 'fat', 'nut', 'legume', 'spice', 'liquid', 'vegetable', 'other'];

export const ingredientsOfCategory = (category: FoodCategory): Ingredient[] =>
  INGREDIENTS.filter(i => i.category === category);
