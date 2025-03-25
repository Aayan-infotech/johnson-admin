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
  import { subSubCategoryTableColumns } from "../../custom/subsubcategoryTableColumn/subsubcategoryTableColumn"; // Create this file
  import { API_BASE_URL } from "../../utils/apiConfig";
//   import AddSubCategoryDialog from "../../components/AddSubCategoryDialog"; // Modify to support both add/edit
  import { tokens } from "../../theme";
  import { showErrorToast, showSuccessToast } from "../../Toast";
  
  const SubSubCategory = () => {
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const fetchAllSubSubCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/subsubcategory/admin/get-all-subsubcategories`
        );
        if (response?.data?.status === 200) {
          const formattedData = response.data.data.map((sub) => ({
            id: sub._id,
            subsubCategoryId: sub.subsubcategoryId || "N/A",
            name: sub.name.en || "N/A",
            // parentCategory: sub.categoryId?.name?.en || "N/A",
            parentSubCategory: sub.subcategoryId || "N/A",
            parentCategory: sub.categoryId || "N/A",
            slug: sub.slug || "N/A",
            isActive: sub.isActive ? "Active" : "Inactive",
            createdAt: new Date(sub.createdAt).toLocaleDateString(),
          }));
          setSubSubCategories(formattedData);
          setFilteredSubCategories(formattedData);
        } else {
          showErrorToast("Failed to fetch subcategories");
        }
      } catch (error) {
        console.error(error);
        showErrorToast("Error fetching subcategories");
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
      setOpenDialog(false);
      setSelectedSubSubCategory(null);
    };
  
    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchText(value);
  
      if (!value) {
        setFilteredSubCategories(subSubCategories);
      } else {
        const filtered = subSubCategories.filter((sub) =>
          sub.name.toLowerCase().includes(value)
        );
        setFilteredSubCategories(filtered);
      }
    };
  
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
      if (!confirmDelete) return;
  
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/subsubcategory/admin/delete-subsubcategory/${id}`
        );
  
        if (response?.data?.status === 200) {
          showSuccessToast(response?.data?.message || "Subcategory deleted");
          setSubSubCategories((prev) => prev.filter((item) => item.id !== id));
          setFilteredSubCategories((prev) => prev.filter((item) => item.id !== id));
        } else {
          showErrorToast("Failed to delete subcategory");
        }
      } catch (error) {
        console.error(error);
        showErrorToast("Error deleting subcategory");
      }
    };
  
    const handleView = (row) => {
      setSelectedSubSubCategory(row);
      setOpenDialog(true);
    };
  
    const columns = subSubCategoryTableColumns({
      handleDelete,
      handleView,
    });
  
    return (
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Header title="Subcategories" />
          <Box display="flex" alignItems="center" ml={2} gap={2}>
            <Box
              display="flex"
              alignItems="center"
              bgcolor={colors.primary[400]}
              borderRadius="3px"
            >
              <InputBase
                placeholder="Search subcategory"
                value={searchText}
                onChange={handleSearch}
                sx={{ ml: 2, flex: 1 }}
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchOutlined />
              </IconButton>
            </Box>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "bold",
                transition: ".3s ease",
                textTransform: "none",
                backgroundColor: colors.primary[400],
                color: "black",
                "&:hover": {
                  backgroundColor: colors.primary[600],
                  color: "white",
                },
              }}
              startIcon={<PersonAdd />}
              size="large"
              onClick={handleOpenDialog}
            >
              Add Sub-Subcategory
            </Button>
          </Box>
        </Box>
  
        <CustomTable
          columns={columns}
          rows={filteredSubCategories}
          loading={loading}
          checkboxSelection
        />
  
        {/* <AddSubCategoryDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          subCategory={selectedSubCategory}
          fetchAllSubCategories={fetchAllSubCategories}
        /> */}
      </Container>
    );
  };
  
  export default SubSubCategory;
  