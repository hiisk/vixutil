import type { Metadata } from 'next';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { imageToolsIntl, IMAGE_SHELL_UI } from '@/lib/image-tools-intl';

export const metadata: Metadata = {
  title: '图片工具 — 压缩、调整尺寸、裁剪、打码',
  description: '在浏览器内运行的免费图片工具：压缩、调整尺寸、格式转换、裁剪、旋转、人脸打码、拼接与取色。照片不会上传。',
  alternates: {
    canonical: '/zh/image',
    languages: { 'en': '/en/image', 'zh': '/zh/image', 'ko': '/image', 'x-default': '/en/image' },
  },
};

const CATEGORY_ORDER = ['大小', '编辑', '分析'];

export default function ZhImageHub() {
  const tools = imageToolsIntl('zh');
  const ui = IMAGE_SHELL_UI['zh'];
  const grouped = CATEGORY_ORDER
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-indigo-600" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh" className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/image" className="hover:text-violet-600" hrefLang="ko">한국어</Link>
            <Link href="/en/image" className="hover:text-violet-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-2">Image</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">图片工具</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">压缩、裁剪与编辑照片 —— 全程不离开浏览器。</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link key={t.slug} href={`/zh/image/${t.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
                  <span className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{t.icon}</span>
                  <span>
                    <span className="block text-base font-black drop-shadow leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费图片工具</p>
      </footer>
    </div>
  );
}
