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

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (formData.password.length < 5) {
      setPasswordError("Password must be at least 5 characters");
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
      const response = await axios.post(
        "http://54.236.98.193:5050/api/admin/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      toast.success("✅ Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "❌ Login failed. Please try again.";
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
        bgcolor: "#cfe8fc",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "20px",
            padding: "2px",
            borderRadius: "4px",
          },
          duration: 2000,
        }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          name="email"
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!emailError}
          helperText={emailError}
          disabled={loading}
          size="small"
        />

        <TextField
          fullWidth
          name="password"
          placeholder="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!passwordError}
          helperText={passwordError}
          disabled={loading}
          size="small"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "primary",
            color: "white",
            fontWeight: "bold",
            textTransform:"none"}}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
