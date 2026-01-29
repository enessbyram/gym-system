import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDumbbell,
  faBuilding,
  faCheckCircle,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const MemberAppointmentCalendar = ({ user }) => {
  // --- STATE ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'salon' veya 'pt'
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasExistingAppointment, setHasExistingAppointment] = useState(false); // O gün randevu var mı kontrolü

  // Örnek Veriler
  const [myAppointments, setMyAppointments] = useState([
    { date: "2026-01-16", time: "09:00", type: "pt" },
    { date: "2026-01-20", time: "16:00", type: "pt" },
    { date: "2026-01-24", time: "16:00", type: "pt" },
    { date: "2026-01-29", time: "14:00", type: "pt" },
  ]);

  const occupiedSlots = {
    "2026-01-30": { "11:00": 7, "15:00": 2 },
  };

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00"
  ];

  // --- TAKVİM FONKSİYONLARI ---
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

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

  // --- HANDLERS ---
  const handleDateClick = (day) => {
    if (isPastDate(day)) return;

    const dateStr = formatDateString(day);
    
    // 1. O gün zaten randevu var mı kontrol et
    const existingApp = myAppointments.find(app => app.date === dateStr);

    setSelectedDate(day);
    setSelectedType(null);
    setSelectedTime(null);

    if (existingApp) {
      setHasExistingAppointment(true);
    } else {
      setHasExistingAppointment(false);
    }
  };

  const handleCreateAppointment = () => {
    const newApp = {
      date: formatDateString(selectedDate),
      time: selectedTime,
      type: selectedType
    };
    setMyAppointments([...myAppointments, newApp]);
    setShowSuccess(true);
    setSelectedTime(null);
    setSelectedType(null);
    setSelectedDate(null);
    setHasExistingAppointment(false);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  // Render için hesaplamalar
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getFirstDayOfMonth(currentDate);
  const totalSlots = Array.from({ length: daysInMonth + startDay });

  return (
    // items-stretch: Sol ve Sağ panelin boyunu eşitler
    <div className="w-full flex flex-col xl:flex-row gap-8 relative items-stretch">
      
      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-24 right-10 z-50 bg-[#22c55e] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-in transition-all duration-500">
          <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
          <div>
            <h4 className="font-bold">Başarılı!</h4>
            <p className="text-sm">Randevunuz sisteme kaydedildi.</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="ml-4 hover:text-black/50">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {/* --- SOL TARA: TAKVİM --- */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] transition-colors flex items-center justify-center border border-[#383737]"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button 
               onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
               className="w-10 h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] transition-colors flex items-center justify-center border border-[#383737]"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-4 text-[#5b5b5b] font-medium text-center">
          <div>Pzt</div><div>Sal</div><div>Çar</div><div>Per</div><div>Cum</div><div>Cmt</div><div>Paz</div>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4 flex-1">
          {totalSlots.map((_, index) => {
            const dayNumber = index - startDay + 1;
            if (dayNumber <= 0) return <div key={index}></div>;

            const dateStr = formatDateString(dayNumber);
            const isSelected = selectedDate === dayNumber;
            const isPast = isPastDate(dayNumber);
            const daysAppointments = myAppointments.filter(app => app.date === dateStr);

            return (
              <div
                key={index}
                onClick={() => handleDateClick(dayNumber)}
                className={`
                  relative min-h-20 md:min-h-25 rounded-xl border p-2 flex flex-col justify-between transition-all group
                  ${isSelected ? 'border-[#009fe2] bg-[#242424]' : 'border-[#2e2e2e] bg-[#161515]'}
                  ${isPast 
                    ? 'opacity-30 cursor-not-allowed hover:border-red-900' // Disabled cursor
                    : 'cursor-pointer hover:border-[#5b5b5b]'} 
                `}
              >
                <span className={`text-lg font-bold ${isSelected ? 'text-[#009fe2]' : 'text-[#5b5b5b]'}`}>
                  {dayNumber}
                </span>

                <div className="flex flex-col gap-1">
                  {daysAppointments.map((app, i) => (
                    <div 
                      key={i} 
                      className={`text-[10px] px-2 py-0.5 rounded text-white text-center shadow-sm font-semibold
                        ${app.type === 'pt' ? 'bg-[#22c55e]' : 'bg-[#009fe2]'} 
                      `} // PT: Yeşil (#22c55e), Salon: Mavi (#009fe2)
                    >
                      {app.time} {app.type === 'pt' ? 'PT' : 'Salon'}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SAĞ TARAF: İŞLEM PANELİ --- */}
      {/* h-full ve flex flex-col ile sol tarafla aynı boya zorluyoruz */}
      <div className="w-full xl:w-96 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 shadow-xl flex flex-col h-auto xl:h-auto min-h-full">
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-[#383737] pb-4">
            {!selectedDate 
              ? "İşlem Bekleniyor" 
              : `Seçili Tarih: ${selectedDate} ${monthNames[currentDate.getMonth()]}`
            }
          </h3>
          
          {/* DURUM 1: Tarih Seçilmemiş */}
          {!selectedDate && (
            <div className="flex flex-col items-center justify-center h-full text-[#5b5b5b] gap-4 py-10">
              <FontAwesomeIcon icon={faCheckCircle} className="text-4xl opacity-20" />
              <p className="text-center">Takvimden işlem yapmak istediğiniz günü seçiniz.</p>
            </div>
          )}

          {/* DURUM 2: Tarih Seçili AMA Zaten Randevu Var */}
          {selectedDate && hasExistingAppointment && (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-10 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-3xl" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold text-lg">Randevu Mevcut</h4>
                <p className="text-[#5b5b5b] text-sm mt-2 px-4">
                  Bu tarihte zaten bir randevunuz bulunmaktadır. Günde sadece 1 randevu alabilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* DURUM 3: Tarih Seçili VE Randevu Yok (Normal Akış) */}
          {selectedDate && !hasExistingAppointment && (
            <div className="flex flex-col gap-6 animate-fade-in">
              
              {/* Tip Seçimi */}
              <div className="flex flex-col gap-3">
                <label className="text-sm text-[#5b5b5b] font-medium">Randevu Tipi</label>
                
                {/* Salon Seçeneği - MAVİ (#009fe2) */}
                <button 
                  onClick={() => setSelectedType('salon')}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                    ${selectedType === 'salon' ? 'border-[#009fe2] bg-[#009fe2]/10' : 'border-[#383737] hover:border-[#009fe2]'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedType === 'salon' ? 'bg-[#009fe2] text-white' : 'bg-[#2e2e2e] text-[#5b5b5b]'}`}>
                    <FontAwesomeIcon icon={faDumbbell} />
                  </div>
                  <span className="text-white font-medium">Salon Kullanımı</span>
                </button>

                {/* PT Seçeneği - YEŞİL (#22c55e) */}
                <button 
                   onClick={() => setSelectedType('pt')}
                   className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                    ${selectedType === 'pt' ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-[#383737] hover:border-[#22c55e]'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedType === 'pt' ? 'bg-[#22c55e] text-white' : 'bg-[#2e2e2e] text-[#5b5b5b]'}`}>
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <span className="text-white font-medium">PT Dersi</span>
                </button>
              </div>

              {/* Saat Seçimi (Tip seçilince açılır) */}
              {selectedType && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <label className="text-sm text-[#5b5b5b] font-medium">Saat Seçimi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const dateStr = formatDateString(selectedDate);
                      const currentOccupancy = occupiedSlots[dateStr]?.[time] || 0;
                      const isFull = currentOccupancy >= 7;

                      return (
                        <button
                          key={time}
                          disabled={isFull}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-2 rounded-lg text-sm font-medium transition-all relative
                            ${isFull 
                              ? 'bg-[#2e1a1a] text-[#5c3a3a] border border-red-900/30 line-through cursor-not-allowed' 
                              : selectedTime === time
                                ? selectedType === 'salon' ? 'bg-[#009fe2] text-white' : 'bg-[#22c55e] text-white'
                                : 'bg-[#262626] text-[#b0b0b0] hover:bg-[#333]'
                            }
                          `}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BUTON ALANI - En Alta Yaslı */}
        {selectedDate && !hasExistingAppointment && selectedTime && (
          <div className="mt-6 pt-6 border-t border-[#383737]">
            <button 
              onClick={handleCreateAppointment}
              className={`w-full py-4 rounded-xl cursor-pointer text-white font-bold text-lg shadow-lg hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2
                ${selectedType === 'salon' ? 'bg-[#009fe2]' : 'bg-[#22c55e]'}
              `}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              Randevu Oluştur
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MemberAppointmentCalendar;