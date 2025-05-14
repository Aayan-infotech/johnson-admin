import React, { useState, useEffect } from 'react';
import {
  Box, Button, IconButton, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import FaqModal from '../../components/faqModal';
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../src/Toast";
import { API_BASE_URL } from '../../utils/apiConfig';

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: '', answer: '' });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/faq/admin/get-faq`);
      const data = await response.json();
      setFaqs(data.data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error.message);
      showErrorToast("Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq = { id: null, question: '', answer: '' }) => {
    setCurrentFaq(faq);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentFaq({ id: null, question: '', answer: '' });
  };

  const handleSaveFaq = async () => {
    try {
      if (currentFaq.id) {
        const response = await axios.put(`${API_BASE_URL}/faq/admin/update-faq/${currentFaq.id}`, {
          question: currentFaq.question,
          answer: currentFaq.answer
        });

        if (response.status === 200) {
          showSuccessToast("FAQ updated successfully!");
          fetchFaqs();
          handleCloseModal();
        } else {
          showErrorToast("Failed to update FAQ.");
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/faq/admin/create-faq`, {
          question: currentFaq.question,
          answer: currentFaq.answer
        });

        if (response.status === 201 || response.status === 200) {
          showSuccessToast('FAQ added successfully!');
          fetchFaqs(); // Refresh FAQ list
          handleCloseModal();
        } else {
          showErrorToast('Failed to add FAQ.');
        }
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      showErrorToast("Failed to save FAQ");
    }
  };

  const handleDeleteFaq = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/faq/admin/delete-faq/${id}`);

        if (response.data.status === 200) {
          showSuccessToast('FAQ deleted successfully!');
          setFaqs(prev => prev.filter(f => f.id !== id));
        } else {
          showErrorToast('Failed to delete FAQ.');
        }
      } catch (error) {
        console.error('Delete FAQ error:', error);
        showErrorToast('An error occurred while deleting FAQ.');
      }
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">FAQ Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()}>
          Add FAQ
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id || faq._id}>
                <TableCell>{faq.question?.en || faq.question || 'N/A'}</TableCell>
                <TableCell>{faq.answer?.en || faq.answer || 'N/A'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenModal({
                    id: faq.id || faq._id,
                    question: faq.question?.en || faq.question,
                    answer: faq.answer?.en || faq.answer
                  })}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteFaq(faq.id || faq._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {faqs.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No FAQs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <FaqModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveFaq}
        faq={currentFaq}
        setFaq={setCurrentFaq}
      />
    </Box>
  );
};

export default FaqManagement;
