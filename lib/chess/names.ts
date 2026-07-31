/**
 * 오프닝 이름 — 계열 이름 한 벌에서 열 언어를 조립한다.
 *
 * "시실리안 방어, 나이도르프 변화"를 150줄 × 열 언어로 적으면 1500줄이고, 한 줄이
 * 어긋나도 그 언어를 읽는 사람만 안다. 그래서 이름을 두 조각으로 나눈다.
 *  - 계열 낱말: Sicilian / Siciliana / sicilienne / Sizilianische / 西西里 …
 *  - 성질 낱말: Defence / Defensa / Verteidigung / 防御 …  (열 벌만 적는다)
 * 붙이는 순서는 언어마다 다르다 — 영어는 "Sicilian Defence", 스페인어는
 * "Defensa siciliana", 독일어는 "Sizilianische Verteidigung", 중국어는 "西西里防御"다.
 * 그 규칙을 언어마다 한 번 적어 두면 계열을 더할 때 낱말 하나만 늘면 된다.
 *
 * 중국어는 간체와 번체를 따로 적는다. 글자만 바뀌는 것이 아니라 낱말이 갈리는
 * 자리가 있어서(弃兵/棄兵, 后翼/後翼) 한쪽을 기계로 바꾸면 어긋난다.
 */
import type { L, Lang } from '../i18n/lang.ts';

export type Kind =
  | 'opening' | 'defence' | 'gambit' | 'attack' | 'system' | 'game'
  | 'variation' | 'countergambit' | 'trap' | 'mate';

/**
 * 이름 조각.
 *
 * es·pt·fr·de를 적지 않으면 영어 낱말을 그대로 쓴다 — Najdorf·Réti처럼 사람
 * 이름은 라틴 문자권에서 그대로다. 형용사인 낱말은 `adj`를 켠다(독일어에서만
 * 갈린다: 사람 이름은 "Larsen-Eröffnung", 형용사는 "Englische Eröffnung").
 */
export interface Word {
  en: string;
  ko: string;
  ja: string;
  hi: string;
  zh: string;
  tw: string;
  es?: string;
  pt?: string;
  fr?: string;
  de?: string;
  adj?: boolean;
  /** 성질 낱말을 붙이지 않고 통째로 쓰는 언어. true면 열 언어 모두 */
  whole?: Partial<L<string>> | true;
}

const KIND_WORD: Record<Kind, L<string>> = {
  opening: { ko: '오프닝', en: 'Opening', es: 'Apertura', pt: 'Abertura', ja: 'オープニング', de: 'Eröffnung', fr: 'Ouverture', hi: 'ओपनिंग', zh: '开局', tw: '開局' },
  defence: { ko: '방어', en: 'Defence', es: 'Defensa', pt: 'Defesa', ja: 'ディフェンス', de: 'Verteidigung', fr: 'Défense', hi: 'डिफेंस', zh: '防御', tw: '防禦' },
  gambit: { ko: '갬빗', en: 'Gambit', es: 'Gambito', pt: 'Gambito', ja: 'ギャンビット', de: 'Gambit', fr: 'Gambit', hi: 'गैम्बिट', zh: '弃兵', tw: '棄兵' },
  attack: { ko: '어택', en: 'Attack', es: 'Ataque', pt: 'Ataque', ja: 'アタック', de: 'Angriff', fr: 'Attaque', hi: 'अटैक', zh: '进攻', tw: '進攻' },
  system: { ko: '시스템', en: 'System', es: 'Sistema', pt: 'Sistema', ja: 'システム', de: 'System', fr: 'Système', hi: 'सिस्टम', zh: '体系', tw: '體系' },
  game: { ko: '게임', en: 'Game', es: 'Apertura', pt: 'Abertura', ja: 'ゲーム', de: 'Partie', fr: 'Partie', hi: 'गेम', zh: '开局', tw: '開局' },
  variation: { ko: '변화', en: 'Variation', es: 'Variante', pt: 'Variante', ja: 'バリエーション', de: 'Variante', fr: 'Variante', hi: 'वेरिएशन', zh: '变例', tw: '變例' },
  countergambit: { ko: '카운터갬빗', en: 'Countergambit', es: 'Contragambito', pt: 'Contragambito', ja: 'カウンターギャンビット', de: 'Gegengambit', fr: 'Contre-gambit', hi: 'काउंटरगैम्बिट', zh: '反弃兵', tw: '反棄兵' },
  trap: { ko: '함정', en: 'Trap', es: 'Trampa', pt: 'Armadilha', ja: 'トラップ', de: 'Falle', fr: 'Piège', hi: 'ट्रैप', zh: '陷阱', tw: '陷阱' },
  mate: { ko: '메이트', en: 'Mate', es: 'Mate', pt: 'Mate', ja: 'メイト', de: 'Matt', fr: 'Mat', hi: 'मेट', zh: '杀', tw: '殺' },
};

/**
 * 그 언어에서 낱말을 어떻게 잇는가.
 *
 * 스페인어·포르투갈어·프랑스어는 성질 낱말이 앞에 온다(Defensa siciliana).
 * 독일어는 사람 이름이면 하이픈, 형용사면 빈칸이다. 중국어는 붙여 쓴다.
 */
function join(lang: Lang, word: string, kind: string, adj: boolean): string {
  switch (lang) {
    case 'es':
    case 'pt':
    case 'fr':
      return `${kind} ${word}`;
    case 'de':
      // 형용사는 뒤 명사의 성에 맞춰 어미가 붙는다 — Gambit(중성)만 -es다
      return adj ? `${kind === 'Gambit' ? `${word}es` : word} ${kind}` : `${word}-${kind}`;
    case 'ja':
      return `${word}・${kind}`;
    case 'zh':
    case 'tw':
      return `${word}${kind}`;
    default:
      return `${word} ${kind}`;
  }
}

export function wordName(w: Word, kind: Kind, lang: Lang): string {
  const pick = (w as unknown as Record<string, string | undefined>)[lang];
  if (w.whole === true) return pick ?? w.en;
  const whole = w.whole?.[lang];
  if (whole) return whole;
  return join(lang, pick ?? w.en, KIND_WORD[kind][lang], w.adj ?? false);
}

