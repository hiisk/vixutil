/**
 * 기기 점검 화면 문구의 세 언어 사전.
 *
 * 측정 로직·이벤트 처리는 한국어 구현을 그대로 쓴다. Hz·ms·좌표는 언어와
 * 무관하므로 프리셋 배열에서는 숫자만 남기고 이름은 여기서 인덱스로 참조한다.
 *
 * 브라우저·OS 이름은 예외다 — 사용자가 "설정에서 본 이름"과 같아야 쓸모가
 * 있으므로 언어별로 그 언어권에서 통하는 표기를 쓴다.
 */
export type DeviceLang = 'ko' | 'en' | 'zh';

export const DEVICE_COMMON: Record<DeviceLang, {
  reset: string; clearRecord: string; stop: string;
  allowPrompt: string; noDevice: string; cannotOpen: string;
}> = {
  ko: {
    reset: '처음부터 다시', clearRecord: '기록 지우기', stop: '■ 정지',
    allowPrompt: '버튼을 누르면 브라우저가 권한을 물어봅니다.',
    noDevice: '연결된 장치를 찾지 못했습니다.',
    cannotOpen: '장치를 열 수 없습니다. 다른 앱이 쓰고 있는지 확인해 주세요.',
  },
  en: {
    reset: 'Start over', clearRecord: 'Clear the record', stop: '■ Stop',
    allowPrompt: 'Press the button and the browser will ask for permission.',
    noDevice: 'No connected device found.',
    cannotOpen: 'Could not open the device. Check whether another app is using it.',
  },
  zh: {
    reset: '重新开始', clearRecord: '清除记录', stop: '■ 停止',
    allowPrompt: '按下按钮后浏览器会询问权限。',
    noDevice: '没有找到已连接的设备。',
    cannotOpen: '无法打开设备。请检查是否有其他应用正在使用。',
  },
};

export const KEYBOARD_UI: Record<DeviceLang, {
  langKey: string; how: string;
  recognised: string; maxSimul: string; nowDown: string; countSuffix: (n: number) => string;
  recentInput: string; noInput: string;
  untested: (n: number) => string; allGood: string;
}> = {
  ko: {
    langKey: '한/영',
    how: '키를 눌러보세요. 파란색은 지금 눌린 키, 연한 파란색은 한 번이라도 인식된 키입니다.',
    recognised: '인식된 키', maxSimul: '동시입력 최대', nowDown: '지금 눌린 키', countSuffix: n => `${n}개`,
    recentInput: '최근 입력', noInput: '아직 입력이 없습니다.',
    untested: n => `아직 안 눌러본 키 ${n}개`, allGood: '🎉 배열의 모든 키가 정상 인식됐습니다.',
  },
  en: {
    langKey: 'Lang',
    how: 'Press any key. Blue means held right now; pale blue means it registered at least once.',
    recognised: 'Keys registered', maxSimul: 'Max simultaneous', nowDown: 'Held now', countSuffix: n => `${n}`,
    recentInput: 'Recent input', noInput: 'Nothing pressed yet.',
    untested: n => `${n} keys not tried yet`, allGood: '🎉 Every key on this layout registered correctly.',
  },
  zh: {
    langKey: '中/英',
    how: '按任意键试试。蓝色是当前按住的键，浅蓝色是至少被识别过一次的键。',
    recognised: '已识别的键', maxSimul: '最多同时按下', nowDown: '当前按住', countSuffix: n => `${n} 个`,
    recentInput: '最近输入', noInput: '还没有任何输入。',
    untested: n => `还有 ${n} 个键没按过`, allGood: '🎉 这个布局上的所有键都被正确识别了。',
  },
};

