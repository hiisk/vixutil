import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('ja');

export default function JaFortuneHub() {
  return <FortuneHubPage lang="ja" />;
}
