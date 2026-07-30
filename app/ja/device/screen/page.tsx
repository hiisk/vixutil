import type { Metadata } from 'next';
import ScreenHubPage from '@/components/device/ScreenHubPage';
import { hubMetadata } from '@/lib/device/route';

export const metadata: Metadata = hubMetadata('ja');

export default function ScreenHub() {
  return <ScreenHubPage lang="ja" />;
}
