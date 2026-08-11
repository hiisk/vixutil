/**
 * git 45가지와 패키지·런타임 25가지 — 명령 이름과 옵션만 적는다.
 *
 * 명령 이름은 프로그램이 정한 것이라 언어를 가리지 않는다. git reset은 어느
 * 나라에서든 git reset이고 --hard는 --hard다. 옵션 글자와 예시 줄도 그대로
 * 치는 것이라 옮기지 않는다. 열 언어로 쓸 것은 desc-dev.ts의 설명 한 줄뿐이다.
 *
 * 갈래는 두 가지만 여기서 다룬다 — 'git'과 'pkg'.
 */
import type { CmdItem } from './types.ts';

type Pair = [string, string];
const fl = (p: Pair[]) => p.map(([flag, en]) => ({ flag, en }));
const ex = (p: Pair[]) => p.map(([cmd, en]) => ({ cmd, en }));

/** git 하위 명령 — 열쇠는 'git-<sub>', 이름은 'git <sub>'. 옵션이 이름에 붙는 것만 slug를 따로 준다. */
const g = (sub: string, usage: string, flags: Pair[], examples: Pair[], see: string[], slug?: string): CmdItem => ({
  slug: slug ?? `git-${sub.replace(/ /g, '-')}`,
  name: `git ${sub}`,
  category: 'git',
  usage,
  flags: fl(flags),
  examples: ex(examples),
  see,
});

/** 패키지·런타임 — 이름과 열쇠가 규칙으로 이어지지 않아 둘 다 적는다 */
const p = (slug: string, name: string, usage: string, flags: Pair[], examples: Pair[], see: string[]): CmdItem => ({
  slug,
  name,
  category: 'pkg',
  usage,
  flags: fl(flags),
  examples: ex(examples),
  see,
});

