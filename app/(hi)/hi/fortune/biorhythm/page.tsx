import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Biorhythm from '@/components/fortune/Biorhythm';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('hi', 'biorhythm');

export default function HiBiorhythmPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: fortuneHubCopy('hi').title, path: '/hi/fortune' },
        { name: fortuneToolCopy('hi', 'biorhythm').title, path: '/hi/fortune/biorhythm' },
      ])} />
      <Biorhythm lang="hi" />
    </>
  );
}
