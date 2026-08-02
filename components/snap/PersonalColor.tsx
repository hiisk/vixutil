'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { measurePersonalColor } from '@/lib/personal-color-measure';
import {
  SUBTYPE_META, getPersonalizedPalette, getAvoidPalette,
  type MainSeason, type SubtypeKey,
} from '@/lib/personal-color-data';
import {
  SUBTYPE_LABELS_INTL, SWATCH_NAMES_INTL, PERSONAL_COLOR_POOL_INTL, PERSONAL_COLOR_TIP_INTL,
  type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 퍼스널컬러 — en/zh판.
 *
 * 측정과 팔레트 생성은 한국어 lib을 그대로 쓴다. 팔레트 색은 실측값에서
 * 계산되므로 세 언어가 같은 사진에서 같은 hex를 낸다 — 여기서는 색 이름만
 * 언어별로 바꾼다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-pink-600',
  notice: 'bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-pink-800 dark:text-pink-300',
  spinner: 'border-t-pink-500',
  dropHover: 'hover:border-pink-400 hover:bg-pink-50/50 dark:hover:bg-pink-950/40',
  resetHover: 'hover:border-pink-300 hover:text-pink-600',
};

const COPY = {
  en: {
    title: 'Personal Colour Analysis',
    lead: 'Your cheek tone is sampled to place you in one of twelve seasonal types',
    privacy: 'Cheek pixels are read in your browser and white-balanced against the whole photo, because indoor lighting otherwise pushes cool skin to warm and vice versa. Lighting still affects the result — try it twice in different light before treating it as settled.',
    result: '🎨 Your type',
    palette: '✅ Colours that suit you',
    avoid: '🚫 Colours to go easy on',
    metrics: '📊 Measured',
    tip: '💡 Styling tip',
    warmth: 'Warm ↔ cool', clarity: 'Clarity', value: 'Lightness',
    disclaimer: 'The skin tone is genuinely sampled and white-balanced. Seasonal colour analysis is a styling convention, not a measurement standard.',
  },
  es: {
    title: 'Análisis de color personal',
    lead: 'Se muestrea el tono de tus mejillas para situarte en uno de doce tipos estacionales',
    privacy: 'Los píxeles de las mejillas se leen en tu navegador y se equilibran en blanco contra toda la foto, porque si no la luz de interior empuja la piel fría hacia cálida y al revés. La iluminación aún influye: pruébalo dos veces con luces distintas antes de darlo por bueno.',
    result: '🎨 Tu tipo',
    palette: '✅ Colores que te favorecen',
    avoid: '🚫 Colores a usar con moderación',
    metrics: '📊 Medido',
    tip: '💡 Consejo de estilo',
    warmth: 'Cálido ↔ frío', clarity: 'Nitidez', value: 'Luminosidad',
    disclaimer: 'El tono de piel se muestrea y equilibra de verdad. El análisis estacional de color es una convención de estilismo, no un estándar de medición.',
  },
  'pt-br': {
    title: 'Análise de coloração pessoal',
    lead: 'O tom das suas bochechas é amostrado para situar você em um de doze tipos sazonais',
    privacy: 'Os pixels das bochechas são lidos no seu navegador e balanceados em branco contra a foto inteira, porque senão a luz de ambiente empurra pele fria para quente e vice-versa. A iluminação ainda pesa: teste duas vezes em luzes diferentes antes de considerar resolvido.',
    result: '🎨 Seu tipo',
    palette: '✅ Cores que te favorecem',
    avoid: '🚫 Cores para usar com moderação',
    metrics: '📊 Medido',
    tip: '💡 Dica de estilo',
    warmth: 'Quente ↔ frio', clarity: 'Nitidez', value: 'Luminosidade',
    disclaimer: 'O tom de pele é realmente amostrado e balanceado. A análise sazonal de cor é uma convenção de estilo, não um padrão de medição.',
  },
  ja: {
    title: 'パーソナルカラー診断',
    lead: '頬の色を取り出して、12のシーズンタイプのどれに近いかを見ます',
    privacy: '頬のピクセルをブラウザ内で読み取り、写真全体でホワイトバランスを取っています。そうしないと室内の照明でクール肌がウォームに寄ったり、その逆が起きるためです。それでも光の影響は残るので、違う光で2回試してから受け取ってください。',
    result: '🎨 あなたのタイプ',
    palette: '✅ 似合う色',
    avoid: '🚫 控えめにしたい色',
    metrics: '📊 測定値',
    tip: '💡 スタイリングのヒント',
    warmth: '暖 ↔ 寒', clarity: '清濁', value: '明度',
    disclaimer: '肌色の取り出しとホワイトバランスは本物です。シーズン分類はスタイリングの慣習であって、測定の基準ではありません。',
  },
  de: {
    title: 'Personal-Color-Analyse',
    lead: 'Dein Wangenton wird ausgelesen und einem von zwölf Jahreszeitentypen zugeordnet',
    privacy: 'Die Wangenpixel werden in deinem Browser gelesen und gegen das ganze Foto weißabgeglichen, weil Innenbeleuchtung sonst kühle Haut warm erscheinen lässt und umgekehrt. Das Licht wirkt trotzdem mit — probier es zweimal bei unterschiedlichem Licht, bevor du es als geklärt nimmst.',
    result: '🎨 Dein Typ',
    palette: '✅ Farben, die dir stehen',
    avoid: '🚫 Farben, die du sparsam einsetzen solltest',
    metrics: '📊 Gemessen',
    tip: '💡 Styling-Tipp',
    warmth: 'Warm ↔ kalt', clarity: 'Klarheit', value: 'Helligkeit',
    disclaimer: 'Der Hautton wird wirklich ausgelesen und weißabgeglichen. Die Jahreszeiten-Farbanalyse ist eine Styling-Konvention, kein Messstandard.',
  },
  fr: {
    title: 'Analyse de colorimétrie',
    lead: 'Le ton de vos joues est échantillonné pour vous situer dans l’un des douze types saisonniers',
    privacy: 'Les pixels des joues sont lus dans votre navigateur et équilibrés en blanc par rapport à toute la photo, sinon l’éclairage intérieur fait basculer une peau froide vers le chaud et inversement. La lumière compte quand même : faites le test deux fois sous des lumières différentes avant de trancher.',
    result: '🎨 Votre type',
    palette: '✅ Couleurs qui vous vont',
    avoid: '🚫 Couleurs à doser',
    metrics: '📊 Mesuré',
    tip: '💡 Conseil de style',
    warmth: 'Chaud ↔ froid', clarity: 'Netteté', value: 'Clarté',
    disclaimer: 'Le teint est réellement échantillonné et équilibré. La colorimétrie saisonnière est une convention de style, pas une norme de mesure.',
  },
  hi: {
    title: 'पर्सनल कलर विश्लेषण',
    lead: 'आपके गालों का रंग लेकर बारह मौसमी टाइपों में से एक तय किया जाता है',
    privacy: 'गालों के पिक्सल आपके ब्राउज़र में पढ़े जाते हैं और पूरी फ़ोटो के हिसाब से व्हाइट बैलेंस किए जाते हैं, वरना घर की रोशनी ठंडी त्वचा को गर्म दिखा देती है और उल्टा भी। फिर भी रोशनी असर डालती है — पक्का मानने से पहले दो अलग रोशनियों में आज़माएँ।',
    result: '🎨 आपका टाइप',
    palette: '✅ आप पर जँचने वाले रंग',
    avoid: '🚫 कम इस्तेमाल करने वाले रंग',
    metrics: '📊 नापा गया',
    tip: '💡 स्टाइलिंग टिप',
    warmth: 'गर्म ↔ ठंडा', clarity: 'साफ़पन', value: 'चमक',
    disclaimer: 'त्वचा का रंग सचमुच लिया और व्हाइट बैलेंस किया जाता है। मौसमी रंग विश्लेषण स्टाइल की परंपरा है, माप का मानक नहीं।',
  },
  'zh-hans': {
    title: '个人色彩分析',
    lead: '取样脸颊的肤色，把你归到十二种季型中的一种',
    privacy: '脸颊的像素在你的浏览器里读取，并以整张照片做白平衡——否则室内灯光会把冷皮拍成暖皮，反过来也一样。光线仍会影响结果，建议在两种不同光线下各测一次再下结论。',
    result: '🎨 你的类型',
    palette: '✅ 适合你的颜色',
    avoid: '🚫 少用一点的颜色',
    metrics: '📊 实测',
    tip: '💡 穿搭建议',
    warmth: '暖 ↔ 冷', clarity: '清浊', value: '明度',
    disclaimer: '肤色是真的取样并做了白平衡。四季色彩分析是穿搭的惯例，不是测量标准。',
  },
  'zh-hant': {
    title: '個人色彩分析',
    lead: '取樣臉頰的膚色，把你歸到十二種季型中的一種',
    privacy: '臉頰的像素在你的瀏覽器裡讀取，並以整張照片做白平衡——否則室內燈光會把冷皮拍成暖皮，反過來也一樣。光線仍會影響結果，建議在兩種不同光線下各測一次再下結論。',
    result: '🎨 你的類型',
    palette: '✅ 適合你的顏色',
    avoid: '🚫 少用一點的顏色',
    metrics: '📊 實測',
    tip: '💡 穿搭建議',
    warmth: '暖 ↔ 冷', clarity: '清濁', value: '明度',
    disclaimer: '膚色是真的取樣並做了白平衡。四季色彩分析是穿搭的慣例，不是測量標準。',
  },
} as const;

