import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'webcam');

export default function DeDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="de">
      <WebcamTest lang="de" />
    </DeviceShellIntl>
  );
}
