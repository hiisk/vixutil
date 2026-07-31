/** /geometry 섹션 설정 */
import { GEO_TOOLS, GEO_CATEGORIES } from './geo-tools.ts';
import type { Lang, FormulaLang } from './formula/terms.ts';
import type { SectionConfig, SectionMeta } from './formula/section.ts';

export const GEO_META = {
  ko: {
    section: '도형·수학',
    hubTitle: '도형·수학 계산기',
    hubLead: '면적·부피·삼각비부터 타일 수·페인트 양까지 도형으로 푸는 계산 100가지',
    hubNotice: '📐 값을 넣으면 바로 계산되고 공식도 함께 보여줍니다.',
    footNote: '길이 단위는 입력끼리 맞춰서 넣으세요. cm와 m를 섞으면 결과가 크게 어긋납니다.',
    metaTitle: '도형 계산기 — 면적·부피·삼각비·타일 수 100종',
    metaDesc:
      '원·삼각형·사다리꼴 면적, 원기둥·구·원뿔 부피, 피타고라스 정리와 코사인 법칙, 경사도, 타일 개수와 페인트 소요량까지 도형 계산 100가지를 공식과 함께 봅니다.',
  },
  en: {
    section: 'Geometry',
    hubTitle: 'Geometry Calculators',
    hubLead: 'A hundred geometry tools — areas, volumes, trigonometry, tiles and paint',
    hubNotice: '📐 Results update as you type, and every page shows the formula.',
    footNote: 'Keep your length units consistent across inputs — mixing centimetres and metres throws results far off.',
    metaTitle: 'Geometry Calculators — Area, Volume & Trigonometry (100 Tools)',
    metaDesc:
      'Circle, triangle and trapezoid areas, cylinder, sphere and cone volumes, the Pythagorean theorem and law of cosines, slope grade, tile counts and paint quantities — 100 geometry calculators with formulas.',
  },
} as const;

export const GEO_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '평면 도형': '평면 도형', '입체 부피': '입체 부피', '삼각비·각': '삼각비·각',
    '원·호': '원·호', '생활 계산': '생활 계산',
  },
  en: {
    '평면 도형': 'Plane Shapes', '입체 부피': 'Solid Volume', '삼각비·각': 'Trigonometry & Angles',
    '원·호': 'Circles & Arcs', '생활 계산': 'Everyday Measuring',
  },
};

/**
 * 번역 여섯 언어의 섹션 문구.
 *
 * footNote는 단위를 섞지 말라는 경고인데, 이 실수는 언어를 가리지 않고 일어난다.
 * 다만 인치·피트를 함께 쓰는 독자가 있으므로 영어권 표현만 예를 하나 더 든다.
 */
