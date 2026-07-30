import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'gamepad');

export default function EnDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="en">
      <GamepadTest lang="en" />
    </DeviceShellIntl>
  );
}
