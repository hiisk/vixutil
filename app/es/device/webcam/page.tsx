import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'webcam');

export default function EsDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="es">
      <WebcamTest lang="es" />
    </DeviceShellIntl>
  );
}
