import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DailyFortune from '@/components/fortune/DailyFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('ja', 'daily');

export default function JaDailyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: fortuneHubCopy('ja').title, path: '/ja/fortune' },
        { name: fortuneToolCopy('ja', 'daily').title, path: '/ja/fortune/daily' },
      ])} />
      <DailyFortune lang="ja" />
    </>
  );
}
