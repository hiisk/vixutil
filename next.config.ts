import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  /*
   * 타입 검사는 next build 안이 아니라 **그 앞에서 따로** 돌린다
   * (package.json의 "build": "tsc --noEmit && next build && …").
   *
   * Vercel이 exit 137(컨테이너 OOM)로 죽었다. 죽은 지점은 "Running TypeScript"인데,
   * tsc 자체는 냉간에서도 1.3GB·17초밖에 안 쓴다. 문제는 봉우리가 겹치는 것이었다 —
   * next build가 3만 페이지를 컴파일한 힙을 그대로 쥔 채 그 위에서 타입 검사를
   * 시작한다. 앞으로 빼면 tsc가 끝나며 메모리를 반납하므로 최대 사용량이
   * 합이 아니라 둘 중 큰 쪽이 된다.
   *
   * 검사를 건너뛰는 것이 아니다. 여기서 끄지 않으면 같은 일을 두 번 하면서
   * 두 번째는 가장 나쁜 시점에 한다.
   */
  typescript: { ignoreBuildErrors: true },

  experimental: {
    /*
     * 정적 페이지 3만 6천 장을 워커 여러 개가 동시에 그린다. 워커마다 자기 힙을
     * 가지므로 컨테이너 메모리(8GB)는 워커 수에 거의 비례해 찬다 — Vercel이
     * exit 137로 죽은 자리가 여기다.
     *
     * memoryBasedWorkersCount는 남은 메모리를 보고 워커 수를 정한다. cpus는 그
     * 위에 두는 천장이다. 코어가 많은 기계에서 7~8개가 뜨는 것을 막는다.
     * 빌드는 느려지지만, 안 끝나는 빌드보다 느린 빌드가 낫다.
     */
    memoryBasedWorkersCount: true,
    cpus: 4,
  },
};

export default nextConfig;
