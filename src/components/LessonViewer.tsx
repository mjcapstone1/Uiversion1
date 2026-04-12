import { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

interface LessonViewerProps {
  lesson: { id: string; title: string };
  onComplete?: (nextLesson?: { id: string; title: string }) => void;
  onClose: () => void;
}

const lessonContent: Record<string, { 
  sections: { title: string; content: string }[]; 
  quiz: { question: string; options: string[]; correctAnswer: number; explanation: string }[] 
}> = {
  // ==================== 안정형 투자자 커리큘럼 ====================
  'stable-1': {
    sections: [
      {
        title: '주식 가격은 왜 오르고 내릴까요?',
        content: `주식 가격은 단순히 운으로 움직이는 것이 아니에요.
기업의 가치와 사람들의 기대에 따라 변해요.

예를 들어,
• 어떤 회사의 실적이 좋아지면 → 사람들이 더 사고 싶어져요 → 가격이 올라요
• 반대로 실적이 나빠지면 → 팔려는 사람이 많아져요 → 가격이 내려요

👉 즉, "사고 싶은 사람이 많으면 가격이 오르고, 팔고 싶은 사람이 많으면 가격이 내려요"`,
      },
      {
        title: '시장(코스피 / 코스닥)은 무엇인가요?',
        content: `주식은 개인끼리 직접 거래하는 것이 아니라 '시장'이라는 곳에서 사고팔아요.

• 코스피: 규모가 큰 기업들이 모여 있는 시장이에요 (예: 삼성전자)
• 코스닥: 성장 가능성이 높은 기업들이 모여 있는 시장이에요

👉 시장이 중요한 이유는 전체 분위기가 주식 가격에 영향을 주기 때문이에요.

예를 들어,
• 경제 상황이 좋으면 → 전체적으로 주식이 오르는 경우가 많아요
• 경제 상황이 나쁘면 → 전체적으로 주식이 내려가는 경우가 많아요`,
      },
      {
        title: '핵심 정리',
        content: `• 주식 가격은 수요(사려는 사람)와 공급(팔려는 사람)으로 결정돼요
• 기업이 잘되면 가격이 오르고, 잘 안 되면 내려요
• 시장 전체 분위기도 가격에 영향을 줘요`,
      },
    ],
    quiz: [
      {
        question: '주식 가격이 오르는 가장 직접적인 이유는 무엇인가요?',
        options: [
          '정부 정책 때문이에요',
          '사고 싶은 사람이 많기 때문이에요',
          '회사 이름이 좋아서예요',
          '운이 좋아서예요',
        ],
        correctAnswer: 1,
        explanation: '주식 가격은 수요와 공급으로 결정돼요. 사고 싶은 사람이 많으면 (수요가 많으면) 가격이 올라갑니다!',
      },
      {
        question: '어떤 상황에서 주식 가격이 떨어질 가능성이 높을까요?',
        options: [
          '회사 실적이 좋아질 때예요',
          '사람들이 많이 살 때예요',
          '사람들이 많이 팔 때예요',
          '뉴스가 없을 때예요',
        ],
        correctAnswer: 2,
        explanation: '사람들이 많이 팔면 (공급이 많으면) 가격이 내려가요. 수요보다 공급이 많을 때 가격은 하락합니다!',
      },
      {
        question: '코스피 시장에 대한 설명으로 맞는 것은 무엇인가요?',
        options: [
          '작은 스타트업만 있는 시장이에요',
          '개인끼리 거래하는 공간이에요',
          '규모가 큰 기업들이 포함된 시장이에요',
          '외국 기업만 거래되는 시장이에요',
        ],
        correctAnswer: 2,
        explanation: '코스피는 삼성전자, 현대차 같은 규모가 큰 우량 기업들이 거래되는 시장입니다. 한국의 대표 주식시장이에요!',
      },
    ],
  },
  'stable-2': {
    sections: [
      {
        title: '리스크란 무엇인가요?',
        content: `투자에서 "리스크"는 돈을 잃을 수 있는 가능성을 의미해요.

주식은 가격이 계속 변하기 때문에 언제든지 손실이 발생할 수 있어요.

예를 들어 볼게요! 🤩
• 10만 원에 산 주식이 → 8만 원이 되면 → 2만 원 손실이에요
• 이런 가격 변동이 바로 리스크예요

👉 즉, "리스크는 수익이 아니라 손실이 날 수 있는 가능성이에요"`,
      },
      {
        title: '왜 분산 투자가 필요할까요?',
        content: `한 종목에만 투자하면 그 종목이 떨어질 때 큰 손실이 발생할 수 있어요.

그래서 여러 종목에 나누어 투자하는 "분산 투자"가 중요해요.

예를 들어 볼게요! 🤩
• 한 종목에 100% 투자 ❌ → 가격이 떨어지면 전체 손실
• 5개 종목에 나눠 투자 ⭕ → 한 종목이 떨어져도 전체 손실이 줄어들어요

👉 핵심은 "한 곳에 몰아서 투자하지 않는 것"이에요`,
      },
      {
        title: '안정형 투자자는 어떻게 투자할까요?',
        content: `안정형 투자자는 리스크를 줄이는 것을 가장 중요하게 생각해요.

그래서 이런 방법을 사용해요 😊
• 여러 종목에 나눠 투자해요
• ETF처럼 한 번에 분산된 상품을 활용해요
• 급격한 변동이 적은 종목을 선택해요`,
      },
    ],
    quiz: [
      {
        question: '투자에서 "리스크"의 의미로 가장 적절한 것은 무엇인가요?',
        options: [
          '높은 수익을 얻을 가능성이에요',
          '손실이 발생할 수 있는 가능성이에요',
          '주식 가격이 항상 오르는 것이에요',
          '정부 정책이에요',
        ],
        correctAnswer: 1,
        explanation: '리스크는 "손실 가능성"을 의미합니다. 투자에서 돈을 잃을 수 있는 위험을 리스크라고 해요.',
      },
      {
        question: '분산 투자가 필요한 이유는 무엇인가요?',
        options: [
          '수익을 무조건 늘리기 위해서예요',
          '투자 시간을 줄이기 위해서예요',
          '한 종목의 손실 위험을 줄이기 위해서예요',
          '거래를 많이 하기 위해서예요',
        ],
        correctAnswer: 2,
        explanation: '분산 투자는 한 종목이 떨어져도 다른 종목이 받쳐주어 전체 손실을 줄일 수 있어요. 계란을 한 바구니에 담지 말라는 말과 같아요!',
      },
      {
        question: '다음 중 더 안정적인 투자 방법은 무엇인가요?',
        options: [
          '한 종목에 전부 투자해요',
          '여러 종목에 나누어 투자해요',
          '아무 종목이나 선택해요',
          '가격이 가장 싼 주식만 사요',
        ],
        correctAnswer: 1,
        explanation: '여러 종목에 나누어 투자하면 한 종목의 손실을 다른 종목의 수익으로 상쇄할 수 있어 더 안정적입니다!',
      },
    ],
  },
  'stable-3': {
    sections: [
      {
        title: 'ETF란 무엇인가요?',
        content: `ETF는 한 번에 여러 종목에 투자할 수 있는 상품이에요.

쉽게 말하면, "여러 주식을 한 번에 담은 묶음 상품"이에요 😋

예를 들어 볼게요!
• 코스피 ETF를 사면 → 삼성전자, 현대차 등 여러 기업에 동시에 투자하는 효과가 있어요

👉 그래서 ETF는 자연스럽게 분산 투자가 되는 장점이 있어요`,
      },
      {
        title: '왜 ETF가 안정적인가요?',
        content: `ETF는 여러 종목이 섞여 있기 때문에 한 종목이 떨어져도 전체 영향이 줄어들어요.

예를 들어 볼게요! 😌
• 한 회사 주식만 가지고 있으면 → 그 회사가 떨어지면 큰 손실
• ETF를 가지고 있으면 → 일부만 영향 받음

👉 핵심은 "위험이 분산된다"는 점이에요`,
      },
      {
        title: '장기 투자는 무엇인가요?',
        content: `장기 투자는 짧은 기간이 아니라 오랜 시간 동안 투자하는 방법이에요.

주식 시장은 단기적으로는 오르내리지만 장기적으로는 성장하는 경우가 많아요.

예를 들어 볼게요! 😎
• 하루 단위 → 가격이 크게 흔들려요
• 1년 이상 → 전체적으로 성장하는 경우가 많아요

👉 그래서 안정형 투자자는 짧은 변동에 흔들리지 않고 오래 보유하는 전략을 사용해요`,
      },
    ],
    quiz: [
      {
        question: 'ETF에 대한 설명으로 가장 적절한 것은 무엇인가요?',
        options: [
          '한 회사에만 투자하는 상품이에요',
          '여러 종목에 한 번에 투자하는 상품이에요',
          '하루만 투자하는 방식이에요',
          '무조건 수익이 나는 상품이에요',
        ],
        correctAnswer: 1,
        explanation: 'ETF는 Exchange Traded Fund의 약자로, 여러 주식을 모아놓은 묶음 상품입니다. 한 번에 분산 투자 효과를 얻을 수 있어요!',
      },
      {
        question: 'ETF가 비교적 안정적인 이유는 무엇인가요?',
        options: [
          '가격이 절대 떨어지지 않아요',
          '정부가 보장해줘요',
          '여러 종목에 분산되어 있기 때문이에요',
          '거래가 불가능해요',
        ],
        correctAnswer: 2,
        explanation: 'ETF는 여러 종목에 분산 투자되어 있어서 한 종목이 떨어져도 전체적인 영향이 적습니다. 이것이 안정성의 핵심이에요!',
      },
      {
        question: '장기 투자에 대한 설명으로 맞는 것은 무엇인가요?',
        options: [
          '하루 안에 사고파는 투자예요',
          '가격이 오를 때만 투자하는 방식이에요',
          '오랜 기간 동안 꾸준히 투자하는 방법이에요',
          '무조건 단기 수익을 노리는 방식이에요',
        ],
        correctAnswer: 2,
        explanation: '장기 투자는 최소 3년 이상, 5~10년 동안 투자하는 방식입니다. 단기 변동에 흔들리지 않고 기업의 성장을 믿고 기다리는 것이 핵심이에요!',
      },
    ],
  },
  'stable-4': {
    sections: [
      {
        title: '이제 직접 투자해 볼까요?',
        content: `지금까지 배운 내용을 바탕으로 직접 안정적인 투자 포트폴리오를 만들어 볼 거예요 😉

👉 포트폴리오란?
여러 종목을 어떻게 나누어 투자할지 구성하는 것이에요`,
      },
      {
        title: '안정형 포트폴리오는 이렇게 만들어요',
        content: `안정형 투자자는 리스크를 줄이는 것이 가장 중요해요

그래서 이렇게 구성해요 😁
• ETF 중심으로 투자해요
• 여러 종목에 나누어 투자해요
• 한 종목 비중을 너무 높게 하지 않아요`,
      },
      {
        title: '예시 포트폴리오',
        content: `예를 들어 볼게요! 🧐

• ETF 60%
• 대형 우량주 30%
• 현금 10%

👉 이렇게 하면 한쪽이 떨어져도 전체 손실을 줄일 수 있어요`,
      },
    ],
    quiz: [
      {
        question: '안정형 포트폴리오 구성에서 ETF 비중으로 적절한 것은?',
        options: ['10%', '30%', '60%', '100%'],
        correctAnswer: 2,
        explanation: '안정형 투자자는 ETF를 60% 정도 포트폴리오의 중심으로 구성하는 것이 좋습니다. 자동으로 분산 투자 효과를 얻을 수 있어요!',
      },
      {
        question: '포트폴리오에서 현금을 일부 보유하는 이유는?',
        options: [
          '아무 의미 없어요',
          '급락 시 매수 기회를 위해서예요',
          '이자를 많이 받기 위해서예요',
          '주식이 무서워서예요',
        ],
        correctAnswer: 1,
        explanation: '현금 10% 정도를 보유하면 시장이 급락했을 때 좋은 기업을 저렴하게 살 수 있는 기회를 잡을 수 있습니다!',
      },
      {
        question: '안정형 투자자가 가장 피해야 할 행동은?',
        options: [
          '장기 보유하기',
          '한 종목에 전부 투자하기',
          'ETF 투자하기',
          '분산 투자하기',
        ],
        correctAnswer: 1,
        explanation: '안정형 투자자는 절대 한 종목에 전부 투자하면 안 됩니다. 그 종목이 급락하면 전체 자산이 큰 손실을 입을 수 있어요!',
      },
    ],
  },
  'stable-5': {
    sections: [
      {
        title: '실습 미션 - 안정형 포트폴리오 구성하기',
        content: `🎯 미션
안정형 포트폴리오를 직접 구성해 보세요! 🥳

이렇게 추천해요:
• 최소 3개 이상 종목 선택하기
• ETF 1개 이상 포함하기
• 한 종목 비중 50% 이하로 설정하기`,
      },
      {
        title: '안정형 투자의 핵심 원칙 복습',
        content: `1. 분산 투자
   - 최소 5개 이상 종목
   - 한 종목 최대 20%
   
2. 장기 보유
   - 최소 3년 이상
   - 단기 변동 무시
   
3. 배당 재투자
   - 받은 배당금으로 추가 매수
   - 복리 효과 극대화`,
      },
    ],
    quiz: [
      {
        question: '안정형 투자자의 연간 목표 수익률은?',
        options: ['1~2%', '3~5%', '20~30%', '50% 이상'],
        correctAnswer: 1,
        explanation: '안정형 투자자는 연 3~5%의 안정적인 수익을 목표로 합니다. 높은 수익보다 원금 보존이 우선이에요!',
      },
      {
        question: '안정형 투자의 최소 권장 투자 기간은?',
        options: ['1개월', '6개월', '3년', '10년'],
        correctAnswer: 2,
        explanation: '안정형 투자는 최소 3년 이상 장기 보유하는 것이 좋습니다. 단기 변동에 흔들리지 않고 꾸준히 투자해요!',
      },
      {
        question: '포트폴리오 리밸런싱은 얼마나 자주 해야 하나요?',
        options: ['매일', '매주', '분기별 (3개월)', '10년에 한 번'],
        correctAnswer: 2,
        explanation: '분기별(3개월)로 포트폴리오를 점검하고 목표 비율로 조정하는 것이 좋습니다. 너무 자주 하면 수수료가 많이 나가요!',
      },
    ],
  },

  // ==================== 균형형 투자자 커리큘럼 ====================
  'balanced-1': {
    sections: [
      {
        title: '좋은 기업은 무엇인가요?',
        content: `주식 투자를 할 때는 좋은 기업을 선택하는 것이 중요해요

좋은 기업은 보통 이런 특징이 있어요 😀
• 꾸준히 돈을 잘 버는 기업이에요
• 앞으로 성장할 가능성이 있어요`,
      },
      {
        title: 'PER이란 무엇인가요?',
        content: `PER은 "이 기업이 벌어들이는 돈에 비해 주가가 얼마나 높은지"를 보여 주는 지표예요

👉 쉽게 말하면
• PER이 낮으면 → 상대적으로 저평가된 상태일 수 있어요
• PER이 높으면 → 성장 기대가 반영된 경우가 많아요`,
      },
      {
        title: 'ROE란 무엇인가요?',
        content: `ROE는 "회사가 얼마나 효율적으로 돈을 벌고 있는지"를 나타내요

👉 쉽게 말하면
• ROE가 높을수록 → 돈을 잘 버는 기업이에요`,
      },
    ],
    quiz: [
      {
        question: '좋은 기업의 특징으로 가장 적절한 것은 무엇인가요?',
        options: [
          '가격이 싼 기업이에요',
          '꾸준히 돈을 잘 버는 기업이에요',
          '이름이 유명한 기업이에요',
          '뉴스에 많이 나오는 기업이에요',
        ],
        correctAnswer: 1,
        explanation: '좋은 기업은 꾸준히 이익을 내는 기업입니다. 단순히 유명하거나 뉴스에 많이 나온다고 좋은 기업은 아니에요!',
      },
      {
        question: 'PER이 의미하는 것은 무엇인가요?',
        options: [
          '회사의 직원 수예요',
          '주식 거래량이에요',
          '기업 가치 대비 주가 수준이에요',
          '기업의 위치예요',
        ],
        correctAnswer: 2,
        explanation: 'PER은 주가수익비율로, 기업이 벌어들이는 이익 대비 주가가 얼마나 높은지를 나타냅니다. 기업 가치를 판단하는 중요한 지표에요!',
      },
      {
        question: 'ROE가 높은 기업은 어떤 특징이 있나요?',
        options: [
          '돈을 잘 벌지 못해요',
          '효율적으로 수익을 내요',
          '주가가 항상 떨어져요',
          '거래가 안 돼요',
        ],
        correctAnswer: 1,
        explanation: 'ROE가 높다는 것은 자기자본(주주 돈)으로 효율적으로 이익을 창출한다는 의미입니다. 좋은 기업의 특징이에요!',
      },
    ],
  },
  'balanced-2': {
    sections: [
      {
        title: '성장주와 안정주는 무엇인가요?',
        content: `주식은 크게 두 가지로 나눌 수 있어요 😊

• 성장주: 앞으로 크게 성장할 가능성이 있는 기업이에요
• 안정주: 비교적 안정적으로 수익을 내는 기업이에요`,
      },
      {
        title: '왜 둘을 나눠서 투자할까요?',
        content: `한쪽에만 투자하면 리스크가 커질 수 있어요.

👉 그래서 성장 + 안정을 함께 가져가는 것이 중요해요`,
      },
      {
        title: '핵심 개념',
        content: `• 성장주는 수익 가능성이 높지만 변동성이 커요
• 안정주는 수익은 적지만 안정적이에요
• 두 가지를 함께 투자하면 균형을 맞출 수 있어요`,
      },
    ],
    quiz: [
      {
        question: '성장주의 특징으로 맞는 것은 무엇인가요?',
        options: [
          '변동성이 낮아요',
          '수익이 항상 일정해요',
          '성장 가능성이 높아요',
          '가격이 항상 낮아요',
        ],
        correctAnswer: 2,
        explanation: '성장주는 미래 성장 가능성이 높은 기업의 주식입니다. 변동성은 높지만 큰 수익을 기대할 수 있어요!',
      },
      {
        question: '안정주의 특징은 무엇인가요?',
        options: [
          '변동성이 매우 커요',
          '안정적인 수익을 기대할 수 있어요',
          '항상 급등해요',
          '거래가 불가능해요',
        ],
        correctAnswer: 1,
        explanation: '안정주는 성장성은 낮지만 꾸준하고 안정적인 수익을 기대할 수 있습니다. 배당도 정기적으로 받을 수 있어요!',
      },
      {
        question: '균형형 투자자가 해야 할 방법은 무엇인가요?',
        options: [
          '한 종목만 투자해요',
          '성장주만 투자해요',
          '안정주만 투자해요',
          '성장주와 안정주를 함께 투자해요',
        ],
        correctAnswer: 3,
        explanation: '균형형 투자자는 성장주와 안정주를 적절히 섞어서 투자합니다. 안정성과 수익성의 균형을 맞추는 것이 핵심이에요!',
      },
    ],
  },
  'balanced-3': {
    sections: [
      {
        title: '포트폴리오란 무엇인가요?',
        content: `포트폴리오는 어떤 종목에 얼마씩 투자할지 구성하는 것이에요.`,
      },
      {
        title: '자산 배분이 중요한 이유',
        content: `자산을 어떻게 나누느냐에 따라 수익과 리스크가 달라져요.

👉 예를 들어 볼게요!
안정 50% + 성장 50% → 안정성과 수익을 함께 가져갈 수 있어요`,
      },
      {
        title: '리밸런싱이란 무엇인가요?',
        content: `리밸런싱은 투자 비율을 다시 맞추는 과정이에요.

예를 들어 😊
• 성장주가 너무 많이 올라서 비중이 커지면 → 일부를 팔고 안정주를 늘려요`,
      },
    ],
    quiz: [
      {
        question: '포트폴리오의 의미는 무엇인가요?',
        options: [
          '주식 가격이에요',
          '투자 구성 방법이에요',
          '거래 시간이에요',
          '회사 이름이에요',
        ],
        correctAnswer: 1,
        explanation: '포트폴리오는 여러 종목을 어떤 비율로 투자할지 구성하는 것입니다. 투자 전략의 핵심이에요!',
      },
      {
        question: '자산 배분이 중요한 이유는 무엇인가요?',
        options: [
          '거래를 많이 하기 위해서예요',
          '수익과 리스크를 조절하기 위해서예요',
          '가격을 올리기 위해서예요',
          '뉴스 때문이에요',
        ],
        correctAnswer: 1,
        explanation: '자산을 어떻게 배분하느냐에 따라 수익률과 리스크 수준이 결정됩니다. 균형 잡힌 배분이 중요해요!',
      },
      {
        question: '리밸런싱의 의미는 무엇인가요?',
        options: [
          '주식을 모두 파는 것이에요',
          '투자 비율을 다시 맞추는 것이에요',
          '새로운 계좌를 만드는 것이에요',
          '거래를 멈추는 것이에요',
        ],
        correctAnswer: 1,
        explanation: '리밸런싱은 시간이 지나며 변한 투자 비율을 원래 목표로 다시 조정하는 것입니다. 주기적으로 해주는 것이 좋아요!',
      },
    ],
  },
  'balanced-4': {
    sections: [
      {
        title: '이제 균형형 포트폴리오를 만들어 볼까요?',
        content: `지금까지 배운 내용을 바탕으로 안정성과 수익을 함께 고려한 투자를 해볼 거예요 😊`,
      },
      {
        title: '균형형 투자 방법',
        content: `균형형 투자자는 이렇게 투자해요 😊

• 성장주와 안정주를 함께 선택해요
• 비율을 나누어 투자해요
• 주기적으로 비율을 조정해요`,
      },
      {
        title: '예시 포트폴리오',
        content: `• 안정주 50%
• 성장주 50%

👉 상황에 따라 조절할 수 있어요`,
      },
    ],
    quiz: [
      {
        question: '균형형 포트폴리오의 이상적인 구성은?',
        options: [
          '안정주 100%',
          '안정주 50%, 성장주 50%',
          '성장주 100%',
          '현금 100%',
        ],
        correctAnswer: 1,
        explanation: '균형형은 안정주와 성장주를 50:50 정도로 균형있게 구성하는 것이 이상적입니다. 두 마리 토끼를 잡는 전략이에요!',
      },
      {
        question: '포트폴리오 조정은 얼마나 자주 해야 하나요?',
        options: ['매일', '매주', '주기적으로 (분기별)', '절대 안 함'],
        correctAnswer: 2,
        explanation: '3개월(분기)마다 포트폴리오를 점검하고 목표 비율로 조정하는 것이 좋습니다. 너무 자주 하면 수수료만 많이 나가요!',
      },
      {
        question: '균형형 투자자의 핵심 원칙은?',
        options: [
          '한 종목만 집중',
          '성장과 안정의 균형',
          '무조건 고위험',
          '거래하지 않기',
        ],
        correctAnswer: 1,
        explanation: '균형형 투자자는 성장성과 안정성의 균형을 맞추는 것이 핵심입니다. 너무 보수적이지도, 공격적이지도 않게!',
      },
    ],
  },
  'balanced-5': {
    sections: [
      {
        title: '실습 미션 - 균형형 포트폴리오 구성하기',
        content: `🎯 미션
균형형 포트폴리오를 구성해 보세요 😊

조건:
• 성장주 + 안정주 모두 포함하기
• 최소 3개 이상 종목 선택하기
• 한쪽 비중이 70%를 넘지 않도록 하기`,
      },
      {
        title: '균형형 투자 핵심 정리',
        content: `1. 가치주 + 성장주 혼합
   - 안정성과 성장성 동시 추구
   
2. 적절한 자산 배분
   - 50:50 또는 40:40:20(현금)
   
3. 정기적 리밸런싱
   - 분기별 점검 및 조정`,
      },
    ],
    quiz: [
      {
        question: '균형형 투자자의 목표 수익률은?',
        options: ['3~5%', '7~12%', '20~30%', '50% 이상'],
        correctAnswer: 1,
        explanation: '균형형 투자자는 연 7~12% 정도의 합리적인 수익을 목표로 합니다. 안정형보다 높고, 공격형보다 낮은 중간 수준이에요!',
      },
      {
        question: '균형형 포트폴리오의 핵심은?',
        options: [
          '한 종목 집중',
          '성장주와 안정주의 균형',
          '무조건 안전',
          '투자하지 않기',
        ],
        correctAnswer: 1,
        explanation: '균형형의 핵심은 성장주와 안정주를 적절히 섞어서 안정성과 수익성의 균형을 맞추는 것입니다!',
      },
      {
        question: '리밸런싱을 하는 이유는?',
        options: [
          '수수료 내기 위해',
          '목표 비율 유지하기 위해',
          '매매 재미로',
          '세금 절감',
        ],
        correctAnswer: 1,
        explanation: '시간이 지나면 주가 변동으로 비율이 변하므로, 주기적으로 목표 비율로 되돌려야 합니다. 이것이 리밸런싱이에요!',
      },
    ],
  },

  // ==================== 공격형 투자자 커리큘럼 ====================
  'aggressive-1': {
    sections: [
      {
        title: '주식 시장은 왜 크게 움직일까요?',
        content: `주식 시장은 기업뿐만 아니라 뉴스와 이슈에 크게 영향을 받아요.

예를 들어 볼게요 😊
• 새로운 기술 발표 → 관련 기업 주가 상승
• 경제 위기 뉴스 → 전체 시장 하락

👉 즉, "뉴스와 이슈가 투자 기회를 만들어요"`,
      },
      {
        title: '테마주란 무엇인가요?',
        content: `테마주는 특정 이슈나 트렌드와 관련된 주식이에요.

예를 들어 😊
• AI 관련 뉴스 → AI 관련 기업 상승
• 전기차 이슈 → 배터리 기업 상승

👉 그래서 공격형 투자자는 이런 흐름을 빠르게 파악하는 것이 중요해요`,
      },
      {
        title: '핵심 정리',
        content: `• 주식은 뉴스와 이슈에 영향을 받아요
• 특정 이슈와 관련된 종목을 테마주라고 해요
• 흐름을 빠르게 읽는 것이 중요해요`,
      },
    ],
    quiz: [
      {
        question: '주식 시장이 크게 움직이는 이유로 맞는 것은 무엇인가요?',
        options: [
          '항상 일정하게 움직여요',
          '뉴스와 이슈의 영향을 받아요',
          '랜덤으로만 움직여요',
          '개인만 영향을 줘요',
        ],
        correctAnswer: 1,
        explanation: '주식 시장은 경제 뉴스, 정책, 기술 트렌드 등 다양한 이슈에 민감하게 반응합니다. 이것이 시장이 크게 움직이는 이유에요!',
      },
      {
        question: '테마주에 대한 설명으로 맞는 것은 무엇인가요?',
        options: [
          '항상 가격이 고정되어 있어요',
          '특정 이슈와 관련된 주식이에요',
          '거래가 불가능해요',
          '수익이 없는 주식이에요',
        ],
        correctAnswer: 1,
        explanation: '테마주는 특정 이슈(AI, 전기차, 바이오 등)와 연관된 주식입니다. 해당 이슈가 화제가 되면 함께 상승하는 경향이 있어요!',
      },
      {
        question: '공격형 투자자에게 중요한 것은 무엇인가요?',
        options: [
          '아무 생각 없이 투자하기',
          '뉴스와 흐름을 빠르게 파악하기',
          '한 종목만 무조건 오래 보유하기',
          '거래를 하지 않기',
        ],
        correctAnswer: 1,
        explanation: '공격형 투자자는 시장 트렌드와 이슈를 빠르게 파악하고, 적절한 타이밍에 진입/탈출하는 것이 중요합니다!',
      },
    ],
  },
  'aggressive-2': {
    sections: [
      {
        title: '왜 위험한 투자에서 큰 수익이 날까요?',
        content: `주식에서 위험이 클수록 수익 가능성도 커지는 경우가 많아요.

예를 들어 볼게요 🤩
• 변동이 큰 주식 → 가격이 빠르게 오를 수도 있어요
• 변동이 작은 주식 → 안정적이지만 수익도 제한적이에요

👉 핵심은 "리스크가 곧 기회가 될 수 있다"는 점이에요`,
      },
      {
        title: '변동성이란 무엇인가요?',
        content: `변동성은 가격이 얼마나 크게 움직이는지를 의미해요.

• 변동성이 크다 → 가격이 많이 오르내려요
• 변동성이 작다 → 가격 변화가 적어요`,
      },
      {
        title: '공격형 투자자의 특징',
        content: `공격형 투자자는 😊

• 높은 수익을 목표로 해요
• 변동성이 큰 종목을 선택해요
• 리스크를 감수하는 투자 방식을 사용해요`,
      },
    ],
    quiz: [
      {
        question: '변동성이 크다는 것은 무엇을 의미하나요?',
        options: [
          '가격이 거의 변하지 않아요',
          '가격이 크게 오르내려요',
          '거래가 안 돼요',
          '항상 상승해요',
        ],
        correctAnswer: 1,
        explanation: '변동성이 크다는 것은 주가가 크게 오르락내리락한다는 의미입니다. 위험하지만 큰 수익의 기회도 있어요!',
      },
      {
        question: '위험이 큰 투자에서 수익 가능성이 큰 이유는 무엇인가요?',
        options: [
          '항상 손실이 나기 때문이에요',
          '가격 변화가 크기 때문이에요',
          '거래가 없기 때문이에요',
          '정부가 보장하기 때문이에요',
        ],
        correctAnswer: 1,
        explanation: '변동성이 크면 가격이 빠르게 오를 수도 있어서 큰 수익의 기회가 있습니다. 물론 반대로 빠르게 떨어질 위험도 있어요!',
      },
      {
        question: '공격형 투자자의 특징으로 맞는 것은 무엇인가요?',
        options: [
          '안정적인 투자만 해요',
          '변동성이 낮은 종목만 선택해요',
          '리스크를 감수해요',
          '투자하지 않아요',
        ],
        correctAnswer: 2,
        explanation: '공격형 투자자는 높은 수익을 위해 리스크를 적극적으로 감수합니다. High Risk, High Return!',
      },
    ],
  },
  'aggressive-3': {
    sections: [
      {
        title: '공격형 투자 전략은 무엇인가요?',
        content: `공격형 투자자는 수익을 극대화하기 위한 전략을 사용해요 😊

주요 전략:
✔️ 트렌드 투자 → 현재 인기 있는 산업이나 이슈에 투자해요
✔️ 집중 투자 → 여러 종목이 아니라 소수 종목에 크게 투자해요
✔️ 타이밍 투자 → 상승할 시점을 보고 빠르게 진입해요`,
      },
      {
        title: '왜 집중 투자를 할까요?',
        content: `종목을 많이 나누면 안정적이지만 수익이 크게 나기 어려워요.

👉 그래서 공격형 투자자는 소수 종목에 집중해서 높은 수익을 노려요`,
      },
      {
        title: '핵심 정리',
        content: `• 트렌드, 타이밍, 집중 투자가 중요해요
• 수익을 극대화하는 전략이에요
• 대신 리스크도 커요`,
      },
    ],
    quiz: [
      {
        question: '공격형 투자 전략으로 맞는 것은 무엇인가요?',
        options: [
          '분산 투자만 하기',
          '트렌드 투자하기',
          '거래 안 하기',
          '한 종목만 소액 투자하기',
        ],
        correctAnswer: 1,
        explanation: '공격형 투자자는 현재 유행하는 트렌드나 테마를 빠르게 파악하고 진입하는 것이 중요합니다!',
      },
      {
        question: '집중 투자의 특징은 무엇인가요?',
        options: [
          '모든 종목에 나눠 투자해요',
          '소수 종목에 크게 투자해요',
          '투자하지 않아요',
          '가격을 고정해요',
        ],
        correctAnswer: 1,
        explanation: '집중 투자는 3~5개 정도의 소수 종목에 큰 금액을 투자하는 것입니다. 확신이 있을 때 과감하게!',
      },
      {
        question: '공격형 투자에서 중요한 요소는 무엇인가요?',
        options: [
          '타이밍',
          '무조건 장기 보유',
          '거래 금지',
          '뉴스 무시',
        ],
        correctAnswer: 0,
        explanation: '공격형 투자는 적절한 타이밍에 진입하고 빠르게 탈출하는 것이 핵심입니다. 타이밍이 수익을 결정해요!',
      },
    ],
  },
  'aggressive-4': {
    sections: [
      {
        title: '이제 공격형 투자를 해볼까요?',
        content: `지금까지 배운 내용을 바탕으로 높은 수익을 목표로 한 투자를 직접해 볼 거예요 😎

👉 그래서 공격형 투자자는 소수 종목에 집중해서 높은 수익을 노려요`,
      },
      {
        title: '공격형 포트폴리오는 이렇게 구성해요',
        content: `공격형 투자자는 수익을 극대화하는 것을 목표로 해요

그래서 이렇게 투자해요 😁
• 소수 종목에 집중 투자해요
• 트렌드 산업 중심으로 선택해요
• 타이밍을 고려해요`,
      },
      {
        title: '예시 포트폴리오',
        content: `예를 들어 볼게요 🤩

• 성장주 70%
• 테마주 30%

👉 집중 투자로 수익을 크게 노릴 수 있어요`,
      },
    ],
    quiz: [
      {
        question: '공격형 투자 전략으로 맞는 것은 무엇인가요?',
        options: [
          '분산 투자만 하기',
          '트렌드 투자하기',
          '거래 안 하기',
          '한 종목만 소액 투자하기',
        ],
        correctAnswer: 1,
        explanation: '공격형 투자자는 트렌드를 빠르게 파악하고 집중 투자합니다. 소수 종목에 과감하게!',
      },
      {
        question: '집중 투자의 특징은 무엇인가요?',
        options: [
          '모든 종목에 나눠 투자해요',
          '소수 종목에 크게 투자해요',
          '투자하지 않아요',
          '가격을 고정해요',
        ],
        correctAnswer: 1,
        explanation: '집중 투자는 1~3개 종목에 큰 비중으로 투자하는 것입니다. 확신이 있을 때만!',
      },
      {
        question: '공격형 투자에서 중요한 요소는 무엇인가요?',
        options: [
          '타이밍',
          '무조건 장기 보유',
          '거래 금지',
          '뉴스 무시',
        ],
        correctAnswer: 0,
        explanation: '공격형 투자는 진입과 탈출 타이밍이 수익을 결정합니다. 빠른 판단이 중요해요!',
      },
    ],
  },
  'aggressive-5': {
    sections: [
      {
        title: '실습 미션 - 공격형 포트폴리오 구성하기',
        content: `🎯 미션
공격형 포트폴리오를 구성해보세요 😊

조건:
• 1~3개 종목 선택하기 (집중 투자)
• 성장주 또는 테마주 포함하기
• 한 종목 비중이 높아도 괜찮아요

⚠️ 높은 수익을 목표로 한 투자를 직접해 볼 거예요 😎`,
      },
      {
        title: '공격형 투자 핵심 정리',
        content: `1. 트렌드 파악
   - 시장 이슈 빠르게 포착
   
2. 집중 투자
   - 소수 종목에 큰 비중
   
3. 타이밍 중시
   - 적절한 진입/탈출
   
4. 리스크 감수
   - 높은 변동성 수용`,
      },
    ],
    quiz: [
      {
        question: '공격형 투자자의 목표 수익률은?',
        options: ['3~5%', '7~12%', '15~30%', '100% 이상'],
        correctAnswer: 2,
        explanation: '공격형 투자자는 연 15~30% 이상의 고수익을 목표로 합니다. 물론 그만큼 리스크도 높아요!',
      },
      {
        question: '공격형 포트폴리오의 적정 종목 수는?',
        options: ['1~3개', '10~20개', '50개 이상', '투자하지 않음'],
        correctAnswer: 0,
        explanation: '공격형은 1~3개의 소수 종목에 집중 투자합니다. 확신 있는 종목에 과감하게!',
      },
      {
        question: '공격형 투자의 핵심은?',
        options: [
          '무조건 장기 보유',
          '트렌드와 타이밍',
          '안정성만 추구',
          '투자하지 않기',
        ],
        correctAnswer: 1,
        explanation: '공격형 투자의 핵심은 트렌드를 빠르게 파악하고 적절한 타이밍에 진입/탈출하는 것입니다!',
      },
    ],
  },

  // ==================== 단타형 투자자 커리큘럼 ====================
  'daytrader-1': {
    sections: [
      {
        title: '단타 투자는 무엇인가요?',
        content: `단타 투자는 짧은 시간 안에 사고파는 투자 방식이에요

예를 들어 볼게요 😊
• 오늘 사고 → 오늘 파는 경우
• 몇 분, 몇 시간 안에 거래하기도 해요

👉 즉, "짧은 시간 동안 가격 차이로 수익을 내는 투자"예요`,
      },
      {
        title: '왜 가격이 짧게 움직일까요?',
        content: `주식 가격은 짧은 시간에도 사람들의 심리와 거래량에 따라 계속 변해요

예를 들어 🧐
• 사람들이 갑자기 많이 사면 → 가격이 빠르게 올라요
• 사람들이 많이 팔면 → 가격이 빠르게 내려요`,
      },
      {
        title: '핵심 정리',
        content: `• 단타는 짧은 시간에 사고파는 투자예요
• 가격은 실시간으로 계속 변해요
• 빠른 판단이 중요해요`,
      },
    ],
    quiz: [
      {
        question: '단타 투자에 대한 설명으로 맞는 것은 무엇인가요?',
        options: [
          '몇 년 동안 보유하는 투자예요',
          '짧은 시간 안에 사고파는 투자예요',
          '거래를 하지 않는 투자예요',
          '무조건 안전한 투자예요',
        ],
        correctAnswer: 1,
        explanation: '단타 투자는 하루 안에, 심지어 몇 시간 또는 몇 분 안에 매매를 완료하는 초단기 투자입니다!',
      },
      {
        question: '단타 투자에서 중요한 요소는 무엇인가요?',
        options: [
          '느린 판단',
          '빠른 판단',
          '장기 보유',
          '거래 안 하기',
        ],
        correctAnswer: 1,
        explanation: '단타는 몇 분 안에 상황이 바뀔 수 있어서 빠른 판단과 실행이 생명입니다!',
      },
      {
        question: '짧은 시간 가격이 움직이는 이유는 무엇인가요?',
        options: [
          '항상 일정해서예요',
          '사람들의 거래와 심리 때문이에요',
          '정부 때문이에요',
          '랜덤이에요',
        ],
        correctAnswer: 1,
        explanation: '단기 가격 변동은 실시간 거래와 투자자들의 심리에 크게 영향을 받습니다. 수급이 곧 가격이에요!',
      },
    ],
  },
  'daytrader-2': {
    sections: [
      {
        title: '차트는 무엇인가요?',
        content: `차트는 주식 가격의 움직임을 그래프로 보여주는 도구예요

👉 단타 투자에서는 차트를 보고 판단하는 것이 중요해요 😊`,
      },
      {
        title: '캔들이란 무엇인가요?',
        content: `캔들은 일정 시간 동안의 가격 변화를 보여주는 표시예요

• 빨간색(양봉): 가격 상승
• 파란색(음봉): 가격 하락`,
      },
      {
        title: '거래량이란 무엇인가요?',
        content: `거래량은 얼마나 많은 사람들이 사고팔았는지를 의미해요

👉 거래량이 많으면 가격이 크게 움직일 가능성이 있어요`,
      },
    ],
    quiz: [
      {
        question: '차트의 역할은 무엇인가요?',
        options: [
          '회사 이름 보여주기',
          '가격 흐름 보여주기',
          '거래 막기',
          '뉴스 제공',
        ],
        correctAnswer: 1,
        explanation: '차트는 주가의 흐름을 시각적으로 보여줍니다. 단타 투자자의 필수 도구에요!',
      },
      {
        question: '캔들(양봉)은 무엇을 의미하나요?',
        options: [
          '가격 하락',
          '거래 중지',
          '가격 상승',
          '변화 없음',
        ],
        correctAnswer: 2,
        explanation: '양봉(빨간색)은 종가가 시가보다 높은 것으로 가격 상승을 의미합니다!',
      },
      {
        question: '거래량이 많다는 것은 무엇을 의미하나요?',
        options: [
          '거래가 없음',
          '사람들이 많이 사고팔았어요',
          '가격이 고정됨',
          '시장이 닫힘',
        ],
        correctAnswer: 1,
        explanation: '거래량이 많다는 것은 많은 사람들이 활발하게 거래했다는 의미입니다. 가격 변동의 힘이 되죠!',
      },
    ],
  },
  'daytrader-3': {
    sections: [
      {
        title: '타이밍이란 무엇인가요?',
        content: `단타 투자에서 가장 중요한 것은 "언제 사고 언제 파는지"예요.`,
      },
      {
        title: '지지선과 저항선',
        content: `• 지지선: 가격이 잘 떨어지지 않는 구간이에요
• 저항선: 가격이 잘 올라가지 않는 구간이에요

👉 이 구간을 기준으로 매매를 판단해요 🤓`,
      },
      {
        title: '투자 심리 이해하기',
        content: `단타에서 중요한 것은 사람들의 심리예요

예를 들어 🧐
• 가격이 오르면 → 더 오를 것 같아 사고 싶어요
• 가격이 떨어지면 → 무서워서 팔고 싶어요

👉 이 감정을 잘 조절하는 것이 중요해요`,
      },
    ],
    quiz: [
      {
        question: '단타 투자에서 가장 중요한 요소는 무엇인가요?',
        options: [
          '장기 보유',
          '타이밍',
          '뉴스',
          '기업 분석',
        ],
        correctAnswer: 1,
        explanation: '단타는 적절한 타이밍에 진입하고 빠르게 탈출하는 것이 수익의 핵심입니다!',
      },
      {
        question: '지지선의 의미는 무엇인가요?',
        options: [
          '가격이 계속 오르는 구간',
          '가격이 잘 떨어지지 않는 구간',
          '거래가 없는 구간',
          '시장 종료',
        ],
        correctAnswer: 1,
        explanation: '지지선은 가격이 떨어지다가 반등하는 지점입니다. 매수 타이밍을 잡는 중요한 기준점이에요!',
      },
      {
        question: '단타 투자에서 중요한 것은 무엇인가요?',
        options: [
          '감정에 따라 투자하기',
          '감정을 조절하기',
          '아무 생각 없이 투자하기',
          '거래 안 하기',
        ],
        correctAnswer: 1,
        explanation: '단타는 감정에 휘둘리면 손실이 커집니다. 미리 정한 원칙대로 기계적으로 매매해야 해요!',
      },
    ],
  },
  'daytrader-4': {
    sections: [
      {
        title: '이제 단타 투자를 해볼까요?',
        content: `지금까지 배운 내용을 바탕으로 짧은 시간 동안 매매를 직접 해 볼 거예요 🤑`,
      },
      {
        title: '단타 투자 방법',
        content: `단타 투자자는 이렇게 투자해요 😄

• 차트를 보고 매수 타이밍을 잡아요
• 짧은 시간 안에 매도해요
• 손실이 커지기 전에 빠르게 정리해요`,
      },
      {
        title: '예시 전략',
        content: `예를 들어 볼게요! 😏

• 지지선 근처에서 매수
• 가격이 오르면 매도
• 일정 손실(-3% 등)에서 손절

⚠️ 욕심을 부리지 않는 것이 중요해요`,
      },
    ],
    quiz: [
      {
        question: '단타 투자에서 가장 중요한 요소는 무엇인가요?',
        options: [
          '장기 보유',
          '타이밍',
          '뉴스',
          '기업 분석',
        ],
        correctAnswer: 1,
        explanation: '단타는 타이밍이 전부입니다. 몇 분 차이로 수익과 손실이 결정돼요!',
      },
      {
        question: '지지선의 의미는 무엇인가요?',
        options: [
          '가격이 계속 오르는 구간',
          '가격이 잘 떨어지지 않는 구간',
          '거래가 없는 구간',
          '시장 종료',
        ],
        correctAnswer: 1,
        explanation: '지지선은 매수 관심이 많아 가격이 잘 떨어지지 않는 구간입니다. 매수 타이밍의 기준점!',
      },
      {
        question: '단타 투자에서 중요한 것은 무엇인가요?',
        options: [
          '감정에 따라 투자하기',
          '감정을 조절하기',
          '아무 생각 없이 투자하기',
          '거래 안 하기',
        ],
        correctAnswer: 1,
        explanation: '단타는 감정 조절이 생명입니다. 욕심과 공포를 제어해야 성공할 수 있어요!',
      },
    ],
  },
  'daytrader-5': {
    sections: [
      {
        title: '실습 미션 - 단타 매매 연습하기',
        content: `🎯 미션
단타 매매를 직접해 보세요 😊

조건:
• 하루 2~3번 매매하기
• 손절 기준 설정하기 (예: -3%)
• 수익 목표 설정하기 (예: +3%)

⚠️ 중요: 욕심을 부리지 않는 것이 중요해요`,
      },
      {
        title: '단타 투자 핵심 정리',
        content: `1. 차트 분석
   - 캔들과 거래량 확인
   
2. 타이밍 포착
   - 지지/저항선 활용
   
3. 빠른 실행
   - 주저하지 않고 매매
   
4. 감정 통제
   - 손절 기준 엄수
   
⚠️ 단타는 매우 어렵고 위험한 투자입니다!`,
      },
    ],
    quiz: [
      {
        question: '단타 투자의 적정 손절 기준은?',
        options: ['-1~3%', '-10%', '-30%', '손절하지 않음'],
        correctAnswer: 0,
        explanation: '단타는 -1~3% 정도에서 빠르게 손절해야 합니다. 손실을 최소화하는 것이 중요해요!',
      },
      {
        question: '단타 투자에서 가장 중요한 것은?',
        options: [
          '장기 보유',
          '빠른 판단과 실행',
          '기업 분석',
          '배당',
        ],
        correctAnswer: 1,
        explanation: '단타는 빠른 판단과 실행이 생명입니다. 몇 초의 차이가 수익을 결정해요!',
      },
      {
        question: '단타 투자의 성공률은?',
        options: ['90% 이상', '50~70%', '10~20%', '0%'],
        correctAnswer: 2,
        explanation: '현실적으로 단타 투자자의 10~20%만 지속적으로 수익을 냅니다. 매우 어려운 투자 방식이에요!',
      },
    ],
  },
};

export function LessonViewer({ lesson, onComplete, onClose }: LessonViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // lesson이 바뀔 때 모든 state 초기화 (1단계 → 2단계 등 전환 시)
  useEffect(() => {
    setCurrentSection(0);
    setShowQuiz(false);
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setQuizResults([]);
    setShowExplanation(false);
  }, [lesson.id]);

  const content = lessonContent[lesson.id] || lessonContent['stable-1'];
  const sections = content.sections;
  const quizzes = content.quiz;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // 이미 선택함
    
    setSelectedAnswer(index);
    const correct = index === quizzes[currentQuiz].correctAnswer;
    setShowExplanation(true);
    
    // 결과 저장
    const newResults = [...quizResults];
    newResults[currentQuiz] = correct;
    setQuizResults(newResults);
  };

  const handleNextQuiz = () => {
    if (currentQuiz < quizzes.length - 1) {
      // 다음 퀴즈로
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
    // 마지막 퀴즈면 여기서 아무것도 하지 않음 (완료 화면 유지)
  };

  const handleRetryQuiz = () => {
    // 퀴즈 다시 도전
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setQuizResults([]);
    setShowExplanation(false);
  };

  const handleNextLesson = () => {
    // localStorage에 완료 기록
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lesson.id)) {
      completedLessons.push(lesson.id);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    }

    // 다음 레슨 ID 계산
    const parts = lesson.id.split('-');
    const type = parts[0];
    const currentNum = parseInt(parts[1]);
    const nextNum = currentNum + 1;
    
    if (nextNum <= 5) {
      const nextLesson = { 
        id: `${type}-${nextNum}`, 
        title: `${nextNum}단계 학습` 
      };
      if (onComplete) {
        onComplete(nextLesson);
      }
    } else {
      // 마지막 단계면 그냥 닫기
      if (onComplete) {
        onComplete();
      }
    }
  };

  // 마지막 퀴즈이고 답변을 선택했으면 완료
  const allQuizzesComplete = currentQuiz === quizzes.length - 1 && selectedAnswer !== null;
  const allCorrect = quizResults.length === quizzes.length && quizResults.every(r => r === true);

  if (showQuiz) {
    const quiz = quizzes[currentQuiz];
    const isCorrect = selectedAnswer === quiz.correctAnswer;

    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* 상단 닫기 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">퀴즈 {currentQuiz + 1} / {quizzes.length}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="나가기"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">학습한 내용을 확인해보세요!</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{quiz.question}</h3>
            
            <div className="space-y-3">
              {quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full rounded-xl px-6 py-4 text-left font-medium transition-all ${
                    selectedAnswer === null
                      ? 'bg-white hover:bg-blue-100 border-2 border-gray-200 hover:border-blue-400'
                      : selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-500 text-white border-2 border-green-600'
                        : 'bg-red-500 text-white border-2 border-red-600'
                      : index === quiz.correctAnswer
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && !allQuizzesComplete && (
            <div className={`rounded-xl p-6 mb-4 ${
              isCorrect 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-yellow-50 border-2 border-yellow-200'
            }`}>
              <div className="text-4xl mb-2 text-center">{isCorrect ? '🎉' : '📚'}</div>
              <h3 className={`text-xl font-bold mb-2 text-center ${
                isCorrect ? 'text-green-900' : 'text-yellow-900'
              }`}>
                {isCorrect ? '정답입니다!' : '오답입니다!'}
              </h3>
              <p className={`text-center mb-3 ${isCorrect ? 'text-green-700' : 'text-yellow-800'}`}>
                {quiz.explanation}
              </p>
            </div>
          )}

          {allQuizzesComplete && (
            <>
              <div className={`rounded-xl p-6 mb-6 text-center ${
                allCorrect
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
              }`}>
                <div className="text-5xl mb-3">{allCorrect ? '🎊' : '💪'}</div>
                <h3 className={`text-2xl font-bold mb-2 ${allCorrect ? 'text-green-900' : 'text-blue-900'}`}>
                  {allCorrect ? '완벽합니다!' : '학습 완료!'}
                </h3>
                <p className={allCorrect ? 'text-green-700 mb-2' : 'text-blue-700 mb-2'}>
                  {allCorrect 
                    ? `${quizzes.length}개 퀴즈를 모두 맞추셨습니다!` 
                    : `${quizResults.filter(r => r).length}/${quizzes.length} 정답`}
                </p>
                <p className="text-sm text-gray-600">
                  {allCorrect ? '다음 단계로 진행하세요!' : '틀린 문제를 다시 복습하시겠어요?'}
                </p>
              </div>

              {/* 완료 후 버튼들 */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-4 font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  나가기
                </button>

                {!allCorrect && (
                  <button
                    onClick={handleRetryQuiz}
                    className="flex-1 rounded-xl border-2 border-blue-600 bg-white px-6 py-4 font-bold text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="h-5 w-5" />
                    다시 도전
                  </button>
                )}

                <button
                  onClick={handleNextLesson}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-bold text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {(() => {
                    const parts = lesson.id.split('-');
                    const currentNum = parseInt(parts[1]);
                    return currentNum < 5 ? '다음 단계로 →' : '학습 완료 ✓';
                  })()}
                </button>
              </div>
            </>
          )}

          {/* 퀴즈 진행 중 버튼들 */}
          {!allQuizzesComplete && (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-4 font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                나가기
              </button>

              {showExplanation && (
                <button
                  onClick={handleNextQuiz}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-bold text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  다음 퀴즈 →
                </button>
              )}
            </div>
          )}
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
          <h1 className="text-lg font-bold text-gray-900">{lesson.title}</h1>
          <div className="w-10" />
        </div>
        
        {/* 진행바 */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
            {currentSection + 1} / {sections.length}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {sections[currentSection].title}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {sections[currentSection].content}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          {currentSection < sections.length - 1 ? '다음' : '퀴즈 풀기'}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}