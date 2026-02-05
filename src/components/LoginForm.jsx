import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 

const LoginForm = ({ title, themeColor, onBack, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("--- LOGIN İŞLEMİ BAŞLADI ---");
    console.log("Giden Veri:", { email, password, role });

    try {
      // API isteği atılıyor
      const response = await fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      console.log("Sunucu Yanıt Durumu (Status):", response.status);

      // Yanıtı önce metin (text) olarak alalım, JSON patlarsa görelim
      const text = await response.text();
      console.log("Sunucudan Gelen Ham Yanıt:", text);

      // Gelen metni JSON'a çevirmeyi dene
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("JSON Parse Hatası:", jsonError);
        setError("Sunucudan geçersiz yanıt geldi. Konsola bakınız. (Muhtemelen PHP hatası)");
        return;
      }

      if (data.success) {
        console.log("Giriş Başarılı:", data.user);
        login(data.user);
        
        if(role === 'admin') navigate("/admindashboard");
        else if(role === 'pt') navigate("/ptdashboard");
        else navigate("/memberdashboard");
      } else {
        console.warn("Giriş Başarısız:", data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error("Ağ/Fetch Hatası:", err);
      setError("Sunucuya bağlanılamadı. İnternet bağlantınızı veya API yolunu kontrol edin.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 md:p-8 bg-[#1e1e1e] rounded-2xl border border-[#2e2e2e] shadow-2xl mx-4">
      
      <div className="mb-4">
        <img 
          src={logo} 
          alt="Lumex Consulting" 
          className="h-16 md:h-20 object-contain"
          style={{ filter: "drop-shadow(0 0 10px #7c3aed)" }} 
        />
      </div>

      <h2 className="text-white text-xl md:text-2xl font-semibold mb-1 text-center">{title}</h2>

      <button onClick={onBack} className="text-[#585757] text-sm mb-4 hover:text-white cursor-pointer mt-4 transition-colors flex items-center gap-2">
        <FontAwesomeIcon icon={faArrowLeft} /> Geri Dön
      </button>

      {/* Hata mesajı artık daha belirgin */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded mb-4 text-center w-full">
            {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm md:text-base">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#333] border border-[#444] rounded-lg p-3 text-white text-sm md:text-base focus:outline-none focus:border-opacity-100 transition-colors"
            placeholder="ornek@email.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm md:text-base">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#333] border border-[#444] rounded-lg p-3 text-white text-sm md:text-base focus:outline-none transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 rounded-lg text-white font-bold text-lg transition-all duration-300 active:scale-95 shadow-lg cursor-pointer hover:brightness-110 hover:shadow-xl"
          style={{ backgroundColor: themeColor }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginForm;