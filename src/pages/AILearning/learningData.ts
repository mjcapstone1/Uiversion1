export type InvestmentType = "stable" | "balanced" | "aggressive" | "daytrader";

export interface LessonStep {
  id: string;
  type: InvestmentType;
  step: number;
  title: string;
  duration: string;
  description: string;
}

export interface LessonContent {
  sections: Array<{ title: string; content: string }>;
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

export const investmentTypes: Record<InvestmentType, {
  name: string;
  shortName: string;
  badge: string;
  tone: string;
  border: string;
  bg: string;
  description: string;
  points: string[];
}> = {
  stable: {
    name: "안정형 투자자",
    shortName: "안정형",
    badge: "방어",
    tone: "from-emerald-400 to-teal-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    description: "원금 보존과 장기적 안정성을 우선합니다.",
    points: ["우량주와 배당주 중심", "분산 투자", "긴 호흡의 자산 관리"],
  },
  balanced: {
    name: "균형형 투자자",
    shortName: "균형형",
    badge: "균형",
    tone: "from-sky-400 to-blue-500",
    border: "border-sky-300",
    bg: "bg-sky-50",
    description: "수익성과 리스크의 균형을 함께 봅니다.",
    points: ["가치주와 성장주 조합", "PER/PBR 분석", "포트폴리오 리밸런싱"],
  },
  aggressive: {
    name: "공격형 투자자",
    shortName: "공격형",
    badge: "성장",
    tone: "from-violet-400 to-fuchsia-500",
    border: "border-violet-300",
    bg: "bg-violet-50",
    description: "높은 성장성과 변동성을 적극적으로 활용합니다.",
    points: ["성장주 발굴", "테마 흐름 파악", "손실 제한 규칙"],
  },
  daytrader: {
    name: "단타형 투자자",
    shortName: "단타형",
    badge: "속도",
    tone: "from-amber-400 to-rose-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
    description: "짧은 시간 안의 가격 흐름과 거래량을 중시합니다.",
    points: ["캔들 패턴", "기술적 지표", "빠른 손절과 익절"],
  },
};

export const learningCurriculum: Record<InvestmentType, LessonStep[]> = {
  stable: [
    { id: "stable-1", type: "stable", step: 1, title: "안정형 투자자란?", duration: "5분", description: "위험을 최소화하는 투자 철학 이해하기" },
    { id: "stable-2", type: "stable", step: 2, title: "배당주 투자 기초", duration: "10분", description: "안정적인 현금흐름을 만드는 방법" },
    { id: "stable-3", type: "stable", step: 3, title: "우량주 선별 방법", duration: "15분", description: "재무 안정성과 시장 지위를 확인하기" },
    { id: "stable-4", type: "stable", step: 4, title: "장기 투자 전략", duration: "10분", description: "복리와 시간의 힘을 활용하기" },
    { id: "stable-5", type: "stable", step: 5, title: "리스크 관리", duration: "10분", description: "분산 투자와 손실 제한 원칙" },
  ],
  balanced: [
    { id: "balanced-1", type: "balanced", step: 1, title: "균형형 투자자란?", duration: "5분", description: "위험과 수익의 균형점 찾기" },
    { id: "balanced-2", type: "balanced", step: 2, title: "가치주 vs 성장주", duration: "10분", description: "두 스타일의 장단점 비교" },
    { id: "balanced-3", type: "balanced", step: 3, title: "PER & PBR 분석", duration: "15분", description: "기본 투자 지표로 기업 바라보기" },
    { id: "balanced-4", type: "balanced", step: 4, title: "기술적 분석 기초", duration: "15분", description: "이동평균선과 추세 확인" },
    { id: "balanced-5", type: "balanced", step: 5, title: "포트폴리오 구성", duration: "10분", description: "비중 조절로 변동성 낮추기" },
  ],
  aggressive: [
    { id: "aggressive-1", type: "aggressive", step: 1, title: "공격형 투자자란?", duration: "5분", description: "고수익 전략의 전제 조건" },
    { id: "aggressive-2", type: "aggressive", step: 2, title: "성장주 발굴", duration: "15분", description: "매출 성장과 시장 확장성 보기" },
    { id: "aggressive-3", type: "aggressive", step: 3, title: "테마주 투자 전략", duration: "15분", description: "뉴스와 수급의 연결 읽기" },
    { id: "aggressive-4", type: "aggressive", step: 4, title: "레버리지 이해", duration: "10분", description: "수익 확대와 손실 확대를 함께 이해" },
    { id: "aggressive-5", type: "aggressive", step: 5, title: "고급 트레이딩", duration: "15분", description: "모멘텀과 스윙 전략 정리" },
  ],
  daytrader: [
    { id: "daytrader-1", type: "daytrader", step: 1, title: "데이트레이딩의 실체", duration: "5분", description: "단기 매매의 장점과 위험" },
    { id: "daytrader-2", type: "daytrader", step: 2, title: "캔들스틱 완전정복", duration: "15분", description: "캔들 패턴으로 심리 읽기" },
    { id: "daytrader-3", type: "daytrader", step: 3, title: "볼린저 밴드와 거래량 분석", duration: "15분", description: "과열과 침체 구간 확인" },
    { id: "daytrader-4", type: "daytrader", step: 4, title: "스캘핑 전략", duration: "15분", description: "초단기 진입과 청산 기준" },
    { id: "daytrader-5", type: "daytrader", step: 5, title: "실시간 시장 대응", duration: "10분", description: "빠른 판단과 손절 원칙" },
  ],
};

const lessonDetails: Record<InvestmentType, Record<number, { concept: string; practice: string; summary: string }>> = {
  stable: {
    1: {
      concept: "안정형 투자는 수익보다 손실 가능성을 먼저 줄이는 방식입니다. 변동성이 큰 종목보다 실적이 꾸준하고 재무 구조가 안정적인 기업을 우선 확인합니다.",
      practice: "관심 종목을 볼 때 최근 등락률보다 부채비율, 현금흐름, 배당 지속성을 먼저 체크합니다. 매수 금액은 한 종목에 몰지 않고 여러 우량주로 나눕니다.",
      summary: "안정형의 핵심은 오래 버틸 수 있는 종목과 비중을 고르는 것입니다.",
    },
    2: {
      concept: "배당주는 기업이 벌어들인 이익 일부를 주주에게 나누는 종목입니다. 주가 상승이 크지 않아도 배당금이 꾸준하면 안정적인 현금흐름을 만들 수 있습니다.",
      practice: "배당수익률만 높다고 좋은 종목은 아닙니다. 배당성향, 배당 지급 이력, 이익이 줄어도 배당을 유지할 수 있는지를 함께 봅니다.",
      summary: "배당 투자는 높은 배당률보다 지속 가능한 배당을 찾는 과정입니다.",
    },
    3: {
      concept: "우량주는 시장 점유율, 브랜드, 재무 안정성이 검증된 기업입니다. 단기 급등보다 긴 기간 동안 꾸준히 생존하고 성장할 가능성을 봅니다.",
      practice: "매출과 영업이익이 안정적으로 유지되는지, 업황이 나빠져도 버틸 체력이 있는지 확인합니다. 가격이 내려왔을 때도 기업 가치가 훼손됐는지 구분해야 합니다.",
      summary: "우량주 선별은 싸 보이는 주식을 찾는 것이 아니라 오래 가져갈 기업을 고르는 것입니다.",
    },
    4: {
      concept: "장기 투자는 시간을 활용해 복리 효과를 노리는 전략입니다. 매일의 가격보다 기업의 방향성과 투자 기간을 더 중요하게 봅니다.",
      practice: "목표 기간, 추가 매수 기준, 점검 주기를 미리 정합니다. 단기 뉴스에 흔들리기보다 분기 실적과 산업 흐름을 정기적으로 확인합니다.",
      summary: "장기 투자는 방치가 아니라 정해진 기준으로 오래 관리하는 방식입니다.",
    },
    5: {
      concept: "리스크 관리는 손실을 완전히 없애는 것이 아니라 감당 가능한 크기로 제한하는 일입니다. 안정형일수록 투자 전 손실 한도를 정해야 합니다.",
      practice: "현금 비중을 남기고 업종을 나누며, 한 종목 비중을 과도하게 키우지 않습니다. 예상과 다른 실적 악화가 나오면 보유 이유를 다시 점검합니다.",
      summary: "안정형의 마무리는 수익률보다 흔들리지 않는 구조를 만드는 것입니다.",
    },
  },
  balanced: {
    1: {
      concept: "균형형 투자는 안정성과 성장성을 함께 보는 방식입니다. 너무 방어적이면 수익 기회를 놓치고, 너무 공격적이면 변동성에 흔들릴 수 있습니다.",
      practice: "우량주, 성장주, 현금을 일정 비율로 나눠 시작합니다. 특정 종목이 크게 오르거나 내리면 비중이 무너졌는지 확인합니다.",
      summary: "균형형의 핵심은 좋은 종목보다 좋은 조합을 만드는 것입니다.",
    },
    2: {
      concept: "가치주는 현재 이익과 자산 대비 저평가된 종목이고, 성장주는 미래 매출과 이익 증가 기대가 큰 종목입니다. 두 스타일은 시장 상황에 따라 번갈아 강해집니다.",
      practice: "경기 둔화 국면에서는 가치주와 배당주 비중을, 성장 기대가 커지는 국면에서는 성장주 비중을 조금씩 조절합니다.",
      summary: "균형형은 가치주와 성장주 중 하나를 고르는 것이 아니라 둘의 비중을 관리합니다.",
    },
    3: {
      concept: "PER은 이익 대비 주가 수준, PBR은 자산 대비 주가 수준을 보는 지표입니다. 낮다고 무조건 싸고 높다고 무조건 비싼 것은 아닙니다.",
      practice: "동종 업계 평균과 비교하고, 이익이 성장 중인지 함께 확인합니다. 성장성이 높은 기업은 PER이 높아도 설명될 수 있습니다.",
      summary: "PER과 PBR은 단독 결론이 아니라 비교와 해석의 출발점입니다.",
    },
    4: {
      concept: "기술적 분석은 가격과 거래량으로 시장 참여자의 심리를 읽는 방법입니다. 균형형은 매수 타이밍 보조 도구로 활용합니다.",
      practice: "이동평균선이 상승 중인지, 거래량이 늘며 돌파하는지, 과열 구간은 아닌지 확인합니다. 지표만 믿고 기업 가치를 무시하지 않습니다.",
      summary: "균형형에게 차트는 판단의 전부가 아니라 진입 시점을 돕는 도구입니다.",
    },
    5: {
      concept: "포트폴리오는 여러 자산을 섞어 변동성을 낮추는 구조입니다. 종목 수만 많다고 분산 투자가 되는 것은 아닙니다.",
      practice: "업종, 스타일, 현금 비중을 나눠 관리합니다. 한쪽이 크게 커지면 일부를 줄이고 부족한 쪽을 채우는 리밸런싱을 합니다.",
      summary: "균형형의 완성은 종목 선택보다 비중 조절입니다.",
    },
  },
  aggressive: {
    1: {
      concept: "공격형 투자는 높은 성장 가능성에 더 큰 비중을 두는 방식입니다. 대신 손실 폭도 커질 수 있으므로 진입 전 손절 기준이 필요합니다.",
      practice: "테마나 성장 스토리만 보지 말고 매출 성장, 시장 크기, 경쟁력을 함께 확인합니다. 기대가 꺾이는 신호가 나오면 빠르게 점검합니다.",
      summary: "공격형은 과감함과 규칙이 함께 있어야 지속됩니다.",
    },
    2: {
      concept: "성장주는 현재보다 미래 실적이 빠르게 커질 것으로 기대되는 기업입니다. 높은 밸류에이션을 정당화할 만큼 성장률이 중요합니다.",
      practice: "매출 증가율, 영업이익 개선 가능성, 신규 시장 진입 여부를 봅니다. 단순히 많이 오른 종목을 성장주로 착각하지 않습니다.",
      summary: "성장주 발굴은 인기보다 실적 확장 가능성을 확인하는 과정입니다.",
    },
    3: {
      concept: "테마주는 특정 뉴스, 정책, 산업 변화에 따라 수급이 몰리는 종목입니다. 상승 속도가 빠른 만큼 하락도 빠를 수 있습니다.",
      practice: "테마의 지속 기간과 실제 수혜 기업인지 구분합니다. 이미 급등한 뒤 따라가기보다 거래량과 뉴스 강도를 확인합니다.",
      summary: "테마 투자는 이야기보다 실제 수혜와 수급 지속성이 중요합니다.",
    },
    4: {
      concept: "레버리지는 수익과 손실을 모두 키우는 도구입니다. 방향을 맞혀도 변동성이 크면 계좌가 크게 흔들릴 수 있습니다.",
      practice: "레버리지 상품은 전체 자금 중 일부만 사용하고, 손절 가격을 미리 정합니다. 물타기로 위험을 키우지 않습니다.",
      summary: "레버리지는 실력을 증명하는 도구가 아니라 위험을 빌리는 도구입니다.",
    },
    5: {
      concept: "고급 트레이딩은 모멘텀, 수급, 손익비를 함께 보는 전략입니다. 진입보다 청산 기준이 더 중요합니다.",
      practice: "목표 수익, 허용 손실, 보유 기간을 주문 전에 정합니다. 한 번의 큰 성공보다 반복 가능한 규칙을 만드는 데 집중합니다.",
      summary: "공격형의 마지막 단계는 감이 아니라 전략으로 매매하는 것입니다.",
    },
  },
  daytrader: {
    1: {
      concept: "단타 매매는 짧은 시간 안에 가격 변동을 활용하는 방식입니다. 수익 기회가 빠른 만큼 판단 실수도 빠르게 손실로 이어집니다.",
      practice: "매매 전 진입가, 손절가, 목표가를 정합니다. 장중 뉴스와 거래량 변화에 민감하게 반응하되 충동 매매를 피합니다.",
      summary: "단타형은 빠른 손보다 빠른 기준이 먼저입니다.",
    },
    2: {
      concept: "캔들은 일정 시간 동안의 시가, 고가, 저가, 종가를 보여줍니다. 몸통과 꼬리의 길이는 매수·매도 힘의 균형을 나타냅니다.",
      practice: "긴 양봉, 긴 윗꼬리, 거래량 동반 여부를 함께 봅니다. 캔들 하나만 보지 말고 직전 흐름과 지지·저항을 연결합니다.",
      summary: "캔들 분석은 모양 암기가 아니라 힘의 변화를 읽는 과정입니다.",
    },
    3: {
      concept: "볼린저 밴드는 가격이 평균에서 얼마나 벗어났는지 보여주는 지표입니다. 거래량은 그 움직임에 실제 참여가 있는지 확인하게 해줍니다.",
      practice: "밴드 상단 돌파가 거래량 증가와 함께 나오는지 봅니다. 거래량 없는 돌파는 속임수일 수 있어 추격을 조심합니다.",
      summary: "단타형은 가격 움직임과 거래량을 반드시 함께 봐야 합니다.",
    },
    4: {
      concept: "스캘핑은 매우 짧은 시간 안에 작은 수익을 반복적으로 노리는 전략입니다. 수수료, 호가 차이, 체결 속도가 결과에 큰 영향을 줍니다.",
      practice: "호가창에서 매수·매도 잔량 변화를 확인하고, 진입 후 계획과 다르면 즉시 정리합니다. 욕심내어 보유 시간을 늘리지 않습니다.",
      summary: "스캘핑은 작은 수익보다 작은 손실 관리가 핵심입니다.",
    },
    5: {
      concept: "실시간 시장 대응은 장중 흐름, 뉴스, 지수 움직임을 함께 보며 판단하는 단계입니다. 빠른 대응일수록 사전 기준이 필요합니다.",
      practice: "시장 전체가 약한 날에는 매매 횟수를 줄이고, 강한 테마에 수급이 몰릴 때만 후보를 좁힙니다. 손절 후 복수 매매를 피합니다.",
      summary: "단타형의 완성은 많이 매매하는 것이 아니라 좋은 상황만 골라 매매하는 것입니다.",
    },
  },
};

const quizByType: Record<InvestmentType, LessonContent["quiz"]> = {
  stable: [
    {
      question: "안정형 투자자가 종목을 볼 때 가장 먼저 확인해야 할 것은 무엇인가요?",
      options: ["최근 급등률", "재무 안정성과 손실 가능성", "커뮤니티 인기", "하루 거래대금"],
      correctAnswer: 1,
      explanation: "안정형은 수익 기회보다 감당 가능한 위험과 재무 안정성을 먼저 봅니다.",
    },
    {
      question: "배당주를 볼 때 배당수익률만 보면 위험한 이유는 무엇인가요?",
      options: ["배당금은 항상 오르기 때문에", "주가 하락으로 수익률만 높아졌을 수 있어서", "배당주는 거래가 불가능해서", "배당주는 모두 성장주라서"],
      correctAnswer: 1,
      explanation: "높은 배당수익률은 주가 급락의 결과일 수 있어 배당 지속 가능성을 함께 봐야 합니다.",
    },
    {
      question: "안정형 포트폴리오에 가장 어울리는 행동은 무엇인가요?",
      options: ["한 종목에 전액 투자", "현금과 우량주를 나눠 보유", "급등 테마만 추격", "손실이 나면 무조건 물타기"],
      correctAnswer: 1,
      explanation: "분산과 현금 비중은 안정형 투자자의 변동성 관리에 중요합니다.",
    },
  ],
  balanced: [
    {
      question: "균형형 투자자의 핵심 목표는 무엇인가요?",
      options: ["무조건 높은 수익", "위험과 수익의 균형", "매일 단타 매매", "현금만 보유"],
      correctAnswer: 1,
      explanation: "균형형은 수익 기회와 손실 가능성을 함께 관리합니다.",
    },
    {
      question: "PER과 PBR을 해석할 때 가장 적절한 방법은 무엇인가요?",
      options: ["숫자가 낮으면 무조건 매수", "동종 업계와 성장성을 함께 비교", "숫자가 높으면 무조건 매도", "차트와 관계없이 무시"],
      correctAnswer: 1,
      explanation: "PER/PBR은 업종, 성장성, 이익 안정성과 함께 비교해야 의미가 있습니다.",
    },
    {
      question: "리밸런싱이 필요한 상황은 언제인가요?",
      options: ["처음 산 비중이 크게 무너졌을 때", "주식 앱을 켤 때마다", "뉴스 제목이 길 때", "종목명이 마음에 안 들 때"],
      correctAnswer: 0,
      explanation: "균형형은 포트폴리오 비중이 한쪽으로 쏠릴 때 조정합니다.",
    },
  ],
  aggressive: [
    {
      question: "공격형 투자자가 성장주를 볼 때 가장 중요한 것은 무엇인가요?",
      options: ["현재 주가가 낮은지", "미래 실적이 커질 근거", "배당금이 많은지", "종목명이 익숙한지"],
      correctAnswer: 1,
      explanation: "성장주는 높은 기대를 정당화할 매출과 이익 성장 근거가 필요합니다.",
    },
    {
      question: "테마주 투자에서 가장 조심해야 할 점은 무엇인가요?",
      options: ["뉴스와 실제 수혜 기업을 구분하지 않는 것", "거래량을 확인하는 것", "손절 기준을 정하는 것", "분할 매수하는 것"],
      correctAnswer: 0,
      explanation: "테마와 관련이 있어 보여도 실제 실적 수혜가 약하면 급락 위험이 큽니다.",
    },
    {
      question: "레버리지 활용 전 반드시 정해야 할 것은 무엇인가요?",
      options: ["친구의 추천 종목", "손절 기준과 투자 비중", "가장 비싼 종목", "앱 배경색"],
      correctAnswer: 1,
      explanation: "레버리지는 손실도 커지므로 비중과 손절 기준이 먼저입니다.",
    },
  ],
  daytrader: [
    {
      question: "단타 매매 전에 먼저 정해야 하는 것은 무엇인가요?",
      options: ["진입가, 손절가, 목표가", "종목 게시판 분위기", "하루 종일 볼 종목 수", "가장 유명한 종목"],
      correctAnswer: 0,
      explanation: "단타형은 빠르게 대응해야 하므로 매매 전 기준이 명확해야 합니다.",
    },
    {
      question: "캔들 분석에서 긴 윗꼬리가 의미할 수 있는 것은 무엇인가요?",
      options: ["무조건 상승 지속", "위에서 매도 압력이 나왔을 가능성", "거래가 없었다는 뜻", "배당이 늘었다는 뜻"],
      correctAnswer: 1,
      explanation: "윗꼬리는 고가 부근에서 매도가 강해졌을 가능성을 보여줍니다.",
    },
    {
      question: "스캘핑에서 가장 위험한 행동은 무엇인가요?",
      options: ["작은 손실을 빠르게 인정", "계획보다 오래 붙잡기", "호가 흐름 확인", "수량을 작게 시작"],
      correctAnswer: 1,
      explanation: "스캘핑은 짧은 매매이므로 계획보다 오래 들고 가면 손실이 커질 수 있습니다.",
    },
  ],
};

const buildLesson = (lesson: LessonStep): LessonContent => {
  const detail = lessonDetails[lesson.type][lesson.step];
  const stepQuiz = {
    question: `${lesson.title} 단계의 핵심 목표로 가장 가까운 것은 무엇인가요?`,
    options: [
      "시장의 인기 종목을 그대로 따라 사기",
      lesson.description,
      "수익률이 가장 높은 종목에 전액 투자하기",
      "손실이 나면 기준 없이 계속 추가 매수하기",
    ],
    correctAnswer: 1,
    explanation: `${lesson.title}에서는 "${lesson.description}"을 중심으로 판단 기준을 세웁니다.`,
  };

  return {
    sections: [
      {
        title: `${lesson.step}단계 핵심 개념`,
        content: `${lesson.title}\n\n${detail.concept}`,
      },
      {
        title: "실전 적용 포인트",
        content: detail.practice,
      },
      {
        title: "핵심 정리",
        content: `• ${detail.summary}\n• 학습한 기준을 종목 리스트, 차트, 호가창, 주문 패널에서 직접 적용해봅니다.\n• 퀴즈를 통과하면 다음 단계 학습으로 이어집니다.`,
      },
    ],
    quiz: [
      stepQuiz,
      ...quizByType[lesson.type].slice(0, 2),
    ],
  };
};

export const lessonContent = Object.values(learningCurriculum)
  .flat()
  .reduce<Record<string, LessonContent>>((acc, lesson) => {
    acc[lesson.id] = buildLesson(lesson);
    return acc;
  }, {});

export const getCompletedLessons = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
};

export const isLearningCompleted = (type: InvestmentType | null) => {
  if (!type) return false;
  const completed = getCompletedLessons();
  return learningCurriculum[type].every((lesson) => completed.includes(lesson.id));
};
