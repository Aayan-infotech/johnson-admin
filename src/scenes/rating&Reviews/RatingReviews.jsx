import { Box, Container, Rating, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
// import { feedbackTableColumn } from "../../custom/feedbackTableColumn/feedbackTableColumn";
import CustomTable from "../../custom/Table";
import { Eye, PlusCircle, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../../utils/apiConfig";
import { format } from "date-fns";
import { CustomIconButton } from "../../custom/Button";


const RatingReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/RatingAndReviews/admin/get-all`);
            console.log(response)
            const formattedData = response.data.data.map((review) => ({
                id: review._id,
                reviewer: review.userId?.name || "Anonymous",
                rating: review.rating,
                reviewText: review.comment || "No review text",
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

    const handleDelete = async (id) => {
        try {
            console.log(id, "id");
            const response = await axios.delete(`${API_BASE_URL}/RatingAndReviews/admin/delete/${id}`);

            if(response.data.status === 200) {
                toast.success("Review Deleted Successfully");
                fetchReviews();
            }

            fetchReviews();

        }
        catch(error){
            console.error("Error in deleting: ", error);
        }
    }

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
        {
            field: "view",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    gap={1}
                >
                    <CustomIconButton
                        icon={<Trash2 size={18} />}
                        color="hsl(0 84.2% 60.2%)"
                        onClick={() => handleDelete(params.id)}
                    />
                </Box>
            ),
        },
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
