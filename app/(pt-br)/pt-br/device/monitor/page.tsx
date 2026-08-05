import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'monitor');

export default function PtBrDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="pt-br">
      <MonitorTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
