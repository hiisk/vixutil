import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TodayColor from '@/components/fortune/TodayColor';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'today-color');

export default function ZhHantTodayColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'today-color').title, path: '/zh-hant/fortune/today-color' },
      ])} />
      <TodayColor lang="zh-hant" />
    </>
  );
}
