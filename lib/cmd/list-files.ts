/**
 * 파일·텍스트·권한 명령 79가지 — 이름과 사용 꼴, 옵션만 적는다.
 *
 * 명령 이름과 옵션은 프로그램이 정한 것이라 언어를 가리지 않는다. ls는 어느
 * 나라에서든 ls이고 -la는 -la다. 그래서 여기에는 옮길 것이 없는 것만 둔다 —
 * 열 언어로 쓸 한 문장은 desc-files.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 어디에나 깔려 있는 것만 싣는다. GNU coreutils와 BSD(macOS)에서 뜻이 다른
 * 옵션은 그 자리에 어느 쪽인지 적는다 — sed -i, stat -c/-f, df -T처럼 한쪽에만
 * 있거나 이름이 같고 뜻이 다른 것이 실제로 사람을 넘어뜨린다. 확인하지 못한
 * 옵션은 적지 않는다. 틀린 옵션 한 줄이 빠진 옵션 열 줄보다 나쁘다.
 *
 * 갈래는 셋이다 — file(파일·디렉터리)·text(텍스트 처리)·perm(권한·소유).
 */
import type { CmdItem, CmdCategory } from './types.ts';

/** 이름은 슬러그에서 나온다 — 'git-reset'은 화면에 'git reset'으로 적힌다 */
const c = (
  slug: string,
  category: CmdCategory,
  usage: string,
  flags: [string, string][],
  examples: [string, string][],
  see?: string[],
): CmdItem => ({
  slug,
  name: slug.replace(/-/g, ' '),
  category,
  usage,
  flags: flags.map(([flag, en]) => ({ flag, en })),
  examples: examples.map(([cmd, en]) => ({ cmd, en })),
  ...(see ? { see } : {}),
});

