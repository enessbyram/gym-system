import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faBuilding,
  faDumbbell,
  faCheckCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";

const MemberAppointments = ({ onBack }) => {
  // Örnek Veriler (Backend bağlandığında burası API'den gelecek)
  const appointments = [
    {
      id: 1,
      type: "salon",
      title: "Salon Kullanımı",
      date: "30 Ocak 2026",
      time: "18:00",
      status: "upcoming", // Gelecek
    },
    {
      id: 2,
      type: "salon",
      title: "Salon Kullanımı",
      date: "29 Ocak 2026",
      time: "18:00",
      status: "past", // Geçmiş
    },
    {
      id: 3,
      type: "pt",
      title: "PT: Mehmet Kaya",
      date: "28 Ocak 2026",
      time: "14:00",
      status: "past", // Geçmiş
    },
    {
      id: 4,
      type: "salon",
      title: "Salon Kullanımı",
      date: "25 Ocak 2026",
      time: "10:00",
      status: "past",
    },
     {
      id: 5,
      type: "pt",
      title: "PT: Ayşe Yılmaz",
      date: "22 Ocak 2026",
      time: "09:00",
      status: "past",
    },
     {
      id: 6,
      type: "salon",
      title: "Salon Kullanımı",
      date: "20 Ocak 2026",
      time: "20:00",
      status: "past",
    },
  ];

  // Veriyi Gelecek ve Geçmiş olarak ayırıyoruz
  const upcomingApps = appointments.filter((app) => app.status === "upcoming");
  const pastApps = appointments.filter((app) => app.status === "past");

  // Kart Componenti (Kod tekrarını önlemek için)
  const AppointmentCard = ({ app, isPast }) => (
    <div
      className={`w-full border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all
        ${
          isPast
            ? "bg-[#1a1a1a] border-[#2e2e2e] opacity-75 hover:opacity-100" // Geçmiş ise biraz sönük
            : "bg-[#1e1e1e] border-[#383737] hover:border-[#009fe2] shadow-lg" // Gelecek ise canlı
        }
      `}
    >
      <div className="flex items-center gap-6">
        {/* İkon Kutusu */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
            ${
              isPast
                ? "bg-[#252525] text-[#5b5b5b]"
                : app.type === "salon"
                ? "bg-[#009fe2]/10 text-[#009fe2]"
                : "bg-[#22c55e]/10 text-[#22c55e]"
            }
          `}
        >
          <FontAwesomeIcon
            icon={app.type === "salon" ? faDumbbell : faBuilding}
          />
        </div>

        {/* Bilgiler */}
        <div className="flex flex-col gap-1">
          <h3
            className={`text-lg font-bold ${
              isPast ? "text-[#7a7a7a]" : "text-white"
            }`}
          >
            {app.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[#5b5b5b]">
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} /> {app.date}
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} /> {app.time}
            </span>
          </div>
        </div>
      </div>

      {/* Durum Rozeti */}
      <div
        className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2
          ${
            isPast
              ? "border-[#383737] text-[#5b5b5b]"
              : "border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10"
          }
      `}
      >
        <FontAwesomeIcon icon={faCheckCircle} />
        {isPast ? "Tamamlandı" : "Onaylandı"}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      
      {/* Geri Dön ve Başlık */}
      <button
        onClick={onBack}
        className="flex items-center cursor-pointer gap-2 text-[#5b5b5b] hover:text-white mb-6 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Geri Dön
      </button>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-1 h-10 bg-[#009fe2] rounded-full"></div>
        <h2 className="text-4xl font-bold text-white">Randevularım</h2>
      </div>

      {/* 1. YAKLAŞAN RANDEVULAR */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faCalendar} className="text-[#009fe2] text-xl" />
          <h3 className="text-2xl font-bold text-white">Yaklaşan Randevular</h3>
          <span className="bg-[#185f80] text-[#009fe2] text-xs font-bold px-2 py-0.5 rounded-full">
            {upcomingApps.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {upcomingApps.length > 0 ? (
            upcomingApps.map((app) => (
              <AppointmentCard key={app.id} app={app} isPast={false} />
            ))
          ) : (
            <div className="w-full py-10 border border-dashed border-[#383737] rounded-2xl flex flex-col items-center justify-center text-[#5b5b5b] gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-3xl opacity-20" />
              <p>Yaklaşan randevunuz bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. GEÇMİŞ RANDEVULAR */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[#5b5b5b] text-xl" />
          <h3 className="text-2xl font-bold text-[#b0b0b0]">Geçmiş Randevular</h3>
          <span className="bg-[#2e2e2e] text-[#7a7a7a] text-xs font-bold px-2 py-0.5 rounded-full">
            {pastApps.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
            {pastApps.map((app) => (
              <AppointmentCard key={app.id} app={app} isPast={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MemberAppointments;