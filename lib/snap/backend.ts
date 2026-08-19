/**
 * 얼굴 인식이 쓸 연산 백엔드를 **직접 고른다.**
 *
 * ── 왜 필요한가 (2026-08-20) ────────────────────────────────
 * face-api는 TFJS 위에 있고, 아무것도 안 정하면 TFJS가 알아서 고른다. 그 순서가
 * webgl → **wasm** → cpu인데, wasm 백엔드는 `.wasm` 바이너리를 따로 받아온다:
 *
 *     /_next/static/chunks/tfjs-backend-wasm-simd.wasm  → 404
 *
 * 그 파일은 저장소에 없다. 그래서 WebGL이 안 되는 브라우저에서는 wasm으로
 * 넘어가다 404를 맞고, 모델 로딩 전체가 실패해 스냅 여덟 장이 통째로
 * 「얼굴 인식 모델을 불러오지 못했어요」만 띄웠다. WebGL이 되는 보통
 * 브라우저에서는 안 드러나서 오래 남아 있었다.
 *
 * ── 왜 wasm을 받아오지 않고 건너뛰나 ────────────────────────
 * wasm 바이너리 셋(약 10MB)을 public/에 두고 setWasmPaths로 가리키는 방법도
 * 있다. 그런데 이 자리는 **WebGL이 없는 소수의 브라우저를 위한 대비**다.
 * cpu 백엔드는 이미 번들에 들어 있어 받을 것이 없고, 느리지만 사진 한 장을
 * 재는 일에는 충분하다. 10MB를 모두에게 지우면서 얻는 것이 속도뿐이라
 * 그쪽은 안 골랐다.
 *
 * 늘 cpu로 못 박지 않는 까닭도 같다 — 대부분은 WebGL이 되고, 그쪽이 몇 배 빠르다.
 */

/**
 * face-api가 내보내는 tf에서 우리가 쓰는 것만.
 *
 * **타입 선언에는 이 셋이 없다** — face-api의 `.d.ts`는 tf 네임스페이스를 추려
 * 내보내는데(tensor·conv2d 같은 연산만) 백엔드 조작은 그 목록에 빠져 있다.
 * 런타임 번들에는 멀쩡히 들어 있다(dist/tfjs.esm.js). 그래서 캐스팅으로 우기지
 * 않고 **정말 있는지 확인한 뒤** 쓴다 — 라이브러리가 판을 바꾸면 조용히
 * 아무것도 안 하는 쪽이 낫지, 없는 함수를 불러 터지는 것보다.
 */
interface TfLike {
  setBackend(name: string): Promise<boolean>;
  ready(): Promise<void>;
  getBackend(): string;
}

function asTf(tf: unknown): TfLike | null {
  const t = tf as Partial<TfLike> | null | undefined;
  return t && typeof t.setBackend === 'function'
    && typeof t.ready === 'function'
    && typeof t.getBackend === 'function'
    ? (t as TfLike)
    : null;
}

/**
 * webgl을 먼저 시도하고, 안 되면 cpu로 내린다. wasm은 아예 고르지 않는다.
 *
 * 어느 쪽도 못 세우면 그냥 돌아온다 — 부르는 쪽의 try/catch가 모델 로딩
 * 실패로 처리하게 두는 편이, 여기서 던져 같은 화면을 두 번 만드는 것보다 낫다.
 *
 * @returns 실제로 선 백엔드 이름. 아무것도 못 세웠으면 null.
 */
export async function pickBackend(tfLike: unknown): Promise<string | null> {
  const tf = asTf(tfLike);
  if (!tf) return null;
  for (const name of ['webgl', 'cpu']) {
    try {
      if (await tf.setBackend(name)) {
        await tf.ready();
        return tf.getBackend();
      }
    } catch {
      /* 다음 것을 시도한다 — webgl은 컨텍스트를 못 만들면 여기서 던진다 */
    }
  }
  return null;
}