export const GEO_META_INTL: Partial<Record<FormulaLang, SectionMeta>> = {
  es: {
    section: 'Geometría',
    hubTitle: 'Calculadoras de geometría',
    hubLead: 'Cien herramientas de geometría: áreas, volúmenes, trigonometría, baldosas y pintura',
    hubNotice: '📐 El resultado se actualiza mientras escribes, y cada página muestra la fórmula.',
    footNote: 'Mantén las mismas unidades de longitud en todas las casillas: mezclar centímetros y metros desvía muchísimo el resultado.',
    metaTitle: 'Calculadora de área y volumen — 100 herramientas de geometría',
    metaDesc: 'Áreas de círculo, triángulo y trapecio, volúmenes de cilindro, esfera y cono, teorema de Pitágoras y ley de cosenos, pendiente, número de baldosas y cantidad de pintura: 100 calculadoras de geometría con sus fórmulas.',
  },
  'pt-br': {
    section: 'Geometria',
    hubTitle: 'Calculadoras de geometria',
    hubLead: 'Cem ferramentas de geometria: áreas, volumes, trigonometria, azulejos e tinta',
    hubNotice: '📐 O resultado atualiza enquanto você digita, e cada página mostra a fórmula.',
    footNote: 'Mantenha as mesmas unidades de comprimento em todos os campos: misturar centímetros e metros joga o resultado muito longe.',
    metaTitle: 'Calculadora de área e volume — 100 ferramentas de geometria',
    metaDesc: 'Áreas de círculo, triângulo e trapézio, volumes de cilindro, esfera e cone, teorema de Pitágoras e lei dos cossenos, inclinação, contagem de azulejos e quantidade de tinta: 100 calculadoras de geometria com as fórmulas.',
  },
  ja: {
    section: '図形・数学',
    hubTitle: '図形・数学の計算機',
    hubLead: '面積・体積・三角比からタイルの枚数・塗料の量まで、図形で解く計算100種',
    hubNotice: '📐 値を入れるとすぐ計算され、公式も一緒に表示します。',
    footNote: '長さの単位は入力どうしでそろえてください。cmとmを混ぜると結果が大きく狂います。',
    metaTitle: '面積・体積・三角比の計算機 — 図形の計算100種',
    metaDesc: '円・三角形・台形の面積、円柱・球・円錐の体積、三平方の定理と余弦定理、勾配、タイルの枚数や塗料の量まで、図形の計算100種を公式つきで。',
  },
  de: {
    section: 'Geometrie',
    hubTitle: 'Geometrie-Rechner',
    hubLead: 'Hundert Geometriewerkzeuge — Flächen, Volumen, Trigonometrie, Fliesen und Farbe',
    hubNotice: '📐 Das Ergebnis aktualisiert sich beim Tippen, und jede Seite zeigt die Formel.',
    footNote: 'Halte die Längeneinheiten über alle Eingaben gleich — Zentimeter und Meter zu mischen verzieht das Ergebnis gewaltig.',
    metaTitle: 'Flächen- und Volumenrechner — 100 Geometriewerkzeuge',
    metaDesc: 'Flächen von Kreis, Dreieck und Trapez, Volumen von Zylinder, Kugel und Kegel, Satz des Pythagoras und Kosinussatz, Steigung, Fliesenanzahl und Farbmenge — 100 Geometrierechner samt Formeln.',
  },
  fr: {
    section: 'Géométrie',
    hubTitle: 'Calculateurs de géométrie',
    hubLead: 'Cent outils de géométrie : aires, volumes, trigonométrie, carreaux et peinture',
    hubNotice: '📐 Le résultat se met à jour pendant que tu tapes, et chaque page montre la formule.',
    footNote: 'Garde les mêmes unités de longueur dans toutes les cases : mélanger centimètres et mètres fausse énormément le résultat.',
    metaTitle: 'Calcul d’aire et de volume — 100 outils de géométrie',
    metaDesc: 'Aires du cercle, du triangle et du trapèze, volumes du cylindre, de la sphère et du cône, théorème de Pythagore et loi des cosinus, pente, nombre de carreaux et quantité de peinture : 100 calculateurs de géométrie avec leurs formules.',
  },
  hi: {
    section: 'ज्यामिति',
    hubTitle: 'ज्यामिति के कैलकुलेटर',
    hubLead: 'ज्यामिति के सौ औज़ार — क्षेत्रफल, आयतन, त्रिकोणमिति, टाइलें और पेंट',
    hubNotice: '📐 लिखते ही नतीजा बदलता है, और हर पन्ना सूत्र भी दिखाता है।',
    footNote: 'सभी खानों में लंबाई की इकाई एक जैसी रखें — सेंटीमीटर और मीटर मिला देने पर नतीजा बहुत दूर चला जाता है।',
    metaTitle: 'क्षेत्रफल और आयतन कैलकुलेटर — ज्यामिति के 100 औज़ार',
    metaDesc: 'वृत्त, त्रिभुज और समलंब के क्षेत्रफल, बेलन, गोले और शंकु के आयतन, पाइथागोरस प्रमेय और कोज्या नियम, ढाल, टाइलों की गिनती और पेंट की मात्रा — ज्यामिति के 100 कैलकुलेटर, हर एक अपने सूत्र के साथ।',
  },
};

export const GEO_CATEGORY_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '평면 도형': 'Figuras planas', '입체 부피': 'Volumen de sólidos', '삼각비·각': 'Trigonometría y ángulos',
    '원·호': 'Círculos y arcos', '생활 계산': 'Medidas cotidianas',
  },
  'pt-br': {
    '평면 도형': 'Figuras planas', '입체 부피': 'Volume de sólidos', '삼각비·각': 'Trigonometria e ângulos',
    '원·호': 'Círculos e arcos', '생활 계산': 'Medidas do dia a dia',
  },
  ja: {
    '평면 도형': '平面図形', '입체 부피': '立体の体積', '삼각비·각': '三角比・角度',
    '원·호': '円・弧', '생활 계산': '生活の計算',
  },
  de: {
    '평면 도형': 'Ebene Figuren', '입체 부피': 'Volumen von Körpern', '삼각비·각': 'Trigonometrie und Winkel',
    '원·호': 'Kreise und Bögen', '생활 계산': 'Messen im Alltag',
  },
  fr: {
    '평면 도형': 'Figures planes', '입체 부피': 'Volume des solides', '삼각비·각': 'Trigonométrie et angles',
    '원·호': 'Cercles et arcs', '생활 계산': 'Mesures du quotidien',
  },
  hi: {
    '평면 도형': 'समतल आकृतियाँ', '입체 부피': 'ठोसों का आयतन', '삼각비·각': 'त्रिकोणमिति और कोण',
    '원·호': 'वृत्त और चाप', '생활 계산': 'रोज़मर्रा की नाप',
  },
};

/** ko·en에 번역 여섯 언어를 더한 여덟 — geometry도 전 언어가 열려 있다 */
export const GEO_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'];

export const GEO_SECTION: SectionConfig = {
  key: 'geometry',
  tools: GEO_TOOLS,
  categories: GEO_CATEGORIES,
  meta: GEO_META,
  categoryLabel: GEO_CATEGORY_LABEL,
  metaIntl: GEO_META_INTL,
  categoryIntl: GEO_CATEGORY_INTL,
  accent: 'indigo',
  grad: 'from-indigo-500 to-violet-600',
  gradBar: 'from-indigo-500 to-violet-600',
  hoverBorder: 'hover:border-indigo-300',
  textAccent: 'text-indigo-600',
  focusBorder: 'focus:border-indigo-400',
  hoverText: 'group-hover:text-indigo-700',
  linkHover: 'hover:text-indigo-600',
  ogFrom: '#6366f1',
  ogTo: '#7c3aed',
};
