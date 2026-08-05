import type { Metadata } from 'next';
import { GeneratorIntlHub, generatorIntlMeta } from '@/components/GeneratorIntlPage';

export const metadata: Metadata = generatorIntlMeta('es');

export default function GeneratorHub() {
  return <GeneratorIntlHub lang="es" />;
}
