import type { Metadata } from 'next';
import DeviceShell from '@/components/DeviceShell';
import DeviceInfo from '@/components/device/DeviceInfo';

export const metadata: Metadata = {
  title: '내 기기 정보 - 해상도·브라우저·OS 확인',
  description: '지금 쓰는 화면 해상도와 브라우저 창 크기, 픽셀 배율, 브라우저·운영체제 버전, CPU 코어 수까지 한 화면에 모아 보여줍니다. 원격 지원을 요청하거나 사양을 물어봤을 때 그대로 복사해 보내면 됩니다.',
  alternates: { canonical: '/device/info' },
};

export default function Page() {
  return (
    <DeviceShell slug="info">
      <DeviceInfo />
    </DeviceShell>
  );
}
