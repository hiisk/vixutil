/**
 * 예측 페이지를 생성할 코인 레지스트리.
 *
 * 정적 export라 빌드 시점에 경로가 확정돼야 하는데, 빌드 서버(Vercel/GitHub Actions)는
 * 바이낸스가 지역 차단하므로 빌드 중 네트워크 조회를 할 수 없다. 그래서 목록을 고정하고
 * 시세·지표는 브라우저에서 가져온다.
 *
 * 아래 목록은 바이낸스 exchangeInfo(USDT 현물, status=TRADING)에 대해 검증했다.
 * 거래량 상위를 그대로 쓰면 토큰화 주식(SPCXB)·금 토큰(PAXG)·랩드 코인(WBTC)이
 * 섞여 들어오므로, 널리 알려진 코인만 직접 큐레이션했다.
 */
export interface CoinMeta {
  /** URL 세그먼트 — /crypto/{slug}/price-prediction */
  slug: string;
  /** 바이낸스 base asset (심볼은 base + 'USDT') */
  base: string;
  /** 사람이 읽는 이름 (제목·SEO용) */
  name: string;
}

export const COINS: CoinMeta[] = [
  { slug: 'bitcoin', base: 'BTC', name: "Bitcoin" },
  { slug: 'ethereum', base: 'ETH', name: "Ethereum" },
  { slug: 'bnb', base: 'BNB', name: "BNB" },
  { slug: 'solana', base: 'SOL', name: "Solana" },
  { slug: 'xrp', base: 'XRP', name: "XRP" },
  { slug: 'cardano', base: 'ADA', name: "Cardano" },
  { slug: 'dogecoin', base: 'DOGE', name: "Dogecoin" },
  { slug: 'tron', base: 'TRX', name: "TRON" },
  { slug: 'avalanche', base: 'AVAX', name: "Avalanche" },
  { slug: 'chainlink', base: 'LINK', name: "Chainlink" },
  { slug: 'polkadot', base: 'DOT', name: "Polkadot" },
  { slug: 'litecoin', base: 'LTC', name: "Litecoin" },
  { slug: 'shiba-inu', base: 'SHIB', name: "Shiba Inu" },
  { slug: 'uniswap', base: 'UNI', name: "Uniswap" },
  { slug: 'bitcoin-cash', base: 'BCH', name: "Bitcoin Cash" },
  { slug: 'near', base: 'NEAR', name: "NEAR Protocol" },
  { slug: 'aptos', base: 'APT', name: "Aptos" },
  { slug: 'internet-computer', base: 'ICP', name: "Internet Computer" },
  { slug: 'ethereum-classic', base: 'ETC', name: "Ethereum Classic" },
  { slug: 'stellar', base: 'XLM', name: "Stellar" },
  { slug: 'cosmos', base: 'ATOM', name: "Cosmos" },
  { slug: 'filecoin', base: 'FIL', name: "Filecoin" },
  { slug: 'hedera', base: 'HBAR', name: "Hedera" },
  { slug: 'arbitrum', base: 'ARB', name: "Arbitrum" },
  { slug: 'vechain', base: 'VET', name: "VeChain" },
  { slug: 'optimism', base: 'OP', name: "Optimism" },
  { slug: 'injective', base: 'INJ', name: "Injective" },
  { slug: 'immutable', base: 'IMX', name: "Immutable" },
  { slug: 'the-graph', base: 'GRT', name: "The Graph" },
  { slug: 'algorand', base: 'ALGO', name: "Algorand" },
  { slug: 'aave', base: 'AAVE', name: "Aave" },
  { slug: 'sui', base: 'SUI', name: "Sui" },
  { slug: 'sei', base: 'SEI', name: "Sei" },
  { slug: 'render', base: 'RENDER', name: "Render" },
  { slug: 'thorchain', base: 'RUNE', name: "THORChain" },
  { slug: 'flow', base: 'FLOW', name: "Flow" },
  { slug: 'chiliz', base: 'CHZ', name: "Chiliz" },
  { slug: 'axie-infinity', base: 'AXS', name: "Axie Infinity" },
  { slug: 'the-sandbox', base: 'SAND', name: "The Sandbox" },
  { slug: 'decentraland', base: 'MANA', name: "Decentraland" },
  { slug: 'tezos', base: 'XTZ', name: "Tezos" },
  { slug: 'iota', base: 'IOTA', name: "IOTA" },
  { slug: 'neo', base: 'NEO', name: "NEO" },
  { slug: 'kava', base: 'KAVA', name: "Kava" },
  { slug: 'zcash', base: 'ZEC', name: "Zcash" },
  { slug: 'dash', base: 'DASH', name: "Dash" },
  { slug: 'curve-dao', base: 'CRV', name: "Curve DAO" },
  { slug: '1inch', base: '1INCH', name: "1inch" },
  { slug: 'gala', base: 'GALA', name: "Gala" },
  { slug: 'pepe', base: 'PEPE', name: "Pepe" },
  { slug: 'floki', base: 'FLOKI', name: "Floki" },
  { slug: 'bonk', base: 'BONK', name: "Bonk" },
  { slug: 'worldcoin', base: 'WLD', name: "Worldcoin" },
  { slug: 'celestia', base: 'TIA', name: "Celestia" },
  { slug: 'jupiter', base: 'JUP', name: "Jupiter" },
  { slug: 'pyth-network', base: 'PYTH', name: "Pyth Network" },
  { slug: 'starknet', base: 'STRK', name: "Starknet" },
  { slug: 'blur', base: 'BLUR', name: "Blur" },
  { slug: 'ondo', base: 'ONDO', name: "Ondo" },
  { slug: 'ethena', base: 'ENA', name: "Ethena" },
  { slug: 'jasmy', base: 'JASMY', name: "JasmyCoin" },
  { slug: 'dydx', base: 'DYDX', name: "dYdX" },
  { slug: 'lido-dao', base: 'LDO', name: "Lido DAO" },
  { slug: 'ens', base: 'ENS', name: "Ethereum Name Service" },
  { slug: 'apecoin', base: 'APE', name: "ApeCoin" },
  { slug: 'polygon', base: 'POL', name: "Polygon" },
  { slug: 'bittensor', base: 'TAO', name: "Bittensor" },
  { slug: 'fetch-ai', base: 'FET', name: "Artificial Superintelligence" },
  { slug: 'eigenlayer', base: 'EIGEN', name: "EigenLayer" },
  { slug: 'pendle', base: 'PENDLE', name: "Pendle" },
  { slug: 'pengu', base: 'PENGU', name: "Pudgy Penguins" },
  { slug: 'jito', base: 'JTO', name: "Jito" },
  { slug: 'ethfi', base: 'ETHFI', name: "Ether.fi" },
  { slug: 'elrond', base: 'EGLD', name: "MultiversX" },
  { slug: 'stacks', base: 'STX', name: "Stacks" },
  { slug: 'mina', base: 'MINA', name: "Mina Protocol" },
  { slug: 'rose', base: 'ROSE', name: "Oasis" },
  { slug: 'compound', base: 'COMP', name: "Compound" },
  { slug: 'enjin', base: 'ENJ', name: "Enjin Coin" },
  { slug: 'qtum', base: 'QTUM', name: "Qtum" },
  { slug: 'zilliqa', base: 'ZIL', name: "Zilliqa" },
  { slug: 'ankr', base: 'ANKR', name: "Ankr" },
  { slug: 'skale', base: 'SKL', name: "SKALE" },
  { slug: 'trump', base: 'TRUMP', name: "Official Trump" },
  { slug: 'morpho', base: 'MORPHO', name: "Morpho" },
  { slug: 'kaito', base: 'KAITO', name: "Kaito" },];

/** USDT 페어 심볼 */
export const symbolOf = (c: CoinMeta) => `${c.base}USDT`;

const BY_SLUG = new Map(COINS.map(c => [c.slug, c]));
const BY_BASE = new Map(COINS.map(c => [c.base, c]));

export const coinBySlug = (slug: string): CoinMeta | undefined => BY_SLUG.get(slug);
export const coinByBase = (base: string): CoinMeta | undefined => BY_BASE.get(base);
