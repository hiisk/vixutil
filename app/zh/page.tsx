import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'vixutil — 免费实用工具',
  description: '在浏览器里直接用的免费工具：单位换算、清单、测验、心理测试、名字生成器、随机抽取、照片测试与今日运势。免注册。',
  alternates: {
    canonical: '/zh',
    languages: { 'en': '/en', 'zh': '/zh', 'ko': '/', 'x-default': '/en' },
  },
};

/*
  중국어 진입점. 구조는 /en과 같다.

  섹션 허브는 있었는데 그걸 묶는 루트 페이지가 없어서, /zh로 가는 링크가
  404였고 방문자가 사이트 전체를 볼 방법도 없었다.

  실제로 만든 섹션만 싣는다 — 없는 곳을 링크하면 404이자 깨진 내부 링크다.
*/
const SECTIONS = [
  { href: '/zh/convert',   icon: '📐', title: '单位换算',   desc: '长度、重量、温度、面积等', color: 'from-slate-500 to-slate-700',   accent: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-50 dark:bg-slate-800/40' },
  { href: '/zh/checklist', icon: '✅', title: '清单',       desc: '搬家、旅行、面试、露营、婚礼', color: 'from-sky-400 to-cyan-600',     accent: 'text-sky-700 dark:text-sky-300',     border: 'border-sky-200 dark:border-sky-900/50',   bg: 'bg-sky-50 dark:bg-sky-950/30' },
  { href: '/zh/test',      icon: '🧭', title: '心理测试',   desc: '社交电量、压力、决策、工作风格', color: 'from-violet-500 to-pink-600',  accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { href: '/zh/quiz',      icon: '🏆', title: '测验',       desc: '首都、科学、历史、科技、电影',      color: 'from-amber-400 to-orange-500', accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { href: '/zh/generator', icon: '⚙️', title: '名字生成器', desc: '奇幻、科幻、超级英雄、反派名字',   color: 'from-emerald-400 to-teal-600', accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { href: '/zh/random',    icon: '🎲', title: '随机抽取',   desc: '转盘、点名、分组、骰子、神秘圣诞人', color: 'from-rose-500 to-pink-600',   accent: 'text-rose-700 dark:text-rose-300',   border: 'border-rose-200 dark:border-rose-900/50',  bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { href: '/zh/snap',      icon: '📸', title: '照片测试',   desc: '一张照片：微笑指数、对称度、面相', color: 'from-fuchsia-500 to-sky-500', accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
  { href: '/zh/fortune',   icon: '🔮', title: '今日运势',   desc: '星座、生肖、塔罗、八字',     color: 'from-violet-500 to-purple-700', accent: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { href: '/zh/time',      icon: '⏱️', title: '时间工具',   desc: '计时器、秒表、世界时钟、日期计算', color: 'from-sky-400 to-cyan-600',   accent: 'text-cyan-700 dark:text-cyan-300',   border: 'border-cyan-200 dark:border-cyan-900/50',  bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { href: '/zh/color',     icon: '🎨', title: '颜色工具',      desc: '配色、色阶、对比度、CSS 渐变',      color: 'from-fuchsia-500 to-rose-500', accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
  { href: '/zh/image',     icon: '🖼️', title: '图片工具',        desc: '压缩、调整尺寸、裁剪、人脸打码',           color: 'from-violet-500 to-indigo-600', accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { href: '/zh/sound',     icon: '🔊', title: '声音工具',        desc: '节拍器、调音器、白噪音、信号音',          color: 'from-indigo-500 to-violet-600', accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { href: '/zh/food',      icon: '🍳', title: '厨房工具',      desc: '量杯换克、烤箱温度、米水比、咖啡',        color: 'from-amber-500 to-orange-600', accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { href: '/zh/game',      icon: '🎮', title: '脑力小游戏',      desc: '反应、记忆、打字、瞄准、心算',   color: 'from-emerald-500 to-teal-600', accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function ZhHome() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-14 text-center">
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only"> — 免费实用工具</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-base">在浏览器里直接用的免费工具</p>
          <p className="mt-4 flex items-center justify-center gap-3 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-blue-600" hrefLang="ko">한국어</Link>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/en" className="hover:text-blue-600" hrefLang="en">EN</Link>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border ${s.border} ${s.bg} backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-3xl block mb-4">{s.icon}</span>
                <h2 className={`text-lg font-black ${s.accent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{s.desc}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.accent}`}>
                  打开
                  <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">
          这里的一切都在你的浏览器内运行。不上传任何内容，也不需要账号。
        </p>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com</p>
      </footer>
    </div>
  );
}
