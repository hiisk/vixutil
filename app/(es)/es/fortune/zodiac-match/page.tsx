import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MatchFortune from '@/components/fortune/MatchFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'zodiac-match');

export default function EsZodiacMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'zodiac-match').title, path: '/es/fortune/zodiac-match' },
      ])} />
      <MatchFortune kind="zodiac" lang="es" />
    </>
  );
}
