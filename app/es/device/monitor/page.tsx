import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'monitor');

export default function EsDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="es">
      <MonitorTest lang="es" />
    </DeviceShellIntl>
  );
}
