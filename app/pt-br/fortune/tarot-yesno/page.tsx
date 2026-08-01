import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('pt-br', 'tarot-yesno');

export default function PtBrTarotYesnoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: fortuneHubCopy('pt-br').title, path: '/pt-br/fortune' },
        { name: fortuneToolCopy('pt-br', 'tarot-yesno').title, path: '/pt-br/fortune/tarot-yesno' },
      ])} />
      <TarotIntl mode="yesno" lang="pt-br" />
    </>
  );
}
