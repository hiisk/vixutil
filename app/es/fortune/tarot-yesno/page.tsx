import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('es', 'tarot-yesno');

export default function EsTarotYesnoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: fortuneHubCopy('es').title, path: '/es/fortune' },
        { name: fortuneToolCopy('es', 'tarot-yesno').title, path: '/es/fortune/tarot-yesno' },
      ])} />
      <TarotIntl mode="yesno" lang="es" />
    </>
  );
}
