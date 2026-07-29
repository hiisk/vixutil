import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';

export const metadata: Metadata = {
  title: 'Webcam Test — Check Your Camera Online, No Install',
  description: 'Confirm the camera turns on, see what resolution and frame rate it delivers, and take a snapshot to judge the image quality. The video plays only inside this browser and is never sent to a server.',
  alternates: {
    canonical: '/en/device/webcam',
    languages: { 'en': '/en/device/webcam', 'zh': '/zh/device/webcam', 'ko': '/device/webcam', 'x-default': '/en/device/webcam' },
  },
};

export default function EnDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="en">
      <WebcamTest lang="en" />
    </DeviceShellIntl>
  );
}
