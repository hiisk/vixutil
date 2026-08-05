import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('fr', 'blood-type');

export default function FrBloodTypePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: fortuneHubCopy('fr').title, path: '/fr/fortune' },
        { name: fortuneToolCopy('fr', 'blood-type').title, path: '/fr/fortune/blood-type' },
      ])} />
      <SubjectFortune kind="blood" lang="fr" />
    </>
  );
}
