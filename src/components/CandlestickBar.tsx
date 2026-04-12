// 캔들스틱 차트를 위한 커스텀 Bar 컴포넌트
export const CandlestickBar = (props: any) => {
  const { fill, x, y, width, height, payload } = props;
  
  if (!payload || typeof payload.open !== 'number' || typeof payload.close !== 'number') {
    return null;
  }
  
  const { open, high, low, close } = payload;
  const isPositive = close >= open;
  const color = isPositive ? '#ef4444' : '#3b82f6'; // 양봉: 빨강, 음봉: 파랑
  
  // 값 검증
  if (isNaN(open) || isNaN(close) || isNaN(high) || isNaN(low)) {
    return null;
  }
  
  // 스케일 계산
  const range = high - low;
  if (range === 0) return null;
  
  const chartHeight = height || 0;
  
  // Y 좌표 계산 (high를 기준으로)
  const yTop = y || 0;
  const scale = chartHeight / range;
  
  const highY = yTop;
  const lowY = yTop + chartHeight;
  const openY = yTop + (high - open) * scale;
  const closeY = yTop + (high - close) * scale;
  
  const bodyTop = Math.min(openY, closeY);
  const bodyHeight = Math.max(Math.abs(closeY - openY), 1);
  
  const wickX = (x || 0) + (width || 0) / 2;
  
  // 값 검증
  if (isNaN(wickX) || isNaN(highY) || isNaN(lowY) || isNaN(bodyTop) || isNaN(bodyHeight)) {
    return null;
  }
  
  return (
    <g>
      {/* 위아래 심지 (high-low 라인) */}
      <line
        x1={wickX}
        y1={highY}
        x2={wickX}
        y2={lowY}
        stroke={color}
        strokeWidth={1}
      />
      
      {/* 캔들 본체 */}
      <rect
        x={(x || 0)}
        y={bodyTop}
        width={Math.max((width || 0), 1)}
        height={bodyHeight}
        fill={color}
        stroke={color}
        strokeWidth={0}
      />
    </g>
  );
};
