import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faTimes, faCalendarDay, 
  faClock, faDumbbell, faBuilding
} from "@fortawesome/free-solid-svg-icons";

const AdminAppointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayInfo, setSelectedDayInfo] = useState(null); 
  const [appointments, setAppointments] = useState([]); // API Verisi

  // --- VERİ ÇEKME ---
  useEffect(() => {
    fetch("http://localhost/gym-system/api/admin_appointments.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error("Admin takvim verisi hatası:", err));
  }, []);

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

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  // --- MODAL AÇMA ---
  const handleDayClick = (dayNumber, dailyAppointments) => {
    setSelectedDayInfo({
      day: dayNumber,
      month: monthNames[currentDate.getMonth()],
      year: currentDate.getFullYear(),
      list: dailyAppointments
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getFirstDayOfMonth(currentDate);
  const totalSlots = Array.from({ length: daysInMonth + startDay });

  return (
    <div className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 shadow-2xl flex flex-col relative animate-fade-in">
      
      {/* --- POPUP (MODAL) --- */}
      {selectedDayInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[80vh]">
            
            <div className="bg-[#252525] p-5 border-b border-[#383737] flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#009fe2] text-3xl">{selectedDayInfo.day}</span> 
                  {selectedDayInfo.month} {selectedDayInfo.year}
                </h3>
                <p className="text-[#888] text-sm mt-1">Toplam {selectedDayInfo.list.length} Randevu</p>
              </div>
              <button onClick={() => setSelectedDayInfo(null)} className="w-10 h-10 rounded-full bg-[#333] text-white hover:bg-red-500 transition-colors flex items-center justify-center">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-3">
              {selectedDayInfo.list.length > 0 ? (
                selectedDayInfo.list.map((app) => (
                  <div key={app.id} className={`border p-4 rounded-xl flex items-center justify-between transition-all group ${app.type === 'salon' ? 'bg-[#009fe2]/5 border-[#009fe2]/30 hover:border-[#009fe2]' : 'bg-[#22c55e]/5 border-[#22c55e]/30 hover:border-[#22c55e]'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${app.type === 'salon' ? 'bg-[#009fe2]/10 text-[#009fe2]' : 'bg-[#22c55e]/10 text-[#22c55e]'}`}>
                        <FontAwesomeIcon icon={app.type === 'salon' ? faDumbbell : faBuilding} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{app.member}</h4>
                        <div className="text-xs text-[#888] flex flex-col">
                           <span>{app.type === 'salon' ? 'Salon Kullanımı' : `PT: ${app.trainer || 'Atanmamış'}`}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 ${app.type === 'salon' ? 'bg-[#009fe2] text-white' : 'bg-[#22c55e] text-white'}`}>
                      <FontAwesomeIcon icon={faClock} /> {app.time}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-[#5b5b5b] gap-3">
                  <FontAwesomeIcon icon={faCalendarDay} className="text-5xl opacity-20" />
                  <p>Bu tarihte planlanmış randevu yok.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-[#252525] border-t border-[#383737] shrink-0">
               <button onClick={() => setSelectedDayInfo(null)} className="w-full bg-[#333] hover:bg-[#444] text-white py-3 rounded-xl font-bold transition-colors">Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAKVİM HEADER --- */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] border border-[#383737] flex items-center justify-center"><FontAwesomeIcon icon={faChevronLeft} /></button>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] border border-[#383737] flex items-center justify-center"><FontAwesomeIcon icon={faChevronRight} /></button>
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

          return (
            <div
              key={index}
              onClick={() => handleDayClick(dayNumber, daysAppointments)}
              className={`
                relative min-h-30 rounded-2xl border p-2 md:p-3 flex flex-col gap-2 transition-all cursor-pointer group
                ${isToday ? 'bg-[#009fe2]/5 border-[#009fe2]' : 'bg-[#161515] border-[#2e2e2e] hover:border-[#5b5b5b] hover:bg-[#1f1f1f]'}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xl font-bold ${isToday ? 'text-[#009fe2]' : 'text-[#5b5b5b]'}`}>{dayNumber}</span>
                {daysAppointments.length > 0 && <span className="bg-[#333] text-[#bbb] text-[10px] px-1.5 py-0.5 rounded-md">{daysAppointments.length}</span>}
              </div>

              {/* Önizleme Listesi */}
              <div className="flex flex-col gap-1 overflow-hidden">
                {daysAppointments.slice(0, 3).map((app) => (
                  <div key={app.id} className={`text-white text-[10px] md:text-xs px-2 py-1 rounded-md shadow-sm truncate font-medium ${app.type === 'salon' ? 'bg-[#009fe2]' : 'bg-[#22c55e]'}`} title={`${app.time} - ${app.member}`}>
                    {app.time} {app.member.split(" ")[0]}
                  </div>
                ))}
                {daysAppointments.length > 3 && <div className="text-xs text-[#5b5b5b] text-center font-medium">+ {daysAppointments.length - 3} daha</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAppointments;