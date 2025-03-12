// import React, { useState } from "react";
// import { Tabs, Tab, Box, Typography, IconButton } from "@mui/material";
// import CustomTable from "../CustomTable";
// import CategoryModal from "./AddCategoryModal";
// import SubcategoryModal from "../Subcategory/AddSubcategoryModal";
// import AddIcon from "@mui/icons-material/Add";

// export default function ProductModule({ setSelectedPage }) {
//   const [activeTab, setActiveTab] = useState(0); // Track active tab
//   const [rows, setRows] = useState([
//     { id: 1, lastName: "Snow", firstName: "Jon", age: 35, category: "", subcategory: [""] },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, category: "", subcategory: "" },
//   ]);

//   const [openCategoryModal, setOpenCategoryModal] = useState(false);
//   const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [newCategory, setNewCategory] = useState("");
//   const [newSubcategory, setNewSubcategory] = useState("");

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure?")) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const handleOpenCategoryModal = (id) => {
//     setSelectedRowId(id);
//     setOpenCategoryModal(true);
//   };

//   const handleOpenSubcategoryModal = (id) => {
//     setSelectedRowId(id);
//     setOpenSubcategoryModal(true);
//   };

//   const handleAddCategory = () => {
//     setRows((prevRows) =>
//       prevRows.map((row) => (row.id === selectedRowId ? { ...row, category: newCategory } : row))
//     );
//     setNewCategory("");
//     setOpenCategoryModal(false);
//   };

//   const handleAddSubcategory = () => {
//     setRows((prevRows) =>
//       prevRows.map((row) => (row.id === selectedRowId ? { ...row, subcategory: newSubcategory } : row))
//     );
//     setNewSubcategory("");
//     setOpenSubcategoryModal(false);
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "firstName", headerName: "First Name", width: 130, editable: true },
//     { field: "lastName", headerName: "Last Name", width: 130 },
//     { field: "age", headerName: "Age", type: "number", width: 90 },
//     {
//       field: "subcategory",
//       headerName: "Subcategory",
//       width: 150,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
//           {/* <Typography>{params.row.subcategory || "N/A"}</Typography> */}
//           <IconButton onClick={() => handleOpenSubcategoryModal(params.row.id)} color="primary">
//             <AddIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ width: "100%", p: 3 }}>
//       <Tabs
//         value={activeTab}
//         onChange={handleTabChange}
//         variant="scrollable"
//         scrollButtons="auto"
//         sx={{ borderBottom: 1, borderColor: "divider" }}
//       >
//         <Tab label="Category" />
//         <Tab label="Subcategory" />
//         <Tab label="Subsubcategory" />
//         <Tab label="Product" />
//       </Tabs>

//       {/* Tab Content */}
//       {activeTab === 0 && (
//         <Box p={3}>
//           <CustomTable
//             title="Category Management"
//             rows={rows}
//             columns={columns}
//             onDelete={handleDelete}
//             onView={() => { }}
//             onBack={() => setSelectedPage("home")}
//           />
//           <CategoryModal
//             open={openCategoryModal}
//             onClose={() => setOpenCategoryModal(false)}
//             selectedRowId={selectedRowId}
//             setRows={setRows}
//           />
//         </Box>
//       )}

//       {activeTab === 1 && (
//         <Box p={3}>
//           <CustomTable
//             title="Subcategory Management"
//             rows={rows}
//             columns={columns}
//             onDelete={handleDelete}
//             onView={() => { }}
//             onBack={() => setSelectedPage("home")}
//           />
//         </Box>
//       )}

//       {activeTab === 2 && (
//         <Box p={3}>
//           <CustomTable
//             title="Sub-Subcategory Management"
//             rows={rows}
//             columns={columns}
//             onDelete={handleDelete}
//             onView={() => { }}
//             onBack={() => setSelectedPage("home")}
//           />
//         </Box>
//       )}

//       {activeTab === 3 && (
//         <Box p={3}>
//           <CustomTable
//             title="Product List"
//             rows={rows}
//             columns={columns}
//             onDelete={handleDelete}
//             onView={() => { }}
//             onBack={() => setSelectedPage("home")}
//           />
//           <SubcategoryModal
//             open={openSubcategoryModal}
//             onClose={() => setOpenSubcategoryModal(false)}
//             onAddSubcategory={handleAddSubcategory}
//             newSubcategory={newSubcategory}
//             setNewSubcategory={setNewSubcategory}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// }

// import React, { useEffect, useState } from "react";
// import CustomTable from "../CustomTable";
// import { fetchCategories, deleteCategory, createCategory } from "../../api/categoryApi";
// import { Button, Box, TextField, Modal } from "@mui/material";

// export default function ManageCategory({ setSelectedPage }) {
//   const [categoryRows, setCategoryRows] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: "", description: "" });

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     const data = await fetchCategories();
//     const result = data;
//     console.log(result, "result")

