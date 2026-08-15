import { REFERRAL_REL, referralHref, referralSplit, referralSubId } from '@/lib/referral';
import { BrandMark, HEADING } from './ReferralCards';
import type { AnyLocale10 } from '@/lib/locales';

/**
 * 옆 레일 제휴 배너 — 넓은 화면에서 본문 옆 여백에 세로로 세운다 (2026-08-12).
 *
 * ── 왜 만들었나 ─────────────────────────────────────────
 * 수익은 제휴에서 나오는데 카드가 본문 아래 한 곳에만 있었다. 계산기 페이지는
 * 결과를 보고 바로 닫는 사람이 많아 그 아래까지 내려오지 않는다. 1440px 화면에서
 * 양옆이 430px씩 비어 있었으니, 본문을 건드리지 않고 노출을 늘릴 자리가 거기였다.
 *
 * ── 본문을 좁혀 자리를 만들지 않는다 ────────────────────
 * 껍데기가 본문 기둥과 이 레일을 flex로 나란히 놓는다(RAIL_WRAP). 기둥의 폭은
 * 껍데기가 정한 그대로고, 레일은 그 바깥의 남는 여백에 들어간다. 그래서 레일이
 * 생겨도 본문 한 줄의 글자 수는 변하지 않는다.
 *
 * ── xl 이상에서만 뜬다 ──────────────────────────────────
 * lg(1024px)에서는 본문이 이미 672px로 넓어져 있어 288px 레일까지 넣으면 둘 다
 * 찌그러진다. 그래서 한 칸 올려 xl(1280px)부터다. 그 아래에서는 hidden이라
 * 화면에 아무것도 차지하지 않는다 — 좁은 화면에서 본문을 밀어내거나 가로
 * 스크롤을 만들면 안 된다는 것이 이 배너의 첫 조건이다.
 *
 * 잃는 것 — 서버 렌더라 화면 폭을 미리 알 수 없어서, xl 미만에서도 마크업 자체는
 * HTML에 실린다(display:none). 링크 두 줄 분량이라 무게는 무시할 만하고,
 * display:none은 스크린 리더에서도 빠지므로 좁은 화면에 군더더기가 들리지 않는다.
 *
 * ── 겹침 규칙 ───────────────────────────────────────────
 * 같은 화면에 같은 거래소를 두 번 보여 주지 않는다. 레일이 뜨는 화면에서는 본문
 * 카드가 1위만 남기고 나머지를 레일에 넘긴다(lib/referral.ts의 referralSplit).
 * 푸터 카드는 이 껍데기들이 이미 referral={false}로 꺼 두었다 —
 * tests/referral-placement.test.ts가 세 자리 모두를 붙들고 있다.
 */

/**
 * 본문 기둥 + 옆 레일을 나란히 놓는 껍데기.
 *
 * xl 미만에서는 그냥 블록이다(레일이 hidden이므로 기둥이 예전처럼 가운데에 온다).
 * xl 이상에서는 flex로 바뀌고 justify-center가 "기둥 + 레일" 묶음을 가운데 놓는다
 * — 그래서 레일이 뜨는 화면에서만 본문이 페이지 가운데보다 왼쪽으로 붙는다.
 *
 * 폭이 둘인 까닭: 넓은 껍데기(본문 max-w-4xl = 896px)는 896 + 32 + 288 = 1216이
 * 필요해서 6xl(1152px)에 안 들어간다. 좁은 쪽은 672 + 32 + 288 = 992로 넉넉하다.
 * 기둥에는 xl:mx-0을 함께 준다 — auto 여백을 남겨 두면 그것이 남는 공간을 다
 * 먹어서 레일이 화면 오른쪽 끝으로 밀려난다.
 */
export const RAIL_WRAP = {
  narrow: 'mx-auto w-full xl:flex xl:max-w-6xl xl:items-start xl:justify-center xl:gap-8',
  wide: 'mx-auto w-full xl:flex xl:max-w-7xl xl:items-start xl:justify-center xl:gap-8',
} as const;

/**
 * 레일 자체. 288px(w-72)은 카드에 브랜드 마크·금액·CTA가 한 줄씩 들어가는 최소 폭이다.
 *
 * sticky로 스크롤을 따라오되 화면 높이를 넘지 않게 max-h를 두고, 세로로 넘치면
 * 레일 안에서만 스크롤된다. 머리글이 sticky top-0에 56px로 앉아 있어 top-20으로
 * 그 아래에 붙인다. 오버레이·팝업이 아니다 — 화면에 떠서 본문을 가리는 광고는
 * 애드센스 정책에 걸리고, 사용자가 보려고 누른 결과를 가린다.
 *
 * px-1 pt-1은 카드가 호버에 살짝 떠오를 때 그림자가 잘리지 않게 두는 여유다 —
 * overflow-y-auto가 가로도 함께 자른다(한 축이 visible이 아니면 다른 축도 auto가 된다).
 */
const RAIL =
  'hidden xl:block w-72 shrink-0 self-start sticky top-20 mt-8 max-h-[calc(100vh-6rem)] overflow-y-auto px-1 pt-1 pb-8';

export default function ReferralAside({ lang = 'ko', section }: { lang?: AnyLocale10; section?: string }) {
  // 레일이 맡은 몫. 제휴가 하나뿐이면 비므로 아무것도 그리지 않는다 —
  // 빈 테두리만 남으면 본문 옆에 이유 없는 상자가 하나 서 있게 된다.
  const items = referralSplit(true).rail;
  if (items.length === 0) return null;

  const t = HEADING[lang] ?? HEADING.en;
  // 자리 이름은 'rail' — 본문 카드(section·result)와 클릭을 갈라 볼 수 있어야
  // 레일이 값을 하는지 판단할 수 있다. 이것이 레일을 세운 이유의 검증이다.
  const subId = referralSubId(lang, 'rail', section);

  return (
    <aside className={RAIL} aria-label={t.rail}>
      <div className="mb-1.5 flex items-center gap-1.5">
        {/* "광고" 표기는 여기서도 빼지 않는다 — 크게 노출할수록 더 필요하다 */}
        <span className="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {t.ad}
        </span>
        <p className="text-[13px] font-black text-slate-800 dark:text-slate-100">{t.rail}</p>
      </div>
      {/* 무엇을 얻는지 한 줄 — 본문 카드와 같은 문구를 쓴다 */}
      <p className="mb-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{t.why}</p>

      <div className="space-y-3">
        {items.map(r => {
          const copy = r.copy[lang] ?? r.copy.en;
          return (
            <a
              key={r.id}
              href={referralHref(r, subId)}
              target="_blank"
              rel={REFERRAL_REL}
              data-ref-id={r.id}
              data-ref-sub={subId}
              className="group block rounded-2xl border-2 border-amber-300 dark:border-amber-500/50 bg-gradient-to-b from-amber-50 to-white dark:from-amber-500/[0.16] dark:to-transparent p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <span className="flex items-center gap-1.5">
                <BrandMark id={r.id} />
              </span>
              {/* 금액은 라이트에서 700, 다크에서 300 — 브랜드 노랑을 글자에 그대로 쓰면 흰 배경에서 사라진다 */}
              <span className="mt-3 block text-[27px] font-black leading-none text-amber-700 dark:text-amber-300">
                {copy.bonus}
              </span>
              <span className="mt-2 block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                🏆 {copy.rankLabel}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                {copy.perks.join(' · ')}
              </span>
              <span className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-amber-400 py-2.5 text-[13px] font-black leading-tight text-slate-950 transition-colors group-hover:bg-amber-300">
                <span className="text-center">{copy.cta}</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
