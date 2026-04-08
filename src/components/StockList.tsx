import { useState } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

const popularStocks = [
  { rank: 1, name: '삼성전자', ticker: '005930', price: '74,200원', change: '+1.23%', volume: '720억', isUp: true },
  { rank: 2, name: 'SK하이닉스', ticker: '000660', price: '186,500원', change: '+2.54%', volume: '650억', isUp: true },
  { rank: 3, name: 'NAVER', ticker: '035420', price: '178,000원', change: '+2.11%', volume: '580억', isUp: true },
  { rank: 4, name: 'LG에너지솔루션', ticker: '373220', price: '412,000원', change: '-1.13%', volume: '560억', isUp: false },
  { rank: 5, name: '현대차', ticker: '005380', price: '234,500원', change: '+0.92%', volume: '530억', isUp: true },
  { rank: 6, name: '기아', ticker: '000270', price: '112,300원', change: '+1.89%', volume: '490억', isUp: true },
  { rank: 7, name: '카카오', ticker: '035720', price: '45,600원', change: '-0.87%', volume: '470억', isUp: false },
  { rank: 8, name: 'POSCO홀딩스', ticker: '005490', price: '389,500원', change: '+1.45%', volume: '450억', isUp: true },
  { rank: 9, name: '셀트리온', ticker: '068270', price: '178,900원', change: '+3.21%', volume: '430억', isUp: true },
  { rank: 10, name: 'KB금융', ticker: '105560', price: '67,800원', change: '+1.34%', volume: '410억', isUp: true },
];

const volumeStocks = [
  { rank: 1, name: '삼성전자', ticker: '005930', price: '74,200원', change: '+0.45%', volume: '2.5천억', isUp: true },
  { rank: 2, name: 'NAVER', ticker: '035420', price: '178,000원', change: '+1.23%', volume: '1.8천억', isUp: true },
  { rank: 3, name: 'SK하이닉스', ticker: '000660', price: '186,500원', change: '+2.67%', volume: '1.2천억', isUp: true },
  { rank: 4, name: '카카오', ticker: '035720', price: '45,600원', change: '-0.34%', volume: '980억', isUp: false },
  { rank: 5, name: 'LG에너지솔루션', ticker: '373220', price: '412,000원', change: '-1.45%', volume: '950억', isUp: false },
];

const surgeStocks = [
  { rank: 1, name: '셀트리온', ticker: '068270', price: '178,900원', change: '+8.45%', volume: '890억', isUp: true },
  { rank: 2, name: '한화에어로스페이스', ticker: '012450', price: '234,500원', change: '+7.21%', volume: '820억', isUp: true },
  { rank: 3, name: '기아', ticker: '000270', price: '112,300원', change: '+6.89%', volume: '780억', isUp: true },
  { rank: 4, name: 'SK하이닉스', ticker: '000660', price: '186,500원', change: '+5.67%', volume: '850억', isUp: true },
  { rank: 5, name: '크래프톤', ticker: '259960', price: '234,000원', change: '+5.45%', volume: '720억', isUp: true },
];

interface StockListProps {
  onStockClick: (stockName: string) => void;
}

export function StockList({ onStockClick }: StockListProps) {
  const [activeTab, setActiveTab] = useState<'popular' | 'volume' | 'surge'>('popular');

  const getStockData = () => {
    switch (activeTab) {
      case 'popular':
        return popularStocks;
      case 'volume':
        return volumeStocks;
      case 'surge':
        return surgeStocks;
      default:
        return popularStocks;
    }
  };

  const stocks = getStockData();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* 탭 헤더 */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">인기 종목</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('popular')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'popular'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            인기 종목
          </button>
          <button
            onClick={() => setActiveTab('volume')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'volume'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            거래량 TOP
          </button>
          <button
            onClick={() => setActiveTab('surge')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'surge'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            급등 종목
          </button>
        </div>
      </div>

      {/* 종목 리스트 */}
      <div className="divide-y divide-gray-100">
        {stocks.map((stock) => (
          <button
            key={stock.ticker}
            onClick={() => onStockClick(stock.name)}
            className="w-full px-6 py-4 hover:bg-blue-50 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-sm group-hover:shadow-lg transition-shadow">
                    {stock.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 truncate">{stock.name}</div>
                    <div className="text-xs text-gray-500">{stock.ticker}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right">
                  <div className="font-medium text-gray-900">{stock.price}</div>
                  <div className="text-xs text-gray-500">{stock.volume}</div>
                </div>
                <div className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  stock.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stock.isUp ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {stock.change}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}