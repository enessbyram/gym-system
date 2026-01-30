import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft, faCalendar, faBuilding, faDumbbell, faCheckCircle, faClock
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const MemberAppointments = ({ onBack }) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost/gym-system/api/member_appointments.php?action=init&user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.appointments)) {
            setAppointments(data.appointments);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Randevu geçmişi çekilemedi:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const cleanDate = dateStr.split(" ")[0]; 
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(cleanDate).toLocaleDateString("tr-TR", options);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.substring(0, 5);
  };

  const isAppointmentPast = (dateStr, timeStr) => {
    const cleanDate = dateStr.split(" ")[0];
    const appDate = new Date(`${cleanDate}T${timeStr}`);
    const now = new Date();
    return appDate < now;
  };

  const processedAppointments = appointments.map(app => {
    const isPast = isAppointmentPast(app.appointment_date, app.time);
    return {
      ...app,
      isPast: isPast,
      displayTitle: app.type === 'salon' ? 'Salon Kullanımı' : 'PT Dersi'
    };
  });

  const upcomingApps = processedAppointments.filter(app => !app.isPast);
  const pastApps = processedAppointments.filter(app => app.isPast);

  const AppointmentCard = ({ app, isPast }) => (
    <div className={`w-full border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${isPast ? "bg-[#1a1a1a] border-[#2e2e2e] opacity-75" : "bg-[#1e1e1e] border-[#383737] hover:border-[#009fe2] shadow-lg"}`}>
      <div className="flex items-center gap-4 md:gap-6">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shrink-0 ${isPast ? "bg-[#252525] text-[#5b5b5b]" : app.type === 'salon' ? "bg-[#009fe2]/10 text-[#009fe2]" : "bg-[#22c55e]/10 text-[#22c55e]"}`}>
          <FontAwesomeIcon icon={app.type === 'salon' ? faDumbbell : faBuilding} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={`text-base md:text-lg font-bold ${isPast ? "text-[#7a7a7a]" : "text-white"}`}>{app.displayTitle}</h3>
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-[#5b5b5b]">
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendar} /> {formatDate(app.appointment_date)}</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} /> {formatTime(app.time)}</span>
          </div>
        </div>
      </div>
      <div className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${isPast ? "border-[#383737] text-[#5b5b5b]" : "border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10"}`}>
        <FontAwesomeIcon icon={faCheckCircle} /> {isPast ? "Tamamlandı" : "Onaylandı"}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl animate-fade-in font-montserrat">
      <button onClick={onBack} className="flex items-center cursor-pointer gap-2 text-[#5b5b5b] hover:text-white mb-6 transition-colors text-sm md:text-base">
        <FontAwesomeIcon icon={faArrowLeft} /> Geri Dön
      </button>

      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <div className="w-1 h-8 md:h-10 bg-[#009fe2] rounded-full"></div>
        <h2 className="text-2xl md:text-4xl font-bold text-white">Randevularım</h2>
      </div>

      {loading ? (
        <div className="text-center text-[#5b5b5b] py-10">Yükleniyor...</div>
      ) : (
        <>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faCalendar} className="text-[#009fe2] text-lg md:text-xl" />
              <h3 className="text-xl md:text-2xl font-bold text-white">Yaklaşan Randevular</h3>
              <span className="bg-[#185f80] text-[#009fe2] text-xs font-bold px-2 py-0.5 rounded-full">{upcomingApps.length}</span>
            </div>
            <div className="flex flex-col gap-4">
              {upcomingApps.length > 0 ? upcomingApps.map(app => <AppointmentCard key={app.id} app={app} isPast={false} />) : 
              <div className="w-full py-10 border border-dashed border-[#383737] rounded-2xl flex flex-col items-center justify-center text-[#5b5b5b] gap-2">
                <FontAwesomeIcon icon={faCalendar} className="text-3xl opacity-20" />
                <p>Yaklaşan randevunuz bulunmamaktadır.</p>
              </div>}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faCheckCircle} className="text-[#5b5b5b] text-lg md:text-xl" />
              <h3 className="text-xl md:text-2xl font-bold text-[#b0b0b0]">Geçmiş Randevular</h3>
              <span className="bg-[#2e2e2e] text-[#7a7a7a] text-xs font-bold px-2 py-0.5 rounded-full">{pastApps.length}</span>
            </div>
            <div className="flex flex-col gap-4">
              {pastApps.length > 0 ? pastApps.map(app => <AppointmentCard key={app.id} app={app} isPast={true} />) : <p className="text-[#555] italic">Geçmiş randevu kaydı bulunamadı.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberAppointments;