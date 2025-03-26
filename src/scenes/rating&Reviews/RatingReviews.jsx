import { Box, Container, Rating, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { API_BASE_URL } from "../../utils/apiConfig";
import { format } from "date-fns";

const RatingReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/RatingAndReviews/get-all-reviews`);
            console.log(response)
            const formattedData = response.data.data.map((review) => ({
                id: review._id,
                reviewer: review.user?.name || "Anonymous",
                rating: review.rating,
                reviewText: review.reviewText || "No review text",
                date: format(new Date(review.createdAt), "dd/MM/yyyy"),
            }));
            setReviews(formattedData);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const columns = [
        { field: "reviewer", headerName: "Reviewer", flex: 1 },
        {
            field: "rating",
            headerName: "Rating",
            flex: 1,
            renderCell: (params) => <Rating value={params.value} readOnly precision={0.5} />,
        },
        { field: "reviewText", headerName: "Review", flex: 2 },
        { field: "date", headerName: "Date", flex: 1 },
    ];

    return (
        <Container maxWidth={false}>
            <Typography variant="h4" gutterBottom>Product Reviews</Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <CustomTable columns={columns} rows={reviews} />
            )}
        </Container>
    );
};

export default RatingReviews;
