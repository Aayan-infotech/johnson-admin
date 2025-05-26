import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StaticPageForm = ({ page, pageTitle, onChange, onSave }) => {
  console.log(page);
  const handleTitleChange = (e) => {
    onChange("key", e.target.value);
  }
  const capitalizeFirstLetter = (str) => {
    console.log(str, "str");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {capitalizeFirstLetter(pageTitle)} Page
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          {/* Page Title */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Page Title"
              value={page.key || " "}
              onChange={handleTitleChange}
              variant="outlined"
            />
          </Box>

          {/* Page Content */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Page Content
            </Typography>
            <ReactQuill
              value={page.content}
              onChange={(value) => onChange("content", value)}
              theme="snow"
              style={{ height: "250px", marginBottom: "30px" }}
            />
          </Box>

          {/* Save Button */}
          <Box sx={{ display: "flex", marginTop: "70px",justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSave}
              size="large"
            >
              💾 Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StaticPageForm;