export const MOUSE_UI: Record<DeviceLang, {
  buttons: string[];
  wheelDirs: { up: string; down: string; left: string; right: string };
  pressed: (label: string) => string; buttonN: (n: number) => string; hint: string;
  cursorAt: (x: number, y: number) => string; contextNote: string;
  moveEvents: (rate: number) => string; timesSuffix: (n: number) => string;
  lastGap: (ms: number) => string; noInputYet: string; chatterSuspect: (n: number) => string;
  totalClicks: string; chatterTotal: string; wheelWord: string; scrollWord: string;
  chatterNote: (ms: number, n: number) => string;
}> = {
  ko: {
    buttons: ['왼쪽 클릭', '휠 클릭', '오른쪽 클릭', '뒤로 (사이드)', '앞으로 (사이드)'],
    wheelDirs: { up: '위로', down: '아래로', left: '왼쪽', right: '오른쪽' },
    pressed: label => `${label} 눌림`, buttonN: n => `버튼 ${n}`, hint: '이 영역에서 클릭·스크롤해 보세요',
    cursorAt: (x, y) => `커서 ${x}, ${y}`, contextNote: '오른쪽 클릭 메뉴는 이 영역에서만 잠시 꺼둡니다',
    moveEvents: rate => `이동 이벤트 ${rate}/초`, timesSuffix: n => `${n}회`,
    lastGap: ms => `직전 클릭과 간격 ${ms}ms`, noInputYet: '아직 입력 없음',
    chatterSuspect: n => ` · 채터링 의심 ${n}회`,
    totalClicks: '전체 클릭', chatterTotal: '채터링 의심', wheelWord: '휠', scrollWord: '스크롤',
    chatterNote: (ms, n) => `같은 버튼이 ${ms}ms 안에 다시 눌린 적이 ${n}번 있습니다. 일부러 빠르게 두 번 누른 게 아니라면 스위치 채터링일 수 있어요. 천천히 한 번씩만 눌러 다시 확인해 보세요.`,
  },
  en: {
    buttons: ['Left click', 'Wheel click', 'Right click', 'Back (side)', 'Forward (side)'],
    wheelDirs: { up: 'up', down: 'down', left: 'left', right: 'right' },
    pressed: label => `${label} pressed`, buttonN: n => `Button ${n}`, hint: 'Click and scroll inside this area',
    cursorAt: (x, y) => `Cursor ${x}, ${y}`, contextNote: 'The right-click menu is suppressed inside this area only',
    moveEvents: rate => `${rate} move events/sec`, timesSuffix: n => `${n}×`,
    lastGap: ms => `${ms}ms since the last click`, noInputYet: 'nothing yet',
    chatterSuspect: n => ` · ${n} suspected chatter`,
    totalClicks: 'Total clicks', chatterTotal: 'Suspected chatter', wheelWord: 'Wheel', scrollWord: 'scroll',
    chatterNote: (ms, n) => `The same button registered again within ${ms}ms, ${n} times. Unless you were deliberately double-clicking fast, that could be switch chatter. Try again with slow single clicks to confirm.`,
  },
  zh: {
    buttons: ['左键', '中键（滚轮）', '右键', '后退（侧键）', '前进（侧键）'],
    wheelDirs: { up: '向上', down: '向下', left: '向左', right: '向右' },
    pressed: label => `${label}已按下`, buttonN: n => `按键 ${n}`, hint: '在这个区域里点击、滚动试试',
    cursorAt: (x, y) => `光标 ${x}, ${y}`, contextNote: '仅在这个区域内暂时屏蔽右键菜单',
    moveEvents: rate => `移动事件 ${rate}/秒`, timesSuffix: n => `${n} 次`,
    lastGap: ms => `距上次点击 ${ms}ms`, noInputYet: '还没有输入',
    chatterSuspect: n => ` · 疑似连击 ${n} 次`,
    totalClicks: '总点击', chatterTotal: '疑似连击', wheelWord: '滚轮', scrollWord: '滚动',
    chatterNote: (ms, n) => `同一个按键在 ${ms}ms 内再次被按下，共 ${n} 次。如果不是你故意快速双击，那可能是微动开关连击。请慢慢单击几次再确认。`,
  },
};

export const TOUCH_UI: Record<DeviceLang, {
  pressHere: string; multiOk: string;
  nowTouching: string; maxSimul: string; deviceSupports: string;
  detailTitle: string; detailLine: (id: number, type: string, pressure: string, size: string) => string;
  rubNote: string; noTouchNote: string; clearWith: (n: number) => string;
}> = {
  ko: {
    pressHere: '이 영역을 손가락으로 눌러 보세요', multiOk: '여러 손가락을 동시에 올려도 됩니다',
    nowTouching: '지금 닿은 점', maxSimul: '동시 인식 최대', deviceSupports: '기기 지원 점수',
    detailTitle: '터치 상세',
    detailLine: (id, type, pressure, size) => `#${id} · ${type} · 압력 ${pressure} · 크기 ${size}`,
    rubNote: '영역 전체를 손가락으로 꼼꼼히 문질러 보세요. 색이 안 칠해지는 구멍이 있다면 그 자리가 터치를 못 받는 겁니다.',
    noTouchNote: ' (이 기기는 터치를 지원하지 않아 마우스로 표시됩니다.)',
    clearWith: n => `지우고 다시 (총 ${n}번 눌림)`,
  },
  en: {
    pressHere: 'Press this area with a finger', multiOk: 'Several fingers at once is fine',
    nowTouching: 'Touching now', maxSimul: 'Max simultaneous', deviceSupports: 'Device supports',
    detailTitle: 'Touch detail',
    detailLine: (id, type, pressure, size) => `#${id} · ${type} · pressure ${pressure} · size ${size}`,
    rubNote: 'Rub a finger carefully over the whole area. Any gap that does not get coloured in is a spot that is not receiving touch.',
    noTouchNote: ' (This device has no touch support, so the mouse is shown instead.)',
    clearWith: n => `Clear and retry (${n} touches so far)`,
  },
  zh: {
    pressHere: '用手指按这个区域试试', multiOk: '可以多根手指同时放上去',
    nowTouching: '当前触点', maxSimul: '最多同时识别', deviceSupports: '设备支持点数',
    detailTitle: '触摸详情',
    detailLine: (id, type, pressure, size) => `#${id} · ${type} · 压力 ${pressure} · 大小 ${size}`,
    rubNote: '用手指把整个区域仔细划一遍。如果有涂不上颜色的空洞，那个位置就是收不到触摸的地方。',
    noTouchNote: '（这台设备不支持触摸，所以用鼠标代替显示。）',
    clearWith: n => `清空重来（共按了 ${n} 次）`,
  },
};

