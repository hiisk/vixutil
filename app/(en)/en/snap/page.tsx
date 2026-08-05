import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('en');

export default function EnSnapHub() {
  return <SnapHubPage lang="en" />;
}
