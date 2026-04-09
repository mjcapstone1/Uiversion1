import { useState, useEffect } from 'react';
import { Star, TrendingUp, TrendingDown, Search, Bookmark, ShoppingCart, Clock, PieChart, Plus } from 'lucide-react';
import { StockDetailPage } from './StockDetailPage';

interface Stock {
  id: string;
  name: string;
  code: string;
  volume: number;
  price: number;
  changeRate: number;
  type: 'domestic';
}

interface HoldingStock extends Stock {
  quantity: number;
  avgPrice: number;
  totalValue: number;
  profitLoss: number;
}

interface ScheduledOrder {
  id: string;
  stock: Stock;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  condition: 'above' | 'below';
  createdAt: string;
}

const mockStocks: Stock[] = [
  { id: '1', name: '삼성전자', code: '005930', volume: 12500000, price: 71200, changeRate: 2.34, type: 'domestic' },
  { id: '2', name: 'SK하이닉스', code: '000660', volume: 8300000, price: 128500, changeRate: -1.24, type: 'domestic' },
  { id: '3', name: 'NAVER', code: '035420', volume: 520000, price: 234500, changeRate: 0.85, type: 'domestic' },
  { id: '4', name: '카카오', code: '035720', volume: 1800000, price: 45600, changeRate: -2.15, type: 'domestic' },
  { id: '5', name: 'LG에너지솔루션', code: '373220', volume: 620000, price: 412000, changeRate: 1.78, type: 'domestic' },
  { id: '6', name: '현대차', code: '005380', volume: 980000, price: 215000, changeRate: 1.23, type: 'domestic' },
  { id: '7', name: '기아', code: '000270', volume: 1200000, price: 98200, changeRate: 0.91, type: 'domestic' },
  { id: '8', name: '셀트리온', code: '068270', volume: 650000, price: 156000, changeRate: 2.45, type: 'domestic' },
  { id: '9', name: 'KB금융', code: '105560', volume: 890000, price: 68200, changeRate: 1.34, type: 'domestic' },
  { id: '10', name: 'POSCO홀딩스', code: '005490', volume: 450000, price: 387000, changeRate: 0.58, type: 'domestic' },
  { id: '11', name: '삼성바이오로직스', code: '207940', volume: 85000, price: 782000, changeRate: 1.56, type: 'domestic' },
  { id: '12', name: 'LG전자', code: '066570', volume: 1200000, price: 98500, changeRate: 0.45, type: 'domestic' },
  { id: '13', name: '삼성SDI', code: '006400', volume: 450000, price: 421000, changeRate: 1.23, type: 'domestic' },
  { id: '14', name: '크래프톤', code: '259960', volume: 180000, price: 218000, changeRate: -1.87, type: 'domestic' },
  { id: '15', name: '한화에어로스페이스', code: '012450', volume: 680000, price: 256000, changeRate: 3.45, type: 'domestic' },
];

interface SimulatorPageProps {
  stockName?: string | null;
  onNavigateToLearning?: () => void;
}

