import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  /*
   * 타입 검사는 next build 안이 아니라 **그 앞에서 따로** 돌린다
   * (package.json의 "build": "tsc --noEmit && next build && …").
   *
   * 예전에 Vercel이 "Running TypeScript"에서 exit 137로 죽었다. tsc 자체는 냉간에서도
   * 1.3GB·17초밖에 안 쓰지만, next build가 3만 페이지를 컴파일한 힙을 그대로 쥔 채
   * 그 위에서 타입 검사를 시작해서 봉우리가 겹쳤다. 앞으로 빼니 최대 사용량이
   * 합이 아니라 둘 중 큰 쪽이 되면서 그 자리는 통과했다.
   *
   * 검사를 건너뛰는 것이 아니다. 여기서 끄지 않으면 같은 일을 두 번 하면서
   * 두 번째는 가장 나쁜 시점에 한다.
   */
  typescript: { ignoreBuildErrors: true },

  /*
   * 소스맵은 빌드 중에만 메모리를 먹고 정적 내보내기 결과물에는 쓰이지 않는다.
   * 기본값도 false지만 페이지가 3만 장이면 이 한 줄이 지켜 주는 양이 크므로
   * 명시해 둔다 — 누가 디버깅하려고 켰다가 잊는 일을 막는다.
   */
  productionBrowserSourceMaps: false,

  experimental: {
    /*
     * ── exit 137(컨테이너 OOM)의 원인 ──────────────────────────
     * node는 힙 상한을 **시스템 전체 메모리**를 보고 정한다. 8GB 기계에서 재 보면
     * 프로세스당 4,192MB다. 워커가 넷이면 허용된 힙만 16.8GB — 컨테이너가 가진
     * 8GB의 두 배다.
     *
     * 로컬(macOS)에서는 메모리 압축과 스왑이 봉우리를 받아 줘서 2GB 근처에서
     * 끝난다. Vercel의 리눅스 컨테이너는 스왑이 없고 cgroup 상한이 딱딱해서,
     * 워커 몇 개가 조금만 위로 흘러도 커널이 죽인다. 로그에서 본 자리가 거기다.
     *
     * 그래서 세 가지를 같이 건다.
     *   1) 워커 수를 둘로 — 아래 cpus
     *   2) 워커 하나가 동시에 그리는 장수를 넷으로 — 아래 staticGenerationMaxConcurrency
     *   3) 힙 상한을 명시 — package.json의 NODE_OPTIONS=--max-old-space-size=1536
     *
     * 2번을 빠뜨려서 한 번 더 죽었다. 워커만 줄였더니 "Collecting page data"는
     * 통과했지만 "Generating static pages" 24,233/36,812에서 또 137이 났다.
     * staticGenerationMaxConcurrency의 기본값이 8이라, 워커를 반으로 줄여도
     * 워커마다 여전히 8장을 동시에 그린다 — 2×8로 16장이 한꺼번에 메모리에 뜬다.
     * 워커 수는 그 배수의 한쪽일 뿐이었다.
     *
     * 3번은 실측으로 정한다. 로컬에서 가장 바쁜 워커가 536MB, 주 프로세스가
     * 868MB였다. 1536MB면 넉넉하고, 최악이라도 (주+워커 둘)×1.5GB ≈ 4.5GB로
     * 8GB 안에 실제 여유가 남는다. 2048은 너무 후했다.
     *
     * 주 프로세스 + 워커 둘 × 2GB ≈ 6GB로, 8GB 안에 여유를 두고 들어간다.
     */
    cpus: 2,
    memoryBasedWorkersCount: true,

    /*
     * 워커 하나가 동시에 그리는 페이지 수. 기본값 8은 페이지가 3만 장이고
     * 컨테이너가 8GB인 이 사이트에는 과하다 — 동시에 그리는 만큼 렌더 트리가
     * 한꺼번에 살아 있는다. cpus와 곱해져서 실제 봉우리를 만드는 값이라,
     * 워커만 줄이고 이걸 두면 절반밖에 안 줄어든다.
     */
    staticGenerationMaxConcurrency: 4,

    /*
     * ── 컴파일 단계(Turbopack)의 메모리 상한 ───────────────────────
     * 2026-08-05, 새 섹션 서른둘을 합쳐 page.tsx가 1,954 → 2,594가 되자
     * "Creating an optimized production build"에서 6분 반 만에 exit 137이 났다.
     * 컴파일이 끝나기도 전이라, 워커 수나 렌더 동시성으로는 손댈 수 없는 자리다.
     *
     * turbopackMemoryLimit은 **바이트** 단위이고 기본값이 없다 — 즉 그냥 두면
     * Turbopack이 제한 없이 쓴다. 빌드 컨테이너가 8GB이고 주 프로세스가
     * 1.5GB(NODE_OPTIONS)를 잡으므로, Turbopack에 4GB를 목표로 준다.
     * 남는 2.5GB가 OS와 페이지 캐시 몫이다.
     *
     * 목표치라서 딱 잘리는 상한은 아니다 — 그 언저리에서 캐시를 비우기
     * 시작한다. 이걸로도 모자라면 다음 손은 빌드 머신을 키우는 쪽이다.
     */
    turbopackMemoryLimit: 4 * 1024 ** 3,

    /*
     * 이 줄은 지금 아무 일도 하지 않는다 — Next 16의 next build는 Turbopack만
     * 쓰고(webpack 플래그가 없어졌다) 이 설정은 웹팩 전용이다. 지우지 않고 두는
     * 것은, 나중에 웹팩으로 되돌아갈 길이 생기면 그때 다시 필요하기 때문이다.
     */
    webpackMemoryOptimizations: true,

    /* 서버 소스맵도 같은 이유로 끈다 — 빌드 중에만 메모리를 먹는다 */
    serverSourceMaps: false,

    /*
     * 켜져 있으면 페이지 모듈 전부를 시작 시점에 메모리로 올린다. page.tsx가
     * 1,900장이라 그 선행 적재가 그대로 최대 사용량이 된다. 첫 응답이 느려지는
     * 대신 메모리를 아끼는 맞바꿈인데, 정적 내보내기라 첫 응답 속도는 무관하다.
     */
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
