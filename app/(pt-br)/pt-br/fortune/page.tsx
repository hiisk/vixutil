import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('pt-br');

export default function PtBrFortuneHub() {
  return <FortuneHubPage lang="pt-br" />;
}