export const GAMEPAD_UI: Record<DeviceLang, {
  buttonNames: string[];
  unsupported: string; waiting: string; connectHint: string; connectHintBold: string; needsInput: string;
  padInfo: (i: number, buttons: number, axes: number) => string; standardMapping: string;
  vibrate: string; leftStick: string; rightStick: string;
  driftNote: string; buttonNote: string;
}> = {
  ko: {
    buttonNames: ['L스틱', 'R스틱', '↑', '↓', '←', '→', 'Home'],
    unsupported: '이 브라우저는 게임패드 API를 지원하지 않습니다. 크롬·엣지·파이어폭스에서 열어 주세요.',
    waiting: '컨트롤러를 기다리는 중…',
    connectHint: 'USB로 꽂거나 블루투스로 연결한 뒤, ', connectHintBold: '아무 버튼이나 한 번 눌러 주세요.',
    needsInput: '브라우저는 입력이 한 번 있어야 패드를 인식합니다.',
    padInfo: (i, buttons, axes) => `${i}번 · 버튼 ${buttons}개 · 축 ${axes}개`, standardMapping: ' · 표준 배열',
    vibrate: '진동 테스트', leftStick: '왼쪽 스틱', rightStick: '오른쪽 스틱',
    driftNote: '스틱에서 손을 뗐는데도 값이 0에서 벗어나 있다면 스틱 드리프트입니다. 손을 완전히 뗀 상태에서 위 숫자가 0.00에 가까운지 확인하세요.',
    buttonNote: '모든 버튼을 한 번씩 눌러 보세요. 색이 안 바뀌는 버튼이 인식되지 않는 버튼입니다.',
  },
  en: {
    buttonNames: ['L stick', 'R stick', '↑', '↓', '←', '→', 'Home'],
    unsupported: 'This browser does not support the Gamepad API. Try Chrome, Edge or Firefox.',
    waiting: 'Waiting for a controller…',
    connectHint: 'Plug it in by USB or pair it over Bluetooth, then ', connectHintBold: 'press any button once.',
    needsInput: 'The browser only sees the pad after it receives one input.',
    padInfo: (i, buttons, axes) => `#${i} · ${buttons} buttons · ${axes} axes`, standardMapping: ' · standard mapping',
    vibrate: 'Test vibration', leftStick: 'Left stick', rightStick: 'Right stick',
    driftNote: 'If the values sit away from 0 with your hands off the sticks, that is stick drift. Let go completely and check whether the numbers above stay near 0.00.',
    buttonNote: 'Press every button once. Any button whose colour does not change is not being registered.',
  },
  zh: {
    buttonNames: ['左摇杆', '右摇杆', '↑', '↓', '←', '→', 'Home'],
    unsupported: '这个浏览器不支持 Gamepad API。请用 Chrome、Edge 或 Firefox 打开。',
    waiting: '正在等待手柄…',
    connectHint: '用 USB 插上或通过蓝牙连接后，', connectHintBold: '请按任意键一次。',
    needsInput: '浏览器要收到一次输入才能识别手柄。',
    padInfo: (i, buttons, axes) => `第 ${i} 个 · ${buttons} 个键 · ${axes} 个轴`, standardMapping: ' · 标准布局',
    vibrate: '振动测试', leftStick: '左摇杆', rightStick: '右摇杆',
    driftNote: '手离开摇杆后数值还偏离 0，就是摇杆漂移。完全松手，看看上面的数字是否接近 0.00。',
    buttonNote: '把每个键都按一次。颜色不变的键就是没被识别的键。',
  },
};

