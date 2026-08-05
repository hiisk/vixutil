import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'webcam');

export default function HiDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="hi">
      <WebcamTest lang="hi" />
    </DeviceShellIntl>
  );
}
