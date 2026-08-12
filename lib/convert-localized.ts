/**
 * 단위 변환 도구의 언어별 문구 — 화면 둘이 함께 쓴다.
 *
 * ── 왜 컴포넌트에서 옮겨 왔나 (2026-08-13) ─────────────────
 * 이 함수는 `components/ConvertPage.tsx`에 있었다. 그 파일이 클라이언트 컴포넌트가
 * 되면서(요청마다 나가는 RSC 짐을 줄이려고) 서버 쪽 `ConvertHub`가 더는 불러 쓸 수
 * 없게 됐다 — 빌드가 이렇게 멈췄다.
 *
 *   Attempted to call localized() from the server but localized is on the client.
 *
 * 순수 함수라 컴포넌트에 있을 이유가 없었다. lib으로 옮겨 서버·클라이언트 양쪽이
 * 같은 문구를 쓰게 한다.
 */

import { convertL10n } from './convert-i18n.ts';
import type { ConvertTool } from './convert-tools.ts';
import type { ConvertLang } from './convert-ui-intl.ts';

/**
 * 도구 하나의 문구를 그 언어로.
 *
 * 단위 기호도 언어별로 바꾼다. '리'·'자'·'돈'을 영어 페이지에 그대로 두면 읽을 수
 * 없는 글자가 입력칸 라벨에 박힌다. 한자권에서는 같은 한자라도 값이 달라서
 * (근 600g ↔ 斤 500g) '근(斤)'처럼 둘을 함께 적어 오해를 막는다.
 *
 * 번역이 없으면 원문으로 떨어진다 — 그 폴백이 미번역을 숨기지 않는지는
 * 번역 검사가 따로 본다.
 */
export function localized(tool: ConvertTool, lang: ConvertLang) {
  const l = convertL10n(tool.slug, lang);
  return {
    title: l?.title ?? tool.title,
    desc: l?.desc ?? tool.desc,
    long: l?.long ?? tool.long,
    note: l?.note ?? tool.note,
    from: l?.from ?? tool.from,
    to: l?.to ?? tool.to,
  };
}
