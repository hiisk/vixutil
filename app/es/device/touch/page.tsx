import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'touch');

export default function EsDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="es">
      <TouchTest lang="es" />
    </DeviceShellIntl>
  );
}
