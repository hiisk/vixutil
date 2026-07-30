import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { deviceToolsIntl, DEVICE_SHELL_UI } from '@/lib/device-tools-intl';

export const metadata: Metadata = {
  title: 'Device Tests — Keyboard, Mouse, Mic, Webcam, Dead Pixel',
  description: 'Free browser device tests: keyboard and N-key rollover, mouse chatter, microphone, webcam, speaker channels, dead pixels, refresh rate, touchscreen, gamepad drift and your device info.',
  alternates: {
    canonical: '/en/device',
    languages: { 'en': '/en/device', 'ko': '/device', 'x-default': '/en/device' },
  },
};

const CATEGORY_ORDER = ['Input', 'Audio', 'Video', 'Display', 'Info'];

export default function EnDeviceHub() {
  const tools = deviceToolsIntl('en');
  const ui = DEVICE_SHELL_UI['en'];
  const grouped = CATEGORY_ORDER
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-blue-600" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en" className="font-black text-sky-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/device" className="hover:text-sky-600" hrefLang="ko">한국어</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">Device</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Device Tests</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Check your hardware in the browser — nothing to install.</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link key={t.slug} href={`/en/device/${t.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
                  <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
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
        <span className="text-sm font-black text-sky-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free device tests</p>
      </footer>
    </div>
  );
}
