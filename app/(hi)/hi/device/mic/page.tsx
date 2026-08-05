import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'mic');

export default function HiDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="hi">
      <MicTest lang="hi" />
    </DeviceShellIntl>
  );
}
