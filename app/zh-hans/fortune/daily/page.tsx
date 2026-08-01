import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DailyFortune from '@/components/fortune/DailyFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hans', 'daily');

export default function ZhHansDailyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: fortuneHubCopy('zh-hans').title, path: '/zh-hans/fortune' },
        { name: fortuneToolCopy('zh-hans', 'daily').title, path: '/zh-hans/fortune/daily' },
      ])} />
      <DailyFortune lang="zh-hans" />
    </>
  );
}
