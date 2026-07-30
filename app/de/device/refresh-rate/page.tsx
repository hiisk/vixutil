import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'refresh-rate');

export default function DeDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="de">
      <RefreshRateTest lang="de" />
    </DeviceShellIntl>
  );
}
