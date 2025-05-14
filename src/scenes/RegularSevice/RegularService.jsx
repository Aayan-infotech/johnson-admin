import { Box, Container, Button, useTheme } from "@mui/material";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { tokens } from "../../theme";
import { showErrorToast, showSuccessToast } from "../../Toast";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_BASE_URL } from "../../utils/apiConfig";
import AddRegularServiceCategory from "./AddRegularServiceModal"; // You need to create this

const regularServiceColumns = ({ handleEdit, handleDelete }) => [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 1.5 },
  {
    field: "image",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => (
      <img src={params.value} alt="service" width="60" height="40" />
    ),
  },
  { field: "discount", headerName: "Discount (%)", flex: 0.7 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => handleEdit(params.row)}
          color="primary"
          size="small"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => handleDelete(params.row.id)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const RegularServiceCategory = () => {
  const [regularServices, setRegularServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchRegularServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/regular-services?lang=en`);
      if (res.data.success) {
        const formatted = res.data.data.map((service) => ({
          id: service._id,
          name: service.name || "N/A",
          description: service.description || "N/A",
          image: service.image,
          discount: service.categoryDiscount,
        }));
        setRegularServices(formatted);
      } else {
        showErrorToast("Failed to fetch regular services");
      }
    } catch (error) {
      showErrorToast("Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegularServices();
  }, []);

  const handleAddNew = () => {
    setSelectedService(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/regular-services/${id}`);
      showSuccessToast("Deleted successfully");
      fetchRegularServices();
    } catch (error) {
      showErrorToast("Failed to delete service");
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const columns = regularServiceColumns({
    handleEdit,
    handleDelete,
  });

  return (
    <Container maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Header title="Regular Service Categories" />
        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: colors.primary[400],
            color: "black",
            "&:hover": {
              backgroundColor: colors.primary[600],
              color: "white",
            },
          }}
          size="large"
          onClick={handleAddNew}
        >
          Add Regular Service
        </Button>
      </Box>

      <CustomTable rows={regularServices} columns={columns} loading={loading} />

      <AddRegularServiceCategory
        open={openDialog}
        handleClose={handleCloseDialog}
        selectedService={selectedService}
        fetchRegularServices={fetchRegularServices}
      />
    </Container>
  );
};

export default RegularServiceCategory;
