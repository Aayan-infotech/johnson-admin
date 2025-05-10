import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASE_URL } from "../utils/apiConfig";
import { showErrorToast } from "../Toast";
import axios from "axios";

const EditProductModal = ({
  open,
  onClose,
  product,
  setProduct,
  onSave,
  onImageSelect,
  editLoading,
  yearInputs,
  setYearInputs,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  // const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);
  // const [subSubCategories, setSubSubCategories] = useState([]);


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>Edit Product</h2>

        <Box display="flex" gap={3}>
          {/* Left Column */}
          <Box flex={1}>
            {["name", "partNo", "brand", "type", "autoPartType"].map(
              (field) => (
                <TextField
                  key={field}
                  label={field.replace(/([A-Z])/g, " $1")}
                  fullWidth
                  margin="normal"
                  name={field}
                  value={product?.[field] || ""}
                  onChange={handleChange}
                />
              )
            )}

            {/* Category Dropdowns */}
            {/* <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  setProduct((prev) => ({ ...prev, category: value }));
                  setSelectedSubCategory("");
                  setSelectedSubSubCategory("");
                }}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name.en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
              <InputLabel>Sub Category</InputLabel>
              <Select
                value={selectedSubCategory || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedSubCategory(value);
                  setProduct((prev) => ({ ...prev, subCategory: value }));
                  setSelectedSubSubCategory("");
                }}
                label="Sub Category"
              >
                {subCategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              disabled={!selectedSubCategory}
            >
              <InputLabel>Sub-Sub Category</InputLabel>
              <Select
                value={selectedSubSubCategory || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedSubSubCategory(value);
                  setProduct((prev) => ({ ...prev, subSubCategory: value }));
                }}
                label="Sub-Sub Category"
              >
                {subSubCategories.map((subSub) => (
                  <MenuItem key={subSub.id} value={subSub.id}>
                    {subSub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Box>

          {/* Right Column */}
          <Box flex={1}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              name="description"
              value={product?.description || ""}
              onChange={handleChange}
            />

            {["stock", "price", "discount"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="normal"
                name={field}
                type="number"
                value={product?.[field] || ""}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
              />
            ))}

            {/* Image Upload */}
            <Box mt={3}>
              <Typography variant="h6">Product Images</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                {product?.image?.map((imgUrl, index) => (
                  <Box key={index} position="relative">
                    {/* <IconButton
                      size="small"
                      onClick={() => onRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        background: "white",
                        boxShadow: 1,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton> */}
                    <img
                      src={imgUrl}
                      alt={`product-img-${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                      }}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/100")
                      }
                    />
                  </Box>
                ))}
              </Box>

              <Box mt={2}>
                <Button variant="outlined" component="label">
                  Add Images
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={onImageSelect}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Compatible Vehicles */}
        <Box mt={4}>
          <h3>Compatible Vehicles</h3>
          {product?.compatibleVehicles?.map((vehicle, i) => (
            <Box key={i} mb={2} p={2} border="1px solid #ccc" borderRadius={1}>
              <TextField
                label="Make"
                fullWidth
                margin="dense"
                value={vehicle.make}
                onChange={(e) => {
                  const updated = [...product.compatibleVehicles];
                  updated[i].make = e.target.value;
                  setProduct((prev) => ({
                    ...prev,
                    compatibleVehicles: updated,
                  }));
                }}
              />
              {vehicle.models.map((modelObj, j) => {
                const key = `${i}-${j}`;
                return (
                  <Box key={j} mt={2} pl={2} borderLeft="2px solid #eee">
                    <TextField
                      label="Model"
                      fullWidth
                      margin="dense"
                      value={modelObj.model}
                      onChange={(e) => {
                        const updated = [...product.compatibleVehicles];
                        updated[i].models[j].model = e.target.value;
                        setProduct((prev) => ({
                          ...prev,
                          compatibleVehicles: updated,
                        }));
                      }}
                    />
                    <TextField
                      label="Years (comma separated)"
                      fullWidth
                      margin="dense"
                      value={
                        yearInputs[key] !== undefined
                          ? yearInputs[key]
                          : modelObj.years?.join(", ") || ""
                      }
                      onChange={(e) =>
                        setYearInputs((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      onBlur={(e) => {
                        const inputValue = e.target.value;
                        const parsedYears = inputValue
                          .split(",")
                          .map((y) => parseInt(y.trim(), 10))
                          .filter((y) => !isNaN(y));

                        const updated = [...product.compatibleVehicles];
                        updated[i].models[j].years = parsedYears;

                        setProduct((prev) => ({
                          ...prev,
                          compatibleVehicles: updated,
                        }));

                        setYearInputs((prev) => {
                          const newInputs = { ...prev };
                          delete newInputs[key];
                          return newInputs;
                        });
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Save/Cancel Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
      variant="contained"
      color="primary"
      onClick={onSave}
      disabled={editLoading}
    >
      {editLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
    </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
