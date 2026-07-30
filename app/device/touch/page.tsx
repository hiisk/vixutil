import type { Metadata } from 'next';
import DeviceShell from '@/components/DeviceShell';
import TouchTest from '@/components/device/TouchTest';

export const metadata: Metadata = {
  title: '터치스크린 테스트 - 멀티터치·인식 불량 영역 확인',
  description: '화면을 손가락으로 눌러 터치 좌표와 동시 인식 개수를 확인하고, 손가락으로 문질러 반응이 없는 영역이 있는지 찾습니다. 액정을 갈았거나 화면이 가끔 안 먹을 때 쓰세요.',
  alternates: {
    canonical: '/device/touch',
    languages: { 'ko': '/device/touch', 'en': '/en/device/touch', 'x-default': '/en/device/touch' },
  },
};

export default function Page() {
  return (
    <DeviceShell slug="touch">
      <TouchTest />
    </DeviceShell>
  );
}
