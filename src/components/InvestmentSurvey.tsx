import { useState } from 'react';
import { X } from 'lucide-react';

interface InvestmentSurveyProps {
  onComplete: (investmentType: string) => void;
  onClose: () => void;
}

interface Question {
  id: string;
  question: string;
  description?: string;
  options: {
    text: string;
    value: number;
    emoji?: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'investment_ratio',
    question: '총자산(부동산 제외) 대비 투자성향의 비중은 어떻게 되나요?',
    description: '투자자보호를 위해 일반금융소비자로 전행할게요.',
    options: [
      { text: '10% 이하', value: 1 },
      { text: '15% 이하', value: 2 },
      { text: '20% 이하', value: 3 },
      { text: '25% 이하', value: 4 },
      { text: '25% 초과', value: 5 },
    ]
  },
  {
    id: 'experience',
    question: '투자, 어디까지 해봤어요?',
    options: [
      { text: '예적금만 해봤어요', value: 1 },
      { text: '펀드나 주식은 해봤어요', value: 2 },
      { text: '웬만한 투자는 다 해봤어요', value: 3, emoji: '👍' },
    ]
  },
  {
    id: 'knowledge',
    question: '주식, 펀드에 대해 잘 아시나요?',
    options: [
      { text: '잘 모르겠어요', value: 1 },
      { text: '매수와 매도를 구분할 수 있어요', value: 2 },
      { text: '기지주의 성장주를 이해하고 있어요', value: 3 },
      { text: 'PER과 PBR을 설명할 수 있어요', value: 4 },
    ]
  },
  {
    id: 'purpose',
    question: '투자를 하려는 이유가 뭐예요?',
    options: [
      { text: '내 자산을 더 늘리고 싶어요', value: 3 },
      { text: '미래에 필요한 자금을 준비하고 싶어요', value: 2 },
      { text: '곧 사용할 돈을 쪼개 굴리고 싶어요', value: 1 },
    ]
  },
  {
    id: 'income',
    question: '앞으로 수입이 어떻게 될 것 같나요?',
    options: [
      { text: '일정한 수입이 없어요', value: 1 },
      { text: '비슷하게 유지될 것 같아요', value: 2 },
      { text: '앞으로 증가할 것 같아요', value: 3 },
    ]
  },
  {
    id: 'loss_tolerance',
    question: '손실이 있다면 어디까지 괜찮아요?',
    options: [
      { text: '손실은 절대 안돼요', value: 1 },
      { text: '-10%까지는 괜찮아요', value: 2 },
      { text: '-20%까지는 괜찮아요', value: 3 },
      { text: '-50%까지는 괜찮아요', value: 4 },
      { text: '-70%까지는 괜찮아요', value: 5 },
      { text: '더 큰 손실도 괜찮아요', value: 6 },
    ]
  },
];

