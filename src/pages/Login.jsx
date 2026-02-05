import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faShield, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png"; 

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null); 

  const renderForm = () => {
    switch (selectedRole) {
      case "member":
        return <LoginForm title="Üye Girişi" themeColor="#7c3aed" role="member" onBack={() => setSelectedRole(null)} />;
      case "pt":
        return <LoginForm title="PT Girişi" themeColor="#22c55e" role="pt" onBack={() => setSelectedRole(null)} />;
      case "admin":
        return <LoginForm title="Admin Girişi" themeColor="#5b5b5b" role="admin" onBack={() => setSelectedRole(null)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#161515] mt-20 w-full min-h-screen flex flex-col items-center justify-center gap-6 py-10">
        
        {!selectedRole ? (
          <>
            <div className="z-10 cursor-default">
              <img 
                src={logo} 
                alt="Lumex Consulting" 
                className="h-60 md:h-70 object-contain drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]" 
              />
            </div>

            <p className="text-[#434242] text-xl mb-4">Lütfen giriş türünüzü seçiniz</p>
            
            <div className="flex flex-col md:flex-row gap-6">
              
              <div 
                onClick={() => setSelectedRole("member")}
                className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#7c3aed] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#7c3aed]"
              >
                <div className="w-20 h-20 bg-[#7c3aed]/20 rounded-full text-[#7c3aed] flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-4xl" />
                </div>
                <h1 className="text-white text-xl">Üye Girişi</h1>
                <p className="text-[#585757] text-sm text-center w-45">
                  Randevularınızı yönetin ve antrenman programınızı takip edin.
                </p>
              </div>

              <div 
                onClick={() => setSelectedRole("pt")}
                className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#23994d] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#23994d]"
              >
                <div className="w-20 h-20 bg-[#264931] rounded-full text-[#22c55e] flex items-center justify-center">
                  <FontAwesomeIcon icon={faMedal} className="text-4xl" />
                </div>
                <h1 className="text-white text-xl">PT Girişi</h1>
                <p className="text-[#585757] text-sm text-center w-45">
                  Öğrencilerinizi yönetin ve randevuları onaylayın.
                </p>
              </div>

              <div 
                onClick={() => setSelectedRole("admin")}
                className="w-80 h-80 gap-4 bg-[#262525] border border-[#403f3f] hover:border-[#5b5b5b] shadow-lg shadow-black/30 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer hover:drop-shadow hover:drop-shadow-[#5b5b5b]"
              >
                <div className="w-20 h-20 bg-[#323131] rounded-full text-[#5b5b5b] flex items-center justify-center">
                  <FontAwesomeIcon icon={faShield} className="text-4xl" />
                </div>
                <h1 className="text-white text-xl">Admin Girişi</h1>
                <p className="text-[#585757] text-sm text-center w-45">
                  Sistemi yönetin, ürünler ve üyeleri düzenleyin
                </p>
              </div>
            </div>
          </>
        ) : (
          renderForm()
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;