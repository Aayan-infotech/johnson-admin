import axios from 'axios';
import { API_BASE_URL } from '../utils/apiConfig';

export const fetchStaticPage = async (slug) => {
  const res = await axios.get(`${API_BASE_URL}/static-page/get/${slug}`);
  return res.data;
};

export const updateStaticPage = async (slug, data) => {
  const res = await axios.post(`${API_BASE_URL}/static-page/update/${slug}`, data);
  return res.data;
};
