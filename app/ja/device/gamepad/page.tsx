import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'gamepad');

export default function JaDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="ja">
      <GamepadTest lang="ja" />
    </DeviceShellIntl>
  );
}
