import { useState, useEffect } from "react"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberDashboardStats from "../components/MemberDashboardStats";
import MemberAppointmentCalendar from "../components/MemberAppointmentCalendar";
import MemberAppointments from "../components/MemberAppointments";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const MemberDashboard = () => {
  // 1. HOOK: Auth Context
  const { user, loading } = useAuth(); 
  
  // 2. HOOK: State
  const [currentView, setCurrentView] = useState("dashboard");

  // 3. HOOK: State
  const [dashboardData, setDashboardData] = useState({
    packageName: "Yükleniyor...",
    stats: {
      remainingDays: { current: 0, total: 90 },
      ptSessions: { current: 0, total: 0 },
      activeAppointments: { current: 0, total: 10 },
    }
  });

  // 4. HOOK: useEffect (Bunu IF bloklarının ÜSTÜNE taşıdık)
  useEffect(() => {
    // Sadece yükleme bittiyse ve kullanıcı varsa çalış
    if (!loading && user && user.id) {
      fetch(`http://localhost/gym-system/api/member_dashboard.php?id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDashboardData(data);
          } else {
            setDashboardData(prev => ({
              ...prev, 
              packageName: "Aktif Paket Bulunamadı"
            }));
          }
        })
        .catch((err) => {
          console.error("Dashboard verisi çekilemedi:", err);
          setDashboardData(prev => ({
            ...prev, 
            packageName: "Bağlantı Hatası"
          }));
        });
    }
  }, [user, loading]); // loading dependency'e eklendi

  // --- ERKEN DÖNÜŞLER (CONDITIONALS) BURADA OLMALI ---
  
  // A) Yükleniyor Ekranı
  if (loading) {
    return (
      <div className="min-h-screen bg-[#161515] flex items-center justify-center text-white">
        <p className="text-xl animate-pulse">Oturum açılıyor...</p>
      </div>
    );
  }

  // B) Kullanıcı Yoksa Yönlendirme
  if (!user) {
    window.location.href = "/"; 
    return null;
  }

  // --- ANA RENDER ---
  return (
    <>
      <Header />
      
      <div className="bg-[#161515] min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center gap-12">
        
        {currentView === "dashboard" && (
          <>
            <MemberDashboardStats 
              user={user} 
              stats={dashboardData.stats} 
              packageName={dashboardData.packageName} 
            />

            <div className="w-full max-w-7xl">
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-[#009fe2] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Takvim & Randevu</h2>
              </div>
              <MemberAppointmentCalendar user={user} />
            </div>

            <div className="w-full max-w-7xl">
              <div 
                onClick={() => setCurrentView("appointments")} 
                className="group w-full bg-[#252422] border border-[#635a4a] rounded-3xl p-6 md:p-8 flex items-center gap-6 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#635a4a]/20"
              >
                <div className="w-20 h-20 bg-[#4a4436] rounded-2xl flex items-center justify-center text-[#d6cbb6]">
                  <FontAwesomeIcon icon={faHistory} className="text-4xl" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold text-[#d6cbb6]">
                    Randevularım
                  </h3>
                  <p className="text-[#a8a293] text-base md:text-lg group-hover:text-[#d6cbb6] transition-colors">
                    Geçmiş ve gelecek tüm randevularınızı görüntüleyin
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === "appointments" && (
          <MemberAppointments onBack={() => setCurrentView("dashboard")} />
        )}

      </div>

      <Footer />
    </>
  );
};

export default MemberDashboard;