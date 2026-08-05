import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'refresh-rate');

export default function ZhHantDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="zh-hant">
      <RefreshRateTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
