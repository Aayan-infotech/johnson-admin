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
  Box,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import axios from "axios";
import Input from "../custom/Input";
import { CustomIconButton } from "../custom/Button";
import { API_BASE_URL } from "../utils/apiConfig";

import { API_BASE_URL } from "../../utils/apiConfig";
import { showSuccessToast, showErrorToast, showCustomMessage } from "../Toast";

// commit
const AddProductDialog = ({ open, handleClose, fetchAllProducts }) => {
  const [isRegularService, setIsRegularService] = useState(false);
  const [regularServiceCategories, setRegularServiceCategories] = useState([]);
  const [selectedRegularServiceCategory, setSelectedRegularServiceCategory] =
    useState("");
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
  const [compatibleVehicles, setCompatibleVehicles] = useState([]);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isRegularService) {
      const fetchRegularServiceCategories = async () => {
        try {
          const { data } = await axios.get(
            "http://3.223.253.106:5050/api/regular-services?lang=en"
          );
          setRegularServiceCategories(data.data);
        } catch (err) {
          toast.error("Failed to load regular service categories");
        }
      };
      fetchRegularServiceCategories();
    }
  }, [isRegularService]);

  useEffect(() => {
    if (open) {
      fetchCategories();
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSubSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      console.log(selectedSubCategory);
      fetchSubSubCategories(selectedSubCategory);
    } else {
      setSubSubCategories([]);
    }
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
      if (res.data.status === 200) {
        setSubCategories(res.data.data);
      }
    } catch {
      showErrorToast("Failed to fetch subcategories");
    }
  };

  const fetchSubSubCategories = async (subcategoryId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/subsubcategory/get-subsubcategories/${subcategoryId}`
      );
      console.log(res.data);
      if (res.data.status === 200) {
        setSubSubCategories(res.data.data);
      }
    } catch {
      showErrorToast("Failed to fetch sub-subcategories");
    }
  };

  const addMake = () => {
    setCompatibleVehicles([...compatibleVehicles, { make: "", models: [] }]);
  };

  const removeMake = (index) => {
    const updated = [...compatibleVehicles];
    updated.splice(index, 1);
    setCompatibleVehicles(updated);
  };

  const handleMakeChange = (index, value) => {
    const updated = [...compatibleVehicles];
    updated[index].make = value;
    setCompatibleVehicles(updated);
  };

  const addModel = (makeIndex) => {
    const updated = [...compatibleVehicles];
    updated[makeIndex].models.push({ model: "", years: [] });
    setCompatibleVehicles(updated);
  };

  const handleModelChange = (makeIndex, modelIndex, value) => {
    const updated = [...compatibleVehicles];
    updated[makeIndex].models[modelIndex].model = value;
    setCompatibleVehicles(updated);
  };

  const handleYearChange = (makeIndex, modelIndex, value) => {
    const updated = [...compatibleVehicles];
    const yearArray = value
      .split(",")
      .map((y) => Number(y.trim()))
      .filter((y) => !isNaN(y));
    updated[makeIndex].models[modelIndex].years = yearArray;
    setCompatibleVehicles(updated);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
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
    setCompatibleVehicles([]);
    setImages([]);
  };

  const handleSaveProduct = async () => {
    if (!selectedCategory || !productName.trim()) {
      showCustomMessage("Please fill in required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("quantity", quantity);
    formData.append("quality", quality);
    formData.append("partNo", partNo);
    formData.append("autoPartType", autoPartType);
    formData.append("categoryId", selectedCategory);
    formData.append("subcategoryId", selectedSubCategory || "");
    formData.append("subsubcategoryId", selectedSubSubCategory || "");

    formData.append("price[actualPrice]", actualPrice);
    formData.append("price[discountPercent]", discountPercent);
    formData.append("compatibleVehicles", JSON.stringify(compatibleVehicles));
    if (isRegularService && selectedRegularServiceCategory) {
      formData.append("regularServiceCategory", selectedRegularServiceCategory);
    }

    images.forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);
    try {
      console.log("before sending");
      const res = await axios.post(
        `${API_BASE_URL}/product/admin/create-product`,
        formData
      );
      console.log(res, "after sending");
      if (res.data.success) {
        showSuccessToast("Product added successfully");
        fetchAllProducts();
        handleClose();
        resetForm();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold" }}>Add New Product</DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Basic Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Product Name *</InputLabel>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Part Number</InputLabel>
              <Input
                value={partNo}
                onChange={(e) => setPartNo(e.target.value)}
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
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Pricing & Stock
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <InputLabel>Brand</InputLabel>
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Price</InputLabel>
              <Input
                type="number"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Discount %</InputLabel>
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
              <InputLabel>Auto Part Type</InputLabel>
              <Input
                value={autoPartType}
                onChange={(e) => setAutoPartType(e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Category
          </Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Category *</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name.en}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Subcategory:</InputLabel>
            <Select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!subCategories.length}
            >
              <MenuItem value="">Select Subcategory</MenuItem>
              {subCategories.map((sub) => (
                <MenuItem key={sub?.id} value={sub?.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Sub-Subcategory</InputLabel>
            <Select
              value={selectedSubSubCategory}
              onChange={(e) => setSelectedSubSubCategory(e.target.value)}
              disabled={!subSubCategories.length}
            >
              <MenuItem value="">Select Sub-Subcategory</MenuItem>
              {subSubCategories.map((subsub) => (
                <MenuItem key={subsub.id} value={subsub.id}>
                  {subsub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Compatible Vehicles
          </Typography>
          {compatibleVehicles.map((vehicle, makeIndex) => (
            <Box key={makeIndex} sx={{ mb: 3 }}>
              <InputLabel>Make</InputLabel>
              <Input
                value={vehicle.make}
                onChange={(e) => handleMakeChange(makeIndex, e.target.value)}
                placeholder="e.g., Toyota"
              />
              {vehicle.models.map((modelObj, modelIndex) => (
                <Box key={modelIndex} sx={{ mt: 2, ml: 2 }}>
                  <InputLabel>Model</InputLabel>
                  <Input
                    value={modelObj.model}
                    onChange={(e) =>
                      handleModelChange(makeIndex, modelIndex, e.target.value)
                    }
                    placeholder="e.g., Camry"
                  />
                  <InputLabel sx={{ mt: 1 }}>
                    Years (comma-separated)
                  </InputLabel>
                  <Input
                    value={modelObj.years.join(", ")}
                    onChange={(e) =>
                      handleYearChange(makeIndex, modelIndex, e.target.value)
                    }
                  />
                </Box>
              ))}
              <Button onClick={() => addModel(makeIndex)} sx={{ mt: 1 }}>
                + Add Model
              </Button>
              <Divider sx={{ my: 2 }} />
              <Button color="error" onClick={() => removeMake(makeIndex)}>
                Remove Make
              </Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={addMake}>
            + Add Make
          </Button>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <InputLabel sx={{ mt: 1 }}>Upload Images</InputLabel>
          <input type="file" multiple onChange={handleImageChange} />
          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            {images.length > 0 &&
              Array.from(images).map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  height={80}
                  style={{ borderRadius: 8 }}
                />
              ))}
          </Box>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3, mt: 2 }} elevation={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isRegularService}
                onChange={(e) => setIsRegularService(e.target.checked)}
              />
            }
            label="Regular Service Product"
          />

          {isRegularService && (
            <FormControl fullWidth>
              <InputLabel id="regular-service-label">
                Select Regular Service Category
              </InputLabel>
              <Select
                labelId="regular-service-label"
                id="regular-service-select"
                value={selectedRegularServiceCategory}
                onChange={(e) =>
                  setSelectedRegularServiceCategory(e.target.value)
                }
                label="Select Regular Service Category"
              >
                {regularServiceCategories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Paper>
      </DialogContent>

      <DialogActions>
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
