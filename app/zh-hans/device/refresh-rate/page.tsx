import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'refresh-rate');

export default function ZhHansDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="zh-hans">
      <RefreshRateTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
