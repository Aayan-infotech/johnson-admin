import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  InputBase,
  Button,
  useTheme,
} from "@mui/material";
import { Header } from "../../components";
import { SearchOutlined, PersonAdd } from "@mui/icons-material";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { orderTableColumns } from "../../custom/orderTableColumn/orderTableColumn"; // You would create a similar file for order columns
import { API_BASE_URL } from "../../utils/apiConfig";
import ViewOrderDialog from "../../components/DialogueOrder"; // AddOrderDialog will be similar to AddCategory
import { tokens } from "../../theme";
import { showErrorToast, showSuccessToast } from "../../Toast";

const OrderManagement = () => {
  const [allOrdersList, setAllOrdersList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/orders/admin/get-orders`
      );
      if (response?.data?.status === 200) {
        const formattedData = response?.data?.data.map((order) => ({
            id: order?._id || "N/A",
            orderId: order?.orderId || "N/A",
            status: order?.status || "N/A",
            createdAt: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
            totalAmount: order?.totalAmount || "N/A",
            customerName: order?.user?.name || "N/A",
            paymentStatus: order?.payment?.status || "N/A",
            customerEmail: order?.user?.email || "N/A",
            customerAddres: order?.address
                ? `${order.address?.street || ''}, ${order.address?.city || ''}, ${order.address?.state || ''}, ${order.address?.postalCode || ''}, ${order.address?.country || ''}`
                : "N/A"
        }));

        setAllOrdersList(formattedData);
        setFilteredOrders(formattedData);
      } else {
        showErrorToast("Failed to fetch orders");
      }
    } catch (error) {
      showErrorToast("Error fetching orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (value === "") {
      setFilteredOrders(allOrdersList);
    } else {
      const filtered = allOrdersList.filter(
        (order) =>
          (order.orderId && order.orderId.toLowerCase().includes(value)) ||
          (order.status && order.status.toLowerCase().includes(value))
      );
      setFilteredOrders(filtered);
    }
  };

  const handleToggleStatus = async (order) => {
    const newStatus = order.status === "pending" ? "processing" : "pending"; // Toggle between two statuses
    try {
      await axios.put(`${API_BASE_URL}/order/admin/update-status/${order.id}`, {
        status: newStatus,
      });
      fetchAllOrders();
    } catch (error) {
      showErrorToast("Error updating order status");
      console.error("Error updating order status:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/orders/admin/change-order/${orderId}`,
        { status: newStatus }
      );

      if (response?.data?.status === 200) {
        showSuccessToast("Order status updated successfully");

        // Update the local state to reflect the change
        setAllOrdersList((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        fetchAllOrders();
      } else {
        showErrorToast("Failed to update order status");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "An error occurred");
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/order/admin/delete-order/${orderId}`);
      showSuccessToast("Order deleted successfully");
      setAllOrdersList((prevList) =>
        prevList.filter((order) => order.id !== orderId)
      );
      setFilteredOrders((prevList) =>
        prevList.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      showErrorToast("Error deleting order");
      console.error("Error deleting order:", error);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpenOrderDialog(true);
  };

  const columns = orderTableColumns({
    handleStatusChange,
    handleToggleStatus,
    handleDelete,
    handleView,
  });

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* <Header title="Order Management" /> */}
        <Box display="flex" alignItems="center" ml={2} gap={2}>
          <Box
            display="flex"
            alignItems="center"
            bgcolor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase
              placeholder="Search orders"
              value={searchText}
              onChange={handleSearch}
              sx={{ ml: 2, flex: 1 }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchOutlined />
            </IconButton>
          </Box>
          {/* <Button
                        variant="outlined"
                        sx={{
                            fontWeight: "bold",
                            transition: ".3s ease",
                            textTransform: "none",
                            backgroundColor: colors.primary[400],
                            color: "black",
                            "&:hover": {
                                backgroundColor: colors.primary[600],
                                color: "white",
                            },
                        }}
                        startIcon={<PersonAdd />}
                        size="large"
                        onClick={() => setOpenOrderDialog(true)}
                    >
                        Add Order
                    </Button> */}
        </Box>
      </Box>
      <CustomTable
        columns={columns}
        rows={filteredOrders}
        loading={loading}
        onStatusToggle={handleToggleStatus}
        checkboxSelection
      />
      <ViewOrderDialog
        open={openOrderDialog}
        handleClose={() => setOpenOrderDialog(false)}
        orderDetails={selectedOrder}
        fetchAllOrders={fetchAllOrders}
      />
      ;
      {/* <AddOrderDialog open={openOrderDialog} handleClose={() => setOpenOrderDialog(false)} fetchAllOrders={fetchAllOrders} /> */}
    </Container>
  );
};

export default OrderManagement;
