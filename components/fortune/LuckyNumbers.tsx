'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { getLuckyLotto, ballColor, ymdOf } from '@/lib/lucky-lotto';
import { DATE_FORM, type DateForm } from '@/lib/fortune-form-intl';
import { t, lottoLabels, type Lang } from '@/lib/fortune-intl';

type IntlLang = Exclude<Lang, 'ko'>;

/*
  한국어판은 "행운의 로또 번호"지만 여기서는 특정 복권을 지칭하지 않는다.
  6/45 형식은 나라마다 달라서, 영어로 "lotto numbers"라고 하면 어느 나라
  기준인지 알 수 없는 틀린 안내가 된다. 숫자 자체는 같은 로직으로 뽑되
  "행운의 숫자"로만 제시하고, 구매를 권하는 표현은 넣지 않는다.
*/
const COPY: Record<IntlLang, {
  title: string; lead: string; submit: string; empty: string;
  bonus: string; direction: string; weekday: string; timeSlot: string; note: string;
} & DateForm> = {
  en: {
    ...DATE_FORM.en,
    title: 'Today’s Lucky Numbers',
    lead: 'Six lucky numbers from 1–45, generated from your date of birth and today’s date',
    submit: 'Show my numbers',
    empty: 'Enter your date of birth to see today’s numbers',
    bonus: 'Bonus', direction: 'Lucky direction', weekday: 'Lucky day', timeSlot: 'Lucky hours',
    note: 'These numbers are generated from your birth date and today’s date. They are for fun — they cannot improve the odds of any lottery, and this page is not a suggestion to buy tickets.',
  },
  es: {
    ...DATE_FORM.es,
    title: 'Números de la suerte de hoy',
    lead: 'Seis números de la suerte del 1 al 45, generados con tu fecha de nacimiento y la de hoy',
    submit: 'Ver mis números',
    empty: 'Escribe tu fecha de nacimiento para ver los números de hoy',
    bonus: 'Extra', direction: 'Dirección de la suerte', weekday: 'Día de suerte', timeSlot: 'Horas de suerte',
    note: 'Estos números se generan con tu fecha de nacimiento y la de hoy. Son un juego: no mejoran las probabilidades de ninguna lotería, y esta página no es una invitación a comprar boletos.',
  },
  'pt-br': {
    ...DATE_FORM['pt-br'],
    title: 'Números da sorte de hoje',
    lead: 'Seis números da sorte de 1 a 45, gerados pela sua data de nascimento e a data de hoje',
    submit: 'Ver meus números',
    empty: 'Digite sua data de nascimento para ver os números de hoje',
    bonus: 'Extra', direction: 'Direção da sorte', weekday: 'Dia de sorte', timeSlot: 'Horas de sorte',
    note: 'Estes números são gerados pela sua data de nascimento e pela data de hoje. São diversão — não melhoram a probabilidade de nenhuma loteria, e esta página não é um convite a comprar bilhetes.',
  },
  ja: {
    ...DATE_FORM.ja,
    title: '今日のラッキーナンバー',
    lead: '生年月日と今日の日付から作る、1〜45の六つの数字',
    submit: '数字を見る',
    empty: '生年月日を入れると今日の数字が出ます',
    bonus: 'ボーナス', direction: 'ラッキー方位', weekday: 'ラッキーな曜日', timeSlot: 'ラッキーな時間帯',
    note: 'この数字は生年月日と今日の日付から作っています。遊びであって、どの宝くじの当選確率も上げません。購入をすすめるものでもありません。',
  },
  de: {
    ...DATE_FORM.de,
    title: 'Glückszahlen für heute',
    lead: 'Sechs Glückszahlen von 1 bis 45, erzeugt aus deinem Geburtsdatum und dem heutigen Datum',
    submit: 'Zahlen anzeigen',
    empty: 'Gib dein Geburtsdatum ein, um die Zahlen von heute zu sehen',
    bonus: 'Zusatzzahl', direction: 'Glücksrichtung', weekday: 'Glückstag', timeSlot: 'Glücksstunden',
    note: 'Diese Zahlen entstehen aus deinem Geburtsdatum und dem heutigen Datum. Sie sind Spaß — sie verbessern die Chancen keiner Lotterie, und diese Seite ist keine Aufforderung, Lose zu kaufen.',
  },
  fr: {
    ...DATE_FORM.fr,
    title: 'Numéros porte-bonheur du jour',
    lead: 'Six numéros de 1 à 45, générés à partir de votre date de naissance et de la date du jour',
    submit: 'Voir mes numéros',
    empty: 'Saisissez votre date de naissance pour voir les numéros du jour',
    bonus: 'Bonus', direction: 'Direction porte-bonheur', weekday: 'Jour de chance', timeSlot: 'Heures de chance',
    note: 'Ces numéros sont générés à partir de votre date de naissance et de la date du jour. C’est un jeu : ils n’améliorent les probabilités d’aucune loterie, et cette page n’invite pas à acheter des billets.',
  },
  hi: {
    ...DATE_FORM.hi,
    title: 'आज के भाग्यशाली अंक',
    lead: '1 से 45 तक छह भाग्यशाली अंक, आपकी जन्म तिथि और आज की तारीख़ से बने',
    submit: 'मेरे अंक दिखाइए',
    empty: 'आज के अंक देखने के लिए जन्म तिथि भरिए',
    bonus: 'बोनस', direction: 'भाग्यशाली दिशा', weekday: 'भाग्यशाली दिन', timeSlot: 'भाग्यशाली समय',
    note: 'ये अंक आपकी जन्म तिथि और आज की तारीख़ से बनते हैं। यह मज़े के लिए है — इससे किसी लॉटरी की संभावना नहीं बढ़ती, और यह पेज टिकट ख़रीदने का सुझाव नहीं है।',
  },
  'zh-hans': {
    ...DATE_FORM['zh-hans'],
    title: '今天的幸运数字',
    lead: '用你的出生日期和今天的日期生成的六个 1–45 幸运数字',
    submit: '查看我的数字',
    empty: '填入出生日期就能看到今天的数字',
    bonus: '特别号', direction: '幸运方位', weekday: '幸运日', timeSlot: '幸运时段',
    note: '这些数字由你的出生日期和今天的日期生成。它只是好玩——不会提高任何彩票的中奖概率，本页也不是建议你去买彩票。',
  },
  'zh-hant': {
    ...DATE_FORM['zh-hant'],
    title: '今天的幸運數字',
    lead: '用你的出生日期和今天的日期產生的六個 1–45 幸運數字',
    submit: '查看我的數字',
    empty: '填入出生日期就能看到今天的數字',
    bonus: '特別號', direction: '幸運方位', weekday: '幸運日', timeSlot: '幸運時段',
    note: '這些數字由你的出生日期和今天的日期產生。它只是好玩——不會提高任何彩券的中獎機率，本頁也不是建議你去買彩券。',
  },
};

