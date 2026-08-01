import type { Generator } from './types.ts';
import type { AnyLocale10 } from './locales.ts';
import { GENERATORS_EN } from './generator-en.ts';

/**
 * 생성기 20종의 여덟 언어 문구.
 *
 * **자료를 복제하지 않는다.** 생성기가 뽑는 것은 Aeric·Thalor·Stormborn 같은
 * 만들어 낸 이름이라 언어와 무관하다 — 일본어 사용자가 「ファンタジー 名前」로
 * 찾아와도 원하는 결과는 라틴 문자 이름이다. 그래서 풀은 영어판을 그대로 쓰고
 * 제목·설명·분류만 여기서 덧씌운다. 200줄짜리 풀을 아홉 벌 복사하면 이름 하나를
 * 고칠 때 아홉 곳을 고쳐야 한다.
 *
 * 예외가 하나 있다. wifi-name은 영어 말장난("The LAN Before Time")이라
 * 옮길 수가 없다 — 언어마다 그 말로 웃기는 것을 새로 썼다.
 */

export type GeneratorIntlLang = Exclude<AnyLocale10, 'ko' | 'en'>;

type Copy = { title: string; desc: string; category: string };

/** 분류는 스무 종이 여섯 가지를 나눠 쓴다 — 낱말만 옮긴다 */
const CATEGORY: Record<GeneratorIntlLang, Record<string, string>> = {
  es: { Fantasy: 'Fantasía', 'Sci-Fi': 'Ciencia ficción', Fun: 'Diversión', Gaming: 'Videojuegos' },
  'pt-br': { Fantasy: 'Fantasia', 'Sci-Fi': 'Ficção científica', Fun: 'Diversão', Gaming: 'Games' },
  ja: { Fantasy: 'ファンタジー', 'Sci-Fi': 'SF', Fun: 'あそび', Gaming: 'ゲーム' },
  de: { Fantasy: 'Fantasy', 'Sci-Fi': 'Science-Fiction', Fun: 'Spaß', Gaming: 'Gaming' },
  fr: { Fantasy: 'Fantasy', 'Sci-Fi': 'Science-fiction', Fun: 'Fun', Gaming: 'Jeux vidéo' },
  hi: { Fantasy: 'फैंटेसी', 'Sci-Fi': 'साइ-फ़ाई', Fun: 'मज़ा', Gaming: 'गेमिंग' },
  'zh-hans': { Fantasy: '奇幻', 'Sci-Fi': '科幻', Fun: '好玩', Gaming: '游戏' },
  'zh-hant': { Fantasy: '奇幻', 'Sci-Fi': '科幻', Fun: '好玩', Gaming: '遊戲' },
};

