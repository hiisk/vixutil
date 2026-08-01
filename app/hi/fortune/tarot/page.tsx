import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotSpreadIntl from '@/components/fortune/TarotSpreadIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('hi', 'tarot');

export default function HiTarotPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: fortuneHubCopy('hi').title, path: '/hi/fortune' },
        { name: fortuneToolCopy('hi', 'tarot').title, path: '/hi/fortune/tarot' },
      ])} />
      <TarotSpreadIntl lang="hi" />
    </>
  );
}
