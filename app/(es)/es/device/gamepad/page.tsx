import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'gamepad');

export default function EsDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="es">
      <GamepadTest lang="es" />
    </DeviceShellIntl>
  );
}
