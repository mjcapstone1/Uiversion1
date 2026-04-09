import { Search, BookOpen, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onChallengeClick: () => void;
  onHomeClick?: () => void;
  onSimulatorClick?: () => void;
  onLearningClick?: () => void;
  onMenuTreeClick?: () => void;
  onStockSelect?: (stockName: string) => void;
  onLearningSelect?: (contentId: string) => void;
  onLandingClick?: () => void;
  currentPage?: 'home' | 'challenge' | 'simulator' | 'learning' | 'menutree';
}

const mockSearchData = {
  stocks: [
    { name: '삼성전자', code: '005930', type: 'domestic' },
    { name: 'SK하이닉스', code: '000660', type: 'domestic' },
    { name: 'NAVER', code: '035420', type: 'domestic' },
    { name: '카카오', code: '035720', type: 'domestic' },
    { name: 'LG에너지솔루션', code: '373220', type: 'domestic' },
  ],
  learning: [
    { id: '1', title: '복리의 마법 이해하기', category: '기초' },
    { id: '2', title: '재무제표 읽는 법', category: '중급' },
    { id: '3', title: 'ETF 투자 가이드', category: '기초' },
    { id: '4', title: '캔들스틱 차트 분석', category: '기술적 분석' },
  ]
};

export function Header({ 
  onChallengeClick, 
  onHomeClick, 
  onSimulatorClick, 
  onLearningClick, 
  onMenuTreeClick,
  onStockSelect,
  onLearningSelect,
  onLandingClick,
  currentPage = 'home'
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStocks = searchQuery 
    ? mockSearchData.stocks.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.code.includes(searchQuery)
      )
    : [];

  const filteredLearning = searchQuery
    ? mockSearchData.learning.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="border-b border-gray-200 bg-white px-8 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"></div>
          <span className="text-xl font-bold text-gray-900">FinVest</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="flex gap-8 text-sm font-medium">
            <button 
              onClick={onLandingClick} 
              className="pb-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              시작 페이지
            </button>
            <button 
              onClick={onHomeClick} 
              className={`pb-1 transition-colors ${
                currentPage === 'home' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              홈
            </button>
            <button 
              onClick={onSimulatorClick} 
              className={`pb-1 transition-colors ${
                currentPage === 'simulator' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              투자 시뮬레이터
            </button>
            <button 
              onClick={onLearningClick}
              className={`pb-1 transition-colors ${
                currentPage === 'learning' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI 학습
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative" ref={searchRef}>
              <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="종목명, 학습 콘텐츠 검색"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="w-48 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
                />
              </div>

              {showResults && searchQuery && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                  {filteredStocks.length > 0 && (
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">주식 종목</div>
                      {filteredStocks.map(stock => (
                        <button
                          key={stock.code}
                          onClick={() => {
                            onStockSelect?.(stock.name);
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                              {stock.name[0]}
                            </div>
                            <div className="text-left">
                              <div className="text-sm text-gray-900 font-medium">{stock.name}</div>
                              <div className="text-xs text-gray-500">{stock.code} · 국내</div>
                            </div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredLearning.length > 0 && (
                    <div className="p-2 border-t border-gray-100">
                      <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">AI 학습 콘텐츠</div>
                      {filteredLearning.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onLearningSelect?.(item.id);
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-gray-900 font-medium">{item.title}</div>
                            <div className="text-xs text-blue-600">{item.category}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredStocks.length === 0 && filteredLearning.length === 0 && (
                    <div className="p-6 text-center text-sm text-gray-500">
                      검색 결과가 없습니다.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}