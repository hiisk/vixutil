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
     * 그래서 두 가지를 같이 건다.
     *   1) 워커 수를 둘로 — 아래 cpus
     *   2) 힙 상한을 명시 — package.json의 NODE_OPTIONS=--max-old-space-size=2048
     *
     * 2번이 핵심이다. 워커만 줄이면 남은 워커는 여전히 4GB까지 자라도 된다고
     * 믿는다. 상한을 주면 V8이 그 앞에서 수거를 시작한다 — "덜 쓰게" 만드는 게
     * 아니라 "없는 여유를 있다고 착각하지 않게" 만드는 것이다.
     *
     * 주 프로세스 + 워커 둘 × 2GB ≈ 6GB로, 8GB 안에 여유를 두고 들어간다.
     */
    cpus: 2,
    memoryBasedWorkersCount: true,

    /*
     * 웹팩 컴파일 단계의 최대 사용량을 낮춘다. 컴파일 자체는 통과하고 있지만
     * 뒤 단계에 남겨 줄 여유를 벌려고 켠다. 문서가 저위험으로 분류한다.
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
