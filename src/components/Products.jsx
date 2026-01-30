import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "./ProductCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/gym-system/api/products.php")
      .then((res) => res.json())
      .then((data) => {
        // 1. ADIM: Sadece stoğu 0'dan büyük olanları filtrele
        const availableProducts = data.filter(product => Number(product.stock) > 0);
        
        // 2. ADIM: Filtrelenmiş listeden ilk 4'ünü al
        setProducts(availableProducts.slice(0, 4));
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <div className="bg-[#161515] w-full h-auto py-20 flex flex-col items-center"> 
      <div className="container flex flex-col gap-4 justify-start mb-10">
        <h1 className="text-5xl font-bold text-white">Öne Çıkan Ürünler</h1>
        <p className="text-[#414141] text-lg">
          Fitness yolculuğunuzda size rehberlik edecek en iyi ürünleri keşfedin.
        </p>
      </div>
      
      <div className="container flex flex-row flex-wrap gap-8 justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id}
              image={product.image}
              title={product.name}
              price={`${Number(product.price).toLocaleString('tr-TR')} ₺`} 
              description={product.description}
            />
          ))
        ) : (
          // Eğer hiç stoklu ürün yoksa veya yükleniyorsa
          <p className="text-[#555] italic">Şu an öne çıkan ürün bulunmuyor.</p>
        )}
      </div>

      <div className="w-full mt-16 flex justify-center items-center">
        <Link 
          to="/products" 
          className="bg-[#009ee1] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#007bbd] transition duration-300 shadow-[0_0_20px_rgba(0,158,225,0.7)] hover:shadow-[0_0_30px_rgba(0,158,225,0.9)] flex items-center text-lg"
        >
          <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] flex items-center">
            Tüm Ürünleri Görüntüle
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Products;