import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, IconButton } from "@mui/material";
import CustomTable from "../CustomTable";
import CategoryModal from "./AddCategoryModal";
import SubcategoryModal from "../Subcategory/AddSubcategoryModal";
import AddIcon from "@mui/icons-material/Add";

export default function ProductModule({ setSelectedPage }) {
  const [activeTab, setActiveTab] = useState(0); // Track active tab
  const [rows, setRows] = useState([
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, category: "", subcategory: [""] },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, category: "", subcategory: "" },
  ]);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleOpenCategoryModal = (id) => {
    setSelectedRowId(id);
    setOpenCategoryModal(true);
  };

  const handleOpenSubcategoryModal = (id) => {
    setSelectedRowId(id);
    setOpenSubcategoryModal(true);
  };

  const handleAddCategory = () => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === selectedRowId ? { ...row, category: newCategory } : row))
    );
    setNewCategory("");
    setOpenCategoryModal(false);
  };

  const handleAddSubcategory = () => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === selectedRowId ? { ...row, subcategory: newSubcategory } : row))
    );
    setNewSubcategory("");
    setOpenSubcategoryModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130, editable: true },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    {
      field: "subcategory",
      headerName: "Subcategory",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
          {/* <Typography>{params.row.subcategory || "N/A"}</Typography> */}
          <IconButton onClick={() => handleOpenSubcategoryModal(params.row.id)} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Category" />
        <Tab label="Subcategory" />
        <Tab label="Subsubcategory" />
        <Tab label="Product" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box p={3}>
          <CustomTable
            title="Category Management"
            rows={rows}
            columns={columns}
            onDelete={handleDelete}
            onView={() => { }}
            onBack={() => setSelectedPage("home")}
          />
          <CategoryModal
            open={openCategoryModal}
            onClose={() => setOpenCategoryModal(false)}
            selectedRowId={selectedRowId}
            setRows={setRows}
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box p={3}>
          <CustomTable
            title="Subcategory Management"
            rows={rows}
            columns={columns}
            onDelete={handleDelete}
            onView={() => { }}
            onBack={() => setSelectedPage("home")}
          />
        </Box>
      )}

      {activeTab === 2 && (
        <Box p={3}>
          <CustomTable
            title="Sub-Subcategory Management"
            rows={rows}
            columns={columns}
            onDelete={handleDelete}
            onView={() => { }}
            onBack={() => setSelectedPage("home")}
          />
        </Box>
      )}

      {activeTab === 3 && (
        <Box p={3}>
          <CustomTable
            title="Product List"
            rows={rows}
            columns={columns}
            onDelete={handleDelete}
            onView={() => { }}
            onBack={() => setSelectedPage("home")}
          />
          <SubcategoryModal
            open={openSubcategoryModal}
            onClose={() => setOpenSubcategoryModal(false)}
            onAddSubcategory={handleAddSubcategory}
            newSubcategory={newSubcategory}
            setNewSubcategory={setNewSubcategory}
          />
        </Box>
      )}
    </Box>
  );
}
