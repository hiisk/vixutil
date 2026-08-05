import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('zh-hant');

export default function ZhHantSnapHub() {
  return <SnapHubPage lang="zh-hant" />;
}
