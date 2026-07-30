import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'webcam');

export default function FrDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="fr">
      <WebcamTest lang="fr" />
    </DeviceShellIntl>
  );
}
