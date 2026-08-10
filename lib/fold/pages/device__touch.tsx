import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/device/touch/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = deviceMetaIntl(lang, 'touch');

  function Page() {
    return (
      <DeviceShellIntl slug="touch" lang={lang}>
        <TouchTest lang={lang} />
      </DeviceShellIntl>
    );
  }

  return { metadata, Page };
}
