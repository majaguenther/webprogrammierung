import React, { useState } from 'react';
import './ImageComponent.css';

const ImageComponent = ({ imagePath, className }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleBackgroundClick = (e) => {
    if (isZoomed) {
      setIsZoomed(false);
    }
  };

  return (
    <div className={className} onClick={handleBackgroundClick}>
      {imagePath ? (
        <img 
          src={imagePath} 
          alt="Dynamisches Bild" 
          className={isZoomed ? 'zoomed' : ''} 
          onClick={handleImageClick} 
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ImageComponent;