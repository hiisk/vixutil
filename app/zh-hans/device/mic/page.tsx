import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'mic');

export default function ZhHansDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="zh-hans">
      <MicTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
