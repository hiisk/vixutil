import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotSpreadIntl from '@/components/fortune/TarotSpreadIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'tarot');

export default function EsTarotPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'tarot').title, path: '/es/fortune/tarot' },
      ])} />
      <TarotSpreadIntl lang="es" />
    </>
  );
}
