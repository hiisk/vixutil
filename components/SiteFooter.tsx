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
type Lang = 'ko' | 'en';

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

/** 중국어 페이지가 있는 섹션만 — app/zh 아래 허브가 실제로 있는 것들이다 */
const SECTIONS_ZH: { href: string; icon: string; label: string }[] = [
  { href: "/zh/convert", icon: "🔄", label: "单位换算" },
  { href: "/zh/rate", icon: "📊", label: "比率计算" },
  { href: "/zh/body", icon: "🩺", label: "身体数值" },
  { href: "/zh/geometry", icon: "📐", label: "几何计算" },
  { href: "/zh/country", icon: "🧭", label: "国家资讯" },
  { href: "/zh/hanja", icon: "📖", label: "四字成语" },
  { href: "/zh/color", icon: "🎨", label: "色彩工具" },
  { href: "/zh/time", icon: "⏰", label: "时间工具" },
  { href: "/zh/image", icon: "🖼️", label: "图片工具" },
  { href: "/zh/text", icon: "✍️", label: "文本工具" },
  { href: "/zh/sound", icon: "🔊", label: "声音工具" },
  { href: "/zh/food", icon: "🍳", label: "计量与料理" },
  { href: "/zh/device", icon: "🧰", label: "设备检测" },
  { href: "/zh/game", icon: "🕹️", label: "益智游戏" },
  { href: "/zh/quiz", icon: "🏆", label: "知识问答" },
  { href: "/zh/test", icon: "🧠", label: "心理测试" },
  { href: "/zh/generator", icon: "⚙️", label: "生成器" },
  { href: "/zh/checklist", icon: "✅", label: "清单" },
  { href: "/zh/random", icon: "🎲", label: "随机抽取" },
  { href: "/zh/fortune", icon: "🔮", label: "今日运势" },
  { href: "/zh/snap", icon: "📸", label: "拍照测试" },
];

const POPULAR_ZH: { href: string; label: string }[] = [
  { href: "/zh/convert/cm-inch", label: "厘米英寸换算" },
  { href: "/zh/rate/discount", label: "折扣计算" },
  { href: "/zh/body/bmi", label: "BMI计算" },
  { href: "/zh/geometry/circle-area", label: "圆面积" },
  { href: "/zh/country/japan", label: "日本旅行资讯" },
  { href: "/zh/hanja/samyeonchoga", label: "四面楚歌" },
];

const COPY = {
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
} as const;

export default function SiteFooter({ lang = 'ko' }: { lang?: Lang }) {
  const t = COPY[lang];
  const sections = lang === 'en' ? SECTIONS_EN : SECTIONS;
  const popular = lang === 'en' ? POPULAR_EN : POPULAR;

  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-4">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/*
          통합 검색 — 홈에만 있으면 도구 페이지에 깊이 들어온 사용자가 닿을 수 없다.
          푸터는 모든 페이지에 있으므로 여기가 가장 확실한 진입점이다.
        */}
        <Link
          href="/search"
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
