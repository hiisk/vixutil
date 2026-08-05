import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'touch');

export default function PtBrDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="pt-br">
      <TouchTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
