import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'webcam');

export default function ZhHansDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="zh-hans">
      <WebcamTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
