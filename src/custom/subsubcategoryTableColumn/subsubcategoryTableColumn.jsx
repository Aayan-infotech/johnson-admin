import { Box, Chip, Button } from "@mui/material";
import { Eye, Trash2 } from "lucide-react";
import { CustomIconButton } from "../Button";

export const subSubCategoryTableColumns = ({
  handleDelete,
  handleView,
  handleToggleStatus
}) => [
  // {
  //   field: "id",
  //   headerName: "Sub-SubCategory ID",
  //   width: 220,
  // },
  {
    field: "name",
    headerName: "Sub-SubCategory Name",
    width: 180,
  },
  // {
  //   field: "subcategoryName",
  //   headerName: "Parent SubCategory",
  //   width: 180,
  // },
  // {
  //   field: "categoryName",
  //   headerName: "Parent Category",
  //   width: 180,
  // },
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
  {
    field: "actions",
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
