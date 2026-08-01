import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('ja');

export default function JaSnapHub() {
  return <SnapHubPage lang="ja" />;
}
