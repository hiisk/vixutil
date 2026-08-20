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
    // 낱장은 거의 전부 이 톤이다 — 한 장에 여섯 항목 × 네 자리라 CSS로 뺐다
    list: 'faq-list',
    question: 'faq-q-light',
    chevron: 'faq-chevron-light',
    answer: 'faq-a-light',
  },
  dark: {
    heading: 'text-slate-100',
    list: 'faq-list border-slate-800 bg-slate-900/50 divide-slate-800',
    question: 'text-slate-200',
    chevron: 'text-slate-500 dark:text-slate-400',
    answer: 'text-slate-500 dark:text-slate-400',
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
      <h2 className={`text-base font-bold mb-3 ${c.heading}`}>
        {title ?? (tone === 'dark' ? FAQ_TITLE.en : FAQ_TITLE[lang])}
      </h2>
      {/*
        첫 항목만 펴 둔다. 전부 접혀 있으면 이 자리가 «질문 목록»으로만 보여서,
        답이 실제로 여기 있다는 것을 아무도 모른다 — 하나가 펴져 있으면 나머지도
        열어 본다. 검색엔진에도 접힌 글보다 편 글이 낫다.
      */}
      <div className={c.list}>
        {items.map((item, i) => (
          <details key={i} open={i === 0} className="group faq-item">
            <summary className={`faq-q ${c.question}`}>
              <span className="flex-1 pr-2"><span className="faq-mark">Q</span>{item.q}</span>
              <svg className={`faq-chevron ${c.chevron}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <p className={`body-p pb-3 ${c.answer}`}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