/** slug → 언어별 제목·설명 */
const TEXT: Record<string, Record<GeneratorIntlLang, [string, string]>> = {
  'fantasy-name': {
    es: ['Generador de nombres de fantasía', 'Nombres de elfos, magos, caballeros y dragones.'],
    'pt-br': ['Gerador de nomes de fantasia', 'Nomes de elfos, magos, cavaleiros e dragões.'],
    ja: ['ファンタジー名前ジェネレーター', 'エルフ・魔法使い・騎士・竜の名前を作ります。'],
    de: ['Fantasy-Namensgenerator', 'Namen für Elfen, Magier, Ritter und Drachen.'],
    fr: ['Générateur de noms fantasy', 'Noms d’elfes, de mages, de chevaliers et de dragons.'],
    hi: ['फैंटेसी नाम जनरेटर', 'एल्फ़, जादूगर, नाइट और ड्रैगन जैसे नाम।'],
    'zh-hans': ['奇幻名字生成器', '精灵、法师、骑士、巨龙风格的名字。'],
    'zh-hant': ['奇幻名字產生器', '精靈、法師、騎士、巨龍風格的名字。'],
  },
  'sf-name': {
    es: ['Generador de nombres de ciencia ficción', 'Nombres futuristas para el espacio, robots y ciberpunk.'],
    'pt-br': ['Gerador de nomes de ficção científica', 'Nomes futuristas para espaço, robôs e cyberpunk.'],
    ja: ['SF名前ジェネレーター', '宇宙・ロボット・サイバーパンク向けの未来的な名前。'],
    de: ['Sci-Fi-Namensgenerator', 'Futuristische Namen für Weltraum, Roboter und Cyberpunk.'],
    fr: ['Générateur de noms science-fiction', 'Noms futuristes pour l’espace, les robots et le cyberpunk.'],
    hi: ['साइ-फ़ाई नाम जनरेटर', 'स्पेस, रोबोट और साइबरपंक के लिए भविष्य जैसे नाम।'],
    'zh-hans': ['科幻名字生成器', '太空、机器人、赛博朋克风的未来感名字。'],
    'zh-hant': ['科幻名字產生器', '太空、機器人、賽博龐克風的未來感名字。'],
  },
  'superhero-name': {
    es: ['Generador de nombres de superhéroe', 'Nombres en clave heroicos para tu próximo justiciero.'],
    'pt-br': ['Gerador de nomes de super-herói', 'Codinomes heroicos para o seu próximo herói de capa.'],
    ja: ['ヒーロー名ジェネレーター', 'マント姿の主人公に似合うコードネーム。'],
    de: ['Superhelden-Namensgenerator', 'Heldenhafte Decknamen für deinen nächsten Helden.'],
    fr: ['Générateur de noms de super-héros', 'Noms de code héroïques pour ton prochain justicier.'],
    hi: ['सुपरहीरो नाम जनरेटर', 'आपके अगले लबादेवाले हीरो के लिए दमदार कोडनेम।'],
    'zh-hans': ['超级英雄名字生成器', '给你下一个披风英雄起个响亮的代号。'],
    'zh-hant': ['超級英雄名字產生器', '給你下一個披風英雄起個響亮的代號。'],
  },
  'villain-name': {
    es: ['Generador de nombres de villano', 'Nombres siniestros para el antagonista de tu historia.'],
    'pt-br': ['Gerador de nomes de vilão', 'Nomes sinistros para o antagonista da sua história.'],
    ja: ['悪役名ジェネレーター', '物語の敵役にふさわしい不穏な名前。'],
    de: ['Schurken-Namensgenerator', 'Finstere Namen für den Gegenspieler deiner Geschichte.'],
    fr: ['Générateur de noms de méchant', 'Noms sinistres pour l’antagoniste de ton histoire.'],
    hi: ['विलेन नाम जनरेटर', 'आपकी कहानी के खलनायक के लिए ख़तरनाक नाम।'],
    'zh-hans': ['反派名字生成器', '给你故事里的反派起个阴森的名字。'],
    'zh-hant': ['反派名字產生器', '給你故事裡的反派起個陰森的名字。'],
  },
  'dragon-name': {
    es: ['Generador de nombres de dragón', 'Nombres épicos para dragones y guivernos.'],
    'pt-br': ['Gerador de nomes de dragão', 'Nomes épicos para dragões e serpes.'],
    ja: ['ドラゴン名ジェネレーター', '竜と飛竜にふさわしい壮大な名前。'],
    de: ['Drachen-Namensgenerator', 'Epische Namen für mächtige Drachen und Lindwürmer.'],
    fr: ['Générateur de noms de dragon', 'Noms épiques pour dragons et vouivres.'],
    hi: ['ड्रैगन नाम जनरेटर', 'ताक़तवर ड्रैगन और सर्पों के लिए भव्य नाम।'],
    'zh-hans': ['巨龙名字生成器', '给强大的龙与蛟起个史诗感的名字。'],
    'zh-hant': ['巨龍名字產生器', '給強大的龍與蛟起個史詩感的名字。'],
  },
  'spaceship-name': {
    es: ['Generador de nombres de nave espacial', 'Nombres para naves, cruceros y exploradoras.'],
    'pt-br': ['Gerador de nomes de nave espacial', 'Nomes para naves, cruzadores e exploradoras.'],
    ja: ['宇宙船名ジェネレーター', '恒星間船・巡洋艦・探査船の名前。'],
    de: ['Raumschiff-Namensgenerator', 'Namen für Raumschiffe, Kreuzer und Forschungsschiffe.'],
    fr: ['Générateur de noms de vaisseau', 'Noms pour vaisseaux, croiseurs et explorateurs.'],
    hi: ['अंतरिक्ष यान नाम जनरेटर', 'स्टारशिप, क्रूज़र और खोजी यानों के नाम।'],
    'zh-hans': ['飞船名字生成器', '星舰、巡洋舰、探索船的名字。'],
    'zh-hant': ['飛船名字產生器', '星艦、巡洋艦、探索船的名字。'],
  },
  'robot-name': {
    es: ['Generador de nombres de robot', 'Nombres para androides, mechas y unidades de IA.'],
    'pt-br': ['Gerador de nomes de robô', 'Nomes para androides, mechas e unidades de IA.'],
    ja: ['ロボット名ジェネレーター', 'アンドロイド・メカ・AIユニットの名前。'],
    de: ['Roboter-Namensgenerator', 'Namen für Androiden, Mechs und KI-Einheiten.'],
    fr: ['Générateur de noms de robot', 'Noms pour androïdes, mechas et unités d’IA.'],
    hi: ['रोबोट नाम जनरेटर', 'एंड्रॉइड, मेक और एआई यूनिट के नाम।'],
    'zh-hans': ['机器人名字生成器', '仿生人、机甲与AI单元的名字。'],
    'zh-hant': ['機器人名字產生器', '仿生人、機甲與AI單元的名字。'],
  },
  'guild-name': {
    es: ['Generador de nombres de gremio', 'Nombres de clan y gremio para tu grupo de juego.'],
    'pt-br': ['Gerador de nomes de guilda', 'Nomes de clã e guilda para o seu grupo de jogo.'],
    ja: ['ギルド名ジェネレーター', 'クランやギルドにつける名前。'],
    de: ['Gilden-Namensgenerator', 'Clan- und Gildennamen für deine Spielgruppe.'],
    fr: ['Générateur de noms de guilde', 'Noms de clan et de guilde pour ton groupe de jeu.'],
    hi: ['गिल्ड नाम जनरेटर', 'आपकी गेमिंग टीम के लिए क्लैन और गिल्ड नाम।'],
    'zh-hans': ['公会名字生成器', '给你的战队或公会起名。'],
    'zh-hant': ['公會名字產生器', '給你的戰隊或公會起名。'],
  },
  'pirate-name': {
    es: ['Generador de nombres de pirata', 'Nombres y apodos para lobos de mar.'],
    'pt-br': ['Gerador de nomes de pirata', 'Nomes e apelidos para lobos do mar.'],
    ja: ['海賊名ジェネレーター', '海の荒くれ者にふさわしい名前と異名。'],
    de: ['Piraten-Namensgenerator', 'Namen und Beinamen für Seebären.'],
    fr: ['Générateur de noms de pirate', 'Noms et surnoms pour loups de mer.'],
    hi: ['समुद्री डाकू नाम जनरेटर', 'समुद्री लुटेरों के नाम और उपनाम।'],
    'zh-hans': ['海盗名字生成器', '给海上亡命之徒起名和绰号。'],
    'zh-hant': ['海盜名字產生器', '給海上亡命之徒起名和綽號。'],
  },
  'magic-spell': {
    es: ['Generador de nombres de hechizo', 'Nombres de conjuros para tu partida o tu relato.'],
    'pt-br': ['Gerador de nomes de magia', 'Nomes de feitiços para a sua mesa ou história.'],
    ja: ['魔法名ジェネレーター', '卓や物語で使う呪文の名前。'],
    de: ['Zauber-Namensgenerator', 'Zaubernamen für deine Runde oder Geschichte.'],
    fr: ['Générateur de noms de sort', 'Noms de sortilèges pour ta partie ou ton récit.'],
    hi: ['जादुई मंत्र नाम जनरेटर', 'आपके खेल या कहानी के लिए मंत्रों के नाम।'],
    'zh-hans': ['魔法名字生成器', '给你的跑团或故事起法术名。'],
    'zh-hant': ['魔法名字產生器', '給你的跑團或故事起法術名。'],
  },
  'sword-name': {
    es: ['Generador de nombres de arma', 'Nombres para espadas legendarias y armas míticas.'],
    'pt-br': ['Gerador de nomes de arma', 'Nomes para espadas lendárias e armas míticas.'],
    ja: ['武器名ジェネレーター', '伝説の剣や神話の武器につける名前。'],
    de: ['Waffen-Namensgenerator', 'Namen für legendäre Schwerter und mythische Waffen.'],
    fr: ['Générateur de noms d’arme', 'Noms pour épées légendaires et armes mythiques.'],
    hi: ['हथियार नाम जनरेटर', 'पौराणिक तलवारों और हथियारों के नाम।'],
    'zh-hans': ['武器名字生成器', '给传说之剑与神话兵器起名。'],
    'zh-hant': ['武器名字產生器', '給傳說之劍與神話兵器起名。'],
  },
  'tavern-name': {
    es: ['Generador de nombres de taberna', 'Nombres de posadas y tabernas para tu mundo.'],
    'pt-br': ['Gerador de nomes de taverna', 'Nomes de estalagens e tavernas para o seu mundo.'],
    ja: ['酒場名ジェネレーター', '世界観に合う宿屋・酒場の名前。'],
    de: ['Tavernen-Namensgenerator', 'Namen für Gasthäuser und Tavernen deiner Welt.'],
    fr: ['Générateur de noms de taverne', 'Noms d’auberges et de tavernes pour ton univers.'],
    hi: ['सराय नाम जनरेटर', 'आपकी दुनिया के लिए सराय और मधुशाला के नाम।'],
    'zh-hans': ['酒馆名字生成器', '给你的世界起客栈与酒馆的名字。'],
    'zh-hant': ['酒館名字產生器', '給你的世界起客棧與酒館的名字。'],
  },
  'dungeon-name': {
    es: ['Generador de nombres de mazmorra', 'Nombres de mazmorras y ruinas para tu campaña.'],
    'pt-br': ['Gerador de nomes de masmorra', 'Nomes de masmorras e ruínas para a sua campanha.'],
    ja: ['ダンジョン名ジェネレーター', 'キャンペーンで使う迷宮と遺跡の名前。'],
    de: ['Dungeon-Namensgenerator', 'Namen für Verliese und Ruinen deiner Kampagne.'],
    fr: ['Générateur de noms de donjon', 'Noms de donjons et de ruines pour ta campagne.'],
    hi: ['डंजन नाम जनरेटर', 'आपके अभियान के लिए तहख़ानों और खंडहरों के नाम।'],
    'zh-hans': ['地下城名字生成器', '给你的战役起地牢与遗迹的名字。'],
    'zh-hant': ['地下城名字產生器', '給你的戰役起地牢與遺跡的名字。'],
  },
  'island-name': {
    es: ['Generador de nombres de isla', 'Nombres de islas para mapas, juegos y relatos.'],
    'pt-br': ['Gerador de nomes de ilha', 'Nomes de ilhas para mapas, jogos e histórias.'],
    ja: ['島の名前ジェネレーター', '地図・ゲーム・物語に使う島の名前。'],
    de: ['Insel-Namensgenerator', 'Inselnamen für Karten, Spiele und Geschichten.'],
    fr: ['Générateur de noms d’île', 'Noms d’îles pour cartes, jeux et récits.'],
    hi: ['द्वीप नाम जनरेटर', 'नक़्शों, खेलों और कहानियों के लिए द्वीपों के नाम।'],
    'zh-hans': ['海岛名字生成器', '给地图、游戏和故事里的岛屿起名。'],
    'zh-hant': ['海島名字產生器', '給地圖、遊戲和故事裡的島嶼起名。'],
  },
  'potion-name': {
    es: ['Generador de nombres de poción', 'Nombres de pociones y elixires para tu mundo.'],
    'pt-br': ['Gerador de nomes de poção', 'Nomes de poções e elixires para o seu mundo.'],
    ja: ['ポーション名ジェネレーター', '世界観に合う秘薬とエリクサーの名前。'],
    de: ['Trank-Namensgenerator', 'Namen für Tränke und Elixiere deiner Welt.'],
    fr: ['Générateur de noms de potion', 'Noms de potions et d’élixirs pour ton univers.'],
    hi: ['औषधि नाम जनरेटर', 'आपकी दुनिया के लिए औषधियों और अमृत के नाम।'],
    'zh-hans': ['药水名字生成器', '给你的世界起药剂与灵药的名字。'],
    'zh-hant': ['藥水名字產生器', '給你的世界起藥劑與靈藥的名字。'],
  },
  'spy-codename': {
    es: ['Generador de nombres en clave de espía', 'Alias de agente para tu misión secreta.'],
    'pt-br': ['Gerador de codinomes de espião', 'Codinomes de agente para a sua missão secreta.'],
    ja: ['スパイ コードネーム ジェネレーター', '秘密任務に使う工作員の暗号名。'],
    de: ['Spionage-Decknamen-Generator', 'Agenten-Decknamen für deine geheime Mission.'],
    fr: ['Générateur de noms de code d’espion', 'Pseudonymes d’agent pour ta mission secrète.'],
    hi: ['जासूसी कोडनेम जनरेटर', 'आपके गुप्त मिशन के लिए एजेंट के कोडनेम।'],
    'zh-hans': ['特工代号生成器', '给你的秘密任务起个特工代号。'],
    'zh-hant': ['特務代號產生器', '給你的祕密任務起個特務代號。'],
  },
  'cocktail-name': {
    es: ['Generador de nombres de cóctel', 'Nombres con estilo para tu carta de bebidas.'],
    'pt-br': ['Gerador de nomes de coquetel', 'Nomes com estilo para a sua carta de drinques.'],
    ja: ['カクテル名ジェネレーター', 'ドリンクメニューに映える名前。'],
    de: ['Cocktail-Namensgenerator', 'Stilvolle Namen für deine Getränkekarte.'],
    fr: ['Générateur de noms de cocktail', 'Des noms qui claquent pour ta carte des boissons.'],
    hi: ['कॉकटेल नाम जनरेटर', 'आपके ड्रिंक मेन्यू के लिए स्टाइलिश नाम।'],
    'zh-hans': ['鸡尾酒名字生成器', '给你的酒单起个有腔调的名字。'],
    'zh-hant': ['調酒名字產生器', '給你的酒單起個有格調的名字。'],
  },
  'band-name': {
    es: ['Generador de nombres de banda', 'Nombres de grupo para tu próximo proyecto musical.'],
    'pt-br': ['Gerador de nomes de banda', 'Nomes de banda para o seu próximo projeto musical.'],
    ja: ['バンド名ジェネレーター', '次の音楽プロジェクトに使うバンド名。'],
    de: ['Bandnamen-Generator', 'Bandnamen für dein nächstes Musikprojekt.'],
    fr: ['Générateur de noms de groupe', 'Noms de groupe pour ton prochain projet musical.'],
    hi: ['बैंड नाम जनरेटर', 'आपके अगले म्यूज़िक प्रोजेक्ट के लिए बैंड के नाम।'],
    'zh-hans': ['乐队名字生成器', '给你的下一个音乐计划起个队名。'],
    'zh-hant': ['樂團名字產生器', '給你的下一個音樂計畫起個團名。'],
  },
  'username-generator': {
    es: ['Generador de nombres de usuario', 'Alias disponibles para juegos y redes sociales.'],
    'pt-br': ['Gerador de nomes de usuário', 'Apelidos para games e redes sociais.'],
    ja: ['ユーザー名ジェネレーター', 'ゲームやSNSで使えるハンドルネーム。'],
    de: ['Benutzernamen-Generator', 'Nicknames für Spiele und soziale Netzwerke.'],
    fr: ['Générateur de pseudos', 'Pseudos pour les jeux et les réseaux sociaux.'],
    hi: ['यूज़रनेम जनरेटर', 'गेम और सोशल मीडिया के लिए यूज़रनेम।'],
    'zh-hans': ['用户名生成器', '游戏和社交平台都能用的昵称。'],
    'zh-hant': ['使用者名稱產生器', '遊戲和社群平台都能用的暱稱。'],
  },
  'wifi-name': {
    es: ['Generador de nombres de wifi', 'Nombres de red con gracia para tu router.'],
    'pt-br': ['Gerador de nomes de wi-fi', 'Nomes de rede engraçados para o seu roteador.'],
    ja: ['Wi-Fi名ジェネレーター', 'ルーターにつけて笑えるネットワーク名。'],
    de: ['WLAN-Namensgenerator', 'Witzige Netzwerknamen für deinen Router.'],
    fr: ['Générateur de noms de wifi', 'Des noms de réseau qui font sourire.'],
    hi: ['वाई-फ़ाई नाम जनरेटर', 'आपके राउटर के लिए मज़ेदार नेटवर्क नाम।'],
    'zh-hans': ['WiFi名字生成器', '给你的路由器起个好笑的网络名。'],
    'zh-hant': ['WiFi名字產生器', '給你的路由器起個好笑的網路名。'],
  },
};

