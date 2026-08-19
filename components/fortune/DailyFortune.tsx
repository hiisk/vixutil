'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import FortuneDisplayIntl from './FortuneDisplayIntl';
import { t, formatToday, type Lang } from '@/lib/fortune-intl';
import { DATE_FORM, type DateForm } from '@/lib/fortune-form-intl';

type IntlLang = Exclude<Lang, 'ko'>;

const COPY: Record<IntlLang, {
  title: string; lead: string; submit: string; empty: string;
  bornOn: (y: number, m: number, d: number) => string;
  basis: string; badge: string; howQ: string; howA: string;
} & DateForm> = {
  en: {
    ...DATE_FORM.en,
    title: 'Today’s Horoscope by Birth Date',
    lead: 'Your overall, love, money, work and health reading for today',
    submit: 'Read today’s fortune',
    empty: 'Enter your date of birth to see today’s reading',
    bornOn: (y, m, d) => `Born ${formatToday('en', new Date(y, m - 1, d))}`,
    basis: 'For today', badge: 'Today’s reading',
    howQ: 'How is this decided?',
    howA: 'Your birth date and today’s date are mixed into a single value that picks one of the prepared readings. That means the same birthday on the same day gives the same result no matter how many times you refresh, and a new day gives a new reading. The date you enter is used for the calculation in your browser only and is never sent to a server. Treat it as entertainment — make the decisions that matter with real information and your own judgement.',
  },
  es: {
    ...DATE_FORM.es,
    title: 'Horóscopo de hoy por fecha de nacimiento',
    lead: 'Tu lectura general, de amor, dinero, trabajo y salud para hoy',
    submit: 'Ver el horóscopo de hoy',
    empty: 'Escribe tu fecha de nacimiento para ver la lectura de hoy',
    bornOn: (y, m, d) => `Nacido el ${formatToday('es', new Date(y, m - 1, d))}`,
    basis: 'Para hoy', badge: 'Lectura de hoy',
    howQ: '¿Cómo se decide esto?',
    howA: 'Tu fecha de nacimiento y la fecha de hoy se mezclan en un único valor que elige una de las lecturas preparadas. Eso significa que el mismo cumpleaños en el mismo día da el mismo resultado por muchas veces que recargues, y que un día nuevo trae una lectura nueva. La fecha que escribes se usa para el cálculo solo en tu navegador y nunca se envía a un servidor. Tómatelo como entretenimiento: las decisiones importantes tómalas con información real y con tu propio criterio.',
  },
  'pt-br': {
    ...DATE_FORM['pt-br'],
    title: 'Horóscopo de hoje pela data de nascimento',
    lead: 'Sua leitura geral, de amor, dinheiro, trabalho e saúde para hoje',
    submit: 'Ver o horóscopo de hoje',
    empty: 'Digite sua data de nascimento para ver a leitura de hoje',
    bornOn: (y, m, d) => `Nascido em ${formatToday('pt-br', new Date(y, m - 1, d))}`,
    basis: 'Para hoje', badge: 'Leitura de hoje',
    howQ: 'Como isso é decidido?',
    howA: 'Sua data de nascimento e a data de hoje são misturadas em um único valor que escolhe uma das leituras preparadas. Isso significa que o mesmo aniversário no mesmo dia dá o mesmo resultado por mais que você recarregue, e que um novo dia traz uma leitura nova. A data que você digita é usada no cálculo apenas no seu navegador e nunca é enviada a um servidor. Leve na brincadeira — as decisões que importam, tome com informação real e com o seu próprio julgamento.',
  },
  ja: {
    ...DATE_FORM.ja,
    title: '生年月日でみる今日の運勢',
    lead: '総合・恋愛・金運・仕事・健康の今日の運勢',
    submit: '今日の運勢を見る',
    empty: '生年月日を入れると今日の運勢が出ます',
    bornOn: (y, m, d) => `${formatToday('ja', new Date(y, m - 1, d))}生まれ`,
    basis: '今日の分', badge: '今日の運勢',
    howQ: 'どうやって決まっていますか',
    howA: '生年月日と今日の日付をひとつの値に混ぜ、その値であらかじめ用意した文章を選んでいます。だから同じ誕生日・同じ日なら何度読み込んでも同じ結果になり、日が変われば内容も変わります。入力した日付はブラウザの中で計算に使うだけで、サーバーには送りません。娯楽として受け取り、大事な判断は実際の情報と自分の考えで決めてください。',
  },
  de: {
    ...DATE_FORM.de,
    title: 'Tageshoroskop nach Geburtsdatum',
    lead: 'Deine Lesung für heute — allgemein, Liebe, Geld, Beruf und Gesundheit',
    submit: 'Tageshoroskop anzeigen',
    empty: 'Gib dein Geburtsdatum ein, um die Lesung von heute zu sehen',
    bornOn: (y, m, d) => `Geboren am ${formatToday('de', new Date(y, m - 1, d))}`,
    basis: 'Für heute', badge: 'Lesung von heute',
    howQ: 'Wie wird das bestimmt?',
    howA: 'Dein Geburtsdatum und das heutige Datum werden zu einem einzigen Wert vermischt, der eine der vorbereiteten Lesungen auswählt. Derselbe Geburtstag am selben Tag ergibt also dasselbe Ergebnis, egal wie oft du neu lädst, und ein neuer Tag bringt eine neue Lesung. Das eingegebene Datum wird nur in deinem Browser zur Rechnung verwendet und nie an einen Server geschickt. Nimm es als Unterhaltung — wichtige Entscheidungen triffst du mit echten Informationen und eigenem Urteil.',
  },
  fr: {
    ...DATE_FORM.fr,
    title: 'Horoscope du jour selon la date de naissance',
    lead: 'Votre lecture du jour : général, amour, argent, travail et santé',
    submit: 'Voir l’horoscope du jour',
    empty: 'Saisissez votre date de naissance pour voir la lecture du jour',
    bornOn: (y, m, d) => `Né le ${formatToday('fr', new Date(y, m - 1, d))}`,
    basis: 'Pour aujourd’hui', badge: 'Lecture du jour',
    howQ: 'Comment est-ce déterminé ?',
    howA: 'Votre date de naissance et la date du jour sont mélangées en une seule valeur qui choisit l’une des lectures préparées. Le même anniversaire le même jour donne donc le même résultat, quel que soit le nombre de rechargements, et un nouveau jour apporte une nouvelle lecture. La date saisie ne sert au calcul que dans votre navigateur et n’est jamais envoyée à un serveur. Prenez cela comme un divertissement : les décisions qui comptent se prennent avec de vraies informations et votre propre jugement.',
  },
  hi: {
    ...DATE_FORM.hi,
    title: 'जन्म तिथि से आज का राशिफल',
    lead: 'आज का कुल, प्रेम, धन, काम और सेहत का हाल',
    submit: 'आज का राशिफल देखें',
    empty: 'आज का हाल देखने के लिए जन्म तिथि भरिए',
    bornOn: (y, m, d) => `जन्म: ${formatToday('hi', new Date(y, m - 1, d))}`,
    basis: 'आज के लिए', badge: 'आज का हाल',
    howQ: 'यह कैसे तय होता है?',
    howA: 'आपकी जन्म तिथि और आज की तारीख़ को मिलाकर एक मान बनाया जाता है, और वही मान पहले से तैयार पाठों में से एक चुनता है। इसका मतलब यह कि उसी जन्मदिन पर उसी दिन कितनी भी बार पेज खोलिए, नतीजा वही रहेगा, और नया दिन नया पाठ लाएगा। आपकी भरी तारीख़ सिर्फ़ आपके ब्राउज़र में गणना के लिए इस्तेमाल होती है, कभी सर्वर पर नहीं जाती। इसे मनोरंजन मानिए — असल फ़ैसले सही जानकारी और अपनी समझ से लीजिए।',
  },
  'zh-hans': {
    ...DATE_FORM['zh-hans'],
    title: '按出生日期看今天的运势',
    lead: '今天的综合、爱情、财运、事业和健康',
    submit: '查看今天的运势',
    empty: '填入出生日期就能看到今天的运势',
    bornOn: (y, m, d) => `${formatToday('zh-hans', new Date(y, m - 1, d))} 出生`,
    basis: '今天的', badge: '今日运势',
    howQ: '这是怎么定的？',
    howA: '把你的出生日期和今天的日期混成一个值，再用这个值从写好的文本里挑一条。所以同一个生日在同一天，刷新多少次结果都一样，换一天就换一条。你填的日期只在浏览器里参与计算，不会送到服务器。把它当娱乐看——要紧的决定，请用真实的信息和自己的判断。',
  },
  'zh-hant': {
    ...DATE_FORM['zh-hant'],
    title: '按出生日期看今天的運勢',
    lead: '今天的綜合、愛情、財運、事業和健康',
    submit: '查看今天的運勢',
    empty: '填入出生日期就能看到今天的運勢',
    bornOn: (y, m, d) => `${formatToday('zh-hant', new Date(y, m - 1, d))} 出生`,
    basis: '今天的', badge: '今日運勢',
    howQ: '這是怎麼定的？',
    howA: '把你的出生日期和今天的日期混成一個值，再用這個值從寫好的文本裡挑一條。所以同一個生日在同一天，重新整理多少次結果都一樣，換一天就換一條。你填的日期只在瀏覽器裡參與計算，不會送到伺服器。把它當娛樂看——要緊的決定，請用真實的資訊和自己的判斷。',
  },
};

