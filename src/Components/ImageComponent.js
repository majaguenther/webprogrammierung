import React from 'react';
import './ImageComponent.css';

const ImageComponent = ({ imagePath, className  }) => {
  return (
    <div className={className} >
      {imagePath ? (
        <img src={imagePath} alt="Dynamisches Bild" />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ImageComponent;
