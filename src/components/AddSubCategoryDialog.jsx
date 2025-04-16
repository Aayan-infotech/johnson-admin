import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { API_BASE_URL } from "../utils/apiConfig";
const AddSubCategoryDialog = ({
  open,
  handleClose,
  parentId,
  fetchAllSubCategories,
  onSuccess, // callback after successful add
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubCategoryName("");
      setLoading(false);
    }
  }, [open]);

  const handleAdd = async () => {
    console.log(selectedCategory,"selecetd category")
    if (!subCategoryName.trim()) {
      alert("Sub Category Name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/subcategory/admin/add-subcategory`,
        {
          categoryId: selectedCategory,
          name: subCategoryName,
        }
        // {
        //   withCredentials: true, // if you're using cookies/auth
        // }
      );

      console.log("Subcategory added:", response.data);

      if (onSuccess) onSuccess(); // refresh data or show success
      fetchAllSubCategories()
      handleClose(); // close modal
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/admin/get-categories`
      );
      if (response?.data?.status === 200) {
        setCategories(response.data.data);
      } else {
        showErrorToast("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Sub Category</DialogTitle>

      <DialogContent>
        <InputLabel sx={{ color: "black" }}>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ minWidth: 250 }}
        >
          <MenuItem value="">Select Category</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.categoryId} value={cat._id}>
              {cat.name.en}
            </MenuItem>
          ))}
        </Select>

        <TextField
          autoFocus
          margin="dense"
          label="Sub Category Name"
          type="text"
          fullWidth
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
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

export default AddSubCategoryDialog;
