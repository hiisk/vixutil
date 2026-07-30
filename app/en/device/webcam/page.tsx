import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'webcam');

export default function EnDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="en">
      <WebcamTest lang="en" />
    </DeviceShellIntl>
  );
}