export const MIC_TEST_UI: Record<DeviceLang, {
  denied: string; notFound: string; cannotOpen: string;
  prompt1: string; prompt2: string; opening: string; startTest: string;
  inputLevel: string; levelPeak: (l: number, p: number) => string;
  saySomething: string; tooQuiet: string; tooLoud: string; working: string;
  deviceLabel: string; deviceN: (n: number) => string;
  recording: string; recordAndListen: string; turnOff: string; resultTitle: string;
}> = {
  ko: {
    denied: '마이크 권한이 거부됐습니다. 주소창의 자물쇠 아이콘에서 마이크를 허용으로 바꿔 주세요.',
    notFound: '연결된 마이크를 찾지 못했습니다. 장치가 꽂혀 있는지 확인해 주세요.',
    cannotOpen: '마이크를 열 수 없습니다. 다른 앱이 마이크를 쓰고 있는지 확인해 주세요.',
    prompt1: '버튼을 누르면 브라우저가 마이크 권한을 물어봅니다.', prompt2: '허용하면 바로 입력 레벨이 보입니다.',
    opening: '마이크 여는 중…', startTest: '마이크 테스트 시작',
    inputLevel: '입력 레벨', levelPeak: (l, p) => `${l}% · 최고 ${p}%`,
    saySomething: '말을 해보세요…',
    tooQuiet: '소리가 거의 안 잡힙니다 — 음소거나 입력 볼륨을 확인하세요',
    tooLoud: '너무 큽니다 — 소리가 깨질 수 있어요',
    working: '✅ 마이크가 정상 동작합니다',
    deviceLabel: '마이크 장치', deviceN: n => `마이크 ${n}`,
    recording: '● 녹음 중… (6초)', recordAndListen: '6초 녹음해서 들어보기', turnOff: '마이크 끄기',
    resultTitle: '녹음 결과 — 재생해서 확인하세요',
  },
  en: {
    denied: 'Microphone access was denied. Allow the microphone from the lock icon in the address bar.',
    notFound: 'No microphone found. Check that the device is plugged in.',
    cannotOpen: 'Could not open the microphone. Check whether another app is using it.',
    prompt1: 'Press the button and the browser will ask for microphone permission.', prompt2: 'Allow it and the input level appears straight away.',
    opening: 'Opening the microphone…', startTest: 'Start the microphone test',
    inputLevel: 'Input level', levelPeak: (l, p) => `${l}% · peak ${p}%`,
    saySomething: 'Say something…',
    tooQuiet: 'Barely picking anything up — check the mute switch and input volume',
    tooLoud: 'Too loud — this will clip',
    working: '✅ The microphone is working',
    deviceLabel: 'Microphone', deviceN: n => `Microphone ${n}`,
    recording: '● Recording… (6s)', recordAndListen: 'Record 6 seconds and listen back', turnOff: 'Turn the mic off',
    resultTitle: 'Your recording — play it back to check',
  },
  zh: {
    denied: '麦克风权限被拒绝。请在地址栏的锁形图标里把麦克风改为允许。',
    notFound: '没有找到已连接的麦克风。请确认设备已插好。',
    cannotOpen: '无法打开麦克风。请检查是否有其他应用正在使用。',
    prompt1: '按下按钮后浏览器会询问麦克风权限。', prompt2: '允许之后就能立刻看到输入电平。',
    opening: '正在打开麦克风…', startTest: '开始麦克风测试',
    inputLevel: '输入电平', levelPeak: (l, p) => `${l}% · 峰值 ${p}%`,
    saySomething: '说点什么…',
    tooQuiet: '几乎收不到声音 —— 请检查静音开关和输入音量',
    tooLoud: '太大了 —— 声音可能会爆掉',
    working: '✅ 麦克风工作正常',
    deviceLabel: '麦克风设备', deviceN: n => `麦克风 ${n}`,
    recording: '● 录音中…（6 秒）', recordAndListen: '录 6 秒并回放', turnOff: '关闭麦克风',
    resultTitle: '录音结果 —— 播放确认一下',
  },
};

export const WEBCAM_UI: Record<DeviceLang, {
  cameraWord: string; denied: string; notFound: string; cannotOpen: string;
  prompt: string; opening: string; startTest: string;
  resolution: string; measuredFps: string; setFps: string;
  deviceLabel: string; deviceN: (n: number) => string;
  snapshot: string; mirrorOn: string; mirrorOff: string; turnOff: string;
  snapshotTitle: string; saveImage: string; snapshotAlt: string;
}> = {
  ko: {
    cameraWord: '카메라',
    denied: '카메라 권한이 거부됐습니다. 주소창의 자물쇠 아이콘에서 카메라를 허용으로 바꿔 주세요.',
    notFound: '연결된 카메라를 찾지 못했습니다.',
    cannotOpen: '카메라를 열 수 없습니다. 화상회의 앱 등 다른 프로그램이 쓰고 있는지 확인해 주세요.',
    prompt: '버튼을 누르면 브라우저가 카메라 권한을 물어봅니다.',
    opening: '카메라 여는 중…', startTest: '웹캠 테스트 시작',
    resolution: '해상도', measuredFps: '실측 fps', setFps: '설정 fps',
    deviceLabel: '카메라 장치', deviceN: n => `카메라 ${n}`,
    snapshot: '📸 스냅샷', mirrorOn: '거울모드 끄기', mirrorOff: '거울모드 켜기', turnOff: '카메라 끄기',
    snapshotTitle: '스냅샷', saveImage: '이미지 저장', snapshotAlt: '웹캠 스냅샷',
  },
  en: {
    cameraWord: 'Camera',
    denied: 'Camera access was denied. Allow the camera from the lock icon in the address bar.',
    notFound: 'No camera found.',
    cannotOpen: 'Could not open the camera. Check whether a video call app or another program is using it.',
    prompt: 'Press the button and the browser will ask for camera permission.',
    opening: 'Opening the camera…', startTest: 'Start the webcam test',
    resolution: 'Resolution', measuredFps: 'Measured fps', setFps: 'Reported fps',
    deviceLabel: 'Camera', deviceN: n => `Camera ${n}`,
    snapshot: '📸 Snapshot', mirrorOn: 'Turn mirror off', mirrorOff: 'Turn mirror on', turnOff: 'Turn the camera off',
    snapshotTitle: 'Snapshot', saveImage: 'Save the image', snapshotAlt: 'Webcam snapshot',
  },
  zh: {
    cameraWord: '摄像头',
    denied: '摄像头权限被拒绝。请在地址栏的锁形图标里把摄像头改为允许。',
    notFound: '没有找到已连接的摄像头。',
    cannotOpen: '无法打开摄像头。请检查视频会议软件等其他程序是否正在使用。',
    prompt: '按下按钮后浏览器会询问摄像头权限。',
    opening: '正在打开摄像头…', startTest: '开始摄像头测试',
    resolution: '分辨率', measuredFps: '实测 fps', setFps: '标称 fps',
    deviceLabel: '摄像头设备', deviceN: n => `摄像头 ${n}`,
    snapshot: '📸 快照', mirrorOn: '关闭镜像', mirrorOff: '开启镜像', turnOff: '关闭摄像头',
    snapshotTitle: '快照', saveImage: '保存图片', snapshotAlt: '摄像头快照',
  },
};

