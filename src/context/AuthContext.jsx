import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleme durumu

  useEffect(() => {
    // Sayfa ilk açıldığında çalışır
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem("gym_app_session");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Oturum geri yüklenemedi:", error);
        localStorage.removeItem("gym_app_session");
      } finally {
        setLoading(false); // Her durumda yüklemeyi bitir
      }
    };

    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("gym_app_session", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gym_app_session");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);