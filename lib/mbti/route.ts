import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template.tsx';
import { withCard } from '../og-cards/index.ts';
import { prerender } from '../prerender.ts';
import { MBTI_TYPES } from '../mbti-match.ts';
import { PROFILES } from './profiles.ts';
import { functionStack } from './functions.ts';
import { MBTI_ICON, slugOf, temperamentOf, typeOfSlug } from './facts.ts';

/* 유형 낱장은 한국어만 낸다 — 글이 한국어로만 있다. 늘리려면 profiles를 언어별로 */
const FROM = '#8b5cf6';
const TO = '#4c1d95';

export function detailMetadata(slug: string): Metadata {
  const t = typeOfSlug(slug);
  if (!t) return {};
  const p = PROFILES[t];
  const stack = functionStack(t).join(' ');
  return withCard({
    title: `${t} 특징 - ${p.line} · 인지기능과 궁합`,
    description: `${t}의 성격과 강점·약점, 인지기능 ${stack}, 잘 맞는 유형과 맞춰 가야 하는 유형까지 정리했습니다.`,
    alternates: { canonical: `/fortune/mbti/${slugOf(t)}` },
  });
}

export function mbtiCard(_lang: unknown, slug: string): ReactElement {
  const t = typeOfSlug(slug);
  if (!t) {
    return ogCard({
      icon: MBTI_ICON, eyebrow: 'MBTI', title: 'MBTI 열여섯 유형',
      desc: '인지기능과 궁합으로 보는 유형별 특징', from: FROM, to: TO,
    });
  }
  /*
    눈썹은 카드에서 대문자로 그려진다 — 인지기능을 거기 넣으면 「FI NE SI TE」가
    되어 아는 사람이 보면 틀린 표기다. 기능은 대소문자가 살아 있는 설명 칸에 둔다.

    설명은 요약 통째가 아니라 첫 문장만 쓴다. 다 넣으면 다섯 줄이 되어 카드가
    글자로 꽉 찬다 — 공유 카드에서 읽히는 것은 두 줄까지다.
  */
  const first = PROFILES[t].summary.split(/(?<=\.)\s/)[0];
  return ogCard({
    icon: MBTI_ICON,
    eyebrow: `MBTI · ${temperamentOf(t).label}`,
    title: `${t} — ${PROFILES[t].line}`,
    desc: `${functionStack(t).join(' ')} · ${first}`,
    from: FROM,
    to: TO,
  });
}

export const mbtiParams = () => prerender(MBTI_TYPES.map(t => ({ slug: slugOf(t) })));