interface Swatch { name: string; hex: string }
interface Result {
  label: string; vibe: string; from: string; to: string; emoji: string;
  text: string;
  palette: Swatch[]; avoidPalette: Swatch[];
  warmthPercent: number; clarityPercent: number; valuePercent: number;
  tip: string;
}

const SUBTYPE_BY_BAND: Record<MainSeason, Record<'low' | 'mid' | 'high', SubtypeKey>> = {
  spring: { low: 'warmSpring', mid: 'trueSpring', high: 'lightSpring' },
  summer: { low: 'softSummer', mid: 'trueSummer', high: 'lightSummer' },
  autumn: { low: 'deepAutumn', mid: 'trueAutumn', high: 'softAutumn' },
  winter: { low: 'deepWinter', mid: 'trueWinter', high: 'brightWinter' },
};

const ORDER: SubtypeKey[] = [
  'warmSpring', 'trueSpring', 'lightSpring', 'softSummer', 'trueSummer', 'lightSummer',
  'deepAutumn', 'trueAutumn', 'softAutumn', 'deepWinter', 'trueWinter', 'brightWinter',
];

export default function PersonalColor({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result | null {
    const lm = d.landmarks;
    const r = measurePersonalColor(d.image, {
      jaw: lm.getJawOutline(), nose: lm.getNose(),
      leftEye: lm.getLeftEye(), rightEye: lm.getRightEye(),
    });

    const warm = r.warmthRatio >= 0.5;
    const clear = r.clarityRatio >= 0.5;
    const mainSeason: MainSeason = warm ? (clear ? 'spring' : 'autumn') : (clear ? 'winter' : 'summer');
    const band = r.valueRatio < 1 / 3 ? 'low' : r.valueRatio < 2 / 3 ? 'mid' : 'high';
    const subtype = SUBTYPE_BY_BAND[mainSeason][band];

    const meta = SUBTYPE_META[subtype];
    const intl = SUBTYPE_LABELS_INTL[lang][subtype];
    const names = SWATCH_NAMES_INTL[lang];
    // 색 이름이 표에 없으면 한국어 원본을 그대로 쓴다 — 빈칸보다는 낫다
    const rename = (s: Swatch): Swatch => ({ name: names[s.name] ?? s.name, hex: s.hex });

    const seed = mix32(
      Math.floor(r.warmthRatio * 99991 + r.clarityRatio * 15485863 + r.valueRatio * 1299709) >>> 0,
    );
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      label: intl.label,
      vibe: intl.vibe,
      emoji: meta.emoji,
      from: meta.from,
      to: meta.to,
      text: PERSONAL_COLOR_POOL_INTL[lang][ORDER.indexOf(subtype)],
      palette: getPersonalizedPalette(mainSeason, r.clarityRatio, r.valueRatio).map(rename),
      avoidPalette: getAvoidPalette(mainSeason, r.clarityRatio, r.valueRatio).map(rename),
      warmthPercent: Math.round(r.warmthRatio * 100),
      clarityPercent: Math.round(r.clarityRatio * 100),
      valuePercent: Math.round(r.valueRatio * 100),
      tip: pick(PERSONAL_COLOR_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      slug="personal-color"
      lang={lang}
      icon="🎨"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-pink-400 via-rose-500 to-violet-500"
      theme={THEME}
      glow="rose"
      resultId="color-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="rounded-2xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${result.from}, ${result.to})` }}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <div className="text-5xl mb-2">{result.emoji}</div>
            <p className="text-2xl font-black mb-1">{result.label}</p>
            <p className="text-xs text-white/80 mb-3">{result.vibe}</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-3">{c.palette}</p>
            <div className="grid grid-cols-3 gap-2">
              {result.palette.map(s => (
                <div key={s.hex} className="text-center">
                  <div className="w-full aspect-square rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: s.hex }} />
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-3">{c.avoid}</p>
            <div className="grid grid-cols-3 gap-2">
              {result.avoidPalette.map(s => (
                <div key={s.hex} className="text-center opacity-70">
                  <div className="w-full aspect-square rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: s.hex }} />
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.metrics}</p>
            <div className="flex flex-col gap-3">
              {[
                { label: c.warmth, percent: result.warmthPercent },
                { label: c.clarity, percent: result.clarityPercent },
                { label: c.value, percent: result.valuePercent },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-bold text-pink-600">{m.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.percent}%`, background: `linear-gradient(90deg, ${result.from}, ${result.to})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
