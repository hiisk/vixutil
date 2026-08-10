import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/device/gamepad/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = deviceMetaIntl(lang, 'gamepad');

  function Page() {
    return (
      <DeviceShellIntl slug="gamepad" lang={lang}>
        <GamepadTest lang={lang} />
      </DeviceShellIntl>
    );
  }

  return { metadata, Page };
}
