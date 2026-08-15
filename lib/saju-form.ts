import type { AnyLocale10 } from './locales.ts';
import { DATE_FORM, type FormLang } from './fortune-form-intl.ts';
import { SAJU_L10N, type SajuL10nLang } from './saju-l10n/index.ts';

/**
 * 사주 입력칸에 붙는 말 — 열 언어.
 *
 * ── 왜 생겼나 (2026-08-15) ──────────────────────────────────
 * 주제 낱장(components/fortune/SajuTopicPage.tsx)만 이 문구를 **손으로 적고
 * 있었다.** 월·일 칸의 힌트가 `1-12`, `1-31`이었는데, 숫자 칸에서 그것은 예시가
 * 아니라 "이렇게 적어라"로 읽힌다. 게다가 세 칸에 라벨이 아예 없어서 한 글자라도
 * 입력하면 힌트가 사라지고 어느 칸이 무엇인지 알 수 없었다. 시각 칸도 빈 상자
 * 하나뿐이라 선택인지 필수인지, 비우면 어떻게 되는지 보이지 않았다.
 *
 * 같은 말이 이미 두 곳에 있었다 — 날짜 세 칸은 lib/fortune-form-intl.ts가,
 * 성별과 시각은 lib/saju-l10n/이 갖고 있다. 둘 다 **한국어를 뺀 아홉 언어**라
 * (한국어 화면은 문구가 코드에 섞여 있어 갈라져 있다) 주제 낱장이 그대로 쓸 수
 * 없었고, 그래서 손으로 적혔던 것이다.
 *
 * 여기서 그 둘을 합치고 한국어만 보탠다. **새로 쓴 말은 한국어뿐이고**, 나머지
 * 아홉 언어는 이미 번역된 것을 그대로 가져온다 — 번역이 갈릴 자리를 안 만든다.
 * 한국어 문구는 app/(ko)/fortune/saju/page.tsx의 통합 화면과 같은 말로 맞췄다.
 */
export interface SajuFormCopy {
  /** 생년월일 묶음의 라벨 */
  birthLabel: string;
  /** 세 칸의 힌트 — 연도만 예시("예) 1995"), 월·일은 이름이다 */
  yearPh: string;
  monthPh: string;
  dayPh: string;
  /** 성별 */
  genderLabel: string;
  male: string;
  female: string;
  /** 태어난 시각 — 선택이라는 것과 비웠을 때 어떻게 되는지 */
  hourLabel: string;
  hourNote: string;
}

/**
 * 한국어만 여기 적는다.
 *
 * `hourLabel`에 (선택)을 넣는 것은 별표가 없는 칸이 필수인지 아닌지 한국어
 * 화면에서 그렇게 알렸기 때문이다. `hourNote`도 그 화면의 문장을 줄여 옮겼다 —
 * 진태양시 보정은 결과 쪽에서 다시 설명하므로 입력칸 밑에서는 짧게 둔다.
 */
const KO: SajuFormCopy = {
  birthLabel: '생년월일',
  yearPh: '예) 1995',
  monthPh: '월',
  dayPh: '일',
  genderLabel: '성별',
  male: '남성',
  female: '여성',
  hourLabel: '태어난 시각 (선택)',
  hourNote: '비워 두면 시주를 뺀 나머지로 봅니다. 넣으면 진태양시를 보정해 시주까지 뽑습니다.',
};

/** 열 언어 어느 것이든 입력칸 문구를 돌려준다 */
export function sajuForm(lang: AnyLocale10): SajuFormCopy {
  if (lang === 'ko') return KO;
  const d = DATE_FORM[lang as FormLang];
  const u = SAJU_L10N[lang as SajuL10nLang].ui;
  return {
    birthLabel: d.birthLabel,
    yearPh: d.yearPh,
    monthPh: d.monthPh,
    dayPh: d.dayPh,
    genderLabel: u.genderLabel,
    male: u.male,
    female: u.female,
    hourLabel: u.hourLabel,
    hourNote: u.hourNote,
  };
}
