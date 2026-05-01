export interface SimStock {
  id: string;
  name: string;
  code: string;
  volume: number;
  price: number;
  changeRate: number;
}

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const mockStocks: SimStock[] = [
  { id: "1", name: "삼성전자", code: "005930", volume: 12500000, price: 74200, changeRate: 2.34 },
  { id: "2", name: "SK하이닉스", code: "000660", volume: 8300000, price: 128500, changeRate: -1.24 },
  { id: "3", name: "NAVER", code: "035420", volume: 520000, price: 234500, changeRate: 0.85 },
  { id: "4", name: "카카오", code: "035720", volume: 1800000, price: 45600, changeRate: -2.15 },
  { id: "5", name: "LG에너지솔루션", code: "373220", volume: 620000, price: 412000, changeRate: 1.78 },
  { id: "6", name: "현대차", code: "005380", volume: 980000, price: 215000, changeRate: 1.23 },
  { id: "7", name: "기아", code: "000270", volume: 1200000, price: 98200, changeRate: 0.91 },
  { id: "8", name: "셀트리온", code: "068270", volume: 650000, price: 156000, changeRate: 2.45 },
  { id: "9", name: "KB금융", code: "105560", volume: 890000, price: 68200, changeRate: 1.34 },
  { id: "10", name: "POSCO홀딩스", code: "005490", volume: 450000, price: 387000, changeRate: 0.58 },
  { id: "11", name: "삼성바이오로직스", code: "207940", volume: 85000, price: 782000, changeRate: 1.56 },
  { id: "12", name: "LG전자", code: "066570", volume: 1200000, price: 98500, changeRate: 0.45 },
  { id: "13", name: "한화에어로스페이스", code: "012450", volume: 680000, price: 256000, changeRate: 3.45 },
  { id: "14", name: "크래프톤", code: "259960", volume: 180000, price: 218000, changeRate: -1.87 },
  { id: "15", name: "삼성SDI", code: "006400", volume: 450000, price: 421000, changeRate: 1.23 },
];

export const createCandles = (basePrice: number, points = 30): CandlePoint[] => {
  const result: CandlePoint[] = [];
  let cursor = basePrice * 0.96;

  for (let index = 0; index < points; index += 1) {
    const wave = Math.sin(index / 3) * 0.018;
    const drift = (index - points / 2) * 0.0009;
    const open = cursor;
    const close = Math.max(basePrice * 0.86, open * (1 + wave + drift));
    const high = Math.max(open, close) * (1 + 0.01 + (index % 4) * 0.002);
    const low = Math.min(open, close) * (1 - 0.01 - (index % 3) * 0.002);
    result.push({
      time: `${index + 1}`,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: 800000 + index * 24000,
    });
    cursor = close;
  }

  return result;
};

export const createOrderBook = (price: number) => ({
  asks: Array.from({ length: 10 }, (_, index) => ({
    price: price + (10 - index) * 100,
    volume: 4200 + index * 380,
  })),
  bids: Array.from({ length: 10 }, (_, index) => ({
    price: price - (index + 1) * 100,
    volume: 3600 + index * 520,
  })),
});

export const formatWon = (value: number) => `${value.toLocaleString("ko-KR")}원`;

export const formatVolume = (volume: number) => {
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(1)}K`;
  return String(volume);
};
