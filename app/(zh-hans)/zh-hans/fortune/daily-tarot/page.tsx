import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hans', 'daily-tarot');

export default function ZhHansDailyTarotPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: fortuneHubCopy('zh-hans').title, path: '/zh-hans/fortune' },
        { name: fortuneToolCopy('zh-hans', 'daily-tarot').title, path: '/zh-hans/fortune/daily-tarot' },
      ])} />
      <TarotIntl mode="daily" lang="zh-hans" />
    </>
  );
}
