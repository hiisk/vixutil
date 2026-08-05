import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotSpreadIntl from '@/components/fortune/TarotSpreadIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'tarot');

export default function DeTarotPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'tarot').title, path: '/de/fortune/tarot' },
      ])} />
      <TarotSpreadIntl lang="de" />
    </>
  );
}