interface Entry {
  word: Word;
  kind: Kind;
}

/** 계열 — 이름의 앞머리. 갈래는 쉼표 뒤에 붙는다 */
export const FAMILIES: Record<string, Entry> = {
  'kings-pawn': { kind: 'opening', word: { en: "King's Pawn", es: 'de peón de rey', pt: 'do peão do rei', fr: 'du pion roi', ko: '킹 폰', ja: 'キングポーン', hi: 'किंग पॉन', zh: '王兵', tw: '王兵', whole: { de: 'Königsbauereröffnung' } } },
  'open-game': { kind: 'game', word: { en: 'Open', es: 'abierta', pt: 'aberta', fr: 'ouverte', de: 'Offene', adj: true, ko: '오픈', ja: 'オープン', hi: 'ओपन', zh: '开放性', tw: '開放性' } },
  'ruy-lopez': { kind: 'opening', word: { en: 'Ruy Lopez', es: 'Apertura Española', pt: 'Abertura Espanhola', fr: 'Partie espagnole', de: 'Spanische Partie', ko: '루이 로페즈', ja: 'ルイ・ロペス', hi: 'रुय लोपेज़', zh: '西班牙开局', tw: '西班牙開局', whole: true } },
  italian: { kind: 'game', word: { en: 'Italian', es: 'italiana', pt: 'italiana', fr: 'italienne', de: 'Italienische', adj: true, ko: '이탈리안', ja: 'イタリアン', hi: 'इटैलियन', zh: '意大利', tw: '義大利' } },
  scotch: { kind: 'game', word: { en: 'Scotch', es: 'escocesa', pt: 'escocesa', fr: 'écossaise', de: 'Schottische', adj: true, ko: '스카치', ja: 'スコッチ', hi: 'स्कॉच', zh: '苏格兰', tw: '蘇格蘭' } },
  'scotch-gambit': { kind: 'gambit', word: { en: 'Scotch', es: 'escocés', pt: 'escocês', fr: 'écossais', de: 'Schottisch', adj: true, ko: '스카치', ja: 'スコッチ', hi: 'स्कॉच', zh: '苏格兰', tw: '蘇格蘭' } },
  petrov: { kind: 'defence', word: { en: 'Petrov', de: 'Russische', adj: true, ko: '페트로프', ja: 'ペトロフ', hi: 'पेत्रोव', zh: '彼得罗夫', tw: '彼得羅夫' } },
  philidor: { kind: 'defence', word: { en: 'Philidor', ko: '필리도르', ja: 'フィリドール', hi: 'फिलिडोर', zh: '菲利多尔', tw: '菲利多爾' } },
  'kings-gambit': { kind: 'gambit', word: { en: "King's", es: 'de rey', pt: 'do rei', fr: 'du roi', ko: '킹스', ja: 'キングス', hi: 'किंग्स', zh: '王翼', tw: '王翼', whole: { de: 'Königsgambit' } } },
  vienna: { kind: 'game', word: { en: 'Vienna', es: 'vienesa', pt: 'vienense', fr: 'viennoise', de: 'Wiener', adj: true, ko: '비엔나', ja: 'ウィーン', hi: 'वियना', zh: '维也纳', tw: '維也納' } },
  'vienna-gambit': { kind: 'gambit', word: { en: 'Vienna', es: 'vienés', pt: 'vienense', fr: 'viennois', ko: '비엔나', ja: 'ウィーン', hi: 'वियना', zh: '维也纳', tw: '維也納', whole: { de: 'Wiener Gambit' } } },
  bishops: { kind: 'opening', word: { en: "Bishop's", es: 'de alfil', pt: 'do bispo', fr: 'du fou', ko: '비숍', ja: 'ビショップ', hi: 'बिशप', zh: '象', tw: '象', whole: { de: 'Läuferspiel' } } },
  'four-knights': { kind: 'game', word: { en: 'Four Knights', es: 'de los cuatro caballos', pt: 'dos quatro cavalos', fr: 'des quatre cavaliers', ko: '포 나이츠', ja: 'フォー・ナイツ', hi: 'फोर नाइट्स', zh: '四马', tw: '四馬', whole: { de: 'Vierspringerspiel' } } },
  'three-knights': { kind: 'game', word: { en: 'Three Knights', es: 'de los tres caballos', pt: 'dos três cavalos', fr: 'des trois cavaliers', ko: '스리 나이츠', ja: 'スリー・ナイツ', hi: 'थ्री नाइट्स', zh: '三马', tw: '三馬', whole: { de: 'Dreispringerspiel' } } },
  ponziani: { kind: 'opening', word: { en: 'Ponziani', ko: '폰치아니', ja: 'ポンツィアーニ', hi: 'पोंज़ियानी', zh: '庞齐亚尼', tw: '龐齊亞尼' } },
  danish: { kind: 'gambit', word: { en: 'Danish', es: 'danés', pt: 'dinamarquês', fr: 'danois', de: 'Nordisch', adj: true, ko: '데니시', ja: 'デンマーク', hi: 'डेनिश', zh: '丹麦', tw: '丹麥' } },
  'centre-game': { kind: 'game', word: { en: 'Centre', es: 'del centro', pt: 'do centro', fr: 'du centre', ko: '센터', ja: 'センター', hi: 'सेंटर', zh: '中心', tw: '中心', whole: { de: 'Zentrumseröffnung' } } },
  latvian: { kind: 'gambit', word: { en: 'Latvian', es: 'letón', pt: 'letão', fr: 'letton', de: 'Lettisch', adj: true, ko: '라트비안', ja: 'ラトビアン', hi: 'लातवियन', zh: '拉脱维亚', tw: '拉脫維亞' } },
  elephant: { kind: 'gambit', word: { en: 'Elephant', es: 'del elefante', pt: 'do elefante', fr: "de l'éléphant", de: 'Elefanten', ko: '엘리펀트', ja: 'エレファント', hi: 'एलिफेंट', zh: '大象', tw: '大象' } },
  damiano: { kind: 'defence', word: { en: 'Damiano', ko: '다미아노', ja: 'ダミアーノ', hi: 'दामियानो', zh: '达米亚诺', tw: '達米亞諾' } },
  shilling: { kind: 'gambit', word: { en: 'Blackburne Shilling', de: 'Blackburne-Shilling', ko: '블랙번 실링', ja: 'ブラックバーン・シリング', hi: 'ब्लैकबर्न शिलिंग', zh: '布莱克本先令', tw: '布萊克本先令' } },
  halloween: { kind: 'gambit', word: { en: 'Halloween', es: 'de Halloween', pt: 'de Halloween', fr: "d'Halloween", ko: '핼러윈', ja: 'ハロウィン', hi: 'हैलोवीन', zh: '万圣节', tw: '萬聖節' } },
  'scholars-mate': { kind: 'mate', word: { en: "Scholar's", es: 'del pastor', pt: 'do pastor', fr: 'du berger', ko: '학자', ja: 'スカラーズ', hi: 'स्कॉलर', zh: '学者', tw: '學者', whole: { de: 'Schäfermatt' } } },
  'fools-mate': { kind: 'mate', word: { en: "Fool's", es: 'del loco', pt: 'do bobo', fr: 'du sot', ko: '바보', ja: 'フールズ', hi: 'फूल्स', zh: '傻瓜', tw: '傻瓜', whole: { de: 'Narrenmatt' } } },
  legal: { kind: 'trap', word: { en: 'Légal', ko: '르갈', ja: 'ルガール', hi: 'लेगल', zh: '勒加尔', tw: '勒加爾' } },
  sicilian: { kind: 'defence', word: { en: 'Sicilian', es: 'siciliana', pt: 'siciliana', fr: 'sicilienne', de: 'Sizilianische', adj: true, ko: '시실리안', ja: 'シシリアン', hi: 'सिसिलियन', zh: '西西里', tw: '西西里' } },
  french: { kind: 'defence', word: { en: 'French', es: 'francesa', pt: 'francesa', fr: 'française', de: 'Französische', adj: true, ko: '프렌치', ja: 'フレンチ', hi: 'फ्रेंच', zh: '法兰西', tw: '法蘭西' } },
  'caro-kann': { kind: 'defence', word: { en: 'Caro-Kann', ko: '카로칸', ja: 'カロ・カン', hi: 'कारो-कान', zh: '卡罗-卡恩', tw: '卡羅-卡恩' } },
  scandinavian: { kind: 'defence', word: { en: 'Scandinavian', es: 'escandinava', pt: 'escandinava', fr: 'scandinave', de: 'Skandinavische', adj: true, ko: '스칸디나비안', ja: 'スカンジナビアン', hi: 'स्कैंडिनेवियन', zh: '斯堪的纳维亚', tw: '斯堪的納維亞' } },
  pirc: { kind: 'defence', word: { en: 'Pirc', ko: '피르츠', ja: 'ピルツ', hi: 'पिर्क', zh: '皮尔茨', tw: '皮爾茨' } },
  modern: { kind: 'defence', word: { en: 'Modern', es: 'moderna', pt: 'moderna', fr: 'moderne', de: 'Moderne', adj: true, ko: '모던', ja: 'モダン', hi: 'मॉडर्न', zh: '现代', tw: '現代' } },
  alekhine: { kind: 'defence', word: { en: "Alekhine's", es: 'Alekhine', pt: 'Alekhine', fr: 'Alekhine', de: 'Aljechin', ko: '알레힌', ja: 'アリョーヒン', hi: 'अलेखिन', zh: '阿廖欣', tw: '阿廖欣' } },
  'nimzowitsch-def': { kind: 'defence', word: { en: 'Nimzowitsch', ko: '님초비치', ja: 'ニムツォヴィッチ', hi: 'निम्ज़ोविच', zh: '尼姆佐维奇', tw: '尼姆佐維奇' } },
  owen: { kind: 'defence', word: { en: "Owen's", es: 'Owen', pt: 'Owen', fr: 'Owen', de: 'Owen', ko: '오언', ja: 'オーウェン', hi: 'ओवेन', zh: '欧文', tw: '歐文' } },
  'st-george': { kind: 'defence', word: { en: 'St. George', ko: '세인트 조지', ja: 'セント・ジョージ', hi: 'सेंट जॉर्ज', zh: '圣乔治', tw: '聖喬治' } },
  'queens-pawn': { kind: 'opening', word: { en: "Queen's Pawn", es: 'de peón de dama', pt: 'do peão da dama', fr: 'du pion dame', ko: '퀸 폰', ja: 'クイーンポーン', hi: 'क्वीन पॉन', zh: '后兵', tw: '後兵', whole: { de: 'Damenbauereröffnung' } } },
  'queens-gambit': { kind: 'gambit', word: { en: "Queen's", es: 'de dama', pt: 'da dama', fr: 'dame', ko: '퀸즈', ja: 'クイーンズ', hi: 'क्वीन्स', zh: '后翼', tw: '後翼', whole: { de: 'Damengambit' } } },
  slav: { kind: 'defence', word: { en: 'Slav', es: 'eslava', pt: 'eslava', fr: 'slave', de: 'Slawische', adj: true, ko: '슬라브', ja: 'スラブ', hi: 'स्लाव', zh: '斯拉夫', tw: '斯拉夫' } },
  'semi-slav': { kind: 'defence', word: { en: 'Semi-Slav', es: 'semieslava', pt: 'semi-eslava', fr: 'semi-slave', de: 'Halbslawische', adj: true, ko: '세미슬라브', ja: 'セミスラブ', hi: 'सेमी-स्लाव', zh: '半斯拉夫', tw: '半斯拉夫' } },
  albin: { kind: 'countergambit', word: { en: 'Albin', ko: '알빈', ja: 'アルビン', hi: 'अल्बिन', zh: '阿尔宾', tw: '阿爾賓' } },
  chigorin: { kind: 'defence', word: { en: 'Chigorin', ko: '치고린', ja: 'チゴリン', hi: 'चिगोरिन', zh: '契戈林', tw: '契戈林' } },
  baltic: { kind: 'defence', word: { en: 'Baltic', es: 'báltica', pt: 'báltica', fr: 'balte', de: 'Baltische', adj: true, ko: '발틱', ja: 'バルティック', hi: 'बाल्टिक', zh: '波罗的海', tw: '波羅的海' } },
  london: { kind: 'system', word: { en: 'London', ko: '런던', ja: 'ロンドン', hi: 'लंदन', zh: '伦敦', tw: '倫敦' } },
  colle: { kind: 'system', word: { en: 'Colle', ko: '콜레', ja: 'コレ', hi: 'कोले', zh: '科莱', tw: '科萊' } },
  stonewall: { kind: 'attack', word: { en: 'Stonewall', ko: '스톤월', ja: 'ストーンウォール', hi: 'स्टोनवॉल', zh: '石墙', tw: '石牆' } },
  torre: { kind: 'attack', word: { en: 'Torre', ko: '토레', ja: 'トーレ', hi: 'टोरे', zh: '托雷', tw: '托雷' } },
  trompowsky: { kind: 'attack', word: { en: 'Trompowsky', ko: '트롬포프스키', ja: 'トロンプソフスキー', hi: 'ट्रोम्पोव्स्की', zh: '特朗波夫斯基', tw: '特朗波夫斯基' } },
  'blackmar-diemer': { kind: 'gambit', word: { en: 'Blackmar-Diemer', ko: '블랙마르-디머', ja: 'ブラックマー・ディーマー', hi: 'ब्लैकमार-डीमर', zh: '布莱克马-迪默', tw: '布萊克馬-迪默' } },
  veresov: { kind: 'attack', word: { en: 'Richter-Veresov', ko: '리히터-베레소프', ja: 'リヒター・ヴェレソフ', hi: 'रिक्टर-वेरेसोव', zh: '里希特-韦列索夫', tw: '里希特-韋列索夫' } },
  indian: { kind: 'defence', word: { en: 'Indian', es: 'india', pt: 'índia', fr: 'indienne', de: 'Indische', adj: true, ko: '인디안', ja: 'インディアン', hi: 'इंडियन', zh: '印度', tw: '印度' } },
  'nimzo-indian': { kind: 'defence', word: { en: 'Nimzo-Indian', es: 'nimzoindia', pt: 'nimzo-índia', fr: 'nimzo-indienne', de: 'Nimzowitsch-Indische', adj: true, ko: '님조-인디안', ja: 'ニムゾ・インディアン', hi: 'निम्ज़ो-इंडियन', zh: '尼姆佐印度', tw: '尼姆佐印度' } },
  'queens-indian': { kind: 'defence', word: { en: "Queen's Indian", es: 'india de dama', pt: 'índia da dama', fr: 'indienne de la dame', de: 'Damenindische', adj: true, ko: '퀸즈 인디안', ja: 'クイーンズ・インディアン', hi: 'क्वीन्स इंडियन', zh: '后翼印度', tw: '後翼印度' } },
  'bogo-indian': { kind: 'defence', word: { en: 'Bogo-Indian', es: 'bogoindia', pt: 'bogo-índia', fr: 'bogo-indienne', de: 'Bogoljubow-Indische', adj: true, ko: '보고-인디안', ja: 'ボゴ・インディアン', hi: 'बोगो-इंडियन', zh: '博戈印度', tw: '博戈印度' } },
  'kings-indian': { kind: 'defence', word: { en: "King's Indian", es: 'india de rey', pt: 'índia do rei', fr: 'indienne du roi', de: 'Königsindische', adj: true, ko: '킹스 인디안', ja: 'キングス・インディアン', hi: 'किंग्स इंडियन', zh: '王翼印度', tw: '王翼印度' } },
  grunfeld: { kind: 'defence', word: { en: 'Grünfeld', ko: '그륀펠트', ja: 'グリュンフェルト', hi: 'ग्रुनफेल्ड', zh: '格林菲尔德', tw: '格林菲爾德' } },
  benoni: { kind: 'defence', word: { en: 'Benoni', ko: '베노니', ja: 'ベノニ', hi: 'बेनोनी', zh: '贝诺尼', tw: '貝諾尼' } },
  benko: { kind: 'gambit', word: { en: 'Benko', ko: '벤코', ja: 'ベンコー', hi: 'बेंको', zh: '本科', tw: '本科' } },
  budapest: { kind: 'gambit', word: { en: 'Budapest', es: 'de Budapest', pt: 'de Budapeste', fr: 'de Budapest', ko: '부다페스트', ja: 'ブダペスト', hi: 'बुडापेस्ट', zh: '布达佩斯', tw: '布達佩斯' } },
  'old-indian': { kind: 'defence', word: { en: 'Old Indian', es: 'india antigua', pt: 'índia antiga', fr: 'vieille indienne', de: 'Altindische', adj: true, ko: '올드 인디안', ja: 'オールド・インディアン', hi: 'ओल्ड इंडियन', zh: '老印度', tw: '老印度' } },
  catalan: { kind: 'opening', word: { en: 'Catalan', es: 'catalana', pt: 'catalã', fr: 'catalane', de: 'Katalanische', adj: true, ko: '카탈란', ja: 'カタラン', hi: 'कैटलन', zh: '加泰罗尼亚', tw: '加泰羅尼亞' } },
  dutch: { kind: 'defence', word: { en: 'Dutch', es: 'holandesa', pt: 'holandesa', fr: 'hollandaise', de: 'Holländische', adj: true, ko: '더치', ja: 'ダッチ', hi: 'डच', zh: '荷兰', tw: '荷蘭' } },
  englund: { kind: 'gambit', word: { en: 'Englund', ko: '엥글룬드', ja: 'エングルンド', hi: 'एंगलुंड', zh: '恩格伦德', tw: '恩格倫德' } },
  english: { kind: 'opening', word: { en: 'English', es: 'inglesa', pt: 'inglesa', fr: 'anglaise', de: 'Englische', adj: true, ko: '잉글리시', ja: 'イングリッシュ', hi: 'इंग्लिश', zh: '英国式', tw: '英國式' } },
  reti: { kind: 'opening', word: { en: 'Réti', ko: '레티', ja: 'レティ', hi: 'रेती', zh: '列蒂', tw: '列蒂' } },
  zukertort: { kind: 'opening', word: { en: 'Zukertort', ko: '주커토르트', ja: 'ツッカートルト', hi: 'ज़ुकरटॉर्ट', zh: '楚克托特', tw: '楚克托特' } },
  kia: { kind: 'attack', word: { en: "King's Indian", es: 'indio de rey', pt: 'índio do rei', fr: 'indienne du roi', de: 'Königsindischer', adj: true, ko: '킹스 인디안', ja: 'キングス・インディアン', hi: 'किंग्स इंडियन', zh: '王翼印度', tw: '王翼印度' } },
  bird: { kind: 'opening', word: { en: 'Bird', ko: '버드', ja: 'バード', hi: 'बर्ड', zh: '伯德', tw: '伯德' } },
  from: { kind: 'gambit', word: { en: 'From', ko: '프롬', ja: 'フロム', hi: 'फ्रॉम', zh: '弗罗姆', tw: '弗羅姆' } },
  larsen: { kind: 'opening', word: { en: 'Larsen', ko: '라르센', ja: 'ラーセン', hi: 'लार्सन', zh: '拉森', tw: '拉森' } },
  sokolsky: { kind: 'opening', word: { en: 'Sokolsky', ko: '소콜스키', ja: 'ソコルスキー', hi: 'सोकोल्स्की', zh: '索科尔斯基', tw: '索科爾斯基' } },
  grob: { kind: 'opening', word: { en: 'Grob', ko: '그로브', ja: 'グロブ', hi: 'ग्रोब', zh: '格罗布', tw: '格羅布' } },
  anderssen: { kind: 'opening', word: { en: 'Anderssen', ko: '안데르센', ja: 'アンデルセン', hi: 'एंडरसन', zh: '安德森', tw: '安德森' } },
  kruijs: { kind: 'opening', word: { en: "Van 't Kruijs", ko: '판 트 크라위스', ja: 'ファン・トゥ・クライス', hi: "वैन 'ट क्रुइज्स", zh: '范特克赖斯', tw: '范特克賴斯' } },
  'mieses-op': { kind: 'opening', word: { en: 'Mieses', ko: '미제스', ja: 'ミーゼス', hi: 'मीज़ेस', zh: '米泽斯', tw: '米澤斯' } },
  ware: { kind: 'opening', word: { en: 'Ware', ko: '웨어', ja: 'ウェア', hi: 'वेयर', zh: '韦尔', tw: '韋爾' } },
  dunst: { kind: 'opening', word: { en: 'Dunst', ko: '던스트', ja: 'ダンスト', hi: 'डंस्ट', zh: '邓斯特', tw: '鄧斯特' } },
  barnes: { kind: 'opening', word: { en: 'Barnes', ko: '반스', ja: 'バーンズ', hi: 'बार्न्स', zh: '巴恩斯', tw: '巴恩斯' } },
  amar: { kind: 'opening', word: { en: 'Amar', ko: '아마르', ja: 'アマール', hi: 'अमर', zh: '阿马尔', tw: '阿馬爾' } },
  'benko-op': { kind: 'opening', word: { en: 'Benko', ko: '벤코', ja: 'ベンコー', hi: 'बेंको', zh: '本科', tw: '本科' } },
  saragossa: { kind: 'opening', word: { en: 'Saragossa', es: 'de Zaragoza', pt: 'de Saragoça', fr: 'de Saragosse', ko: '사라고사', ja: 'サラゴサ', hi: 'सारागोसा', zh: '萨拉戈萨', tw: '薩拉戈薩' } },
  'polish-def': { kind: 'defence', word: { en: 'Polish', es: 'polaca', pt: 'polaca', fr: 'polonaise', de: 'Polnische', adj: true, ko: '폴리시', ja: 'ポーリッシュ', hi: 'पोलिश', zh: '波兰', tw: '波蘭' } },
};

