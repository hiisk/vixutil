import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuIntl from '@/components/fortune/SajuIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'saju');

export default function EsSajuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'saju').title, path: '/es/fortune/saju' },
      ])} />
      <SajuIntl lang="es" />
    </>
  );
}
