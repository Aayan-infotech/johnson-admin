import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

export const AddSubSubCategoryDialog = ({
  open,
  handleClose,
  categoryId,
  subcategoryId,
  onSuccess,
}) => {
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubSubCategoryName("");
      setLoading(false);
    }
  }, [open]);

  const handleAdd = async () => {
    if (!subSubCategoryName.trim()) {
      alert("Sub-Sub Category Name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5050/api/subsubcategory/admin/add-subsubcategory",
        {
          categoryId,
          subcategoryId,
          name: subSubCategoryName,
        }
      );

      console.log("Sub-Subcategory added:", response.data);

      if (onSuccess) onSuccess(); // Callback to refresh data

      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding sub-subcategory:", error);
      alert("Failed to add sub-subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Sub-Sub Category</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Sub-Sub Category Name"
          type="text"
          fullWidth
          value={subSubCategoryName}
          onChange={(e) => setSubSubCategoryName(e.target.value)}
          disabled={loading}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

