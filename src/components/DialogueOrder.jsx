import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Box,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { CustomIconButton } from "../custom/Button";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import { showErrorToast, showSuccessToast } from "../Toast";

const ViewOrderDialog = ({
  open,
  handleClose,
  orderDetails,
  fetchAllOrders,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    if (!orderDetails?.id) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/order/admin/update-status/${orderDetails.id}`,
        { status: newStatus }
      );

      if (response?.data?.status === 200) {
        showSuccessToast("Order status updated successfully");
        fetchAllOrders();
        handleClose();
      } else {
        showErrorToast("Failed to update order status");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Order Summary</DialogTitle>
      <Divider />
      <DialogContent>
        {orderDetails ? (
          <Stack spacing={3} mt={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Order ID
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {orderDetails.id}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Order Status</Typography>
                <Chip
                  label={orderDetails.status}
                  color={
                    orderDetails.status === "delivered"
                      ? "success"
                      : orderDetails.status === "Pending"
                      ? "warning"
                      : "default"
                  }
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Payment Status</Typography>
                <Chip
                  label={orderDetails.paymentStatus}
                  color={
                    orderDetails.paymentStatus === "paid"
                      ? "success"
                      : orderDetails.status === "Pending"
                      ? "warning"
                      : "default"
                  }
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Grid>
           
             
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Created At</Typography>
                <Typography variant="body2">
                  {formatDate(orderDetails.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography variant="body2">
                  {orderDetails.customerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.customerEmail}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="body1" fontWeight={500}>
                  ${orderDetails.totalAmount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer Address</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {orderDetails.customerAddres}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        ) : (
          <Typography variant="body2" mt={2}>
            No order details available.
          </Typography>
        )}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <CustomIconButton color="red" text="Close" onClick={handleClose} />
        {orderDetails?.status !== "Completed" && (
          <CustomIconButton
            loading={loading}
            disabled={loading}
            color="black"
            text="Mark as Completed"
            onClick={() => handleUpdateStatus("Completed")}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrderDialog;
