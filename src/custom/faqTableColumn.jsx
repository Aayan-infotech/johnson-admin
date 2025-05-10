// faqTableColumns.js
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export const faqTableColumns = ({ handleEdit, handleDelete }) => [
  {
    field: "question",
    headerName: "Question",
    flex: 1,
  },
  {
    field: "answer",
    headerName: "Answer",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.4,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];
