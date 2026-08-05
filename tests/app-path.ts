import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 라우트 경로 → 파일 경로.
 *
 * <html lang>을 언어별로 주려고 app/ 아래를 route group으로 갈랐다
 * (app/(ko)/color, app/(en)/en/color …). 그룹 폴더는 **주소에 안 나타나므로**
 * /color는 그대로지만, 파일 경로는 한 칸 깊어졌다.
 *
 * 검사 스물두 개가 join(ROOT, 'app', 'color', …) 꼴로 파일을 찾고 있었고,
 * 옮긴 뒤 여든아홉 개가 한꺼번에 깨졌다. 검사마다 그룹 이름을 적어 두면 그룹을
 * 하나 더할 때 스물두 곳을 고쳐야 하므로, 여기서 한 번만 풀어 준다.
 */
const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/** 언어 폴더 이름 → 그 폴더를 감싸는 그룹 */
const GROUP_OF = (seg: string): string => `(${seg})`;

export function appJoin(...parts: string[]): string {
  // 'de/altitude'처럼 슬래시가 든 조각이 그대로 들어온다 — 먼저 쪼갠다
  const segs = parts.flatMap(p => p.split('/')).filter(Boolean);
  // 1) app/ 바로 아래 (sitemap.ts·robots.ts·globals.css 같은 것)
  const plain = join(APP, ...segs);
  if (existsSync(plain)) return plain;

  // 2) 언어 폴더면 그 언어의 그룹 안 — app/(en)/en/…
  if (segs.length > 0) {
    const inLangGroup = join(APP, GROUP_OF(segs[0]), ...segs);
    if (existsSync(inLangGroup)) return inLangGroup;
  }

  // 3) 나머지는 한국어 그룹 안 — app/(ko)/color/…
  const inKo = join(APP, '(ko)', ...segs);
  if (existsSync(inKo)) return inKo;

  /*
   * 어디에도 없으면 (ko) 경로를 돌려준다. 부르는 쪽이 existsSync로 "없음"을
   * 확인하는 검사가 많아서, 여기서 던지면 그 검사들이 의도와 다르게 죽는다.
   */
  return inKo;
}

/**
 * 'app/en/country/page.tsx' 같은 문자열 경로를 풀어 준다.
 *
 * 검사 여럿이 라우트를 문자열로 적어 두고 existsSync에 그대로 넘긴다.
 * 앞의 'app/'만 떼고 appJoin에 넘기면 그룹이 끼어든 자리를 알아서 찾는다.
 */
export function appFile(path: string): string {
  const rel = path.replace(/^\.?\/?app\//, '');
  return appJoin(...rel.split('/'));
}

/** app/ 아래 모든 그룹의 뿌리 — 라우트를 훑는 검사가 쓴다 */
export const APP_ROOTS: string[] = ['(ko)', '(en)', '(es)', '(pt-br)', '(ja)', '(de)', '(fr)', '(hi)', '(zh-hans)', '(zh-hant)']
  .map(g => join(APP, g))
  .filter(existsSync);

/**
 * app/ 바로 아래의 라우트 이름들 — 그룹 폴더를 걷어낸 결과.
 *
 * readdirSync(app)을 그대로 쓰면 (ko)·(en) 같은 그룹이 섹션으로 잡힌다.
 * 그룹은 주소에 없으므로 한 겹 들어가서 모으고, 언어 폴더도 그대로 낸다.
 */
export function appEntries(): { name: string; dir: string; isDirectory: () => boolean }[] {
  const out: { name: string; dir: string; isDirectory: () => boolean }[] = [];
  const seen = new Set<string>();
  const push = (base: string, name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    const dir = join(base, name);
    const isDir = statSync(dir).isDirectory();
    out.push({ name, dir, isDirectory: () => isDir });
  };
  for (const e of readdirSync(APP, { withFileTypes: true })) {
    if (e.isDirectory() && e.name.startsWith('(')) {
      for (const inner of readdirSync(join(APP, e.name), { withFileTypes: true })) {
        if (inner.name === 'layout.tsx') continue; // 그룹의 루트 레이아웃은 라우트가 아니다
        push(join(APP, e.name), inner.name);
      }
    } else push(APP, e.name);
  }
  return out;
}

/** app/ 기준 상대 경로에서 route group 폴더를 걷어낸다 — 주소에는 안 나타난다 */
export function stripGroups(rel: string): string {
  return rel.split('/').filter(x => !(x.startsWith('(') && x.endsWith(')'))).join('/');
}

export { APP as APP_DIR };
