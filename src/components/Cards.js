import React, { useRef, useState } from 'react';
import './Styles/CardSection.css';

const CardSection = ({ rowsToShow = 1 }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUploadSuccessVisible, setIsUploadSuccessVisible] = useState(false);
  const cardsContainerRef = useRef(null);
  const [expandedCards, setExpandedCards] = useState({}); // State to track expanded cards

  const scrollUp = () => {
    cardsContainerRef.current.scrollBy({ top: -352, behavior: 'smooth' });
  };

  const scrollDown = () => {
    cardsContainerRef.current.scrollBy({ top: 352, behavior: 'smooth' });
  };

  const cards = Array.from({ length: 12 }, (_, index) => ({
    title: `Project Title ${index + 1}`,
    description: `This is a detailed description of project ${index + 1}. It highlights the main features and objectives of the project, providing an overview of what the project aims to achieve. The project includes various components and modules that work together to deliver the desired functionality. It is designed with scalability and performance in mind, ensuring that it can handle a large number of users and data. The project also incorporates best practices in coding and design, making it maintainable and extensible. Additionally, it includes comprehensive documentation and tests to ensure reliability and ease of use.`,
    tags: ['tag1', 'tag2', 'tag3'],
    stats: {
      downloads: 123 * (index + 1),
      upvotes: 456 * (index + 1),
      downvotes: 12 * (index + 1),
    },
  }));


  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const toggleExpand = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const goBack = () => {
    setSelectedCard(null);
  };

  const toggleUploadForm = () => {
    setIsUploadFormVisible(!isUploadFormVisible);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const showUploadSuccessPopup = () => {
    setIsUploadSuccessVisible(true);
  };

  const closeUploadSuccessPopup = () => {
    setIsUploadSuccessVisible(false);
    setIsUploadFormVisible(false);
  };
  if (selectedCard) {
    return (
      <div className="project-details">
        <button className="back-button1" onClick={goBack}>
          Back
        </button>
        <div className="your-project-details">
          <h3>{selectedCard.title}</h3>
          <span className="tags">
            {selectedCard.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag-box">
                {tag}
              </span>
            ))}
          </span>
          <p className='description-box'>{selectedCard.description}</p>
          <div className="project-stats">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>{' '}
              {selectedCard.stats.downloads}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>{' '}
              {selectedCard.stats.upvotes}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>{' '}
              {selectedCard.stats.downvotes}
            </span>          
            </div>
        <div className="download-button-container">
          <button
            className="button"
            onClick={() => {
              // Logic to handle download
              alert('Download started for ' + selectedCard.title);
            }}
            style={{
              width: 'auto',
              padding: '10px 20px',
              color: '#fff',
              backgroundColor: '#007BFF',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              marginTop: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#007BFF')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
          >
            Download Project
          </button>
        </div>
        </div>
      </div>
    );
  }
  return (
    <div className="your-projects-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '2%',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Full Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: '10px 30px 10px 10px',
              fontSize: '16px',
              width: '500px',
              borderRadius: '5px',
              border: '0px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              outline: 'none',
            }}
          />

          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="80"
            height="40"
            viewBox="0 0 50 50"
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'fill 0.3s ease',
              transition: 'background-color 0.3s ease',
              padding: '7px 30px',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
          </svg>
        </div>

        {/* Upload Button */}
        <button
          className="upload-button"
          onClick={toggleUploadForm}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            borderRadius: '5px',
          }}
        >
          Upload Project
        </button>
      </div>

      <div className="scrollable-section">
        <div
          className="cards-wrapper"
          style={{
            height: `${rowsToShow * 320}px`, // Dynamically set height for visible rows
          }}
        >
          <div
            className="cards-container"
            ref={cardsContainerRef}
            style={{
              gridTemplateRows: `repeat(${rowsToShow}, 1fr)`, // Dynamically set rows
            }}
          >
            {cards.map((card, index) => (
              <div className="card" key={index}>
                <div className="card-header" onClick={() => handleCardClick(card)}>{card.title}</div>
                <div className="card-body">
                  {expandedCards[index]
                    ? card.description
                    : truncateText(card.description, 67)}
                  <button
                    className="read-more-button"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedCards[index] ? 'Read Less' : 'Read More'}
                  </button>
                  <br />
                  <span>
                    {card.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag-box">
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="card-footer">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                    </svg>{' '}
                    {card.stats.downloads}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>{' '}
                    {card.stats.upvotes}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>{' '}
                    {card.stats.downvotes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="scroll-buttons">
          <button className="scroll-button" onClick={scrollUp}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-up-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
              />
            </svg>
          </button>
          <button className="scroll-button" onClick={scrollDown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Upload Form Popup */}
      {isUploadFormVisible && (
        <>
          <div
            className="overlay"
            onClick={toggleUploadForm}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 10,
            }}
          ></div>

          <div
            className="popup"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              zIndex: 20,
              width: '400px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h6
              style={{
                fontSize: '20px',
                marginBottom: '15px',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Upload Project
            </h6>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showUploadSuccessPopup();
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '500',
                }}
              >
                Project Title
                <input
                  type="text"
                  required
                  style={{
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '500',
                }}
              >
                Description
                <textarea
                  required
                  style={{
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                    resize: 'none',
                    height: '80px',
                  }}
                ></textarea>
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '500',
                }}
              >
                Category
                <select
                  required
                  style={{
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                  }}
                >
                  <option value="" disabled selected>
                    Select a category
                  </option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-apps">Mobile Apps</option>
                  <option value="data-science">Data Science</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '500',
                }}
              >
                Tags (comma-separated)
                <input
                  type="text"
                  placeholder="e.g., React, JavaScript, AI"
                  style={{
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '500',
                }}
              >
                Upload File
                <input
                  type="file"
                  required
                  style={{
                    marginTop: '5px',
                    fontSize: '14px',
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
              >
                Upload
              </button>
            </form>
          </div>

        </>
      )}
    </div>
  );
};

export default CardSection;
