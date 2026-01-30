import React from "react";

// packageName prop'unu ekledik
const MemberDashboardStats = ({ user, stats, packageName }) => {
  
  const StatCircle = ({ label, current, total, colorHex }) => {
    // Yüzde hesabı (0'a bölünme hatasını önle)
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg shadow-black/50"
          style={{
            background: `conic-gradient(${colorHex} ${percentage}%, #2e2e2e 0)`,
          }}
        >
          <div className="absolute w-28 h-28 bg-[#161515] rounded-full flex flex-col items-center justify-center z-10">
            <span
              className="text-3xl font-bold"
              style={{ color: colorHex }}
            >
              {current}
            </span>
            <span className="text-xs text-[#5b5b5b]">/ {total}</span>
          </div>
           <div 
             className="absolute w-full h-full rounded-full opacity-20 blur-md"
             style={{ backgroundColor: colorHex }}
           ></div>
        </div>
        <span className="text-white font-medium tracking-wide">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      
      {/* 1. Hoşgeldin Kartı */}
      <div className="w-full max-w-2xl bg-linear-to-br from-[#1e2229] to-[#112520] border border-[#2f3336] rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
        
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-[#22c55e] to-transparent opacity-30"></div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          Hoş geldiniz, <span className="text-[#009fe2]">{user ? user.name : "Kullanıcı"}</span>
        </h1>
        {/* PAKET ADI ARTIK DİNAMİK */}
        <p className="text-[#22c55e] mt-2 font-medium tracking-wider text-md md:text-xl">
          {packageName || "Paket Yükleniyor..."}
        </p>
      </div>

      {/* 2. İstatistik Halkaları */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full max-w-4xl">
        <StatCircle
          label="Kalan Gün"
          current={stats.remainingDays.current}
          total={stats.remainingDays.total}
          colorHex="#009fe2" 
        />
        <StatCircle
          label="PT Dersi"
          current={stats.ptSessions.current}
          total={stats.ptSessions.total}
          colorHex="#22c55e" 
        />
        <StatCircle
          label="Aktif Randevu"
          current={stats.activeAppointments.current}
          total={stats.activeAppointments.total}
          colorHex="#fcd34d" 
        />
      </div>
    </div>
  );
};

export default MemberDashboardStats;