/**
 * wifi-name만 풀을 갈아 끼운다.
 *
 * 영어판은 "The LAN Before Time"처럼 영어 발음에 기댄 말장난이라 옮기면 하나도
 * 안 웃긴다. 언어마다 그 말로 성립하는 농담을 새로 썼다 — 스페인어의
 * "Wi-Fi, Wi-Fo, Wi-Fum"이나 중국어의 "隔壁老王家的网" 같은 것.
 */
const WIFI_POOL: Record<GeneratorIntlLang, string[]> = {
  es: ['Wi-Fi, Wi-Fo, Wi-Fum', 'La red de al lado', 'No es tu wifi', 'Contraseña: pregúntame',
    'Router con carácter', 'Aquí no hay internet', 'Te veo conectarte', 'El wifi del vecino',
    'Conéctate y paga', 'Módem sin fronteras', 'Solo para invitados educados', 'Zona sin cobertura (mentira)'],
  'pt-br': ['Wi-Fi, Wi-Fo, Wi-Fum', 'A rede do vizinho', 'Esse não é o seu', 'Senha: pergunte com jeitinho',
    'Roteador mal-humorado', 'Aqui não tem internet', 'Estou te vendo conectar', 'Vai pagar quanto?',
    'Modem sem fronteiras', 'Só para visitas educadas', 'Área sem sinal (mentira)', 'Liga e desliga que resolve'],
  ja: ['隣の家のWi-Fi', 'ここに電波はない（うそ）', 'つなぐ前に一声かけて', 'パスワードは秘密',
    '機嫌の悪いルーター', '見てるぞ', '通信料は自腹で', '電子レンジに弱い',
    '再起動しました', '客用（礼儀正しい人のみ）', '二階まで届かない', 'たぶんつながる'],
  de: ['Das Netz von nebenan', 'Hier ist kein Internet', 'Nicht deins', 'Passwort: frag nett',
    'Router mit Laune', 'Ich sehe dich verbinden', 'Bitte nicht streamen', 'Reicht nicht bis oben',
    'Wurde neu gestartet', 'Nur für höfliche Gäste', 'Kabel wäre schneller', 'Funktioniert meistens'],
  fr: ['Le wifi du voisin', 'Ici pas d’internet', 'Ce n’est pas le tien', 'Mot de passe : demande gentiment',
    'Routeur de mauvaise humeur', 'Je te vois te connecter', 'Merci de ne pas streamer', 'Ne monte pas à l’étage',
    'Redémarré ce matin', 'Réservé aux invités polis', 'Le câble serait plus rapide', 'Ça marche à peu près'],
  hi: ['पड़ोसी का वाई-फ़ाई', 'यहाँ नेट नहीं है (झूठ)', 'यह आपका नहीं है', 'पासवर्ड: प्यार से पूछिए',
    'राउटर का मूड ख़राब है', 'मैं देख रहा हूँ', 'कृपया डाउनलोड न करें', 'ऊपर की मंज़िल तक नहीं जाता',
    'अभी-अभी रीस्टार्ट किया', 'सिर्फ़ शरीफ़ मेहमानों के लिए', 'तार से तेज़ चलेगा', 'ज़्यादातर चल जाता है'],
  'zh-hans': ['隔壁老王家的网', '这里没有网（骗你的）', '这不是你家的', '密码要好好问',
    '路由器今天心情不好', '我看得见你连上来', '请不要下载', '二楼收不到',
    '刚刚重启过', '只招待有礼貌的客人', '插网线会更快', '大概能用'],
  'zh-hant': ['隔壁老王家的網', '這裡沒有網（騙你的）', '這不是你家的', '密碼要好好問',
    '路由器今天心情不好', '我看得見你連上來', '請不要下載', '二樓收不到',
    '剛剛重開過', '只招待有禮貌的客人', '插網路線會更快', '大概能用'],
};

