import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MatchFortune from '@/components/fortune/MatchFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'mbti-match');

export default function EsMbtiMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'mbti-match').title, path: '/es/fortune/mbti-match' },
      ])} />
      <MatchFortune kind="mbti" lang="es" />
    </>
  );
}
