import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getTopVolumeStocks, getTopGainers } from '../api/stockApi';

interface Stock {
  name: string;
  code: string;
  price: string;
  rate: string;
  volume: string;
}

interface StockListProps {
  onStockClick: (stockCode: string) => void;
}

export function StockList({ onStockClick }: StockListProps) {
  const [activeTab, setActiveTab] = useState<'volume' | 'surge'>('volume');
  const [volumeStocks, setVolumeStocks] = useState<Stock[]>([]);
  const [surgeStocks, setSurgeStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    // 1️⃣ 거래량 먼저 호출
    const volume = await getTopVolumeStocks();
    setVolumeStocks(volume);

    // 2️⃣ 딜레이 추가 (핵심🔥🔥🔥)
    await new Promise((res) => setTimeout(res, 700));

    // 3️⃣ 급등 호출
    const gainers = await getTopGainers();
    setSurgeStocks(gainers);

  } catch (e) {
    console.error('API 에러', e);
  }
};

  const stocks = activeTab === 'volume' ? volumeStocks : surgeStocks;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 🔥 탭 */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">실시간 종목</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('volume')}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeTab === 'volume'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            거래량 TOP
          </button>

          <button
            onClick={() => setActiveTab('surge')}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeTab === 'surge'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            급등 종목
          </button>
        </div>
      </div>

      {/* 🔥 리스트 */}
      <div className="divide-y divide-gray-100">
        {stocks.map((stock, idx) => {
          const isUp = Number(stock.rate) >= 0;

          return (
            <button
              key={stock.code}
              onClick={() => onStockClick(stock.code)}
              className="w-full px-6 py-4 hover:bg-blue-50 text-left"
            >
              <div className="flex items-center justify-between">

                {/* 왼쪽 */}
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500 text-white font-bold">
                    {idx + 1}
                  </div>

                  <div>
                    <div className="font-medium text-gray-900">
                      {stock.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stock.code}
                    </div>
                  </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {stock.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      거래량: {stock.volume}
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
                      isUp
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {stock.rate}%
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