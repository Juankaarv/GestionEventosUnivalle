import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Importamos los estilos del slider

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambiar imagen cada 3 segundos

    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonte
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="slider-image" />
      </div>

      {/* Botones de navegación */}
      <button className="slider-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="slider-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
