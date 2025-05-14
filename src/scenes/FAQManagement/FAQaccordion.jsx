import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";

const FAQAccordion = ({ faqs, handleEditFAQ, fetchFAQs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleFaqDelete = async (faq) => {
    try {
      const res = await axios.delete(
        `http://18.209.91.97:3210/api/faq/delete-faq/${faq._id}`
      );
      toast.success(res?.data?.message);
      fetchFAQs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {faqs.map((item, index) => (
        <Accordion
          key={item._id}
          expanded={expandedIndex === index}
          onChange={() => toggleAccordion(index)}
          sx={{ mb: 2, boxShadow: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "blueviolet" }} />}
            aria-controls={`faq-content-${index}`}
            id={`faq-header-${index}`}
          >
            <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
              {item.question}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // prevent accordion toggle
                  handleEditFAQ(item);
                }}
                sx={{
                  color: "blueviolet",
                  "&:hover": { backgroundColor: "#ffe4ec" },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleFaqDelete(item);
                }}
                sx={{
                  color: "blueviolet",
                  "&:hover": { backgroundColor: "#ffe4ec" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQAccordion;
