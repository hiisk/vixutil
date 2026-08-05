import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'touch');

export default function HiDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="hi">
      <TouchTest lang="hi" />
    </DeviceShellIntl>
  );
}
