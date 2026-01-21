import { faLocation, faPhone, faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="w-full h-auto bg-black flex items-center justify-center flex-col">
      <div className="container my-4 flex flex-row justify-between w-full">
        <div className="flex flex-col w-1/2 gap-2">
          <h4 className="text-[#009fe2] text-lg">İletişim</h4>
          <div className="flex flex-row items-center flex-center gap-2 text-sm">
            <FontAwesomeIcon icon={faLocation} color="#009fe2" />
            <p className="text-[#4e4e4e]">
              Atatürk Caddesi No: 123 Kadıköy / İstanbul
            </p>
          </div>
          <div className="flex flex-row items-center flex-center gap-2 text-sm">
            <FontAwesomeIcon icon={faPhone} color="#009fe2" />
            <p className="text-[#4e4e4e]">+90 216 123 45 67</p>
          </div>
          <div className="flex flex-row items-center flex-center gap-2 text-sm">
            <FontAwesomeIcon icon={faBox} color="#009fe2" />
            <p className="text-[#4e4e4e]">eagymwellnessclub</p>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <h4 className="text-[#009fe2] text-lg mb-2">Çalışma Saatleri</h4>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-[#4e4e4e]">Pazartesi - Cuma</p>
              <p className="text-sm text-white">06.00 - 23.00</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm text-[#4e4e4e]">Cumartesi</p>
              <p className="text-sm text-white">08.00 - 22.00</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm text-[#4e4e4e]">Pazar</p>
              <p className="text-sm text-white">09.00 - 20.00</p>
            </div>
          </div>
          <h4 className="text-[#009fe2] text-lg my-4">Hakkımızda</h4>
          <p className="text-[#4e4e4e] text-sm leading-relaxed">
            <span className="text-[#009fe2] font-semibold">EA</span>
            <span className="text-[#4e4e4e] mx-1">|</span>
            <span className="text-[#009fe2] font-semibold">WellnessClub</span>,
            modern ekipmanları ve profesyonel antrenörleri ile hedeflerinize
            ulaşmanız için yanınızda.
          </p>
        </div>
      </div>
      <hr className="my-2 border border-[#4e4e4e] w-340"/>
      <div className="text-[#4e4e4e] my-6">
        © 2026 Lumex Consulting. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
