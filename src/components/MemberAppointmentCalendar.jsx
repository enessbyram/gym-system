import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft, faChevronRight, faDumbbell, faBuilding,
  faCheckCircle, faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

const MemberAppointmentCalendar = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [myAppointments, setMyAppointments] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState({});

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  useEffect(() => {
    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost/gym-system/api/member_appointments.php?action=init&user_id=${user.id}`);
      const data = await res.json();
      
      if (data.success) {
        setMembershipInfo(data.membership);
        setMyAppointments(data.appointments || []);
        
        const occMap = {};
        if (data.occupancy) {
            data.occupancy.forEach(item => {
                const cleanDate = item.appointment_date.split(' ')[0];
                if (!occMap[cleanDate]) occMap[cleanDate] = {};
                occMap[cleanDate][item.time] = item.count;
            });
        }
        setOccupiedSlots(occMap);
      }
    } catch (error) {
      console.error("Veri hatası:", error);
    }
  };

  const handleCreateAppointment = async () => {
    if (!selectedType || !selectedDate || !selectedTime) return;

    const payload = {
        user_id: user.id,
        date: formatDateString(selectedDate),
        time: selectedTime,
        type: selectedType,
        pt_id: membershipInfo?.assigned_pt_id
    };

    try {
        const res = await fetch("http://localhost/gym-system/api/member_appointments.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (result.success) {
            setShowSuccess(true);
            await fetchData();
            setSelectedTime(null);
            setSelectedType(null);
            setSelectedDate(null);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            alert(result.error || "Hata oluştu.");
        }
    } catch (error) {
        console.error("Kayıt hatası:", error);
    }
  };

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

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getFirstDayOfMonth(currentDate);
  const totalSlots = Array.from({ length: daysInMonth + startDay });

  const checkExistingAppointment = (dateStr) => {
    return myAppointments.some(app => {
        const appDateClean = app.appointment_date.split(' ')[0];
        return appDateClean === dateStr && app.status !== 'cancelled';
    });
  };

  const handleDateClick = (day) => {
     if (isPastDate(day)) return;
     setSelectedDate(day);
     setSelectedType(null);
     setSelectedTime(null);
  };

  const selectedDateStr = selectedDate ? formatDateString(selectedDate) : null;
  const hasExistingApp = selectedDateStr ? checkExistingAppointment(selectedDateStr) : false;

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 relative items-stretch font-montserrat">
      {showSuccess && (
        <div className="fixed top-24 right-4 md:right-10 z-50 bg-[#22c55e] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-in">
          <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
          <div><h4 className="font-bold">Başarılı!</h4><p className="text-sm">Randevunuz oluşturuldu.</p></div>
        </div>
      )}

      <div className="flex-1 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-4 md:p-8 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <div className="flex gap-2">
             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] border border-[#383737] flex items-center justify-center cursor-pointer text-sm md:text-base"><FontAwesomeIcon icon={faChevronLeft} /></button>
             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#2e2e2e] text-white hover:bg-[#009fe2] border border-[#383737] flex items-center justify-center cursor-pointer text-sm md:text-base"><FontAwesomeIcon icon={faChevronRight} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2 md:mb-4 text-[#5b5b5b] font-medium text-center text-xs md:text-base">
          <div>Pzt</div><div>Sal</div><div>Çar</div><div>Per</div><div>Cum</div><div>Cmt</div><div>Paz</div>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-4 flex-1">
          {totalSlots.map((_, index) => {
            const dayNumber = index - startDay + 1;
            if (dayNumber <= 0) return <div key={index}></div>;

            const dateStr = formatDateString(dayNumber);
            const isSelected = selectedDate === dayNumber;
            const isPast = isPastDate(dayNumber);
            
            const dayApps = myAppointments.filter(app => app.appointment_date.split(' ')[0] === dateStr && app.status !== 'cancelled');

            return (
              <div
                key={index}
                onClick={() => handleDateClick(dayNumber)}
                className={`
                  relative min-h-16 md:min-h-25 rounded-xl border p-1 md:p-2 flex flex-col justify-between transition-all group
                  ${isSelected ? 'border-[#009fe2] bg-[#242424]' : 'border-[#2e2e2e] bg-[#161515]'}
                  ${isPast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:border-[#5b5b5b]'} 
                `}
              >
                <span className={`text-sm md:text-lg font-bold text-center md:text-left ${isSelected ? 'text-[#009fe2]' : 'text-[#5b5b5b]'}`}>{dayNumber}</span>
                <div className="flex flex-col gap-1">
                  {dayApps.map((app, i) => (
                    <div key={i} className={`text-[8px] md:text-[10px] px-1 md:px-2 py-0.5 rounded text-white text-center shadow-sm font-semibold truncate ${app.type === 'pt' ? 'bg-[#22c55e]' : 'bg-[#009fe2]'}`}>
                      {app.time.substring(0, 5)} {app.type === 'pt' ? 'PT' : 'Salon'}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full xl:w-96 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 shadow-xl flex flex-col h-auto min-h-96 xl:min-h-full">
        <h3 className="text-lg md:text-xl font-bold text-white mb-6 border-b border-[#383737] pb-4">
            {!selectedDate ? "İşlem Bekleniyor" : `Seçili Tarih: ${selectedDate} ${monthNames[currentDate.getMonth()]}`}
        </h3>

        {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 text-[#5b5b5b] gap-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-4xl opacity-20" />
              <p>Takvimden gün seçiniz.</p>
            </div>
        ) : hasExistingApp ? (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 gap-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"><FontAwesomeIcon icon={faExclamationCircle} className="text-3xl" /></div>
              <div className="text-center">
                  <h4 className="text-white font-bold text-lg">Randevu Mevcut</h4>
                  <p className="text-[#5b5b5b] text-sm mt-2 px-6">Bu tarihte zaten bir kaydınız bulunmaktadır.</p>
              </div>
            </div>
        ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-3">
                    <label className="text-sm text-[#5b5b5b] font-medium">Randevu Tipi</label>
                    {membershipInfo?.package_type === 'gym' && (
                        <button onClick={() => setSelectedType('salon')} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedType === 'salon' ? 'border-[#009fe2] bg-[#009fe2]/10' : 'border-[#383737] hover:border-[#009fe2]'}`}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#009fe2] text-white"><FontAwesomeIcon icon={faDumbbell} /></div>
                            <span className="text-white font-medium">Salon Kullanımı</span>
                        </button>
                    )}
                    {membershipInfo?.package_type === 'pt' && (
                        <button onClick={() => setSelectedType('pt')} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedType === 'pt' ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-[#383737] hover:border-[#22c55e]'}`}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#22c55e] text-white"><FontAwesomeIcon icon={faBuilding} /></div>
                            <span className="text-white font-medium">PT Dersi</span>
                        </button>
                    )}
                </div>

                {selectedType && (
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-[#5b5b5b] font-medium">Saat Seçimi</label>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => {
                                const dateStr = formatDateString(selectedDate);
                                const count = occupiedSlots[dateStr]?.[time] || occupiedSlots[dateStr]?.[time + ':00'] || 0;
                                const limit = selectedType === 'salon' ? 20 : 1;
                                const isFull = count >= limit;

                                return (
                                    <button key={time} disabled={isFull} onClick={() => setSelectedTime(time)} className={`py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${isFull ? 'bg-[#2e1a1a] text-[#5c3a3a] cursor-not-allowed line-through' : selectedTime === time ? (selectedType === 'salon' ? 'bg-[#009fe2] text-white' : 'bg-[#22c55e] text-white') : 'bg-[#262626] text-[#b0b0b0] hover:bg-[#333]'}`}>{time}</button>
                                )
                            })}
                        </div>
                    </div>
                )}
                {selectedType && selectedTime && (
                    <button onClick={handleCreateAppointment} className={`w-full py-4 rounded-xl cursor-pointer text-white font-bold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4 ${selectedType === 'salon' ? 'bg-[#009fe2]' : 'bg-[#22c55e]'}`}>
                        <FontAwesomeIcon icon={faCheckCircle} /> Randevu Oluştur
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default MemberAppointmentCalendar;