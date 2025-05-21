import {
  Box,
  Container,
  IconButton,
  InputBase,
  useTheme,
  Modal,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { SearchOutlined, AddCircleOutline } from "@mui/icons-material";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { productTableColumns } from "../../custom/ProductTableColumns";
import { API_BASE_URL } from "../../utils/apiConfig";
import { tokens } from "../../theme";
import AddProductDialog from "./../../components/AddProductDialogue";
import { showSuccessToast } from "../../Toast";
import ViewProductModal from "../../custom/ViewProductTable";
import EditProductModal from "../../custom/EditProductModal";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [yearInputs, setYearInputs] = useState({});
  const [removedImages, setRemovedImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/product/getAllProducts`
      );
      console.log(response);
      const formattedData = response?.data.products.map((product) => ({
        id: product._id,
        productId: product._id || "N/A",
        name: product.name || "N/A",
        price: product.price?.actualPrice || "N/A",
        discount: product.price?.discountPercent || "N/A",
        stock: product.quantity || "N/A",
        partNo: product.partNo || "N/A",
        brand: product.brand || "N/A",
        description: product.description || "N/A",
        category: product.Category?._id || "N/A",
        subCategory: product.SubCategory?._id || "N/A",
        subSubCategory: product.SubSubcategory?._id || "N/A",
        type: product.autoPartType || "N/A",
        compatibleVehicles: product.compatibleVehicles || [],
        image: product?.picture || "",
        averageRating: product.averageRating || "N/A",
        discountedPrice: product.discountedPrice || "N/A",
        autoPartType: product.autoPartType,
      }));
      setAllProducts(formattedData);
      setFilteredProducts(formattedData);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleClose = () => setAddDialogOpen(false);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    if (value === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.productId.toLowerCase().includes(value) ||
          product.name.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    }
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedProduct.image];
    const removed = updatedImages.splice(index, 1)[0];
    setSelectedProduct((prev) => ({ ...prev, image: updatedImages }));
    setRemovedImages((prev) => [...prev, removed]);
  };

  const handleImageFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles((prev) => [...prev, ...files]);
  };

  const handleEdit = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveEdit = async () => {
    const formData = new FormData();

    Object.entries(selectedProduct).forEach(([key, value]) => {
      if (key === "images") return;

      if (key === "compatibleVehicles") {
        formData.append("compatibleVehicles", JSON.stringify(value));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    formData.append("removedImages", JSON.stringify(removedImages));

    newImageFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setEditLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/product/update-product/${selectedProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditLoading(false);
      console.log("Updated product:", response.data);
      fetchAllProducts();
      setEditModalOpen(false);
    } catch (error) {
      setEditLoading(false);

      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      await axios.delete(`${API_BASE_URL}/product/delete-product/${id}`);
      showSuccessToast("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleView = (product) => {
    setViewProduct(product);
    setViewModalOpen(true);
  };

  const columns = productTableColumns({ handleEdit, handleDelete, handleView });

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
        <Header title="" />
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            display="flex"
            alignItems="center"
            borderRadius="3px"
            bgcolor={colors.primary[400]}
          >
            <InputBase
              placeholder="Search product"
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
            startIcon={<AddCircleOutline />}
            size="large"
            onClick={() => setAddDialogOpen(true)}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <CustomTable
        columns={columns}
        rows={filteredProducts}
        loading={loading}
        checkboxSelection
      />

      {/* Edit Modal */}
      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        loading={loading}
        editLoading={editLoading}
        setEditLoading={setEditLoading}
        onSave={handleSaveEdit}
        onImageSelect={handleImageFileSelect}
        onRemoveImage={handleRemoveImage}
        yearInputs={yearInputs}
        setYearInputs={setYearInputs}
      />

      {/* View Modal */}
      <ViewProductModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        viewProduct={viewProduct}
      />

      <AddProductDialog
        open={addDialogOpen}
        handleClose={handleClose}
        fetchAllProducts={fetchAllProducts}
      />
    </Container>
  );
};

export default Products;
