import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products.php")
      .then((res) => res.json())
      .then((data) => {
        const availableProducts = data.filter(product => Number(product.stock) > 0);
        setProducts(availableProducts);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full bg-[#161515] h-auto min-h-screen mt-20 justify-center pb-20 font-montserrat">
        <div className="container mt-10 px-4">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Ürünlerimiz</h1>
            <p className="text-[#888] mt-2 text-base md:text-lg max-w-2xl md:max-w-none">
              Fitness hedeflerinize ulaşmanız için gereken tüm ürünler,
              mağazamızdan temin edebilirsiniz.
            </p>
          </div>
          
          <div className="flex flex-row flex-wrap gap-6 md:gap-8 my-10 justify-center md:justify-start">
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
              <div className="w-full text-center py-20">
                <p className="text-[#555] text-lg md:text-xl">
                  Şu an stoklarımızda ürün bulunmamaktadır.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;