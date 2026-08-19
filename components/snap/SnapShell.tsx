'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import type { SnapIntlLang } from '@/lib/snap-intl';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/**
 * 스냅테스트 공용 껍데기.
 *
 * 11개 스냅 페이지가 "모델 로드 → 사진 선택 → 얼굴 검출 → 결과"라는 같은 흐름을
 * 각자 300줄씩 복사해 갖고 있었다. 흐름과 문구를 여기로 모으고, 각 테스트는
 * 검출 결과를 자기 결과 타입으로 바꾸는 analyze와 그 결과를 그리는 children만 준다.
 *
 * 얼굴 검출 문턱값·최소 대기시간 같은 값도 한 곳에 있어야 한다. 페이지마다
 * 흩어져 있으면 한 곳만 고쳐놓고 나머지는 다르게 동작하는 상황이 생긴다.
 */
export type SnapLang = 'ko' | SnapIntlLang;

type FaceApiModule = typeof import('@vladmandic/face-api');

/** 검출 결과 — face-api 타입을 그대로 노출하지 않고 필요한 것만 넘긴다 */
export interface SnapDetection {
  landmarks: {
    getJawOutline(): { x: number; y: number }[];
    getMouth(): { x: number; y: number }[];
    getLeftEye(): { x: number; y: number }[];
    getRightEye(): { x: number; y: number }[];
    getNose(): { x: number; y: number }[];
    getLeftEyeBrow(): { x: number; y: number }[];
    getRightEyeBrow(): { x: number; y: number }[];
    positions: { x: number; y: number }[];
  };
  score: number;
  box: { x: number; y: number; width: number; height: number };
  /** 픽셀을 직접 읽어야 하는 테스트(퍼스널컬러 등)를 위한 원본 이미지 */
  image: HTMLImageElement;
  /** models='landmarks+expressions'일 때만 채워진다 */
  expressions?: Record<string, number>;
}

