import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/time/weeknumber/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = timeMetaIntl(lang, 'weeknumber');

  function Page() {
    return (
      <TimeShellIntl slug="weeknumber" lang={lang}>
        <WeekNumberTool lang={lang} />
      </TimeShellIntl>
    );
  }

  return { metadata, Page };
}
