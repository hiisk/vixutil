import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'monitor');

export default function FrDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="fr">
      <MonitorTest lang="fr" />
    </DeviceShellIntl>
  );
}
