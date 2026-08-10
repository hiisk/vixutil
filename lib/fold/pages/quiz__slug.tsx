import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { QuizIntlDetail, quizIntlDetailMeta } from '@/components/QuizIntlPage';
import { QUIZZES_INTL, QUIZZES_INTL_MAP } from '@/lib/quiz-l10n/index';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/quiz/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return quizIntlDetailMeta(lang, slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const quiz = QUIZZES_INTL_MAP[lang][slug];
    if (!quiz) notFound();
    return <QuizIntlDetail lang={lang} quiz={quiz} />;
  }

  return { generateMetadata, Page };
}
