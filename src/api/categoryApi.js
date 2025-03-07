import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/category";

// Category APIs
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/get-categories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    await axios.delete(`${API_BASE_URL}/admin/delete-category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/insert`, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Subcategory APIs
export const fetchSubcategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subcategories/getAllSubcategories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
};

export const deleteSubcategory = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/subcategories/${id}`);
  } catch (error) {
    console.error("Error deleting subcategory:", error);
  }
};

export const createSubcategory = async (subcategoryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subcategories`, subcategoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
  }
};

export default {
  fetchCategories,
  deleteCategory,
  createCategory,
  fetchSubcategories,
  deleteSubcategory,
  createSubcategory,
};
