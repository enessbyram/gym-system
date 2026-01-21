import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "./ProductCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// Resimleri buraya import ediyoruz
import bccaImg from "../assets/product-images/bcca.jpg";
import wheyImg from "../assets/product-images/protein.jpg"; // Bu resimlerin var olduğunu varsayıyorum
import glovesImg from "../assets/product-images/eldiven.jpg";
import matImg from "../assets/product-images/mat.jpg";

const Products = () => {
  // Ürün verilerini bir dizi (array) içinde tutuyoruz
  const products = [
    {
      id: 1,
      image: wheyImg,
      title: "Whey Protein",
      price: "1.200 ₺",
      description: "Hızlı emilim sağlayan, kas onarımını destekleyen yüksek kaliteli protein tozu."
    },
    {
      id: 2,
      image: bccaImg,
      title: "BCAA",
      price: "900 ₺",
      description: "Kas yorgunluğunu azaltan ve toparlanmayı hızlandıran amino asit desteği."
    },
    {
      id: 3,
      image: glovesImg,
      title: "Boks Eldiveni",
      price: "300 ₺",
      description: "Ağırlık antrenmanlarında ellerinizi koruyan, kaydırmaz özel tasarım eldiven."
    },
    {
      id: 4,
      image: matImg,
      title: "Yoga Matı",
      price: "450 ₺",
      description: "Konforlu egzersiz deneyimi için kaymaz tabanlı, dayanıklı mat."
    }
  ];

  return (
    // h-200 yerine min-h-screen veya h-auto kullanmak içerik arttığında taşmayı önler, ama şimdilik senin yapını korudum.
    <div className="bg-[#161515] w-full h-auto py-20 flex flex-col items-center"> 
      <div className="container flex flex-col gap-4 justify-start mb-10">
        <h1 className="text-5xl font-bold text-white">Öne Çıkan Ürünler</h1>
        <p className="text-[#414141] text-lg">
          Fitness yolculuğunuzda size rehberlik edecek en iyi ürünleri keşfedin.
        </p>
      </div>
      
      {/* Kartların Listelenmesi */}
      <div className="container flex flex-row flex-wrap gap-8 justify-center">
        {products.map((product) => (
          <ProductCard 
            key={product.id} // React listelerinde unique bir key ister
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
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