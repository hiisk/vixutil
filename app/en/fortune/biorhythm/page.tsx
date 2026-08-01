import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Biorhythm from '@/components/fortune/Biorhythm';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('en', 'biorhythm');

export default function EnBiorhythmPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: fortuneHubCopy('en').title, path: '/en/fortune' },
        { name: fortuneToolCopy('en', 'biorhythm').title, path: '/en/fortune/biorhythm' },
      ])} />
      <Biorhythm lang="en" />
    </>
  );
}
