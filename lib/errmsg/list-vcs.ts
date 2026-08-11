/**
 * git과 npm이 찍는 오류 문구 49가지 — 문구와 도구, 고치는 명령 한 줄만 적는다.
 *
 * 오류 문구는 프로그램이 만든 문자열이라 나라를 가리지 않는다. fatal: refusing
 * to merge unrelated histories는 어느 나라에서든 그 문자열이고, 사람은 그것을
 * 그대로 복사해 검색창에 넣는다. 그래서 여기에는 옮길 것이 없는 것만 둔다 —
 * 뜻과 원인과 대처를 담은 열 언어 세 문장은 desc-vcs.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 도구가 실제로 찍는 문구를 그대로 적는다. fatal:이나 npm ERR!처럼 도구가 붙이는
 * 앞머리는 살리고, 그 앞뒤의 hint: 줄과 스택은 뺀다 — 사람이 붙여 넣는 한 줄만
 * 남긴다. 문구를 확인하지 못한 것과 고치는 방법을 확인하지 못한 것은 싣지 않는다.
 * 여기서는 틀린 대처 한 줄이 읽는 사람의 작업을 지운다.
 *
 * 경로·브랜치·패키지 이름처럼 사람마다 다른 자리는 흔한 보기를 그대로 박아 둔다.
 * 자리표(<path>)로 두면 검색해 온 문구와 눈으로 맞춰 볼 수가 없다.
 *
 * 갈래는 둘이다 — git(버전 관리)·npm(설치와 빌드). 어느 도구가 찍었는지는
 * tool에 따로 적는다. node나 husky, node-gyp가 찍는 것도 사람이 만나는 자리가
 * git·npm이라 여기에 함께 둔다.
 */
import type { ErrItem, ErrCategory } from './types.ts';

/** 순서는 화면에 적는 순서와 같다 — 문구, 갈래, 도구, 고치는 한 줄 */
const e = (
  slug: string,
  message: string,
  category: ErrCategory,
  tool: string,
  fix: string,
  see?: string[],
): ErrItem => ({
  slug,
  message,
  category,
  tool,
  fix,
  ...(see ? { see } : {}),
});

