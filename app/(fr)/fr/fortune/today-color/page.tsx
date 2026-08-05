import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TodayColor from '@/components/fortune/TodayColor';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('fr', 'today-color');

export default function FrTodayColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: fortuneHubCopy('fr').title, path: '/fr/fortune' },
        { name: fortuneToolCopy('fr', 'today-color').title, path: '/fr/fortune/today-color' },
      ])} />
      <TodayColor lang="fr" />
    </>
  );
}