/**
 * 그 언어의 생성기 20종. 풀은 영어판을 그대로 물려받고 문구만 갈아 끼운다.
 * wifi-name은 items도 함께 바꾼다.
 */
function build(lang: GeneratorIntlLang): Generator[] {
  return GENERATORS_EN.map(g => {
    const t = TEXT[g.slug]?.[lang];
    if (!t) return g;                       // 새 생성기가 늘면 영어 그대로 나간다
    const out: Generator = {
      ...g,
      title: t[0],
      desc: t[1],
      category: CATEGORY[lang][g.category] ?? g.category,
    };
    if (g.slug === 'wifi-name') out.items = WIFI_POOL[lang];
    return out;
  });
}

export const GENERATORS_INTL: Record<GeneratorIntlLang, Generator[]> = {
  es: build('es'), 'pt-br': build('pt-br'), ja: build('ja'), de: build('de'),
  fr: build('fr'), hi: build('hi'), 'zh-hans': build('zh-hans'), 'zh-hant': build('zh-hant'),
};

export const GENERATORS_INTL_MAP: Record<GeneratorIntlLang, Record<string, Generator>> =
  Object.fromEntries(
    (Object.keys(GENERATORS_INTL) as GeneratorIntlLang[])
      .map(l => [l, Object.fromEntries(GENERATORS_INTL[l].map(g => [g.slug, g]))]),
  ) as Record<GeneratorIntlLang, Record<string, Generator>>;
