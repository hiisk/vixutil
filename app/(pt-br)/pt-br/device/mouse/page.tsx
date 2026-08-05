import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'mouse');

export default function PtBrDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="pt-br">
      <MouseTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
