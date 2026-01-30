import React from 'react';

const ProductCard = ({ image, title, price, description }) => {
  return (
    <div className="group w-70 h-100 bg-[#222121] rounded-xl border border-[#414141] flex flex-col transition-all duration-300 hover:border-[#009ee1] hover:shadow-[0_0_20px_rgba(0,158,225,0.6)] cursor-pointer overflow-hidden">
      
      {/* 1. KISIM: Resim Alanı */}
      <div className="w-full h-75 overflow-hidden bg-[#1a1a1a]">
        {image ? (
            <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-[#555]">Resim Yok</div>
        )}
      </div>

      {/* 2. KISIM: Alt Bilgi ve Açıklama Alanı */}
      <div className="relative flex-1 flex flex-col justify-center pl-6 bg-[#222121] overflow-hidden">
        
        {/* Standart Görünüm */}
        <div className="flex flex-col justify-center transition-opacity duration-300 group-hover:opacity-20">
            <h3 className="text-white text-lg font-semibold group-hover:text-[#009ee1] transition-colors truncate pr-4">
                {title} 
            </h3>
            <h1 className="text-[#009ee1] text-xl font-semibold">
                {price} 
            </h1>
        </div>

        {/* HOVER KATMANI */}
        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center p-6 z-10">
            <p className="text-gray-200 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {description}
            </p>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;