//     const formattedData = result.map((category) => ({
//       ...category,
//       id: category._id,
//       name: category.name.en, // Fetch English name (modify if needed)
//     }));


//     setCategoryRows(formattedData);
//     console.log(formattedData, "formattedData");
//   };

//   const handleDeleteCategory = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       await deleteCategory(id);
//       loadCategories(); // Refresh category list after deletion
//     }
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.name.trim() === "") {
//       alert("Category name is required.");
//       return;
//     }
//     await createCategory(newCategory);
//     setNewCategory({ name: "" });
//     setOpenModal(false);
//     loadCategories(); // Refresh category list after adding new category
//   };

//   const categoryColumns = [
//     { field: "id", headerName: "ID", width: 150 },
//     { field: "name", headerName: "Category Name", width: 300 },
//     // { field: "description", headerName: "Description", width: 300 },
//   ];

//   return (
//     <Box>
//       <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
//         Add Category
//       </Button>
//       <CustomTable
//         title="Category Management"
//         rows={categoryRows}
//         columns={categoryColumns}
//         getRowId={(row) => row._id}
//         onDelete={handleDeleteCategory}
//         onView={() => {}}
//         onBack={() => setSelectedPage("home")}
//       />

//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 5 }}>
//           <h2>Add Category</h2>
//           <TextField
//             fullWidth
//             label="Category Name"
//             variant="outlined"
//             value={newCategory.name}
//             onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             value={newCategory.description}
//             onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ mt: 2 }}>
//             Save Category
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Tabs, Tab, Box, Button, Modal, TextField } from "@mui/material";
// import CustomTable from "../CustomTable";
// import {
//   fetchCategories,
//   deleteCategory,
//   createCategory,
// } from "../../api/categoryApi";
// import {
//   fetchSubcategories,
//   // deleteSubcategory,
//   // createSubcategory,
// } from "../../api/subcategoryApi";

// export default function ManageCategory({ setSelectedPage }) {
//   const [activeTab, setActiveTab] = useState(0);
//   const [categoryRows, setCategoryRows] = useState([]);
//   const [subcategoryRows, setSubcategoryRows] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [newItem, setNewItem] = useState({ name: "", description: "" });

//   useEffect(() => {
//     loadCategories();
//     loadSubcategories();
//   }, []);

//   // Fetch categories
//   const loadCategories = async () => {
//     const data = await fetchCategories();
//     const result = data;
//     const formattedData = result.map((category) => ({
//       ...category,
//       id: category._id,
//       name: category.name.en, // Fetch English name
//     }));
//     setCategoryRows(formattedData);
//   };

//   // Fetch subcategories
//   const loadSubcategories = async () => {
//     const data = await fetchSubcategories();
//     const result = data;
//     console.log(result, "result");
//     const formattedData = result.map((subcategory) => ({
//       ...subcategory,
//       id: subcategory._id,
//       name: subcategory.name, // Fetch English name
//       parentCategory: subcategory.categoryId || "N/A",
//       subcategoryId: subcategory.subcategoryId
//     }));
//     setSubcategoryRows(formattedData);
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       if (activeTab === 0) {
//         await deleteCategory(id);
//         loadCategories();
//       } else if (activeTab === 1) {
//         await deleteSubcategory(id);
//         loadSubcategories();
//       }
//     }
//   };

//   // Handle add new item
//   const handleAdd = async () => {
//     if (newItem.name.trim() === "") {
//       alert("Name is required.");
//       return;
//     }

//     if (activeTab === 0) {
//       await createCategory(newItem);
//       loadCategories();
//     } else if (activeTab === 1) {
//       await createSubcategory(newItem);
//       loadSubcategories();
//     }

//     setNewItem({ name: "", description: "" });
//     setOpenModal(false);
//   };

//   // Table columns
//   const categoryColumns = [
//     { field: "id", headerName: "ID", width: 150 },
//     { field: "name", headerName: "Category Name", width: 300 },
//   ];

//   const subcategoryColumns = [
//     { field: "subcategoryId", headerName: "ID", width: 150 },
//     { field: "name", headerName: "Subcategory Name", width: 300 },
//     { field: "parentCategory", headerName: "Parent Category", width: 300 },
//   ];

//   return (
//     <Box>
//       <Tabs
//         value={activeTab}
//         onChange={(event, newValue) => setActiveTab(newValue)}
//         variant="scrollable"
//         scrollButtons="auto"
//         sx={{ borderBottom: 1, borderColor: "divider" }}
//       >
//         <Tab label="Categories" />
//         <Tab label="Subcategories" />
//         <Tab label="Sub-subcategories" />
//       </Tabs>

//       {/* Categories Tab */}
//       {activeTab === 0 && (
//         <Box p={3}>
//           <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
//             Add Category
//           </Button>
//           <CustomTable
//             title="Category Management"
//             rows={categoryRows}
//             columns={categoryColumns}
//             getRowId={(row) => row.id}
//             onDelete={handleDelete}
//             onView={() => {}}
//             onBack={() => setSelectedPage("home")}
//           />
//         </Box>
//       )}

//       {/* Subcategories Tab */}
//       {activeTab === 1 && (
//         <Box p={3}>
//           <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
//             Add Subcategory
//           </Button>
//           <CustomTable
//             title="Subcategory Management"
//             rows={subcategoryRows}
//             columns={subcategoryColumns}
//             getRowId={(row) => row.id}
//             onDelete={handleDelete}
//             onView={() => {}}
//             onBack={() => setSelectedPage("home")}
//           />
//         </Box>
//       )}

//       {/* Sub-subcategories Tab (Placeholder) */}
//       {activeTab === 2 && (
//         <Box p={3}>
//           <h2>Sub-subcategory Management (To be implemented)</h2>
//         </Box>
//       )}

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 5 }}>
//           <h2>{activeTab === 0 ? "Add Category" : "Add Subcategory"}</h2>
//           <TextField
//             fullWidth
//             label={activeTab === 0 ? "Category Name" : "Subcategory Name"}
//             variant="outlined"
//             value={newItem.name}
//             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             value={newItem.description}
//             onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: 2 }}>
//             Save
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }


