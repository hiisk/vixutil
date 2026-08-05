import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'keyboard');

export default function EsDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="es">
      <KeyboardTest lang="es" />
    </DeviceShellIntl>
  );
}
