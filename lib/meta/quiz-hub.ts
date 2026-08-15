/* 옮겨 옴 — components/QuizIntlPage.tsx의 quizIntlMeta().
   메타는 서버에 남고 뷰만 클라이언트에서 갈리므로, 메타 함수가 컴포넌트 파일 안에
   있으면 서버 그래프가 뷰에 닿아 청크가 도로 합쳐진다(components/FoldView.tsx 머리말). */
import { hubAlternates } from '@/lib/locale-alternates';
import type { QuizIntlLang } from '@/lib/quiz-l10n/index';
import { withCard } from '@/lib/og-cards';
import { UI } from './quiz-hub-ui';

export function quizIntlMeta(lang: QuizIntlLang) {
  const ui = UI[lang];
  // 카드는 canonical에서 정해진다 — /og/<언어>/quiz를 그대로 쓴다
  return withCard({
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: {
      canonical: `/${lang}/quiz`,
      // 한국어 허브까지 넣는다 — 상호 선언이 아니면 구글이 무시한다
      languages: hubAlternates('quiz'),
    },
  });
}