export const CMD_DEV: CmdItem[] = [
  /* ───────── git — 만들고 가져오기 ───────── */
  g('init', 'git init [-b <branch>] [<directory>]',
    [
      ['-b <name>', 'name the first branch, e.g. main'],
      ['--bare', 'repository with no working tree, for a server'],
      ['--template=<dir>', 'copy hooks and files from a template directory'],
      ['--separate-git-dir=<dir>', 'keep the .git directory somewhere else'],
      ['-q', 'print nothing but errors'],
    ],
    [
      ['git init', 'turns the current folder into a repository by creating .git'],
      ['git init -b main my-app', 'creates my-app/ with its first branch named main'],
      ['git init --separate-git-dir=~/gitdirs/app.git', 'keeps the .git directory elsewhere and leaves a pointer file'],
    ],
    ['git-clone', 'git-init-bare', 'git-config', 'git-add']),

  g('clone', 'git clone [--depth <n>] [-b <branch>] <url> [<directory>]',
    [
      ['--depth <n>', 'shallow copy with only the last n commits'],
      ['-b <branch>', 'check out that branch instead of the default'],
      ['--single-branch', 'fetch one branch only'],
      ['--recurse-submodules', 'clone submodules at the same time'],
      ['--filter=blob:none', 'partial clone: fetch file contents on demand'],
      ['-o <name>', 'call the remote something other than origin'],
    ],
    [
      ['git clone https://github.com/user/repo.git', 'copies the repository into repo/ and names the remote origin'],
      ['git clone --depth 1 https://github.com/user/repo.git', 'fast copy for CI with no old history'],
      ['git clone -b dev --single-branch <url>', 'checks out dev and fetches nothing else'],
    ],
    ['git-init', 'git-remote', 'git-fetch', 'git-submodule']),

  g('config', 'git config [--global] <key> [<value>]',
    [
      ['--global', 'write to ~/.gitconfig for every repository'],
      ['--local', 'write to .git/config, the default'],
      ['--list --show-origin', 'print every setting and the file it came from'],
      ['--get <key>', 'print one value'],
      ['--unset <key>', 'delete one setting'],
      ['-e', 'open the config file in your editor'],
    ],
    [
      ['git config --global user.email "me@example.com"', 'sets the address every future commit is signed with'],
      ['git config --global init.defaultBranch main', 'new repositories start on main instead of master'],
      ['git config --list --show-origin', 'shows which file each setting comes from'],
    ],
    ['git-init', 'git-clone', 'git-remote']),

  g('init --bare', 'git init --bare [--shared=group] <directory>.git',
    [
      ['--bare', 'no working tree; only the contents of .git'],
      ['--shared=group', 'let one unix group push into it'],
      ['-b <name>', 'name the first branch'],
      ['--template=<dir>', 'seed it with hooks from a template directory'],
    ],
    [
      ['git init --bare /srv/git/app.git', 'creates a repository to push into over ssh'],
      ['git init --bare --shared=group team.git', 'a shared repository a unix group can all write to'],
      ['git init --bare ~/backup/app.git', 'a push target on a backup disk'],
    ],
    ['git-init', 'git-clone', 'git-push', 'git-remote'],
    'git-init-bare'),

  /* ───────── git — 담고 커밋하기 ───────── */
  g('add', 'git add [-A|-u|-p] <pathspec>...',
    [
      ['-A', 'stage every change in the whole tree, deletions included'],
      ['-u', 'stage changes to tracked files only, no new files'],
      ['-p', 'walk the diff and choose hunk by hunk'],
      ['-n', 'dry run: list what would be staged'],
      ['-f', 'stage a file that .gitignore excludes'],
      ['-N', 'record the path only, so the file shows up in diffs'],
    ],
    [
      ['git add -A', 'stages everything, including files you deleted'],
      ['git add -p src/app.ts', 'stages part of one file and leaves the rest'],
      ['git add .', 'stages everything under the current directory'],
    ],
    ['git-status', 'git-commit', 'git-restore', 'git-rm']),

  g('commit', 'git commit [-a] -m "<message>"',
    [
      ['-m "<msg>"', 'give the message on the command line'],
      ['-a', 'stage modified tracked files first; new files are skipped'],
      ['--amend', 'replace the previous commit instead of adding one'],
      ['--no-edit', 'keep the old message, used with --amend'],
      ['--fixup=<commit>', 'mark it to be folded into <commit> by rebase --autosquash'],
      ['-S', 'sign the commit with GPG'],
      ['--allow-empty', 'commit with nothing staged'],
    ],
    [
      ['git commit -m "fix login redirect"', 'records what is staged'],
      ['git commit -a -m "typo"', 'stages tracked edits and commits in one step'],
      ['git commit --amend --no-edit', 'folds the staged change into the last commit, keeping its message'],
    ],
    ['git-add', 'git-status', 'git-push', 'git-reset', 'git-revert']),

  g('status', 'git status [-sb] [-uall]',
    [
      ['-s', 'short two-column format'],
      ['-b', 'show the branch line, used as -sb'],
      ['-uall', 'list untracked files one by one instead of folding folders'],
      ['--ignored', 'also list what .gitignore hides'],
      ['-v', 'append the staged diff'],
      ['--porcelain', 'stable machine format for scripts'],
    ],
    [
      ['git status -sb', 'one line per change plus the branch and its upstream'],
      ['git status -uall', 'names every untracked file inside new folders'],
      ['git status --porcelain', 'output a script can parse without surprises'],
    ],
    ['git-add', 'git-diff', 'git-restore', 'git-clean']),

  g('diff', 'git diff [--staged] [<commit>] [-- <path>]',
    [
      ['--staged', 'compare the staged snapshot with HEAD (same as --cached)'],
      ['--stat', 'summary of files and line counts instead of the patch'],
      ['-w', 'ignore whitespace changes'],
      ['--name-only', 'list changed paths only'],
      ['<a>...<b>', 'changes on b since it forked from a'],
      ['-- <path>', 'restrict to a path; the -- keeps it from being read as a branch'],
    ],
    [
      ['git diff', 'shows only what is NOT staged yet'],
      ['git diff --staged', 'shows what git commit would record'],
      ['git diff main...feature', 'the work feature added since it left main'],
    ],
    ['git-status', 'git-show', 'git-add', 'diff']),

  g('log', 'git log [--oneline] [--graph] [<range>] [-- <path>]',
    [
      ['--oneline', 'one short line per commit'],
      ['--graph', 'draw the branch lines'],
      ['--all', 'include every branch, not just the current one'],
      ['-p', 'show the patch of each commit'],
      ['--stat', 'show which files changed'],
      ['-n <n>', 'stop after n commits'],
      ['--since=<date>', 'commits newer than a date, e.g. "2 weeks ago"'],
      ['--follow', 'keep following one file through renames'],
    ],
    [
      ['git log --oneline --graph --all', 'the whole history as a compact graph'],
      ['git log -p -- src/app.ts', 'every change ever made to one file'],
      ['git log --since="2 weeks ago" --author=jade', 'recent commits by one person'],
    ],
    ['git-show', 'git-diff', 'git-blame', 'git-shortlog', 'git-reflog']),

  g('show', 'git show [<object>|<commit>:<path>]',
    [
      ['--stat', 'file summary instead of the full patch'],
      ['--name-only', 'list the paths the commit touched'],
      ['-s', 'message only, no diff'],
      ['<commit>:<path>', 'print the file as it was in that commit'],
      ['--pretty=fuller', 'show author and committer dates separately'],
    ],
    [
      ['git show HEAD', 'the message and diff of the last commit'],
      ['git show HEAD~2:src/app.ts', 'prints an old version of a file without touching your copy'],
      ['git show --stat v1.2.0', 'what the tagged commit changed, file by file'],
    ],
    ['git-log', 'git-diff', 'git-blame']),

  g('blame', 'git blame [-L <start>,<end>] <file>',
    [
      ['-L <a>,<b>', 'only those lines'],
      ['-w', 'ignore whitespace, so re-indenting stops hiding the author'],
      ['-C', 'follow code moved in from another file'],
      ['--ignore-rev <rev>', 'skip a commit, e.g. a bulk reformat'],
      ['-e', 'show email addresses instead of names'],
      ['-s', 'drop the author and date columns'],
    ],
    [
      ['git blame -L 40,60 src/app.ts', 'who last touched lines 40 to 60'],
      ['git blame -w -C src/app.ts', 'looks past whitespace and moved code'],
      ['git blame --ignore-rev 9f3c2ab src/app.ts', 'ignores the commit that reformatted everything'],
    ],
    ['git-log', 'git-show', 'git-diff']),

  /* ───────── git — 브랜치 ───────── */
  g('branch', 'git branch [-a|-vv] [-d <name>]',
    [
      ['-a', 'local and remote-tracking branches'],
      ['-r', 'remote-tracking branches only'],
      ['-vv', 'last commit and upstream of each branch'],
      ['-d <name>', 'delete a branch that is already merged'],
      ['-D <name>', 'delete it even if unmerged; those commits are left behind'],
      ['-m <old> <new>', 'rename'],
      ['--merged', 'branches already contained in the current one'],
      ['--show-current', 'print the branch you are on'],
    ],
    [
      ['git branch -vv', 'every local branch with its upstream and last commit'],
      ['git branch -d old-feature', 'removes a merged branch locally only'],
      ['git push origin --delete old-feature', 'the separate step that removes it on the server'],
    ],
    ['git-switch', 'git-checkout', 'git-merge', 'git-push']),

  g('checkout', 'git checkout <branch> | git checkout -b <new> | git checkout -- <file>',
    [
      ['-b <new>', 'create the branch and switch to it'],
      ['-B <new>', 'create or reset it to the current commit'],
      ['-- <file>', 'overwrite the file with the staged version, losing your edits'],
      ['--track <remote>/<branch>', 'start a local branch that follows a remote one'],
      ['--detach', 'sit on a commit with no branch attached'],
      ['-f', 'throw away local changes to switch anyway'],
    ],
    [
      ['git checkout -b feature/login', 'branches off the current commit and moves there'],
      ['git checkout main', 'switches branch, same as git switch main'],
      ['git checkout -- src/app.ts', 'discards uncommitted edits to that file; they are gone'],
    ],
    ['git-switch', 'git-restore', 'git-branch', 'git-reset']),

  g('switch', 'git switch [-c <new>] <branch>',
    [
      ['-c <new>', 'create the branch and switch to it'],
      ['-C <new>', 'create it, or reset it here if it exists'],
      ['-', 'go back to the branch you were on before'],
      ['--detach <commit>', 'check out a commit without a branch'],
      ['--track <remote>/<branch>', 'follow a remote branch'],
      ['-m', 'carry uncommitted changes across by merging them'],
    ],
    [
      ['git switch main', 'moves to main; refuses if that would clobber your edits'],
      ['git switch -c feature/api', 'creates the branch and moves there'],
      ['git switch -', 'jumps back to the previous branch'],
    ],
    ['git-checkout', 'git-restore', 'git-branch', 'git-stash']),

  g('restore', 'git restore [--staged] [-s <commit>] <pathspec>',
    [
      ['--staged', 'unstage the file but keep your edits'],
      ['--worktree', 'reset the file on disk; this is the default'],
      ['--staged --worktree', 'both: throw the edits away and unstage'],
      ['-s <commit>', 'take the content from that commit instead of the index'],
      ['-p', 'choose hunk by hunk'],
    ],
    [
      ['git restore src/app.ts', 'wipes uncommitted edits to that file, with no way back'],
      ['git restore --staged src/app.ts', 'takes it out of the staging area, edits intact'],
      ['git restore -s HEAD~2 src/app.ts', 'brings back the version from two commits ago'],
    ],
    ['git-checkout', 'git-reset', 'git-add', 'git-clean']),

  /* ───────── git — 합치기와 되돌리기 ───────── */
  g('merge', 'git merge [--no-ff|--squash] <branch>',
    [
      ['--no-ff', 'always record a merge commit, even when a fast-forward was possible'],
      ['--ff-only', 'refuse unless it can fast-forward'],
      ['--squash', 'stage the combined change without committing or recording a merge'],
      ['--abort', 'undo a merge that stopped on conflicts'],
      ['--continue', 'finish after you resolved the conflicts'],
      ['-X ours|theirs', 'auto-resolve conflicting hunks one way'],
      ['--no-commit', 'merge but leave the commit to you'],
    ],
    [
      ['git merge --no-ff feature/login', 'keeps the branch visible in history'],
      ['git merge --abort', 'gets you back to before the conflicted merge'],
      ['git merge --squash feature/login', 'one flat change, staged; you still have to commit'],
    ],
    ['git-rebase', 'git-cherry-pick', 'git-switch', 'git-diff']),

  g('rebase', 'git rebase [-i] [--onto <base>] <upstream>',
    [
      ['-i', 'interactive: reorder, squash, reword, drop commits'],
      ['--onto <base>', 'move the range onto a different base'],
      ['--continue', 'carry on after fixing a conflict'],
      ['--abort', 'put the branch back exactly as it was'],
      ['--skip', 'drop the commit that will not apply'],
      ['--autostash', 'stash uncommitted work and put it back afterwards'],
      ['--autosquash', 'apply fixup!/squash! commits automatically'],
    ],
    [
      ['git rebase main', 'replays your commits on top of main, giving them new hashes'],
      ['git rebase -i HEAD~3', 'squash or reword the last three commits'],
      ['git rebase --abort', 'cancel a rebase and return to the original branch'],
    ],
    ['git-merge', 'git-reset', 'git-pull', 'git-reflog', 'git-cherry-pick']),

  g('reset', 'git reset [--soft|--mixed|--hard] <commit> | git reset <path>',
    [
      ['--soft', 'move the branch only; index and files keep everything, so the change stays staged'],
      ['--mixed', 'default: also clear the staging area, leaving edits in your files'],
      ['--hard', 'also overwrite your files; uncommitted work is destroyed'],
      ['<path>', 'no commit given: unstage that path'],
      ['--keep', 'move but refuse if it would overwrite a local change'],
      ['--merge', 'like --hard but keeps changes that do not collide'],
    ],
    [
      ['git reset --soft HEAD~1', 'undoes the last commit and leaves everything staged'],
      ['git reset HEAD~1', 'undoes the last commit; the changes sit in your files, unstaged'],
      ['git reset src/app.ts', 'unstages one file without changing it'],
      ['git reset --hard origin/main', 'throws away local commits AND uncommitted edits'],
    ],
    ['git-revert', 'git-restore', 'git-reflog', 'git-checkout', 'git-clean']),

  g('revert', 'git revert [-n] <commit>',
    [
      ['-n', 'stage the inverse change without committing'],
      ['-m <parent>', 'which side to keep when reverting a merge commit'],
      ['--no-edit', 'accept the generated message'],
      ['--continue', 'finish after resolving conflicts'],
      ['--abort', 'cancel and go back'],
    ],
    [
      ['git revert a1b2c3d', 'adds a new commit that undoes that one'],
      ['git revert --no-edit HEAD', 'undoes the last commit without opening an editor'],
      ['git revert -m 1 <merge-commit>', 'undoes a merge, keeping the first parent'],
    ],
    ['git-reset', 'git-cherry-pick', 'git-log']),

  g('cherry-pick', 'git cherry-pick [-x] <commit>...',
    [
      ['-x', 'note the original hash in the new message'],
      ['-n', 'apply and stage without committing'],
      ['-e', 'edit the message'],
      ['-m <parent>', 'pick a merge commit, choosing a side'],
      ['<a>..<b>', 'a range; a itself is not included'],
      ['--continue', 'go on after a conflict'],
      ['--abort', 'undo the whole pick'],
    ],
    [
      ['git cherry-pick a1b2c3d', 'copies that commit onto the current branch with a new hash'],
      ['git cherry-pick -x a1b2c3d', 'same, with the source hash recorded in the message'],
      ['git cherry-pick a1b2c3d^..d4e5f6a', 'copies a range, this time including a1b2c3d'],
    ],
    ['git-revert', 'git-rebase', 'git-merge']),

  g('stash', 'git stash [push] [-u] [-m "<message>"]',
    [
      ['-u', 'include untracked files, which are otherwise left behind'],
      ['-a', 'include ignored files too'],
      ['-k', 'keep the staging area as it is'],
      ['-p', 'stash selected hunks'],
      ['pop', 'apply the newest entry and delete it'],
      ['apply', 'apply it and keep the entry'],
      ['list', 'show the entries'],
      ['drop <stash>', 'delete one entry'],
    ],
    [
      ['git stash -u -m "wip login"', 'parks tracked and untracked changes under a name'],
      ['git stash pop', 'brings the newest stash back and removes it from the list'],
      ['git stash apply stash@{2}', 'applies an older entry and leaves it in the list'],
    ],
    ['git-switch', 'git-checkout', 'git-reset', 'git-clean']),

  g('clean', 'git clean -n | git clean -fd',
    [
      ['-n', 'dry run: list what would be deleted'],
      ['-f', 'actually delete; without it git refuses'],
      ['-d', 'also remove untracked directories'],
      ['-x', 'also remove ignored files such as .env and node_modules'],
      ['-X', 'remove only ignored files'],
      ['-i', 'decide interactively'],
    ],
    [
      ['git clean -nd', 'lists the untracked files and folders that -fd would delete'],
      ['git clean -fd', 'deletes them; git never had a copy, so there is no undo'],
      ['git clean -fdx', 'also wipes ignored files, including local .env and build output'],
    ],
    ['git-status', 'git-reset', 'git-stash', 'git-rm']),

  /* ───────── git — 원격 ───────── */
  g('remote', 'git remote -v | git remote add <name> <url>',
    [
      ['-v', 'list the remotes with their URLs'],
      ['add <name> <url>', 'register another repository'],
      ['set-url <name> <url>', 'point an existing remote somewhere else'],
      ['rename <old> <new>', 'rename a remote'],
      ['remove <name>', 'forget a remote'],
      ['show <name>', 'branches it has and how they are tracked'],
      ['prune <name>', 'drop tracking refs for branches deleted there'],
    ],
    [
      ['git remote -v', 'shows the fetch and push URL of every remote'],
      ['git remote add upstream https://github.com/orig/repo.git', 'adds the original repo alongside your fork'],
      ['git remote set-url origin git@github.com:me/repo.git', 'switches origin from HTTPS to ssh'],
    ],
    ['git-clone', 'git-fetch', 'git-push', 'ssh']),

  g('fetch', 'git fetch [--all] [--prune] [<remote> [<branch>]]',
    [
      ['--all', 'from every remote'],
      ['--prune', 'delete tracking refs whose branch is gone on the server'],
      ['--tags', 'also fetch tags'],
      ['--unshallow', 'fill in the history a --depth clone left out'],
      ['--depth <n>', 'deepen a shallow clone by n commits'],
      ['-f', 'update a ref even when it is not a fast-forward'],
    ],
    [
      ['git fetch --all --prune', 'refreshes every remote and clears dead branches'],
      ['git fetch origin main', 'updates origin/main without touching your files'],
      ['git fetch --unshallow', 'turns a shallow clone into a full one'],
    ],
    ['git-pull', 'git-merge', 'git-remote', 'git-branch']),

  g('pull', 'git pull [--rebase|--ff-only] [<remote> <branch>]',
    [
      ['--rebase', 'replay your commits on top instead of merging'],
      ['--ff-only', 'refuse if a merge commit would be needed'],
      ['--no-rebase', 'merge, whatever pull.rebase says'],
      ['--autostash', 'park local changes for the duration'],
      ['--prune', 'drop tracking refs for deleted branches'],
      ['--depth <n>', 'shallow pull'],
    ],
    [
      ['git pull --rebase origin main', 'brings in server commits and puts yours on top'],
      ['git pull --ff-only', 'updates only when nothing has to be merged'],
      ['git pull --autostash', 'pulls even with uncommitted changes in the way'],
    ],
    ['git-fetch', 'git-merge', 'git-rebase', 'git-push']),

  g('push', 'git push [-u] [--force-with-lease] <remote> <branch>',
    [
      ['-u', 'set the upstream so later pushes need no arguments'],
      ['--force-with-lease', 'force, but stop if the remote moved since your last fetch'],
      ['-f', 'force: overwrite the remote branch, commits of others included'],
      ['--tags', 'push tags as well, which push does not do on its own'],
      ['--delete <branch>', 'delete the branch on the server'],
      ['--all', 'push every local branch'],
      ['-n', 'dry run'],
    ],
    [
      ['git push -u origin feature/login', 'publishes the branch and remembers the pairing'],
      ['git push --force-with-lease', 'the safe force, used after a rebase'],
      ['git push origin --delete old-feature', 'removes the branch on the server'],
    ],
    ['git-pull', 'git-fetch', 'git-remote', 'git-branch', 'git-tag']),

  g('tag', 'git tag [-a] <name> [<commit>]',
    [
      ['-a', 'annotated tag with a message, author and date'],
      ['-m "<msg>"', 'the message for -a'],
      ['-l "<pattern>"', 'list tags matching a pattern'],
      ['-d <name>', 'delete a tag locally'],
      ['-f', 'move an existing tag'],
      ['--sort=-creatordate', 'newest tag first'],
    ],
    [
      ['git tag -a v1.2.0 -m "release 1.2.0"', 'marks the current commit as a release'],
      ['git push origin v1.2.0', 'the separate step that puts the tag on the server'],
      ['git tag -d v1.2.0', 'deletes it locally; the server keeps its copy'],
    ],
    ['git-push', 'git-describe', 'git-show', 'git-archive']),

  /* ───────── git — 파일 다루기 ───────── */
  g('rm', 'git rm [--cached] [-r] <pathspec>',
    [
      ['--cached', 'stop tracking but leave the file on disk'],
      ['-r', 'recurse into directories'],
      ['-f', 'remove even when the file has unstaged changes'],
      ['-n', 'dry run'],
      ['--ignore-unmatch', 'exit 0 even if nothing matched'],
    ],
    [
      ['git rm --cached .env', 'stops tracking a secret file while keeping it locally'],
      ['git rm -r build/', 'deletes the folder from the repository and from disk'],
      ['git rm -n "*.log"', 'shows what would be removed'],
    ],
    ['git-add', 'git-restore', 'git-clean', 'git-update-index']),

  g('mv', 'git mv [-f] <source> <destination>',
    [
      ['-f', 'overwrite the destination'],
      ['-k', 'skip moves that would fail instead of stopping'],
      ['-n', 'dry run'],
      ['-v', 'name each file as it moves'],
    ],
    [
      ['git mv old.md docs/new.md', 'moves the file and stages the change in one step'],
      ['git mv -n src/a.ts src/b.ts', 'shows what it would do'],
      ['git mv README.md readme.md', 'a case-only rename, which needs -f on macOS and Windows'],
    ],
    ['git-rm', 'git-add', 'git-log']),

  g('ls-files', 'git ls-files [-o|-m|-i] [--exclude-standard]',
    [
      ['-c', 'files in the index; the default'],
      ['-m', 'tracked files modified on disk'],
      ['-d', 'tracked files that are missing'],
      ['-o', 'files git does not track'],
      ['-i', 'ignored files; must come with -o or -c and --exclude-standard'],
      ['--exclude-standard', 'apply .gitignore and friends'],
      ['-s', 'show mode and object id of each entry'],
      ['-z', 'separate paths with NUL for xargs -0'],
    ],
    [
      ['git ls-files', 'every tracked path, straight from the index'],
      ['git ls-files -o --exclude-standard', 'untracked files only, respecting .gitignore'],
      ['git ls-files -i -c --exclude-standard', 'tracked files that .gitignore says should be ignored'],
    ],
    ['git-status', 'git-add', 'git-update-index', 'git-sparse-checkout']),

  g('update-index', 'git update-index [--skip-worktree|--chmod=+x] <file>',
    [
      ['--chmod=+x', 'record the executable bit, useful from Windows'],
      ['--skip-worktree', 'let you keep local edits to a tracked file'],
      ['--no-skip-worktree', 'undo that'],
      ['--assume-unchanged', 'promise you will not edit it, as a speed hint only'],
      ['--no-assume-unchanged', 'undo that'],
      ['--refresh', 'update stat information after a filesystem change'],
    ],
    [
      ['git update-index --chmod=+x scripts/deploy.sh', 'stages the executable bit so CI can run it'],
      ['git update-index --skip-worktree config/local.json', 'keeps your local edits out of every diff'],
      ['git update-index --no-skip-worktree config/local.json', 'puts the file back under normal tracking'],
    ],
    ['git-add', 'git-ls-files', 'git-rm', 'chmod']),

  g('sparse-checkout', 'git sparse-checkout set <dir>...',
    [
      ['set <dir>...', 'check out only these directories'],
      ['add <dir>', 'add another directory to the set'],
      ['list', 'show the current set'],
      ['disable', 'go back to a full checkout'],
      ['reapply', 'apply the set again after a merge or pull'],
      ['--no-cone', 'use raw gitignore-style patterns instead of directories'],
    ],
    [
      ['git sparse-checkout set apps/web packages/ui', 'leaves the rest of the monorepo off your disk'],
      ['git sparse-checkout list', 'shows which directories are present'],
      ['git sparse-checkout disable', 'restores every file'],
    ],
    ['git-clone', 'git-ls-files', 'git-worktree', 'git-update-index']),

  /* ───────── git — 찾기와 고치기 ───────── */
  g('reflog', 'git reflog [show] [<ref>]',
    [
      ['show <ref>', 'the positions of one branch instead of HEAD'],
      ['--date=iso', 'real timestamps instead of relative ones'],
      ['-n <n>', 'only the last n entries'],
      ['HEAD@{n}', 'the commit HEAD pointed at n moves ago'],
      ['expire --expire=now --all', 'wipe the log, which also gives up the safety net'],
    ],
    [
      ['git reflog', 'every position HEAD has had, newest first'],
      ['git reflog --date=iso -n 20', 'the last twenty moves with real dates'],
      ['git reset --hard HEAD@{1}', 'undoes the reset you just regretted'],
    ],
    ['git-reset', 'git-fsck', 'git-gc', 'git-branch']),

  g('bisect', 'git bisect start <bad> <good>',
    [
      ['start <bad> <good>', 'begin, naming a broken and a working commit'],
      ['good', 'mark the checked-out commit as working'],
      ['bad', 'mark it as broken'],
      ['skip', 'this commit cannot be tested'],
      ['run <cmd>', 'let a command decide by its exit code'],
      ['reset', 'stop and go back to where you were'],
    ],
    [
      ['git bisect start HEAD v1.1.0', 'starts the search between the last release and now'],
      ['git bisect run npm test', 'finds the first failing commit with no further input'],
      ['git bisect reset', 'ends the session; skipping this leaves you on a detached commit'],
    ],
    ['git-log', 'git-checkout', 'git-revert', 'git-blame']),

  g('describe', 'git describe [--tags] [--dirty]',
    [
      ['--tags', 'use lightweight tags too, not just annotated ones'],
      ['--dirty', 'append -dirty when the working tree has changes'],
      ['--always', 'fall back to a bare hash when no tag is found'],
      ['--long', 'always the full tag-count-hash form'],
      ['--abbrev=<n>', 'how many hash digits to print'],
      ['--match <pattern>', 'only consider matching tags'],
    ],
    [
      ['git describe --tags --dirty', 'prints something like v1.2.0-5-gabc1234-dirty'],
      ['git describe --always', 'never fails, even in a repository with no tags'],
      ['git describe --match "v*" --long', 'ignores tags that are not versions'],
    ],
    ['git-tag', 'git-rev-parse', 'git-log']),

  g('rev-parse', 'git rev-parse [--short] <rev>',
    [
      ['--short[=<n>]', 'abbreviate the hash'],
      ['--abbrev-ref HEAD', 'print the current branch name'],
      ['--show-toplevel', 'print the root of the working tree'],
      ['--git-dir', 'print the path of the .git directory'],
      ['--is-inside-work-tree', 'true or false, for scripts'],
      ['--verify <rev>', 'fail loudly if the name does not resolve'],
    ],
    [
      ['git rev-parse --short HEAD', 'the short hash a build should stamp itself with'],
      ['git rev-parse --abbrev-ref HEAD', 'the branch name, for a CI script'],
      ['git rev-parse --show-toplevel', 'the repository root, wherever you are inside it'],
    ],
    ['git-describe', 'git-log', 'git-show', 'git-config']),

  g('fsck', 'git fsck [--lost-found] [--unreachable]',
    [
      ['--lost-found', 'write dangling objects into .git/lost-found'],
      ['--unreachable', 'list objects no ref points at'],
      ['--dangling', 'list objects nothing at all refers to'],
      ['--full', 'check packs and alternates too'],
      ['--connectivity-only', 'skip the expensive object checks'],
      ['--no-reflogs', 'do not treat reflog entries as roots'],
    ],
    [
      ['git fsck --lost-found', 'recovers commits after a reset when the reflog is gone'],
      ['git fsck --unreachable', 'lists commits nothing points at any more'],
      ['git fsck --connectivity-only', 'a quick structural check on a huge repository'],
    ],
    ['git-reflog', 'git-gc', 'git-reset']),

  g('gc', 'git gc [--aggressive] [--prune=<date>]',
    [
      ['--aggressive', 'repack harder; slow, occasionally worth it'],
      ['--prune=<date>', 'drop unreachable objects older than that'],
      ['--prune=now', 'drop them all, which also throws away reflog-only commits'],
      ['--auto', 'do nothing unless there is enough loose junk'],
      ['--no-prune', 'repack but keep unreachable objects'],
      ['-q', 'no progress output'],
    ],
    [
      ['git gc', 'packs loose objects and shrinks .git'],
      ['git gc --auto', 'the cheap check git itself runs after some commands'],
      ['git gc --prune=now --aggressive', 'smallest result, and no way back to lost commits'],
    ],
    ['git-fsck', 'git-reflog', 'git-clean']),

  /* ───────── git — 내보내기와 패치 ───────── */
  g('archive', 'git archive --format=tar.gz -o <file> <tree-ish>',
    [
      ['--format=<fmt>', 'tar, zip or tar.gz'],
      ['-o <file>', 'write to a file; the format is guessed from the name'],
      ['--prefix=<dir>/', 'put everything under one folder inside the archive'],
      ['--add-file=<file>', 'include an untracked file as well'],
      ['--remote=<repo>', 'let the server build it'],
      ['-l', 'list the formats this build supports'],
    ],
    [
      ['git archive --format=tar.gz -o app-1.2.0.tar.gz v1.2.0', 'a release tarball of exactly that tag'],
      ['git archive --prefix=app/ -o app.zip HEAD', 'a zip whose contents sit inside app/'],
      ['git archive -o src.zip HEAD -- src', 'only the src directory'],
    ],
    ['git-tag', 'git-show', 'tar']),

  g('apply', 'git apply [--check|-3] <patch>',
    [
      ['--check', 'report whether it would apply, change nothing'],
      ['-3', 'fall back to a three-way merge and leave conflict markers'],
      ['--index', 'apply to the working tree and stage it'],
      ['--cached', 'apply to the index only'],
      ['-R', 'apply in reverse, undoing the patch'],
      ['-p<n>', 'strip n leading path components'],
      ['--stat', 'show what the patch touches'],
    ],
    [
      ['git apply --check fix.patch', 'tells you if it fits before you try'],
      ['git apply -3 fix.patch', 'applies it and leaves conflicts to resolve by hand'],
      ['git apply -R fix.patch', 'takes an applied patch back out'],
    ],
    ['git-am', 'git-format-patch', 'git-diff']),

  g('am', 'git am [-3] <mbox|patch>...',
    [
      ['-3', 'three-way merge when the patch does not apply cleanly'],
      ['-s', 'add a Signed-off-by line'],
      ['--continue', 'go on after you fixed the conflict'],
      ['--skip', 'drop this patch and continue the series'],
      ['--abort', 'undo the whole series'],
      ['-k', 'keep the subject line exactly as it is'],
    ],
    [
      ['git am 0001-fix-login.patch', 'commits the patch, keeping its original author'],
      ['git am -3 *.patch', 'applies a whole series, merging where needed'],
      ['git am --abort', 'returns to before the series started'],
    ],
    ['git-apply', 'git-format-patch', 'git-commit']),

  g('format-patch', 'git format-patch [-<n>|<since>] [-o <dir>]',
    [
      ['-<n>', 'the last n commits, e.g. -3'],
      ['<since>', 'commits after that one, e.g. origin/main'],
      ['-o <dir>', 'write the files into a directory'],
      ['--stdout', 'one mbox stream on standard output'],
      ['--cover-letter', 'add a 0000 summary mail'],
      ['-v <n>', 'mark the series as v<n> of a re-roll'],
      ['-s', 'add Signed-off-by'],
    ],
    [
      ['git format-patch -3', 'writes 0001- to 0003- patch files for the last three commits'],
      ['git format-patch origin/main --cover-letter -o outbox/', 'a mailable series of everything not yet upstream'],
      ['git format-patch -1 --stdout > fix.patch', 'one commit as a single patch file'],
    ],
    ['git-am', 'git-apply', 'git-log']),

  g('shortlog', 'git shortlog -sne [<revision-range>]',
    [
      ['-s', 'counts only, no subjects'],
      ['-n', 'sort by number of commits'],
      ['-e', 'show the email address as well'],
      ['-c', 'group by committer instead of author'],
      ['--no-merges', 'leave merge commits out of the count'],
      ['--since=<date>', 'only commits after a date'],
    ],
    [
      ['git shortlog -sne', 'every contributor with a commit count'],
      ['git shortlog -sn v1.1.0..v1.2.0', 'who did what between two releases'],
      ['git shortlog --no-merges -sn --since="1 year ago"', 'this year, merges excluded'],
    ],
    ['git-log', 'git-blame', 'git-tag']),

  /* ───────── git — 여러 작업 폴더 ───────── */
  g('worktree', 'git worktree add <path> [<branch>]',
    [
      ['add <path> <branch>', 'check that branch out into another folder'],
      ['add -b <new> <path>', 'create a branch and check it out there'],
      ['list', 'show every working tree of this repository'],
      ['remove <path>', 'delete a working tree cleanly'],
      ['prune', 'forget trees whose folder you deleted by hand'],
      ['--detach', 'check out a commit without a branch'],
    ],
    [
      ['git worktree add ../hotfix hotfix/login', 'a second folder on another branch, sharing one .git'],
      ['git worktree add -b release ../rel main', 'creates release from main in ../rel'],
      ['git worktree remove ../hotfix', 'removes the folder and its bookkeeping entry'],
    ],
    ['git-clone', 'git-branch', 'git-switch', 'git-submodule']),

  g('submodule', 'git submodule update --init --recursive',
    [
      ['add <url> <path>', 'pin another repository at a path'],
      ['update --init', 'fill in a submodule folder that a clone left empty'],
      ['--recursive', 'go into submodules of submodules'],
      ['update --remote', 'move the pin to the tip of the tracked branch'],
      ['status', 'the commit each submodule sits at'],
      ['deinit <path>', 'unregister it'],
      ['foreach <cmd>', 'run a command in each one'],
    ],
    [
      ['git submodule update --init --recursive', 'the command that fills empty submodule folders after a clone'],
      ['git submodule add https://github.com/x/lib.git vendor/lib', 'adds a dependency as a submodule'],
      ['git submodule update --remote', 'updates the pinned commit to the branch tip'],
    ],
    ['git-clone', 'git-worktree', 'git-config', 'git-fetch']),

  /* ───────── pkg — node 생태계 ───────── */
  p('npm-install', 'npm install', 'npm install [<package>] [-D|-g]',
    [
      ['-D', 'save as a devDependency'],
      ['-g', 'install globally, onto PATH'],
      ['-E', 'save the exact version, without a caret'],
      ['--omit=dev', 'skip devDependencies; replaces the old --production'],
      ['--legacy-peer-deps', 'ignore peer conflicts the way npm 6 did'],
      ['--ignore-scripts', 'do not run install scripts'],
      ['--force', 'overwrite cache and conflict checks'],
    ],
    [
      ['npm install', 'installs what package.json asks for and updates package-lock.json'],
      ['npm install -D vitest', 'adds a dev-only dependency'],
      ['npm install react@18.3.1', 'installs one exact version and records it'],
    ],
    ['npm-ci', 'npm-run', 'npm-init', 'yarn-add', 'pnpm-add']),

  p('npm-ci', 'npm ci', 'npm ci [--omit=dev]',
    [
      ['--omit=dev', 'production dependencies only'],
      ['--ignore-scripts', 'skip lifecycle scripts, common in CI'],
      ['--prefer-offline', 'use the cache whenever it can'],
      ['--no-audit', 'skip the vulnerability check for speed'],
      ['--cache <dir>', 'point at a cache directory the CI runner keeps'],
    ],
    [
      ['npm ci', 'deletes node_modules and installs exactly what the lockfile says'],
      ['npm ci --omit=dev', 'a production install for a container image'],
      ['npm ci --ignore-scripts', 'installs without running third-party install hooks'],
    ],
    ['npm-install', 'npm-audit', 'npm-run']),

  p('npm-run', 'npm run', 'npm run <script> [-- <args>]',
    [
      ['--', 'everything after it goes to the script, not to npm'],
      ['--if-present', 'exit quietly when the script is missing'],
      ['-w <workspace>', 'run it in one workspace'],
      ['--workspaces', 'run it in every workspace'],
      ['-s', 'hide npm own output'],
    ],
    [
      ['npm run build', 'runs the build script from package.json'],
      ['npm run test -- --watch', 'passes --watch to the test runner, not to npm'],
      ['npm run', 'with no name, lists the scripts that exist'],
    ],
    ['npm-install', 'npx', 'npm-init']),

  p('npm-init', 'npm init', 'npm init [-y] | npm init <initializer>',
    [
      ['-y', 'accept every default and write package.json at once'],
      ['<initializer>', 'download and run create-<initializer> instead'],
      ['--scope=@me', 'create a scoped package name'],
      ['-w <dir>', 'create a workspace package under that directory'],
    ],
    [
      ['npm init -y', 'writes a package.json with defaults, no questions'],
      ['npm init vite@latest my-app', 'runs create-vite; nothing like plain npm init'],
      ['npm init --scope=@me -y', 'names the package @me/whatever'],
    ],
    ['npm-install', 'npx', 'npm-publish']),

  p('npx', 'npx', 'npx [-y] <package>[@version] [args...]',
    [
      ['-y', 'install without asking first'],
      ['--no', 'fail instead of downloading anything'],
      ['-p <pkg>', 'make a package available, then run a command from it'],
      ['-c "<cmd>"', 'run the command through a shell with the bin path set'],
      ['--package <pkg>', 'the long form of -p'],
    ],
    [
      ['npx tsc --noEmit', 'runs the typescript in node_modules, no global install'],
      ['npx -y create-next-app@latest my-app', 'fetches a scaffolder for one use and forgets it'],
      ['npx --no eslint .', 'uses the local eslint or fails, instead of quietly downloading one'],
    ],
    ['npm-run', 'npm-install', 'npm-init']),

  p('yarn-add', 'yarn add', 'yarn add [-D] <package>[@version]',
    [
      ['-D', 'devDependency'],
      ['-P', 'peerDependency'],
      ['-O', 'optionalDependency'],
      ['-E', 'exact version, no range'],
      ['--mode=update-lockfile', 'only touch yarn.lock, do not install'],
    ],
    [
      ['yarn add react react-dom', 'adds both and updates yarn.lock'],
      ['yarn add -D typescript', 'adds a dev-only dependency'],
      ['yarn add lodash@4.17.21', 'pins one version'],
    ],
    ['npm-install', 'pnpm-add', 'npm-run']),

  p('pnpm-add', 'pnpm add', 'pnpm add [-D] [-w] <package>',
    [
      ['-D', 'devDependency'],
      ['-g', 'global'],
      ['-w', 'add it to the workspace root'],
      ['--filter <pkg>', 'add it inside one workspace package'],
      ['-E', 'exact version'],
      ['--save-peer', 'peerDependency'],
    ],
    [
      ['pnpm add -D vitest', 'adds a dev dependency, linked from the shared store'],
      ['pnpm add -w typescript', 'installs at the root of a workspace'],
      ['pnpm add --filter web react', 'installs into the web package only'],
    ],
    ['npm-install', 'yarn-add', 'npm-run']),

  p('npm-audit', 'npm audit', 'npm audit [fix] [--audit-level=<level>]',
    [
      ['fix', 'upgrade what it can inside your version ranges'],
      ['fix --force', 'allow breaking major upgrades to clear a report'],
      ['--audit-level=high', 'only fail on high and above'],
      ['--omit=dev', 'ignore dev-only dependencies'],
      ['--json', 'machine-readable report'],
      ['--dry-run', 'show the plan without changing anything'],
    ],
    [
      ['npm audit', 'lists known vulnerabilities in the installed tree'],
      ['npm audit fix', 'upgrades the ones that fit your ranges'],
      ['npm audit fix --force', 'may install major versions that break your build'],
    ],
    ['npm-install', 'npm-ci', 'npm-publish']),

  p('npm-publish', 'npm publish', 'npm publish [--access public] [--tag <tag>]',
    [
      ['--access public', 'required for a scoped package, which is private by default'],
      ['--tag <tag>', 'publish under a tag such as next, leaving latest alone'],
      ['--dry-run', 'show the file list and version without uploading'],
      ['--otp <code>', 'pass a two-factor code'],
      ['--provenance', 'attach a signed build statement from CI'],
    ],
    [
      ['npm publish --dry-run', 'shows exactly which files would ship'],
      ['npm publish --access public', 'publishes @scope/name so anyone can install it'],
      ['npm publish --tag next', 'a prerelease that npm install does not pick up'],
    ],
    ['npm-init', 'npm-install', 'npm-audit']),

  p('node-version', 'node --version', 'node --version | node -v',
    [
      ['-v', 'the same thing, shorter; prints e.g. v22.14.0'],
      ['-p <expr>', 'print one expression, e.g. node -p process.versions.v8'],
      ['-e <code>', 'run a line of code with no file'],
      ['--env-file=<file>', 'load a .env before running, from node 20.6'],
      ['--help', 'every flag this build accepts'],
    ],
    [
      ['node --version', 'the version of the node first on your PATH'],
      ['node -p process.execPath', 'which binary that actually is, when several are installed'],
      ['node -p process.versions.v8', 'the V8 version bundled with it'],
    ],
    ['nvm-use', 'npm-install', 'npx']),

  p('nvm-use', 'nvm use', 'nvm use <version> | nvm use --lts',
    [
      ['--lts', 'the newest long-term-support line you have installed'],
      ['nvm install <version>', 'download it first; use only switches to installed ones'],
      ['nvm alias default <version>', 'what a brand-new shell should start with'],
      ['nvm ls', 'the versions on this machine'],
      ['nvm current', 'which one is active in this shell'],
    ],
    [
      ['nvm use 22', 'switches this shell to node 22'],
      ['nvm use --lts', 'switches to the newest installed LTS'],
      ['nvm alias default 22', 'so new terminals and editors also get 22'],
    ],
    ['node-version', 'npm-install', 'npx']),

  /* ───────── pkg — 운영체제 패키지 ───────── */
  p('brew-install', 'brew install', 'brew install [--cask] <formula>',
    [
      ['--cask', 'install a GUI application instead of a formula'],
      ['--formula', 'force the formula when a cask has the same name'],
      ['--HEAD', 'build from the latest source instead of a release'],
      ['--build-from-source', 'compile locally instead of using the bottle'],
    ],
    [
      ['brew install ripgrep', 'installs a prebuilt bottle in seconds'],
      ['brew install --cask visual-studio-code', 'installs an app into /Applications'],
      ['brew install node@22', 'a versioned formula, keg-only until you brew link it'],
    ],
    ['nvm-use', 'apt-get-install', 'dnf-install', 'pacman-s']),

  p('apt-get-install', 'apt-get install', 'sudo apt-get install [-y] <package>...',
    [
      ['-y', 'answer yes, needed in scripts and Dockerfiles'],
      ['--no-install-recommends', 'skip recommended extras, keeping images small'],
      ['-s', 'simulate; print the plan and change nothing'],
      ['--only-upgrade', 'upgrade it if present, do not install it new'],
      ['--reinstall', 'install the same version over itself'],
      ['-f', 'try to fix broken dependencies'],
    ],
    [
      ['sudo apt-get install -y curl git', 'the usual line in a Dockerfile'],
      ['sudo apt-get install --no-install-recommends nginx', 'nginx without the suggested extras'],
      ['sudo apt-get install -s ffmpeg', 'shows what would be pulled in'],
    ],
    ['apt-update', 'dnf-install', 'pacman-s', 'brew-install']),

  p('apt-update', 'apt update', 'sudo apt update',
    [
      ['apt upgrade', 'the second half: actually install the newer versions'],
      ['apt full-upgrade', 'allow packages to be removed to finish the upgrade'],
      ['apt list --upgradable', 'show what the refresh found'],
      ['-q', 'quieter output for logs and CI'],
      ['--allow-releaseinfo-change', 'accept a repository that renamed its suite'],
    ],
    [
      ['sudo apt update', 'refreshes the package lists only'],
      ['sudo apt update && sudo apt upgrade -y', 'refresh, then install the updates'],
      ['apt list --upgradable', 'lists the packages that now have a newer version'],
    ],
    ['apt-get-install', 'dnf-install', 'pacman-s']),

  p('dnf-install', 'dnf install', 'sudo dnf install [-y] <package>',
    [
      ['-y', 'assume yes'],
      ['--refresh', 'expire the metadata cache before resolving'],
      ['--enablerepo=<repo>', 'use a repository that is off by default'],
      ['--setopt=install_weak_deps=False', 'skip weak dependencies'],
      ['--allowerasing', 'let it remove packages to satisfy the request'],
      ['--nogpgcheck', 'install without checking signatures'],
    ],
    [
      ['sudo dnf install -y git', 'installs with dependencies from the enabled repos'],
      ['sudo dnf install --refresh nginx', 'refreshes metadata first, then installs'],
      ['sudo dnf install ./package.rpm', 'installs a local rpm and resolves its dependencies'],
    ],
    ['apt-get-install', 'apt-update', 'pacman-s']),

  p('pacman-s', 'pacman -S', 'sudo pacman -S [--needed] <package>',
    [
      ['-Syu', 'refresh and upgrade the whole system, the supported way to update'],
      ['--needed', 'do not reinstall packages already at that version'],
      ['--noconfirm', 'no prompts, for scripts'],
      ['-Ss <pattern>', 'search the repositories'],
      ['-R <package>', 'remove a package'],
      ['-Qi <package>', 'show what is installed and why'],
    ],
    [
      ['sudo pacman -S ripgrep', 'installs from the sync repositories'],
      ['sudo pacman -Syu', 'the full upgrade Arch expects you to run'],
      ['sudo pacman -S --needed base-devel', 'installs the group, skipping what is there'],
    ],
    ['apt-get-install', 'dnf-install', 'brew-install']),

  /* ───────── pkg — python ───────── */
  p('pip-install', 'pip install', 'python -m pip install [-r requirements.txt] <package>',
    [
      ['-r <file>', 'install everything a requirements file lists'],
      ['-U', 'upgrade to the newest allowed version'],
      ['-e .', 'editable install of the project you are in'],
      ['--user', 'into your home directory instead of the system'],
      ['--no-deps', 'this package only, no dependencies'],
      ['-c <file>', 'apply a constraints file to the versions'],
      ['--break-system-packages', 'override the PEP 668 refusal on a system python'],
    ],
    [
      ['python -m pip install -r requirements.txt', 'installs a pinned set into the active environment'],
      ['python -m pip install -U requests', 'upgrades one package'],
      ['python -m pip install -e .', 'installs your own project so edits take effect at once'],
    ],
    ['pip-freeze', 'venv', 'npm-install']),

  p('pip-freeze', 'pip freeze', 'python -m pip freeze > requirements.txt',
    [
      ['--local', 'skip packages inherited from a global site-packages'],
      ['--exclude-editable', 'leave out -e installs, which are not installable lines'],
      ['-r <file>', 'keep the order of an existing requirements file'],
      ['--all', 'include pip, setuptools and wheel too'],
    ],
    [
      ['python -m pip freeze > requirements.txt', 'writes exact versions of everything installed'],
      ['python -m pip freeze --exclude-editable', 'a list you can hand to pip install -r'],
      ['python -m pip freeze --local', 'only what this environment installed itself'],
    ],
    ['pip-install', 'venv']),

  p('venv', 'python -m venv', 'python -m venv [--upgrade-deps] <directory>',
    [
      ['--upgrade-deps', 'start with an up-to-date pip'],
      ['--system-site-packages', 'let it see the globally installed packages'],
      ['--clear', 'empty the directory first'],
      ['--prompt <name>', 'what the shell prompt should say'],
      ['--without-pip', 'no pip inside'],
    ],
    [
      ['python -m venv .venv', 'creates an isolated interpreter and site-packages in .venv'],
      ['source .venv/bin/activate', 'starts using it; on Windows it is .venv\\Scripts\\activate'],
      ['python -m venv --upgrade-deps .venv', 'creates it with the newest pip inside'],
    ],
    ['pip-install', 'pip-freeze', 'node-version']),

  /* ───────── pkg — docker ───────── */
  p('docker-run', 'docker run', 'docker run [-d] [-p <host>:<container>] <image> [command]',
    [
      ['-d', 'run in the background and print the id'],
      ['-p 8080:80', 'publish a container port on the host'],
      ['-it', 'interactive with a terminal, for a shell'],
      ['--rm', 'delete the container when it exits'],
      ['-v <host>:<path>', 'mount a host folder or named volume'],
      ['-e KEY=value', 'set an environment variable'],
      ['--name <name>', 'give it a name instead of a random one'],
      ['--network <net>', 'attach it to a network'],
    ],
    [
      ['docker run --rm -it ubuntu bash', 'a throwaway shell in a container'],
      ['docker run -d -p 8080:80 --name web nginx', 'nginx in the background, reachable on localhost:8080'],
      ['docker run --rm -v "$PWD":/app -w /app node:22 npm test', 'runs your tests in a container without installing node'],
    ],
    ['docker-ps', 'docker-exec', 'docker-logs', 'docker-build']),

  p('docker-ps', 'docker ps', 'docker ps [-a] [--filter <f>]',
    [
      ['-a', 'stopped containers too'],
      ['-q', 'ids only, for piping'],
      ['--filter status=exited', 'narrow by status, name, label and so on'],
      ['--format "{{.Names}} {{.Status}}"', 'choose the columns'],
      ['-n <n>', 'the n most recently created'],
      ['-s', 'show the disk each one uses'],
    ],
    [
      ['docker ps', 'the containers running right now'],
      ['docker ps -a', 'also the ones that exited, which is where a crash shows up'],
      ['docker ps -q | xargs docker stop', 'stops everything that is running'],
    ],
    ['docker-run', 'docker-logs', 'docker-exec', 'ps']),

  p('docker-build', 'docker build', 'docker build -t <name>:<tag> [-f <Dockerfile>] <context>',
    [
      ['-t <name>:<tag>', 'name the image; without it you only get an id'],
      ['-f <file>', 'use a Dockerfile that is not ./Dockerfile'],
      ['--no-cache', 'rebuild every layer'],
      ['--build-arg KEY=value', 'pass an ARG into the build'],
      ['--target <stage>', 'stop at one stage of a multi-stage file'],
      ['--platform linux/amd64', 'build for another architecture'],
      ['--progress=plain', 'full log output instead of the collapsed view'],
    ],
    [
      ['docker build -t myapp:1.0 .', 'builds from ./Dockerfile with the current folder as context'],
      ['docker build -f docker/Dockerfile.dev -t myapp:dev .', 'another Dockerfile, same context'],
      ['docker build --platform linux/amd64 -t myapp:1.0 .', 'an x86 image built on an Apple Silicon Mac'],
    ],
    ['docker-run', 'docker-compose-up', 'docker-ps']),

  p('docker-compose-up', 'docker compose up', 'docker compose up [-d] [--build] [<service>...]',
    [
      ['-d', 'start in the background'],
      ['--build', 'rebuild images before starting'],
      ['--force-recreate', 'replace containers even if nothing changed'],
      ['--remove-orphans', 'clean up containers of services you deleted'],
      ['--wait', 'return only once healthchecks pass'],
      ['--scale <svc>=<n>', 'run n copies of one service'],
    ],
    [
      ['docker compose up -d', 'starts every service in compose.yaml in the background'],
      ['docker compose up --build web', 'rebuilds and starts one service'],
      ['docker compose down -v', 'stops everything and deletes the named volumes, database data included'],
    ],
    ['docker-run', 'docker-build', 'docker-ps', 'docker-logs']),

  p('docker-exec', 'docker exec', 'docker exec -it <container> <command>',
    [
      ['-it', 'interactive terminal, for a shell'],
      ['-u <user>', 'run as another user, e.g. root'],
      ['-w <dir>', 'start in that directory'],
      ['-e KEY=value', 'set a variable for this process only'],
      ['-d', 'run it in the background'],
    ],
    [
      ['docker exec -it web bash', 'a shell inside a running container'],
      ['docker exec -u root -it web sh', 'as root, and sh because slim images have no bash'],
      ['docker exec -it db psql -U postgres', 'runs a client that lives inside the container'],
    ],
    ['docker-run', 'docker-ps', 'docker-logs']),

  p('docker-logs', 'docker logs', 'docker logs [-f] [--tail <n>] <container>',
    [
      ['-f', 'follow new output as it arrives'],
      ['--tail <n>', 'only the last n lines'],
      ['--since <time>', 'from a point in time, e.g. 15m or a timestamp'],
      ['--until <time>', 'up to a point in time'],
      ['-t', 'prefix every line with a timestamp'],
    ],
    [
      ['docker logs -f --tail 100 web', 'the last hundred lines, then follow'],
      ['docker logs --since 15m web', 'what happened in the last fifteen minutes'],
      ['docker logs -t web', 'the same output with timestamps in front'],
    ],
    ['docker-ps', 'docker-run', 'docker-exec', 'tail']),
];
