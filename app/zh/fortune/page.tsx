import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '今日运势免费查询 — 星座、生肖、血型',
  description: '免费查看今日运势：按星座、生肖或血型查询总运、爱情、财运、事业与健康，附幸运色与幸运数字。每日更新。',
  alternates: {
    canonical: '/zh/fortune',
    languages: { 'zh': '/zh/fortune', 'en': '/en/fortune', 'ko': '/fortune', 'x-default': '/en/fortune' },
  },
};

/* 영어 허브와 같은 이유로 실제로 만든 것만 싣는다 — 없는 페이지를 링크하면 404다. */
const TYPES = [
  { href: '/zh/fortune/daily',      icon: '🔮', title: '今日综合运势', desc: '按出生日期查看今天的运势', badge: '每日', color: 'from-purple-500 to-pink-600' },
  { href: '/zh/fortune/zodiac',     icon: '⭐', title: '星座运势', desc: '12 星座今日运势查询',        badge: '12星座', color: 'from-violet-500 to-purple-700' },
  { href: '/zh/fortune/animal',     icon: '🐉', title: '生肖运势', desc: '十二生肖今日运势查询',       badge: '12生肖', color: 'from-rose-500 to-pink-600' },
  { href: '/zh/fortune/blood-type', icon: '🩸', title: '血型运势', desc: 'A、B、O、AB 型今日运势',     badge: '4种',   color: 'from-rose-500 to-red-600' },
  { href: '/zh/fortune/biorhythm',  icon: '📈', title: '生物节律', desc: '身体·情绪·智力三条节律曲线', badge: '图表',  color: 'from-emerald-500 to-teal-600' },
  { href: '/zh/fortune/birth-stone', icon: '💎', title: '诞生石·诞生花', desc: '出生月份的宝石与花及其含义', badge: '12个月', color: 'from-fuchsia-500 to-violet-600' },
  { href: '/zh/fortune/today-color', icon: '🎨', title: '今日幸运色', desc: '今天的幸运色与要避开的颜色', badge: '每日', color: 'from-pink-500 to-violet-600' },
  { href: '/zh/fortune/lucky-numbers', icon: '🍀', title: '今日幸运数字', desc: '由出生日期生成的 6 个数字', badge: '每日', color: 'from-emerald-500 to-teal-600' },
  { href: '/zh/fortune/star-match',   icon: '💞', title: '星座配对', desc: '按四元素看两个星座的相配程度', badge: '12星座', color: 'from-violet-500 to-fuchsia-600' },
  { href: '/zh/fortune/zodiac-match', icon: '🐲', title: '生肖配对', desc: '六合、三合、相冲的传统相性', badge: '12生肖', color: 'from-rose-500 to-red-600' },
  { href: '/zh/fortune/mbti-match',   icon: '🧠', title: 'MBTI 配对', desc: '16型人格中两者的契合度', badge: '16型', color: 'from-violet-500 to-indigo-600' },
  { href: '/zh/fortune/blood-match',  icon: '🩸', title: '血型配对', desc: 'A、B、O、AB 型的配对结果', badge: '4种', color: 'from-rose-500 to-orange-600' },
  { href: '/zh/fortune/mbti',         icon: '🧠', title: 'MBTI 今日运势', desc: '16型人格的今日运势', badge: '16型', color: 'from-sky-500 to-blue-600' },
  { href: '/zh/fortune/daily-tarot', icon: '🃏', title: '今日塔罗',   desc: '大阿尔卡纳中的一张', badge: '每日', color: 'from-amber-500 to-orange-600' },
  { href: '/zh/fortune/tarot-yesno', icon: '🔮', title: '塔罗是与否', desc: '抽一张牌得到答案',   badge: '抽牌', color: 'from-indigo-500 to-violet-700' },
  { href: '/zh/fortune/tarot',       icon: '🎴', title: '塔罗占卜',       desc: '完整 78 张牌，四种牌阵', badge: '牌阵', color: 'from-violet-500 to-purple-700' },
  { href: '/zh/fortune/dream',      icon: '🌙', title: '周公解梦', desc: '20 个常见梦境意象', badge: '20种', color: 'from-slate-700 to-indigo-800' },
  { href: '/zh/fortune/saju',       icon: '🔯', title: '八字排盘', desc: '由出生年月日时排出四柱', badge: '排盘', color: 'from-indigo-500 to-violet-700' },
];

export default function ZhFortuneHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/zh/fortune" className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">今日运势</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/fortune" className="hover:text-violet-600" hrefLang="ko">한국어</Link>
            <Link href="/en/fortune" className="hover:text-violet-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <ToolIcon emoji="🔮" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">今日运势</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">每日更新 · 星座、生肖、血型</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md hover:border-violet-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <ToolIcon emoji={t.icon} className="text-slate-800 dark:text-slate-100 w-8 h-8" />
                  {t.badge && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 border border-violet-100 dark:border-violet-900/40">{t.badge}</span>}
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-600">
                  查看今日
                  <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-10">
          运势根据当天日期生成，仅供娱乐参考
        </p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费今日运势</p>
      </footer>
    </div>
  );
}
