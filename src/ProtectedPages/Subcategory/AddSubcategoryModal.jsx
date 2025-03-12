// import React from "react";
// import { Box, Typography, Modal, Button, TextField } from "@mui/material";

// export default function SubcategoryModal({ open, onClose, onAddSubcategory, newSubcategory, setNewSubcategory }) {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={modalStyle}>
//         <Typography variant="h6">Add Subcategory</Typography>
//         <TextField
//           fullWidth
//           label="Subcategory"
//           value={newSubcategory}
//           onChange={(e) => setNewSubcategory(e.target.value)}
//           sx={{ mt: 2 }}
//         />
//         <Button variant="contained" sx={{ mt: 2 }} onClick={onAddSubcategory}>
//           Add Subcategory
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

// // Modal Styling
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };


import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { createSubcategory } from "../../api/subcategoryApi";
import { fetchCategories } from "../../api/categoryApi";

export default function SubcategoryModal({ openModal, setOpenModal, reloadData }) {
  const [categories, setCategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState({ name: "", categoryId: "" });

  // Fetch categories when the modal opens
  useEffect(() => {
    if (openModal) {
      loadCategories();
    console.log(newSubcategory, "newSubcategory");

    }
    
  }, [openModal]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategory.name.trim() || !newSubcategory.categoryId) {
      alert("Both category and subcategory name are required.");
      return;
    }

    await createSubcategory(newSubcategory);
    reloadData();
    setNewSubcategory({ name: "", categoryId: "" });
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 5 }}>
        <h2>Add Subcategory</h2>

        {/* Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Category</InputLabel>
          <Select
            value={newSubcategory.categoryId}
            onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.categoryId}>
                {category.name.en} {/* Assuming English name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subcategory Name Input */}
        <TextField
          fullWidth
          label="Subcategory Name"
          value={newSubcategory.name}
          onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleAddSubcategory} sx={{ mt: 2 }}>
          Save Subcategory
        </Button>
      </Box>
    </Modal>
  );
}


