import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'webcam');

export default function PtBrDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="pt-br">
      <WebcamTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
