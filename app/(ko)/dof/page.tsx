import type { Metadata } from 'next';
import DofHubPage from '@/components/dof/DofHubPage';
import { hubMetadata } from '@/lib/dof/route';

export const metadata: Metadata = hubMetadata('ko');

export default function DofHub() {
  return <DofHubPage lang="ko" />;
}
