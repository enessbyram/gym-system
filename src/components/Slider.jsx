import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  // Verileri tutacak state
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetch("http://localhost/gym-system/api/sliders.php")
      .then((res) => res.json())
      .then((data) => {
        // Sadece aktif olanları veya tümünü alabiliriz.
        // API zaten image yolunu tam URL olarak veriyor.
        if (data.length > 0) {
          setSlides(data);
        }
      })
      .catch((err) => console.error("Slider verisi çekilemedi:", err));
  }, []);

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

  // Eğer veri henüz yüklenmediyse veya veri yoksa, loading veya placeholder göster
  // Bu kontrolü yapmazsak "slides[currentIndex] undefined" hatası alırız.
  if (slides.length === 0) {
    return (
      <div className="mt-20 h-120 w-full m-auto bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Yükleniyor...</div>
      </div>
    );
  }

  return (
    // Ana Container (Tasarım aynen korundu)
    <div className="mt-20 h-120 w-full m-auto relative group font-montserrat">
      
      {/* Arkaplan Resmi - Backend verisi 'image' key'i ile geliyor */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        className="w-full h-full bg-center bg-cover duration-500 ease-out transition-all"
      ></div>

      {/* Siyah Katman (Overlay) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Sol Ok */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors z-20"
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 flex items-center justify-center" />
      </div>

      {/* Sağ Ok */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors z-20"
        onClick={nextSlide}
      >
         <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 flex items-center justify-center" />
      </div>

      {/* Logo ve Yazı Alanı */}
      <div className="absolute cursor-default bottom-16 left-8 md:left-25 flex items-center text-4xl md:text-6xl gap-3 z-10">
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
            key={slide.id} // Backend ID'sini key olarak kullanmak daha sağlıklıdır
            onClick={() => goToSlide(slideIndex)}
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