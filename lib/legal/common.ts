/**
 * 정책·소개 네 장이 함께 쓰는 뼈대 — 갈래 이름, 문구의 모양, 흩어지면 안 되는 값 둘.
 *
 * ── 왜 이런 페이지가 필요한가 (2026-08-12) ─────────────────────
 * 애드센스가 "가치 없는 콘텐츠"로 거절할 때 가장 흔한 원인이 소개·문의·개인정보
 * 처리방침·이용약관이 아예 없는 것이다. 심사자는 이 네 장을 사람이 읽고, 크롤러는
 * 푸터에서 찾는다. 그래서 문구는 자리를 채우는 글이 아니라 이 사이트에 실제로
 * 해당하는 사실이어야 한다 — 빈 껍데기는 없는 것보다 나쁘다.
 *
 * ── 왜 문구를 여기 모으는가 ────────────────────────────────────
 * 네 갈래 × 열 언어 = 40장이다. 페이지마다 문장을 적으면 40곳에 같은 뜻이 흩어져,
 * "브라우저를 떠나지 않는다"를 한 번 고칠 때 40곳을 고쳐야 한다. 그래서 문구는
 * lib/legal/<갈래>.ts에 L<LegalCopy>로 한 벌씩 두고, 라우트 파일 40개는 언어와
 * 갈래만 넘기는 껍데기로 남긴다. 화면은 components/LegalPage.tsx 하나다.
 *
 * ── 날짜를 문구에 박지 않는 이유 ───────────────────────────────
 * "최근 개정일 2026-08-12"를 열 언어 문구에 적으면 개정할 때 열 곳을 고쳐야 하고,
 * 한 곳을 빼먹으면 그 언어만 옛 날짜를 주장한다. 정책 문서에서 날짜가 갈리는 것은
 * 내용이 갈리는 것과 같은 무게다. 그래서 날짜는 LEGAL_REVISED 하나이고, 언어별로
 * 갖는 것은 그 앞에 붙는 이름표뿐이다. 이메일도 같은 이유로 상수다.
 */
import type { L } from '../i18n/lang.ts';

/** 정책·소개 네 갈래. 이름이 곧 주소다 — /about, /contact, /privacy, /terms */
export const LEGAL_KINDS = ['about', 'contact', 'privacy', 'terms'] as const;
export type LegalKind = (typeof LEGAL_KINDS)[number];

/** 그 갈래의 주소(언어 앞머리 없이) — localeHref에 넘길 값 */
export const legalRoute = (kind: LegalKind): string => `/${kind}`;

/**
 * 본문 한 덩이 — h2 하나에 문단 몇, 필요하면 목록.
 *
 * mail을 켜면 그 자리에 문의 메일이 mailto 링크로 들어간다. 주소를 문단에 글자로
 * 적으면 열 언어 문구에 이메일이 40번 흩어지고, 바뀔 때 한 곳이 남는다.
 *
 * ads도 같은 이유다 — 개인 맞춤 광고를 끄는 구글 주소는 애드센스를 쓰는 사이트가
 * 반드시 밝혀야 하는 대목인데, 링크가 하나라도 죽으면 그 언어에서 안내가 끊긴다.
 * 보이는 글자가 주소 자체라 번역할 것도 없다.
 */
export interface LegalSection {
  h2: string;
  body: string[];
  list?: string[];
  mail?: boolean;
  ads?: boolean;
}

export interface LegalCopy {
  /** metadata.title */
  title: string;
  /** metadata.description */
  description: string;
  /** 화면의 <h1> — title과 다를 수 있다(title에는 사이트 이름이 붙는다) */
  h1: string;
  /** h1 바로 아래 한 줄 */
  lead: string;
  sections: LegalSection[];
}

/** 문의 창구. 네 장과 푸터가 이 하나를 본다 */
export const LEGAL_EMAIL = 'jadexqz0@gmail.com';

/**
 * 최근 개정일 — 사이트 전체에 하나뿐인 값.
 *
 * 정책을 실제로 고칠 때만 올린다. 문구를 다듬은 것까지 개정으로 적으면 날짜가
 * 신호를 잃는다(사이트맵의 lastModified를 뺀 것과 같은 이유다).
 */
export const LEGAL_REVISED = '2026-08-12';

