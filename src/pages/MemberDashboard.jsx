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
  const { user, loading } = useAuth(); 
  const [currentView, setCurrentView] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState({
    packageName: "Yükleniyor...",
    stats: {
      remainingDays: { current: 0, total: 90 },
      ptSessions: { current: 0, total: 0 },
      activeAppointments: { current: 0, total: 10 },
    }
  });

  useEffect(() => {
    if (!loading && user && user.id) {
      fetch(`/api/member_dashboard.php?id=${user.id}`)
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
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#161515] flex items-center justify-center text-white">
        <p className="text-xl animate-pulse">Oturum açılıyor...</p>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/"; 
    return null;
  }

  return (
    <>
      <Header />
      
      <div className="bg-[#161515] min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-10 flex flex-col items-center gap-8 md:gap-12 font-montserrat">
        
        {currentView === "dashboard" && (
          <>
            <MemberDashboardStats 
              user={user} 
              stats={dashboardData.stats} 
              packageName={dashboardData.packageName} 
            />

            <div className="w-full max-w-7xl">
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-6 md:h-8 bg-[#7c3aed] rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Takvim & Randevu</h2>
              </div>
              <MemberAppointmentCalendar user={user} />
            </div>

            <div className="w-full max-w-7xl">
              <div 
                onClick={() => setCurrentView("appointments")} 
                className="group w-full bg-[#252422] border border-[#635a4a] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#635a4a]/20"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#4a4436] rounded-2xl flex items-center justify-center text-[#d6cbb6] shrink-0">
                  <FontAwesomeIcon icon={faHistory} className="text-3xl md:text-4xl" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#d6cbb6]">
                    Randevularım
                  </h3>
                  <p className="text-[#a8a293] text-sm md:text-lg group-hover:text-[#d6cbb6] transition-colors">
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