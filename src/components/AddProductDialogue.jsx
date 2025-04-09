import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import axios from "axios";
import Input from "../custom/Input";
import { CustomIconButton } from "../custom/Button";
import { API_BASE_URL } from "../utils/apiConfig";
import { showSuccessToast, showErrorToast, showCustomMessage } from "../Toast";

const AddProductDialog = ({ open, handleClose, fetchAllProducts }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [quality, setQuality] = useState("");
  const [partNo, setPartNo] = useState("");
  const [autoPartType, setAutoPartType] = useState("");
  const [compatibleYear, setCompatibleYear] = useState("");
  const [compatibleMake, setCompatibleMake] = useState("");
  const [compatibleModel, setCompatibleModel] = useState("");
  const [productImage, setProductImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCategories();
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) fetchSubCategories(selectedCategory);
    else {
      setSubCategories([]);
      setSubSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) fetchSubSubCategories(selectedSubCategory);
    else setSubSubCategories([]);
  }, [selectedSubCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/category/admin/get-categories`
      );
      if (res.data.status === 200) {
        setCategories(res.data.data);
      }
    } catch {
      showErrorToast("Failed to fetch categories");
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/subcategory/get-subcategories/${categoryId}`
      );
      if (res.data.status === 200) setSubCategories(res.data.data);
    } catch {
      showErrorToast("Failed to fetch subcategories");
    }
  };

  const fetchSubSubCategories = async (subcategoryId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/subsubcategory/get-subsubcategories/${subcategoryId}`
      );
      if (res.data.status === 200) setSubSubCategories(res.data.data);
    } catch {
      showErrorToast("Failed to fetch sub-subcategories");
    }
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedSubSubCategory("");
    setProductName("");
    setDescription("");
    setBrand("");
    setActualPrice("");
    setDiscountPercent(0);
    setQuantity("");
    setQuality("");
    setPartNo("");
    setAutoPartType("");
    setCompatibleYear("");
    setCompatibleMake("");
    setCompatibleModel("");
    setProductImage(null);
  };

  const handleSaveProduct = async () => {
    console.log("savingf preodyuc", productName, actualPrice, autoPartType);
    if (!productName.trim() || !actualPrice || !autoPartType) {
      showCustomMessage("Please fill in required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("actualPrice", actualPrice);
    formData.append("discountPercent", discountPercent);
    formData.append("quantity", quantity);
    formData.append("quality", quality);
    formData.append("partNo", partNo);
    formData.append("autoPartType", autoPartType);
    formData.append("Category", selectedCategory);
    if (selectedSubCategory)
      formData.append("SubCategory", selectedSubCategory);
    if (selectedSubSubCategory)
      formData.append("SubSubcategory", selectedSubSubCategory);
    formData.append("compatibleYear", compatibleYear);
    formData.append("compatibleMake", compatibleMake);
    formData.append("compatibleModel", compatibleModel);
    if (productImage) formData.append("files", productImage);

    
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/product/create-product`,
        formData,
      );
      if (res.data.status === 200) {
        showSuccessToast("Product added successfully");
        fetchAllProducts();
        // handleClose();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Product</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Product Name</InputLabel>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Product Image</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel>Description</InputLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.categoryId} value={cat.categoryId}>
                    {cat.name.en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                disabled={!subCategories.length}
              >
                <MenuItem value="">Select</MenuItem>
                {subCategories.map((sub) => (
                  <MenuItem key={sub.subcategoryId} value={sub.subcategoryId}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sub-Subcategory</InputLabel>
              <Select
                value={selectedSubSubCategory}
                onChange={(e) => setSelectedSubSubCategory(e.target.value)}
                disabled={!subSubCategories.length}
              >
                <MenuItem value="">Select</MenuItem>
                {subSubCategories.map((subsub) => (
                  <MenuItem
                    key={subsub.subsubcategoryId}
                    value={subsub.subsubcategoryId}
                  >
                    {subsub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Brand</InputLabel>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Part Number</InputLabel>
            <Input value={partNo} onChange={(e) => setPartNo(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Price</InputLabel>
            <Input
              type="number"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Discount (%)</InputLabel>
            <Input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Quantity</InputLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Quality</InputLabel>
            <Input
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel>
              Auto Part Type (Engine / Headlight / brake etc...)
            </InputLabel>
            <Input
              value={autoPartType}
              onChange={(e) => setAutoPartType(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={500}>Compatible Vehicles</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Model (comma separated)</InputLabel>
            <InputLabel>Corolla, Civic, etc...</InputLabel>
            <Input
              value={compatibleModel}
              onChange={(e) => setCompatibleModel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Make (comma separated)</InputLabel>
            <InputLabel>Toyota, Honda, Maruti, etc...</InputLabel>
            <Input
              value={compatibleMake}
              onChange={(e) => setCompatibleMake(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Year (comma separated)</InputLabel>
            <InputLabel>(2023,2024,2025 etc...)</InputLabel>
            <Input
              value={compatibleYear}
              onChange={(e) => setCompatibleYear(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomIconButton color="red" text="Close" onClick={handleClose} />
        <CustomIconButton
          loading={loading}
          disabled={loading}
          color="black"
          text="Add Product"
          onClick={handleSaveProduct}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
