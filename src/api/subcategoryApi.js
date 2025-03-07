import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/subcategory";

// Category APIs
export const fetchSubcategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/get-all-subcategories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createSubcategory = async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/add-subcategory`, categoryData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

export const deleteSubcategory = async (id) => {
    console.log(id)
  try {
    await axios.delete(`${API_BASE_URL}/admin/delete-subcategory/${id}`);
  } catch (error) {
    console.error("Error deleting subcategory:", error);
  }
};
