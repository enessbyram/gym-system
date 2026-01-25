import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faMedal, faShield, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <>
      <Header />
      <div className="bg-[#161515] mt-20 w-full min-h-133 flex flex-col items-center justify-center gap-6">
        <div className="cursor-default flex items-center text-5xl gap-3 z-10">
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-[#009fe2] rotate-135"
          />
          <div className="flex items-center font-bold">
            <span className="text-[#009fe2]">EA</span>
            <span className="text-[#444] mx-2">|</span>
            <span className="text-white">WellnessClub</span>
          </div>
        </div>
        <p className="text-[#434242] text-xl">Lütfen giriş türünüzü seçiniz</p>
        <div className="flex flex-row gap-6">
          <div className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#009fe2] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#009fe2]">
            <div className="w-20 h-20 bg-[#185f80] rounded-full text-[#009fe2] flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-4xl" />
            </div>
            <h1 className="text-white text-xl">Üye Girişi</h1>
            <p className="text-[#585757] text-sm text-center w-45">
              Randevularınızı yönetin ve antrenman programınızı takip edin.
            </p>
          </div>
          <div className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#23994d] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#23994d]">
            <div className="w-20 h-20 bg-[#264931] rounded-full text-[#22c55e] flex items-center justify-center">
              <FontAwesomeIcon icon={faMedal} className="text-4xl" />
            </div>
            <h1 className="text-white text-xl">PT Girişi</h1>
            <p className="text-[#585757] text-sm text-center w-45">
              Öğrencilerinizi yönetin ve randevuları onaylayın.
            </p>
          </div>
          <div className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#5b5b5b] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#5b5b5b]">
            <div className="w-20 h-20 bg-[#323131] rounded-full text-[#5b5b5b] flex items-center justify-center">
              <FontAwesomeIcon icon={faShield} className="text-4xl" />
            </div>
            <h1 className="text-white text-xl">Admin Girişi</h1>
            <p className="text-[#585757] text-sm text-center w-45">
              Sistemi yönetin, ürünler ve üyeleri düzenleyin
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
