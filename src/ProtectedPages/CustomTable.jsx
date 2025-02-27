import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function CustomTable({ title, rows=[], columns=[], onDelete, onView, onBack }) {
  const enhancedColumns = [
    ...columns,
    {
      field: "deleteAction",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => onDelete(params.row.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "viewAction",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => onView(params.row)} aria-label="view">
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          onClick={onBack}
        >
          Back
        </Typography>
      </Box>

      <DataGrid rows={rows} columns={enhancedColumns} pageSizeOptions={[5, 10]} checkboxSelection />
    </Box>
  );
}
