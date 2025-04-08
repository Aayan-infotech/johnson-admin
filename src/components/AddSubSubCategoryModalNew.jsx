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

const AddSubSubCategoryDialog = ({ open, handleClose, parentId, onSuccess }) => {
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
      alert("Sub-Subcategory Name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5050/api/subsubcategory/admin/add-subsubcategory",
        {
          parentId: parentId,
          name: subSubCategoryName,
        }
      );

      console.log("Sub-subcategory added:", response.data);

      if (onSuccess) onSuccess(); // Callback after successful addition

      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding sub-subcategory:", error);
      alert("Failed to add sub-subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Sub-Subcategory</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Sub-Subcategory Name"
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

export default AddSubSubCategoryDialog;
