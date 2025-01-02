import React, { useRef } from 'react';
import './Styles/CardSection.css';

const CardSection = ({ rowsToShow = 1 }) => {
  const cardsContainerRef = useRef(null);

  const scrollUp = () => {
    cardsContainerRef.current.scrollBy({ top: -352, behavior: 'smooth' });
  };

  const scrollDown = () => {
    cardsContainerRef.current.scrollBy({ top: 352, behavior: 'smooth' });
  };

  // Generate some dummy data -> Replace this with actual data later
  const cards = Array.from({ length: 12 }, (_, index) => ({
    title: `Project Title ${index + 1}`,
    description: `This is a brief description of project ${index + 1}. It highlights the main features and objectives of the project, providing an overview of what the project aims to achieve.`,
    stats: {
      downloads: 123 * (index + 1),
      upvotes: 456 * (index + 1),
      downvotes: 12 * (index + 1),
    },
  }));

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
              <div className="card-body">{card.description}</div>
              <div className="card-footer">
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg> {card.stats.downloads}</span>
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg> {card.stats.upvotes}</span>
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg> {card.stats.downvotes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-buttons">
        <button className='scroll-button' onClick={scrollUp}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
        </svg></button>
        <button className='scroll-button' onClick={scrollDown}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
        </svg></button>
      </div>
    </div>
  );
};

export default CardSection;
