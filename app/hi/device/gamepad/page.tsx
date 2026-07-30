import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'gamepad');

export default function HiDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="hi">
      <GamepadTest lang="hi" />
    </DeviceShellIntl>
  );
}
