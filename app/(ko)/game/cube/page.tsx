import type { Metadata } from 'next';
import CubeHubPage from '@/components/cube/CubeHubPage';
import { hubMetadata } from '@/lib/cube/route';

export const metadata: Metadata = hubMetadata('ko');

export default function CubeHub() {
  return <CubeHubPage lang="ko" />;
}
