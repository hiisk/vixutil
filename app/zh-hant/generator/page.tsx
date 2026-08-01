import type { Metadata } from 'next';
import { GeneratorIntlHub, generatorIntlMeta } from '@/components/GeneratorIntlPage';

export const metadata: Metadata = generatorIntlMeta('zh-hant');

export default function GeneratorHub() {
  return <GeneratorIntlHub lang="zh-hant" />;
}
