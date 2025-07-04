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
import { categoryTableColumns } from "../../custom/categoryTableColumns";
import { API_BASE_URL } from "../../utils/apiConfig";
import AddSubCategoryDialog from "../../components/AddSubCategoryDialog";
import AddCategory from "../../components/AddCategory";
import { tokens } from "../../theme";
import { showErrorToast, showSuccessToast } from "../../Toast";

const Category = () => {
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  // const [selectedParentName, setSelectedParentName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCategoryDetails, setShowCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const fetchAllCategoryDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/admin/get-categories`
      );
      if (response?.data?.status === 200) {
        const formattedData = response?.data?.data.map((category) => ({
          id: category._id,
          categoryId: category.categoryId || "N/A",
          name: category.name.en || "N/A",
          picture: category.image || null,
          status: category?.isActive || "N/A",
          // createdAt: new Date(category.createdAt).toLocaleDateString(),
        }));


        setAllCategoriesList(formattedData);
        setFilteredUsers(formattedData);
      } else {
        showErrorToast("Failed to fetch categories");
      }
    } catch (error) {
      showErrorToast("Error fetching categories");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategoryDetails();
  }, []);

  const handleOpenCategory = () => {
    setShowCategoryDetails(null);
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCategoryName("");
    setShowCategoryDetails(null);
  };

  useEffect(() => {
    if (!openCategoryDialog) {
      setCategoryName("");
    }
  }, [openCategoryDialog]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (value === "") {
      setFilteredUsers(allCategoriesList);
    } else {
      const filtered = allCategoriesList.filter(
        (user) =>
          (user.lastName && user.lastName.toLowerCase().includes(value)) ||
          (user.firstName && user.firstName.toLowerCase().includes(value))
      );
      setFilteredUsers(filtered);
    }
  };

  const handleToggleStatus = async (row) => {

    const newStatus = row.status === "Active" ? "Blocked" : "Active";

    try {
      await axios.put(
        `${API_BASE_URL}/category/admin/activate-category/${row}`,
        {
          status: newStatus,
        }
      );

      await fetchAllCategoryDetails();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/category/admin/delete-category/${id}`,
        {
          headers: {
            // Authorization: `Bearer ${token}`, // Sending token in headers
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status === 200) {
        showSuccessToast(
          response?.data?.message || "Category deleted successfully"
        );
        setAllCategoriesList((prevList) =>
          prevList.filter((category) => category.id !== id)
        );
        setFilteredUsers((prevList) =>
          prevList.filter((category) => category.id !== id)
        );
        fetchAllCategoryDetails();
      } else {
        showErrorToast("Failed to delete category.");
      }
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message || "An error occurred while deleting."
      );
    }
  };

  const handleView = (row) => {
    setShowCategoryDetails(row);
    setOpenCategoryDialog(true);
  };

  // const handleRedirect = async() =

  const columns = categoryTableColumns({
    handleToggleStatus,
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
        <Header title="Category" />
        <Box display="flex" alignItems="center" ml={2} gap={2}>
          <Box
            display="flex"
            alignItems="center"
            bgcolor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase
              placeholder="Search category"
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
            onClick={handleOpenCategory}
          >
            Add Category
          </Button>
        </Box>
      </Box>
      <CustomTable
        columns={columns}
        rows={filteredUsers}
        loading={loading}
        onStatusToggle={handleToggleStatus}
        checkboxSelection
      />
      <AddCategory
        open={openCategoryDialog}
        handleClose={handleCloseCategoryDialog}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryImage={categoryImage}
        setCategoryImage={setCategoryImage}
        fetchAllCategoryDetails={fetchAllCategoryDetails}
        showCategoryDetails={showCategoryDetails}
      />
    </Container>
  );
};

export default Category;
