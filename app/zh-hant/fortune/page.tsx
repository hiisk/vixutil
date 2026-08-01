import type { Metadata } from 'next';
import FortuneHubPage from '@/components/fortune/FortuneHubPage';
import { fortuneHubMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneHubMetadata('zh-hant');

export default function ZhHantFortuneHub() {
  return <FortuneHubPage lang="zh-hant" />;
}
