import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost/gym-system/api/sliders.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSlides(data);
        }
      })
      .catch((err) => console.error("Slider verisi çekilemedi:", err));
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (slides.length === 0) {
    return (
      <div className="mt-20 h-96 md:h-120 w-full m-auto bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="mt-20 h-96 md:h-120 w-full m-auto relative group font-montserrat select-none">
      
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        className="w-full h-full bg-center bg-cover duration-500 ease-out transition-all"
      ></div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div 
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-5 text-xl md:text-2xl rounded-full p-2 md:p-3 bg-black/40 text-white cursor-pointer hover:bg-black/70 transition-colors z-20 active:scale-95"
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center" />
      </div>

      <div 
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-5 text-xl md:text-2xl rounded-full p-2 md:p-3 bg-black/40 text-white cursor-pointer hover:bg-black/70 transition-colors z-20 active:scale-95"
        onClick={nextSlide}
      >
         <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center" />
      </div>

      <div className="absolute cursor-default bottom-10 md:bottom-16 left-4 md:left-24 flex items-center gap-2 md:gap-4 z-10">
          
          <FontAwesomeIcon 
            icon={faDumbbell} 
            className="text-[#009fe2] rotate-135 text-4xl md:text-6xl drop-shadow-lg" 
          />
          
          <div className="flex items-center font-bold text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              <span className="text-[#009fe2]">EA</span>
              <span className="text-[#bbb] mx-2 text-2xl md:text-5xl">|</span>
              <span className="text-white">WellnessClub</span>
          </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            onClick={() => goToSlide(slideIndex)}
            className={`h-1.5 md:h-2 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${
              currentIndex === slideIndex 
                ? "w-6 md:w-8 bg-[#00c750]" 
                : "w-1.5 md:w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;