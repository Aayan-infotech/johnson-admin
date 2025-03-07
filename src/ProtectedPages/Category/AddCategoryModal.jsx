// import React, { useState } from 'react';
// import { Box, Button, Typography, Modal } from '@mui/material';
// import CategoryForm from './CategoryForm';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// const AddCategoryModal = ({ open, handleClose, handleAddCategory }) => {
//     const [formData, setFormData] = useState({ name: '' });

//     const handleSubmit = () => {
//         handleAddCategory(formData); // Call the parent function to add category
//         setFormData({ name: '' });   // ✅ Reset form after submission
//       };

//     return (
//        <Modal open={openModal} onClose={() => setOpenModal(false)}>
//                <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 5 }}>
//                  <h2>Add Category</h2>
//                  <TextField
//                    fullWidth
//                    label="Category Name"
//                    variant="outlined"
//                    value={newCategory.name}
//                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//                    margin="normal"
//                  />
//                  <TextField
//                    fullWidth
//                    label="Description"
//                    variant="outlined"
//                    value={newCategory.description}
//                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//                    margin="normal"
//                  />
//                  <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ mt: 2 }}>
//                    Save Category
//                  </Button>
//                </Box>
//              </Modal>
//     );
// }

// export default AddCategoryModal;


{/* <Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
    <Typography id="modal-modal-title" style={{textAlign: "center"}} variant="h6" component="h2">
        Add Category
    </Typography>

    <CategoryForm formData={formData} setFormData={setFormData} />

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.name.trim()} // Disable if empty
        >
            Add Category
        </Button>
    </Box>
</Box>
</Modal> */}


import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { createCategory } from "../../api/categoryApi";

export default function CategoryModal({ openModal, setOpenModal, reloadData }) {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      alert("Category name is required.");
      return;
    }
    await createCategory(newCategory);
    reloadData();
    setNewCategory({ name: "", description: "" });
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 5 }}>
        <h2>Add Category</h2>
        <TextField
          fullWidth
          label="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          margin="normal"
        />
        {/* <TextField
          fullWidth
          label="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          margin="normal"
        /> */}
        <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ mt: 2 }}>
          Save Category
        </Button>
      </Box>
    </Modal>
  );
}

