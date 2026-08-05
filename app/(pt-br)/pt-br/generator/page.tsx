import type { Metadata } from 'next';
import { GeneratorIntlHub, generatorIntlMeta } from '@/components/GeneratorIntlPage';

export const metadata: Metadata = generatorIntlMeta('pt-br');

export default function GeneratorHub() {
  return <GeneratorIntlHub lang="pt-br" />;
}
