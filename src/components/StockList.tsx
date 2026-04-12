import { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { getTopGainers, getTopVolumeStocks, type StockSnapshot } from '../api/stockApi';

interface StockListProps {
  onStockClick: (stockCode: string) => void;
}

export function StockList({ onStockClick }: StockListProps) {
  const [activeTab, setActiveTab] = useState<'volume' | 'surge'>('volume');
  const [volumeStocks, setVolumeStocks] = useState<StockSnapshot[]>([]);
  const [surgeStocks, setSurgeStocks] = useState<StockSnapshot[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [volume, gainers] = await Promise.all([
          getTopVolumeStocks(10),
          getTopGainers(10),
        ]);

        if (cancelled) {
          return;
        }

        setVolumeStocks(volume);
        setSurgeStocks(gainers);
      } catch (e) {
        console.error('실시간 종목 API 에러', e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const stocks = activeTab === 'volume' ? volumeStocks : surgeStocks;

  const formatPrice = (price: number) => `₩${price.toLocaleString('ko-KR')}`;

  const formatVolume = (volume: number) => {
    if (volume >= 1_000_000_000) {
      return `${(volume / 1_000_000_000).toFixed(1)}B`;
    }
    if (volume >= 1_000_000) {
      return `${(volume / 1_000_000).toFixed(1)}M`;
    }
    if (volume >= 1_000) {
      return `${(volume / 1_000).toFixed(1)}K`;
    }
    return volume.toLocaleString('ko-KR');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">실시간 종목</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('volume')}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeTab === 'volume' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            거래량 TOP
          </button>

          <button
            onClick={() => setActiveTab('surge')}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeTab === 'surge' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            급등 종목
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {stocks.map((stock, idx) => {
          const isUp = stock.changeRate >= 0;

          return (
            <button
              key={stock.id || stock.code}
              onClick={() => onStockClick(stock.id || stock.code)}
              className="w-full px-6 py-4 hover:bg-blue-50 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500 text-white font-bold">
                    {idx + 1}
                  </div>

                  <div>
                    <div className="font-medium text-gray-900">{stock.name}</div>
                    <div className="text-xs text-gray-500">{stock.code}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatPrice(stock.price)}</div>
                    <div className="text-xs text-gray-500">거래량: {formatVolume(stock.volume)}</div>
                  </div>

                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
                      isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {stock.changeRate > 0 ? '+' : ''}
                    {stock.changeRate.toFixed(2)}%
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