/** 갈래 — 계열 이름 뒤에 쉼표로 붙는다 */
export const LINES: Record<string, Entry> = {
  morphy: { kind: 'defence', word: { en: 'Morphy', ko: '모피', ja: 'モーフィー', hi: 'मॉर्फी', zh: '莫菲', tw: '莫菲' } },
  closed: { kind: 'variation', word: { en: 'Closed', es: 'cerrada', pt: 'fechada', fr: 'fermée', de: 'Geschlossene', adj: true, ko: '클로즈드', ja: 'クローズド', hi: 'क्लोज्ड', zh: '封闭', tw: '封閉' } },
  open: { kind: 'variation', word: { en: 'Open', es: 'abierta', pt: 'aberta', fr: 'ouverte', de: 'Offene', adj: true, ko: '오픈', ja: 'オープン', hi: 'ओपन', zh: '开放', tw: '開放' } },
  exchange: { kind: 'variation', word: { en: 'Exchange', es: 'del cambio', pt: 'da troca', fr: "d'échange", de: 'Abtausch', ko: '익스체인지', ja: 'エクスチェンジ', hi: 'एक्सचेंज', zh: '交换', tw: '交換' } },
  berlin: { kind: 'defence', word: { en: 'Berlin', es: 'berlinesa', pt: 'berlinense', fr: 'berlinoise', de: 'Berliner', adj: true, ko: '베를린', ja: 'ベルリン', hi: 'बर्लिन', zh: '柏林', tw: '柏林' } },
  marshall: { kind: 'attack', word: { en: 'Marshall', ko: '마셜', ja: 'マーシャル', hi: 'मार्शल', zh: '马歇尔', tw: '馬歇爾' } },
  schliemann: { kind: 'defence', word: { en: 'Schliemann', ko: '슐리만', ja: 'シュリーマン', hi: 'श्लीमन', zh: '施利曼', tw: '施利曼' } },
  steinitz: { kind: 'defence', word: { en: 'Steinitz', ko: '스타이니츠', ja: 'シュタイニッツ', hi: 'स्टाइनिट्ज़', zh: '斯坦尼茨', tw: '斯坦尼茨' } },
  classical: { kind: 'variation', word: { en: 'Classical', es: 'clásica', pt: 'clássica', fr: 'classique', de: 'Klassische', adj: true, ko: '클래시컬', ja: 'クラシカル', hi: 'क्लासिकल', zh: '古典', tw: '古典' } },
  modern: { kind: 'variation', word: { en: 'Modern', es: 'moderna', pt: 'moderna', fr: 'moderne', de: 'Moderne', adj: true, ko: '모던', ja: 'モダン', hi: 'मॉडर्न', zh: '现代', tw: '現代' } },
  main: { kind: 'variation', word: { en: 'Main', es: 'principal', pt: 'principal', fr: 'principale', ko: '메인', ja: 'メイン', hi: 'मुख्य', zh: '主', tw: '主', whole: { de: 'Hauptvariante' } } },
  'giuoco-piano': { kind: 'variation', word: { en: 'Giuoco Piano', ko: '주오코 피아노', ja: 'ジュオコ・ピアノ', hi: 'जुओको पियानो', zh: '意大利慢局', tw: '義大利慢局', whole: true } },
  pianissimo: { kind: 'variation', word: { en: 'Giuoco Pianissimo', ko: '주오코 피아니시모', ja: 'ジュオコ・ピアニッシモ', hi: 'जुओको पियानिसिमो', zh: '意大利极慢局', tw: '義大利極慢局', whole: true } },
  'two-knights': { kind: 'defence', word: { en: 'Two Knights', es: 'de los dos caballos', pt: 'dos dois cavalos', fr: 'des deux cavaliers', de: 'Zweispringer', ko: '투 나이츠', ja: 'ツー・ナイツ', hi: 'टू नाइट्स', zh: '双马', tw: '雙馬' } },
  evans: { kind: 'gambit', word: { en: 'Evans', ko: '에번스', ja: 'エバンス', hi: 'इवांस', zh: '埃文斯', tw: '埃文斯' } },
  fegatello: { kind: 'attack', word: { en: 'Fried Liver', es: 'Fegatello', pt: 'Fegatello', fr: 'Fegatello', de: 'Fegatello', ko: '프라이드 리버', ja: 'フライド・リバー', hi: 'फ्राइड लिवर', zh: '煎肝', tw: '煎肝' } },
  traxler: { kind: 'variation', word: { en: 'Traxler', ko: '트락슬러', ja: 'トラクスラー', hi: 'ट्रैक्सलर', zh: '特拉克斯勒', tw: '特拉克斯勒' } },
  hungarian: { kind: 'defence', word: { en: 'Hungarian', es: 'húngara', pt: 'húngara', fr: 'hongroise', de: 'Ungarische', adj: true, ko: '헝가리안', ja: 'ハンガリアン', hi: 'हंगेरियन', zh: '匈牙利', tw: '匈牙利' } },
  mieses: { kind: 'variation', word: { en: 'Mieses', ko: '미제스', ja: 'ミーゼス', hi: 'मीज़ेस', zh: '米泽斯', tw: '米澤斯' } },
  cochrane: { kind: 'gambit', word: { en: 'Cochrane', ko: '코크런', ja: 'コクラン', hi: 'कोक्रेन', zh: '科克伦', tw: '科克倫' } },
  stafford: { kind: 'gambit', word: { en: 'Stafford', ko: '스태퍼드', ja: 'スタッフォード', hi: 'स्टैफर्ड', zh: '斯塔福德', tw: '斯塔福德' } },
  hanham: { kind: 'variation', word: { en: 'Hanham', ko: '핸험', ja: 'ハンハム', hi: 'हैनहम', zh: '汉哈姆', tw: '漢哈姆' } },
  accepted: { kind: 'variation', word: { en: 'Accepted', es: 'aceptada', pt: 'aceita', fr: 'acceptée', de: 'Angenommene', adj: true, ko: '억셉티드', ja: 'アクセプテッド', hi: 'स्वीकृत', zh: '接受', tw: '接受' } },
  declined: { kind: 'variation', word: { en: 'Declined', es: 'rehusada', pt: 'recusada', fr: 'refusée', de: 'Abgelehnte', adj: true, ko: '디클라인드', ja: 'ディクラインド', hi: 'अस्वीकृत', zh: '拒绝', tw: '拒絕' } },
  falkbeer: { kind: 'countergambit', word: { en: 'Falkbeer', ko: '팔크베어', ja: 'ファルクベーア', hi: 'फाल्कबीर', zh: '法尔克贝尔', tw: '法爾克貝爾' } },
  muzio: { kind: 'gambit', word: { en: 'Muzio', ko: '무치오', ja: 'ムツィオ', hi: 'मुज़ियो', zh: '穆齐奥', tw: '穆齊奧' } },
  fischer: { kind: 'defence', word: { en: 'Fischer', ko: '피셔', ja: 'フィッシャー', hi: 'फिशर', zh: '菲舍尔', tw: '菲舍爾' } },
  spanish: { kind: 'variation', word: { en: 'Spanish', es: 'española', pt: 'espanhola', fr: 'espagnole', de: 'Spanische', adj: true, ko: '스패니시', ja: 'スパニッシュ', hi: 'स्पेनिश', zh: '西班牙', tw: '西班牙' } },
  scotch: { kind: 'variation', word: { en: 'Scotch', es: 'escocesa', pt: 'escocesa', fr: 'écossaise', de: 'Schottische', adj: true, ko: '스카치', ja: 'スコッチ', hi: 'स्कॉच', zh: '苏格兰', tw: '蘇格蘭' } },
  najdorf: { kind: 'variation', word: { en: 'Najdorf', ko: '나이도르프', ja: 'ナイドルフ', hi: 'नाज्दोर्फ', zh: '纳道夫', tw: '納道夫' } },
  dragon: { kind: 'variation', word: { en: 'Dragon', es: 'del dragón', pt: 'do dragão', fr: 'du dragon', de: 'Drachen', ko: '드래곤', ja: 'ドラゴン', hi: 'ड्रैगन', zh: '龙', tw: '龍' } },
  yugoslav: { kind: 'attack', word: { en: 'Yugoslav', es: 'yugoslavo', pt: 'iugoslavo', fr: 'yougoslave', de: 'Jugoslawischer', adj: true, ko: '유고슬라브', ja: 'ユーゴスラフ', hi: 'यूगोस्लाव', zh: '南斯拉夫', tw: '南斯拉夫' } },
  accelerated: { kind: 'variation', word: { en: 'Accelerated Dragon', es: 'dragón acelerado', pt: 'dragão acelerado', fr: 'dragon accéléré', de: 'Beschleunigter Drache', ko: '가속 드래곤', ja: '加速ドラゴン', hi: 'त्वरित ड्रैगन', zh: '加速龙', tw: '加速龍', whole: true } },
  hyper: { kind: 'variation', word: { en: 'Hyper-Accelerated Dragon', es: 'dragón hiperacelerado', pt: 'dragão hiperacelerado', fr: 'dragon hyper-accéléré', de: 'Hyperbeschleunigter Drache', ko: '초가속 드래곤', ja: '超加速ドラゴン', hi: 'हाइपर-त्वरित ड्रैगन', zh: '超加速龙', tw: '超加速龍', whole: true } },
  scheveningen: { kind: 'variation', word: { en: 'Scheveningen', ko: '스헤베닝언', ja: 'シェベニンゲン', hi: 'शेवेनिंगन', zh: '斯赫弗宁根', tw: '斯赫弗寧根' } },
  sveshnikov: { kind: 'variation', word: { en: 'Sveshnikov', ko: '스베시니코프', ja: 'スベシニコフ', hi: 'स्वेश्निकोव', zh: '斯韦什尼科夫', tw: '斯韋什尼科夫' } },
  kan: { kind: 'variation', word: { en: 'Kan', ko: '칸', ja: 'カン', hi: 'कान', zh: '坎', tw: '坎' } },
  taimanov: { kind: 'variation', word: { en: 'Taimanov', ko: '타이마노프', ja: 'タイマノフ', hi: 'तैमानोव', zh: '泰马诺夫', tw: '泰馬諾夫' } },
  alapin: { kind: 'variation', word: { en: 'Alapin', ko: '알라핀', ja: 'アラピン', hi: 'अलापिन', zh: '阿拉平', tw: '阿拉平' } },
  'grand-prix': { kind: 'attack', word: { en: 'Grand Prix', ko: '그랑프리', ja: 'グランプリ', hi: 'ग्रां प्री', zh: '大奖赛', tw: '大獎賽' } },
  'smith-morra': { kind: 'gambit', word: { en: 'Smith-Morra', ko: '스미스-모라', ja: 'スミス・モラ', hi: 'स्मिथ-मोरा', zh: '史密斯-莫拉', tw: '史密斯-莫拉' } },
  rossolimo: { kind: 'variation', word: { en: 'Rossolimo', ko: '로솔리모', ja: 'ロッソリモ', hi: 'रोसोलिमो', zh: '罗索利莫', tw: '羅索利莫' } },
  moscow: { kind: 'variation', word: { en: 'Moscow', es: 'de Moscú', pt: 'de Moscou', fr: 'de Moscou', de: 'Moskauer', ko: '모스크바', ja: 'モスクワ', hi: 'मॉस्को', zh: '莫斯科', tw: '莫斯科' } },
  wing: { kind: 'gambit', word: { en: 'Wing', es: 'de flanco', pt: 'de flanco', fr: "d'aile", ko: '윙', ja: 'ウィング', hi: 'विंग', zh: '侧翼', tw: '側翼', whole: { de: 'Flügelgambit' } } },
  'richter-rauzer': { kind: 'attack', word: { en: 'Richter-Rauzer', ko: '리히터-라우저', ja: 'リヒター・ラウザー', hi: 'रिक्टर-राउज़र', zh: '里希特-劳泽', tw: '里希特-勞澤' } },
  'english-attack': { kind: 'attack', word: { en: 'English', es: 'inglés', pt: 'inglês', fr: 'anglaise', de: 'Englischer', adj: true, ko: '잉글리시', ja: 'イングリッシュ', hi: 'इंग्लिश', zh: '英国式', tw: '英國式' } },
  'poisoned-pawn': { kind: 'variation', word: { en: 'Poisoned Pawn', es: 'del peón envenenado', pt: 'do peão envenenado', fr: 'du pion empoisonné', de: 'Vergiftete-Bauern', ko: '독폰', ja: '毒ポーン', hi: 'ज़हरीला प्यादा', zh: '毒兵', tw: '毒兵' } },
  kalashnikov: { kind: 'variation', word: { en: 'Kalashnikov', ko: '칼라시니코프', ja: 'カラシニコフ', hi: 'कलाश्निकोव', zh: '卡拉什尼科夫', tw: '卡拉什尼科夫' } },
  nimzowitsch: { kind: 'variation', word: { en: 'Nimzowitsch', ko: '님초비치', ja: 'ニムツォヴィッチ', hi: 'निम्ज़ोविच', zh: '尼姆佐维奇', tw: '尼姆佐維奇' } },
  advance: { kind: 'variation', word: { en: 'Advance', es: 'del avance', pt: 'do avanço', fr: "de l'avance", de: 'Vorstoß', ko: '어드밴스', ja: 'アドバンス', hi: 'एडवांस', zh: '进兵', tw: '進兵' } },
  tarrasch: { kind: 'variation', word: { en: 'Tarrasch', ko: '타라시', ja: 'タラッシュ', hi: 'तर्राश', zh: '塔拉什', tw: '塔拉什' } },
  winawer: { kind: 'variation', word: { en: 'Winawer', ko: '비나베르', ja: 'ウィナワー', hi: 'विनावर', zh: '维纳韦尔', tw: '維納韋爾' } },
  rubinstein: { kind: 'variation', word: { en: 'Rubinstein', ko: '루빈스타인', ja: 'ルビンシュタイン', hi: 'रुबिनस्टीन', zh: '鲁宾斯坦', tw: '魯賓斯坦' } },
  kia: { kind: 'attack', word: { en: "King's Indian", es: 'indio de rey', pt: 'índio do rei', fr: 'indienne du roi', de: 'Königsindischer', adj: true, ko: '킹스 인디안', ja: 'キングス・インディアン', hi: 'किंग्स इंडियन', zh: '王翼印度', tw: '王翼印度' } },
  panov: { kind: 'attack', word: { en: 'Panov', ko: '파노프', ja: 'パノフ', hi: 'पानोव', zh: '帕诺夫', tw: '帕諾夫' } },
  fantasy: { kind: 'variation', word: { en: 'Fantasy', es: 'fantasía', pt: 'fantasia', fr: 'fantaisie', de: 'Fantasie', ko: '판타지', ja: 'ファンタジー', hi: 'फैंटेसी', zh: '幻想', tw: '幻想' } },
  karpov: { kind: 'variation', word: { en: 'Karpov', ko: '카르포프', ja: 'カルポフ', hi: 'कार्पोव', zh: '卡尔波夫', tw: '卡爾波夫' } },
  austrian: { kind: 'attack', word: { en: 'Austrian', es: 'austriaco', pt: 'austríaco', fr: 'autrichienne', de: 'Österreichischer', adj: true, ko: '오스트리안', ja: 'オーストリアン', hi: 'ऑस्ट्रियन', zh: '奥地利', tw: '奧地利' } },
  'four-pawns': { kind: 'attack', word: { en: 'Four Pawns', es: 'de los cuatro peones', pt: 'dos quatro peões', fr: 'des quatre pions', de: 'Vierbauern', ko: '포 폰스', ja: 'フォー・ポーンズ', hi: 'फोर पॉन्स', zh: '四兵', tw: '四兵' } },
  orthodox: { kind: 'defence', word: { en: 'Orthodox', es: 'ortodoxa', pt: 'ortodoxa', fr: 'orthodoxe', de: 'Orthodoxe', adj: true, ko: '오소독스', ja: 'オーソドックス', hi: 'ऑर्थोडॉक्स', zh: '正统', tw: '正統' } },
  samisch: { kind: 'variation', word: { en: 'Sämisch', ko: '제미시', ja: 'ゼーミッシュ', hi: 'ज़ेमिश', zh: '泽米施', tw: '澤米施' } },
  fianchetto: { kind: 'variation', word: { en: 'Fianchetto', ko: '피안케토', ja: 'フィアンケット', hi: 'फिआंचेतो', zh: '侧翼出象', tw: '側翼出象' } },
  russian: { kind: 'variation', word: { en: 'Russian', es: 'rusa', pt: 'russa', fr: 'russe', de: 'Russische', adj: true, ko: '러시안', ja: 'ロシアン', hi: 'रशियन', zh: '俄罗斯', tw: '俄羅斯' } },
  leningrad: { kind: 'variation', word: { en: 'Leningrad', es: 'de Leningrado', pt: 'de Leningrado', fr: 'de Leningrad', de: 'Leningrader', ko: '레닌그라드', ja: 'レニングラード', hi: 'लेनिनग्राद', zh: '列宁格勒', tw: '列寧格勒' } },
  stonewall: { kind: 'variation', word: { en: 'Stonewall', ko: '스톤월', ja: 'ストーンウォール', hi: 'स्टोनवॉल', zh: '石墙', tw: '石牆' } },
  symmetrical: { kind: 'variation', word: { en: 'Symmetrical', es: 'simétrica', pt: 'simétrica', fr: 'symétrique', de: 'Symmetrische', adj: true, ko: '시메트리컬', ja: 'シンメトリカル', hi: 'सिमेट्रिकल', zh: '对称', tw: '對稱' } },
  'reversed-sicilian': { kind: 'variation', word: { en: 'Reversed Sicilian', es: 'siciliana invertida', pt: 'siciliana invertida', fr: 'sicilienne inversée', de: 'Umgekehrtes Sizilianisch', ko: '역시실리안', ja: 'リバース・シシリアン', hi: 'रिवर्स सिसिलियन', zh: '反西西里', tw: '反西西里', whole: true } },
  'anglo-indian': { kind: 'defence', word: { en: 'Anglo-Indian', es: 'angloindia', pt: 'anglo-índia', fr: 'anglo-indienne', de: 'Angloindische', adj: true, ko: '앵글로-인디안', ja: 'アングロ・インディアン', hi: 'एंग्लो-इंडियन', zh: '英印', tw: '英印' } },
};

