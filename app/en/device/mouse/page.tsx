import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';

export const metadata: Metadata = {
  title: 'Mouse Click Test — Check Buttons and Double-Click Chatter',
  description: 'Check that left, right, wheel and side buttons all register, and whether one press is coming through as two — chatter — by looking at the gap in milliseconds. Scroll direction and cursor movement polling are shown alongside.',
  alternates: {
    canonical: '/en/device/mouse',
    languages: { 'en': '/en/device/mouse', 'ko': '/device/mouse', 'x-default': '/en/device/mouse' },
  },
};

export default function EnDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="en">
      <MouseTest lang="en" />
    </DeviceShellIntl>
  );
}
