import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

export interface StockSnapshot {
  id: string;
  name: string;
  code: string;
  volume: number;
  price: number;
  changeRate: number;
  type: 'domestic' | 'foreign';
  currency?: string;
  displayPrice?: string;
  displayChangeRate?: string;
  dataSource?: string;
  fetchedAt?: string;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  color?: string;
}

export interface OrderBookLevel {
  price: number;
  volume: number;
}

export interface StockScreenResponse {
  updatedAt: string;
  stock: StockSnapshot;
  chartData: Candle[];
  orderBook: {
    asks: OrderBookLevel[];
    bids: OrderBookLevel[];
    bestAsk?: number;
    bestBid?: number;
    dataSource?: string;
    fetchedAt?: string;
  };
  wallet?: {
    balance?: number;
    currency?: string;
    exchangeRate?: number;
    availableUsd?: number;
  };
  ownedStock?: {
    quantity?: number;
  } | null;
  ownedQuantity?: number;
  exchangeRate?: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseSignedPercent = (value: unknown) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/%/g, '').replace(/\+/g, '').trim();
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizeStock = (item: any): StockSnapshot => ({
  id: String(item?.id ?? item?.code ?? ''),
  name: String(item?.name ?? item?.displayName ?? ''),
  code: String(item?.code ?? item?.ticker ?? ''),
  volume: toNumber(item?.volume),
  price: toNumber(item?.price),
  changeRate: parseSignedPercent(item?.changeRate ?? item?.rate ?? item?.change),
  type: item?.type === 'foreign' ? 'foreign' : 'domestic',
  currency: item?.currency,
  displayPrice: item?.displayPrice,
  displayChangeRate: item?.displayChangeRate,
  dataSource: item?.dataSource,
  fetchedAt: item?.fetchedAt,
});

export const getAllStocks = async () => {
  const res = await api.get('/api/v1/simulator/stocks', {
    params: {
      market: 'domestic',
      limit: 200,
    },
  });

  const items = Array.isArray(res.data?.items) ? res.data.items : [];
  return items.map(normalizeStock);
};

export const getTopVolumeStocks = async (limit = 10) => {
  const stocks = await getAllStocks();
  return [...stocks]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, limit);
};

export const getTopGainers = async (limit = 10) => {
  const stocks = await getAllStocks();
  return [...stocks]
    .sort((a, b) => b.changeRate - a.changeRate)
    .slice(0, limit);
};

export const getStockScreen = async (stockId: string, timeframe = 'day'): Promise<StockScreenResponse> => {
  const res = await api.get(`/api/v1/simulator/stocks/${encodeURIComponent(stockId)}/screen`, {
    params: { timeframe },
  });

  return {
    ...res.data,
    stock: normalizeStock(res.data?.stock ?? {}),
    chartData: Array.isArray(res.data?.chartData) ? res.data.chartData : [],
    orderBook: {
      asks: Array.isArray(res.data?.orderBook?.asks) ? res.data.orderBook.asks : [],
      bids: Array.isArray(res.data?.orderBook?.bids) ? res.data.orderBook.bids : [],
      bestAsk: toNumber(res.data?.orderBook?.bestAsk),
      bestBid: toNumber(res.data?.orderBook?.bestBid),
      dataSource: res.data?.orderBook?.dataSource,
      fetchedAt: res.data?.orderBook?.fetchedAt,
    },
  };
};

export const getStockCandles = async (stockId: string, timeframe = 'day', points?: number): Promise<Candle[]> => {
  const res = await api.get(`/api/v1/simulator/stocks/${encodeURIComponent(stockId)}/candles`, {
    params: {
      timeframe,
      ...(points ? { points } : {}),
    },
  });

  return Array.isArray(res.data?.chartData) ? res.data.chartData : [];
};
