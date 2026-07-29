import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';

export const metadata: Metadata = {
  title: 'Microphone Test — Check Input Level and Record Online',
  description: 'Watch a live level meter to confirm your mic is picking up sound, then record a few seconds and play it back to hear how you actually sound. A one-minute check before a video call or a game.',
  alternates: {
    canonical: '/en/device/mic',
    languages: { 'en': '/en/device/mic', 'zh': '/zh/device/mic', 'ko': '/device/mic', 'x-default': '/en/device/mic' },
  },
};

export default function EnDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="en">
      <MicTest lang="en" />
    </DeviceShellIntl>
  );
}
