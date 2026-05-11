import { useEffect, useRef, useState } from "react";
import type { InvestmentType } from "../learningData";

interface InvestmentTypeModalProps {
  selectedType: InvestmentType | null;
  onSelect: (type: InvestmentType) => void;
  onConfirm: () => void;
  onSkip: () => void;
}

interface SurveyOption {
  text: string;
  value: number;
  emoji?: string;
}

interface SurveyQuestion {
  id: string;
  question: string;
  description?: string;
  options: SurveyOption[];
}

interface SurveyMessage {
  id: number;
  type: "bot" | "user";
  content: string;
  options?: SurveyOption[];
  questionId?: string;
  isResult?: boolean;
}



const surveyQuestions: SurveyQuestion[] = [
  {
    id: "investment_ratio",
    question: "총 자산(부동산 제외) 대비 투자 성향의 비중은 어떻게 되나요?",
    description: "투자자 보호를 위해 일반 금융 소비자로 진행할게요.",
    options: [
      { text: "10% 이하", value: 1 },
      { text: "15% 이하", value: 2 },
      { text: "20% 이하", value: 3 },
      { text: "25% 이하", value: 4 },
      { text: "25% 초과", value: 5 },
    ],
  },
  {
    id: "experience",
    question: "투자, 어디까지 해 봤어요?",
    options: [
      { text: "예적금만 해 봤어요", value: 1 },
      { text: "펀드나 주식은 해 봤어요", value: 2 },
      { text: "웬만한 투자는 다 해봤 어요", value: 3, emoji: "👍" },
    ],
  },
  {
    id: "knowledge",
    question: "주식, 펀드에 대해 잘 아시나요?",
    options: [
      { text: "잘 모르겠어요", value: 1 },
      { text: "매수와 매도를 구분할 수 있어요", value: 2 },
      { text: "가치주의 성장주를 이해하고 있어요", value: 3 },
      { text: "PER과 PBR을 설명할 수 있어요", value: 4 },
    ],
  },
  {
    id: "purpose",
    question: "투자를 하려는 이유가 뭐예요?",
    options: [
      { text: "내 자산을 더 늘리고 싶어요", value: 3 },
      { text: "미래에 필요한 자금을 준비하고 싶어요", value: 2 },
      { text: "곧 사용할 돈을 쪼개 굴리고 싶어요", value: 1 },
    ],
  },
  {
    id: "income",
    question: "앞으로 수입이 어떻게 될 것 같나요?",
    options: [
      { text: "일정한 수입이 없어요", value: 1 },
      { text: "비슷하게 유지될 것 같아요", value: 2 },
      { text: "앞으로 증가할 것 같아요", value: 3 },
    ],
  },
  {
    id: "loss_tolerance",
    question: "손실이 있다면 어디까지 괜찮아요?",
    options: [
      { text: "손실은 절대 안돼요", value: 1 },
      { text: "-10%까지는 괜찮아요", value: 2 },
      { text: "-20%까지는 괜찮아요", value: 3 },
      { text: "-50%까지는 괜찮아요", value: 4 },
      { text: "-70%까지는 괜찮아요", value: 5 },
      { text: "더 큰 손실도 괜찮아요", value: 6 },
    ],
  },
];

const typeLabels: Record<InvestmentType, string> = {
  stable: "안정형 투자자",
  balanced: "균형형 투자자",
  aggressive: "공격형 투자자",
  daytrader: "단타형 투자자",
};

const typeEmojis: Record<InvestmentType, string> = {
  stable: "🛡️",
  balanced: "⚖️",
  aggressive: "🚀",
  daytrader: "⚡",
};

const getInvestmentType = (answers: Record<string, number>): InvestmentType => {
  const average = Object.values(answers).reduce((sum, value) => sum + value, 0) / surveyQuestions.length;
  let type: InvestmentType = "balanced";
  if (average <= 1.8) type = "stable";
  else if (average <= 2.8) type = "balanced";
  else if (average <= 4) type = "aggressive";
  else type = "daytrader";
  if ((answers.loss_tolerance ?? 0) >= 4) type = "daytrader";
  return type;
};

