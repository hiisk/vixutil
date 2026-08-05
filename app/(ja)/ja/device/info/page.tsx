import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'info');

export default function JaDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="ja">
      <DeviceInfo lang="ja" />
    </DeviceShellIntl>
  );
}
