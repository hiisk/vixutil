import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'info');

export default function PtBrDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="pt-br">
      <DeviceInfo lang="pt-br" />
    </DeviceShellIntl>
  );
}
