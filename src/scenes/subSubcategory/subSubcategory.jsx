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
import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { subSubCategoryTableColumns } from "../../custom/subsubcategoryTableColumn/subsubcategoryTableColumn";
import { API_BASE_URL } from "../../utils/apiConfig";
import AddSubSubCategoryDialog from "../../components/AddSubSubcateogryDialogue";
import { tokens } from "../../theme";
import { showErrorToast, showSuccessToast } from "../../Toast";

const SubSubCategory = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch all Sub-Subcategories
  const fetchAllSubSubCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subsubcategory/admin/get-all-subsubcategories`);
      //console.log(response.data.data, "response.data.data")
      if (response?.data?.status === 200) {
        const formattedData = response.data.data.map((sub) => ({
          id: sub._id,
          subsubcategoryId: sub.subsubcategoryId,
          name: sub.name.en || "N/A",
          categoryId: sub.categoryId || "N/A",
          categoryName: sub.categoryId?.name?.en || "N/A",
          subcategoryId: sub.subcategoryId|| "N/A",
          subcategoryName: sub.subcategoryId?.name?.en || "N/A",
          slug: sub.slug || "N/A",
          status: sub?.isActive || false,
          createdAt: new Date(sub.createdAt).toLocaleDateString(),
        }));
        setSubSubCategories(formattedData);
        setFilteredSubSubCategories(formattedData);
      } else {
        showErrorToast("Failed to fetch sub-subcategories");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Error fetching sub-subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubSubCategories();
  }, []);

  const handleOpenDialog = () => {
    setSelectedSubSubCategory(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedSubSubCategory(null);
    setOpenDialog(false);
  };

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    if (!value) {
      setFilteredSubSubCategories(subSubCategories);
    } else {
      const filtered = subSubCategories.filter((sub) =>
        sub.name.toLowerCase().includes(value)
      );
      setFilteredSubSubCategories(filtered);
    }
  };

  // Toggle active status
  const handleToggleStatus = async (row) => {
    const newStatus = row.isActive === "Active" ? false : true;
    try {
      await axios.put(`${API_BASE_URL}/subsubcategory/admin/activate-subsubcategory/${row}`, {
        isActive: newStatus,
      });
      fetchAllSubSubCategories();
      showSuccessToast("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status", error);
      showErrorToast("Failed to update status");
    }
  };

  // Delete sub-subcategory
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sub-subcategory?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${API_BASE_URL}/subsubcategory/admin/delete-subsubcategory/${id}`);
      if (response?.data?.status === 200) {
        showSuccessToast("Sub-Subcategory deleted successfully");
        setSubSubCategories((prev) => prev.filter((item) => item.id !== id));
        setFilteredSubSubCategories((prev) => prev.filter((item) => item.id !== id));
      } else {
        showErrorToast("Failed to delete sub-subcategory");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Error deleting sub-subcategory");
    }
  };

  // Open dialog in View/Edit mode
  const handleViewEdit = (row) => {
    setSelectedSubSubCategory(row);
    setOpenDialog(true);
  };

  const handleView = (row) => {
    setSelectedSubSubCategory(row);
    setOpenDialog(true);
  };


  // Table columns with actions
  const columns = subSubCategoryTableColumns({
    handleToggleStatus,
    handleDelete,
    handleView,
  });

  return (
    <Container maxWidth={false}>
      <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <Header title="Sub-Subcategories" />
        <Box display="flex" alignItems="center" ml={2} gap={2}>
          {/* Search Bar */}
          <Box display="flex" alignItems="center" bgcolor={colors.primary[400]} borderRadius="3px">
            <InputBase
              placeholder="Search sub-subcategory"
              value={searchText}
              onChange={handleSearch}
              sx={{ ml: 2, flex: 1 }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchOutlined />
            </IconButton>
          </Box>
          {/* Add Sub-Subcategory Button */}
          <Button
            variant="outlined"
            sx={{
              fontWeight: "bold",
              transition: ".3s ease",
              textTransform: "none",
              backgroundColor: colors.primary[400],
              color: "black",
              "&:hover": { backgroundColor: colors.primary[600], color: "white" },
            }}
            startIcon={<PersonAdd />}
            size="large"
            onClick={handleOpenDialog}
          >
            Add Sub-Subcategory
          </Button>
        </Box>
      </Box>

      {/* Sub-Subcategory Table */}
      <CustomTable
        columns={columns}
        rows={filteredSubSubCategories}
        loading={loading}
        onStatusToggle={handleToggleStatus}
        checkboxSelection
      />

      {/* Add / Edit / View Dialog */}
      <AddSubSubCategoryDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        selectedSubSubCategory={selectedSubSubCategory}
        fetchAllSubSubCategories={fetchAllSubSubCategories}
      />
    </Container>
  );
};

export default SubSubCategory;
