import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';

export const metadata: Metadata = {
  title: 'Speaker Test — Check Left/Right Channels and Frequency Online',
  description: 'Sound the left and right sides separately to check the channels are not swapped and that neither side is silent. You can also step through 20Hz to 16kHz to find how far your headphones — and your ears — actually reach.',
  alternates: {
    canonical: '/en/device/speaker',
    languages: { 'en': '/en/device/speaker', 'ko': '/device/speaker', 'x-default': '/en/device/speaker' },
  },
};

export default function EnDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="en">
      <SpeakerTest lang="en" />
    </DeviceShellIntl>
  );
}
