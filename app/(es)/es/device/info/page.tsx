import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'info');

export default function EsDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="es">
      <DeviceInfo lang="es" />
    </DeviceShellIntl>
  );
}
