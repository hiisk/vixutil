/**
 * 새 스냅테스트가 함께 쓰는 낱말과 도구별 문구.
 *
 * ── 왜 이렇게 잘게 나눠 두는가 ──────────────────────────────────
 * 도구 열 개 × 열 언어에 결과 문장을 통째로 적으면 팔백 줄이 넘고, 그중 하나가
 * 측정값과 어긋나도 아무도 못 잡는다. 그래서 **낱말만 적고 문장은 만든다** —
 * "빛이 {왼쪽}에서 옵니다", "{높음}" 처럼.
 *
 * 낱말은 도구를 가로질러 함께 쓴다. 다섯 단계(아주 낮음~아주 높음)와 방향
 * (왼쪽·오른쪽·위·아래·고름)은 열 도구 중 여덟이 쓴다.
 */
import type { SnapLang } from '@/components/snap/SnapShell';

export type L10<T> = Record<SnapLang, T>;

/** 0~1 점수를 다섯 칸으로 — 모든 도구가 같은 눈금을 쓴다 */
export const bandOf = (score: number): 0 | 1 | 2 | 3 | 4 =>
  (score >= 0.85 ? 4 : score >= 0.65 ? 3 : score >= 0.45 ? 2 : score >= 0.25 ? 1 : 0);

export interface Vocab {
  /** 다섯 단계 — bandOf가 고른다 */
  bands: [string, string, string, string, string];
  dir: { left: string; right: string; above: string; below: string; even: string };
  cast: { warm: string; cool: string; green: string; magenta: string; neutral: string };
  /** 공통 꼬리표 */
  measured: string;   // "재는 것은 진짜입니다"
  overall: string;
  detail: string;
  advice: string;
  yes: string;
  no: string;
}

export const VOCAB: L10<Vocab> = {
  ko: {
    bands: ['많이 어긋남', '조금 어긋남', '보통', '좋음', '아주 좋음'],
    dir: { left: '왼쪽', right: '오른쪽', above: '위', below: '아래', even: '고르게' },
    cast: { warm: '따뜻한 쪽', cool: '차가운 쪽', green: '초록 쪽', magenta: '자주 쪽', neutral: '중립' },
    measured: '숫자는 사진에서 실제로 잰 값입니다.',
    overall: '전체 점수', detail: '항목별', advice: '이렇게 해보세요', yes: '예', no: '아니오',
  },
  en: {
    bands: ['Well off', 'A little off', 'Fair', 'Good', 'Very good'],
    dir: { left: 'the left', right: 'the right', above: 'above', below: 'below', even: 'evenly' },
    cast: { warm: 'warm', cool: 'cool', green: 'green', magenta: 'magenta', neutral: 'neutral' },
    measured: 'The numbers are measured from your photo.',
    overall: 'Overall', detail: 'By item', advice: 'Try this', yes: 'Yes', no: 'No',
  },
  es: {
    bands: ['Muy desviado', 'Algo desviado', 'Aceptable', 'Bien', 'Muy bien'],
    dir: { left: 'la izquierda', right: 'la derecha', above: 'arriba', below: 'abajo', even: 'de forma pareja' },
    cast: { warm: 'cálido', cool: 'frío', green: 'verde', magenta: 'magenta', neutral: 'neutro' },
    measured: 'Los números se miden en tu foto.',
    overall: 'Total', detail: 'Por apartado', advice: 'Prueba esto', yes: 'Sí', no: 'No',
  },
  'pt-br': {
    bands: ['Bem fora', 'Um pouco fora', 'Aceitável', 'Bom', 'Muito bom'],
    dir: { left: 'a esquerda', right: 'a direita', above: 'cima', below: 'baixo', even: 'de modo uniforme' },
    cast: { warm: 'quente', cool: 'frio', green: 'verde', magenta: 'magenta', neutral: 'neutro' },
    measured: 'Os números são medidos na sua foto.',
    overall: 'Total', detail: 'Por item', advice: 'Tente assim', yes: 'Sim', no: 'Não',
  },
  ja: {
    bands: ['大きくずれている', '少しずれている', 'ふつう', '良い', 'とても良い'],
    dir: { left: '左', right: '右', above: '上', below: '下', even: '均等に' },
    cast: { warm: '暖色より', cool: '寒色より', green: '緑より', magenta: 'マゼンタより', neutral: 'ニュートラル' },
    measured: '数値は写真から実際に測ったものです。',
    overall: '総合', detail: '項目別', advice: 'こうしてみましょう', yes: 'はい', no: 'いいえ',
  },
  de: {
    bands: ['Deutlich daneben', 'Etwas daneben', 'Passabel', 'Gut', 'Sehr gut'],
    dir: { left: 'links', right: 'rechts', above: 'oben', below: 'unten', even: 'gleichmäßig' },
    cast: { warm: 'warm', cool: 'kühl', green: 'grün', magenta: 'magenta', neutral: 'neutral' },
    measured: 'Die Zahlen sind an deinem Foto gemessen.',
    overall: 'Gesamt', detail: 'Nach Punkt', advice: 'Versuch das', yes: 'Ja', no: 'Nein',
  },
  fr: {
    bands: ['Très décalé', 'Un peu décalé', 'Correct', 'Bien', 'Très bien'],
    dir: { left: 'la gauche', right: 'la droite', above: 'le haut', below: 'le bas', even: 'de façon égale' },
    cast: { warm: 'chaud', cool: 'froid', green: 'vert', magenta: 'magenta', neutral: 'neutre' },
    measured: 'Les chiffres sont mesurés sur votre photo.',
    overall: 'Total', detail: 'Par critère', advice: 'Essayez ceci', yes: 'Oui', no: 'Non',
  },
  hi: {
    bands: ['काफ़ी दूर', 'थोड़ा दूर', 'ठीक-ठाक', 'अच्छा', 'बहुत अच्छा'],
    dir: { left: 'बाएँ', right: 'दाएँ', above: 'ऊपर', below: 'नीचे', even: 'बराबर' },
    cast: { warm: 'गर्म', cool: 'ठंडा', green: 'हरा', magenta: 'मैजेंटा', neutral: 'तटस्थ' },
    measured: 'ये संख्याएँ आपकी तस्वीर से नापी गई हैं।',
    overall: 'कुल', detail: 'मद अनुसार', advice: 'यह आज़माएँ', yes: 'हाँ', no: 'नहीं',
  },
  'zh-hans': {
    bands: ['偏差很大', '略有偏差', '一般', '良好', '非常好'],
    dir: { left: '左侧', right: '右侧', above: '上方', below: '下方', even: '均匀' },
    cast: { warm: '偏暖', cool: '偏冷', green: '偏绿', magenta: '偏品红', neutral: '中性' },
    measured: '这些数值是从你的照片上实际测得的。',
    overall: '总分', detail: '分项', advice: '可以这样试试', yes: '是', no: '否',
  },
  'zh-hant': {
    bands: ['偏差很大', '略有偏差', '普通', '良好', '非常好'],
    dir: { left: '左側', right: '右側', above: '上方', below: '下方', even: '均勻' },
    cast: { warm: '偏暖', cool: '偏冷', green: '偏綠', magenta: '偏洋紅', neutral: '中性' },
    measured: '這些數值是從你的照片上實際量得的。',
    overall: '總分', detail: '分項', advice: '可以這樣試試', yes: '是', no: '否',
  },
};
