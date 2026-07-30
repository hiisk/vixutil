import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'gamepad');

export default function PtBrDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="pt-br">
      <GamepadTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
