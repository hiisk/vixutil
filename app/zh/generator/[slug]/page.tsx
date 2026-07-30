import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GENERATORS_ZH, GENERATORS_ZH_MAP } from '@/lib/generator-zh';
import EnGeneratorEngine from '@/components/EnGeneratorEngine';
import ReferralCards from '@/components/ReferralCards';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return GENERATORS_ZH.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATORS_ZH_MAP[slug];
  if (!gen) return {};
  return {
    title: `${gen.title} — 免费在线`,
    description: `${gen.desc} 一键生成独特创意，免费、无需注册。`,
    alternates: {
      canonical: `/zh/generator/${slug}`,
      languages: { 'zh': `/zh/generator/${slug}`, 'en': `/en/generator/${slug}`, 'ko': `/generator/${slug}`, 'x-default': `/en/generator/${slug}` },
    },
  };
}

export default async function ZhGeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATORS_ZH_MAP[slug];
  if (!gen) notFound();
  const others = GENERATORS_ZH.filter(g => g.slug !== slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/zh/generator' },
          { name: '生成器', path: '/zh/generator' },
          { name: gen.title, path: `/zh/generator/${slug}` },
        ])}
      />
      <EnGeneratorEngine gen={gen} lang="zh" />

      <div className="max-w-lg mx-auto px-4 w-full pb-12">
        <div className="mb-8">
          <ReferralCards lang="en" placement="result" />
        </div>

        <section className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-2">关于{gen.title}</h2>
          <p>
            这个免费的{gen.title}可以即时生成独特、可直接使用的创意。点击<strong>生成</strong>可无限次刷新，
            也能单独重新生成某一条并复制收藏。适合游戏、小说、角色、用户名与世界观设定。免注册、无限制。
          </p>
        </section>

        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">更多生成器</h2>
        <div className="grid grid-cols-3 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/zh/generator/${o.slug}`} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">{o.title.replace('生成器', '')}</div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh/generator" className="text-sm font-black text-emerald-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">免费在线生成器 · <Link href={`/generator/${slug}`} className="hover:text-emerald-600" hrefLang="ko">한국어</Link> · <Link href={`/en/generator/${slug}`} className="hover:text-emerald-600" hrefLang="en">EN</Link></p>
      </footer>
    </>
  );
}
