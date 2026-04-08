import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, BarChart3, Brain } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '안전한 학습 환경',
    description: '실제 돈을 잃을 걱정 없이 가상 자금으로 투자 전략을 테스트하세요',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: '실시간 시장 반영',
    description: '실제 주식 시장 데이터를 기반으로 현실적인 투자 경험을 제공합니다',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: BarChart3,
    title: '상세한 분석 리포트',
    description: '투자 성과를 분석하고 개선점을 찾아 실력을 향상시키세요',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Brain,
    title: 'AI 기반 추천',
    description: '인공지능이 당신의 투자 패턴을 분석하고 맞춤형 조언을 제공합니다',
    color: 'from-purple-500 to-pink-600',
  },
];

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="px-6 py-20 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">왜 선택해야 할까요?</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            투자 초보자부터 경험자까지, 모두를 위한 완벽한 학습 플랫폼
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl bg-gray-50 p-8 transition-all hover:bg-white hover:shadow-xl"
            >
              <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
