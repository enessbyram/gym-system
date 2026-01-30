import Header from "../components/Header";
import Footer from "../components/Footer";
import PTDashboardStats from "../components/PTDashboardStats";
import PTAppointmentCalendar from "../components/PTAppointmentCalendar";
import PTAppointmentManagement from "../components/PTAppointmentManagement"; // Yeni import
import { useAuth } from "../context/AuthContext";

const PTDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      
      <div className="bg-[#161515] min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center gap-12">
        
        {/* 1. Hoşgeldin Kartı */}
        <PTDashboardStats user={user} />

        {/* 2. Ders Programı (Takvim) */}
        <div className="w-full max-w-350">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-[#22c55e] rounded-full"></div>
              <h2 className="text-3xl font-bold text-white">Ders Programı</h2>
           </div>
           <PTAppointmentCalendar />
        </div>

        {/* 3. Ders Yönetimi (Gelecek / Tamamlanan) - YENİ KISIM */}
        <div className="w-full max-w-350">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-1 h-8 bg-[#22c55e] rounded-full"></div>
              <h2 className="text-3xl font-bold text-white">Ders Yönetimi</h2>
           </div>
           <p className="text-[#5b5b5b] ml-5 mb-4">Dersleri tamamladığınızda buradan onay vererek bakiyeden düşebilirsiniz.</p>
           
           <PTAppointmentManagement />
        </div>

      </div>

      <Footer />
    </>
  );
};

export default PTDashboard;