export function InvestmentSurvey({ onComplete, onClose }: InvestmentSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [investmentType, setInvestmentType] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ question: string; answer: string; isBot: boolean }>>([
    { question: '👋 안녕하세요, 만나서 반가워요.\n지금부터 투자성향을 알아볼게요.', answer: '', isBot: true }
  ]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number, optionText: string, optionValue: number) => {
    setSelectedAnswer(optionIndex);
    
    // 답변 저장
    const newAnswers = { ...answers, [currentQuestion.id]: optionValue };
    setAnswers(newAnswers);

    // 채팅 히스토리에 추가
    setChatHistory([
      ...chatHistory,
      { question: currentQuestion.question, answer: '', isBot: true },
      { question: '', answer: optionText, isBot: false }
    ]);

    // 다음 단계로
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedAnswer(null);
      } else {
        // 모든 질문 완료 - 투자 성향 분석
        analyzeAndComplete(newAnswers);
      }
    }, 500);
  };

  const analyzeAndComplete = (finalAnswers: Record<string, number>) => {
    // 점수 합산
    const totalScore = Object.values(finalAnswers).reduce((sum, val) => sum + val, 0);
    const avgScore = totalScore / questions.length;

    // 투자 성향 판정
    let type = 'balanced';
    
    if (avgScore <= 1.8) {
      type = 'stable'; // 안정형
    } else if (avgScore <= 2.8) {
      type = 'balanced'; // 균형형
    } else if (avgScore <= 4) {
      type = 'aggressive'; // 공격형
    } else {
      type = 'daytrader'; // 단타형
    }

    // 손실 허용도가 높으면 단타형으로
    if (finalAnswers.loss_tolerance >= 4) {
      type = 'daytrader';
    }

    // 결과 표시
    setInvestmentType(type);
    setTimeout(() => {
      setShowResult(true);
    }, 800);
  };

  const getInvestmentTypeInfo = (type: string) => {
    switch (type) {
      case 'stable':
        return {
          name: '안정형 투자자',
          emoji: '🛡️',
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-700',
          description: '안정적이고 신중한 투자',
          features: [
            '위험을 최소화하고 안정적인 수익 추구',
            '배당주와 우량주 중심 투자',
            '장기 보유 전략으로 꾸준한 성장',
          ]
        };
      case 'balanced':
        return {
          name: '균형형 투자자',
          emoji: '⚖️',
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          description: '리스크와 수익의 균형',
          features: [
            '적절한 위험 감수로 합리적인 수익 추구',
            '가치주와 성장주의 조화로운 포트폴리오',
            '기술적 분석과 기본적 분석의 통합',
          ]
        };
      case 'aggressive':
        return {
          name: '공격형 투자자',
          emoji: '🚀',
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-700',
          description: '높은 수익 추구',
          features: [
            '높은 수익을 위한 적극적인 투자',
            '성장주와 테마주 중심 포트폴리오',
            '레버리지 활용과 고급 트레이딩 전략',
          ]
        };
      case 'daytrader':
        return {
          name: '단타형 투자자',
          emoji: '⚡',
          color: 'from-orange-500 to-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          description: '빠른 매매로 단기 수익',
          features: [
            '데이트레이딩과 스캘핑 전략',
            '차트 패턴과 기술적 지표 활용',
            '빠른 의사결정과 실시간 시장 대응',
          ]
        };
      default:
        return {
          name: '균형형 투자자',
          emoji: '⚖️',
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          description: '리스크와 수익의 균형',
          features: []
        };
    }
  };

  const typeInfo = investmentType ? getInvestmentTypeInfo(investmentType) : null;

  // 결과 화면 표시
  if (showResult && typeInfo) {
    const allTypes = [
      {
        type: 'stable',
        name: '안정형 투자자',
        emoji: '🛡️',
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-700',
        description: '안정적이고 신중한 투자',
      },
      {
        type: 'balanced',
        name: '균형형 투자자',
        emoji: '⚖️',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        description: '리스크와 수익의 균형',
      },
      {
        type: 'aggressive',
        name: '공격형 투자자',
        emoji: '🚀',
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-700',
        description: '높은 수익 추구',
      },
      {
        type: 'daytrader',
        name: '단타형 투자자',
        emoji: '⚡',
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        description: '빠른 매매로 단기 수익',
      },
    ];

    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-4xl w-full py-8">
          {/* 타이틀 */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-500">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              당신의 투자 유형은
            </h1>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {typeInfo.name} 입니다! {typeInfo.emoji}
            </p>
          </div>

          {/* 모든 투자 유형 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {allTypes.map((type, index) => {
              const isMyType = type.type === investmentType;
              return (
                <div
                  key={type.type}
                  className={`relative rounded-2xl p-6 transition-all duration-500 ${
                    isMyType
                      ? `border-4 ${type.borderColor} ${type.bgColor} shadow-2xl scale-105 animate-in zoom-in`
                      : 'border-2 border-gray-200 bg-gray-50 opacity-60'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* 선택된 유형 배지 */}
                  {isMyType && (
                    <div className={`absolute -top-3 -right-3 rounded-full bg-gradient-to-r ${type.color} px-4 py-1 text-sm font-bold text-white shadow-lg animate-in zoom-in duration-700`}>
                      ✓ 당신의 유형
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* 이모지 */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${
                      isMyType 
                        ? `bg-gradient-to-br ${type.color} shadow-lg` 
                        : 'bg-gray-200'
                    } flex items-center justify-center text-3xl`}>
                      {type.emoji}
                    </div>

                    {/* 정보 */}
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${
                        isMyType ? type.textColor : 'text-gray-500'
                      }`}>
                        {type.name}
                      </h3>
                      <p className={`text-sm ${
                        isMyType ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 특징 카드 */}
          <div className={`rounded-2xl border-2 ${typeInfo.borderColor} ${typeInfo.bgColor} p-8 mb-8 animate-in fade-in slide-in-from-bottom duration-700`}>
            <h3 className={`text-lg font-bold ${typeInfo.textColor} mb-4`}>✨ 당신의 투자 스타일</h3>
            <div className="space-y-3">
              {typeInfo.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${typeInfo.color} flex items-center justify-center text-white text-sm font-bold mt-0.5`}>
                    ✓
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-8 animate-in fade-in duration-1000">
            <p className="text-sm text-blue-900 text-center">
              <strong className="font-semibold">💡 다음 단계:</strong> 당신의 투자 성향에 맞는 맞춤형 학습 코스가 준비되었습니다!
            </p>
          </div>

          {/* 버튼 */}
          <button
            onClick={() => onComplete(investmentType)}
            className={`w-full rounded-xl bg-gradient-to-r ${typeInfo.color} px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] animate-in zoom-in duration-700`}
          >
            맞춤형 학습 시작하기 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">투자성향</h1>
          <div className="w-10" /> {/* 균형 맞추기 위한 빈 공간 */}
        </div>
        
        {/* 진행바 */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto px-6 py-8 pb-32">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 봇 아이콘 */}
          <div className="flex items-start gap-3 mb-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-amber-400 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="flex-1">
              <div className="inline-block bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                  👋 안녕하세요, 만나서 반가워요.{'\n'}
                  지금부터 투자성향을 알아볼게요.
                </p>
              </div>
            </div>
          </div>

          {/* 현재 질문 */}
          <div className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-amber-400 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="flex-1">
              <div className="inline-block bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                <p className="text-gray-800 leading-relaxed font-medium">
                  {currentQuestion.question}
                </p>
                {currentQuestion.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    · {currentQuestion.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 답변 옵션 */}
          <div className="space-y-3 pl-0">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isPrevAnswer = answers[currentQuestion.id] !== undefined;
              
              return (
                <button
                  key={index}
                  onClick={() => !isPrevAnswer && handleAnswer(index, option.text, option.value)}
                  disabled={isPrevAnswer}
                  className={`w-full rounded-2xl px-6 py-4 text-left font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg scale-[0.98]'
                      : isPrevAnswer
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {option.emoji && <span className="text-xl ml-2">{option.emoji}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 이전 답변들 (선택한 답변 표시) */}
          {selectedAnswer !== null && (
            <div className="flex items-start gap-3 justify-end mt-6 animate-in slide-in-from-right">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%]">
                <p className="text-gray-900 font-medium">
                  {currentQuestion.options[selectedAnswer].text}
                  {currentQuestion.options[selectedAnswer].emoji && 
                    ` ${currentQuestion.options[selectedAnswer].emoji}`
                  }
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center text-xl">
                ✏️
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-sm text-gray-500">
            질문 {currentStep + 1} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
}