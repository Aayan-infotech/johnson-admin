import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Input from "../custom/Input";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import Divider from "@mui/material/Divider";
import { showErrorToast, showSuccessToast, showCustomMessage } from "../Toast";
import { CustomIconButton } from "../custom/Button";

const AddCategory = ({
  open,
  handleClose,
  categoryName,
  setCategoryName,
  fetchAllCategoryDetails,
  showCategoryDetails,
}) => {
  console.log(showCategoryDetails,"ddddd")
  const [loading, setLoading] = useState(false);
  const isViewMode = Boolean(showCategoryDetails);
  //console.log(showCategoryDetails)
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      showCustomMessage("Category name is required!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category/admin/insert`,
        { name: categoryName }
      );
      if (response?.data?.status === 200) {
        showSuccessToast(
          response?.data?.message || "Category added successfully"
        );
        await fetchAllCategoryDetails();
        handleClose();
        setCategoryName("");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      handleClose();
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
            <Typography variant="body2">
              ID: {showCategoryDetails?.id}
            </Typography>
            <Typography variant="body2">
            Subcategory Name: <strong>{showCategoryDetails?.name}</strong> 
            </Typography>
            <Typography variant="body2">
              Status:<strong>{showCategoryDetails?.status=="N/A"?"Inactive":"Active"}</strong> 
            </Typography>
           
          </>
        ) : (
          <>
            <InputLabel sx={{ color: "black" }}>Category Name</InputLabel>
            <Input
              placeholder="Write category name"
              type="text"
              height={50}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
            text="Add Category"
            onClick={handleAddCategory}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddCategory;
