import { localeHref, type AnyLocale10 } from '@/lib/locales';
import { langOfLocale } from '@/lib/i18n/lang';
/* common만 본다 — lib/legal의 입구는 withCard를 끌고 오고, 푸터는 모든 페이지에 있다 */
import { LEGAL_CHROME, LEGAL_KINDS, legalRoute } from '@/lib/legal/common';
import { homeSections } from '@/lib/locale-home';
import ToolIcon from '@/components/ToolIcon';
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

const SECTIONS: { href: string; icon: string; label: string }[] = [
  { href: "/calculator", icon: "📊", label: "계산기" },
  { href: "/test", icon: "🧭", label: "심리테스트" },
  { href: "/quiz", icon: "🏆", label: "지식퀴즈" },
  { href: "/generator", icon: "⚙️", label: "생성기" },
  { href: "/checklist", icon: "✅", label: "체크리스트" },
  { href: "/fortune", icon: "🔮", label: "오늘의 운세" },
  { href: "/random", icon: "🎲", label: "랜덤 뽑기" },
  { href: "/snap", icon: "📸", label: "스냅테스트" },
  { href: "/device", icon: "🧰", label: "기기 점검" },
  { href: "/image", icon: "🖼️", label: "이미지 도구" },
  { href: "/text", icon: "✍️", label: "텍스트 도구" },
  { href: "/game", icon: "🕹️", label: "두뇌 게임" },
  { href: "/color", icon: "🎨", label: "색상 도구" },
  { href: "/time", icon: "⏰", label: "시간 도구" },
  { href: "/sound", icon: "🔊", label: "소리 도구" },
  { href: "/food", icon: "🍳", label: "계량·요리" },
  { href: "/convert", icon: "🔄", label: "단위 변환" },
];

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

/**
 * 영어 푸터에만 손으로 두는 한 줄 — /crypto다.
 *
 * ── 왜 넷에서 이 하나로 줄었나 (2026-08-13) ──────────────────
 * 전에는 영어 섹션을 여기 넷만 적어 두었다("영어로 실제 페이지가 있는 섹션만").
 * 그 문구는 아홉 언어를 접기 전(lib/fold/registry.ts) 이야기다. 지금 영어는
 * **114개 섹션이 다 있고**(homeSections('en')로 확인), 다른 아홉 언어 푸터는
 * 이미 그 114개를 건다. 영어만 넷이었다.
 *
 * 게다가 그 넷 중 하나가 `/calculator/en`이었다 — 손으로 복사한 낡은 허브라
 * 계산기 158개 중 89개만 걸고, 그중 44개는 영어판이 따로 있는데도 한국어 쪽을
 * 가리켰다. 진짜 허브는 `/en/calculator`이고 homeSections에 들어 있다.
 *
 * /crypto만 남기는 까닭: 그 섹션은 한국어 라우트에 영어 내용이 있는 예외라
 * lib/locale-home.ts의 목록에 없다(거기는 열 언어 섹션만 든다).
 */
const CRYPTO_EN = { href: "/crypto", icon: "🪙", label: "Crypto Tools" };

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

export default function SiteFooter({ lang = 'ko', referral = true }: { lang?: Lang; referral?: boolean }) {
  const t = COPY[lang];
  /*
    섹션 목록을 언어마다 다시 적지 않는다 — lib/locale-home.ts가 "그 언어에 실제로
    있는 섹션"을 이미 갖고 있고, 언어 첫 화면이 그것으로 그려진다. 여기서 또 적으면
    섹션을 번역할 때 두 곳을 고쳐야 하고, 푸터만 옛 목록으로 남는다.

    인기 도구는 한국어 계산기 목록이라 다른 언어에서는 감춘다. 클릭한 순간 읽을 수
    없는 페이지가 나오는 것보다 없는 편이 낫다.
  */
  const translated = lang !== 'ko' && lang !== 'en';
  /*
   * 한국어만 손으로 적은 목록을 쓴다 — homeSections('ko')는 빈 배열이다
   * (lib/locale-home.ts는 아홉 언어용이고 한국어 첫 화면은 app/(ko)/page.tsx가 따로 그린다).
   * 영어를 포함한 나머지 아홉은 그 목록 하나에서 나온다.
   */
  const sections = lang === 'ko'
    ? SECTIONS
    : [
        ...(lang === 'en' ? [CRYPTO_EN] : []),
        ...homeSections(lang).map(s => ({ href: localeHref(lang, s.route), icon: s.icon, label: s.title })),
      ];
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
          className="group flex items-center gap-2.5 mb-8 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-colors"
        >
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-slate-600 transition-colors">
              {t.searchHint}
            </span>
            <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">
              {t.searchCta}
            </span>
        </Link>

        {/* 섹션 바로가기 */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
          {t.browse}
        </p>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
          {sections.map((s) => (
            <Link prefetch={false}
              key={s.href}
              href={s.href}
              className="nav-chip"
            >
              <ToolIcon emoji={s.icon} className="nav-chip-icon" />
              {s.label}
            </Link>
          ))}
        </nav>

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
          제휴 링크는 푸터에 두지 않는다.

          한때 작은 텍스트 링크였다가 큰 카드가 되었다가, 결국 뺐다. 제휴 카드가
          각 섹션의 결과 지점(계산기 본문, 테스트·퀴즈 결과 화면, 생성기 결과,
          체크리스트 진행 중, 운세)으로 옮겨가면서 푸터 자리는 같은 페이지에 카드를
          두 번 얹는 꼴이 됐다. 클릭은 결과 지점 쪽이 거의 다 가져가는데, 짧은
          계산기 페이지에서는 광고 대 콘텐츠 비율만 나빠 보였다 — 저품질 판정을
          한 번 받은 사이트에서 굳이 감수할 이유가 없다.

          다시 넣고 싶어지면 결과 지점 노출과 겹치지 않는지부터 확인할 것.
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
          <Link prefetch={false} href="/" className="flex items-center gap-0.5 shrink-0">
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
