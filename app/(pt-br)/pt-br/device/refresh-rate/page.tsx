import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'refresh-rate');

export default function PtBrDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="pt-br">
      <RefreshRateTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
