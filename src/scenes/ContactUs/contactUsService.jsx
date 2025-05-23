// components/ContactUs/ContactUsService.js
import axios from 'axios';
import { API_BASE_URL } from "../../utils/apiConfig";

export const fetchContacts = async () => {
  const response = await axios.get(`${API_BASE_URL}/contact-us`);
  return response.data.contacts;
};

export const deleteContact = async (id) => {
  await axios.delete(`${API_BASE_URL}/contact-us/${id}`);
};

export const sendReply = async (id, replyMessage) => {
  await axios.post(`${API_BASE_URL}/contact-us/reply/${id}`, {
    reply: replyMessage
  });
};