export const SPEAKER_UI: Record<DeviceLang, {
  bandDescs: string[];
  leftSide: string; rightSide: string;
  playingNote: string; idleNote: string;
  modes: string[]; freq: string; volume: string; hearingWarn: string;
  checkTitle: string; checkItems: string[]; allGood: string;
}> = {
  ko: {
    bandDescs: ['저음 (진동)', '중저음', '기준음', '고음', '초고음', '들리면 좋은 귀'],
    leftSide: 'LEFT · 왼쪽', rightSide: 'RIGHT · 오른쪽',
    playingNote: '소리가 나는 쪽과 화면에 켜진 쪽이 같은지 확인하세요. 반대라면 좌우가 바뀐 겁니다.',
    idleNote: '아래 버튼으로 한쪽씩 울려 보세요. 볼륨은 30%에서 시작합니다.',
    modes: ['왼쪽만', '오른쪽만', '양쪽 함께', '좌 ↔ 우 반복'],
    freq: '주파수', volume: '볼륨',
    hearingWarn: '고주파를 큰 볼륨으로 오래 듣지 마세요. 청력에 좋지 않습니다.',
    checkTitle: '직접 확인하고 체크하세요',
    checkItems: [
      '왼쪽만 눌렀을 때 왼쪽에서만 소리가 난다',
      '오른쪽만 눌렀을 때 오른쪽에서만 소리가 난다',
      '양쪽 소리 크기가 비슷하다',
      '지직거리거나 끊기는 잡음이 없다',
    ],
    allGood: '✅ 스피커·이어폰이 정상입니다.',
  },
  en: {
    bandDescs: ['Bass (you feel it)', 'Low mid', 'Reference tone', 'Treble', 'High treble', 'Good ears if you hear it'],
    leftSide: 'LEFT', rightSide: 'RIGHT',
    playingNote: 'Check that the side you hear matches the side lit up on screen. If they are opposite, your channels are swapped.',
    idleNote: 'Use the buttons below to sound one side at a time. Volume starts at 30%.',
    modes: ['Left only', 'Right only', 'Both together', 'Left ↔ right'],
    freq: 'Frequency', volume: 'Volume',
    hearingWarn: 'Do not listen to high frequencies loudly for long. It is not good for your hearing.',
    checkTitle: 'Check these yourself and tick them off',
    checkItems: [
      'With left only, sound comes from the left only',
      'With right only, sound comes from the right only',
      'Both sides are about the same loudness',
      'No crackling or cutting out',
    ],
    allGood: '✅ Your speakers or headphones are fine.',
  },
  zh: {
    bandDescs: ['低音（能感到振动）', '中低音', '基准音', '高音', '超高音', '听得到说明耳朵不错'],
    leftSide: 'LEFT · 左', rightSide: 'RIGHT · 右',
    playingNote: '确认听到声音的一边和屏幕上亮起的一边是否一致。如果相反，就是左右声道对调了。',
    idleNote: '用下面的按钮一边一边地试。音量从 30% 开始。',
    modes: ['只有左', '只有右', '两边一起', '左 ↔ 右 交替'],
    freq: '频率', volume: '音量',
    hearingWarn: '不要用大音量长时间听高频。对听力不好。',
    checkTitle: '请自己确认并勾选',
    checkItems: [
      '只按左边时，只有左边出声',
      '只按右边时，只有右边出声',
      '两边的音量差不多',
      '没有杂音或断断续续',
    ],
    allGood: '✅ 音箱／耳机正常。',
  },
};

