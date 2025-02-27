import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import CategoryForm from './CategoryForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddCategoryModal = ({ open, handleClose, handleAddCategory }) => {
    const [formData, setFormData] = useState({ name: '' });

    const handleSubmit = () => {
        handleAddCategory(formData); // Call the parent function to add category
        setFormData({ name: '' });   // ✅ Reset form after submission
      };

    return (
        <Modal
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
        </Modal>
    );
}

export default AddCategoryModal;
