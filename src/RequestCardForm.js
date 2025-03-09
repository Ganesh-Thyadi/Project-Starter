import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RequestCardForm.css";

const RequestCardForm = ({ onRequestAdded, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/requests.json")
      .then((response) => {
        setCategories(response.data.map((req) => req.Category));
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (category && category !== "add_new") {
      axios.get("http://localhost:5000/requests.json")
        .then((response) => {
          const selectedCategory = response.data.find((req) => req.Category === category);
          setSubcategories(selectedCategory ? selectedCategory.Subcategories.map((sub) => sub.Subcategory) : []);
        })
        .catch((err) => console.error("Error fetching subcategories:", err));
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalCategory = isAddingCategory ? newCategory : category;
    const finalSubcategory = isAddingSubcategory ? newSubcategory : subcategory;

    if (!finalCategory || !finalSubcategory || !name) {
      setError("Category, Subcategory, Name, and Requested By are required.");
      return;
    }

    const formData = new FormData();
    formData.append("category", finalCategory);
    formData.append("subcategory", finalSubcategory);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("requestedBy", requestedBy);
    if (file) formData.append("documentation", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/add-request", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setError("");
        onRequestAdded(response.data.request);
        resetForm();
        onClose();
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error submitting request:", err.response || err);
      setError(err.response?.data?.message || "Error submitting request.");
    } finally {
      setLoading(false);
    }
    
  };

  const resetForm = () => {
    setCategory("");
    setSubcategory("");
    setName("");
    setDescription("");
    setTags("");
    setRequestedBy("");
    setFile(null);
    setNewCategory("");
    setNewSubcategory("");
    setIsAddingCategory(false);
    setIsAddingSubcategory(false);
  };

  return (
    <div className="request-form-overlay">
      <div className="request-form-popup">
        <form onSubmit={handleSubmit} className="request-form">
          <h2>Project Request</h2>
          {error && <p className="error">{error}</p>}

          <label>Category:</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIsAddingCategory(e.target.value === "add_new");
            }}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="add_new">+ Add New Category</option>
          </select>
          {isAddingCategory && (
            <input
              className="form-input"
              type="text"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          )}

          <label>Subcategory:</label>
          <select
            className="form-input"
            value={subcategory}
            onChange={(e) => {
              setSubcategory(e.target.value);
              setIsAddingSubcategory(e.target.value === "add_new");
            }}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
            <option value="add_new">+ Add New Subcategory</option>
          </select>
          {isAddingSubcategory && (
            <input
              className="form-input"
              type="text"
              placeholder="Enter new subcategory"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              required
            />
          )}

          <label>Project Name:</label>
          <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Description:</label>
          <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Tags (comma-separated):</label>
          <input className="form-input" type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />

          <label>Request Documentation:</label>
          <input className="form-input" type="file" onChange={(e) => setFile(e.target.files[0])} required />

          <div className="request-form-buttons">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            <button type="button" onClick={onClose} className="button2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestCardForm;
