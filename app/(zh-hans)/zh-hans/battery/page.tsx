import type { Metadata } from 'next';
import BatteryHubPage from '@/components/battery/BatteryHubPage';
import { hubMetadata } from '@/lib/battery/route';

export const metadata: Metadata = hubMetadata('zh');

export default function BatteryHub() {
  return <BatteryHubPage lang="zh" />;
}
