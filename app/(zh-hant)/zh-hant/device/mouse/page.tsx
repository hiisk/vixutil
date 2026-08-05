import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'mouse');

export default function ZhHantDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="zh-hant">
      <MouseTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
