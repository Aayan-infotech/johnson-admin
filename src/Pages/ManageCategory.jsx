import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CategoryList from "../Category/CategoryList";
import CategoryModal from "../Category/CategoryModal";
import SubcategoryList from "../Subcategory/SubcategoryList";
import SubcategoryModal from "../Subcategory/SubcategoryModal";

export default function ManageCategory() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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

      {activeTab === 0 && <CategoryList openModal={openModal} setOpenModal={setOpenModal} />}
      {activeTab === 1 && <SubcategoryList openModal={openModal} setOpenModal={setOpenModal} />}

      {/* Modals */}
      {activeTab === 0 && <CategoryModal openModal={openModal} setOpenModal={setOpenModal} />}
      {activeTab === 1 && <SubcategoryModal openModal={openModal} setOpenModal={setOpenModal} />}
    </Box>
  );
}
