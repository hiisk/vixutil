import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'mic');

export default function EnDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="en">
      <MicTest lang="en" />
    </DeviceShellIntl>
  );
}
