import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuIntl from '@/components/fortune/SajuIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('pt-br', 'saju');

export default function PtBrSajuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: fortuneHubCopy('pt-br').title, path: '/pt-br/fortune' },
        { name: fortuneToolCopy('pt-br', 'saju').title, path: '/pt-br/fortune/saju' },
      ])} />
      <SajuIntl lang="pt-br" />
    </>
  );
}
