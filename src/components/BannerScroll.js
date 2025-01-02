import React, { useState, useEffect, useRef } from 'react';
import './Styles/BannerScroll.css'; 

const BannerScroll = () => {
  const banners = [
    'Banner 1',
    'Banner 2',
    'Banner 3',
    'Banner 4'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);

  const bannersWrapperRef = useRef(null);
  const bannerRef = useRef(null);

  
  const moveLeft = () => {
    setCurrentIndex((prevIndex) => {
      
      return prevIndex === 0 ? banners.length - 1 : prevIndex - 1;
    });
  };

  
  const moveRight = () => {
    setCurrentIndex((prevIndex) => {
      
      return prevIndex === banners.length - 1 ? 0 : prevIndex + 1;
    });
  };

  
  useEffect(() => {
    if (bannerRef.current) {
      setBannerWidth(bannerRef.current.offsetWidth);
    }
  }, [banners]); 

  return (
    <div className="banner-container">
      
      <div
        className="banners-wrapper"
        ref={bannersWrapperRef}
        style={{ transform: `translateX(-${currentIndex * bannerWidth}px)` }}
      >
        {banners.map((banner, index) => (
          <div className="banner" key={index} ref={bannerRef}>
            {banner}
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={moveRight}>→</button>
    </div>
  );
};

export default BannerScroll;