export const CMD_FILES: CmdItem[] = [
  /* ───────── file — 파일과 디렉터리 ───────── */
  c('ls', 'file', 'ls -la [path]', [
    ['-l', 'One line per entry with mode, owner, size and time'],
    ['-a', 'Include names that begin with a dot'],
    ['-h', 'Sizes as 4.0K instead of 4096, together with -l'],
    ['-t', 'Sort by modification time, newest first'],
    ['-r', 'Reverse whatever order is in effect'],
    ['-S', 'Sort by size, largest first'],
    ['-R', 'Walk into subdirectories'],
    ['-d', 'Show the directory itself instead of its contents'],
  ], [
    ['ls -lh', 'Long listing with readable sizes.'],
    ['ls -lat', 'Newest first, hidden files included.'],
    ['ls -d */', 'Only the directories in this folder.'],
  ], ['tree', 'stat', 'du']),

  c('cd', 'file', 'cd [path]', [
    ['-', 'An argument rather than a flag: return to the previous directory'],
    ['~', 'Your home directory; ~user is another user home'],
    ['-P', 'Move to the real directory, resolving symlinks'],
    ['-L', 'Keep the symlinked path (the default)'],
  ], [
    ['cd -', 'Jump back to where you just were.'],
    ['cd ..', 'Up one level.'],
    ['cd', 'With no argument at all, go home.'],
  ], ['pwd', 'ls', 'realpath']),

  c('pwd', 'file', 'pwd [-P]', [
    ['-L', 'Print the logical path from $PWD, symlinks kept (default)'],
    ['-P', 'Print the physical path with every symlink resolved'],
  ], [
    ['pwd', 'Which directory am I standing in.'],
    ['pwd -P', 'The real path when you walked in through a symlink.'],
  ], ['cd', 'realpath']),

  c('mkdir', 'file', 'mkdir -p [path]', [
    ['-p', 'Create missing parents, and do not complain if it exists'],
    ['-m', 'Set the mode of the new directory, as in -m 700'],
    ['-v', 'Print a line for each directory created'],
  ], [
    ['mkdir -p a/b/c', 'Creates the whole chain in one call.'],
    ['mkdir -m 700 private', 'A directory only you may enter.'],
  ], ['rmdir', 'chmod', 'umask']),

  c('rmdir', 'file', 'rmdir [dir]', [
    ['-p', 'Remove the directory and every parent that becomes empty'],
    ['-v', 'Report each removal'],
    ['--ignore-fail-on-non-empty', 'GNU: stay quiet when a directory is not empty'],
  ], [
    ['rmdir old', 'Removes old only if nothing is inside.'],
    ['rmdir -p a/b/c', 'Removes c, then b, then a while each is empty.'],
  ], ['rm', 'mkdir']),

  c('rm', 'file', 'rm -rf [path]', [
    ['-r', 'Descend into directories and delete what is inside'],
    ['-f', 'Never prompt, and say nothing about files that are missing'],
    ['-i', 'Ask before every single removal'],
    ['-d', 'Remove an empty directory without -r'],
    ['-v', 'Print each name as it goes'],
    ['-I', 'GNU: ask once before removing more than three files'],
    ['-P', 'macOS: overwrite the file before unlinking it'],
  ], [
    ['rm -rf build', 'Deletes the build directory and everything under it.'],
    ['rm -i *.log', 'Asks about each log file first.'],
    ['rm -- -weird', 'Deletes a file whose name starts with a dash.'],
  ], ['rmdir', 'shred', 'find']),

  c('cp', 'file', 'cp -r [source] [dest]', [
    ['-r', 'Copy directories and their contents'],
    ['-a', 'Archive: -r plus permissions, times and symlinks kept'],
    ['-p', 'Keep mode, owner and timestamps'],
    ['-i', 'Ask before overwriting'],
    ['-n', 'Never overwrite a file that already exists'],
    ['-v', 'Name each file as it is copied'],
    ['-u', 'GNU: copy only when the source is newer'],
  ], [
    ['cp -a site/ backup/', 'Tree copied with permissions and times intact.'],
    ['cp config.yml config.yml.bak', 'Quick backup beside the original.'],
    ['cp -r src/. dest/', 'Copies the contents of src into an existing dest.'],
  ], ['mv', 'rsync', 'scp']),

  c('mv', 'file', 'mv [source] [dest]', [
    ['-i', 'Ask before overwriting the target'],
    ['-n', 'Never overwrite; leave the target as it is'],
    ['-f', 'Overwrite without asking (the default)'],
    ['-v', 'Print each move'],
  ], [
    ['mv notes.txt notes.md', 'Rename in place.'],
    ['mv *.jpg photos/', 'Move every JPEG into photos.'],
    ['mv -n a.txt backup/', 'Moves unless backup/a.txt already exists.'],
  ], ['cp', 'rsync']),

  c('touch', 'file', 'touch [file]', [
    ['-a', 'Change only the access time'],
    ['-m', 'Change only the modification time'],
    ['-c', 'Do not create the file if it is missing'],
    ['-r', 'Copy the timestamps from another file'],
    ['-t', 'Set an explicit time as [[CC]YY]MMDDhhmm[.SS]'],
    ['-d', 'GNU: set the time from a phrase such as -d yesterday'],
  ], [
    ['touch notes.md', 'Creates it empty, or just bumps the time.'],
    ['touch -t 202401011200 report.pdf', 'Sets the time to noon on 1 Jan 2024.'],
    ['touch -r a.txt b.txt', 'Gives b.txt the same times as a.txt.'],
  ], ['stat', 'find']),

  c('cat', 'file', 'cat [file...]', [
    ['-n', 'Number every line'],
    ['-b', 'Number only the non-blank lines'],
    ['-s', 'Squeeze runs of blank lines into one'],
    ['-v', 'Show non-printing characters'],
    ['-e', 'BSD: -v plus a $ at each line end; GNU spells this -A'],
  ], [
    ['cat a.txt b.txt > all.txt', 'Joins two files into one.'],
    ['cat -n script.sh', 'Prints it with line numbers.'],
    ['cat > note.txt', 'Types a new file from the keyboard until Ctrl-D.'],
  ], ['less', 'head', 'tail']),

  c('less', 'file', 'less [file]', [
    ['-N', 'Show line numbers'],
    ['-S', 'Chop long lines instead of wrapping them'],
    ['-i', 'Ignore case while searching unless the pattern has capitals'],
    ['-R', 'Pass color escape codes through as colors'],
    ['+F', 'Start in follow mode, like tail -f'],
    ['-X', 'Leave the output on screen after quitting'],
    ['/word', 'Search forward; n repeats it, q quits less'],
  ], [
    ['less +F /var/log/syslog', 'Follows the log; Ctrl-C stops following and lets you scroll.'],
    ['less -S wide.csv', 'Keeps each record on one row so columns stay aligned.'],
    ['git log | less -R', 'Pages colored output with the colors kept.'],
  ], ['cat', 'tail', 'head']),

  c('head', 'file', 'head -n 20 [file]', [
    ['-n', 'Print the first N lines'],
    ['-c', 'Print the first N bytes'],
    ['-q', 'Never print the file name header'],
    ['-v', 'Always print the file name header'],
    ['-n -5', 'GNU: everything except the last 5 lines'],
  ], [
    ['head -n 5 data.csv', 'Header row plus four records.'],
    ['head -c 100 file.bin', 'The first 100 bytes only.'],
  ], ['tail', 'less', 'split']),

  c('tail', 'file', 'tail -f [file]', [
    ['-n', 'Print the last N lines'],
    ['-n +N', 'Start at line N instead of counting from the end'],
    ['-f', 'Keep printing as the file grows'],
    ['-F', 'Follow by name and reopen the file after log rotation'],
    ['-c', 'Print the last N bytes'],
    ['-r', 'BSD: print the lines in reverse order (GNU uses tac)'],
  ], [
    ['tail -f app.log', 'Watches a log live; Ctrl-C stops.'],
    ['tail -n +2 data.csv', 'Skips the header line.'],
    ['tail -F /var/log/nginx/access.log', 'Keeps following after the log is rotated.'],
  ], ['head', 'less', 'tac']),

  c('find', 'file', "find [path] -name '[pattern]' -type f", [
    ['-name', 'Match the file name, case sensitive; -iname ignores case'],
    ['-type', 'Restrict to f (file), d (directory) or l (symlink)'],
    ['-size', 'Filter by size, as in -size +100M'],
    ['-mtime', 'Filter by age in days, as in -mtime +7'],
    ['-maxdepth', 'Limit how deep to walk; GNU wants it before the tests'],
    ['-delete', 'Delete every match, no confirmation'],
    ['-exec', 'Run a command on each hit, ending with \\; or +'],
    ['-print0', 'Separate results with NUL, to pair with xargs -0'],
  ], [
    ["find . -name '*.log' -mtime +7 -delete", 'Deletes log files older than a week.'],
    ['find / -type f -size +1G 2>/dev/null', 'Finds files over a gigabyte, hiding permission errors.'],
    ["find . -name '*.jpg' -exec mv {} photos/ +", 'Moves every JPEG it finds.'],
  ], ['locate', 'xargs', 'du', 'grep']),

  c('locate', 'file', 'locate [name]', [
    ['-i', 'Ignore case'],
    ['-l', 'Stop after N results'],
    ['-c', 'Print only how many matched'],
    ['-b', 'GNU mlocate: match the file name, not the whole path'],
    ['-r', 'GNU: read the pattern as a regular expression'],
    ['-e', 'GNU: skip entries that no longer exist on disk'],
  ], [
    ['locate -i nginx.conf', 'Finds the config anywhere on disk, instantly.'],
    ['sudo updatedb', 'Rebuilds the index so new files can be found.'],
  ], ['find', 'file']),

  c('tree', 'file', 'tree -L 2 [path]', [
    ['-L', 'Limit the depth to N levels'],
    ['-a', 'Include hidden files'],
    ['-d', 'Directories only'],
    ['-I', 'Skip names matching a pattern'],
    ['-f', 'Print the full path of each entry'],
    ['-h', 'Show readable sizes'],
  ], [
    ['tree -L 2', 'Two levels deep, so the output stays readable.'],
    ["tree -I 'node_modules|.git'", 'Skips the noisy directories.'],
    ['tree -d -L 1', 'Just the top-level folders.'],
  ], ['ls', 'du', 'find']),

  c('du', 'file', 'du -sh [path]', [
    ['-s', 'One total per argument instead of every subdirectory'],
    ['-h', 'Readable sizes such as 1.2G'],
    ['-a', 'Include files, not only directories'],
    ['-d', 'Limit the depth; GNU also spells it --max-depth'],
    ['-x', 'Stay on one filesystem'],
    ['-c', 'Print a grand total at the end'],
  ], [
    ['du -sh *', 'Size of every item in this directory.'],
    ['du -h -d 1 / | sort -h', 'Top-level directories, smallest to biggest.'],
    ['du -shx /var', 'Size of /var without crossing into other mounts.'],
  ], ['df', 'ls', 'find', 'sort']),

  c('df', 'file', 'df -h', [
    ['-h', 'Readable sizes instead of blocks'],
    ['-i', 'Show inode use instead of bytes'],
    ['-k', 'Report in 1K blocks, the portable form'],
    ['-T', 'GNU: print the filesystem type. On BSD and macOS -T selects a type'],
    ['-x', 'GNU: leave out a filesystem type, as in -x tmpfs'],
  ], [
    ['df -h', 'Free space on every mounted filesystem.'],
    ['df -i', 'When space remains but writes still fail, look here.'],
    ['df -h .', 'Space on the filesystem holding this directory.'],
  ], ['du', 'mount', 'lsof']),

  c('ln', 'file', 'ln -s [target] [linkname]', [
    ['-s', 'Make a symbolic link instead of a hard link'],
    ['-f', 'Replace the target if it already exists'],
    ['-n', 'With -f, replace a symlink to a directory instead of writing inside it'],
    ['-i', 'Ask before replacing'],
    ['-v', 'Report each link created'],
  ], [
    ['ln -s /opt/app/bin/app /usr/local/bin/app', 'Puts the program on your PATH.'],
    ['ln -sfn /srv/releases/v2 /srv/current', 'Repoints a current symlink at a new release.'],
    ['ln data.csv hardlink.csv', 'A second name for the same bytes on the same filesystem.'],
  ], ['readlink', 'realpath', 'stat']),

  c('stat', 'file', 'stat [file]', [
    ['-c', 'GNU: choose the output format, as in -c %s'],
    ['-f', 'GNU: describe the filesystem. On BSD and macOS -f is the format string'],
    ['-L', 'Follow symlinks and report the target'],
    ['-x', 'BSD and macOS: verbose, labelled output'],
    ['--printf', 'GNU: like -c but adds no newline'],
  ], [
    ["stat -c '%s %n' notes.md", 'Size and name (GNU).'],
    ["stat -f '%z %N' notes.md", 'The same two values on macOS or BSD.'],
    ['stat notes.md', 'Full record: size, mode, owner and the timestamps.'],
  ], ['ls', 'touch', 'file']),

  c('file', 'file', 'file [path]', [
    ['-b', 'Print only the description, without the file name'],
    ['--mime-type', 'Print the MIME type; the short form is -i on GNU, -I on macOS'],
    ['-L', 'Follow symlinks'],
    ['-z', 'Look inside compressed files'],
    ['-s', 'Read block and character devices too'],
    ['-i', 'On BSD and macOS this means do not classify contents, not MIME'],
  ], [
    ['file screenshot', 'Says PNG image data even with no extension.'],
    ['file -b --mime-type report.pdf', 'Prints application/pdf and nothing else.'],
    ['file *', 'Types every entry in this directory.'],
  ], ['stat', 'strings', 'locate']),

  c('basename', 'file', 'basename [path] [suffix]', [
    ['-a', 'Treat every argument as its own path'],
    ['-s', 'Strip the given suffix from each result'],
    ['-z', 'GNU: end each line with NUL instead of a newline'],
  ], [
    ['basename /var/log/nginx/access.log', 'Prints access.log.'],
    ['basename report.tar.gz .gz', 'Prints report.tar.'],
    ['basename -s .md -a a.md b.md', 'Prints a and b.'],
  ], ['dirname', 'realpath']),

  c('dirname', 'file', 'dirname [path]', [
    ['-z', 'GNU: end each line with NUL instead of a newline'],
    ['--', 'Everything after this is a path, even if it starts with a dash'],
  ], [
    ['dirname /etc/nginx/nginx.conf', 'Prints /etc/nginx.'],
    ['cd "$(dirname "$0")"', 'Moves a script into its own directory.'],
  ], ['basename', 'realpath']),

  c('realpath', 'file', 'realpath [path]', [
    ['-q', 'BSD and macOS: stay quiet when a path cannot be resolved'],
    ['-e', 'GNU: fail unless every component exists'],
    ['-m', 'GNU: never fail, even if nothing exists'],
    ['-s', 'GNU: do not expand symlinks'],
    ['--relative-to', 'GNU: print the answer relative to a directory'],
  ], [
    ['realpath ../src/./index.ts', 'Prints one absolute path with dots resolved.'],
    ['realpath --relative-to=/var /var/log/nginx', 'Prints log/nginx (GNU only).'],
  ], ['readlink', 'dirname', 'pwd']),

  c('rsync', 'file', 'rsync -av [source]/ [dest]/', [
    ['-a', 'Archive: recursive, keeping permissions, times and symlinks'],
    ['-v', 'List what is transferred'],
    ['-z', 'Compress while it travels'],
    ['-P', 'Show progress and keep partial files so a transfer can resume'],
    ['--delete', 'Remove files in the destination that are gone from the source'],
    ['-n', 'Dry run: print what would happen and change nothing'],
    ['--exclude', 'Skip paths matching a pattern'],
    ['-e', 'Choose the remote shell, as in -e "ssh -p 2222"'],
  ], [
    ['rsync -avP big.iso server:/data/', 'Copies with progress, and can resume later.'],
    ['rsync -av --delete site/ /backup/site/', 'Makes the backup an exact mirror.'],
    ['rsync -avn src/ dst/', 'Dry run first; nothing is written.'],
  ], ['cp', 'scp', 'find']),


  c('mount', 'file', 'sudo mount [device] [mountpoint]', [
    ['-t', 'Filesystem type, as in -t ext4'],
    ['-o', 'Comma-separated options such as ro, rw, loop, remount'],
    ['-a', 'Mount everything listed in /etc/fstab'],
    ['-r', 'Mount read-only'],
    ['--bind', 'Linux: make an existing directory appear at a second place'],
  ], [
    ['sudo mount /dev/sdb1 /mnt', 'Attaches the partition at /mnt.'],
    ['sudo mount -o remount,rw /', 'Makes a read-only root writable again (Linux).'],
    ['mount | column -t', 'Lists what is mounted, lined up.'],
  ], ['umount', 'df', 'lsof']),

  c('umount', 'file', 'sudo umount [mountpoint]', [
    ['-l', 'Linux: detach lazily, as soon as nothing is using it'],
    ['-f', 'Force, which is what an unreachable network share needs'],
    ['-R', 'Linux: unmount everything below a path'],
    ['-a', 'Unmount everything listed in /etc/fstab'],
  ], [
    ['sudo umount /mnt', 'Detaches the filesystem.'],
    ['sudo umount -l /mnt', 'Detaches as soon as the last user is done (Linux).'],
    ['lsof +D /mnt', 'Finds what is holding it when it says target is busy.'],
  ], ['mount', 'lsof', 'df']),


  c('readlink', 'file', 'readlink -f [path]', [
    ['-f', 'Resolve every symlink and print the final absolute path'],
    ['-n', 'Do not print a trailing newline'],
    ['-e', 'GNU: like -f but fail if the path does not exist'],
    ['-m', 'GNU: like -f but never fail'],
  ], [
    ['readlink /usr/local/bin/node', 'Prints the one target the link points at.'],
    ['readlink -f "$0"', 'Resolves a script to its real location.'],
  ], ['realpath', 'ln', 'stat']),

  c('mktemp', 'file', 'mktemp [-d]', [
    ['-d', 'Create a directory instead of a file'],
    ['-t', 'Build the name from a prefix inside the temp directory'],
    ['-p', 'Choose the parent directory'],
    ['-u', 'Only print a name, create nothing. Unsafe, avoid it'],
    ['-q', 'Say nothing when it fails'],
  ], [
    ['tmp=$(mktemp)', 'A private temp file, with its path in $tmp.'],
    ['dir=$(mktemp -d)', 'A temp directory to work in.'],
    ['mktemp /tmp/build.XXXXXX', 'The trailing Xs become random characters.'],
  ], ['touch', 'truncate', 'rm']),

  /* 늘린 것 — 검색량으로 고른 넷 */

  c('sha256sum', 'file', 'sha256sum [file]', [
    ['-c', 'Read a list of hashes and check each file against it'],
    ['-b', 'Binary mode, which matters on Windows-style line endings'],
    ['--tag', 'GNU: print in the BSD format, SHA256 (file) = hash'],
    ['--ignore-missing', 'GNU: with -c, skip files that are not there'],
    ['shasum -a 256', 'The same digest where sha256sum is missing, as on older macOS'],
  ], [
    ['sha256sum ubuntu.iso', 'Prints the hash to compare with the download page.'],
    ['sha256sum -c SHA256SUMS', 'Verifies every file named in the checksum list.'],
    ['shasum -a 256 ubuntu.iso', 'The portable macOS spelling.'],
  ], ['file', 'stat', 'base64']),

  c('truncate', 'file', 'truncate -s [size] [file]', [
    ['-s', 'Set the length; a leading + or - grows or shrinks instead'],
    ['-c', 'Do not create the file if it is missing'],
    ['-r', 'Take the length from another file'],
    ['-o', 'GNU: read the size as a number of blocks'],
  ], [
    ['truncate -s 0 app.log', 'Empties a log while the program keeps writing to it.'],
    ['truncate -s 1G disk.img', 'A sparse 1 GB file, created instantly.'],
    ['truncate -s -100 data.bin', 'Cuts the last 100 bytes off.'],
  ], ['dd', 'mktemp', 'shred']),

  c('shred', 'file', 'shred -u [file]', [
    ['-u', 'Remove the file after overwriting it'],
    ['-n', 'How many overwrite passes; the default is 3'],
    ['-z', 'Finish with one pass of zeros so the shredding is not obvious'],
    ['-v', 'Show the progress of each pass'],
    ['-s', 'Shred only the first N bytes'],
  ], [
    ['shred -uvz secret.key', 'Overwrites, zeroes and then deletes.'],
    ['sudo shred -vn 1 /dev/sdb', 'One pass over a whole disk.'],
    ['rm -P secret.key', 'The nearest thing macOS ships.'],
  ], ['rm', 'dd', 'truncate']),

  /* ───────── text — 텍스트 처리 ───────── */
  c('grep', 'text', "grep -rn '[pattern]' [path]", [
    ['-i', 'Ignore case'],
    ['-r', 'Search a whole directory tree; -R also follows symlinks'],
    ['-n', 'Print the line number of each hit'],
    ['-v', 'Invert: print the lines that do not match'],
    ['-l', 'Print only the names of the files that matched'],
    ['-w', 'Match whole words only'],
    ['-E', 'Extended regex, so + ? | and () work unescaped'],
    ['-C', 'Print N lines of context around each hit'],
  ], [
    ["grep -rn 'TODO' src/", 'Every TODO in the tree, with file and line.'],
    ["grep -v '^#' nginx.conf", 'Drops the comment lines.'],
    ["ps aux | grep '[n]ginx'", 'Finds nginx without matching the grep itself.'],
  ], ['sed', 'awk', 'find', 'xargs']),

  c('sed', 'text', "sed -i 's/[old]/[new]/g' [file]", [
    ['s/a/b/g', 'Replace a with b; without the trailing g only the first per line'],
    ['-i', 'Edit in place. GNU takes -i alone, BSD and macOS need -i ""'],
    ['-E', 'Extended regex; BSD also accepts -r for GNU compatibility'],
    ['-n', 'Print nothing unless a command says to, usually with p'],
    ['-e', 'Add another expression to the script'],
    ['-f', 'Read the script from a file'],
  ], [
    ["sed -i 's/foo/bar/g' file.txt", 'Replaces every foo in place (GNU).'],
    ["sed -i '' 's/foo/bar/g' file.txt", 'The same on macOS, with the empty argument.'],
    ["sed -n '10,20p' file.txt", 'Prints only lines 10 to 20.'],
  ], ['grep', 'awk', 'tr', 'patch']),

  c('awk', 'text', "awk '{print $1}' [file]", [
    ['-F', 'Set the field separator, as in -F,'],
    ['-v', 'Pass a shell value in as an awk variable'],
    ['-f', 'Read the program from a file'],
    ['$0', 'The whole line; $1 is the first field, NF the field count'],
  ], [
    ["awk -F, '{print $2}' data.csv", 'Second column of a comma-separated file.'],
    ["awk '$3 > 100' access.log", 'Only the rows whose third field exceeds 100.'],
    ["awk '{s+=$1} END {print s}' nums.txt", 'Adds up the first column.'],
  ], ['grep', 'sed', 'cut', 'sort']),

  c('sort', 'text', 'sort -k 2 -n [file]', [
    ['-n', 'Compare as numbers, not as text'],
    ['-h', 'Compare human sizes such as 2K and 1G'],
    ['-r', 'Reverse the order'],
    ['-k', 'Sort by a field, as in -k2'],
    ['-t', 'Set the field separator'],
    ['-u', 'Drop duplicate lines'],
    ['-f', 'Ignore case'],
    ['-o', 'Write the result to a file, even back onto the input'],
  ], [
    ['du -sh * | sort -h', 'Biggest directory last.'],
    ['sort -t, -k2 -n data.csv', 'Numeric sort on the second column.'],
    ['sort -u names.txt', 'Sorted, with duplicates gone.'],
  ], ['uniq', 'comm', 'shuf', 'wc']),

  c('uniq', 'text', 'sort [file] | uniq -c', [
    ['-c', 'Prefix each line with how many times it repeated'],
    ['-d', 'Only the lines that appear more than once'],
    ['-u', 'Only the lines that appear exactly once'],
    ['-i', 'Ignore case'],
    ['-f', 'Skip the first N fields before comparing'],
  ], [
    ['sort access.log | uniq -c | sort -rn | head', 'The most repeated lines.'],
    ['uniq -d list.txt', 'Just the duplicates.'],
  ], ['sort', 'comm', 'wc']),

  c('wc', 'text', 'wc -l [file]', [
    ['-l', 'Count lines, meaning newline characters'],
    ['-w', 'Count words'],
    ['-c', 'Count bytes'],
    ['-m', 'Count characters, which differs from -c outside ASCII'],
    ['-L', 'Length of the longest line'],
  ], [
    ['wc -l *.ts', 'Line count per file plus a total.'],
    ['ls | wc -l', 'How many entries this directory holds.'],
  ], ['sort', 'uniq', 'nl']),

  c('cut', 'text', 'cut -d, -f2 [file]', [
    ['-d', 'The delimiter, exactly one character'],
    ['-f', 'Which fields to keep, as in -f1,3 or -f2-'],
    ['-c', 'Keep character positions instead of fields'],
    ['-b', 'Keep byte positions'],
    ['-s', 'Drop lines that contain no delimiter at all'],
    ['-w', 'BSD and macOS: use runs of whitespace as the delimiter'],
    ['--complement', 'GNU: keep everything except the selection'],
  ], [
    ['cut -d: -f1 /etc/passwd', 'Every user name.'],
    ['cut -c1-8 access.log', 'The first eight characters of each line.'],
    ['cut -d, -f2- data.csv', 'Everything from the second column on.'],
  ], ['awk', 'paste', 'column']),

  c('paste', 'text', 'paste [file1] [file2]', [
    ['-d', 'Which characters to put between the columns, used in turn'],
    ['-s', 'Put all lines of a file onto one line'],
    ['-', 'Read standard input, once for each column you want'],
  ], [
    ['paste names.txt scores.txt', 'The two files side by side, tab separated.'],
    ['paste -sd, list.txt', 'Turns a list of lines into one comma-separated line.'],
    ['paste - - < pairs.txt', 'Folds every two lines into one.'],
  ], ['join', 'cut', 'column']),

  c('tr', 'text', "tr '[set1]' '[set2]'", [
    ['-d', 'Delete every character in the set'],
    ['-s', 'Squeeze repeats of a character into one'],
    ['-c', 'Use the complement of the set'],
    ['-cd', 'Delete everything that is not in the set'],
  ], [
    ["tr 'a-z' 'A-Z' < notes.txt", 'Uppercases everything.'],
    ["tr -d '\\r' < win.txt > unix.txt", 'Strips CR, turning CRLF endings into LF.'],
    ["tr -s ' ' < spaced.txt", 'Collapses runs of spaces into one.'],
  ], ['sed', 'iconv', 'expand']),

  c('join', 'text', 'join -1 1 -2 1 [file1] [file2]', [
    ['-1', 'Which field to use in the first file'],
    ['-2', 'Which field to use in the second file'],
    ['-t', 'The field separator, as in -t,'],
    ['-a', 'Also print unpaired lines from that file, an outer join'],
    ['-v', 'Print only the unpaired lines from that file'],
    ['-e', 'Fill missing fields with this string'],
    ['-o', 'Choose which fields the output holds'],
  ], [
    ['join -t, -1 1 -2 1 a.csv b.csv', 'Inner join on the first column.'],
    ['join -a1 left.txt right.txt', 'Keeps the unmatched lines from the left file.'],
  ], ['comm', 'paste', 'sort']),

  c('comm', 'text', 'comm -12 [file1] [file2]', [
    ['-1', 'Hide column 1, the lines only in the first file'],
    ['-2', 'Hide column 2, the lines only in the second file'],
    ['-3', 'Hide column 3, the lines in both'],
    ['-i', 'Compare without regard to case'],
    ['--check-order', 'GNU: stop when the input is not sorted'],
  ], [
    ['comm -12 a.txt b.txt', 'Only the lines both files share.'],
    ['comm -23 a.txt b.txt', 'Only the lines the first file has.'],
    ['comm -13 <(sort a.txt) <(sort b.txt)', 'Only the lines the second file added (bash).'],
  ], ['diff', 'join', 'sort', 'uniq']),

  c('diff', 'text', 'diff -u [old] [new]', [
    ['-u', 'Unified output, the format patch and code review expect'],
    ['-r', 'Compare two directory trees'],
    ['-q', 'Only say whether the files differ'],
    ['-w', 'Ignore all whitespace'],
    ['-i', 'Ignore case'],
    ['-N', 'Treat a missing file as empty, which patches need'],
  ], [
    ['diff -u old.conf new.conf > fix.patch', 'Writes a patch file.'],
    ['diff -rq dirA dirB', 'Lists which files differ between two trees.'],
    ['diff <(sort a.txt) <(sort b.txt)', 'Compares two files ignoring line order (bash).'],
  ], ['patch', 'comm', 'sed']),

  c('patch', 'text', 'patch -p1 < [file.patch]', [
    ['-pN', 'Strip N leading path components; git diffs need -p1'],
    ['-R', 'Apply the patch backwards to undo it'],
    ['--dry-run', 'Test whether it applies and change nothing'],
    ['-i', 'Read the patch from a file instead of standard input'],
    ['-b', 'Keep a backup of every file it changes'],
  ], [
    ['patch -p1 < fix.patch', 'Applies a git-style patch from the repo root.'],
    ['patch -p1 -R < fix.patch', 'Undoes it again.'],
    ['patch -p1 --dry-run < fix.patch', 'Checks it applies cleanly first.'],
  ], ['diff', 'sed']),

  c('tee', 'text', '[cmd] | tee [file]', [
    ['-a', 'Append to the file instead of overwriting it'],
    ['-i', 'Ignore Ctrl-C while the pipe runs'],
    ['-p', 'GNU: report errors when writing to a pipe'],
  ], [
    ['make 2>&1 | tee build.log', 'Watch the build and keep a copy.'],
    ["echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf", 'Appends to a root-owned file, which > cannot do.'],
    ['curl -s api | tee raw.json | jq .name', 'Keeps the raw body and reads one field.'],
  ], ['sudo', 'xargs', 'jq']),

  c('xargs', 'text', '[cmd] | xargs [cmd2]', [
    ['-n', 'How many arguments to hand over per run'],
    ['-I', 'Put the argument where a placeholder such as {} sits'],
    ['-0', 'Read NUL-separated input, to pair with find -print0'],
    ['-P', 'Run that many copies at once'],
    ['-r', 'Do not run the command at all on empty input'],
    ['-t', 'Print each command before running it'],
  ], [
    ["find . -name '*.log' -print0 | xargs -0 rm", 'Deletes them even when names hold spaces.'],
    ['xargs -n1 -P4 curl -O < urls.txt', 'Four downloads at a time.'],
    ['ls *.txt | xargs -I{} mv {} old/{}', 'Uses {} where the file name goes.'],
  ], ['find', 'tee', 'grep']),

  c('echo', 'text', 'echo [text]', [
    ['-n', 'Leave off the trailing newline'],
    ['-e', 'Read backslash escapes such as \\n. Not in every shell'],
    ['-E', 'Do not read escapes, which is the usual default'],
  ], [
    ['echo -n done', 'Leaves the cursor on the same line.'],
    ['echo "$PATH"', 'Prints a variable; the quotes keep spaces intact.'],
    ['echo *', 'The shell expands this to the file names, not echo.'],
  ], ['printf', 'tee', 'cat']),

  c('printf', 'text', "printf '[format]' [args]", [
    ['%s', 'Insert a string'],
    ['%d', 'Insert a whole number'],
    ['%.2f', 'A number with exactly two decimals'],
    ['%-10s', 'A string padded to ten columns, left aligned'],
    ['\\n', 'A newline; printf never adds one for you'],
  ], [
    ["printf '%s\\t%d\\n' apple 5", 'One tab-separated line.'],
    ["printf '%.2f\\n' 3.14159", 'Rounds to two decimals.'],
    ["printf '%s\\n' a b c", 'The format repeats, so this prints three lines.'],
  ], ['echo', 'column', 'awk']),

  c('jq', 'text', "jq '[filter]' [file.json]", [
    ['-r', 'Raw output, so strings come out without quotes'],
    ['-c', 'One compact line per result'],
    ['-e', 'Set the exit status from the result, for scripts'],
    ['--arg', 'Pass a shell string in as a jq variable'],
    ['-s', 'Slurp the whole input into one array'],
    ['-n', 'Start from null input and build output yourself'],
  ], [
    ["curl -s api/users | jq -r '.[].name'", 'Every name, unquoted, one per line.'],
    ["jq '.items | length' data.json", 'Counts the entries in an array.'],
    ["jq -c '.[] | {id, name}' big.json", 'Two fields per row, compact.'],
  ], ['grep', 'tee', 'column']),

  c('column', 'text', 'column -t [file]', [
    ['-t', 'Work out the columns and line them up as a table'],
    ['-s', 'Which characters separate the input columns, with -t'],
    ['-x', 'Fill columns before rows'],
    ['-c', 'Format for a display this many characters wide'],
    ['-o', 'util-linux: what to put between the output columns'],
  ], [
    ['mount | column -t', 'Lines the mount table up.'],
    ['column -t -s, data.csv', 'Reads a CSV into aligned columns.'],
    ['ls | column -x', 'Prints the listing in columns across the screen.'],
  ], ['cut', 'paste', 'printf']),

  c('fold', 'text', 'fold -w 80 [file]', [
    ['-w', 'Wrap at this width; the default is 80'],
    ['-s', 'Break at spaces instead of mid-word'],
    ['-b', 'Count bytes rather than display columns'],
  ], [
    ['fold -w 72 -s letter.txt', 'Wraps prose at 72 columns on word boundaries.'],
    ['fold -w 1 word.txt', 'One character per line.'],
  ], ['expand', 'column', 'tr']),

  c('nl', 'text', 'nl [file]', [
    ['-b a', 'Number every line; -b t, the default, skips the blank ones'],
    ['-w', 'How wide the number field is'],
    ['-s', 'What goes between the number and the line'],
    ['-v', 'The first number to use'],
    ['-i', 'How much to add per line'],
  ], [
    ['nl -ba script.sh', 'Numbers every line, blank ones included.'],
    ["nl -w1 -s': ' notes.txt", 'Compact numbering with a colon.'],
  ], ['cat', 'wc', 'sed']),

  c('rev', 'text', 'rev [file]', [
    ['none', 'rev has no options; pipe it through cut or paste instead'],
  ], [
    ['echo hello | rev', 'Prints olleh.'],
    ['rev paths.txt | cut -d/ -f1 | rev', 'Grabs the last slash-separated field.'],
  ], ['tac', 'cut', 'tr']),

  c('split', 'text', 'split -l 1000 [file] [prefix]', [
    ['-l', 'How many lines per output file'],
    ['-b', 'How many bytes per file, with suffixes such as 50M'],
    ['-n', 'Cut into this many roughly equal pieces'],
    ['-d', 'Number the pieces instead of naming them aa, ab'],
    ['-a', 'How many characters the suffix has'],
    ['--additional-suffix', 'GNU: give every piece an extension'],
  ], [
    ['split -l 1000 big.csv part_', 'Files part_aa, part_ab, 1000 lines each.'],
    ['split -b 50M archive.tar chunk_', 'Pieces of 50 MB.'],
    ['cat chunk_* > archive.tar', 'Puts the pieces back together.'],
  ], ['csplit', 'head', 'cat']),

  c('csplit', 'text', "csplit [file] '/[pattern]/' '{*}'", [
    ['-f', 'Prefix for the output names; the default is xx'],
    ['-n', 'How many digits the number has'],
    ['-k', 'Keep the files already written if it fails partway'],
    ['-s', 'Do not print the byte count of each piece'],
    ['-z', 'GNU: throw away pieces that came out empty'],
    ['{*}', 'Repeat the pattern as many times as it matches'],
  ], [
    ["csplit -z -f part_ log.txt '/^ERROR/' '{*}'", 'A new file at every ERROR line.'],
    ['csplit book.txt 100 200', 'Splits at lines 100 and 200.'],
  ], ['split', 'grep', 'awk']),

  c('expand', 'text', 'expand -t 4 [file]', [
    ['-t', 'Tab width, or a comma-separated list of tab stops'],
    ['-i', 'GNU: convert only the tabs at the start of a line'],
    ['unexpand -a', 'The reverse: turn runs of spaces back into tabs'],
  ], [
    ['expand -t 2 old.py', 'Turns each tab into two spaces.'],
    ['unexpand -a -t 4 file.txt', 'Turns every four spaces back into a tab.'],
  ], ['fold', 'tr', 'column']),

  c('shuf', 'text', 'shuf [file]', [
    ['-n', 'Print only N lines'],
    ['-e', 'Treat the arguments themselves as the lines'],
    ['-i', 'Draw from a number range, as in -i 1-100'],
    ['-r', 'Allow the same line to come out more than once'],
    ['-o', 'Write to a file instead of standard output'],
    ['--random-source', 'Use a fixed source so the shuffle can be repeated'],
  ], [
    ['shuf -n 1 names.txt', 'Picks one line at random.'],
    ['shuf -i 1-49 -n 6', 'Six different numbers between 1 and 49.'],
    ['sort -R names.txt', 'The nearest thing on a machine without shuf.'],
  ], ['sort', 'head', 'tac']),

  c('tac', 'text', 'tac [file]', [
    ['-s', 'Use another separator instead of the newline'],
    ['-r', 'Read the separator as a regular expression'],
    ['-b', 'Put the separator before each record rather than after'],
  ], [
    ['tac access.log | head', 'The newest lines first.'],
    ['tail -r access.log', 'The macOS equivalent.'],
  ], ['tail', 'rev', 'sort']),

  c('strings', 'text', 'strings [file]', [
    ['-n', 'Report only runs of at least N characters; the default is 4'],
    ['-t', 'Print the offset in the file, as d, o or x'],
    ['-a', 'Scan the whole file, not only the loaded sections'],
    ['-o', 'BSD and macOS: prefix each hit with its decimal offset'],
    ['-e', 'GNU: set the encoding, such as l for 16-bit little-endian'],
  ], [
    ['strings app.bin | grep -i version', 'Finds a version string inside a binary.'],
    ['strings -n 8 core.dump', 'Only sequences of eight characters or more.'],
  ], ['file', 'grep', 'iconv']),

  c('iconv', 'text', 'iconv -f [from] -t [to] [file]', [
    ['-f', 'The encoding the input is in'],
    ['-t', 'The encoding you want out'],
    ['-l', 'List every encoding name this build knows'],
    ['-c', 'Drop the characters that cannot be converted'],
    ['//TRANSLIT', 'GNU: append to the target to swap unmappable letters for lookalikes'],
  ], [
    ['iconv -f EUC-KR -t UTF-8 old.csv > new.csv', 'Fixes a legacy Korean CSV.'],
    ['iconv -f UTF-8 -t ASCII//TRANSLIT text.txt', 'Turns accented letters into plain ones (GNU).'],
    ['iconv -l | grep -i 1252', 'Checks that an encoding name is spelled right.'],
  ], ['tr', 'file', 'strings']),

  /* 늘린 것 — 검색량으로 고른 셋 */
  c('vim', 'text', 'vim [file]', [
    [':wq', 'Write the file and quit; :x does the same'],
    [':q!', 'Quit and throw every change away'],
    ['i', 'Enter insert mode; Esc goes back to normal mode'],
    ['dd', 'Delete the current line; u undoes the last change'],
    ['/word', 'Search forward; n jumps to the next hit'],
    [':%s/old/new/g', 'Replace throughout the file'],
    ['-R', 'Open read-only so you cannot save by accident'],
  ], [
    ['vim +100 config.yml', 'Opens at line 100.'],
    ['vim -d a.txt b.txt', 'Opens the two files side by side as a diff.'],
    ['vim -R big.log', 'Reads a log without any risk of writing to it.'],
  ], ['nano', 'less', 'sed']),

  c('nano', 'text', 'nano [file]', [
    ['Ctrl-O', 'Write the file out; the caret in ^O means Ctrl'],
    ['Ctrl-X', 'Leave nano, offering to save first'],
    ['Ctrl-W', 'Search; Alt-W repeats the search'],
    ['-w', 'Do not wrap long lines, which config files need'],
    ['-B', 'Keep a backup of the file as it was'],
    ['+N', 'Open with the cursor on line N'],
    ['--linenumbers', 'Show line numbers (nano 4.0 and later)'],
  ], [
    ['sudo nano /etc/hosts', 'Ctrl-O to write, Ctrl-X to leave.'],
    ['nano -w /etc/nginx/nginx.conf', 'No line wrapping, so directives stay on one line.'],
    ['nano +25 deploy.sh', 'Opens at line 25.'],
  ], ['vim', 'cat', 'less']),

  c('base64', 'text', 'base64 [file]', [
    ['-d', 'Decode. GNU and recent macOS take -d; older macOS needs -D'],
    ['-w', 'GNU: wrap at N columns, and -w0 keeps it on one line'],
    ['-i', 'GNU: ignore junk while decoding. On macOS -i names the input file'],
    ['-o', 'BSD and macOS: write to this file'],
    ['-b', 'BSD and macOS: wrap the encoded output at N characters'],
  ], [
    ['base64 -w0 cert.pem', 'One long line, no wrapping (GNU).'],
    ['echo aGVsbG8= | base64 -d', 'Decodes back to hello.'],
    ['base64 -i photo.png -o photo.txt', 'Encoding into a file on macOS.'],
  ], ['iconv', 'sha256sum', 'tr']),

  /* ───────── perm — 권한과 소유 ───────── */
  c('chmod', 'perm', 'chmod 755 [path]', [
    ['0755', 'Numeric: owner, group, others, each read 4 + write 2 + execute 1'],
    ['u+w', 'Symbolic: who (u g o a), then + - =, then r w x'],
    ['+x', 'Add the execute bit, the usual fix for a script'],
    ['-R', 'Apply to a whole tree'],
    ['+X', 'Execute for directories only, never for plain files'],
    ['-v', 'Name each file whose mode changed'],
    ['-h', 'BSD and macOS: change the symlink itself, not its target'],
  ], [
    ['chmod +x deploy.sh', 'Makes the script runnable.'],
    ['chmod -R u+rwX,go+rX,go-w site/', 'Capital X keeps files non-executable.'],
    ['chmod 600 ~/.ssh/id_ed25519', 'What ssh insists on for a private key.'],
  ], ['umask', 'chown', 'setfacl', 'ls']),

  c('chown', 'perm', 'sudo chown [user]:[group] [path]', [
    ['user:group', 'Set owner and group at once; :group alone sets only the group'],
    ['-R', 'Apply to a whole tree'],
    ['-h', 'Change the symlink itself, not what it points at'],
    ['-v', 'Name each file as it changes'],
    ['--reference', 'GNU: copy owner and group from another file'],
  ], [
    ['sudo chown -R www-data:www-data /var/www', 'Hands the web root to the server user.'],
    ['sudo chown :staff report.pdf', 'Changes only the group.'],
    ['sudo chown -R $USER ~/.npm', 'Takes back a directory root created for you.'],
  ], ['chgrp', 'chmod', 'id', 'sudo']),

  c('chgrp', 'perm', 'chgrp [group] [path]', [
    ['-R', 'Apply to a whole tree'],
    ['-h', 'Change the symlink itself'],
    ['-v', 'Report each change'],
    ['--reference', 'GNU: take the group from another file'],
  ], [
    ['chgrp -R developers /srv/project', 'Whole tree over to the developers group.'],
    ['chgrp staff notes.txt', 'Works only if you belong to staff.'],
  ], ['chown', 'groups', 'chmod']),

  c('umask', 'perm', 'umask 022', [
    ['022', 'The bits to withhold: files become 644, directories 755'],
    ['077', 'Nothing for group or others: files 600, directories 700'],
    ['-S', 'Show the mask as u=rwx,g=rx,o=rx instead of a number'],
    ['-p', 'Print it in a form a script can reuse'],
  ], [
    ['umask', 'Prints the current mask, usually 022.'],
    ['umask 077', 'New files become readable by you alone.'],
    ['umask -S', 'The same mask in symbolic form.'],
  ], ['chmod', 'mkdir', 'touch']),

  c('sudo', 'perm', 'sudo [cmd]', [
    ['-u', 'Run as another user instead of root'],
    ['-i', 'Start a login shell with that user environment'],
    ['-s', 'Start a shell but keep your own environment'],
    ['-E', 'Keep your environment variables, if the policy allows it'],
    ['-k', 'Forget the cached password right now'],
    ['-l', 'List what you are allowed to run'],
    ['-v', 'Refresh the timestamp without running anything'],
  ], [
    ['sudo -u postgres psql', 'Runs the client as the postgres user.'],
    ['sudo -i', 'A root login shell, with root PATH and environment.'],
    ['echo text | sudo tee -a /etc/hosts', 'Redirection needs tee, because > runs as you.'],
  ], ['su', 'visudo', 'id', 'tee']),

  c('su', 'perm', 'su - [user]', [
    ['-', 'A login shell: take that user environment, PATH and home'],
    ['-l', 'The same as the bare dash'],
    ['-m', 'Keep your own environment instead'],
    ['-c', 'Linux: run one command and exit. macOS su has no -c'],
    ['-s', 'Linux: use another shell'],
  ], [
    ['su - deploy', 'Becomes deploy, with the deploy environment.'],
    ['su -', 'A root shell, if the root password is set at all.'],
    ['sudo -i', 'What to use instead where the root account is locked.'],
  ], ['sudo', 'id', 'whoami', 'passwd']),

  c('id', 'perm', 'id [user]', [
    ['-u', 'The numeric user id only; 0 means root'],
    ['-g', 'The primary group id'],
    ['-G', 'Every group id the user is in'],
    ['-n', 'Names instead of numbers, with -u, -g or -G'],
    ['-r', 'The real id rather than the effective one'],
  ], [
    ['id', 'Your uid, gid and every group at once.'],
    ['id -u', 'Just the number, which scripts test against 0.'],
    ['id -nG deploy', 'The group names of another user.'],
  ], ['groups', 'whoami', 'chown']),

  c('groups', 'perm', 'groups [user]', [
    ['none', 'groups takes no options; id -nG prints the same list'],
  ], [
    ['groups', 'Every group you belong to.'],
    ['groups www-data', 'The groups of another user.'],
  ], ['id', 'chgrp', 'whoami']),

  c('whoami', 'perm', 'whoami', [
    ['none', 'whoami takes no options; it is the same as id -un'],
  ], [
    ['whoami', 'The effective user name.'],
    ['sudo whoami', 'Prints root, which is how you check sudo works.'],
  ], ['id', 'su', 'sudo']),

  c('passwd', 'perm', 'passwd [user]', [
    ['-S', 'Linux: show the status of the account'],
    ['-l', 'Linux: lock the account so the password cannot be used'],
    ['-u', 'Linux: unlock it again'],
    ['-e', 'Linux: expire the password so it must change at next login'],
    ['-d', 'Linux: delete the password outright, which is dangerous'],
  ], [
    ['passwd', 'Changes your own password; it asks for the old one first.'],
    ['sudo passwd deploy', 'Sets another user password without knowing the old one.'],
    ['sudo passwd -l olduser', 'Locks the account.'],
  ], ['su', 'sudo', 'id']),

  c('getfacl', 'perm', 'getfacl [path]', [
    ['-R', 'Walk a whole tree'],
    ['-d', 'Show the default ACL that new files will inherit'],
    ['-a', 'Show only the ACL of the file itself'],
    ['--omit-header', 'Leave out the three comment lines'],
    ['-e', 'Print the effective rights after the mask is applied'],
  ], [
    ['getfacl report.pdf', 'The ACL plus the ordinary owner and group bits.'],
    ['getfacl dir | setfacl --set-file=- other_dir', 'Copies one ACL onto another directory.'],
    ['ls -le report.pdf', 'How macOS shows its own kind of ACL instead.'],
  ], ['setfacl', 'chmod', 'ls']),

  c('setfacl', 'perm', 'sudo setfacl -m u:[user]:rwx [path]', [
    ['-m', 'Add or change an entry, as in -m u:jenkins:rx'],
    ['-x', 'Remove one entry'],
    ['-b', 'Remove every ACL entry'],
    ['-R', 'Apply to a whole tree'],
    ['-d', 'Work on the default ACL, which new files inherit'],
    ['--set', 'Replace the entire ACL in one go'],
  ], [
    ['setfacl -m u:jenkins:rx /srv/app', 'Gives one extra user read and execute.'],
    ['setfacl -R -d -m g:devs:rwX /srv/shared', 'New files inherit rights for the devs group.'],
    ['setfacl -b report.pdf', 'Strips the ACL back to plain permission bits.'],
  ], ['getfacl', 'chmod', 'chown']),

  /* 늘린 것 — 검색량으로 고른 셋 */
  c('chattr', 'perm', 'sudo chattr +i [file]', [
    ['+i', 'Immutable: not even root may change or delete it until -i'],
    ['-i', 'Clear the immutable flag so the file can be edited again'],
    ['+a', 'Append only, which suits a log file'],
    ['+A', 'Do not update the access time on reads'],
    ['-R', 'Apply through a whole tree'],
    ['lsattr', 'The companion command that shows which flags are set'],
  ], [
    ['sudo chattr +i /etc/resolv.conf', 'Stops anything from overwriting the file.'],
    ['lsattr /etc/resolv.conf', 'Shows the i in the flag list.'],
    ['sudo chattr -i /etc/resolv.conf', 'Removes it again so you can edit.'],
  ], ['chmod', 'setfacl', 'xattr']),

  c('xattr', 'perm', 'xattr -l [file]', [
    ['-l', 'List the attributes with their values'],
    ['-p', 'Print one named attribute'],
    ['-w', 'Write one named attribute'],
    ['-d', 'Delete one named attribute'],
    ['-c', 'Clear every attribute on the file'],
    ['-r', 'Work through a directory recursively'],
  ], [
    ['xattr -l installer.dmg', 'Shows com.apple.quarantine on anything downloaded.'],
    ['xattr -d com.apple.quarantine /Applications/App.app', 'Clears the flag behind the damaged app warning.'],
    ['xattr -cr ./MyApp.app', 'Strips every attribute through the whole bundle.'],
  ], ['chattr', 'getfacl', 'stat']),

  c('visudo', 'perm', 'sudo visudo', [
    ['-c', 'Check the syntax of the current file and exit'],
    ['-f', 'Edit another sudoers file, such as one under /etc/sudoers.d'],
    ['-s', 'Check strictly, refusing anything questionable'],
    ['EDITOR=', 'Set it in front to choose the editor, as in EDITOR=nano'],
  ], [
    ['sudo visudo -c', 'Checks sudoers for syntax errors.'],
    ['sudo visudo -f /etc/sudoers.d/deploy', 'Edits a drop-in file rather than the main one.'],
    ['sudo EDITOR=nano visudo', 'Uses nano instead of vi.'],
  ], ['sudo', 'su', 'nano']),
];
