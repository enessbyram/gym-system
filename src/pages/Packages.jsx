import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { faBagShopping, faCheck, faDumbbell } from "@fortawesome/free-solid-svg-icons";

const Packages = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-full h-auto min-h-120 bg-[#161515] mt-20 justify-start">
        <div className="container mt-10">
          <h1 className="text-white text-5xl font-bold">Üyelik Paketleri</h1>
          <p className="text-[#494949] mt-2 text-lg">
            Size en uygun paketi seçin ve fitness yolculuğunuza başlayın.
          </p>
        </div>
        <div className="container mt-8 flex flex-row items-center justify-start gap-2">
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-[#009ee1] text-3xl rotate-135"
          />
          <h3 className="text-3xl text-white font-bold">
            Spor Salonu Paketleri
          </h3>
        </div>
        <div className="container mt-6 flex flex-row gap-4">
          <div className="container w-100 h-auto my-4 rounded-2xl hover:border-[#009ee1] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col">
            <div className="px-6 py-6 flex justify-between items-center flex-row">
              <div className="flex items-center justify-center bg-[#243a47] w-12 h-12 rounded-xl">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  className="text-[#009ee1] text-2xl rotate-135"
                />
              </div>
              <h3 className="text-[#009ee1] text-3xl font-semibold">5000₺</h3>
            </div>
            <h1 className="text-white text-2xl font-semibold mx-6">
              1 Ay Spor Salonu
            </h1>
            <p className="text-[#5b5b5b] text-md mx-6 mt-4 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
              30 Gün Geçerli
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
              Tüm Ekipmanlara Erişim
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-4">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
                Sınırsız Kullanım
            </p>
          </div>
          <div className="container w-100 h-auto my-4 rounded-2xl hover:border-[#009ee1] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col">
            <div className="px-6 py-6 flex justify-between items-center flex-row">
              <div className="flex items-center justify-center bg-[#243a47] w-12 h-12 rounded-xl">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  className="text-[#009ee1] text-2xl rotate-135"
                />
              </div>
              <h3 className="text-[#009ee1] text-3xl font-semibold">10000₺</h3>
            </div>
            <h1 className="text-white text-2xl font-semibold mx-6">
              3 Ay Spor Salonu
            </h1>
            <p className="text-[#5b5b5b] text-md mx-6 mt-4 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
              90 Gün Geçerli
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
              Tüm Ekipmanlara Erişim
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-4">
              <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] mr-2" />
                Sınırsız Kullanım
            </p>
          </div>
        </div>
        <div className="container mt-8 flex flex-row items-center justify-start gap-2">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-[#24c15d] text-3xl"
          />
          <h3 className="text-3xl text-white font-bold">
            Personal Training Paketleri
          </h3>
        </div>
        <div className="container mt-6 flex flex-row gap-4">
          <div className="container w-100 h-auto my-4 rounded-2xl hover:border-[#24c15d] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col">
            <div className="px-6 py-6 flex justify-between items-center flex-row">
              <div className="flex items-center justify-center bg-[#28412e] w-12 h-12 rounded-xl">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-[#24c15d] text-2xl"
                />
              </div>
              <h3 className="text-[#24c15d] text-3xl font-semibold">9000₺</h3>
            </div>
            <h1 className="text-white text-2xl font-semibold mx-6">
              10 PT Dersi
            </h1>
            <p className="text-[#5b5b5b] text-md mx-6 mt-4 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              10 Adet PT Dersi
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              40 Gün İçinde Kullanılmalı
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-4">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
                Kişiselleştirilmiş Program
            </p>
          </div>
          <div className="container w-100 h-auto my-4 rounded-2xl hover:border-[#24c15d] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col">
            <div className="px-6 py-6 flex justify-between items-center flex-row">
              <div className="flex items-center justify-center bg-[#28412e] w-12 h-12 rounded-xl">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-[#24c15d] text-2xl"
                />
              </div>
              <h3 className="text-[#24c15d] text-3xl font-semibold">17000₺</h3>
            </div>
            <h1 className="text-white text-2xl font-semibold mx-6">
              20 PT Dersi
            </h1>
            <p className="text-[#5b5b5b] text-md mx-6 mt-4 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              10 Adet PT Dersi
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              60 Gün İçinde Kullanılmalı
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-4">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
                Kişiselleştirilmiş Program
            </p>
          </div>
          <div className="container w-100 h-auto my-4 rounded-2xl hover:border-[#24c15d] transition-all hover:scale-102 border border-[#353434] bg-[#222121] flex flex-col">
            <div className="px-6 py-6 flex justify-between items-center flex-row">
              <div className="flex items-center justify-center bg-[#28412e] w-12 h-12 rounded-xl">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-[#24c15d] text-2xl"
                />
              </div>
              <h3 className="text-[#24c15d] text-3xl font-semibold">10000₺</h3>
            </div>
            <h1 className="text-white text-2xl font-semibold mx-6">
              30 PT Dersi
            </h1>
            <p className="text-[#5b5b5b] text-md mx-6 mt-4 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              30 Adet PT Dersi
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
              90 Gün İçinde Kullanılmalı
            </p>
            <p className="text-[#5b5b5b] text-md mx-6 mb-4">
              <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] mr-2" />
                Kişiselleştirilmiş Program
            </p>
          </div>
        </div>
        <div className="bg-[#222121] mr-10 border border-[#353434] min-h-80 my-4 px-10 py-10 rounded-2xl w-309 flex flex-col items-start justify-start">
            <h2 className="text-white text-3xl font-semibold mt-6">Paket Seçerken Bilmeniz Gerekeler</h2>
            <div className="container flex w-full flex-row">
                <div className="flex flex-col w-1/4">
                    <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center mt-6">
                        <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] text-3xl" />
                    </div>
                    <h1 className="text-white text-xl my-4">Esnek Kullanım</h1>
                    <p className="text-md text-[#565555]">Spor salonu üyelikleri seçilen süre boyunca geçerlidir.</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center mt-6">
                        <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] text-3xl" />
                    </div>
                    <h1 className="text-white text-xl my-4">PT Dersleri</h1>
                    <p className="text-md text-[#565555]">PT Dersleri belirtilen süre içinde kullanılmalıdır.</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <div className="w-16 h-16 bg-[#243a47] rounded-xl flex items-center justify-center mt-6">
                        <FontAwesomeIcon icon={faCheck} className="text-[#009ee1] text-3xl" />
                    </div>
                    <h1 className="text-white text-xl my-4">Randevu Sistemi</h1>
                    <p className="text-md text-[#565555]">Tüm paketler randevu sistemimiz üzerinden aktif edilir.</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <div className="w-16 h-16 bg-[#28412e] rounded-xl flex items-center justify-center mt-6">
                        <FontAwesomeIcon icon={faCheck} className="text-[#24c15d] text-3xl" />
                    </div>
                    <h1 className="text-white text-xl my-4">Destek</h1>
                    <p className="text-md text-[#565555]">Daha fazla bilgi için iletişim bölümünden bizlere ulaşabilirsiniz.</p>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Packages;
