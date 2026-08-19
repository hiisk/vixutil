import { localeHref, type AnyLocale10 } from '@/lib/locales';
import { langOfLocale } from '@/lib/i18n/lang';
/* common만 본다 — lib/legal의 입구는 withCard를 끌고 오고, 푸터는 모든 페이지에 있다 */
import { LEGAL_CHROME, LEGAL_KINDS, legalRoute } from '@/lib/legal/common';
import SectionShortcuts from '@/components/SectionShortcuts';
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import ReferralCards from '@/components/ReferralCards';

/**
 * 사이트 전역 푸터 — 섹션 간 이동 동선 + 내부링크(SEO) + 인기 도구 노출.
 * 각 도구 페이지가 하나의 섬처럼 고립되지 않도록 모든 하위 페이지에 넣는다.
 *
 * lang이 ko가 아니면 문구를 바꾸는 데 그치지 않고 **링크 목록 자체를 바꾼다**.
 * 영어 사용자에게 한국어 전용 계산기(실수령액·퇴직금 등)를 내보내면 클릭한 순간
 * 읽을 수 없는 페이지가 나오기 때문이다. 그 언어로 실제 존재하는 섹션만 건다.
 */
type Lang = AnyLocale10;

/* 섹션 바로가기 목록·격자는 components/SectionShortcuts.tsx로 옮겼다 —
   통합 검색의 빈 화면이 같은 목록을 쓴다. */

const POPULAR: { href: string; label: string }[] = [
  { href: "/calculator/salary", label: "실수령액" },
  { href: "/calculator/unemployment", label: "실업급여" },
  { href: "/calculator/severance", label: "퇴직금" },
  { href: "/calculator/loan", label: "대출이자" },
  { href: "/calculator/compound", label: "복리" },
  { href: "/fortune/saju", label: "사주분석" },
  { href: "/fortune/dream", label: "꿈해몽" },
  { href: "/fortune/tarot", label: "타로" },
];

const POPULAR_EN: { href: string; label: string }[] = [
  { href: "/crypto/signals", label: "Signal Board" },
  { href: "/crypto/funding-rates", label: "Funding Rates" },
  { href: "/crypto/liquidation-calculator", label: "Liquidation Calculator" },
  { href: "/crypto/dca-calculator", label: "DCA Calculator" },
  { href: "/crypto/atr-tpsl", label: "ATR TP/SL" },
];



const COPY: Record<Lang, {
  searchHint: string; searchCta: string; browse: string; popular: string; tagline: string;
}> = {
  ko: {
    searchHint: "찾는 도구가 있나요?",
    searchCta: "전체 검색",
    browse: "다른 도구 둘러보기",
    popular: "인기 도구",
    tagline: "일상에 필요한 실용 도구 · 2026",
  },
  en: {
    searchHint: "Looking for something else?",
    searchCta: "Search all",
    browse: "Browse other tools",
    popular: "Popular tools",
    tagline: "Practical everyday tools · 2026",
  },
  es: {
    searchHint: "¿Buscas otra cosa?",
    searchCta: "Buscar todo",
    browse: "Explorar otras herramientas",
    popular: "Herramientas populares",
    tagline: "Herramientas prácticas para el día a día · 2026",
  },
  'zh-hans': {
    searchHint: "还想找点别的？",
    searchCta: "搜索全部",
    browse: "看看其他工具",
    popular: "热门工具",
    tagline: "日常实用小工具 · 2026",
  },
  'zh-hant': {
    searchHint: "還想找點別的？",
    searchCta: "搜尋全部",
    browse: "看看其他工具",
    popular: "熱門工具",
    tagline: "日常實用小工具 · 2026",
  },
  'pt-br': {
    searchHint: "Procurando outra coisa?",
    searchCta: "Buscar tudo",
    browse: "Ver outras ferramentas",
    popular: "Ferramentas populares",
    tagline: "Ferramentas práticas para o dia a dia · 2026",
  },
  ja: {
    searchHint: "ほかに探しているものがありますか？",
    searchCta: "すべて検索",
    browse: "ほかのツールを見る",
    popular: "よく使われるツール",
    tagline: "毎日に役立つ実用ツール · 2026",
  },
  de: {
    searchHint: "Suchst du etwas anderes?",
    searchCta: "Alles durchsuchen",
    browse: "Weitere Werkzeuge ansehen",
    popular: "Beliebte Werkzeuge",
    tagline: "Praktische Alltagswerkzeuge · 2026",
  },
  fr: {
    searchHint: "Tu cherches autre chose ?",
    searchCta: "Tout chercher",
    browse: "Voir d’autres outils",
    popular: "Outils populaires",
    tagline: "Des outils pratiques du quotidien · 2026",
  },
  hi: {
    searchHint: "कुछ और खोज रहे हैं?",
    searchCta: "सब खोजें",
    browse: "अन्य उपकरण देखें",
    popular: "लोकप्रिय उपकरण",
    tagline: "रोज़मर्रा के काम के उपकरण · 2026",
  },
};

