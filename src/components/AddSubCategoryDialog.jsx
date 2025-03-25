// import React from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

// const AddSubCategoryDialog = ({ open, handleClose }) => {
//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Add Sub Category</DialogTitle>
//       <DialogContent>
//         <TextField 
//           autoFocus
//           margin="dense"
//           label="Sub Category Name"
//           type="text"
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="error">Cancel</Button>
//         <Button onClick={handleClose} color="primary">Add</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddSubCategoryDialog;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const AddSubCategoryDialog = ({
  open,
  handleClose,
  parentId,
  // parentName,
  onSuccess, // callback after successful add
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubCategoryName("");
      setLoading(false);
    }
  }, [open]);

  const handleAdd = async () => {
    if (!subCategoryName.trim()) {
      alert("Sub Category Name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5050/api/subcategory/admin/add-subcategory",
        {
          categoryId: parentId,
          name: subCategoryName,
        },
        // {
        //   withCredentials: true, // if you're using cookies/auth
        // }
      );

      console.log("Subcategory added:", response.data);

      if (onSuccess) onSuccess(); // refresh data or show success

      handleClose(); // close modal
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Sub Category</DialogTitle>

      <DialogContent>
        {/* <Typography variant="subtitle1" gutterBottom>
          Parent Category: <strong>{parentName}</strong>
        </Typography> */}

        <TextField
          autoFocus
          margin="dense"
          label="Sub Category Name"
          type="text"
          fullWidth
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          disabled={loading}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubCategoryDialog;

