/**
 * 값 낱장의 화면 문구 — 열 언어.
 *
 * ── 왜 문장을 함수로 두는가 ──────────────────────────────────
 * 값 낱장은 "70kg는 몇 파운드"라는 **질문 자체가 제목**이다. 그래서 문구마다
 * 숫자와 단위가 끼어들고, 언어에 따라 그 자리가 다르다 —
 *
 *   ko   70킬로그램은 몇 파운드인가요?
 *   en   How many pounds is 70 kg?
 *   ja   70キログラムは何ポンドですか？
 *
 * 틀을 문자열로 두고 치환하면 조사·어순이 어긋난다. 언어마다 함수로 둔다.
 *
 * ── 번역이 빠지면 영어로 떨어진다 ────────────────────────────
 * 다만 **떨어졌다는 것을 검사가 본다** — 열 언어가 모두 자기 열쇠를 갖는지
 * tests/convert-leaf-ui.test.ts가 센다. 폴백이 미번역을 숨긴 적이 있어서다.
 */
import type { AnyLocale10 } from '../locales.ts';

export interface LeafUI {
  /** 제목 — "70 kg to lb" 자리 */
  h1: (v: string, from: string, to: string) => string;
  /** 메타 제목 */
  metaTitle: (v: string, from: string, to: string, r: string) => string;
  /** 메타 설명 */
  metaDesc: (v: string, from: string, to: string, r: string) => string;
  /** 답 한 줄 */
  answer: (v: string, from: string, r: string, to: string) => string;
  /** 거꾸로 물었을 때 */
  inverseTitle: (v: string, to: string, from: string) => string;
  /** 어림해도 되는 값일 때 */
  roundSafe: (r: string, rounded: string, to: string) => string;
  /** 어림하면 어긋나는 값일 때 */
  roundRough: (r: string, rounded: string, to: string, pct: string) => string;
  /** 주변값 표 제목 */
  tableTitle: (from: string, to: string) => string;
  /** 같은 값 다른 단위 */
  otherTitle: (v: string, from: string) => string;
  /** 이웃 값 */
  neighborTitle: (from: string, to: string) => string;
  /** 계산식 */
  formula: string;
  /** 도구로 돌아가는 링크 */
  openTool: (title: string) => string;
}

