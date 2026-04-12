import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronDown, Check, AlertCircle, X } from 'lucide-react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CandlestickBar } from './CandlestickBar';
import { getStockCandles, getStockScreen } from '../api/stockApi';

interface Stock {
  id: string;
  name: string;
  code: string;
  volume: number;
  price: number;
  changeRate: number;
  type: 'domestic' | 'foreign';
}

interface StockDetailPageProps {
  stock: Stock;
  onBack: () => void;
  onNavigateToLearning?: () => void;
}

type TimeFrame = '1min' | '3min' | '5min' | '10min' | '15min' | '30min' | '60min' | 'day' | 'week' | 'month' | 'year';

// 포트폴리오 주식 타입 정의
interface PortfolioStock {
  id: string;
  name: string;
  code: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  type: 'domestic' | 'foreign';
  folderId?: string;
}

interface PortfolioFolder {
  id: string;
  name: string;
  color: string;
}

export function StockDetailPage({ stock: initialStock, onBack, onNavigateToLearning }: StockDetailPageProps) {
  const [stock, setStock] = useState(initialStock);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderPrice, setOrderPrice] = useState(stock.price.toString());
  const [orderQuantity, setOrderQuantity] = useState('1');
  const [chartData, setChartData] = useState<any[]>([]);
  const [priceType, setPriceType] = useState<'limit' | 'market' | 'scheduled'>('limit');
  const [balance, setBalance] = useState(50000000); // 5천만원 기 잔액
  const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState(false);
  const [showChargePage, setShowChargePage] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 확대/축소 레벨
  const [showAutoOrderModal, setShowAutoOrderModal] = useState(false);
  const [autoOrderCondition, setAutoOrderCondition] = useState<'above' | 'below'>('above');
  const [autoOrderPrice, setAutoOrderPrice] = useState('');
  const [autoOrderQuantity, setAutoOrderQuantity] = useState('1');
  const [autoOrderType, setAutoOrderType] = useState<'buy' | 'sell'>('buy');
  const [usdToKrw, setUsdToKrw] = useState(1320);
  const [selectedOrderBookPrice, setSelectedOrderBookPrice] = useState<{ price: number; type: 'ask' | 'bid' } | null>(null);
  const [quickOrderAction, setQuickOrderAction] = useState<'buy' | 'sell' | null>(null);
  
  // 신규 추가 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'buy' | 'sell'; price: number; quantity: number } | null>(null);

  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolderColor, setSelectedFolderColor] = useState('#3b82f6');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showEducationPromptModal, setShowEducationPromptModal] = useState(false);

  // 폴더 목록
  const [folders, setFolders] = useState<PortfolioFolder[]>([
    { id: 'tech', name: '기술주', color: '#3b82f6' },
    { id: 'dividend', name: '배당주', color: '#10b981' },
    { id: 'growth', name: '성장주', color: '#8b5cf6' },
  ]);

  // 모의 포트폴리오 데이터 (실제로는 상위 컴포넌트에서 전달받거나 상태 관리)
  const [portfolio] = useState<PortfolioStock[]>([
    { id: '1', name: '삼성전자', code: '005930', quantity: 10, avgPrice: 70000, currentPrice: 71200, type: 'domestic', folderId: 'tech' },
    { id: '3', name: 'NAVER', code: '035420', quantity: 5, avgPrice: 230000, currentPrice: 234500, type: 'domestic', folderId: 'tech' },
    { id: '6', name: 'Apple', code: 'AAPL', quantity: 8, avgPrice: 175.50, currentPrice: 178.25, type: 'foreign', folderId: 'tech' },
    { id: '9', name: 'NVIDIA', code: 'NVDA', quantity: 3, avgPrice: 480.00, currentPrice: 495.22, type: 'foreign', folderId: 'growth' },
    { id: '5', name: 'LG에너지솔루션', code: '373220', quantity: 2, avgPrice: 400000, currentPrice: 412000, type: 'domestic', folderId: 'growth' },
  ]);

  // 호가 데이터 생성
  const [askPrices, setAskPrices] = useState<Array<{ price: number; volume: number }>>([]);
  const [bidPrices, setBidPrices] = useState<Array<{ price: number; volume: number }>>([]);
  const [liveOwnedQuantity, setLiveOwnedQuantity] = useState<number | null>(null);
  const stockIdentifier = initialStock.id || initialStock.code;

  useEffect(() => {
    let cancelled = false;

    const getRequestedPoints = () => {
      const basePoints = timeFrame.includes('min')
        ? 60
        : timeFrame === 'day'
          ? 30
          : timeFrame === 'week'
            ? 7
            : timeFrame === 'month'
              ? 30
              : 12;
      return Math.max(5, Math.floor(basePoints * zoomLevel));
    };

    const loadLiveStockScreen = async () => {
      try {
        const [screen, candles] = await Promise.all([
          getStockScreen(stockIdentifier, timeFrame),
          getStockCandles(stockIdentifier, timeFrame, getRequestedPoints()),
        ]);

        if (cancelled) {
          return;
        }

        setStock(prevStock => ({
          ...prevStock,
          ...screen.stock,
        }));
        setAskPrices(Array.isArray(screen.orderBook?.asks) ? screen.orderBook.asks : []);
        setBidPrices(Array.isArray(screen.orderBook?.bids) ? screen.orderBook.bids : []);
        setChartData(candles.length > 0 ? candles : Array.isArray(screen.chartData) ? screen.chartData : []);
        setBalance(Number(screen.wallet?.balance ?? balance));
        setUsdToKrw(Number(screen.exchangeRate ?? screen.wallet?.exchangeRate ?? 1320));
        setLiveOwnedQuantity(
          typeof screen.ownedQuantity === 'number'
            ? screen.ownedQuantity
            : typeof screen.ownedStock?.quantity === 'number'
              ? screen.ownedStock.quantity
              : 0
        );
      } catch (error) {
        console.error('주식 상세 화면 조회 실패', error);
      }
    };

    loadLiveStockScreen();
    const interval = setInterval(loadLiveStockScreen, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [stockIdentifier, timeFrame, zoomLevel]);

  // Removed auto-update of orderPrice to stock.price to satisfy user request

  // 보유 수량 확인용
  const ownedStock = portfolio.find(p => p.code === stock.code);
  const ownedQuantity = liveOwnedQuantity ?? (ownedStock ? ownedStock.quantity : 0);

  const handlePercentageSelect = (percentage: number) => {
    const currentPrice = parseFloat(orderPrice) || stock.price;
    if (orderType === 'buy') {
      // 매수 수량 = (주문 가능 금액 × 선택 퍼센트) ÷ 현재가 (내림)
      // 해외 주식일 경우 주문 가능 금액을 달러로 환산하여 계산
      const availableFunds = stock.type === 'foreign' ? balance / usdToKrw : balance;
      const quantity = Math.floor((availableFunds * (percentage / 100)) / currentPrice);
      setOrderQuantity(quantity.toString());
    } else {
      // 매도 수량 = 보유 수량 × 선택 퍼센트 (내림)
      const quantity = Math.floor(ownedQuantity * (percentage / 100));
      setOrderQuantity(quantity.toString());
    }
  };

  const handleOrderSubmit = () => {
    // 교육 완료 여부 확인
    const hasCompletedEducation = localStorage.getItem('hasCompletedEducation');
    if (!hasCompletedEducation) {
      setShowEducationPromptModal(true);
      return;
    }

    const price = parseFloat(orderPrice) || stock.price;
    const quantity = parseInt(orderQuantity) || 0;
    
    if (quantity <= 0) {
      alert('수량을 입력해주세요.');
      return;
    }

    if (orderType === 'buy') {
      const total = price * quantity;
      if (total > balance) {
        setShowInsufficientFundsModal(true);
        return;
      }
    } else {
      if (quantity > ownedQuantity) {
        alert('보유 수량이 부족합니다.');
        return;
      }
    }

    setPendingAction({ type: orderType, price, quantity });
    setShowConfirmModal(true);
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

  const getTimeFrameLabel = (tf: TimeFrame) => {
    const labels: Record<TimeFrame, string> = {
      '1min': '1분',
      '3min': '3분',
      '5min': '5분',
      '10min': '10분',
      '15min': '15분',
      '30min': '30분',
      '60min': '60분',
      'day': '일봉',
      'week': '주봉',
      'month': '월봉',
      'year': '년봉'
    };
    return labels[tf];
  };

  const minuteOptions: TimeFrame[] = ['1min', '3min', '5min', '10min', '15min', '30min', '60min'];

  const calculateTotal = () => {
    const price = parseFloat(orderPrice) || 0;
    const quantity = parseInt(orderQuantity) || 0;
    return price * quantity;
  };

  const handleReset = () => {
    setOrderPrice('0');
    setOrderQuantity('0');
  };

  const handleOrderBookClick = (price: number, type: 'ask' | 'bid') => {
    setSelectedOrderBookPrice({ price, type });
    setQuickOrderAction(null); // Reset action when price changes
  };

  const handleQuickOrder = (actionType: 'buy' | 'sell', percentage?: number) => {
    if (selectedOrderBookPrice) {
      const price = selectedOrderBookPrice.price;
      const formattedPrice = stock.type === 'domestic' ? formatNumber(price) : price.toFixed(2);
      const currency = stock.type === 'domestic' ? '원' : '달러';
      
      let quantity = 1; // Default to 1 unit
      
      if (percentage) {
        if (actionType === 'buy') {
          const availableFunds = stock.type === 'foreign' ? balance / usdToKrw : balance;
          quantity = Math.floor((availableFunds * (percentage / 100)) / price);
        } else {
          quantity = Math.floor(ownedQuantity * (percentage / 100));
        }
      }

      if (quantity <= 0 && percentage) {
        alert('주문 가능한 수량이 없습니다.');
        return;
      }

      setPendingAction({ type: actionType, price, quantity });
      setShowConfirmModal(true);
      // 주문 확인 창을 띄울 때 호가 선택 상태를 초기화하지 않음 (사용자가 확인 후 사라지게 함)
      // setSelectedOrderBookPrice(null); 
      // setQuickOrderAction(null);
    }
  };

  const handleConfirmOrder = () => {
    if (!pendingAction) return;
    
    const total = pendingAction.price * pendingAction.quantity;
    
    if (pendingAction.type === 'buy') {
      const totalInKRW = stock.type === 'foreign' ? total * usdToKrw : total;
      if (totalInKRW > balance) {
        setShowInsufficientFundsModal(true);
        return;
      }
      setBalance(prev => prev - totalInKRW);
    } else {
      setBalance(prev => prev + (stock.type === 'foreign' ? total * usdToKrw : total));
    }
    
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    
    // 주문 성공 후 호가 팝업 닫기
    setSelectedOrderBookPrice(null);
    setQuickOrderAction(null);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] gap-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Panel - Chart */}
      <div className="w-[70%] border-r border-gray-200 overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 shadow-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl text-gray-900 font-bold">{stock.name}</h1>
                <span className="text-gray-500">{stock.code}</span>
              </div>
              <div className="text-sm text-gray-600">
                거래량: {formatVolume(stock.volume)}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl text-gray-900 font-bold mb-1">
                {stock.type === 'domestic' ? '₩' : '$'}
                {formatNumber(stock.price)}
              </div>
              {stock.type === 'foreign' && (
                <div className="text-sm text-gray-600 mb-1">
                  ≈ ₩{formatNumber(Math.floor(stock.price * usdToKrw))}
                </div>
              )}
              <div
                className={`flex items-center justify-end gap-1 font-medium ${
                  stock.changeRate > 0
                    ? 'text-emerald-600'
                    : stock.changeRate < 0
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {stock.changeRate > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : stock.changeRate < 0 ? (
                  <TrendingDown className="h-4 w-4" />
                ) : null}
                <span>
                  {stock.changeRate > 0 ? '+' : ''}
                  {stock.changeRate.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="sticky top-[140px] bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setShowMinuteDropdown(!showMinuteDropdown)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeFrame.includes('min')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeFrame.includes('min') ? getTimeFrameLabel(timeFrame) : '분봉'}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showMinuteDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-20">
                  {minuteOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTimeFrame(option);
                        setShowMinuteDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        timeFrame === option
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getTimeFrameLabel(option)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setTimeFrame('day');
                setShowMinuteDropdown(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              일봉
            </button>
            <button
              onClick={() => {
                setTimeFrame('week');
                setShowMinuteDropdown(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              주봉
            </button>
            <button
              onClick={() => {
                setTimeFrame('month');
                setShowMinuteDropdown(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              월봉
            </button>
            <button
              onClick={() => {
                setTimeFrame('year');
                setShowMinuteDropdown(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              년봉
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <div 
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 min-h-[550px] border border-gray-200 shadow-sm"
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
            }}
          >
            <ResponsiveContainer width="100%" height={500}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs shadow-lg">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between gap-4">
                              <span className="text-gray-600">시가:</span>
                              <span className="text-gray-900 font-medium">{stock.type === 'domestic' ? formatNumber(data.open) : data.open.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-gray-600">고가:</span>
                              <span className="text-emerald-600 font-medium">{stock.type === 'domestic' ? formatNumber(data.high) : data.high.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-gray-600">저가:</span>
                              <span className="text-red-600 font-medium">{stock.type === 'domestic' ? formatNumber(data.low) : data.low.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-gray-600">종가:</span>
                              <span className="text-gray-900 font-medium">{stock.type === 'domestic' ? formatNumber(data.close) : data.close.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="high"
                  shape={<CandlestickBar />}
                  barSize={timeFrame.includes('min') ? 12 : timeFrame === 'day' ? 30 : 35}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right Panel - Buy/Sell */}
      <div className="w-[30%] bg-white overflow-y-auto border-l border-gray-200">
        <div className="p-4">
          {/* Order Type Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                orderType === 'buy'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              매수
            </button>
            <button
              onClick={() => setOrderType('sell')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                orderType === 'sell'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              매도
            </button>
          </div>

          {/* 호가창 */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-700 font-medium mb-2">호가</h3>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden border border-gray-200">
              {/* 매도 호가 */}
              <div className="border-b border-gray-200">
                {askPrices.map((ask, index) => (
                  <div key={`ask-${index}`} className="relative">
                    <button
                      onClick={() => handleOrderBookClick(ask.price, 'ask')}
                      className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-100 transition-colors text-xs"
                    >
                      <span className="flex-1 text-left text-gray-600">{formatVolume(ask.volume)}</span>
                      <span className="flex-1 text-center text-blue-600 font-medium">
                        {stock.type === 'domestic' ? formatNumber(ask.price) : ask.price.toFixed(2)}
                      </span>
                      <span className="flex-1"></span>
                    </button>
                    {selectedOrderBookPrice?.price === ask.price && selectedOrderBookPrice.type === 'ask' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 min-h-[60px] border-2 border-blue-500 rounded shadow-xl">
                        {!quickOrderAction ? (
                          <div className="flex w-full h-full p-1 gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setQuickOrderAction('buy'); }}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                            >
                              매수
                            </button>
                            <div className="flex-[1.5] flex flex-col items-center justify-center bg-gray-100 rounded border border-gray-300">
                              <span className="text-gray-900 text-[11px] font-bold">
                                {stock.type === 'domestic' ? formatNumber(ask.price) : ask.price.toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setQuickOrderAction('sell'); }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded shadow-sm"
                            >
                              매도
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedOrderBookPrice(null); }}
                              className="px-1.5 text-gray-500 hover:text-gray-900"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-full h-full p-1 flex flex-col gap-1">
                            <div className="grid grid-cols-4 gap-1">
                              {[10, 25, 50, 100].map(pct => (
                                <button
                                  key={pct}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickOrder(quickOrderAction, pct);
                                  }}
                                  className={`py-1 text-[9px] font-bold rounded ${quickOrderAction === 'buy' ? 'bg-red-100 hover:bg-red-600 text-red-700 hover:text-white' : 'bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white'} border border-gray-300 transition-colors`}
                                >
                                  {pct === 100 ? '최대' : `${pct}%`}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickOrder(quickOrderAction);
                                }}
                                className={`flex-1 py-1 text-[10px] font-bold rounded shadow-sm ${quickOrderAction === 'buy' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                              >
                                1주 {quickOrderAction === 'buy' ? '매수' : '매도'}
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickOrderAction(null);
                                }}
                                className="px-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              >
                                <ArrowLeft className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* 현재가 표시 */}
              <div className="px-3 py-2 bg-gray-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white">현재가</span>
                  <span className={stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}>
                    {stock.type === 'domestic' ? formatNumber(stock.price) : stock.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 매수 호가 */}
              <div>
                {bidPrices.map((bid, index) => (
                  <div key={`bid-${index}`} className="relative">
                    <button
                      onClick={() => handleOrderBookClick(bid.price, 'bid')}
                      className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-red-100 transition-colors text-xs"
                    >
                      <span className="flex-1"></span>
                      <span className="flex-1 text-center text-red-600 font-medium">
                        {stock.type === 'domestic' ? formatNumber(bid.price) : bid.price.toFixed(2)}
                      </span>
                      <span className="flex-1 text-right text-gray-600">{formatVolume(bid.volume)}</span>
                    </button>
                    {selectedOrderBookPrice?.price === bid.price && selectedOrderBookPrice.type === 'bid' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 min-h-[60px] border-2 border-red-500 rounded shadow-xl">
                        {!quickOrderAction ? (
                          <div className="flex w-full h-full p-1 gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setQuickOrderAction('buy'); }}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-sm"
                            >
                              매수
                            </button>
                            <div className="flex-[1.5] flex flex-col items-center justify-center bg-gray-100 rounded border border-gray-300">
                              <span className="text-gray-900 text-[11px] font-bold">
                                {stock.type === 'domestic' ? formatNumber(bid.price) : bid.price.toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setQuickOrderAction('sell'); }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded shadow-sm"
                            >
                              매도
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedOrderBookPrice(null); }}
                              className="px-1.5 text-gray-500 hover:text-gray-900"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-full h-full p-1 flex flex-col gap-1">
                            <div className="grid grid-cols-4 gap-1">
                              {[10, 25, 50, 100].map(pct => (
                                <button
                                  key={pct}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickOrder(quickOrderAction, pct);
                                  }}
                                  className={`py-1 text-[9px] font-bold rounded ${quickOrderAction === 'buy' ? 'bg-red-100 hover:bg-red-600 text-red-700 hover:text-white' : 'bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white'} border border-gray-300 transition-colors`}
                                >
                                  {pct === 100 ? '최대' : `${pct}%`}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickOrder(quickOrderAction);
                                }}
                                className={`flex-1 py-1 text-[10px] font-bold rounded shadow-sm ${quickOrderAction === 'buy' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                              >
                                1주 {quickOrderAction === 'buy' ? '매수' : '매도'}
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickOrderAction(null);
                                }}
                                className="px-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              >
                                <ArrowLeft className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Type Selection */}
          <div className="flex gap-2 mb-4 text-xs">
            <button
              onClick={() => setPriceType('limit')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                priceType === 'limit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              지정가
            </button>
            <button
              onClick={() => setPriceType('market')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                priceType === 'market'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              시장가
            </button>
            <button
              onClick={() => {
                setPriceType('scheduled');
                setShowAutoOrderModal(true);
              }}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                priceType === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              예약 주문
            </button>
          </div>

          {/* 잔액 표시 */}
          <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-medium">보유 잔액</span>
              <div className="text-right">
                {stock.type === 'foreign' ? (
                  <>
                    <div className="text-gray-900 font-bold">
                      ${formatNumber(Math.floor(balance / usdToKrw * 100) / 100)}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      ≈ ₩{formatNumber(balance)}
                    </div>
                  </>
                ) : (
                  <span className="text-gray-900 font-bold">₩{formatNumber(balance)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="space-y-4">
            {/* Price Input */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-2">주문가격</label>
              <div className="relative flex items-center">
                <button
                  onClick={() => {
                    const current = parseFloat(orderPrice) || 0;
                    const decrement = stock.type === 'domestic' ? 100 : 0.76; // 해외: 1000원 = 약 0.76달러
                    setOrderPrice(Math.max(0, current - decrement).toFixed(stock.type === 'domestic' ? 0 : 2));
                  }}
                  disabled={priceType === 'market'}
                  className={`absolute left-3 z-10 w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors ${
                    priceType === 'market' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  disabled={priceType === 'market'}
                  className={`w-full bg-white border border-gray-300 rounded-lg px-12 py-3 text-gray-900 text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    priceType === 'market' ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
                  }`}
                />
                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600">
                  {stock.type === 'domestic' ? '원' : '$'}
                </span>
                <button
                  onClick={() => {
                    const current = parseFloat(orderPrice) || 0;
                    const increment = stock.type === 'domestic' ? 100 : 0.76; // 해외: 1000원 = 약 0.76달러
                    setOrderPrice((current + increment).toFixed(stock.type === 'domestic' ? 0 : 2));
                  }}
                  disabled={priceType === 'market'}
                  className={`absolute right-3 z-10 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors ${
                    priceType === 'market' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  +
                </button>
              </div>
              {/* 해외 주식 원화 환산 표시 */}
              {stock.type === 'foreign' && orderPrice && (
                <div className="text-xs text-gray-600 mt-1">
                  ≈ ₩{formatNumber(Math.floor(parseFloat(orderPrice) * usdToKrw))}
                </div>
              )}
              {priceType !== 'market' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setOrderPrice(stock.price.toString())}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                  >
                    현재가
                  </button>
                  <button
                    onClick={() => setOrderPrice((stock.price * 1.01).toFixed(stock.type === 'domestic' ? 0 : 2))}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                  >
                    +1%
                  </button>
                  <button
                    onClick={() => setOrderPrice((stock.price * 0.99).toFixed(stock.type === 'domestic' ? 0 : 2))}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                  >
                    -1%
                  </button>
                </div>
              )}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-2">수량</label>
              <div className="relative flex items-center">
                <button
                  onClick={() => {
                    const current = parseInt(orderQuantity) || 0;
                    setOrderQuantity(Math.max(0, current - 1).toString());
                  }}
                  className="absolute left-3 z-10 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  step="1"
                  className="w-full bg-white border border-gray-300 rounded-lg px-12 py-3 text-gray-900 text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  min="0"
                />
                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600">주</span>
                <button
                  onClick={() => {
                    const current = parseInt(orderQuantity) || 0;
                    setOrderQuantity((current + 1).toString());
                  }}
                  className="absolute right-3 z-10 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  +
                </button>
              </div>
              
              {/* 퍼센트 버튼들 (10%, 25%, 50%, 최대) */}
              <div className="grid grid-cols-4 gap-2 mb-4 mt-4">
                {[10, 25, 50, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handlePercentageSelect(pct)}
                    className="py-2 text-[11px] font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all border border-gray-200"
                  >
                    {pct === 100 ? '최대' : `${pct}%`}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 mt-2">
                {stock.type === 'foreign' ? (
                  <>
                    <button
                      onClick={() => setOrderQuantity('0.1')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      0.1주
                    </button>
                    <button
                      onClick={() => setOrderQuantity('0.5')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      0.5주
                    </button>
                    <button
                      onClick={() => setOrderQuantity('1')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      1주
                    </button>
                    <button
                      onClick={() => setOrderQuantity('10')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      10주
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setOrderQuantity('10')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      10주
                    </button>
                    <button
                      onClick={() => setOrderQuantity('50')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      50주
                    </button>
                    <button
                      onClick={() => setOrderQuantity('100')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors font-medium"
                    >
                      100주
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">주문 총액</span>
                <span className="text-gray-900 font-bold text-lg">
                  {stock.type === 'domestic' ? '₩' : '$'}
                  {formatNumber(calculateTotal())}
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-2 rounded-lg bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              초기화
            </button>

            {/* Submit Button */}
            <button
              onClick={handleOrderSubmit}
              className={`w-full py-4 rounded-lg text-white font-bold transition-colors shadow-md ${
                orderType === 'buy'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {orderType === 'buy' ? '매수' : '매도'} 주문
            </button>
          </div>

          {/* Account Info */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-gray-200">
            <h3 className="text-gray-900 font-bold mb-3">보유 현황</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">보유 잔액</span>
                <div className="text-right">
                  {stock.type === 'foreign' ? (
                    <>
                      <div className="text-gray-900 font-bold">
                        ${formatNumber(Math.floor(balance / usdToKrw * 100) / 100)}
                      </div>
                      <div className="text-xs text-gray-600">
                        ≈ ₩{formatNumber(balance)}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-900 font-bold">₩{formatNumber(balance)}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">보유 수량</span>
                <span className="text-gray-900 font-bold">0주</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">평균 매수가</span>
                <span className="text-white">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">평가 손익</span>
                <span className="text-gray-400">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">수익률</span>
                <span className="text-gray-400">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && pendingAction && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1c1c1e] border border-gray-800 rounded-3xl w-full max-w-[340px] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 text-center">주문 확인</h3>
            
            <div className="bg-[#2c2c2e] rounded-2xl p-5 mb-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#adb5bd]">종목</span>
                <span className="text-white font-medium">{stock.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#adb5bd]">구분</span>
                <span className={`font-bold ${pendingAction.type === 'buy' ? 'text-[#f04452]' : 'text-[#3182f6]'}`}>
                  {pendingAction.type === 'buy' ? '매수' : '매도'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#adb5bd]">가격</span>
                <span className="text-white font-medium">
                  {stock.type === 'domestic' ? '₩' : '$'}{formatNumber(pendingAction.price)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#adb5bd]">수량</span>
                <span className="text-white font-medium">{pendingAction.quantity}주</span>
              </div>
              
              <div className="h-[1px] bg-[#3a3a3c] my-1" />
              
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">총 금액</span>
                <span className="text-white font-bold">
                  {stock.type === 'domestic' ? '₩' : '$'}{formatNumber(pendingAction.price * pendingAction.quantity)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingAction(null);
                }}
                className="flex-1 py-4 bg-[#2c2c2e] text-white rounded-2xl font-bold hover:bg-[#3a3a3c] transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleConfirmOrder}
                className={`flex-1 py-4 text-white rounded-2xl font-bold transition-colors ${
                  pendingAction.type === 'buy' ? 'bg-[#f04452] hover:bg-[#d83a45]' : 'bg-[#3182f6] hover:bg-[#256fd1]'
                }`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1c1c1e] border border-gray-800 rounded-3xl w-full max-w-[340px] p-8 shadow-2xl flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-[#183428] flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-[#2ecc71]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">주문이 완료되었습니다</h3>
            <p className="text-[#adb5bd] text-sm mb-8 leading-relaxed">
              성공적으로 주문이 접수되었습니다.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                setPendingAction(null);
              }}
              className="w-full py-4 bg-[#3182f6] text-white rounded-2xl font-bold hover:bg-[#256fd1] transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 교육 유도 모달 */}
      {showEducationPromptModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl text-gray-900 font-bold mb-2">잠깐만요! 📚</h3>
              <p className="text-gray-600 leading-relaxed">
                투자를 시작하기 전에<br />
                <span className="font-semibold text-blue-600">AI 학습 페이지</span>에서 기본 교육을 먼저 받아보는 건 어떨까요?
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-200">
              <p className="text-sm text-gray-700 mb-3 font-medium">🎓 학습하면 좋은 점:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>투자의 기본 개념과 용어를 이해할 수 있어요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>손실을 줄이고 수익을 높이는 전략을 배워요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>당신의 투자 성향에 맞는 맞춤형 교육을 제공해요</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.setItem('hasCompletedEducation', 'skipped');
                  setShowEducationPromptModal(false);
                }}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition-colors font-medium"
              >
                건너뛰기
              </button>
              <button
                onClick={() => {
                  setShowEducationPromptModal(false);
                  if (onNavigateToLearning) {
                    onNavigateToLearning();
                  }
                }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg"
              >
                학습하러 가기 →
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              학습은 5분 정도면 완료할 수 있어요
            </p>
          </div>
        </div>
      )}

      {/* 잔액 부족 모달 */}
      {showInsufficientFundsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl text-gray-900 font-bold mb-4">주문 불가</h3>
            <p className="text-gray-700 mb-6">
              주문가능 금액이 부족합니다.<br />
              부족한 금액을 충전할까요?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInsufficientFundsModal(false)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors font-medium"
              >
                아니요
              </button>
              <button
                onClick={() => {
                  setShowInsufficientFundsModal(false);
                  setShowChargePage(true);
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 자동주문 설정 모달 */}
      {showAutoOrderModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl text-gray-900 font-bold mb-4">예약 주문 설정</h3>
            
            <div className="space-y-4">
              {/* 매수/매도 선택 */}
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">주문 유형</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAutoOrderType('buy')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      autoOrderType === 'buy'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    매수
                  </button>
                  <button
                    onClick={() => setAutoOrderType('sell')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      autoOrderType === 'sell'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    매도
                  </button>
                </div>
              </div>

              {/* 조건 선택 */}
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">발동 조건</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAutoOrderCondition('above')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      autoOrderCondition === 'above'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    이상
                  </button>
                  <button
                    onClick={() => setAutoOrderCondition('below')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      autoOrderCondition === 'below'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    이하
                  </button>
                </div>
              </div>

              {/* 가격 입력 */}
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  주문 가격 ({autoOrderCondition === 'above' ? '이상일 때' : '이하일 때'})
                </label>
                <div className="relative flex items-center">
                  <button
                    onClick={() => {
                      const current = parseFloat(autoOrderPrice) || 0;
                      const decrement = stock.type === 'domestic' ? 100 : 0.76;
                      setAutoOrderPrice(Math.max(0, current - decrement).toFixed(stock.type === 'domestic' ? 0 : 2));
                    }}
                    className="absolute left-3 z-10 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={autoOrderPrice}
                    onChange={(e) => setAutoOrderPrice(e.target.value)}
                    placeholder={`가격 입력`}
                    className="w-full bg-white border border-gray-300 rounded-lg px-12 py-3 text-gray-900 text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={() => {
                      const current = parseFloat(autoOrderPrice) || 0;
                      const increment = stock.type === 'domestic' ? 100 : 0.76;
                      setAutoOrderPrice((current + increment).toFixed(stock.type === 'domestic' ? 0 : 2));
                    }}
                    className="absolute right-3 z-10 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 수량 입력 */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">수량</label>
                <div className="relative flex items-center">
                  <button
                    onClick={() => {
                      const current = parseInt(autoOrderQuantity) || 0;
                      setAutoOrderQuantity(Math.max(0, current - 1).toString());
                    }}
                    className="absolute left-3 z-10 w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={autoOrderQuantity}
                    onChange={(e) => setAutoOrderQuantity(e.target.value)}
                    placeholder="수량 입력"
                    step="1"
                    className="w-full bg-[#1a1d24] border border-gray-700 rounded-lg px-12 py-3 text-white text-center focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={() => {
                      const current = parseInt(autoOrderQuantity) || 0;
                      setAutoOrderQuantity((current + 1).toString());
                    }}
                    className="absolute right-3 z-10 w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 설명 */}
              <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <p className="text-xs text-blue-300">
                  {autoOrderType === 'buy' ? '매수' : '매도'} 자동주문: 가격이{' '}
                  <span className="font-bold">
                    {stock.type === 'domestic' ? '₩' : '$'}
                    {autoOrderPrice || '___'}
                  </span>{' '}
                  {autoOrderCondition === 'above' ? '이상' : '이하'}이 되면{' '}
                  <span className="font-bold">{autoOrderQuantity || '___'}주</span>를 자동으로{' '}
                  {autoOrderType === 'buy' ? '매수' : '매도'}합니다.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAutoOrderModal(false);
                  setAutoOrderPrice('');
                  setAutoOrderQuantity('1');
                }}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert(`자동주문이 설정��었습니다.\n조건: ${autoOrderCondition === 'above' ? '이상' : '이하'} ${autoOrderPrice}\n수량: ${autoOrderQuantity}주`);
                  setShowAutoOrderModal(false);
                }}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                설정 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 충전 페이지 */}
      {showChargePage && (
        <div className="fixed inset-0 bg-[#1a1d24] z-50 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6">
            <button
              onClick={() => setShowChargePage(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>뒤로가기</span>
            </button>

            <div className="bg-[#25282f] rounded-lg p-6">
              <h2 className="text-2xl text-white mb-6">잔액 충전</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">충전 금액</label>
                  <input
                    type="number"
                    placeholder="충전할 금액을 입력하세요"
                    className="w-full bg-[#1a1d24] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[100000, 500000, 1000000, 5000000, 10000000, 50000000].map(amount => (
                    <button
                      key={amount}
                      className="py-3 bg-[#1a1d24] hover:bg-[#2d3039] text-gray-300 rounded-lg transition-colors"
                    >
                      {amount >= 1000000 ? `${amount / 1000000}백만원` : `${amount / 1000}만원`}
                    </button>
                  ))}
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mt-6">
                  충전하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 포트폴리오 선택 모달 */}
      {showPortfolioModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#25282f] rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl text-white">내 포트폴리오</h3>
                <p className="text-sm text-gray-400 mt-1">보유 중인 주식을 선택하세요</p>
              </div>
              <button
                onClick={() => setShowCreateFolderModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                + 폴더 만들기
              </button>
            </div>

            {/* 폴더 탭 */}
            <div className="px-6 pt-4 border-b border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-3">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    selectedFolder === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#1a1d24] text-gray-400 hover:bg-[#2d3039]'
                  }`}
                >
                  전체
                </button>
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                      selectedFolder === folder.id
                        ? 'text-white'
                        : 'bg-[#1a1d24] text-gray-400 hover:bg-[#2d3039]'
                    }`}
                    style={{
                      backgroundColor: selectedFolder === folder.id ? folder.color : undefined
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedFolder === folder.id ? 'white' : folder.color }}
                    />
                    {folder.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {portfolio.filter(item => selectedFolder === null || item.folderId === selectedFolder).length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  {selectedFolder === null ? '보유 중인 주식이 없습니다' : '이 폴더에 주식이 없습니다'}
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolio
                    .filter(item => selectedFolder === null || item.folderId === selectedFolder)
                    .map((item) => {
                    const profitLoss = (item.currentPrice - item.avgPrice) * item.quantity;
                    const profitRate = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100;
                    const isProfit = profitLoss >= 0;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          // 선택한 주식의 정보로 주문 폼 업데이트
                          setOrderPrice(item.currentPrice.toString());
                          setOrderQuantity(item.quantity.toString());
                          setOrderType('sell'); // 보유 주식이므로 기본 매도 설정
                          setShowPortfolioModal(false);
                          alert(`${item.name} 선택됨\\n보유 수량: ${item.quantity}주\\n평균 매수가: ${item.type === 'domestic' ? '₩' : '$'}${formatNumber(item.avgPrice)}`);
                        }}
                        className="w-full bg-[#1a1d24] hover:bg-[#2d3039] rounded-lg p-4 transition-colors text-left"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white">{item.name}</h4>
                              <span className="text-xs text-gray-500">{item.code}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                              보유: {item.quantity}주
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">
                              {item.type === 'domestic' ? '₩' : '$'}
                              {formatNumber(item.currentPrice)}
                            </div>
                            {item.type === 'foreign' && (
                              <div className="text-xs text-gray-400">
                                ≈ ₩{formatNumber(Math.floor(item.currentPrice * usdToKrw))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-700">
                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-gray-500">평균 매수가</span>
                              <div className="text-gray-300 mt-0.5">
                                {item.type === 'domestic' ? '₩' : '$'}
                                {formatNumber(item.avgPrice)}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">평가금액</span>
                              <div className="text-gray-300 mt-0.5">
                                {item.type === 'domestic' ? '₩' : '$'}
                                {formatNumber(item.currentPrice * item.quantity)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={isProfit ? 'text-red-500' : 'text-blue-500'}>
                              {isProfit ? '+' : ''}
                              {item.type === 'domestic' ? '₩' : '$'}
                              {formatNumber(Math.abs(profitLoss))}
                            </div>
                            <div className={`mt-0.5 ${isProfit ? 'text-red-500' : 'text-blue-500'}`}>
                              {isProfit ? '+' : ''}
                              {profitRate.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700">
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 폴더 생성 모달 */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#25282f] rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl text-white mb-6">새 폴더 만들기</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">폴더 이름</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="예: 미국 기술주"
                  className="w-full bg-[#1a1d24] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">폴더 색상</label>
                <div className="grid grid-cols-6 gap-2">
                  {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedFolderColor(color)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        selectedFolderColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#25282f]' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateFolderModal(false);
                  setNewFolderName('');
                  setSelectedFolderColor('#3b82f6');
                }}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (newFolderName.trim()) {
                    setFolders([
                      ...folders,
                      {
                        id: `folder-${Date.now()}`,
                        name: newFolderName.trim(),
                        color: selectedFolderColor
                      }
                    ]);
                    setShowCreateFolderModal(false);
                    setNewFolderName('');
                    setSelectedFolderColor('#3b82f6');
                  } else {
                    alert('폴더 이름을 입력해주세요.');
                  }
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}