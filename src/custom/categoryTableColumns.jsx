import { DeleteOutline, Visibility } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Chip, Button } from "@mui/material";
import { Eye, PlusCircle, Trash2 } from "lucide-react";
import { CustomIconButton } from "./Button";

export const categoryTableColumns = ({
  handleToggleStatus,
  handleAddSubCategory,
  handleDelete,
  handleView,
}) => [
    // { field: "categoryId", headerName: "Category ID", width: 150 },
    { field: "name", headerName: "Category Name", width: 200 },
    // { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        // return <Chip label="Active" color="success" size="small" />;
        return  <Button
          variant="contained"
          color={params.row.status === true ? "success" : "error"}
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleToggleStatus(params.row.id);
          }}
        >
          {params.row.status === true ? "Active" : "Inactive"}
        </Button>
      },
    },
    // { field: "createdAt", headerName: "Created At", width: 150 },
    {
      field: "actions",
      headerName: "Add Sub Category",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <CustomIconButton
          icon={<PlusCircle size={20} color="white" />}
          color="green"
          onClick={() => handleAddSubCategory(params.row.categoryId)}
        />
      ),
    },
    {
      field: "view",
      headerName: "Actions",
      flex: 0.3,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap={1}
        >
          <CustomIconButton
            icon={<Eye size={20} color="white" />}
            color="rgb(77 141 225)"
            onClick={() => handleView(params.row)}
          />
          <CustomIconButton
            icon={<Trash2 size={18} />}
            color="hsl(0 84.2% 60.2%)"
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      ),
    },
  ];
