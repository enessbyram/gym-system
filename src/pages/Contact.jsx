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
      <div className="flex w-full bg-[#161515] h-auto min-h-120 mt-20 justify-start items-center flex-col">
        <div className="container py-8 flex flex-col gap-4">
          <h1 className="text-white text-4xl font-bold">İletişim</h1>
          <p className="text-md text-[#5b5b5b]">
            Sorularınız için bize ulaşın veya tesisimizi ziyaret edin
          </p>
        </div>
        <div className="container flex flex-row gap-4 py-4 mb-12">
          <div className="flex flex-col gap-6 w-1/2">
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#1786ba] w-full h-auto py-6 px-8 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-[#243a47] rounded-xl">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-[#1786ba] text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-xl">Adres</h2>
                <p className="text-[#5b5b5b]">Atatürk Caddesi No: 123</p>
                <p className="text-[#5b5b5b]">Kadıköy / İstanbul</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-between border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#1786ba] w-full h-auto py-6 px-8 transition-all duration-500">
              <div className="flex flex-row gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-[#243a47] rounded-xl">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-[#1786ba] text-xl"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-xl">Telefon</h2>
                  <p className="text-[#5b5b5b]">+90 555 123 45 67</p>
                </div>
              </div>
              <div className="bg-[#039ee1] text-white text-lg rounded-xl px-4 py-2 cursor-pointer hover:bg-[#1786ba] transition-all duration-300 self-center drop-shadow drop-shadow-[#039ee1]">
                Hemen Ara
              </div>
            </div>
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#22c55e] w-full h-auto py-6 px-8 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-[#264931] rounded-xl">
                <FontAwesomeIcon
                  icon={faMailBulk}
                  className="text-[#22c55e] text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-xl">E-posta</h2>
                <p className="text-[#5b5b5b]">info@eagym.com</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#1786ba] w-full h-auto py-6 px-8 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-[#243a47] rounded-xl">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-[#1786ba] text-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-xl">Instagram</h2>
                <p className="text-[#5b5b5b]">@eawellnessclub</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 border border-[#383737] rounded-2xl bg-[#222121] hover:border-[#1786ba] w-full h-auto py-6 px-8 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-[#243a47] rounded-xl">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#1786ba] text-xl"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-white text-xl">Çalışma Saatleri</h2>
                <div className="flex flex-row justify-between">
                  <p className="text-[#5b5b5b]">Pazartesi - Cuma</p>
                  <p className="text-white">06:00 - 23:00</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-[#5b5b5b]">Cumartesi</p>
                  <p className="text-white">08:00 - 22:00</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-[#5b5b5b]">Pazar</p>
                  <p className="text-white">09:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 min-h-125 h-auto rounded-2xl overflow-hidden border border-[#383737]">
            <iframe
              title="Konum Haritası"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.890696956795!2d29.02396321571816!3d40.99044322961555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8630712790f%3A0x7df66d6232572565!2zS2FkxLFrw7Z5LCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
