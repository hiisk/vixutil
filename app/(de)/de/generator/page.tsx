import type { Metadata } from 'next';
import { GeneratorIntlHub, generatorIntlMeta } from '@/components/GeneratorIntlPage';

export const metadata: Metadata = generatorIntlMeta('de');

export default function GeneratorHub() {
  return <GeneratorIntlHub lang="de" />;
}
