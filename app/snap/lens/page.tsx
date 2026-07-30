import type { Metadata } from 'next';
import LensHubPage from '@/components/lens/LensHubPage';
import { hubMetadata } from '@/lib/lens/route';

export const metadata: Metadata = hubMetadata('ko');

export default function LensHub() {
  return <LensHubPage lang="ko" />;
}
