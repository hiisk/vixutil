import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';

export const metadata: Metadata = {
  title: 'Gamepad Test — Check Controller Buttons and Stick Drift',
  description: 'Connect a controller, press the buttons to confirm they register, and leave the sticks alone to see whether the coordinates wander — stick drift. Xbox, PlayStation and Nintendo pads are all read through the standard browser API.',
  alternates: {
    canonical: '/en/device/gamepad',
    languages: { 'en': '/en/device/gamepad', 'zh': '/zh/device/gamepad', 'ko': '/device/gamepad', 'x-default': '/en/device/gamepad' },
  },
};

export default function EnDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="en">
      <GamepadTest lang="en" />
    </DeviceShellIntl>
  );
}
