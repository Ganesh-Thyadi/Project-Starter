import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitRequestPopup.css";

const SubmitRequest = ({ request, onClose, onSubmitted }) => {
  const [submittedBy, setSubmittedBy] = useState("");
  const [file, setFile] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debugging: Log the request prop when the component mounts/updates
  useEffect(() => {
    console.log("Received request prop:", request);

    if (request) {
      console.log("Category:", request.category);
      console.log("Subcategory:", request.subcategory);
      console.log("Name:", request.name);
      console.log("Description:", request.description);
      console.log("Tags:", request.tags);
    } else {
      console.log("No request data received.");
    }
  }, [request]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!submittedBy) {
      setError("Submitted By is required.");
      return;
    }

    // Ensure request data is correctly extracted
    const category = request?.category || "";
    const subcategory = request?.subcategory || "";
    const name = request?.name || "";
    const description = request?.description || "";
    const tags = [...(request.tags || []), "requested"].join(",");

    if (!category || !subcategory || !name) {
      setError("Category, Subcategory, and Name are required.");
      console.error("Missing required fields:", { category, subcategory, name });
      return;
    }

    console.log("Submitting request with data:", {
      category,
      subcategory,
      name,
      description,
      tags,
      submittedBy,
      file,
      documentation,
    });

    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("submittedBy", submittedBy);
    if (file) formData.append("file", file);
    if (documentation) formData.append("documentation", documentation);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/submit-request", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);

      if (response.data.success) {
        onSubmitted(request);
        onClose();
      } else {
        setError("Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Error submitting request:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="popup">
        <h2>Submit Request</h2>
        {error && <p className="error">{error}</p>}
        
        <label>Category:</label>
        <input type="text" value={request?.category || "N/A"} readOnly />

        <label>Subcategory:</label>
        <input type="text" value={request?.subcategory || "N/A"} readOnly />

        <label>Name:</label>
        <input type="text" value={request?.name || "N/A"} readOnly />

        <label>Description:</label>
        <textarea value={request?.description || "N/A"} readOnly />

        <label>Tags:</label>
        <input type="text" value={(request?.tags || []).join(", ")} readOnly />

        <label>Submitted By:</label>
        <input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} required />

        <label>Upload File:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <label>Upload Documentation (PDF or DOC only):</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setDocumentation(e.target.files[0])} />

        <button onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SubmitRequest;
