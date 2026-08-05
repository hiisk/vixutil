import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MatchFortune from '@/components/fortune/MatchFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('en', 'blood-match');

export default function EnBloodMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: fortuneHubCopy('en').title, path: '/en/fortune' },
        { name: fortuneToolCopy('en', 'blood-match').title, path: '/en/fortune/blood-match' },
      ])} />
      <MatchFortune kind="blood" lang="en" />
    </>
  );
}
