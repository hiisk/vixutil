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
  lang, value, onChange, onSubmit, submitLabel, submitClass, error, header, children,
}: {
  lang: AnyLocale10;
  value: SajuFormValue;
  onChange: (v: SajuFormValue) => void;
  onSubmit: () => void;
  submitLabel: ReactNode;
  /** 단추 그라데이션 — 주제 낱장은 주제색을 쓴다 */
  submitClass?: string;
  error?: string;
  /** 카드 맨 위에 여백 없이 들어가는 머리글 — 한국어 통합 화면이 쓴다 */
  header?: ReactNode;
  /** 이름 칸처럼 그 화면에만 있는 것 — 시각과 단추 사이에 들어간다 */
  children?: ReactNode;
}) {
  const fc = sajuForm(lang);
  const set = (patch: Partial<SajuFormValue>) => onChange({ ...value, ...patch });

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-6"
    >
      {header}
      <div className="p-5">
        {/*
          ♂·♀ 기호만 두면 무엇을 고르는 칸인지, 지금 무엇이 골라져 있는지가 색으로만
          남는다. 대운의 방향이 성별로 갈리므로 잘못 고르면 결과가 통째로 달라진다.
        */}
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{fc.genderLabel}</span>
        <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label={fc.genderLabel}>
          {(['male', 'female'] as const).map(g => (
            <button key={g} type="button" onClick={() => set({ gender: g })}
              aria-pressed={value.gender === g}
              className={`rounded-xl py-2.5 text-sm font-bold border transition-colors ${value.gender === g
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {g === 'male' ? `♂ ${fc.male}` : `♀ ${fc.female}`}
            </button>
          ))}
      </div>

      {/* 라벨을 따로 두는 것은 한 글자만 입력해도 힌트가 사라지기 때문이다 */}
      <label htmlFor="saju-year" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{fc.birthLabel}</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['year', 'month', 'day'] as const).map(k => {
          const ph = k === 'year' ? fc.yearPh : k === 'month' ? fc.monthPh : fc.dayPh;
          return (
            <input key={k} id={`saju-${k}`} type="number" inputMode="numeric" value={value[k]}
              placeholder={ph} aria-label={ph}
              min={k === 'year' ? 1900 : 1} max={k === 'year' ? 2100 : k === 'month' ? 12 : 31}
              onChange={e => set({ [k]: e.target.value } as Partial<SajuFormValue>)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none" />
          );
        })}
      </div>

      {/* 분까지 받아야 진태양시 보정이 뜻을 가진다 — 비우면 시주를 생략한다 */}
      <label htmlFor="saju-hour" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{fc.hourLabel}</label>
      <input id="saju-hour" type="time" value={value.hour}
        onChange={e => set({ hour: e.target.value })}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none mb-1" />
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{fc.hourNote}</p>

      {children}

      {error && <p className="text-xs text-rose-600 dark:text-rose-400 mb-2">{error}</p>}
      <button type="submit"
        className={`w-full rounded-xl bg-gradient-to-r ${submitClass ?? 'from-indigo-600 to-violet-600'} text-white text-sm font-black py-3.5 hover:-translate-y-0.5 hover:shadow-lg transition-all`}>
        {submitLabel}
      </button>
      </div>
    </form>
  );
}
