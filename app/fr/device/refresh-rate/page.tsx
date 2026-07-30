import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'refresh-rate');

export default function FrDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="fr">
      <RefreshRateTest lang="fr" />
    </DeviceShellIntl>
  );
}
