import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'info');

export default function HiDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="hi">
      <DeviceInfo lang="hi" />
    </DeviceShellIntl>
  );
}
