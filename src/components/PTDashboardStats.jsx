import React from "react";

const PTDashboardStats = ({ user }) => {
  return (
    <div className="flex flex-col items-center gap-12 w-full">
      
      {/* Hoşgeldin Kartı */}
      {/* Arka plan: Member paneliyle uyumlu premium koyu gradient */}
      <div className="w-full max-w-2xl bg-linear-to-br from-[#1e2229] to-[#112520] border border-[#2f3336] rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
        
        {/* Üstteki ince yeşil ışık efekti */}
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-[#22c55e] to-transparent opacity-30"></div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          Hoş geldiniz, <span className="text-[#22c55e]">{user ? user.name : "Eğitmen"}</span>
        </h1>
        <p className="text-[#5b5b5b] mt-2 font-medium tracking-wider text-sm md:text-base">
          Personal Trainer Dashboard
        </p>
      </div>

    </div>
  );
};

export default PTDashboardStats;