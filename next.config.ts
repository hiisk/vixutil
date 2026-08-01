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
};

export default nextConfig;
