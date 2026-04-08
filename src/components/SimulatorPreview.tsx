import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function SimulatorPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600 px-6 py-20 text-white md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-white">
              실전 같은
              <br />
              투자 시뮬레이터
            </h2>
            <p className="mb-8 text-blue-100">
              실제 시장 데이터를 활용한 리얼타임 투자 시뮬레이션으로
              위험 없이 투자 전략을 테스트하고 실력을 키우세요.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <div>
                  <div className="mb-1">가상 자금 1억원 제공</div>
                  <p className="text-sm text-blue-100">원하는 만큼 연습하세요</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <div>
                  <div className="mb-1">실시간 주가 변동</div>
                  <p className="text-sm text-blue-100">실제 시장처럼 작동합니다</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <div>
                  <div className="mb-1">포트폴리오 분석</div>
                  <p className="text-sm text-blue-100">수익률과 리스크를 한눈에</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">내 포트폴리오</span>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="mb-6">
              <div className="mb-1 text-gray-500">총 자산</div>
              <div className="mb-1 text-gray-900">₩127,450,000</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                +27.45% (+₩27,450,000)
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-gray-900">삼성전자</span>
                  <span className="text-green-600">+12.3%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">50주</span>
                  <span className="text-gray-900">₩3,650,000</span>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-gray-900">NAVER</span>
                  <span className="text-red-600">-3.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">30주</span>
                  <span className="text-gray-900">₩5,820,000</span>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-gray-900">카카오</span>
                  <span className="text-green-600">+8.7%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">100주</span>
                  <span className="text-gray-900">₩4,230,000</span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-white transition-all hover:shadow-lg">
              시뮬레이터 시작하기
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
