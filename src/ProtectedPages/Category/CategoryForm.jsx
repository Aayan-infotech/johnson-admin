import React from 'react';
import { Box, TextField } from '@mui/material';

const CategoryForm = ({ formData, setFormData }) => {
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Category Name Input */}
      <TextField
        label="Category Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </Box>
  );
};

export default CategoryForm;
