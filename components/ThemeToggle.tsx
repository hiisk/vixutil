'use client';
import { useEffect, useState } from 'react';
import type { AnyLocale } from '@/lib/locales';

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
const COPY: Record<AnyLocale, { toLight: string; toDark: string; light: string; dark: string }> = {
  ko: { toLight: '밝은 테마로 전환', toDark: '어두운 테마로 전환', light: '밝게', dark: '어둡게' },
  en: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme', light: 'Light', dark: 'Dark' },
  es: { toLight: 'Cambiar al tema claro', toDark: 'Cambiar al tema oscuro', light: 'Claro', dark: 'Oscuro' },
  'pt-br': { toLight: 'Mudar para o tema claro', toDark: 'Mudar para o tema escuro', light: 'Claro', dark: 'Escuro' },
  ja: { toLight: '明るいテーマに切り替え', toDark: '暗いテーマに切り替え', light: '明るく', dark: '暗く' },
  de: { toLight: 'Zum hellen Thema wechseln', toDark: 'Zum dunklen Thema wechseln', light: 'Hell', dark: 'Dunkel' },
  fr: { toLight: 'Passer au thème clair', toDark: 'Passer au thème sombre', light: 'Clair', dark: 'Sombre' },
  hi: { toLight: 'हल्की थीम पर जाएँ', toDark: 'गहरी थीम पर जाएँ', light: 'हल्की', dark: 'गहरी' },
};

export default function ThemeToggle({ lang = 'ko' }: { lang?: AnyLocale }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 실제 적용된 테마를 DOM에서 읽는다 — 인라인 스크립트가 이미 정해뒀다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMounted(true);
  }, []);

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
