import React, { useEffect, useState } from "react";
import StaticPageForm from "./staticPageForm";
import {
  fetchStaticPage,
  updateStaticPage,
} from "../../services/staticContentServices";

const StaticPageEditor = ({ pageKey }) => {
  const [page, setPage] = useState({
    key: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchStaticPage(pageKey);
        setPage(data.data);
      } catch (error) {
        console.error("Error loading page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageKey]);

  const handleChange = (field, value) => {
    setPage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateStaticPage(pageKey, page);
      alert("Page saved successfully!");
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <StaticPageForm page={page} pageTitle={pageKey} onChange={handleChange} onSave={handleSave} />
  );
};

export default StaticPageEditor;
