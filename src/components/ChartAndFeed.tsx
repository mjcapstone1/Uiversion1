import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Newspaper, Flame } from 'lucide-react';

const newsFeeds = [
  {
    id: '1',
    title: '삼성전자, AI 반도체 신제품 공개',
    summary: '차세대 AI 칩셋 발표로 주가 상승세',
    time: '10분 전',
    category: '기업',
    isHot: true,
  },
  {
    id: '2',
    title: 'SK하이닉스, HBM 수요 급증',
    summary: 'NVIDIA향 공급 확대 소식',
    time: '25분 전',
    category: '반도체',
    isHot: true,
  },
  {
    id: '3',
    title: 'NAVER, AI 검색 서비스 출시',
    summary: '생성형 AI 기반 검색 혁신',
    time: '1시간 전',
    category: 'IT',
    isHot: false,
  },
  {
    id: '4',
    title: '현대차, 전기차 판매 20% 증가',
    summary: '유럽 시장에서 호조세',
    time: '2시간 전',
    category: '자동차',
    isHot: false,
  },
  {
    id: '5',
    title: 'KB금융, 배당 확대 발표',
    summary: '주주환원 정책 강화',
    time: '3시간 전',
    category: '금융',
    isHot: false,
  },
];

interface ChartAndFeedProps {
  onStockClick: (stockName: string) => void;
}

export function ChartAndFeed({ onStockClick }: ChartAndFeedProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = [];
    const baseValue = 2500;
    for (let i = 0; i < 20; i++) {
      data.push({
        time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15}`,
        value: baseValue + Math.random() * 50 - 25,
      });
    }
    setChartData(data);

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        newData.push({
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          value: lastValue + (Math.random() - 0.5) * 10,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* 차트 카드 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">코스피 실시간</h3>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">+0.28%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">2,501.24</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                stroke="#e5e7eb"
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                stroke="#e5e7eb"
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 뉴스 피드 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">최신 뉴스</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
          {newsFeeds.map((news) => (
            <div
              key={news.id}
              className="p-6 hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {news.isHot && (
                      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        <Flame className="h-3 w-3" />
                        HOT
                      </span>
                    )}
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {news.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                  <span className="text-xs text-gray-500">{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}