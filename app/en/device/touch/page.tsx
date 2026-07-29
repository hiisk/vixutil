import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';

export const metadata: Metadata = {
  title: 'Touchscreen Test — Multi-Touch and Dead Zone Check',
  description: 'Press the screen to see touch coordinates and how many points register at once, then drag a finger across to find any area that does not respond. Useful after a screen replacement, or when the display cuts out now and then.',
  alternates: {
    canonical: '/en/device/touch',
    languages: { 'en': '/en/device/touch', 'zh': '/zh/device/touch', 'ko': '/device/touch', 'x-default': '/en/device/touch' },
  },
};

export default function EnDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="en">
      <TouchTest lang="en" />
    </DeviceShellIntl>
  );
}
