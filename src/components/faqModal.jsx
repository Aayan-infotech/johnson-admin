import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';

const FaqModal = ({ open, onClose, onSave, faq, setFaq }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{faq.id ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Question"
            value={faq.question}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            fullWidth
          />
          <TextField
            label="Answer"
            value={faq.answer}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          {faq.id ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FaqModal;
