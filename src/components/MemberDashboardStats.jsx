import React from "react";

const MemberDashboardStats = ({ user, stats, packageName }) => {
  
  const StatCircle = ({ label, current, total, colorHex }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg shadow-black/50 group/circle"
          style={{
            background: `conic-gradient(${colorHex} ${percentage}%, #2e2e2e 0)`,
          }}
        >
          <div className="absolute w-28 h-28 bg-[#161515] rounded-full flex flex-col items-center justify-center z-10">
            <span
              className="text-3xl font-bold transition-all duration-300 group-hover/circle:scale-110"
              style={{ color: colorHex }}
            >
              {current}
            </span>
            <span className="text-xs text-[#5b5b5b]">/ {total}</span>
          </div>
           
           <div 
             className="absolute w-full h-full rounded-full opacity-20 blur-md transition-opacity duration-300 group-hover/circle:opacity-40"
             style={{ backgroundColor: colorHex }}
           ></div>
        </div>
        <span className="text-white font-medium tracking-wide">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      
      <div className="w-full max-w-2xl bg-linear-to-br from-[#1a1a1a] to-[#252525] border border-[#2f3336] rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group hover:border-[#7c3aed]/30 transition-colors duration-500">
        
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-[#7c3aed] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          Hoş geldiniz, <span className="text-[#7c3aed] drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]">{user ? user.name : "Kullanıcı"}</span>
        </h1>
        
        <p className="text-[#22c55e] mt-2 font-medium tracking-wider text-md md:text-xl flex items-center gap-2">
          {packageName || "Paket Yükleniyor..."}
        </p>
        
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7c3aed] rounded-full blur-[80px] opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full max-w-4xl">
        <StatCircle
          label="Kalan Gün"
          current={stats.remainingDays.current}
          total={stats.remainingDays.total}
          colorHex="#7c3aed" 
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