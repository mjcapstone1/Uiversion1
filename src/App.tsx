import { useState } from 'react';
import { Header } from './components/Header';
import { MarketIndices } from './components/MarketIndices';
import { StockList } from './components/StockList';
import { ChartAndFeed } from './components/ChartAndFeed';
import { SimulatorPage } from './components/SimulatorPage';
import { AILearningPage } from './components/AILearningPage';
import { LandingPage } from './components/LandingPage';
import { InvestmentSurvey } from './components/InvestmentSurvey';
import { LearningProgress } from './components/LearningProgress';
import { LessonViewer } from './components/LessonViewer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'survey' | 'home' | 'simulator' | 'learning'>('landing');
  const [selectedStockName, setSelectedStockName] = useState<string | null>(null);
  const [detectedInvestmentType, setDetectedInvestmentType] = useState<string | null>(null);
  const [showLessonViewer, setShowLessonViewer] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<{ id: string; title: string } | null>(null);
  const [showLockedModal, setShowLockedModal] = useState(false);

  // 학습 완료 여부 확인
  const checkLearningComplete = () => {
    const investmentType = localStorage.getItem('investmentType') || detectedInvestmentType;
    if (!investmentType) return false;
    
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const requiredLessons = {
      stable: 5,
      balanced: 5,
      aggressive: 5,
      daytrader: 5,
    };
    
    const prefix = investmentType;
    const completedCount = completedLessons.filter((id: string) => id.startsWith(prefix)).length;
    return completedCount >= (requiredLessons[investmentType as keyof typeof requiredLessons] || 5);
  };

  const handleStockClick = (stockName: string) => {
    if (!checkLearningComplete()) {
      setShowLockedModal(true);
      return;
    }
    setSelectedStockName(stockName);
    setCurrentPage('simulator');
  };

  const handleSimulatorClick = () => {
    if (!checkLearningComplete()) {
      setShowLockedModal(true);
      return;
    }
    setSelectedStockName(null);
    setCurrentPage('simulator');
  };

  const handleLearningClick = (contentId: string) => {
    setCurrentPage('learning');
  };

  const handleLandingStart = () => {
    setCurrentPage('survey');
  };

  const handleSurveyComplete = (investmentType: string) => {
    setDetectedInvestmentType(investmentType);
    localStorage.setItem('investmentType', investmentType);
    setCurrentPage('learning');
  };

  const handleLessonSelect = (lesson: { id: string; title: string }) => {
    setCurrentLesson(lesson);
    setShowLessonViewer(true);
  };

  const handleLessonClose = () => {
    setShowLessonViewer(false);
  };

  // 랜딩 페이지
  if (currentPage === 'landing') {
    return <LandingPage onStart={handleLandingStart} />;
  }

  // 투자성향 설문조사
  if (currentPage === 'survey') {
    return (
      <InvestmentSurvey 
        onComplete={handleSurveyComplete}
        onClose={() => setCurrentPage('landing')}
      />
    );
  }

  // 레슨 뷰어
  if (showLessonViewer && currentLesson) {
    return (
      <LessonViewer
        lesson={currentLesson}
        onComplete={(nextLesson) => {
          if (nextLesson) {
            // 다음 레슨으로 자동 전환
            setCurrentLesson(nextLesson);
          } else {
            // 마지막 레슨이면 닫기
            setShowLessonViewer(false);
            setCurrentLesson(null);
          }
        }}
        onClose={() => {
          setShowLessonViewer(false);
          setCurrentLesson(null);
        }}
      />
    );
  }

  // 잠금 모달
  if (showLockedModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-4xl">🔒</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">학습을 먼저 완료해주세요!</h2>
          <p className="text-gray-600 mb-6">
            투자 시뮬레이터를 사용하려면 모든 학습 단계를 완료해야 합니다.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLockedModal(false)}
              className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                setShowLockedModal(false);
                setCurrentPage('learning');
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              학습하러 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-[1920px]">
        <Header 
          onChallengeClick={() => {}}
          onHomeClick={() => setCurrentPage('home')}
          onSimulatorClick={handleSimulatorClick}
          onLearningClick={() => setCurrentPage('learning')}
          onLandingClick={() => setCurrentPage('landing')}
          onStockSelect={handleStockClick}
          onLearningSelect={handleLearningClick}
          currentPage={currentPage}
        />
        
        {currentPage === 'home' ? (
          <div className="px-8 py-8">
            <MarketIndices />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StockList onStockClick={handleStockClick} />
              <ChartAndFeed onStockClick={handleStockClick} />
            </div>
          </div>
        ) : currentPage === 'simulator' ? (
          <SimulatorPage stockName={selectedStockName} onNavigateToLearning={() => setCurrentPage('learning')} />
        ) : (
          <AILearningPage 
            forceShowInvestmentTypeModal={false}
            onInvestmentTypeModalClose={() => {}}
            onNavigateToSimulator={() => setCurrentPage('simulator')}
            preSelectedInvestmentType={detectedInvestmentType}
            onLessonSelect={handleLessonSelect}
          />
        )}
        
        {currentPage === 'learning' && (
          <LearningProgress 
            onLessonSelect={handleLessonSelect}
          />
        )}
      </div>
    </div>
  );
}