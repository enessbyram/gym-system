import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/gym-system/api/products.php")
      .then((res) => res.json())
      .then((data) => {
        // Sadece stoğu 0'dan büyük olanları göster
        const availableProducts = data.filter(product => Number(product.stock) > 0);
        setProducts(availableProducts);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full bg-[#161515] h-auto min-h-screen mt-20 justify-center pb-20">
        <div className="container mt-10">
          <h1 className="text-5xl font-bold text-white">Ürünlerimiz</h1>
          <p className="text-[#494949] mt-2 text-lg">
            Fitness hedeflerinize ulaşmanız için gereken tüm ürünler,
            mağazamızdan temin edebilirsiniz.
          </p>
          
          <div className="flex flex-row flex-wrap gap-8 my-10 justify-start">
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
                <p className="text-[#555] text-xl">
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