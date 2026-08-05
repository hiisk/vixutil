import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('zh-hans');

export default function ZhHansFortuneHub() {
  return <FortuneHubPage lang="zh-hans" />;
}
