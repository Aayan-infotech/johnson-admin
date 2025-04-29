import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../custom/Table";
import { showSuccessToast } from "../../Toast";
import { Eye, PlusCircle, Trash2, Pencil, X } from "lucide-react";
import { API_BASE_URL } from "../../utils/apiConfig";

const PartsVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    _id: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/part-video`);
      setVideos(res.data.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoPlay = (url) => {
    setSelectedVideoUrl(url);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/part-video/${id}`);
        fetchVideos();
        showSuccessToast("Video deleted successfully");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete the video. Please try again.");
      }
    } else {
      alert("Deletion canceled.");
    }
  };

  const handleFormOpen = (
    video = { title: "", description: "", _id: null }
  ) => {
    setFormData({ ...video, file: null });
    setFormModalOpen(true);
  };

  const handleFormSubmit = async () => {
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    if (formData.file) payload.append("files", formData.file);

    try {
      setIsSubmitting(true);
      if (formData._id) {
        await axios.put(`${API_BASE_URL}/part-video/${formData._id}`, payload);
        showSuccessToast("Video Updated successfully");

      } else {
        await axios.post(`${API_BASE_URL}/part-video`, payload);
        showSuccessToast("Video Added successfully");

      }
      setFormModalOpen(false);
      fetchVideos();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      field: "videoUrl",
      headerName: "Video",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleVideoPlay(params.value)}>
          <Eye size={20} />
        </IconButton>
      ),
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleFormOpen(params.row)}>
            <Pencil size={18} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth={false}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Auto Parts Video Management
        </Typography>
        <IconButton
          onClick={() => handleFormOpen()}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1976d2", // Customize the background color
            color: "white", // Text and icon color
            borderRadius: "8px",
            padding: "8px 16px", // Add padding to give more space around the content
            "&:hover": {
              backgroundColor: "#1565c0", // Change background color on hover
            },
            transition: "background-color 0.3s ease", // Smooth hover effect
          }}
        >
          <PlusCircle style={{ marginRight: "8px" }} />{" "}
          {/* Add spacing between icon and text */}
          <Typography variant="button">Add Video</Typography>
        </IconButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomTable
          columns={columns}
          rows={videos}
          getRowId={(row) => row._id}
        />
      )}

      {/* Video Player Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Video Preview
            <IconButton onClick={() => setModalOpen(false)}>
              <X />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <video src={selectedVideoUrl} width="100%" height="400" controls />
        </DialogContent>
      </Dialog>

      {/* Add/Edit Video Modal */}
      <Dialog
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{formData._id ? "Update Video" : "Add Video"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="file"
            accept="video/*"
            style={{ marginTop: "1rem" }}
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files?.[0] || null })
            }
          />
          <Typography sx={{ color: "red" }}>
            <sup>*</sup> If you dont Choose any new Video, Your earlier Video
            will persist!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            disabled={isSubmitting} // Disable button during submission
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : formData._id ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PartsVideos;
