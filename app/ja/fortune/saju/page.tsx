import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuIntl from '@/components/fortune/SajuIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('ja', 'saju');

export default function JaSajuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: fortuneHubCopy('ja').title, path: '/ja/fortune' },
        { name: fortuneToolCopy('ja', 'saju').title, path: '/ja/fortune/saju' },
      ])} />
      <SajuIntl lang="ja" />
    </>
  );
}
