import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DailyFortune from '@/components/fortune/DailyFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'daily');

export default function ZhHantDailyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'daily').title, path: '/zh-hant/fortune/daily' },
      ])} />
      <DailyFortune lang="zh-hant" />
    </>
  );
}