/** 개인 맞춤 광고를 끄는 곳 — 애드센스를 쓰는 사이트가 반드시 밝혀야 하는 주소 */
export const ADS_SETTINGS_URL = 'https://www.google.com/settings/ads';

/**
 * 갈래마다 다른 색.
 *
 * 네 장이 한 컴포넌트로 그려지므로, 색이 같으면 눌러서 옮겨 다닐 때 화면이
 * 바뀐 것을 못 느낀다. accent는 PageGlow가 아는 이름이어야 한다
 * (tests/design-consistency.test.ts가 대조한다).
 */
export const LEGAL_LOOK: Record<LegalKind, { accent: 'indigo' | 'emerald' | 'sky' | 'amber'; grad: string }> = {
  about: { accent: 'indigo', grad: 'from-indigo-500 to-violet-600' },
  contact: { accent: 'emerald', grad: 'from-emerald-500 to-teal-600' },
  privacy: { accent: 'sky', grad: 'from-sky-500 to-cyan-600' },
  terms: { accent: 'amber', grad: 'from-amber-500 to-orange-600' },
};

/**
 * 문구가 아닌 화면의 낱말 — 뒤로 가기, 개정일 이름표, 네 장 사이를 옮기는 이름.
 *
 * nav의 이름은 푸터에도 그대로 쓴다. 푸터는 모든 페이지에 있으므로 여기서 길게
 * 적으면 열여덟 개 섹션 칩 옆에서 줄이 넘친다 — 짧은 말로 둔다.
 */
export interface LegalChrome {
  /** 머리글의 "홈" */
  home: string;
  /** 개정일 앞에 붙는 이름표 */
  revised: string;
  /** mailto 링크 위의 한 줄 */
  mailLabel: string;
  /** 네 장의 짧은 이름 — 푸터와 페이지 아래 이동줄이 함께 쓴다 */
  nav: Record<LegalKind, string>;
}

export const LEGAL_CHROME: L<LegalChrome> = {
  ko: {
    home: '홈',
    revised: '최근 개정일',
    mailLabel: '이메일로 보내 주세요',
    nav: { about: '소개', contact: '문의', privacy: '개인정보 처리방침', terms: '이용약관' },
  },
  en: {
    home: 'Home',
    revised: 'Last updated',
    mailLabel: 'Write to us by email',
    nav: { about: 'About', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms of Use' },
  },
  es: {
    home: 'Inicio',
    revised: 'Última actualización',
    mailLabel: 'Escríbenos por correo',
    nav: { about: 'Acerca de', contact: 'Contacto', privacy: 'Política de privacidad', terms: 'Términos de uso' },
  },
  pt: {
    home: 'Início',
    revised: 'Última atualização',
    mailLabel: 'Escreva para nós por e-mail',
    nav: { about: 'Sobre', contact: 'Contato', privacy: 'Política de Privacidade', terms: 'Termos de Uso' },
  },
  ja: {
    home: 'ホーム',
    revised: '最終更新日',
    mailLabel: 'メールでお送りください',
    nav: { about: 'サイト紹介', contact: 'お問い合わせ', privacy: 'プライバシーポリシー', terms: '利用規約' },
  },
  de: {
    home: 'Start',
    revised: 'Zuletzt aktualisiert',
    mailLabel: 'Schreib uns eine E-Mail',
    nav: { about: 'Über uns', contact: 'Kontakt', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
  },
  fr: {
    home: 'Accueil',
    revised: 'Dernière mise à jour',
    mailLabel: 'Écris-nous par e-mail',
    nav: { about: 'À propos', contact: 'Contact', privacy: 'Confidentialité', terms: 'Conditions d’utilisation' },
  },
  hi: {
    home: 'होम',
    revised: 'अंतिम अद्यतन',
    mailLabel: 'ईमेल से लिखें',
    nav: { about: 'परिचय', contact: 'संपर्क', privacy: 'गोपनीयता नीति', terms: 'उपयोग की शर्तें' },
  },
  zh: {
    home: '首页',
    revised: '最近更新',
    mailLabel: '请发邮件给我们',
    nav: { about: '关于本站', contact: '联系我们', privacy: '隐私政策', terms: '使用条款' },
  },
  tw: {
    home: '首頁',
    revised: '最近更新',
    mailLabel: '請寄電子郵件給我們',
    nav: { about: '關於本站', contact: '聯絡我們', privacy: '隱私權政策', terms: '使用條款' },
  },
};
