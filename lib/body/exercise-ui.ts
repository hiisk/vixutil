/** 운동 낱장 문구 — 열 언어. 운동 이름은 lib/body/exercise.ts가 갖고 있다 */
import type { AnyLocale10 } from '../locales.ts';

export interface ExerciseUI {
  h1: (name: string) => string;
  metaTitle: (name: string, kcal: string) => string;
  metaDesc: (name: string, met: string, kcal: string) => string;
  metLine: (met: string) => string;
  lead: (name: string, kcal: string) => string;
  tableTitle: string;
  weight: string;
  minutes: string;
  relatedTitle: string;
  note: string;
}

export const EXERCISE_UI: Record<AnyLocale10, ExerciseUI> = {
  ko: { h1: n => `${n} 칼로리 소모`, metaTitle: (n, k) => `${n} 칼로리 — 30분에 ${k}kcal`,
    metaDesc: (n, m, k) => `${n}의 강도는 ${m} MET입니다. 70kg가 30분 하면 약 ${k}kcal을 씁니다. 체중·시간별 표로 내 값을 바로 찾으세요.`,
    metLine: m => `강도 ${m} MET`, lead: (n, k) => `70kg가 30분 ${n}을 하면 약 ${k}kcal입니다.`,
    tableTitle: '체중·시간별 소모 칼로리', weight: '체중', minutes: '분', relatedTitle: '비슷한 운동',
    note: 'MET은 가만히 있을 때의 몇 배로 에너지를 쓰는지입니다. 같은 운동도 강도에 따라 달라지므로 참고값입니다.' },
  en: { h1: n => `Calories burned: ${n}`, metaTitle: (n, k) => `${n} calories — ${k} kcal in 30 min`,
    metaDesc: (n, m, k) => `${n} is ${m} METs. Thirty minutes at 70 kg burns about ${k} kcal. Find your own figure in the weight and duration table.`,
    metLine: m => `${m} METs`, lead: (n, k) => `Thirty minutes of ${n} at 70 kg burns about ${k} kcal.`,
    tableTitle: 'Calories by weight and duration', weight: 'Weight', minutes: 'min', relatedTitle: 'Similar activities',
    note: 'A MET is a multiple of resting energy use. The same activity varies with intensity, so treat these as reference values.' },
  es: { h1: n => `Calorías quemadas: ${n}`, metaTitle: (n, k) => `${n} calorías — ${k} kcal en 30 min`,
    metaDesc: (n, m, k) => `${n} equivale a ${m} MET. Treinta minutos con 70 kg queman unas ${k} kcal. Busca tu cifra en la tabla por peso y duración.`,
    metLine: m => `${m} MET`, lead: (n, k) => `Treinta minutos de ${n} con 70 kg queman unas ${k} kcal.`,
    tableTitle: 'Calorías por peso y duración', weight: 'Peso', minutes: 'min', relatedTitle: 'Actividades similares',
    note: 'Un MET es un múltiplo del gasto en reposo. La misma actividad varía con la intensidad: son valores de referencia.' },
  'pt-br': { h1: n => `Calorias gastas: ${n}`, metaTitle: (n, k) => `${n} calorias — ${k} kcal em 30 min`,
    metaDesc: (n, m, k) => `${n} equivale a ${m} MET. Trinta minutos com 70 kg gastam cerca de ${k} kcal. Veja seu número na tabela por peso e duração.`,
    metLine: m => `${m} MET`, lead: (n, k) => `Trinta minutos de ${n} com 70 kg gastam cerca de ${k} kcal.`,
    tableTitle: 'Calorias por peso e duração', weight: 'Peso', minutes: 'min', relatedTitle: 'Atividades parecidas',
    note: 'Um MET é um múltiplo do gasto em repouso. A mesma atividade varia com a intensidade: são valores de referência.' },
  ja: { h1: n => `${n}の消費カロリー`, metaTitle: (n, k) => `${n}のカロリー — 30分で${k}kcal`,
    metaDesc: (n, m, k) => `${n}の強度は${m} METです。70kgの人が30分行うと約${k}kcal。体重・時間別の表で自分の値を確認できます。`,
    metLine: m => `強度 ${m} MET`, lead: (n, k) => `70kgの人が${n}を30分行うと約${k}kcalです。`,
    tableTitle: '体重・時間別の消費カロリー', weight: '体重', minutes: '分', relatedTitle: '似た運動',
    note: 'METは安静時の何倍のエネルギーを使うかを表します。同じ運動でも強度で変わるため目安です。' },
  de: { h1: n => `Kalorienverbrauch: ${n}`, metaTitle: (n, k) => `${n} Kalorien — ${k} kcal in 30 min`,
    metaDesc: (n, m, k) => `${n} entspricht ${m} MET. Dreißig Minuten bei 70 kg verbrauchen etwa ${k} kcal. Den eigenen Wert zeigt die Tabelle nach Gewicht und Dauer.`,
    metLine: m => `${m} MET`, lead: (n, k) => `Dreißig Minuten ${n} bei 70 kg verbrauchen etwa ${k} kcal.`,
    tableTitle: 'Kalorien nach Gewicht und Dauer', weight: 'Gewicht', minutes: 'Min', relatedTitle: 'Ähnliche Aktivitäten',
    note: 'Ein MET ist ein Vielfaches des Ruheumsatzes. Dieselbe Aktivität schwankt mit der Intensität — Richtwerte.' },
  fr: { h1: n => `Calories brûlées : ${n}`, metaTitle: (n, k) => `${n} calories — ${k} kcal en 30 min`,
    metaDesc: (n, m, k) => `${n} vaut ${m} MET. Trente minutes à 70 kg brûlent environ ${k} kcal. Trouve ton chiffre dans le tableau poids/durée.`,
    metLine: m => `${m} MET`, lead: (n, k) => `Trente minutes de ${n} à 70 kg brûlent environ ${k} kcal.`,
    tableTitle: 'Calories selon le poids et la durée', weight: 'Poids', minutes: 'min', relatedTitle: 'Activités proches',
    note: 'Un MET est un multiple de la dépense au repos. La même activité varie selon l’intensité : ce sont des repères.' },
  hi: { h1: n => `${n} में जली कैलोरी`, metaTitle: (n, k) => `${n} कैलोरी — 30 मिनट में ${k} kcal`,
    metaDesc: (n, m, k) => `${n} की तीव्रता ${m} MET है। 70 किग्रा पर तीस मिनट में लगभग ${k} kcal खर्च होती हैं। वज़न और समय की तालिका में अपना मान देखें।`,
    metLine: m => `${m} MET`, lead: (n, k) => `70 किग्रा पर ${n} तीस मिनट करने से लगभग ${k} kcal खर्च होती हैं।`,
    tableTitle: 'वज़न और समय के अनुसार कैलोरी', weight: 'वज़न', minutes: 'मिनट', relatedTitle: 'मिलती-जुलती गतिविधियाँ',
    note: 'MET विश्राम की तुलना में ऊर्जा खर्च का गुणक है। एक ही गतिविधि तीव्रता से बदलती है, इसलिए ये संकेतक मान हैं।' },
  'zh-hans': { h1: n => `${n}消耗的卡路里`, metaTitle: (n, k) => `${n}卡路里 — 30分钟${k}kcal`,
    metaDesc: (n, m, k) => `${n}的强度为${m} MET。70公斤的人做30分钟约消耗${k}kcal。可在体重与时长对照表中找到自己的数值。`,
    metLine: m => `强度 ${m} MET`, lead: (n, k) => `70公斤的人做${n}30分钟约消耗${k}kcal。`,
    tableTitle: '按体重与时长的消耗', weight: '体重', minutes: '分钟', relatedTitle: '相似运动',
    note: 'MET表示相对静息状态的能量消耗倍数。同一运动会因强度而不同，仅供参考。' },
  'zh-hant': { h1: n => `${n}消耗的卡路里`, metaTitle: (n, k) => `${n}卡路里 — 30分鐘${k}kcal`,
    metaDesc: (n, m, k) => `${n}的強度為${m} MET。70公斤的人做30分鐘約消耗${k}kcal。可在體重與時長對照表中找到自己的數值。`,
    metLine: m => `強度 ${m} MET`, lead: (n, k) => `70公斤的人做${n}30分鐘約消耗${k}kcal。`,
    tableTitle: '依體重與時長的消耗', weight: '體重', minutes: '分鐘', relatedTitle: '相似運動',
    note: 'MET表示相對靜息狀態的能量消耗倍數。同一運動會因強度而不同，僅供參考。' },
};
