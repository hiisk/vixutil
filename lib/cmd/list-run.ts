/**
 * 터미널 명령 78개 — 프로세스·시스템(proc), 네트워크(net), 압축·전송(archive).
 *
 * 명령 이름과 옵션 문자는 프로그램이 정한 것이라 언어를 가리지 않는다. `ls`는
 * 어느 나라 터미널에서도 `ls`이고 `-la`는 `-la`다. 옮길 것은 "이 명령이 무엇을
 * 하고 사람들이 무엇을 틀리는가" 한 줄뿐이고, 그것만 desc-run.ts에 열 언어로 둔다.
 *
 * usage·flags·examples는 화면에 그대로 붙는 글자라 ASCII로만 적는다. 자리표는
 * `<pid>`·`[FILE]`처럼 영어로 두어 열 언어 어디에 놓아도 같게 보이게 한다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 실제로 있는 명령과 실제로 맞는 옵션만 싣는다. 참고 페이지에서 틀린 옵션은
 * 없는 옵션보다 나쁘다. GNU와 BSD/macOS가 갈리는 자리(`ps aux`와 `ps -ef`,
 * `fuser -k`가 Linux에만 있는 것, `timeout`이 macOS에 없는 것)는 옵션 설명이나
 * 낱줄 설명에 어느 쪽 것인지 적는다.
 *
 * 지운 것: `hostname -I`는 명령이 아니라 hostname의 옵션이라 hostname 한 장에
 * 합쳤고, 그 자리에 ssh-copy-id를 넣었다. `rsync-remote`라는 명령은 없어서 원격
 * 복사의 기본인 scp로 바꿨다.
 */
import type { CmdCategory, CmdItem } from './types.ts';

const c = (
  slug: string,
  name: string,
  category: CmdCategory,
  usage: string,
  flags: [string, string][],
  examples: [string, string][],
  see?: string[],
): CmdItem => ({
  slug,
  name,
  category,
  usage,
  flags: flags.map(([flag, en]) => ({ flag, en })),
  examples: examples.map(([cmd, en]) => ({ cmd, en })),
  ...(see ? { see } : {}),
});

