import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';

export const metadata: Metadata = {
  title: 'Dead Pixel Test — Find Stuck Pixels and Backlight Bleed',
  description: 'Fills the screen with red, green, blue, white and black to reveal dots that stay off (dead pixels), dots that stay on (stuck pixels), and backlight bleed or patches around the edges. The first thing to do the day a new monitor arrives.',
  alternates: {
    canonical: '/en/device/monitor',
    languages: { 'en': '/en/device/monitor', 'zh': '/zh/device/monitor', 'ko': '/device/monitor', 'x-default': '/en/device/monitor' },
  },
};

export default function EnDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="en">
      <MonitorTest lang="en" />
    </DeviceShellIntl>
  );
}
