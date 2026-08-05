import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DailyFortune from '@/components/fortune/DailyFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'daily');

export default function EsDailyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'daily').title, path: '/es/fortune/daily' },
      ])} />
      <DailyFortune lang="es" />
    </>
  );
}
