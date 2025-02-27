import React from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";

export default function SubcategoryModal({ open, onClose, onAddSubcategory, newSubcategory, setNewSubcategory }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">Add Subcategory</Typography>
        <TextField
          fullWidth
          label="Subcategory"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={onAddSubcategory}>
          Add Subcategory
        </Button>
      </Box>
    </Modal>
  );
}

// Modal Styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
