'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { EMOTION_META } from '@/lib/expression-data';
import {
  EMOTION_LABELS_INTL, EMOTION_POOL_INTL, EMOTION_TIP_INTL,
  type EmotionKeyIntl, type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 표정 감정 분석 — en/zh판.
 *
 * 감정 확률은 face-api의 학습된 모델이 실제로 추론한 값이다. 이모지·그라디언트는
 * 한국어 EMOTION_META에서 그대로 가져와 세 언어가 같은 색을 쓰게 한다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-indigo-600',
  notice: 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300',
  spinner: 'border-t-indigo-500',
  dropHover: 'hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40',
  resetHover: 'hover:border-indigo-300 hover:text-indigo-600',
};

const ORDER: EmotionKeyIntl[] = ['happy', 'neutral', 'surprised', 'sad', 'angry', 'fearful', 'disgusted'];

const COPY = {
  en: {
    title: 'Expression Analyser',
    lead: 'A trained model infers seven emotion probabilities from your photo',
    privacy: 'The seven probabilities are inferred by a neural network running in your browser — these are the model’s real outputs, not random numbers. What it reads is the geometry of a single frozen instant, though, not how you actually felt.',
    result: '🎭 Strongest reading',
    breakdown: '📊 All seven',
    tip: '💡 About the reading',
    disclaimer: 'The probabilities are genuine model outputs; the commentary on them is entertainment.',
  },
  es: {
    title: 'Analizador de expresión',
    lead: 'Un modelo entrenado infiere siete probabilidades de emoción a partir de tu foto',
    privacy: 'Las siete probabilidades las infiere una red neuronal que corre en tu navegador — son salidas reales del modelo, no números al azar. Eso sí, lo que lee es la geometría de un instante congelado, no cómo te sentías de verdad.',
    result: '🎭 Lectura dominante',
    breakdown: '📊 Las siete',
    tip: '💡 Sobre la lectura',
    disclaimer: 'Las probabilidades son salidas reales del modelo; el comentario sobre ellas es entretenimiento.',
  },
  'pt-br': {
    title: 'Analisador de expressão',
    lead: 'Um modelo treinado infere sete probabilidades de emoção a partir da sua foto',
    privacy: 'As sete probabilidades são inferidas por uma rede neural rodando no seu navegador — são saídas reais do modelo, não números aleatórios. Só que o que ela lê é a geometria de um instante congelado, não como você realmente se sentiu.',
    result: '🎭 Leitura mais forte',
    breakdown: '📊 As sete',
    tip: '💡 Sobre a leitura',
    disclaimer: 'As probabilidades são saídas reais do modelo; o comentário sobre elas é entretenimento.',
  },
  ja: {
    title: '表情アナライザー',
    lead: '学習済みモデルが写真から7つの感情確率を推定します',
    privacy: '7つの確率はブラウザ内で動くニューラルネットが推定したもので、ランダムな数字ではありません。ただしモデルが読んでいるのは切り取られた一瞬の形であって、そのときの気持ちそのものではありません。',
    result: '🎭 いちばん強い読み取り',
    breakdown: '📊 7つすべて',
    tip: '💡 読み取りについて',
    disclaimer: '確率はモデルの本物の出力ですが、それへの解説は遊びです。',
  },
  de: {
    title: 'Ausdrucks-Analyse',
    lead: 'Ein trainiertes Modell schätzt aus deinem Foto sieben Emotionswahrscheinlichkeiten',
    privacy: 'Die sieben Wahrscheinlichkeiten kommen von einem neuronalen Netz, das in deinem Browser läuft — echte Modellausgaben, keine Zufallszahlen. Gelesen wird allerdings die Geometrie eines eingefrorenen Augenblicks, nicht dein tatsächliches Gefühl.',
    result: '🎭 Stärkste Lesart',
    breakdown: '📊 Alle sieben',
    tip: '💡 Zur Lesart',
    disclaimer: 'Die Wahrscheinlichkeiten sind echte Modellausgaben; der Kommentar dazu ist Unterhaltung.',
  },
  fr: {
    title: 'Analyseur d’expression',
    lead: 'Un modèle entraîné déduit sept probabilités d’émotion à partir de votre photo',
    privacy: 'Les sept probabilités sont déduites par un réseau de neurones qui tourne dans votre navigateur — ce sont de vraies sorties du modèle, pas des nombres au hasard. Ce qu’il lit reste toutefois la géométrie d’un instant figé, pas ce que vous ressentiez.',
    result: '🎭 Lecture dominante',
    breakdown: '📊 Les sept',
    tip: '💡 À propos de la lecture',
    disclaimer: 'Les probabilités sont de vraies sorties du modèle ; le commentaire qui les accompagne est un divertissement.',
  },
  hi: {
    title: 'भाव विश्लेषक',
    lead: 'एक प्रशिक्षित मॉडल आपकी फ़ोटो से सात भावनाओं की संभावना निकालता है',
    privacy: 'सातों संभावनाएँ आपके ब्राउज़र में चल रहे न्यूरल नेटवर्क से आती हैं — ये मॉडल के असली आउटपुट हैं, कोई मनमाने अंक नहीं। पर वह पढ़ता है एक जमे हुए पल की ज्यामिति, यह नहीं कि आपको सचमुच कैसा लग रहा था।',
    result: '🎭 सबसे तेज़ पढ़त',
    breakdown: '📊 सातों',
    tip: '💡 पढ़त के बारे में',
    disclaimer: 'संभावनाएँ मॉडल के असली आउटपुट हैं; उन पर की गई टिप्पणी मनोरंजन है।',
  },
  'zh-hans': {
    title: '表情分析',
    lead: '训练好的模型从你的照片里推断七种情绪的概率',
    privacy: '这七个概率是在你的浏览器里运行的神经网络推断出来的——是模型真实的输出，不是随机数。不过它读的是被定格的一瞬间的几何形状，而不是你当时真正的心情。',
    result: '🎭 最强的读数',
    breakdown: '📊 全部七项',
    tip: '💡 关于读数',
    disclaimer: '概率是模型真实的输出；对它的解说则是娱乐。',
  },
  'zh-hant': {
    title: '表情分析',
    lead: '訓練好的模型從你的照片裡推斷七種情緒的機率',
    privacy: '這七個機率是在你的瀏覽器裡執行的神經網路推斷出來的——是模型真實的輸出，不是亂數。不過它讀的是被定格的一瞬間的幾何形狀，而不是你當時真正的心情。',
    result: '🎭 最強的讀數',
    breakdown: '📊 全部七項',
    tip: '💡 關於讀數',
    disclaimer: '機率是模型真實的輸出；對它的解說則是娛樂。',
  },
} as const;

