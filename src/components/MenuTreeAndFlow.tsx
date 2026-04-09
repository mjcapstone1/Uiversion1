import { useState } from 'react';

type ViewMode = 'menutree' | 'flowchart';
type PageType = 'home' | 'simulator' | 'learning';

export function MenuTreeAndFlow() {
  const [viewMode, setViewMode] = useState<ViewMode>('menutree');
  const [selectedPage, setSelectedPage] = useState<PageType>('home');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">FinVest 사이트 구조 문서</h1>
          <p className="text-muted-foreground">메뉴트리 및 플로우차트 상세 문서</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 bg-card rounded-lg p-1 w-fit border border-border">
          <button
            onClick={() => setViewMode('menutree')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              viewMode === 'menutree'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            메뉴트리
          </button>
          <button
            onClick={() => setViewMode('flowchart')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              viewMode === 'flowchart'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            플로우차트
          </button>
        </div>

        {/* Page Selector */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSelectedPage('home')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              selectedPage === 'home'
                ? 'bg-blue-600 text-white'
                : 'bg-card border border-border text-foreground hover:bg-accent'
            }`}
          >
            홈
          </button>
          <button
            onClick={() => setSelectedPage('simulator')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              selectedPage === 'simulator'
                ? 'bg-green-600 text-white'
                : 'bg-card border border-border text-foreground hover:bg-accent'
            }`}
          >
            투자 시뮬레이터
          </button>
          <button
            onClick={() => setSelectedPage('learning')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              selectedPage === 'learning'
                ? 'bg-purple-600 text-white'
                : 'bg-card border border-border text-foreground hover:bg-accent'
            }`}
          >
            AI 학습
          </button>
        </div>

        {/* Content */}
        {viewMode === 'menutree' ? (
          <MenuTreeView page={selectedPage} />
        ) : (
          <FlowChartView page={selectedPage} />
        )}
      </div>
    </div>
  );
}

// ==================== 메뉴트리 뷰 ====================
function MenuTreeView({ page }: { page: PageType }) {
  if (page === 'home') return <HomeMenuTree />;
  if (page === 'simulator') return <SimulatorMenuTree />;
  return <LearningMenuTree />;
}

// 홈 메뉴트리
function HomeMenuTree() {
  return (
    <div className="bg-card border border-border rounded-xl p-12 overflow-x-auto">
      <h2 className="text-3xl font-bold text-foreground mb-12 text-center">홈 페이지 메뉴트리</h2>
      
      <div className="relative min-w-[1600px]">
        {/* Level 0: Root */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 text-white px-12 py-4 rounded-lg font-bold text-lg border-4 border-gray-700">
            홈 (Home)
          </div>
        </div>

        {/* Vertical line from root */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Horizontal connector */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[1400px] h-1 bg-gray-400">
            <div className="absolute left-[10%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[30%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[50%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[70%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[90%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Level 1: Main sections */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-blue-500 text-sm">
              헤더<br/>(Header)
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-blue-500 text-sm">
              시장 지수<br/>(Market Indices)
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-blue-500 text-sm">
              종목 리스트<br/>(Stock List)
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-blue-500 text-sm">
              차트 & 피드<br/>(Chart & Feed)
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-blue-500 text-sm">
              빠른 액세스<br/>(Quick Access)
            </div>
          </div>
        </div>

        {/* Vertical lines to Level 2 */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
        </div>

        {/* Level 2: Details */}
        <div className="grid grid-cols-5 gap-6">
          {/* 헤더 하위 */}
          <div className="space-y-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              로고 / 브랜딩
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              네비게이션 메뉴
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              검색 바
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              테마 토글
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              알림 아이콘
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              사용자 프로필
            </div>
          </div>

          {/* 시장 지수 하위 */}
          <div className="space-y-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              KOSPI 지수
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              KOSDAQ 지수
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              S&P 500
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              NASDAQ
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              달러/원 환율
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              실시간 업데이트 (2초)
            </div>
          </div>

          {/* 종목 리스트 하위 */}
          <div className="space-y-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              인기 종목 탭
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              개인 소유 탭
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              필터 (거래대금/거래량)
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              필터 (급상승/급하락)
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              종목 카드 리스트
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              실시간 미니 차트
            </div>
          </div>

          {/* 차트 & 피드 하위 */}
          <div className="space-y-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              차트 탭
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              커뮤니티 탭
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              실시간 차트 위젯
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              커뮤니티 피드
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              인기 토론
            </div>
          </div>

          {/* 빠른 액세스 하위 */}
          <div className="space-y-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              뉴스 버튼
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              토론 버튼
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              챌린지 버튼
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded text-sm font-semibold border-2 border-blue-300 dark:border-blue-700">
              마이페이지 버튼
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 투자 시뮬레이터 메뉴트리
function SimulatorMenuTree() {
  return (
    <div className="bg-card border border-border rounded-xl p-12 overflow-x-auto">
      <h2 className="text-3xl font-bold text-foreground mb-12 text-center">투자 시뮬레이터 메뉴트리</h2>
      
      <div className="relative min-w-[1800px]">
        {/* Level 0: Root */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 text-white px-12 py-4 rounded-lg font-bold text-lg border-4 border-gray-700">
            투자 시뮬레이터 (Investment Simulator)
          </div>
        </div>

        {/* Vertical line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Horizontal connector for 3 branches */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[1200px] h-1 bg-gray-400">
            <div className="absolute left-[16.67%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[50%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[83.33%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Level 1: Main sections */}
        <div className="grid grid-cols-3 gap-12 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-green-500 text-sm">
              좌측: 종목 선택
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-green-500 text-sm">
              우측: 관리 패널
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-green-500 text-sm">
              종목 상세 페이지
            </div>
          </div>
        </div>

        {/* Vertical lines */}
        <div className="grid grid-cols-3 gap-12 mb-8">
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
        </div>

        {/* Level 2: Details */}
        <div className="grid grid-cols-3 gap-12 mb-8">
          {/* 종목 선택 하위 */}
          <div className="space-y-3">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              필터 (국내/해외)
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              검색창 (실시간 필터링)
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              종목 리스트
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              종목 카드
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              관심 등록 (별 아이콘)
            </div>
          </div>

          {/* 관리 패널 하위 */}
          <div className="space-y-3">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              관심 종목 탭
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              거래 종목 탭
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              예약 종목 탭
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              포트폴리오 탭
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              폴더 생성/수정/삭제
            </div>
          </div>

          {/* 종목 상세 하위 */}
          <div className="space-y-3">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              종목 기본 정보
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              실시간 차트 (Recharts)
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              호가창 (매수/매도 10단계)
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              트레이딩 UI (v84)
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded text-sm font-semibold border-2 border-green-300 dark:border-green-700">
              주문 확인 모달
            </div>
          </div>
        </div>

        {/* Vertical line for trading UI details */}
        <div className="flex justify-end mr-[200px] mb-8">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Level 3: Trading UI Details */}
        <div className="flex justify-end mr-[50px]">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-700 rounded-lg p-6 w-[500px]">
            <div className="text-center font-bold text-yellow-800 dark:text-yellow-200 mb-4">⭐ 트레이딩 UI v84 상세</div>
            <div className="space-y-2">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                매수/매도 탭
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                주문 유형 (지정가/시장가/예약)
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                가격 입력 필드
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                수량 입력 필드
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                ⭐ 호가 퀵 주문 (10%/25%/50%/100%)
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                예상 체결 금액 표시
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                ⭐ 호가창 연동 자동 계산
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                주문 버튼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI 학습 메뉴트리
function LearningMenuTree() {
  return (
    <div className="bg-card border border-border rounded-xl p-12 overflow-x-auto">
      <h2 className="text-3xl font-bold text-foreground mb-12 text-center">AI 학습 페이지 메뉴트리</h2>
      
      <div className="relative min-w-[1600px]">
        {/* Level 0: Root */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 text-white px-12 py-4 rounded-lg font-bold text-lg border-4 border-gray-700">
            AI 학습 (AI Learning)
          </div>
        </div>

        {/* Vertical line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-12 bg-gray-400"></div>
        </div>

        {/* Horizontal connector */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[1200px] h-1 bg-gray-400">
            <div className="absolute left-[16.67%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[50%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
            <div className="absolute left-[83.33%] top-0 w-1 h-8 bg-gray-400 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Level 1: Main sections */}
        <div className="grid grid-cols-3 gap-12 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-purple-500 text-sm">
              코스 생성 영역
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-purple-500 text-sm">
              내 학습 코스
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-center w-full border-4 border-purple-500 text-sm">
              코스 상세
            </div>
          </div>
        </div>

        {/* Vertical lines */}
        <div className="grid grid-cols-3 gap-12 mb-8">
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
          <div className="flex justify-center"><div className="w-1 h-12 bg-gray-400"></div></div>
        </div>

        {/* Level 2: Details */}
        <div className="grid grid-cols-3 gap-12">
          {/* 코스 생성 하위 */}
          <div className="space-y-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              학습 목표 입력 (Textarea)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              난이도 선택 버튼
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              생성하기 버튼
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              AI 생성 로직 (2초)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              코스명 템플릿 (12종)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              챕터 풀 (난이도별 60개)
            </div>
          </div>

          {/* 내 학습 코스 하위 */}
          <div className="space-y-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              코스 카드 리스트
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              코스명 (AI 생성)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              레벨 뱃지 (초급/중급/고급)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              학습 목표 표시
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              삭제 버튼
            </div>
          </div>

          {/* 코스 상세 하위 */}
          <div className="space-y-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              챕터 리스트 (5개)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              체크박스 (완료 토글)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              챕터명 (취소선)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              진행률 바 (Progress)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded text-sm font-semibold border-2 border-purple-300 dark:border-purple-700">
              진행률 퍼센트 표시
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 플로우차트 뷰 ====================
function FlowChartView({ page }: { page: PageType }) {
  return (
    <div className="space-y-8">
      {/* 플로우차트 기호 설명 */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">플로우차트 기호 설명</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-28 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">Start/End</div>
            <span className="text-muted-foreground">타원: 프로세스의 시작과 끝</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-28 h-12 bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-700 text-xs font-bold">Process</div>
            <span className="text-muted-foreground">사각형: 처리/작업 단계</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-16 flex items-center justify-center">
              <div className="absolute w-20 h-20 bg-blue-400/20 border-2 border-blue-400 transform rotate-45"></div>
              <span className="relative text-blue-600 text-xs font-bold z-10">Decision</span>
            </div>
            <span className="text-muted-foreground">마름모: 조건 분기</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-28 h-12 bg-blue-300/20 border-2 border-blue-300 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">Input/Output</div>
            <span className="text-muted-foreground">둥근 사각형: 입력/출력</span>
          </div>
        </div>
      </div>

      {/* 해당 페이지의 플로우차트 */}
      {page === 'home' && <HomeFlowChart />}
      {page === 'simulator' && <SimulatorFlowChart />}
      {page === 'learning' && <LearningFlowChart />}
    </div>
  );
}

// 홈 플로우차트 - 선으로 연결된 하나의 긴 흐름
function HomeFlowChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 overflow-x-auto">
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">홈 페이지 플로우차트</h3>
      
      <div className="relative min-w-[2800px] min-h-[3000px]">
        {/* 시작 */}
        <div className="absolute" style={{left: '1350px', top: '0px'}}>
          <Oval text="시작 > 홈 페이지 접속" />
        </div>
        
        {/* 수직선 */}
        <VLine x={1420} y={60} height={30} />
        
        {/* 프로세스 1 */}
        <div className="absolute" style={{left: '1200px', top: '90px'}}>
          <Rect text="페이지 초기화<br/>(헤더/시장지수/종목/차트 렌더링)" />
        </div>
        
        {/* 수직선 */}
        <VLine x={1420} y={140} height={30} />
        
        {/* 프로세스 2 */}
        <div className="absolute" style={{left: '1250px', top: '170px'}}>
          <Rect text="실시간 데이터 업데이트 시작<br/>(2초 주기)" />
        </div>
        
        {/* 수직선 */}
        <VLine x={1420} y={220} height={30} />
        
        {/* 분기점 1 */}
        <div className="absolute" style={{left: '1330px', top: '250px'}}>
          <Diamond text="사용자<br/>액션 선택" />
        </div>
        
        {/* 분기선 - 4갈래 */}
        <HLine x1={500} x2={2300} y={340} />
        <VLine x={700} y={340} height={30} />
        <VLine x={1100} y={340} height={30} />
        <VLine x={1700} y={340} height={30} />
        <VLine x={2100} y={340} height={30} />
        
        {/* 경로 1: 검색 */}
        <div className="absolute" style={{left: '620px', top: '370px'}}>
          <LabelText text="1. 검색" />
        </div>
        <div className="absolute" style={{left: '620px', top: '400px'}}>
          <Input text="검색 바 클릭" />
        </div>
        <VLine x={700} y={450} height={30} />
        <div className="absolute" style={{left: '600px', top: '480px'}}>
          <Input text="종목명/코드 입력" />
        </div>
        <VLine x={700} y={530} height={30} />
        <div className="absolute" style={{left: '600px', top: '560px'}}>
          <Rect text="실시간 자동완성 표시" />
        </div>
        <VLine x={700} y={610} height={30} />
        <div className="absolute" style={{left: '620px', top: '640px'}}>
          <Input text="종목 선택 클릭" />
        </div>
        <VLine x={700} y={690} height={30} />
        <div className="absolute" style={{left: '600px', top: '720px'}}>
          <Rect text="시뮬레이터 페이지 이동" />
        </div>
        <VLine x={700} y={770} height={100} />
        
        {/* 경로 2: 종목 탐색 */}
        <div className="absolute" style={{left: '990px', top: '370px'}}>
          <LabelText text="2. 종목 탐색" />
        </div>
        <div className="absolute" style={{left: '950px', top: '400px'}}>
          <Input text="탭 선택 (인기/개인소유)" />
        </div>
        <VLine x={1100} y={450} height={30} />
        <div className="absolute" style={{left: '1010px', top: '480px'}}>
          <Diamond text="필터<br/>적용?" />
        </div>
        
        {/* 필터 Yes/No */}
        <HLine x1={900} x2={1300} y={570} />
        <VLine x={950} y={570} height={20} />
        <VLine x={1250} y={570} height={20} />
        
        <div className="absolute" style={{left: '880px', top: '590px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '870px', top: '610px'}}>
          <Input text="필터 버튼 클릭" />
        </div>
        <VLine x={950} y={660} height={20} />
        <div className="absolute" style={{left: '860px', top: '680px'}}>
          <Rect text="필터링된 종목 표시" />
        </div>
        <VLine x={950} y={730} height={20} />
        
        <div className="absolute" style={{left: '1180px', top: '590px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1180px', top: '610px'}}>
          <Rect text="전체 종목 표시" />
        </div>
        <VLine x={1250} y={660} height={90} />
        
        {/* 합류 */}
        <HLine x1={950} x2={1250} y={750} />
        <VLine x={1100} y={750} height={20} />
        <div className="absolute" style={{left: '1020px', top: '770px'}}>
          <Input text="종목 카드 클릭" />
        </div>
        <VLine x={1100} y={820} height={50} />
        
        {/* 경로 3: 차트/커뮤니티 */}
        <div className="absolute" style={{left: '1580px', top: '370px'}}>
          <LabelText text="3. 차트/커뮤니티" />
        </div>
        <div className="absolute" style={{left: '1610px', top: '400px'}}>
          <Diamond text="차트 /<br/>커뮤니티?" />
        </div>
        
        {/* 차트/커뮤니티 분기 */}
        <HLine x1={1500} x2={1900} y={490} />
        <VLine x={1550} y={490} height={20} />
        <VLine x={1850} y={490} height={20} />
        
        <div className="absolute" style={{left: '1490px', top: '510px'}}>
          <LabelText text="차트" />
        </div>
        <div className="absolute" style={{left: '1480px', top: '530px'}}>
          <Input text="차트 탭 클릭" />
        </div>
        <VLine x={1550} y={580} height={20} />
        <div className="absolute" style={{left: '1480px', top: '600px'}}>
          <Rect text="차트 위젯 표시" />
        </div>
        <VLine x={1550} y={650} height={20} />
        <div className="absolute" style={{left: '1450px', top: '670px'}}>
          <Input text="시간 범위 선택" />
        </div>
        <VLine x={1550} y={720} height={30} />
        
        <div className="absolute" style={{left: '1770px', top: '510px'}}>
          <LabelText text="커뮤니티" />
        </div>
        <div className="absolute" style={{left: '1750px', top: '530px'}}>
          <Input text="커뮤니티 탭 클릭" />
        </div>
        <VLine x={1850} y={580} height={20} />
        <div className="absolute" style={{left: '1760px', top: '600px'}}>
          <Rect text="토론 목록 표시" />
        </div>
        <VLine x={1850} y={650} height={20} />
        <div className="absolute" style={{left: '1770px', top: '670px'}}>
          <Input text="토론 항목 클릭" />
        </div>
        <VLine x={1850} y={720} height={30} />
        
        {/* 합류 */}
        <HLine x1={1550} x2={1850} y={750} />
        <VLine x={1700} y={750} height={120} />
        
        {/* 경로 4: 뉴스/토론 */}
        <div className="absolute" style={{left: '2000px', top: '370px'}}>
          <LabelText text="4. 뉴스/토론" />
        </div>
        <div className="absolute" style={{left: '2010px', top: '400px'}}>
          <Diamond text="뉴스 /<br/>토론?" />
        </div>
        
        {/* 뉴스/토론 분기 */}
        <HLine x1={1900} x2={2300} y={490} />
        <VLine x={1950} y={490} height={20} />
        <VLine x={2250} y={490} height={20} />
        
        <div className="absolute" style={{left: '1900px', top: '510px'}}>
          <LabelText text="뉴스" />
        </div>
        <div className="absolute" style={{left: '1880px', top: '530px'}}>
          <Input text="뉴스 탭 클릭" />
        </div>
        <VLine x={1950} y={580} height={20} />
        <div className="absolute" style={{left: '1870px', top: '600px'}}>
          <Input text="검색/필터 선택" />
        </div>
        <VLine x={1950} y={650} height={20} />
        <div className="absolute" style={{left: '1880px', top: '670px'}}>
          <Rect text="뉴스 선택/표시" />
        </div>
        <VLine x={1950} y={720} height={30} />
        
        <div className="absolute" style={{left: '2200px', top: '510px'}}>
          <LabelText text="토론" />
        </div>
        <div className="absolute" style={{left: '2180px', top: '530px'}}>
          <Input text="토론 탭 클릭" />
        </div>
        <VLine x={2250} y={580} height={20} />
        <div className="absolute" style={{left: '2160px', top: '600px'}}>
          <Diamond text="생성 /<br/>참여?" />
        </div>
        
        {/* 생성/참여 분기 */}
        <HLine x1={2150} x2={2350} y={690} />
        <VLine x={2200} y={690} height={20} />
        <VLine x={2300} y={690} height={20} />
        
        <div className="absolute" style={{left: '2160px', top: '710px'}}>
          <LabelText text="생성" />
        </div>
        <div className="absolute" style={{left: '2140px', top: '730px'}}>
          <Input text="주제 작성/생성" />
        </div>
        <VLine x={2200} y={780} height={20} />
        
        <div className="absolute" style={{left: '2260px', top: '710px'}}>
          <LabelText text="참여" />
        </div>
        <div className="absolute" style={{left: '2240px', top: '730px'}}>
          <Input text="토론 선택/댓글" />
        </div>
        <VLine x={2300} y={780} height={20} />
        
        {/* 토론 합류 */}
        <HLine x1={2200} x2={2300} y={800} />
        <VLine x={2250} y={800} height={70} />
        
        {/* 뉴스/토론 합류 */}
        <HLine x1={1950} x2={2250} y={750} />
        <VLine x={2100} y={750} height={120} />
        
        {/* 모든 경로 최종 합류 */}
        <HLine x1={700} x2={2100} y={870} />
        <VLine x={1420} y={870} height={30} />
        
        <div className="absolute" style={{left: '1320px', top: '900px'}}>
          <Rect text="액션 처리 완료" />
        </div>
        
        <VLine x={1420} y={950} height={30} />
        
        {/* 최종 분기 */}
        <div className="absolute" style={{left: '1340px', top: '980px'}}>
          <Diamond text="계속<br/>탐색?" />
        </div>
        
        {/* Yes/No 분기 */}
        <HLine x1={1120} x2={1720} y={1070} />
        <VLine x={1220} y={1070} height={20} />
        <VLine x={1620} y={1070} height={20} />
        
        <div className="absolute" style={{left: '1180px', top: '1090px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '1120px', top: '1110px'}}>
          <Rect text="다른 기능 선택" />
        </div>
        <VLine x={1220} y={1160} height={40} />
        <div className="absolute" style={{left: '1100px', top: '1200px'}}>
          <div className="text-xs text-muted-foreground">(위로 복귀 - 루프)</div>
        </div>
        {/* 루프 백 라인 */}
        <VLine x={1220} y={1160} height={100} />
        <HLine x1={400} x2={1220} y={1260} />
        <VLine x={400} y={340} height={920} />
        <HLine x1={400} x2={500} y={340} />
        
        <div className="absolute" style={{left: '1580px', top: '1090px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1560px', top: '1110px'}}>
          <Oval text="종료" />
        </div>
      </div>
    </div>
  );
}

// 투자 시뮬레이터 플로우차트 - 선으로 연결된 하나의 긴 흐름
function SimulatorFlowChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 overflow-x-auto">
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">투자 시뮬레이터 플로우차트</h3>
      
      <div className="relative min-w-[3000px] min-h-[2800px]">
        {/* 시작 */}
        <div className="absolute" style={{left: '1350px', top: '0px'}}>
          <Oval text="시작 > 시뮬레이터 페이지" />
        </div>
        
        <VLine x={1420} y={60} height={30} />
        
        <div className="absolute" style={{left: '1200px', top: '90px'}}>
          <Rect text="좌측 종목 리스트 / 우측 관리 패널 렌더링" />
        </div>
        
        <VLine x={1420} y={140} height={30} />
        
        {/* 첫 번째 분기 */}
        <div className="absolute" style={{left: '1310px', top: '170px'}}>
          <Diamond text="종목 선택<br/>방법" />
        </div>
        
        {/* 3갈래 분기 */}
        <HLine x1={700} x2={2100} y={260} />
        <VLine x={900} y={260} height={30} />
        <VLine x={1420} y={260} height={30} />
        <VLine x={1920} y={260} height={30} />
        
        {/* 경로 1: 검색 */}
        <div className="absolute" style={{left: '830px', top: '290px'}}>
          <LabelText text="1. 검색" />
        </div>
        <div className="absolute" style={{left: '820px', top: '320px'}}>
          <Input text="검색창 클릭" />
        </div>
        <VLine x={900} y={370} height={30} />
        <div className="absolute" style={{left: '800px', top: '400px'}}>
          <Input text="종목명 입력" />
        </div>
        <VLine x={900} y={450} height={30} />
        <div className="absolute" style={{left: '780px', top: '480px'}}>
          <Rect text="실시간 필터링" />
        </div>
        <VLine x={900} y={530} height={30} />
        <div className="absolute" style={{left: '780px', top: '560px'}}>
          <Input text="종목 카드 클릭" />
        </div>
        <VLine x={900} y={610} height={90} />
        
        {/* 경로 2: 필터 */}
        <div className="absolute" style={{left: '1350px', top: '290px'}}>
          <LabelText text="2. 필터" />
        </div>
        <div className="absolute" style={{left: '1300px', top: '320px'}}>
          <Input text="국내/해외 필터 클릭" />
        </div>
        <VLine x={1420} y={370} height={30} />
        <div className="absolute" style={{left: '1280px', top: '400px'}}>
          <Rect text="market state 업데이트" />
        </div>
        <VLine x={1420} y={450} height={30} />
        <div className="absolute" style={{left: '1280px', top: '480px'}}>
          <Rect text="해당 시장 종목 표시" />
        </div>
        <VLine x={1420} y={530} height={30} />
        <div className="absolute" style={{left: '1300px', top: '560px'}}>
          <Input text="종목 카드 클릭" />
        </div>
        <VLine x={1420} y={610} height={90} />
        
        {/* 경로 3: 관심 종목 */}
        <div className="absolute" style={{left: '1830px', top: '290px'}}>
          <LabelText text="3. 관심 종목" />
        </div>
        <div className="absolute" style={{left: '1810px', top: '320px'}}>
          <Input text="별 아이콘 클릭" />
        </div>
        <VLine x={1920} y={370} height={30} />
        
        <div className="absolute" style={{left: '1830px', top: '400px'}}>
          <Diamond text="추가 /<br/>제거?" />
        </div>
        
        {/* 추가/제거 분기 */}
        <HLine x1={1720} x2={2120} y={490} />
        <VLine x={1800} y={490} height={20} />
        <VLine x={2040} y={490} height={20} />
        
        <div className="absolute" style={{left: '1760px', top: '510px'}}>
          <LabelText text="추가" />
        </div>
        <div className="absolute" style={{left: '1720px', top: '530px'}}>
          <Rect text="배열에 추가 / 별 노랑" />
        </div>
        <VLine x={1800} y={580} height={40} />
        
        <div className="absolute" style={{left: '2000px', top: '510px'}}>
          <LabelText text="제거" />
        </div>
        <div className="absolute" style={{left: '1950px', top: '530px'}}>
          <Rect text="배열에서 삭제 / 별 회색" />
        </div>
        <VLine x={2040} y={580} height={40} />
        
        {/* 관심 종목 합류 */}
        <HLine x1={1800} x2={2040} y={620} />
        <VLine x={1920} y={620} height={80} />
        
        {/* 모든 경로 합류 */}
        <HLine x1={900} x2={1920} y={700} />
        <VLine x={1420} y={700} height={30} />
        
        <div className="absolute" style={{left: '1250px', top: '730px'}}>
          <Rect text="종목 상세 페이지 전환" />
        </div>
        
        <VLine x={1420} y={780} height={30} />
        
        <div className="absolute" style={{left: '1150px', top: '810px'}}>
          <Rect text="종목 정보 / 차트 / 호가창 / 트레이딩 UI 표시" />
        </div>
        
        <VLine x={1420} y={860} height={30} />
        
        <div className="absolute" style={{left: '1250px', top: '890px'}}>
          <Rect text="3초마다 실시간 업데이트" />
        </div>
        
        <VLine x={1420} y={940} height={30} />
        
        {/* 매수/매도 분기 */}
        <div className="absolute" style={{left: '1330px', top: '970px'}}>
          <Diamond text="매수 /<br/>매도?" />
        </div>
        
        <HLine x1={900} x2={1940} y={1060} />
        <VLine x={1100} y={1060} height={30} />
        <VLine x={1740} y={1060} height={30} />
        
        {/* 매수 플로우 */}
        <div className="absolute" style={{left: '1050px', top: '1090px'}}>
          <LabelText text="매수" />
        </div>
        <div className="absolute" style={{left: '1020px', top: '1110px'}}>
          <Input text="매수 탭 클릭" />
        </div>
        <VLine x={1100} y={1160} height={20} />
        <div className="absolute" style={{left: '970px', top: '1180px'}}>
          <Rect text="UI 빨간색 변경" />
        </div>
        <VLine x={1100} y={1230} height={30} />
        
        <div className="absolute" style={{left: '1010px', top: '1260px'}}>
          <Diamond text="주문 유형" />
        </div>
        
        {/* 주문 유형 3갈래 */}
        <HLine x1={700} x2={1500} y={1350} />
        <VLine x={800} y={1350} height={20} />
        <VLine x={1100} y={1350} height={20} />
        <VLine x={1400} y={1350} height={20} />
        
        <div className="absolute" style={{left: '740px', top: '1370px'}}>
          <LabelText text="지정가" />
        </div>
        <div className="absolute" style={{left: '730px', top: '1390px'}}>
          <Input text="가격 입력" />
        </div>
        <VLine x={800} y={1440} height={50} />
        
        <div className="absolute" style={{left: '1030px', top: '1370px'}}>
          <LabelText text="시장가" />
        </div>
        <div className="absolute" style={{left: '980px', top: '1390px'}}>
          <Rect text="시장가 자동 적용" />
        </div>
        <VLine x={1100} y={1440} height={50} />
        
        <div className="absolute" style={{left: '1340px', top: '1370px'}}>
          <LabelText text="예약" />
        </div>
        <div className="absolute" style={{left: '1320px', top: '1390px'}}>
          <Input text="목표가 입력" />
        </div>
        <VLine x={1400} y={1440} height={50} />
        
        {/* 주문 유형 합류 */}
        <HLine x1={800} x2={1400} y={1490} />
        <VLine x={1100} y={1490} height={30} />
        
        <div className="absolute" style={{left: '1030px', top: '1520px'}}>
          <Input text="수량 입력" />
        </div>
        <VLine x={1100} y={1570} height={20} />
        
        <div className="absolute" style={{left: '980px', top: '1590px'}}>
          <Rect text="예상 금액 계산/표시" />
        </div>
        <VLine x={1100} y={1640} height={20} />
        
        {/* 매도 플로우 */}
        <div className="absolute" style={{left: '1690px', top: '1090px'}}>
          <LabelText text="매도" />
        </div>
        <div className="absolute" style={{left: '1660px', top: '1110px'}}>
          <Input text="매도 탭 클릭" />
        </div>
        <VLine x={1740} y={1160} height={20} />
        <div className="absolute" style={{left: '1610px', top: '1180px'}}>
          <Rect text="UI 파란색 변경" />
        </div>
        <VLine x={1740} y={1230} height={30} />
        <div className="absolute" style={{left: '1600px', top: '1260px'}}>
          <Input text="주문 유형 선택" />
        </div>
        <VLine x={1740} y={1310} height={30} />
        <div className="absolute" style={{left: '1600px', top: '1340px'}}>
          <Input text="가격/수량 입력" />
        </div>
        <VLine x={1740} y={1390} height={30} />
        <div className="absolute" style={{left: '1620px', top: '1420px'}}>
          <Rect text="보유 수량 확인" />
        </div>
        <VLine x={1740} y={1470} height={30} />
        
        <div className="absolute" style={{left: '1650px', top: '1500px'}}>
          <Diamond text="수량<br/>충분?" />
        </div>
        
        {/* 수량 검증 */}
        <HLine x1={1540} x2={1940} y={1590} />
        <VLine x={1600} y={1590} height={20} />
        <VLine x={1880} y={1590} height={20} />
        
        <div className="absolute" style={{left: '1570px', top: '1610px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '1520px', top: '1630px'}}>
          <Rect text="예상 금액 계산" />
        </div>
        <VLine x={1600} y={1680} height={30} />
        
        <div className="absolute" style={{left: '1850px', top: '1610px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1810px', top: '1630px'}}>
          <Rect text="오류 메시지 표시" />
        </div>
        <VLine x={1880} y={1680} height={20} />
        <div className="absolute" style={{left: '1820px', top: '1700px'}}>
          <div className="text-xs text-muted-foreground">(재입력 - 위로)</div>
        </div>
        
        {/* 매도 합류 */}
        <HLine x1={1600} x2={1740} y={1710} />
        <VLine x={1740} y={1660} height={50} />
        
        {/* 매수/매도 합류 */}
        <HLine x1={1100} x2={1740} y={1660} />
        <VLine x={1420} y={1660} height={30} />
        
        <div className="absolute" style={{left: '1300px', top: '1690px'}}>
          <Input text="주문 버튼 클릭" />
        </div>
        
        <VLine x={1420} y={1740} height={30} />
        
        {/* 입력값 검증 */}
        <div className="absolute" style={{left: '1330px', top: '1770px'}}>
          <Diamond text="입력값<br/>유효?" />
        </div>
        
        <HLine x1={1000} x2={1840} y={1860} />
        <VLine x={1200} y={1860} height={30} />
        <VLine x={1640} y={1860} height={30} />
        
        {/* Yes - 주문 처리 */}
        <div className="absolute" style={{left: '1160px', top: '1890px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '1100px', top: '1910px'}}>
          <Rect text="주문 확인 모달 표시" />
        </div>
        <VLine x={1200} y={1960} height={20} />
        <div className="absolute" style={{left: '1130px', top: '1980px'}}>
          <Input text="확인 버튼 클릭" />
        </div>
        <VLine x={1200} y={2030} height={20} />
        <div className="absolute" style={{left: '1140px', top: '2050px'}}>
          <Rect text="거래 실행" />
        </div>
        <VLine x={1200} y={2100} height={20} />
        <div className="absolute" style={{left: '1090px', top: '2120px'}}>
          <Rect text="포트폴리오 업데이트" />
        </div>
        <VLine x={1200} y={2170} height={20} />
        <div className="absolute" style={{left: '1120px', top: '2190px'}}>
          <Rect text="입력값 초기화" />
        </div>
        <VLine x={1200} y={2240} height={50} />
        
        {/* No - 에러 */}
        <div className="absolute" style={{left: '1600px', top: '1890px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1540px', top: '1910px'}}>
          <Rect text="에러 메시지 표시" />
        </div>
        <VLine x={1640} y={1960} height={20} />
        <div className="absolute" style={{left: '1580px', top: '1980px'}}>
          <div className="text-xs text-muted-foreground">(재입력 - 위로)</div>
        </div>
        
        {/* 합류 */}
        <HLine x1={1200} x2={1640} y={2290} />
        <VLine x={1420} y={2290} height={30} />
        
        {/* 계속 거래? */}
        <div className="absolute" style={{left: '1330px', top: '2320px'}}>
          <Diamond text="계속<br/>거래?" />
        </div>
        
        <HLine x1={1120} x2={1720} y={2410} />
        <VLine x={1220} y={2410} height={20} />
        <VLine x={1620} y={2410} height={20} />
        
        <div className="absolute" style={{left: '1180px', top: '2430px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '1100px', top: '2450px'}}>
          <Rect text="다른 종목/거래 선택" />
        </div>
        <VLine x={1220} y={2500} height={50} />
        <div className="absolute" style={{left: '1120px', top: '2550px'}}>
          <div className="text-xs text-muted-foreground">(위로 복귀 - 루프)</div>
        </div>
        {/* 루프 백 */}
        <HLine x1={400} x2={1220} y={2550} />
        <VLine x={400} y={260} height={2290} />
        <HLine x1={400} x2={700} y={260} />
        
        <div className="absolute" style={{left: '1580px', top: '2430px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1560px', top: '2450px'}}>
          <Oval text="종료" />
        </div>
      </div>
    </div>
  );
}

// AI 학습 플로우차트 - 선으로 연결된 하나의 긴 흐름
function LearningFlowChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 overflow-x-auto">
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">AI 학습 페이지 플로우차트</h3>
      
      <div className="relative min-w-[2400px] min-h-[2200px]">
        {/* 시작 */}
        <div className="absolute" style={{left: '1050px', top: '0px'}}>
          <Oval text="시작 > AI 학습 페이지" />
        </div>
        
        <VLine x={1120} y={60} height={30} />
        
        <div className="absolute" style={{left: '900px', top: '90px'}}>
          <Rect text="코스 생성 폼 / 기존 코스 리스트 표시" />
        </div>
        
        <VLine x={1120} y={140} height={30} />
        
        {/* 첫 번째 분기 */}
        <div className="absolute" style={{left: '980px', top: '170px'}}>
          <Diamond text="새 코스 생성 /<br/>기존 코스 학습 /<br/>코스 삭제?" />
        </div>
        
        {/* 3갈래 분기 */}
        <HLine x1={400} x2={2000} y={280} />
        <VLine x={650} y={280} height={30} />
        <VLine x={1120} y={280} height={30} />
        <VLine x={1750} y={280} height={30} />
        
        {/* 경로 1: 코스 생성 */}
        <div className="absolute" style={{left: '560px', top: '310px'}}>
          <LabelText text="1. 새 코스 생성" />
        </div>
        <div className="absolute" style={{left: '540px', top: '340px'}}>
          <Input text="학습 목표 입력" />
        </div>
        <VLine x={650} y={390} height={30} />
        
        <div className="absolute" style={{left: '530px', top: '420px'}}>
          <Rect text="goal state 업데이트" />
        </div>
        <VLine x={650} y={470} height={30} />
        
        <div className="absolute" style={{left: '560px', top: '500px'}}>
          <Diamond text="난이도<br/>선택" />
        </div>
        
        {/* 난이도 3갈래 */}
        <HLine x1={350} x2={950} y={590} />
        <VLine x={450} y={590} height={20} />
        <VLine x={650} y={590} height={20} />
        <VLine x={850} y={590} height={20} />
        
        <div className="absolute" style={{left: '420px', top: '610px'}}>
          <LabelText text="초급" />
        </div>
        <div className="absolute" style={{left: '380px', top: '630px'}}>
          <Rect text="level = beginner" />
        </div>
        <VLine x={450} y={680} height={30} />
        
        <div className="absolute" style={{left: '620px', top: '610px'}}>
          <LabelText text="중급" />
        </div>
        <div className="absolute" style={{left: '590px', top: '630px'}}>
          <Rect text="level = inter" />
        </div>
        <VLine x={650} y={680} height={30} />
        
        <div className="absolute" style={{left: '820px', top: '610px'}}>
          <LabelText text="고급" />
        </div>
        <div className="absolute" style={{left: '770px', top: '630px'}}>
          <Rect text="level = advanced" />
        </div>
        <VLine x={850} y={680} height={30} />
        
        {/* 난이도 합류 */}
        <HLine x1={450} x2={850} y={710} />
        <VLine x={650} y={710} height={30} />
        
        <div className="absolute" style={{left: '540px', top: '740px'}}>
          <Input text="생성하기 클릭" />
        </div>
        <VLine x={650} y={790} height={20} />
        
        <div className="absolute" style={{left: '520px', top: '810px'}}>
          <Rect text="isGenerating = true" />
        </div>
        <VLine x={650} y={860} height={20} />
        
        <div className="absolute" style={{left: '560px', top: '880px'}}>
          <Rect text="2초 대기" />
        </div>
        <VLine x={650} y={930} height={20} />
        
        <div className="absolute" style={{left: '510px', top: '950px'}}>
          <Rect text="코스명 랜덤 선택 (12종)" />
        </div>
        <VLine x={650} y={1000} height={20} />
        
        <div className="absolute" style={{left: '480px', top: '1020px'}}>
          <Rect text="챕터 5개 랜덤 (60개 풀)" />
        </div>
        <VLine x={650} y={1070} height={20} />
        
        <div className="absolute" style={{left: '520px', top: '1090px'}}>
          <Rect text="courses 배열에 추가" />
        </div>
        <VLine x={650} y={1140} height={20} />
        
        <div className="absolute" style={{left: '540px', top: '1160px'}}>
          <Rect text="코스 카드 표시" />
        </div>
        <VLine x={650} y={1210} height={150} />
        
        {/* 경로 2: 기존 코스 학습 */}
        <div className="absolute" style={{left: '1020px', top: '310px'}}>
          <LabelText text="2. 기존 코스 학습" />
        </div>
        <div className="absolute" style={{left: '1000px', top: '340px'}}>
          <Input text="코스 카드 선택" />
        </div>
        <VLine x={1120} y={390} height={30} />
        
        <div className="absolute" style={{left: '940px', top: '420px'}}>
          <Rect text="코스 정보 / 챕터 리스트 표시" />
        </div>
        <VLine x={1120} y={470} height={30} />
        
        <div className="absolute" style={{left: '980px', top: '500px'}}>
          <Input text="챕터 체크박스 클릭" />
        </div>
        <VLine x={1120} y={550} height={30} />
        
        <div className="absolute" style={{left: '1030px', top: '580px'}}>
          <Diamond text="체크 /<br/>해제?" />
        </div>
        
        {/* 체크/해제 분기 */}
        <HLine x1={920} x2={1320} y={670} />
        <VLine x={1000} y={670} height={20} />
        <VLine x={1240} y={670} height={20} />
        
        <div className="absolute" style={{left: '960px', top: '690px'}}>
          <LabelText text="체크" />
        </div>
        <div className="absolute" style={{left: '920px', top: '710px'}}>
          <Rect text="completed = true" />
        </div>
        <VLine x={1000} y={760} height={20} />
        <div className="absolute" style={{left: '940px', top: '780px'}}>
          <Rect text="체크 표시 / 취소선" />
        </div>
        <VLine x={1000} y={830} height={30} />
        
        <div className="absolute" style={{left: '1200px', top: '690px'}}>
          <LabelText text="해제" />
        </div>
        <div className="absolute" style={{left: '1160px', top: '710px'}}>
          <Rect text="completed = false" />
        </div>
        <VLine x={1240} y={760} height={20} />
        <div className="absolute" style={{left: '1170px', top: '780px'}}>
          <Rect text="체크/취소선 제거" />
        </div>
        <VLine x={1240} y={830} height={30} />
        
        {/* 합류 */}
        <HLine x1={1000} x2={1240} y={860} />
        <VLine x={1120} y={860} height={30} />
        
        <div className="absolute" style={{left: '990px', top: '890px'}}>
          <Rect text="진행률 자동 계산" />
        </div>
        <VLine x={1120} y={940} height={30} />
        
        <div className="absolute" style={{left: '960px', top: '970px'}}>
          <Rect text="Progress Bar 업데이트" />
        </div>
        <VLine x={1120} y={1020} height={30} />
        
        <div className="absolute" style={{left: '1030px', top: '1050px'}}>
          <Diamond text="100%<br/>완료?" />
        </div>
        
        {/* 완료 여부 */}
        <HLine x1={920} x2={1320} y={1140} />
        <VLine x={1000} y={1140} height={20} />
        <VLine x={1240} y={1140} height={20} />
        
        <div className="absolute" style={{left: '970px', top: '1160px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '920px', top: '1180px'}}>
          <Rect text="완료 뱃지 강조" />
        </div>
        <VLine x={1000} y={1230} height={50} />
        
        <div className="absolute" style={{left: '1200px', top: '1160px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1160px', top: '1180px'}}>
          <Rect text="남은 챕터 표시" />
        </div>
        <VLine x={1240} y={1230} height={50} />
        
        {/* 완료 합류 */}
        <HLine x1={1000} x2={1240} y={1280} />
        <VLine x={1120} y={1280} height={80} />
        
        {/* 경로 3: 코스 삭제 */}
        <div className="absolute" style={{left: '1670px', top: '310px'}}>
          <LabelText text="3. 코스 삭제" />
        </div>
        <div className="absolute" style={{left: '1650px', top: '340px'}}>
          <Input text="삭제 버튼 클릭" />
        </div>
        <VLine x={1750} y={390} height={30} />
        
        <div className="absolute" style={{left: '1660px', top: '420px'}}>
          <Diamond text="삭제<br/>확인?" />
        </div>
        
        {/* 삭제 확인 */}
        <HLine x1={1550} x2={1950} y={510} />
        <VLine x={1630} y={510} height={20} />
        <VLine x={1870} y={510} height={20} />
        
        <div className="absolute" style={{left: '1600px', top: '530px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '1540px', top: '550px'}}>
          <Rect text="courses에서 제거" />
        </div>
        <VLine x={1630} y={600} height={20} />
        <div className="absolute" style={{left: '1560px', top: '620px'}}>
          <Rect text="카드 즉시 사라짐" />
        </div>
        <VLine x={1630} y={670} height={30} />
        
        <div className="absolute" style={{left: '1840px', top: '530px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1850px', top: '550px'}}>
          <Rect text="취소" />
        </div>
        <VLine x={1870} y={600} height={100} />
        
        {/* 삭제 합류 */}
        <HLine x1={1630} x2={1870} y={700} />
        <VLine x={1750} y={700} height={660} />
        
        {/* 모든 경로 최종 합류 */}
        <HLine x1={650} x2={1750} y={1360} />
        <VLine x={1120} y={1360} height={30} />
        
        <div className="absolute" style={{left: '1020px', top: '1390px'}}>
          <Rect text="액션 처리 완료" />
        </div>
        
        <VLine x={1120} y={1440} height={30} />
        
        {/* 최종 분기 */}
        <div className="absolute" style={{left: '1030px', top: '1470px'}}>
          <Diamond text="계속<br/>학습?" />
        </div>
        
        <HLine x1={820} x2={1420} y={1560} />
        <VLine x={920} y={1560} height={30} />
        <VLine x={1320} y={1560} height={30} />
        
        <div className="absolute" style={{left: '880px', top: '1590px'}}>
          <LabelText text="Yes" />
        </div>
        <div className="absolute" style={{left: '800px', top: '1610px'}}>
          <Rect text="다른 코스/챕터 선택" />
        </div>
        <VLine x={920} y={1660} height={50} />
        <div className="absolute" style={{left: '820px', top: '1710px'}}>
          <div className="text-xs text-muted-foreground">(위로 복귀 - 루프)</div>
        </div>
        {/* 루프 백 */}
        <HLine x1={300} x2={920} y={1710} />
        <VLine x={300} y={280} height={1430} />
        <HLine x1={300} x2={400} y={280} />
        
        <div className="absolute" style={{left: '1280px', top: '1590px'}}>
          <LabelText text="No" />
        </div>
        <div className="absolute" style={{left: '1260px', top: '1610px'}}>
          <Oval text="종료" />
        </div>
      </div>
    </div>
  );
}

// ==================== 플로우차트 도형 컴포넌트 ====================
function Oval({ text }: { text: string }) {
  return (
    <div className="px-10 py-3 rounded-full bg-gray-700 text-white font-bold text-sm text-center min-w-[240px] border-4 border-gray-600">
      {text}
    </div>
  );
}

function Rect({ text }: { text: string }) {
  return (
    <div 
      className="px-8 py-3 bg-blue-500/20 border-2 border-blue-500 text-blue-700 font-semibold text-sm text-center min-w-[240px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

function Input({ text }: { text: string }) {
  return (
    <div 
      className="px-8 py-3 bg-blue-300/20 border-2 border-blue-300 rounded-lg text-blue-600 font-semibold text-sm text-center min-w-[240px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

function Diamond({ text }: { text: string }) {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center my-4">
      <div className="absolute w-28 h-28 bg-blue-400/20 border-2 border-blue-400 transform rotate-45"></div>
      <div 
        className="relative text-blue-600 font-bold text-sm text-center max-w-[90px] z-10"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

function LabelText({ text }: { text: string }) {
  return (
    <div className="text-sm font-bold text-foreground mb-2">
      {text}
    </div>
  );
}

// 선 컴포넌트들
function VLine({ x, y, height }: { x: number; y: number; height: number }) {
  return (
    <div 
      className="absolute bg-gray-600" 
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '2px',
        height: `${height}px`
      }}
    />
  );
}

function HLine({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <div 
      className="absolute bg-gray-600" 
      style={{
        left: `${x1}px`,
        top: `${y}px`,
        width: `${x2 - x1}px`,
        height: '2px'
      }}
    />
  );
}