export const ERR_VCS: ErrItem[] = [
  /* ───────── git — 합치기와 되돌리기 ───────── */
  e(
    'refusing-to-merge-unrelated-histories',
    'fatal: refusing to merge unrelated histories',
    'git',
    'git',
    'git pull origin main --allow-unrelated-histories',
    ['updates-were-rejected', 'merge-conflict-in-file', 'not-a-git-repository'],
  ),

  e(
    'branch-and-origin-diverged',
    "Your branch and 'origin/main' have diverged",
    'git',
    'git',
    'git pull --rebase origin main',
    ['need-to-specify-how-to-reconcile', 'rejected-non-fast-forward', 'failed-to-push-some-refs'],
  ),

  e(
    'need-to-specify-how-to-reconcile',
    'fatal: Need to specify how to reconcile divergent branches.',
    'git',
    'git',
    'git config pull.ff only',
    ['branch-and-origin-diverged', 'rejected-fetch-first'],
  ),

  e(
    'merge-conflict-in-file',
    'CONFLICT (content): Merge conflict in src/app.tsx',
    'git',
    'git',
    'git merge --abort',
    ['commit-your-changes-or-stash', 'currently-rebasing-branch', 'refusing-to-merge-unrelated-histories'],
  ),

  e(
    'commit-your-changes-or-stash',
    'Please commit your changes or stash them before you merge.',
    'git',
    'git',
    'git stash push -u',
    ['local-changes-overwritten-by-checkout', 'merge-conflict-in-file'],
  ),

  e(
    'local-changes-overwritten-by-checkout',
    'error: Your local changes to the following files would be overwritten by checkout:',
    'git',
    'git',
    'git stash push -u',
    ['commit-your-changes-or-stash', 'unable-to-unlink-old-file'],
  ),

  e(
    'currently-rebasing-branch',
    "You are currently rebasing branch 'feature' on '8a3f21c'.",
    'git',
    'git',
    'git rebase --abort',
    ['merge-conflict-in-file', 'index-lock-file-exists', 'detached-head'],
  ),

  e(
    'detached-head',
    "You are in 'detached HEAD' state.",
    'git',
    'git',
    'git switch -c rescue',
    ['leaving-commits-behind', 'currently-rebasing-branch'],
  ),

  e(
    'leaving-commits-behind',
    'Warning: you are leaving 1 commit behind, not connected to any of your branches:',
    'git',
    'git',
    'git branch rescue 8a3f21c',
    ['detached-head', 'bad-object'],
  ),

  /* ───────── git — 보내기와 받기 ───────── */
  e(
    'failed-to-push-some-refs',
    "error: failed to push some refs to 'https://github.com/user/repo.git'",
    'git',
    'git',
    'git pull --rebase && git push',
    ['rejected-fetch-first', 'rejected-non-fast-forward', 'updates-were-rejected'],
  ),

  e(
    'rejected-fetch-first',
    '! [rejected]        main -> main (fetch first)',
    'git',
    'git',
    'git pull --rebase origin main',
    ['failed-to-push-some-refs', 'rejected-non-fast-forward', 'updates-were-rejected'],
  ),

  e(
    'rejected-non-fast-forward',
    '! [rejected]        main -> main (non-fast-forward)',
    'git',
    'git',
    'git push --force-with-lease',
    ['rejected-fetch-first', 'branch-and-origin-diverged'],
  ),

  e(
    'updates-were-rejected',
    'Updates were rejected because the remote contains work that you do not have locally.',
    'git',
    'git',
    'git pull --rebase origin main',
    ['rejected-fetch-first', 'failed-to-push-some-refs'],
  ),

  e(
    'src-refspec-does-not-match-any',
    'error: src refspec main does not match any',
    'git',
    'git',
    'git push -u origin HEAD',
    ['no-upstream-branch', 'nothing-to-commit-working-tree-clean'],
  ),

  e(
    'no-upstream-branch',
    'fatal: The current branch feature has no upstream branch.',
    'git',
    'git',
    'git push --set-upstream origin feature',
    ['src-refspec-does-not-match-any', 'failed-to-push-some-refs'],
  ),

  e(
    'cannot-lock-ref',
    "error: cannot lock ref 'refs/remotes/origin/main': is at 8a3f21c but expected 1c2d3e4",
    'git',
    'git',
    'git remote prune origin',
    ['index-lock-file-exists', 'bad-object'],
  ),

  /* ───────── git — 자리와 인증 ───────── */
  e(
    'not-a-git-repository',
    'fatal: not a git repository (or any of the parent directories): .git',
    'git',
    'git',
    'git init',
    ['remote-origin-already-exists', 'pathspec-did-not-match'],
  ),

  e(
    'remote-origin-already-exists',
    'fatal: remote origin already exists.',
    'git',
    'git',
    'git remote set-url origin git@github.com:user/repo.git',
    ['not-a-git-repository', 'no-upstream-branch'],
  ),

  e(
    'pathspec-did-not-match',
    "error: pathspec 'featue' did not match any file(s) known to git",
    'git',
    'git',
    '',
    ['not-a-git-repository', 'nothing-to-commit-working-tree-clean'],
  ),

  e(
    'permission-denied-publickey',
    'git@github.com: Permission denied (publickey).',
    'git',
    'ssh',
    'ssh-add ~/.ssh/id_ed25519',
    ['authentication-failed', 'password-authentication-removed'],
  ),

  e(
    'password-authentication-removed',
    'remote: Support for password authentication was removed on August 13, 2021.',
    'git',
    'github',
    'git remote set-url origin git@github.com:user/repo.git',
    ['authentication-failed', 'permission-denied-publickey'],
  ),

  e(
    'authentication-failed',
    "fatal: Authentication failed for 'https://github.com/user/repo.git/'",
    'git',
    'git',
    "printf 'protocol=https\\nhost=github.com\\n\\n' | git credential reject",
    ['password-authentication-removed', 'permission-denied-publickey'],
  ),

  /* ───────── git — 파일과 색인 ───────── */
  e(
    'index-lock-file-exists',
    "fatal: Unable to create '/repo/.git/index.lock': File exists.",
    'git',
    'git',
    'rm -f .git/index.lock',
    ['cannot-lock-ref', 'currently-rebasing-branch'],
  ),

  e(
    'nothing-to-commit-working-tree-clean',
    'nothing to commit, working tree clean',
    'git',
    'git',
    'git check-ignore -v path/to/file',
    ['pathspec-did-not-match', 'src-refspec-does-not-match-any'],
  ),

  e(
    'unable-to-unlink-old-file',
    "error: unable to unlink old 'dist/main.js': Permission denied",
    'git',
    'git',
    '',
    ['local-changes-overwritten-by-checkout', 'index-lock-file-exists'],
  ),

  e(
    'bad-object',
    'fatal: bad object 8a3f21c',
    'git',
    'git',
    'git fsck --full',
    ['cannot-lock-ref', 'leaving-commits-behind'],
  ),

  e(
    'lf-will-be-replaced-by-crlf',
    'warning: LF will be replaced by CRLF in package.json.',
    'git',
    'git',
    'git config core.autocrlf input',
    ['original-line-endings'],
  ),

  e(
    'original-line-endings',
    'The file will have its original line endings in your working directory',
    'git',
    'git',
    '',
    ['lf-will-be-replaced-by-crlf'],
  ),

  e(
    'pre-commit-hook-failed',
    'husky - pre-commit hook exited with code 1 (error)',
    'git',
    'husky',
    'git commit --no-verify',
    ['nothing-to-commit-working-tree-clean', 'elifecycle'],
  ),

  /* ───────── npm — 의존성 나무 ───────── */
  e(
    'eresolve-unable-to-resolve-dependency-tree',
    'npm ERR! ERESOLVE unable to resolve dependency tree',
    'npm',
    'npm',
    'npm install --legacy-peer-deps',
    ['conflicting-peer-dependency', 'requires-a-peer-of', 'lock-file-out-of-sync'],
  ),

  e(
    'conflicting-peer-dependency',
    'npm ERR! Conflicting peer dependency: react@18.3.1',
    'npm',
    'npm',
    'npm ls react',
    ['eresolve-unable-to-resolve-dependency-tree', 'requires-a-peer-of'],
  ),

  e(
    'requires-a-peer-of',
    'npm WARN react-dom@17.0.2 requires a peer of react@17.0.2 but none is installed.',
    'npm',
    'npm 6',
    '',
    ['eresolve-unable-to-resolve-dependency-tree', 'conflicting-peer-dependency'],
  ),

  e(
    'npm-warn-deprecated',
    'npm WARN deprecated request@2.88.2: request has been deprecated',
    'npm',
    'npm',
    'npm ls request',
    ['ebadengine-unsupported-engine', 'requires-a-peer-of'],
  ),

  e(
    'lock-file-out-of-sync',
    'npm ERR! npm ci can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync.',
    'npm',
    'npm',
    'npm install',
    ['npm-ci-needs-lockfile', 'eresolve-unable-to-resolve-dependency-tree'],
  ),

  e(
    'npm-ci-needs-lockfile',
    'npm ERR! The `npm ci` command can only install with an existing package-lock.json or npm-shrinkwrap.json',
    'npm',
    'npm',
    'npm install --package-lock-only',
    ['lock-file-out-of-sync', 'enoent-open-package-json'],
  ),

  e(
    'invalid-version',
    'npm ERR! Invalid Version:',
    'npm',
    'npm',
    'npm pkg set version=1.0.0',
    ['enoent-open-package-json', 'lock-file-out-of-sync'],
  ),

  /* ───────── npm — 가져오기와 권한 ───────── */
  e(
    'not-found-404-get',
    'npm ERR! 404 Not Found - GET https://registry.npmjs.org/@acme/ui - Not found',
    'npm',
    'npm',
    'npm view @acme/ui version',
    ['unable-to-verify-the-first-certificate', 'eintegrity-checksum-failed'],
  ),

  e(
    'unable-to-verify-the-first-certificate',
    'npm ERR! request to https://registry.npmjs.org/express failed, reason: unable to verify the first certificate',
    'npm',
    'npm',
    'npm config set cafile /etc/ssl/corp-ca.pem',
    ['not-found-404-get', 'eintegrity-checksum-failed'],
  ),

  e(
    'eintegrity-checksum-failed',
    'npm ERR! code EINTEGRITY',
    'npm',
    'npm',
    'npm cache clean --force',
    ['unable-to-verify-the-first-certificate', 'lock-file-out-of-sync'],
  ),

  e(
    'eacces-permission-denied',
    "npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'",
    'npm',
    'npm',
    'npm config set prefix ~/.npm-global',
    ['command-not-found-after-global-install', 'gyp-err-build-error'],
  ),

  e(
    'enoent-open-package-json',
    "npm ERR! enoent ENOENT: no such file or directory, open '/home/me/package.json'",
    'npm',
    'npm',
    'npm init -y',
    ['npm-ci-needs-lockfile', 'invalid-version'],
  ),

  /* ───────── npm — 실행과 빌드 ───────── */
  e(
    'elifecycle',
    'npm ERR! code ELIFECYCLE',
    'npm',
    'npm',
    '',
    ['pre-commit-hook-failed', 'gyp-err-build-error', 'javascript-heap-out-of-memory'],
  ),

  e(
    'gyp-err-build-error',
    'gyp ERR! build error',
    'npm',
    'node-gyp',
    '',
    ['eacces-permission-denied', 'elifecycle'],
  ),

  e(
    'cannot-find-module',
    "Error: Cannot find module 'express'",
    'npm',
    'node',
    'rm -rf node_modules && npm install',
    ['module-not-found-cant-resolve', 'command-not-found-after-global-install'],
  ),

  e(
    'module-not-found-cant-resolve',
    "Module not found: Error: Can't resolve './components/Button' in '/app/src'",
    'npm',
    'webpack',
    '',
    ['cannot-find-module', 'elifecycle'],
  ),

  e(
    'err-ossl-evp-unsupported',
    'Error: error:0308010C:digital envelope routines::unsupported',
    'npm',
    'node 17+',
    'export NODE_OPTIONS=--openssl-legacy-provider',
    ['ebadengine-unsupported-engine', 'javascript-heap-out-of-memory'],
  ),

  e(
    'javascript-heap-out-of-memory',
    'FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory',
    'npm',
    'node',
    'export NODE_OPTIONS=--max-old-space-size=4096',
    ['elifecycle', 'err-ossl-evp-unsupported'],
  ),

  e(
    'ebadengine-unsupported-engine',
    'npm WARN EBADENGINE Unsupported engine',
    'npm',
    'npm',
    '',
    ['err-ossl-evp-unsupported', 'npm-warn-deprecated'],
  ),

  e(
    'command-not-found-after-global-install',
    'zsh: command not found: tsc',
    'npm',
    'shell',
    'npx tsc --version',
    ['eacces-permission-denied', 'cannot-find-module'],
  ),
];
