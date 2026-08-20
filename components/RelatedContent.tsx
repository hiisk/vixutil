import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import { pickRelated, type RelatedItem } from '@/lib/related';

type Accent = 'violet' | 'amber' | 'sky' | 'emerald';

/*
 * ── 갈래 색 표를 버렸다 (2026-08-19) ─────────────────────────────
 * 갈래마다 hover 테두리·아이콘 판·hover 글자색을 손으로 적어 두고 있었다. 그런데
 * 그 색은 이미 --c-sec로 페이지에 깔려 있다(PageGlow). 표를 들고 있으면 갈래를
 * 더할 때 여기도 고쳐야 하고, 실제로 accent를 안 넘긴 곳은 기본값 하나로 굳었다.
 *
 * accent prop은 부르는 곳이 백 군데라 그대로 받되 쓰지 않는다 — 색은 페이지가 낸다.
 */

/**
 * 같은 카테고리의 다른 콘텐츠를 추천한다. 선택 규칙은 lib/related.ts 참고.
 *
 * 상세 페이지가 허브로 되돌아가는 링크밖에 없어 사실상 막다른 길이었다.
 * 서버 컴포넌트라 링크가 정적 HTML에 그대로 들어가고, 덕분에 크롤러가 허브를
 * 거치지 않고도 개별 페이지 사이를 오갈 수 있다.
 */
export default function RelatedContent({
  items,
  currentSlug,
  basePath,
  accent,
  limit = 6,
  bg = 'bg-white dark:bg-slate-900',
}: {
  items: readonly RelatedItem[];
  currentSlug: string;
  basePath: string;
  accent: Accent;
  limit?: number;
  /** 엔진의 배경과 맞춰 경계가 드러나지 않게 한다. */
  bg?: string;
}) {
  const current = items.find(i => i.slug === currentSlug);
  const picked = pickRelated(items, currentSlug, limit);
  if (!current || picked.length === 0) return null;

  return (
    <div className={bg}>
      <section className="max-w-lg mx-auto px-4 pb-12 w-full" aria-label="관련 콘텐츠">
        <h2 className="sec-h2">
          {current.category} 더 보기
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {picked.map(item => (
            /*
              prefetch를 끈다 (2026-08-20). 이 격자는 여섯 개가 깔리는데 눌리는
              것은 많아야 하나다. 기본 프리페치는 여섯 개의 라우트 짐을 전부
              미리 받아 온다 — 테스트 낱장에서 그렇게 딸려 온 청크가 729KB였다.
            */
            <Link
              prefetch={false}
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              /*
                min-w-0가 없으면 격자 칸이 가로로 넘친다. 칸의 기본값은
                min-width:auto라 «긴 제목의 최소 폭»이 칸의 최소 폭이 된다 —
                390px 화면에서 카드가 436px을 요구해 문서 전체가 453px로 늘어났다.
                truncate는 그 최소 폭을 안 줄인다(줄바꿈만 막는다).
              */
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
            >
              <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-sec-soft`}>
                <ToolIcon emoji={item.icon} className="w-5 h-5" title={item.title} />
              </span>
              <span className="min-w-0 flex-1">
                {/* truncate는 블록에서만 먹는다 — 인라인 span에서는 넘침이 안 잘린다 */}
                <span className="hub-card-title block truncate">
                  {item.title}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
