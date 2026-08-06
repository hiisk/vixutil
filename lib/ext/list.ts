/**
 * 파일 확장자 200가지 — 확장자와 MIME 타입, 어떤 프로그램이 여는지만 적는다.
 *
 * 확장자 이름은 만국 공통이다. 어느 나라에서든 .webp는 .webp이고 여는 프로그램도
 * Photoshop·VLC 같은 고유명사라, 여덟 언어로 옮길 것은 설명 문장뿐이다.
 *
 * 갈래·형제 확장자·브라우저가 바로 여는지는 전부 이 세 칸에서 계산된다.
 */
export type ExtKind =
  | 'image' | 'video' | 'audio' | 'doc' | 'archive' | 'code'
  | 'font' | 'data' | 'disk' | 'ebook' | 'model' | 'subtitle' | 'exec';

export interface Ext {
  /** 점 없이 소문자로 — 주소와 화면에 그대로 쓴다 */
  ext: string;
  /** IANA 형식의 MIME 타입 */
  mime: string;
  kind: ExtKind;
  /** 사람이 읽을 수 있는 글자 파일인가 */
  text?: boolean;
  /** 여는 프로그램 — 브랜드 이름이라 언어를 가리지 않는다 */
  apps: string[];
}

const e = (ext: string, mime: string, kind: ExtKind, apps: string[], text?: boolean): Ext =>
  ({ ext, mime, kind, apps, ...(text ? { text: true } : {}) });

