import React, { useEffect, useState } from "react";
import RequestCardForm from "./RequestCardForm";
import SubmitRequest from "./SubmitCard";
import "./RequestCard.css";

const SubmitRequestPopup = ({ request, onClose }) => {
    const [submittedBy, setSubmittedBy] = useState("");
    const [file, setFile] = useState(null);

    if (!request) return null;

    const { name, category, subcategory } = request;

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("name", name);
        formData.append("submittedBy", submittedBy);
        if (file) formData.append("documentation", file);

        try {
            const response = await fetch("http://localhost:5000/submit-request", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert("Request submitted successfully!");
                onClose();
            } else {
                alert("Error submitting request: " + data.message);
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Submission failed.");
        }
    };

    return (
        <div className="popup-overlay">
            <SubmitRequest request={request} onClose={onClose} onSubmitted={() => { }} />
        </div>
    );
};

const RequestCardsList = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/requests.json")
            .then(response => response.json())
            .then(data => {
                setRequests(data);
                setFilteredRequests(data);
                setCategories([...new Set(data.map(request => request.category))]);
            })
            .catch(error => console.error("Error fetching requests:", error));
    }, []);

    useEffect(() => {
        let filtered = requests;

        if (selectedCategory) {
            filtered = filtered.filter(request => request.category === selectedCategory);
        }

        if (searchTerm.trim() !== "") {
            filtered = filtered.map(category => ({
                ...category,
                subcategories: category.subcategories.map(subcategory => ({
                    ...subcategory,
                    contents: subcategory.contents.filter(request =>
                        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (request.tags && request.tags.some(tag =>
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                        ))
                    )
                })).filter(sub => sub.contents.length > 0)
            })).filter(cat => cat.subcategories.length > 0);
        }

        setFilteredRequests(filtered);
    }, [selectedCategory, searchTerm, requests]);

    return (
        <div className="request-cards-list">
            <div className="filter-section">
                <select
                    className="filter-dropdown"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <div className="search-add-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name or tags"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="add-card-button" onClick={() => setShowForm(true)}>
                        + Add Request
                    </button>
                </div>
            </div>

            {showForm && <RequestCardForm onClose={() => setShowForm(false)} />}

            {filteredRequests.length === 0 ? (
                <p>No request cards available.</p>
            ) : (
                filteredRequests.map(category => (
                    <div key={category.Category} className="category-container">
                        <h2>{category.Category || "Uncategorized"}</h2>
                        <div className="subcategory-group">
                            {category.Subcategories.map(subcategory => (
                                <div key={subcategory.Subcategory} className="subcategory-container">
                                    <h3 className="subcategory-title">{subcategory.Subcategory || "No Subcategory"}</h3>
                                    <div className="subcategory-line"></div>
                                    <div className="card-grid">
                                        {subcategory.contents.length > 0 ? (
                                            subcategory.contents.map(request => {
                                                // Attach category and subcategory explicitly
                                                const requestWithCategory = {
                                                    ...request,
                                                    category: category.Category, 
                                                    subcategory: subcategory.Subcategory,
                                                };

                                                return (
                                                    <div key={request.name} style={{ width: "100%", alignItems: "flex-start" }} className="request-card">
                                                        <h3>{request.name || "Untitled Request"}</h3>
                                                        {/* <p><strong>Category:</strong> {requestWithCategory.category || "None"}</p>
                                                        <p><strong>Subcategory:</strong> {requestWithCategory.subcategory || "None"}</p> */}
                                                        <p style={{ textAlign: "left" }}>{request.description || "No description provided."}</p>
                                                        {request.tags && request.tags.length > 0 && (
                                                            <div className="tags">
                                                                {request.tags.map((tag, index) => (
                                                                    <span key={index} className="tag">{tag}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {request.documentationUrl && (
                                                            <p className="desc-link">
                                                                <a href={request.documentationUrl} target="_blank" rel="noopener noreferrer">
                                                                    <strong>Documentation🔗</strong>
                                                                </a>
                                                            </p>
                                                        )}
                                                        <button className="submit" onClick={() => setSelectedRequest(requestWithCategory)}>Submit</button>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="no-cards-message">No request cards in this subcategory</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {selectedRequest && <SubmitRequestPopup request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
        </div>
    );
};

export default RequestCardsList;