const UI: Record<SnapLang, {
  hub: string;
  loadingModel: string;
  modelFailed: string;
  modelFailedHint: string;
  pickPhoto: string;
  analyzing: string;
  tryAnother: string;
  pickAnother: string;
  again: string;
  previewAlt: string;
  privacyTitle: string;
  noFace: string;
}> = {
  ko: {
    hub: '스냅테스트',
    loadingModel: '얼굴 인식 모델을 불러오는 중...',
    modelFailed: '얼굴 인식 모델을 불러오지 못했어요',
    modelFailedHint: '네트워크 상태를 확인하고 새로고침 해주세요',
    pickPhoto: '사진을 선택해주세요',
    analyzing: '분석 중...',
    tryAnother: '다른 사진으로 다시 보기',
    pickAnother: '다른 사진 선택하기',
    again: '🔄 다른 사진으로 다시 해보기',
    previewAlt: '업로드한 사진 미리보기',
    privacyTitle: '🔒 사진은 서버에 전송되지 않아요',
    noFace: '사진에서 얼굴을 뚜렷하게 찾지 못했어요. 밝은 곳에서 얼굴이 정면으로 크게 나온 사진으로 다시 시도해주세요.',
  },
  en: {
    hub: 'Snap tests',
    loadingModel: 'Loading the face detection model…',
    modelFailed: 'Could not load the face detection model',
    modelFailedHint: 'Check your connection and refresh the page',
    pickPhoto: 'Choose a photo',
    analyzing: 'Analysing…',
    tryAnother: 'Try a different photo',
    pickAnother: 'Choose another photo',
    again: '🔄 Try another photo',
    previewAlt: 'Preview of the photo you uploaded',
    privacyTitle: '🔒 Your photo never leaves this device',
    noFace: 'No clear face was found in that photo. Try one taken in good light, facing the camera, with the face filling more of the frame.',
  },
  es: {
    hub: 'Tests de foto',
    loadingModel: 'Cargando el modelo de detección facial…',
    modelFailed: 'No se pudo cargar el modelo de detección facial',
    modelFailedHint: 'Comprueba tu conexión y recarga la página',
    pickPhoto: 'Elige una foto',
    analyzing: 'Analizando…',
    tryAnother: 'Probar con otra foto',
    pickAnother: 'Elegir otra foto',
    again: '🔄 Probar con otra foto',
    previewAlt: 'Vista previa de la foto que subiste',
    privacyTitle: '🔒 Tu foto nunca sale de este dispositivo',
    noFace: 'No se encontró ninguna cara clara en esa foto. Prueba con una tomada con buena luz, de frente y con la cara ocupando más del encuadre.',
  },
  'pt-br': {
    hub: 'Testes de foto',
    loadingModel: 'Carregando o modelo de detecção facial…',
    modelFailed: 'Não foi possível carregar o modelo de detecção facial',
    modelFailedHint: 'Verifique sua conexão e recarregue a página',
    pickPhoto: 'Escolha uma foto',
    analyzing: 'Analisando…',
    tryAnother: 'Tentar com outra foto',
    pickAnother: 'Escolher outra foto',
    again: '🔄 Tentar com outra foto',
    previewAlt: 'Prévia da foto que você enviou',
    privacyTitle: '🔒 Sua foto nunca sai deste aparelho',
    noFace: 'Nenhum rosto nítido foi encontrado nessa foto. Tente uma com boa luz, de frente, com o rosto ocupando mais do enquadramento.',
  },
  ja: {
    hub: 'スナップテスト',
    loadingModel: '顔認識モデルを読み込んでいます…',
    modelFailed: '顔認識モデルを読み込めませんでした',
    modelFailedHint: '通信状態を確認してページを再読み込みしてください',
    pickPhoto: '写真を選んでください',
    analyzing: '解析中…',
    tryAnother: '別の写真でもう一度',
    pickAnother: '別の写真を選ぶ',
    again: '🔄 別の写真でもう一度',
    previewAlt: 'アップロードした写真のプレビュー',
    privacyTitle: '🔒 写真はこの端末から出ません',
    noFace: 'この写真では顔をはっきり見つけられませんでした。明るい場所で正面から、顔が大きく写った写真で試してください。',
  },
  de: {
    hub: 'Foto-Tests',
    loadingModel: 'Gesichtserkennungsmodell wird geladen…',
    modelFailed: 'Das Gesichtserkennungsmodell konnte nicht geladen werden',
    modelFailedHint: 'Prüfe deine Verbindung und lade die Seite neu',
    pickPhoto: 'Foto auswählen',
    analyzing: 'Wird ausgewertet…',
    tryAnother: 'Anderes Foto probieren',
    pickAnother: 'Anderes Foto wählen',
    again: '🔄 Anderes Foto probieren',
    previewAlt: 'Vorschau des hochgeladenen Fotos',
    privacyTitle: '🔒 Dein Foto verlässt dieses Gerät nie',
    noFace: 'Auf diesem Foto war kein klares Gesicht zu finden. Versuch es mit einem bei gutem Licht, frontal aufgenommen und mit dem Gesicht größer im Bild.',
  },
  fr: {
    hub: 'Tests photo',
    loadingModel: 'Chargement du modèle de détection de visage…',
    modelFailed: 'Impossible de charger le modèle de détection de visage',
    modelFailedHint: 'Vérifiez votre connexion et rechargez la page',
    pickPhoto: 'Choisissez une photo',
    analyzing: 'Analyse en cours…',
    tryAnother: 'Essayer une autre photo',
    pickAnother: 'Choisir une autre photo',
    again: '🔄 Essayer une autre photo',
    previewAlt: 'Aperçu de la photo que vous avez envoyée',
    privacyTitle: '🔒 Votre photo ne quitte jamais cet appareil',
    noFace: 'Aucun visage net n’a été trouvé sur cette photo. Essayez-en une prise avec une bonne lumière, de face, le visage occupant davantage le cadre.',
  },
  hi: {
    hub: 'फ़ोटो टेस्ट',
    loadingModel: 'चेहरा पहचानने वाला मॉडल लोड हो रहा है…',
    modelFailed: 'चेहरा पहचानने वाला मॉडल लोड नहीं हो सका',
    modelFailedHint: 'अपना कनेक्शन देखकर पेज दोबारा लोड करें',
    pickPhoto: 'एक फ़ोटो चुनें',
    analyzing: 'विश्लेषण हो रहा है…',
    tryAnother: 'दूसरी फ़ोटो से देखें',
    pickAnother: 'दूसरी फ़ोटो चुनें',
    again: '🔄 दूसरी फ़ोटो से दोबारा',
    previewAlt: 'आपने जो फ़ोटो दी उसकी झलक',
    privacyTitle: '🔒 आपकी फ़ोटो इस डिवाइस से बाहर नहीं जाती',
    noFace: 'इस फ़ोटो में साफ़ चेहरा नहीं मिला। अच्छी रोशनी में, सामने से ली गई और चेहरा बड़ा दिखने वाली फ़ोटो से कोशिश करें।',
  },
  'zh-hans': {
    hub: '拍照测验',
    loadingModel: '正在加载人脸识别模型…',
    modelFailed: '人脸识别模型加载失败',
    modelFailedHint: '请检查网络后刷新页面',
    pickPhoto: '请选择一张照片',
    analyzing: '分析中…',
    tryAnother: '换一张照片再试',
    pickAnother: '选择其他照片',
    again: '🔄 换一张照片再来',
    previewAlt: '你上传的照片预览',
    privacyTitle: '🔒 照片不会离开这台设备',
    noFace: '这张照片里没找到清晰的人脸。换一张光线好、正面、脸占画面更大的照片试试。',
  },
  'zh-hant': {
    hub: '拍照測驗',
    loadingModel: '正在載入人臉辨識模型…',
    modelFailed: '人臉辨識模型載入失敗',
    modelFailedHint: '請檢查網路後重新整理頁面',
    pickPhoto: '請選擇一張照片',
    analyzing: '分析中…',
    tryAnother: '換一張照片再試',
    pickAnother: '選擇其他照片',
    again: '🔄 換一張照片再來',
    previewAlt: '你上傳的照片預覽',
    privacyTitle: '🔒 照片不會離開這台裝置',
    noFace: '這張照片裡沒找到清楚的臉。換一張光線好、正面、臉佔畫面更大的照片試試。',
  },
};

