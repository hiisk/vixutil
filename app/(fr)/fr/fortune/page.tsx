import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('fr');

export default function FrFortuneHub() {
  return <FortuneHubPage lang="fr" />;
}
