import type { Metadata } from 'next';
import BatteryHubPage from '@/components/battery/BatteryHubPage';
import { hubMetadata } from '@/lib/battery/route';

export const metadata: Metadata = hubMetadata('ko');

export default function BatteryHub() {
  return <BatteryHubPage lang="ko" />;
}
