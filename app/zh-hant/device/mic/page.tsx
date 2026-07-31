import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'mic');

export default function ZhHantDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="zh-hant">
      <MicTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