const InvestmentTypeModal = ({
  onSelect,
  onConfirm,
  onSkip,
}: InvestmentTypeModalProps) => {
 
  const [messages, setMessages] = useState<SurveyMessage[]>([
  {
    id: 0,
    type: "bot",
    content: "👋 안녕하세요, 만나서 반가워요!\n지금부터 투자 성향을 알아볼게요.",
  },
  {
    id: 1,
    type: "bot",
    content:
      surveyQuestions[0].question +
      (surveyQuestions[0].description
        ? `\n· ${surveyQuestions[0].description}`
        : ""),
    options: surveyQuestions[0].options,
    questionId: surveyQuestions[0].id,
  },
]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [resultType, setResultType] = useState<InvestmentType | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (messages.length > 2) {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  const handleAnswer = (option: SurveyOption, questionId: string, questionIndex: number) => {
    if (answeredQuestions.has(questionId)) return;

    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
    const userMessage: SurveyMessage = {
      id: Date.now(),
      type: "user",
      content: option.text + (option.emoji ? ` ${option.emoji}` : ""),
    };
    setMessages((prev) => [...prev, userMessage]);

    const nextAnswers = { ...answers, [questionId]: option.value };
    setAnswers(nextAnswers);
    const nextQuestionIndex = questionIndex + 1;

    window.setTimeout(() => {
      if (nextQuestionIndex < surveyQuestions.length) {
        const nextQuestion = surveyQuestions[nextQuestionIndex];
        const botMessage: SurveyMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: nextQuestion.question + (nextQuestion.description ? `\n· ${nextQuestion.description}` : ""),
          options: nextQuestion.options,
          questionId: nextQuestion.id,
        };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        const nextType = getInvestmentType(nextAnswers);
        setResultType(nextType);
        onSelect(nextType);
        const resultMessage: SurveyMessage = {
          id: Date.now() + 2,
          type: "bot",
          content: `분석 완료! 당신의 투자 유형은\n"${typeLabels[nextType]} ${typeEmojis[nextType]}" 입니다!`,
          isResult: true,
        };
        setMessages((prev) => [...prev, resultMessage]);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #f0f0f0", backgroundColor: "#ffffff", flexShrink: 0 }}>
        <button
          type="button"
          onClick={onSkip}
          style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#666", padding: "4px" }}
        >
          ✕
        </button>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#1a1a1a" }}>투자 성향 분석</span>
        <span style={{ fontSize: "13px", color: "#42D6BA", fontWeight: 600 }}>
          {Math.min(currentQuestionIndex + 1, surveyQuestions.length)} / {surveyQuestions.length}
        </span>
      </div>

      <div style={{ height: "3px", backgroundColor: "#f0f0f0", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            backgroundColor: "#42D6BA",
            width: `${(Math.min(currentQuestionIndex + 1, surveyQuestions.length) / surveyQuestions.length) * 100}%`,
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "20px", justifyContent: "flex-start" }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{ display: "flex", flexDirection: "column", alignItems: message.type === "user" ? "flex-end" : "flex-start" }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", flexDirection: message.type === "user" ? "row-reverse" : "row" }}>
              {message.type === "bot" && (
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#C7F3EB", border: "2px solid #2D68FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, alignSelf: "flex-start" }}>
                  🤖
                </div>
              )}
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: message.type === "bot" ? "20px 20px 20px 4px" : "20px 20px 4px 20px",
                  fontSize: "14px",
                  maxWidth: "260px",
                  lineHeight: 1.5,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  whiteSpace: "pre-line",
                  backgroundColor: message.type === "bot" ? message.isResult ? "#C7F3EB" : "#f0f0f0" : "#42D6BA",
                  color: message.type === "bot" ? message.isResult ? "#42D6BA" : "#333333" : "#ffffff",
                  fontWeight: message.isResult ? 700 : 400,
                  border: message.isResult ? "1.5px solid #2D68FF" : "none",
                }}
              >
                {message.content}
              </div>
            </div>

            {message.options && message.questionId && (
              <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "6px", width: "100%", maxWidth: "320px", paddingLeft: "46px" }}>
                {message.options.map((option) => {
                  const answered = answeredQuestions.has(message.questionId!);
                  const selected = answered && answers[message.questionId!] === option.value;
                  return (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => !answered && handleAnswer(option, message.questionId!, currentQuestionIndex)}
                      disabled={answered}
                      style={{
                        background: selected ? "#42D6BA" : "#ffffff",
                        border: "1.5px solid #2D68FF",
                        color: selected ? "#ffffff" : "#42D6BA",
                        padding: "10px 16px",
                        borderRadius: "12px",
                        cursor: answered ? "default" : "pointer",
                        fontWeight: 500,
                        fontSize: "14px",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        opacity: answered && !selected ? 0.4 : 1,
                        boxShadow: "0 1px 4px rgba(45,104,255,0.1)",
                      }}
                      onMouseEnter={(event) => {
                        if (!answered) {
                          event.currentTarget.style.background = "#42D6BA";
                          event.currentTarget.style.color = "#ffffff";
                        }
                      }}
                      onMouseLeave={(event) => {
                        if (!answered && !selected) {
                          event.currentTarget.style.background = "#ffffff";
                          event.currentTarget.style.color = "#42D6BA";
                        }
                      }}
                    >
                      {option.text}
                      {option.emoji && <span style={{ marginLeft: "6px" }}>{option.emoji}</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {message.isResult && resultType && (
              <div style={{ marginTop: "8px", paddingLeft: "46px", display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "320px" }}>
                <button
                  type="button"
                  onClick={onConfirm}
                  style={{ background: "#42D6BA", border: "none", color: "#ffffff", padding: "14px 20px", borderRadius: "14px", cursor: "pointer", fontWeight: 700, fontSize: "15px", boxShadow: "0 4px 14px rgba(45,104,255,0.35)", transition: "all 0.2s ease" }}
                >
                  맞춤형 학습 시작하기 →
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default InvestmentTypeModal;
