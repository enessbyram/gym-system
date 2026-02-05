import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, faHistory, faTimes
} from "@fortawesome/free-solid-svg-icons";

const AdminMembers = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]); 
  const [packages, setPackages] = useState([]);
  const [pts, setPts] = useState([]); // YENİ: PT Listesi için state

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    password: "",
    packageId: "",
    ptId: "", // YENİ: Seçilen PT'nin ID'si
    startDate: "",
    extraDays: "", 
    extraSessions: ""
  });

  const fetchData = async () => {
    try {
      // 1. Üyeleri Çek
      const memRes = await fetch("/api/members.php");
      const memData = await memRes.json();
      if (Array.isArray(memData)) {
        setMembers(memData);
      } else {
        setMembers([]); 
      }

      // 2. Paketleri Çek
      const pkgRes = await fetch("/api/packages.php");
      const pkgData = await pkgRes.json();
      if (Array.isArray(pkgData)) {
        setPackages(pkgData);
      }

      // 3. PT'leri Çek (YENİ KISIM)
      // Sistemin user tablosundan role='pt' olanları çeken bir endpoint
      const ptRes = await fetch("/api/users.php?role=pt"); 
      const ptData = await ptRes.json();
      if (Array.isArray(ptData)) {
        setPts(ptData);
      }

    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setMembers([]); // Hata durumunda boş dizi ata
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Seçilen paketin 'pt' paketi olup olmadığını kontrol ediyoruz
  // (Form verisindeki packageId ile paketler listesindeki id eşleşiyor mu?)
  const selectedPackage = packages.find(p => p.id == formData.packageId);
  const isPtPackage = selectedPackage && selectedPackage.type === 'pt';

  const openModal = (type, member = null) => {
    setActiveModal(type);
    setSelectedMember(member);
    
    if (type === 'add') {
      setFormData({ 
        id: null, name: "", email: "", phone: "", password: "", 
        packageId: "", ptId: "", // Sıfırla
        startDate: new Date().toISOString().split('T')[0], 
        extraDays: "", extraSessions: "" 
      });
    } else if (member) {
      setFormData({
        ...member,
        password: "", 
        packageId: member.packageId || "",
        ptId: member.ptId || "", // Mevcut PT varsa getir
        extraDays: "",
        extraSessions: ""
      });
    }
  };

  const handleAction = async (e, actionType = 'save') => {
    if (e) e.preventDefault();

    const payload = { ...formData, action: actionType };
    
    if (actionType === 'toggle_status') {
        payload.id = selectedMember.id;
        payload.status = selectedMember.status;
    } else if (actionType === 'add_days' || actionType === 'add_session') {
        payload.id = selectedMember.id;
    }

    try {
      const response = await fetch("/api/members.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();

      if (result.success) {
        await fetchData();
        setActiveModal(null);
      } else {
        alert("Hata: " + (result.error || "İşlem başarısız"));
      }
    } catch (error) {
      console.error("İşlem hatası:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="w-full relative animate-fade-in font-montserrat">
      
      <div className="mb-6 md:mb-8">
        <button 
          onClick={() => openModal('add')}
          className="bg-[#333] hover:bg-[#444] cursor-pointer text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 border border-[#444] text-sm md:text-base"
        >
          <FontAwesomeIcon icon={faPlus} />
          Yeni Üye Ekle
        </button>
      </div>

      <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-[#252525] text-[#888] text-xs md:text-sm uppercase tracking-wider">
              <th className="p-3 md:p-5 font-medium">Ad Soyad</th>
              <th className="p-3 md:p-5 font-medium hidden lg:table-cell">E-posta</th>
              <th className="p-3 md:p-5 font-medium">Üyelik</th>
              <th className="p-3 md:p-5 font-medium text-center">PT</th> {/* YENİ SÜTUN */}
              <th className="p-3 md:p-5 font-medium text-center">Kalan Gün</th>
              <th className="p-3 md:p-5 font-medium text-center">PT Dersi</th>
              <th className="p-3 md:p-5 font-medium text-center">Durum</th>
              <th className="p-3 md:p-5 font-medium text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2e2e2e]">
            {Array.isArray(members) && members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-[#222] transition-colors group">
                  <td className="p-3 md:p-5 text-white font-medium text-sm md:text-base">{member.name}</td>
                  <td className="p-3 md:p-5 text-[#5b5b5b] text-sm hidden lg:table-cell">{member.email}</td>
                  <td className="p-3 md:p-5 text-[#7c3aed] text-sm md:text-base">{member.package}</td>
                  {/* PT İSMİ GÖSTERİMİ */}
                  <td className="p-3 md:p-5 text-center text-[#22c55e] font-medium text-sm">
                    {member.pt_name || "-"}
                  </td>
                  <td className="p-3 md:p-5 text-center text-white font-bold text-sm md:text-base">{member.remainingDays} gün</td>
                  <td className={`p-3 md:p-5 text-center font-bold text-sm md:text-base ${Number(member.remainingSessions) > 0 ? 'text-[#22c55e]' : 'text-[#5b5b5b]'}`}>
                    {member.remainingSessions}
                  </td>
                  <td className="p-3 md:p-5 text-center">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border ${member.status === 'Aktif' ? 'bg-[#1a2e22] text-[#22c55e] border-[#22c55e]/30' : 'bg-[#2e1a1a] text-red-500 border-red-900/30'}`}>
                      {member.status}
                    </span>
                  </td>
                  
                  <td className="p-3 md:p-5 flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('edit', member)} className="bg-[#7c3aed] hover:bg-[#7c3aed] text-white cursor-pointer w-20 md:min-w-24 px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors">
                        Düzenle
                      </button>
                      <button onClick={() => openModal('history', member)} className="bg-[#635a4a] hover:bg-[#7a705e] cursor-pointer w-20 md:min-w-24 text-[#d6cbb6] px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors flex items-center justify-center gap-1">
                        <FontAwesomeIcon icon={faHistory} /> Geçmiş
                      </button>
                      <button 
                          onClick={() => { setSelectedMember(member); handleAction(null, 'toggle_status'); }} 
                          className="bg-[#8a2c2c] hover:bg-[#a83636] cursor-pointer w-20 md:min-w-24 text-white px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors"
                      >
                        {member.status === 'Aktif' ? 'Pasifleştir' : 'Aktifleştir'}
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => openModal('addDays', member)} className="bg-[#333] cursor-pointer w-20 md:min-w-24 hover:bg-[#444] text-white px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors">
                        Gün Ekle
                      </button>
                      <button onClick={() => openModal('addSession', member)} className="bg-[#1f5f30] cursor-pointer w-20 md:min-w-24 hover:bg-[#26753b] text-white px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors">
                        Ders Ekle
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-8 text-center text-[#555]">
                  {Array.isArray(members) ? "Henüz üye kaydı bulunmamaktadır." : "Veri yüklenirken bir sorun oluştu."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-2xl rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{activeModal === 'add' ? 'Yeni Üye Ekle' : 'Üye Düzenle'}</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#5b5b5b] cursor-pointer hover:text-white"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
            </div>
            <form onSubmit={(e) => handleAction(e, 'save')} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ad Soyad" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 outline-none focus:border-[#7c3aed]" required />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="E-posta" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 outline-none focus:border-[#7c3aed]" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Şifre" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 outline-none focus:border-[#7c3aed]" />
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Telefon" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 outline-none focus:border-[#7c3aed]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="packageId" value={formData.packageId} onChange={handleInputChange} className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 outline-none focus:border-[#7c3aed]">
                  <option value="">Paket Seçiniz</option>
                  {Array.isArray(packages) && packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="bg-[#2e2e2e] border border-[#3e3e3e] text-[#888] rounded-xl p-3 outline-none focus:border-[#7c3aed]" />
              </div>

              {/* --- YENİ EKLENEN KISIM: PT SEÇİMİ --- */}
              {/* Eğer seçilen paketin tipi 'pt' ise bu dropdown gözükür */}
              {isPtPackage && (
                <div className="w-full animate-fade-in">
                  <label className="text-[#888] text-sm ml-2 mb-1 block">Eğitmen (PT) Seçiniz</label>
                  <select 
                    name="ptId" 
                    value={formData.ptId} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#1a2e22] border border-[#22c55e] text-white rounded-xl p-3 outline-none focus:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  >
                    <option value="">PT Seçiniz</option>
                    {Array.isArray(pts) && pts.map(pt => (
                      <option key={pt.id} value={pt.id}>{pt.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-3 mt-4 pt-4 border-t border-[#333]">
                <button type="submit" className="flex-1 bg-[#22c55e] hover:bg-[#1ea84f] text-white cursor-pointer py-3 rounded-xl font-bold">{activeModal === 'add' ? 'Üye Ekle' : 'Kaydet'}</button>
                <button type="button" onClick={() => setActiveModal(null)} className="flex-1 cursor-pointer bg-[#333] text-[#888] hover:bg-[#444] hover:text-white py-3 rounded-xl font-bold">İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'history' && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
             <div className="flex justify-between items-center p-4 md:p-6 border-b border-[#333]">
              <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faHistory} className="text-[#888]" /> 
                {selectedMember.name} - Üyelik Geçmişi
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-[#5b5b5b] hover:text-white cursor-pointer"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              
              <div className="bg-[#222] border border-[#333] p-4 md:p-5 rounded-2xl relative">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-white text-base md:text-lg font-bold">{selectedMember.package}</h4>
                        <p className="text-[#7c3aed] font-bold text-lg md:text-xl mt-1">
                            {packages.find(p => p.id === selectedMember.packageId)?.price 
                                ? Number(packages.find(p => p.id === selectedMember.packageId).price).toLocaleString() + '₺' 
                                : ''}
                        </p>
                    </div>
                    <span className="bg-[#1a2e22] text-[#22c55e] border border-[#22c55e]/30 px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                        Aktif Paket
                    </span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm text-[#888] border-t border-[#333] pt-4">
                    <div className="flex flex-col">
                        <span className="text-[#555] text-[10px] md:text-xs">Başlangıç</span>
                        <span className="text-[#ccc]">{formatDate(selectedMember.startDate)}</span>
                    </div>
                    <div className="flex flex-col text-right">
                         <span className="text-[#555] text-[10px] md:text-xs">Kalan Gün</span>
                         <span className="text-white font-bold">{selectedMember.remainingDays} gün</span>
                    </div>
                    <div className="flex flex-col mt-2">
                         <span className="text-[#555] text-[10px] md:text-xs">Eklenme</span>
                         <span className="text-[#ccc]">{formatDate(selectedMember.startDate)}</span>
                    </div>
                 </div>
              </div>

              {selectedMember.history && selectedMember.history.map((h, i) => (
                 <div key={i} className="bg-[#222] border border-[#333] p-4 md:p-5 rounded-2xl relative opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-[#ccc] text-base md:text-lg font-bold">{h.title}</h4>
                            <p className="text-[#7c3aed] font-bold text-lg md:text-xl mt-1">{Number(h.price).toLocaleString()}₺</p>
                        </div>
                        <span className="bg-[#333] text-[#888] border border-[#444] px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                            Geçmiş Paket
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm text-[#888] border-t border-[#333] pt-4">
                        <div className="flex flex-col">
                            <span className="text-[#555] text-[10px] md:text-xs">Başlangıç</span>
                            <span className="text-[#ccc]">{formatDate(h.start)}</span>
                        </div>
                        <div className="flex flex-col text-right">
                             <span className="text-[#555] text-[10px] md:text-xs">Bitiş</span>
                             <span className="text-[#ccc]">{formatDate(h.end)}</span>
                        </div>
                        <div className="flex flex-col mt-2">
                             <span className="text-[#555] text-[10px] md:text-xs">Eklenme</span>
                             <span className="text-[#ccc]">{formatDate(h.start)}</span>
                        </div>
                    </div>
                 </div>
              ))}
              
              {(!selectedMember.history || selectedMember.history.length === 0) && (
                <div className="p-8 text-center border border-dashed border-[#333] rounded-2xl">
                    <p className="text-[#555] italic">Bu üyenin geçmiş paket kaydı bulunmuyor.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {(activeModal === 'addDays' || activeModal === 'addSession') && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-sm rounded-3xl shadow-2xl p-6">
             <h3 className="text-lg font-bold text-white mb-2 text-center">
               {activeModal === 'addDays' ? 'Kaç gün eklensin?' : 'Kaç ders eklensin?'}
             </h3>
             <p className="text-sm text-[#5b5b5b] text-center mb-6">
               {selectedMember.name} üyesine manuel olarak ekleme yapıyorsunuz.
             </p>

             <form onSubmit={(e) => handleAction(e, activeModal === 'addDays' ? 'add_days' : 'add_session')} className="flex flex-col gap-4">
                <input 
                  type="number" 
                  name={activeModal === 'addDays' ? 'extraDays' : 'extraSessions'}
                  value={activeModal === 'addDays' ? formData.extraDays : formData.extraSessions}
                  onChange={handleInputChange}
                  className="bg-[#252525] border border-[#7c3aed] text-white text-center text-2xl font-bold rounded-xl p-4 outline-none focus:shadow-[0_0_15px_rgba(0,159,226,0.3)] transition-all"
                  placeholder="0"
                  autoFocus
                  required
                />
                
                <div className="flex gap-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="flex-1 cursor-pointer bg-[#333] text-white py-2 rounded-xl font-bold hover:bg-[#444]">İptal</button>
                  <button type="submit" className="flex-1 bg-[#7c3aed] text-white py-2 cursor-pointer rounded-xl font-bold hover:bg-[#7c3aed]">Tamam</button>
                </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminMembers;