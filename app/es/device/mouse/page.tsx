import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'mouse');

export default function EsDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="es">
      <MouseTest lang="es" />
    </DeviceShellIntl>
  );
}
