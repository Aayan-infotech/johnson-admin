import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Breadcrumbs,
  Typography,
  Link
} from "@mui/material";
import CategoryTab from "../scenes/category/index";
import SubCategoryTable from "../scenes/subcategory/subcategory";
import SubSubCategoryTable from "../scenes/subSubcategory/subSubcategory";
import RegularService from "../scenes/RegularSevice/RegularService";

const MultipleTabs = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const breadcrumbMap = ["Categories", "Subcategories", "Sub-Subcategories", "Regular-Service-Category"];

  return (
    <Box elevation={3} sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">
          {breadcrumbMap[currentTab]}
        </Typography>
      </Breadcrumbs>
      <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="management tabs">
        <Tab label="Categories" />
        <Tab label="Subcategories" />
        <Tab label="Sub-Subcategories" />
        <Tab label="Regular-Service-Category" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {currentTab === 0 && <CategoryTab />}
        {currentTab === 1 && <SubCategoryTable />}
        {currentTab === 2 && <SubSubCategoryTable />}
        {currentTab === 3 && <RegularService />}
      </Box>
    </Box>
  );
};

export default MultipleTabs;
