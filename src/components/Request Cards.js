import React, { useRef, useState } from 'react';
import './Styles/CardSection.css';

const RequestCardSection = ({ rowsToShow = 1 }) => {
    const cardsContainerRef = useRef(null);
    const [expandedCards, setExpandedCards] = useState({}); // State to track expanded cards

    const scrollUp = () => {
        cardsContainerRef.current.scrollBy({ top: -352, behavior: 'smooth' });
    };

    const scrollDown = () => {
        cardsContainerRef.current.scrollBy({ top: 352, behavior: 'smooth' });
    };

    const cards = Array.from({ length: 12 }, (_, index) => ({
        title: `Request Title ${index + 1}`,
        description: `This is a detailed description of request ${index + 1}. It highlights the main requirements and objectives of the request, providing an in-depth overview of what the request is about. The request aims to address specific needs and challenges, offering a comprehensive solution that is both effective and efficient. The description includes various aspects such as the background, the expected outcomes, and the potential impact of the request. It also outlines the key steps and milestones involved in fulfilling the request, ensuring that all necessary details are covered.`,
        tags: ['tag1', 'tag2', 'tag3'],
        stats: {
            requestcount: 123 * (index + 1),
            comments: 456 * (index + 1),
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

    return (
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
                            <div className="card-header">{card.title}</div>
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
                                        fill="currentColor"
                                        className="bi bi-person-fill-up"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg>{' '}
                                    {card.stats.requestcount}
                                </span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="bi bi-chat"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                        </svg>
                                    {card.stats.comments}
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
    );
};

export default RequestCardSection;
