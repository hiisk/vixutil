import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('zh-hans');

export default function ZhHansSnapHub() {
  return <SnapHubPage lang="zh-hans" />;
}