export const CMD_RUN: CmdItem[] = [
  /* ═════════ proc — 프로세스·시스템 (36) ═════════ */

  c('ps', 'ps', 'proc', 'ps aux | ps -ef', [
    ['aux', 'BSD form (no dash): every process of every user, including those with no terminal. Works on Linux and macOS.'],
    ['-ef', 'POSIX form: the same list with the parent PID and the full command line.'],
    ['-p <pid>', 'Show one process only.'],
    ['-u <user>', 'Only the processes of that user.'],
    ['-o pid,ppid,%cpu,%mem,comm', 'Choose exactly which columns to print.'],
    ['--sort=-%cpu', 'Sort by CPU, highest first. GNU procps only; macOS ps has no --sort.'],
  ], [
    ['ps aux | grep -i nginx', 'Find the nginx processes and their PIDs.'],
    ['ps -eo pid,%mem,comm --sort=-%mem | head', 'The ten processes using the most memory (Linux).'],
    ['ps -p 1234 -o etime=', 'How long PID 1234 has been running, with no header.'],
  ], ['top', 'pgrep', 'kill']),

  c('top', 'top', 'proc', 'top', [
    ['-b -n 1', 'Batch mode, one refresh, then exit: safe to pipe or log (Linux).'],
    ['-p <pid>', 'Watch a single process (Linux).'],
    ['-u <user>', "Only one user's processes (Linux)."],
    ['-o cpu', 'Sort by CPU on macOS; -o mem sorts by memory.'],
    ['-l 1', 'One sample and exit on macOS (the equivalent of -b -n 1).'],
    ['P / M / k / q', 'Keys inside Linux top: sort by CPU, sort by memory, kill a PID, quit.'],
  ], [
    ['top -b -n 1 | head -20', 'A snapshot of the busiest processes, printable into a log (Linux).'],
    ['top -o mem', 'Live list sorted by memory use (macOS).'],
    ['top -p 1234', 'Follow one process only (Linux).'],
  ], ['htop', 'ps', 'uptime']),

  c('htop', 'htop', 'proc', 'htop', [
    ['-u <user>', "Start filtered to one user's processes."],
    ['-p <pid>[,<pid>]', 'Show only these PIDs.'],
    ['-t', 'Start in tree view, children under their parent.'],
    ['-d 10', 'Refresh delay in tenths of a second, so 10 means one second.'],
    ['F4 / F5 / F6 / F9', 'Keys inside htop: filter, tree, sort column, send a signal.'],
  ], [
    ['htop -u www-data', 'Watch only the web server processes.'],
    ['htop -t', 'Open in tree view to see which process spawned which.'],
  ], ['top', 'ps', 'kill']),

  c('kill', 'kill', 'proc', 'kill [-SIGNAL] <pid>', [
    ['-15 / -TERM', 'The default: ask the process to shut down so it can clean up.'],
    ['-9 / -KILL', 'Cannot be caught or ignored. The process dies immediately with no cleanup.'],
    ['-1 / -HUP', 'Traditionally means "reload your configuration" for daemons.'],
    ['-0', 'Send nothing; just test whether the PID exists and you may signal it.'],
    ['-l', 'List the signal names and numbers on this system.'],
  ], [
    ['kill 1234', 'Politely ask PID 1234 to exit.'],
    ['kill -9 1234', 'Force it out after the polite attempt did nothing.'],
    ['kill -HUP $(pgrep -o nginx)', 'Tell the nginx master process to reload its config.'],
  ], ['pkill', 'killall', 'lsof']),

  c('killall', 'killall', 'proc', 'killall [-SIGNAL] <name>', [
    ['-9', 'Force, with no chance for the process to clean up.'],
    ['-i', 'Ask for confirmation before each kill (Linux).'],
    ['-u <user>', 'Only the processes of that user with this name.'],
    ['-e', 'Require an exact match for names longer than 15 characters (Linux).'],
    ['-w', 'Wait until the processes are really gone (Linux).'],
    ['-m <pattern>', 'Treat the argument as a regular expression (macOS/BSD).'],
  ], [
    ['killall node', 'Stop every process whose executable is named node.'],
    ['killall -9 Dock', 'Force-restart the macOS Dock, which relaunches itself.'],
  ], ['pkill', 'kill', 'pgrep']),

  c('pkill', 'pkill', 'proc', 'pkill [-SIGNAL] [-f] <pattern>', [
    ['-f', 'Match against the whole command line, not just the process name.'],
    ['-u <user>', 'Restrict to one user.'],
    ['-x', 'Require the whole name to match, not a substring.'],
    ['-n / -o', 'Only the newest / only the oldest matching process.'],
    ['-9', 'Force instead of asking the process to exit.'],
    ['-i', 'Case-insensitive matching.'],
  ], [
    ['pgrep -af "node server.js" && pkill -f "node server.js"', 'Look first, then kill exactly what you saw.'],
    ['pkill -u deploy -f gunicorn', "Stop the deploy user's gunicorn workers."],
  ], ['pgrep', 'kill', 'killall']),

  c('pgrep', 'pgrep', 'proc', 'pgrep [-f] <pattern>', [
    ['-f', 'Match the full command line, so arguments count too.'],
    ['-a', 'Print the command line next to the PID (Linux).'],
    ['-l', 'Print the process name next to the PID.'],
    ['-x', 'Exact name match only.'],
    ['-u <user>', 'Restrict to one user.'],
    ['-c', 'Print how many matched instead of the PIDs.'],
    ['-n / -o', 'Newest / oldest match only.'],
  ], [
    ['pgrep -af node', 'Every node process with its full command line.'],
    ['pgrep -x sshd', 'The PID of sshd itself, not of anything merely mentioning ssh.'],
    ['kill $(pgrep -f "celery worker")', 'Stop the processes the pattern found.'],
  ], ['pkill', 'ps', 'lsof']),

  c('jobs', 'jobs', 'proc', 'jobs [-l]', [
    ['-l', 'Include the PID of each job.'],
    ['-p', 'Print only PIDs, handy for piping into kill.'],
    ['-r', 'Running jobs only.'],
    ['-s', 'Stopped jobs only.'],
  ], [
    ['jobs -l', 'List the background jobs of this shell with their PIDs.'],
    ['kill %1', 'Stop job number 1 as shown by jobs.'],
  ], ['bg', 'fg', 'nohup']),

  c('bg', 'bg', 'proc', 'bg [%<job>]', [
    ['%1', 'Resume job number 1 in the background.'],
    ['%% or %+', 'The current job, which is what bg uses when given no argument.'],
    ['%-', 'The previous job.'],
    ['%make', 'The job whose command line starts with make.'],
  ], [
    ['bg', 'Resume the job you just stopped with Ctrl+Z, in the background.'],
    ['bg %2', 'Resume job 2 in the background while you keep using the shell.'],
  ], ['fg', 'jobs', 'nohup']),

  c('fg', 'fg', 'proc', 'fg [%<job>]', [
    ['%1', 'Bring job number 1 to the foreground.'],
    ['%% or %+', 'The current job, the default when no argument is given.'],
    ['%-', 'The previous job.'],
    ['%vim', 'The job whose command line starts with vim.'],
  ], [
    ['fg', 'Bring the most recent background job back to the terminal.'],
    ['jobs -l && fg %2', 'See the list, then pull job 2 forward.'],
  ], ['bg', 'jobs']),

  c('nohup', 'nohup', 'proc', 'nohup <command> [args] &', [
    ['&', 'You add this yourself: nohup alone does not put the command in the background.'],
    ['> out.log 2>&1', 'Send output somewhere other than the default ./nohup.out.'],
    ['< /dev/null', 'Detach stdin as well, so the command cannot stall waiting for input.'],
  ], [
    ['nohup ./server.sh > server.log 2>&1 &', 'Start the server so it survives logout, with its own log file.'],
    ['nohup make -j4 &', 'Run a long build that keeps going after you disconnect; output lands in nohup.out.'],
  ], ['jobs', 'bg', 'systemctl']),

  c('nice', 'nice', 'proc', 'nice -n <19..-20> <command>', [
    ['-n 19', 'Lowest priority: yields the CPU to everything else.'],
    ['-n 10', 'What you get if you run nice with no -n at all.'],
    ['-n -5', 'Higher priority than normal. Negative values need root.'],
  ], [
    ['nice -n 19 tar -czf backup.tar.gz /data', 'Compress a big directory without slowing down the rest of the machine.'],
    ['sudo nice -n -5 ./latency-sensitive', 'Give a process more CPU priority than normal.'],
  ], ['renice', 'top', 'ps']),

  c('renice', 'renice', 'proc', 'renice -n <priority> -p <pid>', [
    ['-n <value>', 'The new niceness, from 19 (nicest) to -20 (greediest).'],
    ['-p <pid>', 'Apply it to a process ID.'],
    ['-u <user>', "Apply it to all of a user's processes."],
    ['-g <pgid>', 'Apply it to a process group.'],
  ], [
    ['renice -n 10 -p 1234', 'Make a running job nicer so it stops hogging the CPU.'],
    ['sudo renice -n -5 -p $(pgrep -x mysqld)', 'Give the database more priority than everything else.'],
  ], ['nice', 'top', 'ps']),

  c('systemctl', 'systemctl', 'proc', 'systemctl <verb> <unit>', [
    ['status <unit>', 'Whether it is running, its PID, and the last log lines.'],
    ['start / stop / restart', 'Act on the service now, without changing boot behaviour.'],
    ['reload', 'Re-read the config without dropping connections, if the service supports it.'],
    ['enable --now <unit>', 'Start it now and also start it at every boot.'],
    ['daemon-reload', 'Required after you edit a .service file, before restarting it.'],
    ['list-units --failed', 'Everything that failed to start.'],
    ['--user', 'Act on your own user units instead of the system ones.'],
  ], [
    ['sudo systemctl restart nginx', 'Restart the web server.'],
    ['systemctl status sshd --no-pager', 'Print the state and recent log lines without opening a pager.'],
    ['sudo systemctl enable --now docker', 'Start Docker and make it come back after a reboot.'],
  ], ['journalctl', 'service']),

  c('journalctl', 'journalctl', 'proc', 'journalctl -u <unit> [-f]', [
    ['-u <unit>', 'Only one unit. The name must match exactly.'],
    ['-f', 'Follow new lines as they arrive, like tail -f.'],
    ['-n 100', 'The last 100 lines instead of the whole journal.'],
    ['--since "1 hour ago"', 'Limit by time; --until does the other end.'],
    ['-p err', 'Only this priority and worse (emerg, alert, crit, err, warning...).'],
    ['-b / -b -1', 'This boot only / the previous boot.'],
    ['-k', 'Kernel messages only.'],
    ['--no-pager', 'Print straight to stdout so you can pipe it.'],
  ], [
    ['journalctl -u nginx -n 50 --no-pager', 'The last fifty lines from one service.'],
    ['journalctl -fu myapp', 'Watch a service live while you reproduce a bug.'],
    ['journalctl --since "10 min ago" -p err', 'Only recent errors, from every unit.'],
  ], ['systemctl', 'dmesg']),

  c('service', 'service', 'proc', 'service <name> <start|stop|restart|status>', [
    ['start / stop / restart', 'The three verbs that work everywhere.'],
    ['status', 'Ask the service how it is doing.'],
    ['--status-all', 'List every init script and its state (Debian/Ubuntu).'],
  ], [
    ['sudo service nginx restart', 'Restart a service on a machine of any vintage.'],
    ['service --status-all', 'See every service the old init system knows about.'],
  ], ['systemctl']),

  c('crontab', 'crontab', 'proc', 'crontab -e | crontab -l', [
    ['-e', 'Edit your table in $EDITOR; it is installed when you save.'],
    ['-l', 'Print your table. Redirect it somewhere to keep a backup.'],
    ['-r', 'Delete the whole table at once, with no confirmation.'],
    ['-u <user>', "Work on another user's table (root only)."],
    ['m h dom mon dow', 'The five time fields, then the command. * means every.'],
    ['@reboot / @daily', 'Shorthand instead of the five fields.'],
  ], [
    ['crontab -l > ~/cron.bak', 'Back up the table before touching it.'],
    ['crontab -e', 'Then add: 0 3 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1'],
    ['crontab -l | grep -v backup.sh | crontab -', 'Remove one line without opening an editor.'],
  ], ['at', 'systemctl']),

  c('at', 'at', 'proc', 'at <time>  (then type the command, Ctrl+D to finish)', [
    ['at 15:00 / at 3pm tomorrow', 'Absolute times, in many spellings.'],
    ['at now + 10 minutes', 'Relative times: minutes, hours, days, weeks.'],
    ['-f <file>', 'Run a script file instead of typing the command.'],
    ['atq', 'List the jobs you have queued (same as at -l).'],
    ['atrm <n>', 'Delete queued job number n (same as at -r).'],
  ], [
    ['echo "systemctl restart nginx" | sudo at now + 5 minutes', 'One restart, five minutes from now.'],
    ['at -f deploy.sh 02:00', 'Run a script once at 2am.'],
    ['atq', 'Check what is still queued.'],
  ], ['crontab']),

  c('uptime', 'uptime', 'proc', 'uptime', [
    ['-p', 'Print it as a sentence, "up 3 weeks, 2 days" (Linux).'],
    ['-s', 'Print the moment the machine booted (Linux).'],
    ['load average', 'Runnable processes averaged over 1, 5 and 15 minutes. Not a percentage.'],
  ], [
    ['uptime', 'How long the machine has been up, who is logged in, and the load.'],
    ['uptime -p', 'Just the readable duration (Linux).'],
  ], ['top', 'vmstat', 'free']),

  c('free', 'free', 'proc', 'free -h', [
    ['-h', 'Human units, so Gi and Mi instead of raw kibibytes.'],
    ['-m / -g', 'Force mebibytes / gibibytes.'],
    ['-s 5', 'Repeat every five seconds until Ctrl+C.'],
    ['-t', 'Add a total row for RAM plus swap.'],
    ['-w', 'Wide output that separates buffers from cache.'],
  ], [
    ['free -h', 'Read the available column: that is what a new program can actually get.'],
    ['free -m -s 5', 'Watch memory every five seconds while a job runs.'],
  ], ['vmstat', 'top', 'uptime']),

  c('vmstat', 'vmstat', 'proc', 'vmstat <interval> [count]', [
    ['vmstat 1 5', 'Five samples, one second apart.'],
    ['-s', 'A one-off table of memory counters since boot.'],
    ['-w', 'Wide columns, so the numbers stop colliding.'],
    ['-d', 'Per-disk statistics instead of the summary.'],
    ['si / so', 'Swap in and out. Anything sustained here means real memory pressure.'],
    ['wa', 'Percentage of time the CPU sat waiting for disk.'],
  ], [
    ['vmstat 1 5', 'Five one-second samples; ignore the first line.'],
    ['vmstat -w 2', 'Keep sampling every two seconds with readable columns.'],
  ], ['free', 'iostat', 'top']),

  c('iostat', 'iostat', 'proc', 'iostat -x <interval>', [
    ['-x', 'Extended per-device stats including %util and await (Linux, sysstat).'],
    ['-d', 'Device lines only, no CPU block.'],
    ['-m', 'Report in megabytes per second.'],
    ['-h', 'Human-readable layout (newer sysstat).'],
    ['-w 1 -c 5', 'Interval and count on macOS/BSD, which uses different flags.'],
  ], [
    ['iostat -xh 2', 'Per-disk load every two seconds; the first block is an average since boot (Linux).'],
    ['iostat -w 1 -c 5', 'Five one-second samples on macOS.'],
  ], ['vmstat', 'lsblk', 'top']),

  c('lsblk', 'lsblk', 'proc', 'lsblk [-f]', [
    ['-f', 'Add filesystem type, label and UUID for each partition.'],
    ['-o NAME,SIZE,FSTYPE,MOUNTPOINT', 'Pick exactly the columns you want.'],
    ['-p', 'Print full device paths such as /dev/sda1.'],
    ['-n', 'No header row, for scripts.'],
    ['-J', 'JSON output.'],
  ], [
    ['lsblk -f', 'Every disk and partition with its filesystem and mount point.'],
    ['lsblk -o NAME,SIZE,MOUNTPOINT', 'A short table for checking a device name before writing to it.'],
  ], ['dd', 'iostat']),

  c('uname', 'uname', 'proc', 'uname -a', [
    ['-a', 'Everything on one line.'],
    ['-s', 'Kernel name: Linux or Darwin.'],
    ['-r', 'Kernel release, the version number people usually mean.'],
    ['-m', 'Machine architecture: x86_64, aarch64, arm64.'],
    ['-n', 'Network node name, the same string hostname prints.'],
    ['-o', 'Operating system, GNU only. macOS has no -o.'],
  ], [
    ['uname -m', 'Tell an Apple Silicon or ARM server (arm64/aarch64) from an Intel one (x86_64).'],
    ['uname -sr', 'Kernel name and release together.'],
    ['cat /etc/os-release', 'What uname cannot tell you: the distribution and its version.'],
  ], ['hostname', 'lsblk']),

  c('hostname', 'hostname', 'proc', 'hostname [-f]', [
    ['-s', 'Short name only, up to the first dot.'],
    ['-f', 'Fully qualified domain name (Linux).'],
    ['-I', 'All IP addresses of this host, space separated. Linux only, capital i.'],
    ['-i', 'Resolve the host name; depends on /etc/hosts, so it often prints 127.0.1.1 (Linux).'],
    ['hostname <newname>', 'Change it until the next reboot only.'],
  ], [
    ['hostname -f', 'The full name other machines see.'],
    ['hostname -I', 'Every local IP without parsing ip or ifconfig output (Linux).'],
    ['sudo hostnamectl set-hostname web01', 'The permanent change on systemd; macOS uses scutil --set HostName.'],
  ], ['uname', 'ip']),

  c('date', 'date', 'proc', 'date [+FORMAT]', [
    ['+%F', 'Shorthand for %Y-%m-%d.'],
    ['+%s', 'Unix epoch seconds right now.'],
    ['-u', 'Work in UTC instead of local time.'],
    ['-d "yesterday"', 'Parse or shift a date. GNU only.'],
    ['-d @1700000000', 'Turn epoch seconds into a readable date. GNU only.'],
    ['-v-2d', 'Shift by two days on macOS/BSD, which has no -d.'],
    ['-r 1700000000', 'Read epoch seconds on macOS/BSD.'],
    ['-j -f "%Y-%m-%d"', 'Parse a string without setting the clock, on macOS/BSD.'],
  ], [
    ['date -u +"%Y-%m-%dT%H:%M:%SZ"', 'An ISO 8601 timestamp in UTC, the same on both platforms.'],
    ['date -d "2 days ago" +%F', 'The date two days back on GNU; on macOS it is date -v-2d +%F.'],
    ['date +%s', 'Epoch seconds, for a filename or a quick difference.'],
  ], ['at', 'crontab']),

  c('env', 'env', 'proc', 'env [VAR=value] [command]', [
    ['env', 'With no arguments, print the whole environment.'],
    ['VAR=value <command>', 'Run the command with that variable added, for this run only.'],
    ['-i', 'Start from an empty environment, inheriting nothing.'],
    ['-u <VAR>', 'Unset one variable for the child process.'],
  ], [
    ['env | sort | grep -i proxy', 'Find the proxy variables that are breaking a download.'],
    ['env NODE_ENV=production node app.js', 'Set a variable for one run without touching your shell.'],
    ['env -i bash --noprofile --norc', 'A shell with nothing inherited, for reproducing a cron failure.'],
  ], ['export', 'which']),

  c('export', 'export', 'proc', 'export VAR=value', [
    ['VAR=value', 'Set it and mark it for export in one step.'],
    ['-p', 'List everything currently exported.'],
    ['-n <VAR>', 'Keep the variable but stop passing it to child processes.'],
    ['-f <fn>', 'Export a shell function as well (bash).'],
  ], [
    ['export PATH="$HOME/bin:$PATH"', 'Put your own bin directory first for this session.'],
    ['export AWS_PROFILE=staging', 'Every command started afterwards in this shell sees it.'],
  ], ['env', 'type']),

  c('which', 'which', 'proc', 'which [-a] <name>', [
    ['-a', 'Show every match in PATH, not just the first one.'],
    ['<name> <name>', 'Several names at once; the exit status is nonzero if any is missing.'],
    ['-s', 'Print nothing, just set the exit status (BSD/macOS).'],
  ], [
    ['which -a python3', 'Spot a second python3 earlier in PATH than the one you expected.'],
    ['command -v node || echo missing', 'The portable check to use in scripts.'],
  ], ['type', 'env']),

  c('type', 'type', 'proc', 'type [-a] <name>', [
    ['-a', 'Every meaning of the name, in the order the shell would consider them.'],
    ['-t', 'One word only: alias, keyword, function, builtin or file.'],
    ['-P', 'Force a PATH lookup even if the name is also an alias or function (bash).'],
    ['-f', 'Ignore shell functions.'],
  ], [
    ['type -a ls', 'Reveals the alias first and the /bin/ls binary second.'],
    ['type -t rm', 'Prints "file" if nothing is shadowing it, "alias" if something is.'],
  ], ['which', 'export']),

  c('lsof', 'lsof', 'proc', 'lsof -i :<port>', [
    ['-i :3000', 'Which process holds port 3000, in either direction.'],
    ['-i TCP -sTCP:LISTEN', 'Listening TCP sockets only.'],
    ['-t', 'Print bare PIDs, made for piping into kill.'],
    ['-p <pid>', 'Everything one process has open.'],
    ['-u <user>', "One user's open files."],
    ['+D <dir>', 'Every open file underneath a directory, recursively.'],
    ['-n -P', 'Skip host and port name lookups, which makes it much faster.'],
  ], [
    ['lsof -i :3000', 'The classic answer to "something is already using port 3000".'],
    ['kill -9 $(lsof -ti :3000)', 'Kill whatever holds that port.'],
    ['sudo lsof +D /var/log', 'Find the process keeping a deleted log file open.'],
  ], ['fuser', 'ss', 'netstat']),

  c('fuser', 'fuser', 'proc', 'fuser <file> | fuser <port>/tcp', [
    ['3000/tcp', 'PIDs using that TCP port (Linux).'],
    ['-k', 'Kill those processes. Sends SIGKILL, so no cleanup. Linux only; macOS fuser has no -k.'],
    ['-i', 'Ask before each kill, and only useful together with -k.'],
    ['-v', 'A readable table with user, PID and access type.'],
    ['-m <mount>', 'Every process using anything on that filesystem, before you unmount it.'],
    ['-c / -f / -u', 'The only options POSIX guarantees, and all that macOS supports.'],
  ], [
    ['fuser 3000/tcp', 'Which PID is holding the port (Linux).'],
    ['fuser -k -i 3000/tcp', 'Kill the holder, asking first (Linux).'],
    ['fuser -vm /mnt/data', 'Find out why the filesystem says "device is busy".'],
  ], ['lsof', 'kill', 'ss']),

  c('watch', 'watch', 'proc', 'watch -n <seconds> "<command>"', [
    ['-n 5', 'Interval in seconds; the default is 2.'],
    ['-d', 'Highlight what changed since the last run.'],
    ['-t', 'Drop the header line.'],
    ['-g', 'Exit as soon as the output changes.'],
    ['-x', 'Run the command directly instead of through a shell.'],
  ], [
    ['watch -n 5 "kubectl get pods"', 'Quote it, or the shell hands watch only the first word.'],
    ['watch -d free -h', 'Watch memory move, with the changes highlighted.'],
  ], ['top', 'timeout']),

  c('timeout', 'timeout', 'proc', 'timeout <duration> <command>', [
    ['30 / 5m / 1h', 'Duration in seconds unless you add s, m, h or d.'],
    ['-s <SIGNAL>', 'Send something other than TERM when time runs out.'],
    ['-k 5', 'If the command ignores TERM, send KILL five seconds later.'],
    ['--preserve-status', "Exit with the command's own status instead of 124."],
    ['exit code 124', 'What timeout returns when it had to stop the command.'],
  ], [
    ['timeout 30 curl -s https://example.com', 'Give up on a hung request after thirty seconds.'],
    ['timeout -k 5 60 ./import.sh', 'One minute to finish politely, then five seconds before KILL.'],
  ], ['watch', 'kill', 'nohup']),

  c('strace', 'strace', 'proc', 'strace [-f] -p <pid>', [
    ['-p <pid>', 'Attach to a process that is already running.'],
    ['-f', 'Follow child processes and threads too.'],
    ['-e trace=openat,connect', 'Only the syscalls you care about.'],
    ['-s 200', 'Show 200 characters of each string instead of the default 32.'],
    ['-o <file>', 'Write to a file, since output goes to stderr.'],
    ['-c', 'A summary count per syscall instead of every line.'],
    ['-tt', 'Timestamps with microseconds, to see where the time went.'],
  ], [
    ['strace -f -e trace=openat ./app 2>&1 | grep config', 'Find which config file it actually reads.'],
    ['sudo strace -p 1234 -s 200', 'See what a stuck process is waiting on.'],
    ['sudo dtruss -p 1234', 'The macOS counterpart; needs elevated privileges and often SIP changes.'],
  ], ['lsof', 'ps', 'dmesg']),

  c('dmesg', 'dmesg', 'proc', 'sudo dmesg -T | tail', [
    ['-T', 'Human-readable timestamps instead of seconds since boot.'],
    ['-w', 'Follow new kernel messages as they appear.'],
    ['-l err,warn', 'Filter by level.'],
    ['-H', 'Paged, colourised, relative-time output.'],
    ['--since "5 min ago"', 'Time-bounded output (newer util-linux).'],
  ], [
    ['sudo dmesg -T | tail -50', 'Read what the kernel said about a disk or USB device just now.'],
    ['dmesg -w', 'Watch live while you plug something in.'],
    ['log show --last 10m', 'The macOS equivalent; its dmesg exists but shows almost nothing.'],
  ], ['journalctl', 'lsblk']),

  /* ═════════ net — 네트워크 (28) ═════════ */

  c('curl', 'curl', 'net', 'curl [options] <url>', [
    ['-L', 'Follow redirects. curl does not follow them on its own, unlike a browser.'],
    ['-i', 'Print the response headers along with the body; -I sends HEAD and prints headers only.'],
    ['-d \'{"a":1}\'', 'Send a request body. This alone already means POST.'],
    ['-H "Content-Type: application/json"', 'Add a request header; repeat -H for more.'],
    ['-X PUT', 'Override the method. Unnecessary with -d, which is already a POST.'],
    ['-o <file> / -O', 'Save the body to a file / save it under the remote filename.'],
    ['-s / -sS', 'No progress meter / silent but still print errors.'],
    ['-f', 'Exit nonzero on HTTP 4xx and 5xx instead of printing the error page.'],
    ['-k', 'Skip certificate verification. Debugging only, never in production.'],
  ], [
    ['curl -fsSL https://example.com/install.sh -o install.sh', 'Download quietly, follow redirects, fail loudly on a 404.'],
    ['curl -i -H "Content-Type: application/json" -d \'{"name":"a"}\' https://api.example.com/items', 'POST JSON and read the response headers.'],
    ['curl -s -o /dev/null -w "%{http_code}\\n" https://example.com', 'Print just the status code.'],
  ], ['wget', 'openssl-s-client', 'nc']),

  c('wget', 'wget', 'net', 'wget [options] <url>', [
    ['-O <file>', 'Choose the output name; -O - writes to stdout like curl does.'],
    ['-c', 'Continue a partly downloaded file instead of starting over.'],
    ['-q', 'Quiet. Pair with -O - to pipe the body somewhere.'],
    ['-P <dir>', 'Put downloads into a directory.'],
    ['-r -np -k', 'Recursive mirror, never climb above the start URL, rewrite links for local reading.'],
    ['--limit-rate=1m', 'Cap the bandwidth so the download does not saturate the line.'],
    ['-N', 'Only fetch if the remote file is newer than the local copy.'],
  ], [
    ['wget -c https://example.com/big.iso', 'Resume a large download after the connection dropped.'],
    ['wget -r -np -k https://example.com/docs/', 'Mirror a documentation tree for offline reading.'],
    ['wget -qO- https://example.com | head', 'Behave like curl and print to the terminal.'],
  ], ['curl']),

  c('ping', 'ping', 'net', 'ping -c <count> <host>', [
    ['-c 4', 'Stop after four packets. Without it, ping runs until Ctrl+C.'],
    ['-i 0.2', 'Interval between packets; anything under 0.2s needs root.'],
    ['-s 1472', 'Payload size. With -M do on Linux this is how you find the MTU.'],
    ['-W 1', 'How long to wait for a reply: seconds on Linux, milliseconds on macOS.'],
    ['-t 5', 'Total seconds before giving up, on macOS/BSD (on Linux that flag is -w).'],
    ['-4 / -6', 'Force IPv4 or IPv6.'],
  ], [
    ['ping -c 4 1.1.1.1', 'Four packets to an address that does not need DNS to work.'],
    ['ping -c 3 -s 1472 -M do 8.8.8.8', 'Check whether 1500-byte packets survive the path (Linux).'],
  ], ['traceroute', 'mtr', 'nc']),

  c('traceroute', 'traceroute', 'net', 'traceroute -n <host>', [
    ['-n', 'Skip reverse DNS, which makes it much faster.'],
    ['-m 20', 'Stop after twenty hops instead of the default thirty.'],
    ['-q 1', 'One probe per hop instead of three.'],
    ['-w 1', 'Wait one second per probe.'],
    ['-I', 'Use ICMP echo instead of UDP; needs root.'],
    ['-T -p 443', 'Use TCP to a real port, which firewalls usually let through (Linux).'],
  ], [
    ['traceroute -n 8.8.8.8', 'The path packets take, without name lookups.'],
    ['sudo traceroute -T -p 443 example.com', 'Trace over TCP 443 when UDP probes are blocked (Linux).'],
  ], ['mtr', 'ping', 'ip']),

  c('dig', 'dig', 'net', 'dig [@server] <name> [type]', [
    ['+short', 'Just the answer, one record per line.'],
    ['@1.1.1.1', 'Ask a specific resolver instead of the system one.'],
    ['A / AAAA / MX / TXT / NS / CNAME', 'The record type goes last, with no dash.'],
    ['+noall +answer', 'Trim the output to the answer section only.'],
    ['-x <ip>', 'Reverse lookup, address to name.'],
    ['+trace', 'Walk down from the root servers, which shows where a delegation breaks.'],
    ['+ttlunits', 'Print TTLs as 1h30m instead of raw seconds.'],
  ], [
    ['dig +short example.com', 'The A records, nothing else.'],
    ['dig @1.1.1.1 example.com MX +noall +answer', 'Mail records straight from a public resolver.'],
    ['dig -x 8.8.8.8 +short', 'Which name that address claims.'],
  ], ['host', 'nslookup', 'whois']),

  c('nslookup', 'nslookup', 'net', 'nslookup <name> [server]', [
    ['<name> <server>', 'The resolver to ask goes second, with no flag.'],
    ['-type=MX', 'Record type, written with an equals sign.'],
    ['-debug', 'Show the full packet, including the flags in the header.'],
    ['(no argument)', 'Drops into an interactive prompt where you use "set type=MX".'],
  ], [
    ['nslookup example.com 1.1.1.1', 'A quick lookup against a chosen resolver.'],
    ['nslookup -type=MX example.com', 'Mail records, the nslookup spelling.'],
  ], ['dig', 'host']),

  c('host', 'host', 'net', 'host [-t <type>] <name> [server]', [
    ['-t MX', 'Restrict to one record type.'],
    ['-a', 'Everything, equivalent to -t ANY -v.'],
    ['-v', 'Verbose output closer to what dig prints.'],
    ['-C', 'Fetch the SOA from every authoritative server, to spot one that is out of sync.'],
    ['<ip>', 'Give it an address and it does the reverse lookup by itself.'],
  ], [
    ['host example.com', 'Addresses and mail servers in three short lines.'],
    ['host -t TXT example.com', 'Read the SPF or verification records.'],
    ['host 8.8.8.8', 'Reverse lookup without needing -x.'],
  ], ['dig', 'nslookup']),

  c('ss', 'ss', 'net', 'ss -tulpn', [
    ['-t / -u', 'TCP / UDP sockets.'],
    ['-l', 'Listening sockets only.'],
    ['-n', 'Numeric ports, no /etc/services lookup.'],
    ['-p', 'Show the owning process. Needs root to see processes that are not yours.'],
    ['-a', 'Every socket, listening or not.'],
    ['state established', 'Filter by state, written after the flags.'],
    ['-s', 'A summary count of sockets per protocol.'],
  ], [
    ['ss -tulpn', 'Every listening TCP and UDP port with the process behind it.'],
    ['ss -tn state established', 'Only the connections that are actually carrying traffic.'],
    ['ss -tn "( dport = :443 )"', 'Outgoing HTTPS connections only.'],
  ], ['netstat', 'lsof', 'ip']),

  c('netstat', 'netstat', 'net', 'netstat -tulpn | netstat -an', [
    ['-tulpn', 'The Linux combination: TCP, UDP, listening, with process, numeric.'],
    ['-an', 'All sockets, numeric. The form that also works on macOS/BSD.'],
    ['-r', 'Routing table; add -n to keep it numeric.'],
    ['-i', 'Per-interface packet and error counters.'],
    ['-s', 'Protocol statistics, useful for retransmit counts.'],
    ['-v -p tcp', 'macOS/BSD: verbose, one protocol. macOS cannot map sockets to processes at all.'],
  ], [
    ['sudo netstat -tulpn', 'Listening ports with their processes (Linux, needs root for -p).'],
    ['netstat -an | grep LISTEN', 'The listening list on macOS, where -p means something else.'],
    ['netstat -rn', 'The routing table on either platform.'],
  ], ['ss', 'lsof', 'route']),

  c('ip', 'ip', 'net', 'ip <object> <command>', [
    ['a / addr show', 'Interfaces and their addresses. Replaces ifconfig.'],
    ['r / route', 'The routing table. Replaces route.'],
    ['neigh', 'The ARP/neighbour table. Replaces arp.'],
    ['link set eth0 up|down', 'Bring an interface up or down.'],
    ['-br', 'One short line per entry, far easier to read.'],
    ['route get <ip>', 'Which interface and source address would be used for that destination.'],
    ['-4 / -6', 'Restrict the output to one address family.'],
  ], [
    ['ip -br a', 'Every interface, state and address in a compact table.'],
    ['ip route get 8.8.8.8', 'Which route and source IP the kernel would pick.'],
    ['sudo ip addr add 192.168.1.50/24 dev eth0', 'Add an address, live and temporary.'],
  ], ['ifconfig', 'route', 'arp', 'ss']),

  c('ifconfig', 'ifconfig', 'net', 'ifconfig [-a] [<interface>]', [
    ['-a', 'Include interfaces that are down; plain ifconfig may hide them on Linux.'],
    ['<if> up / down', 'Bring one interface up or down.'],
    ['<if> inet <ip> netmask <mask>', 'Set an address, until the next reboot.'],
    ['en0 / eth0', 'The usual names: en0 on macOS, eth0 or ens5 on Linux.'],
  ], [
    ['ifconfig -a', 'Every interface, including the ones currently down.'],
    ['ifconfig en0 | grep "inet "', 'The local IPv4 address on macOS.'],
    ['sudo ifconfig eth0 down', 'Take an interface offline (Linux, if net-tools is installed).'],
  ], ['ip', 'route', 'hostname']),

  c('route', 'route', 'net', 'route -n | route -n get default', [
    ['-n', 'Numeric output, no reverse DNS (Linux).'],
    ['-n get default', 'Show the default route on macOS/BSD, which has a different grammar.'],
    ['add default gw <ip>', 'Add a default gateway (Linux); BSD writes add default <ip>.'],
    ['del / delete', 'Remove a route. Linux says del, BSD says delete.'],
  ], [
    ['route -n', 'The kernel routing table on Linux.'],
    ['route -n get default', 'Which gateway macOS is using.'],
    ['sudo route add default gw 192.168.1.1', 'Set a gateway by hand, lost at reboot (Linux).'],
  ], ['ip', 'netstat', 'traceroute']),

  c('arp', 'arp', 'net', 'arp -a', [
    ['-a', 'The whole neighbour cache, name plus MAC address.'],
    ['-n', 'Numeric only, no name lookups.'],
    ['-d <host>', 'Delete one entry, which forces a fresh lookup.'],
    ['-s <ip> <mac>', 'Add a static entry by hand.'],
  ], [
    ['arp -a', 'The MAC addresses of machines on this network segment.'],
    ['sudo arp -d 192.168.1.10', 'Clear a stale entry after a device changed hardware.'],
  ], ['ip', 'ping', 'nmap']),

  c('nc', 'nc (netcat)', 'net', 'nc [-lv] <host> <port>', [
    ['-l', 'Listen instead of connecting. On GNU netcat you also need -p <port>.'],
    ['-v', 'Say what happened, which is the whole point when testing a port.'],
    ['-z', 'Scan without sending data. OpenBSD/macOS nc only; GNU netcat has no -z.'],
    ['-w 3', 'Give up after three seconds instead of hanging.'],
    ['-u', 'UDP instead of TCP.'],
    ['-4 / -6', 'Force one address family.'],
  ], [
    ['nc -zv example.com 443', 'Is the port open? Works on macOS and OpenBSD netcat.'],
    ['nc -l 1234   # then on the other host: nc <host> 1234', 'A raw two-way pipe for a quick test.'],
    ['nc -l 1234 > incoming.bin', 'Receive a file that the other side sends with nc host 1234 < file.'],
  ], ['telnet', 'ss', 'nmap']),

  c('telnet', 'telnet', 'net', 'telnet <host> <port>', [
    ['<host> <port>', 'Open a raw TCP connection and type into it.'],
    ['Ctrl+] then quit', 'How to get out when the far end never closes.'],
    ['-4 / -6', 'Force one address family.'],
    ['-e <char>', 'Choose a different escape character.'],
  ], [
    ['telnet example.com 80', 'Then type: GET / HTTP/1.0 and press enter twice.'],
    ['telnet 192.168.1.1 22', 'Read the SSH banner to confirm the service answers.'],
  ], ['nc', 'ssh', 'openssl-s-client']),

  c('ssh', 'ssh', 'net', 'ssh [-p <port>] <user>@<host> [command]', [
    ['-p 2222', 'Port. Note that scp and sftp spell the same thing -P.'],
    ['-i ~/.ssh/id_ed25519', 'Use a specific private key.'],
    ['-L 8080:localhost:80', 'Local forward: your port 8080 reaches the remote side.'],
    ['-R 9000:localhost:3000', 'Remote forward: their port 9000 reaches your machine.'],
    ['-D 1080', 'A local SOCKS proxy tunnelled through the host.'],
    ['-J <bastion>', 'Jump through a bastion host in one command.'],
    ['-N -f', 'No remote command, go to the background. The pair used for tunnels.'],
    ['-v / -vvv', 'Show the handshake, which is how you find out why a key was refused.'],
    ['-o <Option>=<value>', 'Any ssh_config setting for this one connection.'],
  ], [
    ['ssh -p 2222 deploy@example.com', 'Log in on a non-standard port.'],
    ['ssh -N -L 5432:localhost:5432 deploy@db.example.com', 'Reach the remote database as if it were local.'],
    ['ssh -vvv git@github.com', 'See exactly which keys were offered and rejected.'],
  ], ['ssh-keygen', 'ssh-copy-id', 'scp', 'sftp']),

  c('ssh-keygen', 'ssh-keygen', 'net', 'ssh-keygen -t ed25519 -C "<comment>"', [
    ['-t ed25519', 'Key type. ed25519 is the modern default; rsa needs -b 4096 to be worth using.'],
    ['-C "you@laptop"', 'A comment so you can tell your keys apart later.'],
    ['-f <path>', 'Where to write the key, when you want more than one.'],
    ['-N ""', 'No passphrase. Then the file alone is enough to log in.'],
    ['-p', 'Change or add the passphrase on an existing key.'],
    ['-l -f <key.pub>', 'Print the fingerprint, to compare against what a server shows.'],
    ['-y -f <key>', 'Recreate the public half from a private key.'],
    ['-R <host>', 'Remove a host from known_hosts after it was rebuilt.'],
  ], [
    ['ssh-keygen -t ed25519 -C "jade@laptop"', 'Create a modern key pair in ~/.ssh.'],
    ['ssh-keygen -R old.example.com', 'Fix the "REMOTE HOST IDENTIFICATION HAS CHANGED" warning properly.'],
    ['ssh-keygen -lf ~/.ssh/id_ed25519.pub', 'The fingerprint of your public key.'],
  ], ['ssh', 'ssh-copy-id']),

  c('ssh-copy-id', 'ssh-copy-id', 'net', 'ssh-copy-id -i <key.pub> <user>@<host>', [
    ['-i <key.pub>', 'Which public key to install. Point it at the .pub file.'],
    ['-p 2222', 'Port of the remote host.'],
    ['-f', 'Install it without first checking whether it is already there.'],
    ['-n', 'Dry run: print what would be appended and stop.'],
  ], [
    ['ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@example.com', 'Append your key to the remote authorized_keys.'],
    ['ssh-copy-id -p 2222 deploy@example.com', 'The same on a non-standard port.'],
  ], ['ssh-keygen', 'ssh']),

  c('sftp', 'sftp', 'net', 'sftp [-P <port>] <user>@<host>', [
    ['-P 2222', 'Port, capital P. ssh uses lowercase -p for the same thing.'],
    ['-i <key>', 'Use a specific private key.'],
    ['-r', 'Recursive, for put -r and get -r on directories.'],
    ['-b <batchfile>', 'Run a list of commands without a prompt, for scripts.'],
    ['put / get / ls / lcd', 'Its own commands inside the session; lcd changes the local directory.'],
  ], [
    ['sftp -P 2222 deploy@example.com', 'Open an interactive transfer session.'],
    ['sftp deploy@example.com:/var/log/app.log .', 'Fetch one file without entering the prompt.'],
  ], ['scp', 'ssh']),

  c('scp', 'scp', 'net', 'scp [-P <port>] <src> <user>@<host>:<dest>', [
    ['-P 2222', 'Port, capital P. Lowercase -p means "preserve timestamps" here.'],
    ['-r', 'Copy a directory and everything under it.'],
    ['-i <key>', 'Use a specific private key.'],
    ['-C', 'Compress in transit.'],
    ['-3', 'Copy between two remote hosts by routing through your machine.'],
    ['-O', 'Use the old SCP protocol; OpenSSH 9 and later default to SFTP.'],
  ], [
    ['scp -P 2222 build.tar.gz deploy@example.com:/tmp/', 'Upload one file. The remote side needs the colon.'],
    ['scp -r deploy@example.com:/var/log ./logs', 'Download a whole directory.'],
  ], ['sftp', 'ssh']),

  c('iptables', 'iptables', 'net', 'sudo iptables -L -n -v --line-numbers', [
    ['-L -n -v --line-numbers', 'List the rules with counters and the numbers you need for -D.'],
    ['-A <CHAIN>', 'Append to the end of a chain, where an earlier rule may already have decided.'],
    ['-I <CHAIN> 1', 'Insert at the top, which is usually what you meant.'],
    ['-D <CHAIN> <n>', 'Delete rule number n.'],
    ['-p tcp --dport 22', 'Match protocol and destination port.'],
    ['-s 10.0.0.0/8', 'Match a source address or range.'],
    ['-j ACCEPT|DROP|REJECT', 'What to do with a matching packet.'],
    ['-P <CHAIN> DROP', 'Set the default policy, applied when no rule matched.'],
  ], [
    ['sudo iptables -L -n -v --line-numbers', 'Read the current rules before changing anything.'],
    ['sudo iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT', 'Guarantee your own SSH access first.'],
    ['sudo iptables-save > /etc/iptables/rules.v4', 'Make the rules survive a reboot.'],
  ], ['ufw', 'ss', 'tcpdump']),

  c('ufw', 'ufw', 'net', 'sudo ufw <allow|deny|status> ...', [
    ['allow 22/tcp', 'Open a port; allow OpenSSH uses the named application profile instead.'],
    ['allow from 10.0.0.0/8 to any port 5432', 'Open a port to one network only.'],
    ['deny <port>', 'Block it explicitly.'],
    ['default deny incoming', 'The usual starting point, set before you enable.'],
    ['status numbered', 'List the rules with the numbers that delete needs.'],
    ['delete <n>', 'Remove rule number n.'],
    ['enable / disable', 'Turn the firewall on or off, persistently.'],
  ], [
    ['sudo ufw allow OpenSSH && sudo ufw enable', 'Allow SSH first, then switch the firewall on.'],
    ['sudo ufw status numbered', 'See what is open and get the rule numbers.'],
    ['sudo ufw delete 3', 'Remove the third rule.'],
  ], ['iptables', 'ss']),

  c('tcpdump', 'tcpdump', 'net', 'sudo tcpdump -i <if> -nn <filter>', [
    ['-i any', 'Capture on every interface; -i eth0 for just one.'],
    ['-nn', 'No name and no port-number lookups, so nothing is guessed.'],
    ['-c 100', 'Stop after a hundred packets.'],
    ['-w <file.pcap>', 'Write raw packets to a file for Wireshark; -r reads one back.'],
    ['-A / -X', 'Print payloads as text / as hex and text.'],
    ['port 443 and host 10.0.0.5', 'The filter, in its own pcap syntax, after the flags.'],
    ['-s 0', 'Full packets. Modern versions already do this by default.'],
  ], [
    ['sudo tcpdump -i any -nn port 443 -c 20', 'Twenty HTTPS packets, then stop.'],
    ['sudo tcpdump -i eth0 -w capture.pcap host 10.0.0.5', 'Record one host to a file and open it in Wireshark later.'],
    ['sudo tcpdump -i any -nn -A "tcp port 80"', 'Read plain HTTP requests as they go past.'],
  ], ['ss', 'nc', 'iptables']),

  c('whois', 'whois', 'net', 'whois <domain|ip>', [
    ['<domain>', 'Registrar, dates and name servers, if the TLD server publishes them.'],
    ['<ip>', 'Which organisation owns the address block, and its abuse contact.'],
    ['-h <server>', 'Query one specific whois server.'],
    ['-H', 'Hide the legal boilerplate that fills most replies.'],
  ], [
    ['whois example.com | grep -i expir', 'When the domain expires.'],
    ['whois 1.1.1.1', 'Who owns the address that is hitting your logs.'],
  ], ['dig', 'host']),

  c('nmap', 'nmap', 'net', 'nmap [-sV] -p <ports> <target>', [
    ['-p 22,80,443 / -p-', 'Specific ports / all 65535 of them.'],
    ['--top-ports 100', 'The hundred most common ports, a good first pass.'],
    ['-sS', 'SYN scan: fast and quiet, but needs root.'],
    ['-sT', 'Full TCP connect scan, the fallback when you are not root.'],
    ['-sV', 'Ask each open port what software and version it is.'],
    ['-sn', 'Host discovery only, no port scan.'],
    ['-Pn', 'Assume the host is up, for targets that ignore ping.'],
    ['-oN <file> / -oX <file>', 'Save plain-text / XML output.'],
  ], [
    ['nmap -p 22,80,443 192.168.1.10', 'Check three ports on one machine.'],
    ['nmap -sn 192.168.1.0/24', 'List which addresses on the LAN are answering.'],
    ['sudo nmap -sS -sV --top-ports 100 10.0.0.5', 'Fast scan with service detection.'],
  ], ['ss', 'nc', 'arp']),

  c('openssl-s-client', 'openssl s_client', 'net', 'openssl s_client -connect <host>:443 -servername <host>', [
    ['-connect host:443', 'Where to open the TLS connection.'],
    ['-servername <host>', 'The SNI name. Without it a shared host serves its default certificate.'],
    ['-showcerts', 'Print the whole chain the server sent, not just the leaf.'],
    ['-tls1_2 / -tls1_3', 'Force one protocol version, to test what the server still accepts.'],
    ['-verify_return_error', 'Fail instead of continuing when the chain does not validate.'],
    ['< /dev/null', 'Close stdin, or the command sits and waits forever.'],
  ], [
    ['openssl s_client -connect example.com:443 -servername example.com < /dev/null 2>/dev/null | openssl x509 -noout -dates', 'When the certificate expires.'],
    ['openssl s_client -connect example.com:443 -showcerts < /dev/null', 'Inspect the full chain for a missing intermediate.'],
  ], ['curl', 'telnet', 'nc']),

  c('speedtest', 'speedtest', 'net', 'speedtest [-s <server-id>]', [
    ['-L', "List nearby servers with their IDs (Ookla's speedtest)."],
    ['-s <id>', 'Test against one specific server instead of the automatic pick.'],
    ['-f json', 'Machine-readable output, for logging over time.'],
    ['--accept-license', 'Needed once, non-interactively, on the Ookla client.'],
    ['--simple / --json', 'The equivalents in the older Python speedtest-cli.'],
  ], [
    ['speedtest', 'Throughput and latency to the nearest server.'],
    ['speedtest -f json', 'The same numbers in a form you can store.'],
    ['speedtest-cli --simple', 'The Python client, which takes different flags entirely.'],
  ], ['ping', 'mtr', 'curl']),

  c('mtr', 'mtr', 'net', 'mtr -rwc <count> <host>', [
    ['-r', 'Report mode: run, print a table and exit. Made for pasting into a ticket.'],
    ['-c 100', 'How many cycles to run before reporting.'],
    ['-w', 'Wide report so long host names are not cut off.'],
    ['-n', 'No reverse DNS.'],
    ['-T -P 443', 'Probe with TCP to a real port instead of ICMP.'],
    ['-b', 'Show both the host name and the address.'],
  ], [
    ['mtr -rwc 100 8.8.8.8', 'A hundred cycles summarised, the report to attach to a complaint.'],
    ['sudo mtr -T -P 443 example.com', 'Trace with TCP when ICMP is filtered.'],
  ], ['traceroute', 'ping']),

  /* ═════════ archive — 압축·전송 (14) ═════════ */

  c('tar', 'tar', 'archive', 'tar -czf <archive.tar.gz> <path>', [
    ['-c / -x / -t', 'Create / extract / list. Exactly one of the three, and it comes first.'],
    ['-f <file>', 'The archive name, and it must be the last flag before that name.'],
    ['-z / -j / -J', 'gzip / bzip2 / xz. GNU tar detects the format when extracting, so -z is optional with -x.'],
    ['-v', 'Print the file names as they go past.'],
    ['-C <dir>', 'Change into that directory first. Position in the command line matters.'],
    ["--exclude='node_modules'", 'Skip matching paths. Write it before the source paths.'],
    ['--strip-components=1', 'Drop the top-level directory when extracting.'],
    ['--zstd', 'Use zstd instead of gzip (GNU tar 1.31 and newer).'],
  ], [
    ['tar -czf site.tar.gz -C /var/www .', 'Archive the contents of a directory without the leading path.'],
    ['tar -xzf site.tar.gz -C /tmp/restore', 'Extract into a directory that already exists.'],
    ['tar -tzf site.tar.gz | head', 'Look inside before extracting, so nothing lands in $PWD by surprise.'],
  ], ['gzip', 'zstd', 'xz', 'zip']),

  c('gzip', 'gzip', 'archive', 'gzip [-k] <file>', [
    ['-k', 'Keep the original. Without it, gzip deletes the file it just compressed.'],
    ['-d', 'Decompress, which is exactly what gunzip does.'],
    ['-c', 'Write to stdout and leave the input alone.'],
    ['-1 / -9', 'Fastest / smallest. The default is -6.'],
    ['-l', 'Show the compressed and original sizes of a .gz file.'],
    ['-t', 'Test the integrity without unpacking.'],
    ['-r', 'Walk a directory and compress each file separately.'],
  ], [
    ['gzip -9 access.log', 'Creates access.log.gz. The original access.log is gone.'],
    ['gzip -c report.csv > report.csv.gz', 'Compress while keeping the original.'],
    ['gzip -l backup.sql.gz', 'How much it actually saved.'],
  ], ['gunzip', 'zcat', 'tar', 'zstd']),

  c('gunzip', 'gunzip', 'archive', 'gunzip [-k] <file.gz>', [
    ['-k', 'Keep the .gz file instead of removing it on success.'],
    ['-c', 'Write to stdout and touch nothing on disk, the same as zcat.'],
    ['-f', 'Overwrite an existing output file, which it otherwise refuses to do.'],
    ['-t', 'Test the file instead of unpacking it.'],
    ['-l', 'List the sizes inside.'],
  ], [
    ['gunzip backup.sql.gz', 'Leaves backup.sql; the .gz file is removed.'],
    ['gunzip -c dump.sql.gz | psql mydb', 'Restore without ever writing the uncompressed file to disk.'],
  ], ['gzip', 'zcat']),

  c('zip', 'zip', 'archive', 'zip -r <archive.zip> <path>', [
    ['-r', 'Recurse into directories. Without it you archive the directory entry and nothing inside.'],
    ["-x '*/node_modules/*'", 'Exclude a pattern. Quote it so the shell leaves it alone.'],
    ['-e', 'Prompt for a password. This is legacy ZipCrypto, which is weak.'],
    ['-1 / -9', 'Fastest / smallest.'],
    ['-j', 'Store bare file names and drop the directory structure.'],
    ['-u', 'Add only files that are new or changed.'],
    ['-s 100m', 'Split the archive into 100 MB volumes.'],
  ], [
    ["zip -r site.zip site -x '*/node_modules/*'", 'The archive a Windows colleague can open, without the dependency tree.'],
    ['zip -j photos.zip ~/Pictures/*.jpg', 'One flat archive of files from several places.'],
  ], ['unzip', '7z', 'tar']),

  c('unzip', 'unzip', 'archive', 'unzip [-d <dir>] <archive.zip>', [
    ['-l', 'List the contents without extracting.'],
    ['-d <dir>', 'Extract there instead of into the current directory.'],
    ['-o', 'Overwrite existing files without asking.'],
    ['-n', 'Never overwrite: skip files that already exist.'],
    ['-j', 'Flatten the paths into one directory.'],
    ['-q', 'Quiet, for scripts.'],
    ['-O CP932', 'Interpret file names in a legacy code page (Debian/Ubuntu Info-ZIP only; stock macOS unzip rejects -O).'],
    ['-P <password>', 'Password on the command line, where ps and your shell history can see it.'],
  ], [
    ['unzip -l archive.zip', 'Check whether it has a top-level folder before extracting.'],
    ['unzip archive.zip -d /tmp/out', 'Extract somewhere harmless.'],
    ['unzip -O CP932 japanese.zip', 'Fixes mojibake from an older Windows zip, where the patched Info-ZIP is available.'],
  ], ['zip', '7z']),

  c('bzip2', 'bzip2', 'archive', 'bzip2 [-k] <file>', [
    ['-k', 'Keep the original, which it otherwise deletes.'],
    ['-d', 'Decompress; bunzip2 is the same thing.'],
    ['-c', 'Write to stdout.'],
    ['-1 / -9', 'Block size from 100k to 900k. -9 is the default.'],
    ['-t', 'Test integrity.'],
  ], [
    ['bzip2 -k bigfile.log', 'Compress but keep the original.'],
    ['bzip2 -dc data.bz2 | wc -l', 'Count lines without unpacking to disk.'],
    ['tar -cjf logs.tar.bz2 ./logs', 'The tar flag for bzip2 is -j.'],
  ], ['gzip', 'xz', 'zstd']),

  c('xz', 'xz', 'archive', 'xz [-T0] [-k] <file>', [
    ['-k', 'Keep the original.'],
    ['-d', 'Decompress; unxz is the same.'],
    ['-T0', 'Use every core. Single-threaded is the default.'],
    ['-9', 'Smallest output. Compression needs roughly 700 MB of RAM at this level.'],
    ['-c', 'Write to stdout.'],
    ['-l', 'List what is inside a .xz file.'],
  ], [
    ['xz -T0 -9 huge.tar', 'Smallest possible archive, using all cores.'],
    ['xz -dk archive.tar.xz', 'Unpack while keeping the compressed copy.'],
    ['tar -cJf src.tar.xz ./src', 'The tar flag for xz is a capital -J.'],
  ], ['gzip', 'zstd', 'bzip2', 'tar']),

  c('zcat', 'zcat', 'archive', 'zcat <file.gz>', [
    ['<file.gz>', 'Print the contents to stdout, leaving the file compressed.'],
    ['-f', 'Also pass through files that are not compressed at all.'],
    ['zgrep / zless', 'The same idea for searching and paging a .gz file.'],
    ['bzcat / xzcat / zstdcat', 'The equivalents for bzip2, xz and zstd.'],
  ], [
    ['zcat access.log.gz | grep " 500 "', 'Search a rotated log without unpacking it.'],
    ['zcat -f app.log app.log.1.gz | tail -100', 'Read across compressed and plain logs in one pass.'],
  ], ['gunzip', 'gzip']),

  c('7z', '7z', 'archive', '7z <a|x|l> <archive.7z> [files]', [
    ['a', 'Add or create.'],
    ['x', 'Extract keeping the stored directory structure.'],
    ['e', 'Extract everything into one directory, flattening paths.'],
    ['l', 'List the contents.'],
    ['-o<dir>', 'Output directory, written with no space after -o.'],
    ['-p<password>', 'Password. Add -mhe=on to encrypt the file names too.'],
    ['-mx=9', 'Maximum compression.'],
    ['-t7z / -tzip', 'Choose the output format.'],
  ], [
    ['7z a -mx=9 backup.7z ./data', 'A tightly compressed archive.'],
    ['7z x archive.7z -o/tmp/out', 'Extract with the folder structure intact.'],
    ['7z a -p -mhe=on secret.7z ./docs', 'Encrypt the contents and the file names, with a prompted password.'],
  ], ['zip', 'unzip', 'rar']),

  c('dd', 'dd', 'archive', 'dd if=<source> of=<target> bs=4M status=progress', [
    ['if=<file>', 'Input file or device. Leaving it out reads stdin.'],
    ['of=<file>', 'Output. Whatever this names is overwritten from block zero, with no confirmation.'],
    ['bs=4M', 'Block size. Too small and the copy crawls.'],
    ['count=<n>', 'Copy only n blocks.'],
    ['status=progress', 'Show progress (GNU). On macOS press Ctrl+T instead.'],
    ['conv=fsync', 'Flush to the device before exiting, so the numbers mean something.'],
    ['conv=notrunc', 'Write in place without truncating the output file.'],
  ], [
    ['lsblk', 'Always confirm the device name immediately before the next command.'],
    ['sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress conv=fsync', 'Write an installer image to a whole USB device (Linux).'],
    ['diskutil unmountDisk /dev/disk4 && sudo dd if=ubuntu.iso of=/dev/rdisk4 bs=4m', 'On macOS the disk must be unmounted first, or dd fails with Resource busy; rdiskN is the fast raw path.'],
  ], ['lsblk', 'split-file']),

  c('split-file', 'split', 'archive', 'split -b <size> <file> <prefix>', [
    ['-b 100M', 'Pieces of a fixed size; K, M and G suffixes work on both platforms.'],
    ['-l 1000', 'Split by line count instead, which is the default behaviour at 1000 lines.'],
    ['-n 4', 'Cut into exactly four pieces.'],
    ['-d', 'Numeric suffixes instead of aa, ab, ac.'],
    ['-a 3', 'Suffix length, when two letters are not enough.'],
    ['--additional-suffix=.part', 'Append an extension to each piece. GNU only.'],
    ['<prefix>', 'Optional, and without it the pieces are named xaa, xab, xac.'],
  ], [
    ['split -b 100M big.tar.gz part_', 'Produces part_aa, part_ab and so on.'],
    ['cat part_* > big.tar.gz', 'Reassemble in glob order, which is why the suffixes are sorted.'],
    ['split -l 5000 -d data.csv chunk_', 'Five thousand lines per piece, with numeric suffixes.'],
  ], ['dd', 'tar']),

  c('cpio', 'cpio', 'archive', 'find <path> | cpio -o > <archive.cpio>', [
    ['-o', 'Copy-out: build an archive from the names arriving on stdin.'],
    ['-i', 'Copy-in: extract from an archive on stdin.'],
    ['-d', 'Create directories as needed while extracting.'],
    ['-m', 'Preserve modification times.'],
    ['-t', 'List the contents instead of extracting.'],
    ['-v', 'Print names as they are processed.'],
    ['-H newc', 'The portable SVR4 format, and the one initramfs images use.'],
    ['--no-absolute-filenames', 'Refuse to extract to absolute paths from an untrusted archive (GNU cpio only).'],
  ], [
    ['find . -depth -print | cpio -ov -H newc > backup.cpio', 'Archive exactly the file list that find produced.'],
    ['cpio -idmv < backup.cpio', 'Extract, creating directories and keeping timestamps.'],
    ['cpio -itv < backup.cpio', 'List what is inside first.'],
  ], ['tar', 'gzip']),

  c('zstd', 'zstd', 'archive', 'zstd [-<level>] [-T0] <file>', [
    ['-1 .. -19', 'Level. --ultra -22 goes further but costs a lot of memory.'],
    ['-T0', 'Use every core.'],
    ['-d', 'Decompress; unzstd and zstdcat also exist.'],
    ['--rm', 'Delete the source after success. Unlike gzip, zstd keeps it by default.'],
    ['-c', 'Write to stdout.'],
    ['-l', 'Show what is inside a .zst file.'],
    ['--long=27', 'A large window that helps a lot on big, repetitive files.'],
  ], [
    ['zstd -19 -T0 dump.sql', 'Near-xz size at a fraction of the time; dump.sql stays where it is.'],
    ['tar --zstd -cf backup.tar.zst ./data', 'A tar archive compressed with zstd.'],
    ['zstd -d backup.tar.zst', 'Unpack it again.'],
  ], ['gzip', 'xz', 'tar']),

  c('rar', 'rar', 'archive', 'rar a <archive.rar> <files>  |  unrar x <archive.rar>', [
    ['a', 'Add or create an archive (rar only).'],
    ['x', 'Extract with full paths; e flattens them. Both work in unrar.'],
    ['l', 'List the contents.'],
    ['-p<password>', 'Encrypt the contents. Use -hp instead, not as well, to encrypt the file names too.'],
    ['-m5', 'Maximum compression.'],
    ['-r', 'Recurse into subdirectories.'],
    ['-v100m', 'Split into 100 MB volumes.'],
  ], [
    ['unrar x archive.rar', 'Extract a .rar someone sent you, keeping its folders.'],
    ['7z x archive.rar', 'Extracts without RARLAB tools; on many Linux distros this needs the non-free p7zip-rar codec.'],
    ['rar a -m5 -r backup.rar ./data', 'Create a .rar, which needs the paid rar binary.'],
  ], ['7z', 'unzip', 'zip']),
];
