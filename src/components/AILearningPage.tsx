import { useState, useEffect } from 'react';
import { GraduationCap, Target, Shield, BarChart3, Zap, User, CheckCircle, Award, BookOpen } from 'lucide-react';
import { LearningProgress } from './LearningProgress';

interface AILearningPageProps {
  forceShowInvestmentTypeModal?: boolean;
  onInvestmentTypeModalClose?: () => void;
  onNavigateToSimulator?: () => void;
  preSelectedInvestmentType?: string | null;
  onLessonSelect?: (lesson: { id: string; title: string }) => void;
}

export function AILearningPage({ forceShowInvestmentTypeModal, onInvestmentTypeModalClose, onNavigateToSimulator, preSelectedInvestmentType, onLessonSelect }: AILearningPageProps) {
  // 투자 성향 관련 상태
  const [showInvestmentTypeModal, setShowInvestmentTypeModal] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<string | null>(null);
  const [hasShownWelcomeModal, setHasShownWelcomeModal] = useState(false);

  // 초기 로딩 시 투자 성향 설정
  useEffect(() => {
    const savedType = localStorage.getItem('investmentType');
    
    if (preSelectedInvestmentType) {
      setSelectedInvestmentType(preSelectedInvestmentType);
      setShowInvestmentTypeModal(false);
    } else if (savedType && savedType !== 'none') {
      setSelectedInvestmentType(savedType);
      setShowInvestmentTypeModal(false);
    } else if (forceShowInvestmentTypeModal) {
      setShowInvestmentTypeModal(true);
    } else if (!savedType) {
      setShowInvestmentTypeModal(true);
    }
  }, [forceShowInvestmentTypeModal, preSelectedInvestmentType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 p-3 shadow-lg shadow-blue-400/30">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Education Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">AI 기반 맞춤형 투자 교육</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 투자 성향이 선택된 경우 맞춤형 학습 진행도 표시 */}
        {selectedInvestmentType && selectedInvestmentType !== 'none' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-gray-500">현재 분석된 투자 성향:</div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                  selectedInvestmentType === 'stable' ? 'bg-emerald-100 text-emerald-700' :
                  selectedInvestmentType === 'balanced' ? 'bg-blue-100 text-blue-700' :
                  selectedInvestmentType === 'aggressive' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedInvestmentType === 'stable' ? '🛡️ 안정형' :
                   selectedInvestmentType === 'balanced' ? '⚖️ 균형형' :
                   selectedInvestmentType === 'aggressive' ? '🚀 공격형' :
                   '⚡ 단타형'}
                </div>
              </div>
              <button 
                onClick={() => setShowInvestmentTypeModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                성향 다시 진단하기
              </button>
            </div>
            
            <LearningProgress 
              investmentType={selectedInvestmentType}
              onStartLearning={() => {
                // 첫 번째 미완료 레슨 찾기
                const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
                const allLessons = [
                  { id: `${selectedInvestmentType}-1`, title: '1단계 학습' },
                  { id: `${selectedInvestmentType}-2`, title: '2단계 학습' },
                  { id: `${selectedInvestmentType}-3`, title: '3단계 학습' },
                  { id: `${selectedInvestmentType}-4`, title: '4단계 학습' },
                  { id: `${selectedInvestmentType}-5`, title: '5단계 학습' },
                ];
                const nextLesson = allLessons.find(lesson => !completedLessons.includes(lesson.id));
                if (nextLesson && onLessonSelect) {
                  onLessonSelect(nextLesson);
                }
              }}
            />
          </div>
        ) : (
          /* 투자 유형이 선택되지 않은 경우 안내 메시지 */
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-16 text-center border-2 border-blue-200 shadow-lg">
            <div className="mb-8 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center shadow-xl">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              맞춤형 투자 학습을 시작하세요!
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              당신의 투자 성향을 선택하고<br />
              체계적인 단계별 학습으로 전문 투자자가 되어보세요
            </p>
            <button
              onClick={() => setShowInvestmentTypeModal(true)}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-5 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Target className="h-6 w-6" />
              투자 성향 선택하기
            </button>
          </div>
        )}
      </div>

      {/* 투자 성향 선택 모달 */}
      {showInvestmentTypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900">투자 성향 설정</h2>
              <p className="text-gray-600">당신의 투자 스타일에 맞는 맞춤형 교육을 제공합니다</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* 안정형 */}
              <button
                onClick={() => setSelectedInvestmentType('stable')}
                className={`group rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${ selectedInvestmentType === 'stable'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-3">
                      <Shield className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">안정형</h3>
                  </div>
                  {selectedInvestmentType === 'stable' && (
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  )}
                </div>
                <p className="mb-3 text-sm text-gray-600">위험을 최소화하고 안정적인 수익을 추구합니다</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    배당주, 우량주 중심 투자
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    장기 보유 전략
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    리스크 관리 교육
                  </div>
                </div>
              </button>

              {/* 균형형 */}
              <button
                onClick={() => setSelectedInvestmentType('balanced')}
                className={`group rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                  selectedInvestmentType === 'balanced'
                    ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-400/20'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-3">
                      <BarChart3 className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">균형형</h3>
                  </div>
                  {selectedInvestmentType === 'balanced' && (
                    <CheckCircle className="h-6 w-6 text-blue-400" />
                  )}
                </div>
                <p className="mb-3 text-sm text-gray-600">적절한 위험과 수익의 균형을 추구합니다</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    가치주 + 성장주 조합
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    포트폴리오 분산
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    기술적 + 기본적 분석
                  </div>
                </div>
              </button>

              {/* 공격형 */}
              <button
                onClick={() => setSelectedInvestmentType('aggressive')}
                className={`group rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                  selectedInvestmentType === 'aggressive'
                    ? 'border-purple-400 bg-purple-50 shadow-lg shadow-purple-400/20'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-100 p-3">
                      <Target className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">공격형</h3>
                  </div>
                  {selectedInvestmentType === 'aggressive' && (
                    <CheckCircle className="h-6 w-6 text-purple-400" />
                  )}
                </div>
                <p className="mb-3 text-sm text-gray-600">높은 수익을 위해 적극적인 위험을 감수합니다</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    성장주, 테마주 투자
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    레버리지 활용
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    고급 트레이딩 전략
                  </div>
                </div>
              </button>

              {/* 단타형 */}
              <button
                onClick={() => setSelectedInvestmentType('daytrader')}
                className={`group rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                  selectedInvestmentType === 'daytrader'
                    ? 'border-orange-400 bg-orange-50 shadow-lg shadow-orange-400/20'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-100 p-3">
                      <Zap className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">단타형</h3>
                  </div>
                  {selectedInvestmentType === 'daytrader' && (
                    <CheckCircle className="h-6 w-6 text-orange-400" />
                  )}
                </div>
                <p className="mb-3 text-sm text-gray-600">빠른 매매로 단기 수익을 추구합니다</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    차트 패턴 분석
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    데이트레이딩 기법
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    실시간 시장 분석
                  </div>
                </div>
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  localStorage.setItem('investmentType', 'none');
                  setShowInvestmentTypeModal(false);
                }}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                나중에 설정
              </button>
              <button
                onClick={() => {
                  if (selectedInvestmentType) {
                    localStorage.setItem('investmentType', selectedInvestmentType);
                    setShowInvestmentTypeModal(false);
                  } else {
                    alert('투자 성향을 선택해주세요.');
                  }
                }}
                disabled={!selectedInvestmentType}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                맞춤형 교육 시작하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
