import React from 'react';

const ProductCard = ({ image, title, price, description }) => {

  // DÜZELTME: "/api/uploads/" yerine sadece "/uploads/" yapıyoruz.
  const API_BASE_URL = "/uploads/";

  const getImageUrl = (img) => {
    if (!img) return null;

    // Veritabanından gelen "localhost" veya yanlış yolları temizle
    if (img.includes("localhost") || img.includes("api/uploads")) {
        const fileName = img.split('/').pop();
        return `${API_BASE_URL}${fileName}`;
    }

    if (img.startsWith("http")) return img; 
    
    return `${API_BASE_URL}${img}`;
  };

  return (
    <div className="group w-full max-w-70 mx-auto md:mx-0 h-100 bg-[#222121] rounded-xl border border-[#414141] flex flex-col transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] cursor-pointer overflow-hidden font-montserrat">
      
      <div className="w-full h-75 overflow-hidden bg-[#1a1a1a]">
        {image ? (
            <img 
            src={getImageUrl(image)} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            onError={(e) => { 
                // Hata durumunda gizle
                e.target.style.display = 'none'; 
            }} 
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-[#555]">Resim Yok</div>
        )}
      </div>

      <div className="relative flex-1 flex flex-col justify-center pl-6 bg-[#222121] overflow-hidden">
        <div className="flex flex-col justify-center transition-opacity duration-300 group-hover:opacity-20">
            <h3 className="text-white text-lg font-semibold group-hover:text-[#7c3aed] transition-colors truncate pr-4">
                {title} 
            </h3>
            <h1 className="text-[#7c3aed] text-xl font-semibold">
                {price} 
            </h1>
        </div>
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