export default function LuckyNumbers({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [result, setResult] = useState<ReturnType<typeof getLuckyLotto> | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];
  const labels = lottoLabels(lang);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);

    if (!y || !m || !d) { setError(c.errAll); return; }
    if (m < 1 || m > 12) { setError(c.errMonth); return; }
    if (d < 1 || d > 31) { setError(c.errDay); return; }

    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(c.errInvalid); return;
    }
    if (date > new Date()) { setError(c.errFuture); return; }

    setError('');
    const raw = getLuckyLotto(y, m, d, ymdOf(new Date()));
    // 요일·시간대는 한국어 문자열로 나오므로 인덱스를 다시 계산해 언어별 라벨로 바꾼다.
    setResult({
      ...raw,
      weekday: labels.weekdays[weekdayIndex(raw.weekday)],
      timeSlot: labels.timeSlots[timeSlotIndex(raw.timeSlot)],
      direction: directionLabel(raw.direction, lang),
    });
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="page-back hover:text-emerald-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
          <span className="ml-auto shrink-0">
            {/* 한국어만 주소가 다르다 — 한국 로또 전용으로 만들어 lucky-lotto다 */}
            <LangPicker
              current={lang}
              route="/fortune/lucky-numbers"
              overrides={{ ko: '/fortune/lucky-lotto' }}
              available={ALL_LOCALES10}
            />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🍀" className="h-6 w-6" /></span>
          <div className="hero-band">
            <PageHero title={c.title} desc={c.lead} />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-lg border chip-off p-5 mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="fld focus:border-emerald-400" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="fld focus:border-emerald-400" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="fld focus:border-emerald-400" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3 transition-colors">
            {c.submit}
          </button>
        </form>

        {result ? (
          <div className="space-y-4">
            <div className="rounded-lg border chip-off p-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {result.numbers.map(n => (
                  <span key={n} className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-bold shadow-sm"
                    style={{ background: ballColor(n) }}>
                    {n}
                  </span>
                ))}
                <span className="text-slate-300 dark:text-slate-600 font-bold px-1">+</span>
                <span className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-bold shadow-sm ring-2 ring-offset-2 ring-slate-300 dark:ring-offset-slate-900"
                  style={{ background: ballColor(result.bonus) }}>
                  {result.bonus}
                </span>
              </div>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-3">{c.bonus}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: c.direction, value: result.direction, icon: '🧭' },
                { label: c.weekday, value: result.weekday, icon: '📅' },
                { label: c.timeSlot, value: result.timeSlot, icon: '⏰' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border chip-off p-4 text-center">
                  <ToolIcon emoji={item.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">{item.label}</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>

            <ReferralCards lang="en" placement="result" />
          </div>
        ) : (
          <div className="py-12 text-slate-300 dark:text-slate-600">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="☝️" className="h-6 w-6" /></span>
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{c.note}</p>
      </div>
    </div>
  );
}

/* ── 한국어 결과 문자열 → 인덱스 ── */
const KO_WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const KO_TIME_SLOTS = ['이른 아침(6~9시)', '오전(9~12시)', '점심 무렵(12~14시)', '오후(14~18시)', '저녁(18~21시)', '늦은 밤(21~24시)'];
const KO_DIRECTIONS = ['동쪽', '서쪽', '남쪽', '북쪽', '동남쪽', '서남쪽'];
const DIRECTIONS_EN = ['East', 'West', 'South', 'North', 'Southeast', 'Southwest'];

function weekdayIndex(ko: string): number {
  const i = KO_WEEKDAYS.indexOf(ko);
  return i < 0 ? 0 : i;
}
function timeSlotIndex(ko: string): number {
  const i = KO_TIME_SLOTS.indexOf(ko);
  return i < 0 ? 0 : i;
}
function directionLabel(ko: string, lang: IntlLang): string {
  const i = KO_DIRECTIONS.indexOf(ko);
  const table = DIRECTIONS_EN;
  return table[i < 0 ? 0 : i];
}
