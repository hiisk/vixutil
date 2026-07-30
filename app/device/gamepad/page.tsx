import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import GamepadTest from '@/components/device/GamepadTest';

export const metadata: Metadata = {
  title: '게임패드 테스트 - 버튼·스틱 드리프트 확인',
  description: '컨트롤러를 연결하고 버튼을 눌러 인식 여부를, 스틱을 놓은 채로 좌표가 흔들리는지(스틱 드리프트) 확인합니다. 엑스박스·플레이스테이션·닌텐도 계열 패드 모두 브라우저 표준 API로 인식합니다.',
  alternates: {
    canonical: '/device/gamepad',
    languages: alternateLanguages('/device/gamepad'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="gamepad">
      <GamepadTest />
    </DeviceShell>
  );
}
