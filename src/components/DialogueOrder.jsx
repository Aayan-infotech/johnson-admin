import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { CustomIconButton } from "../custom/Button";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";
import { showErrorToast, showSuccessToast } from "../Toast";

const ViewOrderDialog = ({ open, handleClose, orderDetails, fetchAllOrders }) => {
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

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Order Details</DialogTitle>
            <Divider />
            <DialogContent>
                {orderDetails ? (
                    <>
                        <Typography variant="h6" fontWeight="bold">Order ID: {orderDetails.id}</Typography>
                        <Typography variant="body2"><strong>Status:</strong> {orderDetails.status}</Typography>
                        <Typography variant="body2"><strong>Total Amount:</strong> ${orderDetails.totalAmount}</Typography>
                        <Typography variant="body2"><strong>Created At:</strong> {orderDetails.createdAt}</Typography>
                        <Typography variant="body2"><strong>Customer:</strong> {orderDetails.customerName}</Typography>
                        <Typography variant="body2"><strong>Email:</strong> {orderDetails.customerEmail}</Typography>
                    </>
                ) : (
                    <Typography variant="body2">No order details available.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <CustomIconButton color="red" text="Close" onClick={handleClose} />
                {/* {orderDetails?.status !== "Completed" && (
            <CustomIconButton
              loading={loading}
              disabled={loading}
              color="black"
              text="Mark as Completed"
              onClick={() => handleUpdateStatus("Completed")}
            />
          )} */}
            </DialogActions>
        </Dialog>
    );
};

export default ViewOrderDialog;