export const EXTS: Ext[] = [
  /* ───────── 이미지 ───────── */
  e('jpg', 'image/jpeg', 'image', ['Photos', 'Preview', 'Chrome', 'Photoshop']),
  e('jpeg', 'image/jpeg', 'image', ['Photos', 'Preview', 'Chrome', 'Photoshop']),
  e('png', 'image/png', 'image', ['Photos', 'Preview', 'Chrome', 'Photoshop']),
  e('gif', 'image/gif', 'image', ['Chrome', 'Photos', 'Preview']),
  e('webp', 'image/webp', 'image', ['Chrome', 'Photos', 'GIMP']),
  e('avif', 'image/avif', 'image', ['Chrome', 'Safari', 'GIMP']),
  e('svg', 'image/svg+xml', 'image', ['Chrome', 'Illustrator', 'Inkscape', 'Figma'], true),
  e('bmp', 'image/bmp', 'image', ['Paint', 'Preview', 'GIMP']),
  e('tiff', 'image/tiff', 'image', ['Preview', 'Photoshop', 'GIMP']),
  e('ico', 'image/vnd.microsoft.icon', 'image', ['Chrome', 'GIMP', 'Paint']),
  e('heic', 'image/heic', 'image', ['Photos', 'Preview', 'Lightroom']),
  e('heif', 'image/heif', 'image', ['Photos', 'Preview']),
  e('psd', 'image/vnd.adobe.photoshop', 'image', ['Photoshop', 'GIMP', 'Affinity Photo']),
  e('ai', 'application/postscript', 'image', ['Illustrator', 'Inkscape', 'Affinity Designer']),
  e('eps', 'application/postscript', 'image', ['Illustrator', 'Preview', 'Inkscape']),
  e('xcf', 'image/x-xcf', 'image', ['GIMP']),
  e('cr2', 'image/x-canon-cr2', 'image', ['Lightroom', 'Photoshop', 'darktable']),
  e('nef', 'image/x-nikon-nef', 'image', ['Lightroom', 'Photoshop', 'darktable']),
  e('arw', 'image/x-sony-arw', 'image', ['Lightroom', 'Photoshop', 'darktable']),
  e('dng', 'image/x-adobe-dng', 'image', ['Lightroom', 'Photoshop', 'darktable']),
  e('raf', 'image/x-fuji-raf', 'image', ['Lightroom', 'Capture One', 'darktable']),
  e('orf', 'image/x-olympus-orf', 'image', ['Lightroom', 'Photoshop', 'darktable']),
  e('rw2', 'image/x-panasonic-rw2', 'image', ['Lightroom', 'Capture One', 'darktable']),
  e('jxl', 'image/jxl', 'image', ['GIMP', 'darktable', 'XnView']),
  e('tga', 'image/x-tga', 'image', ['Photoshop', 'GIMP', 'XnView']),
  e('ppm', 'image/x-portable-pixmap', 'image', ['GIMP', 'IrfanView', 'ImageMagick']),
  e('exr', 'image/x-exr', 'image', ['Nuke', 'After Effects', 'Blender', 'Photoshop']),
  e('pcx', 'image/x-pcx', 'image', ['IrfanView', 'GIMP', 'XnView']),
  e('emf', 'image/emf', 'image', ['Windows Photo Viewer', 'Inkscape', 'LibreOffice Draw']),

  /* ───────── 영상 ───────── */
  e('mp4', 'video/mp4', 'video', ['Chrome', 'VLC', 'QuickTime', 'Premiere Pro']),
  e('mov', 'video/quicktime', 'video', ['QuickTime', 'VLC', 'Premiere Pro']),
  e('avi', 'video/x-msvideo', 'video', ['VLC', 'PotPlayer', 'MPC-HC']),
  e('mkv', 'video/x-matroska', 'video', ['VLC', 'PotPlayer', 'MPC-HC']),
  e('webm', 'video/webm', 'video', ['Chrome', 'VLC', 'Firefox']),
  e('flv', 'video/x-flv', 'video', ['VLC', 'PotPlayer']),
  e('wmv', 'video/x-ms-wmv', 'video', ['Windows Media Player', 'VLC']),
  e('m4v', 'video/x-m4v', 'video', ['QuickTime', 'VLC', 'iTunes']),
  e('mpg', 'video/mpeg', 'video', ['VLC', 'Windows Media Player']),
  e('mpeg', 'video/mpeg', 'video', ['VLC', 'Windows Media Player']),
  e('3gp', 'video/3gpp', 'video', ['VLC', 'QuickTime']),
  e('ogv', 'video/ogg', 'video', ['Firefox', 'VLC']),
  e('mts', 'video/mp2t', 'video', ['VLC', 'Premiere Pro', 'PotPlayer']),
  e('vob', 'video/mpeg', 'video', ['VLC', 'MPC-HC']),
  e('m2ts', 'video/mp2t', 'video', ['VLC', 'PotPlayer', 'Premiere Pro']),
  e('asf', 'video/x-ms-asf', 'video', ['Windows Media Player', 'VLC']),
  e('f4v', 'video/x-f4v', 'video', ['VLC', 'PotPlayer']),
  e('m2v', 'video/mpeg', 'video', ['VLC', 'MPC-HC', 'DaVinci Resolve']),
  e('rmvb', 'application/vnd.rn-realmedia-vbr', 'video', ['VLC', 'RealPlayer', 'PotPlayer']),
  e('divx', 'video/divx', 'video', ['VLC', 'DivX Player', 'PotPlayer']),

  /* ───────── 소리 ───────── */
  e('mp3', 'audio/mpeg', 'audio', ['Chrome', 'VLC', 'iTunes', 'Windows Media Player']),
  e('wav', 'audio/wav', 'audio', ['Chrome', 'VLC', 'Audacity']),
  e('flac', 'audio/flac', 'audio', ['VLC', 'foobar2000', 'Audacity']),
  e('aac', 'audio/aac', 'audio', ['iTunes', 'VLC', 'Chrome']),
  e('m4a', 'audio/mp4', 'audio', ['iTunes', 'VLC', 'QuickTime']),
  e('ogg', 'audio/ogg', 'audio', ['Firefox', 'VLC', 'Audacity']),
  e('opus', 'audio/opus', 'audio', ['Chrome', 'VLC', 'Audacity']),
  e('wma', 'audio/x-ms-wma', 'audio', ['Windows Media Player', 'VLC']),
  e('aiff', 'audio/aiff', 'audio', ['QuickTime', 'Audacity', 'Logic Pro']),
  e('mid', 'audio/midi', 'audio', ['GarageBand', 'MuseScore', 'Logic Pro']),
  e('amr', 'audio/amr', 'audio', ['VLC', 'QuickTime']),
  e('caf', 'audio/x-caf', 'audio', ['QuickTime', 'Logic Pro']),
  e('mp2', 'audio/mpeg', 'audio', ['VLC', 'Audacity', 'foobar2000']),
  e('mka', 'audio/x-matroska', 'audio', ['VLC', 'foobar2000', 'PotPlayer']),
  e('ape', 'audio/x-ape', 'audio', ['foobar2000', 'VLC']),
  e('au', 'audio/basic', 'audio', ['VLC', 'Audacity', 'QuickTime Player']),
  e('dsf', 'audio/x-dsf', 'audio', ['foobar2000', 'Audirvana', 'JRiver']),
  e('ra', 'audio/vnd.rn-realaudio', 'audio', ['VLC', 'RealPlayer']),

  /* ───────── 문서 ───────── */
  e('pdf', 'application/pdf', 'doc', ['Chrome', 'Acrobat Reader', 'Preview']),
  e('doc', 'application/msword', 'doc', ['Word', 'Google Docs', 'LibreOffice']),
  e('docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'doc', ['Word', 'Google Docs', 'LibreOffice', 'Pages']),
  e('xls', 'application/vnd.ms-excel', 'doc', ['Excel', 'Google Sheets', 'LibreOffice']),
  e('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'doc', ['Excel', 'Google Sheets', 'LibreOffice', 'Numbers']),
  e('ppt', 'application/vnd.ms-powerpoint', 'doc', ['PowerPoint', 'Google Slides', 'LibreOffice']),
  e('pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'doc', ['PowerPoint', 'Google Slides', 'Keynote']),
  e('txt', 'text/plain', 'doc', ['Notepad', 'TextEdit', 'VS Code'], true),
  e('rtf', 'application/rtf', 'doc', ['Word', 'TextEdit', 'LibreOffice'], true),
  e('odt', 'application/vnd.oasis.opendocument.text', 'doc', ['LibreOffice', 'Word', 'Google Docs']),
  e('ods', 'application/vnd.oasis.opendocument.spreadsheet', 'doc', ['LibreOffice', 'Excel', 'Google Sheets']),
  e('odp', 'application/vnd.oasis.opendocument.presentation', 'doc', ['LibreOffice', 'PowerPoint', 'Google Slides']),
  e('hwp', 'application/x-hwp', 'doc', ['Hancom Office', 'Polaris Office']),
  e('pages', 'application/vnd.apple.pages', 'doc', ['Pages', 'iCloud']),
  e('numbers', 'application/vnd.apple.numbers', 'doc', ['Numbers', 'iCloud']),
  e('key', 'application/vnd.apple.keynote', 'doc', ['Keynote', 'iCloud']),
  e('md', 'text/markdown', 'doc', ['VS Code', 'Obsidian', 'Typora'], true),
  e('tex', 'application/x-tex', 'doc', ['TeXShop', 'Overleaf', 'VS Code'], true),
  e('djvu', 'image/vnd.djvu', 'doc', ['DjVuLibre', 'Calibre', 'Okular']),
  e('chm', 'application/vnd.ms-htmlhelp', 'doc', ['HTML Help', 'Calibre', 'xCHM']),
  e('xps', 'application/vnd.ms-xpsdocument', 'doc', ['XPS Viewer', 'Okular']),
  e('dotx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'doc', ['Word', 'LibreOffice Writer']),
  e('odg', 'application/vnd.oasis.opendocument.graphics', 'doc', ['LibreOffice Draw', 'OpenOffice Draw', 'Inkscape']),
  e('wpd', 'application/vnd.wordperfect', 'doc', ['WordPerfect', 'LibreOffice Writer']),

  /* ───────── 압축 ───────── */
  e('zip', 'application/zip', 'archive', ['Explorer', 'Finder', '7-Zip', 'WinRAR']),
  e('rar', 'application/vnd.rar', 'archive', ['WinRAR', '7-Zip', 'The Unarchiver']),
  e('7z', 'application/x-7z-compressed', 'archive', ['7-Zip', 'The Unarchiver', 'Keka']),
  e('tar', 'application/x-tar', 'archive', ['Terminal', '7-Zip', 'The Unarchiver']),
  e('gz', 'application/gzip', 'archive', ['Terminal', '7-Zip', 'The Unarchiver']),
  e('bz2', 'application/x-bzip2', 'archive', ['Terminal', '7-Zip', 'Keka']),
  e('xz', 'application/x-xz', 'archive', ['Terminal', '7-Zip', 'Keka']),
  e('zst', 'application/zstd', 'archive', ['Terminal', '7-Zip']),
  e('cab', 'application/vnd.ms-cab-compressed', 'archive', ['Explorer', '7-Zip']),
  e('alz', 'application/x-alz-compressed', 'archive', ['ALZip', 'Bandizip']),
  e('egg', 'application/x-egg', 'archive', ['ALZip', 'Bandizip']),
  e('lzh', 'application/x-lzh-compressed', 'archive', ['7-Zip', 'The Unarchiver']),
  e('tgz', 'application/gzip', 'archive', ['Terminal', '7-Zip', 'The Unarchiver']),
  e('lz4', 'application/x-lz4', 'archive', ['Terminal', '7-Zip']),
  e('arj', 'application/x-arj', 'archive', ['7-Zip', 'The Unarchiver']),
  e('sit', 'application/x-stuffit', 'archive', ['StuffIt Expander', 'The Unarchiver']),
  e('lzma', 'application/x-lzma', 'archive', ['7-Zip', 'p7zip', 'The Unarchiver']),

  /* ───────── 코드·마크업 ───────── */
  e('html', 'text/html', 'code', ['Chrome', 'VS Code', 'Safari'], true),
  e('css', 'text/css', 'code', ['VS Code', 'Chrome', 'Sublime Text'], true),
  e('js', 'text/javascript', 'code', ['VS Code', 'Chrome', 'Node.js'], true),
  e('ts', 'text/typescript', 'code', ['VS Code', 'WebStorm'], true),
  e('jsx', 'text/jsx', 'code', ['VS Code', 'WebStorm'], true),
  e('tsx', 'text/tsx', 'code', ['VS Code', 'WebStorm'], true),
  e('json', 'application/json', 'code', ['VS Code', 'Chrome', 'Notepad'], true),
  e('xml', 'application/xml', 'code', ['Chrome', 'VS Code', 'Notepad'], true),
  e('yaml', 'application/yaml', 'code', ['VS Code', 'Vim'], true),
  e('py', 'text/x-python', 'code', ['VS Code', 'PyCharm', 'IDLE'], true),
  e('java', 'text/x-java-source', 'code', ['IntelliJ IDEA', 'Eclipse', 'VS Code'], true),
  e('c', 'text/x-c', 'code', ['VS Code', 'Visual Studio', 'CLion'], true),
  e('cpp', 'text/x-c++src', 'code', ['VS Code', 'Visual Studio', 'CLion'], true),
  e('cs', 'text/x-csharp', 'code', ['Visual Studio', 'Rider', 'VS Code'], true),
  e('go', 'text/x-go', 'code', ['VS Code', 'GoLand'], true),
  e('rs', 'text/x-rust', 'code', ['VS Code', 'RustRover'], true),
  e('rb', 'text/x-ruby', 'code', ['VS Code', 'RubyMine'], true),
  e('php', 'application/x-httpd-php', 'code', ['VS Code', 'PhpStorm'], true),
  e('swift', 'text/x-swift', 'code', ['Xcode', 'VS Code'], true),
  e('kt', 'text/x-kotlin', 'code', ['IntelliJ IDEA', 'Android Studio'], true),
  e('sh', 'application/x-sh', 'code', ['Terminal', 'VS Code', 'Vim'], true),
  e('sql', 'application/sql', 'code', ['DBeaver', 'VS Code', 'MySQL Workbench'], true),
  e('scss', 'text/x-scss', 'code', ['VS Code', 'Sublime Text', 'WebStorm'], true),
  e('less', 'text/x-less', 'code', ['VS Code', 'Sublime Text', 'WebStorm'], true),
  e('lua', 'text/x-lua', 'code', ['VS Code', 'ZeroBrane Studio'], true),
  e('pl', 'text/x-perl', 'code', ['VS Code', 'Vim', 'Padre'], true),
  e('ipynb', 'application/x-ipynb+json', 'code', ['Jupyter', 'VS Code', 'Colab'], true),
  e('dart', 'text/x-dart', 'code', ['VS Code', 'Android Studio', 'IntelliJ IDEA'], true),
  e('hs', 'text/x-haskell', 'code', ['VS Code', 'Vim'], true),
  e('r', 'text/x-r', 'code', ['RStudio', 'VS Code'], true),
  e('vue', 'text/x-vue', 'code', ['VS Code', 'WebStorm'], true),

  /* ───────── 글꼴 ───────── */
  e('ttf', 'font/ttf', 'font', ['Font Book', 'Windows Font Viewer', 'FontForge']),
  e('otf', 'font/otf', 'font', ['Font Book', 'Windows Font Viewer', 'FontForge']),
  e('woff', 'font/woff', 'font', ['Chrome', 'FontForge']),
  e('woff2', 'font/woff2', 'font', ['Chrome', 'FontForge']),
  e('eot', 'application/vnd.ms-fontobject', 'font', ['Internet Explorer', 'FontForge']),
  e('ttc', 'font/collection', 'font', ['Font Book', 'FontForge']),
  e('pfb', 'application/x-font-type1', 'font', ['FontForge', 'Font Book']),

  /* ───────── 데이터 ───────── */
  e('csv', 'text/csv', 'data', ['Excel', 'Google Sheets', 'Numbers', 'VS Code'], true),
  e('tsv', 'text/tab-separated-values', 'data', ['Excel', 'Google Sheets', 'VS Code'], true),
  e('sqlite', 'application/vnd.sqlite3', 'data', ['DB Browser for SQLite', 'DBeaver']),
  e('db', 'application/vnd.sqlite3', 'data', ['DB Browser for SQLite', 'DBeaver']),
  e('log', 'text/plain', 'data', ['Notepad', 'VS Code', 'Console'], true),
  e('ini', 'text/plain', 'data', ['Notepad', 'VS Code'], true),
  e('toml', 'application/toml', 'data', ['VS Code', 'Vim'], true),
  e('parquet', 'application/vnd.apache.parquet', 'data', ['DuckDB', 'pandas', 'Spark']),
  e('bak', 'application/octet-stream', 'data', ['Explorer', 'Finder']),
  e('tmp', 'application/octet-stream', 'data', ['Explorer', 'Finder']),
  e('avro', 'application/vnd.apache.avro', 'data', ['DuckDB', 'Spark', 'Hadoop']),
  e('ndjson', 'application/x-ndjson', 'data', ['VS Code', 'DuckDB', 'jq'], true),
  e('hdf5', 'application/x-hdf5', 'data', ['HDFView', 'MATLAB', 'Python']),
  e('dbf', 'application/x-dbf', 'data', ['Excel', 'LibreOffice Calc', 'QGIS']),

  /* ───────── 디스크 이미지 ───────── */
  e('iso', 'application/x-iso9660-image', 'disk', ['Explorer', 'Finder', 'Rufus', '7-Zip']),
  e('dmg', 'application/x-apple-diskimage', 'disk', ['Finder', 'DiskImageMounter']),
  e('img', 'application/octet-stream', 'disk', ['Rufus', 'balenaEtcher', '7-Zip']),
  e('vhd', 'application/octet-stream', 'disk', ['Hyper-V', 'VirtualBox', 'Disk Management']),
  e('vmdk', 'application/x-vmdk', 'disk', ['VMware', 'VirtualBox']),
  e('vdi', 'application/x-virtualbox-vdi', 'disk', ['VirtualBox']),
  e('qcow2', 'application/x-qemu-disk', 'disk', ['QEMU', 'virt-manager']),

  /* ───────── 전자책 ───────── */
  e('epub', 'application/epub+zip', 'ebook', ['Apple Books', 'Calibre', 'Google Play Books']),
  e('mobi', 'application/x-mobipocket-ebook', 'ebook', ['Kindle', 'Calibre']),
  e('azw3', 'application/vnd.amazon.ebook', 'ebook', ['Kindle', 'Calibre']),
  e('cbz', 'application/vnd.comicbook+zip', 'ebook', ['CDisplayEx', 'Calibre', 'YACReader']),
  e('cbr', 'application/vnd.comicbook-rar', 'ebook', ['CDisplayEx', 'Calibre', 'YACReader']),
  e('fb2', 'application/x-fictionbook+xml', 'ebook', ['Calibre', 'FBReader'], true),
  e('azw', 'application/vnd.amazon.ebook', 'ebook', ['Kindle', 'Calibre']),

  /* ───────── 3D ───────── */
  e('obj', 'model/obj', 'model', ['Blender', 'MeshLab', '3D Viewer'], true),
  e('stl', 'model/stl', 'model', ['Blender', 'Cura', 'PrusaSlicer']),
  e('fbx', 'application/octet-stream', 'model', ['Blender', 'Unity', 'Maya']),
  e('gltf', 'model/gltf+json', 'model', ['Blender', 'Three.js', 'Windows 3D Viewer'], true),
  e('glb', 'model/gltf-binary', 'model', ['Blender', 'Three.js', 'Windows 3D Viewer']),
  e('blend', 'application/x-blender', 'model', ['Blender']),
  e('dae', 'model/vnd.collada+xml', 'model', ['Blender', 'MeshLab', 'SketchUp'], true),
  e('usdz', 'model/vnd.usdz+zip', 'model', ['Quick Look', 'Blender', 'Reality Composer']),
  e('3mf', 'model/3mf', 'model', ['Cura', 'PrusaSlicer', '3D Builder']),

  /* ───────── 자막 ───────── */
  e('srt', 'application/x-subrip', 'subtitle', ['VLC', 'PotPlayer', 'Notepad'], true),
  e('vtt', 'text/vtt', 'subtitle', ['Chrome', 'VLC', 'VS Code'], true),
  e('smi', 'application/smil+xml', 'subtitle', ['PotPlayer', 'VLC', 'Notepad'], true),
  e('ass', 'text/x-ssa', 'subtitle', ['VLC', 'Aegisub', 'PotPlayer'], true),
  e('ttml', 'application/ttml+xml', 'subtitle', ['VLC', 'VS Code'], true),
  e('sbv', 'text/x-sbv', 'subtitle', ['YouTube Studio', 'Subtitle Edit'], true),

  /* ───────── 실행·설치 ───────── */
  e('exe', 'application/vnd.microsoft.portable-executable', 'exec', ['Windows']),
  e('msi', 'application/x-msdownload', 'exec', ['Windows Installer']),
  e('apk', 'application/vnd.android.package-archive', 'exec', ['Android']),
  e('ipa', 'application/octet-stream', 'exec', ['iOS', 'Xcode']),
  e('app', 'application/octet-stream', 'exec', ['macOS']),
  e('deb', 'application/vnd.debian.binary-package', 'exec', ['dpkg', 'GDebi']),
  e('rpm', 'application/x-rpm', 'exec', ['dnf', 'rpm']),
  e('jar', 'application/java-archive', 'exec', ['Java', 'IntelliJ IDEA']),
  e('ps1', 'application/x-powershell', 'exec', ['PowerShell', 'VS Code'], true),
  e('flatpak', 'application/vnd.flatpak', 'exec', ['Flatpak', 'GNOME Software']),
  e('bat', 'application/x-bat', 'exec', ['Command Prompt', 'Notepad', 'VS Code'], true),

  /* ───────── 늘린 것 — 위 목록에 없는 실제 확장자 ───────── */
  e('jfif', 'image/jpeg', 'image', ['Chrome', 'Photos', 'Preview']),
  e('apng', 'image/apng', 'image', ['Chrome', 'Firefox', 'GIMP']),
  e('sr2', 'image/x-sony-sr2', 'image', ['Lightroom', 'Capture One', 'RawTherapee']),
  e('pef', 'image/x-pentax-pef', 'image', ['Lightroom', 'RawTherapee', 'darktable']),
  e('srw', 'image/x-samsung-srw', 'image', ['Lightroom', 'RawTherapee']),
  e('wmf', 'image/wmf', 'image', ['Word', 'LibreOffice', 'Inkscape']),
  e('ogm', 'video/ogg', 'video', ['VLC', 'MPV']),
  e('mxf', 'application/mxf', 'video', ['Premiere Pro', 'DaVinci Resolve', 'VLC']),
  e('braw', 'video/x-blackmagic-raw', 'video', ['DaVinci Resolve']),
  e('r3d', 'video/x-red-r3d', 'video', ['DaVinci Resolve', 'Premiere Pro']),
  e('wv', 'audio/wavpack', 'audio', ['foobar2000', 'VLC']),
  e('tta', 'audio/tta', 'audio', ['foobar2000', 'VLC']),
  e('m3u', 'audio/x-mpegurl', 'audio', ['VLC', 'iTunes', 'foobar2000'], true),
  e('pls', 'audio/x-scpls', 'audio', ['VLC', 'foobar2000'], true),
  e('odf', 'application/vnd.oasis.opendocument.formula', 'doc', ['LibreOffice']),
  e('dotm', 'application/vnd.ms-word.template.macroEnabled.12', 'doc', ['Word']),
  e('xlsm', 'application/vnd.ms-excel.sheet.macroEnabled.12', 'doc', ['Excel', 'LibreOffice']),
  e('pptm', 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'doc', ['PowerPoint']),
  e('pub', 'application/x-mspublisher', 'doc', ['Publisher']),
  e('vsdx', 'application/vnd.ms-visio.drawing', 'doc', ['Visio', 'draw.io']),
  e('lzo', 'application/x-lzop', 'archive', ['7-Zip', 'lzop']),
  e('zipx', 'application/zip', 'archive', ['WinZip', '7-Zip']),
  e('pea', 'application/x-pea', 'archive', ['PeaZip']),
  e('war', 'application/java-archive', 'archive', ['Tomcat', '7-Zip']),
  e('zig', 'text/x-zig', 'code', ['VS Code', 'Zed'], true),
  e('ex', 'text/x-elixir', 'code', ['VS Code', 'Zed'], true),
  e('clj', 'text/x-clojure', 'code', ['VS Code', 'IntelliJ IDEA'], true),
  e('erl', 'text/x-erlang', 'code', ['VS Code', 'Emacs'], true),
  e('scala', 'text/x-scala', 'code', ['IntelliJ IDEA', 'VS Code'], true),
  e('groovy', 'text/x-groovy', 'code', ['IntelliJ IDEA', 'VS Code'], true),
  e('m', 'text/x-objcsrc', 'code', ['Xcode', 'VS Code'], true),
  e('svelte', 'text/x-svelte', 'code', ['VS Code', 'WebStorm'], true),
  e('astro', 'text/x-astro', 'code', ['VS Code'], true),
  e('nim', 'text/x-nim', 'code', ['VS Code'], true),
  e('proto', 'text/x-protobuf', 'code', ['VS Code', 'IntelliJ IDEA'], true),
  e('graphql', 'application/graphql', 'code', ['VS Code', 'Insomnia'], true),
  e('feather', 'application/vnd.apache.arrow.file', 'data', ['Python', 'R']),
  e('orc', 'application/x-orc', 'data', ['Spark', 'Hive']),
  e('jsonl', 'application/jsonl', 'data', ['VS Code', 'Python'], true),
  e('env', 'text/plain', 'data', ['VS Code', 'Vim'], true),
  e('cfg', 'text/plain', 'data', ['VS Code', 'Vim'], true),
  e('properties', 'text/x-java-properties', 'data', ['IntelliJ IDEA', 'VS Code'], true),
  e('sup', 'application/x-pgs', 'subtitle', ['VLC', 'MPV']),
  e('idx', 'application/x-vobsub', 'subtitle', ['VLC', 'MPV'], true),
  e('lrc', 'application/x-lrc', 'subtitle', ['MPV', 'foobar2000'], true),
  e('fnt', 'application/x-font-windows', 'font', ['FontForge']),
  e('bdf', 'application/x-font-bdf', 'font', ['FontForge'], true),
  e('pfm', 'application/x-font-printer-metric', 'font', ['FontForge']),
  e('lit', 'application/x-ms-reader', 'ebook', ['Calibre']),
  e('pdb', 'application/vnd.palm', 'ebook', ['Calibre']),
  e('cb7', 'application/x-cb7', 'ebook', ['Calibre', 'CDisplayEx']),
  e('ply', 'model/ply', 'model', ['Blender', 'MeshLab']),
  e('3ds', 'model/3ds', 'model', ['Blender', '3ds Max']),
  e('step', 'model/step', 'model', ['FreeCAD', 'Fusion 360']),
  e('igs', 'model/iges', 'model', ['FreeCAD', 'Fusion 360']),
  e('nrrd', 'application/x-nrrd', 'model', ['3D Slicer', 'ParaView']),
  e('bin', 'application/octet-stream', 'disk', ['Daemon Tools', 'PowerISO']),
  e('cue', 'application/x-cue', 'disk', ['Daemon Tools', 'foobar2000'], true),
  e('toast', 'application/x-toast', 'disk', ['Toast']),
  e('wim', 'application/x-ms-wim', 'disk', ['7-Zip', 'DISM']),
  e('appimage', 'application/x-appimage', 'exec', ['Linux']),
  e('snap', 'application/vnd.snap', 'exec', ['Linux']),
  e('pkg', 'application/x-newton-compatible-pkg', 'exec', ['macOS Installer']),
  e('xapk', 'application/x-xapk', 'exec', ['Android']),
  e('vbs', 'text/vbscript', 'exec', ['Windows Script Host'], true),
  e('cmd', 'application/x-bat', 'exec', ['cmd.exe'], true),
];

export const EXT_KINDS: ExtKind[] = [
  'image', 'video', 'audio', 'doc', 'archive', 'code', 'data', 'subtitle', 'font', 'ebook', 'model', 'disk', 'exec',
];

export const EXT_SLUGS = EXTS.map(x => x.ext);

export const extOf = (slug: string): Ext | undefined => EXTS.find(x => x.ext === slug);

export const extsOfKind = (kind: ExtKind): Ext[] => EXTS.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 문서 아이콘으로 그려진다 */
export const EXT_ICON = '📄';
