import axios from "axios";

const BASE_URL = "http://localhost:8080/api/stocks";

export const getTopVolumeStocks = async () => {
  const res = await axios.get(`${BASE_URL}/top-volume`);
  return res.data;
};

export const getTopGainers = async () => {
  const res = await axios.get(`${BASE_URL}/top-gainers`);
  return res.data;
}