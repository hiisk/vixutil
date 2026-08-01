import type { SearchIntlLang } from './search-index-intl.ts';

/**
 * 번역 언어 통합 검색의 섹션 이름표.
 *
 * 컴포넌트 안에 있던 것을 여기로 옮겼다. 검색 색인에는 있는데 이름표가 없으면
 * `labels[sec] ?? sec`로 떨어져 **영어 슬러그가 그대로 화면에 뜬다** — 스페인어
 * 사용자가 'fortune'과 'snap'을 그대로 보고 있었다. tsx 안에 있으면 node로
 * 검사할 수 없어서 아무도 눈치채지 못했다. [[tests/search-section-labels.test.ts]]
 *
 * 이름표는 그 섹션 허브의 제목과 같은 낱말로 맞춘다 — 검색 결과의 꼬리표와
 * 눌러서 도착한 페이지의 제목이 다른 말이면 같은 곳으로 안 읽힌다.
 */
export const SECTION_LABEL: Record<SearchIntlLang, Record<string, string>> = {
  en: {
    convert: 'Convert', color: 'Colour', time: 'Time', image: 'Image', sound: 'Sound', food: 'Cooking',
    game: 'Games', device: 'Device', text: 'Text', checklist: 'Checklist',
    quiz: 'Quiz', test: 'Test', generator: 'Generators', fortune: 'Fortune', snap: 'Snap',
  },
  es: {
    convert: 'Unidades', color: 'Color', time: 'Tiempo', image: 'Imagen', sound: 'Sonido', food: 'Cocina',
    game: 'Juegos', device: 'Aparatos', text: 'Texto',
    test: 'Tests', quiz: 'Test', checklist: 'Listas', generator: 'Generadores', fortune: 'Horóscopo', snap: 'Foto',
  },
  'pt-br': {
    convert: 'Unidades', color: 'Cor', time: 'Tempo', image: 'Imagem', sound: 'Som', food: 'Cozinha',
    game: 'Jogos', device: 'Aparelhos', text: 'Texto',
    test: 'Testes', quiz: 'Quiz', checklist: 'Checklist', generator: 'Geradores', fortune: 'Horóscopo', snap: 'Foto',
  },
  ja: {
    convert: '単位', color: '配色', time: '時間', image: '画像', sound: '音', food: '料理',
    game: 'ゲーム', device: '端末', text: 'テキスト',
    test: '心理テスト', quiz: 'クイズ', checklist: 'チェックリスト', generator: 'ジェネレーター', fortune: '占い', snap: '写真診断',
  },
  de: {
    convert: 'Einheiten', color: 'Farbe', time: 'Zeit', image: 'Bild', sound: 'Klang', food: 'Küche',
    game: 'Spiele', device: 'Geräte', text: 'Text',
    test: 'Tests', quiz: 'Quiz', checklist: 'Checkliste', generator: 'Generatoren', fortune: 'Horoskop', snap: 'Foto',
  },
  fr: {
    convert: 'Unités', color: 'Couleur', time: 'Temps', image: 'Image', sound: 'Son', food: 'Cuisine',
    game: 'Jeux', device: 'Appareils', text: 'Texte',
    test: 'Tests', quiz: 'Quiz', checklist: 'Checklist', generator: 'Générateurs', fortune: 'Horoscope', snap: 'Photo',
  },
  hi: {
    convert: 'इकाई', color: 'रंग', time: 'समय', image: 'इमेज', sound: 'ध्वनि', food: 'रसोई',
    game: 'खेल', device: 'उपकरण', text: 'टेक्स्ट',
    test: 'टेस्ट', quiz: 'क्विज़', checklist: 'चेकलिस्ट', generator: 'जनरेटर', fortune: 'राशिफल', snap: 'फ़ोटो',
  },
  'zh-hans': {
    convert: '换算', color: '颜色', time: '时间', image: '图片', sound: '声音', food: '烹饪',
    game: '游戏', device: '设备', text: '文本', checklist: '清单',
    quiz: '测验', test: '测试', generator: '生成器', fortune: '运势', snap: '拍照',
  },
  'zh-hant': {
    convert: '換算', color: '顏色', time: '時間', image: '圖片', sound: '聲音', food: '烹飪',
    game: '遊戲', device: '裝置', text: '文字', checklist: '清單',
    quiz: '測驗', test: '測試', generator: '產生器', fortune: '運勢', snap: '拍照',
  },
};

export const SECTION_ORDER = ['convert', 'color', 'time', 'image', 'sound', 'food', 'game', 'device', 'text', 'checklist', 'quiz', 'test', 'generator', 'fortune', 'snap'];
