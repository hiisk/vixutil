/**
 * 정적 출력에서 RSC payload(.txt)를 걷어낸다.
 *
 * Next의 export는 페이지 한 장마다 .txt를 아홉 개씩 남긴다 — 화면 자체(_full·
 * __PAGE__)와 조상 세그먼트마다 하나씩. 링크를 눌렀을 때 전체 페이지를 새로
 * 받지 않고 바뀐 부분만 갈아 끼우기 위한 것이다.
 *
 * 문제는 크기다. 출력 8.9GB 가운데 5.6GB가 이 파일들이고, Vercel은 out/을
 * /vercel/output/static/으로 복사하므로 그 순간 두 벌이 디스크에 올라간다.
 * 17.8GB가 필요해져서 ENOSPC로 빌드가 죽었다. 이건 페이지를 줄이지 않고
 * 잘라낼 수 있는 가장 큰 덩어리다.
 *
 * 지우면 프리페치가 404가 나고 라우터는 전체 페이지 이동으로 물러난다.
 * 헤드리스 크롬으로 두 조건을 나란히 확인했다 — 도착 URL·h1·본문 길이가 모두
 * 같았고 화면이 비거나 멈추는 일은 없었다. 이동이 조금 느려지는 것과 빌드가
 * 아예 안 되는 것 사이의 선택이라, 전자를 골랐다.
 *
 * 되돌리려면 package.json의 build에서 이 줄을 빼면 된다. 페이지 수가 줄거나
 * Vercel 디스크가 커지면 그때 다시 켜도 된다.
 */
import { readdir, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * 치울 자리가 셋이다. 빌드 한 번에 같은 사이트가 세 벌 만들어지기 때문이다.
 *
 *  out/                    — output:'export'가 내보내는 정적 파일
 *  .next/server/app/       — next build가 렌더한 원본(.rsc·.html)
 *  .next/output/static/    — Vercel에서만 생기는 Build Output API 형식의 사본
 *
 * 세 번째는 로컬에 없어서 두 번 헛짚었다. Vercel이 실제로 복사해 가는 것은
 * 이것이고(ENOSPC 로그의 copyfile 원본), 앞의 둘을 아무리 치워도 이게 남아
 * 있으면 디스크는 그대로다. 그래서 셋을 다 돈다.
 */
const TARGETS = [
  { dir: 'out', mode: 'rsc', label: 'out/' },
  { dir: '.next/server/app', mode: 'render', label: '.next/server/app' },
  { dir: '.next/output/static', mode: 'rsc', label: '.next/output/static' },
];

let files = 0;
let bytes = 0;

/**
 * 이 파일을 지울지 가린다. 두 갈래다.
 *  - `__next.*.txt` — 세그먼트별 payload
 *  - `X.txt` 중 같은 자리에 `X.html`이 있는 것 — 그 화면의 payload
 *
 * 두 번째 규칙이 필요한 이유는 Next가 out/country.txt처럼 화면 이름 그대로도
 * 내보내기 때문이다. 확장자만 보고 지우면 robots.txt와 ads.txt까지 날아간다 —
 * 실제 출력에서 짝이 없는 .txt는 그 둘뿐이라, "짝이 있는 것만"이 정확한 경계다.
 *
 * 이 판정만 떼어 둔 것은 tests/drop-rsc-payloads.test.ts가 부르기 위해서다.
 * 잘못 지우면 robots.txt가 사라져 색인이 끊기는데, 그건 빌드가 성공한 뒤에야
 * 드러난다.
 */
export function shouldDrop(name, siblingFiles) {
  if (!name.endsWith('.txt')) return false;
  if (name.startsWith('__next.')) return true;
  return siblingFiles.has(`${name.slice(0, -4)}.html`);
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // out/이 없으면 export가 실패한 것이므로 여기서 조용히 끝낸다
  }
  const names = new Set(entries.filter(e => e.isFile()).map(e => e.name));
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      await walk(p);
      continue;
    }
    if (!shouldDrop(e.name, names)) continue;
    bytes += (await stat(p)).size;
    await unlink(p);
    files++;
  }
}

/**
 * export가 끝나면 .next/server/app은 out/의 복제본이다.
 *
 * 실측: .rsc 320,788개 6.08GB + .html 34,591개 3.95GB = 10.34GB. out/에 이미
 * 같은 것이 나와 있고, Vercel이 복사해 가는 원본은 .next/output/static/이지
 * 여기가 아니다(ENOSPC 로그의 copyfile 원본 경로가 그렇다). 그래서 이 둘은
 * export 이후 아무도 읽지 않는다.
 *
 * .meta·.json·.js와 매니페스트는 남긴다 — 크기가 0.3GB뿐이라 얻는 게 없고,
 * 빌더가 구조를 훑을 여지를 굳이 없앨 이유가 없다.
 */
async function dropBuildLeftovers(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // .next가 없으면(로컬에서 스크립트만 돌릴 때) 조용히 지나간다
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { await dropBuildLeftovers(p); continue; }
    if (!e.name.endsWith('.rsc') && !e.name.endsWith('.html')) continue;
    bytes += (await stat(p)).size;
    await unlink(p);
    files++;
  }
}

// 검사가 shouldDrop만 가져다 쓸 때 파일을 건드리지 않도록, 직접 실행일 때만 돈다
if (import.meta.url === `file://${process.argv[1]}`) {
  const gb = n => (n / 1024 ** 3).toFixed(2);
  let total = 0;
  for (const t of TARGETS) {
    const before = { files, bytes };
    await (t.mode === 'rsc' ? walk(t.dir) : dropBuildLeftovers(t.dir));
    const n = files - before.files;
    const b = bytes - before.bytes;
    total += b;
    // 없는 자리도 0개로 찍는다 — 다음에 또 막혔을 때 어디가 안 치워졌는지 보여야 한다
    console.log(`정리 ${t.label.padEnd(20)} ${n.toLocaleString().padStart(9)}개 · ${gb(b)}GB`);
  }
  console.log(`합계 ${gb(total)}GB 회수`);
}
