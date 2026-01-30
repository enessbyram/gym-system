import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  faBagShopping,
  faCheck,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const Packages = () => {
  const [gymPackages, setGymPackages] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/gym-system/api/packages.php")
      .then((res) => res.json())
      .then((data) => {
        setGymPackages(data.filter((pkg) => pkg.type === "gym"));
        setPtPackages(data.filter((pkg) => pkg.type === "pt"));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Paket verisi çekilemedi:", err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString("tr-TR");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-full h-auto min-h-screen bg-[#161515] mt-20 justify-start pb-20 font-montserrat">
        
        <div className="container mt-10 px-4 text-center md:text-left">
          <h1 className="text-white text-3xl md:text-5xl font-bold">Üyelik Paketleri</h1>
          <p className="text-[#888] mt-2 text-base md:text-lg">
            Size en uygun paketi seçin ve fitness yolculuğunuza başlayın.
          </p>
        </div>

        <div className="container mt-8 px-4 flex flex-row items-center justify-center md:justify-start gap-2">
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-[#009ee1] text-2xl md:text-3xl rotate-135"
          />
          <h3 className="text-2xl md:text-3xl text-white font-bold">
            Spor Salonu Paketleri
          </h3>
        </div>

        <div className="container mt-6 px-4 flex flex-row flex-wrap gap-4 justify-center md:justify-start">
          {loading ? (
            <p className="text-[#5b5b5b]">Yükleniyor...</p>
          ) : gymPackages.length > 0 ? (
            gymPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] min-w-70 h-auto my-4 rounded-2xl hover:border-[#009ee1] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col"
              >
                <div className="px-6 py-6 flex justify-between items-center flex-row">
                  <div className="flex items-center justify-center bg-[#243a47] w-12 h-12 rounded-xl shrink-0">
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      className="text-[#009ee1] text-2xl rotate-135"
                    />
                  </div>
                  <h3 className="text-[#009ee1] text-2xl md:text-3xl font-semibold">
                    {formatPrice(pkg.price)}₺
                  </h3>
                </div>

                <h1 className="text-white text-xl md:text-2xl font-semibold mx-6">
                  {pkg.title}
                </h1>

                <div className="mt-4 mb-6">
                  <p className="text-[#888] text-sm md:text-base mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#009ee1] mr-2"
                    />
                    {pkg.duration_days} Gün Geçerli
                  </p>

                  {pkg.features &&
                    pkg.features.map((feature, index) => (
                      <p key={index} className="text-[#888] text-sm md:text-base mx-6 mb-2">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-[#009ee1] mr-2"
                        />
                        {feature}
                      </p>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#5b5b5b]">Aktif spor salonu paketi bulunmuyor.</p>
          )}
        </div>

        <div className="container mt-12 px-4 flex flex-row items-center justify-center md:justify-start gap-2">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-[#24c15d] text-2xl md:text-3xl"
          />
          <h3 className="text-2xl md:text-3xl text-white font-bold">
            Personal Training Paketleri
          </h3>
        </div>

        <div className="container mt-6 px-4 flex flex-row flex-wrap gap-4 justify-center md:justify-start">
          {ptPackages.length > 0 ? (
            ptPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] min-w-70 h-auto my-4 rounded-2xl hover:border-[#24c15d] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col"
              >
                <div className="px-6 py-6 flex justify-between items-center flex-row">
                  <div className="flex items-center justify-center bg-[#28412e] w-12 h-12 rounded-xl shrink-0">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="text-[#24c15d] text-2xl"
                    />
                  </div>
                  <h3 className="text-[#24c15d] text-2xl md:text-3xl font-semibold">
                    {formatPrice(pkg.price)}₺
                  </h3>
                </div>

                <h1 className="text-white text-xl md:text-2xl font-semibold mx-6">
                  {pkg.title}
                </h1>

                <div className="mt-4 mb-6">
                  <p className="text-[#888] text-sm md:text-base mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#24c15d] mr-2"
                    />
                    {pkg.session_count} Adet PT Dersi
                  </p>
                  <p className="text-[#888] text-sm md:text-base mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#24c15d] mr-2"
                    />
                    {pkg.duration_days} Gün İçinde Kullanılmalı
                  </p>

                  {pkg.features &&
                    pkg.features.map((feature, index) => (
                      <p key={index} className="text-[#888] text-sm md:text-base mx-6 mb-2">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-[#24c15d] mr-2"
                        />
                        {feature}
                      </p>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#5b5b5b]">Aktif PT paketi bulunmuyor.</p>
          )}
        </div>

        <div className="container px-4">
          <div className="bg-[#222121] border border-[#353434] min-h-80 my-8 px-6 md:px-10 py-10 rounded-2xl w-full flex flex-col items-center md:items-start">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mt-0 md:mt-6 text-center md:text-left">
              Paket Seçerken Bilmeniz Gerekenler
            </h2>
            <div className="w-full flex flex-col md:flex-row gap-8 mt-6">
              
              <div className="flex flex-col w-full md:w-1/4 items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] text-3xl" />
                </div>
                <h1 className="text-white text-xl my-4 font-bold">Esnek Kullanım</h1>
                <p className="text-sm md:text-base text-[#888]">
                  Spor salonu üyelikleri seçilen süre boyunca geçerlidir.
                </p>
              </div>

              <div className="flex flex-col w-full md:w-1/4 items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] text-3xl" />
                </div>
                <h1 className="text-white text-xl my-4 font-bold">PT Dersleri</h1>
                <p className="text-sm md:text-base text-[#888]">
                  PT Dersleri belirtilen süre içinde kullanılmalıdır.
                </p>
              </div>

              <div className="flex flex-col w-full md:w-1/4 items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] text-3xl" />
                </div>
                <h1 className="text-white text-xl my-4 font-bold">Randevu Sistemi</h1>
                <p className="text-sm md:text-base text-[#888]">
                  Tüm paketler randevu sistemimiz üzerinden aktif edilir.
                </p>
              </div>

              <div className="flex flex-col w-full md:w-1/4 items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] text-3xl" />
                </div>
                <h1 className="text-white text-xl my-4 font-bold">Destek</h1>
                <p className="text-sm md:text-base text-[#888]">
                  Daha fazla bilgi için iletişim bölümünden bizlere ulaşabilirsiniz.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Packages;