import type { Metadata } from 'next';
import SnapHubPage from '@/components/snap/SnapHubPage';
import { snapHubMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapHubMetadata('pt-br');

export default function PtBrSnapHub() {
  return <SnapHubPage lang="pt-br" />;
}
