import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setOldPasswordError("");
    setNewPasswordError("");

    if (!formData.oldPassword) {
      setOldPasswordError("Old password is required");
      isValid = false;
    }
    if (!formData.newPassword) {
      setNewPasswordError("New password is required");
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://54.236.98.193:5050/api/admin/changeAdminPass", formData);
      toast.success("✅ Password Reset Successfully!");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "❌ Failed to reset password.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f9",
      }}
    >
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 420,
          bgcolor: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
          Reset Password
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Old Password"
          name="oldPassword"
          variant="outlined"
          type="password"
          value={formData.oldPassword}
          onChange={handleInputChange}
          error={!!oldPasswordError}
          helperText={oldPasswordError}
          disabled={loading}
        />

        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          variant="outlined"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange}
          error={!!newPasswordError}
          helperText={newPasswordError}
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          <a href="/login" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
            Back to Login
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default ChangePassword;
