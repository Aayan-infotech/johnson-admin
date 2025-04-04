import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormControl,
    Typography,
    Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import axios from "axios";
import Input from "../custom/Input";
import { CustomIconButton } from "../custom/Button";
import { API_BASE_URL } from "../utils/apiConfig";
import { showSuccessToast, showErrorToast, showCustomMessage } from "../Toast";

const AddProductDialog = ({ open, handleClose, fetchAllProducts }) => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [actualPrice, setActualPrice] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [quality, setQuality] = useState("");
    const [partNo, setPartNo] = useState("");
    const [autoPartType, setAutoPartType] = useState("");
    const [compatibleYear, setCompatibleYear] = useState("");
    const [compatibleMake, setCompatibleMake] = useState("");
    const [compatibleModel, setCompatibleModel] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchCategories();
            resetForm();
        }
    }, [open]);

    useEffect(() => {
        if (selectedCategory) {
            fetchSubCategories(selectedCategory);
        } else {
            setSubCategories([]);
            setSubSubCategories([]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedSubCategory) {
            fetchSubSubCategories(selectedSubCategory);
        } else {
            setSubSubCategories([]);
        }
    }, [selectedSubCategory]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/category/admin/get-categories`);
            if (res.data.status === 200) {
                setCategories(res.data.data);
            }
        } catch (err) {
            showErrorToast("Failed to fetch categories");
        }
    };

    const fetchSubCategories = async (categoryId) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/subcategory/get-subcategories/${categoryId}`);
            if (res.data.status === 200) {
                setSubCategories(res.data.data);
            }
        } catch (err) {
            showErrorToast("Failed to fetch subcategories");
        }
    };

    const fetchSubSubCategories = async (subcategoryId) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/subsubcategory/get-subsubcategories/${subcategoryId}`);
            if (res.data.status === 200) {
                setSubSubCategories(res.data.data);
            }
        } catch (err) {
            showErrorToast("Failed to fetch sub-subcategories");
        }
    };

    const resetForm = () => {
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedSubSubCategory("");
        setProductName("");
    };

    const handleSaveProduct = async () => {
        if (!selectedCategory || !productName.trim()) {
            showCustomMessage("Please fill in required fields");
            return;
        }

        const payload = {
            name: productName,
            description: description,
            brand:brand,
            price: {
                actualPrice: Number(actualPrice),
                discountPercent: Number(discountPercent),
            },
            quantity: Number(quantity),
            quality,
            partNo,
            autoPartType,
            compatibleVehicles: {
                year: compatibleYear.split(",").map((y) => Number(y.trim())),
                make: compatibleMake.split(",").map((m) => m.trim()),
                model: compatibleModel.split(",").map((m) => m.trim()),
            },
            Category: selectedCategory,
            SubCategory: selectedSubCategory || null,
            SubSubcategory: selectedSubSubCategory || null,
            picture: [], // you can handle this later via file upload
        };


        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/product/admin/create-product`, payload);
            if (res.data.status === 200) {
                showSuccessToast("Product added successfully");
                fetchAllProducts();
                handleClose();
            }
        } catch (err) {
            showErrorToast(err?.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Add Product</DialogTitle>
            <Divider />
            <DialogContent>
                <InputLabel sx={{ color: "black", mt: 2 }}>Product Name</InputLabel>
                <Input value={productName} onChange={(e) => setProductName(e.target.value)} height={50} />

                {/* <InputLabel sx={{ color: "black", mt: 2 }}>Product Name (FR)</InputLabel>
                <Input value={productNameFr} onChange={(e) => setProductNameFr(e.target.value)} height={50} /> */}

                <InputLabel sx={{ color: "black", mt: 2 }}>Description</InputLabel>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} height={60} multiline />

                {/* <InputLabel sx={{ color: "black", mt: 2 }}>Description (FR)</InputLabel>
                <Input value={descriptionFr} onChange={(e) => setDescriptionFr(e.target.value)} height={60} multiline /> */}

                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel>Category *</InputLabel>
                    <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name.en}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Subcategory</InputLabel>
                    <Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} disabled={!subCategories.length}>
                        <MenuItem value="">Select Subcategory</MenuItem>
                        {subCategories.map((sub) => (
                            <MenuItem key={sub.subcategoryId} value={sub.subcategoryId}>{sub.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Sub-Subcategory</InputLabel>
                    <Select value={selectedSubSubCategory} onChange={(e) => setSelectedSubSubCategory(e.target.value)} disabled={!subSubCategories.length}>
                        <MenuItem value="">Select Sub-Subcategory</MenuItem>
                        {subSubCategories.map((subsub) => (
                            <MenuItem key={subsub.subsubcategoryId} value={subsub.subsubcategoryId}>{subsub.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <InputLabel sx={{ color: "black", mt: 2 }}>Part Number</InputLabel>
                <Input value={partNo} onChange={(e) => setPartNo(e.target.value)} />

                <InputLabel sx={{ color: "black", mt: 2 }}>Brand</InputLabel>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} />

                {/* <InputLabel sx={{ color: "black", mt: 2 }}>Brand (FR)</InputLabel>
                <Input value={brandFr} onChange={(e) => setBrandFr(e.target.value)} /> */}

                <InputLabel sx={{ color: "black", mt: 2 }}>Price</InputLabel>
                <Input type="number" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} />

                <InputLabel sx={{ color: "black", mt: 2 }}>Discount (%)</InputLabel>
                <Input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />

                <InputLabel sx={{ color: "black", mt: 2 }}>Quantity</InputLabel>
                <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <InputLabel sx={{ color: "black", mt: 2 }}>Quality</InputLabel>
                <Input value={quality} onChange={(e) => setQuality(e.target.value)} />

                <InputLabel sx={{ color: "black", mt: 2 }}>Auto Part Type</InputLabel>
                <Input value={autoPartType} onChange={(e) => setAutoPartType(e.target.value)} />

                <Typography mt={3} mb={1}>Compatible Vehicles (comma separated)</Typography>
                <InputLabel>Year</InputLabel>
                <Input value={compatibleYear} onChange={(e) => setCompatibleYear(e.target.value)} />
                <InputLabel>Make</InputLabel>
                <Input value={compatibleMake} onChange={(e) => setCompatibleMake(e.target.value)} />
                <InputLabel>Model</InputLabel>
                <Input value={compatibleModel} onChange={(e) => setCompatibleModel(e.target.value)} />
            </DialogContent>

            <DialogActions>
                <CustomIconButton color="red" text="Close" onClick={handleClose} />
                <CustomIconButton loading={loading} disabled={loading} color="black" text="Add Product" onClick={handleSaveProduct} />
            </DialogActions>
        </Dialog>

    );
};

export default AddProductDialog;
