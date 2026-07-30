import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'refresh-rate');

export default function EsDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="es">
      <RefreshRateTest lang="es" />
    </DeviceShellIntl>
  );
}
