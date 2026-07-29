import type { Metadata } from 'next';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { soundToolsIntl, SOUND_SHELL_UI } from '@/lib/sound-tools-intl';

export const metadata: Metadata = {
  title: '声音工具 — 节拍器、调音器、白噪音',
  description: '在浏览器内生成的免费声音工具：节拍器、吉他调音器、音程听辨、BPM 测速、白噪音、双耳节拍、噪音测量、录音机与频率发生器。',
  alternates: {
    canonical: '/en/image',
    languages: { 'en': '/en/sound', 'zh': '/zh/sound', 'ko': '/sound', 'x-default': '/en/sound' },
  },
};

const CATEGORY_ORDER = ['演奏与练习', '专注与睡眠', '测量', '信号音'];

export default function ZhSoundHub() {
  const tools = soundToolsIntl('zh');
  const ui = SOUND_SHELL_UI['zh'];
  const grouped = CATEGORY_ORDER
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-600" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh" className="font-black text-indigo-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/sound" className="hover:text-indigo-600" hrefLang="ko">한국어</Link>
            <Link href="/zh/image" className="hover:text-indigo-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-2">Sound</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">声音工具</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">节拍器、调音器与噪音 —— 所有声音都在浏览器内生成。</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link key={t.slug} href={`/zh/sound/${t.slug}`}
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
        <span className="text-sm font-black text-indigo-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费声音工具</p>
      </footer>
    </div>
  );
}