export const MONITOR_UI: Record<DeviceLang, {
  colors: string[]; tips: string[];
  screenAria: (label: string) => string; fullscreenHint: string; exit: string;
  how: string; keysHint: string; autoCycle: string;
  judgeTitle: string;
  deadTerm: string; deadNote: string;
  stuckTerm: string; stuckNote: string;
  bleedTerm: string; bleedNote: string;
  patchTerm: string; patchNote: string;
  warrantyNote: string;
}> = {
  ko: {
    colors: ['빨강', '초록', '파랑', '흰색', '검정', '회색', '그라디언트', 'RGB 3분할'],
    tips: [
      '빨간 화면에서 검은 점 = 죽은 픽셀',
      '초록에서 안 보이면 초록 서브픽셀 문제',
      '파랑에서 얼룩지면 백라이트 불균일',
      '흰 화면의 검은 점·먼지 확인',
      '가장자리 빛샘과 밝은 점 확인',
      '얼룩(멍)과 색 치우침 확인',
      '계단처럼 끊기면 색 밴딩',
      '세 색의 경계가 또렷한지',
    ],
    screenAria: label => `${label} 화면 — 누르면 다음 색으로`,
    fullscreenHint: '클릭 · → 다음 색  |  Esc 나가기', exit: '✕ 나가기 (Esc)',
    how: '색을 하나 고르면 화면 전체가 그 색으로 덮입니다. 화면에 코를 가까이 대고 다른 색의 점이 있는지 훑어보세요.',
    keysHint: '클릭 또는 → 키로 다음 색, Esc로 나가기. 밝기는 최대로 올리고 보는 편이 잘 보입니다.',
    autoCycle: '▶ 2.5초마다 자동으로 전부 순환',
    judgeTitle: '이렇게 판단하세요',
    deadTerm: '데드 픽셀', deadNote: ' — 모든 색에서 계속 까맣다면 그 픽셀이 죽은 겁니다.',
    stuckTerm: '스턱 픽셀', stuckNote: ' — 검정 화면인데 빨강·초록·파랑 점 하나가 켜져 있다면 서브픽셀이 굳은 겁니다. 며칠 쓰면 풀리기도 합니다.',
    bleedTerm: '빛샘', bleedNote: ' — 검정 화면의 가장자리가 희끄무레하면 백라이트가 새는 것으로, LCD에서는 어느 정도 정상 범위입니다.',
    patchTerm: '얼룩(멍)', patchNote: ' — 회색 화면에서 넓게 어두운 부분이 보이면 패널 눌림일 수 있습니다.',
    warrantyNote: '제조사마다 교환 기준(불량화소 개수)이 다릅니다. 개통·구매 직후에 확인하고 사진을 남겨 두세요.',
  },
  en: {
    colors: ['Red', 'Green', 'Blue', 'White', 'Black', 'Grey', 'Gradient', 'RGB thirds'],
    tips: [
      'A black dot on red = a dead pixel',
      'Missing on green means a green subpixel fault',
      'Patchiness on blue means uneven backlight',
      'Look for black dots and dust on white',
      'Look for edge bleed and bright dots',
      'Look for patches and colour cast',
      'Visible steps mean colour banding',
      'Check the boundaries between the three colours are crisp',
    ],
    screenAria: label => `${label} screen — click for the next colour`,
    fullscreenHint: 'Click · → next colour  |  Esc to exit', exit: '✕ Exit (Esc)',
    how: 'Pick a colour and the whole screen fills with it. Get your nose close to the screen and scan for dots of any other colour.',
    keysHint: 'Click or press → for the next colour, Esc to exit. Turn your brightness all the way up — it shows more.',
    autoCycle: '▶ Cycle through all of them every 2.5 seconds',
    judgeTitle: 'How to read what you see',
    deadTerm: 'Dead pixel', deadNote: ' — stays black on every colour. That pixel is gone.',
    stuckTerm: 'Stuck pixel', stuckNote: ' — a red, green or blue dot lit up on a black screen means a subpixel is stuck. These sometimes free themselves after a few days of use.',
    bleedTerm: 'Backlight bleed', bleedNote: ' — a whitish glow at the edges of a black screen is light leaking past the panel. On an LCD, some of this is normal.',
    patchTerm: 'Patches', patchNote: ' — a broad dark area on the grey screen can mean the panel has been pressed.',
    warrantyNote: 'Manufacturers set different thresholds for a replacement (how many bad pixels). Check on the day it arrives and take photos.',
  },
  zh: {
    colors: ['红', '绿', '蓝', '白', '黑', '灰', '渐变', 'RGB 三分'],
    tips: [
      '红屏上的黑点 = 死点',
      '绿屏上看不到，说明绿色子像素有问题',
      '蓝屏上发花，说明背光不均',
      '在白屏上找黑点和灰尘',
      '在黑屏上找边缘漏光和亮点',
      '找斑块和整体色偏',
      '出现台阶感就是色带',
      '看三色的分界是否清晰',
    ],
    screenAria: label => `${label}屏 —— 点一下切到下一个颜色`,
    fullscreenHint: '点击 · → 下一色  |  Esc 退出', exit: '✕ 退出（Esc）',
    how: '选一个颜色，整个屏幕就会被它铺满。把脸靠近屏幕，扫一遍有没有其他颜色的点。',
    keysHint: '点击或按 → 切换下一色，按 Esc 退出。把亮度调到最高会看得更清楚。',
    autoCycle: '▶ 每 2.5 秒自动切换全部颜色',
    judgeTitle: '这样判断',
    deadTerm: '死点', deadNote: ' —— 在所有颜色下都一直发黑，那个像素就是坏了。',
    stuckTerm: '亮点', stuckNote: ' —— 黑屏时有一个红、绿或蓝的点亮着，说明子像素卡住了。有时用几天会自己恢复。',
    bleedTerm: '漏光', bleedNote: ' —— 黑屏时边缘泛白是背光漏出来了，在 LCD 上一定程度是正常的。',
    patchTerm: '斑块', patchNote: ' —— 灰屏上出现大片偏暗的区域，可能是面板被压过。',
    warrantyNote: '各厂商的换机标准（坏点数量）不同。到手当天就检查，并留下照片。',
  },
};

