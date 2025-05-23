import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import Input from "../custom/Input";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import {
  showErrorToast,
  showSuccessToast,
  showCustomMessage,
} from "../Toast";
import { CustomIconButton } from "../custom/Button";

const AddCategory = ({
  open,
  handleClose,
  categoryName,
  setCategoryName,
  categoryImage,
  setCategoryImage,
  fetchAllCategoryDetails,
  showCategoryDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const isViewMode = Boolean(showCategoryDetails);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      showCustomMessage("Category name is required!");
      return;
    }

    if (!categoryImage) {
      showCustomMessage("Category image is required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("files", categoryImage);

      const response = await axios.post(
        `${API_BASE_URL}/category/admin/insert`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.status === 200) {
        showSuccessToast(
          response?.data?.message || "Category added successfully"
        );
        await fetchAllCategoryDetails();
        handleClose();
        setCategoryName("");
        setCategoryImage(null);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {isViewMode ? "View Category Details" : "Add New Category"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        {isViewMode ? (
          <>
            <Typography variant="body2">ID: {showCategoryDetails?.id}</Typography>
            <Typography variant="body2">
              Subcategory Name: <strong>{showCategoryDetails?.name}</strong>
            </Typography>
            <Typography variant="body2">
              Status:{" "}
              <strong>
                {showCategoryDetails?.status === "N/A" ? "Inactive" : "Active"}
              </strong>
            </Typography>
          </>
        ) : (
          <>
            <InputLabel sx={{ color: "black" }}>Category Name</InputLabel>
            <Input
              placeholder="Write category name"
              type="text"
              sx={{ height: 50, mb: 2 }}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <InputLabel sx={{ color: "black", mt: 2 }}>Category Image</InputLabel>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => setCategoryImage(e.target.files[0])}
            />

            {categoryImage && (
              <img
                src={URL.createObjectURL(categoryImage)}
                alt="preview"
                style={{ width: "100px", marginTop: "10px", borderRadius: 6 }}
              />
            )}
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
            text="Add Category"
            onClick={handleAddCategory}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddCategory;
