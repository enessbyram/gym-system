import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocation,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="flex w-full bg-[#161515] h-auto min-h-screen mt-20 justify-start items-center flex-col font-montserrat pb-20">
        
        <div className="container py-8 flex flex-col gap-4 px-4 text-center md:text-left">
          <h1 className="text-white text-3xl md:text-4xl font-bold">İletişim</h1>
          <p className="text-base md:text-lg text-[#5b5b5b]">
            Sorularınız için bize ulaşın veya tesisimizi ziyaret edin
          </p>
        </div>

        <div className="container flex flex-col md:flex-row gap-8 px-4 mb-12">
          
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            
            {/* ADRES KUTUSU (MOR) */}
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#7c3aed] w-full p-6 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#7c3aed]/20 rounded-xl shrink-0">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-[#7c3aed] text-lg md:text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg md:text-xl">Adres</h2>
                <p className="text-[#5b5b5b] text-sm md:text-base">Atatürk Caddesi No: 123</p>
                <p className="text-[#5b5b5b] text-sm md:text-base">Kadıköy / İstanbul</p>
              </div>
            </div>

            {/* TELEFON KUTUSU (MOR) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#7c3aed] w-full p-6 transition-all duration-500">
              <div className="flex flex-row gap-4">
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#7c3aed]/20 rounded-xl shrink-0">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-[#7c3aed] text-lg md:text-xl"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-lg md:text-xl">Telefon</h2>
                  <p className="text-[#5b5b5b] text-sm md:text-base">+90 555 123 45 67</p>
                </div>
              </div>
              <div className="bg-[#7c3aed] text-white text-sm md:text-lg rounded-xl px-4 py-2 cursor-pointer hover:bg-[#6d28d9] transition-all duration-300 self-start sm:self-center text-center drop-shadow shadow-[#7c3aed]/50">
                Hemen Ara
              </div>
            </div>

            {/* E-POSTA KUTUSU (YEŞİL - Aynen Bırakıldı, sadece mail değişti) */}
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#22c55e] w-full p-6 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#264931] rounded-xl shrink-0">
                <FontAwesomeIcon
                  icon={faMailBulk}
                  className="text-[#22c55e] text-lg md:text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg md:text-xl">E-posta</h2>
                <p className="text-[#5b5b5b] text-sm md:text-base">info@lumexconsulting.com</p>
              </div>
            </div>

            {/* INSTAGRAM KUTUSU (MOR) */}
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#7c3aed] w-full p-6 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#7c3aed]/20 rounded-xl shrink-0">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-[#7c3aed] text-lg md:text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg md:text-xl">Instagram</h2>
                <p className="text-[#5b5b5b] text-sm md:text-base">@lumexconsulting</p>
              </div>
            </div>

            {/* ÇALIŞMA SAATLERİ (MOR) */}
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#7c3aed] w-full p-6 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#7c3aed]/20 rounded-xl shrink-0">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#7c3aed] text-lg md:text-xl"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-white text-lg md:text-xl">Çalışma Saatleri</h2>
                <div className="flex flex-row justify-between text-sm md:text-base pb-1">
                  <p className="text-[#5b5b5b]">Pazartesi - Cuma</p>
                  <p className="text-white">06:00 - 23:00</p>
                </div>
                <div className="flex flex-row justify-between text-sm md:text-base pb-1">
                  <p className="text-[#5b5b5b]">Cumartesi</p>
                  <p className="text-white">08:00 - 22:00</p>
                </div>
                <div className="flex flex-row justify-between text-sm md:text-base">
                  <p className="text-[#5b5b5b]">Pazar</p>
                  <p className="text-white">09:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-100 md:h-auto min-h-100 md:min-h-125 rounded-2xl overflow-hidden border border-[#383737]">
            <iframe
              title="Konum Haritası"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650490016629!2d29.02322531541334!3d40.99026397930263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab86096535263%3A0x6291396739066601!2zS2FkxLFrw7Y5LCAnxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1644933939931!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;