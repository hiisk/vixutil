import type { Generator } from '@/lib/types';

/**
 * 생성기가 실제로 무엇을 뽑는지 정적 HTML로 함께 내보내는 서버 컴포넌트.
 *
 * GeneratorEngine도 스플래시에서 시작하는 구조라 프리렌더 HTML에는 버튼만 남고,
 * 정작 목록(pick 타입의 items는 중앙값 41개짜리 실제 문장 모음이다)은 통째로 빠져 있었다.
 * 결과를 한 번에 하나씩만 보여주는 것도 목록 전체를 훑고 싶은 사람에겐 불편하다.
 */

/** 자릿수가 커지면 지수로 접어 표기한다. */
function formatCount(n: number) {
  if (!Number.isFinite(n)) return null;
  if (n < 1e7) return n.toLocaleString('ko-KR');
  return `약 ${n.toExponential(1).replace('e+', ' × 10^')}`;
}

function Explainer({ gen }: { gen: Generator }) {
  switch (gen.type) {
    case 'combine': {
      const pools = gen.pools ?? [];
      const total = pools.reduce((a, p) => a * p.length, 1);
      const count = formatCount(total);
      return (
        <p>
          아래 {pools.length}개 묶음에서 각각 하나씩 뽑아
          {gen.separator ? ` "${gen.separator}"로 이어` : ' 그대로 붙여'} 만듭니다.
          {count && ` 나올 수 있는 조합은 모두 ${count}가지입니다.`}
        </p>
      );
    }
    case 'pick':
      return <p>아래 {gen.items?.length ?? 0}개 목록에서 무작위로 하나를 고릅니다.</p>;
    case 'sample':
      return (
        <p>
          {gen.min}부터 {gen.max}까지의 수 가운데 중복 없이 {gen.count}개를 뽑아 오름차순으로
          정렬합니다.
        </p>
      );
    case 'number':
      return (
        <p>
          {gen.min}부터 {gen.max}까지 범위에서 무작위 정수를 뽑습니다.
        </p>
      );
    case 'password':
      return (
        <p>
          브라우저의 암호학적 난수 생성기로 매번 새로 만듭니다. 생성된 값은 서버로 전송되거나
          저장되지 않습니다.
        </p>
      );
  }
}

export default function GeneratorContent({ gen }: { gen: Generator }) {
  const pools = gen.pools ?? [];
  const items = gen.items ?? [];
  const hasList = items.length > 0 || pools.length > 0;

  return (
    // 배경은 GeneratorEngine·RelatedContent와 같은 slate-50으로 맞춘다.
    <div className="bg-slate-50 dark:bg-slate-950">
      <section className="max-w-lg mx-auto px-4 pb-10 w-full" aria-label="생성 방식 안내">
        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1.5">
          {gen.title}는 어떻게 만들어지나요?
        </h2>
        <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <Explainer gen={gen} />
        </div>

        {items.length > 0 && (
          <>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-5 mb-2">
              전체 목록 {items.length}개
            </h3>
            <ul className="flex flex-col gap-1.5">
              {items.map((it, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                >
                  {it}
                </li>
              ))}
            </ul>
          </>
        )}

        {pools.length > 0 && (
          <>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-5 mb-2">
              단어 묶음
            </h3>
            <ul className="flex flex-col gap-3">
              {pools.map((pool, i) => (
                <li key={i}>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5">
                    {i + 1}번째 자리 · {pool.length}개
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {pool.map(w => (
                      <li
                        key={w}
                        className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}

        {hasList && (
          <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500 mt-4">
            모든 생성은 브라우저에서만 이루어지며 결과는 서버에 저장되지 않습니다.
          </p>
        )}
      </section>
    </div>
  );
}
