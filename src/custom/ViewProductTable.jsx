import React from "react";
import { Modal, Box, Typography, Grid, Button, Divider } from "@mui/material";

const ViewProductModal = ({ open, onClose, viewProduct }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 700,
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 3,
                p: 4,
                maxHeight: "90vh",
                overflowY: "auto",
            }}>
                <Typography variant="h5" mb={2} fontWeight="bold">
                    Product Details
                </Typography>

                {viewProduct && (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: "center" }}>
                                <img
                                    src={viewProduct.image[0]}
                                    alt="Product"
                                    style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Product ID</Typography>
                            <Typography variant="body1">{viewProduct.productId}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Name</Typography>
                            <Typography variant="body1">{viewProduct.name}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Brand</Typography>
                            <Typography variant="body1">{viewProduct.brand}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Part No</Typography>
                            <Typography variant="body1">{viewProduct.partNo}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Actual Price</Typography>
                            <Typography variant="body1">${viewProduct.price}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Discounted Price</Typography>
                            <Typography variant="body1">${viewProduct.discountedPrice}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Discount %</Typography>
                            <Typography variant="body1">{viewProduct.discount}%</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Stock</Typography>
                            <Typography variant="body1">{viewProduct.stock}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Category</Typography>
                            <Typography variant="body1">{viewProduct.category}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Sub Category</Typography>
                            <Typography variant="body1">{viewProduct.subCategory || "N/A"}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Type</Typography>
                            <Typography variant="body1">{viewProduct.type}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Rating</Typography>
                            <Typography variant="body1">{viewProduct.averageRating} ⭐</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body1">{viewProduct.description}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Compatible Vehicles</Typography>
                            {viewProduct.compatibleVehicles?.length > 0 ? (
                                <ul>
                                    {viewProduct.compatibleVehicles.map((vehicle, index) => (
                                        <li key={index}>
                                            <strong>{vehicle.make}</strong> – {vehicle.models
                                                .map(m => `${m.model} (${m.years.join(", ")})`)
                                                .join(", ")}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="body2">No vehicles listed</Typography>
                            )}
                        </Grid>
                    </Grid>
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="outlined" onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewProductModal;
