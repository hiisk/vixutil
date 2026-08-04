# -*- coding: utf-8 -*-
"""OG 카드에 실제로 쓰이는 글자만 담은 폰트를 만든다.

구글 폰트 CSS2 API는 text=를 주면 그 글자만 담은 TTF를 돌려준다. 다만 URL
길이 때문에 한 번에 다 못 보내므로 나눠 받아 fontTools로 합친다.
"""
import os, re, sys, urllib.parse, urllib.request, subprocess, tempfile

UA = ("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) "
      "AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1")

def chars_in_repo():
    ranges = {
        'hangul': [(0xAC00, 0xD7A3), (0x1100, 0x11FF), (0x3130, 0x318F)],
        'han':    [(0x4E00, 0x9FFF), (0x3400, 0x4DBF), (0xF900, 0xFAFF)],
        'kana':   [(0x3040, 0x30FF)],
        'deva':   [(0x0900, 0x097F)],
        # CJK 문장부호와 전각 기호. Noto Sans(라틴)는 이 글자들을 400으로 거부해
        # base 부분집합에서 빠지므로, 한중일 폰트 쪽에 얹는다 — 일본어 카드의
        # 「」가 그래서 한 번 빠졌다.
        'cjkpunct': [(0x3000, 0x303F), (0xFF00, 0xFFEF)],
        # 카드 문장에 섞이는 라틴 확장·문장부호·화살표·수학기호.
        # Geist(next/og 기본)는 기본 라틴만 덮어서, em 대시 하나에도 밖으로 나간다.
        # 이모지(U+1F300~)는 뺀다 — stripForCard가 카드에서 지우고, 본문 폰트가
        # 그릴 수 있는 글자도 아니다.
        'base':   [(0x00A0, 0x024F), (0x0370, 0x04FF), (0x2000, 0x206F),
                   (0x20A0, 0x20BF), (0x2100, 0x214F), (0x2190, 0x22FF),
                   (0x2460, 0x24FF), (0x2500, 0x27BF), (0x3000, 0x303F)],
    }
    found = {k: set() for k in ranges}
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', 'out', '.next', 'public')]
        for f in files:
            if not f.endswith(('.ts', '.tsx')): continue
            try: s = open(os.path.join(root, f), encoding='utf-8').read()
            except Exception: continue
            for c in s:
                o = ord(c)
                for k, rs in ranges.items():
                    if any(a <= o <= b for a, b in rs):
                        found[k].add(c); break
    return found

def fetch_subset(family, weight, text, out):
    url = ('https://fonts.googleapis.com/css2?family=%s:wght@%d&text=%s'
           % (family.replace(' ', '+'), weight, urllib.parse.quote(text)))
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    css = urllib.request.urlopen(req, timeout=60).read().decode()
    m = re.search(r"src: url\((.+?)\) format\('truetype'\)", css)
    if not m: raise RuntimeError('TTF 링크를 못 찾았다: ' + family)
    data = urllib.request.urlopen(m.group(1), timeout=120).read()
    open(out, 'wb').write(data)

def build(family, weight, text, dest, chunk=250):
    """조각으로 나눠 받아 합친다.

    글꼴에 없거나 서비스가 거부하는 글자가 섞이면 400이 온다. 그럴 때는 조각을
    반으로 갈라 다시 시도하고, 글자 하나까지 갈라도 400이면 그 글자만 버린다 —
    한 글자 때문에 전체를 포기하지 않기 위해서다.
    """
    cs = sorted(set(text))
    tmp = tempfile.mkdtemp()
    files = []
    dropped = []
    stack = [''.join(cs[i:i+chunk]) for i in range(0, len(cs), chunk)]
    while stack:
        part = stack.pop(0)
        f = os.path.join(tmp, 'p%d.ttf' % len(files))
        try:
            fetch_subset(family, weight, part, f)
            files.append(f)
        except Exception:
            if len(part) == 1:
                dropped.append(part)
            else:
                mid = len(part) // 2
                stack[:0] = [part[:mid], part[mid:]]
    if dropped:
        print('   버린 글자 %d개: %s' % (len(dropped), ''.join(dropped)[:60]))
    if not files:
        raise RuntimeError('한 조각도 못 받았다: ' + family)
    if len(files) == 1:
        os.replace(files[0], dest)
    else:
        from fontTools.merge import Merger
        merged = Merger().merge(files)
        merged.save(dest)
        merged.close()
    return len(files), os.path.getsize(dest)

found = chars_in_repo()
LATIN = ''.join(chr(c) for c in range(0x20, 0x7F))
JOBS = [
    ('Noto Sans',            ''.join(sorted(found['base'])) + LATIN, 'noto-base'),
    ('Noto Sans KR',         ''.join(sorted(found['hangul'] | found['cjkpunct'])) + LATIN, 'noto-kr'),
    ('Noto Sans JP',         ''.join(sorted(found['kana'] | found['han'] | found['cjkpunct'])) + LATIN, 'noto-jp'),
    ('Noto Sans SC',         ''.join(sorted(found['han'] | found['cjkpunct'])) + LATIN, 'noto-sc'),
    ('Noto Sans TC',         ''.join(sorted(found['han'] | found['cjkpunct'])) + LATIN, 'noto-tc'),
    ('Noto Sans Devanagari', ''.join(sorted(found['deva'])) + LATIN, 'noto-deva'),
]
os.makedirs('lib/og-fonts', exist_ok=True)
for family, text, name in JOBS:
    for weight, suffix in ((400, 'regular'), (700, 'bold')):
        dest = 'lib/og-fonts/%s-%s.ttf' % (name, suffix)
        n, size = build(family, weight, text, dest)
        print('%-28s %2d조각  %6.1f KB' % (os.path.basename(dest), n, size / 1024))
