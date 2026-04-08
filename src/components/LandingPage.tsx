import { TrendingUp, BookOpen, ChevronRight, BarChart3, Shield, Brain, Rocket, Users, Clock, CheckCircle, ArrowRight, Star, Sparkles, Target } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-2">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                FinVest
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-20 px-8 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽 콘텐츠 */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-100">
                <Sparkles className="h-4 w-4" />
                AI 기반 투자 학습 플랫폼
              </div>

              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                투자의 시작,
                <br />
                <span className="text-blue-600">
                  FinVest와 함께
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                실전 투자 전에 안전하게 배우고 연습하세요.<br />
                AI가 당신의 투자 성향에 맞는 맞춤형 교육을 제공합니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStart}
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-[1.02]"
                >
                  지금 시작하기
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* 간단한 특징 */}
              <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>완전 무료</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>간편한 시작</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>실전 시뮬레이션</span>
                </div>
              </div>
            </div>

            {/* 오른쪽 - 모형 UI 카드 */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-3xl opacity-30" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4">
                {/* 모의 차트 */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">총 자산</div>
                    <div className="text-3xl font-bold text-gray-900">₩52,480,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">수익률</div>
                    <div className="text-2xl font-bold text-emerald-600">+4.96%</div>
                  </div>
                </div>

                {/* 간단한 차트 시각화 */}
                <div className="h-40 bg-gray-50 rounded-xl p-4 flex items-end gap-2">
                  {[40, 65, 45, 80, 60, 85, 70, 95, 75, 90, 85, 100].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-600 rounded-t transition-all hover:bg-blue-700" 
                      style={{ height: `${height}%` }} 
                    />
                  ))}
                </div>

                {/* 주식 항목들 */}
                <div className="space-y-2">
                  {[
                    { name: '삼성전자', price: '₩71,200', change: '+2.4%', positive: true },
                    { name: 'NAVER', price: '₩234,500', change: '+1.8%', positive: true },
                    { name: 'SK하이닉스', price: '₩142,000', change: '-0.7%', positive: false },
                  ].map((stock, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="font-semibold text-gray-900">{stock.name}</div>
                      <div className="flex items-center gap-3">
                        <div className="text-gray-700">{stock.price}</div>
                        <div className={`font-semibold ${stock.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                          {stock.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-24 px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 FinVest를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              초보자부터 전문가까지, 모두를 위한 완벽한 투자 학습 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 특징 1 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <Brain className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI 맞춤형 학습</h3>
              <p className="text-gray-600 leading-relaxed">
                당신의 투자 성향을 AI가 분석하여 최적화된 학습 경로를 추천합니다. 
                개인별 맞춤 커리큘럼으로 더 빠르게 성장하세요.
              </p>
            </div>

            {/* 특징 2 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                <BarChart3 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">실전 시뮬레이터</h3>
              <p className="text-gray-600 leading-relaxed">
                실시간 차트, 호가창, 거래 시스템까지 실제와 동일한 환경에서 
                리스크 없이 자유롭게 연습할 수 있습니다.
              </p>
            </div>

            {/* 특징 3 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100">
                <Shield className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">안전한 학습 환경</h3>
              <p className="text-gray-600 leading-relaxed">
                실제 돈을 사용하지 않고 가상 자금으로 연습하세요. 
                실패도 배움이 되는 안전한 투자 연습장입니다.
              </p>
            </div>

            {/* 특징 4 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                <Rocket className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">빠른 성장</h3>
              <p className="text-gray-600 leading-relaxed">
                체계적인 학습 로드맵과 실전 연습을 통해 
                단기간에 투자 전문가로 성장할 수 있습니다.
              </p>
            </div>

            {/* 특징 5 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100">
                <Target className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">체계적 커리큘럼</h3>
              <p className="text-gray-600 leading-relaxed">
                기초부터 고급까지 단계별로 구성된 학습 과정으로 
                탄탄한 투자 실력을 쌓아갈 수 있습니다.
              </p>
            </div>

            {/* 특징 6 */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100">
                <Clock className="h-7 w-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">언제 어디서나</h3>
              <p className="text-gray-600 leading-relaxed">
                모바일과 데스크톱 모두 지원하여 
                원하는 시간과 장소에서 자유롭게 학습할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 학습 프로세스 */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3단계로 시작하는 투자 여정
            </h2>
            <p className="text-xl text-gray-600">
              간단한 프로세스로 누구나 쉽게 시작할 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg relative z-10">
                <div className="text-3xl font-bold text-white">1</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">투자 성향 분석</h3>
                <p className="text-gray-600 leading-relaxed">
                  간단한 질문으로 당신의 투자 스타일을 파악하고 
                  맞춤형 학습 경로를 설계합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 shadow-lg relative z-10">
                <div className="text-3xl font-bold text-white">2</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">맞춤형 교육</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI가 추천하는 학습 코스로 투자의 기초부터 
                  고급 전략까지 체계적으로 배웁니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 shadow-lg relative z-10">
                <div className="text-3xl font-bold text-white">3</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">실전 연습</h3>
                <p className="text-gray-600 leading-relaxed">
                  시뮬레이터에서 배운 내용을 실전처럼 적용하고 
                  실시간 피드백으로 실력을 향상시킵니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            지금 바로 투자 학습을 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            성공적인 투자자로의 첫 걸음, FinVest와 함께하세요
          </p>

          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 rounded-xl bg-white px-10 py-5 text-xl font-bold text-blue-600 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            시작하기
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-center justify-center gap-8 text-white mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>신용카드 불필요</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>5분이면 시작</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>평생 무료</span>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-blue-600 p-1.5">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FinVest</span>
              </div>
              <p className="text-sm">
                AI 기반 투자 시뮬레이터 &<br />
                금융 학습 플랫폼
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">학습</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">투자 기초</a></li>
                <li><a href="#" className="hover:text-white transition-colors">기술적 분석</a></li>
                <li><a href="#" className="hover:text-white transition-colors">포트폴리오 관리</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">리소스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">가이드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">커뮤니티</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            © 2024 FinVest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}