import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import WebcamTest from '@/components/device/WebcamTest';

export const metadata: Metadata = {
  title: '웹캠 테스트 - 카메라 화면·해상도 확인',
  description: '카메라가 켜지는지, 어떤 해상도와 프레임레이트로 들어오는지 확인하고 스냅샷을 찍어 화질을 봅니다. 영상은 이 브라우저 안에서만 재생되며 서버로 전송되지 않습니다.',
  alternates: {
    canonical: '/device/webcam',
    languages: alternateLanguages10('/device/webcam'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="webcam">
      <WebcamTest />
    </DeviceShell>
  );
}
