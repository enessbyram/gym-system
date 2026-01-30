import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, 
  faChevronRight, 
  faTimes, 
  faCalendarDay, 
  faClock, 
  faUser,
  faCheckCircle 
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const PTAppointmentCalendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // POPUP İÇİN STATE
  const [selectedDayInfo, setSelectedDayInfo] = useState(null); 

  // API'den gelen randevular
  const [appointments, setAppointments] = useState([]);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    if (user && user.id) {
        // Tüm randevuları çek (Gelecek + Geçmiş)
        // Not: api/pt_appointments.php dosyasında 'get_all' hem upcoming hem completed dönüyor.
        // Biz burada ikisini birleştirip takvime basacağız.
        fetch(`http://localhost/gym-system/api/pt_appointments.php?action=get_all&pt_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Veriyi formatla (date: YYYY-MM-DD)
                    const allApps = [
                        ...data.upcoming.map(app => ({...app, isCompleted: false})), 
                        ...data.completed.map(app => ({...app, isCompleted: true}))
                    ];
                    
                    // Backend YYYY-MM-DD HH:MM:SS formatında dönüyor olabilir, sadece tarihi alalım
                    const formattedApps = allApps.map(app => ({
                        id: app.id,
                        date: app.appointment_date.split(' ')[0], // Sadece tarih kısmı
                        time: app.time.substring(0, 5),
                        student: app.student,
                        isCompleted: app.isCompleted
                    }));
                    
                    setAppointments(formattedApps);
                }
            })
            .catch(err => console.error("Takvim verisi hatası:", err));
    }
  }, [user]);

  // --- TAKVİM HESAPLAMALARI ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const formatDateString = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${month}-${d}`;
  };

  const isPastDate = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate < today;
  };

  // --- HANDLER ---
  const handleDayClick = (dayNumber, appointmentsForDay) => {
    // Popup aç
    setSelectedDayInfo({
      day: dayNumber,
      month: monthNames[currentDate.getMonth()],
      year: currentDate.getFullYear(),
      list: appointmentsForDay
    });
  };

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getFirstDayOfMonth(currentDate);
  const totalSlots = Array.from({ length: daysInMonth + startDay });

  return (
    <div className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col relative">
      
      {/* --- POPUP (MODAL) --- */}
      {selectedDayInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="bg-[#252525] p-6 border-b border-[#383737] flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-[#22c55e] text-3xl">{selectedDayInfo.day}</span> 
                  {selectedDayInfo.month} {selectedDayInfo.year}
                </h3>
                <p className="text-[#888] text-sm mt-1">Toplam {selectedDayInfo.list.length} Ders</p>
              </div>
              <button onClick={() => setSelectedDayInfo(null)} className="w-10 h-10 rounded-full bg-[#333] text-white hover:text-red-500 transition-colors flex items-center justify-center">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Liste */}
            <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar flex flex-col gap-3">
              {selectedDayInfo.list.length > 0 ? (
                selectedDayInfo.list.map((app) => (
                  <div key={app.id} className={`border p-4 rounded-xl flex items-center justify-between transition-all ${app.isCompleted ? 'bg-[#1a2e22] border-[#22c55e]/30 opacity-70' : 'bg-[#161515] border-[#2e2e2e] hover:border-[#22c55e]'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${app.isCompleted ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#22c55e]/10 text-[#22c55e]'}`}>
                        <FontAwesomeIcon icon={app.isCompleted ? faCheckCircle : faUser} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{app.student}</h4>
                        <div className="text-xs text-[#5b5b5b]">{app.isCompleted ? 'Tamamlandı' : 'Bekliyor'}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 ${app.isCompleted ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#22c55e] text-white'}`}>
                      <FontAwesomeIcon icon={faClock} /> {app.time}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-[#5b5b5b] gap-2">
                  <FontAwesomeIcon icon={faCalendarDay} className="text-4xl opacity-20" />
                  <p>Bu tarihte kayıtlı ders bulunmuyor.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAKVİM HEADER --- */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#22c55e] border border-[#383737] flex items-center justify-center"><FontAwesomeIcon icon={faChevronLeft} /></button>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#22c55e] border border-[#383737] flex items-center justify-center"><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 text-[#5b5b5b] font-medium text-center text-lg">
        <div>Pzt</div><div>Sal</div><div>Çar</div><div>Per</div><div>Cum</div><div>Cmt</div><div>Paz</div>
      </div>

      {/* --- TAKVİM GRID --- */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 auto-rows-fr">
        {totalSlots.map((_, index) => {
          const dayNumber = index - startDay + 1;
          if (dayNumber <= 0) return <div key={index} className="min-h-30"></div>;

          const dateStr = formatDateString(dayNumber);
          const daysAppointments = appointments.filter(app => app.date === dateStr);
          
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber).toDateString();
          const isPast = isPastDate(dayNumber);

          return (
            <div
              key={index}
              onClick={() => handleDayClick(dayNumber, daysAppointments)}
              className={`
                relative min-h-30 rounded-2xl border p-3 flex flex-col gap-2 transition-all
                ${isToday ? 'bg-[#22c55e]/5 border-[#22c55e]' : 'bg-[#161515] border-[#2e2e2e]'}
                ${!isToday && 'cursor-pointer hover:border-[#5b5b5b] hover:bg-[#1f1f1f]'}
              `}
            >
              <span className={`text-xl font-bold ${isToday ? 'text-[#22c55e]' : 'text-[#5b5b5b]'}`}>{dayNumber}</span>

              {/* Önizleme Listesi */}
              <div className="flex flex-col gap-1.5 overflow-hidden">
                {daysAppointments.slice(0, 3).map((app) => (
                  <div key={app.id} className={`text-xs md:text-sm px-2 py-1.5 rounded-lg shadow-md flex flex-col transition-colors ${app.isCompleted ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#22c55e] text-white'}`}>
                    <span className="font-bold">{app.time}</span>
                    <span className="truncate opacity-90">{app.student}</span>
                  </div>
                ))}
                {daysAppointments.length > 3 && (
                  <div className="text-xs text-[#5b5b5b] text-center font-medium">+ {daysAppointments.length - 3} ders daha...</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PTAppointmentCalendar;