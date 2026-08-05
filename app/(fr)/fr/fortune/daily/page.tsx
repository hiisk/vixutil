import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DailyFortune from '@/components/fortune/DailyFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('fr', 'daily');

export default function FrDailyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: fortuneHubCopy('fr').title, path: '/fr/fortune' },
        { name: fortuneToolCopy('fr', 'daily').title, path: '/fr/fortune/daily' },
      ])} />
      <DailyFortune lang="fr" />
    </>
  );
}
