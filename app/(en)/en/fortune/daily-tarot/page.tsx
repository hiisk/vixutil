import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('en', 'daily-tarot');

export default function EnDailyTarotPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: fortuneHubCopy('en').title, path: '/en/fortune' },
        { name: fortuneToolCopy('en', 'daily-tarot').title, path: '/en/fortune/daily-tarot' },
      ])} />
      <TarotIntl mode="daily" lang="en" />
    </>
  );
}
