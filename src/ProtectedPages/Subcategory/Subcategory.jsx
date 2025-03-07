import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import CustomTable from "../CustomTable";
import { fetchSubcategories, deleteSubcategory } from "../../api/subcategoryApi";

export default function SubcategoryList({ openModal, setOpenModal }) {
  const [subcategoryRows, setSubcategoryRows] = useState([]);

  useEffect(() => {
    loadSubcategories();
  }, []);

  const loadSubcategories = async () => {
    const data = await fetchSubcategories();
    console.log(data, "data")
    setSubcategoryRows(data.map((subcategory) => ({
      id: subcategory._id,
      name: subcategory.name.en,
      parentCategory: subcategory.categoryId || "N/A",
    })));
  };

  const handleDeleteSubcategory = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteSubcategory(id);
      loadSubcategories();
    }
  };

  const subcategoryColumns = [
    { field: "subcategoryId", headerName: "ID", width: 150 },
    { field: "name", headerName: "Subcategory Name", width: 300 },
    { field: "parentCategory", headerName: "Parent Category", width: 300 },
  ];

  return (
    <Box p={3}>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Subcategory
      </Button>
      <CustomTable
        title="Subcategory Management"
        rows={subcategoryRows}
        columns={subcategoryColumns}
        getRowId={(row) => row.subcategoryId}
        onDelete={handleDeleteSubcategory}
      />
    </Box>
  );
}
