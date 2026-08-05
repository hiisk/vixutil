import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MatchFortune from '@/components/fortune/MatchFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'blood-match');

export default function DeBloodMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'blood-match').title, path: '/de/fortune/blood-match' },
      ])} />
      <MatchFortune kind="blood" lang="de" />
    </>
  );
}
