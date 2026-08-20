'use client';
import { type ReactNode } from 'react';
import type { AnyLocale10 } from '@/lib/locales';
import { sajuForm } from '@/lib/saju-form';

/**
 * 사주 입력 폼 — 세 화면이 함께 쓴다.
 *
 * ── 왜 하나로 모았나 (2026-08-15) ──────────────────────────
 * 사주 화면이 셋이다 — 한국어 통합(app/(ko)/fortune/saju), 아홉 언어 통합
 * (SajuIntl), 열 언어 주제 낱장(SajuTopicPage). **셋이 같은 폼을 각자 그리고
 * 있었고**, 그래서 한 곳만 뒤처졌다. 주제 낱장의 월·일 힌트가 `1-12`·`1-31`이고
 * 라벨이 아예 없던 것이 그 결과다(사용자가 찾았다).
 *
 * 갈라져 있으면 고칠 때마다 세 곳을 손대야 하고, 곧 두 곳만 고친 채로 남는다.
 * 그래서 폼은 여기 하나뿐이고, 화면마다 다른 것은 **넘기는 값으로만** 가른다.
 *
 * ── 어느 쪽으로 통일했나 ───────────────────────────────────
 * 셋이 달랐던 것과 고른 쪽:
 *
 *   차례      성별 → 생년월일 → 시각. 셋 가운데 둘(한국어·주제)이 그랬다
 *   월 칸     select이 아니라 숫자 칸. 한국어만 select이라 한 줄 안에서 생김새가
 *             갈렸다. 범위는 min/max가 지킨다
 *   힌트      이름("월")이지 범위("1-12")가 아니다 — 숫자 칸에서 범위는 입력
 *             형식으로 읽힌다
 *   성별색    남=파랑·여=분홍을 버리고 accent 하나로 간다. 색으로 성별을 말하지
 *             않아도 글자가 이미 말한다
 *   Enter     <form onSubmit>이라 거저 얻는다. 한국어 화면이 칸마다 달고 있던
 *             onKeyDown 셋이 없어진다
 *
 * 문구는 lib/saju-form.ts가 열 언어로 갖고 있고, 그 아홉은 이미 있던 번역을
 * 그대로 가져온 것이다 — 여기서 말을 새로 쓰지 않는다.
 */
export interface SajuFormValue {
  year: string;
  month: string;
  day: string;
  hour: string;
  gender: 'male' | 'female';
}

