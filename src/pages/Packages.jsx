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
  // Verileri tutacak state'ler
  const [gymPackages, setGymPackages] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // API'den veri çekme
  useEffect(() => {
    fetch("http://localhost/gym-system/api/packages.php")
      .then((res) => res.json())
      .then((data) => {
        // Gelen veriyi tipine göre ayır
        setGymPackages(data.filter((pkg) => pkg.type === "gym"));
        setPtPackages(data.filter((pkg) => pkg.type === "pt"));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Paket verisi çekilemedi:", err);
        setLoading(false);
      });
  }, []);

  // Fiyat Formatlama (5000 -> 5.000)
  const formatPrice = (price) => {
    return Number(price).toLocaleString("tr-TR");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-full h-auto min-h-screen bg-[#161515] mt-20 justify-start pb-20">
        
        {/* Başlık Alanı */}
        <div className="container mt-10">
          <h1 className="text-white text-5xl font-bold">Üyelik Paketleri</h1>
          <p className="text-[#494949] mt-2 text-lg">
            Size en uygun paketi seçin ve fitness yolculuğunuza başlayın.
          </p>
        </div>

        {/* ==========================================
            1. BÖLÜM: SPOR SALONU PAKETLERİ (MAVİ)
           ========================================== */}
        <div className="container mt-8 flex flex-row items-center justify-start gap-2">
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-[#009ee1] text-3xl rotate-135"
          />
          <h3 className="text-3xl text-white font-bold">
            Spor Salonu Paketleri
          </h3>
        </div>

        <div className="container mt-6 flex flex-row flex-wrap gap-4">
          {loading ? (
            <p className="text-[#5b5b5b]">Yükleniyor...</p>
          ) : gymPackages.length > 0 ? (
            gymPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-1 min-w-75 h-auto my-4 rounded-2xl hover:border-[#009ee1] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col"
              >
                {/* Header: İkon ve Fiyat */}
                <div className="px-6 py-6 flex justify-between items-center flex-row">
                  <div className="flex items-center justify-center bg-[#243a47] w-12 h-12 rounded-xl">
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      className="text-[#009ee1] text-2xl rotate-135"
                    />
                  </div>
                  <h3 className="text-[#009ee1] text-3xl font-semibold">
                    {formatPrice(pkg.price)}₺
                  </h3>
                </div>

                {/* Başlık */}
                <h1 className="text-white text-2xl font-semibold mx-6">
                  {pkg.title}
                </h1>

                {/* Özellikler Listesi */}
                <div className="mt-4 mb-6">
                  {/* Süre Bilgisi (Otomatik Eklenen Özellik) */}
                  <p className="text-[#5b5b5b] text-md mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#009ee1] mr-2"
                    />
                    {pkg.duration_days} Gün Geçerli
                  </p>

                  {/* Admin Panelinden Girilen Diğer Özellikler */}
                  {pkg.features &&
                    pkg.features.map((feature, index) => (
                      <p key={index} className="text-[#5b5b5b] text-md mx-6 mb-2">
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

        {/* ==========================================
            2. BÖLÜM: PT PAKETLERİ (YEŞİL)
           ========================================== */}
        <div className="container mt-8 flex flex-row items-center justify-start gap-2">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-[#24c15d] text-3xl"
          />
          <h3 className="text-3xl text-white font-bold">
            Personal Training Paketleri
          </h3>
        </div>

        <div className="container mt-6 flex flex-row flex-wrap gap-4">
          {ptPackages.length > 0 ? (
            ptPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-1 min-w-75 h-auto my-4 rounded-2xl hover:border-[#24c15d] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col"
              >
                {/* Header: İkon ve Fiyat */}
                <div className="px-6 py-6 flex justify-between items-center flex-row">
                  <div className="flex items-center justify-center bg-[#28412e] w-12 h-12 rounded-xl">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="text-[#24c15d] text-2xl"
                    />
                  </div>
                  <h3 className="text-[#24c15d] text-3xl font-semibold">
                    {formatPrice(pkg.price)}₺
                  </h3>
                </div>

                {/* Başlık */}
                <h1 className="text-white text-2xl font-semibold mx-6">
                  {pkg.title}
                </h1>

                {/* Özellikler Listesi */}
                <div className="mt-4 mb-6">
                  {/* Ders ve Süre Bilgisi */}
                  <p className="text-[#5b5b5b] text-md mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#24c15d] mr-2"
                    />
                    {pkg.session_count} Adet PT Dersi
                  </p>
                  <p className="text-[#5b5b5b] text-md mx-6 mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#24c15d] mr-2"
                    />
                    {pkg.duration_days} Gün İçinde Kullanılmalı
                  </p>

                  {/* Admin Panelinden Girilen Diğer Özellikler */}
                  {pkg.features &&
                    pkg.features.map((feature, index) => (
                      <p key={index} className="text-[#5b5b5b] text-md mx-6 mb-2">
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

        {/* ==========================================
            3. BÖLÜM: BİLGİLENDİRME (STATİK)
           ========================================== */}
        <div className="container">
          <div className="bg-[#222121] border border-[#353434] min-h-80 my-4 px-10 py-10 rounded-2xl w-full flex flex-col items-start justify-start">
            <h2 className="text-white text-3xl font-semibold mt-6">
              Paket Seçerken Bilmeniz Gerekenler
            </h2>
            <div className="container flex w-full flex-col md:flex-row gap-8 md:gap-0">
              <div className="flex flex-col w-full md:w-1/4">
                <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center mt-6">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#009ee1] text-3xl"
                  />
                </div>
                <h1 className="text-white text-xl my-4">Esnek Kullanım</h1>
                <p className="text-md text-[#565555]">
                  Spor salonu üyelikleri seçilen süre boyunca geçerlidir.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center mt-6">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#24c15d] text-3xl"
                  />
                </div>
                <h1 className="text-white text-xl my-4">PT Dersleri</h1>
                <p className="text-md text-[#565555]">
                  PT Dersleri belirtilen süre içinde kullanılmalıdır.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center mt-6">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#009ee1] text-3xl"
                  />
                </div>
                <h1 className="text-white text-xl my-4">Randevu Sistemi</h1>
                <p className="text-md text-[#565555]">
                  Tüm paketler randevu sistemimiz üzerinden aktif edilir.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center mt-6">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#24c15d] text-3xl"
                  />
                </div>
                <h1 className="text-white text-xl my-4">Destek</h1>
                <p className="text-md text-[#565555]">
                  Daha fazla bilgi için iletişim bölümünden bizlere
                  ulaşabilirsiniz.
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