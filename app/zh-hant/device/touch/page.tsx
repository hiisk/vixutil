import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'touch');

export default function ZhHantDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="zh-hant">
      <TouchTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
