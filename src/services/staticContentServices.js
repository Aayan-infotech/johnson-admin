import axios from 'axios';
import { API_BASE_URL } from '../utils/apiConfig';

export const fetchStaticPage = async (key) => {
  const res = await axios.get(`${API_BASE_URL}/static-page/get/${key}`);
  return res.data;
};

export const updateStaticPage = async (key, data) => {
  const res = await axios.put(`${API_BASE_URL}/static-page/update/${key}`, data);
  return res.data;
};