interface Result {
  top: EmotionKeyIntl;
  label: string;
  emoji: string;
  from: string;
  to: string;
  text: string;
  scores: { key: EmotionKeyIntl; label: string; emoji: string; percent: number }[];
  tip: string;
}

export default function Expression({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result | null {
    const probs = d.expressions;
    if (!probs) return null;

    const labels = EMOTION_LABELS_INTL[lang];
    const scores = ORDER
      .map(key => ({
        key,
        label: labels[key],
        emoji: EMOTION_META[key].emoji,
        percent: Math.round((probs[key] ?? 0) * 100),
      }))
      .sort((a, b) => b.percent - a.percent);

    const top = scores[0].key;
    const meta = EMOTION_META[top];
    const seed = mix32(Math.floor((probs[top] ?? 0) * 99991 + (probs.happy ?? 0) * 7919) >>> 0);
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      top,
      label: labels[top],
      emoji: meta.emoji,
      from: meta.from,
      to: meta.to,
      text: pick(EMOTION_POOL_INTL[lang][top], seed),
      scores,
      tip: pick(EMOTION_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="🎭"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-indigo-500 via-violet-500 to-purple-500"
      theme={THEME}
      models="landmarks+expressions"
      resultId="expression-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="rounded-2xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${result.from}, ${result.to})` }}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <div className="text-5xl mb-2">{result.emoji}</div>
            <p className="text-2xl font-black mb-3">{result.label} {result.scores[0].percent}%</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.breakdown}</p>
            <div className="flex flex-col gap-2.5">
              {result.scores.map(s => (
                <div key={s.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{s.emoji} {s.label}</span>
                    <span className="text-xs font-bold text-indigo-600">{s.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${s.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
