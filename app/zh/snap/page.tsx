import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '照片测试 — 在浏览器里分析一张照片',
  description: '使用真实人脸识别的免费照片测试：微笑指数、脸部对称度、黄金比例。全部在浏览器内完成，照片不会上传。',
  alternates: {
    canonical: '/zh/snap',
    languages: { 'en': '/en/snap', 'zh': '/zh/snap', 'ko': '/snap', 'x-default': '/en/snap' },
  },
};

/* 허브에는 실제로 만든 것만 싣는다 — 없는 페이지를 링크하면 404다 */
const TESTS = [
  { href: '/zh/snap/smile-score',   icon: '😊', title: '微笑指数',     desc: '测量嘴角上扬的程度', color: 'from-amber-400 to-rose-500' },
  { href: '/zh/snap/face-symmetry', icon: '⚖️', title: '脸部对称度',   desc: '分部位看左右平衡', color: 'from-violet-500 to-fuchsia-600' },
  { href: '/zh/snap/golden-ratio',  icon: '📐', title: '黄金比例测试', desc: '五官比例与 φ 的接近程度', color: 'from-amber-400 to-orange-500' },
];

export default function ZhSnapHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/snap" className="font-black text-fuchsia-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">照片测试</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/snap" className="hover:text-fuchsia-600" hrefLang="ko">한국어</Link>
            <Link href="/en/snap" className="hover:text-fuchsia-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📸</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">照片测试</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">真实人脸识别，一张照片，不上传</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TESTS.map(t => (
            <Link key={t.href} href={t.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.color} text-white p-6 min-h-[10rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <span className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{t.icon}</span>
              <div>
                <div className="text-lg font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-xs font-medium text-white/80 mt-1">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">所有测试都完全在你的浏览器内运行。照片不会发送到服务器，关闭页面后也不会留下任何数据。</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-fuchsia-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费照片测试</p>
      </footer>
    </div>
  );
}
