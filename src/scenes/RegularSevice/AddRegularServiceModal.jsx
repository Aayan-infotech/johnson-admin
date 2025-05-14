import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../Toast";
import { API_BASE_URL } from "../../utils/apiConfig";

const AddRegularServiceCategory = ({
  open,
  handleClose,
  selectedService,
  fetchRegularServices,
}) => {
  const isEditMode = Boolean(selectedService);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    discount: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setForm({
        name: selectedService.name || "",
        description: selectedService.description || "",
        image: selectedService.image || "",
        discount: selectedService.discount || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        image: "",
        discount: "",
      });
      setImageFile(null);
    }
  }, [selectedService]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description) {
      return showErrorToast("Please fill in all required fields.");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("categoryDiscount", form.discount || 0);
    if (imageFile) {
      formData.append("files", imageFile);
    }

    try {
      setLoading(true);
      if (isEditMode) {
        console.log(selectedService)
        await axios.put(
          `${API_BASE_URL}/regular-services/${selectedService.id}`,
          formData
        );
        showSuccessToast("Service updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/regular-services`, formData);
        showSuccessToast("Service created successfully");
      }
      fetchRegularServices();
      handleClose();
    } catch (error) {
      showErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit" : "Add"} Regular Service</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
          />
          <TextField
            label="Discount (%)"
            value={form.discount}
            onChange={(e) => handleChange("discount", e.target.value)}
            type="number"
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {form.image && !imageFile && (
            <img
              src={form.image}
              alt="Uploaded"
              width="100"
              height="60"
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          )}
          {imageFile && (
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Selected: {imageFile.name}
            </p>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRegularServiceCategory;
