import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'info');

export default function ZhHansDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="zh-hans">
      <DeviceInfo lang="zh-hans" />
    </DeviceShellIntl>
  );
}
