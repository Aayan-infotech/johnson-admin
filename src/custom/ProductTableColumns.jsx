import { Box, Button } from "@mui/material";
import { DeleteOutline, Visibility } from "@mui/icons-material";
import { Trash2, Eye } from "lucide-react";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { CustomIconButton } from "./Button";

export const productTableColumns = ({ handleDelete, handleView, handleEdit }) => [
    { field: "productId", headerName: "Product ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discount", headerName: "Discount Percentage", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 0.5 },
    {
        field: "edit",
        headerName: "Edit",
        flex: 0.4,
        sortable: false,
        renderCell: (params) => (
            <CustomIconButton icon={<EditSharpIcon style={{ color: "white" }}/>} color="rgb(77 141 225)" onClick={() => handleEdit(params.row)} />
        ),
    },
    {
        field: "view",
        headerName: "View",
        flex: 0.4,
        sortable: false,
        renderCell: (params) => (
            <CustomIconButton
                icon={<Eye size={20} color="white" />
                } color="rgb(77 141 225)" onClick={() => handleView(params.row)} />
        ),
    },
    {
        field: "delete",
        headerName: "Delete",
        flex: 0.4,
        sortable: false,
        renderCell: (params) => (
            <CustomIconButton icon={<Trash2 size={16} color="white"/>} color="hsl(0 84.2% 60.2%)" onClick={() => handleDelete(params.row.id)} />
        ),
    },
];
