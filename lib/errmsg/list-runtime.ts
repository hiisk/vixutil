/**
 * python·docker·js·build이 찍는 오류 문구 55가지 — 문구와 도구, 고치는 명령 한 줄만 적는다.
 *
 * 오류 문구는 프로그램이 만든 문자열이라 나라를 가리지 않는다.
 * ModuleNotFoundError: No module named 'requests'는 어느 나라에서든 그 문자열이고,
 * 사람은 그것을 그대로 복사해 검색창에 넣는다. 그래서 여기에는 옮길 것이 없는 것만
 * 둔다 — 뜻과 원인과 대처를 담은 열 언어 서술은 desc-runtime.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 도구가 실제로 찍는 문구를 그대로 적는다. Traceback의 마지막 한 줄, 브라우저
 * 콘솔의 빨간 한 줄, tsc의 error TSxxxx 한 줄처럼 사람이 붙여 넣는 그 한 줄만
 * 남기고 앞뒤의 스택 프레임은 뺀다. 문구를 확인하지 못한 것과 고치는 방법을
 * 확인하지 못한 것은 싣지 않는다 — 여기서는 틀린 대처 한 줄이 남의 데이터를 지운다.
 *
 * 판마다 문구가 바뀐 것은 지금 판을 싣고, 옛 문구는 설명에 적는다. 3.11에서 바뀐
 * UnboundLocalError와 Chrome 111에서 바뀐 JSON 오류가 그렇다. 판이 갈리는 자리는
 * tool에 'python 3.11+'처럼 적어 둔다.
 *
 * 이름·경로·포트처럼 사람마다 다른 자리는 흔한 보기를 그대로 박아 둔다.
 * 자리표(<path>)로 두면 검색해 온 문구와 눈으로 맞춰 볼 수가 없다.
 *
 * 겹치는 것은 싣지 않는다. 'FATAL ERROR: Reached heap limit'은 npm 쪽
 * javascript-heap-out-of-memory에 이미 있어 여기서 뺐다 — 같은 문자열에 주소가
 * 둘이 되면 어느 쪽도 검색에서 이기지 못한다.
 *
 * 갈래는 넷이다 — python(파이썬)·docker(컨테이너)·js(브라우저와 node 실행 중)·
 * build(타입 검사와 번들러). 어느 도구가 찍었는지는 tool에 따로 적는다.
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

export const ERR_RUNTIME: ErrItem[] = [
  /* ───────── python — 없는 것을 부르기 ───────── */
  e(
    'no-module-named',
    "ModuleNotFoundError: No module named 'requests'",
    'python',
    'python',
    'python -m pip install requests',
    ['externally-managed-environment', 'circular-import'],
  ),

  e(
    'externally-managed-environment',
    'error: externally-managed-environment',
    'python',
    'pip 23+',
    'python3 -m venv .venv && source .venv/bin/activate',
    ['no-module-named', 'permission-denied-13'],
  ),

  e(
    'circular-import',
    "ImportError: cannot import name 'User' from partially initialized module 'models' (most likely due to a circular import)",
    'python',
    'python',
    '',
    ['no-module-named', 'unbound-local'],
  ),

  /* ───────── python — 들여쓰기와 문법 ───────── */
  e(
    'unexpected-indent',
    'IndentationError: unexpected indent',
    'python',
    'python',
    '',
    ['tab-error', 'invalid-syntax'],
  ),

  e(
    'tab-error',
    'TabError: inconsistent use of tabs and spaces in indentation',
    'python',
    'python',
    'python -m tabnanny app.py',
    ['unexpected-indent', 'invalid-syntax'],
  ),

  e(
    'invalid-syntax',
    'SyntaxError: invalid syntax',
    'python',
    'python',
    'python -m py_compile app.py',
    ['unexpected-indent', 'tab-error'],
  ),

  /* ───────── python — None과 없는 열쇠 ───────── */
  e(
    'nonetype-not-subscriptable',
    "TypeError: 'NoneType' object is not subscriptable",
    'python',
    'python',
    '',
    ['nonetype-no-attribute', 'key-error'],
  ),

  e(
    'nonetype-no-attribute',
    "AttributeError: 'NoneType' object has no attribute 'get'",
    'python',
    'python',
    '',
    ['nonetype-not-subscriptable', 'unbound-local'],
  ),

  e(
    'key-error',
    "KeyError: 'name'",
    'python',
    'python',
    '',
    ['list-index-out-of-range', 'nonetype-not-subscriptable'],
  ),

  e(
    'list-index-out-of-range',
    'IndexError: list index out of range',
    'python',
    'python',
    '',
    ['key-error', 'zero-division'],
  ),

  /* ───────── python — 값과 셈 ───────── */
  e(
    'invalid-literal-for-int',
    "ValueError: invalid literal for int() with base 10: '3.5'",
    'python',
    'python',
    '',
    ['unicode-decode-error', 'zero-division'],
  ),

  e(
    'unicode-decode-error',
    "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte",
    'python',
    'python',
    '',
    ['invalid-literal-for-int', 'no-module-named'],
  ),

  e(
    'zero-division',
    'ZeroDivisionError: division by zero',
    'python',
    'python',
    '',
    ['list-index-out-of-range', 'invalid-literal-for-int'],
  ),

  e(
    'recursion-error',
    'RecursionError: maximum recursion depth exceeded',
    'python',
    'python',
    '',
    ['maximum-call-stack-size-exceeded', 'circular-import'],
  ),

  /* ───────── python — 변수와 인자 ───────── */
  e(
    'unbound-local',
    "UnboundLocalError: cannot access local variable 'count' where it is not associated with a value",
    'python',
    'python 3.11+',
    '',
    ['nonetype-no-attribute', 'positional-argument'],
  ),

  e(
    'positional-argument',
    'TypeError: greet() takes 1 positional argument but 2 were given',
    'python',
    'python',
    '',
    ['unbound-local', 'nonetype-no-attribute'],
  ),

  /* ───────── python — 운영체제가 거절할 때 ───────── */
  e(
    'permission-denied-13',
    'PermissionError: [Errno 13] Permission denied',
    'python',
    'python',
    'ls -ld /var/log/app.log',
    ['address-already-in-use', 'externally-managed-environment'],
  ),

  e(
    'address-already-in-use',
    'OSError: [Errno 98] Address already in use',
    'python',
    'python',
    'lsof -i :8000',
    ['permission-denied-13', 'port-is-already-allocated'],
  ),

  /* ───────── docker — 데몬과 자리 다툼 ───────── */
  e(
    'cannot-connect-docker-daemon',
    'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?',
    'docker',
    'docker',
    'sudo systemctl start docker',
    ['unauthorized-incorrect-username-or-password', 'no-space-left-on-device'],
  ),

  e(
    'port-is-already-allocated',
    'Bind for 0.0.0.0:8080 failed: port is already allocated',
    'docker',
    'docker',
    'docker ps --filter publish=8080',
    ['container-name-already-in-use', 'address-already-in-use'],
  ),

  e(
    'container-name-already-in-use',
    'Conflict. The container name "/api" is already in use by container',
    'docker',
    'docker',
    'docker rm -f api',
    ['port-is-already-allocated', 'oci-runtime-create-failed'],
  ),

  e(
    'no-space-left-on-device',
    'failed to register layer: Error processing tar file(exit status 1): no space left on device',
    'docker',
    'docker',
    'docker system df',
    ['cannot-connect-docker-daemon', 'failed-to-solve'],
  ),

  /* ───────── docker — 이미지를 못 가져올 때 ───────── */
  e(
    'pull-access-denied',
    "pull access denied for myapp, repository does not exist or may require 'docker login'",
    'docker',
    'docker',
    'docker login',
    ['unauthorized-incorrect-username-or-password', 'manifest-unknown'],
  ),

  e(
    'manifest-unknown',
    'manifest for myapp:v2 not found: manifest unknown',
    'docker',
    'docker',
    'docker manifest inspect myapp:v2',
    ['pull-access-denied', 'exec-format-error'],
  ),

  e(
    'unauthorized-incorrect-username-or-password',
    'unauthorized: incorrect username or password',
    'docker',
    'docker',
    'docker logout && docker login',
    ['pull-access-denied', 'cannot-connect-docker-daemon'],
  ),

  /* ───────── docker — 빌드가 멈출 때 ───────── */
  e(
    'failed-to-solve',
    'failed to solve: process "/bin/sh -c npm ci" did not complete successfully: exit code: 1',
    'docker',
    'buildkit',
    'docker build --progress=plain --no-cache .',
    ['copy-failed-not-in-build-context', 'no-space-left-on-device'],
  ),

  e(
    'copy-failed-not-in-build-context',
    'COPY failed: file not found in build context or excluded by .dockerignore',
    'docker',
    'docker',
    'cat .dockerignore',
    ['failed-to-solve', 'exec-user-process-caused-no-such-file'],
  ),

  /* ───────── docker — 컨테이너가 바로 죽을 때 ───────── */
  e(
    'exec-format-error',
    'exec /usr/local/bin/entrypoint.sh: exec format error',
    'docker',
    'docker',
    'docker build --platform=linux/amd64 .',
    ['exec-user-process-caused-no-such-file', 'manifest-unknown'],
  ),

  e(
    'exec-user-process-caused-no-such-file',
    'standard_init_linux.go: exec user process caused: no such file or directory',
    'docker',
    'runc',
    'dos2unix entrypoint.sh',
    ['exec-format-error', 'oci-runtime-create-failed', 'lf-will-be-replaced-by-crlf'],
  ),

  e(
    'oci-runtime-create-failed',
    'OCI runtime create failed: exec: "bash": executable file not found in $PATH: unknown',
    'docker',
    'runc',
    'docker run --rm -it myapp sh',
    ['exec-user-process-caused-no-such-file', 'container-name-already-in-use'],
  ),

  /* ───────── js — undefined를 만졌을 때 ───────── */
  e(
    'cannot-read-properties-of-undefined',
    "Uncaught TypeError: Cannot read properties of undefined (reading 'name')",
    'js',
    'chrome',
    '',
    ['is-not-a-function', 'objects-are-not-valid-as-a-react-child'],
  ),

  e(
    'is-not-a-function',
    'TypeError: items.map is not a function',
    'js',
    'chrome',
    '',
    ['cannot-read-properties-of-undefined', 'unexpected-token-json'],
  ),

  e(
    'maximum-call-stack-size-exceeded',
    'RangeError: Maximum call stack size exceeded',
    'js',
    'node',
    '',
    ['too-many-re-renders', 'recursion-error'],
  ),

  /* ───────── js — 응답이 JSON이 아닐 때 ───────── */
  e(
    'unexpected-token-json',
    'SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON',
    'js',
    'chrome 111+',
    'curl -s https://api.example.com/data | head -5',
    ['unexpected-end-of-json-input', 'failed-to-fetch'],
  ),

  e(
    'unexpected-end-of-json-input',
    'SyntaxError: Unexpected end of JSON input',
    'js',
    'chrome',
    '',
    ['unexpected-token-json', 'failed-to-fetch'],
  ),

  e(
    'failed-to-fetch',
    'TypeError: Failed to fetch',
    'js',
    'chrome',
    'curl -i https://api.example.com/data',
    ['cors-no-allow-origin', 'unexpected-token-json'],
  ),

  e(
    'cors-no-allow-origin',
    "Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    'js',
    'chrome',
    'curl -I -H "Origin: http://localhost:3000" https://api.example.com/data',
    ['failed-to-fetch', 'unexpected-token-json'],
  ),

  /* ───────── js — ESM과 CommonJS 사이 ───────── */
  e(
    'cannot-use-import-statement-outside-a-module',
    'SyntaxError: Cannot use import statement outside a module',
    'js',
    'node',
    'npm pkg set type=module',
    ['require-is-not-defined-in-es-module-scope', 'err-module-not-found'],
  ),

  e(
    'require-is-not-defined-in-es-module-scope',
    'ReferenceError: require is not defined in ES module scope, you can use import instead',
    'js',
    'node',
    'mv script.js script.cjs',
    ['cannot-use-import-statement-outside-a-module', 'err-module-not-found'],
  ),

  e(
    'err-module-not-found',
    "Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/app/src/util' imported from /app/src/index.js",
    'js',
    'node',
    '',
    ['cannot-use-import-statement-outside-a-module', 'vite-failed-to-resolve-import', 'cannot-find-module'],
  ),

  /* ───────── js — 서버에서 돌 때 ───────── */
  e(
    'window-is-not-defined',
    'ReferenceError: window is not defined',
    'js',
    'node',
    '',
    ['hydration-failed', 'next-needs-use-client'],
  ),

  e(
    'hydration-failed',
    'Hydration failed because the initial UI does not match what was rendered on the server',
    'js',
    'react 18+',
    '',
    ['window-is-not-defined', 'next-needs-use-client'],
  ),

  /* ───────── js — React가 렌더 중에 거절할 때 ───────── */
  e(
    'objects-are-not-valid-as-a-react-child',
    'Objects are not valid as a React child (found: object with keys {name, id})',
    'js',
    'react',
    '',
    ['cannot-read-properties-of-undefined', 'unique-key-prop'],
  ),

  e(
    'unique-key-prop',
    'Each child in a list should have a unique "key" prop.',
    'js',
    'react',
    '',
    ['objects-are-not-valid-as-a-react-child', 'too-many-re-renders'],
  ),

  e(
    'too-many-re-renders',
    'Too many re-renders. React limits the number of renders to prevent an infinite loop.',
    'js',
    'react',
    '',
    ['maximum-call-stack-size-exceeded', 'unique-key-prop'],
  ),

  /* ───────── build — tsc가 멈추는 네 자리 ───────── */
  e(
    'ts2307',
    "error TS2307: Cannot find module 'lodash' or its corresponding type declarations.",
    'build',
    'tsc',
    'npm i -D @types/lodash',
    ['ts2339', 'err-module-not-found'],
  ),

  e(
    'ts2339',
    "error TS2339: Property 'user' does not exist on type 'Request'.",
    'build',
    'tsc',
    '',
    ['ts2345', 'ts18048'],
  ),

  e(
    'ts2345',
    "error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.",
    'build',
    'tsc',
    '',
    ['ts2339', 'ts7006'],
  ),

  e(
    'ts18048',
    "error TS18048: 'user' is possibly 'undefined'.",
    'build',
    'tsc 4.9+',
    '',
    ['ts2339', 'cannot-read-properties-of-undefined'],
  ),

  e(
    'ts7006',
    "error TS7006: Parameter 'req' implicitly has an 'any' type.",
    'build',
    'tsc',
    '',
    ['ts2345', 'ts2339'],
  ),

  /* ───────── build — 파서와 번들러 ───────── */
  e(
    'eslint-parsing-error',
    'Parsing error: Unexpected token',
    'build',
    'eslint',
    'npx eslint --print-config app.ts',
    ['need-an-appropriate-loader', 'invalid-syntax'],
  ),

  e(
    'need-an-appropriate-loader',
    'You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.',
    'build',
    'webpack',
    '',
    ['eslint-parsing-error', 'vite-failed-to-resolve-import'],
  ),

  e(
    'vite-failed-to-resolve-import',
    'Failed to resolve import "./utils" from "src/main.ts". Does the file exist?',
    'build',
    'vite',
    'git ls-files src | grep -i utils',
    ['err-module-not-found', 'ts2307'],
  ),

  e(
    'next-needs-use-client',
    "You're importing a component that needs useState. This React hook only works in a client component.",
    'build',
    'next',
    '',
    ['window-is-not-defined', 'hydration-failed'],
  ),

  e(
    'engine-node-incompatible',
    'The engine "node" is incompatible with this module. Expected version ">=20"',
    'build',
    'yarn 1',
    'nvm install 20 && nvm use 20',
    ['ebadengine-unsupported-engine', 'javascript-heap-out-of-memory'],
  ),
];
