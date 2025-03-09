import React, { useState, useEffect } from 'react';
import './Card.css';
import AddCardForm from './AddCardForm';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/library.json');
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Invalid data format received:', data);
          return;
        }

        setCards(data);
        setFilteredCards(data);
        setCategories(['All', ...new Set(data.map(category => category.Category))]);
      } catch (error) {
        console.error('Error fetching library.json:', error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    let filtered = [...cards];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(category => category.Category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        Subcategories: category.Subcategories.map(subcategory => ({
          ...subcategory,
          contents: subcategory.contents.filter(card =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(card.tags) && card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
          )
        })).filter(subcategory => subcategory.contents.length > 0)
      })).filter(category => category.Subcategories.length > 0);
    }

    setFilteredCards(filtered);
  }, [selectedCategory, searchTerm, cards]);

  const openAddCardForm = () => {
    setIsAddCardOpen(true);
    setSuccessMessage('');
  };

  const closeAddCardForm = () => {
    setIsAddCardOpen(false);
  };

  const handleCardAdded = (message) => {
    setSuccessMessage(message);
    setIsAddCardOpen(false);
  };

  return (
    <div className="card-container">
      <div className="filter-section">
        <select
          className="filter-dropdown"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
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
          <button className="add-card-button" onClick={openAddCardForm}>+ Add Project</button>
        </div>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {isAddCardOpen && <AddCardForm closeForm={closeAddCardForm} onCardAdded={handleCardAdded} />}

      {filteredCards.length > 0 ? (
        filteredCards.map(category => (
          <div key={category.Category} className="category-container">
            <h2>{category.Category}</h2>
            <div className="subcategory-group">
              {category.Subcategories.map(subcategory => (
                <div key={subcategory.Subcategory} className="subcategory-container">
                  <h3 className="subcategory-title">{subcategory.Subcategory}</h3>
                  <div className="subcategory-line"></div>
                  <div className="card-grid">
                    {subcategory.contents.length > 0 ? (
                      subcategory.contents.map((card, index) => (
                        <div key={index} className="card">
                          <h3>{card.name}</h3>
                          <p>{card.description}</p>
                          <div className="tags">
                            {card.tags.map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                          </div>

                          {card.documentationUrl ? (
                            <p className='desc-link'>
                              <a
                                href={`http://localhost:5000${card.documentationUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <strong>Documentation🔗</strong> 
                              </a>
                            </p>
                          ) : (
                            <p className="no-doc-message">No documentation available</p>
                          )}
                          {card.downloadUrl ? (
                            <a
                              href={`http://localhost:5000${card.downloadUrl}`}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="download-button">Download</button>
                            </a>
                          ) : (
                            <p className="no-file-message">No file available</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="no-cards-message">No cards in this subcategory</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-cards-message">No matching cards available</p>
      )}
    </div>
  );
};

export default Card;




// TODO: 1. Add contributor 
//      2. Add 