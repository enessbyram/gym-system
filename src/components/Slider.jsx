import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDumbbell } from '@fortawesome/free-solid-svg-icons';

// Fotoğrafları import ediyoruz
import photo1 from "../assets/img/photo-1.jpg";
import photo2 from "../assets/img/photo-2.jpg";
import photo3 from "../assets/img/photo-3.jpg";

const slides = [
  { url: photo1, alt: "Spor Salonu Görünümü 1" },
  { url: photo2, alt: "Spor Salonu Görünümü 2" },
  { url: photo3, alt: "Spor Salonu Görünümü 3" },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Önceki slayta geçiş
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Sonraki slayta geçiş
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Noktalara tıklayınca o slayta gitme
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    // Ana Container (mt-20 ve yükseklik ayarları)
    <div className="mt-20 h-120 w-full m-auto relative group font-montserrat">
      
      {/* Arkaplan Resmi */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 ease-out"
      ></div>

      {/* Siyah Katman (Overlay) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Sol Ok */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors"
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 flex items-center justify-center" />
      </div>

      {/* Sağ Ok */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors"
        onClick={nextSlide}
      >
         <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 flex items-center justify-center" />
      </div>

      {/* Logo ve Yazı Alanı (YENİ EKLENDİ) */}
      <div className="absolute cursor-default bottom-16 left-25 flex items-center text-6xl gap-3 z-10">
          <FontAwesomeIcon icon={faDumbbell} className="text-[#009fe2] rotate-135" />
          <div className="flex items-center font-bold">
              <span className="text-[#009fe2]">EA</span>
              <span className="text-[#444] mx-2">|</span>
              <span className="text-white">WellnessClub</span>
          </div>
      </div>

      {/* Noktalar (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            // Aktif ise genişliği arttır (w-8) ve rengi koyu yeşil yap
            // Pasif ise küçük daire kal (w-3) ve rengi transparan beyaz yap
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex 
                ? "w-8 bg-[#00c750]" 
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;