export default function DailyFortune({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<{ y: number; m: number; d: number } | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];

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
    setBirth({ y, m, d });
    setTimeout(() => document.getElementById('daily-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="page-back hover:text-violet-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={"/fortune/daily"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="hero-band">
            <PageHero icon="🔮" title={c.title} desc={c.lead} />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-lg border chip-off p-5 mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="fld focus:border-violet-400" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="fld focus:border-violet-400" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="fld focus:border-violet-400" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-sec text-sm font-bold py-3.5 transition-all active:scale-[0.99] shadow-sm shadow-violet-200 dark:shadow-none">
            {c.submit}
          </button>
        </form>

        {birth ? (
          <div id="daily-result">
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{c.bornOn(birth.y, birth.m, birth.d)}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>{c.basis}</span>
            </div>
            {/* subjectId는 한국어와 같은 형식이라 같은 생일이면 세 언어가 같은 운세 등급을 받는다 */}
            <FortuneDisplayIntl
              subjectId={`daily-${birth.y}-${birth.m}-${birth.d}`}
              subjectName={c.bornOn(birth.y, birth.m, birth.d)}
              subjectEmoji="🔮"
              badge={c.badge}
              lang={lang}
            />
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        <div className="mt-8 rounded-lg border chip-off p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">{c.howQ}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.howA}</p>
        </div>
      </div>
    </div>
  );
}
