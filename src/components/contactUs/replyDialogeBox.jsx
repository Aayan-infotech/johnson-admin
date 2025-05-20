import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { sendReply } from '../../scenes/ContactUs/contactUsService';
import { showErrorToast, showSuccessToast } from "../../Toast";

const ReplyDialog = ({ open, handleClose, contact, refreshData }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!replyMessage.trim()) {
      showErrorToast("Reply message cannot be empty");
      return;
    }

    setLoading(true);

    try {
      await sendReply(contact._id, replyMessage);
      showSuccessToast("Reply sent successfully");
      handleClose();
      refreshData();
    } catch (error) {
      showErrorToast("Failed to send reply");
    } finally {
      setLoading(false);
      setReplyMessage("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reply to Query</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle1">
            <strong>Query No:</strong> {contact?.queryNo}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Email:</strong> {contact?.email}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Message:</strong> {contact?.message}
          </Typography>
        </Box>
        <TextField
          label="Your Reply"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reply'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyDialog;