export default function SajuForm({
  lang, value, onChange, onSubmit, submitLabel, error, header, children,
}: {
  lang: AnyLocale10;
  value: SajuFormValue;
  onChange: (v: SajuFormValue) => void;
  onSubmit: () => void;
  submitLabel: ReactNode;
  /** 단추 그라데이션 — 주제 낱장은 주제색을 쓴다 */
  error?: string;
  /** 카드 맨 위에 여백 없이 들어가는 머리글 — 한국어 통합 화면이 쓴다 */
  header?: ReactNode;
  /** 이름 칸처럼 그 화면에만 있는 것 — 시각과 단추 사이에 들어간다 */
  children?: ReactNode;
}) {
  const fc = sajuForm(lang);
  const set = (patch: Partial<SajuFormValue>) => onChange({ ...value, ...patch });
  /* 값은 여전히 "HH:MM" 한 문자열이다 — 이 폼을 읽는 쪽을 안 건드리려는 것이다 */
  const [hh, mm] = value.hour ? value.hour.split(':') : ['', '00'];

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-6"
    >
      {header}
      <div className="p-5">
        {/*
          라벨을 따로 둔다. 대운의 방향이 성별로 갈리므로 잘못 고르면 결과가 통째로
          달라지는데, 무엇을 고르는 칸인지가 안 보이면 그냥 지나친다.

          성별 기호는 뺐다(2026-08-20) — 글자가 이미 「남성」·「여성」이라고
          말하고 있어서 기호는 같은 말을 두 번 하는 것이었다. 검사도 기호가
          다시 들어오면 잡는다(tests/saju-topics.test.ts).
        */}
        <span className="fld-lbl">{fc.genderLabel}</span>
        <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label={fc.genderLabel}>
          {(['male', 'female'] as const).map(g => (
            <button key={g} type="button" onClick={() => set({ gender: g })}
              aria-pressed={value.gender === g}
              /* 고른 것은 떠오르고 안 고른 것은 들어가 있다 — 색 말고 높이로도 읽힌다 */
              className={`rounded-xl py-2.5 text-sm font-bold border transition-all ${value.gender === g
                ? 'pick-on text-sec'
                : 'pick-off text-slate-600 dark:text-slate-300'}`}>
              {g === 'male' ? fc.male : fc.female}
            </button>
          ))}
      </div>

      {/* 라벨을 따로 두는 것은 한 글자만 입력해도 힌트가 사라지기 때문이다 */}
      <label htmlFor="saju-year" className="fld-lbl">{fc.birthLabel}</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['year', 'month', 'day'] as const).map(k => {
          const ph = k === 'year' ? fc.yearPh : k === 'month' ? fc.monthPh : fc.dayPh;
          return (
            <input key={k} id={`saju-${k}`} type="number" inputMode="numeric" value={value[k]}
              placeholder={ph} aria-label={ph}
              min={k === 'year' ? 1900 : 1} max={k === 'year' ? 2100 : k === 'month' ? 12 : 31}
              onChange={e => set({ [k]: e.target.value } as Partial<SajuFormValue>)}
              className="fld text-center font-bold tabular-nums" />
          );
        })}
      </div>

      {/*
        ── 왜 <input type="time">을 안 쓰나 (2026-08-15) ──────────
        네이티브 시각 칸은 브라우저가 제 마음대로 그린다 — 크롬 데스크톱은 위아래
        화살표가 붙은 좁은 상자를, 사파리는 또 다른 것을 낸다. 옆의 숫자 칸들과
        높이도 글꼴도 안 맞아 폼 안에서 그 칸만 떠 보였다.

        시·분 고르개 둘로 바꾼다. 나머지 칸과 같은 .fld를 쓰므로 줄이 맞고,
        "모름"이 목록 안에 있어 **비울 수 있다는 것이 눈에 보인다** — 예전에는
        선택이라는 말이 라벨에만 있었다.

        분까지 받는 것은 진태양시 보정(서울 −32분) 때문이다. 시진 경계에 걸린
        사람은 분이 시주를 바꾼다.
      */}
      <span className="fld-lbl">{fc.hourLabel}</span>
      {/*
        ── 시각은 «모름» 체크로 가른다 (2026-08-20) ───────────────
        전에는 «모름»이 시 고르개의 한 항목이었다. 그래서 아무것도 안 고른
        상태가 「모름 : 00」으로 보였다 — 분 칸이 구체적인 값을 내밀고 있어
        0분으로 정해진 것처럼 읽힌다.

        땜질을 두 번 했다. 분 칸을 숨겼더니 시를 고르는 순간 칸이 튀어나와 더
        이상했고, 값만 «--»로 비웠더니 여전히 무엇을 해야 하는지 안 보였다.

        상태를 UI로 드러낸다. 모른다는 것은 «값»이 아니라 «상태»이므로 체크로
        받는다. 체크가 켜져 있으면 시각 줄이 없다 — 사람이 직접 끈 것이라
        나타나고 사라지는 것이 놀랍지 않다. 문구는 있던 것(모름)을 그대로 써서
        열 언어가 그대로 간다.
      */}
      <label className="mb-2 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-current text-sec"
          checked={value.hour === ''}
          onChange={e => set({ hour: e.target.checked ? '' : '12:00' })}
        />
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{fc.hourUnknown}</span>
      </label>

      {value.hour !== '' && (
        <div className="flex items-center gap-2 mb-1">
          <select id="saju-hour" aria-label={fc.hourLabel} className="fld fld-sel flex-1" value={hh}
            onChange={e => set({ hour: `${e.target.value}:${mm || '00'}` })}>
            {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <span className="text-slate-500 dark:text-slate-400 font-bold" aria-hidden>:</span>
          <select aria-label={`${fc.hourLabel} 00-59`} className="fld fld-sel flex-1" value={mm}
            onChange={e => set({ hour: `${hh}:${e.target.value}` })}>
            {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}
      <p className="fld-note mb-3">{fc.hourNote}</p>

      {children}

      {error && <p className="text-xs text-rose-600 dark:text-rose-400 mb-2">{error}</p>}
      <button type="submit"
        className={`w-full rounded-full bg-sec text-white text-sm font-bold py-3.5 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all`}>
        {submitLabel}
      </button>
      </div>
    </form>
  );
}
