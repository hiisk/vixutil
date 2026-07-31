import { localeHref, type AnyLocale10 } from '@/lib/locales';
import { homeSections } from '@/lib/locale-home';
import ToolIcon from '@/components/ToolIcon';
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

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

/** 영어로 실제 페이지가 있는 섹션만 — 없는 곳으로 보내면 한국어 화면이 나온다 */
const SECTIONS_EN: { href: string; icon: string; label: string }[] = [
  { href: "/crypto", icon: "🪙", label: "Crypto Tools" },
  { href: "/calculator/en", icon: "📊", label: "Calculators" },
  { href: "/en/generator", icon: "⚙️", label: "Generators" },
  { href: "/en/fortune", icon: "🔮", label: "Fortune" },
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

export default function SiteFooter({ lang = 'ko' }: { lang?: Lang }) {
  const t = COPY[lang];
  /*
    섹션 목록을 언어마다 다시 적지 않는다 — lib/locale-home.ts가 "그 언어에 실제로
    있는 섹션"을 이미 갖고 있고, 언어 첫 화면이 그것으로 그려진다. 여기서 또 적으면
    섹션을 번역할 때 두 곳을 고쳐야 하고, 푸터만 옛 목록으로 남는다.

    인기 도구는 한국어 계산기 목록이라 다른 언어에서는 감춘다. 클릭한 순간 읽을 수
    없는 페이지가 나오는 것보다 없는 편이 낫다.
  */
  const translated = lang !== 'ko' && lang !== 'en';
  const sections = lang === 'ko'
    ? SECTIONS
    : lang === 'en'
      ? SECTIONS_EN
      : homeSections(lang).map(s => ({ href: localeHref(lang, s.route), icon: s.icon, label: s.title }));
  const popular = translated ? [] : lang === 'en' ? POPULAR_EN : POPULAR;
  const searchHref = localeHref(lang, '/search');
  // 통합 검색은 여덟 언어에만 있다. 중국어에는 아직 없어서 링크를 걸면 404다 —
  // 빌드된 페이지를 훑는 검사가 실제로 이걸 잡았다.
  const hasSearch = !lang.startsWith('zh-');

  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-4">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/*
          통합 검색 — 홈에만 있으면 도구 페이지에 깊이 들어온 사용자가 닿을 수 없다.
          푸터는 모든 페이지에 있으므로 여기가 가장 확실한 진입점이다.
        */}
        {hasSearch && (
          <Link
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
        )}

        {/* 섹션 바로가기 */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
          {t.browse}
        </p>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
            >
              <ToolIcon emoji={s.icon} className="w-4 h-4 text-slate-400 dark:text-slate-500" />
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
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
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
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
          <Link href="/" className="flex items-center gap-0.5 shrink-0">
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
