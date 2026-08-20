import ToolIcon from './ToolIcon';

/**
 * 페이지 머리 (2026-08-19).
 *
 * ── eyebrow를 뺐다 ──────────────────────────────────────────────
 * 처음에는 갈래 이름을 작은 대문자 라벨로 제목 위에 얹었다. 공유 카드가 그렇게
 * 생겼으니 화면도 맞춘다는 생각이었는데, 화면에는 **바로 위 줄에 빵부스러기가
 * 이미 갈래 이름을 적고 있다.** 같은 말이 두 번이고, 그 작은 대문자 라벨은
 * 어느 AI가 만든 화면에나 있는 바로 그 장치다. 제목만 남긴다.
 *
 * ── 글리프를 «떠 있는 아이콘»에서 «바탕 그림»으로 ────────────────
 * 96px짜리 선 아이콘이 넓은 어둠 속에 혼자 떠 있으면 구성이 아니라 여백이다.
 * 크게 키우고 옅게 깔아 오른쪽으로 흘려보낸다 — 제목을 받치는 바탕이 되고,
 * 잘려 나가는 가장자리가 화면 밖으로 이어지는 느낌을 만든다.
 *
 * 나머지 규격은 globals.css의 .hero 계열에 있다.
 */
export default function PageHero({
  title,
  desc,
  icon,
  className = '',
  children,
}: {
  title: string;
  desc?: string;
  /** 카드에 쓰는 그 이모지. ToolIcon이 같은 선 아이콘으로 바꿔 그린다 */
  icon?: string;
  /** 아래 판과 붙일 때 hero-flat 같은 것을 넘긴다 */
  className?: string;
  /** 제목 아래 놓을 것 — 언어 고르개처럼 머리에 붙는 것들 */
  children?: React.ReactNode;
}) {
  return (
    <div className={`hero ${className}`}>
      {icon && (
        <div aria-hidden className="hero-art">
          <ToolIcon emoji={icon} className="w-full h-full" />
        </div>
      )}
      <div className="hero-in">
        <h1 className="hero-title">{title}</h1>
        {desc && <p className="page-lede">{desc}</p>}
        {children}
      </div>
    </div>
  );
}
