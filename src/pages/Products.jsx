import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

import bccaImg from "../assets/product-images/bcca.jpg";
import wheyImg from "../assets/product-images/protein.jpg"; // Bu resimlerin var olduğunu varsayıyorum
import glovesImg from "../assets/product-images/eldiven.jpg";
import matImg from "../assets/product-images/mat.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      image: wheyImg,
      title: "Whey Protein",
      price: "1.200 ₺",
      description:
        "Hızlı emilim sağlayan, kas onarımını destekleyen yüksek kaliteli protein tozu.",
    },
    {
      id: 2,
      image: bccaImg,
      title: "BCAA",
      price: "900 ₺",
      description:
        "Kas yorgunluğunu azaltan ve toparlanmayı hızlandıran amino asit desteği.",
    },
    {
      id: 3,
      image: glovesImg,
      title: "Boks Eldiveni",
      price: "300 ₺",
      description:
        "Ağırlık antrenmanlarında ellerinizi koruyan, kaydırmaz özel tasarım eldiven.",
    },
    {
      id: 4,
      image: matImg,
      title: "Yoga Matı",
      price: "450 ₺",
      description:
        "Konforlu egzersiz deneyimi için kaymaz tabanlı, dayanıklı mat.",
    },
    {
      id: 5,
      image: wheyImg,
      title: "Whey Protein",
      price: "1.200 ₺",
      description:
        "Hızlı emilim sağlayan, kas onarımını destekleyen yüksek kaliteli protein tozu.",
    },
    {
      id: 6,
      image: bccaImg,
      title: "BCAA",
      price: "900 ₺",
      description:
        "Kas yorgunluğunu azaltan ve toparlanmayı hızlandıran amino asit desteği.",
    },
    {
      id: 7,
      image: glovesImg,
      title: "Boks Eldiveni",
      price: "300 ₺",
      description:
        "Ağırlık antrenmanlarında ellerinizi koruyan, kaydırmaz özel tasarım eldiven.",
    },
    {
      id: 8,
      image: matImg,
      title: "Yoga Matı",
      price: "450 ₺",
      description:
        "Konforlu egzersiz deneyimi için kaymaz tabanlı, dayanıklı mat.",
    },
    {
      id: 9,
      image: wheyImg,
      title: "Whey Protein",
      price: "1.200 ₺",
      description:
        "Hızlı emilim sağlayan, kas onarımını destekleyen yüksek kaliteli protein tozu.",
    },
    {
      id: 10,
      image: bccaImg,
      title: "BCAA",
      price: "900 ₺",
      description:
        "Kas yorgunluğunu azaltan ve toparlanmayı hızlandıran amino asit desteği.",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex w-full bg-[#161515] h-auto min-h-120 mt-20 justify-center">
        <div className="container mt-10">
          <h1 className="text-5xl font-bold text-white">Ürünlerimiz</h1>
          <p className="text-[#494949] mt-2 text-lg">
            Fitness hedeflerinize ulaşmanız için gereken tüm ürünler,
            mağazamızdan temin edebilirsiniz.
          </p>
          <div className="flex flex-row flex-wrap gap-8 my-10 justify-start">
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
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Products;