export default function SiteFooter({ lang = 'ko', referral = true, browse = true }: { lang?: Lang; referral?: boolean; browse?: boolean }) {
  const t = COPY[lang];
  /*
    인기 도구는 한국어 계산기 목록이라 다른 언어에서는 감춘다. 클릭한 순간 읽을 수
    없는 페이지가 나오는 것보다 없는 편이 낫다.
  */
  const translated = lang !== 'ko' && lang !== 'en';
  const popular = translated ? [] : lang === 'en' ? POPULAR_EN : POPULAR;
  const searchHref = localeHref(lang, '/search');
  /*
    정책·소개 네 장의 이름 — 열 언어가 lib/legal의 표 하나를 본다.
    푸터에 적으면 문구가 두 벌이 되고, 페이지 제목과 푸터 이름이 갈린다.
  */
  const legalNav = LEGAL_CHROME[langOfLocale(lang)].nav;
  /*
   * 통합 검색은 **열 언어에 다 있다.**
   *
   * 전에는 중국어만 뺐다("아직 없어서 링크를 걸면 404다"). 그 뒤 중국어가 채워졌는데
   * 이 줄이 남아, 중국어 페이지 약 4만 장에서 검색 진입점이 사라져 있었다 —
   * 푸터는 모든 화면에 있으므로 그 한 줄이 사이트의 한 언어를 통째로 덮는다.
   *
   * 2026-08-13에 라이브에서 확인했다: /zh-hans/search · /zh-hant/search 둘 다 200이고
   * 제목도 중국어다(搜索 | vixutil). 등록부에도 언어 필터가 없다(lib/fold/registry.ts의
   * 'search'는 모든 언어가 같이 쓴다). 그래서 조건을 걷는다.
   */

  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-4">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/*
          제휴 카드는 푸터에 둔다.
          예전에는 코인·운세·뽑기·관상 네 섹션에만 있었다. 나머지 스물일곱 섹션은
          카드를 아예 못 봤는데, 그쪽이 방문의 대부분이다. 화면마다 손으로 넣으면
          새 페이지를 만들 때 또 빠지므로, 모든 화면이 이미 쓰고 있는 이 자리에
          한 번만 둔다.

          본문 아래·푸터 목록 위가 자리다. 읽던 것을 끝낸 사람만 만나고, 읽는
          중인 사람을 가로막지 않는다.

          결과 화면처럼 본문 한가운데에 이미 카드를 세운 페이지는 referral={false}로
          이 자리를 끈다. 한 화면에 같은 광고가 두 번 뜨면 둘 다 값이 떨어진다.
        */}
        {referral && (
          <div className="mb-8">
            <ReferralCards lang={lang} />
          </div>
        )}

        {/*
          통합 검색 — 홈에만 있으면 도구 페이지에 깊이 들어온 사용자가 닿을 수 없다.
          푸터는 모든 페이지에 있으므로 여기가 가장 확실한 진입점이다.
        */}
        <Link prefetch={false}
          href={searchHref}
          className="group flex items-center gap-2.5 mb-8 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-sec-soft transition-colors"
        >
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-sec transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-slate-600 transition-colors">
              {t.searchHint}
            </span>
            <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-sec transition-colors">
              {t.searchCta}
            </span>
        </Link>

        {/* 섹션 바로가기 — 통합 검색은 이 목록을 첫 화면 위쪽에 이미 그리므로 끈다 */}
        {browse && (
          <>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
              {t.browse}
            </p>
            <div className="mb-8">
              <SectionShortcuts lang={lang} />
            </div>
          </>
        )}

        {/* 인기 도구 */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
          {t.popular}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {popular.map((p) => (
            <Link prefetch={false}
              key={p.href}
              href={p.href}
              className="foot-chip hover:text-slate-700"
            >
              {p.label}
            </Link>
          ))}
        </div>

        {/*
          제휴 링크는 한때 이 자리에 있다가 빠졌고, 여기 "푸터에 두지 않는다"는
          설명이 한동안 남아 있었다. 지금은 다시 둔다 — 자리는 여기가 아니라
          푸터 맨 위이고(위 ReferralCards), 끄는 손잡이는 referral={false}다.
          되돌린 까닭은 기록에 없어 적지 않는다.
        */}
        {/*
          정책·소개 네 장 — 소개·문의·개인정보 처리방침·이용약관.

          푸터에 두는 이유가 둘이다. 애드센스 심사자는 이 네 장을 **푸터에서**
          찾고, 없으면 "가치 없는 콘텐츠"로 읽는다. 그리고 푸터는 모든 페이지에
          있으므로 크롤러가 어느 낱장에서 들어와도 네 장에 한 번에 닿는다.
          홈에만 두면 도구 페이지에 깊이 들어온 쪽에서 닿을 수 없다.

          링크는 그 언어의 주소로 간다 — 열 언어에 네 장이 다 있다.
        */}
        <nav className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 text-xs font-medium text-slate-400 dark:text-slate-500">
          {LEGAL_KINDS.map((k) => (
            <Link prefetch={false}
              key={k}
              href={localeHref(lang, legalRoute(k))}
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {legalNav[k]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
          {/* 로고는 그 언어의 홈으로 — 푸터는 열 언어 모든 장에 있어서
              "/"로 굳혀 두면 일본어 사용자가 한국어 홈으로 튕긴다 */}
          <Link prefetch={false} href={localeHref(lang, '/')} className="flex items-center gap-0.5 shrink-0">
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-sm font-black text-blue-600 tracking-tighter">util</span>
          </Link>
          <p className="text-xs text-slate-300 dark:text-slate-600 hidden sm:block">{t.tagline}</p>
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </footer>
  );
}
