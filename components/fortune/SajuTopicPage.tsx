'use client';
import { useState, useEffect, useCallback } from 'react';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import Faq from '@/components/Faq';
import { type AnyLocale10 } from '@/lib/locales';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';
import { type SajuL10nLang } from '@/lib/saju-l10n/index';
import { TOPIC_EMOJI, NAME_KEY, type TopicSlug } from '@/lib/saju-topics';
import SajuKo from '@/components/fortune/SajuKo';
import SajuIntl from '@/components/fortune/SajuIntl';

/**
 * 사주 주제 낱장 — /fortune/saju/<주제>, 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * ── 얇아진 까닭 (2026-08-15) ─────────────────────────────
 * 예전에는 이 파일이 명식을 따로 뽑고 근거·해설·배경만 그렸다. 그래서 **주제로
 * 들어온 사람이 통합 화면으로 들어온 사람보다 적게 봤다** — 일주 심층해석도,
 * 십성도, 대운도, 세운도 없었다. 같은 사주인데 들어온 문으로 결과가 갈렸다.
 *
 * 지금은 통합 화면을 그대로 띄우고 **그 주제의 영역을 열어 둔 채** 시작한다.
 * 사주는 한 페이지에서 다 돌아가고, 주소 일곱은 그 페이지로 들어가는 문일 뿐이다.
 * 검색에서 「사주 연애운」으로 들어와도 전체 분석을 받는다.
 *
 *   한국어      components/fortune/SajuKo.tsx
 *   아홉 언어   components/fortune/SajuIntl.tsx
 *
 * 이 파일에 남은 것은 **그 문에만 붙는 것** 셋뿐이다 — 제목·소개, 이름 칸,
 * 주제별 자주 묻는 질문. 나머지는 전부 통합 화면이 그린다.
 *
 * ── 이름은 브라우저 밖으로 안 나간다 ─────────────────────
 * 이름으로 사주가 바뀌지 않는다(그건 틀린 명리다). 부르는 말에만 쓴다.
 * 그래서 주소(replaceState)에도, 서버에도 넣지 않는다 — 주소에 넣으면 개인정보인
 * 데다 캐시가 이름마다 갈린다. tests/saju-topics.test.ts가 그것을 지킨다.
 */

/** 공유 링크에 싣는 열쇠 — 이름은 여기 없다. 늘릴 때 검사도 함께 본다. */
export const SHARE_KEYS = ['y', 'm', 'd', 'h', 'g'] as const;

const fill = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export default function SajuTopicPage({ lang, topic }: { lang: AnyLocale10; topic: TopicSlug }) {
  const c = TOPIC_L10N[lang];
  const [name, setName] = useState('');

  /* 주제를 옮겨 다닐 때만 탭 안에서 따라온다. 탭을 닫으면 사라진다 */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(sessionStorage.getItem(NAME_KEY) ?? '');
  }, []);

  const changeName = useCallback((v: string) => {
    setName(v);
    sessionStorage.setItem(NAME_KEY, v);
  }, []);

  const topicTitle = c.title[topic];
  const heading = name.trim()
    ? fill(c.ui.titleOf, { name: name.trim(), topic: topicTitle })
    : topicTitle;

  /* 폼 위 — 이 문의 이름표. h1은 여기 하나뿐이다(통합 화면은 주제가 있으면 낮춘다) */
  const head = (
    <div className="mb-6">
      <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji={TOPIC_EMOJI[topic]} className="h-6 w-6" /></span>
      <div className="hero-band">
        <PageHero title={heading} desc={c.lead[topic]} />
      </div>
    </div>
  );

  /* 폼 안 — 이름. 값이 바뀌면 위의 제목이 「홍길동님의 연애운」으로 바뀐다 */
  const nameField = (
    <>
      <label htmlFor="saju-topic-name" className="fld-lbl">{c.ui.nameLabel}</label>
      <input id="saju-topic-name" type="text" value={name} placeholder={c.ui.namePh} autoComplete="off"
        onChange={e => changeName(e.target.value)}
        className="fld w-full mb-1" />
      <p className="fld-note mb-3">{c.ui.nameNote}</p>
    </>
  );

  const faq = [...c.faqCommon, c.faqTopic[topic]];

  return lang === 'ko'
    ? <SajuKo initialTopic={topic} formExtra={nameField} topicHead={head} faq={faq} />
    : (
      <SajuIntl
        lang={lang as SajuL10nLang} initialTopic={topic}
        formExtra={nameField} topicHead={head}
        topicTail={<Faq items={faq} lang={lang} />}
      />
    );
}