export interface SnapTheme {
  /** 링크·강조 텍스트 hover */
  hover: string;
  /** 개인정보 안내 박스 */
  notice: string;
  /** 로딩 스피너 상단 테두리 */
  spinner: string;
  /** 사진 선택 버튼 hover 테두리 */
  dropHover: string;
  /** 다시하기 버튼 hover */
  resetHover: string;
}

/** 어떤 모델을 불러올지 — 테스트마다 필요한 게 다르다 */
export type SnapModels = 'landmarks' | 'landmarks+expressions';

interface Props<T> {
  lang: SnapLang;
  /** 주소의 도구 부분 — 언어 바꾸기 버튼이 /{언어}/snap/{slug}를 만든다 */
  slug: string;
  /** 히어로 이모지 */
  icon: string;
  title: string;
  lead: string;
  /** 개인정보 안내 아래에 붙는 본문 — 테스트마다 다르다 */
  privacyBody: string;
  /** 상단 얇은 그라디언트 바 */
  bar: string;
  /**
   * 강조색 클래스 묶음.
   *
   * Tailwind는 빌드 시점에 소스에서 클래스 이름을 문자열로 찾아낸다. `text-${c}-600`
   * 처럼 조립하면 찾지 못해 그 클래스가 CSS에서 통째로 빠지고, 에러 없이 스타일만
   * 사라진다. 그래서 색 이름이 아니라 완성된 클래스 문자열을 받는다.
   */
  theme: SnapTheme;
  glow?: 'indigo' | 'violet' | 'rose' | 'emerald' | 'sky';
  models?: SnapModels;
  /**
   * 얼굴 검출이 필요한지. false면 모델을 아예 불러오지 않고 이미지만 넘긴다.
   * 사진 감성·손글씨처럼 픽셀만 보는 테스트는 풍경 사진도 받아야 하는데,
   * 얼굴을 요구하면 정상 입력을 거부하게 된다.
   */
  requiresFace?: boolean;
  /** 결과 영역 id — 스크롤 대상 */
  resultId: string;
  /** 검출 결과를 각 테스트의 결과 타입으로 변환. null이면 얼굴 못 찾은 것으로 처리 */
  analyze: (d: SnapDetection) => T | null;
  children: (result: T, reset: () => void) => ReactNode;
  /** 결과 아래 고정 문구 */
  disclaimer: string;
  /**
   * analyze가 null을 반환했을 때 보여줄 문구.
   * 기본값은 "얼굴을 못 찾았다"인데, 손글씨·사진 감성처럼 얼굴을 보지 않는
   * 테스트에서는 그 문구가 틀린 안내가 되므로 각자 덮어쓴다.
   */
  noResultMessage?: string;
}

const MIN_CONFIDENCE = 0.6;
/** 너무 빨리 끝나면 분석한 느낌이 안 나서 최소 시간을 둔다 */
const MIN_ANALYZE_MS = 800;

