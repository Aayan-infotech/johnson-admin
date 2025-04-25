import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react";
import CustomTable from "../../custom/Table";
import { showSuccessToast } from "../../Toast";
import { API_BASE_URL } from "../../utils/apiConfig";

const OEMManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    _id: null,
  });
  const [modelForm, setModelForm] = useState({
    modelName: "",
    company: "",
    files: null, // single image file
    _id: null,
  });

  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);
const [modelCompany,setModelCompany]=useState(null)
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const res = await axios.get(`${API_BASE_URL}/companies`);
      const companyList = res.data.data;
      setCompanies(companyList);

      if (companyList.length > 0) {
        setSelectedCompany(companyList[0]);
        fetchModels(companyList[0]._id);
      }
    } finally {
      setLoadingCompanies(false);
    }
  };

  const fetchModels = async (companyId) => {
    if (!companyId) return;
    try {
      setLoadingModels(true);
      const res = await axios.get(`${API_BASE_URL}/models/model/${companyId}`);
      setModels(res.data.data);
    } finally {
      setLoadingModels(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchModels(selectedCompany._id);
    }
  }, [selectedCompany]);

  const handleCompanySubmit = async () => {
    try {
      if (companyForm._id) {
        await axios.put(
          `${API_BASE_URL}/companies/${companyForm._id}`,
          companyForm
        );
        showSuccessToast("Company updated");
      } else {
        await axios.post(`${API_BASE_URL}/companies`, companyForm);
        showSuccessToast("Company added");
      }
      setCompanyModalOpen(false);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };
  const handleModelSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("modelName", modelForm.modelName);
      formData.append("company", modelForm.company); // using selectedCompanyForModel here
      if (modelForm.files) {
        formData.append("files", modelForm.files);
      }

      if (modelForm._id) {
        console.log(modelForm)
        await axios.put(
          `${API_BASE_URL}/models/model/${modelForm._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        showSuccessToast("Model updated");
      } else {
        await axios.post(`${API_BASE_URL}/models/create-model`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showSuccessToast("Model added");
      }

      setModelModalOpen(false);
      fetchModels(selectedCompanyForModel);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompanyDelete = async (id) => {
    if (window.confirm("Delete this company?")) {
      await axios.delete(`${API_BASE_URL}/companies/${id}`);
      fetchCompanies();
    }
  };

  const handleModelDelete = async (id) => {
    if (window.confirm("Delete this model?")) {
      await axios.delete(`${API_BASE_URL}/models/model/${id}`);
      fetchModels(selectedCompany._id);
    }
  };

  const companyColumns = [
    { field: "companyName", headerName: "Company Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => setSelectedCompany(params.row)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setCompanyForm(params.row);
              setCompanyModalOpen(true);
            }}
          >
            <Pencil size={18} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleCompanyDelete(params.row._id)}
          >
            <Trash2 size={18} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const modelColumns = [
    {
      field: "modelImage",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.modelImage?.[0]}
          alt={params.row.modelName}
          style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    { field: "modelName", headerName: "Model Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="secondary"
            onClick={() => {
              setModelForm(params.row);
              setModelModalOpen(true);
            }}
          >
            <Pencil size={18} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleModelDelete(params.row._id)}
          >
            <Trash2 size={18} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        OEM Management
      </Typography>
      <Box display="flex" gap={4}>
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Companies</Typography>
            <Button
              startIcon={<PlusCircle />}
              variant="contained"
              onClick={() => {
                setCompanyForm({ companyName: "", _id: null });
                setCompanyModalOpen(true);
              }}
            >
              Add Company
            </Button>
          </Box>
          {loadingCompanies ? (
            <CircularProgress />
          ) : (
            <CustomTable
              columns={companyColumns}
              rows={companies}
              getRowId={(row) => row._id}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontSize: 16,
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 14,
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f5f5f5",
                },
                boxShadow: 2,
                border: 1,
                borderColor: "#e0e0e0",
              }}
            />
          )}
        </Box>

        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">
              Models{" "}
              {selectedCompany ? `of ${selectedCompany.companyName}` : ""}
            </Typography>
            <Button
              startIcon={<PlusCircle />}
              variant="contained"
              onClick={() => {
                setModelForm({ name: "", modelImage: [], _id: null });
                setModelModalOpen(true);
              }}
              disabled={!selectedCompany}
            >
              Add Model
            </Button>
          </Box>
          {loadingModels ? (
            <CircularProgress />
          ) : (
            <CustomTable
              columns={modelColumns}
              rows={models}
              getRowId={(row) => row._id}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontSize: 16,
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 14,
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f5f5f5",
                },
                boxShadow: 2,
                border: 1,
                borderColor: "#e0e0e0",
              }}
            />
          )}
        </Box>
      </Box>

      {/* Company Modal */}
      <Dialog
        open={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
      >
        <DialogTitle>
          {companyForm._id ? "Edit Company" : "Add Company"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Company Name"
            value={companyForm.companyName}
            onChange={(e) =>
              setCompanyForm({ ...companyForm, companyName: e.target.value })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompanyModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCompanySubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Model Modal */}
      <Dialog open={modelModalOpen} onClose={() => setModelModalOpen(false)}>
        <DialogTitle>{modelForm._id ? "Edit Model" : "Add Model"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Model Name"
            value={modelForm.modelName}
            onChange={(e) =>
              setModelForm({ ...modelForm, modelName: e.target.value })
            }
            margin="dense"
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Company</InputLabel>
            <Select
              value={modelForm.company || ""}
              onChange={(e) =>
                setModelForm({ ...modelForm, company: e.target.value })
              }
            >
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="file"
            onChange={(e) =>
              setModelForm({ ...modelForm, files: e.target.files[0] })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleModelSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OEMManagement;
