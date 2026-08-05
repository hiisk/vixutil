import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'tarot-yesno');

export default function DeTarotYesnoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'tarot-yesno').title, path: '/de/fortune/tarot-yesno' },
      ])} />
      <TarotIntl mode="yesno" lang="de" />
    </>
  );
}
