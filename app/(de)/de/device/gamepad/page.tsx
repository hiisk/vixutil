import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'gamepad');

export default function DeDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="de">
      <GamepadTest lang="de" />
    </DeviceShellIntl>
  );
}
