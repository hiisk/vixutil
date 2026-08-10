import type { Metadata } from 'next';
import FilamentHubPage from '@/components/filament/FilamentHubPage';
import { hubMetadata } from '@/lib/filament/route';

export const metadata: Metadata = hubMetadata('ko');

export default function FilamentHub() {
  return <FilamentHubPage lang="ko" />;
}
