import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'webcam');

export default function ZhHantDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="zh-hant">
      <WebcamTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
