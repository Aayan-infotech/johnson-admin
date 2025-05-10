import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import FAQaccordion from "./FAQaccordion";
import { API_BASE_URL } from "../../utils/apiConfig";
import { showSuccessToast } from "../../Toast";

// Example fallback in case currentColor isn't from context/props
const currentColor = "#3f51b5"; // You can replace this with actual color management logic

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const FAQ = () => {
  const [faqs, setFAQs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFAQ, setEditFAQ] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchFAQs = useCallback(async () => {
    try {
      toast.dismiss();
      const res = await axios.get(`${API_BASE_URL}/faq/admin/get-faq`);
      setFAQs(res.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs.");
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const onSubmit = async (data) => {
    console.log(API_BASE_URL);
    try {
      setLoading(true);
      if (editFAQ) {
        const res = await axios.put(`${API_BASE_URL}/faq/admin/update-faq/${editFAQ.id}`,
          data
        );
        showSuccessToast(res.data.message || "FAQ updated successfully");
      } else {
        const res = await axios.post(
          `${API_BASE_URL}/faq/admin/create-faq`,
          data
        );
        showSuccessToast(res.data.message || "FAQ created successfully");
      }
      reset({ question: "", answer: "" });
      setEditFAQ(null);
      setIsModalOpen(false);
      fetchFAQs();
    } catch (error) {
      console.error(error);
      toast.error("Error saving FAQ");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFAQ = (faq) => {
    setEditFAQ(faq);
    reset({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const handleModalFalse = () => {
    reset({ question: "", answer: "" });
    setEditFAQ(null);
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ m: 2, p: 4, bgcolor: "grey.100", borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          FAQ Management
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: currentColor }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create FAQ
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          FAQ List
        </Typography>
        {faqs.length === 0 ? (
          <Typography>No FAQs available.</Typography>
        ) : (
          <FAQaccordion
            fetchFAQs={fetchFAQs}
            handleEditFAQ={handleEditFAQ}
            faqs={faqs}
          />
        )}
      </Paper>

      <Modal open={isModalOpen} onClose={handleModalFalse}>
        <Box sx={modalStyle}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {editFAQ ? "Edit FAQ" : "Create FAQ"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Question Title"
              {...register("question", {
                required: "Question title is required",
              })}
              error={!!errors.question}
              helperText={errors.question?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Answer"
              {...register("answer", {
                required: "Answer is required",
              })}
              error={!!errors.answer}
              helperText={errors.answer?.message}
              margin="normal"
            />

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleModalFalse}
                sx={{ mr: 2 }}
                variant="outlined"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: currentColor }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : editFAQ ? (
                  "Update FAQ"
                ) : (
                  "Create FAQ"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default FAQ;
