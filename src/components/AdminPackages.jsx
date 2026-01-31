import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSave, faTimes, faMinus, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const AdminPackages = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Paketleri tutacak state
  const [packages, setPackages] = useState([]);

  // Form Verileri
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    price: "",
    duration_days: "",
    session_count: "", 
    features: [""] 
  });

  // --- API İŞLEMLERİ ---

  // 1. Paketleri Getir
  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages.php");
      const data = await response.json();
      // Gelen veride features null ise boş dizi yapalım ki hata vermesin
      const processedData = data.map(pkg => ({
        ...pkg,
        features: pkg.features || [] 
      }));
      setPackages(processedData);
    } catch (error) {
      console.error("Paketleri çekme hatası:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // --- YARDIMCI FONKSİYONLAR ---
  const formatPrice = (price) => {
    return Number(price).toLocaleString('tr-TR');
  };

  // --- FORM İŞLEMLERİ ---

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ 
      id: null, 
      title: "", 
      price: "", 
      duration_days: "", 
      session_count: "", 
      features: [""] 
    });
    setShowModal(true);
  };

  const openEditModal = (pkg) => {
    setIsEditing(true);
    // Eğer özellikler boşsa en az 1 tane boş string ekle ki input görünsün
    const featuresList = pkg.features && pkg.features.length > 0 ? pkg.features : [""];
    
    setFormData({
      ...pkg,
      features: featuresList
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  // --- KAYDETME (CREATE / UPDATE) ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Boş özellikleri temizle
    const cleanedFeatures = formData.features.filter(f => f.trim() !== "");
    const finalData = { ...formData, features: cleanedFeatures };

    try {
      const response = await fetch("/api/packages.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON OLARAK GÖNDERİYORUZ
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (result.success) {
        await fetchPackages(); // Listeyi yenile
        setShowModal(false);
      } else {
        alert("Hata: " + result.error);
      }
    } catch (error) {
      console.error("Kaydetme hatası:", error);
    }
  };

  // --- SİLME (DELETE) ---
  const handleDelete = async (id) => {
    if(window.confirm("Bu paketi silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`/api/packages.php?id=${id}`, {
          method: "DELETE"
        });
        const result = await response.json();
        
        if (result.success) {
           setPackages(packages.filter(p => p.id !== id));
        } else {
           alert("Hata: " + result.error);
        }
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  return (
    <div className="w-full relative animate-fade-in">
      
      {/* Yeni Ekle Butonu */}
      <div className="mb-8">
        <button 
          onClick={openAddModal}
          className="bg-[#22c55e] cursor-pointer hover:bg-[#1ea84f] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Yeni Paket Ekle
        </button>
      </div>

      {/* Paket Listesi Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl p-6 hover:border-[#22c55e] transition-all group flex flex-col justify-between shadow-xl">
            
            <div>
              <h3 className="text-white font-bold text-xl mb-1">{pkg.title}</h3>
              <p className="text-[#22c55e] font-bold text-3xl mb-4">{formatPrice(pkg.price)}₺</p>
              
              <div className="text-sm text-[#888] space-y-1 mb-4 border-b border-[#333] pb-4">
                 <p>• {pkg.duration_days} Gün Geçerli</p>
                 {Number(pkg.session_count) > 0 && <p>• {pkg.session_count} Ders Hakkı</p>}
              </div>

              {/* Özellikler Listesi */}
              <ul className="text-sm text-[#bbb] space-y-1 list-disc list-inside opacity-80">
                {pkg.features && pkg.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="truncate">{feat}</li>
                ))}
                {pkg.features && pkg.features.length > 3 && (
                  <li className="text-[#555] text-xs">+ {pkg.features.length - 3} özellik daha...</li>
                )}
              </ul>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => openEditModal(pkg)}
                className="flex-1 bg-[#22c55e] hover:bg-[#1ea84f] cursor-pointer text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faEdit} /> Düzenle
              </button>
              <button 
                onClick={() => handleDelete(pkg.id)}
                className="w-12 bg-[#3a1a1a] border border-red-900/30 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-[#252525] p-5 border-b border-[#383737] flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? "Paketi Düzenle" : "Yeni Paket Oluştur"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#5b5b5b] cursor-pointer hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Paket Adı</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Örn: 10 PT Dersi" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#22c55e] outline-none transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Fiyat (₺)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="9000" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#22c55e] outline-none transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Geçerlilik Süresi (Gün)</label>
                    <input type="number" name="duration_days" value={formData.duration_days} onChange={handleInputChange} placeholder="Örn: 60" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#22c55e] outline-none transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Ders Sayısı (PT için)</label>
                    <input type="number" name="session_count" value={formData.session_count} onChange={handleInputChange} placeholder="0 (Salon ise 0 yazın)" className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#22c55e] outline-none transition-colors" required />
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#333] pt-4">
                  <label className="text-white font-bold text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faBoxOpen} />
                    Paket Özellikleri (Madde İmleri)
                  </label>
                  <p className="text-xs text-[#666]">Bu maddeler ana sayfada paket kartının üzerinde tik işaretiyle listelenecektir.</p>

                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Örn: Kişiye özel antrenman programı" className="flex-1 bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#22c55e] outline-none text-sm" />
                      {formData.features.length > 1 && (
                        <button type="button" onClick={() => removeFeatureField(index)} className="w-12 bg-[#3a1a1a] text-red-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-white transition-colors"><FontAwesomeIcon icon={faMinus} /></button>
                      )}
                    </div>
                  ))}

                  <button type="button" onClick={addFeatureField} className="mt-2 text-[#22c55e] text-sm cursor-pointer font-bold hover:text-white transition-colors flex items-center gap-2 w-fit"><FontAwesomeIcon icon={faPlus} /> Yeni Özellik Ekle</button>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#383737]">
                  <button type="submit" className="flex-1 bg-[#22c55e] cursor-pointer hover:bg-[#1ea84f] text-white py-3 rounded-xl font-bold transition-all"><FontAwesomeIcon icon={faSave} className="mr-2" /> {isEditing ? "Güncelle" : "Kaydet"}</button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-[#3a1a1a] border border-red-900/30 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-all"><FontAwesomeIcon icon={faTimes} className="mr-2" /> İptal</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPackages;