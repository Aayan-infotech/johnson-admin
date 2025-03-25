import { Box, Container, IconButton, InputBase, useTheme } from "@mui/material";
import { Header } from "../../components";
import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { productTableColumns } from "../../custom/ProductTableColumns";
import { API_BASE_URL } from "../../utils/apiConfig";
import { tokens } from "../../theme";

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/product/getAllProducts`);
            console.log(response,"response")

            const formattedData = response?.data.map((product) => ({
                id: product._id,
                productId: product._id || "N/A",
                name: product.name || "N/A",
                price: product.price?.actualPrice || "N/A",
                discount: product.price?.discountPercent || "N/A",
                stock: product.quantity || "N/A",
            }));
            console.log(formattedData)
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

    const handleDelete = (id) => {
        setFilteredProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const handleView = (product) => {
        alert(`Product Details:\n\nID: ${product.productId}\nName: ${product.name}\nPrice: ${product.price}`);
    };

    const columns = productTableColumns({ handleDelete, handleView });

    return (
        <Container maxWidth={false}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Header title="Products" />
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
            </Box>
            <CustomTable columns={columns} rows={filteredProducts} loading={loading} checkboxSelection />
        </Container>
    );
};

export default Products;
