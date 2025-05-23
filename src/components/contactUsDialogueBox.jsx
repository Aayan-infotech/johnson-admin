// components/ContactUs/ContactUsDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ContactUsDialog = ({ open, handleClose, contact }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Contact Query Details</DialogTitle>
      <DialogContent>
        {/* <Typography><strong>Query No:</strong> {contact?.queryNo}</Typography> */}
        <Typography><strong>Email:</strong> {contact?.email}</Typography>
        {/* <Typography><strong>Phone:</strong> {contact?.phone}</Typography> */}
        <Typography><strong>Message:</strong> {contact?.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactUsDialog;
