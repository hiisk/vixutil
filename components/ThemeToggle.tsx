'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * 다크모드 토글.
 *
 * 시스템 설정(prefers-color-scheme)을 기본값으로 쓰되, 사용자가 고르면 그 선택을
 * localStorage에 남겨 우선한다. 시스템만 따르면 사용자가 끌 수 없다.
 *
 * 첫 페인트 전에 클래스를 붙이는 일은 layout.tsx의 인라인 스크립트가 한다.
 * 여기서 하면 흰 화면이 한 번 번쩍인다.
 */
export default function ThemeToggle() {
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
      aria-label={theme === 'dark' ? '밝은 테마로 전환' : '어두운 테마로 전환'}
      className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:border-blue-300 hover:text-blue-600 transition-colors"
    >
      {/* 마운트 전에는 아이콘을 고정해 하이드레이션 불일치를 피한다 */}
      <span aria-hidden>{mounted && theme === 'dark' ? '☀️' : '🌙'}</span>
      {mounted && theme === 'dark' ? '밝게' : '어둡게'}
    </button>
  );
}
