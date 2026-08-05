import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'mouse');

export default function EnDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="en">
      <MouseTest lang="en" />
    </DeviceShellIntl>
  );
}