export function SimulatorPage({ stockName, onNavigateToLearning }: SimulatorPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3', '5']));
  const [activeTab, setActiveTab] = useState<'favorites' | 'holdings' | 'scheduled' | 'portfolio'>('favorites');

  // 보유 종목 데이터
  const [holdings, setHoldings] = useState<HoldingStock[]>([
    {
      id: '1',
      name: '삼성전자',
      code: '005930',
      volume: 12500000,
      price: 71200,
      changeRate: 2.34,
      type: 'domestic',
      quantity: 10,
      avgPrice: 69000,
      totalValue: 712000,
      profitLoss: 22000,
    },
    {
      id: '3',
      name: 'NAVER',
      code: '035420',
      volume: 520000,
      price: 234500,
      changeRate: 0.85,
      type: 'domestic',
      quantity: 5,
      avgPrice: 220000,
      totalValue: 1172500,
      profitLoss: 72500,
    },
  ]);

  // 예약 주문 데이터
  const [scheduledOrders, setScheduledOrders] = useState<ScheduledOrder[]>([
    {
      id: '1',
      stock: mockStocks[1],
      type: 'buy',
      price: 125000,
      quantity: 5,
      condition: 'below',
      createdAt: '2024-04-06 09:30',
    },
    {
      id: '2',
      stock: mockStocks[4],
      type: 'sell',
      price: 420000,
      quantity: 2,
      condition: 'above',
      createdAt: '2024-04-06 10:15',
    },
  ]);

  // 실시간 가격 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          if (Math.random() > 0.3) return stock;

          const priceChangePercent = (Math.random() - 0.5) * 1;
          const priceChange = stock.price * (priceChangePercent / 100);
          const newPrice = Math.max(stock.price + priceChange, stock.price * 0.5);

          const changeRateAdjust = (Math.random() - 0.5) * 0.3;
          const newChangeRate = stock.changeRate + changeRateAdjust;

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(0)),
            changeRate: parseFloat(newChangeRate.toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 전달받은 주식명으로 자동 선택
  useEffect(() => {
    if (stockName) {
      const stock = stocks.find(s => s.name === stockName);
      if (stock) {
        setSelectedStock(stock);
      }
    }
  }, [stockName, stocks]);

  const filteredStocks = stocks.filter(stock => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return stock.name.toLowerCase().includes(query) || stock.code.toLowerCase().includes(query);
    }
    return true;
  });

  const favoriteStocks = stocks.filter(stock => favorites.has(stock.id));

  const toggleFavorite = (stockId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stockId)) {
        newSet.delete(stockId);
      } else {
        newSet.add(stockId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const totalHoldingValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalProfitLoss = holdings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalProfitLossRate = totalHoldingValue > 0 ? (totalProfitLoss / (totalHoldingValue - totalProfitLoss)) * 100 : 0;

  // 선택된 주식이 있으면 상세 페이지 표시
  if (selectedStock) {
    return <StockDetailPage stock={selectedStock} onBack={() => setSelectedStock(null)} onNavigateToLearning={onNavigateToLearning} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* 상단 정보 카드 */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-2">보유 자산</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">₩{formatNumber(10000000)}</div>
            <div className="text-sm text-emerald-600 font-medium">+5.2% (₩500,000)</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-2">현금</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">₩{formatNumber(3500000)}</div>
            <div className="text-sm text-gray-500">투자 가능 금액</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-2">수익률</div>
            <div className="text-3xl font-bold text-emerald-600 mb-1">+12.5%</div>
            <div className="text-sm text-gray-500">전체 수익률</div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="h-5 w-5" />
              관심 종목
            </button>
            <button
              onClick={() => setActiveTab('holdings')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'holdings'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              보유 종목
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'scheduled'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-5 w-5" />
              예약 주문
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'portfolio'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <PieChart className="h-5 w-5" />
              포트폴리오
            </button>
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">관심 종목</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>{favorites.size}개 즐겨찾기</span>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="종목명 또는 코드 검색"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {favoriteStocks.map(stock => (
                <div
                  key={stock.id}
                  onClick={() => setSelectedStock(stock)}
                  className="px-6 py-4 hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleFavorite(stock.id);
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      </button>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">{stock.code}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatNumber(stock.price)}원</div>
                        <div className="text-xs text-gray-500">거래량 {formatVolume(stock.volume)}</div>
                      </div>
                      <div
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 min-w-[100px] justify-center ${
                          stock.changeRate >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {stock.changeRate >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {stock.changeRate >= 0 ? '+' : ''}
                          {stock.changeRate.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {favoriteStocks.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-sm text-gray-600">즐겨찾기한 종목이 없습니다.</div>
                  <div className="text-xs text-gray-500 mt-1">별 아이콘을 눌러 종목을 추가하세요.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'holdings' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">보유 종목</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="text-xs text-gray-600 mb-1">총 평가액</div>
                  <div className="text-xl font-bold text-gray-900">₩{formatNumber(totalHoldingValue)}</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="text-xs text-gray-600 mb-1">총 손익</div>
                  <div className={`text-xl font-bold ${totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {totalProfitLoss >= 0 ? '+' : ''}₩{formatNumber(totalProfitLoss)}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="text-xs text-gray-600 mb-1">수익률</div>
                  <div className={`text-xl font-bold ${totalProfitLossRate >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {totalProfitLossRate >= 0 ? '+' : ''}
                    {totalProfitLossRate.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {holdings.map(holding => (
                <div
                  key={holding.id}
                  onClick={() => setSelectedStock(holding)}
                  className="px-6 py-4 hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {holding.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {holding.code} · {holding.quantity}주 보유
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">₩{formatNumber(holding.price)}</div>
                      <div className="text-xs text-gray-500">평단가 ₩{formatNumber(holding.avgPrice)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">평가액 ₩{formatNumber(holding.totalValue)}</div>
                    <div className={`text-sm font-medium ${holding.profitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {holding.profitLoss >= 0 ? '+' : ''}₩{formatNumber(holding.profitLoss)} (
                      {((holding.profitLoss / (holding.avgPrice * holding.quantity)) * 100).toFixed(2)}%)
                    </div>
                  </div>
                </div>
              ))}
              {holdings.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-sm text-gray-600">보유 중인 종목이 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'scheduled' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">예약 주문</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  예약 주문 추가
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {scheduledOrders.map(order => (
                <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-bold text-gray-900">{order.stock.name}</div>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            order.type === 'buy'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {order.type === 'buy' ? '매수' : '매도'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.condition === 'above' ? '지정가 이상' : '지정가 이하'} ₩
                        {formatNumber(order.price)} 도달 시
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{order.quantity}주</div>
                      <div className="text-xs text-gray-500">{order.createdAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      현재가 ₩{formatNumber(order.stock.price)}
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      취소
                    </button>
                  </div>
                </div>
              ))}
              {scheduledOrders.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-sm text-gray-600">예약된 주문이 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">포트폴리오 분석</h2>
            
            {/* 자산 배분 차트 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">종목별 비중</h3>
                <div className="space-y-3">
                  {holdings.map((holding, index) => {
                    const percentage = (holding.totalValue / totalHoldingValue) * 100;
                    return (
                      <div key={holding.id}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700">{holding.name}</span>
                          <span className="font-medium text-gray-900">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">수익률 분석</h3>
                <div className="space-y-3">
                  {holdings.map(holding => {
                    const profitRate = ((holding.profitLoss / (holding.avgPrice * holding.quantity)) * 100);
                    return (
                      <div key={holding.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{holding.name}</span>
                        <span
                          className={`text-sm font-medium ${
                            profitRate >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {profitRate >= 0 ? '+' : ''}
                          {profitRate.toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 투자 통계 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">보유 종목 수</div>
                <div className="text-2xl font-bold text-gray-900">{holdings.length}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">총 투자금</div>
                <div className="text-2xl font-bold text-gray-900">
                  ₩{formatNumber(totalHoldingValue - totalProfitLoss)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">평가 금액</div>
                <div className="text-2xl font-bold text-gray-900">₩{formatNumber(totalHoldingValue)}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">실현 손익</div>
                <div className="text-2xl font-bold text-emerald-600">₩0</div>
              </div>
            </div>
          </div>
        )}

        {/* 전체 종목 검색 (관심 종목 탭이 아닐 때도 접근 가능) */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">전체 종목</h2>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredStocks.map(stock => (
                <div
                  key={stock.id}
                  onClick={() => setSelectedStock(stock)}
                  className="px-6 py-4 hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleFavorite(stock.id);
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            favorites.has(stock.id)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-gray-300 hover:text-amber-500'
                          }`}
                        />
                      </button>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">{stock.code}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatNumber(stock.price)}원</div>
                        <div className="text-xs text-gray-500">거래량 {formatVolume(stock.volume)}</div>
                      </div>
                      <div
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 min-w-[100px] justify-center ${
                          stock.changeRate >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {stock.changeRate >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {stock.changeRate >= 0 ? '+' : ''}
                          {stock.changeRate.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredStocks.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="h-12 w-12 mx-auto mb-3" />
                </div>
                <div className="text-sm text-gray-600">검색 결과가 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
