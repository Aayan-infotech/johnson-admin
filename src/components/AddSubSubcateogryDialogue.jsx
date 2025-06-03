import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Typography,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../custom/Input";
import Select from "@mui/material/Select";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import Divider from "@mui/material/Divider";
import { showErrorToast, showSuccessToast, showCustomMessage } from "../Toast";
import { CustomIconButton } from "../custom/Button";

const AddSubSubCategoryDialog = ({
  open,
  handleClose,
  selectedSubSubCategory,
  fetchAllSubSubCategories,
}) => {
  const [loading, setLoading] = useState(false);
  const isViewMode = Boolean(selectedSubSubCategory);
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (open && selectedSubSubCategory) {
      setSubSubCategoryName(selectedSubSubCategory.name);
      setSelectedCategory(selectedSubSubCategory.categoryId);
      setSelectedSubCategory(selectedSubSubCategory.subcategoryId);
    } else if (open) {
      setSubSubCategoryName("");
      setSelectedCategory("");
      setSelectedSubCategory("");
      setImageFile(null);
    }
  }, [open, selectedSubSubCategory]);

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

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/subcategory/get-subcategories/${categoryId}`
      );
      if (response?.data?.status === 200) {
        setSubCategories(response.data.data);
      } else {
        showErrorToast("Failed to fetch subcategories");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Error fetching subcategories");
    }
  };

  const handleSaveSubSubCategory = async () => {
    if (
      !subSubCategoryName.trim() ||
      !selectedCategory ||
      !selectedSubCategory
    ) {
      showCustomMessage("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", subSubCategoryName);
      formData.append("categoryId", selectedCategory);
      formData.append("subcategoryId", selectedSubCategory);
      if (imageFile) {
        formData.append("files", imageFile);
      }

      const apiUrl = selectedSubSubCategory
        ? `${API_BASE_URL}/subsubcategory/admin/update/${selectedSubSubCategory.id}`
        : `${API_BASE_URL}/subsubcategory/admin/insert-subsubcategory`;

      const method = selectedSubSubCategory ? axios.put : axios.post;
      const response = await method(apiUrl, formData);

      if (response?.data?.status === 200) {
        showSuccessToast(
          response?.data?.message ||
            (selectedSubSubCategory
              ? "Updated successfully"
              : "Added successfully")
        );
        await fetchAllSubSubCategories();
        handleClose();
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
        {isViewMode ? "Sub-Subcategory Details" : "Add / Edit Sub-Subcategory"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        {isViewMode ? (
          <>
            <Typography variant="h6">{selectedSubSubCategory?.name}</Typography>
            <Typography variant="body2">
              ID: {selectedSubSubCategory?.id}
            </Typography>
            <Typography variant="body2">
              Category: {selectedSubSubCategory?.categoryId}
            </Typography>
            <Typography variant="body2">
              Subcategory: {selectedSubSubCategory?.subcategoryId}
            </Typography>
            <Typography variant="body2">
              Status: {selectedSubSubCategory?.status ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2">
              Created At: {selectedSubSubCategory?.createdAt}
            </Typography>
            {selectedSubSubCategory?.picture && (
              <img
                src={selectedSubSubCategory.picture}
                alt="Sub-subcategory"
                style={{
                  marginTop: 10,
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                }}
              />
            )}
          </>
        ) : (
          <>
            <InputLabel sx={{ color: "black" }}>
              Sub-Subcategory Name
            </InputLabel>
            <Input
              placeholder="Enter sub-subcategory name"
              type="text"
              height={50}
              value={subSubCategoryName}
              onChange={(e) => setSubSubCategoryName(e.target.value)}
            />

            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel sx={{ color: "black", backgroundColor: "white" }}>
                Category
              </InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ minWidth: 250 }}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat?._id} value={cat?._id}>
                    {cat.name.en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel sx={{ color: "black", backgroundColor: "white" }}>
                Subcategory
              </InputLabel>
              <Select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                sx={{ minWidth: 250 }}
              >
                <MenuItem value="">Select Subcategory</MenuItem>
                {subCategories?.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <InputLabel sx={{ color: "black", mt: 2 }}>Image</InputLabel>
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
            text={selectedSubSubCategory ? "Update" : "Add"}
            onClick={handleSaveSubSubCategory}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddSubSubCategoryDialog;
