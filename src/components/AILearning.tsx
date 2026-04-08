import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, BookOpen, Trophy, Lightbulb } from 'lucide-react';

export function AILearning() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="px-6 py-20 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-8">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm text-gray-500">AI 멘토</div>
                    <p className="text-gray-900">
                      포트폴리오가 IT 업종에 과도하게 집중되어 있어요. 
                      다른 업종도 고려해보는 것이 좋겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm text-gray-500">학습 추천</div>
                    <p className="text-gray-900">
                      '분산 투자의 중요성' 강의를 추천드려요.
                      당신의 투자 스타일에 딱 맞는 내용입니다!
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm text-gray-500">성과 분석</div>
                    <p className="text-gray-900">
                      이번 달 수익률 상위 15%! 
                      꾸준한 학습이 좋은 결과를 만들어내고 있어요 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="mb-6">
              AI가 함께하는
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                맞춤형 금융 교육
              </span>
            </h2>
            <p className="mb-8 text-gray-600">
              당신의 투자 수준과 목표에 맞춘 개인화된 학습 경험을 제공합니다.
              AI 멘토가 실시간으로 피드백하고 최적의 학습 경로를 안내합니다.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <BookOpen className="mt-1 h-6 w-6 shrink-0 text-purple-600" />
                <div>
                  <div className="mb-1">단계별 커리큘럼</div>
                  <p className="text-sm text-gray-600">
                    기초부터 고급까지 체계적인 학습 과정
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                <div>
                  <div className="mb-1">실시간 AI 피드백</div>
                  <p className="text-sm text-gray-600">
                    투자 결정마다 즉각적인 조언과 분석
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <Trophy className="mt-1 h-6 w-6 shrink-0 text-green-600" />
                <div>
                  <div className="mb-1">성과 트래킹</div>
                  <p className="text-sm text-gray-600">
                    학습 진도와 투자 실력 향상 추적
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