export const LEAF_UI: Record<AnyLocale10, LeafUI> = {
  ko: {
    /* "는"도 같은 문제라 물음표 앞을 끊는다 — 70kg → 몇 lb (받침 판정이 필요 없다) */
    h1: (v, f, t) => `${v}${f} → 몇 ${t}인가요?`,
    metaTitle: (v, f, t, r) => `${v}${f} → ${t} 변환 — ${r}${t}`,
    metaDesc: (v, f, t, r) => `${v}${f}를 ${t}로 바꾸면 ${r}${t}입니다. 주변 값 표와 반대 방향 계산, 같은 값의 다른 단위까지 한 번에 봅니다.`,
    answer: (v, f, r, t) => `${v}${f} = ${r}${t}`,
    inverseTitle: (v, t, f) => `반대로 ${v}${t} → 몇 ${f}인가요?`,
    /* 단위 뒤에 조사를 붙이지 않는다 — "154lb이라고"처럼 받침 규칙이 어긋난다.
       단위는 언어마다 다르고(lb·파운드·斤) 받침을 코드로 판정할 수 없다. */
    roundSafe: (r, rd, t) => `${r}${t}입니다. 소수점을 빼고 ${rd}${t} 정도로 말해도 어림 오차가 0.5% 안입니다.`,
    roundRough: (r, rd, t, p) => `${r}${t} — 소수점을 빼면 ${rd}${t}, 그러면 ${p}% 어긋납니다. 이 값에서는 소수점을 살리는 편이 낫습니다.`,
    tableTitle: (f, t) => `${f} → ${t} 주변 값`,
    otherTitle: (v, f) => `같은 ${v}${f}, 다른 단위로`,
    neighborTitle: (f, t) => `다른 값도 보기`,
    formula: '계산식',
    openTool: t => `${t} 계산기 열기`,
  },
  en: {
    h1: (v, f, t) => `How many ${t} is ${v} ${f}?`,
    metaTitle: (v, f, t, r) => `${v} ${f} to ${t} — ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} equals ${r} ${t}. See the surrounding values, the reverse direction, and the same amount in other units.`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `And how many ${f} is ${v} ${t}?`,
    roundSafe: (r, rd, t) => `It is ${r} ${t}, so saying ${rd} ${t} is fine — rounding is within 0.5%.`,
    roundRough: (r, rd, t, p) => `Rounding ${r} ${t} to ${rd} ${t} is off by ${p}%. At this value the decimals are worth keeping.`,
    tableTitle: (f, t) => `${f} to ${t} around this value`,
    otherTitle: (v, f) => `The same ${v} ${f} in other units`,
    neighborTitle: () => 'Other values',
    formula: 'Formula',
    openTool: t => `Open the ${t} converter`,
  },
  es: {
    h1: (v, f, t) => `¿Cuántos ${t} son ${v} ${f}?`,
    metaTitle: (v, f, t, r) => `${v} ${f} a ${t} — ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} equivale a ${r} ${t}. Consulta los valores cercanos, el sentido inverso y la misma cantidad en otras unidades.`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `¿Y cuántos ${f} son ${v} ${t}?`,
    roundSafe: (r, rd, t) => `Son ${r} ${t}, así que decir ${rd} ${t} está bien: el redondeo queda dentro del 0,5%.`,
    roundRough: (r, rd, t, p) => `Redondear ${r} ${t} a ${rd} ${t} desvía un ${p}%. En este valor conviene mantener los decimales.`,
    tableTitle: (f, t) => `${f} a ${t} alrededor de este valor`,
    otherTitle: (v, f) => `Los mismos ${v} ${f} en otras unidades`,
    neighborTitle: () => 'Otros valores',
    formula: 'Fórmula',
    openTool: t => `Abrir el conversor de ${t}`,
  },
  'pt-br': {
    h1: (v, f, t) => `Quantos ${t} são ${v} ${f}?`,
    metaTitle: (v, f, t, r) => `${v} ${f} para ${t} — ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} equivale a ${r} ${t}. Veja os valores próximos, o sentido inverso e a mesma quantidade em outras unidades.`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `E quantos ${f} são ${v} ${t}?`,
    roundSafe: (r, rd, t) => `São ${r} ${t}, então dizer ${rd} ${t} está ok — o arredondamento fica dentro de 0,5%.`,
    roundRough: (r, rd, t, p) => `Arredondar ${r} ${t} para ${rd} ${t} erra ${p}%. Neste valor vale manter as casas decimais.`,
    tableTitle: (f, t) => `${f} para ${t} em torno deste valor`,
    otherTitle: (v, f) => `Os mesmos ${v} ${f} em outras unidades`,
    neighborTitle: () => 'Outros valores',
    formula: 'Fórmula',
    openTool: t => `Abrir o conversor de ${t}`,
  },
  ja: {
    h1: (v, f, t) => `${v}${f}は何${t}ですか？`,
    metaTitle: (v, f, t, r) => `${v}${f}は何${t}？ — ${r}${t}`,
    metaDesc: (v, f, t, r) => `${v}${f}は${r}${t}です。前後の値の表、逆方向の換算、同じ量を別の単位で見た値もまとめて確認できます。`,
    answer: (v, f, r, t) => `${v}${f} = ${r}${t}`,
    inverseTitle: (v, t, f) => `逆に${v}${t}は何${f}ですか？`,
    roundSafe: (r, rd, t) => `${r}${t}なので${rd}${t}と言っても差し支えありません — 誤差は0.5%以内です。`,
    roundRough: (r, rd, t, p) => `${r}${t}を${rd}${t}に丸めると${p}%ずれます。この値では小数を残したほうが安全です。`,
    tableTitle: (f, t) => `${f} → ${t} 前後の値`,
    otherTitle: (v, f) => `同じ${v}${f}を別の単位で`,
    neighborTitle: () => 'ほかの値',
    formula: '計算式',
    openTool: t => `${t}の換算ツールを開く`,
  },
  de: {
    h1: (v, f, t) => `Wie viel ${t} sind ${v} ${f}?`,
    metaTitle: (v, f, t, r) => `${v} ${f} in ${t} — ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} sind ${r} ${t}. Dazu die Werte ringsum, die Gegenrichtung und dieselbe Menge in anderen Einheiten.`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `Und wie viel ${f} sind ${v} ${t}?`,
    roundSafe: (r, rd, t) => `Es sind ${r} ${t}, ${rd} ${t} zu sagen geht also — der Rundungsfehler bleibt unter 0,5%.`,
    roundRough: (r, rd, t, p) => `${r} ${t} auf ${rd} ${t} zu runden weicht um ${p}% ab. Bei diesem Wert lohnen die Nachkommastellen.`,
    tableTitle: (f, t) => `${f} in ${t} rund um diesen Wert`,
    otherTitle: (v, f) => `Dieselben ${v} ${f} in anderen Einheiten`,
    neighborTitle: () => 'Weitere Werte',
    formula: 'Formel',
    openTool: t => `${t}-Rechner öffnen`,
  },
  fr: {
    h1: (v, f, t) => `Combien de ${t} font ${v} ${f} ?`,
    metaTitle: (v, f, t, r) => `${v} ${f} en ${t} — ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} valent ${r} ${t}. Avec le tableau des valeurs voisines, le sens inverse et la même quantité dans d'autres unités.`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `À l'inverse, combien de ${f} font ${v} ${t} ?`,
    roundSafe: (r, rd, t) => `Cela fait ${r} ${t}, donc dire ${rd} ${t} convient — l'arrondi reste sous 0,5 %.`,
    roundRough: (r, rd, t, p) => `Arrondir ${r} ${t} à ${rd} ${t} s'écarte de ${p} %. À cette valeur, mieux vaut garder les décimales.`,
    tableTitle: (f, t) => `${f} en ${t} autour de cette valeur`,
    otherTitle: (v, f) => `Les mêmes ${v} ${f} dans d'autres unités`,
    neighborTitle: () => 'Autres valeurs',
    formula: 'Formule',
    openTool: t => `Ouvrir le convertisseur ${t}`,
  },
  hi: {
    h1: (v, f, t) => `${v} ${f} में कितने ${t} होते हैं?`,
    metaTitle: (v, f, t, r) => `${v} ${f} = ${r} ${t}`,
    metaDesc: (v, f, t, r) => `${v} ${f} बराबर ${r} ${t} होता है। आस-पास के मानों की तालिका, उल्टी दिशा और वही मात्रा दूसरी इकाइयों में भी देखें।`,
    answer: (v, f, r, t) => `${v} ${f} = ${r} ${t}`,
    inverseTitle: (v, t, f) => `उल्टा — ${v} ${t} में कितने ${f} होते हैं?`,
    roundSafe: (r, rd, t) => `यह ${r} ${t} है, इसलिए ${rd} ${t} कहना ठीक है — अंतर 0.5% के भीतर रहता है।`,
    roundRough: (r, rd, t, p) => `${r} ${t} को ${rd} ${t} तक पूर्णांकित करने पर ${p}% का अंतर आता है। इस मान पर दशमलव रखना बेहतर है।`,
    tableTitle: (f, t) => `इस मान के आस-पास ${f} → ${t}`,
    otherTitle: (v, f) => `वही ${v} ${f} दूसरी इकाइयों में`,
    neighborTitle: () => 'अन्य मान',
    formula: 'सूत्र',
    openTool: t => `${t} कनवर्टर खोलें`,
  },
  'zh-hans': {
    h1: (v, f, t) => `${v}${f}是多少${t}？`,
    metaTitle: (v, f, t, r) => `${v}${f}等于多少${t} — ${r}${t}`,
    metaDesc: (v, f, t, r) => `${v}${f}等于${r}${t}。还可查看前后数值对照表、反向换算，以及同样的量换成其他单位的结果。`,
    answer: (v, f, r, t) => `${v}${f} = ${r}${t}`,
    inverseTitle: (v, t, f) => `反过来，${v}${t}是多少${f}？`,
    roundSafe: (r, rd, t) => `是${r}${t}，所以说成${rd}${t}也没问题——四舍五入的误差在0.5%以内。`,
    roundRough: (r, rd, t, p) => `把${r}${t}四舍五入成${rd}${t}会差${p}%。这个数值下最好保留小数。`,
    tableTitle: (f, t) => `该数值前后的 ${f} → ${t}`,
    otherTitle: (v, f) => `同样的${v}${f}换成其他单位`,
    neighborTitle: () => '其他数值',
    formula: '计算公式',
    openTool: t => `打开${t}换算工具`,
  },
  'zh-hant': {
    h1: (v, f, t) => `${v}${f}是多少${t}？`,
    metaTitle: (v, f, t, r) => `${v}${f}等於多少${t} — ${r}${t}`,
    metaDesc: (v, f, t, r) => `${v}${f}等於${r}${t}。另有前後數值對照表、反向換算，以及同樣的量換成其他單位的結果。`,
    answer: (v, f, r, t) => `${v}${f} = ${r}${t}`,
    inverseTitle: (v, t, f) => `反過來，${v}${t}是多少${f}？`,
    roundSafe: (r, rd, t) => `是${r}${t}，所以說成${rd}${t}也沒問題——四捨五入的誤差在0.5%以內。`,
    roundRough: (r, rd, t, p) => `把${r}${t}四捨五入成${rd}${t}會差${p}%。這個數值下最好保留小數。`,
    tableTitle: (f, t) => `該數值前後的 ${f} → ${t}`,
    otherTitle: (v, f) => `同樣的${v}${f}換成其他單位`,
    neighborTitle: () => '其他數值',
    formula: '計算公式',
    openTool: t => `開啟${t}換算工具`,
  },
};
