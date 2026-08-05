import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'info');

export default function ZhHantDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="zh-hant">
      <DeviceInfo lang="zh-hant" />
    </DeviceShellIntl>
  );
}