import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import CustomTable from "../CustomTable";
import { fetchCategories, deleteCategory, createCategory } from "../../api/categoryApi";
import { fetchSubcategories, deleteSubcategory, createSubcategory } from "../../api/subcategoryApi";
import CategoryModal from "./AddCategoryModal";
import SubcategoryModal from "../Subcategory/AddSubcategoryModal";

export default function ManageCategory() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [categoryRows, setCategoryRows] = useState([]);
  const [subcategoryRows, setSubcategoryRows] = useState([]);

  useEffect(() => {
    if (activeTab === 0) {
      loadCategories();
    } else if (activeTab === 1) {
      loadSubcategories();
    }
  }, [activeTab]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategoryRows(
      data.map((category) => ({
        id: category._id,
        name: category.name.en,
        categoryId: category.categoryId,
      }))
    );
  };

  const loadSubcategories = async () => {
    const data = await fetchSubcategories();
    setSubcategoryRows(
      data.map((subcategory) => ({
        id: subcategory._id,
        name: subcategory.name.en,
        parentCategory: subcategory.categoryId || "N/A",
        subcategoryId: subcategory.subcategoryId,

      }))
    );
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     if (activeTab === 0) {
  //       await deleteCategory(id);
  //       loadCategories();
  //     } else if (activeTab === 1) {
  //       await deleteSubcategory(id);
  //       loadSubcategories();
  //     }
  //   }
  // }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      if (activeTab === 0) {
        console.log(id, "id")
        const categoryToDelete = categoryRows.find((row) => row.id === id);
        if (categoryToDelete) {
          await deleteCategory(categoryToDelete.categoryId); // Use categoryId
          loadCategories();
        }
      } else if (activeTab === 1) {
        const subcategoryToDelete = subcategoryRows.find((row) => row?.id === id);
        
        console.log(subcategoryToDelete, "id")
        if (subcategoryToDelete) {
         const res= await deleteSubcategory(subcategoryToDelete.subcategoryId); // Use subcategoryId
         console.log(res) 
         loadSubcategories();
        }
      }
    }
  };
  

  const categoryColumns = [
    { field: "categoryId", headerName: "ID", width: 150 },
    { field: "name", headerName: "Category Name", width: 300 },
  ];

  const subcategoryColumns = [
    { field: "subcategoryId", headerName: "ID", width: 150 },
    { field: "name", headerName: "Subcategory Name", width: 300 },
    { field: "parentCategory", headerName: "Parent Category", width: 300 },
  ];

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Categories" />
        <Tab label="Subcategories" />
        <Tab label="Sub-subcategories" />
      </Tabs>

      {activeTab === 0 && (
        <Box p={3}>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add Category
          </Button>
          <CustomTable
            title="Category Management"
            rows={categoryRows}
            columns={categoryColumns}
            getRowId={(row) => row.categoryId}
            onDelete={handleDelete}
            onView={() => {}}
            onBack={() => setSelectedPage("home")}
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box p={3}>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add Subcategory
          </Button>
          <CustomTable
            title="Subcategory Management"
            rows={subcategoryRows}
            columns={subcategoryColumns}
            getRowId={(row) => row.subcategoryId}
            onDelete={handleDelete}
            onView={() => {}}
            onBack={() => setSelectedPage("home")}
          />
        </Box>
      )}

      {/* Modals */}
      {activeTab === 0 && <CategoryModal openModal={openModal} setOpenModal={setOpenModal} reloadData={loadCategories} />}
      {activeTab === 1 && <SubcategoryModal openModal={openModal} setOpenModal={setOpenModal} reloadData={loadSubcategories} />}
    </Box>
  );
}



