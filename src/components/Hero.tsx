import { motion } from 'motion/react';
import { TrendingUp, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            투자를 배우는 가장 쉬운 방법
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-gray-600">
            AI가 함께하는 금융 학습과 실전 같은 투자 시뮬레이터로
            <br />
            안전하게 투자를 연습하고 배워 보세요
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-blue-600 px-8 py-4 text-white transition-all hover:bg-blue-700 hover:shadow-lg">
              시작하기
            </button>
            <button className="rounded-full border-2 border-gray-300 px-8 py-4 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50">
              더 알아보기
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 shadow-2xl"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-2 text-blue-600">📈</div>
              <div className="mb-1">실시간 시뮬레이션</div>
              <p className="text-sm text-gray-600">실제 시장 데이터로 연습</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-2 text-purple-600">🤖</div>
              <div className="mb-1">AI 금융 멘토</div>
              <p className="text-sm text-gray-600">맞춤형 학습 가이드</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-2 text-green-600">💰</div>
              <div className="mb-1">리스크 없는 학습</div>
              <p className="text-sm text-gray-600">가상 자금으로 안전하게</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
