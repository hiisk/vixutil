import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'refresh-rate');

export default function EnDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="en">
      <RefreshRateTest lang="en" />
    </DeviceShellIntl>
  );
}
