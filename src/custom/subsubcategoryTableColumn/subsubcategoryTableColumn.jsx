import { Box, Chip } from "@mui/material";
import { Eye, Trash2 } from "lucide-react";
import { CustomIconButton } from "../Button";

export const subSubCategoryTableColumns = ({
  handleDelete,
  handleView,
}) => [
  {
    field: "subsubCategoryId",
    headerName: "Sub-SubCategory ID",
    width: 220,
  },
  {
    field: "name",
    headerName: "Sub-SubCategory Name",
    width: 180,
  },
  {
    field: "parentSubCategory",
    headerName: "Parent SubCategory",
    width: 180,
  },
  {
    field: "parentCategory",
    headerName: "Parent Category",
    width: 180,
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip  
        label={params.row.isActive}
        color={params.row.isActive === "Active" ? "success" : "error"}
        size="small"
      />
    ),
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
