import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import { showErrorToast, showSuccessToast, showCustomMessage } from "../Toast";
import Input from "../custom/Input";
import { CustomIconButton } from "../custom/Button";

const AddSubCategoryDialog = ({
  open,
  handleClose,
  fetchAllSubCategories,
  showSubCategoryDetails,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isViewMode = Boolean(showSubCategoryDetails);
  console.log(showSubCategoryDetails, "showSubCategoryDetails");
  useEffect(() => {
    if (open && !isViewMode) {
      fetchCategories();
    }
    if (!open) {
      setSubCategoryName("");
      setSelectedCategory("");
      setImageFile(null);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!isViewMode && categories.length && selectedCategory === "") {
      setSelectedCategory(categories[0]?._id || "");
    }
  }, [categories]);

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
      showErrorToast("Error fetching categories");
    }
  };

  const handleAdd = async () => {
    if (!subCategoryName.trim()) {
      showCustomMessage("Subcategory name is required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("categoryId", selectedCategory);
      formData.append("name", subCategoryName);
      if (imageFile) {
        formData.append("files", imageFile);
      }

      const response = await axios.post(
        `${API_BASE_URL}/subcategory/admin/add-subcategory`,
        formData
      );

      if (response?.data?.status === 200) {
        showSuccessToast(
          response.data.message || "Subcategory added successfully"
        );
        await fetchAllSubCategories();
        handleClose();
        setSubCategoryName("");
        setSelectedCategory("");
        setImageFile(null);
      }
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message || "Failed to add subcategory"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isViewMode ? "Subcategory Details" : "Add Subcategory"}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mt: 1 }}>
        {isViewMode ? (
          <>
            <Typography variant="body2">
              ID: {showSubCategoryDetails?.id}
            </Typography>
            <Typography variant="body2">
              Name: {showSubCategoryDetails?.name}
            </Typography>
            <Typography variant="body2">
              Parent {showSubCategoryDetails?.parentCategory}
            </Typography>
            <Typography variant="body2">
              Status:{" "}
              {showSubCategoryDetails?.status === "N/A" ? "Inactive" : "Active"}
            </Typography>
            {showSubCategoryDetails?.picture && (
              <img
                src={showSubCategoryDetails.picture}
                alt={showSubCategoryDetails?.name || "Subcategory Image"}
                style={{
                  marginTop: 10,
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            )}
          </>
        ) : (
          <>
            <InputLabel sx={{ color: "black" }}>Select Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat?.name?.en}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ color: "black" }}>Subcategory Name</InputLabel>
            <Input
              placeholder="Write subcategory name"
              type="text"
              height={50}
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />

            <InputLabel sx={{ color: "black", mt: 2 }}>
              Subcategory Image
            </InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ marginTop: 8 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <CustomIconButton color="red" text="Close" onClick={handleClose} />
        {!isViewMode && (
          <CustomIconButton
            loading={loading}
            disabled={loading}
            color="black"
            text="Add Subcategory"
            onClick={handleAdd}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddSubCategoryDialog;
