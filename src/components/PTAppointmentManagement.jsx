import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext"; // Auth Context

const PTAppointmentManagement = () => {
  const { user } = useAuth(); // PT'nin ID'sini almak için
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    if (user && user.id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`http://localhost/gym-system/api/pt_appointments.php?action=get_all&pt_id=${user.id}`);
      const data = await res.json();
      
      if (data.success) {
        setUpcoming(data.upcoming);
        setCompleted(data.completed);
      }
    } catch (error) {
      console.error("Ders verileri alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- DERSİ TAMAMLA ---
  const handleCompleteLesson = async (id) => {
    try {
        const res = await fetch(`http://localhost/gym-system/api/pt_appointments.php?action=complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const result = await res.json();

        if (result.success) {
            // UI'ı anında güncelle (API'den tekrar çekmek yerine)
            const lesson = upcoming.find(l => l.id === id);
            if (lesson) {
                setUpcoming(upcoming.filter(l => l.id !== id));
                setCompleted([lesson, ...completed]); // En başa ekle
            }
        } else {
            alert("İşlem başarısız: " + result.error);
        }
    } catch (error) {
        console.error("Hata:", error);
    }
  };

  if (loading) return <div className="text-white text-center py-10">Yükleniyor...</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full mt-8">
      
      {/* --- SOL TARA: GELECEK RANDEVULAR --- */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-125">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Gelecek Randevular</h3>
          <span className="bg-[#2e2e2e] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#383737]">
            {upcoming.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pr-2">
          {upcoming.length > 0 ? (
            upcoming.map((lesson) => (
              <div key={lesson.id} className="bg-[#252525] border border-[#383737] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#5b5b5b]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center text-[#5b5b5b]">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{lesson.student}</h4>
                    <div className="text-sm text-[#888] flex items-center gap-3">
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faCalendarAlt} /> {lesson.date_formatted}</span>
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} /> {lesson.time_formatted}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleCompleteLesson(lesson.id)} className="w-full sm:w-auto cursor-pointer bg-[#22c55e] hover:bg-[#1ea84f] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                  <FontAwesomeIcon icon={faCheckCircle} /> Tamamlandı
                </button>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#5b5b5b] gap-4">
              <div className="w-20 h-20 bg-[#252525] rounded-full flex items-center justify-center">
                 <FontAwesomeIcon icon={faClock} className="text-4xl opacity-20" />
              </div>
              <p>Bekleyen randevu bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- SAĞ TARA: TAMAMLANMIŞ DERSLER --- */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-125">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Tamamlanmış Dersler</h3>
          <span className="bg-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full border border-[#22c55e]/30">
            {completed.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pr-2">
          {completed.length > 0 ? (
            completed.map((lesson) => (
              <div key={lesson.id} className="bg-[#1a2e22] border border-[#22c55e]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#22c55e]/20 rounded-full flex items-center justify-center text-[#22c55e]">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{lesson.student}</h4>
                    <div className="text-sm text-[#22c55e]/70 flex items-center gap-3">
                      <span>{lesson.date_formatted} • {lesson.time_formatted}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto bg-[#22c55e]/20 text-[#22c55e] px-4 py-2 rounded-lg font-bold text-xs border border-[#22c55e]/30 flex items-center justify-center gap-2 cursor-default">
                  Tamamlandı <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#5b5b5b] gap-4">
              <p>Henüz tamamlanmış ders yok.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default PTAppointmentManagement;