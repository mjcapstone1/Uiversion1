// src/api/stockApi.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/stocks';

// 🔥 공통 변환 함수 (백엔드 → 프론트 맞추기)
const transformStock = (item: any) => ({
  name: item.name,
  code: item.code,
  price: Number(item.price || 0),
  volume: Number(item.volume || 0),
  rate: Number(item.rate || 0),
});

// 🔥 전체 종목
export const getAllStocks = async () => {
  const res = await axios.get(`${API_BASE_URL}/all`);
  return res.data.map(transformStock);
};

// 🔥 거래량 TOP
export const getTopVolumeStocks = async () => {
  const res = await axios.get(`${API_BASE_URL}/volume`);
  return res.data.map(transformStock);
};

// 🔥 급등 TOP
export const getTopGainers = async () => {
  const res = await axios.get(`${API_BASE_URL}/gainers`);
  return res.data.map(transformStock);
};