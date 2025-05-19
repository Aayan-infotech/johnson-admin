import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/apiConfig";

const ContactUs = () => {
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

  // Fetch FAQs from API
  const fetchFAQs = useCallback(async () => {
    try {
      toast.dismiss();
      const faqData = await axios.get(
        `${API_BASE_URL}/contact-us`
      );
      console.log(faqData.data);
      setFAQs(faqData.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs.");
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  // Submit handler for create/update FAQ
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (editFAQ) {
        console.log("Editing FAQ:", editFAQ);
        const res = await axios.patch(
          `http://18.209.91.97:3210/api/faq/update-faq/${editFAQ._id}`,
          data
        );
        console.log(res);
        toast.success(res.data.message || "FAQ updated successfully");
      } else {
        console.log("Creating FAQ with data:", data);
        const res = await axios.post(
          "http://18.209.91.97:3210/api/faq/create-faq",
          data
        );
        console.log(res);
        toast.success(res.data.message || "FAQ created successfully");
      }
      // Reset form, clear edit state and close modal
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

  return (
    <div className="m-2 md:m-2 p-4 bg-gray-200 md:rounded-3xl rounded-xl">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">FAQ List</h3>
        {faqs.length === 0 ? (
          <p>No FAQs available.</p>
        ) : ""}
      </div>
    </div>
  );
};

export default ContactUs;
