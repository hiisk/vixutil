'use client';
import { useEffect, useState } from 'react';
import type { AnyLocale10 } from '@/lib/locales';
import { langOfLocale } from '@/lib/i18n/lang';
import { SHARE_UI } from '@/lib/share/ui';

type Theme = 'light' | 'dark';

/**
 * 다크모드 토글.
 *
 * 기본은 라이트다(시스템 설정을 따르지 않는다 — layout.tsx의 THEME_INIT 참고).
 * 사용자가 켜면 그 선택을 localStorage에 남겨 다음 방문에도 유지한다.
 *
 * 첫 페인트 전에 클래스를 붙이는 일은 layout.tsx의 인라인 스크립트가 한다.
 * 여기서 하면 흰 화면이 한 번 번쩍인다.
 */
/**
 * 테마 전환 버튼의 문구.
 *
 * 한때 `lang === 'en' ? … : false ? … : …` 꼴이었다. 중국어를 걷어낼 때 분기만
 * false로 바꿔 둔 자리다 — 타입 검사와 빌드를 통과하고 화면에도 영향이 없어서
 * 남아 있었다. 표로 두면 언어를 늘릴 때 빠뜨린 곳이 타입 오류로 드러난다.
 */
const COPY: Record<AnyLocale10, { toLight: string; toDark: string; light: string; dark: string }> = {
  ko: { toLight: '밝은 테마로 전환', toDark: '어두운 테마로 전환', light: '밝게', dark: '어둡게' },
  en: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme', light: 'Light', dark: 'Dark' },
  es: { toLight: 'Cambiar al tema claro', toDark: 'Cambiar al tema oscuro', light: 'Claro', dark: 'Oscuro' },
  'pt-br': { toLight: 'Mudar para o tema claro', toDark: 'Mudar para o tema escuro', light: 'Claro', dark: 'Escuro' },
  ja: { toLight: '明るいテーマに切り替え', toDark: '暗いテーマに切り替え', light: '明るく', dark: '暗く' },
  de: { toLight: 'Zum hellen Thema wechseln', toDark: 'Zum dunklen Thema wechseln', light: 'Hell', dark: 'Dunkel' },
  fr: { toLight: 'Passer au thème clair', toDark: 'Passer au thème sombre', light: 'Clair', dark: 'Sombre' },
  hi: { toLight: 'हल्की थीम पर जाएँ', toDark: 'गहरी थीम पर जाएँ', light: 'हल्की', dark: 'गहरी' },
  'zh-hans': { toLight: '切换到浅色主题', toDark: '切换到深色主题', light: '浅色', dark: '深色' },
  'zh-hant': { toLight: '切換到淺色主題', toDark: '切換到深色主題', light: '淺色', dark: '深色' },
};

export default function ThemeToggle({ lang = 'ko' }: { lang?: AnyLocale10 }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 실제 적용된 테마를 DOM에서 읽는다 — 인라인 스크립트가 이미 정해뒀다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMounted(true);
  }, []);

  /*
   * ── 값 복사가 왜 이 파일에 있나 ────────────────────────────
   * `.cv`가 붙은 값(색 코드·답 숫자)을 누르면 클립보드로 간다. 까닭과 바이트
   * 계산은 app/globals.css의 「값 복사」 주석에 적었다.
   *
   * 리스너를 담을 컴포넌트를 새로 만들면 그리는 것이 없어도 **클라이언트 참조가
   * 낱장 28만 장의 RSC 짐에 실린다**. ThemeToggle은 SiteFooter를 타고 이미 모든
   * 장에 떠 있는 유일한 클라이언트 컴포넌트다 — 여기 얹으면 늘어나는 바이트가 0이다.
   * 테마와는 상관없는 코드라서 남의 집이지만, 그 값이 이 어색함보다 크다.
   */
  useEffect(() => {
    const hit = (t: EventTarget | null) =>
      t instanceof Element ? t.closest<HTMLElement>('.cv') : null;

    /* 읽어 줄 자리 — 화면에는 ✓만 뜨고 소리로는 아무것도 안 났다.
       문구는 SHARE_UI.calcCopied("복사됨")를 그대로 쓴다 — 열 언어가 이미 있다. */
    const live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
    document.body.appendChild(live);

    const copy = (el: HTMLElement) => {
      /* data-cv가 있으면 그것을, 없으면 보이는 글자를 그대로 복사한다 */
      const text = (el.dataset.cv ?? el.textContent ?? '').trim();
      if (!text) return;
      navigator.clipboard?.writeText(text).then(() => {
        live.textContent = '';
        live.textContent = SHARE_UI[langOfLocale(lang)].calcCopied;
      }, () => {});
      el.classList.add('cv-ok');
      window.setTimeout(() => el.classList.remove('cv-ok'), 1400);
    };

    const onClick = (e: MouseEvent) => {
      const el = hit(e.target);
      if (el) copy(el);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = hit(e.target);
      if (!el) return;
      e.preventDefault();
      copy(el);
    };

    /* 키보드로 닿게 한다. 마크업에 tabindex·role을 적으면 낱장마다 바이트가 늘어서
       붙은 뒤에 단다. `.cv`는 한 장에 많아야 열 몇 개라 탭 순서가 길어지지 않는다 —
       표의 값 칸(.val, 한 장에 예순 개 넘음)에 안 붙인 까닭이 이것이다. */
    for (const el of document.querySelectorAll<HTMLElement>('.cv')) {
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
    }

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      live.remove();
    };
  }, [lang]);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* 사파리 프라이빗 모드 등에서 막힐 수 있다 — 토글 자체는 계속 동작해야 한다 */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? COPY[lang].toLight : COPY[lang].toDark}
      className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:border-blue-300 hover:text-blue-600 transition-colors"
    >
      {/* 마운트 전에는 아이콘을 고정해 하이드레이션 불일치를 피한다 */}
      <span aria-hidden>{mounted && theme === 'dark' ? '☀️' : '🌙'}</span>
      {mounted && theme === 'dark' ? COPY[lang].light : COPY[lang].dark}
    </button>
  );
}
