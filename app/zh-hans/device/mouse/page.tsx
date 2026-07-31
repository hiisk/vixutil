import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'mouse');

export default function ZhHansDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="zh-hans">
      <MouseTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
