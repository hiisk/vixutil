import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import { localeHref, type AnyLocale10 } from '@/lib/locales';
import { homeSections } from '@/lib/locale-home';

/**
 * 섹션 바로가기 격자.
 *
 * 원래 SiteFooter 안에만 있었다. 통합 검색은 질의가 없으면 화면 절반이 비는데,
 * 그 자리에 넣을 목록이 바로 이것이라 푸터에서 떼어 둘이 같이 쓴다.
 * 목록을 복사하면 섹션을 늘릴 때 한쪽만 고쳐져 두 자리가 갈린다.
 *
 * lang이 ko가 아니면 문구가 아니라 **목록 자체가 바뀐다** — 영어 사용자에게
 * 한국어 전용 섹션을 내보내면 누른 순간 못 읽는 페이지가 나온다.
 */
const SECTIONS: { href: string; icon: string; label: string }[] = [
  { href: "/calculator", icon: "📊", label: "계산기" },
  { href: "/test", icon: "🧭", label: "심리테스트" },
  { href: "/quiz", icon: "🏆", label: "지식퀴즈" },
  { href: "/generator", icon: "⚙️", label: "생성기" },
  { href: "/checklist", icon: "✅", label: "체크리스트" },
  { href: "/fortune", icon: "🔮", label: "오늘의 운세" },
  { href: "/random", icon: "🎲", label: "랜덤 뽑기" },
  { href: "/snap", icon: "📸", label: "스냅테스트" },
  { href: "/device", icon: "🧰", label: "기기 점검" },
  { href: "/image", icon: "🖼️", label: "이미지 도구" },
  { href: "/text", icon: "✍️", label: "텍스트 도구" },
  { href: "/game", icon: "🕹️", label: "두뇌 게임" },
  { href: "/color", icon: "🎨", label: "색상 도구" },
  { href: "/time", icon: "⏰", label: "시간 도구" },
  { href: "/sound", icon: "🔊", label: "소리 도구" },
  { href: "/food", icon: "🍳", label: "계량·요리" },
  { href: "/convert", icon: "🔄", label: "단위 변환" },
];

/**
 * 영어에만 손으로 두는 한 줄 — /crypto다.
 *
 * ── 왜 넷에서 이 하나로 줄었나 (2026-08-13) ──────────────────
 * 전에는 영어 섹션을 여기 넷만 적어 두었다("영어로 실제 페이지가 있는 섹션만").
 * 그 문구는 아홉 언어를 접기 전(lib/fold/registry.ts) 이야기다. 지금 영어는
 * **114개 섹션이 다 있고**(homeSections('en')로 확인), 다른 아홉 언어 푸터는
 * 이미 그 114개를 건다. 영어만 넷이었다.
 *
 * 게다가 그 넷 중 하나가 `/calculator/en`이었다 — 손으로 복사한 낡은 허브라
 * 계산기 158개 중 89개만 걸고, 그중 44개는 영어판이 따로 있는데도 한국어 쪽을
 * 가리켰다. 진짜 허브는 `/en/calculator`이고 homeSections에 들어 있다.
 *
 * /crypto만 남기는 까닭: 그 섹션은 한국어 라우트에 영어 내용이 있는 예외라
 * lib/locale-home.ts의 목록에 없다(거기는 열 언어 섹션만 든다).
 */
const CRYPTO_EN = { href: "/crypto", icon: "🪙", label: "Crypto Tools" };

export default function SectionShortcuts({ lang = 'ko' }: { lang?: AnyLocale10 }) {
  /*
    섹션 목록을 언어마다 다시 적지 않는다 — lib/locale-home.ts가 "그 언어에 실제로
    있는 섹션"을 이미 갖고 있고, 언어 첫 화면이 그것으로 그려진다.
    한국어만 손으로 적은 목록을 쓴다 — homeSections('ko')는 빈 배열이다.
  */
  const sections = lang === 'ko'
    ? SECTIONS
    : [
        ...(lang === 'en' ? [CRYPTO_EN] : []),
        ...homeSections(lang).map(s => ({ href: localeHref(lang, s.route), icon: s.icon, label: s.title })),
      ];

  return (
    <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {sections.map((s) => (
        <Link prefetch={false} key={s.href} href={s.href} className="nav-chip">
          <ToolIcon emoji={s.icon} className="nav-chip-icon" />
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
