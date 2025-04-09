import { Box, Container, IconButton, InputBase, useTheme, Modal, TextField, Button } from "@mui/material";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { SearchOutlined, PersonAdd, AddCircleOutline  } from "@mui/icons-material";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { productTableColumns } from "../../custom/ProductTableColumns";
// import { AddProductDialog } from "../../components/AddProductDialogue";
import { API_BASE_URL } from "../../utils/apiConfig";
import { tokens } from "../../theme";
import AddProductDialog from './../../components/AddProductDialogue';

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/product/getAllProducts`);
            console.log(response, "response");

            const formattedData = response?.data.products.map((product) => ({
                id: product._id,
                productId: product._id || "N/A",
                name: product.name || "N/A",
                price: product.price?.actualPrice || "N/A",
                discount: product.price?.discountPercent || "N/A",
                stock: product.quantity || "N/A",
            }));
            console.log(formattedData);
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

    const handleClose = () => {
        setAddDialogOpen(false);
      };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        if (value === "") {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter(product =>
                product.productId.toLowerCase().includes(value) ||
                product.name.toLowerCase().includes(value)
            );
            setFilteredProducts(filtered);
        }
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
        try {
            const response = await axios.put(`${API_BASE_URL}/product/updateProduct/${selectedProduct.id}`, selectedProduct);
            console.log("Edited product response:", response.data);
            setFilteredProducts((prevProducts) => prevProducts.map((product) =>
                product.id === selectedProduct.id ? { ...product, ...selectedProduct } : product
            ));
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = (id) => {
        setFilteredProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const handleView = (product) => {
        alert(`Product Details:\n\nID: ${product.productId}\nName: ${product.name}\nPrice: ${product.price}`);
    };

    const columns = productTableColumns({ handleEdit, handleDelete, handleView });

    return (
        <Container maxWidth={false}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Header title="Products" />
                <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" borderRadius="3px" bgcolor={colors.primary[400]}>
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
                    <Button variant="outlined"
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
                        startIcon={<AddCircleOutline  />}
                        size="large" onClick={() => setAddDialogOpen(true)}>
                        Add Product
                    </Button>
                </Box>
            </Box>

            <CustomTable columns={columns} rows={filteredProducts} loading={loading} checkboxSelection />

            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
                    <h2>Edit Product</h2>
                    <TextField label="Name" fullWidth margin="normal" name="name" value={selectedProduct?.name || ""} onChange={handleEditChange} />
                    <TextField label="Price" fullWidth margin="normal" name="price" value={selectedProduct?.price || ""} onChange={handleEditChange} />
                    <TextField label="Stock" fullWidth margin="normal" name="stock" value={selectedProduct?.stock || ""} onChange={handleEditChange} />
                    <TextField label="Discount" fullWidth margin="normal" name="discount" value={selectedProduct?.discount || ""} onChange={handleEditChange} />
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 2 }}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                    </Box>
                </Box>
            </Modal>

            <AddProductDialog
                open={addDialogOpen}
                handleClose={handleClose}
                fetchAllProducts={fetchAllProducts}
            />

        </Container>


    );
};

export default Products;