export default function SnapShell<T>({
  lang, slug, icon, title, lead, privacyBody, bar, theme, glow = 'indigo',
  models = 'landmarks', requiresFace = true, resultId, analyze, children, disclaimer,
  noResultMessage,
}: Props<T>) {
  const ui = UI[lang];
  const hubHref = lang === 'ko' ? '/snap' : `/${lang}/snap`;

  /* 얼굴 인식이 필요 없는 도구는 처음부터 ready다 — 이펙트에서 동기로 바꾸면
     첫 프레임에 렌더가 이어 달린다(set-state-in-effect). requiresFace는 도구별
     고정 prop이라 초기값으로 정해도 어긋날 일이 없다. */
  const [modelState, setModelState] = useState<'loading' | 'ready' | 'error'>(requiresFace ? 'loading' : 'ready');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const faceapiRef = useRef<FaceApiModule | null>(null);

  useEffect(() => {
    if (!requiresFace) return;   // 초기값이 이미 ready다
    let cancelled = false;
    (async () => {
      try {
        const faceapi = await import('@vladmandic/face-api');
        const loads = [
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        ];
        if (models === 'landmarks+expressions') {
          loads.push(faceapi.nets.faceExpressionNet.loadFromUri('/models'));
        }
        await Promise.all(loads);
        if (cancelled) return;
        faceapiRef.current = faceapi;
        setModelState('ready');
      } catch {
        if (!cancelled) setModelState('error');
      }
    })();
    return () => { cancelled = true; };
  }, [models, requiresFace]);

  useEffect(() => {
    return () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); };
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const faceapi = faceapiRef.current;
    if (requiresFace && !faceapi) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    setResult(null);
    setFaceError(null);
    setAnalyzing(true);

    const img = new Image();
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('image load failed'));
    }).catch(() => null);

    const startedAt = Date.now();
    let detection;
    if (requiresFace && faceapi) {
      try {
        const opts = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 });
        const base = faceapi.detectSingleFace(img, opts).withFaceLandmarks();
        detection = models === 'landmarks+expressions'
          ? await base.withFaceExpressions()
          : await base;
      } catch {
        detection = undefined;
      }
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_ANALYZE_MS) await new Promise(r => setTimeout(r, MIN_ANALYZE_MS - elapsed));

    if (requiresFace && (!detection || detection.detection.score < MIN_CONFIDENCE)) {
      setFaceError(ui.noFace);
      setAnalyzing(false);
      return;
    }

    const withExpr = detection as { expressions?: Record<string, number> } | undefined;
    const out = analyze({
      landmarks: detection?.landmarks as unknown as SnapDetection['landmarks'],
      score: detection?.detection.score ?? 0,
      box: detection?.detection.box ?? { x: 0, y: 0, width: img.width, height: img.height },
      image: img,
      expressions: withExpr?.expressions,
    });

    if (!out) {
      setFaceError(noResultMessage ?? ui.noFace);
      setAnalyzing(false);
      return;
    }

    setResult(out);
    setAnalyzing(false);
    setTimeout(() => document.getElementById(resultId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [analyze, resultId, ui.noFace, requiresFace, models, noResultMessage]);

  const reset = useCallback(() => {
    setPreview(null);
    setResult(null);
    setFaceError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent={glow} />
      <div className={`h-1 topbar`} />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link prefetch={false} href={hubHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${theme.hover} transition-colors font-medium`}>
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.hub}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/snap/${slug}`} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{icon}</div>
          <div className="hero-band">
            <PageHero title={title} desc={lead} />
          </div>
        </div>

        <div className={`${theme.notice} rounded-2xl p-4 mb-6 text-xs leading-relaxed`}>
          <p className="font-bold mb-1">{ui.privacyTitle}</p>
          <p>{privacyBody}</p>
        </div>

        {modelState === 'loading' && (
          <div role="status" aria-live="polite" className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
            <div aria-hidden="true" className={`w-8 h-8 border-4 border-slate-200 dark:border-slate-700 ${theme.spinner} rounded-full animate-spin`} />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{ui.loadingModel}</span>
          </div>
        )}

        {modelState === 'error' && (
          <div role="alert" className="w-full border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl py-12 px-4 flex flex-col items-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-center">
            <ToolIcon emoji="⚠️" className="w-8 h-8 text-slate-800 dark:text-slate-100" />
            <span className="text-sm font-bold text-rose-600">{ui.modelFailed}</span>
            <span className="text-xs text-rose-400">{ui.modelFailedHint}</span>
          </div>
        )}

        {modelState === 'ready' && !preview && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 ${theme.dropHover} transition-colors`}
          >
            <ToolIcon emoji="📷" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.pickPhoto}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{lead}</span>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border chip-off aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt={ui.previewAlt} className="w-full h-full object-cover" />
              {analyzing && (
                <div role="status" aria-live="polite" className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div aria-hidden="true" className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">{ui.analyzing}</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className={`mt-3 mx-auto block text-xs font-semibold text-slate-400 dark:text-slate-500 ${theme.hover} transition-colors`}>
                {ui.tryAnother}
              </button>
            )}
          </div>
        )}

        {faceError && !analyzing && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">🙈 {faceError}</p>
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors">
              {ui.pickAnother}
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id={resultId} className="space-y-4">
            {/* reset은 이벤트 핸들러 몫으로 넘긴다 — 렌더에서 ref를 읽는 것이 아니라서
                컴파일러의 보수적 판정이다(render prop이 뭘 하는지 정적으로 모른다) */}
            {/* eslint-disable-next-line react-hooks/refs */}
            {children(result, reset)}
            <button type="button" onClick={reset}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 ${theme.resetHover} transition-colors`}>
              {ui.again}
            </button>
            <p className="text-center text-xs text-slate-300 dark:text-slate-600 pt-2">{disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
