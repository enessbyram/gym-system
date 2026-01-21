import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDumbbell,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

const Membership = () => {
  return (
    <div className="bg-[#161515] w-full h-auto py-20 flex flex-col items-center">
      <div className="container flex flex-col gap-4 justify-start mb-10">
        <h1 className="text-5xl font-bold text-white">Üyelik Paketleri</h1>
        <p className="text-[#414141] text-lg">
          Size en uygun üyelik paketini seçin ve fitness yolculuğunuza başlayın.
        </p>
      </div>

      {/* DÜZELTME BURADA YAPILDI: 'items-start' eklendi. */}
      {/* Bu sayede biri açılınca diğeri uzamaz, kendi boyutunda kalır. */}
      <div className="container flex flex-row flex-wrap gap-8 justify-center items-start">
        
        {/* 1. KUTU: SPOR SALONU (MAVİ) */}
        <div className="relative group w-full md:w-[45%] bg-[#1e1e1e] rounded-2xl border border-[#333] overflow-hidden transition-all duration-500 hover:border-[#555] hover:shadow-[0_0_40px_rgba(0,158,225,0.4)]">
          {/* --- SABİT ÜST KISIM (BAŞLIK VE İKON) --- */}
          <div className="h-32 flex items-center px-6 relative z-10">
            {/* İkon Kutusu */}
            <div className="w-16 h-16 bg-[#009ee1]/20 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-3xl text-[#009ee1] rotate-135"
              />
            </div>

            {/* Yazı */}
            <h3 className="text-white text-2xl font-bold">Spor Salonu</h3>
          </div>

          {/* --- GİZLİ OLAN AÇILIR KISIM --- */}
          <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-700 ease-in-out px-6 pb-6">
            <div className="flex flex-col gap-3 pt-2">
              {/* 1. Fiyat Seçeneği */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#009ee1] transition-colors cursor-pointer group/item">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    1 Ay Spor Salonu
                  </span>
                  <span className="text-[#666] text-xs">30 gün geçerli</span>
                </div>
                <span className="text-[#009ee1] font-bold text-lg">5000₺</span>
              </div>

              {/* 2. Fiyat Seçeneği */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#009ee1] transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    3 Ay Spor Salonu
                  </span>
                  <span className="text-[#666] text-xs">90 gün geçerli</span>
                </div>
                <span className="text-[#009ee1] font-bold text-lg">10000₺</span>
              </div>
            </div>
          </div>

          {/* --- GLOW EFEKTİ --- */}
          <div className="absolute right-12 top-0 h-full w-40 bg-[#009ee1] rounded-full blur-[60px] opacity-20 pointer-events-none transition-all duration-500 group-hover:opacity-20"></div>
        </div>

        {/* 2. KUTU: PT DERSLERİ (YEŞİL) */}
        <div className="relative group w-full md:w-[45%] bg-[#1e1e1e] rounded-2xl border border-[#333] overflow-hidden transition-all duration-500 hover:border-[#555] hover:shadow-[0_0_20px_rgba(76,169,87,0.4)]">
          {/* --- SABİT ÜST KISIM --- */}
          <div className="h-32 flex items-center px-6 relative z-10">
            {/* İkon Kutusu - Yeşil */}
            <div className="w-16 h-16 bg-[#4ca957]/20 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-3xl text-[#4ca957]"
              />
            </div>

            {/* Yazı */}
            <h3 className="text-white text-2xl font-bold">PT Dersleri</h3>
          </div>

          {/* --- GİZLİ OLAN AÇILIR KISIM --- */}
          <div className="max-h-0 opacity-0 group-hover:max-h-150 group-hover:opacity-100 transition-all duration-700 ease-in-out px-6 pb-6">
            <div className="flex flex-col gap-3 pt-2 border-t border-[#333]">
              {/* 1. Seçenek: 10 PT Dersi */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#4ca957] transition-colors cursor-pointer group/item">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">10 PT Dersi</span>
                  <span className="text-[#666] text-xs">
                    10 ders • 40 gün içinde kullanılmalı
                  </span>
                </div>
                <span className="text-[#4ca957] font-bold text-lg">9000₺</span>
              </div>

              {/* 2. Seçenek: 20 PT Dersi */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#4ca957] transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">20 PT Dersi</span>
                  <span className="text-[#666] text-xs">
                    20 ders • 60 gün içinde kullanılmalı
                  </span>
                </div>
                <span className="text-[#4ca957] font-bold text-lg">17000₺</span>
              </div>

              {/* 3. Seçenek: 30 PT Dersi */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#4ca957] transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">30 PT Dersi</span>
                  <span className="text-[#666] text-xs">
                    30 ders • 90 gün içinde kullanılmalı
                  </span>
                </div>
                <span className="text-[#4ca957] font-bold text-lg">24000₺</span>
              </div>
            </div>
          </div>

          {/* --- GLOW EFEKTİ (YEŞİL) --- */}
          <div className="absolute right-15 top-0 h-full w-40 bg-[#4ca957] rounded-full blur-[60px] opacity-10 pointer-events-none transition-all duration-500 group-hover:opacity-20"></div>
        </div>
      </div>
      
      <div className="w-full mt-16 flex justify-center items-center">
        <button className="bg-[#009ee1] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#007bbd] transition duration-300 shadow-[0_0_20px_rgba(0,158,225,0.7)] hover:shadow-[0_0_30px_rgba(0,158,225,0.9)] flex items-center text-lg">
          <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] flex items-center">
            Tüm Paketleri Görüntüle
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Membership;