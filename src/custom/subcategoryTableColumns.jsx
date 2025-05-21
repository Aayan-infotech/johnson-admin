import { Box, Chip, Button } from "@mui/material";
import { Eye, Trash2 } from "lucide-react";
import { CustomIconButton } from "./Button";

const subCategoryTableColumns = ({
  handleToggleStatus,
  handleDelete,
  handleView,
}) => [
  // {
  //   field: "subCategoryId",
  //   headerName: "SubCategory ID",
  //   width: 150,
  // },
  {
    field: "name",
    headerName: "SubCategory Name",
    width: 200,
  },
  {
    field: "parentCategory",
    headerName: "Parent Category",
    width: 200,
  },
  // {
  //   field: "slug",
  //   headerName: "Slug",
  //   width: 200,
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
          //console.log(params.row);
          handleToggleStatus(params.row.id);
        }}
      >
        {params.row.status === true ? "Active" : "Inactive"}
      </Button>
    },
  },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 150,
  // },
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
          onClick={() => {
            //console.log(params.row, "subcategory");
            handleView(params.row)}}
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

export default subCategoryTableColumns;
