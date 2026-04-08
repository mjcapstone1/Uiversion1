import { CheckCircle2, Lock, Circle } from 'lucide-react';

interface LearningProgressProps {
  investmentType: string;
  onStartLearning: () => void;
}

interface LessonStep {
  id: string;
  title: string;
  duration: string;
  description: string;
}

const learningCurriculum: Record<string, LessonStep[]> = {
  stable: [
    { id: 'stable-1', title: '안정형 투자자란?', duration: '5분', description: '위험을 최소화하는 투자 철학 이해하기' },
    { id: 'stable-2', title: '배당주 투자 기초', duration: '10분', description: '안정적인 배당 수익 창출 방법' },
    { id: 'stable-3', title: '우량주 선별 방법', duration: '15분', description: '재무제표로 우량 기업 찾기' },
    { id: 'stable-4', title: '장기 투자 전략', duration: '10분', description: '복리의 마법과 장기 보유의 힘' },
    { id: 'stable-5', title: '리스크 관리', duration: '10분', description: '포트폴리오 분산과 자산 배분' },
  ],
  balanced: [
    { id: 'balanced-1', title: '균형형 투자자란?', duration: '5분', description: '리스크와 수익의 균형 찾기' },
    { id: 'balanced-2', title: '가치주 vs 성장주', duration: '10분', description: '두 투자 스타일의 차이점 이해' },
    { id: 'balanced-3', title: 'PER & PBR 분석', duration: '15분', description: '주요 투자 지표 활용법' },
    { id: 'balanced-4', title: '기술적 분석 기초', duration: '15분', description: '차트 패턴과 이동평균선' },
    { id: 'balanced-5', title: '포트폴리오 구성', duration: '10분', description: '분산 투자로 리스크 관리하기' },
  ],
  aggressive: [
    { id: 'aggressive-1', title: '공격형 투자자란?', duration: '5분', description: '높은 수익을 위한 적극적 투자' },
    { id: 'aggressive-2', title: '성장주 발굴', duration: '15분', description: '고성장 기업 찾는 방법' },
    { id: 'aggressive-3', title: '테마주 투자 전략', duration: '15분', description: '시장 트렌드 읽고 활용하기' },
    { id: 'aggressive-4', title: '레버리지 이해', duration: '10분', description: '신용 거래와 위험 관리' },
    { id: 'aggressive-5', title: '고급 트레이딩', duration: '15분', description: '스윙 트레이딩과 모멘텀 전략' },
  ],
  daytrader: [
    { id: 'daytrader-1', title: '단타형 투자자란?', duration: '5분', description: '데이트레이딩의 세계' },
    { id: 'daytrader-2', title: '캔들스틱 완전정복', duration: '15분', description: '캔들 패턴으로 시장 읽기' },
    { id: 'daytrader-3', title: '기술적 지표 활용', duration: '15분', description: 'RSI, MACD, 볼린저 밴드' },
    { id: 'daytrader-4', title: '스캘핑 전략', duration: '15분', description: '초단타 매매 기법' },
    { id: 'daytrader-5', title: '실시간 시장 대응', duration: '10분', description: '빠른 판단과 손절매 원칙' },
  ],
};

const typeInfo: Record<string, { name: string; emoji: string; color: string; bgColor: string }> = {
  stable: { name: '안정형', emoji: '🛡️', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50' },
  balanced: { name: '균형형', emoji: '⚖️', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  aggressive: { name: '공격형', emoji: '🚀', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
  daytrader: { name: '단타형', emoji: '⚡', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
};

export function LearningProgress({ investmentType, onStartLearning }: LearningProgressProps) {
  const curriculum = learningCurriculum[investmentType] || learningCurriculum.balanced;
  const info = typeInfo[investmentType] || typeInfo.balanced;
  
  // localStorage에서 완료된 학습 가져오기
  const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]') as string[];
  const completedCount = curriculum.filter(lesson => completedLessons.includes(lesson.id)).length;
  const totalCount = curriculum.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = completedCount === totalCount;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-3xl shadow-lg`}>
            {info.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{info.name} 투자자 학습 과정</h2>
            <p className="text-sm text-gray-600">당신의 투자 성향에 최적화된 커리큘럼</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {progress}%
          </div>
          <div className="text-sm text-gray-600">{completedCount} / {totalCount} 완료</div>
        </div>
      </div>

      {/* 진행바 */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div 
          className={`h-full bg-gradient-to-r ${info.color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 학습 완료 시 메시지 */}
      {isAllCompleted && (
        <div className="mb-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-bold text-green-900 mb-1">축하합니다! 모든 학습을 완료했습니다!</h3>
          <p className="text-sm text-green-700">이제 투자 시뮬레이터를 자유롭게 사용할 수 있습니다.</p>
        </div>
      )}

      {/* 학습 단계 목록 */}
      <div className="space-y-3">
        {curriculum.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isAvailable = index === 0 || completedLessons.includes(curriculum[index - 1].id);
          const isLocked = !isAvailable;

          return (
            <div
              key={lesson.id}
              className={`rounded-xl border-2 p-4 transition-all ${
                isCompleted
                  ? 'border-green-200 bg-green-50'
                  : isLocked
                  ? 'border-gray-200 bg-gray-50 opacity-50'
                  : 'border-blue-200 bg-blue-50 hover:border-blue-400 cursor-pointer hover:shadow-md'
              }`}
              onClick={() => isAvailable && !isCompleted && onStartLearning()}
            >
              <div className="flex items-center gap-4">
                {/* 아이콘 */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isLocked
                    ? 'bg-gray-300 text-gray-500'
                    : `bg-gradient-to-br ${info.color} text-white`
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : isLocked ? (
                    <Lock className="h-6 w-6" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </div>

                {/* 정보 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      isCompleted
                        ? 'bg-green-200 text-green-800'
                        : isLocked
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-blue-200 text-blue-800'
                    }`}>
                      {index + 1}단계
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {lesson.duration}</span>
                  </div>
                  <h4 className={`font-bold mb-1 ${
                    isLocked ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {lesson.title}
                  </h4>
                  <p className={`text-sm ${
                    isLocked ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {lesson.description}
                  </p>
                </div>

                {/* 상태 표시 */}
                {isCompleted && (
                  <div className="text-green-600 font-bold text-sm">✓ 완료</div>
                )}
                {isLocked && (
                  <div className="text-gray-400 font-bold text-sm">🔒 잠김</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 안내 메시지 */}
      {!isAllCompleted && (
        <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-sm text-yellow-900">
            <strong className="font-semibold">⚠️ 중요:</strong> 모든 학습 단계를 순서대로 완료해야 투자 시뮬레이터를 사용할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}