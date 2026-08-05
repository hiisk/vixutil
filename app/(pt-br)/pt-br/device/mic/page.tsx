import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'mic');

export default function PtBrDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="pt-br">
      <MicTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
