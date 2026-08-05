import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('de');

export default function DeSnapHub() {
  return <SnapHubPage lang="de" />;
}
