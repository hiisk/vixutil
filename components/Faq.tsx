import type { FaqItem } from '@/lib/calc-faq';
import type { AnyLocale10 } from '@/lib/locales';

/**
 * 제목만 언어별로 둔다. 질문·답은 부르는 쪽이 그 언어로 넘긴다.
 *
 * tone이 'dark'인 곳은 영어 전용 화면이라 언어와 무관하게 영어로 둔다.
 */
const FAQ_TITLE: Record<AnyLocale10, string> = {
  ko: '자주 묻는 질문',
  en: 'Frequently asked questions',
  es: 'Preguntas frecuentes',
  'pt-br': 'Perguntas frequentes',
  ja: 'よくある質問',
  de: 'Häufige Fragen',
  fr: 'Questions fréquentes',
  hi: 'अक्सर पूछे जाने वाले सवाल',
  'zh-hans': '常见问题',
  'zh-hant': '常見問題',
};
import JsonLd, { faqJsonLd } from './JsonLd';

/**
 * 범용 FAQ 섹션 — 표시 UI + FAQPage 구조화 데이터.
 * 계산기는 경로 기반 자동 조회를 쓰는 CalcFaq를, 그 외 페이지는 이 컴포넌트를 직접 쓴다.
 * tone='dark'는 크립토처럼 어두운 배경의 페이지용이다.
 */
const TONE = {
  light: {
    heading: 'text-slate-800 dark:text-slate-100',
    card: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700',
    question: 'text-slate-700 dark:text-slate-200',
    chevron: 'text-slate-400 dark:text-slate-500',
    answer: 'text-slate-600 dark:text-slate-300',
  },
  dark: {
    heading: 'text-slate-100',
    card: 'bg-slate-900/50 border-slate-800',
    question: 'text-slate-200',
    chevron: 'text-slate-500 dark:text-slate-400',
    answer: 'text-slate-400 dark:text-slate-500',
  },
} as const;

export default function Faq({
  items,
  tone = 'light',
  className = 'mt-8',
  lang = 'ko',
  title,
}: {
  items?: FaqItem[];
  tone?: keyof typeof TONE;
  className?: string;
  /** 페이지 언어. 다른 언어 페이지에 한국어 제목이 붙지 않도록 한다. */
  lang?: AnyLocale10;
  /** 제목을 직접 정할 때만 — 섹션 사전에 이미 문구가 있는 경우 */
  title?: string;
}) {
  if (!items || items.length === 0) return null;
  const c = TONE[tone];

  return (
    <section className={className} aria-label="FAQ">
      <JsonLd data={faqJsonLd(items)} />
      <h2 className={`text-base font-black mb-3 ${c.heading}`}>
        {title ?? (tone === 'dark' ? FAQ_TITLE.en : FAQ_TITLE[lang])}
      </h2>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <details
            key={i}
            className={`group faq-card ${c.card}`}
          >
            <summary className={`faq-q ${c.question}`}>
              <span className="flex-1 pr-2">Q. {item.q}</span>
              <svg className={`faq-chevron ${c.chevron}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <p className={`body-p ${c.answer}`}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
