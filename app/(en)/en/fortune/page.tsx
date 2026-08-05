import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('en');

export default function EnFortuneHub() {
  return <FortuneHubPage lang="en" />;
}