/** 계열 이름만 */
export const familyName = (id: string, lang: Lang): string => {
  const f = FAMILIES[id];
  return f ? wordName(f.word, f.kind, lang) : id;
};

/** 갈래 이름만 */
export const lineName = (id: string, lang: Lang): string => {
  const l = LINES[id];
  return l ? wordName(l.word, l.kind, lang) : id;
};

/**
 * 계열을 잇는 부호. 일본어·중국어는 온각 부호를 쓴다 — 반각 쉼표는 글자 사이가
 * 붙어 보여서 두 이름이 한 낱말처럼 읽힌다.
 */
const SEP: L<string> = {
  ko: ', ', en: ', ', es: ', ', pt: ', ', ja: '、', de: ', ', fr: ', ', hi: ', ', zh: '，', tw: '，',
};

/** 계열 + 갈래 — "Sicilian Defence, Najdorf Variation" */
export function fullName(family: string, line: string | undefined, lang: Lang): string {
  const head = familyName(family, lang);
  if (!line) return head;
  const tail = lineName(line, lang);
  // 스페인어·포르투갈어·프랑스어는 성질 낱말이 앞에 오는데, 이름 가운데에 놓이면
  // 소문자다 — "Defensa siciliana, variante Najdorf". 통째로 적어 둔 이름은 건드리지 않는다.
  const lower = (lang === 'es' || lang === 'pt' || lang === 'fr') && !LINES[line]?.word.whole;
  const shown = lower ? tail.charAt(0).toLowerCase() + tail.slice(1) : tail;
  return `${head}${SEP[lang]}${shown}`;
}
