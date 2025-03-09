import React, { useState, useEffect } from 'react';
import './AddCard.css';

const AddCardForm = ({ closeForm, onCardAdded }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [file, setFile] = useState(null);
  const [documentation, setDocumentation] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/library.json');
        const data = await response.json();
        setCategories(data.map(category => category.Category));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await fetch('http://localhost:5000/library.json');
          const data = await response.json();
          const category = data.find(cat => cat.Category === selectedCategory);

          if (category) {
            setSubcategories(category.Subcategories.map(sub => sub.Subcategory));
          } else {
            setSubcategories([]);
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please select a file');
      return;
    }
  
    // Ensure tags is an array and append submittedBy
    let tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    if (submittedBy && !tagsArray.includes(submittedBy)) {
      tagsArray.push(submittedBy);
    }
  
    const formData = new FormData();
    formData.append('category', newCategory || selectedCategory);
    formData.append('subcategory', newSubcategory || selectedSubcategory);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('tags', tagsArray.join(',')); // Convert array back to comma-separated string
    formData.append('submittedBy', submittedBy);
    formData.append('file', file);
    if (documentation) {
      formData.append('documentation', documentation);
    }
  
    try {
      const response = await fetch('http://localhost:5000/add-card', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        onCardAdded('Card added successfully!');
        closeForm();
      } else {
        alert('Failed to add card: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Error adding card');
    }
  };
  
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Category:
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
              <option value="add">Add New</option>
            </select>
          </label>
          {selectedCategory === 'add' && (
            <input type="text" placeholder="Enter new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
          )}

          <label>
            Subcategory:
            <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} required>
              <option value="">Select a subcategory</option>
              {subcategories.map((sub, index) => (
                <option key={index} value={sub}>{sub}</option>
              ))}
              <option value="add">Add New</option>
            </select>
          </label>
          {selectedSubcategory === 'add' && (
            <input type="text" placeholder="Enter new subcategory" value={newSubcategory} onChange={(e) => setNewSubcategory(e.target.value)} required />
          )}

          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Tags:
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma-separated tags" />
          </label>
          <label>
            Submitted by:
            <input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} placeholder="Enter your name" />
          </label>
          <label>
            File:
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          </label>
          <label>
            Documentation (PDF/DOC):
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setDocumentation(e.target.files[0])} />
          </label>
          <div className="form-buttons">
            <button type="submit" className="button1">Add Project</button>
            <button className='button2' type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
