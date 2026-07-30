import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'refresh-rate');

export default function HiDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="hi">
      <RefreshRateTest lang="hi" />
    </DeviceShellIntl>
  );
}
