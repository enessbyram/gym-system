import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ title, themeColor, onBack, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.user);
        
        if(role === 'admin') navigate("/admindashboard");
        else if(role === 'pt') navigate("/ptdashboard");
        else navigate("/memberdashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Sunucu hatası oluştu.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 md:p-8 bg-[#1e1e1e] rounded-2xl border border-[#2e2e2e] shadow-2xl mx-4">
      <div className="flex items-center text-2xl md:text-3xl gap-2 mb-2">
        <FontAwesomeIcon icon={faDumbbell} className="rotate-135" style={{ color: themeColor }} />
        <div className="flex items-center font-bold">
          <span style={{ color: themeColor }}>EA</span>
          <span className="text-[#444] mx-2">|</span>
          <span className="text-white">WellnessClub</span>
        </div>
      </div>

      <h2 className="text-white text-xl md:text-2xl font-semibold mb-1 text-center">{title}</h2>

      <button onClick={onBack} className="text-[#585757] text-sm mb-4 hover:text-white cursor-pointer mt-4 transition-colors flex items-center gap-2">
        <FontAwesomeIcon icon={faArrowLeft} /> Geri Dön
      </button>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm md:text-base">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#333] border border-[#444] rounded-lg p-3 text-white text-sm md:text-base focus:outline-none focus:border-opacity-100 transition-colors"
            style={{ borderColor: "#444" }} 
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