export const REFRESH_UI: Record<DeviceLang, {
  measuring: string; resultLabel: string; ready: string;
  measuringBtn: string; again: string; startBtn: string; stayHere: string;
  frameInterval: string; fastestFrame: string; slowestFrame: string; jitter: string;
  oddNote: (hz: number, nearest: number) => string;
  normalNote: (nearest: number) => string; sixtyHint: string;
  droppedNote: (n: number) => string;
  motionTitle: string; move: string; stopMove: string; motionNote: string;
}> = {
  ko: {
    measuring: '측정 중', resultLabel: '측정 결과', ready: '준비됨',
    measuringBtn: '측정 중…', again: '다시 측정', startBtn: '주사율 측정 시작 (약 2초)',
    stayHere: '측정하는 동안 이 탭을 보고 계셔야 합니다. 다른 창으로 옮기면 브라우저가 프레임을 늦춥니다.',
    frameInterval: '프레임 간격', fastestFrame: '가장 빠른 프레임', slowestFrame: '가장 느린 프레임', jitter: '흔들림(편차)',
    oddNote: (hz, nearest) => `${hz}Hz는 흔한 규격(${nearest}Hz)과 차이가 있습니다. 측정 중 다른 작업이 끼어들었을 수 있으니 한 번 더 재보세요.`,
    normalNote: nearest => `이 화면은 약 ${nearest}Hz로 동작하고 있습니다.`,
    sixtyHint: ' 고주사율 모니터를 쓰고 있다면 디스플레이 설정에서 주사율이 60Hz로 잡혀 있는지 확인해 보세요.',
    droppedNote: n => `측정 중 ${n}프레임이 평소보다 크게 늦었습니다. 백그라운드 프로그램이 많을 때 나타납니다.`,
    motionTitle: '움직임 부드러움 확인', move: '움직이기', stopMove: '멈추기',
    motionNote: '네모가 뚝뚝 끊겨 보이면 주사율이 낮거나 다른 프로그램이 그래픽을 물고 있는 상태입니다.',
  },
  en: {
    measuring: 'Measuring', resultLabel: 'Result', ready: 'Ready',
    measuringBtn: 'Measuring…', again: 'Measure again', startBtn: 'Measure the refresh rate (about 2s)',
    stayHere: 'Keep this tab in view while it measures. Switch windows and the browser throttles the frames.',
    frameInterval: 'Frame interval', fastestFrame: 'Fastest frame', slowestFrame: 'Slowest frame', jitter: 'Jitter (variance)',
    oddNote: (hz, nearest) => `${hz}Hz does not match a common rate (${nearest}Hz). Something may have interrupted the measurement — try once more.`,
    normalNote: nearest => `This screen is running at about ${nearest}Hz.`,
    sixtyHint: ' If you own a high-refresh monitor, check whether your display settings have it pinned at 60Hz.',
    droppedNote: n => `${n} frames arrived much later than the rest. That shows up when a lot is running in the background.`,
    motionTitle: 'Check motion smoothness', move: 'Start moving', stopMove: 'Stop',
    motionNote: 'If the square looks like it is stepping rather than gliding, either the refresh rate is low or something else has hold of the graphics.',
  },
  zh: {
    measuring: '测量中', resultLabel: '测量结果', ready: '就绪',
    measuringBtn: '测量中…', again: '重新测量', startBtn: '开始测刷新率（约 2 秒）',
    stayHere: '测量期间请让这个标签页保持在前台。切到别的窗口，浏览器会降低帧率。',
    frameInterval: '帧间隔', fastestFrame: '最快的一帧', slowestFrame: '最慢的一帧', jitter: '抖动（偏差）',
    oddNote: (hz, nearest) => `${hz}Hz 和常见规格（${nearest}Hz）有差距。测量中可能被别的任务打断了，再测一次看看。`,
    normalNote: nearest => `这块屏幕大约运行在 ${nearest}Hz。`,
    sixtyHint: ' 如果你用的是高刷显示器，请检查显示设置里是不是被锁在 60Hz。',
    droppedNote: n => `测量中有 ${n} 帧比其他帧慢得多。后台程序多的时候会出现这种情况。`,
    motionTitle: '确认运动流畅度', move: '开始移动', stopMove: '停止',
    motionNote: '如果方块看起来是一跳一跳而不是滑过去，说明刷新率偏低，或者有别的程序占着显卡。',
  },
};

export const DEVICE_INFO_UI: Record<DeviceLang, {
  browsers: Record<string, string>; unknown: string; windows10or11: string;
  screenTitle: string; browserTitle: string; hardwareTitle: string;
  monitorRes: string; monitorResHint: string; windowSize: string;
  workArea: string; workAreaHint: string; dpr: string; dprHint: string;
  realPixels: string; colorDepth: string; bitSuffix: (n: number) => string;
  orientation: string;
  browser: string; os: string; language: string;
  cookies: string; cookiesOn: string; cookiesOff: string;
  network: string; online: string; offline: string; timezone: string;
  cores: string; coresHint: string; countSuffix: (n: number | string) => string;
  memory: string; memoryValue: (gb: number) => string; memoryUnknown: string; memoryHint: string;
  touchPoints: string; touchHint: string;
  loading: string; copy: string; copied: string;
  privacy1: string; privacy2: string;
}> = {
  ko: {
    browsers: { edge: '엣지', opera: '오페라', samsung: '삼성 인터넷', whale: '웨일', firefox: '파이어폭스', chrome: '크롬', safari: '사파리' },
    unknown: '알 수 없음', windows10or11: 'Windows 10 또는 11',
    screenTitle: '화면', browserTitle: '브라우저', hardwareTitle: '하드웨어',
    monitorRes: '모니터 해상도', monitorResHint: '운영체제가 보고하는 논리 해상도', windowSize: '브라우저 창 크기',
    workArea: '작업 영역', workAreaHint: '작업표시줄 등을 뺀 크기', dpr: '픽셀 배율(DPR)', dprHint: '2 이상이면 고해상도(레티나) 화면',
    realPixels: '실제 픽셀 추정', colorDepth: '색 심도', bitSuffix: n => `${n}비트`,
    orientation: '화면 방향',
    browser: '브라우저', os: '운영체제', language: '언어',
    cookies: '쿠키 사용', cookiesOn: '허용됨', cookiesOff: '차단됨',
    network: '네트워크 상태', online: '온라인', offline: '오프라인', timezone: '시간대',
    cores: 'CPU 논리 코어', coresHint: '브라우저가 쓸 수 있는 스레드 수', countSuffix: n => `${n}개`,
    memory: '메모리(대략)', memoryValue: gb => `${gb}GB 이상`, memoryUnknown: '브라우저가 알려주지 않음',
    memoryHint: '크롬 계열만 제공하며 값이 반올림돼 있다',
    touchPoints: '동시 터치 점수', touchHint: '0이면 터치 지원 없음',
    loading: '기기 정보를 읽는 중…', copy: '📋 전체 정보 복사하기', copied: '✅ 복사했습니다',
    privacy1: '여기 있는 값은 브라우저가 알려주는 것뿐이며 어디로도 전송되지 않습니다.',
    privacy2: '개인정보(IP·위치·계정)는 수집하지도, 표시하지도 않습니다.',
  },
  en: {
    browsers: { edge: 'Edge', opera: 'Opera', samsung: 'Samsung Internet', whale: 'Whale', firefox: 'Firefox', chrome: 'Chrome', safari: 'Safari' },
    unknown: 'Unknown', windows10or11: 'Windows 10 or 11',
    screenTitle: 'Display', browserTitle: 'Browser', hardwareTitle: 'Hardware',
    monitorRes: 'Screen resolution', monitorResHint: 'The logical resolution the OS reports', windowSize: 'Browser window size',
    workArea: 'Work area', workAreaHint: 'With the taskbar and similar subtracted', dpr: 'Pixel ratio (DPR)', dprHint: '2 or more means a high-density (Retina) screen',
    realPixels: 'Estimated real pixels', colorDepth: 'Colour depth', bitSuffix: n => `${n}-bit`,
    orientation: 'Orientation',
    browser: 'Browser', os: 'Operating system', language: 'Language',
    cookies: 'Cookies', cookiesOn: 'allowed', cookiesOff: 'blocked',
    network: 'Network', online: 'online', offline: 'offline', timezone: 'Time zone',
    cores: 'CPU logical cores', coresHint: 'Threads the browser can use', countSuffix: n => `${n}`,
    memory: 'Memory (approx)', memoryValue: gb => `${gb}GB or more`, memoryUnknown: 'the browser does not report it',
    memoryHint: 'Only Chromium browsers provide this, and the value is rounded',
    touchPoints: 'Simultaneous touch points', touchHint: '0 means no touch support',
    loading: 'Reading device info…', copy: '📋 Copy all of this', copied: '✅ Copied',
    privacy1: 'Everything here comes from what the browser reports, and none of it is sent anywhere.',
    privacy2: 'Personal data — IP, location, accounts — is neither collected nor shown.',
  },
  zh: {
    browsers: { edge: 'Edge', opera: 'Opera', samsung: '三星浏览器', whale: 'Whale', firefox: 'Firefox', chrome: 'Chrome', safari: 'Safari' },
    unknown: '未知', windows10or11: 'Windows 10 或 11',
    screenTitle: '屏幕', browserTitle: '浏览器', hardwareTitle: '硬件',
    monitorRes: '屏幕分辨率', monitorResHint: '操作系统报告的逻辑分辨率', windowSize: '浏览器窗口大小',
    workArea: '工作区域', workAreaHint: '已扣除任务栏等占用', dpr: '像素比（DPR）', dprHint: '2 以上就是高分（Retina）屏',
    realPixels: '实际像素估算', colorDepth: '色深', bitSuffix: n => `${n} 位`,
    orientation: '屏幕方向',
    browser: '浏览器', os: '操作系统', language: '语言',
    cookies: 'Cookie', cookiesOn: '已允许', cookiesOff: '已阻止',
    network: '网络状态', online: '在线', offline: '离线', timezone: '时区',
    cores: 'CPU 逻辑核心', coresHint: '浏览器可用的线程数', countSuffix: n => `${n} 个`,
    memory: '内存（约）', memoryValue: gb => `${gb}GB 以上`, memoryUnknown: '浏览器未提供',
    memoryHint: '只有 Chromium 系提供，且数值已取整',
    touchPoints: '同时触摸点数', touchHint: '为 0 表示不支持触摸',
    loading: '正在读取设备信息…', copy: '📋 复制全部信息', copied: '✅ 已复制',
    privacy1: '这里的值都来自浏览器提供的信息，不会发送到任何地方。',
    privacy2: '个人信息（IP、位置、账号）既不收集也不显示。',
  },
};
