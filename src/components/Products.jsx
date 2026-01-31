import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "./ProductCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products.php")
      .then((res) => res.json())
      .then((data) => {
        const availableProducts = data.filter(product => Number(product.stock) > 0);
        setProducts(availableProducts.slice(0, 4));
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <div className="bg-[#161515] w-full h-auto py-10 md:py-20 flex flex-col items-center font-montserrat"> 
      <div className="container px-4 flex flex-col gap-4 mb-10 items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white">Öne Çıkan Ürünler</h1>
        <p className="text-[#414141] text-base md:text-lg max-w-2xl md:max-w-none">
          Fitness yolculuğunuzda size rehberlik edecek en iyi ürünleri keşfedin.
        </p>
      </div>
      
      <div className="container px-4 flex flex-row flex-wrap gap-6 md:gap-8 justify-center">
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
          <p className="text-[#555] italic">Şu an öne çıkan ürün bulunmuyor.</p>
        )}
      </div>

      <div className="w-full mt-10 md:mt-16 flex justify-center items-center px-4">
        <Link 
          to="/products" 
          className="bg-[#009ee1] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#007bbd] transition duration-300 shadow-[0_0_20px_rgba(0,158,225,0.7)] hover:shadow-[0_0_30px_rgba(0,158,225,0.9)] flex items-center justify-center text-base md:text-lg w-full md:w-auto sm:w-150 max-sm:w-70"
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