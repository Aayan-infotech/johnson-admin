import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Trash2, Eye, PlusCircle } from 'lucide-react';
import { CustomIconButton } from '../Button';

// export const orderTableColumns = ({ orders, handleView, handleDelete, handleStatusChange }) => {
//   const columns = [
//     { field: "_id", headerName: "Order ID", width: 180 },
// { field: "status", headerName: "Status", width: 200, renderCell: (params) => (
//     <FormControl fullWidth size="small">
//       <InputLabel>Status</InputLabel>
//       <Select
//         value={params.row.status}
//         onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
//         label="Status"
//         fullWidth
//       >
//         <MenuItem value="pending">Pending</MenuItem>
//         <MenuItem value="processing">Processing</MenuItem>
//         <MenuItem value="shipped">Shipped</MenuItem>
//         <MenuItem value="delivered">Delivered</MenuItem>
//         <MenuItem value="cancelled">Cancelled</MenuItem>
//       </Select>
//     </FormControl>
// )},
//     { field: "createdAt", headerName: "Created At", width: 180, renderCell: (params) => new Date(params.row.createdAt).toLocaleDateString() },
//     { field: "totalAmount", headerName: "Total Amount", width: 180, renderCell: (params) => `$${params.row.totalAmount.toFixed(2)}` },
//     // { field: "address", headerName: "Address", width: 250, renderCell: (params) => `${params.row.address.street}, ${params.row.address.city}` },
//     {
//       field: "actions", headerName: "Actions", width: 180, renderCell: (params) => (
//         <Box display="flex" justifyContent="center" gap={1}>
//           <CustomIconButton
//             icon={<Eye size={20} color="white" />}
//             color="rgb(77 141 225)"
//             onClick={() => handleView(params.row)}
//           />
//           <CustomIconButton
//             icon={<Trash2 size={18} />}
//             color="hsl(0 84.2% 60.2%)"
//             onClick={() => handleDelete(params.row._id)}
//           />
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={orders}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         disableSelectionOnClick
//       />
//     </Box>
//   );
// };

export const orderTableColumns = ({ handleToggleStatus, handleStatusChange, handleDelete, handleView }) => [
    // { field: "orderId", headerName: "Order ID", width: 180 },
    // { field: "id", headerName: "Order ID", width: 200 },
    // { field: "status", headerName: "Status", width: 180, renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color={params.row.status === "pending" ? "warning" : "success"}
    //       size="small"
    //       onClick={() => handleToggleStatus(params.row)}
    //     >
    //       {params.row.status}
    //     </Button>
    // )},
    {
        field: "status", headerName: "Status", width: 250, renderCell: (params) => {
            // Define colors based on status
            const statusColors = {
                //   pending: "#FACC15",      // Yellow
                //   processing: "#3B82F6",   // Blue
                //   shipped: "#9333EA",      // Purple
                //   delivered: "#22C55E",    // Green
                //   cancelled: "#EF4444",    // Red
            };

            // Define status levels in order
            let statusOrder = ["pending", "processing", "shipped", "delivered", "cancelled"];

            if (params.row.status === "delivered") {
                statusOrder = statusOrder.filter(status => status !== "cancelled");
            }
            // Find index of current status
            const currentIndex = statusOrder.indexOf(params.row.status);

            return (
                <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={params.row.status}
                        onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                        label="Status"
                        fullWidth
                        sx={{
                            backgroundColor: statusColors[params.row.status] || "#E5E7EB",
                            color: "black",
                            fontWeight: "bold",
                            borderRadius: "5px",
                            "& .MuiSelect-select": {
                                backgroundColor: statusColors[params.row.status] || "#E5E7EB",
                            },
                        }}
                    >
                        {statusOrder.map((status, index) => (
                            <MenuItem
                                key={status}
                                value={status}
                                sx={{ backgroundColor: statusColors[status], color: "black" }}
                                disabled={index < currentIndex} // Disable previous statuses
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
    },


    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "totalAmount", headerName: "Total Amount", width: 180, renderCell: (params) => `$${params.row.totalAmount}` },
    { field: "payment", headerName: "Payment Status", width: 180, renderCell: (params) => `${params.row.paymentStatus}` },
    {
        field: "actions", headerName: "Actions", width: 180, renderCell: (params) => (
            <Box display="flex" gap={1}>
                <CustomIconButton
                    icon={<Eye size={20} color="white" />}
                    color="rgb(77 141 225)"
                    onClick={() => handleView(params.row)}
                />
                {/* <CustomIconButton
                    icon={<Trash2 size={18} />}
                    color="hsl(0 84.2% 60.2%)"
                    onClick={() => handleDelete(params.row._id)}
                /> */}
            </Box>
        )
    }
];
