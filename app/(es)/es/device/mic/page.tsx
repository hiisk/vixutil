import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'mic');

export default function EsDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="es">
      <MicTest lang="es" />
    </DeviceShellIntl>
  );
}
