import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';

export const metadata: Metadata = {
  title: 'Keyboard Test — Check Every Key and N-Key Rollover Online',
  description: 'Press a key and it lights up on the on-screen keyboard. Find keys that do not respond, keys that register twice from one press, and how many the board reads at once (N-key rollover) — all in the browser.',
  alternates: {
    canonical: '/en/device/keyboard',
    languages: { 'en': '/en/device/keyboard', 'zh': '/zh/device/keyboard', 'ko': '/device/keyboard', 'x-default': '/en/device/keyboard' },
  },
};

export default function EnDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="en">
      <KeyboardTest lang="en" />
    </DeviceShellIntl>
  );
}
