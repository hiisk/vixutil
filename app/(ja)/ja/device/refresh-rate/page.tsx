import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'refresh-rate');

export default function JaDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="ja">
      <RefreshRateTest lang="ja" />
    </DeviceShellIntl>
  );
}
