import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'touch');

export default function ZhHansDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="zh-hans">
      <TouchTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
