import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'touch');

export default function EnDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="en">
      <TouchTest lang="en" />
    </DeviceShellIntl>
  );
}
