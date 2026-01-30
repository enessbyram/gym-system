import { faLocation, faPhone, faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="w-full h-auto bg-black flex items-center justify-center flex-col py-10 font-montserrat">
      <div className="container px-4 flex flex-col md:flex-row justify-between w-full gap-10 md:gap-0">
        
        <div className="flex flex-col w-full md:w-5/12 gap-4">
          <h4 className="text-[#009fe2] text-xl font-bold">İletişim</h4>
          <div className="flex flex-row items-start gap-3 text-sm">
            <FontAwesomeIcon icon={faLocation} color="#009fe2" className="mt-1" />
            <p className="text-[#888]">
              Atatürk Caddesi No: 123 Kadıköy / İstanbul
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 text-sm">
            <FontAwesomeIcon icon={faPhone} color="#009fe2" />
            <p className="text-[#888]">+90 216 123 45 67</p>
          </div>
          <div className="flex flex-row items-center gap-3 text-sm">
            <FontAwesomeIcon icon={faBox} color="#009fe2" />
            <p className="text-[#888]">eagymwellnessclub</p>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-5/12">
          <h4 className="text-[#009fe2] text-xl font-bold mb-4">Çalışma Saatleri</h4>
          <div className="w-full flex flex-col gap-3 mb-6">
            <div className="flex flex-row justify-between pb-2">
              <p className="text-sm text-[#888]">Pazartesi - Cuma</p>
              <p className="text-sm text-white font-medium">06.00 - 23.00</p>
            </div>
            <div className="flex flex-row justify-between pb-2">
              <p className="text-sm text-[#888]">Cumartesi</p>
              <p className="text-sm text-white font-medium">08.00 - 22.00</p>
            </div>
            <div className="flex flex-row justify-between pb-2">
              <p className="text-sm text-[#888]">Pazar</p>
              <p className="text-sm text-white font-medium">09.00 - 20.00</p>
            </div>
          </div>

          <h4 className="text-[#009fe2] text-xl font-bold mb-3">Hakkımızda</h4>
          <p className="text-[#888] text-sm leading-relaxed">
            <span className="text-[#009fe2] font-semibold">EA</span>
            <span className="text-[#666] mx-1">|</span>
            <span className="text-[#009fe2] font-semibold">WellnessClub</span>,
            modern ekipmanları ve profesyonel antrenörleri ile hedeflerinize
            ulaşmanız için yanınızda.
          </p>
        </div>
      </div>

      <div className="w-11/12 md:w-full max-w-7xl border-t border-[#333] my-8"></div>
      
      <div className="text-[#666] text-sm text-center px-4">
        © 2026 Lumex Consulting. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;