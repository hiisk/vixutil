import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'info');

export default function EnDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="en">
      <DeviceInfo lang="en" />
    </DeviceShellIntl>
  );
}
