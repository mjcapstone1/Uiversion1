import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndexData {
  name: string;
  subtitle: string;
  value: number;
  baseValue: number;
  change: number;
  percent: number;
  isUp: boolean;
}

const initialIndices: IndexData[] = [
  {
    name: '코스피 종합',
    subtitle: 'KOSPI',
    value: 2501.24,
    baseValue: 2494.14,
    change: 7.10,
    percent: 0.28,
    isUp: true,
  },
  {
    name: '코스닥',
    subtitle: 'KOSDAQ',
    value: 721.58,
    baseValue: 718.34,
    change: 3.24,
    percent: 0.45,
    isUp: true,
  },
  {
    name: 'KRX 300',
    subtitle: '한국 대표 300개 종목',
    value: 1245.67,
    baseValue: 1240.23,
    change: 5.44,
    percent: 0.44,
    isUp: true,
  },
];

export function MarketIndices() {
  const [indices, setIndices] = useState<IndexData[]>(initialIndices);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prevIndices =>
        prevIndices.map(index => {
          const randomChange = (Math.random() - 0.5) * 0.006;
          const newValue = index.value * (1 + randomChange);
          const change = newValue - index.baseValue;
          const percent = (change / index.baseValue) * 100;

          return {
            ...index,
            value: newValue,
            change: change,
            percent: percent,
            isUp: change > 0,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number) => {
    return value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change: number) => {
    return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  };

  const formatPercent = (percent: number) => {
    return percent >= 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">주요 지수</h2>
      <div className="grid grid-cols-3 gap-6">
        {indices.map((index, i) => (
          <div key={i} className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">{index.name}</div>
                <div className="text-xs text-gray-500">{index.subtitle}</div>
              </div>
              <div className={`rounded-lg p-2 ${index.isUp ? 'bg-emerald-100' : 'bg-red-100'}`}>
                {index.isUp ? (
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{formatValue(index.value)}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-medium ${index.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatChange(index.change)}
              </span>
              <span className={`font-medium ${index.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatPercent(index.percent)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}