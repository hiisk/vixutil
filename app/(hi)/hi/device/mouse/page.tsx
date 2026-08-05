import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'mouse');

export default function HiDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="hi">
      <MouseTest lang="hi" />
    </DeviceShellIntl>
  );
}
