import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('fr', 'animal');

export default function FrAnimalPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: fortuneHubCopy('fr').title, path: '/fr/fortune' },
        { name: fortuneToolCopy('fr', 'animal').title, path: '/fr/fortune/animal' },
      ])} />
      <SubjectFortune kind="animal" lang="fr" />
    </>
  );
}
